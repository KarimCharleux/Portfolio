import { TranslationKey } from '../i18n/translations';

export type AppId =
  | 'notes'
  | 'vscode'
  | 'photoshop'
  | 'figma'
  | 'youtube'
  | 'safari'
  | 'finder'
  | 'messages'
  | 'terminal'
  | 'trash'
  | 'about';

export interface WindowState {
  id: string;
  appId: AppId;
  /**
   * Translation key, never a resolved string — a window opened in French must retitle
   * itself when the language toggles, and a stored string would freeze at open time.
   */
  titleKey: TranslationKey;
  x: number;
  y: number;
  width: number;
  height: number;
  zIndex: number;
  minimized: boolean;
}
