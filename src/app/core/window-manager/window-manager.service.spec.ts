import { TestBed } from '@angular/core/testing';
import { WindowManagerService } from './window-manager.service';

describe('WindowManagerService', () => {
  let service: WindowManagerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WindowManagerService);
  });

  it('starts with no windows open', () => {
    expect(service.windows()).toEqual([]);
    expect(service.frontmost()).toBeNull();
  });

  it('opens a window for an app', () => {
    service.open('notes', 'Notes');
    const wins = service.windows();
    expect(wins.length).toBe(1);
    expect(wins[0].appId).toBe('notes');
    expect(wins[0].title).toBe('Notes');
    expect(wins[0].minimized).toBe(false);
  });

  it('reuses the existing window instead of duplicating on a second open', () => {
    service.open('notes', 'Notes');
    service.open('notes', 'Notes');
    expect(service.windows().length).toBe(1);
  });

  it('cascades the position of successively opened windows', () => {
    service.open('notes', 'Notes');
    service.open('vscode', 'VS Code');
    const [first, second] = service.windows();
    expect(second.x).toBeGreaterThan(first.x);
    expect(second.y).toBeGreaterThan(first.y);
  });

  it('closes a window', () => {
    service.open('notes', 'Notes');
    const id = service.windows()[0].id;
    service.close(id);
    expect(service.windows()).toEqual([]);
  });

  it('minimizes and restores a window', () => {
    service.open('notes', 'Notes');
    const id = service.windows()[0].id;
    service.minimize(id);
    expect(service.windows()[0].minimized).toBe(true);
    service.restore(id);
    expect(service.windows()[0].minimized).toBe(false);
  });

  it('reopening a minimized app restores and focuses it', () => {
    service.open('notes', 'Notes');
    const id = service.windows()[0].id;
    service.minimize(id);
    service.open('notes', 'Notes');
    expect(service.windows()[0].minimized).toBe(false);
  });

  it('focus raises a window above the others', () => {
    service.open('notes', 'Notes');
    service.open('vscode', 'VS Code');
    const notesId = service.windows()[0].id;
    service.focus(notesId);
    const notesWin = service.windows().find((w) => w.id === notesId)!;
    const vscodeWin = service.windows().find((w) => w.appId === 'vscode')!;
    expect(notesWin.zIndex).toBeGreaterThan(vscodeWin.zIndex);
    expect(service.frontmost()?.id).toBe(notesId);
  });

  it('move updates window position', () => {
    service.open('notes', 'Notes');
    const id = service.windows()[0].id;
    service.move(id, 200, 150);
    const win = service.windows().find((w) => w.id === id)!;
    expect(win.x).toBe(200);
    expect(win.y).toBe(150);
  });

  it('resize updates window dimensions', () => {
    service.open('notes', 'Notes');
    const id = service.windows()[0].id;
    service.resize(id, 900, 600);
    const win = service.windows().find((w) => w.id === id)!;
    expect(win.width).toBe(900);
    expect(win.height).toBe(600);
  });

  it('isOpen reflects whether an app has a window', () => {
    expect(service.isOpen('notes')).toBe(false);
    service.open('notes', 'Notes');
    expect(service.isOpen('notes')).toBe(true);
  });

  it('frontmost ignores minimized windows', () => {
    service.open('notes', 'Notes');
    const id = service.windows()[0].id;
    service.minimize(id);
    expect(service.frontmost()).toBeNull();
  });
});
