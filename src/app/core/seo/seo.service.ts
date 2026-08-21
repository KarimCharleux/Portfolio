import { DOCUMENT } from '@angular/common';
import { Injectable, inject } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { APP_ROUTE_SLUGS } from '../window-manager/app-routes.data';
import { AppId } from '../window-manager/window.model';
import { ROUTE_SEO } from './route-seo.data';

const SITE_URL = 'https://karimagine.fr';

/**
 * Title/Meta/DOCUMENT are universal Angular services (SSR + browser) by design —
 * this must run unguarded so the *prerendered* HTML carries the right meta, which
 * is the whole point of per-route SEO.
 */
@Injectable({ providedIn: 'root' })
export class SeoService {
  readonly #document = inject(DOCUMENT);
  readonly #title = inject(Title);
  readonly #meta = inject(Meta);

  applyForRoute(appId: AppId): void {
    const entry = ROUTE_SEO[appId];
    if (!entry) return;

    this.#title.setTitle(entry.title);
    this.#meta.updateTag({ name: 'description', content: entry.description });
    this.#meta.updateTag({ property: 'og:title', content: entry.title });
    this.#meta.updateTag({ property: 'og:description', content: entry.description });
    this.#meta.updateTag({ name: 'twitter:title', content: entry.title });
    this.#meta.updateTag({ name: 'twitter:description', content: entry.description });

    const slug = APP_ROUTE_SLUGS[appId] ?? '';
    const url = `${SITE_URL}/${slug}`;
    this.#meta.updateTag({ property: 'og:url', content: url });
    this.#setCanonical(url);
  }

  #setCanonical(url: string): void {
    let link = this.#document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!link) {
      link = this.#document.createElement('link');
      link.setAttribute('rel', 'canonical');
      this.#document.head.appendChild(link);
    }
    link.setAttribute('href', url);
  }
}
