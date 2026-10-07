import { Injectable, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

// Open Fmaj9 voicing (F2 C3 A3 E4 G4 C5) as MIDI notes, plus three high partials
// for the shimmer at the bloom's peak. Original synthesis, not a sampled Apple asset.
const PAD_NOTES = [41, 48, 57, 64, 67, 72];
const SHIMMER_NOTES = [84, 88, 91];
const PAD_VOICES = [
  { type: 'sine', detune: 0, gain: 0.16 },
  { type: 'triangle', detune: 6, gain: 0.05 },
  { type: 'triangle', detune: -6, gain: 0.05 },
] as const satisfies ReadonlyArray<{ type: OscillatorType; detune: number; gain: number }>;

const MASTER_GAIN = 0.3;
const REVERB_SECONDS = 3.2;

function midiToHz(note: number): number {
  return 440 * Math.pow(2, (note - 69) / 12);
}

/**
 * The arrival chime played with the boot screen's Aurora bloom: a soft pad swell,
 * a filtered-noise breath rising into it and a short shimmer at the peak, all
 * synthesized with Web Audio (no audio file to download).
 *
 * Browsers only let an `AudioContext` start from a user gesture, so `play()` must
 * be called synchronously from one (the boot screen's unlock click/keypress).
 */
@Injectable({ providedIn: 'root' })
export class BootChimeService {
  readonly #isBrowser = isPlatformBrowser(inject(PLATFORM_ID));

  #ctx: AudioContext | null = null;

  /**
   * @param delaySec seconds from now until the swell starts
   * @param stretch time multiplier for every envelope (2 = half speed)
   */
  play(delaySec: number, stretch: number): void {
    if (!this.#isBrowser || typeof AudioContext === 'undefined') {
      return;
    }
    try {
      this.#ctx ??= new AudioContext();
      void this.#ctx.resume();
      this.#schedule(this.#ctx, delaySec, stretch);
    } catch (err) {
      // Audio is decoration: a failure here must never block the desktop from opening.
      console.error(err);
    }
  }

  #schedule(c: AudioContext, delaySec: number, stretch: number): void {
    const t0 = c.currentTime + delaySec;

    const bus = c.createGain();
    const dry = c.createGain();
    dry.gain.value = 0.7;
    const wet = c.createGain();
    wet.gain.value = 0.55;
    const comp = c.createDynamicsCompressor();
    const master = c.createGain();
    master.gain.value = MASTER_GAIN;

    bus.connect(dry).connect(comp);
    bus.connect(this.#reverb(c)).connect(wet).connect(comp);
    comp.connect(master).connect(c.destination);

    const attack = 0.35 * stretch;
    const hold = 0.5 * stretch;
    const release = 2.8 * stretch;
    const end = t0 + attack + hold + release;

    PAD_NOTES.forEach((note, i) => {
      for (const voice of PAD_VOICES) {
        const osc = c.createOscillator();
        osc.type = voice.type;
        osc.frequency.value = midiToHz(note);
        osc.detune.value = voice.detune;

        const lowpass = c.createBiquadFilter();
        lowpass.type = 'lowpass';
        lowpass.frequency.setValueAtTime(600, t0);
        lowpass.frequency.linearRampToValueAtTime(4200, t0 + attack + hold);
        lowpass.frequency.exponentialRampToValueAtTime(900, end);

        const level = voice.gain * (1 - i * 0.08);
        const env = c.createGain();
        env.gain.setValueAtTime(0, t0);
        env.gain.linearRampToValueAtTime(level, t0 + attack + i * 0.025);
        env.gain.setValueAtTime(level, t0 + attack + hold);
        env.gain.exponentialRampToValueAtTime(0.0001, end);

        osc.connect(lowpass).connect(env).connect(bus);
        osc.start(t0);
        osc.stop(end + 0.1);
      }
    });

    SHIMMER_NOTES.forEach((note, i) => {
      const start = t0 + attack * 0.9 + i * 0.06 * stretch;
      const stop = start + 1.6 * stretch;
      const osc = c.createOscillator();
      osc.type = 'sine';
      osc.frequency.value = midiToHz(note);
      const env = c.createGain();
      env.gain.setValueAtTime(0, start);
      env.gain.linearRampToValueAtTime(0.035, start + 0.02);
      env.gain.exponentialRampToValueAtTime(0.0001, stop);
      osc.connect(env).connect(bus);
      osc.start(start);
      osc.stop(stop + 0.1);
    });

    const breathStart = Math.max(c.currentTime, t0 - 0.2 * stretch);
    const noiseBuffer = c.createBuffer(1, c.sampleRate * 2, c.sampleRate);
    const samples = noiseBuffer.getChannelData(0);
    for (let i = 0; i < samples.length; i++) {
      samples[i] = Math.random() * 2 - 1;
    }
    const noise = c.createBufferSource();
    noise.buffer = noiseBuffer;
    const bandpass = c.createBiquadFilter();
    bandpass.type = 'bandpass';
    bandpass.Q.value = 0.8;
    bandpass.frequency.setValueAtTime(300, breathStart);
    bandpass.frequency.exponentialRampToValueAtTime(3500, t0 + attack);
    const breath = c.createGain();
    breath.gain.setValueAtTime(0, breathStart);
    breath.gain.linearRampToValueAtTime(0.06, t0 + attack);
    breath.gain.exponentialRampToValueAtTime(0.0001, t0 + attack + 1.2 * stretch);
    noise.connect(bandpass).connect(breath).connect(bus);
    noise.start(breathStart);
    noise.stop(t0 + attack + 1.3 * stretch);
  }

  #reverb(c: AudioContext): ConvolverNode {
    const length = c.sampleRate * REVERB_SECONDS;
    const impulse = c.createBuffer(2, length, c.sampleRate);
    for (let ch = 0; ch < 2; ch++) {
      const data = impulse.getChannelData(ch);
      for (let i = 0; i < length; i++) {
        data[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / length, 2.6);
      }
    }
    const convolver = c.createConvolver();
    convolver.buffer = impulse;
    return convolver;
  }
}
