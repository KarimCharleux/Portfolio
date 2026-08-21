import { ChangeDetectionStrategy, Component } from '@angular/core';

/**
 * Every route in app.routes.ts needs a component/loadComponent/redirectTo/children to
 * satisfy Angular Router's own config validation (`ng serve`'s dev middleware constructs a
 * throwaway Router from the route config to enumerate paths, and that construction throws
 * NG04014 without one) — but none of these routes are ever rendered through an outlet (App
 * has none; the desktop shell always renders directly, and window/meta state is driven from
 * route `data` instead). This component exists only to satisfy that structural requirement.
 */
@Component({
  selector: 'app-route-target',
  template: '',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RouteTargetComponent {}
