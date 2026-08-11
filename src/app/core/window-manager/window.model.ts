export type AppId =
  | 'notes'
  | 'vscode'
  | 'photoshop'
  | 'figma'
  | 'youtube'
  | 'mail'
  | 'safari'
  | 'finder'
  | 'about';

export interface WindowState {
  id: string;
  appId: AppId;
  title: string;
  x: number;
  y: number;
  width: number;
  height: number;
  zIndex: number;
  minimized: boolean;
}
