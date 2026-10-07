import { Injectable, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

const MASTER_GAIN = 0.5;

interface PopVoice {
  type: OscillatorType;
  from: number;
  to: number;
  gain: number;
}

/**
 * Discreet interface sounds: a faint tick on dock hover, a soft pop on dock click
 * and a lower, falling pop when a window closes. Synthesized with Web Audio (no
 * audio file, no sampled Apple asset).
 *
 * The `AudioContext` is only created once the page has had a user gesture
 * (`navigator.userActivation`), so hovering before the boot screen's unlock never
 * triggers the browser's autoplay warning.
 */
@Injectable({ providedIn: 'root' })
export class UiSoundService {
  readonly #isBrowser = isPlatformBrowser(inject(PLATFORM_ID));

  #ctx: AudioContext | null = null;
  #master: GainNode | null = null;

  hover(): void {
    this.#play((c, out, t) => {
      const osc = c.createOscillator();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(2400, t);
      osc.frequency.exponentialRampToValueAtTime(1900, t + 0.03);
      const env = c.createGain();
      env.gain.setValueAtTime(0, t);
      env.gain.linearRampToValueAtTime(0.03, t + 0.003);
      env.gain.exponentialRampToValueAtTime(0.0001, t + 0.04);
      osc.connect(env).connect(out);
      osc.start(t);
      osc.stop(t + 0.05);
    });
  }

  click(): void {
    this.#pop([
      { type: 'sine', from: 720, to: 380, gain: 0.09 },
      { type: 'triangle', from: 1440, to: 760, gain: 0.02 },
    ]);
  }

  close(): void {
    this.#pop([
      { type: 'sine', from: 480, to: 220, gain: 0.08 },
      { type: 'triangle', from: 960, to: 440, gain: 0.015 },
    ]);
  }

  #pop(voices: readonly PopVoice[]): void {
    this.#play((c, out, t) => {
      for (const voice of voices) {
        const osc = c.createOscillator();
        osc.type = voice.type;
        osc.frequency.setValueAtTime(voice.from, t);
        osc.frequency.exponentialRampToValueAtTime(voice.to, t + 0.07);
        const env = c.createGain();
        env.gain.setValueAtTime(0, t);
        env.gain.linearRampToValueAtTime(voice.gain, t + 0.004);
        env.gain.exponentialRampToValueAtTime(0.0001, t + 0.11);
        osc.connect(env).connect(out);
        osc.start(t);
        osc.stop(t + 0.12);
      }
    });
  }

  #play(schedule: (c: AudioContext, out: AudioNode, t: number) => void): void {
    if (!this.#isBrowser || typeof AudioContext === 'undefined') {
      return;
    }
    if (!this.#ctx && navigator.userActivation?.hasBeenActive === false) {
      return;
    }
    try {
      this.#ctx ??= new AudioContext();
      if (!this.#master) {
        this.#master = this.#ctx.createGain();
        this.#master.gain.value = MASTER_GAIN;
        this.#master.connect(this.#ctx.destination);
      }
      if (this.#ctx.state === 'suspended') {
        void this.#ctx.resume();
      }
      schedule(this.#ctx, this.#master, this.#ctx.currentTime);
    } catch (err) {
      // Sound is decoration: a failure here must never break the dock.
      console.error(err);
    }
  }
}
