import { TestBed } from '@angular/core/testing';
import { vi } from 'vitest';
import { logEvent } from 'firebase/analytics';
import { App } from './app';

vi.mock('firebase/analytics', () => ({
  getAnalytics: vi.fn(() => ({})),
  isSupported: vi.fn(() => Promise.resolve(true)),
  logEvent: vi.fn(),
}));

vi.mock('firebase/app', () => ({
  initializeApp: vi.fn(() => ({})),
}));

describe('App', () => {
  beforeEach(async () => {
    vi.clearAllMocks();
    await TestBed.configureTestingModule({
      imports: [App],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should render a blank page with no visible content', async () => {
    const fixture = TestBed.createComponent(App);
    await fixture.whenStable();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent?.trim()).toBe('');
  });

  it('should log a page_view analytics event on startup', async () => {
    const fixture = TestBed.createComponent(App);
    await fixture.whenStable();
    // Flush the microtask queue so the dynamic `import('firebase/analytics')`
    // inside the afterNextRender callback resolves before we assert on it.
    await new Promise((resolve) => setTimeout(resolve, 0));
    expect(logEvent).toHaveBeenCalledWith(
      expect.anything(),
      'page_view',
      expect.objectContaining({ page_path: expect.any(String) }),
    );
  });
});
