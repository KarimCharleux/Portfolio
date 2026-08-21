import { Routes } from '@angular/router';
import { AppId } from './core/window-manager/window.model';
import { APP_ROUTE_SLUGS } from './core/window-manager/app-routes.data';
import { RouteTargetComponent } from './core/window-manager/route-target.component';

// Every key besides 'about' comes from APP_ROUTE_SLUGS's own keys, so the
// slug is always defined — the cast just narrows past Partial's `| undefined`.
const appRoutes: Routes = (Object.keys(APP_ROUTE_SLUGS) as AppId[])
  .filter((appId) => appId !== 'about')
  .map((appId) => ({
    path: APP_ROUTE_SLUGS[appId] as string,
    component: RouteTargetComponent,
    data: { appId },
  }));

export const routes: Routes = [
  { path: '', component: RouteTargetComponent, data: { appId: 'about' } },
  ...appRoutes,
  { path: '**', redirectTo: '' },
];
