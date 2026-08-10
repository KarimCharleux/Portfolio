import { AppId } from '../window-manager/window.model';

export interface DockAppDef {
  id: AppId;
  label: string;
  /** Key consumed by AppIconComponent to pick the right icon rendering. */
  icon: AppId;
  pinnedMobile: boolean;
}
