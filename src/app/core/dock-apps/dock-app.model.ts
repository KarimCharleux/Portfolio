import { AppId } from '../window-manager/window.model';
import { TranslationKey } from '../i18n/translations';

export interface DockAppDef {
  id: AppId;
  label: string;
  /** Key consumed by AppIconComponent to pick the right icon rendering. */
  icon: AppId;
  pinnedMobile: boolean;
  /** Translation key for the dock hover tooltip — the app's content heading, not its name. */
  tooltip: TranslationKey;
}
