import './polyfills.server.mjs';
import {
  $ as mo,
  $b as Jn,
  _b as Po,
  A as Ji,
  a as no,
  Ab as Yn,
  Ac as Fo,
  B as mr,
  b as io,
  ba as go,
  Bb as hs,
  C as co,
  ca as rr,
  Cb as Ao,
  d as Xi,
  Da as To,
  da as vo,
  Db as ds,
  E as Hr,
  e as Yi,
  ea as Vn,
  Eb as fs,
  F as qt,
  f as Tt,
  Fa as Wn,
  fa as Ht,
  Fb as ps,
  G as es,
  g as et,
  Ga as as,
  ga as bo,
  Gb as Do,
  H as lo,
  h as Ut,
  Ha as os,
  Hb as Mo,
  I as uo,
  i as tt,
  Ia as nt,
  Ib as Io,
  j as se,
  Ja as _o,
  ja as rs,
  k as qr,
  ka as zn,
  L as ho,
  l as so,
  la as ns,
  Lb as ir,
  lc as Uo,
  M as ot,
  m as ao,
  Ma as wo,
  Mb as Qn,
  mc as zr,
  N as fo,
  n as Re,
  Na as So,
  na as jr,
  Nb as Lo,
  nc as ei,
  O as qe,
  o as Qi,
  Oa as cs,
  oa as $n,
  Ob as xe,
  P as Pe,
  p as rt,
  pa as Br,
  Pb as ms,
  q as oo,
  qa as Gn,
  R as we,
  r as Zi,
  ra as Ft,
  Rb as Zn,
  sa as is,
  Sb as ko,
  sb as Ro,
  sc as qo,
  T as po,
  ta as ss,
  tc as ti,
  U as Ue,
  ua as gr,
  ub as Kn,
  V as ts,
  v as tr,
  va as yo,
  Vb as Oo,
  vb as ls,
  vc as Ho,
  W as Se,
  wa as Eo,
  Wb as xo,
  wb as us,
  X as ne,
  x as fr,
  xb as Co,
  Y as Bn,
  y as pr,
  ya as Vr,
  Yb as gs,
  yb as Xn,
  Z as Fr,
  Za as No,
  Zb as vs,
  zb as nr
} from "./chunk-BHCZU76S.mjs";
import {a as re, b as ze, d as ro, h as dr} from "./chunk-VVCT4QZE.mjs";

var ni = class t {
  constructor(e) {
    this.normalizedNames = new Map, this.lazyUpdate = null, e ? typeof e == "string" ? this.lazyInit = () => {
      this.headers = new Map, e.split(`
`).forEach(i => {
        let r = i.indexOf(":");
        if (r > 0) {
          let n = i.slice(0, r), s = n.toLowerCase(), a = i.slice(r + 1).trim();
          this.maybeSetNormalizedName(n, s), this.headers.has(s) ? this.headers.get(s).push(a) : this.headers.set(s, [a])
        }
      })
    } : typeof Headers < "u" && e instanceof Headers ? (this.headers = new Map, e.forEach((i, r) => {
      this.setHeaderEntries(r, i)
    })) : this.lazyInit = () => {
      this.headers = new Map, Object.entries(e).forEach(([i, r]) => {
        this.setHeaderEntries(i, r)
      })
    } : this.headers = new Map
  }

  has(e) {
    return this.init(), this.headers.has(e.toLowerCase())
  }

  get(e) {
    this.init();
    let i = this.headers.get(e.toLowerCase());
    return i && i.length > 0 ? i[0] : null
  }

  keys() {
    return this.init(), Array.from(this.normalizedNames.values())
  }

  getAll(e) {
    return this.init(), this.headers.get(e.toLowerCase()) || null
  }

  append(e, i) {
    return this.clone({name: e, value: i, op: "a"})
  }

  set(e, i) {
    return this.clone({name: e, value: i, op: "s"})
  }

  delete(e, i) {
    return this.clone({name: e, value: i, op: "d"})
  }

  maybeSetNormalizedName(e, i) {
    this.normalizedNames.has(i) || this.normalizedNames.set(i, e)
  }

  init() {
    this.lazyInit && (this.lazyInit instanceof t ? this.copyFrom(this.lazyInit) : this.lazyInit(), this.lazyInit = null, this.lazyUpdate && (this.lazyUpdate.forEach(e => this.applyUpdate(e)), this.lazyUpdate = null))
  }

  copyFrom(e) {
    e.init(), Array.from(e.headers.keys()).forEach(i => {
      this.headers.set(i, e.headers.get(i)), this.normalizedNames.set(i, e.normalizedNames.get(i))
    })
  }

  clone(e) {
    let i = new t;
    return i.lazyInit = this.lazyInit && this.lazyInit instanceof t ? this.lazyInit : this, i.lazyUpdate = (this.lazyUpdate || []).concat([e]), i
  }

  applyUpdate(e) {
    let i = e.name.toLowerCase();
    switch (e.op) {
      case"a":
      case"s":
        let r = e.value;
        if (typeof r == "string" && (r = [r]), r.length === 0) return;
        this.maybeSetNormalizedName(e.name, i);
        let n = (e.op === "a" ? this.headers.get(i) : void 0) || [];
        n.push(...r), this.headers.set(i, n);
        break;
      case"d":
        let s = e.value;
        if (!s) this.headers.delete(i), this.normalizedNames.delete(i); else {
          let a = this.headers.get(i);
          if (!a) return;
          a = a.filter(o => s.indexOf(o) === -1), a.length === 0 ? (this.headers.delete(i), this.normalizedNames.delete(i)) : this.headers.set(i, a)
        }
        break
    }
  }

  setHeaderEntries(e, i) {
    let r = (Array.isArray(i) ? i : [i]).map(s => s.toString()), n = e.toLowerCase();
    this.headers.set(n, r), this.maybeSetNormalizedName(e, n)
  }

  forEach(e) {
    this.init(), Array.from(this.normalizedNames.keys()).forEach(i => e(this.normalizedNames.get(i), this.headers.get(i)))
  }
};
var Wo = function (t) {
  return t[t.Sent = 0] = "Sent", t[t.UploadProgress = 1] = "UploadProgress", t[t.ResponseHeader = 2] = "ResponseHeader", t[t.DownloadProgress = 3] = "DownloadProgress", t[t.Response = 4] = "Response", t[t.User = 5] = "User", t
}(Wo || {}), bs = class {
  constructor(e, i = Ko.Ok, r = "OK") {
    this.headers = e.headers || new ni, this.status = e.status !== void 0 ? e.status : i, this.statusText = e.statusText || r, this.url = e.url || null, this.ok = this.status >= 200 && this.status < 300
  }
};
var ii = class t extends bs {
  constructor(e = {}) {
    super(e), this.type = Wo.Response, this.body = e.body !== void 0 ? e.body : null
  }

  clone(e = {}) {
    return new t({
      body: e.body !== void 0 ? e.body : this.body,
      headers: e.headers || this.headers,
      status: e.status !== void 0 ? e.status : this.status,
      statusText: e.statusText || this.statusText,
      url: e.url || this.url || void 0
    })
  }
};
var Ko = function (t) {
  return t[t.Continue = 100] = "Continue", t[t.SwitchingProtocols = 101] = "SwitchingProtocols", t[t.Processing = 102] = "Processing", t[t.EarlyHints = 103] = "EarlyHints", t[t.Ok = 200] = "Ok", t[t.Created = 201] = "Created", t[t.Accepted = 202] = "Accepted", t[t.NonAuthoritativeInformation = 203] = "NonAuthoritativeInformation", t[t.NoContent = 204] = "NoContent", t[t.ResetContent = 205] = "ResetContent", t[t.PartialContent = 206] = "PartialContent", t[t.MultiStatus = 207] = "MultiStatus", t[t.AlreadyReported = 208] = "AlreadyReported", t[t.ImUsed = 226] = "ImUsed", t[t.MultipleChoices = 300] = "MultipleChoices", t[t.MovedPermanently = 301] = "MovedPermanently", t[t.Found = 302] = "Found", t[t.SeeOther = 303] = "SeeOther", t[t.NotModified = 304] = "NotModified", t[t.UseProxy = 305] = "UseProxy", t[t.Unused = 306] = "Unused", t[t.TemporaryRedirect = 307] = "TemporaryRedirect", t[t.PermanentRedirect = 308] = "PermanentRedirect", t[t.BadRequest = 400] = "BadRequest", t[t.Unauthorized = 401] = "Unauthorized", t[t.PaymentRequired = 402] = "PaymentRequired", t[t.Forbidden = 403] = "Forbidden", t[t.NotFound = 404] = "NotFound", t[t.MethodNotAllowed = 405] = "MethodNotAllowed", t[t.NotAcceptable = 406] = "NotAcceptable", t[t.ProxyAuthenticationRequired = 407] = "ProxyAuthenticationRequired", t[t.RequestTimeout = 408] = "RequestTimeout", t[t.Conflict = 409] = "Conflict", t[t.Gone = 410] = "Gone", t[t.LengthRequired = 411] = "LengthRequired", t[t.PreconditionFailed = 412] = "PreconditionFailed", t[t.PayloadTooLarge = 413] = "PayloadTooLarge", t[t.UriTooLong = 414] = "UriTooLong", t[t.UnsupportedMediaType = 415] = "UnsupportedMediaType", t[t.RangeNotSatisfiable = 416] = "RangeNotSatisfiable", t[t.ExpectationFailed = 417] = "ExpectationFailed", t[t.ImATeapot = 418] = "ImATeapot", t[t.MisdirectedRequest = 421] = "MisdirectedRequest", t[t.UnprocessableEntity = 422] = "UnprocessableEntity", t[t.Locked = 423] = "Locked", t[t.FailedDependency = 424] = "FailedDependency", t[t.TooEarly = 425] = "TooEarly", t[t.UpgradeRequired = 426] = "UpgradeRequired", t[t.PreconditionRequired = 428] = "PreconditionRequired", t[t.TooManyRequests = 429] = "TooManyRequests", t[t.RequestHeaderFieldsTooLarge = 431] = "RequestHeaderFieldsTooLarge", t[t.UnavailableForLegalReasons = 451] = "UnavailableForLegalReasons", t[t.InternalServerError = 500] = "InternalServerError", t[t.NotImplemented = 501] = "NotImplemented", t[t.BadGateway = 502] = "BadGateway", t[t.ServiceUnavailable = 503] = "ServiceUnavailable", t[t.GatewayTimeout = 504] = "GatewayTimeout", t[t.HttpVersionNotSupported = 505] = "HttpVersionNotSupported", t[t.VariantAlsoNegotiates = 506] = "VariantAlsoNegotiates", t[t.InsufficientStorage = 507] = "InsufficientStorage", t[t.LoopDetected = 508] = "LoopDetected", t[t.NotExtended = 510] = "NotExtended", t[t.NetworkAuthenticationRequired = 511] = "NetworkAuthenticationRequired", t
}(Ko || {});
var ys = new Ue("");
var jo = "b", Bo = "h", Vo = "s", zo = "st", $o = "u", Go = "rt", ri = new Ue(""), Du = ["GET", "HEAD"];

function Mu(t, e) {
  let g = ne(ri), {isCacheActive: i} = g, r = ro(g, ["isCacheActive"]), {transferCache: n, method: s} = t;
  if (!i || s === "POST" && !r.includePostRequests && !n || s !== "POST" && !Du.includes(s) || t.headers.has("authorization") || t.headers.has("proxy-authorization") || n === !1 || r.filter?.(t) === !1) return e(t);
  let a = ne(gr), o = Lu(t), d = a.get(o, null), l = r.includeHeaders;
  if (typeof n == "object" && n.includeHeaders && (l = n.includeHeaders), d) {
    let {[jo]: m, [Go]: b, [Bo]: I, [Vo]: U, [zo]: O, [$o]: Y} = d, x = m;
    switch (b) {
      case"arraybuffer":
        x = new TextEncoder().encode(m).buffer;
        break;
      case"blob":
        x = new Blob([m]);
        break
    }
    let w = new ni(I);
    return se(new ii({body: x, headers: w, status: U, statusText: O, url: Y}))
  }
  return e(t).pipe(qe(m => {
    m instanceof ii && a.set(o, {
      [jo]: m.body,
      [Bo]: Iu(m.headers, l),
      [Vo]: m.status,
      [zo]: m.statusText,
      [$o]: m.url || "",
      [Go]: t.responseType
    })
  }))
}

function Iu(t, e) {
  if (!e) return {};
  let i = {};
  for (let r of e) {
    let n = t.getAll(r);
    n !== null && (i[r] = n)
  }
  return i
}

function Lu(t) {
  let {params: e, method: i, responseType: r, url: n, body: s} = t,
    a = e.keys().sort().map(g => `${g}=${e.getAll(g)}`).join("&"),
    d = [i, r, n, typeof s == "string" ? s : "", a].join("|"), l = ku(d);
  return l
}

function ku(t) {
  let e = 0;
  for (let i of t) e = Math.imul(31, e) + i.charCodeAt(0) << 0;
  return e += 2147483648, e.toString()
}

function Xo(t) {
  return [{provide: ri, useFactory: () => (os("NgHttpTransferCache"), re({isCacheActive: !0}, t))}, {
    provide: ys,
    useValue: Mu,
    multi: !0,
    deps: [gr, ri]
  }, {
    provide: Xn, multi: !0, useFactory: () => {
      let e = ne(nr), i = ne(ri);
      return () => {
        Yn(e).then(() => {
          i.isCacheActive = !1
        })
      }
    }
  }]
}

var _s = class extends Lo {
  constructor() {
    super(...arguments), this.supportsDOMEvents = !0
  }
}, Gr = class t extends _s {
  static makeCurrent() {
    Qn(new t)
  }

  onAndCancel(e, i, r) {
    return e.addEventListener(i, r), () => {
      e.removeEventListener(i, r)
    }
  }

  dispatchEvent(e, i) {
    e.dispatchEvent(i)
  }

  remove(e) {
    e.parentNode && e.parentNode.removeChild(e)
  }

  createElement(e, i) {
    return i = i || this.getDefaultDocument(), i.createElement(e)
  }

  createHtmlDocument() {
    return document.implementation.createHTMLDocument("fakeTitle")
  }

  getDefaultDocument() {
    return document
  }

  isElementNode(e) {
    return e.nodeType === Node.ELEMENT_NODE
  }

  isShadowRoot(e) {
    return e instanceof DocumentFragment
  }

  getGlobalEventTarget(e, i) {
    return i === "window" ? window : i === "document" ? e : i === "body" ? e.body : null
  }

  getBaseHref(e) {
    let i = xu();
    return i == null ? null : Pu(i)
  }

  resetBaseElement() {
    $r = null
  }

  getUserAgent() {
    return window.navigator.userAgent
  }

  getCookie(e) {
    return ko(document.cookie, e)
  }
}, $r = null;

function xu() {
  return $r = $r || document.querySelector("base"), $r ? $r.getAttribute("href") : null
}

function Pu(t) {
  return new URL(t, document.baseURI).pathname
}

var Uu = (() => {
    let e = class e {
      build() {
        return new XMLHttpRequest
      }
    };
    e.\u0275fac = function (n) {
      return new (n || e)
    }, e.\u0275prov = we({token: e, factory: e.\u0275fac});
    let t = e;
    return t
  })(), Wr = new Ue(""), Jo = (() => {
    let e = class e {
      constructor(r, n) {
        this._zone = n, this._eventNameToPlugin = new Map, r.forEach(s => {
          s.manager = this
        }), this._plugins = r.slice().reverse()
      }

      addEventListener(r, n, s) {
        return this._findPluginFor(n).addEventListener(r, n, s)
      }

      getZone() {
        return this._zone
      }

      _findPluginFor(r) {
        let n = this._eventNameToPlugin.get(r);
        if (n) return n;
        if (n = this._plugins.find(a => a.supports(r)), !n) throw new Pe(5101, !1);
        return this._eventNameToPlugin.set(r, n), n
      }
    };
    e.\u0275fac = function (n) {
      return new (n || e)(Se(Wr), Se(nt))
    }, e.\u0275prov = we({token: e, factory: e.\u0275fac});
    let t = e;
    return t
  })(), vr = class {
    constructor(e) {
      this._doc = e
    }
  }, Es = "ng-app-id", ec = (() => {
    let e = class e {
      constructor(r, n, s, a = {}) {
        this.doc = r, this.appId = n, this.nonce = s, this.platformId = a, this.styleRef = new Map, this.hostNodes = new Set, this.styleNodesInDOM = this.collectServerRenderedStyles(), this.platformIsServer = gs(a), this.resetHostNodes()
      }

      addStyles(r) {
        for (let n of r) this.changeUsageCount(n, 1) === 1 && this.onStyleAdded(n)
      }

      removeStyles(r) {
        for (let n of r) this.changeUsageCount(n, -1) <= 0 && this.onStyleRemoved(n)
      }

      ngOnDestroy() {
        let r = this.styleNodesInDOM;
        r && (r.forEach(n => n.remove()), r.clear());
        for (let n of this.getAllStyles()) this.onStyleRemoved(n);
        this.resetHostNodes()
      }

      addHost(r) {
        this.hostNodes.add(r);
        for (let n of this.getAllStyles()) this.addStyleToHost(r, n)
      }

      removeHost(r) {
        this.hostNodes.delete(r)
      }

      getAllStyles() {
        return this.styleRef.keys()
      }

      onStyleAdded(r) {
        for (let n of this.hostNodes) this.addStyleToHost(n, r)
      }

      onStyleRemoved(r) {
        let n = this.styleRef;
        n.get(r)?.elements?.forEach(s => s.remove()), n.delete(r)
      }

      collectServerRenderedStyles() {
        let r = this.doc.head?.querySelectorAll(`style[${Es}="${this.appId}"]`);
        if (r?.length) {
          let n = new Map;
          return r.forEach(s => {
            s.textContent != null && n.set(s.textContent, s)
          }), n
        }
        return null
      }

      changeUsageCount(r, n) {
        let s = this.styleRef;
        if (s.has(r)) {
          let a = s.get(r);
          return a.usage += n, a.usage
        }
        return s.set(r, {usage: n, elements: []}), n
      }

      getStyleElement(r, n) {
        let s = this.styleNodesInDOM, a = s?.get(n);
        if (a?.parentNode === r) return s.delete(n), a.removeAttribute(Es), a;
        {
          let o = this.doc.createElement("style");
          return this.nonce && o.setAttribute("nonce", this.nonce), o.textContent = n, this.platformIsServer && o.setAttribute(Es, this.appId), r.appendChild(o), o
        }
      }

      addStyleToHost(r, n) {
        let s = this.getStyleElement(r, n), a = this.styleRef, o = a.get(n)?.elements;
        o ? o.push(s) : a.set(n, {elements: [s], usage: 1})
      }

      resetHostNodes() {
        let r = this.hostNodes;
        r.clear(), r.add(this.doc.head)
      }
    };
    e.\u0275fac = function (n) {
      return new (n || e)(Se(xe), Se(Br), Se(ss, 8), Se(Ft))
    }, e.\u0275prov = we({token: e, factory: e.\u0275fac});
    let t = e;
    return t
  })(), Ts = {
    svg: "http://www.w3.org/2000/svg",
    xhtml: "http://www.w3.org/1999/xhtml",
    xlink: "http://www.w3.org/1999/xlink",
    xml: "http://www.w3.org/XML/1998/namespace",
    xmlns: "http://www.w3.org/2000/xmlns/",
    math: "http://www.w3.org/1998/MathML/"
  }, As = /%COMP%/g, tc = "%COMP%", qu = `_nghost-${tc}`, Hu = `_ngcontent-${tc}`, Fu = !0,
  ju = new Ue("", {providedIn: "root", factory: () => Fu});

function Bu(t) {
  return Hu.replace(As, t)
}

function Vu(t) {
  return qu.replace(As, t)
}

function rc(t, e) {
  return e.map(i => i.replace(As, t))
}

var si = (() => {
  let e = class e {
    constructor(r, n, s, a, o, d, l, g = null) {
      this.eventManager = r, this.sharedStylesHost = n, this.appId = s, this.removeStylesOnCompDestroy = a, this.doc = o, this.platformId = d, this.ngZone = l, this.nonce = g, this.rendererByCompId = new Map, this.platformIsServer = gs(d), this.defaultRenderer = new Kr(r, o, l, this.platformIsServer)
    }

    createRenderer(r, n) {
      if (!r || !n) return this.defaultRenderer;
      this.platformIsServer && n.encapsulation === Fr.ShadowDom && (n = ze(re({}, n), {encapsulation: Fr.Emulated}));
      let s = this.getOrCreateRenderer(r, n);
      return s instanceof ai ? s.applyToHost(r) : s instanceof Xr && s.applyStyles(), s
    }

    getOrCreateRenderer(r, n) {
      let s = this.rendererByCompId, a = s.get(n.id);
      if (!a) {
        let o = this.doc, d = this.ngZone, l = this.eventManager, g = this.sharedStylesHost,
          m = this.removeStylesOnCompDestroy, b = this.platformIsServer;
        switch (n.encapsulation) {
          case Fr.Emulated:
            a = new ai(l, g, n, this.appId, m, o, d, b);
            break;
          case Fr.ShadowDom:
            return new ws(l, g, r, n, o, d, this.nonce, b);
          default:
            a = new Xr(l, g, n, m, o, d, b);
            break
        }
        s.set(n.id, a)
      }
      return a
    }

    ngOnDestroy() {
      this.rendererByCompId.clear()
    }
  };
  e.\u0275fac = function (n) {
    return new (n || e)(Se(Jo), Se(ec), Se(Br), Se(ju), Se(xe), Se(Ft), Se(nt), Se(ss))
  }, e.\u0275prov = we({token: e, factory: e.\u0275fac});
  let t = e;
  return t
})(), Kr = class {
  constructor(e, i, r, n) {
    this.eventManager = e, this.doc = i, this.ngZone = r, this.platformIsServer = n, this.data = Object.create(null), this.throwOnSyntheticProps = !0, this.destroyNode = null
  }

  destroy() {
  }

  createElement(e, i) {
    return i ? this.doc.createElementNS(Ts[i] || i, e) : this.doc.createElement(e)
  }

  createComment(e) {
    return this.doc.createComment(e)
  }

  createText(e) {
    return this.doc.createTextNode(e)
  }

  appendChild(e, i) {
    (Yo(e) ? e.content : e).appendChild(i)
  }

  insertBefore(e, i, r) {
    e && (Yo(e) ? e.content : e).insertBefore(i, r)
  }

  removeChild(e, i) {
    e && e.removeChild(i)
  }

  selectRootElement(e, i) {
    let r = typeof e == "string" ? this.doc.querySelector(e) : e;
    if (!r) throw new Pe(-5104, !1);
    return i || (r.textContent = ""), r
  }

  parentNode(e) {
    return e.parentNode
  }

  nextSibling(e) {
    return e.nextSibling
  }

  setAttribute(e, i, r, n) {
    if (n) {
      i = n + ":" + i;
      let s = Ts[n];
      s ? e.setAttributeNS(s, i, r) : e.setAttribute(i, r)
    } else e.setAttribute(i, r)
  }

  removeAttribute(e, i, r) {
    if (r) {
      let n = Ts[r];
      n ? e.removeAttributeNS(n, i) : e.removeAttribute(`${r}:${i}`)
    } else e.removeAttribute(i)
  }

  addClass(e, i) {
    e.classList.add(i)
  }

  removeClass(e, i) {
    e.classList.remove(i)
  }

  setStyle(e, i, r, n) {
    n & (Vr.DashCase | Vr.Important) ? e.style.setProperty(i, r, n & Vr.Important ? "important" : "") : e.style[i] = r
  }

  removeStyle(e, i, r) {
    r & Vr.DashCase ? e.style.removeProperty(i) : e.style[i] = ""
  }

  setProperty(e, i, r) {
    e != null && (e[i] = r)
  }

  setValue(e, i) {
    e.nodeValue = i
  }

  listen(e, i, r) {
    if (typeof e == "string" && (e = ir().getGlobalEventTarget(this.doc, e), !e)) throw new Error(`Unsupported event target ${e} for event ${i}`);
    return this.eventManager.addEventListener(e, i, this.decoratePreventDefault(r))
  }

  decoratePreventDefault(e) {
    return i => {
      if (i === "__ngUnwrap__") return e;
      (this.platformIsServer ? this.ngZone.runGuarded(() => e(i)) : e(i)) === !1 && i.preventDefault()
    }
  }
};

function Yo(t) {
  return t.tagName === "TEMPLATE" && t.content !== void 0
}

var ws = class extends Kr {
  constructor(e, i, r, n, s, a, o, d) {
    super(e, s, a, d), this.sharedStylesHost = i, this.hostEl = r, this.shadowRoot = r.attachShadow({mode: "open"}), this.sharedStylesHost.addHost(this.shadowRoot);
    let l = rc(n.id, n.styles);
    for (let g of l) {
      let m = document.createElement("style");
      o && m.setAttribute("nonce", o), m.textContent = g, this.shadowRoot.appendChild(m)
    }
  }

  nodeOrShadowRoot(e) {
    return e === this.hostEl ? this.shadowRoot : e
  }

  appendChild(e, i) {
    return super.appendChild(this.nodeOrShadowRoot(e), i)
  }

  insertBefore(e, i, r) {
    return super.insertBefore(this.nodeOrShadowRoot(e), i, r)
  }

  removeChild(e, i) {
    return super.removeChild(this.nodeOrShadowRoot(e), i)
  }

  parentNode(e) {
    return this.nodeOrShadowRoot(super.parentNode(this.nodeOrShadowRoot(e)))
  }

  destroy() {
    this.sharedStylesHost.removeHost(this.shadowRoot)
  }
}, Xr = class extends Kr {
  constructor(e, i, r, n, s, a, o, d) {
    super(e, s, a, o), this.sharedStylesHost = i, this.removeStylesOnCompDestroy = n, this.styles = d ? rc(d, r.styles) : r.styles
  }

  applyStyles() {
    this.sharedStylesHost.addStyles(this.styles)
  }

  destroy() {
    this.removeStylesOnCompDestroy && this.sharedStylesHost.removeStyles(this.styles)
  }
}, ai = class extends Xr {
  constructor(e, i, r, n, s, a, o, d) {
    let l = n + "-" + r.id;
    super(e, i, r, s, a, o, d, l), this.contentAttr = Bu(l), this.hostAttr = Vu(l)
  }

  applyToHost(e) {
    this.applyStyles(), this.setAttribute(e, this.hostAttr, "")
  }

  createElement(e, i) {
    let r = super.createElement(e, i);
    return super.setAttribute(r, this.contentAttr, ""), r
  }
}, zu = (() => {
  let e = class e extends vr {
    constructor(r) {
      super(r)
    }

    supports(r) {
      return !0
    }

    addEventListener(r, n, s) {
      return r.addEventListener(n, s, !1), () => this.removeEventListener(r, n, s)
    }

    removeEventListener(r, n, s) {
      return r.removeEventListener(n, s)
    }
  };
  e.\u0275fac = function (n) {
    return new (n || e)(Se(xe))
  }, e.\u0275prov = we({token: e, factory: e.\u0275fac});
  let t = e;
  return t
})(), Qo = ["alt", "control", "meta", "shift"], $u = {
  "\b": "Backspace",
  "	": "Tab",
  "\x7F": "Delete",
  "\x1B": "Escape",
  Del: "Delete",
  Esc: "Escape",
  Left: "ArrowLeft",
  Right: "ArrowRight",
  Up: "ArrowUp",
  Down: "ArrowDown",
  Menu: "ContextMenu",
  Scroll: "ScrollLock",
  Win: "OS"
}, Gu = {alt: t => t.altKey, control: t => t.ctrlKey, meta: t => t.metaKey, shift: t => t.shiftKey}, Wu = (() => {
  let e = class e extends vr {
    constructor(r) {
      super(r)
    }


    static parseEventName(r) {
      let n = r.toLowerCase().split("."), s = n.shift();
      if (n.length === 0 || !(s === "keydown" || s === "keyup")) return null;
      let a = e._normalizeKey(n.pop()), o = "", d = n.indexOf("code");
      if (d > -1 && (n.splice(d, 1), o = "code."), Qo.forEach(g => {
        let m = n.indexOf(g);
        m > -1 && (n.splice(m, 1), o += g + ".")
      }), o += a, n.length != 0 || a.length === 0) return null;
      let l = {};
      return l.domEventName = s, l.fullKey = o, l
    }

    static matchEventFullKeyCode(r, n) {
      let s = $u[r.key] || r.key, a = "";
      return n.indexOf("code.") > -1 && (s = r.code, a = "code."), s == null || !s ? !1 : (s = s.toLowerCase(), s === " " ? s = "space" : s === "." && (s = "dot"), Qo.forEach(o => {
        if (o !== s) {
          let d = Gu[o];
          d(r) && (a += o + ".")
        }
      }), a += s, a === n)
    }

    static eventCallback(r, n, s) {
      return a => {
        e.matchEventFullKeyCode(a, r) && s.runGuarded(() => n(a))
      }
    }

    static _normalizeKey(r) {
      return r === "esc" ? "escape" : r
    }

    supports(r) {
      return e.parseEventName(r) != null
    }

    addEventListener(r, n, s) {
      let a = e.parseEventName(n), o = e.eventCallback(a.fullKey, s, this.manager.getZone());
      return this.manager.getZone().runOutsideAngular(() => ir().onAndCancel(r, a.domEventName, o))
    }
  };
  e.\u0275fac = function (n) {
    return new (n || e)(Se(xe))
  }, e.\u0275prov = we({token: e, factory: e.\u0275fac});
  let t = e;
  return t
})();

function dp(t, e) {
  return Do(re({rootComponent: t}, Ku(e)))
}

function Ku(t) {
  return {appProviders: [...Ju, ...t?.providers ?? []], platformProviders: Zu}
}

function Xu() {
  Gr.makeCurrent()
}

function Yu() {
  return new ns
}

function Qu() {
  return $n(document), document
}

var Zu = [{provide: Ft, useValue: Oo}, {provide: Gn, useValue: Xu, multi: !0}, {provide: xe, useFactory: Qu, deps: []}];
var Ju = [{provide: vo, useValue: "root"}, {provide: ns, useFactory: Yu, deps: []}, {
  provide: Wr,
  useClass: zu,
  multi: !0,
  deps: [xe, nt, Ft]
}, {provide: Wr, useClass: Wu, multi: !0, deps: [xe]}, si, ec, Jo, {provide: Wn, useExisting: si}, {
  provide: Jn,
  useClass: Uu,
  deps: []
}, []];
var nc = (() => {
  let e = class e {
    constructor(r) {
      this._doc = r
    }

    getTitle() {
      return this._doc.title
    }

    setTitle(r) {
      this._doc.title = r || ""
    }
  };
  e.\u0275fac = function (n) {
    return new (n || e)(Se(xe))
  }, e.\u0275prov = we({token: e, factory: e.\u0275fac, providedIn: "root"});
  let t = e;
  return t
})();
var Ss = function (t) {
  return t[t.NoHttpTransferCache = 0] = "NoHttpTransferCache", t[t.HttpTransferCacheOptions = 1] = "HttpTransferCacheOptions", t
}(Ss || {});

function fp(...t) {
  let e = [], i = new Set, r = i.has(Ss.HttpTransferCacheOptions);
  for (let {\u0275providers: n, \u0275kind: s} of t) i.add(s), n.length && e.push(n);
  return rr([[], Mo(), i.has(Ss.NoHttpTransferCache) || r ? [] : Xo({}), e])
}

var rh = (() => {
  let e = class e extends ti {
    constructor(r, n, s) {
      super(r, n, s, ne(To, {optional: !0}))
    }

    ngOnDestroy() {
      this.flush()
    }
  };
  e.\u0275fac = function (n) {
    return new (n || e)(Se(xe), Se(zr), Se(ei))
  }, e.\u0275prov = we({token: e, factory: e.\u0275fac});
  let t = e;
  return t
})();

function nh() {
  return new qo
}

function ih(t, e, i) {
  return new Fo(t, e, i)
}

var ic = [{provide: ei, useFactory: nh}, {provide: ti, useClass: rh}, {
    provide: Wn,
    useFactory: ih,
    deps: [si, ti, nt]
  }], wp = [{provide: zr, useFactory: () => new Ho}, {provide: is, useValue: "BrowserAnimations"}, ...ic],
  sh = [{provide: zr, useClass: Uo}, {provide: is, useValue: "NoopAnimations"}, ...ic];

function sc() {
  return [...sh]
}

var ah = Object.getOwnPropertyNames, Z = (t, e) => function () {
  return e || (0, t[ah(t)[0]])((e = {exports: {}}).exports, e), e.exports
}, Yr = Z({
  "external/npm/node_modules/domino/lib/Event.js"(t, e) {
    "use strict";
    e.exports = i, i.CAPTURING_PHASE = 1, i.AT_TARGET = 2, i.BUBBLING_PHASE = 3;

    function i(r, n) {
      if (this.type = "", this.target = null, this.currentTarget = null, this.eventPhase = i.AT_TARGET, this.bubbles = !1, this.cancelable = !1, this.isTrusted = !1, this.defaultPrevented = !1, this.timeStamp = Date.now(), this._propagationStopped = !1, this._immediatePropagationStopped = !1, this._initialized = !0, this._dispatching = !1, r && (this.type = r), n) for (var s in n) this[s] = n[s]
    }

    i.prototype = Object.create(Object.prototype, {
      constructor: {value: i}, stopPropagation: {
        value: function () {
          this._propagationStopped = !0
        }
      }, stopImmediatePropagation: {
        value: function () {
          this._propagationStopped = !0, this._immediatePropagationStopped = !0
        }
      }, preventDefault: {
        value: function () {
          this.cancelable && (this.defaultPrevented = !0)
        }
      }, initEvent: {
        value: function (n, s, a) {
          this._initialized = !0, !this._dispatching && (this._propagationStopped = !1, this._immediatePropagationStopped = !1, this.defaultPrevented = !1, this.isTrusted = !1, this.target = null, this.type = n, this.bubbles = s, this.cancelable = a)
        }
      }
    })
  }
}), ac = Z({
  "external/npm/node_modules/domino/lib/UIEvent.js"(t, e) {
    "use strict";
    var i = Yr();
    e.exports = r;

    function r() {
      i.call(this), this.view = null, this.detail = 0
    }

    r.prototype = Object.create(i.prototype, {
      constructor: {value: r}, initUIEvent: {
        value: function (n, s, a, o, d) {
          this.initEvent(n, s, a), this.view = o, this.detail = d
        }
      }
    })
  }
}), oc = Z({
  "external/npm/node_modules/domino/lib/MouseEvent.js"(t, e) {
    "use strict";
    var i = ac();
    e.exports = r;

    function r() {
      i.call(this), this.screenX = this.screenY = this.clientX = this.clientY = 0, this.ctrlKey = this.altKey = this.shiftKey = this.metaKey = !1, this.button = 0, this.buttons = 1, this.relatedTarget = null
    }

    r.prototype = Object.create(i.prototype, {
      constructor: {value: r},
      initMouseEvent: {
        value: function (n, s, a, o, d, l, g, m, b, I, U, O, Y, x, w) {
          switch (this.initEvent(n, s, a, o, d), this.screenX = l, this.screenY = g, this.clientX = m, this.clientY = b, this.ctrlKey = I, this.altKey = U, this.shiftKey = O, this.metaKey = Y, this.button = x, x) {
            case 0:
              this.buttons = 1;
              break;
            case 1:
              this.buttons = 4;
              break;
            case 2:
              this.buttons = 2;
              break;
            default:
              this.buttons = 0;
              break
          }
          this.relatedTarget = w
        }
      },
      getModifierState: {
        value: function (n) {
          switch (n) {
            case"Alt":
              return this.altKey;
            case"Control":
              return this.ctrlKey;
            case"Shift":
              return this.shiftKey;
            case"Meta":
              return this.metaKey;
            default:
              return !1
          }
        }
      }
    })
  }
}), Is = Z({
  "external/npm/node_modules/domino/lib/DOMException.js"(t, e) {
    "use strict";
    e.exports = A;
    var i = 1, r = 3, n = 4, s = 5, a = 7, o = 8, d = 9, l = 11, g = 12, m = 13, b = 14, I = 15, U = 17, O = 18, Y = 19,
      x = 20, w = 21, T = 22, N = 23, y = 24, ce = 25,
      de = [null, "INDEX_SIZE_ERR", null, "HIERARCHY_REQUEST_ERR", "WRONG_DOCUMENT_ERR", "INVALID_CHARACTER_ERR", null, "NO_MODIFICATION_ALLOWED_ERR", "NOT_FOUND_ERR", "NOT_SUPPORTED_ERR", "INUSE_ATTRIBUTE_ERR", "INVALID_STATE_ERR", "SYNTAX_ERR", "INVALID_MODIFICATION_ERR", "NAMESPACE_ERR", "INVALID_ACCESS_ERR", null, "TYPE_MISMATCH_ERR", "SECURITY_ERR", "NETWORK_ERR", "ABORT_ERR", "URL_MISMATCH_ERR", "QUOTA_EXCEEDED_ERR", "TIMEOUT_ERR", "INVALID_NODE_TYPE_ERR", "DATA_CLONE_ERR"],
      Ae = [null, "INDEX_SIZE_ERR (1): the index is not in the allowed range", null, "HIERARCHY_REQUEST_ERR (3): the operation would yield an incorrect nodes model", "WRONG_DOCUMENT_ERR (4): the object is in the wrong Document, a call to importNode is required", "INVALID_CHARACTER_ERR (5): the string contains invalid characters", null, "NO_MODIFICATION_ALLOWED_ERR (7): the object can not be modified", "NOT_FOUND_ERR (8): the object can not be found here", "NOT_SUPPORTED_ERR (9): this operation is not supported", "INUSE_ATTRIBUTE_ERR (10): setAttributeNode called on owned Attribute", "INVALID_STATE_ERR (11): the object is in an invalid state", "SYNTAX_ERR (12): the string did not match the expected pattern", "INVALID_MODIFICATION_ERR (13): the object can not be modified in this way", "NAMESPACE_ERR (14): the operation is not allowed by Namespaces in XML", "INVALID_ACCESS_ERR (15): the object does not support the operation or argument", null, "TYPE_MISMATCH_ERR (17): the type of the object does not match the expected type", "SECURITY_ERR (18): the operation is insecure", "NETWORK_ERR (19): a network error occurred", "ABORT_ERR (20): the user aborted an operation", "URL_MISMATCH_ERR (21): the given URL does not match another URL", "QUOTA_EXCEEDED_ERR (22): the quota has been exceeded", "TIMEOUT_ERR (23): a timeout occurred", "INVALID_NODE_TYPE_ERR (24): the supplied node is invalid or has an invalid ancestor for this operation", "DATA_CLONE_ERR (25): the object can not be cloned."],
      j = {
        INDEX_SIZE_ERR: i,
        DOMSTRING_SIZE_ERR: 2,
        HIERARCHY_REQUEST_ERR: r,
        WRONG_DOCUMENT_ERR: n,
        INVALID_CHARACTER_ERR: s,
        NO_DATA_ALLOWED_ERR: 6,
        NO_MODIFICATION_ALLOWED_ERR: a,
        NOT_FOUND_ERR: o,
        NOT_SUPPORTED_ERR: d,
        INUSE_ATTRIBUTE_ERR: 10,
        INVALID_STATE_ERR: l,
        SYNTAX_ERR: g,
        INVALID_MODIFICATION_ERR: m,
        NAMESPACE_ERR: b,
        INVALID_ACCESS_ERR: I,
        VALIDATION_ERR: 16,
        TYPE_MISMATCH_ERR: U,
        SECURITY_ERR: O,
        NETWORK_ERR: Y,
        ABORT_ERR: x,
        URL_MISMATCH_ERR: w,
        QUOTA_EXCEEDED_ERR: T,
        TIMEOUT_ERR: N,
        INVALID_NODE_TYPE_ERR: y,
        DATA_CLONE_ERR: ce
      };

    function A(p) {
      Error.call(this), Error.captureStackTrace(this, this.constructor), this.code = p, this.message = Ae[p], this.name = de[p]
    }

    A.prototype.__proto__ = Error.prototype;
    for (K in j) P = {value: j[K]}, Object.defineProperty(A, K, P), Object.defineProperty(A.prototype, K, P);
    var P, K
  }
}), Ls = Z({
  "external/npm/node_modules/domino/lib/config.js"(t) {
    t.isApiWritable = !globalThis.__domino_frozen__
  }
}), Oe = Z({
  "external/npm/node_modules/domino/lib/utils.js"(t) {
    "use strict";
    var e = Is(), i = e, r = Ls().isApiWritable;
    t.NAMESPACE = {
      HTML: "http://www.w3.org/1999/xhtml",
      XML: "http://www.w3.org/XML/1998/namespace",
      XMLNS: "http://www.w3.org/2000/xmlns/",
      MATHML: "http://www.w3.org/1998/Math/MathML",
      SVG: "http://www.w3.org/2000/svg",
      XLINK: "http://www.w3.org/1999/xlink"
    }, t.IndexSizeError = function () {
      throw new e(i.INDEX_SIZE_ERR)
    }, t.HierarchyRequestError = function () {
      throw new e(i.HIERARCHY_REQUEST_ERR)
    }, t.WrongDocumentError = function () {
      throw new e(i.WRONG_DOCUMENT_ERR)
    }, t.InvalidCharacterError = function () {
      throw new e(i.INVALID_CHARACTER_ERR)
    }, t.NoModificationAllowedError = function () {
      throw new e(i.NO_MODIFICATION_ALLOWED_ERR)
    }, t.NotFoundError = function () {
      throw new e(i.NOT_FOUND_ERR)
    }, t.NotSupportedError = function () {
      throw new e(i.NOT_SUPPORTED_ERR)
    }, t.InvalidStateError = function () {
      throw new e(i.INVALID_STATE_ERR)
    }, t.SyntaxError = function () {
      throw new e(i.SYNTAX_ERR)
    }, t.InvalidModificationError = function () {
      throw new e(i.INVALID_MODIFICATION_ERR)
    }, t.NamespaceError = function () {
      throw new e(i.NAMESPACE_ERR)
    }, t.InvalidAccessError = function () {
      throw new e(i.INVALID_ACCESS_ERR)
    }, t.TypeMismatchError = function () {
      throw new e(i.TYPE_MISMATCH_ERR)
    }, t.SecurityError = function () {
      throw new e(i.SECURITY_ERR)
    }, t.NetworkError = function () {
      throw new e(i.NETWORK_ERR)
    }, t.AbortError = function () {
      throw new e(i.ABORT_ERR)
    }, t.UrlMismatchError = function () {
      throw new e(i.URL_MISMATCH_ERR)
    }, t.QuotaExceededError = function () {
      throw new e(i.QUOTA_EXCEEDED_ERR)
    }, t.TimeoutError = function () {
      throw new e(i.TIMEOUT_ERR)
    }, t.InvalidNodeTypeError = function () {
      throw new e(i.INVALID_NODE_TYPE_ERR)
    }, t.DataCloneError = function () {
      throw new e(i.DATA_CLONE_ERR)
    }, t.nyi = function () {
      throw new Error("NotYetImplemented")
    }, t.shouldOverride = function () {
      throw new Error("Abstract function; should be overriding in subclass.")
    }, t.assert = function (n, s) {
      if (!n) throw new Error("Assertion failed: " + (s || "") + `
` + new Error().stack)
    }, t.expose = function (n, s) {
      for (var a in n) Object.defineProperty(s.prototype, a, {value: n[a], writable: r})
    }, t.merge = function (n, s) {
      for (var a in s) n[a] = s[a]
    }, t.documentOrder = function (n, s) {
      return 3 - (n.compareDocumentPosition(s) & 6)
    }, t.toASCIILowerCase = function (n) {
      return n.replace(/[A-Z]+/g, function (s) {
        return s.toLowerCase()
      })
    }, t.toASCIIUpperCase = function (n) {
      return n.replace(/[a-z]+/g, function (s) {
        return s.toUpperCase()
      })
    }
  }
}), cc = Z({
  "external/npm/node_modules/domino/lib/EventTarget.js"(t, e) {
    "use strict";
    var i = Yr(), r = oc(), n = Oe();
    e.exports = s;

    function s() {
    }

    s.prototype = {
      addEventListener: function (o, d, l) {
        if (d) {
          l === void 0 && (l = !1), this._listeners || (this._listeners = Object.create(null)), this._listeners[o] || (this._listeners[o] = []);
          for (var g = this._listeners[o], m = 0, b = g.length; m < b; m++) {
            var I = g[m];
            if (I.listener === d && I.capture === l) return
          }
          var U = {listener: d, capture: l};
          typeof d == "function" && (U.f = d), g.push(U)
        }
      }, removeEventListener: function (o, d, l) {
        if (l === void 0 && (l = !1), this._listeners) {
          var g = this._listeners[o];
          if (g) for (var m = 0, b = g.length; m < b; m++) {
            var I = g[m];
            if (I.listener === d && I.capture === l) {
              g.length === 1 ? this._listeners[o] = void 0 : g.splice(m, 1);
              return
            }
          }
        }
      }, dispatchEvent: function (o) {
        return this._dispatchEvent(o, !1)
      }, _dispatchEvent: function (o, d) {
        typeof d != "boolean" && (d = !1);

        function l(O, Y) {
          var x = Y.type, w = Y.eventPhase;
          if (Y.currentTarget = O, w !== i.CAPTURING_PHASE && O._handlers && O._handlers[x]) {
            var T = O._handlers[x], N;
            if (typeof T == "function") N = T.call(Y.currentTarget, Y); else {
              var y = T.handleEvent;
              if (typeof y != "function") throw new TypeError("handleEvent property of event handler object isnot a function.");
              N = y.call(T, Y)
            }
            switch (Y.type) {
              case"mouseover":
                N === !0 && Y.preventDefault();
                break;
              case"beforeunload":
              default:
                N === !1 && Y.preventDefault();
                break
            }
          }
          var ce = O._listeners && O._listeners[x];
          if (ce) {
            ce = ce.slice();
            for (var de = 0, Ae = ce.length; de < Ae; de++) {
              if (Y._immediatePropagationStopped) return;
              var j = ce[de];
              if (!(w === i.CAPTURING_PHASE && !j.capture || w === i.BUBBLING_PHASE && j.capture)) if (j.f) j.f.call(Y.currentTarget, Y); else {
                var A = j.listener.handleEvent;
                if (typeof A != "function") throw new TypeError("handleEvent property of event listener object is not a function.");
                A.call(j.listener, Y)
              }
            }
          }
        }

        (!o._initialized || o._dispatching) && n.InvalidStateError(), o.isTrusted = d, o._dispatching = !0, o.target = this;
        for (var g = [], m = this.parentNode; m; m = m.parentNode) g.push(m);
        o.eventPhase = i.CAPTURING_PHASE;
        for (var b = g.length - 1; b >= 0 && (l(g[b], o), !o._propagationStopped); b--) ;
        if (o._propagationStopped || (o.eventPhase = i.AT_TARGET, l(this, o)), o.bubbles && !o._propagationStopped) {
          o.eventPhase = i.BUBBLING_PHASE;
          for (var I = 0, U = g.length; I < U && (l(g[I], o), !o._propagationStopped); I++) ;
        }
        if (o._dispatching = !1, o.eventPhase = i.AT_TARGET, o.currentTarget = null, d && !o.defaultPrevented && o instanceof r) switch (o.type) {
          case"mousedown":
            this._armed = {x: o.clientX, y: o.clientY, t: o.timeStamp};
            break;
          case"mouseout":
          case"mouseover":
            this._armed = null;
            break;
          case"mouseup":
            this._isClick(o) && this._doClick(o), this._armed = null;
            break
        }
        return !o.defaultPrevented
      }, _isClick: function (a) {
        return this._armed !== null && a.type === "mouseup" && a.isTrusted && a.button === 0 && a.timeStamp - this._armed.t < 1e3 && Math.abs(a.clientX - this._armed.x) < 10 && Math.abs(a.clientY - this._armed.Y) < 10
      }, _doClick: function (a) {
        if (!this._click_in_progress) {
          this._click_in_progress = !0;
          for (var o = this; o && !o._post_click_activation_steps;) o = o.parentNode;
          o && o._pre_click_activation_steps && o._pre_click_activation_steps();
          var d = this.ownerDocument.createEvent("MouseEvent");
          d.initMouseEvent("click", !0, !0, this.ownerDocument.defaultView, 1, a.screenX, a.screenY, a.clientX, a.clientY, a.ctrlKey, a.altKey, a.shiftKey, a.metaKey, a.button, null);
          var l = this._dispatchEvent(d, !0);
          o && (l ? o._post_click_activation_steps && o._post_click_activation_steps(d) : o._cancelled_activation_steps && o._cancelled_activation_steps())
        }
      }, _setEventHandler: function (o, d) {
        this._handlers || (this._handlers = Object.create(null)), this._handlers[o] = d
      }, _getEventHandler: function (o) {
        return this._handlers && this._handlers[o] || null
      }
    }
  }
}), lc = Z({
  "external/npm/node_modules/domino/lib/LinkedList.js"(t, e) {
    "use strict";
    var i = Oe(), r = e.exports = {
      valid: function (n) {
        return i.assert(n, "list falsy"), i.assert(n._previousSibling, "previous falsy"), i.assert(n._nextSibling, "next falsy"), !0
      }, insertBefore: function (n, s) {
        i.assert(r.valid(n) && r.valid(s));
        var a = n, o = n._previousSibling, d = s, l = s._previousSibling;
        a._previousSibling = l, o._nextSibling = d, l._nextSibling = a, d._previousSibling = o, i.assert(r.valid(n) && r.valid(s))
      }, replace: function (n, s) {
        i.assert(r.valid(n) && (s === null || r.valid(s))), s !== null && r.insertBefore(s, n), r.remove(n), i.assert(r.valid(n) && (s === null || r.valid(s)))
      }, remove: function (n) {
        i.assert(r.valid(n));
        var s = n._previousSibling;
        if (s !== n) {
          var a = n._nextSibling;
          s._nextSibling = a, a._previousSibling = s, n._previousSibling = n._nextSibling = n, i.assert(r.valid(n))
        }
      }
    }
  }
}), uc = Z({
  "external/npm/node_modules/domino/lib/NodeUtils.js"(t, e) {
    "use strict";
    e.exports = {
      serializeOne: Y,
      \u0275escapeMatchingClosingTag: b,
      \u0275escapeClosingCommentTag: U,
      \u0275escapeProcessingInstructionContent: O
    };
    var i = Oe(), r = i.NAMESPACE,
      n = {STYLE: !0, SCRIPT: !0, XMP: !0, IFRAME: !0, NOEMBED: !0, NOFRAMES: !0, PLAINTEXT: !0}, s = {
        area: !0,
        base: !0,
        basefont: !0,
        bgsound: !0,
        br: !0,
        col: !0,
        embed: !0,
        frame: !0,
        hr: !0,
        img: !0,
        input: !0,
        keygen: !0,
        link: !0,
        meta: !0,
        param: !0,
        source: !0,
        track: !0,
        wbr: !0
      }, a = {}, o = /[&<>\u00A0]/g, d = /[&"<>\u00A0]/g;

    function l(x) {
      return o.test(x) ? x.replace(o, w => {
        switch (w) {
          case"&":
            return "&amp;";
          case"<":
            return "&lt;";
          case">":
            return "&gt;";
          case"\xA0":
            return "&nbsp;"
        }
      }) : x
    }

    function g(x) {
      return d.test(x) ? x.replace(d, w => {
        switch (w) {
          case"<":
            return "&lt;";
          case">":
            return "&gt;";
          case"&":
            return "&amp;";
          case'"':
            return "&quot;";
          case"\xA0":
            return "&nbsp;"
        }
      }) : x
    }

    function m(x) {
      var w = x.namespaceURI;
      return w ? w === r.XML ? "xml:" + x.localName : w === r.XLINK ? "xlink:" + x.localName : w === r.XMLNS ? x.localName === "xmlns" ? "xmlns" : "xmlns:" + x.localName : x.name : x.localName
    }

    function b(x, w) {
      let T = "</" + w;
      if (!x.toLowerCase().includes(T)) return x;
      let N = [...x], y = x.matchAll(new RegExp(T, "ig"));
      for (let ce of y) N[ce.index] = "&lt;";
      return N.join("")
    }

    var I = /--!?>/;

    function U(x) {
      return I.test(x) ? x.replace(/(--\!?)>/g, "$1&gt;") : x
    }

    function O(x) {
      return x.includes(">") ? x.replaceAll(">", "&gt;") : x
    }

    function Y(x, w) {
      var T = "";
      switch (x.nodeType) {
        case 1:
          var N = x.namespaceURI, y = N === r.HTML, ce = y || N === r.SVG || N === r.MATHML ? x.localName : x.tagName;
          T += "<" + ce;
          for (var de = 0, Ae = x._numattrs; de < Ae; de++) {
            var j = x._attr(de);
            T += " " + m(j), j.value !== void 0 && (T += '="' + g(j.value) + '"')
          }
          if (T += ">", !(y && s[ce])) {
            var A = x.serialize();
            n[ce.toUpperCase()] && (A = b(A, ce)), y && a[ce] && A.charAt(0) === `
` && (T += `
`), T += A, T += "</" + ce + ">"
          }
          break;
        case 3:
        case 4:
          var P;
          w.nodeType === 1 && w.namespaceURI === r.HTML ? P = w.tagName : P = "", n[P] || P === "NOSCRIPT" && w.ownerDocument._scripting_enabled ? T += x.data : T += l(x.data);
          break;
        case 8:
          T += "<!--" + U(x.data) + "-->";
          break;
        case 7:
          let K = O(x.data);
          T += "<?" + x.target + " " + K + "?>";
          break;
        case 10:
          T += "<!DOCTYPE " + x.name, T += ">";
          break;
        default:
          i.InvalidStateError()
      }
      return T
    }
  }
}), Be = Z({
  "external/npm/node_modules/domino/lib/Node.js"(t, e) {
    "use strict";
    e.exports = a;
    var i = cc(), r = lc(), n = uc(), s = Oe();

    function a() {
      i.call(this), this.parentNode = null, this._nextSibling = this._previousSibling = this, this._index = void 0
    }

    var o = a.ELEMENT_NODE = 1, d = a.ATTRIBUTE_NODE = 2, l = a.TEXT_NODE = 3, g = a.CDATA_SECTION_NODE = 4,
      m = a.ENTITY_REFERENCE_NODE = 5, b = a.ENTITY_NODE = 6, I = a.PROCESSING_INSTRUCTION_NODE = 7,
      U = a.COMMENT_NODE = 8, O = a.DOCUMENT_NODE = 9, Y = a.DOCUMENT_TYPE_NODE = 10, x = a.DOCUMENT_FRAGMENT_NODE = 11,
      w = a.NOTATION_NODE = 12, T = a.DOCUMENT_POSITION_DISCONNECTED = 1, N = a.DOCUMENT_POSITION_PRECEDING = 2,
      y = a.DOCUMENT_POSITION_FOLLOWING = 4, ce = a.DOCUMENT_POSITION_CONTAINS = 8,
      de = a.DOCUMENT_POSITION_CONTAINED_BY = 16, Ae = a.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC = 32;
    a.prototype = Object.create(i.prototype, {
      baseURI: {get: s.nyi},
      parentElement: {
        get: function () {
          return this.parentNode && this.parentNode.nodeType === o ? this.parentNode : null
        }
      },
      hasChildNodes: {value: s.shouldOverride},
      firstChild: {get: s.shouldOverride},
      lastChild: {get: s.shouldOverride},
      isConnected: {
        get: function () {
          let j = this;
          for (; j != null;) {
            if (j.nodeType === a.DOCUMENT_NODE) return !0;
            j = j.parentNode, j != null && j.nodeType === a.DOCUMENT_FRAGMENT_NODE && (j = j.host)
          }
          return !1
        }
      },
      previousSibling: {
        get: function () {
          var j = this.parentNode;
          return !j || this === j.firstChild ? null : this._previousSibling
        }
      },
      nextSibling: {
        get: function () {
          var j = this.parentNode, A = this._nextSibling;
          return !j || A === j.firstChild ? null : A
        }
      },
      textContent: {
        get: function () {
          return null
        }, set: function (j) {
        }
      },
      innerText: {
        get: function () {
          return null
        }, set: function (j) {
        }
      },
      _countChildrenOfType: {
        value: function (j) {
          for (var A = 0, P = this.firstChild; P !== null; P = P.nextSibling) P.nodeType === j && A++;
          return A
        }
      },
      _ensureInsertValid: {
        value: function (A, P, K) {
          var p = this, f, h;
          if (!A.nodeType) throw new TypeError("not a node");
          switch (p.nodeType) {
            case O:
            case x:
            case o:
              break;
            default:
              s.HierarchyRequestError()
          }
          switch (A.isAncestor(p) && s.HierarchyRequestError(), (P !== null || !K) && P.parentNode !== p && s.NotFoundError(), A.nodeType) {
            case x:
            case Y:
            case o:
            case l:
            case I:
            case U:
              break;
            default:
              s.HierarchyRequestError()
          }
          if (p.nodeType === O) switch (A.nodeType) {
            case l:
              s.HierarchyRequestError();
              break;
            case x:
              switch (A._countChildrenOfType(l) > 0 && s.HierarchyRequestError(), A._countChildrenOfType(o)) {
                case 0:
                  break;
                case 1:
                  if (P !== null) for (K && P.nodeType === Y && s.HierarchyRequestError(), h = P.nextSibling; h !== null; h = h.nextSibling) h.nodeType === Y && s.HierarchyRequestError();
                  f = p._countChildrenOfType(o), K ? f > 0 && s.HierarchyRequestError() : (f > 1 || f === 1 && P.nodeType !== o) && s.HierarchyRequestError();
                  break;
                default:
                  s.HierarchyRequestError()
              }
              break;
            case o:
              if (P !== null) for (K && P.nodeType === Y && s.HierarchyRequestError(), h = P.nextSibling; h !== null; h = h.nextSibling) h.nodeType === Y && s.HierarchyRequestError();
              f = p._countChildrenOfType(o), K ? f > 0 && s.HierarchyRequestError() : (f > 1 || f === 1 && P.nodeType !== o) && s.HierarchyRequestError();
              break;
            case Y:
              if (P === null) p._countChildrenOfType(o) && s.HierarchyRequestError(); else for (h = p.firstChild; h !== null && h !== P; h = h.nextSibling) h.nodeType === o && s.HierarchyRequestError();
              f = p._countChildrenOfType(Y), K ? f > 0 && s.HierarchyRequestError() : (f > 1 || f === 1 && P.nodeType !== Y) && s.HierarchyRequestError();
              break
          } else A.nodeType === Y && s.HierarchyRequestError()
        }
      },
      insertBefore: {
        value: function (A, P) {
          var K = this;
          K._ensureInsertValid(A, P, !0);
          var p = P;
          return p === A && (p = A.nextSibling), K.doc.adoptNode(A), A._insertOrReplace(K, p, !1), A
        }
      },
      appendChild: {
        value: function (j) {
          return this.insertBefore(j, null)
        }
      },
      _appendChild: {
        value: function (j) {
          j._insertOrReplace(this, null, !1)
        }
      },
      removeChild: {
        value: function (A) {
          var P = this;
          if (!A.nodeType) throw new TypeError("not a node");
          return A.parentNode !== P && s.NotFoundError(), A.remove(), A
        }
      },
      replaceChild: {
        value: function (A, P) {
          var K = this;
          return K._ensureInsertValid(A, P, !1), A.doc !== K.doc && K.doc.adoptNode(A), A._insertOrReplace(K, P, !0), P
        }
      },
      contains: {
        value: function (A) {
          return A === null ? !1 : this === A ? !0 : (this.compareDocumentPosition(A) & de) !== 0
        }
      },
      compareDocumentPosition: {
        value: function (A) {
          if (this === A) return 0;
          if (this.doc !== A.doc || this.rooted !== A.rooted) return T + Ae;
          for (var P = [], K = [], p = this; p !== null; p = p.parentNode) P.push(p);
          for (p = A; p !== null; p = p.parentNode) K.push(p);
          if (P.reverse(), K.reverse(), P[0] !== K[0]) return T + Ae;
          p = Math.min(P.length, K.length);
          for (var f = 1; f < p; f++) if (P[f] !== K[f]) return P[f].index < K[f].index ? y : N;
          return P.length < K.length ? y + de : N + ce
        }
      },
      isSameNode: {
        value: function (A) {
          return this === A
        }
      },
      isEqualNode: {
        value: function (A) {
          if (!A || A.nodeType !== this.nodeType || !this.isEqual(A)) return !1;
          for (var P = this.firstChild, K = A.firstChild; P && K; P = P.nextSibling, K = K.nextSibling) if (!P.isEqualNode(K)) return !1;
          return P === null && K === null
        }
      },
      cloneNode: {
        value: function (j) {
          var A = this.clone();
          if (j) for (var P = this.firstChild; P !== null; P = P.nextSibling) A._appendChild(P.cloneNode(!0));
          return A
        }
      },
      lookupPrefix: {
        value: function (A) {
          var P;
          if (A === "" || A === null || A === void 0) return null;
          switch (this.nodeType) {
            case o:
              return this._lookupNamespacePrefix(A, this);
            case O:
              return P = this.documentElement, P ? P.lookupPrefix(A) : null;
            case b:
            case w:
            case x:
            case Y:
              return null;
            case d:
              return P = this.ownerElement, P ? P.lookupPrefix(A) : null;
            default:
              return P = this.parentElement, P ? P.lookupPrefix(A) : null
          }
        }
      },
      lookupNamespaceURI: {
        value: function (A) {
          (A === "" || A === void 0) && (A = null);
          var P;
          switch (this.nodeType) {
            case o:
              return s.shouldOverride();
            case O:
              return P = this.documentElement, P ? P.lookupNamespaceURI(A) : null;
            case b:
            case w:
            case Y:
            case x:
              return null;
            case d:
              return P = this.ownerElement, P ? P.lookupNamespaceURI(A) : null;
            default:
              return P = this.parentElement, P ? P.lookupNamespaceURI(A) : null
          }
        }
      },
      isDefaultNamespace: {
        value: function (A) {
          (A === "" || A === void 0) && (A = null);
          var P = this.lookupNamespaceURI(null);
          return P === A
        }
      },
      index: {
        get: function () {
          var j = this.parentNode;
          if (this === j.firstChild) return 0;
          var A = j.childNodes;
          if (this._index === void 0 || A[this._index] !== this) {
            for (var P = 0; P < A.length; P++) A[P]._index = P;
            s.assert(A[this._index] === this)
          }
          return this._index
        }
      },
      isAncestor: {
        value: function (j) {
          if (this.doc !== j.doc || this.rooted !== j.rooted) return !1;
          for (var A = j; A; A = A.parentNode) if (A === this) return !0;
          return !1
        }
      },
      ensureSameDoc: {
        value: function (j) {
          j.ownerDocument === null ? j.ownerDocument = this.doc : j.ownerDocument !== this.doc && s.WrongDocumentError()
        }
      },
      removeChildren: {value: s.shouldOverride},
      _insertOrReplace: {
        value: function (A, P, K) {
          var p = this, f, h;
          if (p.nodeType === x && p.rooted && s.HierarchyRequestError(), A._childNodes && (f = P === null ? A._childNodes.length : P.index, p.parentNode === A)) {
            var v = p.index;
            v < f && f--
          }
          K && (P.rooted && P.doc.mutateRemove(P), P.parentNode = null);
          var C = P;
          C === null && (C = A.firstChild);
          var k = p.rooted && A.rooted;
          if (p.nodeType === x) {
            for (var $ = [0, K ? 1 : 0], J, pe = p.firstChild; pe !== null; pe = J) J = pe.nextSibling, $.push(pe), pe.parentNode = A;
            var _ = $.length;
            if (K ? r.replace(C, _ > 2 ? $[2] : null) : _ > 2 && C !== null && r.insertBefore($[2], C), A._childNodes) for ($[0] = P === null ? A._childNodes.length : P._index, A._childNodes.splice.apply(A._childNodes, $), h = 2; h < _; h++) $[h]._index = $[0] + (h - 2); else A._firstChild === P && (_ > 2 ? A._firstChild = $[2] : K && (A._firstChild = null));
            if (p._childNodes ? p._childNodes.length = 0 : p._firstChild = null, A.rooted) for (A.modify(), h = 2; h < _; h++) A.doc.mutateInsert($[h])
          } else {
            if (P === p) return;
            k ? p._remove() : p.parentNode && p.remove(), p.parentNode = A, K ? (r.replace(C, p), A._childNodes ? (p._index = f, A._childNodes[f] = p) : A._firstChild === P && (A._firstChild = p)) : (C !== null && r.insertBefore(p, C), A._childNodes ? (p._index = f, A._childNodes.splice(f, 0, p)) : A._firstChild === P && (A._firstChild = p)), k ? (A.modify(), A.doc.mutateMove(p)) : A.rooted && (A.modify(), A.doc.mutateInsert(p))
          }
        }
      },
      lastModTime: {
        get: function () {
          return this._lastModTime || (this._lastModTime = this.doc.modclock), this._lastModTime
        }
      },
      modify: {
        value: function () {
          if (this.doc.modclock) for (var j = ++this.doc.modclock, A = this; A; A = A.parentElement) A._lastModTime && (A._lastModTime = j)
        }
      },
      doc: {
        get: function () {
          return this.ownerDocument || this
        }
      },
      rooted: {
        get: function () {
          return !!this._nid
        }
      },
      normalize: {
        value: function () {
          for (var j, A = this.firstChild; A !== null; A = j) if (j = A.nextSibling, A.normalize && A.normalize(), A.nodeType === a.TEXT_NODE) {
            if (A.nodeValue === "") {
              this.removeChild(A);
              continue
            }
            var P = A.previousSibling;
            P !== null && P.nodeType === a.TEXT_NODE && (P.appendData(A.nodeValue), this.removeChild(A))
          }
        }
      },
      serialize: {
        value: function () {
          if (this._innerHTML) return this._innerHTML;
          for (var j = "", A = this.firstChild; A !== null; A = A.nextSibling) j += n.serializeOne(A, this);
          return j
        }
      },
      outerHTML: {
        get: function () {
          return n.serializeOne(this, {nodeType: 0})
        }, set: s.nyi
      },
      ELEMENT_NODE: {value: o},
      ATTRIBUTE_NODE: {value: d},
      TEXT_NODE: {value: l},
      CDATA_SECTION_NODE: {value: g},
      ENTITY_REFERENCE_NODE: {value: m},
      ENTITY_NODE: {value: b},
      PROCESSING_INSTRUCTION_NODE: {value: I},
      COMMENT_NODE: {value: U},
      DOCUMENT_NODE: {value: O},
      DOCUMENT_TYPE_NODE: {value: Y},
      DOCUMENT_FRAGMENT_NODE: {value: x},
      NOTATION_NODE: {value: w},
      DOCUMENT_POSITION_DISCONNECTED: {value: T},
      DOCUMENT_POSITION_PRECEDING: {value: N},
      DOCUMENT_POSITION_FOLLOWING: {value: y},
      DOCUMENT_POSITION_CONTAINS: {value: ce},
      DOCUMENT_POSITION_CONTAINED_BY: {value: de},
      DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC: {value: Ae}
    })
  }
}), oh = Z({
  "external/npm/node_modules/domino/lib/NodeList.es6.js"(t, e) {
    "use strict";
    e.exports = class extends Array {
      constructor(r) {
        if (super(r && r.length || 0), r) for (var n in r) this[n] = r[n]
      }

      item(r) {
        return this[r] || null
      }
    }
  }
}), ch = Z({
  "external/npm/node_modules/domino/lib/NodeList.es5.js"(t, e) {
    "use strict";

    function i(n) {
      return this[n] || null
    }

    function r(n) {
      return n || (n = []), n.item = i, n
    }

    e.exports = r
  }
}), br = Z({
  "external/npm/node_modules/domino/lib/NodeList.js"(t, e) {
    "use strict";
    var i;
    try {
      i = oh()
    } catch {
      i = ch()
    }
    e.exports = i
  }
}), ks = Z({
  "external/npm/node_modules/domino/lib/ContainerNode.js"(t, e) {
    "use strict";
    e.exports = n;
    var i = Be(), r = br();

    function n() {
      i.call(this), this._firstChild = this._childNodes = null
    }

    n.prototype = Object.create(i.prototype, {
      hasChildNodes: {
        value: function () {
          return this._childNodes ? this._childNodes.length > 0 : this._firstChild !== null
        }
      }, childNodes: {
        get: function () {
          return this._ensureChildNodes(), this._childNodes
        }
      }, firstChild: {
        get: function () {
          return this._childNodes ? this._childNodes.length === 0 ? null : this._childNodes[0] : this._firstChild
        }
      }, lastChild: {
        get: function () {
          var s = this._childNodes, a;
          return s ? s.length === 0 ? null : s[s.length - 1] : (a = this._firstChild, a === null ? null : a._previousSibling)
        }
      }, _ensureChildNodes: {
        value: function () {
          if (!this._childNodes) {
            var s = this._firstChild, a = s, o = this._childNodes = new r;
            if (s) do o.push(a), a = a._nextSibling; while (a !== s);
            this._firstChild = null
          }
        }
      }, removeChildren: {
        value: function () {
          for (var a = this.rooted ? this.ownerDocument : null, o = this.firstChild, d; o !== null;) d = o, o = d.nextSibling, a && a.mutateRemove(d), d.parentNode = null;
          this._childNodes ? this._childNodes.length = 0 : this._firstChild = null, this.modify()
        }
      }
    })
  }
}), Os = Z({
  "external/npm/node_modules/domino/lib/xmlnames.js"(t) {
    "use strict";
    t.isValidName = O, t.isValidQName = Y;
    var e = /^[_:A-Za-z][-.:\w]+$/, i = /^([_A-Za-z][-.\w]+|[_A-Za-z][-.\w]+:[_A-Za-z][-.\w]+)$/,
      r = "_A-Za-z\xC0-\xD6\xD8-\xF6\xF8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD",
      n = "-._A-Za-z0-9\xB7\xC0-\xD6\xD8-\xF6\xF8-\u02FF\u0300-\u037D\u037F-\u1FFF\u200C\u200D\u203F\u2040\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD",
      s = "[" + r + "][" + n + "]*", a = r + ":", o = n + ":", d = new RegExp("^[" + a + "][" + o + "]*$"),
      l = new RegExp("^(" + s + "|" + s + ":" + s + ")$"), g = /[\uD800-\uDB7F\uDC00-\uDFFF]/,
      m = /[\uD800-\uDB7F\uDC00-\uDFFF]/g, b = /[\uD800-\uDB7F][\uDC00-\uDFFF]/g;
    r += "\uD800-\u{EFC00}-\uDFFF", n += "\uD800-\u{EFC00}-\uDFFF", s = "[" + r + "][" + n + "]*", a = r + ":", o = n + ":";
    var I = new RegExp("^[" + a + "][" + o + "]*$"), U = new RegExp("^(" + s + "|" + s + ":" + s + ")$");

    function O(x) {
      if (e.test(x) || d.test(x)) return !0;
      if (!g.test(x) || !I.test(x)) return !1;
      var w = x.match(m), T = x.match(b);
      return T !== null && 2 * T.length === w.length
    }

    function Y(x) {
      if (i.test(x) || l.test(x)) return !0;
      if (!g.test(x) || !U.test(x)) return !1;
      var w = x.match(m), T = x.match(b);
      return T !== null && 2 * T.length === w.length
    }
  }
}), hc = Z({
  "external/npm/node_modules/domino/lib/attributes.js"(t) {
    "use strict";
    var e = Oe();
    t.property = function (r) {
      if (Array.isArray(r.type)) {
        var n = Object.create(null);
        r.type.forEach(function (o) {
          n[o.value || o] = o.alias || o
        });
        var s = r.missing;
        s === void 0 && (s = null);
        var a = r.invalid;
        return a === void 0 && (a = s), {
          get: function () {
            var o = this._getattr(r.name);
            return o === null ? s : (o = n[o.toLowerCase()], o !== void 0 ? o : a !== null ? a : o)
          }, set: function (o) {
            this._setattr(r.name, o)
          }
        }
      } else {
        if (r.type === Boolean) return {
          get: function () {
            return this.hasAttribute(r.name)
          }, set: function (o) {
            o ? this._setattr(r.name, "") : this.removeAttribute(r.name)
          }
        };
        if (r.type === Number || r.type === "long" || r.type === "unsigned long" || r.type === "limited unsigned long with fallback") return i(r);
        if (!r.type || r.type === String) return {
          get: function () {
            return this._getattr(r.name) || ""
          }, set: function (o) {
            r.treatNullAsEmptyString && o === null && (o = ""), this._setattr(r.name, o)
          }
        };
        if (typeof r.type == "function") return r.type(r.name, r)
      }
      throw new Error("Invalid attribute definition")
    };

    function i(r) {
      var n;
      typeof r.default == "function" ? n = r.default : typeof r.default == "number" ? n = function () {
        return r.default
      } : n = function () {
        e.assert(!1, typeof r.default)
      };
      var s = r.type === "unsigned long", a = r.type === "long", o = r.type === "limited unsigned long with fallback",
        d = r.min, l = r.max, g = r.setmin;
      return d === void 0 && (s && (d = 0), a && (d = -2147483648), o && (d = 1)), l === void 0 && (s || a || o) && (l = 2147483647), {
        get: function () {
          var m = this._getattr(r.name), b = r.float ? parseFloat(m) : parseInt(m, 10);
          if (m === null || !isFinite(b) || d !== void 0 && b < d || l !== void 0 && b > l) return n.call(this);
          if (s || a || o) {
            if (!/^[ \t\n\f\r]*[-+]?[0-9]/.test(m)) return n.call(this);
            b = b | 0
          }
          return b
        }, set: function (m) {
          r.float || (m = Math.floor(m)), g !== void 0 && m < g && e.IndexSizeError(r.name + " set to " + m), s ? m = m < 0 || m > 2147483647 ? n.call(this) : m | 0 : o ? m = m < 1 || m > 2147483647 ? n.call(this) : m | 0 : a && (m = m < -2147483648 || m > 2147483647 ? n.call(this) : m | 0), this._setattr(r.name, String(m))
        }
      }
    }

    t.registerChangeHandler = function (r, n, s) {
      var a = r.prototype;
      Object.prototype.hasOwnProperty.call(a, "_attributeChangeHandlers") || (a._attributeChangeHandlers = Object.create(a._attributeChangeHandlers || null)), a._attributeChangeHandlers[n] = s
    }
  }
}), lh = Z({
  "external/npm/node_modules/domino/lib/FilteredElementList.js"(t, e) {
    "use strict";
    e.exports = r;
    var i = Be();

    function r(n, s) {
      this.root = n, this.filter = s, this.lastModTime = n.lastModTime, this.done = !1, this.cache = [], this.traverse()
    }

    r.prototype = Object.create(Object.prototype, {
      length: {
        get: function () {
          return this.checkcache(), this.done || this.traverse(), this.cache.length
        }
      }, item: {
        value: function (n) {
          return this.checkcache(), !this.done && n >= this.cache.length && this.traverse(), this.cache[n]
        }
      }, checkcache: {
        value: function () {
          if (this.lastModTime !== this.root.lastModTime) {
            for (var n = this.cache.length - 1; n >= 0; n--) this[n] = void 0;
            this.cache.length = 0, this.done = !1, this.lastModTime = this.root.lastModTime
          }
        }
      }, traverse: {
        value: function (n) {
          n !== void 0 && n++;
          for (var s; (s = this.next()) !== null;) if (this[this.cache.length] = s, this.cache.push(s), n && this.cache.length === n) return;
          this.done = !0
        }
      }, next: {
        value: function () {
          var n = this.cache.length === 0 ? this.root : this.cache[this.cache.length - 1], s;
          for (n.nodeType === i.DOCUMENT_NODE ? s = n.documentElement : s = n.nextElement(this.root); s;) {
            if (this.filter(s)) return s;
            s = s.nextElement(this.root)
          }
          return null
        }
      }
    })
  }
}), dc = Z({
  "external/npm/node_modules/domino/lib/DOMTokenList.js"(t, e) {
    "use strict";
    var i = Oe();
    e.exports = r;

    function r(d, l) {
      this._getString = d, this._setString = l, this._length = 0, this._lastStringValue = "", this._update()
    }

    Object.defineProperties(r.prototype, {
      length: {
        get: function () {
          return this._length
        }
      }, item: {
        value: function (d) {
          var l = o(this);
          return d < 0 || d >= l.length ? null : l[d]
        }
      }, contains: {
        value: function (d) {
          d = String(d);
          var l = o(this);
          return l.indexOf(d) > -1
        }
      }, add: {
        value: function () {
          for (var d = o(this), l = 0, g = arguments.length; l < g; l++) {
            var m = s(arguments[l]);
            d.indexOf(m) < 0 && d.push(m)
          }
          this._update(d)
        }
      }, remove: {
        value: function () {
          for (var d = o(this), l = 0, g = arguments.length; l < g; l++) {
            var m = s(arguments[l]), b = d.indexOf(m);
            b > -1 && d.splice(b, 1)
          }
          this._update(d)
        }
      }, toggle: {
        value: function (l, g) {
          return l = s(l), this.contains(l) ? g === void 0 || g === !1 ? (this.remove(l), !1) : !0 : g === void 0 || g === !0 ? (this.add(l), !0) : !1
        }
      }, replace: {
        value: function (l, g) {
          String(g) === "" && i.SyntaxError(), l = s(l), g = s(g);
          var m = o(this), b = m.indexOf(l);
          if (b < 0) return !1;
          var I = m.indexOf(g);
          return I < 0 ? m[b] = g : b < I ? (m[b] = g, m.splice(I, 1)) : m.splice(b, 1), this._update(m), !0
        }
      }, toString: {
        value: function () {
          return this._getString()
        }
      }, value: {
        get: function () {
          return this._getString()
        }, set: function (d) {
          this._setString(d), this._update()
        }
      }, _update: {
        value: function (d) {
          d ? (n(this, d), this._setString(d.join(" ").trim())) : n(this, o(this)), this._lastStringValue = this._getString()
        }
      }
    });

    function n(d, l) {
      var g = d._length, m;
      for (d._length = l.length, m = 0; m < l.length; m++) d[m] = l[m];
      for (; m < g; m++) d[m] = void 0
    }

    function s(d) {
      return d = String(d), d === "" && i.SyntaxError(), /[ \t\r\n\f]/.test(d) && i.InvalidCharacterError(), d
    }

    function a(d) {
      for (var l = d._length, g = Array(l), m = 0; m < l; m++) g[m] = d[m];
      return g
    }

    function o(d) {
      var l = d._getString();
      if (l === d._lastStringValue) return a(d);
      var g = l.replace(/(^[ \t\r\n\f]+)|([ \t\r\n\f]+$)/g, "");
      if (g === "") return [];
      var m = Object.create(null);
      return g.split(/[ \t\r\n\f]+/g).filter(function (b) {
        var I = "$" + b;
        return m[I] ? !1 : (m[I] = !0, !0)
      })
    }
  }
}), xs = Z({
  "external/npm/node_modules/domino/lib/select.js"(t, e) {
    "use strict";
    var i = Object.create(null, {
      location: {
        get: function () {
          throw new Error("window.location is not supported.")
        }
      }
    }), r = function (p, f) {
      return p.compareDocumentPosition(f)
    }, n = function (p, f) {
      return r(p, f) & 2 ? 1 : -1
    }, s = function (p) {
      for (; (p = p.nextSibling) && p.nodeType !== 1;) ;
      return p
    }, a = function (p) {
      for (; (p = p.previousSibling) && p.nodeType !== 1;) ;
      return p
    }, o = function (p) {
      if (p = p.firstChild) for (; p.nodeType !== 1 && (p = p.nextSibling);) ;
      return p
    }, d = function (p) {
      if (p = p.lastChild) for (; p.nodeType !== 1 && (p = p.previousSibling);) ;
      return p
    }, l = function (p) {
      if (!p.parentNode) return !1;
      var f = p.parentNode.nodeType;
      return f === 1 || f === 9
    }, g = function (p) {
      if (!p) return p;
      var f = p[0];
      return f === '"' || f === "'" ? (p[p.length - 1] === f ? p = p.slice(1, -1) : p = p.slice(1), p.replace(y.str_escape, function (h) {
        var v = /^\\(?:([0-9A-Fa-f]+)|([\r\n\f]+))/.exec(h);
        if (!v) return h.slice(1);
        if (v[2]) return "";
        var C = parseInt(v[1], 16);
        return String.fromCodePoint ? String.fromCodePoint(C) : String.fromCharCode(C)
      })) : y.ident.test(p) ? m(p) : p
    }, m = function (p) {
      return p.replace(y.escape, function (f) {
        var h = /^\\([0-9A-Fa-f]+)/.exec(f);
        if (!h) return f[1];
        var v = parseInt(h[1], 16);
        return String.fromCodePoint ? String.fromCodePoint(v) : String.fromCharCode(v)
      })
    }, b = function () {
      return Array.prototype.indexOf ? Array.prototype.indexOf : function (p, f) {
        for (var h = this.length; h--;) if (this[h] === f) return h;
        return -1
      }
    }(), I = function (p, f) {
      var h = y.inside.source.replace(/</g, p).replace(/>/g, f);
      return new RegExp(h)
    }, U = function (p, f, h) {
      return p = p.source, p = p.replace(f, h.source || h), new RegExp(p)
    }, O = function (p, f) {
      return p.replace(/^(?:\w+:\/\/|\/+)/, "").replace(/(?:\/+|\/*#.*?)$/, "").split("/", f).join("/")
    }, Y = function (p, f) {
      var h = p.replace(/\s+/g, ""), v;
      return h === "even" ? h = "2n+0" : h === "odd" ? h = "2n+1" : h.indexOf("n") === -1 && (h = "0n" + h), v = /^([+-])?(\d+)?n([+-])?(\d+)?$/.exec(h), {
        group: v[1] === "-" ? -(v[2] || 1) : +(v[2] || 1),
        offset: v[4] ? v[3] === "-" ? -v[4] : +v[4] : 0
      }
    }, x = function (p, f, h) {
      var v = Y(p), C = v.group, k = v.offset, $ = h ? d : o, J = h ? a : s;
      return function (pe) {
        if (l(pe)) for (var _ = $(pe.parentNode), M = 0; _;) {
          if (f(_, pe) && M++, _ === pe) return M -= k, C && M ? M % C === 0 && M < 0 == C < 0 : !M;
          _ = J(_)
        }
      }
    }, w = {
      "*": function () {
        return function () {
          return !0
        }
      }(), type: function (p) {
        return p = p.toLowerCase(), function (f) {
          return f.nodeName.toLowerCase() === p
        }
      }, attr: function (p, f, h, v) {
        return f = T[f], function (C) {
          var k;
          switch (p) {
            case"for":
              k = C.htmlFor;
              break;
            case"class":
              k = C.className, k === "" && C.getAttribute("class") == null && (k = null);
              break;
            case"href":
            case"src":
              k = C.getAttribute(p, 2);
              break;
            case"title":
              k = C.getAttribute("title") || null;
              break;
            case"id":
            case"lang":
            case"dir":
            case"accessKey":
            case"hidden":
            case"tabIndex":
            case"style":
              if (C.getAttribute) {
                k = C.getAttribute(p);
                break
              }
            default:
              if (C.hasAttribute && !C.hasAttribute(p)) break;
              k = C[p] != null ? C[p] : C.getAttribute && C.getAttribute(p);
              break
          }
          if (k != null) return k = k + "", v && (k = k.toLowerCase(), h = h.toLowerCase()), f(k, h)
        }
      }, ":first-child": function (p) {
        return !a(p) && l(p)
      }, ":last-child": function (p) {
        return !s(p) && l(p)
      }, ":only-child": function (p) {
        return !a(p) && !s(p) && l(p)
      }, ":nth-child": function (p, f) {
        return x(p, function () {
          return !0
        }, f)
      }, ":nth-last-child": function (p) {
        return w[":nth-child"](p, !0)
      }, ":root": function (p) {
        return p.ownerDocument.documentElement === p
      }, ":empty": function (p) {
        return !p.firstChild
      }, ":not": function (p) {
        var f = P(p);
        return function (h) {
          return !f(h)
        }
      }, ":first-of-type": function (p) {
        if (l(p)) {
          for (var f = p.nodeName; p = a(p);) if (p.nodeName === f) return;
          return !0
        }
      }, ":last-of-type": function (p) {
        if (l(p)) {
          for (var f = p.nodeName; p = s(p);) if (p.nodeName === f) return;
          return !0
        }
      }, ":only-of-type": function (p) {
        return w[":first-of-type"](p) && w[":last-of-type"](p)
      }, ":nth-of-type": function (p, f) {
        return x(p, function (h, v) {
          return h.nodeName === v.nodeName
        }, f)
      }, ":nth-last-of-type": function (p) {
        return w[":nth-of-type"](p, !0)
      }, ":checked": function (p) {
        return !!(p.checked || p.selected)
      }, ":indeterminate": function (p) {
        return !w[":checked"](p)
      }, ":enabled": function (p) {
        return !p.disabled && p.type !== "hidden"
      }, ":disabled": function (p) {
        return !!p.disabled
      }, ":target": function (p) {
        return p.id === i.location.hash.substring(1)
      }, ":focus": function (p) {
        return p === p.ownerDocument.activeElement
      }, ":is": function (p) {
        return P(p)
      }, ":matches": function (p) {
        return w[":is"](p)
      }, ":nth-match": function (p, f) {
        var h = p.split(/\s*,\s*/), v = h.shift(), C = P(h.join(","));
        return x(v, C, f)
      }, ":nth-last-match": function (p) {
        return w[":nth-match"](p, !0)
      }, ":links-here": function (p) {
        return p + "" == i.location + ""
      }, ":lang": function (p) {
        return function (f) {
          for (; f;) {
            if (f.lang) return f.lang.indexOf(p) === 0;
            f = f.parentNode
          }
        }
      }, ":dir": function (p) {
        return function (f) {
          for (; f;) {
            if (f.dir) return f.dir === p;
            f = f.parentNode
          }
        }
      }, ":scope": function (p, f) {
        var h = f || p.ownerDocument;
        return h.nodeType === 9 ? p === h.documentElement : p === h
      }, ":any-link": function (p) {
        return typeof p.href == "string"
      }, ":local-link": function (p) {
        if (p.nodeName) return p.href && p.host === i.location.host;
        var f = +p + 1;
        return function (h) {
          if (h.href) {
            var v = i.location + "", C = h + "";
            return O(v, f) === O(C, f)
          }
        }
      }, ":default": function (p) {
        return !!p.defaultSelected
      }, ":valid": function (p) {
        return p.willValidate || p.validity && p.validity.valid
      }, ":invalid": function (p) {
        return !w[":valid"](p)
      }, ":in-range": function (p) {
        return p.value > p.min && p.value <= p.max
      }, ":out-of-range": function (p) {
        return !w[":in-range"](p)
      }, ":required": function (p) {
        return !!p.required
      }, ":optional": function (p) {
        return !p.required
      }, ":read-only": function (p) {
        if (p.readOnly) return !0;
        var f = p.getAttribute("contenteditable"), h = p.contentEditable, v = p.nodeName.toLowerCase();
        return v = v !== "input" && v !== "textarea", (v || p.disabled) && f == null && h !== "true"
      }, ":read-write": function (p) {
        return !w[":read-only"](p)
      }, ":hover": function () {
        throw new Error(":hover is not supported.")
      }, ":active": function () {
        throw new Error(":active is not supported.")
      }, ":link": function () {
        throw new Error(":link is not supported.")
      }, ":visited": function () {
        throw new Error(":visited is not supported.")
      }, ":column": function () {
        throw new Error(":column is not supported.")
      }, ":nth-column": function () {
        throw new Error(":nth-column is not supported.")
      }, ":nth-last-column": function () {
        throw new Error(":nth-last-column is not supported.")
      }, ":current": function () {
        throw new Error(":current is not supported.")
      }, ":past": function () {
        throw new Error(":past is not supported.")
      }, ":future": function () {
        throw new Error(":future is not supported.")
      }, ":contains": function (p) {
        return function (f) {
          var h = f.innerText || f.textContent || f.value || "";
          return h.indexOf(p) !== -1
        }
      }, ":has": function (p) {
        return function (f) {
          return K(p, f).length > 0
        }
      }
    }, T = {
      "-": function () {
        return !0
      }, "=": function (p, f) {
        return p === f
      }, "*=": function (p, f) {
        return p.indexOf(f) !== -1
      }, "~=": function (p, f) {
        var h, v, C, k;
        for (v = 0; ; v = h + 1) {
          if (h = p.indexOf(f, v), h === -1) return !1;
          if (C = p[h - 1], k = p[h + f.length], (!C || C === " ") && (!k || k === " ")) return !0
        }
      }, "|=": function (p, f) {
        var h = p.indexOf(f), v;
        if (h === 0) return v = p[h + f.length], v === "-" || !v
      }, "^=": function (p, f) {
        return p.indexOf(f) === 0
      }, "$=": function (p, f) {
        var h = p.lastIndexOf(f);
        return h !== -1 && h + f.length === p.length
      }, "!=": function (p, f) {
        return p !== f
      }
    }, N = {
      " ": function (p) {
        return function (f) {
          for (; f = f.parentNode;) if (p(f)) return f
        }
      }, ">": function (p) {
        return function (f) {
          if (f = f.parentNode) return p(f) && f
        }
      }, "+": function (p) {
        return function (f) {
          if (f = a(f)) return p(f) && f
        }
      }, "~": function (p) {
        return function (f) {
          for (; f = a(f);) if (p(f)) return f
        }
      }, noop: function (p) {
        return function (f) {
          return p(f) && f
        }
      }, ref: function (p, f) {
        var h;

        function v(C) {
          for (var k = C.ownerDocument, $ = k.getElementsByTagName("*"), J = $.length; J--;) if (h = $[J], v.test(C)) return h = null, !0;
          h = null
        }

        return v.combinator = function (C) {
          if (!(!h || !h.getAttribute)) {
            var k = h.getAttribute(f) || "";
            if (k[0] === "#" && (k = k.substring(1)), k === C.id && p(h)) return h
          }
        }, v
      }
    }, y = {
      escape: /\\(?:[^0-9A-Fa-f\r\n]|[0-9A-Fa-f]{1,6}[\r\n\t ]?)/g,
      str_escape: /(escape)|\\(\n|\r\n?|\f)/g,
      nonascii: /[\u00A0-\uFFFF]/,
      cssid: /(?:(?!-?[0-9])(?:escape|nonascii|[-_a-zA-Z0-9])+)/,
      qname: /^ *(cssid|\*)/,
      simple: /^(?:([.#]cssid)|pseudo|attr)/,
      ref: /^ *\/(cssid)\/ */,
      combinator: /^(?: +([^ \w*.#\\]) +|( )+|([^ \w*.#\\]))(?! *$)/,
      attr: /^\[(cssid)(?:([^\w]?=)(inside))?\]/,
      pseudo: /^(:cssid)(?:\((inside)\))?/,
      inside: /(?:"(?:\\"|[^"])*"|'(?:\\'|[^'])*'|<[^"'>]*>|\\["'>]|[^"'>])*/,
      ident: /^(cssid)$/
    };
    y.cssid = U(y.cssid, "nonascii", y.nonascii), y.cssid = U(y.cssid, "escape", y.escape), y.qname = U(y.qname, "cssid", y.cssid), y.simple = U(y.simple, "cssid", y.cssid), y.ref = U(y.ref, "cssid", y.cssid), y.attr = U(y.attr, "cssid", y.cssid), y.pseudo = U(y.pseudo, "cssid", y.cssid), y.inside = U(y.inside, `[^"'>]*`, y.inside), y.attr = U(y.attr, "inside", I("\\[", "\\]")), y.pseudo = U(y.pseudo, "inside", I("\\(", "\\)")), y.simple = U(y.simple, "pseudo", y.pseudo), y.simple = U(y.simple, "attr", y.attr), y.ident = U(y.ident, "cssid", y.cssid), y.str_escape = U(y.str_escape, "escape", y.escape);
    var ce = function (p) {
      for (var f = p.replace(/^\s+|\s+$/g, ""), h, v = [], C = [], k, $, J, pe, _; f;) {
        if (J = y.qname.exec(f)) f = f.substring(J[0].length), $ = m(J[1]), C.push(de($, !0)); else if (J = y.simple.exec(f)) f = f.substring(J[0].length), $ = "*", C.push(de($, !0)), C.push(de(J)); else throw new SyntaxError("Invalid selector.");
        for (; J = y.simple.exec(f);) f = f.substring(J[0].length), C.push(de(J));
        if (f[0] === "!" && (f = f.substring(1), k = A(), k.qname = $, C.push(k.simple)), J = y.ref.exec(f)) {
          f = f.substring(J[0].length), _ = N.ref(Ae(C), m(J[1])), v.push(_.combinator), C = [];
          continue
        }
        if (J = y.combinator.exec(f)) {
          if (f = f.substring(J[0].length), pe = J[1] || J[2] || J[3], pe === ",") {
            v.push(N.noop(Ae(C)));
            break
          }
        } else pe = "noop";
        if (!N[pe]) throw new SyntaxError("Bad combinator.");
        v.push(N[pe](Ae(C))), C = []
      }
      return h = j(v), h.qname = $, h.sel = f, k && (k.lname = h.qname, k.test = h, k.qname = k.qname, k.sel = h.sel, h = k), _ && (_.test = h, _.qname = h.qname, _.sel = h.sel, h = _), h
    }, de = function (p, f) {
      if (f) return p === "*" ? w["*"] : w.type(p);
      if (p[1]) return p[1][0] === "." ? w.attr("class", "~=", m(p[1].substring(1)), !1) : w.attr("id", "=", m(p[1].substring(1)), !1);
      if (p[2]) return p[3] ? w[m(p[2])](g(p[3])) : w[m(p[2])];
      if (p[4]) {
        var h = p[6], v = /["'\s]\s*I$/i.test(h);
        return v && (h = h.replace(/\s*I$/i, "")), w.attr(m(p[4]), p[5] || "-", g(h), v)
      }
      throw new SyntaxError("Unknown Selector.")
    }, Ae = function (p) {
      var f = p.length, h;
      return f < 2 ? p[0] : function (v) {
        if (v) {
          for (h = 0; h < f; h++) if (!p[h](v)) return;
          return !0
        }
      }
    }, j = function (p) {
      return p.length < 2 ? function (f) {
        return !!p[0](f)
      } : function (f) {
        for (var h = p.length; h--;) if (!(f = p[h](f))) return;
        return !0
      }
    }, A = function () {
      var p;

      function f(h) {
        for (var v = h.ownerDocument, C = v.getElementsByTagName(f.lname), k = C.length; k--;) if (f.test(C[k]) && p === h) return p = null, !0;
        p = null
      }

      return f.simple = function (h) {
        return p = h, !0
      }, f
    }, P = function (p) {
      for (var f = ce(p), h = [f]; f.sel;) f = ce(f.sel), h.push(f);
      return h.length < 2 ? f : function (v) {
        for (var C = h.length, k = 0; k < C; k++) if (h[k](v)) return !0
      }
    }, K = function (p, f) {
      for (var h = [], v = ce(p), C = f.getElementsByTagName(v.qname), k = 0, $; $ = C[k++];) v($) && h.push($);
      if (v.sel) {
        for (; v.sel;) for (v = ce(v.sel), C = f.getElementsByTagName(v.qname), k = 0; $ = C[k++];) v($) && b.call(h, $) === -1 && h.push($);
        h.sort(n)
      }
      return h
    };
    e.exports = t = function (p, f) {
      var h, v;
      if (f.nodeType !== 11 && p.indexOf(" ") === -1) {
        if (p[0] === "#" && f.rooted && /^#[A-Z_][-A-Z0-9_]*$/i.test(p) && f.doc._hasMultipleElementsWithId && (h = p.substring(1), !f.doc._hasMultipleElementsWithId(h))) return v = f.doc.getElementById(h), v ? [v] : [];
        if (p[0] === "." && /^\.\w+$/.test(p)) return f.getElementsByClassName(p.substring(1));
        if (/^\w+$/.test(p)) return f.getElementsByTagName(p)
      }
      return K(p, f)
    }, t.selectors = w, t.operators = T, t.combinators = N, t.matches = function (p, f) {
      var h = {sel: f};
      do if (h = ce(h.sel), h(p)) return !0; while (h.sel);
      return !1
    }
  }
}), Ps = Z({
  "external/npm/node_modules/domino/lib/ChildNode.js"(t, e) {
    "use strict";
    var i = Be(), r = lc(), n = function (a, o) {
      for (var d = a.createDocumentFragment(), l = 0; l < o.length; l++) {
        var g = o[l], m = g instanceof i;
        d.appendChild(m ? g : a.createTextNode(String(g)))
      }
      return d
    }, s = {
      after: {
        value: function () {
          var o = Array.prototype.slice.call(arguments), d = this.parentNode, l = this.nextSibling;
          if (d !== null) {
            for (; l && o.some(function (m) {
              return m === l
            });) l = l.nextSibling;
            var g = n(this.doc, o);
            d.insertBefore(g, l)
          }
        }
      }, before: {
        value: function () {
          var o = Array.prototype.slice.call(arguments), d = this.parentNode, l = this.previousSibling;
          if (d !== null) {
            for (; l && o.some(function (b) {
              return b === l
            });) l = l.previousSibling;
            var g = n(this.doc, o), m = l ? l.nextSibling : d.firstChild;
            d.insertBefore(g, m)
          }
        }
      }, remove: {
        value: function () {
          this.parentNode !== null && (this.doc && (this.doc._preremoveNodeIterators(this), this.rooted && this.doc.mutateRemove(this)), this._remove(), this.parentNode = null)
        }
      }, _remove: {
        value: function () {
          var o = this.parentNode;
          o !== null && (o._childNodes ? o._childNodes.splice(this.index, 1) : o._firstChild === this && (this._nextSibling === this ? o._firstChild = null : o._firstChild = this._nextSibling), r.remove(this), o.modify())
        }
      }, replaceWith: {
        value: function () {
          var o = Array.prototype.slice.call(arguments), d = this.parentNode, l = this.nextSibling;
          if (d !== null) {
            for (; l && o.some(function (m) {
              return m === l
            });) l = l.nextSibling;
            var g = n(this.doc, o);
            this.parentNode === d ? d.replaceChild(g, this) : d.insertBefore(g, l)
          }
        }
      }
    };
    e.exports = s
  }
}), fc = Z({
  "external/npm/node_modules/domino/lib/NonDocumentTypeChildNode.js"(t, e) {
    "use strict";
    var i = Be(), r = {
      nextElementSibling: {
        get: function () {
          if (this.parentNode) {
            for (var n = this.nextSibling; n !== null; n = n.nextSibling) if (n.nodeType === i.ELEMENT_NODE) return n
          }
          return null
        }
      }, previousElementSibling: {
        get: function () {
          if (this.parentNode) {
            for (var n = this.previousSibling; n !== null; n = n.previousSibling) if (n.nodeType === i.ELEMENT_NODE) return n
          }
          return null
        }
      }
    };
    e.exports = r
  }
}), pc = Z({
  "external/npm/node_modules/domino/lib/NamedNodeMap.js"(t, e) {
    "use strict";
    e.exports = r;
    var i = Oe();

    function r(n) {
      this.element = n
    }

    Object.defineProperties(r.prototype, {
      length: {get: i.shouldOverride},
      item: {value: i.shouldOverride},
      getNamedItem: {
        value: function (s) {
          return this.element.getAttributeNode(s)
        }
      },
      getNamedItemNS: {
        value: function (s, a) {
          return this.element.getAttributeNodeNS(s, a)
        }
      },
      setNamedItem: {value: i.nyi},
      setNamedItemNS: {value: i.nyi},
      removeNamedItem: {
        value: function (s) {
          var a = this.element.getAttributeNode(s);
          if (a) return this.element.removeAttribute(s), a;
          i.NotFoundError()
        }
      },
      removeNamedItemNS: {
        value: function (s, a) {
          var o = this.element.getAttributeNodeNS(s, a);
          if (o) return this.element.removeAttributeNS(s, a), o;
          i.NotFoundError()
        }
      }
    })
  }
}), Qr = Z({
  "external/npm/node_modules/domino/lib/Element.js"(t, e) {
    "use strict";
    e.exports = w;
    var i = Os(), r = Oe(), n = r.NAMESPACE, s = hc(), a = Be(), o = br(), d = uc(), l = lh(), g = Is(), m = dc(),
      b = xs(), I = ks(), U = Ps(), O = fc(), Y = pc(), x = Object.create(null);

    function w(f, h, v, C) {
      I.call(this), this.nodeType = a.ELEMENT_NODE, this.ownerDocument = f, this.localName = h, this.namespaceURI = v, this.prefix = C, this._tagName = void 0, this._attrsByQName = Object.create(null), this._attrsByLName = Object.create(null), this._attrKeys = []
    }

    function T(f, h) {
      if (f.nodeType === a.TEXT_NODE) h.push(f._data); else for (var v = 0, C = f.childNodes.length; v < C; v++) T(f.childNodes[v], h)
    }

    w.prototype = Object.create(I.prototype, {
      isHTML: {
        get: function () {
          return this.namespaceURI === n.HTML && this.ownerDocument.isHTML
        }
      }, tagName: {
        get: function () {
          if (this._tagName === void 0) {
            var h;
            if (this.prefix === null ? h = this.localName : h = this.prefix + ":" + this.localName, this.isHTML) {
              var v = x[h];
              v || (x[h] = v = r.toASCIIUpperCase(h)), h = v
            }
            this._tagName = h
          }
          return this._tagName
        }
      }, nodeName: {
        get: function () {
          return this.tagName
        }
      }, nodeValue: {
        get: function () {
          return null
        }, set: function () {
        }
      }, textContent: {
        get: function () {
          var f = [];
          return T(this, f), f.join("")
        }, set: function (f) {
          this.removeChildren(), f != null && f !== "" && this._appendChild(this.ownerDocument.createTextNode(f))
        }
      }, innerText: {
        get: function () {
          var f = [];
          return T(this, f), f.join("").replace(/[ \t\n\f\r]+/g, " ").trim()
        }, set: function (f) {
          this.removeChildren(), f != null && f !== "" && this._appendChild(this.ownerDocument.createTextNode(f))
        }
      }, innerHTML: {
        get: function () {
          return this.serialize()
        }, set: r.nyi
      }, outerHTML: {
        get: function () {
          return d.serializeOne(this, {nodeType: 0})
        }, set: function (f) {
          var h = this.ownerDocument, v = this.parentNode;
          if (v !== null) {
            v.nodeType === a.DOCUMENT_NODE && r.NoModificationAllowedError(), v.nodeType === a.DOCUMENT_FRAGMENT_NODE && (v = v.ownerDocument.createElement("body"));
            var C = h.implementation.mozHTMLParser(h._address, v);
            C.parse(f === null ? "" : String(f), !0), this.replaceWith(C._asDocumentFragment())
          }
        }
      }, _insertAdjacent: {
        value: function (h, v) {
          var C = !1;
          switch (h) {
            case"beforebegin":
              C = !0;
            case"afterend":
              var k = this.parentNode;
              return k === null ? null : k.insertBefore(v, C ? this : this.nextSibling);
            case"afterbegin":
              C = !0;
            case"beforeend":
              return this.insertBefore(v, C ? this.firstChild : null);
            default:
              return r.SyntaxError()
          }
        }
      }, insertAdjacentElement: {
        value: function (h, v) {
          if (v.nodeType !== a.ELEMENT_NODE) throw new TypeError("not an element");
          return h = r.toASCIILowerCase(String(h)), this._insertAdjacent(h, v)
        }
      }, insertAdjacentText: {
        value: function (h, v) {
          var C = this.ownerDocument.createTextNode(v);
          h = r.toASCIILowerCase(String(h)), this._insertAdjacent(h, C)
        }
      }, insertAdjacentHTML: {
        value: function (h, v) {
          h = r.toASCIILowerCase(String(h)), v = String(v);
          var C;
          switch (h) {
            case"beforebegin":
            case"afterend":
              C = this.parentNode, (C === null || C.nodeType === a.DOCUMENT_NODE) && r.NoModificationAllowedError();
              break;
            case"afterbegin":
            case"beforeend":
              C = this;
              break;
            default:
              r.SyntaxError()
          }
          (!(C instanceof w) || C.ownerDocument.isHTML && C.localName === "html" && C.namespaceURI === n.HTML) && (C = C.ownerDocument.createElementNS(n.HTML, "body"));
          var k = this.ownerDocument.implementation.mozHTMLParser(this.ownerDocument._address, C);
          k.parse(v, !0), this._insertAdjacent(h, k._asDocumentFragment())
        }
      }, children: {
        get: function () {
          return this._children || (this._children = new de(this)), this._children
        }
      }, attributes: {
        get: function () {
          return this._attributes || (this._attributes = new y(this)), this._attributes
        }
      }, firstElementChild: {
        get: function () {
          for (var f = this.firstChild; f !== null; f = f.nextSibling) if (f.nodeType === a.ELEMENT_NODE) return f;
          return null
        }
      }, lastElementChild: {
        get: function () {
          for (var f = this.lastChild; f !== null; f = f.previousSibling) if (f.nodeType === a.ELEMENT_NODE) return f;
          return null
        }
      }, childElementCount: {
        get: function () {
          return this.children.length
        }
      }, nextElement: {
        value: function (f) {
          f || (f = this.ownerDocument.documentElement);
          var h = this.firstElementChild;
          if (!h) {
            if (this === f) return null;
            h = this.nextElementSibling
          }
          if (h) return h;
          for (var v = this.parentElement; v && v !== f; v = v.parentElement) if (h = v.nextElementSibling, h) return h;
          return null
        }
      }, getElementsByTagName: {
        value: function (h) {
          var v;
          return h ? (h === "*" ? v = function () {
            return !0
          } : this.isHTML ? v = j(h) : v = Ae(h), new l(this, v)) : new o
        }
      }, getElementsByTagNameNS: {
        value: function (h, v) {
          var C;
          return h === "*" && v === "*" ? C = function () {
            return !0
          } : h === "*" ? C = Ae(v) : v === "*" ? C = A(h) : C = P(h, v), new l(this, C)
        }
      }, getElementsByClassName: {
        value: function (h) {
          if (h = String(h).trim(), h === "") {
            var v = new o;
            return v
          }
          return h = h.split(/[ \t\r\n\f]+/), new l(this, K(h))
        }
      }, getElementsByName: {
        value: function (h) {
          return new l(this, p(String(h)))
        }
      }, clone: {
        value: function () {
          var h;
          this.namespaceURI !== n.HTML || this.prefix || !this.ownerDocument.isHTML ? h = this.ownerDocument.createElementNS(this.namespaceURI, this.prefix !== null ? this.prefix + ":" + this.localName : this.localName) : h = this.ownerDocument.createElement(this.localName);
          for (var v = 0, C = this._attrKeys.length; v < C; v++) {
            var k = this._attrKeys[v], $ = this._attrsByLName[k], J = $.cloneNode();
            J._setOwnerElement(h), h._attrsByLName[k] = J, h._addQName(J)
          }
          return h._attrKeys = this._attrKeys.concat(), h
        }
      }, isEqual: {
        value: function (h) {
          if (this.localName !== h.localName || this.namespaceURI !== h.namespaceURI || this.prefix !== h.prefix || this._numattrs !== h._numattrs) return !1;
          for (var v = 0, C = this._numattrs; v < C; v++) {
            var k = this._attr(v);
            if (!h.hasAttributeNS(k.namespaceURI, k.localName) || h.getAttributeNS(k.namespaceURI, k.localName) !== k.value) return !1
          }
          return !0
        }
      }, _lookupNamespacePrefix: {
        value: function (h, v) {
          if (this.namespaceURI && this.namespaceURI === h && this.prefix !== null && v.lookupNamespaceURI(this.prefix) === h) return this.prefix;
          for (var C = 0, k = this._numattrs; C < k; C++) {
            var $ = this._attr(C);
            if ($.prefix === "xmlns" && $.value === h && v.lookupNamespaceURI($.localName) === h) return $.localName
          }
          var J = this.parentElement;
          return J ? J._lookupNamespacePrefix(h, v) : null
        }
      }, lookupNamespaceURI: {
        value: function (h) {
          if ((h === "" || h === void 0) && (h = null), this.namespaceURI !== null && this.prefix === h) return this.namespaceURI;
          for (var v = 0, C = this._numattrs; v < C; v++) {
            var k = this._attr(v);
            if (k.namespaceURI === n.XMLNS && (k.prefix === "xmlns" && k.localName === h || h === null && k.prefix === null && k.localName === "xmlns")) return k.value || null
          }
          var $ = this.parentElement;
          return $ ? $.lookupNamespaceURI(h) : null
        }
      }, getAttribute: {
        value: function (h) {
          var v = this.getAttributeNode(h);
          return v ? v.value : null
        }
      }, getAttributeNS: {
        value: function (h, v) {
          var C = this.getAttributeNodeNS(h, v);
          return C ? C.value : null
        }
      }, getAttributeNode: {
        value: function (h) {
          h = String(h), /[A-Z]/.test(h) && this.isHTML && (h = r.toASCIILowerCase(h));
          var v = this._attrsByQName[h];
          return v ? (Array.isArray(v) && (v = v[0]), v) : null
        }
      }, getAttributeNodeNS: {
        value: function (h, v) {
          h = h == null ? "" : String(h), v = String(v);
          var C = this._attrsByLName[h + "|" + v];
          return C || null
        }
      }, hasAttribute: {
        value: function (h) {
          return h = String(h), /[A-Z]/.test(h) && this.isHTML && (h = r.toASCIILowerCase(h)), this._attrsByQName[h] !== void 0
        }
      }, hasAttributeNS: {
        value: function (h, v) {
          h = h == null ? "" : String(h), v = String(v);
          var C = h + "|" + v;
          return this._attrsByLName[C] !== void 0
        }
      }, hasAttributes: {
        value: function () {
          return this._numattrs > 0
        }
      }, toggleAttribute: {
        value: function (h, v) {
          h = String(h), i.isValidName(h) || r.InvalidCharacterError(), /[A-Z]/.test(h) && this.isHTML && (h = r.toASCIILowerCase(h));
          var C = this._attrsByQName[h];
          return C === void 0 ? v === void 0 || v === !0 ? (this._setAttribute(h, ""), !0) : !1 : v === void 0 || v === !1 ? (this.removeAttribute(h), !1) : !0
        }
      }, _setAttribute: {
        value: function (h, v) {
          var C = this._attrsByQName[h], k;
          C ? Array.isArray(C) && (C = C[0]) : (C = this._newattr(h), k = !0), C.value = v, this._attributes && (this._attributes[h] = C), k && this._newattrhook && this._newattrhook(h, v)
        }
      }, setAttribute: {
        value: function (h, v) {
          h = String(h), i.isValidName(h) || r.InvalidCharacterError(), /[A-Z]/.test(h) && this.isHTML && (h = r.toASCIILowerCase(h)), this._setAttribute(h, String(v))
        }
      }, _setAttributeNS: {
        value: function (h, v, C) {
          var k = v.indexOf(":"), $, J;
          k < 0 ? ($ = null, J = v) : ($ = v.substring(0, k), J = v.substring(k + 1)), (h === "" || h === void 0) && (h = null);
          var pe = (h === null ? "" : h) + "|" + J, _ = this._attrsByLName[pe], M;
          _ || (_ = new N(this, J, $, h), M = !0, this._attrsByLName[pe] = _, this._attributes && (this._attributes[this._attrKeys.length] = _), this._attrKeys.push(pe), this._addQName(_)), _.value = C, M && this._newattrhook && this._newattrhook(v, C)
        }
      }, setAttributeNS: {
        value: function (h, v, C) {
          h = h == null || h === "" ? null : String(h), v = String(v), i.isValidQName(v) || r.InvalidCharacterError();
          var k = v.indexOf(":"), $ = k < 0 ? null : v.substring(0, k);
          ($ !== null && h === null || $ === "xml" && h !== n.XML || (v === "xmlns" || $ === "xmlns") && h !== n.XMLNS || h === n.XMLNS && !(v === "xmlns" || $ === "xmlns")) && r.NamespaceError(), this._setAttributeNS(h, v, String(C))
        }
      }, setAttributeNode: {
        value: function (h) {
          if (h.ownerElement !== null && h.ownerElement !== this) throw new g(g.INUSE_ATTRIBUTE_ERR);
          var v = null, C = this._attrsByQName[h.name];
          if (C) {
            if (Array.isArray(C) || (C = [C]), C.some(function (k) {
              return k === h
            })) return h;
            if (h.ownerElement !== null) throw new g(g.INUSE_ATTRIBUTE_ERR);
            C.forEach(function (k) {
              this.removeAttributeNode(k)
            }, this), v = C[0]
          }
          return this.setAttributeNodeNS(h), v
        }
      }, setAttributeNodeNS: {
        value: function (h) {
          if (h.ownerElement !== null) throw new g(g.INUSE_ATTRIBUTE_ERR);
          var v = h.namespaceURI, C = (v === null ? "" : v) + "|" + h.localName, k = this._attrsByLName[C];
          return k && this.removeAttributeNode(k), h._setOwnerElement(this), this._attrsByLName[C] = h, this._attributes && (this._attributes[this._attrKeys.length] = h), this._attrKeys.push(C), this._addQName(h), this._newattrhook && this._newattrhook(h.name, h.value), k || null
        }
      }, removeAttribute: {
        value: function (h) {
          h = String(h), /[A-Z]/.test(h) && this.isHTML && (h = r.toASCIILowerCase(h));
          var v = this._attrsByQName[h];
          if (v) {
            Array.isArray(v) ? v.length > 2 ? v = v.shift() : (this._attrsByQName[h] = v[1], v = v[0]) : this._attrsByQName[h] = void 0;
            var C = v.namespaceURI, k = (C === null ? "" : C) + "|" + v.localName;
            this._attrsByLName[k] = void 0;
            var $ = this._attrKeys.indexOf(k);
            this._attributes && (Array.prototype.splice.call(this._attributes, $, 1), this._attributes[h] = void 0), this._attrKeys.splice($, 1);
            var J = v.onchange;
            v._setOwnerElement(null), J && J.call(v, this, v.localName, v.value, null), this.rooted && this.ownerDocument.mutateRemoveAttr(v)
          }
        }
      }, removeAttributeNS: {
        value: function (h, v) {
          h = h == null ? "" : String(h), v = String(v);
          var C = h + "|" + v, k = this._attrsByLName[C];
          if (k) {
            this._attrsByLName[C] = void 0;
            var $ = this._attrKeys.indexOf(C);
            this._attributes && Array.prototype.splice.call(this._attributes, $, 1), this._attrKeys.splice($, 1), this._removeQName(k);
            var J = k.onchange;
            k._setOwnerElement(null), J && J.call(k, this, k.localName, k.value, null), this.rooted && this.ownerDocument.mutateRemoveAttr(k)
          }
        }
      }, removeAttributeNode: {
        value: function (h) {
          var v = h.namespaceURI, C = (v === null ? "" : v) + "|" + h.localName;
          return this._attrsByLName[C] !== h && r.NotFoundError(), this.removeAttributeNS(v, h.localName), h
        }
      }, getAttributeNames: {
        value: function () {
          var h = this;
          return this._attrKeys.map(function (v) {
            return h._attrsByLName[v].name
          })
        }
      }, _getattr: {
        value: function (h) {
          var v = this._attrsByQName[h];
          return v ? v.value : null
        }
      }, _setattr: {
        value: function (h, v) {
          var C = this._attrsByQName[h], k;
          C || (C = this._newattr(h), k = !0), C.value = String(v), this._attributes && (this._attributes[h] = C), k && this._newattrhook && this._newattrhook(h, v)
        }
      }, _newattr: {
        value: function (h) {
          var v = new N(this, h, null, null), C = "|" + h;
          return this._attrsByQName[h] = v, this._attrsByLName[C] = v, this._attributes && (this._attributes[this._attrKeys.length] = v), this._attrKeys.push(C), v
        }
      }, _addQName: {
        value: function (f) {
          var h = f.name, v = this._attrsByQName[h];
          v ? Array.isArray(v) ? v.push(f) : this._attrsByQName[h] = [v, f] : this._attrsByQName[h] = f, this._attributes && (this._attributes[h] = f)
        }
      }, _removeQName: {
        value: function (f) {
          var h = f.name, v = this._attrsByQName[h];
          if (Array.isArray(v)) {
            var C = v.indexOf(f);
            r.assert(C !== -1), v.length === 2 ? (this._attrsByQName[h] = v[1 - C], this._attributes && (this._attributes[h] = this._attrsByQName[h])) : (v.splice(C, 1), this._attributes && this._attributes[h] === f && (this._attributes[h] = v[0]))
          } else r.assert(v === f), this._attrsByQName[h] = void 0, this._attributes && (this._attributes[h] = void 0)
        }
      }, _numattrs: {
        get: function () {
          return this._attrKeys.length
        }
      }, _attr: {
        value: function (f) {
          return this._attrsByLName[this._attrKeys[f]]
        }
      }, id: s.property({name: "id"}), className: s.property({name: "class"}), classList: {
        get: function () {
          var f = this;
          if (this._classList) return this._classList;
          var h = new m(function () {
            return f.className || ""
          }, function (v) {
            f.className = v
          });
          return this._classList = h, h
        }, set: function (f) {
          this.className = f
        }
      }, matches: {
        value: function (f) {
          return b.matches(this, f)
        }
      }, closest: {
        value: function (f) {
          var h = this;
          do {
            if (h.matches && h.matches(f)) return h;
            h = h.parentElement || h.parentNode
          } while (h !== null && h.nodeType === a.ELEMENT_NODE);
          return null
        }
      }, querySelector: {
        value: function (f) {
          return b(f, this)[0]
        }
      }, querySelectorAll: {
        value: function (f) {
          var h = b(f, this);
          return h.item ? h : new o(h)
        }
      }
    }), Object.defineProperties(w.prototype, U), Object.defineProperties(w.prototype, O), s.registerChangeHandler(w, "id", function (f, h, v, C) {
      f.rooted && (v && f.ownerDocument.delId(v, f), C && f.ownerDocument.addId(C, f))
    }), s.registerChangeHandler(w, "class", function (f, h, v, C) {
      f._classList && f._classList._update()
    });

    function N(f, h, v, C, k) {
      this.localName = h, this.prefix = v === null || v === "" ? null : "" + v, this.namespaceURI = C === null || C === "" ? null : "" + C, this.data = k, this._setOwnerElement(f)
    }

    N.prototype = Object.create(Object.prototype, {
      ownerElement: {
        get: function () {
          return this._ownerElement
        }
      }, _setOwnerElement: {
        value: function (h) {
          this._ownerElement = h, this.prefix === null && this.namespaceURI === null && h ? this.onchange = h._attributeChangeHandlers[this.localName] : this.onchange = null
        }
      }, name: {
        get: function () {
          return this.prefix ? this.prefix + ":" + this.localName : this.localName
        }
      }, specified: {
        get: function () {
          return !0
        }
      }, value: {
        get: function () {
          return this.data
        }, set: function (f) {
          var h = this.data;
          f = f === void 0 ? "" : f + "", f !== h && (this.data = f, this.ownerElement && (this.onchange && this.onchange(this.ownerElement, this.localName, h, f), this.ownerElement.rooted && this.ownerElement.ownerDocument.mutateAttr(this, h)))
        }
      }, cloneNode: {
        value: function (h) {
          return new N(null, this.localName, this.prefix, this.namespaceURI, this.data)
        }
      }, nodeType: {
        get: function () {
          return a.ATTRIBUTE_NODE
        }
      }, nodeName: {
        get: function () {
          return this.name
        }
      }, nodeValue: {
        get: function () {
          return this.value
        }, set: function (f) {
          this.value = f
        }
      }, textContent: {
        get: function () {
          return this.value
        }, set: function (f) {
          f == null && (f = ""), this.value = f
        }
      }, innerText: {
        get: function () {
          return this.value
        }, set: function (f) {
          f == null && (f = ""), this.value = f
        }
      }
    }), w._Attr = N;

    function y(f) {
      Y.call(this, f);
      for (var h in f._attrsByQName) this[h] = f._attrsByQName[h];
      for (var v = 0; v < f._attrKeys.length; v++) this[v] = f._attrsByLName[f._attrKeys[v]]
    }

    y.prototype = Object.create(Y.prototype, {
      length: {
        get: function () {
          return this.element._attrKeys.length
        }, set: function () {
        }
      }, item: {
        value: function (f) {
          return f = f >>> 0, f >= this.length ? null : this.element._attrsByLName[this.element._attrKeys[f]]
        }
      }
    });
    var ce;
    (ce = globalThis.Symbol) != null && ce.iterator && (y.prototype[globalThis.Symbol.iterator] = function () {
      var f = 0, h = this.length, v = this;
      return {
        next: function () {
          return f < h ? {value: v.item(f++)} : {done: !0}
        }
      }
    });

    function de(f) {
      this.element = f, this.updateCache()
    }

    de.prototype = Object.create(Object.prototype, {
      length: {
        get: function () {
          return this.updateCache(), this.childrenByNumber.length
        }
      }, item: {
        value: function (h) {
          return this.updateCache(), this.childrenByNumber[h] || null
        }
      }, namedItem: {
        value: function (h) {
          return this.updateCache(), this.childrenByName[h] || null
        }
      }, namedItems: {
        get: function () {
          return this.updateCache(), this.childrenByName
        }
      }, updateCache: {
        value: function () {
          var h = /^(a|applet|area|embed|form|frame|frameset|iframe|img|object)$/;
          if (this.lastModTime !== this.element.lastModTime) {
            this.lastModTime = this.element.lastModTime;
            for (var v = this.childrenByNumber && this.childrenByNumber.length || 0, C = 0; C < v; C++) this[C] = void 0;
            this.childrenByNumber = [], this.childrenByName = Object.create(null);
            for (var k = this.element.firstChild; k !== null; k = k.nextSibling) if (k.nodeType === a.ELEMENT_NODE) {
              this[this.childrenByNumber.length] = k, this.childrenByNumber.push(k);
              var $ = k.getAttribute("id");
              $ && !this.childrenByName[$] && (this.childrenByName[$] = k);
              var J = k.getAttribute("name");
              J && this.element.namespaceURI === n.HTML && h.test(this.element.localName) && !this.childrenByName[J] && (this.childrenByName[$] = k)
            }
          }
        }
      }
    });

    function Ae(f) {
      return function (h) {
        return h.localName === f
      }
    }

    function j(f) {
      var h = r.toASCIILowerCase(f);
      return h === f ? Ae(f) : function (v) {
        return v.isHTML ? v.localName === h : v.localName === f
      }
    }

    function A(f) {
      return function (h) {
        return h.namespaceURI === f
      }
    }

    function P(f, h) {
      return function (v) {
        return v.namespaceURI === f && v.localName === h
      }
    }

    function K(f) {
      return function (h) {
        return f.every(function (v) {
          return h.classList.contains(v)
        })
      }
    }

    function p(f) {
      return function (h) {
        return h.namespaceURI !== n.HTML ? !1 : h.getAttribute("name") === f
      }
    }
  }
}), mc = Z({
  "external/npm/node_modules/domino/lib/Leaf.js"(t, e) {
    "use strict";
    e.exports = o;
    var i = Be(), r = br(), n = Oe(), s = n.HierarchyRequestError, a = n.NotFoundError;

    function o() {
      i.call(this)
    }

    o.prototype = Object.create(i.prototype, {
      hasChildNodes: {
        value: function () {
          return !1
        }
      }, firstChild: {value: null}, lastChild: {value: null}, insertBefore: {
        value: function (d, l) {
          if (!d.nodeType) throw new TypeError("not a node");
          s()
        }
      }, replaceChild: {
        value: function (d, l) {
          if (!d.nodeType) throw new TypeError("not a node");
          s()
        }
      }, removeChild: {
        value: function (d) {
          if (!d.nodeType) throw new TypeError("not a node");
          a()
        }
      }, removeChildren: {
        value: function () {
        }
      }, childNodes: {
        get: function () {
          return this._childNodes || (this._childNodes = new r), this._childNodes
        }
      }
    })
  }
}), li = Z({
  "external/npm/node_modules/domino/lib/CharacterData.js"(t, e) {
    "use strict";
    e.exports = a;
    var i = mc(), r = Oe(), n = Ps(), s = fc();

    function a() {
      i.call(this)
    }

    a.prototype = Object.create(i.prototype, {
      substringData: {
        value: function (d, l) {
          if (arguments.length < 2) throw new TypeError("Not enough arguments");
          return d = d >>> 0, l = l >>> 0, (d > this.data.length || d < 0 || l < 0) && r.IndexSizeError(), this.data.substring(d, d + l)
        }
      }, appendData: {
        value: function (d) {
          if (arguments.length < 1) throw new TypeError("Not enough arguments");
          this.data += String(d)
        }
      }, insertData: {
        value: function (d, l) {
          return this.replaceData(d, 0, l)
        }
      }, deleteData: {
        value: function (d, l) {
          return this.replaceData(d, l, "")
        }
      }, replaceData: {
        value: function (d, l, g) {
          var m = this.data, b = m.length;
          d = d >>> 0, l = l >>> 0, g = String(g), (d > b || d < 0) && r.IndexSizeError(), d + l > b && (l = b - d);
          var I = m.substring(0, d), U = m.substring(d + l);
          this.data = I + g + U
        }
      }, isEqual: {
        value: function (d) {
          return this._data === d._data
        }
      }, length: {
        get: function () {
          return this.data.length
        }
      }
    }), Object.defineProperties(a.prototype, n), Object.defineProperties(a.prototype, s)
  }
}), gc = Z({
  "external/npm/node_modules/domino/lib/Text.js"(t, e) {
    "use strict";
    e.exports = s;
    var i = Oe(), r = Be(), n = li();

    function s(o, d) {
      n.call(this), this.nodeType = r.TEXT_NODE, this.ownerDocument = o, this._data = d, this._index = void 0
    }

    var a = {
      get: function () {
        return this._data
      }, set: function (o) {
        o == null ? o = "" : o = String(o), o !== this._data && (this._data = o, this.rooted && this.ownerDocument.mutateValue(this), this.parentNode && this.parentNode._textchangehook && this.parentNode._textchangehook(this))
      }
    };
    s.prototype = Object.create(n.prototype, {
      nodeName: {value: "#text"},
      nodeValue: a,
      textContent: a,
      innerText: a,
      data: {
        get: a.get, set: function (o) {
          a.set.call(this, o === null ? "" : String(o))
        }
      },
      splitText: {
        value: function (d) {
          (d > this._data.length || d < 0) && i.IndexSizeError();
          var l = this._data.substring(d), g = this.ownerDocument.createTextNode(l);
          this.data = this.data.substring(0, d);
          var m = this.parentNode;
          return m !== null && m.insertBefore(g, this.nextSibling), g
        }
      },
      wholeText: {
        get: function () {
          for (var d = this.textContent, l = this.nextSibling; l && l.nodeType === r.TEXT_NODE; l = l.nextSibling) d += l.textContent;
          return d
        }
      },
      replaceWholeText: {value: i.nyi},
      clone: {
        value: function () {
          return new s(this.ownerDocument, this._data)
        }
      }
    })
  }
}), vc = Z({
  "external/npm/node_modules/domino/lib/Comment.js"(t, e) {
    "use strict";
    e.exports = n;
    var i = Be(), r = li();

    function n(a, o) {
      r.call(this), this.nodeType = i.COMMENT_NODE, this.ownerDocument = a, this._data = o
    }

    var s = {
      get: function () {
        return this._data
      }, set: function (a) {
        a == null ? a = "" : a = String(a), this._data = a, this.rooted && this.ownerDocument.mutateValue(this)
      }
    };
    n.prototype = Object.create(r.prototype, {
      nodeName: {value: "#comment"},
      nodeValue: s,
      textContent: s,
      innerText: s,
      data: {
        get: s.get, set: function (a) {
          s.set.call(this, a === null ? "" : String(a))
        }
      },
      clone: {
        value: function () {
          return new n(this.ownerDocument, this._data)
        }
      }
    })
  }
}), bc = Z({
  "external/npm/node_modules/domino/lib/DocumentFragment.js"(t, e) {
    "use strict";
    e.exports = d;
    var i = Be(), r = br(), n = ks(), s = Qr(), a = xs(), o = Oe();

    function d(l) {
      n.call(this), this.nodeType = i.DOCUMENT_FRAGMENT_NODE, this.ownerDocument = l
    }

    d.prototype = Object.create(n.prototype, {
      nodeName: {value: "#document-fragment"},
      nodeValue: {
        get: function () {
          return null
        }, set: function () {
        }
      },
      textContent: Object.getOwnPropertyDescriptor(s.prototype, "textContent"),
      innerText: Object.getOwnPropertyDescriptor(s.prototype, "innerText"),
      querySelector: {
        value: function (l) {
          var g = this.querySelectorAll(l);
          return g.length ? g[0] : null
        }
      },
      querySelectorAll: {
        value: function (l) {
          var g = Object.create(this);
          g.isHTML = !0, g.getElementsByTagName = s.prototype.getElementsByTagName, g.nextElement = Object.getOwnPropertyDescriptor(s.prototype, "firstElementChild").get;
          var m = a(l, g);
          return m.item ? m : new r(m)
        }
      },
      clone: {
        value: function () {
          return new d(this.ownerDocument)
        }
      },
      isEqual: {
        value: function (g) {
          return !0
        }
      },
      innerHTML: {
        get: function () {
          return this.serialize()
        }, set: o.nyi
      },
      outerHTML: {
        get: function () {
          return this.serialize()
        }, set: o.nyi
      }
    })
  }
}), yc = Z({
  "external/npm/node_modules/domino/lib/ProcessingInstruction.js"(t, e) {
    "use strict";
    e.exports = n;
    var i = Be(), r = li();

    function n(a, o, d) {
      r.call(this), this.nodeType = i.PROCESSING_INSTRUCTION_NODE, this.ownerDocument = a, this.target = o, this._data = d
    }

    var s = {
      get: function () {
        return this._data
      }, set: function (a) {
        a == null ? a = "" : a = String(a), this._data = a, this.rooted && this.ownerDocument.mutateValue(this)
      }
    };
    n.prototype = Object.create(r.prototype, {
      nodeName: {
        get: function () {
          return this.target
        }
      }, nodeValue: s, textContent: s, innerText: s, data: {
        get: s.get, set: function (a) {
          s.set.call(this, a === null ? "" : String(a))
        }
      }, clone: {
        value: function () {
          return new n(this.ownerDocument, this.target, this._data)
        }
      }, isEqual: {
        value: function (o) {
          return this.target === o.target && this._data === o._data
        }
      }
    })
  }
}), ui = Z({
  "external/npm/node_modules/domino/lib/NodeFilter.js"(t, e) {
    "use strict";
    var i = {
      FILTER_ACCEPT: 1,
      FILTER_REJECT: 2,
      FILTER_SKIP: 3,
      SHOW_ALL: 4294967295,
      SHOW_ELEMENT: 1,
      SHOW_ATTRIBUTE: 2,
      SHOW_TEXT: 4,
      SHOW_CDATA_SECTION: 8,
      SHOW_ENTITY_REFERENCE: 16,
      SHOW_ENTITY: 32,
      SHOW_PROCESSING_INSTRUCTION: 64,
      SHOW_COMMENT: 128,
      SHOW_DOCUMENT: 256,
      SHOW_DOCUMENT_TYPE: 512,
      SHOW_DOCUMENT_FRAGMENT: 1024,
      SHOW_NOTATION: 2048
    };
    e.exports = i.constructor = i.prototype = i
  }
}), Ec = Z({
  "external/npm/node_modules/domino/lib/NodeTraversal.js"(t, e) {
    "use strict";
    var i = e.exports = {nextSkippingChildren: r, nextAncestorSibling: n, next: s, previous: o, deepLastChild: a};

    function r(d, l) {
      return d === l ? null : d.nextSibling !== null ? d.nextSibling : n(d, l)
    }

    function n(d, l) {
      for (d = d.parentNode; d !== null; d = d.parentNode) {
        if (d === l) return null;
        if (d.nextSibling !== null) return d.nextSibling
      }
      return null
    }

    function s(d, l) {
      var g;
      return g = d.firstChild, g !== null ? g : d === l ? null : (g = d.nextSibling, g !== null ? g : n(d, l))
    }

    function a(d) {
      for (; d.lastChild;) d = d.lastChild;
      return d
    }

    function o(d, l) {
      var g;
      return g = d.previousSibling, g !== null ? a(g) : (g = d.parentNode, g === l ? null : g)
    }
  }
}), uh = Z({
  "external/npm/node_modules/domino/lib/TreeWalker.js"(t, e) {
    "use strict";
    e.exports = g;
    var i = Be(), r = ui(), n = Ec(), s = Oe(),
      a = {first: "firstChild", last: "lastChild", next: "firstChild", previous: "lastChild"},
      o = {first: "nextSibling", last: "previousSibling", next: "nextSibling", previous: "previousSibling"};

    function d(m, b) {
      var I, U, O, Y, x;
      for (U = m._currentNode[a[b]]; U !== null;) {
        if (Y = m._internalFilter(U), Y === r.FILTER_ACCEPT) return m._currentNode = U, U;
        if (Y === r.FILTER_SKIP && (I = U[a[b]], I !== null)) {
          U = I;
          continue
        }
        for (; U !== null;) {
          if (x = U[o[b]], x !== null) {
            U = x;
            break
          }
          if (O = U.parentNode, O === null || O === m.root || O === m._currentNode) return null;
          U = O
        }
      }
      return null
    }

    function l(m, b) {
      var I, U, O;
      if (I = m._currentNode, I === m.root) return null;
      for (; ;) {
        for (O = I[o[b]]; O !== null;) {
          if (I = O, U = m._internalFilter(I), U === r.FILTER_ACCEPT) return m._currentNode = I, I;
          O = I[a[b]], (U === r.FILTER_REJECT || O === null) && (O = I[o[b]])
        }
        if (I = I.parentNode, I === null || I === m.root || m._internalFilter(I) === r.FILTER_ACCEPT) return null
      }
    }

    function g(m, b, I) {
      (!m || !m.nodeType) && s.NotSupportedError(), this._root = m, this._whatToShow = Number(b) || 0, this._filter = I || null, this._active = !1, this._currentNode = m
    }

    Object.defineProperties(g.prototype, {
      root: {
        get: function () {
          return this._root
        }
      }, whatToShow: {
        get: function () {
          return this._whatToShow
        }
      }, filter: {
        get: function () {
          return this._filter
        }
      }, currentNode: {
        get: function () {
          return this._currentNode
        }, set: function (b) {
          if (!(b instanceof i)) throw new TypeError("Not a Node");
          this._currentNode = b
        }
      }, _internalFilter: {
        value: function (b) {
          var I, U;
          if (this._active && s.InvalidStateError(), !(1 << b.nodeType - 1 & this._whatToShow)) return r.FILTER_SKIP;
          if (U = this._filter, U === null) I = r.FILTER_ACCEPT; else {
            this._active = !0;
            try {
              typeof U == "function" ? I = U(b) : I = U.acceptNode(b)
            } finally {
              this._active = !1
            }
          }
          return +I
        }
      }, parentNode: {
        value: function () {
          for (var b = this._currentNode; b !== this.root;) {
            if (b = b.parentNode, b === null) return null;
            if (this._internalFilter(b) === r.FILTER_ACCEPT) return this._currentNode = b, b
          }
          return null
        }
      }, firstChild: {
        value: function () {
          return d(this, "first")
        }
      }, lastChild: {
        value: function () {
          return d(this, "last")
        }
      }, previousSibling: {
        value: function () {
          return l(this, "previous")
        }
      }, nextSibling: {
        value: function () {
          return l(this, "next")
        }
      }, previousNode: {
        value: function () {
          var b, I, U, O;
          for (b = this._currentNode; b !== this._root;) {
            for (U = b.previousSibling; U; U = b.previousSibling) if (b = U, I = this._internalFilter(b), I !== r.FILTER_REJECT) {
              for (O = b.lastChild; O && (b = O, I = this._internalFilter(b), I !== r.FILTER_REJECT); O = b.lastChild) ;
              if (I === r.FILTER_ACCEPT) return this._currentNode = b, b
            }
            if (b === this.root || b.parentNode === null) return null;
            if (b = b.parentNode, this._internalFilter(b) === r.FILTER_ACCEPT) return this._currentNode = b, b
          }
          return null
        }
      }, nextNode: {
        value: function () {
          var b, I, U, O;
          b = this._currentNode, I = r.FILTER_ACCEPT;
          e:for (; ;) {
            for (U = b.firstChild; U; U = b.firstChild) {
              if (b = U, I = this._internalFilter(b), I === r.FILTER_ACCEPT) return this._currentNode = b, b;
              if (I === r.FILTER_REJECT) break
            }
            for (O = n.nextSkippingChildren(b, this.root); O; O = n.nextSkippingChildren(b, this.root)) {
              if (b = O, I = this._internalFilter(b), I === r.FILTER_ACCEPT) return this._currentNode = b, b;
              if (I === r.FILTER_SKIP) continue e
            }
            return null
          }
        }
      }, toString: {
        value: function () {
          return "[object TreeWalker]"
        }
      }
    })
  }
}), hh = Z({
  "external/npm/node_modules/domino/lib/NodeIterator.js"(t, e) {
    "use strict";
    e.exports = d;
    var i = ui(), r = Ec(), n = Oe();

    function s(l, g, m) {
      return m ? r.next(l, g) : l === g ? null : r.previous(l, null)
    }

    function a(l, g) {
      for (; g; g = g.parentNode) if (l === g) return !0;
      return !1
    }

    function o(l, g) {
      var m, b;
      for (m = l._referenceNode, b = l._pointerBeforeReferenceNode; ;) {
        if (b === g) b = !b; else if (m = s(m, l._root, g), m === null) return null;
        var I = l._internalFilter(m);
        if (I === i.FILTER_ACCEPT) break
      }
      return l._referenceNode = m, l._pointerBeforeReferenceNode = b, m
    }

    function d(l, g, m) {
      (!l || !l.nodeType) && n.NotSupportedError(), this._root = l, this._referenceNode = l, this._pointerBeforeReferenceNode = !0, this._whatToShow = Number(g) || 0, this._filter = m || null, this._active = !1, l.doc._attachNodeIterator(this)
    }

    Object.defineProperties(d.prototype, {
      root: {
        get: function () {
          return this._root
        }
      }, referenceNode: {
        get: function () {
          return this._referenceNode
        }
      }, pointerBeforeReferenceNode: {
        get: function () {
          return this._pointerBeforeReferenceNode
        }
      }, whatToShow: {
        get: function () {
          return this._whatToShow
        }
      }, filter: {
        get: function () {
          return this._filter
        }
      }, _internalFilter: {
        value: function (g) {
          var m, b;
          if (this._active && n.InvalidStateError(), !(1 << g.nodeType - 1 & this._whatToShow)) return i.FILTER_SKIP;
          if (b = this._filter, b === null) m = i.FILTER_ACCEPT; else {
            this._active = !0;
            try {
              typeof b == "function" ? m = b(g) : m = b.acceptNode(g)
            } finally {
              this._active = !1
            }
          }
          return +m
        }
      }, _preremove: {
        value: function (g) {
          if (!a(g, this._root) && a(g, this._referenceNode)) {
            if (this._pointerBeforeReferenceNode) {
              for (var m = g; m.lastChild;) m = m.lastChild;
              if (m = r.next(m, this.root), m) {
                this._referenceNode = m;
                return
              }
              this._pointerBeforeReferenceNode = !1
            }
            if (g.previousSibling === null) this._referenceNode = g.parentNode; else {
              this._referenceNode = g.previousSibling;
              var b;
              for (b = this._referenceNode.lastChild; b; b = this._referenceNode.lastChild) this._referenceNode = b
            }
          }
        }
      }, nextNode: {
        value: function () {
          return o(this, !0)
        }
      }, previousNode: {
        value: function () {
          return o(this, !1)
        }
      }, detach: {
        value: function () {
        }
      }, toString: {
        value: function () {
          return "[object NodeIterator]"
        }
      }
    })
  }
}), Us = Z({
  "external/npm/node_modules/domino/lib/URL.js"(t, e) {
    "use strict";
    e.exports = i;

    function i(r) {
      if (!r) return Object.create(i.prototype);
      this.url = r.replace(/^[ \t\n\r\f]+|[ \t\n\r\f]+$/g, "");
      var n = i.pattern.exec(this.url);
      if (n) {
        if (n[2] && (this.scheme = n[2]), n[4]) {
          var s = n[4].match(i.userinfoPattern);
          if (s && (this.username = s[1], this.password = s[3], n[4] = n[4].substring(s[0].length)), n[4].match(i.portPattern)) {
            var a = n[4].lastIndexOf(":");
            this.host = n[4].substring(0, a), this.port = n[4].substring(a + 1)
          } else this.host = n[4]
        }
        n[5] && (this.path = n[5]), n[6] && (this.query = n[7]), n[8] && (this.fragment = n[9])
      }
    }

    i.pattern = /^(([^:\/?#]+):)?(\/\/([^\/?#]*))?([^?#]*)(\?([^#]*))?(#(.*))?$/, i.userinfoPattern = /^([^@:]*)(:([^@]*))?@/, i.portPattern = /:\d+$/, i.authorityPattern = /^[^:\/?#]+:\/\//, i.hierarchyPattern = /^[^:\/?#]+:\//, i.percentEncode = function (n) {
      var s = n.charCodeAt(0);
      if (s < 256) return "%" + s.toString(16);
      throw Error("can't percent-encode codepoints > 255 yet")
    }, i.prototype = {
      constructor: i, isAbsolute: function () {
        return !!this.scheme
      }, isAuthorityBased: function () {
        return i.authorityPattern.test(this.url)
      }, isHierarchical: function () {
        return i.hierarchyPattern.test(this.url)
      }, toString: function () {
        var r = "";
        return this.scheme !== void 0 && (r += this.scheme + ":"), this.isAbsolute() && (r += "//", (this.username || this.password) && (r += this.username || "", this.password && (r += ":" + this.password), r += "@"), this.host && (r += this.host)), this.port !== void 0 && (r += ":" + this.port), this.path !== void 0 && (r += this.path), this.query !== void 0 && (r += "?" + this.query), this.fragment !== void 0 && (r += "#" + this.fragment), r
      }, resolve: function (r) {
        var n = this, s = new i(r), a = new i;
        return s.scheme !== void 0 ? (a.scheme = s.scheme, a.username = s.username, a.password = s.password, a.host = s.host, a.port = s.port, a.path = d(s.path), a.query = s.query) : (a.scheme = n.scheme, s.host !== void 0 ? (a.username = s.username, a.password = s.password, a.host = s.host, a.port = s.port, a.path = d(s.path), a.query = s.query) : (a.username = n.username, a.password = n.password, a.host = n.host, a.port = n.port, s.path ? (s.path.charAt(0) === "/" ? a.path = d(s.path) : (a.path = o(n.path, s.path), a.path = d(a.path)), a.query = s.query) : (a.path = n.path, s.query !== void 0 ? a.query = s.query : a.query = n.query))), a.fragment = s.fragment, a.toString();

        function o(l, g) {
          if (n.host !== void 0 && !n.path) return "/" + g;
          var m = l.lastIndexOf("/");
          return m === -1 ? g : l.substring(0, m + 1) + g
        }

        function d(l) {
          if (!l) return l;
          for (var g = ""; l.length > 0;) {
            if (l === "." || l === "..") {
              l = "";
              break
            }
            var m = l.substring(0, 2), b = l.substring(0, 3), I = l.substring(0, 4);
            if (b === "../") l = l.substring(3); else if (m === "./") l = l.substring(2); else if (b === "/./") l = "/" + l.substring(3); else if (m === "/." && l.length === 2) l = "/"; else if (I === "/../" || b === "/.." && l.length === 3) l = "/" + l.substring(4), g = g.replace(/\/?[^\/]*$/, ""); else {
              var U = l.match(/(\/?([^\/]*))/)[0];
              g += U, l = l.substring(U.length)
            }
          }
          return g
        }
      }
    }
  }
}), dh = Z({
  "external/npm/node_modules/domino/lib/CustomEvent.js"(t, e) {
    "use strict";
    e.exports = r;
    var i = Yr();

    function r(n, s) {
      i.call(this, n, s)
    }

    r.prototype = Object.create(i.prototype, {constructor: {value: r}})
  }
}), Tc = Z({
  "external/npm/node_modules/domino/lib/events.js"(t, e) {
    "use strict";
    e.exports = {Event: Yr(), UIEvent: ac(), MouseEvent: oc(), CustomEvent: dh()}
  }
}), fh = Z({
  "external/npm/node_modules/domino/lib/style_parser.js"(t) {
    "use strict";
    Object.defineProperty(t, "__esModule", {value: !0}), t.hyphenate = t.parse = void 0;

    function e(r) {
      let n = [], s = 0, a = 0, o = 0, d = 0, l = 0, g = null;
      for (; s < r.length;) switch (r.charCodeAt(s++)) {
        case 40:
          a++;
          break;
        case 41:
          a--;
          break;
        case 39:
          o === 0 ? o = 39 : o === 39 && r.charCodeAt(s - 1) !== 92 && (o = 0);
          break;
        case 34:
          o === 0 ? o = 34 : o === 34 && r.charCodeAt(s - 1) !== 92 && (o = 0);
          break;
        case 58:
          !g && a === 0 && o === 0 && (g = i(r.substring(l, s - 1).trim()), d = s);
          break;
        case 59:
          if (g && d > 0 && a === 0 && o === 0) {
            let b = r.substring(d, s - 1).trim();
            n.push(g, b), l = s, d = 0, g = null
          }
          break
      }
      if (g && d) {
        let m = r.slice(d).trim();
        n.push(g, m)
      }
      return n
    }

    t.parse = e;

    function i(r) {
      return r.replace(/[a-z][A-Z]/g, n => n.charAt(0) + "-" + n.charAt(1)).toLowerCase()
    }

    t.hyphenate = i
  }
}), qs = Z({
  "external/npm/node_modules/domino/lib/CSSStyleDeclaration.js"(t, e) {
    "use strict";
    var {parse: i} = fh();
    e.exports = function (d) {
      let l = new n(d), g = {
        get: function (m, b) {
          return b in m ? m[b] : m.getPropertyValue(r(b))
        }, has: function (m, b) {
          return !0
        }, set: function (m, b, I) {
          return b in m ? m[b] = I : m.setProperty(r(b), I ?? void 0), !0
        }
      };
      return new Proxy(l, g)
    };

    function r(d) {
      return d.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase()
    }

    function n(d) {
      this._element = d
    }

    var s = "!important";

    function a(d) {
      let l = {property: {}, priority: {}};
      if (!d) return l;
      let g = i(d);
      if (g.length < 2) return l;
      for (let m = 0; m < g.length; m += 2) {
        let b = g[m], I = g[m + 1];
        I.endsWith(s) && (l.priority[b] = "important", I = I.slice(0, -s.length).trim()), l.property[b] = I
      }
      return l
    }

    var o = {};
    n.prototype = Object.create(Object.prototype, {
      _parsed: {
        get: function () {
          if (!this._parsedStyles || this.cssText !== this._lastParsedText) {
            var d = this.cssText;
            this._parsedStyles = a(d), this._lastParsedText = d, delete this._names
          }
          return this._parsedStyles
        }
      }, _serialize: {
        value: function () {
          var d = this._parsed, l = "";
          for (var g in d.property) l && (l += " "), l += g + ": " + d.property[g], d.priority[g] && (l += " !" + d.priority[g]), l += ";";
          this.cssText = l, this._lastParsedText = l, delete this._names
        }
      }, cssText: {
        get: function () {
          return this._element.getAttribute("style")
        }, set: function (d) {
          this._element.setAttribute("style", d)
        }
      }, length: {
        get: function () {
          return this._names || (this._names = Object.getOwnPropertyNames(this._parsed.property)), this._names.length
        }
      }, item: {
        value: function (d) {
          return this._names || (this._names = Object.getOwnPropertyNames(this._parsed.property)), this._names[d]
        }
      }, getPropertyValue: {
        value: function (d) {
          return d = d.toLowerCase(), this._parsed.property[d] || ""
        }
      }, getPropertyPriority: {
        value: function (d) {
          return d = d.toLowerCase(), this._parsed.priority[d] || ""
        }
      }, setProperty: {
        value: function (d, l, g) {
          if (d = d.toLowerCase(), l == null && (l = ""), g == null && (g = ""), l !== o && (l = "" + l), l = l.trim(), l === "") {
            this.removeProperty(d);
            return
          }
          if (!(g !== "" && g !== o && !/^important$/i.test(g))) {
            var m = this._parsed;
            if (l === o) {
              if (!m.property[d]) return;
              g !== "" ? m.priority[d] = "important" : delete m.priority[d]
            } else {
              if (l.indexOf(";") !== -1) return;
              var b = a(d + ":" + l);
              if (Object.getOwnPropertyNames(b.property).length === 0 || Object.getOwnPropertyNames(b.priority).length !== 0) return;
              for (var I in b.property) m.property[I] = b.property[I], g !== o && (g !== "" ? m.priority[I] = "important" : m.priority[I] && delete m.priority[I])
            }
            this._serialize()
          }
        }
      }, setPropertyValue: {
        value: function (d, l) {
          return this.setProperty(d, l, o)
        }
      }, setPropertyPriority: {
        value: function (d, l) {
          return this.setProperty(d, o, l)
        }
      }, removeProperty: {
        value: function (d) {
          d = d.toLowerCase();
          var l = this._parsed;
          d in l.property && (delete l.property[d], delete l.priority[d], this._serialize())
        }
      }
    })
  }
}), _c = Z({
  "external/npm/node_modules/domino/lib/URLUtils.js"(t, e) {
    "use strict";
    var i = Us();
    e.exports = r;

    function r() {
    }

    r.prototype = Object.create(Object.prototype, {
      _url: {
        get: function () {
          return new i(this.href)
        }
      }, protocol: {
        get: function () {
          var n = this._url;
          return n && n.scheme ? n.scheme + ":" : ":"
        }, set: function (n) {
          var s = this.href, a = new i(s);
          a.isAbsolute() && (n = n.replace(/:+$/, ""), n = n.replace(/[^-+\.a-zA-Z0-9]/g, i.percentEncode), n.length > 0 && (a.scheme = n, s = a.toString())), this.href = s
        }
      }, host: {
        get: function () {
          var n = this._url;
          return n.isAbsolute() && n.isAuthorityBased() ? n.host + (n.port ? ":" + n.port : "") : ""
        }, set: function (n) {
          var s = this.href, a = new i(s);
          a.isAbsolute() && a.isAuthorityBased() && (n = n.replace(/[^-+\._~!$&'()*,;:=a-zA-Z0-9]/g, i.percentEncode), n.length > 0 && (a.host = n, delete a.port, s = a.toString())), this.href = s
        }
      }, hostname: {
        get: function () {
          var n = this._url;
          return n.isAbsolute() && n.isAuthorityBased() ? n.host : ""
        }, set: function (n) {
          var s = this.href, a = new i(s);
          a.isAbsolute() && a.isAuthorityBased() && (n = n.replace(/^\/+/, ""), n = n.replace(/[^-+\._~!$&'()*,;:=a-zA-Z0-9]/g, i.percentEncode), n.length > 0 && (a.host = n, s = a.toString())), this.href = s
        }
      }, port: {
        get: function () {
          var n = this._url;
          return n.isAbsolute() && n.isAuthorityBased() && n.port !== void 0 ? n.port : ""
        }, set: function (n) {
          var s = this.href, a = new i(s);
          a.isAbsolute() && a.isAuthorityBased() && (n = "" + n, n = n.replace(/[^0-9].*$/, ""), n = n.replace(/^0+/, ""), n.length === 0 && (n = "0"), parseInt(n, 10) <= 65535 && (a.port = n, s = a.toString())), this.href = s
        }
      }, pathname: {
        get: function () {
          var n = this._url;
          return n.isAbsolute() && n.isHierarchical() ? n.path : ""
        }, set: function (n) {
          var s = this.href, a = new i(s);
          a.isAbsolute() && a.isHierarchical() && (n.charAt(0) !== "/" && (n = "/" + n), n = n.replace(/[^-+\._~!$&'()*,;:=@\/a-zA-Z0-9]/g, i.percentEncode), a.path = n, s = a.toString()), this.href = s
        }
      }, search: {
        get: function () {
          var n = this._url;
          return n.isAbsolute() && n.isHierarchical() && n.query !== void 0 ? "?" + n.query : ""
        }, set: function (n) {
          var s = this.href, a = new i(s);
          a.isAbsolute() && a.isHierarchical() && (n.charAt(0) === "?" && (n = n.substring(1)), n = n.replace(/[^-+\._~!$&'()*,;:=@\/?a-zA-Z0-9]/g, i.percentEncode), a.query = n, s = a.toString()), this.href = s
        }
      }, hash: {
        get: function () {
          var n = this._url;
          return n == null || n.fragment == null || n.fragment === "" ? "" : "#" + n.fragment
        }, set: function (n) {
          var s = this.href, a = new i(s);
          n.charAt(0) === "#" && (n = n.substring(1)), n = n.replace(/[^-+\._~!$&'()*,;:=@\/?a-zA-Z0-9]/g, i.percentEncode), a.fragment = n, s = a.toString(), this.href = s
        }
      }, username: {
        get: function () {
          var n = this._url;
          return n.username || ""
        }, set: function (n) {
          var s = this.href, a = new i(s);
          a.isAbsolute() && (n = n.replace(/[\x00-\x1F\x7F-\uFFFF "#<>?`\/@\\:]/g, i.percentEncode), a.username = n, s = a.toString()), this.href = s
        }
      }, password: {
        get: function () {
          var n = this._url;
          return n.password || ""
        }, set: function (n) {
          var s = this.href, a = new i(s);
          a.isAbsolute() && (n === "" ? a.password = null : (n = n.replace(/[\x00-\x1F\x7F-\uFFFF "#<>?`\/@\\]/g, i.percentEncode), a.password = n), s = a.toString()), this.href = s
        }
      }, origin: {
        get: function () {
          var n = this._url;
          if (n == null) return "";
          var s = function (a) {
            var o = [n.scheme, n.host, +n.port || a];
            return o[0] + "://" + o[1] + (o[2] === a ? "" : ":" + o[2])
          };
          switch (n.scheme) {
            case"ftp":
              return s(21);
            case"gopher":
              return s(70);
            case"http":
            case"ws":
              return s(80);
            case"https":
            case"wss":
              return s(443);
            default:
              return n.scheme + "://"
          }
        }
      }
    }), r._inherit = function (n) {
      Object.getOwnPropertyNames(r.prototype).forEach(function (s) {
        if (!(s === "constructor" || s === "href")) {
          var a = Object.getOwnPropertyDescriptor(r.prototype, s);
          Object.defineProperty(n, s, a)
        }
      })
    }
  }
}), wc = Z({
  "external/npm/node_modules/domino/lib/defineElement.js"(t, e) {
    "use strict";
    var i = hc(), r = Ls().isApiWritable;
    e.exports = function (o, d, l, g) {
      var m = o.ctor;
      if (m) {
        var b = o.props || {};
        if (o.attributes) for (var I in o.attributes) {
          var U = o.attributes[I];
          (typeof U != "object" || Array.isArray(U)) && (U = {type: U}), U.name || (U.name = I.toLowerCase()), b[I] = i.property(U)
        }
        b.constructor = {
          value: m,
          writable: r
        }, m.prototype = Object.create((o.superclass || d).prototype, b), o.events && a(m, o.events), l[o.name] = m
      } else m = d;
      return (o.tags || o.tag && [o.tag] || []).forEach(function (O) {
        g[O] = m
      }), m
    };

    function n(o, d, l, g) {
      this.body = o, this.document = d, this.form = l, this.element = g
    }

    n.prototype.build = function () {
      return () => {
      }
    };

    function s(o, d, l, g) {
      var m = o.ownerDocument || Object.create(null), b = o.form || Object.create(null);
      o[d] = new n(g, m, b, o).build()
    }

    function a(o, d) {
      var l = o.prototype;
      d.forEach(function (g) {
        Object.defineProperty(l, "on" + g, {
          get: function () {
            return this._getEventHandler(g)
          }, set: function (m) {
            this._setEventHandler(g, m)
          }
        }), i.registerChangeHandler(o, "on" + g, s)
      })
    }
  }
}), Hs = Z({
  "external/npm/node_modules/domino/lib/htmlelts.js"(t) {
    "use strict";
    var e = Be(), i = Qr(), r = qs(), n = Oe(), s = _c(), a = wc(), o = t.elements = {}, d = Object.create(null);
    t.createElement = function (w, T, N) {
      var y = d[T] || Y;
      return new y(w, T, N)
    };

    function l(w) {
      return a(w, O, o, d)
    }

    function g(w) {
      return {
        get: function () {
          var T = this._getattr(w);
          if (T === null) return "";
          var N = this.doc._resolve(T);
          return N === null ? T : N
        }, set: function (T) {
          this._setattr(w, T)
        }
      }
    }

    function m(w) {
      return {
        get: function () {
          var T = this._getattr(w);
          return T === null ? null : T.toLowerCase() === "use-credentials" ? "use-credentials" : "anonymous"
        }, set: function (T) {
          T == null ? this.removeAttribute(w) : this._setattr(w, T)
        }
      }
    }

    var b = {
      type: ["", "no-referrer", "no-referrer-when-downgrade", "same-origin", "origin", "strict-origin", "origin-when-cross-origin", "strict-origin-when-cross-origin", "unsafe-url"],
      missing: ""
    }, I = {A: !0, LINK: !0, BUTTON: !0, INPUT: !0, SELECT: !0, TEXTAREA: !0, COMMAND: !0}, U = function (w, T, N) {
      O.call(this, w, T, N), this._form = null
    }, O = t.HTMLElement = l({
      superclass: i,
      name: "HTMLElement",
      ctor: function (T, N, y) {
        i.call(this, T, N, n.NAMESPACE.HTML, y)
      },
      props: {
        dangerouslySetInnerHTML: {
          set: function (w) {
            this._innerHTML = w
          }
        }, innerHTML: {
          get: function () {
            return this.serialize()
          }, set: function (w) {
            var T = this.ownerDocument.implementation.mozHTMLParser(this.ownerDocument._address, this);
            T.parse(w === null ? "" : String(w), !0);
            for (var N = this instanceof d.template ? this.content : this; N.hasChildNodes();) N.removeChild(N.firstChild);
            N.appendChild(T._asDocumentFragment())
          }
        }, style: {
          get: function () {
            return this._style || (this._style = new r(this)), this._style
          }, set: function (w) {
            w == null && (w = ""), this._setattr("style", String(w))
          }
        }, blur: {
          value: function () {
          }
        }, focus: {
          value: function () {
          }
        }, forceSpellCheck: {
          value: function () {
          }
        }, click: {
          value: function () {
            if (!this._click_in_progress) {
              this._click_in_progress = !0;
              try {
                this._pre_click_activation_steps && this._pre_click_activation_steps();
                var w = this.ownerDocument.createEvent("MouseEvent");
                w.initMouseEvent("click", !0, !0, this.ownerDocument.defaultView, 1, 0, 0, 0, 0, !1, !1, !1, !1, 0, null);
                var T = this.dispatchEvent(w);
                T ? this._post_click_activation_steps && this._post_click_activation_steps(w) : this._cancelled_activation_steps && this._cancelled_activation_steps()
              } finally {
                this._click_in_progress = !1
              }
            }
          }
        }, submit: {value: n.nyi}
      },
      attributes: {
        title: String,
        lang: String,
        dir: {type: ["ltr", "rtl", "auto"], missing: ""},
        draggable: {type: ["true", "false"], treatNullAsEmptyString: !0},
        spellcheck: {type: ["true", "false"], missing: ""},
        enterKeyHint: {type: ["enter", "done", "go", "next", "previous", "search", "send"], missing: ""},
        autoCapitalize: {type: ["off", "on", "none", "sentences", "words", "characters"], missing: ""},
        autoFocus: Boolean,
        accessKey: String,
        nonce: String,
        hidden: Boolean,
        translate: {type: ["no", "yes"], missing: ""},
        tabIndex: {
          type: "long", default: function () {
            return this.tagName in I || this.contentEditable ? 0 : -1
          }
        }
      },
      events: ["abort", "canplay", "canplaythrough", "change", "click", "contextmenu", "cuechange", "dblclick", "drag", "dragend", "dragenter", "dragleave", "dragover", "dragstart", "drop", "durationchange", "emptied", "ended", "input", "invalid", "keydown", "keypress", "keyup", "loadeddata", "loadedmetadata", "loadstart", "mousedown", "mousemove", "mouseout", "mouseover", "mouseup", "mousewheel", "pause", "play", "playing", "progress", "ratechange", "readystatechange", "reset", "seeked", "seeking", "select", "show", "stalled", "submit", "suspend", "timeupdate", "volumechange", "waiting", "blur", "error", "focus", "load", "scroll"]
    }), Y = l({
      name: "HTMLUnknownElement", ctor: function (T, N, y) {
        O.call(this, T, N, y)
      }
    }), x = {
      form: {
        get: function () {
          return this._form
        }
      }
    };
    l({
      tag: "a",
      name: "HTMLAnchorElement",
      ctor: function (T, N, y) {
        O.call(this, T, N, y)
      },
      props: {
        _post_click_activation_steps: {
          value: function (w) {
            this.href && (this.ownerDocument.defaultView.location = this.href)
          }
        }
      },
      attributes: {
        href: g,
        ping: String,
        download: String,
        target: String,
        rel: String,
        media: String,
        hreflang: String,
        type: String,
        referrerPolicy: b,
        coords: String,
        charset: String,
        name: String,
        rev: String,
        shape: String
      }
    }), s._inherit(d.a.prototype), l({
      tag: "area",
      name: "HTMLAreaElement",
      ctor: function (T, N, y) {
        O.call(this, T, N, y)
      },
      attributes: {
        alt: String,
        target: String,
        download: String,
        rel: String,
        media: String,
        href: g,
        hreflang: String,
        type: String,
        shape: String,
        coords: String,
        ping: String,
        referrerPolicy: b,
        noHref: Boolean
      }
    }), s._inherit(d.area.prototype), l({
      tag: "br", name: "HTMLBRElement", ctor: function (T, N, y) {
        O.call(this, T, N, y)
      }, attributes: {clear: String}
    }), l({
      tag: "base", name: "HTMLBaseElement", ctor: function (T, N, y) {
        O.call(this, T, N, y)
      }, attributes: {target: String}
    }), l({
      tag: "body",
      name: "HTMLBodyElement",
      ctor: function (T, N, y) {
        O.call(this, T, N, y)
      },
      events: ["afterprint", "beforeprint", "beforeunload", "blur", "error", "focus", "hashchange", "load", "message", "offline", "online", "pagehide", "pageshow", "popstate", "resize", "scroll", "storage", "unload"],
      attributes: {
        text: {type: String, treatNullAsEmptyString: !0},
        link: {type: String, treatNullAsEmptyString: !0},
        vLink: {type: String, treatNullAsEmptyString: !0},
        aLink: {type: String, treatNullAsEmptyString: !0},
        bgColor: {type: String, treatNullAsEmptyString: !0},
        background: String
      }
    }), l({
      tag: "button",
      name: "HTMLButtonElement",
      ctor: function (T, N, y) {
        U.call(this, T, N, y)
      },
      props: x,
      attributes: {
        name: String,
        value: String,
        disabled: Boolean,
        autofocus: Boolean,
        type: {type: ["submit", "reset", "button", "menu"], missing: "submit"},
        formTarget: String,
        formAction: g,
        formNoValidate: Boolean,
        formMethod: {type: ["get", "post", "dialog"], invalid: "get", missing: ""},
        formEnctype: {
          type: ["application/x-www-form-urlencoded", "multipart/form-data", "text/plain"],
          invalid: "application/x-www-form-urlencoded",
          missing: ""
        }
      }
    }), l({
      tag: "dl", name: "HTMLDListElement", ctor: function (T, N, y) {
        O.call(this, T, N, y)
      }, attributes: {compact: Boolean}
    }), l({
      tag: "data", name: "HTMLDataElement", ctor: function (T, N, y) {
        O.call(this, T, N, y)
      }, attributes: {value: String}
    }), l({
      tag: "datalist", name: "HTMLDataListElement", ctor: function (T, N, y) {
        O.call(this, T, N, y)
      }
    }), l({
      tag: "details", name: "HTMLDetailsElement", ctor: function (T, N, y) {
        O.call(this, T, N, y)
      }, attributes: {open: Boolean}
    }), l({
      tag: "div", name: "HTMLDivElement", ctor: function (T, N, y) {
        O.call(this, T, N, y)
      }, attributes: {align: String}
    }), l({
      tag: "embed", name: "HTMLEmbedElement", ctor: function (T, N, y) {
        O.call(this, T, N, y)
      }, attributes: {src: g, type: String, width: String, height: String, align: String, name: String}
    }), l({
      tag: "fieldset", name: "HTMLFieldSetElement", ctor: function (T, N, y) {
        U.call(this, T, N, y)
      }, props: x, attributes: {disabled: Boolean, name: String}
    }), l({
      tag: "form",
      name: "HTMLFormElement",
      ctor: function (T, N, y) {
        O.call(this, T, N, y)
      },
      attributes: {
        action: String,
        autocomplete: {type: ["on", "off"], missing: "on"},
        name: String,
        acceptCharset: {name: "accept-charset"},
        target: String,
        noValidate: Boolean,
        method: {type: ["get", "post", "dialog"], invalid: "get", missing: "get"},
        enctype: {
          type: ["application/x-www-form-urlencoded", "multipart/form-data", "text/plain"],
          invalid: "application/x-www-form-urlencoded",
          missing: "application/x-www-form-urlencoded"
        },
        encoding: {
          name: "enctype",
          type: ["application/x-www-form-urlencoded", "multipart/form-data", "text/plain"],
          invalid: "application/x-www-form-urlencoded",
          missing: "application/x-www-form-urlencoded"
        }
      }
    }), l({
      tag: "hr", name: "HTMLHRElement", ctor: function (T, N, y) {
        O.call(this, T, N, y)
      }, attributes: {align: String, color: String, noShade: Boolean, size: String, width: String}
    }), l({
      tag: "head", name: "HTMLHeadElement", ctor: function (T, N, y) {
        O.call(this, T, N, y)
      }
    }), l({
      tags: ["h1", "h2", "h3", "h4", "h5", "h6"], name: "HTMLHeadingElement", ctor: function (T, N, y) {
        O.call(this, T, N, y)
      }, attributes: {align: String}
    }), l({
      tag: "html", name: "HTMLHtmlElement", ctor: function (T, N, y) {
        O.call(this, T, N, y)
      }, attributes: {xmlns: g, version: String}
    }), l({
      tag: "iframe",
      name: "HTMLIFrameElement",
      ctor: function (T, N, y) {
        O.call(this, T, N, y)
      },
      attributes: {
        src: g,
        srcdoc: String,
        name: String,
        width: String,
        height: String,
        seamless: Boolean,
        allow: Boolean,
        allowFullscreen: Boolean,
        allowUserMedia: Boolean,
        allowPaymentRequest: Boolean,
        referrerPolicy: b,
        loading: {type: ["eager", "lazy"], treatNullAsEmptyString: !0},
        align: String,
        scrolling: String,
        frameBorder: String,
        longDesc: g,
        marginHeight: {type: String, treatNullAsEmptyString: !0},
        marginWidth: {type: String, treatNullAsEmptyString: !0}
      }
    }), l({
      tag: "img",
      name: "HTMLImageElement",
      ctor: function (T, N, y) {
        O.call(this, T, N, y)
      },
      attributes: {
        alt: String,
        src: g,
        srcset: String,
        crossOrigin: m,
        useMap: String,
        isMap: Boolean,
        sizes: String,
        height: {type: "unsigned long", default: 0},
        width: {type: "unsigned long", default: 0},
        referrerPolicy: b,
        loading: {type: ["eager", "lazy"], missing: ""},
        name: String,
        lowsrc: g,
        align: String,
        hspace: {type: "unsigned long", default: 0},
        vspace: {type: "unsigned long", default: 0},
        longDesc: g,
        border: {type: String, treatNullAsEmptyString: !0}
      }
    }), l({
      tag: "input", name: "HTMLInputElement", ctor: function (T, N, y) {
        U.call(this, T, N, y)
      }, props: {
        form: x.form, _post_click_activation_steps: {
          value: function (w) {
            if (this.type === "checkbox") this.checked = !this.checked; else if (this.type === "radio") for (var T = this.form.getElementsByName(this.name), N = T.length - 1; N >= 0; N--) {
              var y = T[N];
              y.checked = y === this
            }
          }
        }
      }, attributes: {
        name: String,
        disabled: Boolean,
        autofocus: Boolean,
        accept: String,
        alt: String,
        max: String,
        min: String,
        pattern: String,
        placeholder: String,
        step: String,
        dirName: String,
        defaultValue: {name: "value"},
        multiple: Boolean,
        required: Boolean,
        readOnly: Boolean,
        checked: Boolean,
        value: String,
        src: g,
        defaultChecked: {name: "checked", type: Boolean},
        size: {type: "unsigned long", default: 20, min: 1, setmin: 1},
        width: {type: "unsigned long", min: 0, setmin: 0, default: 0},
        height: {type: "unsigned long", min: 0, setmin: 0, default: 0},
        minLength: {type: "unsigned long", min: 0, setmin: 0, default: -1},
        maxLength: {type: "unsigned long", min: 0, setmin: 0, default: -1},
        autocomplete: String,
        type: {
          type: ["text", "hidden", "search", "tel", "url", "email", "password", "datetime", "date", "month", "week", "time", "datetime-local", "number", "range", "color", "checkbox", "radio", "file", "submit", "image", "reset", "button"],
          missing: "text"
        },
        formTarget: String,
        formNoValidate: Boolean,
        formMethod: {type: ["get", "post"], invalid: "get", missing: ""},
        formEnctype: {
          type: ["application/x-www-form-urlencoded", "multipart/form-data", "text/plain"],
          invalid: "application/x-www-form-urlencoded",
          missing: ""
        },
        inputMode: {
          type: ["verbatim", "latin", "latin-name", "latin-prose", "full-width-latin", "kana", "kana-name", "katakana", "numeric", "tel", "email", "url"],
          missing: ""
        },
        align: String,
        useMap: String
      }
    }), l({
      tag: "keygen",
      name: "HTMLKeygenElement",
      ctor: function (T, N, y) {
        U.call(this, T, N, y)
      },
      props: x,
      attributes: {
        name: String,
        disabled: Boolean,
        autofocus: Boolean,
        challenge: String,
        keytype: {type: ["rsa"], missing: ""}
      }
    }), l({
      tag: "li", name: "HTMLLIElement", ctor: function (T, N, y) {
        O.call(this, T, N, y)
      }, attributes: {value: {type: "long", default: 0}, type: String}
    }), l({
      tag: "label", name: "HTMLLabelElement", ctor: function (T, N, y) {
        U.call(this, T, N, y)
      }, props: x, attributes: {htmlFor: {name: "for", type: String}}
    }), l({
      tag: "legend", name: "HTMLLegendElement", ctor: function (T, N, y) {
        O.call(this, T, N, y)
      }, attributes: {align: String}
    }), l({
      tag: "link",
      name: "HTMLLinkElement",
      ctor: function (T, N, y) {
        O.call(this, T, N, y)
      },
      attributes: {
        href: g,
        rel: String,
        media: String,
        hreflang: String,
        type: String,
        crossOrigin: m,
        nonce: String,
        integrity: String,
        referrerPolicy: b,
        imageSizes: String,
        imageSrcset: String,
        charset: String,
        rev: String,
        target: String
      }
    }), l({
      tag: "map", name: "HTMLMapElement", ctor: function (T, N, y) {
        O.call(this, T, N, y)
      }, attributes: {name: String}
    }), l({
      tag: "menu",
      name: "HTMLMenuElement",
      ctor: function (T, N, y) {
        O.call(this, T, N, y)
      },
      attributes: {type: {type: ["context", "popup", "toolbar"], missing: "toolbar"}, label: String, compact: Boolean}
    }), l({
      tag: "meta", name: "HTMLMetaElement", ctor: function (T, N, y) {
        O.call(this, T, N, y)
      }, attributes: {name: String, content: String, httpEquiv: {name: "http-equiv", type: String}, scheme: String}
    }), l({
      tag: "meter", name: "HTMLMeterElement", ctor: function (T, N, y) {
        U.call(this, T, N, y)
      }, props: x
    }), l({
      tags: ["ins", "del"], name: "HTMLModElement", ctor: function (T, N, y) {
        O.call(this, T, N, y)
      }, attributes: {cite: g, dateTime: String}
    }), l({
      tag: "ol", name: "HTMLOListElement", ctor: function (T, N, y) {
        O.call(this, T, N, y)
      }, props: {
        _numitems: {
          get: function () {
            var w = 0;
            return this.childNodes.forEach(function (T) {
              T.nodeType === e.ELEMENT_NODE && T.tagName === "LI" && w++
            }), w
          }
        }
      }, attributes: {
        type: String, reversed: Boolean, start: {
          type: "long", default: function () {
            return this.reversed ? this._numitems : 1
          }
        }, compact: Boolean
      }
    }), l({
      tag: "object",
      name: "HTMLObjectElement",
      ctor: function (T, N, y) {
        U.call(this, T, N, y)
      },
      props: x,
      attributes: {
        data: g,
        type: String,
        name: String,
        useMap: String,
        typeMustMatch: Boolean,
        width: String,
        height: String,
        align: String,
        archive: String,
        code: String,
        declare: Boolean,
        hspace: {type: "unsigned long", default: 0},
        standby: String,
        vspace: {type: "unsigned long", default: 0},
        codeBase: g,
        codeType: String,
        border: {type: String, treatNullAsEmptyString: !0}
      }
    }), l({
      tag: "optgroup", name: "HTMLOptGroupElement", ctor: function (T, N, y) {
        O.call(this, T, N, y)
      }, attributes: {disabled: Boolean, label: String}
    }), l({
      tag: "option", name: "HTMLOptionElement", ctor: function (T, N, y) {
        O.call(this, T, N, y)
      }, props: {
        form: {
          get: function () {
            for (var w = this.parentNode; w && w.nodeType === e.ELEMENT_NODE;) {
              if (w.localName === "select") return w.form;
              w = w.parentNode
            }
          }
        }, value: {
          get: function () {
            return this._getattr("value") || this.text
          }, set: function (w) {
            this._setattr("value", w)
          }
        }, text: {
          get: function () {
            return this.textContent.replace(/[ \t\n\f\r]+/g, " ").trim()
          }, set: function (w) {
            this.textContent = w
          }
        }
      }, attributes: {disabled: Boolean, defaultSelected: {name: "selected", type: Boolean}, label: String}
    }), l({
      tag: "output", name: "HTMLOutputElement", ctor: function (T, N, y) {
        U.call(this, T, N, y)
      }, props: x, attributes: {name: String}
    }), l({
      tag: "p", name: "HTMLParagraphElement", ctor: function (T, N, y) {
        O.call(this, T, N, y)
      }, attributes: {align: String}
    }), l({
      tag: "param", name: "HTMLParamElement", ctor: function (T, N, y) {
        O.call(this, T, N, y)
      }, attributes: {name: String, value: String, type: String, valueType: String}
    }), l({
      tags: ["pre", "listing", "xmp"], name: "HTMLPreElement", ctor: function (T, N, y) {
        O.call(this, T, N, y)
      }, attributes: {width: {type: "long", default: 0}}
    }), l({
      tag: "progress", name: "HTMLProgressElement", ctor: function (T, N, y) {
        U.call(this, T, N, y)
      }, props: x, attributes: {max: {type: Number, float: !0, default: 1, min: 0}}
    }), l({
      tags: ["q", "blockquote"], name: "HTMLQuoteElement", ctor: function (T, N, y) {
        O.call(this, T, N, y)
      }, attributes: {cite: g}
    }), l({
      tag: "script",
      name: "HTMLScriptElement",
      ctor: function (T, N, y) {
        O.call(this, T, N, y)
      },
      props: {
        text: {
          get: function () {
            for (var w = "", T = 0, N = this.childNodes.length; T < N; T++) {
              var y = this.childNodes[T];
              y.nodeType === e.TEXT_NODE && (w += y._data)
            }
            return w
          }, set: function (w) {
            this.removeChildren(), w !== null && w !== "" && this.appendChild(this.ownerDocument.createTextNode(w))
          }
        }
      },
      attributes: {
        src: g,
        type: String,
        charset: String,
        referrerPolicy: b,
        defer: Boolean,
        async: Boolean,
        nomodule: Boolean,
        crossOrigin: m,
        nonce: String,
        integrity: String
      }
    }), l({
      tag: "select",
      name: "HTMLSelectElement",
      ctor: function (T, N, y) {
        U.call(this, T, N, y)
      },
      props: {
        form: x.form, options: {
          get: function () {
            return this.getElementsByTagName("option")
          }
        }
      },
      attributes: {
        autocomplete: String,
        name: String,
        disabled: Boolean,
        autofocus: Boolean,
        multiple: Boolean,
        required: Boolean,
        size: {type: "unsigned long", default: 0}
      }
    }), l({
      tag: "span", name: "HTMLSpanElement", ctor: function (T, N, y) {
        O.call(this, T, N, y)
      }
    }), l({
      tag: "style", name: "HTMLStyleElement", ctor: function (T, N, y) {
        O.call(this, T, N, y)
      }, attributes: {media: String, type: String, scoped: Boolean}
    }), l({
      tag: "caption", name: "HTMLTableCaptionElement", ctor: function (T, N, y) {
        O.call(this, T, N, y)
      }, attributes: {align: String}
    }), l({
      name: "HTMLTableCellElement",
      ctor: function (T, N, y) {
        O.call(this, T, N, y)
      },
      attributes: {
        colSpan: {type: "unsigned long", default: 1},
        rowSpan: {type: "unsigned long", default: 1},
        scope: {type: ["row", "col", "rowgroup", "colgroup"], missing: ""},
        abbr: String,
        align: String,
        axis: String,
        height: String,
        width: String,
        ch: {name: "char", type: String},
        chOff: {name: "charoff", type: String},
        noWrap: Boolean,
        vAlign: String,
        bgColor: {type: String, treatNullAsEmptyString: !0}
      }
    }), l({
      tags: ["col", "colgroup"],
      name: "HTMLTableColElement",
      ctor: function (T, N, y) {
        O.call(this, T, N, y)
      },
      attributes: {
        span: {type: "limited unsigned long with fallback", default: 1, min: 1},
        align: String,
        ch: {name: "char", type: String},
        chOff: {name: "charoff", type: String},
        vAlign: String,
        width: String
      }
    }), l({
      tag: "table",
      name: "HTMLTableElement",
      ctor: function (T, N, y) {
        O.call(this, T, N, y)
      },
      props: {
        rows: {
          get: function () {
            return this.getElementsByTagName("tr")
          }
        }
      },
      attributes: {
        align: String,
        border: String,
        frame: String,
        rules: String,
        summary: String,
        width: String,
        bgColor: {type: String, treatNullAsEmptyString: !0},
        cellPadding: {type: String, treatNullAsEmptyString: !0},
        cellSpacing: {type: String, treatNullAsEmptyString: !0}
      }
    }), l({
      tag: "template", name: "HTMLTemplateElement", ctor: function (T, N, y) {
        O.call(this, T, N, y), this._contentFragment = T._templateDoc.createDocumentFragment()
      }, props: {
        content: {
          get: function () {
            return this._contentFragment
          }
        }, serialize: {
          value: function () {
            return this.content.serialize()
          }
        }
      }
    }), l({
      tag: "tr",
      name: "HTMLTableRowElement",
      ctor: function (T, N, y) {
        O.call(this, T, N, y)
      },
      props: {
        cells: {
          get: function () {
            return this.querySelectorAll("td,th")
          }
        }
      },
      attributes: {
        align: String,
        ch: {name: "char", type: String},
        chOff: {name: "charoff", type: String},
        vAlign: String,
        bgColor: {type: String, treatNullAsEmptyString: !0}
      }
    }), l({
      tags: ["thead", "tfoot", "tbody"],
      name: "HTMLTableSectionElement",
      ctor: function (T, N, y) {
        O.call(this, T, N, y)
      },
      props: {
        rows: {
          get: function () {
            return this.getElementsByTagName("tr")
          }
        }
      },
      attributes: {
        align: String,
        ch: {name: "char", type: String},
        chOff: {name: "charoff", type: String},
        vAlign: String
      }
    }), l({
      tag: "textarea",
      name: "HTMLTextAreaElement",
      ctor: function (T, N, y) {
        U.call(this, T, N, y)
      },
      props: {
        form: x.form, type: {
          get: function () {
            return "textarea"
          }
        }, defaultValue: {
          get: function () {
            return this.textContent
          }, set: function (w) {
            this.textContent = w
          }
        }, value: {
          get: function () {
            return this.defaultValue
          }, set: function (w) {
            this.defaultValue = w
          }
        }, textLength: {
          get: function () {
            return this.value.length
          }
        }
      },
      attributes: {
        autocomplete: String,
        name: String,
        disabled: Boolean,
        autofocus: Boolean,
        placeholder: String,
        wrap: String,
        dirName: String,
        required: Boolean,
        readOnly: Boolean,
        rows: {type: "limited unsigned long with fallback", default: 2},
        cols: {type: "limited unsigned long with fallback", default: 20},
        maxLength: {type: "unsigned long", min: 0, setmin: 0, default: -1},
        minLength: {type: "unsigned long", min: 0, setmin: 0, default: -1},
        inputMode: {
          type: ["verbatim", "latin", "latin-name", "latin-prose", "full-width-latin", "kana", "kana-name", "katakana", "numeric", "tel", "email", "url"],
          missing: ""
        }
      }
    }), l({
      tag: "time", name: "HTMLTimeElement", ctor: function (T, N, y) {
        O.call(this, T, N, y)
      }, attributes: {dateTime: String, pubDate: Boolean}
    }), l({
      tag: "title", name: "HTMLTitleElement", ctor: function (T, N, y) {
        O.call(this, T, N, y)
      }, props: {
        text: {
          get: function () {
            return this.textContent
          }
        }
      }
    }), l({
      tag: "ul", name: "HTMLUListElement", ctor: function (T, N, y) {
        O.call(this, T, N, y)
      }, attributes: {type: String, compact: Boolean}
    }), l({
      name: "HTMLMediaElement",
      ctor: function (T, N, y) {
        O.call(this, T, N, y)
      },
      attributes: {
        src: g,
        crossOrigin: m,
        preload: {type: ["metadata", "none", "auto", {value: "", alias: "auto"}], missing: "auto"},
        loop: Boolean,
        autoplay: Boolean,
        mediaGroup: String,
        controls: Boolean,
        defaultMuted: {name: "muted", type: Boolean}
      }
    }), l({
      name: "HTMLAudioElement", tag: "audio", superclass: o.HTMLMediaElement, ctor: function (T, N, y) {
        o.HTMLMediaElement.call(this, T, N, y)
      }
    }), l({
      name: "HTMLVideoElement",
      tag: "video",
      superclass: o.HTMLMediaElement,
      ctor: function (T, N, y) {
        o.HTMLMediaElement.call(this, T, N, y)
      },
      attributes: {
        poster: g,
        width: {type: "unsigned long", min: 0, default: 0},
        height: {type: "unsigned long", min: 0, default: 0}
      }
    }), l({
      tag: "td", name: "HTMLTableDataCellElement", superclass: o.HTMLTableCellElement, ctor: function (T, N, y) {
        o.HTMLTableCellElement.call(this, T, N, y)
      }
    }), l({
      tag: "th", name: "HTMLTableHeaderCellElement", superclass: o.HTMLTableCellElement, ctor: function (T, N, y) {
        o.HTMLTableCellElement.call(this, T, N, y)
      }
    }), l({
      tag: "frameset", name: "HTMLFrameSetElement", ctor: function (T, N, y) {
        O.call(this, T, N, y)
      }
    }), l({
      tag: "frame", name: "HTMLFrameElement", ctor: function (T, N, y) {
        O.call(this, T, N, y)
      }
    }), l({
      tag: "canvas",
      name: "HTMLCanvasElement",
      ctor: function (T, N, y) {
        O.call(this, T, N, y)
      },
      props: {
        getContext: {value: n.nyi},
        probablySupportsContext: {value: n.nyi},
        setContext: {value: n.nyi},
        transferControlToProxy: {value: n.nyi},
        toDataURL: {value: n.nyi},
        toBlob: {value: n.nyi}
      },
      attributes: {width: {type: "unsigned long", default: 300}, height: {type: "unsigned long", default: 150}}
    }), l({
      tag: "dialog",
      name: "HTMLDialogElement",
      ctor: function (T, N, y) {
        O.call(this, T, N, y)
      },
      props: {show: {value: n.nyi}, showModal: {value: n.nyi}, close: {value: n.nyi}},
      attributes: {open: Boolean, returnValue: String}
    }), l({
      tag: "menuitem",
      name: "HTMLMenuItemElement",
      ctor: function (T, N, y) {
        O.call(this, T, N, y)
      },
      props: {
        _label: {
          get: function () {
            var w = this._getattr("label");
            return w !== null && w !== "" ? w : (w = this.textContent, w.replace(/[ \t\n\f\r]+/g, " ").trim())
          }
        }, label: {
          get: function () {
            var w = this._getattr("label");
            return w !== null ? w : this._label
          }, set: function (w) {
            this._setattr("label", w)
          }
        }
      },
      attributes: {
        type: {type: ["command", "checkbox", "radio"], missing: "command"},
        icon: g,
        disabled: Boolean,
        checked: Boolean,
        radiogroup: String,
        default: Boolean
      }
    }), l({
      tag: "source", name: "HTMLSourceElement", ctor: function (T, N, y) {
        O.call(this, T, N, y)
      }, attributes: {srcset: String, sizes: String, media: String, src: g, type: String, width: String, height: String}
    }), l({
      tag: "track",
      name: "HTMLTrackElement",
      ctor: function (T, N, y) {
        O.call(this, T, N, y)
      },
      attributes: {
        src: g,
        srclang: String,
        label: String,
        default: Boolean,
        kind: {
          type: ["subtitles", "captions", "descriptions", "chapters", "metadata"],
          missing: "subtitles",
          invalid: "metadata"
        }
      },
      props: {
        NONE: {
          get: function () {
            return 0
          }
        }, LOADING: {
          get: function () {
            return 1
          }
        }, LOADED: {
          get: function () {
            return 2
          }
        }, ERROR: {
          get: function () {
            return 3
          }
        }, readyState: {get: n.nyi}, track: {get: n.nyi}
      }
    }), l({
      tag: "font", name: "HTMLFontElement", ctor: function (T, N, y) {
        O.call(this, T, N, y)
      }, attributes: {color: {type: String, treatNullAsEmptyString: !0}, face: {type: String}, size: {type: String}}
    }), l({
      tag: "dir", name: "HTMLDirectoryElement", ctor: function (T, N, y) {
        O.call(this, T, N, y)
      }, attributes: {compact: Boolean}
    }), l({tags: ["abbr", "address", "article", "aside", "b", "bdi", "bdo", "cite", "content", "code", "dd", "dfn", "dt", "em", "figcaption", "figure", "footer", "header", "hgroup", "i", "kbd", "main", "mark", "nav", "noscript", "rb", "rp", "rt", "rtc", "ruby", "s", "samp", "section", "small", "strong", "sub", "summary", "sup", "u", "var", "wbr", "acronym", "basefont", "big", "center", "nobr", "noembed", "noframes", "plaintext", "strike", "tt"]})
  }
}), Sc = Z({
  "external/npm/node_modules/domino/lib/svg.js"(t) {
    "use strict";
    var e = Qr(), i = wc(), r = Oe(), n = qs(), s = t.elements = {}, a = Object.create(null);
    t.createElement = function (l, g, m) {
      var b = a[g] || d;
      return new b(l, g, m)
    };

    function o(l) {
      return i(l, d, s, a)
    }

    var d = o({
      superclass: e, name: "SVGElement", ctor: function (g, m, b) {
        e.call(this, g, m, r.NAMESPACE.SVG, b)
      }, props: {
        style: {
          get: function () {
            return this._style || (this._style = new n(this)), this._style
          }
        }
      }
    });
    o({
      name: "SVGSVGElement", ctor: function (g, m, b) {
        d.call(this, g, m, b)
      }, tag: "svg", props: {
        createSVGRect: {
          value: function () {
            return t.createElement(this.ownerDocument, "rect", null)
          }
        }
      }
    }), o({tags: ["a", "altGlyph", "altGlyphDef", "altGlyphItem", "animate", "animateColor", "animateMotion", "animateTransform", "circle", "clipPath", "color-profile", "cursor", "defs", "desc", "ellipse", "feBlend", "feColorMatrix", "feComponentTransfer", "feComposite", "feConvolveMatrix", "feDiffuseLighting", "feDisplacementMap", "feDistantLight", "feFlood", "feFuncA", "feFuncB", "feFuncG", "feFuncR", "feGaussianBlur", "feImage", "feMerge", "feMergeNode", "feMorphology", "feOffset", "fePointLight", "feSpecularLighting", "feSpotLight", "feTile", "feTurbulence", "filter", "font", "font-face", "font-face-format", "font-face-name", "font-face-src", "font-face-uri", "foreignObject", "g", "glyph", "glyphRef", "hkern", "image", "line", "linearGradient", "marker", "mask", "metadata", "missing-glyph", "mpath", "path", "pattern", "polygon", "polyline", "radialGradient", "rect", "script", "set", "stop", "style", "switch", "symbol", "text", "textPath", "title", "tref", "tspan", "use", "view", "vkern"]})
  }
}), ph = Z({
  "external/npm/node_modules/domino/lib/MutationConstants.js"(t, e) {
    "use strict";
    e.exports = {VALUE: 1, ATTR: 2, REMOVE_ATTR: 3, REMOVE: 4, MOVE: 5, INSERT: 6}
  }
}), Fs = Z({
  "external/npm/node_modules/domino/lib/Document.js"(t, e) {
    "use strict";
    e.exports = j;
    var i = Be(), r = br(), n = ks(), s = Qr(), a = gc(), o = vc(), d = Yr(), l = bc(), g = yc(), m = hi(), b = uh(),
      I = hh(), U = ui(), O = Us(), Y = xs(), x = Tc(), w = Os(), T = Hs(), N = Sc(), y = Oe(), ce = ph(),
      de = y.NAMESPACE, Ae = Ls().isApiWritable;

    function j(_, M) {
      n.call(this), this.nodeType = i.DOCUMENT_NODE, this.isHTML = _, this._address = M || "about:blank", this.readyState = "loading", this.implementation = new m(this), this.ownerDocument = null, this._contentType = _ ? "text/html" : "application/xml", this.doctype = null, this.documentElement = null, this._templateDocCache = null, this._nodeIterators = null, this._nid = 1, this._nextnid = 2, this._nodes = [null, this], this.byId = Object.create(null), this.modclock = 0
    }

    var A = {event: "Event", customevent: "CustomEvent", uievent: "UIEvent", mouseevent: "MouseEvent"}, P = {
      events: "event",
      htmlevents: "event",
      mouseevents: "mouseevent",
      mutationevents: "mutationevent",
      uievents: "uievent"
    }, K = function (_, M, z) {
      return {
        get: function () {
          var fe = _.call(this);
          return fe ? fe[M] : z
        }, set: function (fe) {
          var We = _.call(this);
          We && (We[M] = fe)
        }
      }
    };

    function p(_, M) {
      var z, fe, We;
      return _ === "" && (_ = null), w.isValidQName(M) || y.InvalidCharacterError(), z = null, fe = M, We = M.indexOf(":"), We >= 0 && (z = M.substring(0, We), fe = M.substring(We + 1)), z !== null && _ === null && y.NamespaceError(), z === "xml" && _ !== de.XML && y.NamespaceError(), (z === "xmlns" || M === "xmlns") && _ !== de.XMLNS && y.NamespaceError(), _ === de.XMLNS && !(z === "xmlns" || M === "xmlns") && y.NamespaceError(), {
        namespace: _,
        prefix: z,
        localName: fe
      }
    }

    j.prototype = Object.create(n.prototype, {
      _setMutationHandler: {
        value: function (_) {
          this.mutationHandler = _
        }
      },
      _dispatchRendererEvent: {
        value: function (_, M, z) {
          var fe = this._nodes[_];
          fe && fe._dispatchEvent(new d(M, z), !0)
        }
      },
      nodeName: {value: "#document"},
      nodeValue: {
        get: function () {
          return null
        }, set: function () {
        }
      },
      documentURI: {
        get: function () {
          return this._address
        }, set: y.nyi
      },
      compatMode: {
        get: function () {
          return this._quirks ? "BackCompat" : "CSS1Compat"
        }
      },
      createTextNode: {
        value: function (_) {
          return new a(this, String(_))
        }
      },
      createComment: {
        value: function (_) {
          return new o(this, _)
        }
      },
      createDocumentFragment: {
        value: function () {
          return new l(this)
        }
      },
      createProcessingInstruction: {
        value: function (_, M) {
          return (!w.isValidName(_) || M.indexOf("?>") !== -1) && y.InvalidCharacterError(), new g(this, _, M)
        }
      },
      createAttribute: {
        value: function (_) {
          return _ = String(_), w.isValidName(_) || y.InvalidCharacterError(), this.isHTML && (_ = y.toASCIILowerCase(_)), new s._Attr(null, _, null, null, "")
        }
      },
      createAttributeNS: {
        value: function (_, M) {
          _ = _ == null || _ === "" ? null : String(_), M = String(M);
          var z = p(_, M);
          return new s._Attr(null, z.localName, z.prefix, z.namespace, "")
        }
      },
      createElement: {
        value: function (_) {
          return _ = String(_), w.isValidName(_) || y.InvalidCharacterError(), this.isHTML ? (/[A-Z]/.test(_) && (_ = y.toASCIILowerCase(_)), T.createElement(this, _, null)) : this.contentType === "application/xhtml+xml" ? T.createElement(this, _, null) : new s(this, _, null, null)
        }, writable: Ae
      },
      createElementNS: {
        value: function (_, M) {
          _ = _ == null || _ === "" ? null : String(_), M = String(M);
          var z = p(_, M);
          return this._createElementNS(z.localName, z.namespace, z.prefix)
        }, writable: Ae
      },
      _createElementNS: {
        value: function (_, M, z) {
          return M === de.HTML ? T.createElement(this, _, z) : M === de.SVG ? N.createElement(this, _, z) : new s(this, _, M, z)
        }
      },
      createEvent: {
        value: function (M) {
          M = M.toLowerCase();
          var z = P[M] || M, fe = x[A[z]];
          if (fe) {
            var We = new fe;
            return We._initialized = !1, We
          } else y.NotSupportedError()
        }
      },
      createTreeWalker: {
        value: function (_, M, z) {
          if (!_) throw new TypeError("root argument is required");
          if (!(_ instanceof i)) throw new TypeError("root not a node");
          return M = M === void 0 ? U.SHOW_ALL : +M, z = z === void 0 ? null : z, new b(_, M, z)
        }
      },
      createNodeIterator: {
        value: function (_, M, z) {
          if (!_) throw new TypeError("root argument is required");
          if (!(_ instanceof i)) throw new TypeError("root not a node");
          return M = M === void 0 ? U.SHOW_ALL : +M, z = z === void 0 ? null : z, new I(_, M, z)
        }
      },
      _attachNodeIterator: {
        value: function (_) {
          this._nodeIterators || (this._nodeIterators = []), this._nodeIterators.push(_)
        }
      },
      _detachNodeIterator: {
        value: function (_) {
          var M = this._nodeIterators.indexOf(_);
          this._nodeIterators.splice(M, 1)
        }
      },
      _preremoveNodeIterators: {
        value: function (_) {
          this._nodeIterators && this._nodeIterators.forEach(function (M) {
            M._preremove(_)
          })
        }
      },
      _updateDocTypeElement: {
        value: function () {
          this.doctype = this.documentElement = null;
          for (var M = this.firstChild; M !== null; M = M.nextSibling) M.nodeType === i.DOCUMENT_TYPE_NODE ? this.doctype = M : M.nodeType === i.ELEMENT_NODE && (this.documentElement = M)
        }
      },
      insertBefore: {
        value: function (M, z) {
          return i.prototype.insertBefore.call(this, M, z), this._updateDocTypeElement(), M
        }
      },
      replaceChild: {
        value: function (M, z) {
          return i.prototype.replaceChild.call(this, M, z), this._updateDocTypeElement(), z
        }
      },
      removeChild: {
        value: function (M) {
          return i.prototype.removeChild.call(this, M), this._updateDocTypeElement(), M
        }
      },
      getElementById: {
        value: function (_) {
          var M = this.byId[_];
          return M ? M instanceof pe ? M.getFirst() : M : null
        }
      },
      _hasMultipleElementsWithId: {
        value: function (_) {
          return this.byId[_] instanceof pe
        }
      },
      getElementsByName: {value: s.prototype.getElementsByName},
      getElementsByTagName: {value: s.prototype.getElementsByTagName},
      getElementsByTagNameNS: {value: s.prototype.getElementsByTagNameNS},
      getElementsByClassName: {value: s.prototype.getElementsByClassName},
      adoptNode: {
        value: function (M) {
          return M.nodeType === i.DOCUMENT_NODE && y.NotSupportedError(), M.nodeType === i.ATTRIBUTE_NODE || (M.parentNode && M.parentNode.removeChild(M), M.ownerDocument !== this && J(M, this)), M
        }
      },
      importNode: {
        value: function (M, z) {
          return this.adoptNode(M.cloneNode(z))
        }, writable: Ae
      },
      origin: {
        get: function () {
          return null
        }
      },
      characterSet: {
        get: function () {
          return "UTF-8"
        }
      },
      contentType: {
        get: function () {
          return this._contentType
        }
      },
      URL: {
        get: function () {
          return this._address
        }
      },
      domain: {get: y.nyi, set: y.nyi},
      referrer: {get: y.nyi},
      cookie: {get: y.nyi, set: y.nyi},
      lastModified: {get: y.nyi},
      location: {
        get: function () {
          return this.defaultView ? this.defaultView.location : null
        }, set: y.nyi
      },
      _titleElement: {
        get: function () {
          return this.getElementsByTagName("title").item(0) || null
        }
      },
      title: {
        get: function () {
          var _ = this._titleElement, M = _ ? _.textContent : "";
          return M.replace(/[ \t\n\r\f]+/g, " ").replace(/(^ )|( $)/g, "")
        }, set: function (_) {
          var M = this._titleElement, z = this.head;
          !M && !z || (M || (M = this.createElement("title"), z.appendChild(M)), M.textContent = _)
        }
      },
      dir: K(function () {
        var _ = this.documentElement;
        if (_ && _.tagName === "HTML") return _
      }, "dir", ""),
      fgColor: K(function () {
        return this.body
      }, "text", ""),
      linkColor: K(function () {
        return this.body
      }, "link", ""),
      vlinkColor: K(function () {
        return this.body
      }, "vLink", ""),
      alinkColor: K(function () {
        return this.body
      }, "aLink", ""),
      bgColor: K(function () {
        return this.body
      }, "bgColor", ""),
      charset: {
        get: function () {
          return this.characterSet
        }
      },
      inputEncoding: {
        get: function () {
          return this.characterSet
        }
      },
      scrollingElement: {
        get: function () {
          return this._quirks ? this.body : this.documentElement
        }
      },
      body: {
        get: function () {
          return h(this.documentElement, "body")
        }, set: y.nyi
      },
      head: {
        get: function () {
          return h(this.documentElement, "head")
        }
      },
      images: {get: y.nyi},
      embeds: {get: y.nyi},
      plugins: {get: y.nyi},
      links: {get: y.nyi},
      forms: {get: y.nyi},
      scripts: {get: y.nyi},
      applets: {
        get: function () {
          return []
        }
      },
      activeElement: {
        get: function () {
          return null
        }
      },
      innerHTML: {
        get: function () {
          return this.serialize()
        }, set: y.nyi
      },
      outerHTML: {
        get: function () {
          return this.serialize()
        }, set: y.nyi
      },
      write: {
        value: function (_) {
          if (this.isHTML || y.InvalidStateError(), !!this._parser) {
            this._parser;
            var M = arguments.join("");
            this._parser.parse(M)
          }
        }
      },
      writeln: {
        value: function (M) {
          this.write(Array.prototype.join.call(arguments, "") + `
`)
        }
      },
      open: {
        value: function () {
          this.documentElement = null
        }
      },
      close: {
        value: function () {
          this.readyState = "interactive", this._dispatchEvent(new d("readystatechange"), !0), this._dispatchEvent(new d("DOMContentLoaded"), !0), this.readyState = "complete", this._dispatchEvent(new d("readystatechange"), !0), this.defaultView && this.defaultView._dispatchEvent(new d("load"), !0)
        }
      },
      clone: {
        value: function () {
          var M = new j(this.isHTML, this._address);
          return M._quirks = this._quirks, M._contentType = this._contentType, M
        }
      },
      cloneNode: {
        value: function (M) {
          var z = i.prototype.cloneNode.call(this, !1);
          if (M) for (var fe = this.firstChild; fe !== null; fe = fe.nextSibling) z._appendChild(z.importNode(fe, !0));
          return z._updateDocTypeElement(), z
        }
      },
      isEqual: {
        value: function (M) {
          return !0
        }
      },
      mutateValue: {
        value: function (_) {
          this.mutationHandler && this.mutationHandler({type: ce.VALUE, target: _, data: _.data})
        }
      },
      mutateAttr: {
        value: function (_, M) {
          this.mutationHandler && this.mutationHandler({type: ce.ATTR, target: _.ownerElement, attr: _})
        }
      },
      mutateRemoveAttr: {
        value: function (_) {
          this.mutationHandler && this.mutationHandler({type: ce.REMOVE_ATTR, target: _.ownerElement, attr: _})
        }
      },
      mutateRemove: {
        value: function (_) {
          this.mutationHandler && this.mutationHandler({type: ce.REMOVE, target: _.parentNode, node: _}), $(_)
        }
      },
      mutateInsert: {
        value: function (_) {
          k(_), this.mutationHandler && this.mutationHandler({type: ce.INSERT, target: _.parentNode, node: _})
        }
      },
      mutateMove: {
        value: function (_) {
          this.mutationHandler && this.mutationHandler({type: ce.MOVE, target: _})
        }
      },
      addId: {
        value: function (M, z) {
          var fe = this.byId[M];
          fe ? (fe instanceof pe || (fe = new pe(fe), this.byId[M] = fe), fe.add(z)) : this.byId[M] = z
        }
      },
      delId: {
        value: function (M, z) {
          var fe = this.byId[M];
          y.assert(fe), fe instanceof pe ? (fe.del(z), fe.length === 1 && (this.byId[M] = fe.downgrade())) : this.byId[M] = void 0
        }
      },
      _resolve: {
        value: function (_) {
          return new O(this._documentBaseURL).resolve(_)
        }
      },
      _documentBaseURL: {
        get: function () {
          var _ = this._address;
          _ === "about:blank" && (_ = "/");
          var M = this.querySelector("base[href]");
          return M ? new O(_).resolve(M.getAttribute("href")) : _
        }
      },
      _templateDoc: {
        get: function () {
          if (!this._templateDocCache) {
            var _ = new j(this.isHTML, this._address);
            this._templateDocCache = _._templateDocCache = _
          }
          return this._templateDocCache
        }
      },
      querySelector: {
        value: function (_) {
          return Y(_, this)[0]
        }
      },
      querySelectorAll: {
        value: function (_) {
          var M = Y(_, this);
          return M.item ? M : new r(M)
        }
      }
    });
    var f = ["abort", "canplay", "canplaythrough", "change", "click", "contextmenu", "cuechange", "dblclick", "drag", "dragend", "dragenter", "dragleave", "dragover", "dragstart", "drop", "durationchange", "emptied", "ended", "input", "invalid", "keydown", "keypress", "keyup", "loadeddata", "loadedmetadata", "loadstart", "mousedown", "mousemove", "mouseout", "mouseover", "mouseup", "mousewheel", "pause", "play", "playing", "progress", "ratechange", "readystatechange", "reset", "seeked", "seeking", "select", "show", "stalled", "submit", "suspend", "timeupdate", "volumechange", "waiting", "blur", "error", "focus", "load", "scroll"];
    f.forEach(function (_) {
      Object.defineProperty(j.prototype, "on" + _, {
        get: function () {
          return this._getEventHandler(_)
        }, set: function (M) {
          this._setEventHandler(_, M)
        }
      })
    });

    function h(_, M) {
      if (_ && _.isHTML) {
        for (var z = _.firstChild; z !== null; z = z.nextSibling) if (z.nodeType === i.ELEMENT_NODE && z.localName === M && z.namespaceURI === de.HTML) return z
      }
      return null
    }

    function v(_) {
      if (_._nid = _.ownerDocument._nextnid++, _.ownerDocument._nodes[_._nid] = _, _.nodeType === i.ELEMENT_NODE) {
        var M = _.getAttribute("id");
        M && _.ownerDocument.addId(M, _), _._roothook && _._roothook()
      }
    }

    function C(_) {
      if (_.nodeType === i.ELEMENT_NODE) {
        var M = _.getAttribute("id");
        M && _.ownerDocument.delId(M, _)
      }
      _.ownerDocument._nodes[_._nid] = void 0, _._nid = void 0
    }

    function k(_) {
      if (v(_), _.nodeType === i.ELEMENT_NODE) for (var M = _.firstChild; M !== null; M = M.nextSibling) k(M)
    }

    function $(_) {
      C(_);
      for (var M = _.firstChild; M !== null; M = M.nextSibling) $(M)
    }

    function J(_, M) {
      _.ownerDocument = M, _._lastModTime = void 0, Object.prototype.hasOwnProperty.call(_, "_tagName") && (_._tagName = void 0);
      for (var z = _.firstChild; z !== null; z = z.nextSibling) J(z, M)
    }

    function pe(_) {
      this.nodes = Object.create(null), this.nodes[_._nid] = _, this.length = 1, this.firstNode = void 0
    }

    pe.prototype.add = function (_) {
      this.nodes[_._nid] || (this.nodes[_._nid] = _, this.length++, this.firstNode = void 0)
    }, pe.prototype.del = function (_) {
      this.nodes[_._nid] && (delete this.nodes[_._nid], this.length--, this.firstNode = void 0)
    }, pe.prototype.getFirst = function () {
      if (!this.firstNode) {
        var _;
        for (_ in this.nodes) (this.firstNode === void 0 || this.firstNode.compareDocumentPosition(this.nodes[_]) & i.DOCUMENT_POSITION_PRECEDING) && (this.firstNode = this.nodes[_])
      }
      return this.firstNode
    }, pe.prototype.downgrade = function () {
      if (this.length === 1) {
        var _;
        for (_ in this.nodes) return this.nodes[_]
      }
      return this
    }
  }
}), js = Z({
  "external/npm/node_modules/domino/lib/DocumentType.js"(t, e) {
    "use strict";
    e.exports = s;
    var i = Be(), r = mc(), n = Ps();

    function s(a, o, d, l) {
      r.call(this), this.nodeType = i.DOCUMENT_TYPE_NODE, this.ownerDocument = a || null, this.name = o, this.publicId = d || "", this.systemId = l || ""
    }

    s.prototype = Object.create(r.prototype, {
      nodeName: {
        get: function () {
          return this.name
        }
      }, nodeValue: {
        get: function () {
          return null
        }, set: function () {
        }
      }, clone: {
        value: function () {
          return new s(this.ownerDocument, this.name, this.publicId, this.systemId)
        }
      }, isEqual: {
        value: function (o) {
          return this.name === o.name && this.publicId === o.publicId && this.systemId === o.systemId
        }
      }
    }), Object.defineProperties(s.prototype, n)
  }
}), Bs = Z({
  "external/npm/node_modules/domino/lib/HTMLParser.js"(t, e) {
    "use strict";
    e.exports = me;
    var i = Fs(), r = js(), n = Be(), s = Oe().NAMESPACE, a = Hs(), o = a.elements,
      d = Function.prototype.apply.bind(Array.prototype.push), l = -1, g = 1, m = 2, b = 3, I = 4, U = 5, O = [],
      Y = /^HTML$|^-\/\/W3O\/\/DTD W3 HTML Strict 3\.0\/\/EN\/\/$|^-\/W3C\/DTD HTML 4\.0 Transitional\/EN$|^\+\/\/Silmaril\/\/dtd html Pro v0r11 19970101\/\/|^-\/\/AdvaSoft Ltd\/\/DTD HTML 3\.0 asWedit \+ extensions\/\/|^-\/\/AS\/\/DTD HTML 3\.0 asWedit \+ extensions\/\/|^-\/\/IETF\/\/DTD HTML 2\.0 Level 1\/\/|^-\/\/IETF\/\/DTD HTML 2\.0 Level 2\/\/|^-\/\/IETF\/\/DTD HTML 2\.0 Strict Level 1\/\/|^-\/\/IETF\/\/DTD HTML 2\.0 Strict Level 2\/\/|^-\/\/IETF\/\/DTD HTML 2\.0 Strict\/\/|^-\/\/IETF\/\/DTD HTML 2\.0\/\/|^-\/\/IETF\/\/DTD HTML 2\.1E\/\/|^-\/\/IETF\/\/DTD HTML 3\.0\/\/|^-\/\/IETF\/\/DTD HTML 3\.2 Final\/\/|^-\/\/IETF\/\/DTD HTML 3\.2\/\/|^-\/\/IETF\/\/DTD HTML 3\/\/|^-\/\/IETF\/\/DTD HTML Level 0\/\/|^-\/\/IETF\/\/DTD HTML Level 1\/\/|^-\/\/IETF\/\/DTD HTML Level 2\/\/|^-\/\/IETF\/\/DTD HTML Level 3\/\/|^-\/\/IETF\/\/DTD HTML Strict Level 0\/\/|^-\/\/IETF\/\/DTD HTML Strict Level 1\/\/|^-\/\/IETF\/\/DTD HTML Strict Level 2\/\/|^-\/\/IETF\/\/DTD HTML Strict Level 3\/\/|^-\/\/IETF\/\/DTD HTML Strict\/\/|^-\/\/IETF\/\/DTD HTML\/\/|^-\/\/Metrius\/\/DTD Metrius Presentational\/\/|^-\/\/Microsoft\/\/DTD Internet Explorer 2\.0 HTML Strict\/\/|^-\/\/Microsoft\/\/DTD Internet Explorer 2\.0 HTML\/\/|^-\/\/Microsoft\/\/DTD Internet Explorer 2\.0 Tables\/\/|^-\/\/Microsoft\/\/DTD Internet Explorer 3\.0 HTML Strict\/\/|^-\/\/Microsoft\/\/DTD Internet Explorer 3\.0 HTML\/\/|^-\/\/Microsoft\/\/DTD Internet Explorer 3\.0 Tables\/\/|^-\/\/Netscape Comm\. Corp\.\/\/DTD HTML\/\/|^-\/\/Netscape Comm\. Corp\.\/\/DTD Strict HTML\/\/|^-\/\/O'Reilly and Associates\/\/DTD HTML 2\.0\/\/|^-\/\/O'Reilly and Associates\/\/DTD HTML Extended 1\.0\/\/|^-\/\/O'Reilly and Associates\/\/DTD HTML Extended Relaxed 1\.0\/\/|^-\/\/SoftQuad Software\/\/DTD HoTMetaL PRO 6\.0::19990601::extensions to HTML 4\.0\/\/|^-\/\/SoftQuad\/\/DTD HoTMetaL PRO 4\.0::19971010::extensions to HTML 4\.0\/\/|^-\/\/Spyglass\/\/DTD HTML 2\.0 Extended\/\/|^-\/\/SQ\/\/DTD HTML 2\.0 HoTMetaL \+ extensions\/\/|^-\/\/Sun Microsystems Corp\.\/\/DTD HotJava HTML\/\/|^-\/\/Sun Microsystems Corp\.\/\/DTD HotJava Strict HTML\/\/|^-\/\/W3C\/\/DTD HTML 3 1995-03-24\/\/|^-\/\/W3C\/\/DTD HTML 3\.2 Draft\/\/|^-\/\/W3C\/\/DTD HTML 3\.2 Final\/\/|^-\/\/W3C\/\/DTD HTML 3\.2\/\/|^-\/\/W3C\/\/DTD HTML 3\.2S Draft\/\/|^-\/\/W3C\/\/DTD HTML 4\.0 Frameset\/\/|^-\/\/W3C\/\/DTD HTML 4\.0 Transitional\/\/|^-\/\/W3C\/\/DTD HTML Experimental 19960712\/\/|^-\/\/W3C\/\/DTD HTML Experimental 970421\/\/|^-\/\/W3C\/\/DTD W3 HTML\/\/|^-\/\/W3O\/\/DTD W3 HTML 3\.0\/\/|^-\/\/WebTechs\/\/DTD Mozilla HTML 2\.0\/\/|^-\/\/WebTechs\/\/DTD Mozilla HTML\/\//i,
      x = "http://www.ibm.com/data/dtd/v11/ibmxhtml1-transitional.dtd",
      w = /^-\/\/W3C\/\/DTD HTML 4\.01 Frameset\/\/|^-\/\/W3C\/\/DTD HTML 4\.01 Transitional\/\//i,
      T = /^-\/\/W3C\/\/DTD XHTML 1\.0 Frameset\/\/|^-\/\/W3C\/\/DTD XHTML 1\.0 Transitional\/\//i,
      N = Object.create(null);
    N[s.HTML] = {
      __proto__: null,
      address: !0,
      applet: !0,
      area: !0,
      article: !0,
      aside: !0,
      base: !0,
      basefont: !0,
      bgsound: !0,
      blockquote: !0,
      body: !0,
      br: !0,
      button: !0,
      caption: !0,
      center: !0,
      col: !0,
      colgroup: !0,
      dd: !0,
      details: !0,
      dir: !0,
      div: !0,
      dl: !0,
      dt: !0,
      embed: !0,
      fieldset: !0,
      figcaption: !0,
      figure: !0,
      footer: !0,
      form: !0,
      frame: !0,
      frameset: !0,
      h1: !0,
      h2: !0,
      h3: !0,
      h4: !0,
      h5: !0,
      h6: !0,
      head: !0,
      header: !0,
      hgroup: !0,
      hr: !0,
      html: !0,
      iframe: !0,
      img: !0,
      input: !0,
      li: !0,
      link: !0,
      listing: !0,
      main: !0,
      marquee: !0,
      menu: !0,
      meta: !0,
      nav: !0,
      noembed: !0,
      noframes: !0,
      noscript: !0,
      object: !0,
      ol: !0,
      p: !0,
      param: !0,
      plaintext: !0,
      pre: !0,
      script: !0,
      section: !0,
      select: !0,
      source: !0,
      style: !0,
      summary: !0,
      table: !0,
      tbody: !0,
      td: !0,
      template: !0,
      textarea: !0,
      tfoot: !0,
      th: !0,
      thead: !0,
      title: !0,
      tr: !0,
      track: !0,
      ul: !0,
      wbr: !0,
      xmp: !0
    }, N[s.SVG] = {__proto__: null, foreignObject: !0, desc: !0, title: !0}, N[s.MATHML] = {
      __proto__: null,
      mi: !0,
      mo: !0,
      mn: !0,
      ms: !0,
      mtext: !0,
      "annotation-xml": !0
    };
    var y = Object.create(null);
    y[s.HTML] = {__proto__: null, address: !0, div: !0, p: !0};
    var ce = Object.create(null);
    ce[s.HTML] = {__proto__: null, dd: !0, dt: !0};
    var de = Object.create(null);
    de[s.HTML] = {__proto__: null, table: !0, thead: !0, tbody: !0, tfoot: !0, tr: !0};
    var Ae = Object.create(null);
    Ae[s.HTML] = {
      __proto__: null,
      dd: !0,
      dt: !0,
      li: !0,
      menuitem: !0,
      optgroup: !0,
      option: !0,
      p: !0,
      rb: !0,
      rp: !0,
      rt: !0,
      rtc: !0
    };
    var j = Object.create(null);
    j[s.HTML] = {
      __proto__: null,
      caption: !0,
      colgroup: !0,
      dd: !0,
      dt: !0,
      li: !0,
      optgroup: !0,
      option: !0,
      p: !0,
      rb: !0,
      rp: !0,
      rt: !0,
      rtc: !0,
      tbody: !0,
      td: !0,
      tfoot: !0,
      th: !0,
      thead: !0,
      tr: !0
    };
    var A = Object.create(null);
    A[s.HTML] = {__proto__: null, table: !0, template: !0, html: !0};
    var P = Object.create(null);
    P[s.HTML] = {__proto__: null, tbody: !0, tfoot: !0, thead: !0, template: !0, html: !0};
    var K = Object.create(null);
    K[s.HTML] = {__proto__: null, tr: !0, template: !0, html: !0};
    var p = Object.create(null);
    p[s.HTML] = {
      __proto__: null,
      button: !0,
      fieldset: !0,
      input: !0,
      keygen: !0,
      object: !0,
      output: !0,
      select: !0,
      textarea: !0,
      img: !0
    };
    var f = Object.create(null);
    f[s.HTML] = {
      __proto__: null,
      applet: !0,
      caption: !0,
      html: !0,
      table: !0,
      td: !0,
      th: !0,
      marquee: !0,
      object: !0,
      template: !0
    }, f[s.MATHML] = {
      __proto__: null,
      mi: !0,
      mo: !0,
      mn: !0,
      ms: !0,
      mtext: !0,
      "annotation-xml": !0
    }, f[s.SVG] = {__proto__: null, foreignObject: !0, desc: !0, title: !0};
    var h = Object.create(f);
    h[s.HTML] = Object.create(f[s.HTML]), h[s.HTML].ol = !0, h[s.HTML].ul = !0;
    var v = Object.create(f);
    v[s.HTML] = Object.create(f[s.HTML]), v[s.HTML].button = !0;
    var C = Object.create(null);
    C[s.HTML] = {__proto__: null, html: !0, table: !0, template: !0};
    var k = Object.create(null);
    k[s.HTML] = {__proto__: null, optgroup: !0, option: !0};
    var $ = Object.create(null);
    $[s.MATHML] = {__proto__: null, mi: !0, mo: !0, mn: !0, ms: !0, mtext: !0};
    var J = Object.create(null);
    J[s.SVG] = {__proto__: null, foreignObject: !0, desc: !0, title: !0};
    var pe = {
        __proto__: null,
        "xlink:actuate": s.XLINK,
        "xlink:arcrole": s.XLINK,
        "xlink:href": s.XLINK,
        "xlink:role": s.XLINK,
        "xlink:show": s.XLINK,
        "xlink:title": s.XLINK,
        "xlink:type": s.XLINK,
        "xml:base": s.XML,
        "xml:lang": s.XML,
        "xml:space": s.XML,
        xmlns: s.XMLNS,
        "xmlns:xlink": s.XMLNS
      }, _ = {
        __proto__: null,
        attributename: "attributeName",
        attributetype: "attributeType",
        basefrequency: "baseFrequency",
        baseprofile: "baseProfile",
        calcmode: "calcMode",
        clippathunits: "clipPathUnits",
        diffuseconstant: "diffuseConstant",
        edgemode: "edgeMode",
        filterunits: "filterUnits",
        glyphref: "glyphRef",
        gradienttransform: "gradientTransform",
        gradientunits: "gradientUnits",
        kernelmatrix: "kernelMatrix",
        kernelunitlength: "kernelUnitLength",
        keypoints: "keyPoints",
        keysplines: "keySplines",
        keytimes: "keyTimes",
        lengthadjust: "lengthAdjust",
        limitingconeangle: "limitingConeAngle",
        markerheight: "markerHeight",
        markerunits: "markerUnits",
        markerwidth: "markerWidth",
        maskcontentunits: "maskContentUnits",
        maskunits: "maskUnits",
        numoctaves: "numOctaves",
        pathlength: "pathLength",
        patterncontentunits: "patternContentUnits",
        patterntransform: "patternTransform",
        patternunits: "patternUnits",
        pointsatx: "pointsAtX",
        pointsaty: "pointsAtY",
        pointsatz: "pointsAtZ",
        preservealpha: "preserveAlpha",
        preserveaspectratio: "preserveAspectRatio",
        primitiveunits: "primitiveUnits",
        refx: "refX",
        refy: "refY",
        repeatcount: "repeatCount",
        repeatdur: "repeatDur",
        requiredextensions: "requiredExtensions",
        requiredfeatures: "requiredFeatures",
        specularconstant: "specularConstant",
        specularexponent: "specularExponent",
        spreadmethod: "spreadMethod",
        startoffset: "startOffset",
        stddeviation: "stdDeviation",
        stitchtiles: "stitchTiles",
        surfacescale: "surfaceScale",
        systemlanguage: "systemLanguage",
        tablevalues: "tableValues",
        targetx: "targetX",
        targety: "targetY",
        textlength: "textLength",
        viewbox: "viewBox",
        viewtarget: "viewTarget",
        xchannelselector: "xChannelSelector",
        ychannelselector: "yChannelSelector",
        zoomandpan: "zoomAndPan"
      }, M = {
        __proto__: null,
        altglyph: "altGlyph",
        altglyphdef: "altGlyphDef",
        altglyphitem: "altGlyphItem",
        animatecolor: "animateColor",
        animatemotion: "animateMotion",
        animatetransform: "animateTransform",
        clippath: "clipPath",
        feblend: "feBlend",
        fecolormatrix: "feColorMatrix",
        fecomponenttransfer: "feComponentTransfer",
        fecomposite: "feComposite",
        feconvolvematrix: "feConvolveMatrix",
        fediffuselighting: "feDiffuseLighting",
        fedisplacementmap: "feDisplacementMap",
        fedistantlight: "feDistantLight",
        feflood: "feFlood",
        fefunca: "feFuncA",
        fefuncb: "feFuncB",
        fefuncg: "feFuncG",
        fefuncr: "feFuncR",
        fegaussianblur: "feGaussianBlur",
        feimage: "feImage",
        femerge: "feMerge",
        femergenode: "feMergeNode",
        femorphology: "feMorphology",
        feoffset: "feOffset",
        fepointlight: "fePointLight",
        fespecularlighting: "feSpecularLighting",
        fespotlight: "feSpotLight",
        fetile: "feTile",
        feturbulence: "feTurbulence",
        foreignobject: "foreignObject",
        glyphref: "glyphRef",
        lineargradient: "linearGradient",
        radialgradient: "radialGradient",
        textpath: "textPath"
      }, z = {
        __proto__: null,
        0: 65533,
        128: 8364,
        130: 8218,
        131: 402,
        132: 8222,
        133: 8230,
        134: 8224,
        135: 8225,
        136: 710,
        137: 8240,
        138: 352,
        139: 8249,
        140: 338,
        142: 381,
        145: 8216,
        146: 8217,
        147: 8220,
        148: 8221,
        149: 8226,
        150: 8211,
        151: 8212,
        152: 732,
        153: 8482,
        154: 353,
        155: 8250,
        156: 339,
        158: 382,
        159: 376
      }, fe = {
        __proto__: null,
        AElig: 198,
        "AElig;": 198,
        AMP: 38,
        "AMP;": 38,
        Aacute: 193,
        "Aacute;": 193,
        "Abreve;": 258,
        Acirc: 194,
        "Acirc;": 194,
        "Acy;": 1040,
        "Afr;": [55349, 56580],
        Agrave: 192,
        "Agrave;": 192,
        "Alpha;": 913,
        "Amacr;": 256,
        "And;": 10835,
        "Aogon;": 260,
        "Aopf;": [55349, 56632],
        "ApplyFunction;": 8289,
        Aring: 197,
        "Aring;": 197,
        "Ascr;": [55349, 56476],
        "Assign;": 8788,
        Atilde: 195,
        "Atilde;": 195,
        Auml: 196,
        "Auml;": 196,
        "Backslash;": 8726,
        "Barv;": 10983,
        "Barwed;": 8966,
        "Bcy;": 1041,
        "Because;": 8757,
        "Bernoullis;": 8492,
        "Beta;": 914,
        "Bfr;": [55349, 56581],
        "Bopf;": [55349, 56633],
        "Breve;": 728,
        "Bscr;": 8492,
        "Bumpeq;": 8782,
        "CHcy;": 1063,
        COPY: 169,
        "COPY;": 169,
        "Cacute;": 262,
        "Cap;": 8914,
        "CapitalDifferentialD;": 8517,
        "Cayleys;": 8493,
        "Ccaron;": 268,
        Ccedil: 199,
        "Ccedil;": 199,
        "Ccirc;": 264,
        "Cconint;": 8752,
        "Cdot;": 266,
        "Cedilla;": 184,
        "CenterDot;": 183,
        "Cfr;": 8493,
        "Chi;": 935,
        "CircleDot;": 8857,
        "CircleMinus;": 8854,
        "CirclePlus;": 8853,
        "CircleTimes;": 8855,
        "ClockwiseContourIntegral;": 8754,
        "CloseCurlyDoubleQuote;": 8221,
        "CloseCurlyQuote;": 8217,
        "Colon;": 8759,
        "Colone;": 10868,
        "Congruent;": 8801,
        "Conint;": 8751,
        "ContourIntegral;": 8750,
        "Copf;": 8450,
        "Coproduct;": 8720,
        "CounterClockwiseContourIntegral;": 8755,
        "Cross;": 10799,
        "Cscr;": [55349, 56478],
        "Cup;": 8915,
        "CupCap;": 8781,
        "DD;": 8517,
        "DDotrahd;": 10513,
        "DJcy;": 1026,
        "DScy;": 1029,
        "DZcy;": 1039,
        "Dagger;": 8225,
        "Darr;": 8609,
        "Dashv;": 10980,
        "Dcaron;": 270,
        "Dcy;": 1044,
        "Del;": 8711,
        "Delta;": 916,
        "Dfr;": [55349, 56583],
        "DiacriticalAcute;": 180,
        "DiacriticalDot;": 729,
        "DiacriticalDoubleAcute;": 733,
        "DiacriticalGrave;": 96,
        "DiacriticalTilde;": 732,
        "Diamond;": 8900,
        "DifferentialD;": 8518,
        "Dopf;": [55349, 56635],
        "Dot;": 168,
        "DotDot;": 8412,
        "DotEqual;": 8784,
        "DoubleContourIntegral;": 8751,
        "DoubleDot;": 168,
        "DoubleDownArrow;": 8659,
        "DoubleLeftArrow;": 8656,
        "DoubleLeftRightArrow;": 8660,
        "DoubleLeftTee;": 10980,
        "DoubleLongLeftArrow;": 10232,
        "DoubleLongLeftRightArrow;": 10234,
        "DoubleLongRightArrow;": 10233,
        "DoubleRightArrow;": 8658,
        "DoubleRightTee;": 8872,
        "DoubleUpArrow;": 8657,
        "DoubleUpDownArrow;": 8661,
        "DoubleVerticalBar;": 8741,
        "DownArrow;": 8595,
        "DownArrowBar;": 10515,
        "DownArrowUpArrow;": 8693,
        "DownBreve;": 785,
        "DownLeftRightVector;": 10576,
        "DownLeftTeeVector;": 10590,
        "DownLeftVector;": 8637,
        "DownLeftVectorBar;": 10582,
        "DownRightTeeVector;": 10591,
        "DownRightVector;": 8641,
        "DownRightVectorBar;": 10583,
        "DownTee;": 8868,
        "DownTeeArrow;": 8615,
        "Downarrow;": 8659,
        "Dscr;": [55349, 56479],
        "Dstrok;": 272,
        "ENG;": 330,
        ETH: 208,
        "ETH;": 208,
        Eacute: 201,
        "Eacute;": 201,
        "Ecaron;": 282,
        Ecirc: 202,
        "Ecirc;": 202,
        "Ecy;": 1069,
        "Edot;": 278,
        "Efr;": [55349, 56584],
        Egrave: 200,
        "Egrave;": 200,
        "Element;": 8712,
        "Emacr;": 274,
        "EmptySmallSquare;": 9723,
        "EmptyVerySmallSquare;": 9643,
        "Eogon;": 280,
        "Eopf;": [55349, 56636],
        "Epsilon;": 917,
        "Equal;": 10869,
        "EqualTilde;": 8770,
        "Equilibrium;": 8652,
        "Escr;": 8496,
        "Esim;": 10867,
        "Eta;": 919,
        Euml: 203,
        "Euml;": 203,
        "Exists;": 8707,
        "ExponentialE;": 8519,
        "Fcy;": 1060,
        "Ffr;": [55349, 56585],
        "FilledSmallSquare;": 9724,
        "FilledVerySmallSquare;": 9642,
        "Fopf;": [55349, 56637],
        "ForAll;": 8704,
        "Fouriertrf;": 8497,
        "Fscr;": 8497,
        "GJcy;": 1027,
        GT: 62,
        "GT;": 62,
        "Gamma;": 915,
        "Gammad;": 988,
        "Gbreve;": 286,
        "Gcedil;": 290,
        "Gcirc;": 284,
        "Gcy;": 1043,
        "Gdot;": 288,
        "Gfr;": [55349, 56586],
        "Gg;": 8921,
        "Gopf;": [55349, 56638],
        "GreaterEqual;": 8805,
        "GreaterEqualLess;": 8923,
        "GreaterFullEqual;": 8807,
        "GreaterGreater;": 10914,
        "GreaterLess;": 8823,
        "GreaterSlantEqual;": 10878,
        "GreaterTilde;": 8819,
        "Gscr;": [55349, 56482],
        "Gt;": 8811,
        "HARDcy;": 1066,
        "Hacek;": 711,
        "Hat;": 94,
        "Hcirc;": 292,
        "Hfr;": 8460,
        "HilbertSpace;": 8459,
        "Hopf;": 8461,
        "HorizontalLine;": 9472,
        "Hscr;": 8459,
        "Hstrok;": 294,
        "HumpDownHump;": 8782,
        "HumpEqual;": 8783,
        "IEcy;": 1045,
        "IJlig;": 306,
        "IOcy;": 1025,
        Iacute: 205,
        "Iacute;": 205,
        Icirc: 206,
        "Icirc;": 206,
        "Icy;": 1048,
        "Idot;": 304,
        "Ifr;": 8465,
        Igrave: 204,
        "Igrave;": 204,
        "Im;": 8465,
        "Imacr;": 298,
        "ImaginaryI;": 8520,
        "Implies;": 8658,
        "Int;": 8748,
        "Integral;": 8747,
        "Intersection;": 8898,
        "InvisibleComma;": 8291,
        "InvisibleTimes;": 8290,
        "Iogon;": 302,
        "Iopf;": [55349, 56640],
        "Iota;": 921,
        "Iscr;": 8464,
        "Itilde;": 296,
        "Iukcy;": 1030,
        Iuml: 207,
        "Iuml;": 207,
        "Jcirc;": 308,
        "Jcy;": 1049,
        "Jfr;": [55349, 56589],
        "Jopf;": [55349, 56641],
        "Jscr;": [55349, 56485],
        "Jsercy;": 1032,
        "Jukcy;": 1028,
        "KHcy;": 1061,
        "KJcy;": 1036,
        "Kappa;": 922,
        "Kcedil;": 310,
        "Kcy;": 1050,
        "Kfr;": [55349, 56590],
        "Kopf;": [55349, 56642],
        "Kscr;": [55349, 56486],
        "LJcy;": 1033,
        LT: 60,
        "LT;": 60,
        "Lacute;": 313,
        "Lambda;": 923,
        "Lang;": 10218,
        "Laplacetrf;": 8466,
        "Larr;": 8606,
        "Lcaron;": 317,
        "Lcedil;": 315,
        "Lcy;": 1051,
        "LeftAngleBracket;": 10216,
        "LeftArrow;": 8592,
        "LeftArrowBar;": 8676,
        "LeftArrowRightArrow;": 8646,
        "LeftCeiling;": 8968,
        "LeftDoubleBracket;": 10214,
        "LeftDownTeeVector;": 10593,
        "LeftDownVector;": 8643,
        "LeftDownVectorBar;": 10585,
        "LeftFloor;": 8970,
        "LeftRightArrow;": 8596,
        "LeftRightVector;": 10574,
        "LeftTee;": 8867,
        "LeftTeeArrow;": 8612,
        "LeftTeeVector;": 10586,
        "LeftTriangle;": 8882,
        "LeftTriangleBar;": 10703,
        "LeftTriangleEqual;": 8884,
        "LeftUpDownVector;": 10577,
        "LeftUpTeeVector;": 10592,
        "LeftUpVector;": 8639,
        "LeftUpVectorBar;": 10584,
        "LeftVector;": 8636,
        "LeftVectorBar;": 10578,
        "Leftarrow;": 8656,
        "Leftrightarrow;": 8660,
        "LessEqualGreater;": 8922,
        "LessFullEqual;": 8806,
        "LessGreater;": 8822,
        "LessLess;": 10913,
        "LessSlantEqual;": 10877,
        "LessTilde;": 8818,
        "Lfr;": [55349, 56591],
        "Ll;": 8920,
        "Lleftarrow;": 8666,
        "Lmidot;": 319,
        "LongLeftArrow;": 10229,
        "LongLeftRightArrow;": 10231,
        "LongRightArrow;": 10230,
        "Longleftarrow;": 10232,
        "Longleftrightarrow;": 10234,
        "Longrightarrow;": 10233,
        "Lopf;": [55349, 56643],
        "LowerLeftArrow;": 8601,
        "LowerRightArrow;": 8600,
        "Lscr;": 8466,
        "Lsh;": 8624,
        "Lstrok;": 321,
        "Lt;": 8810,
        "Map;": 10501,
        "Mcy;": 1052,
        "MediumSpace;": 8287,
        "Mellintrf;": 8499,
        "Mfr;": [55349, 56592],
        "MinusPlus;": 8723,
        "Mopf;": [55349, 56644],
        "Mscr;": 8499,
        "Mu;": 924,
        "NJcy;": 1034,
        "Nacute;": 323,
        "Ncaron;": 327,
        "Ncedil;": 325,
        "Ncy;": 1053,
        "NegativeMediumSpace;": 8203,
        "NegativeThickSpace;": 8203,
        "NegativeThinSpace;": 8203,
        "NegativeVeryThinSpace;": 8203,
        "NestedGreaterGreater;": 8811,
        "NestedLessLess;": 8810,
        "NewLine;": 10,
        "Nfr;": [55349, 56593],
        "NoBreak;": 8288,
        "NonBreakingSpace;": 160,
        "Nopf;": 8469,
        "Not;": 10988,
        "NotCongruent;": 8802,
        "NotCupCap;": 8813,
        "NotDoubleVerticalBar;": 8742,
        "NotElement;": 8713,
        "NotEqual;": 8800,
        "NotEqualTilde;": [8770, 824],
        "NotExists;": 8708,
        "NotGreater;": 8815,
        "NotGreaterEqual;": 8817,
        "NotGreaterFullEqual;": [8807, 824],
        "NotGreaterGreater;": [8811, 824],
        "NotGreaterLess;": 8825,
        "NotGreaterSlantEqual;": [10878, 824],
        "NotGreaterTilde;": 8821,
        "NotHumpDownHump;": [8782, 824],
        "NotHumpEqual;": [8783, 824],
        "NotLeftTriangle;": 8938,
        "NotLeftTriangleBar;": [10703, 824],
        "NotLeftTriangleEqual;": 8940,
        "NotLess;": 8814,
        "NotLessEqual;": 8816,
        "NotLessGreater;": 8824,
        "NotLessLess;": [8810, 824],
        "NotLessSlantEqual;": [10877, 824],
        "NotLessTilde;": 8820,
        "NotNestedGreaterGreater;": [10914, 824],
        "NotNestedLessLess;": [10913, 824],
        "NotPrecedes;": 8832,
        "NotPrecedesEqual;": [10927, 824],
        "NotPrecedesSlantEqual;": 8928,
        "NotReverseElement;": 8716,
        "NotRightTriangle;": 8939,
        "NotRightTriangleBar;": [10704, 824],
        "NotRightTriangleEqual;": 8941,
        "NotSquareSubset;": [8847, 824],
        "NotSquareSubsetEqual;": 8930,
        "NotSquareSuperset;": [8848, 824],
        "NotSquareSupersetEqual;": 8931,
        "NotSubset;": [8834, 8402],
        "NotSubsetEqual;": 8840,
        "NotSucceeds;": 8833,
        "NotSucceedsEqual;": [10928, 824],
        "NotSucceedsSlantEqual;": 8929,
        "NotSucceedsTilde;": [8831, 824],
        "NotSuperset;": [8835, 8402],
        "NotSupersetEqual;": 8841,
        "NotTilde;": 8769,
        "NotTildeEqual;": 8772,
        "NotTildeFullEqual;": 8775,
        "NotTildeTilde;": 8777,
        "NotVerticalBar;": 8740,
        "Nscr;": [55349, 56489],
        Ntilde: 209,
        "Ntilde;": 209,
        "Nu;": 925,
        "OElig;": 338,
        Oacute: 211,
        "Oacute;": 211,
        Ocirc: 212,
        "Ocirc;": 212,
        "Ocy;": 1054,
        "Odblac;": 336,
        "Ofr;": [55349, 56594],
        Ograve: 210,
        "Ograve;": 210,
        "Omacr;": 332,
        "Omega;": 937,
        "Omicron;": 927,
        "Oopf;": [55349, 56646],
        "OpenCurlyDoubleQuote;": 8220,
        "OpenCurlyQuote;": 8216,
        "Or;": 10836,
        "Oscr;": [55349, 56490],
        Oslash: 216,
        "Oslash;": 216,
        Otilde: 213,
        "Otilde;": 213,
        "Otimes;": 10807,
        Ouml: 214,
        "Ouml;": 214,
        "OverBar;": 8254,
        "OverBrace;": 9182,
        "OverBracket;": 9140,
        "OverParenthesis;": 9180,
        "PartialD;": 8706,
        "Pcy;": 1055,
        "Pfr;": [55349, 56595],
        "Phi;": 934,
        "Pi;": 928,
        "PlusMinus;": 177,
        "Poincareplane;": 8460,
        "Popf;": 8473,
        "Pr;": 10939,
        "Precedes;": 8826,
        "PrecedesEqual;": 10927,
        "PrecedesSlantEqual;": 8828,
        "PrecedesTilde;": 8830,
        "Prime;": 8243,
        "Product;": 8719,
        "Proportion;": 8759,
        "Proportional;": 8733,
        "Pscr;": [55349, 56491],
        "Psi;": 936,
        QUOT: 34,
        "QUOT;": 34,
        "Qfr;": [55349, 56596],
        "Qopf;": 8474,
        "Qscr;": [55349, 56492],
        "RBarr;": 10512,
        REG: 174,
        "REG;": 174,
        "Racute;": 340,
        "Rang;": 10219,
        "Rarr;": 8608,
        "Rarrtl;": 10518,
        "Rcaron;": 344,
        "Rcedil;": 342,
        "Rcy;": 1056,
        "Re;": 8476,
        "ReverseElement;": 8715,
        "ReverseEquilibrium;": 8651,
        "ReverseUpEquilibrium;": 10607,
        "Rfr;": 8476,
        "Rho;": 929,
        "RightAngleBracket;": 10217,
        "RightArrow;": 8594,
        "RightArrowBar;": 8677,
        "RightArrowLeftArrow;": 8644,
        "RightCeiling;": 8969,
        "RightDoubleBracket;": 10215,
        "RightDownTeeVector;": 10589,
        "RightDownVector;": 8642,
        "RightDownVectorBar;": 10581,
        "RightFloor;": 8971,
        "RightTee;": 8866,
        "RightTeeArrow;": 8614,
        "RightTeeVector;": 10587,
        "RightTriangle;": 8883,
        "RightTriangleBar;": 10704,
        "RightTriangleEqual;": 8885,
        "RightUpDownVector;": 10575,
        "RightUpTeeVector;": 10588,
        "RightUpVector;": 8638,
        "RightUpVectorBar;": 10580,
        "RightVector;": 8640,
        "RightVectorBar;": 10579,
        "Rightarrow;": 8658,
        "Ropf;": 8477,
        "RoundImplies;": 10608,
        "Rrightarrow;": 8667,
        "Rscr;": 8475,
        "Rsh;": 8625,
        "RuleDelayed;": 10740,
        "SHCHcy;": 1065,
        "SHcy;": 1064,
        "SOFTcy;": 1068,
        "Sacute;": 346,
        "Sc;": 10940,
        "Scaron;": 352,
        "Scedil;": 350,
        "Scirc;": 348,
        "Scy;": 1057,
        "Sfr;": [55349, 56598],
        "ShortDownArrow;": 8595,
        "ShortLeftArrow;": 8592,
        "ShortRightArrow;": 8594,
        "ShortUpArrow;": 8593,
        "Sigma;": 931,
        "SmallCircle;": 8728,
        "Sopf;": [55349, 56650],
        "Sqrt;": 8730,
        "Square;": 9633,
        "SquareIntersection;": 8851,
        "SquareSubset;": 8847,
        "SquareSubsetEqual;": 8849,
        "SquareSuperset;": 8848,
        "SquareSupersetEqual;": 8850,
        "SquareUnion;": 8852,
        "Sscr;": [55349, 56494],
        "Star;": 8902,
        "Sub;": 8912,
        "Subset;": 8912,
        "SubsetEqual;": 8838,
        "Succeeds;": 8827,
        "SucceedsEqual;": 10928,
        "SucceedsSlantEqual;": 8829,
        "SucceedsTilde;": 8831,
        "SuchThat;": 8715,
        "Sum;": 8721,
        "Sup;": 8913,
        "Superset;": 8835,
        "SupersetEqual;": 8839,
        "Supset;": 8913,
        THORN: 222,
        "THORN;": 222,
        "TRADE;": 8482,
        "TSHcy;": 1035,
        "TScy;": 1062,
        "Tab;": 9,
        "Tau;": 932,
        "Tcaron;": 356,
        "Tcedil;": 354,
        "Tcy;": 1058,
        "Tfr;": [55349, 56599],
        "Therefore;": 8756,
        "Theta;": 920,
        "ThickSpace;": [8287, 8202],
        "ThinSpace;": 8201,
        "Tilde;": 8764,
        "TildeEqual;": 8771,
        "TildeFullEqual;": 8773,
        "TildeTilde;": 8776,
        "Topf;": [55349, 56651],
        "TripleDot;": 8411,
        "Tscr;": [55349, 56495],
        "Tstrok;": 358,
        Uacute: 218,
        "Uacute;": 218,
        "Uarr;": 8607,
        "Uarrocir;": 10569,
        "Ubrcy;": 1038,
        "Ubreve;": 364,
        Ucirc: 219,
        "Ucirc;": 219,
        "Ucy;": 1059,
        "Udblac;": 368,
        "Ufr;": [55349, 56600],
        Ugrave: 217,
        "Ugrave;": 217,
        "Umacr;": 362,
        "UnderBar;": 95,
        "UnderBrace;": 9183,
        "UnderBracket;": 9141,
        "UnderParenthesis;": 9181,
        "Union;": 8899,
        "UnionPlus;": 8846,
        "Uogon;": 370,
        "Uopf;": [55349, 56652],
        "UpArrow;": 8593,
        "UpArrowBar;": 10514,
        "UpArrowDownArrow;": 8645,
        "UpDownArrow;": 8597,
        "UpEquilibrium;": 10606,
        "UpTee;": 8869,
        "UpTeeArrow;": 8613,
        "Uparrow;": 8657,
        "Updownarrow;": 8661,
        "UpperLeftArrow;": 8598,
        "UpperRightArrow;": 8599,
        "Upsi;": 978,
        "Upsilon;": 933,
        "Uring;": 366,
        "Uscr;": [55349, 56496],
        "Utilde;": 360,
        Uuml: 220,
        "Uuml;": 220,
        "VDash;": 8875,
        "Vbar;": 10987,
        "Vcy;": 1042,
        "Vdash;": 8873,
        "Vdashl;": 10982,
        "Vee;": 8897,
        "Verbar;": 8214,
        "Vert;": 8214,
        "VerticalBar;": 8739,
        "VerticalLine;": 124,
        "VerticalSeparator;": 10072,
        "VerticalTilde;": 8768,
        "VeryThinSpace;": 8202,
        "Vfr;": [55349, 56601],
        "Vopf;": [55349, 56653],
        "Vscr;": [55349, 56497],
        "Vvdash;": 8874,
        "Wcirc;": 372,
        "Wedge;": 8896,
        "Wfr;": [55349, 56602],
        "Wopf;": [55349, 56654],
        "Wscr;": [55349, 56498],
        "Xfr;": [55349, 56603],
        "Xi;": 926,
        "Xopf;": [55349, 56655],
        "Xscr;": [55349, 56499],
        "YAcy;": 1071,
        "YIcy;": 1031,
        "YUcy;": 1070,
        Yacute: 221,
        "Yacute;": 221,
        "Ycirc;": 374,
        "Ycy;": 1067,
        "Yfr;": [55349, 56604],
        "Yopf;": [55349, 56656],
        "Yscr;": [55349, 56500],
        "Yuml;": 376,
        "ZHcy;": 1046,
        "Zacute;": 377,
        "Zcaron;": 381,
        "Zcy;": 1047,
        "Zdot;": 379,
        "ZeroWidthSpace;": 8203,
        "Zeta;": 918,
        "Zfr;": 8488,
        "Zopf;": 8484,
        "Zscr;": [55349, 56501],
        aacute: 225,
        "aacute;": 225,
        "abreve;": 259,
        "ac;": 8766,
        "acE;": [8766, 819],
        "acd;": 8767,
        acirc: 226,
        "acirc;": 226,
        acute: 180,
        "acute;": 180,
        "acy;": 1072,
        aelig: 230,
        "aelig;": 230,
        "af;": 8289,
        "afr;": [55349, 56606],
        agrave: 224,
        "agrave;": 224,
        "alefsym;": 8501,
        "aleph;": 8501,
        "alpha;": 945,
        "amacr;": 257,
        "amalg;": 10815,
        amp: 38,
        "amp;": 38,
        "and;": 8743,
        "andand;": 10837,
        "andd;": 10844,
        "andslope;": 10840,
        "andv;": 10842,
        "ang;": 8736,
        "ange;": 10660,
        "angle;": 8736,
        "angmsd;": 8737,
        "angmsdaa;": 10664,
        "angmsdab;": 10665,
        "angmsdac;": 10666,
        "angmsdad;": 10667,
        "angmsdae;": 10668,
        "angmsdaf;": 10669,
        "angmsdag;": 10670,
        "angmsdah;": 10671,
        "angrt;": 8735,
        "angrtvb;": 8894,
        "angrtvbd;": 10653,
        "angsph;": 8738,
        "angst;": 197,
        "angzarr;": 9084,
        "aogon;": 261,
        "aopf;": [55349, 56658],
        "ap;": 8776,
        "apE;": 10864,
        "apacir;": 10863,
        "ape;": 8778,
        "apid;": 8779,
        "apos;": 39,
        "approx;": 8776,
        "approxeq;": 8778,
        aring: 229,
        "aring;": 229,
        "ascr;": [55349, 56502],
        "ast;": 42,
        "asymp;": 8776,
        "asympeq;": 8781,
        atilde: 227,
        "atilde;": 227,
        auml: 228,
        "auml;": 228,
        "awconint;": 8755,
        "awint;": 10769,
        "bNot;": 10989,
        "backcong;": 8780,
        "backepsilon;": 1014,
        "backprime;": 8245,
        "backsim;": 8765,
        "backsimeq;": 8909,
        "barvee;": 8893,
        "barwed;": 8965,
        "barwedge;": 8965,
        "bbrk;": 9141,
        "bbrktbrk;": 9142,
        "bcong;": 8780,
        "bcy;": 1073,
        "bdquo;": 8222,
        "becaus;": 8757,
        "because;": 8757,
        "bemptyv;": 10672,
        "bepsi;": 1014,
        "bernou;": 8492,
        "beta;": 946,
        "beth;": 8502,
        "between;": 8812,
        "bfr;": [55349, 56607],
        "bigcap;": 8898,
        "bigcirc;": 9711,
        "bigcup;": 8899,
        "bigodot;": 10752,
        "bigoplus;": 10753,
        "bigotimes;": 10754,
        "bigsqcup;": 10758,
        "bigstar;": 9733,
        "bigtriangledown;": 9661,
        "bigtriangleup;": 9651,
        "biguplus;": 10756,
        "bigvee;": 8897,
        "bigwedge;": 8896,
        "bkarow;": 10509,
        "blacklozenge;": 10731,
        "blacksquare;": 9642,
        "blacktriangle;": 9652,
        "blacktriangledown;": 9662,
        "blacktriangleleft;": 9666,
        "blacktriangleright;": 9656,
        "blank;": 9251,
        "blk12;": 9618,
        "blk14;": 9617,
        "blk34;": 9619,
        "block;": 9608,
        "bne;": [61, 8421],
        "bnequiv;": [8801, 8421],
        "bnot;": 8976,
        "bopf;": [55349, 56659],
        "bot;": 8869,
        "bottom;": 8869,
        "bowtie;": 8904,
        "boxDL;": 9559,
        "boxDR;": 9556,
        "boxDl;": 9558,
        "boxDr;": 9555,
        "boxH;": 9552,
        "boxHD;": 9574,
        "boxHU;": 9577,
        "boxHd;": 9572,
        "boxHu;": 9575,
        "boxUL;": 9565,
        "boxUR;": 9562,
        "boxUl;": 9564,
        "boxUr;": 9561,
        "boxV;": 9553,
        "boxVH;": 9580,
        "boxVL;": 9571,
        "boxVR;": 9568,
        "boxVh;": 9579,
        "boxVl;": 9570,
        "boxVr;": 9567,
        "boxbox;": 10697,
        "boxdL;": 9557,
        "boxdR;": 9554,
        "boxdl;": 9488,
        "boxdr;": 9484,
        "boxh;": 9472,
        "boxhD;": 9573,
        "boxhU;": 9576,
        "boxhd;": 9516,
        "boxhu;": 9524,
        "boxminus;": 8863,
        "boxplus;": 8862,
        "boxtimes;": 8864,
        "boxuL;": 9563,
        "boxuR;": 9560,
        "boxul;": 9496,
        "boxur;": 9492,
        "boxv;": 9474,
        "boxvH;": 9578,
        "boxvL;": 9569,
        "boxvR;": 9566,
        "boxvh;": 9532,
        "boxvl;": 9508,
        "boxvr;": 9500,
        "bprime;": 8245,
        "breve;": 728,
        brvbar: 166,
        "brvbar;": 166,
        "bscr;": [55349, 56503],
        "bsemi;": 8271,
        "bsim;": 8765,
        "bsime;": 8909,
        "bsol;": 92,
        "bsolb;": 10693,
        "bsolhsub;": 10184,
        "bull;": 8226,
        "bullet;": 8226,
        "bump;": 8782,
        "bumpE;": 10926,
        "bumpe;": 8783,
        "bumpeq;": 8783,
        "cacute;": 263,
        "cap;": 8745,
        "capand;": 10820,
        "capbrcup;": 10825,
        "capcap;": 10827,
        "capcup;": 10823,
        "capdot;": 10816,
        "caps;": [8745, 65024],
        "caret;": 8257,
        "caron;": 711,
        "ccaps;": 10829,
        "ccaron;": 269,
        ccedil: 231,
        "ccedil;": 231,
        "ccirc;": 265,
        "ccups;": 10828,
        "ccupssm;": 10832,
        "cdot;": 267,
        cedil: 184,
        "cedil;": 184,
        "cemptyv;": 10674,
        cent: 162,
        "cent;": 162,
        "centerdot;": 183,
        "cfr;": [55349, 56608],
        "chcy;": 1095,
        "check;": 10003,
        "checkmark;": 10003,
        "chi;": 967,
        "cir;": 9675,
        "cirE;": 10691,
        "circ;": 710,
        "circeq;": 8791,
        "circlearrowleft;": 8634,
        "circlearrowright;": 8635,
        "circledR;": 174,
        "circledS;": 9416,
        "circledast;": 8859,
        "circledcirc;": 8858,
        "circleddash;": 8861,
        "cire;": 8791,
        "cirfnint;": 10768,
        "cirmid;": 10991,
        "cirscir;": 10690,
        "clubs;": 9827,
        "clubsuit;": 9827,
        "colon;": 58,
        "colone;": 8788,
        "coloneq;": 8788,
        "comma;": 44,
        "commat;": 64,
        "comp;": 8705,
        "compfn;": 8728,
        "complement;": 8705,
        "complexes;": 8450,
        "cong;": 8773,
        "congdot;": 10861,
        "conint;": 8750,
        "copf;": [55349, 56660],
        "coprod;": 8720,
        copy: 169,
        "copy;": 169,
        "copysr;": 8471,
        "crarr;": 8629,
        "cross;": 10007,
        "cscr;": [55349, 56504],
        "csub;": 10959,
        "csube;": 10961,
        "csup;": 10960,
        "csupe;": 10962,
        "ctdot;": 8943,
        "cudarrl;": 10552,
        "cudarrr;": 10549,
        "cuepr;": 8926,
        "cuesc;": 8927,
        "cularr;": 8630,
        "cularrp;": 10557,
        "cup;": 8746,
        "cupbrcap;": 10824,
        "cupcap;": 10822,
        "cupcup;": 10826,
        "cupdot;": 8845,
        "cupor;": 10821,
        "cups;": [8746, 65024],
        "curarr;": 8631,
        "curarrm;": 10556,
        "curlyeqprec;": 8926,
        "curlyeqsucc;": 8927,
        "curlyvee;": 8910,
        "curlywedge;": 8911,
        curren: 164,
        "curren;": 164,
        "curvearrowleft;": 8630,
        "curvearrowright;": 8631,
        "cuvee;": 8910,
        "cuwed;": 8911,
        "cwconint;": 8754,
        "cwint;": 8753,
        "cylcty;": 9005,
        "dArr;": 8659,
        "dHar;": 10597,
        "dagger;": 8224,
        "daleth;": 8504,
        "darr;": 8595,
        "dash;": 8208,
        "dashv;": 8867,
        "dbkarow;": 10511,
        "dblac;": 733,
        "dcaron;": 271,
        "dcy;": 1076,
        "dd;": 8518,
        "ddagger;": 8225,
        "ddarr;": 8650,
        "ddotseq;": 10871,
        deg: 176,
        "deg;": 176,
        "delta;": 948,
        "demptyv;": 10673,
        "dfisht;": 10623,
        "dfr;": [55349, 56609],
        "dharl;": 8643,
        "dharr;": 8642,
        "diam;": 8900,
        "diamond;": 8900,
        "diamondsuit;": 9830,
        "diams;": 9830,
        "die;": 168,
        "digamma;": 989,
        "disin;": 8946,
        "div;": 247,
        divide: 247,
        "divide;": 247,
        "divideontimes;": 8903,
        "divonx;": 8903,
        "djcy;": 1106,
        "dlcorn;": 8990,
        "dlcrop;": 8973,
        "dollar;": 36,
        "dopf;": [55349, 56661],
        "dot;": 729,
        "doteq;": 8784,
        "doteqdot;": 8785,
        "dotminus;": 8760,
        "dotplus;": 8724,
        "dotsquare;": 8865,
        "doublebarwedge;": 8966,
        "downarrow;": 8595,
        "downdownarrows;": 8650,
        "downharpoonleft;": 8643,
        "downharpoonright;": 8642,
        "drbkarow;": 10512,
        "drcorn;": 8991,
        "drcrop;": 8972,
        "dscr;": [55349, 56505],
        "dscy;": 1109,
        "dsol;": 10742,
        "dstrok;": 273,
        "dtdot;": 8945,
        "dtri;": 9663,
        "dtrif;": 9662,
        "duarr;": 8693,
        "duhar;": 10607,
        "dwangle;": 10662,
        "dzcy;": 1119,
        "dzigrarr;": 10239,
        "eDDot;": 10871,
        "eDot;": 8785,
        eacute: 233,
        "eacute;": 233,
        "easter;": 10862,
        "ecaron;": 283,
        "ecir;": 8790,
        ecirc: 234,
        "ecirc;": 234,
        "ecolon;": 8789,
        "ecy;": 1101,
        "edot;": 279,
        "ee;": 8519,
        "efDot;": 8786,
        "efr;": [55349, 56610],
        "eg;": 10906,
        egrave: 232,
        "egrave;": 232,
        "egs;": 10902,
        "egsdot;": 10904,
        "el;": 10905,
        "elinters;": 9191,
        "ell;": 8467,
        "els;": 10901,
        "elsdot;": 10903,
        "emacr;": 275,
        "empty;": 8709,
        "emptyset;": 8709,
        "emptyv;": 8709,
        "emsp13;": 8196,
        "emsp14;": 8197,
        "emsp;": 8195,
        "eng;": 331,
        "ensp;": 8194,
        "eogon;": 281,
        "eopf;": [55349, 56662],
        "epar;": 8917,
        "eparsl;": 10723,
        "eplus;": 10865,
        "epsi;": 949,
        "epsilon;": 949,
        "epsiv;": 1013,
        "eqcirc;": 8790,
        "eqcolon;": 8789,
        "eqsim;": 8770,
        "eqslantgtr;": 10902,
        "eqslantless;": 10901,
        "equals;": 61,
        "equest;": 8799,
        "equiv;": 8801,
        "equivDD;": 10872,
        "eqvparsl;": 10725,
        "erDot;": 8787,
        "erarr;": 10609,
        "escr;": 8495,
        "esdot;": 8784,
        "esim;": 8770,
        "eta;": 951,
        eth: 240,
        "eth;": 240,
        euml: 235,
        "euml;": 235,
        "euro;": 8364,
        "excl;": 33,
        "exist;": 8707,
        "expectation;": 8496,
        "exponentiale;": 8519,
        "fallingdotseq;": 8786,
        "fcy;": 1092,
        "female;": 9792,
        "ffilig;": 64259,
        "fflig;": 64256,
        "ffllig;": 64260,
        "ffr;": [55349, 56611],
        "filig;": 64257,
        "fjlig;": [102, 106],
        "flat;": 9837,
        "fllig;": 64258,
        "fltns;": 9649,
        "fnof;": 402,
        "fopf;": [55349, 56663],
        "forall;": 8704,
        "fork;": 8916,
        "forkv;": 10969,
        "fpartint;": 10765,
        frac12: 189,
        "frac12;": 189,
        "frac13;": 8531,
        frac14: 188,
        "frac14;": 188,
        "frac15;": 8533,
        "frac16;": 8537,
        "frac18;": 8539,
        "frac23;": 8532,
        "frac25;": 8534,
        frac34: 190,
        "frac34;": 190,
        "frac35;": 8535,
        "frac38;": 8540,
        "frac45;": 8536,
        "frac56;": 8538,
        "frac58;": 8541,
        "frac78;": 8542,
        "frasl;": 8260,
        "frown;": 8994,
        "fscr;": [55349, 56507],
        "gE;": 8807,
        "gEl;": 10892,
        "gacute;": 501,
        "gamma;": 947,
        "gammad;": 989,
        "gap;": 10886,
        "gbreve;": 287,
        "gcirc;": 285,
        "gcy;": 1075,
        "gdot;": 289,
        "ge;": 8805,
        "gel;": 8923,
        "geq;": 8805,
        "geqq;": 8807,
        "geqslant;": 10878,
        "ges;": 10878,
        "gescc;": 10921,
        "gesdot;": 10880,
        "gesdoto;": 10882,
        "gesdotol;": 10884,
        "gesl;": [8923, 65024],
        "gesles;": 10900,
        "gfr;": [55349, 56612],
        "gg;": 8811,
        "ggg;": 8921,
        "gimel;": 8503,
        "gjcy;": 1107,
        "gl;": 8823,
        "glE;": 10898,
        "gla;": 10917,
        "glj;": 10916,
        "gnE;": 8809,
        "gnap;": 10890,
        "gnapprox;": 10890,
        "gne;": 10888,
        "gneq;": 10888,
        "gneqq;": 8809,
        "gnsim;": 8935,
        "gopf;": [55349, 56664],
        "grave;": 96,
        "gscr;": 8458,
        "gsim;": 8819,
        "gsime;": 10894,
        "gsiml;": 10896,
        gt: 62,
        "gt;": 62,
        "gtcc;": 10919,
        "gtcir;": 10874,
        "gtdot;": 8919,
        "gtlPar;": 10645,
        "gtquest;": 10876,
        "gtrapprox;": 10886,
        "gtrarr;": 10616,
        "gtrdot;": 8919,
        "gtreqless;": 8923,
        "gtreqqless;": 10892,
        "gtrless;": 8823,
        "gtrsim;": 8819,
        "gvertneqq;": [8809, 65024],
        "gvnE;": [8809, 65024],
        "hArr;": 8660,
        "hairsp;": 8202,
        "half;": 189,
        "hamilt;": 8459,
        "hardcy;": 1098,
        "harr;": 8596,
        "harrcir;": 10568,
        "harrw;": 8621,
        "hbar;": 8463,
        "hcirc;": 293,
        "hearts;": 9829,
        "heartsuit;": 9829,
        "hellip;": 8230,
        "hercon;": 8889,
        "hfr;": [55349, 56613],
        "hksearow;": 10533,
        "hkswarow;": 10534,
        "hoarr;": 8703,
        "homtht;": 8763,
        "hookleftarrow;": 8617,
        "hookrightarrow;": 8618,
        "hopf;": [55349, 56665],
        "horbar;": 8213,
        "hscr;": [55349, 56509],
        "hslash;": 8463,
        "hstrok;": 295,
        "hybull;": 8259,
        "hyphen;": 8208,
        iacute: 237,
        "iacute;": 237,
        "ic;": 8291,
        icirc: 238,
        "icirc;": 238,
        "icy;": 1080,
        "iecy;": 1077,
        iexcl: 161,
        "iexcl;": 161,
        "iff;": 8660,
        "ifr;": [55349, 56614],
        igrave: 236,
        "igrave;": 236,
        "ii;": 8520,
        "iiiint;": 10764,
        "iiint;": 8749,
        "iinfin;": 10716,
        "iiota;": 8489,
        "ijlig;": 307,
        "imacr;": 299,
        "image;": 8465,
        "imagline;": 8464,
        "imagpart;": 8465,
        "imath;": 305,
        "imof;": 8887,
        "imped;": 437,
        "in;": 8712,
        "incare;": 8453,
        "infin;": 8734,
        "infintie;": 10717,
        "inodot;": 305,
        "int;": 8747,
        "intcal;": 8890,
        "integers;": 8484,
        "intercal;": 8890,
        "intlarhk;": 10775,
        "intprod;": 10812,
        "iocy;": 1105,
        "iogon;": 303,
        "iopf;": [55349, 56666],
        "iota;": 953,
        "iprod;": 10812,
        iquest: 191,
        "iquest;": 191,
        "iscr;": [55349, 56510],
        "isin;": 8712,
        "isinE;": 8953,
        "isindot;": 8949,
        "isins;": 8948,
        "isinsv;": 8947,
        "isinv;": 8712,
        "it;": 8290,
        "itilde;": 297,
        "iukcy;": 1110,
        iuml: 239,
        "iuml;": 239,
        "jcirc;": 309,
        "jcy;": 1081,
        "jfr;": [55349, 56615],
        "jmath;": 567,
        "jopf;": [55349, 56667],
        "jscr;": [55349, 56511],
        "jsercy;": 1112,
        "jukcy;": 1108,
        "kappa;": 954,
        "kappav;": 1008,
        "kcedil;": 311,
        "kcy;": 1082,
        "kfr;": [55349, 56616],
        "kgreen;": 312,
        "khcy;": 1093,
        "kjcy;": 1116,
        "kopf;": [55349, 56668],
        "kscr;": [55349, 56512],
        "lAarr;": 8666,
        "lArr;": 8656,
        "lAtail;": 10523,
        "lBarr;": 10510,
        "lE;": 8806,
        "lEg;": 10891,
        "lHar;": 10594,
        "lacute;": 314,
        "laemptyv;": 10676,
        "lagran;": 8466,
        "lambda;": 955,
        "lang;": 10216,
        "langd;": 10641,
        "langle;": 10216,
        "lap;": 10885,
        laquo: 171,
        "laquo;": 171,
        "larr;": 8592,
        "larrb;": 8676,
        "larrbfs;": 10527,
        "larrfs;": 10525,
        "larrhk;": 8617,
        "larrlp;": 8619,
        "larrpl;": 10553,
        "larrsim;": 10611,
        "larrtl;": 8610,
        "lat;": 10923,
        "latail;": 10521,
        "late;": 10925,
        "lates;": [10925, 65024],
        "lbarr;": 10508,
        "lbbrk;": 10098,
        "lbrace;": 123,
        "lbrack;": 91,
        "lbrke;": 10635,
        "lbrksld;": 10639,
        "lbrkslu;": 10637,
        "lcaron;": 318,
        "lcedil;": 316,
        "lceil;": 8968,
        "lcub;": 123,
        "lcy;": 1083,
        "ldca;": 10550,
        "ldquo;": 8220,
        "ldquor;": 8222,
        "ldrdhar;": 10599,
        "ldrushar;": 10571,
        "ldsh;": 8626,
        "le;": 8804,
        "leftarrow;": 8592,
        "leftarrowtail;": 8610,
        "leftharpoondown;": 8637,
        "leftharpoonup;": 8636,
        "leftleftarrows;": 8647,
        "leftrightarrow;": 8596,
        "leftrightarrows;": 8646,
        "leftrightharpoons;": 8651,
        "leftrightsquigarrow;": 8621,
        "leftthreetimes;": 8907,
        "leg;": 8922,
        "leq;": 8804,
        "leqq;": 8806,
        "leqslant;": 10877,
        "les;": 10877,
        "lescc;": 10920,
        "lesdot;": 10879,
        "lesdoto;": 10881,
        "lesdotor;": 10883,
        "lesg;": [8922, 65024],
        "lesges;": 10899,
        "lessapprox;": 10885,
        "lessdot;": 8918,
        "lesseqgtr;": 8922,
        "lesseqqgtr;": 10891,
        "lessgtr;": 8822,
        "lesssim;": 8818,
        "lfisht;": 10620,
        "lfloor;": 8970,
        "lfr;": [55349, 56617],
        "lg;": 8822,
        "lgE;": 10897,
        "lhard;": 8637,
        "lharu;": 8636,
        "lharul;": 10602,
        "lhblk;": 9604,
        "ljcy;": 1113,
        "ll;": 8810,
        "llarr;": 8647,
        "llcorner;": 8990,
        "llhard;": 10603,
        "lltri;": 9722,
        "lmidot;": 320,
        "lmoust;": 9136,
        "lmoustache;": 9136,
        "lnE;": 8808,
        "lnap;": 10889,
        "lnapprox;": 10889,
        "lne;": 10887,
        "lneq;": 10887,
        "lneqq;": 8808,
        "lnsim;": 8934,
        "loang;": 10220,
        "loarr;": 8701,
        "lobrk;": 10214,
        "longleftarrow;": 10229,
        "longleftrightarrow;": 10231,
        "longmapsto;": 10236,
        "longrightarrow;": 10230,
        "looparrowleft;": 8619,
        "looparrowright;": 8620,
        "lopar;": 10629,
        "lopf;": [55349, 56669],
        "loplus;": 10797,
        "lotimes;": 10804,
        "lowast;": 8727,
        "lowbar;": 95,
        "loz;": 9674,
        "lozenge;": 9674,
        "lozf;": 10731,
        "lpar;": 40,
        "lparlt;": 10643,
        "lrarr;": 8646,
        "lrcorner;": 8991,
        "lrhar;": 8651,
        "lrhard;": 10605,
        "lrm;": 8206,
        "lrtri;": 8895,
        "lsaquo;": 8249,
        "lscr;": [55349, 56513],
        "lsh;": 8624,
        "lsim;": 8818,
        "lsime;": 10893,
        "lsimg;": 10895,
        "lsqb;": 91,
        "lsquo;": 8216,
        "lsquor;": 8218,
        "lstrok;": 322,
        lt: 60,
        "lt;": 60,
        "ltcc;": 10918,
        "ltcir;": 10873,
        "ltdot;": 8918,
        "lthree;": 8907,
        "ltimes;": 8905,
        "ltlarr;": 10614,
        "ltquest;": 10875,
        "ltrPar;": 10646,
        "ltri;": 9667,
        "ltrie;": 8884,
        "ltrif;": 9666,
        "lurdshar;": 10570,
        "luruhar;": 10598,
        "lvertneqq;": [8808, 65024],
        "lvnE;": [8808, 65024],
        "mDDot;": 8762,
        macr: 175,
        "macr;": 175,
        "male;": 9794,
        "malt;": 10016,
        "maltese;": 10016,
        "map;": 8614,
        "mapsto;": 8614,
        "mapstodown;": 8615,
        "mapstoleft;": 8612,
        "mapstoup;": 8613,
        "marker;": 9646,
        "mcomma;": 10793,
        "mcy;": 1084,
        "mdash;": 8212,
        "measuredangle;": 8737,
        "mfr;": [55349, 56618],
        "mho;": 8487,
        micro: 181,
        "micro;": 181,
        "mid;": 8739,
        "midast;": 42,
        "midcir;": 10992,
        middot: 183,
        "middot;": 183,
        "minus;": 8722,
        "minusb;": 8863,
        "minusd;": 8760,
        "minusdu;": 10794,
        "mlcp;": 10971,
        "mldr;": 8230,
        "mnplus;": 8723,
        "models;": 8871,
        "mopf;": [55349, 56670],
        "mp;": 8723,
        "mscr;": [55349, 56514],
        "mstpos;": 8766,
        "mu;": 956,
        "multimap;": 8888,
        "mumap;": 8888,
        "nGg;": [8921, 824],
        "nGt;": [8811, 8402],
        "nGtv;": [8811, 824],
        "nLeftarrow;": 8653,
        "nLeftrightarrow;": 8654,
        "nLl;": [8920, 824],
        "nLt;": [8810, 8402],
        "nLtv;": [8810, 824],
        "nRightarrow;": 8655,
        "nVDash;": 8879,
        "nVdash;": 8878,
        "nabla;": 8711,
        "nacute;": 324,
        "nang;": [8736, 8402],
        "nap;": 8777,
        "napE;": [10864, 824],
        "napid;": [8779, 824],
        "napos;": 329,
        "napprox;": 8777,
        "natur;": 9838,
        "natural;": 9838,
        "naturals;": 8469,
        nbsp: 160,
        "nbsp;": 160,
        "nbump;": [8782, 824],
        "nbumpe;": [8783, 824],
        "ncap;": 10819,
        "ncaron;": 328,
        "ncedil;": 326,
        "ncong;": 8775,
        "ncongdot;": [10861, 824],
        "ncup;": 10818,
        "ncy;": 1085,
        "ndash;": 8211,
        "ne;": 8800,
        "neArr;": 8663,
        "nearhk;": 10532,
        "nearr;": 8599,
        "nearrow;": 8599,
        "nedot;": [8784, 824],
        "nequiv;": 8802,
        "nesear;": 10536,
        "nesim;": [8770, 824],
        "nexist;": 8708,
        "nexists;": 8708,
        "nfr;": [55349, 56619],
        "ngE;": [8807, 824],
        "nge;": 8817,
        "ngeq;": 8817,
        "ngeqq;": [8807, 824],
        "ngeqslant;": [10878, 824],
        "nges;": [10878, 824],
        "ngsim;": 8821,
        "ngt;": 8815,
        "ngtr;": 8815,
        "nhArr;": 8654,
        "nharr;": 8622,
        "nhpar;": 10994,
        "ni;": 8715,
        "nis;": 8956,
        "nisd;": 8954,
        "niv;": 8715,
        "njcy;": 1114,
        "nlArr;": 8653,
        "nlE;": [8806, 824],
        "nlarr;": 8602,
        "nldr;": 8229,
        "nle;": 8816,
        "nleftarrow;": 8602,
        "nleftrightarrow;": 8622,
        "nleq;": 8816,
        "nleqq;": [8806, 824],
        "nleqslant;": [10877, 824],
        "nles;": [10877, 824],
        "nless;": 8814,
        "nlsim;": 8820,
        "nlt;": 8814,
        "nltri;": 8938,
        "nltrie;": 8940,
        "nmid;": 8740,
        "nopf;": [55349, 56671],
        not: 172,
        "not;": 172,
        "notin;": 8713,
        "notinE;": [8953, 824],
        "notindot;": [8949, 824],
        "notinva;": 8713,
        "notinvb;": 8951,
        "notinvc;": 8950,
        "notni;": 8716,
        "notniva;": 8716,
        "notnivb;": 8958,
        "notnivc;": 8957,
        "npar;": 8742,
        "nparallel;": 8742,
        "nparsl;": [11005, 8421],
        "npart;": [8706, 824],
        "npolint;": 10772,
        "npr;": 8832,
        "nprcue;": 8928,
        "npre;": [10927, 824],
        "nprec;": 8832,
        "npreceq;": [10927, 824],
        "nrArr;": 8655,
        "nrarr;": 8603,
        "nrarrc;": [10547, 824],
        "nrarrw;": [8605, 824],
        "nrightarrow;": 8603,
        "nrtri;": 8939,
        "nrtrie;": 8941,
        "nsc;": 8833,
        "nsccue;": 8929,
        "nsce;": [10928, 824],
        "nscr;": [55349, 56515],
        "nshortmid;": 8740,
        "nshortparallel;": 8742,
        "nsim;": 8769,
        "nsime;": 8772,
        "nsimeq;": 8772,
        "nsmid;": 8740,
        "nspar;": 8742,
        "nsqsube;": 8930,
        "nsqsupe;": 8931,
        "nsub;": 8836,
        "nsubE;": [10949, 824],
        "nsube;": 8840,
        "nsubset;": [8834, 8402],
        "nsubseteq;": 8840,
        "nsubseteqq;": [10949, 824],
        "nsucc;": 8833,
        "nsucceq;": [10928, 824],
        "nsup;": 8837,
        "nsupE;": [10950, 824],
        "nsupe;": 8841,
        "nsupset;": [8835, 8402],
        "nsupseteq;": 8841,
        "nsupseteqq;": [10950, 824],
        "ntgl;": 8825,
        ntilde: 241,
        "ntilde;": 241,
        "ntlg;": 8824,
        "ntriangleleft;": 8938,
        "ntrianglelefteq;": 8940,
        "ntriangleright;": 8939,
        "ntrianglerighteq;": 8941,
        "nu;": 957,
        "num;": 35,
        "numero;": 8470,
        "numsp;": 8199,
        "nvDash;": 8877,
        "nvHarr;": 10500,
        "nvap;": [8781, 8402],
        "nvdash;": 8876,
        "nvge;": [8805, 8402],
        "nvgt;": [62, 8402],
        "nvinfin;": 10718,
        "nvlArr;": 10498,
        "nvle;": [8804, 8402],
        "nvlt;": [60, 8402],
        "nvltrie;": [8884, 8402],
        "nvrArr;": 10499,
        "nvrtrie;": [8885, 8402],
        "nvsim;": [8764, 8402],
        "nwArr;": 8662,
        "nwarhk;": 10531,
        "nwarr;": 8598,
        "nwarrow;": 8598,
        "nwnear;": 10535,
        "oS;": 9416,
        oacute: 243,
        "oacute;": 243,
        "oast;": 8859,
        "ocir;": 8858,
        ocirc: 244,
        "ocirc;": 244,
        "ocy;": 1086,
        "odash;": 8861,
        "odblac;": 337,
        "odiv;": 10808,
        "odot;": 8857,
        "odsold;": 10684,
        "oelig;": 339,
        "ofcir;": 10687,
        "ofr;": [55349, 56620],
        "ogon;": 731,
        ograve: 242,
        "ograve;": 242,
        "ogt;": 10689,
        "ohbar;": 10677,
        "ohm;": 937,
        "oint;": 8750,
        "olarr;": 8634,
        "olcir;": 10686,
        "olcross;": 10683,
        "oline;": 8254,
        "olt;": 10688,
        "omacr;": 333,
        "omega;": 969,
        "omicron;": 959,
        "omid;": 10678,
        "ominus;": 8854,
        "oopf;": [55349, 56672],
        "opar;": 10679,
        "operp;": 10681,
        "oplus;": 8853,
        "or;": 8744,
        "orarr;": 8635,
        "ord;": 10845,
        "order;": 8500,
        "orderof;": 8500,
        ordf: 170,
        "ordf;": 170,
        ordm: 186,
        "ordm;": 186,
        "origof;": 8886,
        "oror;": 10838,
        "orslope;": 10839,
        "orv;": 10843,
        "oscr;": 8500,
        oslash: 248,
        "oslash;": 248,
        "osol;": 8856,
        otilde: 245,
        "otilde;": 245,
        "otimes;": 8855,
        "otimesas;": 10806,
        ouml: 246,
        "ouml;": 246,
        "ovbar;": 9021,
        "par;": 8741,
        para: 182,
        "para;": 182,
        "parallel;": 8741,
        "parsim;": 10995,
        "parsl;": 11005,
        "part;": 8706,
        "pcy;": 1087,
        "percnt;": 37,
        "period;": 46,
        "permil;": 8240,
        "perp;": 8869,
        "pertenk;": 8241,
        "pfr;": [55349, 56621],
        "phi;": 966,
        "phiv;": 981,
        "phmmat;": 8499,
        "phone;": 9742,
        "pi;": 960,
        "pitchfork;": 8916,
        "piv;": 982,
        "planck;": 8463,
        "planckh;": 8462,
        "plankv;": 8463,
        "plus;": 43,
        "plusacir;": 10787,
        "plusb;": 8862,
        "pluscir;": 10786,
        "plusdo;": 8724,
        "plusdu;": 10789,
        "pluse;": 10866,
        plusmn: 177,
        "plusmn;": 177,
        "plussim;": 10790,
        "plustwo;": 10791,
        "pm;": 177,
        "pointint;": 10773,
        "popf;": [55349, 56673],
        pound: 163,
        "pound;": 163,
        "pr;": 8826,
        "prE;": 10931,
        "prap;": 10935,
        "prcue;": 8828,
        "pre;": 10927,
        "prec;": 8826,
        "precapprox;": 10935,
        "preccurlyeq;": 8828,
        "preceq;": 10927,
        "precnapprox;": 10937,
        "precneqq;": 10933,
        "precnsim;": 8936,
        "precsim;": 8830,
        "prime;": 8242,
        "primes;": 8473,
        "prnE;": 10933,
        "prnap;": 10937,
        "prnsim;": 8936,
        "prod;": 8719,
        "profalar;": 9006,
        "profline;": 8978,
        "profsurf;": 8979,
        "prop;": 8733,
        "propto;": 8733,
        "prsim;": 8830,
        "prurel;": 8880,
        "pscr;": [55349, 56517],
        "psi;": 968,
        "puncsp;": 8200,
        "qfr;": [55349, 56622],
        "qint;": 10764,
        "qopf;": [55349, 56674],
        "qprime;": 8279,
        "qscr;": [55349, 56518],
        "quaternions;": 8461,
        "quatint;": 10774,
        "quest;": 63,
        "questeq;": 8799,
        quot: 34,
        "quot;": 34,
        "rAarr;": 8667,
        "rArr;": 8658,
        "rAtail;": 10524,
        "rBarr;": 10511,
        "rHar;": 10596,
        "race;": [8765, 817],
        "racute;": 341,
        "radic;": 8730,
        "raemptyv;": 10675,
        "rang;": 10217,
        "rangd;": 10642,
        "range;": 10661,
        "rangle;": 10217,
        raquo: 187,
        "raquo;": 187,
        "rarr;": 8594,
        "rarrap;": 10613,
        "rarrb;": 8677,
        "rarrbfs;": 10528,
        "rarrc;": 10547,
        "rarrfs;": 10526,
        "rarrhk;": 8618,
        "rarrlp;": 8620,
        "rarrpl;": 10565,
        "rarrsim;": 10612,
        "rarrtl;": 8611,
        "rarrw;": 8605,
        "ratail;": 10522,
        "ratio;": 8758,
        "rationals;": 8474,
        "rbarr;": 10509,
        "rbbrk;": 10099,
        "rbrace;": 125,
        "rbrack;": 93,
        "rbrke;": 10636,
        "rbrksld;": 10638,
        "rbrkslu;": 10640,
        "rcaron;": 345,
        "rcedil;": 343,
        "rceil;": 8969,
        "rcub;": 125,
        "rcy;": 1088,
        "rdca;": 10551,
        "rdldhar;": 10601,
        "rdquo;": 8221,
        "rdquor;": 8221,
        "rdsh;": 8627,
        "real;": 8476,
        "realine;": 8475,
        "realpart;": 8476,
        "reals;": 8477,
        "rect;": 9645,
        reg: 174,
        "reg;": 174,
        "rfisht;": 10621,
        "rfloor;": 8971,
        "rfr;": [55349, 56623],
        "rhard;": 8641,
        "rharu;": 8640,
        "rharul;": 10604,
        "rho;": 961,
        "rhov;": 1009,
        "rightarrow;": 8594,
        "rightarrowtail;": 8611,
        "rightharpoondown;": 8641,
        "rightharpoonup;": 8640,
        "rightleftarrows;": 8644,
        "rightleftharpoons;": 8652,
        "rightrightarrows;": 8649,
        "rightsquigarrow;": 8605,
        "rightthreetimes;": 8908,
        "ring;": 730,
        "risingdotseq;": 8787,
        "rlarr;": 8644,
        "rlhar;": 8652,
        "rlm;": 8207,
        "rmoust;": 9137,
        "rmoustache;": 9137,
        "rnmid;": 10990,
        "roang;": 10221,
        "roarr;": 8702,
        "robrk;": 10215,
        "ropar;": 10630,
        "ropf;": [55349, 56675],
        "roplus;": 10798,
        "rotimes;": 10805,
        "rpar;": 41,
        "rpargt;": 10644,
        "rppolint;": 10770,
        "rrarr;": 8649,
        "rsaquo;": 8250,
        "rscr;": [55349, 56519],
        "rsh;": 8625,
        "rsqb;": 93,
        "rsquo;": 8217,
        "rsquor;": 8217,
        "rthree;": 8908,
        "rtimes;": 8906,
        "rtri;": 9657,
        "rtrie;": 8885,
        "rtrif;": 9656,
        "rtriltri;": 10702,
        "ruluhar;": 10600,
        "rx;": 8478,
        "sacute;": 347,
        "sbquo;": 8218,
        "sc;": 8827,
        "scE;": 10932,
        "scap;": 10936,
        "scaron;": 353,
        "sccue;": 8829,
        "sce;": 10928,
        "scedil;": 351,
        "scirc;": 349,
        "scnE;": 10934,
        "scnap;": 10938,
        "scnsim;": 8937,
        "scpolint;": 10771,
        "scsim;": 8831,
        "scy;": 1089,
        "sdot;": 8901,
        "sdotb;": 8865,
        "sdote;": 10854,
        "seArr;": 8664,
        "searhk;": 10533,
        "searr;": 8600,
        "searrow;": 8600,
        sect: 167,
        "sect;": 167,
        "semi;": 59,
        "seswar;": 10537,
        "setminus;": 8726,
        "setmn;": 8726,
        "sext;": 10038,
        "sfr;": [55349, 56624],
        "sfrown;": 8994,
        "sharp;": 9839,
        "shchcy;": 1097,
        "shcy;": 1096,
        "shortmid;": 8739,
        "shortparallel;": 8741,
        shy: 173,
        "shy;": 173,
        "sigma;": 963,
        "sigmaf;": 962,
        "sigmav;": 962,
        "sim;": 8764,
        "simdot;": 10858,
        "sime;": 8771,
        "simeq;": 8771,
        "simg;": 10910,
        "simgE;": 10912,
        "siml;": 10909,
        "simlE;": 10911,
        "simne;": 8774,
        "simplus;": 10788,
        "simrarr;": 10610,
        "slarr;": 8592,
        "smallsetminus;": 8726,
        "smashp;": 10803,
        "smeparsl;": 10724,
        "smid;": 8739,
        "smile;": 8995,
        "smt;": 10922,
        "smte;": 10924,
        "smtes;": [10924, 65024],
        "softcy;": 1100,
        "sol;": 47,
        "solb;": 10692,
        "solbar;": 9023,
        "sopf;": [55349, 56676],
        "spades;": 9824,
        "spadesuit;": 9824,
        "spar;": 8741,
        "sqcap;": 8851,
        "sqcaps;": [8851, 65024],
        "sqcup;": 8852,
        "sqcups;": [8852, 65024],
        "sqsub;": 8847,
        "sqsube;": 8849,
        "sqsubset;": 8847,
        "sqsubseteq;": 8849,
        "sqsup;": 8848,
        "sqsupe;": 8850,
        "sqsupset;": 8848,
        "sqsupseteq;": 8850,
        "squ;": 9633,
        "square;": 9633,
        "squarf;": 9642,
        "squf;": 9642,
        "srarr;": 8594,
        "sscr;": [55349, 56520],
        "ssetmn;": 8726,
        "ssmile;": 8995,
        "sstarf;": 8902,
        "star;": 9734,
        "starf;": 9733,
        "straightepsilon;": 1013,
        "straightphi;": 981,
        "strns;": 175,
        "sub;": 8834,
        "subE;": 10949,
        "subdot;": 10941,
        "sube;": 8838,
        "subedot;": 10947,
        "submult;": 10945,
        "subnE;": 10955,
        "subne;": 8842,
        "subplus;": 10943,
        "subrarr;": 10617,
        "subset;": 8834,
        "subseteq;": 8838,
        "subseteqq;": 10949,
        "subsetneq;": 8842,
        "subsetneqq;": 10955,
        "subsim;": 10951,
        "subsub;": 10965,
        "subsup;": 10963,
        "succ;": 8827,
        "succapprox;": 10936,
        "succcurlyeq;": 8829,
        "succeq;": 10928,
        "succnapprox;": 10938,
        "succneqq;": 10934,
        "succnsim;": 8937,
        "succsim;": 8831,
        "sum;": 8721,
        "sung;": 9834,
        sup1: 185,
        "sup1;": 185,
        sup2: 178,
        "sup2;": 178,
        sup3: 179,
        "sup3;": 179,
        "sup;": 8835,
        "supE;": 10950,
        "supdot;": 10942,
        "supdsub;": 10968,
        "supe;": 8839,
        "supedot;": 10948,
        "suphsol;": 10185,
        "suphsub;": 10967,
        "suplarr;": 10619,
        "supmult;": 10946,
        "supnE;": 10956,
        "supne;": 8843,
        "supplus;": 10944,
        "supset;": 8835,
        "supseteq;": 8839,
        "supseteqq;": 10950,
        "supsetneq;": 8843,
        "supsetneqq;": 10956,
        "supsim;": 10952,
        "supsub;": 10964,
        "supsup;": 10966,
        "swArr;": 8665,
        "swarhk;": 10534,
        "swarr;": 8601,
        "swarrow;": 8601,
        "swnwar;": 10538,
        szlig: 223,
        "szlig;": 223,
        "target;": 8982,
        "tau;": 964,
        "tbrk;": 9140,
        "tcaron;": 357,
        "tcedil;": 355,
        "tcy;": 1090,
        "tdot;": 8411,
        "telrec;": 8981,
        "tfr;": [55349, 56625],
        "there4;": 8756,
        "therefore;": 8756,
        "theta;": 952,
        "thetasym;": 977,
        "thetav;": 977,
        "thickapprox;": 8776,
        "thicksim;": 8764,
        "thinsp;": 8201,
        "thkap;": 8776,
        "thksim;": 8764,
        thorn: 254,
        "thorn;": 254,
        "tilde;": 732,
        times: 215,
        "times;": 215,
        "timesb;": 8864,
        "timesbar;": 10801,
        "timesd;": 10800,
        "tint;": 8749,
        "toea;": 10536,
        "top;": 8868,
        "topbot;": 9014,
        "topcir;": 10993,
        "topf;": [55349, 56677],
        "topfork;": 10970,
        "tosa;": 10537,
        "tprime;": 8244,
        "trade;": 8482,
        "triangle;": 9653,
        "triangledown;": 9663,
        "triangleleft;": 9667,
        "trianglelefteq;": 8884,
        "triangleq;": 8796,
        "triangleright;": 9657,
        "trianglerighteq;": 8885,
        "tridot;": 9708,
        "trie;": 8796,
        "triminus;": 10810,
        "triplus;": 10809,
        "trisb;": 10701,
        "tritime;": 10811,
        "trpezium;": 9186,
        "tscr;": [55349, 56521],
        "tscy;": 1094,
        "tshcy;": 1115,
        "tstrok;": 359,
        "twixt;": 8812,
        "twoheadleftarrow;": 8606,
        "twoheadrightarrow;": 8608,
        "uArr;": 8657,
        "uHar;": 10595,
        uacute: 250,
        "uacute;": 250,
        "uarr;": 8593,
        "ubrcy;": 1118,
        "ubreve;": 365,
        ucirc: 251,
        "ucirc;": 251,
        "ucy;": 1091,
        "udarr;": 8645,
        "udblac;": 369,
        "udhar;": 10606,
        "ufisht;": 10622,
        "ufr;": [55349, 56626],
        ugrave: 249,
        "ugrave;": 249,
        "uharl;": 8639,
        "uharr;": 8638,
        "uhblk;": 9600,
        "ulcorn;": 8988,
        "ulcorner;": 8988,
        "ulcrop;": 8975,
        "ultri;": 9720,
        "umacr;": 363,
        uml: 168,
        "uml;": 168,
        "uogon;": 371,
        "uopf;": [55349, 56678],
        "uparrow;": 8593,
        "updownarrow;": 8597,
        "upharpoonleft;": 8639,
        "upharpoonright;": 8638,
        "uplus;": 8846,
        "upsi;": 965,
        "upsih;": 978,
        "upsilon;": 965,
        "upuparrows;": 8648,
        "urcorn;": 8989,
        "urcorner;": 8989,
        "urcrop;": 8974,
        "uring;": 367,
        "urtri;": 9721,
        "uscr;": [55349, 56522],
        "utdot;": 8944,
        "utilde;": 361,
        "utri;": 9653,
        "utrif;": 9652,
        "uuarr;": 8648,
        uuml: 252,
        "uuml;": 252,
        "uwangle;": 10663,
        "vArr;": 8661,
        "vBar;": 10984,
        "vBarv;": 10985,
        "vDash;": 8872,
        "vangrt;": 10652,
        "varepsilon;": 1013,
        "varkappa;": 1008,
        "varnothing;": 8709,
        "varphi;": 981,
        "varpi;": 982,
        "varpropto;": 8733,
        "varr;": 8597,
        "varrho;": 1009,
        "varsigma;": 962,
        "varsubsetneq;": [8842, 65024],
        "varsubsetneqq;": [10955, 65024],
        "varsupsetneq;": [8843, 65024],
        "varsupsetneqq;": [10956, 65024],
        "vartheta;": 977,
        "vartriangleleft;": 8882,
        "vartriangleright;": 8883,
        "vcy;": 1074,
        "vdash;": 8866,
        "vee;": 8744,
        "veebar;": 8891,
        "veeeq;": 8794,
        "vellip;": 8942,
        "verbar;": 124,
        "vert;": 124,
        "vfr;": [55349, 56627],
        "vltri;": 8882,
        "vnsub;": [8834, 8402],
        "vnsup;": [8835, 8402],
        "vopf;": [55349, 56679],
        "vprop;": 8733,
        "vrtri;": 8883,
        "vscr;": [55349, 56523],
        "vsubnE;": [10955, 65024],
        "vsubne;": [8842, 65024],
        "vsupnE;": [10956, 65024],
        "vsupne;": [8843, 65024],
        "vzigzag;": 10650,
        "wcirc;": 373,
        "wedbar;": 10847,
        "wedge;": 8743,
        "wedgeq;": 8793,
        "weierp;": 8472,
        "wfr;": [55349, 56628],
        "wopf;": [55349, 56680],
        "wp;": 8472,
        "wr;": 8768,
        "wreath;": 8768,
        "wscr;": [55349, 56524],
        "xcap;": 8898,
        "xcirc;": 9711,
        "xcup;": 8899,
        "xdtri;": 9661,
        "xfr;": [55349, 56629],
        "xhArr;": 10234,
        "xharr;": 10231,
        "xi;": 958,
        "xlArr;": 10232,
        "xlarr;": 10229,
        "xmap;": 10236,
        "xnis;": 8955,
        "xodot;": 10752,
        "xopf;": [55349, 56681],
        "xoplus;": 10753,
        "xotime;": 10754,
        "xrArr;": 10233,
        "xrarr;": 10230,
        "xscr;": [55349, 56525],
        "xsqcup;": 10758,
        "xuplus;": 10756,
        "xutri;": 9651,
        "xvee;": 8897,
        "xwedge;": 8896,
        yacute: 253,
        "yacute;": 253,
        "yacy;": 1103,
        "ycirc;": 375,
        "ycy;": 1099,
        yen: 165,
        "yen;": 165,
        "yfr;": [55349, 56630],
        "yicy;": 1111,
        "yopf;": [55349, 56682],
        "yscr;": [55349, 56526],
        "yucy;": 1102,
        yuml: 255,
        "yuml;": 255,
        "zacute;": 378,
        "zcaron;": 382,
        "zcy;": 1079,
        "zdot;": 380,
        "zeetrf;": 8488,
        "zeta;": 950,
        "zfr;": [55349, 56631],
        "zhcy;": 1078,
        "zigrarr;": 8669,
        "zopf;": [55349, 56683],
        "zscr;": [55349, 56527],
        "zwj;": 8205,
        "zwnj;": 8204
      },
      We = /(A(?:Elig;?|MP;?|acute;?|breve;|c(?:irc;?|y;)|fr;|grave;?|lpha;|macr;|nd;|o(?:gon;|pf;)|pplyFunction;|ring;?|s(?:cr;|sign;)|tilde;?|uml;?)|B(?:a(?:ckslash;|r(?:v;|wed;))|cy;|e(?:cause;|rnoullis;|ta;)|fr;|opf;|reve;|scr;|umpeq;)|C(?:Hcy;|OPY;?|a(?:cute;|p(?:;|italDifferentialD;)|yleys;)|c(?:aron;|edil;?|irc;|onint;)|dot;|e(?:dilla;|nterDot;)|fr;|hi;|ircle(?:Dot;|Minus;|Plus;|Times;)|lo(?:ckwiseContourIntegral;|seCurly(?:DoubleQuote;|Quote;))|o(?:lon(?:;|e;)|n(?:gruent;|int;|tourIntegral;)|p(?:f;|roduct;)|unterClockwiseContourIntegral;)|ross;|scr;|up(?:;|Cap;))|D(?:D(?:;|otrahd;)|Jcy;|Scy;|Zcy;|a(?:gger;|rr;|shv;)|c(?:aron;|y;)|el(?:;|ta;)|fr;|i(?:a(?:critical(?:Acute;|Do(?:t;|ubleAcute;)|Grave;|Tilde;)|mond;)|fferentialD;)|o(?:pf;|t(?:;|Dot;|Equal;)|uble(?:ContourIntegral;|Do(?:t;|wnArrow;)|L(?:eft(?:Arrow;|RightArrow;|Tee;)|ong(?:Left(?:Arrow;|RightArrow;)|RightArrow;))|Right(?:Arrow;|Tee;)|Up(?:Arrow;|DownArrow;)|VerticalBar;)|wn(?:Arrow(?:;|Bar;|UpArrow;)|Breve;|Left(?:RightVector;|TeeVector;|Vector(?:;|Bar;))|Right(?:TeeVector;|Vector(?:;|Bar;))|Tee(?:;|Arrow;)|arrow;))|s(?:cr;|trok;))|E(?:NG;|TH;?|acute;?|c(?:aron;|irc;?|y;)|dot;|fr;|grave;?|lement;|m(?:acr;|pty(?:SmallSquare;|VerySmallSquare;))|o(?:gon;|pf;)|psilon;|qu(?:al(?:;|Tilde;)|ilibrium;)|s(?:cr;|im;)|ta;|uml;?|x(?:ists;|ponentialE;))|F(?:cy;|fr;|illed(?:SmallSquare;|VerySmallSquare;)|o(?:pf;|rAll;|uriertrf;)|scr;)|G(?:Jcy;|T;?|amma(?:;|d;)|breve;|c(?:edil;|irc;|y;)|dot;|fr;|g;|opf;|reater(?:Equal(?:;|Less;)|FullEqual;|Greater;|Less;|SlantEqual;|Tilde;)|scr;|t;)|H(?:ARDcy;|a(?:cek;|t;)|circ;|fr;|ilbertSpace;|o(?:pf;|rizontalLine;)|s(?:cr;|trok;)|ump(?:DownHump;|Equal;))|I(?:Ecy;|Jlig;|Ocy;|acute;?|c(?:irc;?|y;)|dot;|fr;|grave;?|m(?:;|a(?:cr;|ginaryI;)|plies;)|n(?:t(?:;|e(?:gral;|rsection;))|visible(?:Comma;|Times;))|o(?:gon;|pf;|ta;)|scr;|tilde;|u(?:kcy;|ml;?))|J(?:c(?:irc;|y;)|fr;|opf;|s(?:cr;|ercy;)|ukcy;)|K(?:Hcy;|Jcy;|appa;|c(?:edil;|y;)|fr;|opf;|scr;)|L(?:Jcy;|T;?|a(?:cute;|mbda;|ng;|placetrf;|rr;)|c(?:aron;|edil;|y;)|e(?:ft(?:A(?:ngleBracket;|rrow(?:;|Bar;|RightArrow;))|Ceiling;|Do(?:ubleBracket;|wn(?:TeeVector;|Vector(?:;|Bar;)))|Floor;|Right(?:Arrow;|Vector;)|T(?:ee(?:;|Arrow;|Vector;)|riangle(?:;|Bar;|Equal;))|Up(?:DownVector;|TeeVector;|Vector(?:;|Bar;))|Vector(?:;|Bar;)|arrow;|rightarrow;)|ss(?:EqualGreater;|FullEqual;|Greater;|Less;|SlantEqual;|Tilde;))|fr;|l(?:;|eftarrow;)|midot;|o(?:ng(?:Left(?:Arrow;|RightArrow;)|RightArrow;|left(?:arrow;|rightarrow;)|rightarrow;)|pf;|wer(?:LeftArrow;|RightArrow;))|s(?:cr;|h;|trok;)|t;)|M(?:ap;|cy;|e(?:diumSpace;|llintrf;)|fr;|inusPlus;|opf;|scr;|u;)|N(?:Jcy;|acute;|c(?:aron;|edil;|y;)|e(?:gative(?:MediumSpace;|Thi(?:ckSpace;|nSpace;)|VeryThinSpace;)|sted(?:GreaterGreater;|LessLess;)|wLine;)|fr;|o(?:Break;|nBreakingSpace;|pf;|t(?:;|C(?:ongruent;|upCap;)|DoubleVerticalBar;|E(?:lement;|qual(?:;|Tilde;)|xists;)|Greater(?:;|Equal;|FullEqual;|Greater;|Less;|SlantEqual;|Tilde;)|Hump(?:DownHump;|Equal;)|Le(?:ftTriangle(?:;|Bar;|Equal;)|ss(?:;|Equal;|Greater;|Less;|SlantEqual;|Tilde;))|Nested(?:GreaterGreater;|LessLess;)|Precedes(?:;|Equal;|SlantEqual;)|R(?:everseElement;|ightTriangle(?:;|Bar;|Equal;))|S(?:quareSu(?:bset(?:;|Equal;)|perset(?:;|Equal;))|u(?:bset(?:;|Equal;)|cceeds(?:;|Equal;|SlantEqual;|Tilde;)|perset(?:;|Equal;)))|Tilde(?:;|Equal;|FullEqual;|Tilde;)|VerticalBar;))|scr;|tilde;?|u;)|O(?:Elig;|acute;?|c(?:irc;?|y;)|dblac;|fr;|grave;?|m(?:acr;|ega;|icron;)|opf;|penCurly(?:DoubleQuote;|Quote;)|r;|s(?:cr;|lash;?)|ti(?:lde;?|mes;)|uml;?|ver(?:B(?:ar;|rac(?:e;|ket;))|Parenthesis;))|P(?:artialD;|cy;|fr;|hi;|i;|lusMinus;|o(?:incareplane;|pf;)|r(?:;|ecedes(?:;|Equal;|SlantEqual;|Tilde;)|ime;|o(?:duct;|portion(?:;|al;)))|s(?:cr;|i;))|Q(?:UOT;?|fr;|opf;|scr;)|R(?:Barr;|EG;?|a(?:cute;|ng;|rr(?:;|tl;))|c(?:aron;|edil;|y;)|e(?:;|verse(?:E(?:lement;|quilibrium;)|UpEquilibrium;))|fr;|ho;|ight(?:A(?:ngleBracket;|rrow(?:;|Bar;|LeftArrow;))|Ceiling;|Do(?:ubleBracket;|wn(?:TeeVector;|Vector(?:;|Bar;)))|Floor;|T(?:ee(?:;|Arrow;|Vector;)|riangle(?:;|Bar;|Equal;))|Up(?:DownVector;|TeeVector;|Vector(?:;|Bar;))|Vector(?:;|Bar;)|arrow;)|o(?:pf;|undImplies;)|rightarrow;|s(?:cr;|h;)|uleDelayed;)|S(?:H(?:CHcy;|cy;)|OFTcy;|acute;|c(?:;|aron;|edil;|irc;|y;)|fr;|hort(?:DownArrow;|LeftArrow;|RightArrow;|UpArrow;)|igma;|mallCircle;|opf;|q(?:rt;|uare(?:;|Intersection;|Su(?:bset(?:;|Equal;)|perset(?:;|Equal;))|Union;))|scr;|tar;|u(?:b(?:;|set(?:;|Equal;))|c(?:ceeds(?:;|Equal;|SlantEqual;|Tilde;)|hThat;)|m;|p(?:;|erset(?:;|Equal;)|set;)))|T(?:HORN;?|RADE;|S(?:Hcy;|cy;)|a(?:b;|u;)|c(?:aron;|edil;|y;)|fr;|h(?:e(?:refore;|ta;)|i(?:ckSpace;|nSpace;))|ilde(?:;|Equal;|FullEqual;|Tilde;)|opf;|ripleDot;|s(?:cr;|trok;))|U(?:a(?:cute;?|rr(?:;|ocir;))|br(?:cy;|eve;)|c(?:irc;?|y;)|dblac;|fr;|grave;?|macr;|n(?:der(?:B(?:ar;|rac(?:e;|ket;))|Parenthesis;)|ion(?:;|Plus;))|o(?:gon;|pf;)|p(?:Arrow(?:;|Bar;|DownArrow;)|DownArrow;|Equilibrium;|Tee(?:;|Arrow;)|arrow;|downarrow;|per(?:LeftArrow;|RightArrow;)|si(?:;|lon;))|ring;|scr;|tilde;|uml;?)|V(?:Dash;|bar;|cy;|dash(?:;|l;)|e(?:e;|r(?:bar;|t(?:;|ical(?:Bar;|Line;|Separator;|Tilde;))|yThinSpace;))|fr;|opf;|scr;|vdash;)|W(?:circ;|edge;|fr;|opf;|scr;)|X(?:fr;|i;|opf;|scr;)|Y(?:Acy;|Icy;|Ucy;|acute;?|c(?:irc;|y;)|fr;|opf;|scr;|uml;)|Z(?:Hcy;|acute;|c(?:aron;|y;)|dot;|e(?:roWidthSpace;|ta;)|fr;|opf;|scr;)|a(?:acute;?|breve;|c(?:;|E;|d;|irc;?|ute;?|y;)|elig;?|f(?:;|r;)|grave;?|l(?:e(?:fsym;|ph;)|pha;)|m(?:a(?:cr;|lg;)|p;?)|n(?:d(?:;|and;|d;|slope;|v;)|g(?:;|e;|le;|msd(?:;|a(?:a;|b;|c;|d;|e;|f;|g;|h;))|rt(?:;|vb(?:;|d;))|s(?:ph;|t;)|zarr;))|o(?:gon;|pf;)|p(?:;|E;|acir;|e;|id;|os;|prox(?:;|eq;))|ring;?|s(?:cr;|t;|ymp(?:;|eq;))|tilde;?|uml;?|w(?:conint;|int;))|b(?:Not;|a(?:ck(?:cong;|epsilon;|prime;|sim(?:;|eq;))|r(?:vee;|wed(?:;|ge;)))|brk(?:;|tbrk;)|c(?:ong;|y;)|dquo;|e(?:caus(?:;|e;)|mptyv;|psi;|rnou;|t(?:a;|h;|ween;))|fr;|ig(?:c(?:ap;|irc;|up;)|o(?:dot;|plus;|times;)|s(?:qcup;|tar;)|triangle(?:down;|up;)|uplus;|vee;|wedge;)|karow;|l(?:a(?:ck(?:lozenge;|square;|triangle(?:;|down;|left;|right;))|nk;)|k(?:1(?:2;|4;)|34;)|ock;)|n(?:e(?:;|quiv;)|ot;)|o(?:pf;|t(?:;|tom;)|wtie;|x(?:D(?:L;|R;|l;|r;)|H(?:;|D;|U;|d;|u;)|U(?:L;|R;|l;|r;)|V(?:;|H;|L;|R;|h;|l;|r;)|box;|d(?:L;|R;|l;|r;)|h(?:;|D;|U;|d;|u;)|minus;|plus;|times;|u(?:L;|R;|l;|r;)|v(?:;|H;|L;|R;|h;|l;|r;)))|prime;|r(?:eve;|vbar;?)|s(?:cr;|emi;|im(?:;|e;)|ol(?:;|b;|hsub;))|u(?:ll(?:;|et;)|mp(?:;|E;|e(?:;|q;))))|c(?:a(?:cute;|p(?:;|and;|brcup;|c(?:ap;|up;)|dot;|s;)|r(?:et;|on;))|c(?:a(?:ps;|ron;)|edil;?|irc;|ups(?:;|sm;))|dot;|e(?:dil;?|mptyv;|nt(?:;|erdot;|))|fr;|h(?:cy;|eck(?:;|mark;)|i;)|ir(?:;|E;|c(?:;|eq;|le(?:arrow(?:left;|right;)|d(?:R;|S;|ast;|circ;|dash;)))|e;|fnint;|mid;|scir;)|lubs(?:;|uit;)|o(?:lon(?:;|e(?:;|q;))|m(?:ma(?:;|t;)|p(?:;|fn;|le(?:ment;|xes;)))|n(?:g(?:;|dot;)|int;)|p(?:f;|rod;|y(?:;|sr;|)))|r(?:arr;|oss;)|s(?:cr;|u(?:b(?:;|e;)|p(?:;|e;)))|tdot;|u(?:darr(?:l;|r;)|e(?:pr;|sc;)|larr(?:;|p;)|p(?:;|brcap;|c(?:ap;|up;)|dot;|or;|s;)|r(?:arr(?:;|m;)|ly(?:eq(?:prec;|succ;)|vee;|wedge;)|ren;?|vearrow(?:left;|right;))|vee;|wed;)|w(?:conint;|int;)|ylcty;)|d(?:Arr;|Har;|a(?:gger;|leth;|rr;|sh(?:;|v;))|b(?:karow;|lac;)|c(?:aron;|y;)|d(?:;|a(?:gger;|rr;)|otseq;)|e(?:g;?|lta;|mptyv;)|f(?:isht;|r;)|har(?:l;|r;)|i(?:am(?:;|ond(?:;|suit;)|s;)|e;|gamma;|sin;|v(?:;|ide(?:;|ontimes;|)|onx;))|jcy;|lc(?:orn;|rop;)|o(?:llar;|pf;|t(?:;|eq(?:;|dot;)|minus;|plus;|square;)|ublebarwedge;|wn(?:arrow;|downarrows;|harpoon(?:left;|right;)))|r(?:bkarow;|c(?:orn;|rop;))|s(?:c(?:r;|y;)|ol;|trok;)|t(?:dot;|ri(?:;|f;))|u(?:arr;|har;)|wangle;|z(?:cy;|igrarr;))|e(?:D(?:Dot;|ot;)|a(?:cute;?|ster;)|c(?:aron;|ir(?:;|c;?)|olon;|y;)|dot;|e;|f(?:Dot;|r;)|g(?:;|rave;?|s(?:;|dot;))|l(?:;|inters;|l;|s(?:;|dot;))|m(?:acr;|pty(?:;|set;|v;)|sp(?:1(?:3;|4;)|;))|n(?:g;|sp;)|o(?:gon;|pf;)|p(?:ar(?:;|sl;)|lus;|si(?:;|lon;|v;))|q(?:c(?:irc;|olon;)|s(?:im;|lant(?:gtr;|less;))|u(?:als;|est;|iv(?:;|DD;))|vparsl;)|r(?:Dot;|arr;)|s(?:cr;|dot;|im;)|t(?:a;|h;?)|u(?:ml;?|ro;)|x(?:cl;|ist;|p(?:ectation;|onentiale;)))|f(?:allingdotseq;|cy;|emale;|f(?:ilig;|l(?:ig;|lig;)|r;)|ilig;|jlig;|l(?:at;|lig;|tns;)|nof;|o(?:pf;|r(?:all;|k(?:;|v;)))|partint;|r(?:a(?:c(?:1(?:2;?|3;|4;?|5;|6;|8;)|2(?:3;|5;)|3(?:4;?|5;|8;)|45;|5(?:6;|8;)|78;)|sl;)|own;)|scr;)|g(?:E(?:;|l;)|a(?:cute;|mma(?:;|d;)|p;)|breve;|c(?:irc;|y;)|dot;|e(?:;|l;|q(?:;|q;|slant;)|s(?:;|cc;|dot(?:;|o(?:;|l;))|l(?:;|es;)))|fr;|g(?:;|g;)|imel;|jcy;|l(?:;|E;|a;|j;)|n(?:E;|ap(?:;|prox;)|e(?:;|q(?:;|q;))|sim;)|opf;|rave;|s(?:cr;|im(?:;|e;|l;))|t(?:;|c(?:c;|ir;)|dot;|lPar;|quest;|r(?:a(?:pprox;|rr;)|dot;|eq(?:less;|qless;)|less;|sim;)|)|v(?:ertneqq;|nE;))|h(?:Arr;|a(?:irsp;|lf;|milt;|r(?:dcy;|r(?:;|cir;|w;)))|bar;|circ;|e(?:arts(?:;|uit;)|llip;|rcon;)|fr;|ks(?:earow;|warow;)|o(?:arr;|mtht;|ok(?:leftarrow;|rightarrow;)|pf;|rbar;)|s(?:cr;|lash;|trok;)|y(?:bull;|phen;))|i(?:acute;?|c(?:;|irc;?|y;)|e(?:cy;|xcl;?)|f(?:f;|r;)|grave;?|i(?:;|i(?:int;|nt;)|nfin;|ota;)|jlig;|m(?:a(?:cr;|g(?:e;|line;|part;)|th;)|of;|ped;)|n(?:;|care;|fin(?:;|tie;)|odot;|t(?:;|cal;|e(?:gers;|rcal;)|larhk;|prod;))|o(?:cy;|gon;|pf;|ta;)|prod;|quest;?|s(?:cr;|in(?:;|E;|dot;|s(?:;|v;)|v;))|t(?:;|ilde;)|u(?:kcy;|ml;?))|j(?:c(?:irc;|y;)|fr;|math;|opf;|s(?:cr;|ercy;)|ukcy;)|k(?:appa(?:;|v;)|c(?:edil;|y;)|fr;|green;|hcy;|jcy;|opf;|scr;)|l(?:A(?:arr;|rr;|tail;)|Barr;|E(?:;|g;)|Har;|a(?:cute;|emptyv;|gran;|mbda;|ng(?:;|d;|le;)|p;|quo;?|rr(?:;|b(?:;|fs;)|fs;|hk;|lp;|pl;|sim;|tl;)|t(?:;|ail;|e(?:;|s;)))|b(?:arr;|brk;|r(?:ac(?:e;|k;)|k(?:e;|sl(?:d;|u;))))|c(?:aron;|e(?:dil;|il;)|ub;|y;)|d(?:ca;|quo(?:;|r;)|r(?:dhar;|ushar;)|sh;)|e(?:;|ft(?:arrow(?:;|tail;)|harpoon(?:down;|up;)|leftarrows;|right(?:arrow(?:;|s;)|harpoons;|squigarrow;)|threetimes;)|g;|q(?:;|q;|slant;)|s(?:;|cc;|dot(?:;|o(?:;|r;))|g(?:;|es;)|s(?:approx;|dot;|eq(?:gtr;|qgtr;)|gtr;|sim;)))|f(?:isht;|loor;|r;)|g(?:;|E;)|h(?:ar(?:d;|u(?:;|l;))|blk;)|jcy;|l(?:;|arr;|corner;|hard;|tri;)|m(?:idot;|oust(?:;|ache;))|n(?:E;|ap(?:;|prox;)|e(?:;|q(?:;|q;))|sim;)|o(?:a(?:ng;|rr;)|brk;|ng(?:left(?:arrow;|rightarrow;)|mapsto;|rightarrow;)|oparrow(?:left;|right;)|p(?:ar;|f;|lus;)|times;|w(?:ast;|bar;)|z(?:;|enge;|f;))|par(?:;|lt;)|r(?:arr;|corner;|har(?:;|d;)|m;|tri;)|s(?:aquo;|cr;|h;|im(?:;|e;|g;)|q(?:b;|uo(?:;|r;))|trok;)|t(?:;|c(?:c;|ir;)|dot;|hree;|imes;|larr;|quest;|r(?:Par;|i(?:;|e;|f;))|)|ur(?:dshar;|uhar;)|v(?:ertneqq;|nE;))|m(?:DDot;|a(?:cr;?|l(?:e;|t(?:;|ese;))|p(?:;|sto(?:;|down;|left;|up;))|rker;)|c(?:omma;|y;)|dash;|easuredangle;|fr;|ho;|i(?:cro;?|d(?:;|ast;|cir;|dot;?)|nus(?:;|b;|d(?:;|u;)))|l(?:cp;|dr;)|nplus;|o(?:dels;|pf;)|p;|s(?:cr;|tpos;)|u(?:;|ltimap;|map;))|n(?:G(?:g;|t(?:;|v;))|L(?:eft(?:arrow;|rightarrow;)|l;|t(?:;|v;))|Rightarrow;|V(?:Dash;|dash;)|a(?:bla;|cute;|ng;|p(?:;|E;|id;|os;|prox;)|tur(?:;|al(?:;|s;)))|b(?:sp;?|ump(?:;|e;))|c(?:a(?:p;|ron;)|edil;|ong(?:;|dot;)|up;|y;)|dash;|e(?:;|Arr;|ar(?:hk;|r(?:;|ow;))|dot;|quiv;|s(?:ear;|im;)|xist(?:;|s;))|fr;|g(?:E;|e(?:;|q(?:;|q;|slant;)|s;)|sim;|t(?:;|r;))|h(?:Arr;|arr;|par;)|i(?:;|s(?:;|d;)|v;)|jcy;|l(?:Arr;|E;|arr;|dr;|e(?:;|ft(?:arrow;|rightarrow;)|q(?:;|q;|slant;)|s(?:;|s;))|sim;|t(?:;|ri(?:;|e;)))|mid;|o(?:pf;|t(?:;|in(?:;|E;|dot;|v(?:a;|b;|c;))|ni(?:;|v(?:a;|b;|c;))|))|p(?:ar(?:;|allel;|sl;|t;)|olint;|r(?:;|cue;|e(?:;|c(?:;|eq;))))|r(?:Arr;|arr(?:;|c;|w;)|ightarrow;|tri(?:;|e;))|s(?:c(?:;|cue;|e;|r;)|hort(?:mid;|parallel;)|im(?:;|e(?:;|q;))|mid;|par;|qsu(?:be;|pe;)|u(?:b(?:;|E;|e;|set(?:;|eq(?:;|q;)))|cc(?:;|eq;)|p(?:;|E;|e;|set(?:;|eq(?:;|q;)))))|t(?:gl;|ilde;?|lg;|riangle(?:left(?:;|eq;)|right(?:;|eq;)))|u(?:;|m(?:;|ero;|sp;))|v(?:Dash;|Harr;|ap;|dash;|g(?:e;|t;)|infin;|l(?:Arr;|e;|t(?:;|rie;))|r(?:Arr;|trie;)|sim;)|w(?:Arr;|ar(?:hk;|r(?:;|ow;))|near;))|o(?:S;|a(?:cute;?|st;)|c(?:ir(?:;|c;?)|y;)|d(?:ash;|blac;|iv;|ot;|sold;)|elig;|f(?:cir;|r;)|g(?:on;|rave;?|t;)|h(?:bar;|m;)|int;|l(?:arr;|c(?:ir;|ross;)|ine;|t;)|m(?:acr;|ega;|i(?:cron;|d;|nus;))|opf;|p(?:ar;|erp;|lus;)|r(?:;|arr;|d(?:;|er(?:;|of;)|f;?|m;?)|igof;|or;|slope;|v;)|s(?:cr;|lash;?|ol;)|ti(?:lde;?|mes(?:;|as;))|uml;?|vbar;)|p(?:ar(?:;|a(?:;|llel;|)|s(?:im;|l;)|t;)|cy;|er(?:cnt;|iod;|mil;|p;|tenk;)|fr;|h(?:i(?:;|v;)|mmat;|one;)|i(?:;|tchfork;|v;)|l(?:an(?:ck(?:;|h;)|kv;)|us(?:;|acir;|b;|cir;|d(?:o;|u;)|e;|mn;?|sim;|two;))|m;|o(?:intint;|pf;|und;?)|r(?:;|E;|ap;|cue;|e(?:;|c(?:;|approx;|curlyeq;|eq;|n(?:approx;|eqq;|sim;)|sim;))|ime(?:;|s;)|n(?:E;|ap;|sim;)|o(?:d;|f(?:alar;|line;|surf;)|p(?:;|to;))|sim;|urel;)|s(?:cr;|i;)|uncsp;)|q(?:fr;|int;|opf;|prime;|scr;|u(?:at(?:ernions;|int;)|est(?:;|eq;)|ot;?))|r(?:A(?:arr;|rr;|tail;)|Barr;|Har;|a(?:c(?:e;|ute;)|dic;|emptyv;|ng(?:;|d;|e;|le;)|quo;?|rr(?:;|ap;|b(?:;|fs;)|c;|fs;|hk;|lp;|pl;|sim;|tl;|w;)|t(?:ail;|io(?:;|nals;)))|b(?:arr;|brk;|r(?:ac(?:e;|k;)|k(?:e;|sl(?:d;|u;))))|c(?:aron;|e(?:dil;|il;)|ub;|y;)|d(?:ca;|ldhar;|quo(?:;|r;)|sh;)|e(?:al(?:;|ine;|part;|s;)|ct;|g;?)|f(?:isht;|loor;|r;)|h(?:ar(?:d;|u(?:;|l;))|o(?:;|v;))|i(?:ght(?:arrow(?:;|tail;)|harpoon(?:down;|up;)|left(?:arrows;|harpoons;)|rightarrows;|squigarrow;|threetimes;)|ng;|singdotseq;)|l(?:arr;|har;|m;)|moust(?:;|ache;)|nmid;|o(?:a(?:ng;|rr;)|brk;|p(?:ar;|f;|lus;)|times;)|p(?:ar(?:;|gt;)|polint;)|rarr;|s(?:aquo;|cr;|h;|q(?:b;|uo(?:;|r;)))|t(?:hree;|imes;|ri(?:;|e;|f;|ltri;))|uluhar;|x;)|s(?:acute;|bquo;|c(?:;|E;|a(?:p;|ron;)|cue;|e(?:;|dil;)|irc;|n(?:E;|ap;|sim;)|polint;|sim;|y;)|dot(?:;|b;|e;)|e(?:Arr;|ar(?:hk;|r(?:;|ow;))|ct;?|mi;|swar;|tm(?:inus;|n;)|xt;)|fr(?:;|own;)|h(?:arp;|c(?:hcy;|y;)|ort(?:mid;|parallel;)|y;?)|i(?:gma(?:;|f;|v;)|m(?:;|dot;|e(?:;|q;)|g(?:;|E;)|l(?:;|E;)|ne;|plus;|rarr;))|larr;|m(?:a(?:llsetminus;|shp;)|eparsl;|i(?:d;|le;)|t(?:;|e(?:;|s;)))|o(?:ftcy;|l(?:;|b(?:;|ar;))|pf;)|pa(?:des(?:;|uit;)|r;)|q(?:c(?:ap(?:;|s;)|up(?:;|s;))|su(?:b(?:;|e;|set(?:;|eq;))|p(?:;|e;|set(?:;|eq;)))|u(?:;|ar(?:e;|f;)|f;))|rarr;|s(?:cr;|etmn;|mile;|tarf;)|t(?:ar(?:;|f;)|r(?:aight(?:epsilon;|phi;)|ns;))|u(?:b(?:;|E;|dot;|e(?:;|dot;)|mult;|n(?:E;|e;)|plus;|rarr;|s(?:et(?:;|eq(?:;|q;)|neq(?:;|q;))|im;|u(?:b;|p;)))|cc(?:;|approx;|curlyeq;|eq;|n(?:approx;|eqq;|sim;)|sim;)|m;|ng;|p(?:1;?|2;?|3;?|;|E;|d(?:ot;|sub;)|e(?:;|dot;)|hs(?:ol;|ub;)|larr;|mult;|n(?:E;|e;)|plus;|s(?:et(?:;|eq(?:;|q;)|neq(?:;|q;))|im;|u(?:b;|p;))))|w(?:Arr;|ar(?:hk;|r(?:;|ow;))|nwar;)|zlig;?)|t(?:a(?:rget;|u;)|brk;|c(?:aron;|edil;|y;)|dot;|elrec;|fr;|h(?:e(?:re(?:4;|fore;)|ta(?:;|sym;|v;))|i(?:ck(?:approx;|sim;)|nsp;)|k(?:ap;|sim;)|orn;?)|i(?:lde;|mes(?:;|b(?:;|ar;)|d;|)|nt;)|o(?:ea;|p(?:;|bot;|cir;|f(?:;|ork;))|sa;)|prime;|r(?:ade;|i(?:angle(?:;|down;|left(?:;|eq;)|q;|right(?:;|eq;))|dot;|e;|minus;|plus;|sb;|time;)|pezium;)|s(?:c(?:r;|y;)|hcy;|trok;)|w(?:ixt;|ohead(?:leftarrow;|rightarrow;)))|u(?:Arr;|Har;|a(?:cute;?|rr;)|br(?:cy;|eve;)|c(?:irc;?|y;)|d(?:arr;|blac;|har;)|f(?:isht;|r;)|grave;?|h(?:ar(?:l;|r;)|blk;)|l(?:c(?:orn(?:;|er;)|rop;)|tri;)|m(?:acr;|l;?)|o(?:gon;|pf;)|p(?:arrow;|downarrow;|harpoon(?:left;|right;)|lus;|si(?:;|h;|lon;)|uparrows;)|r(?:c(?:orn(?:;|er;)|rop;)|ing;|tri;)|scr;|t(?:dot;|ilde;|ri(?:;|f;))|u(?:arr;|ml;?)|wangle;)|v(?:Arr;|Bar(?:;|v;)|Dash;|a(?:ngrt;|r(?:epsilon;|kappa;|nothing;|p(?:hi;|i;|ropto;)|r(?:;|ho;)|s(?:igma;|u(?:bsetneq(?:;|q;)|psetneq(?:;|q;)))|t(?:heta;|riangle(?:left;|right;))))|cy;|dash;|e(?:e(?:;|bar;|eq;)|llip;|r(?:bar;|t;))|fr;|ltri;|nsu(?:b;|p;)|opf;|prop;|rtri;|s(?:cr;|u(?:bn(?:E;|e;)|pn(?:E;|e;)))|zigzag;)|w(?:circ;|e(?:d(?:bar;|ge(?:;|q;))|ierp;)|fr;|opf;|p;|r(?:;|eath;)|scr;)|x(?:c(?:ap;|irc;|up;)|dtri;|fr;|h(?:Arr;|arr;)|i;|l(?:Arr;|arr;)|map;|nis;|o(?:dot;|p(?:f;|lus;)|time;)|r(?:Arr;|arr;)|s(?:cr;|qcup;)|u(?:plus;|tri;)|vee;|wedge;)|y(?:ac(?:ute;?|y;)|c(?:irc;|y;)|en;?|fr;|icy;|opf;|scr;|u(?:cy;|ml;?))|z(?:acute;|c(?:aron;|y;)|dot;|e(?:etrf;|ta;)|fr;|hcy;|igrarr;|opf;|scr;|w(?:j;|nj;)))|[\s\S]/g,
      fl = 32, pl = /[^\r"&\u0000]+/g, ml = /[^\r'&\u0000]+/g, gl = /[^\r\t\n\f &>\u0000]+/g,
      vl = /[^\r\t\n\f \/>A-Z\u0000]+/g, bl = /[^\r\t\n\f \/=>A-Z\u0000]+/g, yl = /[^\]\r\u0000\uffff]*/g,
      El = /[^&<\r\u0000\uffff]*/g, Da = /[^<\r\u0000\uffff]*/g, Tl = /[^\r\u0000\uffff]*/g,
      Ma = /(?:(\/)?([a-z]+)>)|[\s\S]/g,
      Ia = /(?:([-a-z]+)[ \t\n\f]*=[ \t\n\f]*('[^'&\r\u0000]*'|"[^"&\r\u0000]*"|[^\t\n\r\f "&'\u0000>][^&> \t\n\r\f\u0000]*[ \t\n\f]))|[\s\S]/g,
      gn = /[^\x09\x0A\x0C\x0D\x20]/, Di = /[^\x09\x0A\x0C\x0D\x20]/g, _l = /[^\x00\x09\x0A\x0C\x0D\x20]/,
      zt = /^[\x09\x0A\x0C\x0D\x20]+/, vn = /\x00/g;

    function je(q) {
      var F = 16384;
      if (q.length < F) return String.fromCharCode.apply(String, q);
      for (var Q = "", G = 0; G < q.length; G += F) Q += String.fromCharCode.apply(String, q.slice(G, G + F));
      return Q
    }

    function wl(q) {
      for (var F = [], Q = 0; Q < q.length; Q++) F[Q] = q.charCodeAt(Q);
      return F
    }

    function ye(q, F) {
      if (typeof F == "string") return q.namespaceURI === s.HTML && q.localName === F;
      var Q = F[q.namespaceURI];
      return Q && Q[q.localName]
    }

    function La(q) {
      return ye(q, $)
    }

    function ka(q) {
      if (ye(q, J)) return !0;
      if (q.namespaceURI === s.MATHML && q.localName === "annotation-xml") {
        var F = q.getAttribute("encoding");
        if (F && (F = F.toLowerCase()), F === "text/html" || F === "application/xhtml+xml") return !0
      }
      return !1
    }

    function Sl(q) {
      return q in M ? M[q] : q
    }

    function Oa(q) {
      for (var F = 0, Q = q.length; F < Q; F++) q[F][0] in _ && (q[F][0] = _[q[F][0]])
    }

    function xa(q) {
      for (var F = 0, Q = q.length; F < Q; F++) if (q[F][0] === "definitionurl") {
        q[F][0] = "definitionURL";
        break
      }
    }

    function Mi(q) {
      for (var F = 0, Q = q.length; F < Q; F++) q[F][0] in pe && q[F].push(pe[q[F][0]])
    }

    function Pa(q, F) {
      for (var Q = 0, G = q.length; Q < G; Q++) {
        var Ce = q[Q][0], W = q[Q][1];
        F.hasAttribute(Ce) || F._setAttribute(Ce, W)
      }
    }

    me.ElementStack = function () {
      this.elements = [], this.top = null
    }, me.ElementStack.prototype.push = function (q) {
      this.elements.push(q), this.top = q
    }, me.ElementStack.prototype.pop = function (q) {
      this.elements.pop(), this.top = this.elements[this.elements.length - 1]
    }, me.ElementStack.prototype.popTag = function (q) {
      for (var F = this.elements.length - 1; F > 0; F--) {
        var Q = this.elements[F];
        if (ye(Q, q)) break
      }
      this.elements.length = F, this.top = this.elements[F - 1]
    }, me.ElementStack.prototype.popElementType = function (q) {
      for (var F = this.elements.length - 1; F > 0 && !(this.elements[F] instanceof q); F--) ;
      this.elements.length = F, this.top = this.elements[F - 1]
    }, me.ElementStack.prototype.popElement = function (q) {
      for (var F = this.elements.length - 1; F > 0 && this.elements[F] !== q; F--) ;
      this.elements.length = F, this.top = this.elements[F - 1]
    }, me.ElementStack.prototype.removeElement = function (q) {
      if (this.top === q) this.pop(); else {
        var F = this.elements.lastIndexOf(q);
        F !== -1 && this.elements.splice(F, 1)
      }
    }, me.ElementStack.prototype.clearToContext = function (q) {
      for (var F = this.elements.length - 1; F > 0 && !ye(this.elements[F], q); F--) ;
      this.elements.length = F + 1, this.top = this.elements[F]
    }, me.ElementStack.prototype.contains = function (q) {
      return this.inSpecificScope(q, Object.create(null))
    }, me.ElementStack.prototype.inSpecificScope = function (q, F) {
      for (var Q = this.elements.length - 1; Q >= 0; Q--) {
        var G = this.elements[Q];
        if (ye(G, q)) return !0;
        if (ye(G, F)) return !1
      }
      return !1
    }, me.ElementStack.prototype.elementInSpecificScope = function (q, F) {
      for (var Q = this.elements.length - 1; Q >= 0; Q--) {
        var G = this.elements[Q];
        if (G === q) return !0;
        if (ye(G, F)) return !1
      }
      return !1
    }, me.ElementStack.prototype.elementTypeInSpecificScope = function (q, F) {
      for (var Q = this.elements.length - 1; Q >= 0; Q--) {
        var G = this.elements[Q];
        if (G instanceof q) return !0;
        if (ye(G, F)) return !1
      }
      return !1
    }, me.ElementStack.prototype.inScope = function (q) {
      return this.inSpecificScope(q, f)
    }, me.ElementStack.prototype.elementInScope = function (q) {
      return this.elementInSpecificScope(q, f)
    }, me.ElementStack.prototype.elementTypeInScope = function (q) {
      return this.elementTypeInSpecificScope(q, f)
    }, me.ElementStack.prototype.inButtonScope = function (q) {
      return this.inSpecificScope(q, v)
    }, me.ElementStack.prototype.inListItemScope = function (q) {
      return this.inSpecificScope(q, h)
    }, me.ElementStack.prototype.inTableScope = function (q) {
      return this.inSpecificScope(q, C)
    }, me.ElementStack.prototype.inSelectScope = function (q) {
      for (var F = this.elements.length - 1; F >= 0; F--) {
        var Q = this.elements[F];
        if (Q.namespaceURI !== s.HTML) return !1;
        var G = Q.localName;
        if (G === q) return !0;
        if (G !== "optgroup" && G !== "option") return !1
      }
      return !1
    }, me.ElementStack.prototype.generateImpliedEndTags = function (q, F) {
      for (var Q = F ? j : Ae, G = this.elements.length - 1; G >= 0; G--) {
        var Ce = this.elements[G];
        if (q && ye(Ce, q) || !ye(this.elements[G], Q)) break
      }
      this.elements.length = G + 1, this.top = this.elements[G]
    }, me.ActiveFormattingElements = function () {
      this.list = [], this.attrs = []
    }, me.ActiveFormattingElements.prototype.MARKER = {localName: "|"}, me.ActiveFormattingElements.prototype.insertMarker = function () {
      this.list.push(this.MARKER), this.attrs.push(this.MARKER)
    }, me.ActiveFormattingElements.prototype.push = function (q, F) {
      for (var Q = 0, G = this.list.length - 1; G >= 0 && this.list[G] !== this.MARKER; G--) if ($t(q, this.list[G], this.attrs[G]) && (Q++, Q === 3)) {
        this.list.splice(G, 1), this.attrs.splice(G, 1);
        break
      }
      this.list.push(q);
      for (var Ce = [], W = 0; W < F.length; W++) Ce[W] = F[W];
      this.attrs.push(Ce);

      function $t(_t, Gt, pt) {
        if (_t.localName !== Gt.localName || _t._numattrs !== pt.length) return !1;
        for (var $e = 0, bn = pt.length; $e < bn; $e++) {
          var Wt = pt[$e][0], R = pt[$e][1];
          if (!_t.hasAttribute(Wt) || _t.getAttribute(Wt) !== R) return !1
        }
        return !0
      }
    }, me.ActiveFormattingElements.prototype.clearToMarker = function () {
      for (var q = this.list.length - 1; q >= 0 && this.list[q] !== this.MARKER; q--) ;
      q < 0 && (q = 0), this.list.length = q, this.attrs.length = q
    }, me.ActiveFormattingElements.prototype.findElementByTag = function (q) {
      for (var F = this.list.length - 1; F >= 0; F--) {
        var Q = this.list[F];
        if (Q === this.MARKER) break;
        if (Q.localName === q) return Q
      }
      return null
    }, me.ActiveFormattingElements.prototype.indexOf = function (q) {
      return this.list.lastIndexOf(q)
    }, me.ActiveFormattingElements.prototype.remove = function (q) {
      var F = this.list.lastIndexOf(q);
      F !== -1 && (this.list.splice(F, 1), this.attrs.splice(F, 1))
    }, me.ActiveFormattingElements.prototype.replace = function (q, F, Q) {
      var G = this.list.lastIndexOf(q);
      G !== -1 && (this.list[G] = F, this.attrs[G] = Q)
    }, me.ActiveFormattingElements.prototype.insertAfter = function (q, F) {
      var Q = this.list.lastIndexOf(q);
      Q !== -1 && (this.list.splice(Q, 0, F), this.attrs.splice(Q, 0, F))
    };

    function me(q, F, Q) {
      var G = null, Ce = 0, W = 0, $t = !1, _t = !1, Gt = 0, pt = [], $e = "", bn = !0, Wt = 0, R = ue, wt, Me, Ee = "",
        yn = "", Te = [], Ke = "", Ge = "", Ne = [], St = [], Nt = [], Rt = [], st = [], En = !1, H = Tu, mt = null,
        gt = [], S = new me.ElementStack, le = new me.ActiveFormattingElements, Kt = F !== void 0, Tn = null, vt = null,
        _n = !0;
      F && (_n = F.ownerDocument._scripting_enabled), Q && Q.scripting_enabled === !1 && (_n = !1);
      var Ie = !0, Ii = !1, wn, Li, B = [], Ct = !1, Xt = !1, Sn = {
        document: function () {
          return ge
        }, _asDocumentFragment: function () {
          for (var c = ge.createDocumentFragment(), u = ge.firstChild; u.hasChildNodes();) c.appendChild(u.firstChild);
          return c
        }, pause: function () {
          Wt++
        }, resume: function () {
          Wt--, this.parse("")
        }, parse: function (c, u, E) {
          var D;
          return Wt > 0 ? ($e += c, !0) : (Gt === 0 ? ($e && (c = $e + c, $e = ""), u && (c += "\uFFFF", $t = !0), G = c, Ce = c.length, W = 0, bn && (bn = !1, G.charCodeAt(0) === 65279 && (W = 1)), Gt++, D = qa(E), $e = G.substring(W, Ce), Gt--) : (Gt++, pt.push(G, Ce, W), G = c, Ce = c.length, W = 0, qa(), D = !1, $e = G.substring(W, Ce), W = pt.pop(), Ce = pt.pop(), G = pt.pop(), $e && (G = $e + G.substring(W), Ce = G.length, W = 0, $e = ""), Gt--), D)
        }
      }, ge = new i(!0, q);
      if (ge._parser = Sn, ge._scripting_enabled = _n, F) {
        if (F.ownerDocument._quirks && (ge._quirks = !0), F.ownerDocument._limitedQuirks && (ge._limitedQuirks = !0), F.namespaceURI === s.HTML) switch (F.localName) {
          case"title":
          case"textarea":
            R = It;
            break;
          case"style":
          case"xmp":
          case"iframe":
          case"noembed":
          case"noframes":
          case"script":
          case"plaintext":
            R = Ui;
            break
        }
        var Ua = ge.createElement("html");
        ge._appendChild(Ua), S.push(Ua), F instanceof o.HTMLTemplateElement && gt.push(Wi), kr();
        for (var Ar = F; Ar !== null; Ar = Ar.parentElement) if (Ar instanceof o.HTMLFormElement) {
          vt = Ar;
          break
        }
      }

      function qa(c) {
        for (var u, E, D, L; W < Ce;) {
          if (Wt > 0 || c && c()) return !0;
          switch (typeof R.lookahead) {
            case"undefined":
              if (u = G.charCodeAt(W++), _t && (_t = !1, u === 10)) {
                W++;
                continue
              }
              switch (u) {
                case 13:
                  W < Ce ? G.charCodeAt(W) === 10 && W++ : _t = !0, R(10);
                  break;
                case 65535:
                  if ($t && W === Ce) {
                    R(l);
                    break
                  }
                default:
                  R(u);
                  break
              }
              break;
            case"number":
              u = G.charCodeAt(W);
              var V = R.lookahead, te = !0;
              if (V < 0 && (te = !1, V = -V), V < Ce - W) E = te ? G.substring(W, W + V) : null, L = !1; else if ($t) E = te ? G.substring(W, Ce) : null, L = !0, u === 65535 && W === Ce - 1 && (u = l); else return !0;
              R(u, E, L);
              break;
            case"string":
              u = G.charCodeAt(W), D = R.lookahead;
              var he = G.indexOf(D, W);
              if (he !== -1) E = G.substring(W, he + D.length), L = !1; else {
                if (!$t) return !0;
                E = G.substring(W, Ce), u === 65535 && W === Ce - 1 && (u = l), L = !0
              }
              R(u, E, L);
              break
          }
        }
        return !1
      }

      function At(c, u) {
        for (var E = 0; E < st.length; E++) if (st[E][0] === c) return;
        u !== void 0 ? st.push([c, u]) : st.push([c])
      }

      function Nl() {
        Ia.lastIndex = W - 1;
        var c = Ia.exec(G);
        if (!c) throw new Error("should never happen");
        var u = c[1];
        if (!u) return !1;
        var E = c[2], D = E.length;
        switch (E[0]) {
          case'"':
          case"'":
            E = E.substring(1, D - 1), W += c[0].length - 1, R = ji;
            break;
          default:
            R = ht, W += c[0].length - 1, E = E.substring(0, D - 1);
            break
        }
        for (var L = 0; L < st.length; L++) if (st[L][0] === u) return !0;
        return st.push([u, E]), !0
      }

      function Rl() {
        En = !1, Ee = "", st.length = 0
      }

      function Dr() {
        En = !0, Ee = "", st.length = 0
      }

      function bt() {
        Te.length = 0
      }

      function ki() {
        Ke = ""
      }

      function Oi() {
        Ge = ""
      }

      function Ha() {
        Ne.length = 0
      }

      function lr() {
        St.length = 0, Nt = null, Rt = null
      }

      function Nn() {
        Nt = []
      }

      function Dt() {
        Rt = []
      }

      function ve() {
        Ii = !0
      }

      function Cl() {
        return S.top && S.top.namespaceURI !== "http://www.w3.org/1999/xhtml"
      }

      function Qe(c) {
        return yn === c
      }

      function ur() {
        if (B.length > 0) {
          var c = je(B);
          if (B.length = 0, Xt && (Xt = !1, c[0] === `
` && (c = c.substring(1)), c.length === 0)) return;
          ke(g, c), Ct = !1
        }
        Xt = !1
      }

      function Mr(c) {
        c.lastIndex = W - 1;
        var u = c.exec(G);
        if (u && u.index === W - 1) return u = u[0], W += u.length - 1, $t && W === Ce && (u = u.slice(0, -1), W--), u;
        throw new Error("should never happen")
      }

      function Ir(c) {
        c.lastIndex = W - 1;
        var u = c.exec(G)[0];
        return u ? (Al(u), W += u.length - 1, !0) : !1
      }

      function Al(c) {
        B.length > 0 && ur(), !(Xt && (Xt = !1, c[0] === `
` && (c = c.substring(1)), c.length === 0)) && ke(g, c)
      }

      function yt() {
        if (En) ke(b, Ee); else {
          var c = Ee;
          Ee = "", yn = c, ke(m, c, st)
        }
      }

      function Dl() {
        if (W === Ce) return !1;
        Ma.lastIndex = W;
        var c = Ma.exec(G);
        if (!c) throw new Error("should never happen");
        var u = c[2];
        if (!u) return !1;
        var E = c[1];
        return E ? (W += u.length + 2, ke(b, u)) : (W += u.length + 1, yn = u, ke(m, u, O)), !0
      }

      function Ml() {
        En ? ke(b, Ee, null, !0) : ke(m, Ee, st, !0)
      }

      function be() {
        ke(U, je(St), Nt ? je(Nt) : void 0, Rt ? je(Rt) : void 0)
      }

      function ae() {
        ur(), H(l), ge.modclock = 1
      }

      var ke = Sn.insertToken = function (u, E, D, L) {
        ur();
        var V = S.top;
        !V || V.namespaceURI === s.HTML ? H(u, E, D, L) : u !== m && u !== g ? to(u, E, D, L) : La(V) && (u === g || u === m && E !== "mglyph" && E !== "malignmark") || u === m && E === "svg" && V.namespaceURI === s.MATHML && V.localName === "annotation-xml" || ka(V) ? (Li = !0, H(u, E, D, L), Li = !1) : to(u, E, D, L)
      };

      function ct(c) {
        var u = S.top;
        Mt && ye(u, de) ? Cn(function (E) {
          return E.createComment(c)
        }) : (u instanceof o.HTMLTemplateElement && (u = u.content), u._appendChild(u.ownerDocument.createComment(c)))
      }

      function lt(c) {
        var u = S.top;
        if (Mt && ye(u, de)) Cn(function (D) {
          return D.createTextNode(c)
        }); else {
          u instanceof o.HTMLTemplateElement && (u = u.content);
          var E = u.lastChild;
          E && E.nodeType === n.TEXT_NODE ? E.appendData(c) : u._appendChild(u.ownerDocument.createTextNode(c))
        }
      }

      function Lr(c, u, E) {
        var D = a.createElement(c, u, null);
        if (E) for (var L = 0, V = E.length; L < V; L++) D._setAttribute(E[L][0], E[L][1]);
        return D
      }

      var Mt = !1;

      function ie(c, u) {
        var E = Rn(function (D) {
          return Lr(D, c, u)
        });
        return ye(E, p) && (E._form = vt), E
      }

      function Rn(c) {
        var u;
        return Mt && ye(S.top, de) ? u = Cn(c) : S.top instanceof o.HTMLTemplateElement ? (u = c(S.top.content.ownerDocument), S.top.content._appendChild(u)) : (u = c(S.top.ownerDocument), S.top._appendChild(u)), S.push(u), u
      }

      function xi(c, u, E) {
        return Rn(function (D) {
          var L = D._createElementNS(c, E, null);
          if (u) for (var V = 0, te = u.length; V < te; V++) {
            var he = u[V];
            he.length === 2 ? L._setAttribute(he[0], he[1]) : L._setAttributeNS(he[2], he[0], he[1])
          }
          return L
        })
      }

      function Fa(c) {
        for (var u = S.elements.length - 1; u >= 0; u--) if (S.elements[u] instanceof c) return u;
        return -1
      }

      function Cn(c) {
        var u, E, D = -1, L = -1, V;
        if (D = Fa(o.HTMLTableElement), L = Fa(o.HTMLTemplateElement), L >= 0 && (D < 0 || L > D) ? u = S.elements[L] : D >= 0 && (u = S.elements[D].parentNode, u ? E = S.elements[D] : u = S.elements[D - 1]), u || (u = S.elements[0]), u instanceof o.HTMLTemplateElement && (u = u.content), V = c(u.ownerDocument), V.nodeType === n.TEXT_NODE) {
          var te;
          if (E ? te = E.previousSibling : te = u.lastChild, te && te.nodeType === n.TEXT_NODE) return te.appendData(V.data), V
        }
        return E ? u.insertBefore(V, E) : u._appendChild(V), V
      }

      function kr() {
        for (var c = !1, u = S.elements.length - 1; u >= 0; u--) {
          var E = S.elements[u];
          if (u === 0 && (c = !0, Kt && (E = F)), E.namespaceURI === s.HTML) {
            var D = E.localName;
            switch (D) {
              case"select":
                for (var L = u; L > 0;) {
                  var V = S.elements[--L];
                  if (V instanceof o.HTMLTemplateElement) break;
                  if (V instanceof o.HTMLTableElement) {
                    H = jn;
                    return
                  }
                }
                H = Et;
                return;
              case"tr":
                H = Pr;
                return;
              case"tbody":
              case"tfoot":
              case"thead":
                H = Jt;
                return;
              case"caption":
                H = Gi;
                return;
              case"colgroup":
                H = Fn;
                return;
              case"table":
                H = Ze;
                return;
              case"template":
                H = gt[gt.length - 1];
                return;
              case"body":
                H = ee;
                return;
              case"frameset":
                H = Ki;
                return;
              case"html":
                Tn === null ? H = qn : H = $i;
                return;
              default:
                if (!c) {
                  if (D === "head") {
                    H = Le;
                    return
                  }
                  if (D === "td" || D === "th") {
                    H = hr;
                    return
                  }
                }
            }
          }
          if (c) {
            H = ee;
            return
          }
        }
      }

      function An(c, u) {
        ie(c, u), R = Or, mt = H, H = Hn
      }

      function Il(c, u) {
        ie(c, u), R = It, mt = H, H = Hn
      }

      function Pi(c, u) {
        return {elt: Lr(c, le.list[u].localName, le.attrs[u]), attrs: le.attrs[u]}
      }

      function Ve() {
        if (le.list.length !== 0) {
          var c = le.list[le.list.length - 1];
          if (c !== le.MARKER && S.elements.lastIndexOf(c) === -1) {
            for (var u = le.list.length - 2; u >= 0 && (c = le.list[u], !(c === le.MARKER || S.elements.lastIndexOf(c) !== -1)); u--) ;
            for (u = u + 1; u < le.list.length; u++) {
              var E = Rn(function (D) {
                return Pi(D, u).elt
              });
              le.list[u] = E
            }
          }
        }
      }

      var Dn = {localName: "BM"};

      function Ll(c) {
        if (ye(S.top, c) && le.indexOf(S.top) === -1) return S.pop(), !0;
        for (var u = 0; u < 8;) {
          u++;
          var E = le.findElementByTag(c);
          if (!E) return !1;
          var D = S.elements.lastIndexOf(E);
          if (D === -1) return le.remove(E), !0;
          if (!S.elementInScope(E)) return !0;
          for (var L = null, V, te = D + 1; te < S.elements.length; te++) if (ye(S.elements[te], N)) {
            L = S.elements[te], V = te;
            break
          }
          if (L) {
            var he = S.elements[D - 1];
            le.insertAfter(E, Dn);
            for (var De = L, He = L, Je = V, at, er = 0; er++, De = S.elements[--Je], De !== E;) {
              if (at = le.indexOf(De), er > 3 && at !== -1 && (le.remove(De), at = -1), at === -1) {
                S.removeElement(De);
                continue
              }
              var Pt = Pi(he.ownerDocument, at);
              le.replace(De, Pt.elt, Pt.attrs), S.elements[Je] = Pt.elt, De = Pt.elt, He === L && (le.remove(Dn), le.insertAfter(Pt.elt, Dn)), De._appendChild(He), He = De
            }
            Mt && ye(he, de) ? Cn(function () {
              return He
            }) : he instanceof o.HTMLTemplateElement ? he.content._appendChild(He) : he._appendChild(He);
            for (var Ur = Pi(L.ownerDocument, le.indexOf(E)); L.hasChildNodes();) Ur.elt._appendChild(L.firstChild);
            L._appendChild(Ur.elt), le.remove(E), le.replace(Dn, Ur.elt, Ur.attrs), S.removeElement(E);
            var Ru = S.elements.lastIndexOf(L);
            S.elements.splice(Ru + 1, 0, Ur.elt)
          } else return S.popElement(E), le.remove(E), !0
        }
        return !0
      }

      function kl() {
        S.pop(), H = mt
      }

      function Yt() {
        delete ge._parser, S.elements.length = 0, ge.defaultView && ge.defaultView.dispatchEvent(new o.Event("load", {}))
      }

      function X(c, u) {
        R = u, W--
      }

      function ue(c) {
        switch (c) {
          case 38:
            wt = ue, R = xr;
            break;
          case 60:
            if (Dl()) break;
            R = Ol;
            break;
          case 0:
            B.push(c), Ct = !0;
            break;
          case-1:
            ae();
            break;
          default:
            Ir(El) || B.push(c);
            break
        }
      }

      function It(c) {
        switch (c) {
          case 38:
            wt = It, R = xr;
            break;
          case 60:
            R = Pl;
            break;
          case 0:
            B.push(65533), Ct = !0;
            break;
          case-1:
            ae();
            break;
          default:
            B.push(c);
            break
        }
      }

      function Or(c) {
        switch (c) {
          case 60:
            R = Hl;
            break;
          case 0:
            B.push(65533);
            break;
          case-1:
            ae();
            break;
          default:
            Ir(Da) || B.push(c);
            break
        }
      }

      function Lt(c) {
        switch (c) {
          case 60:
            R = Bl;
            break;
          case 0:
            B.push(65533);
            break;
          case-1:
            ae();
            break;
          default:
            Ir(Da) || B.push(c);
            break
        }
      }

      function Ui(c) {
        switch (c) {
          case 0:
            B.push(65533);
            break;
          case-1:
            ae();
            break;
          default:
            Ir(Tl) || B.push(c);
            break
        }
      }

      function Ol(c) {
        switch (c) {
          case 33:
            R = za;
            break;
          case 47:
            R = xl;
            break;
          case 65:
          case 66:
          case 67:
          case 68:
          case 69:
          case 70:
          case 71:
          case 72:
          case 73:
          case 74:
          case 75:
          case 76:
          case 77:
          case 78:
          case 79:
          case 80:
          case 81:
          case 82:
          case 83:
          case 84:
          case 85:
          case 86:
          case 87:
          case 88:
          case 89:
          case 90:
          case 97:
          case 98:
          case 99:
          case 100:
          case 101:
          case 102:
          case 103:
          case 104:
          case 105:
          case 106:
          case 107:
          case 108:
          case 109:
          case 110:
          case 111:
          case 112:
          case 113:
          case 114:
          case 115:
          case 116:
          case 117:
          case 118:
          case 119:
          case 120:
          case 121:
          case 122:
            Rl(), X(c, ja);
            break;
          case 63:
            X(c, kn);
            break;
          default:
            B.push(60), X(c, ue);
            break
        }
      }

      function xl(c) {
        switch (c) {
          case 65:
          case 66:
          case 67:
          case 68:
          case 69:
          case 70:
          case 71:
          case 72:
          case 73:
          case 74:
          case 75:
          case 76:
          case 77:
          case 78:
          case 79:
          case 80:
          case 81:
          case 82:
          case 83:
          case 84:
          case 85:
          case 86:
          case 87:
          case 88:
          case 89:
          case 90:
          case 97:
          case 98:
          case 99:
          case 100:
          case 101:
          case 102:
          case 103:
          case 104:
          case 105:
          case 106:
          case 107:
          case 108:
          case 109:
          case 110:
          case 111:
          case 112:
          case 113:
          case 114:
          case 115:
          case 116:
          case 117:
          case 118:
          case 119:
          case 120:
          case 121:
          case 122:
            Dr(), X(c, ja);
            break;
          case 62:
            R = ue;
            break;
          case-1:
            B.push(60), B.push(47), ae();
            break;
          default:
            X(c, kn);
            break
        }
      }

      function ja(c) {
        switch (c) {
          case 9:
          case 10:
          case 12:
          case 32:
            R = ht;
            break;
          case 47:
            R = Ot;
            break;
          case 62:
            R = ue, yt();
            break;
          case 65:
          case 66:
          case 67:
          case 68:
          case 69:
          case 70:
          case 71:
          case 72:
          case 73:
          case 74:
          case 75:
          case 76:
          case 77:
          case 78:
          case 79:
          case 80:
          case 81:
          case 82:
          case 83:
          case 84:
          case 85:
          case 86:
          case 87:
          case 88:
          case 89:
          case 90:
            Ee += String.fromCharCode(c + 32);
            break;
          case 0:
            Ee += "\uFFFD";
            break;
          case-1:
            ae();
            break;
          default:
            Ee += Mr(vl);
            break
        }
      }

      function Pl(c) {
        c === 47 ? (bt(), R = Ul) : (B.push(60), X(c, It))
      }

      function Ul(c) {
        switch (c) {
          case 65:
          case 66:
          case 67:
          case 68:
          case 69:
          case 70:
          case 71:
          case 72:
          case 73:
          case 74:
          case 75:
          case 76:
          case 77:
          case 78:
          case 79:
          case 80:
          case 81:
          case 82:
          case 83:
          case 84:
          case 85:
          case 86:
          case 87:
          case 88:
          case 89:
          case 90:
          case 97:
          case 98:
          case 99:
          case 100:
          case 101:
          case 102:
          case 103:
          case 104:
          case 105:
          case 106:
          case 107:
          case 108:
          case 109:
          case 110:
          case 111:
          case 112:
          case 113:
          case 114:
          case 115:
          case 116:
          case 117:
          case 118:
          case 119:
          case 120:
          case 121:
          case 122:
            Dr(), X(c, ql);
            break;
          default:
            B.push(60), B.push(47), X(c, It);
            break
        }
      }

      function ql(c) {
        switch (c) {
          case 9:
          case 10:
          case 12:
          case 32:
            if (Qe(Ee)) {
              R = ht;
              return
            }
            break;
          case 47:
            if (Qe(Ee)) {
              R = Ot;
              return
            }
            break;
          case 62:
            if (Qe(Ee)) {
              R = ue, yt();
              return
            }
            break;
          case 65:
          case 66:
          case 67:
          case 68:
          case 69:
          case 70:
          case 71:
          case 72:
          case 73:
          case 74:
          case 75:
          case 76:
          case 77:
          case 78:
          case 79:
          case 80:
          case 81:
          case 82:
          case 83:
          case 84:
          case 85:
          case 86:
          case 87:
          case 88:
          case 89:
          case 90:
            Ee += String.fromCharCode(c + 32), Te.push(c);
            return;
          case 97:
          case 98:
          case 99:
          case 100:
          case 101:
          case 102:
          case 103:
          case 104:
          case 105:
          case 106:
          case 107:
          case 108:
          case 109:
          case 110:
          case 111:
          case 112:
          case 113:
          case 114:
          case 115:
          case 116:
          case 117:
          case 118:
          case 119:
          case 120:
          case 121:
          case 122:
            Ee += String.fromCharCode(c), Te.push(c);
            return;
          default:
            break
        }
        B.push(60), B.push(47), d(B, Te), X(c, It)
      }

      function Hl(c) {
        c === 47 ? (bt(), R = Fl) : (B.push(60), X(c, Or))
      }

      function Fl(c) {
        switch (c) {
          case 65:
          case 66:
          case 67:
          case 68:
          case 69:
          case 70:
          case 71:
          case 72:
          case 73:
          case 74:
          case 75:
          case 76:
          case 77:
          case 78:
          case 79:
          case 80:
          case 81:
          case 82:
          case 83:
          case 84:
          case 85:
          case 86:
          case 87:
          case 88:
          case 89:
          case 90:
          case 97:
          case 98:
          case 99:
          case 100:
          case 101:
          case 102:
          case 103:
          case 104:
          case 105:
          case 106:
          case 107:
          case 108:
          case 109:
          case 110:
          case 111:
          case 112:
          case 113:
          case 114:
          case 115:
          case 116:
          case 117:
          case 118:
          case 119:
          case 120:
          case 121:
          case 122:
            Dr(), X(c, jl);
            break;
          default:
            B.push(60), B.push(47), X(c, Or);
            break
        }
      }

      function jl(c) {
        switch (c) {
          case 9:
          case 10:
          case 12:
          case 32:
            if (Qe(Ee)) {
              R = ht;
              return
            }
            break;
          case 47:
            if (Qe(Ee)) {
              R = Ot;
              return
            }
            break;
          case 62:
            if (Qe(Ee)) {
              R = ue, yt();
              return
            }
            break;
          case 65:
          case 66:
          case 67:
          case 68:
          case 69:
          case 70:
          case 71:
          case 72:
          case 73:
          case 74:
          case 75:
          case 76:
          case 77:
          case 78:
          case 79:
          case 80:
          case 81:
          case 82:
          case 83:
          case 84:
          case 85:
          case 86:
          case 87:
          case 88:
          case 89:
          case 90:
            Ee += String.fromCharCode(c + 32), Te.push(c);
            return;
          case 97:
          case 98:
          case 99:
          case 100:
          case 101:
          case 102:
          case 103:
          case 104:
          case 105:
          case 106:
          case 107:
          case 108:
          case 109:
          case 110:
          case 111:
          case 112:
          case 113:
          case 114:
          case 115:
          case 116:
          case 117:
          case 118:
          case 119:
          case 120:
          case 121:
          case 122:
            Ee += String.fromCharCode(c), Te.push(c);
            return;
          default:
            break
        }
        B.push(60), B.push(47), d(B, Te), X(c, Or)
      }

      function Bl(c) {
        switch (c) {
          case 47:
            bt(), R = Vl;
            break;
          case 33:
            R = $l, B.push(60), B.push(33);
            break;
          default:
            B.push(60), X(c, Lt);
            break
        }
      }

      function Vl(c) {
        switch (c) {
          case 65:
          case 66:
          case 67:
          case 68:
          case 69:
          case 70:
          case 71:
          case 72:
          case 73:
          case 74:
          case 75:
          case 76:
          case 77:
          case 78:
          case 79:
          case 80:
          case 81:
          case 82:
          case 83:
          case 84:
          case 85:
          case 86:
          case 87:
          case 88:
          case 89:
          case 90:
          case 97:
          case 98:
          case 99:
          case 100:
          case 101:
          case 102:
          case 103:
          case 104:
          case 105:
          case 106:
          case 107:
          case 108:
          case 109:
          case 110:
          case 111:
          case 112:
          case 113:
          case 114:
          case 115:
          case 116:
          case 117:
          case 118:
          case 119:
          case 120:
          case 121:
          case 122:
            Dr(), X(c, zl);
            break;
          default:
            B.push(60), B.push(47), X(c, Lt);
            break
        }
      }

      function zl(c) {
        switch (c) {
          case 9:
          case 10:
          case 12:
          case 32:
            if (Qe(Ee)) {
              R = ht;
              return
            }
            break;
          case 47:
            if (Qe(Ee)) {
              R = Ot;
              return
            }
            break;
          case 62:
            if (Qe(Ee)) {
              R = ue, yt();
              return
            }
            break;
          case 65:
          case 66:
          case 67:
          case 68:
          case 69:
          case 70:
          case 71:
          case 72:
          case 73:
          case 74:
          case 75:
          case 76:
          case 77:
          case 78:
          case 79:
          case 80:
          case 81:
          case 82:
          case 83:
          case 84:
          case 85:
          case 86:
          case 87:
          case 88:
          case 89:
          case 90:
            Ee += String.fromCharCode(c + 32), Te.push(c);
            return;
          case 97:
          case 98:
          case 99:
          case 100:
          case 101:
          case 102:
          case 103:
          case 104:
          case 105:
          case 106:
          case 107:
          case 108:
          case 109:
          case 110:
          case 111:
          case 112:
          case 113:
          case 114:
          case 115:
          case 116:
          case 117:
          case 118:
          case 119:
          case 120:
          case 121:
          case 122:
            Ee += String.fromCharCode(c), Te.push(c);
            return;
          default:
            break
        }
        B.push(60), B.push(47), d(B, Te), X(c, Lt)
      }

      function $l(c) {
        c === 45 ? (R = Gl, B.push(45)) : X(c, Lt)
      }

      function Gl(c) {
        c === 45 ? (R = Ba, B.push(45)) : X(c, Lt)
      }

      function ut(c) {
        switch (c) {
          case 45:
            R = Wl, B.push(45);
            break;
          case 60:
            R = qi;
            break;
          case 0:
            B.push(65533);
            break;
          case-1:
            ae();
            break;
          default:
            B.push(c);
            break
        }
      }

      function Wl(c) {
        switch (c) {
          case 45:
            R = Ba, B.push(45);
            break;
          case 60:
            R = qi;
            break;
          case 0:
            R = ut, B.push(65533);
            break;
          case-1:
            ae();
            break;
          default:
            R = ut, B.push(c);
            break
        }
      }

      function Ba(c) {
        switch (c) {
          case 45:
            B.push(45);
            break;
          case 60:
            R = qi;
            break;
          case 62:
            R = Lt, B.push(62);
            break;
          case 0:
            R = ut, B.push(65533);
            break;
          case-1:
            ae();
            break;
          default:
            R = ut, B.push(c);
            break
        }
      }

      function qi(c) {
        switch (c) {
          case 47:
            bt(), R = Kl;
            break;
          case 65:
          case 66:
          case 67:
          case 68:
          case 69:
          case 70:
          case 71:
          case 72:
          case 73:
          case 74:
          case 75:
          case 76:
          case 77:
          case 78:
          case 79:
          case 80:
          case 81:
          case 82:
          case 83:
          case 84:
          case 85:
          case 86:
          case 87:
          case 88:
          case 89:
          case 90:
          case 97:
          case 98:
          case 99:
          case 100:
          case 101:
          case 102:
          case 103:
          case 104:
          case 105:
          case 106:
          case 107:
          case 108:
          case 109:
          case 110:
          case 111:
          case 112:
          case 113:
          case 114:
          case 115:
          case 116:
          case 117:
          case 118:
          case 119:
          case 120:
          case 121:
          case 122:
            bt(), B.push(60), X(c, Yl);
            break;
          default:
            B.push(60), X(c, ut);
            break
        }
      }

      function Kl(c) {
        switch (c) {
          case 65:
          case 66:
          case 67:
          case 68:
          case 69:
          case 70:
          case 71:
          case 72:
          case 73:
          case 74:
          case 75:
          case 76:
          case 77:
          case 78:
          case 79:
          case 80:
          case 81:
          case 82:
          case 83:
          case 84:
          case 85:
          case 86:
          case 87:
          case 88:
          case 89:
          case 90:
          case 97:
          case 98:
          case 99:
          case 100:
          case 101:
          case 102:
          case 103:
          case 104:
          case 105:
          case 106:
          case 107:
          case 108:
          case 109:
          case 110:
          case 111:
          case 112:
          case 113:
          case 114:
          case 115:
          case 116:
          case 117:
          case 118:
          case 119:
          case 120:
          case 121:
          case 122:
            Dr(), X(c, Xl);
            break;
          default:
            B.push(60), B.push(47), X(c, ut);
            break
        }
      }

      function Xl(c) {
        switch (c) {
          case 9:
          case 10:
          case 12:
          case 32:
            if (Qe(Ee)) {
              R = ht;
              return
            }
            break;
          case 47:
            if (Qe(Ee)) {
              R = Ot;
              return
            }
            break;
          case 62:
            if (Qe(Ee)) {
              R = ue, yt();
              return
            }
            break;
          case 65:
          case 66:
          case 67:
          case 68:
          case 69:
          case 70:
          case 71:
          case 72:
          case 73:
          case 74:
          case 75:
          case 76:
          case 77:
          case 78:
          case 79:
          case 80:
          case 81:
          case 82:
          case 83:
          case 84:
          case 85:
          case 86:
          case 87:
          case 88:
          case 89:
          case 90:
            Ee += String.fromCharCode(c + 32), Te.push(c);
            return;
          case 97:
          case 98:
          case 99:
          case 100:
          case 101:
          case 102:
          case 103:
          case 104:
          case 105:
          case 106:
          case 107:
          case 108:
          case 109:
          case 110:
          case 111:
          case 112:
          case 113:
          case 114:
          case 115:
          case 116:
          case 117:
          case 118:
          case 119:
          case 120:
          case 121:
          case 122:
            Ee += String.fromCharCode(c), Te.push(c);
            return;
          default:
            break
        }
        B.push(60), B.push(47), d(B, Te), X(c, ut)
      }

      function Yl(c) {
        switch (c) {
          case 9:
          case 10:
          case 12:
          case 32:
          case 47:
          case 62:
            je(Te) === "script" ? R = kt : R = ut, B.push(c);
            break;
          case 65:
          case 66:
          case 67:
          case 68:
          case 69:
          case 70:
          case 71:
          case 72:
          case 73:
          case 74:
          case 75:
          case 76:
          case 77:
          case 78:
          case 79:
          case 80:
          case 81:
          case 82:
          case 83:
          case 84:
          case 85:
          case 86:
          case 87:
          case 88:
          case 89:
          case 90:
            Te.push(c + 32), B.push(c);
            break;
          case 97:
          case 98:
          case 99:
          case 100:
          case 101:
          case 102:
          case 103:
          case 104:
          case 105:
          case 106:
          case 107:
          case 108:
          case 109:
          case 110:
          case 111:
          case 112:
          case 113:
          case 114:
          case 115:
          case 116:
          case 117:
          case 118:
          case 119:
          case 120:
          case 121:
          case 122:
            Te.push(c), B.push(c);
            break;
          default:
            X(c, ut);
            break
        }
      }

      function kt(c) {
        switch (c) {
          case 45:
            R = Ql, B.push(45);
            break;
          case 60:
            R = Hi, B.push(60);
            break;
          case 0:
            B.push(65533);
            break;
          case-1:
            ae();
            break;
          default:
            B.push(c);
            break
        }
      }

      function Ql(c) {
        switch (c) {
          case 45:
            R = Zl, B.push(45);
            break;
          case 60:
            R = Hi, B.push(60);
            break;
          case 0:
            R = kt, B.push(65533);
            break;
          case-1:
            ae();
            break;
          default:
            R = kt, B.push(c);
            break
        }
      }

      function Zl(c) {
        switch (c) {
          case 45:
            B.push(45);
            break;
          case 60:
            R = Hi, B.push(60);
            break;
          case 62:
            R = Lt, B.push(62);
            break;
          case 0:
            R = kt, B.push(65533);
            break;
          case-1:
            ae();
            break;
          default:
            R = kt, B.push(c);
            break
        }
      }

      function Hi(c) {
        c === 47 ? (bt(), R = Jl, B.push(47)) : X(c, kt)
      }

      function Jl(c) {
        switch (c) {
          case 9:
          case 10:
          case 12:
          case 32:
          case 47:
          case 62:
            je(Te) === "script" ? R = ut : R = kt, B.push(c);
            break;
          case 65:
          case 66:
          case 67:
          case 68:
          case 69:
          case 70:
          case 71:
          case 72:
          case 73:
          case 74:
          case 75:
          case 76:
          case 77:
          case 78:
          case 79:
          case 80:
          case 81:
          case 82:
          case 83:
          case 84:
          case 85:
          case 86:
          case 87:
          case 88:
          case 89:
          case 90:
            Te.push(c + 32), B.push(c);
            break;
          case 97:
          case 98:
          case 99:
          case 100:
          case 101:
          case 102:
          case 103:
          case 104:
          case 105:
          case 106:
          case 107:
          case 108:
          case 109:
          case 110:
          case 111:
          case 112:
          case 113:
          case 114:
          case 115:
          case 116:
          case 117:
          case 118:
          case 119:
          case 120:
          case 121:
          case 122:
            Te.push(c), B.push(c);
            break;
          default:
            X(c, kt);
            break
        }
      }

      function ht(c) {
        switch (c) {
          case 9:
          case 10:
          case 12:
          case 32:
            break;
          case 47:
            R = Ot;
            break;
          case 62:
            R = ue, yt();
            break;
          case-1:
            ae();
            break;
          case 61:
            ki(), Ke += String.fromCharCode(c), R = Fi;
            break;
          default:
            if (Nl()) break;
            ki(), X(c, Fi);
            break
        }
      }

      function Fi(c) {
        switch (c) {
          case 9:
          case 10:
          case 12:
          case 32:
          case 47:
          case 62:
          case-1:
            X(c, eu);
            break;
          case 61:
            R = Va;
            break;
          case 65:
          case 66:
          case 67:
          case 68:
          case 69:
          case 70:
          case 71:
          case 72:
          case 73:
          case 74:
          case 75:
          case 76:
          case 77:
          case 78:
          case 79:
          case 80:
          case 81:
          case 82:
          case 83:
          case 84:
          case 85:
          case 86:
          case 87:
          case 88:
          case 89:
          case 90:
            Ke += String.fromCharCode(c + 32);
            break;
          case 0:
            Ke += "\uFFFD";
            break;
          case 34:
          case 39:
          case 60:
          default:
            Ke += Mr(bl);
            break
        }
      }

      function eu(c) {
        switch (c) {
          case 9:
          case 10:
          case 12:
          case 32:
            break;
          case 47:
            At(Ke), R = Ot;
            break;
          case 61:
            R = Va;
            break;
          case 62:
            R = ue, At(Ke), yt();
            break;
          case-1:
            At(Ke), ae();
            break;
          default:
            At(Ke), ki(), X(c, Fi);
            break
        }
      }

      function Va(c) {
        switch (c) {
          case 9:
          case 10:
          case 12:
          case 32:
            break;
          case 34:
            Oi(), R = Mn;
            break;
          case 39:
            Oi(), R = In;
            break;
          case 62:
          default:
            Oi(), X(c, Ln);
            break
        }
      }

      function Mn(c) {
        switch (c) {
          case 34:
            At(Ke, Ge), R = ji;
            break;
          case 38:
            wt = Mn, R = xr;
            break;
          case 0:
            Ge += "\uFFFD";
            break;
          case-1:
            ae();
            break;
          case 10:
            Ge += String.fromCharCode(c);
            break;
          default:
            Ge += Mr(pl);
            break
        }
      }

      function In(c) {
        switch (c) {
          case 39:
            At(Ke, Ge), R = ji;
            break;
          case 38:
            wt = In, R = xr;
            break;
          case 0:
            Ge += "\uFFFD";
            break;
          case-1:
            ae();
            break;
          case 10:
            Ge += String.fromCharCode(c);
            break;
          default:
            Ge += Mr(ml);
            break
        }
      }

      function Ln(c) {
        switch (c) {
          case 9:
          case 10:
          case 12:
          case 32:
            At(Ke, Ge), R = ht;
            break;
          case 38:
            wt = Ln, R = xr;
            break;
          case 62:
            At(Ke, Ge), R = ue, yt();
            break;
          case 0:
            Ge += "\uFFFD";
            break;
          case-1:
            W--, R = ue;
            break;
          case 34:
          case 39:
          case 60:
          case 61:
          case 96:
          default:
            Ge += Mr(gl);
            break
        }
      }

      function ji(c) {
        switch (c) {
          case 9:
          case 10:
          case 12:
          case 32:
            R = ht;
            break;
          case 47:
            R = Ot;
            break;
          case 62:
            R = ue, yt();
            break;
          case-1:
            ae();
            break;
          default:
            X(c, ht);
            break
        }
      }

      function Ot(c) {
        switch (c) {
          case 62:
            R = ue, Ml(!0);
            break;
          case-1:
            ae();
            break;
          default:
            X(c, ht);
            break
        }
      }

      function kn(c, u, E) {
        var D = u.length;
        E ? W += D - 1 : W += D;
        var L = u.substring(0, D - 1);
        L = L.replace(/\u0000/g, "\uFFFD"), L = L.replace(/\u000D\u000A/g, `
`), L = L.replace(/\u000D/g, `
`), ke(I, L), R = ue
      }

      kn.lookahead = ">";

      function za(c, u, E) {
        if (u[0] === "-" && u[1] === "-") {
          W += 2, Ha(), R = tu;
          return
        }
        u.toUpperCase() === "DOCTYPE" ? (W += 7, R = cu) : u === "[CDATA[" && Cl() ? (W += 7, R = zi) : R = kn
      }

      za.lookahead = 7;

      function tu(c) {
        switch (Ha(), c) {
          case 45:
            R = ru;
            break;
          case 62:
            R = ue, ke(I, je(Ne));
            break;
          default:
            X(c, Qt);
            break
        }
      }

      function ru(c) {
        switch (c) {
          case 45:
            R = On;
            break;
          case 62:
            R = ue, ke(I, je(Ne));
            break;
          case-1:
            ke(I, je(Ne)), ae();
            break;
          default:
            Ne.push(45), X(c, Qt);
            break
        }
      }

      function Qt(c) {
        switch (c) {
          case 60:
            Ne.push(c), R = nu;
            break;
          case 45:
            R = Bi;
            break;
          case 0:
            Ne.push(65533);
            break;
          case-1:
            ke(I, je(Ne)), ae();
            break;
          default:
            Ne.push(c);
            break
        }
      }

      function nu(c) {
        switch (c) {
          case 33:
            Ne.push(c), R = iu;
            break;
          case 60:
            Ne.push(c);
            break;
          default:
            X(c, Qt);
            break
        }
      }

      function iu(c) {
        switch (c) {
          case 45:
            R = su;
            break;
          default:
            X(c, Qt);
            break
        }
      }

      function su(c) {
        switch (c) {
          case 45:
            R = au;
            break;
          default:
            X(c, Bi);
            break
        }
      }

      function au(c) {
        switch (c) {
          case 62:
          case-1:
            X(c, On);
            break;
          default:
            X(c, On);
            break
        }
      }

      function Bi(c) {
        switch (c) {
          case 45:
            R = On;
            break;
          case-1:
            ke(I, je(Ne)), ae();
            break;
          default:
            Ne.push(45), X(c, Qt);
            break
        }
      }

      function On(c) {
        switch (c) {
          case 62:
            R = ue, ke(I, je(Ne));
            break;
          case 33:
            R = ou;
            break;
          case 45:
            Ne.push(45);
            break;
          case-1:
            ke(I, je(Ne)), ae();
            break;
          default:
            Ne.push(45), Ne.push(45), X(c, Qt);
            break
        }
      }

      function ou(c) {
        switch (c) {
          case 45:
            Ne.push(45), Ne.push(45), Ne.push(33), R = Bi;
            break;
          case 62:
            R = ue, ke(I, je(Ne));
            break;
          case-1:
            ke(I, je(Ne)), ae();
            break;
          default:
            Ne.push(45), Ne.push(45), Ne.push(33), X(c, Qt);
            break
        }
      }

      function cu(c) {
        switch (c) {
          case 9:
          case 10:
          case 12:
          case 32:
            R = $a;
            break;
          case-1:
            lr(), ve(), be(), ae();
            break;
          default:
            X(c, $a);
            break
        }
      }

      function $a(c) {
        switch (c) {
          case 9:
          case 10:
          case 12:
          case 32:
            break;
          case 65:
          case 66:
          case 67:
          case 68:
          case 69:
          case 70:
          case 71:
          case 72:
          case 73:
          case 74:
          case 75:
          case 76:
          case 77:
          case 78:
          case 79:
          case 80:
          case 81:
          case 82:
          case 83:
          case 84:
          case 85:
          case 86:
          case 87:
          case 88:
          case 89:
          case 90:
            lr(), St.push(c + 32), R = Vi;
            break;
          case 0:
            lr(), St.push(65533), R = Vi;
            break;
          case 62:
            lr(), ve(), R = ue, be();
            break;
          case-1:
            lr(), ve(), be(), ae();
            break;
          default:
            lr(), St.push(c), R = Vi;
            break
        }
      }

      function Vi(c) {
        switch (c) {
          case 9:
          case 10:
          case 12:
          case 32:
            R = Ga;
            break;
          case 62:
            R = ue, be();
            break;
          case 65:
          case 66:
          case 67:
          case 68:
          case 69:
          case 70:
          case 71:
          case 72:
          case 73:
          case 74:
          case 75:
          case 76:
          case 77:
          case 78:
          case 79:
          case 80:
          case 81:
          case 82:
          case 83:
          case 84:
          case 85:
          case 86:
          case 87:
          case 88:
          case 89:
          case 90:
            St.push(c + 32);
            break;
          case 0:
            St.push(65533);
            break;
          case-1:
            ve(), be(), ae();
            break;
          default:
            St.push(c);
            break
        }
      }

      function Ga(c, u, E) {
        switch (c) {
          case 9:
          case 10:
          case 12:
          case 32:
            W += 1;
            break;
          case 62:
            R = ue, W += 1, be();
            break;
          case-1:
            ve(), be(), ae();
            break;
          default:
            u = u.toUpperCase(), u === "PUBLIC" ? (W += 6, R = lu) : u === "SYSTEM" ? (W += 6, R = du) : (ve(), R = xt);
            break
        }
      }

      Ga.lookahead = 6;

      function lu(c) {
        switch (c) {
          case 9:
          case 10:
          case 12:
          case 32:
            R = uu;
            break;
          case 34:
            Nn(), R = Wa;
            break;
          case 39:
            Nn(), R = Ka;
            break;
          case 62:
            ve(), R = ue, be();
            break;
          case-1:
            ve(), be(), ae();
            break;
          default:
            ve(), R = xt;
            break
        }
      }

      function uu(c) {
        switch (c) {
          case 9:
          case 10:
          case 12:
          case 32:
            break;
          case 34:
            Nn(), R = Wa;
            break;
          case 39:
            Nn(), R = Ka;
            break;
          case 62:
            ve(), R = ue, be();
            break;
          case-1:
            ve(), be(), ae();
            break;
          default:
            ve(), R = xt;
            break
        }
      }

      function Wa(c) {
        switch (c) {
          case 34:
            R = Xa;
            break;
          case 0:
            Nt.push(65533);
            break;
          case 62:
            ve(), R = ue, be();
            break;
          case-1:
            ve(), be(), ae();
            break;
          default:
            Nt.push(c);
            break
        }
      }

      function Ka(c) {
        switch (c) {
          case 39:
            R = Xa;
            break;
          case 0:
            Nt.push(65533);
            break;
          case 62:
            ve(), R = ue, be();
            break;
          case-1:
            ve(), be(), ae();
            break;
          default:
            Nt.push(c);
            break
        }
      }

      function Xa(c) {
        switch (c) {
          case 9:
          case 10:
          case 12:
          case 32:
            R = hu;
            break;
          case 62:
            R = ue, be();
            break;
          case 34:
            Dt(), R = xn;
            break;
          case 39:
            Dt(), R = Pn;
            break;
          case-1:
            ve(), be(), ae();
            break;
          default:
            ve(), R = xt;
            break
        }
      }

      function hu(c) {
        switch (c) {
          case 9:
          case 10:
          case 12:
          case 32:
            break;
          case 62:
            R = ue, be();
            break;
          case 34:
            Dt(), R = xn;
            break;
          case 39:
            Dt(), R = Pn;
            break;
          case-1:
            ve(), be(), ae();
            break;
          default:
            ve(), R = xt;
            break
        }
      }

      function du(c) {
        switch (c) {
          case 9:
          case 10:
          case 12:
          case 32:
            R = fu;
            break;
          case 34:
            Dt(), R = xn;
            break;
          case 39:
            Dt(), R = Pn;
            break;
          case 62:
            ve(), R = ue, be();
            break;
          case-1:
            ve(), be(), ae();
            break;
          default:
            ve(), R = xt;
            break
        }
      }

      function fu(c) {
        switch (c) {
          case 9:
          case 10:
          case 12:
          case 32:
            break;
          case 34:
            Dt(), R = xn;
            break;
          case 39:
            Dt(), R = Pn;
            break;
          case 62:
            ve(), R = ue, be();
            break;
          case-1:
            ve(), be(), ae();
            break;
          default:
            ve(), R = xt;
            break
        }
      }

      function xn(c) {
        switch (c) {
          case 34:
            R = Ya;
            break;
          case 0:
            Rt.push(65533);
            break;
          case 62:
            ve(), R = ue, be();
            break;
          case-1:
            ve(), be(), ae();
            break;
          default:
            Rt.push(c);
            break
        }
      }

      function Pn(c) {
        switch (c) {
          case 39:
            R = Ya;
            break;
          case 0:
            Rt.push(65533);
            break;
          case 62:
            ve(), R = ue, be();
            break;
          case-1:
            ve(), be(), ae();
            break;
          default:
            Rt.push(c);
            break
        }
      }

      function Ya(c) {
        switch (c) {
          case 9:
          case 10:
          case 12:
          case 32:
            break;
          case 62:
            R = ue, be();
            break;
          case-1:
            ve(), be(), ae();
            break;
          default:
            R = xt;
            break
        }
      }

      function xt(c) {
        switch (c) {
          case 62:
            R = ue, be();
            break;
          case-1:
            be(), ae();
            break;
          default:
            break
        }
      }

      function zi(c) {
        switch (c) {
          case 93:
            R = pu;
            break;
          case-1:
            ae();
            break;
          case 0:
            Ct = !0;
          default:
            Ir(yl) || B.push(c);
            break
        }
      }

      function pu(c) {
        switch (c) {
          case 93:
            R = mu;
            break;
          default:
            B.push(93), X(c, zi);
            break
        }
      }

      function mu(c) {
        switch (c) {
          case 93:
            B.push(93);
            break;
          case 62:
            ur(), R = ue;
            break;
          default:
            B.push(93), B.push(93), X(c, zi);
            break
        }
      }

      function xr(c) {
        switch (bt(), Te.push(38), c) {
          case 9:
          case 10:
          case 12:
          case 32:
          case 60:
          case 38:
          case-1:
            X(c, Zt);
            break;
          case 35:
            Te.push(c), R = gu;
            break;
          default:
            X(c, Qa);
            break
        }
      }

      function Qa(c) {
        We.lastIndex = W;
        var u = We.exec(G);
        if (!u) throw new Error("should never happen");
        var E = u[1];
        if (!E) {
          R = Zt;
          return
        }
        switch (W += E.length, d(Te, wl(E)), wt) {
          case Mn:
          case In:
          case Ln:
            if (E[E.length - 1] !== ";" && /[=A-Za-z0-9]/.test(G[W])) {
              R = Zt;
              return
            }
            break;
          default:
            break
        }
        bt();
        var D = fe[E];
        typeof D == "number" ? Te.push(D) : d(Te, D), R = Zt
      }

      Qa.lookahead = -fl;

      function gu(c) {
        switch (Me = 0, c) {
          case 120:
          case 88:
            Te.push(c), R = vu;
            break;
          default:
            X(c, bu);
            break
        }
      }

      function vu(c) {
        switch (c) {
          case 48:
          case 49:
          case 50:
          case 51:
          case 52:
          case 53:
          case 54:
          case 55:
          case 56:
          case 57:
          case 65:
          case 66:
          case 67:
          case 68:
          case 69:
          case 70:
          case 97:
          case 98:
          case 99:
          case 100:
          case 101:
          case 102:
            X(c, yu);
            break;
          default:
            X(c, Zt);
            break
        }
      }

      function bu(c) {
        switch (c) {
          case 48:
          case 49:
          case 50:
          case 51:
          case 52:
          case 53:
          case 54:
          case 55:
          case 56:
          case 57:
            X(c, Eu);
            break;
          default:
            X(c, Zt);
            break
        }
      }

      function yu(c) {
        switch (c) {
          case 65:
          case 66:
          case 67:
          case 68:
          case 69:
          case 70:
            Me *= 16, Me += c - 55;
            break;
          case 97:
          case 98:
          case 99:
          case 100:
          case 101:
          case 102:
            Me *= 16, Me += c - 87;
            break;
          case 48:
          case 49:
          case 50:
          case 51:
          case 52:
          case 53:
          case 54:
          case 55:
          case 56:
          case 57:
            Me *= 16, Me += c - 48;
            break;
          case 59:
            R = Un;
            break;
          default:
            X(c, Un);
            break
        }
      }

      function Eu(c) {
        switch (c) {
          case 48:
          case 49:
          case 50:
          case 51:
          case 52:
          case 53:
          case 54:
          case 55:
          case 56:
          case 57:
            Me *= 10, Me += c - 48;
            break;
          case 59:
            R = Un;
            break;
          default:
            X(c, Un);
            break
        }
      }

      function Un(c) {
        Me in z ? Me = z[Me] : (Me > 1114111 || Me >= 55296 && Me < 57344) && (Me = 65533), bt(), Me <= 65535 ? Te.push(Me) : (Me = Me - 65536, Te.push(55296 + (Me >> 10)), Te.push(56320 + (Me & 1023))), X(c, Zt)
      }

      function Zt(c) {
        switch (wt) {
          case Mn:
          case In:
          case Ln:
            Ge += je(Te);
            break;
          default:
            d(B, Te);
            break
        }
        X(c, wt)
      }

      function Tu(c, u, E, D) {
        switch (c) {
          case 1:
            if (u = u.replace(zt, ""), u.length === 0) return;
            break;
          case 4:
            ge._appendChild(ge.createComment(u));
            return;
          case 5:
            var L = u, V = E, te = D;
            ge.appendChild(new r(ge, L, V, te)), Ii || L.toLowerCase() !== "html" || Y.test(V) || te && te.toLowerCase() === x || te === void 0 && w.test(V) ? ge._quirks = !0 : (T.test(V) || te !== void 0 && w.test(V)) && (ge._limitedQuirks = !0), H = Za;
            return
        }
        ge._quirks = !0, H = Za, H(c, u, E, D)
      }

      function Za(c, u, E, D) {
        var L;
        switch (c) {
          case 1:
            if (u = u.replace(zt, ""), u.length === 0) return;
            break;
          case 5:
            return;
          case 4:
            ge._appendChild(ge.createComment(u));
            return;
          case 2:
            if (u === "html") {
              L = Lr(ge, u, E), S.push(L), ge.appendChild(L), H = qn;
              return
            }
            break;
          case 3:
            switch (u) {
              case"html":
              case"head":
              case"body":
              case"br":
                break;
              default:
                return
            }
        }
        L = Lr(ge, "html", null), S.push(L), ge.appendChild(L), H = qn, H(c, u, E, D)
      }

      function qn(c, u, E, D) {
        switch (c) {
          case 1:
            if (u = u.replace(zt, ""), u.length === 0) return;
            break;
          case 5:
            return;
          case 4:
            ct(u);
            return;
          case 2:
            switch (u) {
              case"html":
                ee(c, u, E, D);
                return;
              case"head":
                var L = ie(u, E);
                Tn = L, H = Le;
                return
            }
            break;
          case 3:
            switch (u) {
              case"html":
              case"head":
              case"body":
              case"br":
                break;
              default:
                return
            }
        }
        qn(m, "head", null), H(c, u, E, D)
      }

      function Le(c, u, E, D) {
        switch (c) {
          case 1:
            var L = u.match(zt);
            if (L && (lt(L[0]), u = u.substring(L[0].length)), u.length === 0) return;
            break;
          case 4:
            ct(u);
            return;
          case 5:
            return;
          case 2:
            switch (u) {
              case"html":
                ee(c, u, E, D);
                return;
              case"meta":
              case"base":
              case"basefont":
              case"bgsound":
              case"link":
                ie(u, E), S.pop();
                return;
              case"title":
                Il(u, E);
                return;
              case"noscript":
                if (!_n) {
                  ie(u, E), H = Ja;
                  return
                }
              case"noframes":
              case"style":
                An(u, E);
                return;
              case"script":
                Rn(function (V) {
                  var te = Lr(V, u, E);
                  return te._parser_inserted = !0, te._force_async = !1, Kt && (te._already_started = !0), ur(), te
                }), R = Lt, mt = H, H = Hn;
                return;
              case"template":
                ie(u, E), le.insertMarker(), Ie = !1, H = Wi, gt.push(H);
                return;
              case"head":
                return
            }
            break;
          case 3:
            switch (u) {
              case"head":
                S.pop(), H = $i;
                return;
              case"body":
              case"html":
              case"br":
                break;
              case"template":
                if (!S.contains("template")) return;
                S.generateImpliedEndTags(null, "thorough"), S.popTag("template"), le.clearToMarker(), gt.pop(), kr();
                return;
              default:
                return
            }
            break
        }
        Le(b, "head", null), H(c, u, E, D)
      }

      function Ja(c, u, E, D) {
        switch (c) {
          case 5:
            return;
          case 4:
            Le(c, u);
            return;
          case 1:
            var L = u.match(zt);
            if (L && (Le(c, L[0]), u = u.substring(L[0].length)), u.length === 0) return;
            break;
          case 2:
            switch (u) {
              case"html":
                ee(c, u, E, D);
                return;
              case"basefont":
              case"bgsound":
              case"link":
              case"meta":
              case"noframes":
              case"style":
                Le(c, u, E);
                return;
              case"head":
              case"noscript":
                return
            }
            break;
          case 3:
            switch (u) {
              case"noscript":
                S.pop(), H = Le;
                return;
              case"br":
                break;
              default:
                return
            }
            break
        }
        Ja(b, "noscript", null), H(c, u, E, D)
      }

      function $i(c, u, E, D) {
        switch (c) {
          case 1:
            var L = u.match(zt);
            if (L && (lt(L[0]), u = u.substring(L[0].length)), u.length === 0) return;
            break;
          case 4:
            ct(u);
            return;
          case 5:
            return;
          case 2:
            switch (u) {
              case"html":
                ee(c, u, E, D);
                return;
              case"body":
                ie(u, E), Ie = !1, H = ee;
                return;
              case"frameset":
                ie(u, E), H = Ki;
                return;
              case"base":
              case"basefont":
              case"bgsound":
              case"link":
              case"meta":
              case"noframes":
              case"script":
              case"style":
              case"template":
              case"title":
                S.push(Tn), Le(m, u, E), S.removeElement(Tn);
                return;
              case"head":
                return
            }
            break;
          case 3:
            switch (u) {
              case"template":
                return Le(c, u, E, D);
              case"body":
              case"html":
              case"br":
                break;
              default:
                return
            }
            break
        }
        $i(m, "body", null), Ie = !0, H(c, u, E, D)
      }

      function ee(c, u, E, D) {
        var L, V, te, he;
        switch (c) {
          case 1:
            if (Ct && (u = u.replace(vn, ""), u.length === 0)) return;
            Ie && gn.test(u) && (Ie = !1), Ve(), lt(u);
            return;
          case 5:
            return;
          case 4:
            ct(u);
            return;
          case-1:
            if (gt.length) return Wi(c);
            Yt();
            return;
          case 2:
            switch (u) {
              case"html":
                if (S.contains("template")) return;
                Pa(E, S.elements[0]);
                return;
              case"base":
              case"basefont":
              case"bgsound":
              case"link":
              case"meta":
              case"noframes":
              case"script":
              case"style":
              case"template":
              case"title":
                Le(m, u, E);
                return;
              case"body":
                if (L = S.elements[1], !L || !(L instanceof o.HTMLBodyElement) || S.contains("template")) return;
                Ie = !1, Pa(E, L);
                return;
              case"frameset":
                if (!Ie || (L = S.elements[1], !L || !(L instanceof o.HTMLBodyElement))) return;
                for (L.parentNode && L.parentNode.removeChild(L); !(S.top instanceof o.HTMLHtmlElement);) S.pop();
                ie(u, E), H = Ki;
                return;
              case"address":
              case"article":
              case"aside":
              case"blockquote":
              case"center":
              case"details":
              case"dialog":
              case"dir":
              case"div":
              case"dl":
              case"fieldset":
              case"figcaption":
              case"figure":
              case"footer":
              case"header":
              case"hgroup":
              case"main":
              case"nav":
              case"ol":
              case"p":
              case"section":
              case"summary":
              case"ul":
                S.inButtonScope("p") && ee(b, "p"), ie(u, E);
                return;
              case"menu":
                S.inButtonScope("p") && ee(b, "p"), ye(S.top, "menuitem") && S.pop(), ie(u, E);
                return;
              case"h1":
              case"h2":
              case"h3":
              case"h4":
              case"h5":
              case"h6":
                S.inButtonScope("p") && ee(b, "p"), S.top instanceof o.HTMLHeadingElement && S.pop(), ie(u, E);
                return;
              case"pre":
              case"listing":
                S.inButtonScope("p") && ee(b, "p"), ie(u, E), Xt = !0, Ie = !1;
                return;
              case"form":
                if (vt && !S.contains("template")) return;
                S.inButtonScope("p") && ee(b, "p"), he = ie(u, E), S.contains("template") || (vt = he);
                return;
              case"li":
                for (Ie = !1, V = S.elements.length - 1; V >= 0; V--) {
                  if (te = S.elements[V], te instanceof o.HTMLLIElement) {
                    ee(b, "li");
                    break
                  }
                  if (ye(te, N) && !ye(te, y)) break
                }
                S.inButtonScope("p") && ee(b, "p"), ie(u, E);
                return;
              case"dd":
              case"dt":
                for (Ie = !1, V = S.elements.length - 1; V >= 0; V--) {
                  if (te = S.elements[V], ye(te, ce)) {
                    ee(b, te.localName);
                    break
                  }
                  if (ye(te, N) && !ye(te, y)) break
                }
                S.inButtonScope("p") && ee(b, "p"), ie(u, E);
                return;
              case"plaintext":
                S.inButtonScope("p") && ee(b, "p"), ie(u, E), R = Ui;
                return;
              case"button":
                S.inScope("button") ? (ee(b, "button"), H(c, u, E, D)) : (Ve(), ie(u, E), Ie = !1);
                return;
              case"a":
                var De = le.findElementByTag("a");
                De && (ee(b, u), le.remove(De), S.removeElement(De));
              case"b":
              case"big":
              case"code":
              case"em":
              case"font":
              case"i":
              case"s":
              case"small":
              case"strike":
              case"strong":
              case"tt":
              case"u":
                Ve(), le.push(ie(u, E), E);
                return;
              case"nobr":
                Ve(), S.inScope(u) && (ee(b, u), Ve()), le.push(ie(u, E), E);
                return;
              case"applet":
              case"marquee":
              case"object":
                Ve(), ie(u, E), le.insertMarker(), Ie = !1;
                return;
              case"table":
                !ge._quirks && S.inButtonScope("p") && ee(b, "p"), ie(u, E), Ie = !1, H = Ze;
                return;
              case"area":
              case"br":
              case"embed":
              case"img":
              case"keygen":
              case"wbr":
                Ve(), ie(u, E), S.pop(), Ie = !1;
                return;
              case"input":
                Ve(), he = ie(u, E), S.pop();
                var He = he.getAttribute("type");
                (!He || He.toLowerCase() !== "hidden") && (Ie = !1);
                return;
              case"param":
              case"source":
              case"track":
                ie(u, E), S.pop();
                return;
              case"hr":
                S.inButtonScope("p") && ee(b, "p"), ye(S.top, "menuitem") && S.pop(), ie(u, E), S.pop(), Ie = !1;
                return;
              case"image":
                ee(m, "img", E, D);
                return;
              case"textarea":
                ie(u, E), Xt = !0, Ie = !1, R = It, mt = H, H = Hn;
                return;
              case"xmp":
                S.inButtonScope("p") && ee(b, "p"), Ve(), Ie = !1, An(u, E);
                return;
              case"iframe":
                Ie = !1, An(u, E);
                return;
              case"noembed":
                An(u, E);
                return;
              case"select":
                Ve(), ie(u, E), Ie = !1, H === Ze || H === Gi || H === Jt || H === Pr || H === hr ? H = jn : H = Et;
                return;
              case"optgroup":
              case"option":
                S.top instanceof o.HTMLOptionElement && ee(b, "option"), Ve(), ie(u, E);
                return;
              case"menuitem":
                ye(S.top, "menuitem") && S.pop(), Ve(), ie(u, E);
                return;
              case"rb":
              case"rtc":
                S.inScope("ruby") && S.generateImpliedEndTags(), ie(u, E);
                return;
              case"rp":
              case"rt":
                S.inScope("ruby") && S.generateImpliedEndTags("rtc"), ie(u, E);
                return;
              case"math":
                Ve(), xa(E), Mi(E), xi(u, E, s.MATHML), D && S.pop();
                return;
              case"svg":
                Ve(), Oa(E), Mi(E), xi(u, E, s.SVG), D && S.pop();
                return;
              case"caption":
              case"col":
              case"colgroup":
              case"frame":
              case"head":
              case"tbody":
              case"td":
              case"tfoot":
              case"th":
              case"thead":
              case"tr":
                return
            }
            Ve(), ie(u, E);
            return;
          case 3:
            switch (u) {
              case"template":
                Le(b, u, E);
                return;
              case"body":
                if (!S.inScope("body")) return;
                H = eo;
                return;
              case"html":
                if (!S.inScope("body")) return;
                H = eo, H(c, u, E);
                return;
              case"address":
              case"article":
              case"aside":
              case"blockquote":
              case"button":
              case"center":
              case"details":
              case"dialog":
              case"dir":
              case"div":
              case"dl":
              case"fieldset":
              case"figcaption":
              case"figure":
              case"footer":
              case"header":
              case"hgroup":
              case"listing":
              case"main":
              case"menu":
              case"nav":
              case"ol":
              case"pre":
              case"section":
              case"summary":
              case"ul":
                if (!S.inScope(u)) return;
                S.generateImpliedEndTags(), S.popTag(u);
                return;
              case"form":
                if (S.contains("template")) {
                  if (!S.inScope("form")) return;
                  S.generateImpliedEndTags(), S.popTag("form")
                } else {
                  var Je = vt;
                  if (vt = null, !Je || !S.elementInScope(Je)) return;
                  S.generateImpliedEndTags(), S.removeElement(Je)
                }
                return;
              case"p":
                S.inButtonScope(u) ? (S.generateImpliedEndTags(u), S.popTag(u)) : (ee(m, u, null), H(c, u, E, D));
                return;
              case"li":
                if (!S.inListItemScope(u)) return;
                S.generateImpliedEndTags(u), S.popTag(u);
                return;
              case"dd":
              case"dt":
                if (!S.inScope(u)) return;
                S.generateImpliedEndTags(u), S.popTag(u);
                return;
              case"h1":
              case"h2":
              case"h3":
              case"h4":
              case"h5":
              case"h6":
                if (!S.elementTypeInScope(o.HTMLHeadingElement)) return;
                S.generateImpliedEndTags(), S.popElementType(o.HTMLHeadingElement);
                return;
              case"sarcasm":
                break;
              case"a":
              case"b":
              case"big":
              case"code":
              case"em":
              case"font":
              case"i":
              case"nobr":
              case"s":
              case"small":
              case"strike":
              case"strong":
              case"tt":
              case"u":
                var at = Ll(u);
                if (at) return;
                break;
              case"applet":
              case"marquee":
              case"object":
                if (!S.inScope(u)) return;
                S.generateImpliedEndTags(), S.popTag(u), le.clearToMarker();
                return;
              case"br":
                ee(m, u, null);
                return
            }
            for (V = S.elements.length - 1; V >= 0; V--) if (te = S.elements[V], ye(te, u)) {
              S.generateImpliedEndTags(u), S.popElement(te);
              break
            } else if (ye(te, N)) return;
            return
        }
      }

      function Hn(c, u, E, D) {
        switch (c) {
          case 1:
            lt(u);
            return;
          case-1:
            S.top instanceof o.HTMLScriptElement && (S.top._already_started = !0), S.pop(), H = mt, H(c);
            return;
          case 3:
            u === "script" ? kl() : (S.pop(), H = mt);
            return;
          default:
            return
        }
      }

      function Ze(c, u, E, D) {
        function L(te) {
          for (var he = 0, De = te.length; he < De; he++) if (te[he][0] === "type") return te[he][1].toLowerCase();
          return null
        }

        switch (c) {
          case 1:
            if (Li) {
              ee(c, u, E, D);
              return
            } else if (ye(S.top, de)) {
              wn = [], mt = H, H = _u, H(c, u, E, D);
              return
            }
            break;
          case 4:
            ct(u);
            return;
          case 5:
            return;
          case 2:
            switch (u) {
              case"caption":
                S.clearToContext(A), le.insertMarker(), ie(u, E), H = Gi;
                return;
              case"colgroup":
                S.clearToContext(A), ie(u, E), H = Fn;
                return;
              case"col":
                Ze(m, "colgroup", null), H(c, u, E, D);
                return;
              case"tbody":
              case"tfoot":
              case"thead":
                S.clearToContext(A), ie(u, E), H = Jt;
                return;
              case"td":
              case"th":
              case"tr":
                Ze(m, "tbody", null), H(c, u, E, D);
                return;
              case"table":
                if (!S.inTableScope(u)) return;
                Ze(b, u), H(c, u, E, D);
                return;
              case"style":
              case"script":
              case"template":
                Le(c, u, E, D);
                return;
              case"input":
                var V = L(E);
                if (V !== "hidden") break;
                ie(u, E), S.pop();
                return;
              case"form":
                if (vt || S.contains("template")) return;
                vt = ie(u, E), S.popElement(vt);
                return
            }
            break;
          case 3:
            switch (u) {
              case"table":
                if (!S.inTableScope(u)) return;
                S.popTag(u), kr();
                return;
              case"body":
              case"caption":
              case"col":
              case"colgroup":
              case"html":
              case"tbody":
              case"td":
              case"tfoot":
              case"th":
              case"thead":
              case"tr":
                return;
              case"template":
                Le(c, u, E, D);
                return
            }
            break;
          case-1:
            ee(c, u, E, D);
            return
        }
        Mt = !0, ee(c, u, E, D), Mt = !1
      }

      function _u(c, u, E, D) {
        if (c === g) {
          if (Ct && (u = u.replace(vn, ""), u.length === 0)) return;
          wn.push(u)
        } else {
          var L = wn.join("");
          wn.length = 0, gn.test(L) ? (Mt = !0, ee(g, L), Mt = !1) : lt(L), H = mt, H(c, u, E, D)
        }
      }

      function Gi(c, u, E, D) {
        function L() {
          return S.inTableScope("caption") ? (S.generateImpliedEndTags(), S.popTag("caption"), le.clearToMarker(), H = Ze, !0) : !1
        }

        switch (c) {
          case 2:
            switch (u) {
              case"caption":
              case"col":
              case"colgroup":
              case"tbody":
              case"td":
              case"tfoot":
              case"th":
              case"thead":
              case"tr":
                L() && H(c, u, E, D);
                return
            }
            break;
          case 3:
            switch (u) {
              case"caption":
                L();
                return;
              case"table":
                L() && H(c, u, E, D);
                return;
              case"body":
              case"col":
              case"colgroup":
              case"html":
              case"tbody":
              case"td":
              case"tfoot":
              case"th":
              case"thead":
              case"tr":
                return
            }
            break
        }
        ee(c, u, E, D)
      }

      function Fn(c, u, E, D) {
        switch (c) {
          case 1:
            var L = u.match(zt);
            if (L && (lt(L[0]), u = u.substring(L[0].length)), u.length === 0) return;
            break;
          case 4:
            ct(u);
            return;
          case 5:
            return;
          case 2:
            switch (u) {
              case"html":
                ee(c, u, E, D);
                return;
              case"col":
                ie(u, E), S.pop();
                return;
              case"template":
                Le(c, u, E, D);
                return
            }
            break;
          case 3:
            switch (u) {
              case"colgroup":
                if (!ye(S.top, "colgroup")) return;
                S.pop(), H = Ze;
                return;
              case"col":
                return;
              case"template":
                Le(c, u, E, D);
                return
            }
            break;
          case-1:
            ee(c, u, E, D);
            return
        }
        ye(S.top, "colgroup") && (Fn(b, "colgroup"), H(c, u, E, D))
      }

      function Jt(c, u, E, D) {
        function L() {
          !S.inTableScope("tbody") && !S.inTableScope("thead") && !S.inTableScope("tfoot") || (S.clearToContext(P), Jt(b, S.top.localName, null), H(c, u, E, D))
        }

        switch (c) {
          case 2:
            switch (u) {
              case"tr":
                S.clearToContext(P), ie(u, E), H = Pr;
                return;
              case"th":
              case"td":
                Jt(m, "tr", null), H(c, u, E, D);
                return;
              case"caption":
              case"col":
              case"colgroup":
              case"tbody":
              case"tfoot":
              case"thead":
                L();
                return
            }
            break;
          case 3:
            switch (u) {
              case"table":
                L();
                return;
              case"tbody":
              case"tfoot":
              case"thead":
                S.inTableScope(u) && (S.clearToContext(P), S.pop(), H = Ze);
                return;
              case"body":
              case"caption":
              case"col":
              case"colgroup":
              case"html":
              case"td":
              case"th":
              case"tr":
                return
            }
            break
        }
        Ze(c, u, E, D)
      }

      function Pr(c, u, E, D) {
        function L() {
          return S.inTableScope("tr") ? (S.clearToContext(K), S.pop(), H = Jt, !0) : !1
        }

        switch (c) {
          case 2:
            switch (u) {
              case"th":
              case"td":
                S.clearToContext(K), ie(u, E), H = hr, le.insertMarker();
                return;
              case"caption":
              case"col":
              case"colgroup":
              case"tbody":
              case"tfoot":
              case"thead":
              case"tr":
                L() && H(c, u, E, D);
                return
            }
            break;
          case 3:
            switch (u) {
              case"tr":
                L();
                return;
              case"table":
                L() && H(c, u, E, D);
                return;
              case"tbody":
              case"tfoot":
              case"thead":
                S.inTableScope(u) && L() && H(c, u, E, D);
                return;
              case"body":
              case"caption":
              case"col":
              case"colgroup":
              case"html":
              case"td":
              case"th":
                return
            }
            break
        }
        Ze(c, u, E, D)
      }

      function hr(c, u, E, D) {
        switch (c) {
          case 2:
            switch (u) {
              case"caption":
              case"col":
              case"colgroup":
              case"tbody":
              case"td":
              case"tfoot":
              case"th":
              case"thead":
              case"tr":
                S.inTableScope("td") ? (hr(b, "td"), H(c, u, E, D)) : S.inTableScope("th") && (hr(b, "th"), H(c, u, E, D));
                return
            }
            break;
          case 3:
            switch (u) {
              case"td":
              case"th":
                if (!S.inTableScope(u)) return;
                S.generateImpliedEndTags(), S.popTag(u), le.clearToMarker(), H = Pr;
                return;
              case"body":
              case"caption":
              case"col":
              case"colgroup":
              case"html":
                return;
              case"table":
              case"tbody":
              case"tfoot":
              case"thead":
              case"tr":
                if (!S.inTableScope(u)) return;
                hr(b, S.inTableScope("td") ? "td" : "th"), H(c, u, E, D);
                return
            }
            break
        }
        ee(c, u, E, D)
      }

      function Et(c, u, E, D) {
        switch (c) {
          case 1:
            if (Ct && (u = u.replace(vn, ""), u.length === 0)) return;
            lt(u);
            return;
          case 4:
            ct(u);
            return;
          case 5:
            return;
          case-1:
            ee(c, u, E, D);
            return;
          case 2:
            switch (u) {
              case"html":
                ee(c, u, E, D);
                return;
              case"option":
                S.top instanceof o.HTMLOptionElement && Et(b, u), ie(u, E);
                return;
              case"optgroup":
                S.top instanceof o.HTMLOptionElement && Et(b, "option"), S.top instanceof o.HTMLOptGroupElement && Et(b, u), ie(u, E);
                return;
              case"select":
                Et(b, u);
                return;
              case"input":
              case"keygen":
              case"textarea":
                if (!S.inSelectScope("select")) return;
                Et(b, "select"), H(c, u, E, D);
                return;
              case"script":
              case"template":
                Le(c, u, E, D);
                return
            }
            break;
          case 3:
            switch (u) {
              case"optgroup":
                S.top instanceof o.HTMLOptionElement && S.elements[S.elements.length - 2] instanceof o.HTMLOptGroupElement && Et(b, "option"), S.top instanceof o.HTMLOptGroupElement && S.pop();
                return;
              case"option":
                S.top instanceof o.HTMLOptionElement && S.pop();
                return;
              case"select":
                if (!S.inSelectScope(u)) return;
                S.popTag(u), kr();
                return;
              case"template":
                Le(c, u, E, D);
                return
            }
            break
        }
      }

      function jn(c, u, E, D) {
        switch (u) {
          case"caption":
          case"table":
          case"tbody":
          case"tfoot":
          case"thead":
          case"tr":
          case"td":
          case"th":
            switch (c) {
              case 2:
                jn(b, "select"), H(c, u, E, D);
                return;
              case 3:
                S.inTableScope(u) && (jn(b, "select"), H(c, u, E, D));
                return
            }
        }
        Et(c, u, E, D)
      }

      function Wi(c, u, E, D) {
        function L(V) {
          H = V, gt[gt.length - 1] = H, H(c, u, E, D)
        }

        switch (c) {
          case 1:
          case 4:
          case 5:
            ee(c, u, E, D);
            return;
          case-1:
            S.contains("template") ? (S.popTag("template"), le.clearToMarker(), gt.pop(), kr(), H(c, u, E, D)) : Yt();
            return;
          case 2:
            switch (u) {
              case"base":
              case"basefont":
              case"bgsound":
              case"link":
              case"meta":
              case"noframes":
              case"script":
              case"style":
              case"template":
              case"title":
                Le(c, u, E, D);
                return;
              case"caption":
              case"colgroup":
              case"tbody":
              case"tfoot":
              case"thead":
                L(Ze);
                return;
              case"col":
                L(Fn);
                return;
              case"tr":
                L(Jt);
                return;
              case"td":
              case"th":
                L(Pr);
                return
            }
            L(ee);
            return;
          case 3:
            switch (u) {
              case"template":
                Le(c, u, E, D);
                return;
              default:
                return
            }
        }
      }

      function eo(c, u, E, D) {
        switch (c) {
          case 1:
            if (gn.test(u)) break;
            ee(c, u);
            return;
          case 4:
            S.elements[0]._appendChild(ge.createComment(u));
            return;
          case 5:
            return;
          case-1:
            Yt();
            return;
          case 2:
            if (u === "html") {
              ee(c, u, E, D);
              return
            }
            break;
          case 3:
            if (u === "html") {
              if (Kt) return;
              H = Su;
              return
            }
            break
        }
        H = ee, H(c, u, E, D)
      }

      function Ki(c, u, E, D) {
        switch (c) {
          case 1:
            u = u.replace(Di, ""), u.length > 0 && lt(u);
            return;
          case 4:
            ct(u);
            return;
          case 5:
            return;
          case-1:
            Yt();
            return;
          case 2:
            switch (u) {
              case"html":
                ee(c, u, E, D);
                return;
              case"frameset":
                ie(u, E);
                return;
              case"frame":
                ie(u, E), S.pop();
                return;
              case"noframes":
                Le(c, u, E, D);
                return
            }
            break;
          case 3:
            if (u === "frameset") {
              if (Kt && S.top instanceof o.HTMLHtmlElement) return;
              S.pop(), !Kt && !(S.top instanceof o.HTMLFrameSetElement) && (H = wu);
              return
            }
            break
        }
      }

      function wu(c, u, E, D) {
        switch (c) {
          case 1:
            u = u.replace(Di, ""), u.length > 0 && lt(u);
            return;
          case 4:
            ct(u);
            return;
          case 5:
            return;
          case-1:
            Yt();
            return;
          case 2:
            switch (u) {
              case"html":
                ee(c, u, E, D);
                return;
              case"noframes":
                Le(c, u, E, D);
                return
            }
            break;
          case 3:
            if (u === "html") {
              H = Nu;
              return
            }
            break
        }
      }

      function Su(c, u, E, D) {
        switch (c) {
          case 1:
            if (gn.test(u)) break;
            ee(c, u, E, D);
            return;
          case 4:
            ge._appendChild(ge.createComment(u));
            return;
          case 5:
            ee(c, u, E, D);
            return;
          case-1:
            Yt();
            return;
          case 2:
            if (u === "html") {
              ee(c, u, E, D);
              return
            }
            break
        }
        H = ee, H(c, u, E, D)
      }

      function Nu(c, u, E, D) {
        switch (c) {
          case 1:
            u = u.replace(Di, ""), u.length > 0 && ee(c, u, E, D);
            return;
          case 4:
            ge._appendChild(ge.createComment(u));
            return;
          case 5:
            ee(c, u, E, D);
            return;
          case-1:
            Yt();
            return;
          case 2:
            switch (u) {
              case"html":
                ee(c, u, E, D);
                return;
              case"noframes":
                Le(c, u, E, D);
                return
            }
            break
        }
      }

      function to(c, u, E, D) {
        function L(De) {
          for (var He = 0, Je = De.length; He < Je; He++) switch (De[He][0]) {
            case"color":
            case"face":
            case"size":
              return !0
          }
          return !1
        }

        var V;
        switch (c) {
          case 1:
            Ie && _l.test(u) && (Ie = !1), Ct && (u = u.replace(vn, "\uFFFD")), lt(u);
            return;
          case 4:
            ct(u);
            return;
          case 5:
            return;
          case 2:
            switch (u) {
              case"font":
                if (!L(E)) break;
              case"b":
              case"big":
              case"blockquote":
              case"body":
              case"br":
              case"center":
              case"code":
              case"dd":
              case"div":
              case"dl":
              case"dt":
              case"em":
              case"embed":
              case"h1":
              case"h2":
              case"h3":
              case"h4":
              case"h5":
              case"h6":
              case"head":
              case"hr":
              case"i":
              case"img":
              case"li":
              case"listing":
              case"menu":
              case"meta":
              case"nobr":
              case"ol":
              case"p":
              case"pre":
              case"ruby":
              case"s":
              case"small":
              case"span":
              case"strong":
              case"strike":
              case"sub":
              case"sup":
              case"table":
              case"tt":
              case"u":
              case"ul":
              case"var":
                if (Kt) break;
                do S.pop(), V = S.top; while (V.namespaceURI !== s.HTML && !La(V) && !ka(V));
                ke(c, u, E, D);
                return
            }
            V = S.elements.length === 1 && Kt ? F : S.top, V.namespaceURI === s.MATHML ? xa(E) : V.namespaceURI === s.SVG && (u = Sl(u), Oa(E)), Mi(E), xi(u, E, V.namespaceURI), D && (u === "script" && (V.namespaceURI, s.SVG), S.pop());
            return;
          case 3:
            if (V = S.top, u === "script" && V.namespaceURI === s.SVG && V.localName === "script") S.pop(); else for (var te = S.elements.length - 1, he = S.elements[te]; ;) {
              if (he.localName.toLowerCase() === u) {
                S.popElement(he);
                break
              }
              if (he = S.elements[--te], he.namespaceURI === s.HTML) {
                H(c, u, E, D);
                break
              }
            }
            return
        }
      }

      return Sn.testTokenizer = function (c, u, E, D) {
        var L = [];
        switch (u) {
          case"PCDATA state":
            R = ue;
            break;
          case"RCDATA state":
            R = It;
            break;
          case"RAWTEXT state":
            R = Or;
            break;
          case"PLAINTEXT state":
            R = Ui;
            break
        }
        if (E && (yn = E), ke = function (te, he, De, He) {
          switch (ur(), te) {
            case 1:
              L.length > 0 && L[L.length - 1][0] === "Character" ? L[L.length - 1][1] += he : L.push(["Character", he]);
              break;
            case 4:
              L.push(["Comment", he]);
              break;
            case 5:
              L.push(["DOCTYPE", he, De === void 0 ? null : De, He === void 0 ? null : He, !Ii]);
              break;
            case 2:
              for (var Je = Object.create(null), at = 0; at < De.length; at++) {
                var er = De[at];
                er.length === 1 ? Je[er[0]] = "" : Je[er[0]] = er[1]
              }
              var Pt = ["StartTag", he, Je];
              He && Pt.push(!0), L.push(Pt);
              break;
            case 3:
              L.push(["EndTag", he]);
              break;
            case-1:
              break
          }
        }, !D) this.parse(c, !0); else {
          for (var V = 0; V < c.length; V++) this.parse(c[V]);
          this.parse("", !0)
        }
        return L
      }, Sn
    }
  }
}), hi = Z({
  "external/npm/node_modules/domino/lib/DOMImplementation.js"(t, e) {
    "use strict";
    e.exports = o;
    var i = Fs(), r = js(), n = Bs(), s = Oe(), a = Os();

    function o(l) {
      this.contextObject = l
    }

    var d = {
      xml: {"": !0, "1.0": !0, "2.0": !0},
      core: {"": !0, "2.0": !0},
      html: {"": !0, "1.0": !0, "2.0": !0},
      xhtml: {"": !0, "1.0": !0, "2.0": !0}
    };
    o.prototype = {
      hasFeature: function (g, m) {
        var b = d[(g || "").toLowerCase()];
        return b && b[m || ""] || !1
      }, createDocumentType: function (g, m, b) {
        return a.isValidQName(g) || s.InvalidCharacterError(), new r(this.contextObject, g, m, b)
      }, createDocument: function (g, m, b) {
        var I = new i(!1, null), U;
        return m ? U = I.createElementNS(g, m) : U = null, b && I.appendChild(b), U && I.appendChild(U), g === s.NAMESPACE.HTML ? I._contentType = "application/xhtml+xml" : g === s.NAMESPACE.SVG ? I._contentType = "image/svg+xml" : I._contentType = "application/xml", I
      }, createHTMLDocument: function (g) {
        var m = new i(!0, null);
        m.appendChild(new r(m, "html"));
        var b = m.createElement("html");
        m.appendChild(b);
        var I = m.createElement("head");
        if (b.appendChild(I), g !== void 0) {
          var U = m.createElement("title");
          I.appendChild(U), U.appendChild(m.createTextNode(g))
        }
        return b.appendChild(m.createElement("body")), m.modclock = 1, m
      }, mozSetOutputMutationHandler: function (l, g) {
        l.mutationHandler = g
      }, mozGetInputMutationHandler: function (l) {
        s.nyi()
      }, mozHTMLParser: n
    }
  }
}), mh = Z({
  "external/npm/node_modules/domino/lib/Location.js"(t, e) {
    "use strict";
    var i = Us(), r = _c();
    e.exports = n;

    function n(s, a) {
      this._window = s, this._href = a
    }

    n.prototype = Object.create(r.prototype, {
      constructor: {value: n}, href: {
        get: function () {
          return this._href
        }, set: function (s) {
          this.assign(s)
        }
      }, assign: {
        value: function (s) {
          var a = new i(this._href), o = a.resolve(s);
          this._href = o
        }
      }, replace: {
        value: function (s) {
          this.assign(s)
        }
      }, reload: {
        value: function () {
          this.assign(this.href)
        }
      }, toString: {
        value: function () {
          return this.href
        }
      }
    })
  }
}), gh = Z({
  "external/npm/node_modules/domino/lib/NavigatorID.js"(t, e) {
    "use strict";
    var i = Object.create(null, {
      appCodeName: {value: "Mozilla"},
      appName: {value: "Netscape"},
      appVersion: {value: "4.0"},
      platform: {value: ""},
      product: {value: "Gecko"},
      productSub: {value: "20100101"},
      userAgent: {value: ""},
      vendor: {value: ""},
      vendorSub: {value: ""},
      taintEnabled: {
        value: function () {
          return !1
        }
      }
    });
    e.exports = i
  }
}), vh = Z({
  "external/npm/node_modules/domino/lib/WindowTimers.js"(t, e) {
    "use strict";
    var i = {setTimeout, clearTimeout, setInterval, clearInterval};
    e.exports = i
  }
}), Nc = Z({
  "external/npm/node_modules/domino/lib/impl.js"(t, e) {
    "use strict";
    var i = Oe();
    t = e.exports = {
      CSSStyleDeclaration: qs(),
      CharacterData: li(),
      Comment: vc(),
      DOMException: Is(),
      DOMImplementation: hi(),
      DOMTokenList: dc(),
      Document: Fs(),
      DocumentFragment: bc(),
      DocumentType: js(),
      Element: Qr(),
      HTMLParser: Bs(),
      NamedNodeMap: pc(),
      Node: Be(),
      NodeList: br(),
      NodeFilter: ui(),
      ProcessingInstruction: yc(),
      Text: gc(),
      Window: Rc()
    }, i.merge(t, Tc()), i.merge(t, Hs().elements), i.merge(t, Sc().elements)
  }
}), Rc = Z({
  "external/npm/node_modules/domino/lib/Window.js"(t, e) {
    "use strict";
    var i = hi(), r = cc(), n = mh(), s = Oe();
    e.exports = a;

    function a(o) {
      this.document = o || new i(null).createHTMLDocument(""), this.document._scripting_enabled = !0, this.document.defaultView = this, this.location = new n(this, this.document._address || "about:blank")
    }

    a.prototype = Object.create(r.prototype, {
      console: {value: console},
      history: {value: {back: s.nyi, forward: s.nyi, go: s.nyi}},
      navigator: {value: gh()},
      window: {
        get: function () {
          return this
        }
      },
      self: {
        get: function () {
          return this
        }
      },
      frames: {
        get: function () {
          return this
        }
      },
      parent: {
        get: function () {
          return this
        }
      },
      top: {
        get: function () {
          return this
        }
      },
      length: {value: 0},
      frameElement: {value: null},
      opener: {value: null},
      onload: {
        get: function () {
          return this._getEventHandler("load")
        }, set: function (o) {
          this._setEventHandler("load", o)
        }
      },
      getComputedStyle: {
        value: function (d) {
          return d.style
        }
      }
    }), s.expose(vh(), a), s.expose(Nc(), a)
  }
}), bh = Z({
  "external/npm/node_modules/domino/lib/index.js"(t) {
    var e = hi(), i = Bs(), r = Rc(), n = Nc();
    t.createDOMImplementation = function () {
      return new e(null)
    }, t.createDocument = function (s, a) {
      if (s || a) {
        var o = new i;
        return o.parse(s || "", !0), o.document()
      }
      return new e(null).createHTMLDocument("")
    }, t.createIncrementalHTMLParser = function () {
      var s = new i;
      return {
        write: function (a) {
          a.length > 0 && s.parse(a, !1, function () {
            return !0
          })
        }, end: function (a) {
          s.parse(a || "", !0, function () {
            return !0
          })
        }, process: function (a) {
          return s.parse("", !1, a)
        }, document: function () {
          return s.document()
        }
      }
    }, t.createWindow = function (s, a) {
      var o = t.createDocument(s);
      return a !== void 0 && (o._address = a), new n.Window(o)
    }, t.impl = n
  }
}), ci = bh();

function yh() {
  Object.assign(globalThis, ci.impl), globalThis.KeyboardEvent = ci.impl.Event
}

function Cc(t, e = "/") {
  return ci.createWindow(t, e).document
}

function Eh(t) {
  return t.serialize()
}

var Ms = class t extends Gr {
  constructor() {
    super(...arguments), this.supportsDOMEvents = !1
  }

  static makeCurrent() {
    yh(), Qn(new t)
  }

  createHtmlDocument() {
    return Cc("<html><head><title>fakeTitle</title></head><body></body></html>")
  }

  getDefaultDocument() {
    return t.defaultDoc || (t.defaultDoc = ci.createDocument()), t.defaultDoc
  }

  isElementNode(e) {
    return e ? e.nodeType === t.defaultDoc.ELEMENT_NODE : !1
  }

  isShadowRoot(e) {
    return e.shadowRoot == e
  }

  getGlobalEventTarget(e, i) {
    return i === "window" ? e.defaultView : i === "document" ? e : i === "body" ? e.body : null
  }

  getBaseHref(e) {
    return e.documentElement.querySelector("base")?.getAttribute("href") || ""
  }

  dispatchEvent(e, i) {
    e.dispatchEvent(i);
    let n = (e.ownerDocument || e).defaultView;
    n && n.dispatchEvent(i)
  }

  getUserAgent() {
    return "Fake user agent"
  }

  getCookie(e) {
    throw new Error("getCookie has not been implemented")
  }
}, Ac = (() => {
  let e = class e {
    constructor(r) {
      this._doc = r
    }

    renderToString() {
      return Eh(this._doc)
    }

    getDocument() {
      return this._doc
    }
  };
  e.\u0275fac = function (n) {
    return new (n || e)(Se(xe))
  }, e.\u0275prov = we({token: e, factory: e.\u0275fac});
  let t = e;
  return t
})(), Th = (() => {
  let e = class e {
    \u0275loadImpl() {
      return dr(this, null, function* () {
        if (!this.xhrImpl) {
          let {default: r} = yield import("./chunk-O73ZHKXN.mjs");
          this.xhrImpl = r
        }
      })
    }

    build() {
      let r = this.xhrImpl;
      if (!r) throw new Error("Unexpected state in ServerXhr: XHR implementation is not loaded.");
      return new r.XMLHttpRequest
    }
  };
  e.\u0275fac = function (n) {
    return new (n || e)
  }, e.\u0275prov = we({token: e, factory: e.\u0275fac});
  let t = e;
  return t
})();

function _h(t, e) {
  let i = ne(ms), {href: r, protocol: n, hostname: s, port: a} = i;
  if (!n.startsWith("http")) return e(t);
  let o = `${n}//${s}`;
  a && (o += `:${a}`);
  let d = i.getBaseHrefFromDOM() || r, l = new URL(d, o), g = new URL(t.url, l).toString();
  return e(t.clone({url: g}))
}

var wh = [{provide: Jn, useClass: Th}, {provide: ys, useValue: _h, multi: !0}], di = new Ue("Server.INITIAL_CONFIG"),
  Dc = new Ue("Server.RENDER_MODULE_HOOK"), oi = "resolve:";

function Ds(t) {
  let {hostname: e, protocol: i, port: r, pathname: n, search: s, hash: a} = new URL(t, oi + "//");
  return i !== oi && r === "" && /\:(80|443)/.test(t) && (r = i === "http:" ? "80" : "443"), i === oi && t.charAt(0) !== "/" && (n = n.slice(1)), {
    hostname: e,
    protocol: i === oi ? "" : i,
    port: r,
    pathname: n,
    search: s,
    hash: a
  }
}

var Sh = (() => {
  let e = class e {
    constructor(r, n) {
      this._doc = r, this.href = "/", this.hostname = "/", this.protocol = "/", this.port = "/", this.pathname = "/", this.search = "", this.hash = "", this._hashUpdate = new Tt;
      let s = n;
      if (s) {
        if (s.url) {
          let a = Ds(s.url);
          this.protocol = a.protocol, this.hostname = a.hostname, this.port = a.port, this.pathname = a.pathname, this.search = a.search, this.hash = a.hash, this.href = r.location.href
        }
        if (s.useAbsoluteUrl) {
          if (!s.baseUrl) throw new Error('"PlatformConfig.baseUrl" must be set if "useAbsoluteUrl" is true');
          let a = Ds(s.baseUrl);
          this.protocol = a.protocol, this.hostname = a.hostname, this.port = a.port
        }
      }
    }

    get url() {
      return `${this.pathname}${this.search}${this.hash}`
    }

    getBaseHrefFromDOM() {
      return ir().getBaseHref(this._doc)
    }

    onPopState(r) {
      return () => {
      }
    }

    onHashChange(r) {
      let n = this._hashUpdate.subscribe(r);
      return () => n.unsubscribe()
    }

    setHash(r, n) {
      if (this.hash === r) return;
      this.hash = r;
      let s = this.url;
      queueMicrotask(() => this._hashUpdate.next({type: "hashchange", state: null, oldUrl: n, newUrl: s}))
    }

    replaceState(r, n, s) {
      let a = this.url, o = Ds(s);
      this.pathname = o.pathname, this.search = o.search, this.setHash(o.hash, a)
    }

    pushState(r, n, s) {
      this.replaceState(r, n, s)
    }

    forward() {
      throw new Error("Not implemented")
    }

    back() {
      throw new Error("Not implemented")
    }

    getState() {
    }
  };
  e.\u0275fac = function (n) {
    return new (n || e)(Se(xe), Se(di, 8))
  }, e.\u0275prov = we({token: e, factory: e.\u0275fac});
  let t = e;
  return t
})(), Nh = (() => {
  let e = class e extends vr {
    constructor(r) {
      super(r), this.doc = r
    }

    supports(r) {
      return !0
    }

    addEventListener(r, n, s) {
      return ir().onAndCancel(r, n, s)
    }
  };
  e.\u0275fac = function (n) {
    return new (n || e)(Se(xe))
  }, e.\u0275prov = we({token: e, factory: e.\u0275fac});
  let t = e;
  return t
})(), Rh = [{provide: Dc, useFactory: Ch, deps: [xe, Br, gr], multi: !0}];

function Ch(t, e, i) {
  return () => {
    let r = i.toJson();
    if (i.isEmpty) return;
    let n = t.createElement("script");
    n.id = e + "-state", n.setAttribute("type", "application/json"), n.textContent = r, t.body.appendChild(n)
  }
}

var Ah = [{provide: xe, useFactory: Lh, deps: [zn]}, {provide: Ft, useValue: xo}, {
  provide: Gn,
  useFactory: Dh,
  multi: !0
}, {provide: ms, useClass: Sh, deps: [xe, [Bn, di]]}, {provide: Ac, deps: [xe]}, {provide: Ao, useValue: !0}];

function Dh() {
  return () => {
    Ms.makeCurrent()
  }
}

var Mh = [{provide: Wr, multi: !0, useClass: Nh}],
  Ih = [Rh, Mh, wh, {provide: us, useValue: null}, {provide: ls, useValue: null}, {provide: vs, useClass: Po}];

function Lh(t) {
  let e = t.get(di, null), i;
  return e && e.document ? i = typeof e.document == "string" ? Cc(e.document, e.url) : e.document : i = ir().createHtmlDocument(), $n(i), i
}

var kh = ds(ps, "server", Ah);

function Up() {
  return rr([sc(), ...Ih])
}

function Mc(t) {
  let e = t.platformProviders ?? [];
  return kh([{provide: di, useValue: {document: t.document, url: t.url}}, e])
}

function Oh(t) {
  let e = t.createComment(yo);
  t.body.firstChild ? t.body.insertBefore(e, t.body.firstChild) : t.body.append(e)
}

function xh(t) {
  let e = t.injector, i = Uh(e.get(Ph, Lc));
  t.components.forEach(r => {
    let n = r.injector.get(as), s = r.location.nativeElement;
    s && n.setAttribute(s, "ng-server-context", i)
  })
}

function Ic(t, e) {
  return dr(this, null, function* () {
    let i = e.injector;
    yield Yn(e);
    let r = t.injector.get(Ac);
    if (e.injector.get(Eo, !1)) {
      let a = r.getDocument();
      Oh(a), Io(e, a)
    }
    let n = i.get(Dc, null);
    if (n) {
      let a = [];
      for (let o of n) try {
        let d = o();
        d && a.push(d)
      } catch (d) {
        console.warn("Ignoring BEFORE_APP_SERIALIZED Exception: ", d)
      }
      if (a.length) for (let o of yield Promise.allSettled(a)) o.status === "rejected" && console.warn("Ignoring BEFORE_APP_SERIALIZED Exception: ", o.reason)
    }
    xh(e);
    let s = r.renderToString();
    return yield new Promise(a => {
      setTimeout(() => {
        t.destroy(), a()
      }, 0)
    }), s
  })
}

var Lc = "other", Ph = new Ue("SERVER_CONTEXT");

function Uh(t) {
  let e = t.replace(/[^a-zA-Z0-9\-]/g, "");
  return e.length > 0 ? e : Lc
}

function qp(t, e) {
  return dr(this, null, function* () {
    let {document: i, url: r, extraProviders: n} = e, s = Mc({document: i, url: r, platformProviders: n}),
      o = (yield s.bootstrapModule(t)).injector.get(nr);
    return Ic(s, o)
  })
}

function Hp(t, e) {
  return dr(this, null, function* () {
    let i = Mc(e), r = yield t();
    return Ic(i, r)
  })
}

var oe = "primary", fn = Symbol("RouteTitle"), Ws = class {
  constructor(e) {
    this.params = e || {}
  }

  get keys() {
    return Object.keys(this.params)
  }

  has(e) {
    return Object.prototype.hasOwnProperty.call(this.params, e)
  }

  get(e) {
    if (this.has(e)) {
      let i = this.params[e];
      return Array.isArray(i) ? i[0] : i
    }
    return null
  }

  getAll(e) {
    if (this.has(e)) {
      let i = this.params[e];
      return Array.isArray(i) ? i : [i]
    }
    return []
  }
};

function wr(t) {
  return new Ws(t)
}

function qh(t, e, i) {
  let r = i.path.split("/");
  if (r.length > t.length || i.pathMatch === "full" && (e.hasChildren() || r.length < t.length)) return null;
  let n = {};
  for (let s = 0; s < r.length; s++) {
    let a = r[s], o = t[s];
    if (a.startsWith(":")) n[a.substring(1)] = o; else if (a !== o.path) return null
  }
  return {consumed: t.slice(0, r.length), posParams: n}
}

function Hh(t, e) {
  if (t.length !== e.length) return !1;
  for (let i = 0; i < t.length; ++i) if (!dt(t[i], e[i])) return !1;
  return !0
}

function dt(t, e) {
  let i = t ? Ks(t) : void 0, r = e ? Ks(e) : void 0;
  if (!i || !r || i.length != r.length) return !1;
  let n;
  for (let s = 0; s < i.length; s++) if (n = i[s], !qc(t[n], e[n])) return !1;
  return !0
}

function Ks(t) {
  return [...Object.keys(t), ...Object.getOwnPropertySymbols(t)]
}

function qc(t, e) {
  if (Array.isArray(t) && Array.isArray(e)) {
    if (t.length !== e.length) return !1;
    let i = [...t].sort(), r = [...e].sort();
    return i.every((n, s) => r[s] === n)
  } else return t === e
}

function Hc(t) {
  return t.length > 0 ? t[t.length - 1] : null
}

function Vt(t) {
  return so(t) ? t : Co(t) ? tt(Promise.resolve(t)) : se(t)
}

var Fh = {exact: jc, subset: Bc}, Fc = {exact: jh, subset: Bh, ignored: () => !0};

function kc(t, e, i) {
  return Fh[i.paths](t.root, e.root, i.matrixParams) && Fc[i.queryParams](t.queryParams, e.queryParams) && !(i.fragment === "exact" && t.fragment !== e.fragment)
}

function jh(t, e) {
  return dt(t, e)
}

function jc(t, e, i) {
  if (!ar(t.segments, e.segments) || !mi(t.segments, e.segments, i) || t.numberOfChildren !== e.numberOfChildren) return !1;
  for (let r in e.children) if (!t.children[r] || !jc(t.children[r], e.children[r], i)) return !1;
  return !0
}

function Bh(t, e) {
  return Object.keys(e).length <= Object.keys(t).length && Object.keys(e).every(i => qc(t[i], e[i]))
}

function Bc(t, e, i) {
  return Vc(t, e, e.segments, i)
}

function Vc(t, e, i, r) {
  if (t.segments.length > i.length) {
    let n = t.segments.slice(0, i.length);
    return !(!ar(n, i) || e.hasChildren() || !mi(n, i, r))
  } else if (t.segments.length === i.length) {
    if (!ar(t.segments, i) || !mi(t.segments, i, r)) return !1;
    for (let n in e.children) if (!t.children[n] || !Bc(t.children[n], e.children[n], r)) return !1;
    return !0
  } else {
    let n = i.slice(0, t.segments.length), s = i.slice(t.segments.length);
    return !ar(t.segments, n) || !mi(t.segments, n, r) || !t.children[oe] ? !1 : Vc(t.children[oe], e, s, r)
  }
}

function mi(t, e, i) {
  return e.every((r, n) => Fc[i](t[n].parameters, r.parameters))
}

var jt = class {
  constructor(e = new _e([], {}), i = {}, r = null) {
    this.root = e, this.queryParams = i, this.fragment = r
  }

  get queryParamMap() {
    return this._queryParamMap ??= wr(this.queryParams), this._queryParamMap
  }

  toString() {
    return $h.serialize(this)
  }
}, _e = class {
  constructor(e, i) {
    this.segments = e, this.children = i, this.parent = null, Object.values(i).forEach(r => r.parent = this)
  }

  get numberOfChildren() {
    return Object.keys(this.children).length
  }

  hasChildren() {
    return this.numberOfChildren > 0
  }

  toString() {
    return gi(this)
  }
}, sr = class {
  constructor(e, i) {
    this.path = e, this.parameters = i
  }

  get parameterMap() {
    return this._parameterMap ??= wr(this.parameters), this._parameterMap
  }

  toString() {
    return $c(this)
  }
};

function Vh(t, e) {
  return ar(t, e) && t.every((i, r) => dt(i.parameters, e[r].parameters))
}

function ar(t, e) {
  return t.length !== e.length ? !1 : t.every((i, r) => i.path === e[r].path)
}

function zh(t, e) {
  let i = [];
  return Object.entries(t.children).forEach(([r, n]) => {
    r === oe && (i = i.concat(e(n, r)))
  }), Object.entries(t.children).forEach(([r, n]) => {
    r !== oe && (i = i.concat(e(n, r)))
  }), i
}

var Ea = (() => {
  let e = class e {
  };
  e.\u0275fac = function (n) {
    return new (n || e)
  }, e.\u0275prov = we({token: e, factory: () => new bi, providedIn: "root"});
  let t = e;
  return t
})(), bi = class {
  parse(e) {
    let i = new Ys(e);
    return new jt(i.parseRootSegment(), i.parseQueryParams(), i.parseFragment())
  }

  serialize(e) {
    let i = `/${Zr(e.root, !0)}`, r = Kh(e.queryParams), n = typeof e.fragment == "string" ? `#${Gh(e.fragment)}` : "";
    return `${i}${r}${n}`
  }
}, $h = new bi;

function gi(t) {
  return t.segments.map(e => $c(e)).join("/")
}

function Zr(t, e) {
  if (!t.hasChildren()) return gi(t);
  if (e) {
    let i = t.children[oe] ? Zr(t.children[oe], !1) : "", r = [];
    return Object.entries(t.children).forEach(([n, s]) => {
      n !== oe && r.push(`${n}:${Zr(s, !1)}`)
    }), r.length > 0 ? `${i}(${r.join("//")})` : i
  } else {
    let i = zh(t, (r, n) => n === oe ? [Zr(t.children[oe], !1)] : [`${n}:${Zr(r, !1)}`]);
    return Object.keys(t.children).length === 1 && t.children[oe] != null ? `${gi(t)}/${i[0]}` : `${gi(t)}/(${i.join("//")})`
  }
}

function zc(t) {
  return encodeURIComponent(t).replace(/%40/g, "@").replace(/%3A/gi, ":").replace(/%24/g, "$").replace(/%2C/gi, ",")
}

function fi(t) {
  return zc(t).replace(/%3B/gi, ";")
}

function Gh(t) {
  return encodeURI(t)
}

function Xs(t) {
  return zc(t).replace(/\(/g, "%28").replace(/\)/g, "%29").replace(/%26/gi, "&")
}

function vi(t) {
  return decodeURIComponent(t)
}

function Oc(t) {
  return vi(t.replace(/\+/g, "%20"))
}

function $c(t) {
  return `${Xs(t.path)}${Wh(t.parameters)}`
}

function Wh(t) {
  return Object.entries(t).map(([e, i]) => `;${Xs(e)}=${Xs(i)}`).join("")
}

function Kh(t) {
  let e = Object.entries(t).map(([i, r]) => Array.isArray(r) ? r.map(n => `${fi(i)}=${fi(n)}`).join("&") : `${fi(i)}=${fi(r)}`).filter(i => i);
  return e.length ? `?${e.join("&")}` : ""
}

var Xh = /^[^\/()?;#]+/;

function Vs(t) {
  let e = t.match(Xh);
  return e ? e[0] : ""
}

var Yh = /^[^\/()?;=#]+/;

function Qh(t) {
  let e = t.match(Yh);
  return e ? e[0] : ""
}

var Zh = /^[^=?&#]+/;

function Jh(t) {
  let e = t.match(Zh);
  return e ? e[0] : ""
}

var ed = /^[^&#]+/;

function td(t) {
  let e = t.match(ed);
  return e ? e[0] : ""
}

var Ys = class {
  constructor(e) {
    this.url = e, this.remaining = e
  }

  parseRootSegment() {
    return this.consumeOptional("/"), this.remaining === "" || this.peekStartsWith("?") || this.peekStartsWith("#") ? new _e([], {}) : new _e([], this.parseChildren())
  }

  parseQueryParams() {
    let e = {};
    if (this.consumeOptional("?")) do this.parseQueryParam(e); while (this.consumeOptional("&"));
    return e
  }

  parseFragment() {
    return this.consumeOptional("#") ? decodeURIComponent(this.remaining) : null
  }

  parseChildren() {
    if (this.remaining === "") return {};
    this.consumeOptional("/");
    let e = [];
    for (this.peekStartsWith("(") || e.push(this.parseSegment()); this.peekStartsWith("/") && !this.peekStartsWith("//") && !this.peekStartsWith("/(");) this.capture("/"), e.push(this.parseSegment());
    let i = {};
    this.peekStartsWith("/(") && (this.capture("/"), i = this.parseParens(!0));
    let r = {};
    return this.peekStartsWith("(") && (r = this.parseParens(!1)), (e.length > 0 || Object.keys(i).length > 0) && (r[oe] = new _e(e, i)), r
  }

  parseSegment() {
    let e = Vs(this.remaining);
    if (e === "" && this.peekStartsWith(";")) throw new Pe(4009, !1);
    return this.capture(e), new sr(vi(e), this.parseMatrixParams())
  }

  parseMatrixParams() {
    let e = {};
    for (; this.consumeOptional(";");) this.parseParam(e);
    return e
  }

  parseParam(e) {
    let i = Qh(this.remaining);
    if (!i) return;
    this.capture(i);
    let r = "";
    if (this.consumeOptional("=")) {
      let n = Vs(this.remaining);
      n && (r = n, this.capture(r))
    }
    e[vi(i)] = vi(r)
  }

  parseQueryParam(e) {
    let i = Jh(this.remaining);
    if (!i) return;
    this.capture(i);
    let r = "";
    if (this.consumeOptional("=")) {
      let a = td(this.remaining);
      a && (r = a, this.capture(r))
    }
    let n = Oc(i), s = Oc(r);
    if (e.hasOwnProperty(n)) {
      let a = e[n];
      Array.isArray(a) || (a = [a], e[n] = a), a.push(s)
    } else e[n] = s
  }

  parseParens(e) {
    let i = {};
    for (this.capture("("); !this.consumeOptional(")") && this.remaining.length > 0;) {
      let r = Vs(this.remaining), n = this.remaining[r.length];
      if (n !== "/" && n !== ")" && n !== ";") throw new Pe(4010, !1);
      let s;
      r.indexOf(":") > -1 ? (s = r.slice(0, r.indexOf(":")), this.capture(s), this.capture(":")) : e && (s = oe);
      let a = this.parseChildren();
      i[s] = Object.keys(a).length === 1 ? a[oe] : new _e([], a), this.consumeOptional("//")
    }
    return i
  }

  peekStartsWith(e) {
    return this.remaining.startsWith(e)
  }

  consumeOptional(e) {
    return this.peekStartsWith(e) ? (this.remaining = this.remaining.substring(e.length), !0) : !1
  }

  capture(e) {
    if (!this.consumeOptional(e)) throw new Pe(4011, !1)
  }
};

function Gc(t) {
  return t.segments.length > 0 ? new _e([], {[oe]: t}) : t
}

function Wc(t) {
  let e = {};
  for (let [r, n] of Object.entries(t.children)) {
    let s = Wc(n);
    if (r === oe && s.segments.length === 0 && s.hasChildren()) for (let [a, o] of Object.entries(s.children)) e[a] = o; else (s.segments.length > 0 || s.hasChildren()) && (e[r] = s)
  }
  let i = new _e(t.segments, e);
  return rd(i)
}

function rd(t) {
  if (t.numberOfChildren === 1 && t.children[oe]) {
    let e = t.children[oe];
    return new _e(t.segments.concat(e.segments), e.children)
  }
  return t
}

function Sr(t) {
  return t instanceof jt
}

function nd(t, e, i = null, r = null) {
  let n = Kc(t);
  return Xc(n, e, i, r)
}

function Kc(t) {
  let e;

  function i(s) {
    let a = {};
    for (let d of s.children) {
      let l = i(d);
      a[d.outlet] = l
    }
    let o = new _e(s.url, a);
    return s === t && (e = o), o
  }

  let r = i(t.root), n = Gc(r);
  return e ?? n
}

function Xc(t, e, i, r) {
  let n = t;
  for (; n.parent;) n = n.parent;
  if (e.length === 0) return zs(n, n, n, i, r);
  let s = id(e);
  if (s.toRoot()) return zs(n, n, new _e([], {}), i, r);
  let a = sd(s, n, t),
    o = a.processChildren ? tn(a.segmentGroup, a.index, s.commands) : Qc(a.segmentGroup, a.index, s.commands);
  return zs(n, a.segmentGroup, o, i, r)
}

function yi(t) {
  return typeof t == "object" && t != null && !t.outlets && !t.segmentPath
}

function sn(t) {
  return typeof t == "object" && t != null && t.outlets
}

function zs(t, e, i, r, n) {
  let s = {};
  r && Object.entries(r).forEach(([d, l]) => {
    s[d] = Array.isArray(l) ? l.map(g => `${g}`) : `${l}`
  });
  let a;
  t === e ? a = i : a = Yc(t, e, i);
  let o = Gc(Wc(a));
  return new jt(o, s, n)
}

function Yc(t, e, i) {
  let r = {};
  return Object.entries(t.children).forEach(([n, s]) => {
    s === e ? r[n] = i : r[n] = Yc(s, e, i)
  }), new _e(t.segments, r)
}

var Ei = class {
  constructor(e, i, r) {
    if (this.isAbsolute = e, this.numberOfDoubleDots = i, this.commands = r, e && r.length > 0 && yi(r[0])) throw new Pe(4003, !1);
    let n = r.find(sn);
    if (n && n !== Hc(r)) throw new Pe(4004, !1)
  }

  toRoot() {
    return this.isAbsolute && this.commands.length === 1 && this.commands[0] == "/"
  }
};

function id(t) {
  if (typeof t[0] == "string" && t.length === 1 && t[0] === "/") return new Ei(!0, 0, t);
  let e = 0, i = !1, r = t.reduce((n, s, a) => {
    if (typeof s == "object" && s != null) {
      if (s.outlets) {
        let o = {};
        return Object.entries(s.outlets).forEach(([d, l]) => {
          o[d] = typeof l == "string" ? l.split("/") : l
        }), [...n, {outlets: o}]
      }
      if (s.segmentPath) return [...n, s.segmentPath]
    }
    return typeof s != "string" ? [...n, s] : a === 0 ? (s.split("/").forEach((o, d) => {
      d == 0 && o === "." || (d == 0 && o === "" ? i = !0 : o === ".." ? e++ : o != "" && n.push(o))
    }), n) : [...n, s]
  }, []);
  return new Ei(i, e, r)
}

var Tr = class {
  constructor(e, i, r) {
    this.segmentGroup = e, this.processChildren = i, this.index = r
  }
};

function sd(t, e, i) {
  if (t.isAbsolute) return new Tr(e, !0, 0);
  if (!i) return new Tr(e, !1, NaN);
  if (i.parent === null) return new Tr(i, !0, 0);
  let r = yi(t.commands[0]) ? 0 : 1, n = i.segments.length - 1 + r;
  return ad(i, n, t.numberOfDoubleDots)
}

function ad(t, e, i) {
  let r = t, n = e, s = i;
  for (; s > n;) {
    if (s -= n, r = r.parent, !r) throw new Pe(4005, !1);
    n = r.segments.length
  }
  return new Tr(r, !1, n - s)
}

function od(t) {
  return sn(t[0]) ? t[0].outlets : {[oe]: t}
}

function Qc(t, e, i) {
  if (t ??= new _e([], {}), t.segments.length === 0 && t.hasChildren()) return tn(t, e, i);
  let r = cd(t, e, i), n = i.slice(r.commandIndex);
  if (r.match && r.pathIndex < t.segments.length) {
    let s = new _e(t.segments.slice(0, r.pathIndex), {});
    return s.children[oe] = new _e(t.segments.slice(r.pathIndex), t.children), tn(s, 0, n)
  } else return r.match && n.length === 0 ? new _e(t.segments, {}) : r.match && !t.hasChildren() ? Qs(t, e, i) : r.match ? tn(t, 0, n) : Qs(t, e, i)
}

function tn(t, e, i) {
  if (i.length === 0) return new _e(t.segments, {});
  {
    let r = od(i), n = {};
    if (Object.keys(r).some(s => s !== oe) && t.children[oe] && t.numberOfChildren === 1 && t.children[oe].segments.length === 0) {
      let s = tn(t.children[oe], e, i);
      return new _e(t.segments, s.children)
    }
    return Object.entries(r).forEach(([s, a]) => {
      typeof a == "string" && (a = [a]), a !== null && (n[s] = Qc(t.children[s], e, a))
    }), Object.entries(t.children).forEach(([s, a]) => {
      r[s] === void 0 && (n[s] = a)
    }), new _e(t.segments, n)
  }
}

function cd(t, e, i) {
  let r = 0, n = e, s = {match: !1, pathIndex: 0, commandIndex: 0};
  for (; n < t.segments.length;) {
    if (r >= i.length) return s;
    let a = t.segments[n], o = i[r];
    if (sn(o)) break;
    let d = `${o}`, l = r < i.length - 1 ? i[r + 1] : null;
    if (n > 0 && d === void 0) break;
    if (d && l && typeof l == "object" && l.outlets === void 0) {
      if (!Pc(d, l, a)) return s;
      r += 2
    } else {
      if (!Pc(d, {}, a)) return s;
      r++
    }
    n++
  }
  return {match: !0, pathIndex: n, commandIndex: r}
}

function Qs(t, e, i) {
  let r = t.segments.slice(0, e), n = 0;
  for (; n < i.length;) {
    let s = i[n];
    if (sn(s)) {
      let d = ld(s.outlets);
      return new _e(r, d)
    }
    if (n === 0 && yi(i[0])) {
      let d = t.segments[e];
      r.push(new sr(d.path, xc(i[0]))), n++;
      continue
    }
    let a = sn(s) ? s.outlets[oe] : `${s}`, o = n < i.length - 1 ? i[n + 1] : null;
    a && o && yi(o) ? (r.push(new sr(a, xc(o))), n += 2) : (r.push(new sr(a, {})), n++)
  }
  return new _e(r, {})
}

function ld(t) {
  let e = {};
  return Object.entries(t).forEach(([i, r]) => {
    typeof r == "string" && (r = [r]), r !== null && (e[i] = Qs(new _e([], {}), 0, r))
  }), e
}

function xc(t) {
  let e = {};
  return Object.entries(t).forEach(([i, r]) => e[i] = `${r}`), e
}

function Pc(t, e, i) {
  return t == i.path && dt(e, i.parameters)
}

var rn = "imperative", Fe = function (t) {
  return t[t.NavigationStart = 0] = "NavigationStart", t[t.NavigationEnd = 1] = "NavigationEnd", t[t.NavigationCancel = 2] = "NavigationCancel", t[t.NavigationError = 3] = "NavigationError", t[t.RoutesRecognized = 4] = "RoutesRecognized", t[t.ResolveStart = 5] = "ResolveStart", t[t.ResolveEnd = 6] = "ResolveEnd", t[t.GuardsCheckStart = 7] = "GuardsCheckStart", t[t.GuardsCheckEnd = 8] = "GuardsCheckEnd", t[t.RouteConfigLoadStart = 9] = "RouteConfigLoadStart", t[t.RouteConfigLoadEnd = 10] = "RouteConfigLoadEnd", t[t.ChildActivationStart = 11] = "ChildActivationStart", t[t.ChildActivationEnd = 12] = "ChildActivationEnd", t[t.ActivationStart = 13] = "ActivationStart", t[t.ActivationEnd = 14] = "ActivationEnd", t[t.Scroll = 15] = "Scroll", t[t.NavigationSkipped = 16] = "NavigationSkipped", t
}(Fe || {}), it = class {
  constructor(e, i) {
    this.id = e, this.url = i
  }
}, an = class extends it {
  constructor(e, i, r = "imperative", n = null) {
    super(e, i), this.type = Fe.NavigationStart, this.navigationTrigger = r, this.restoredState = n
  }

  toString() {
    return `NavigationStart(id: ${this.id}, url: '${this.url}')`
  }
}, or = class extends it {
  constructor(e, i, r) {
    super(e, i), this.urlAfterRedirects = r, this.type = Fe.NavigationEnd
  }

  toString() {
    return `NavigationEnd(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}')`
  }
}, Ye = function (t) {
  return t[t.Redirect = 0] = "Redirect", t[t.SupersededByNewNavigation = 1] = "SupersededByNewNavigation", t[t.NoDataFromResolver = 2] = "NoDataFromResolver", t[t.GuardRejected = 3] = "GuardRejected", t
}(Ye || {}), Zs = function (t) {
  return t[t.IgnoredSameUrlNavigation = 0] = "IgnoredSameUrlNavigation", t[t.IgnoredByUrlHandlingStrategy = 1] = "IgnoredByUrlHandlingStrategy", t
}(Zs || {}), Bt = class extends it {
  constructor(e, i, r, n) {
    super(e, i), this.reason = r, this.code = n, this.type = Fe.NavigationCancel
  }

  toString() {
    return `NavigationCancel(id: ${this.id}, url: '${this.url}')`
  }
}, cr = class extends it {
  constructor(e, i, r, n) {
    super(e, i), this.reason = r, this.code = n, this.type = Fe.NavigationSkipped
  }
}, on = class extends it {
  constructor(e, i, r, n) {
    super(e, i), this.error = r, this.target = n, this.type = Fe.NavigationError
  }

  toString() {
    return `NavigationError(id: ${this.id}, url: '${this.url}', error: ${this.error})`
  }
}, Ti = class extends it {
  constructor(e, i, r, n) {
    super(e, i), this.urlAfterRedirects = r, this.state = n, this.type = Fe.RoutesRecognized
  }

  toString() {
    return `RoutesRecognized(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state})`
  }
}, Js = class extends it {
  constructor(e, i, r, n) {
    super(e, i), this.urlAfterRedirects = r, this.state = n, this.type = Fe.GuardsCheckStart
  }

  toString() {
    return `GuardsCheckStart(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state})`
  }
}, ea = class extends it {
  constructor(e, i, r, n, s) {
    super(e, i), this.urlAfterRedirects = r, this.state = n, this.shouldActivate = s, this.type = Fe.GuardsCheckEnd
  }

  toString() {
    return `GuardsCheckEnd(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state}, shouldActivate: ${this.shouldActivate})`
  }
}, ta = class extends it {
  constructor(e, i, r, n) {
    super(e, i), this.urlAfterRedirects = r, this.state = n, this.type = Fe.ResolveStart
  }

  toString() {
    return `ResolveStart(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state})`
  }
}, ra = class extends it {
  constructor(e, i, r, n) {
    super(e, i), this.urlAfterRedirects = r, this.state = n, this.type = Fe.ResolveEnd
  }

  toString() {
    return `ResolveEnd(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state})`
  }
}, na = class {
  constructor(e) {
    this.route = e, this.type = Fe.RouteConfigLoadStart
  }

  toString() {
    return `RouteConfigLoadStart(path: ${this.route.path})`
  }
}, ia = class {
  constructor(e) {
    this.route = e, this.type = Fe.RouteConfigLoadEnd
  }

  toString() {
    return `RouteConfigLoadEnd(path: ${this.route.path})`
  }
}, sa = class {
  constructor(e) {
    this.snapshot = e, this.type = Fe.ChildActivationStart
  }

  toString() {
    return `ChildActivationStart(path: '${this.snapshot.routeConfig && this.snapshot.routeConfig.path || ""}')`
  }
}, aa = class {
  constructor(e) {
    this.snapshot = e, this.type = Fe.ChildActivationEnd
  }

  toString() {
    return `ChildActivationEnd(path: '${this.snapshot.routeConfig && this.snapshot.routeConfig.path || ""}')`
  }
}, oa = class {
  constructor(e) {
    this.snapshot = e, this.type = Fe.ActivationStart
  }

  toString() {
    return `ActivationStart(path: '${this.snapshot.routeConfig && this.snapshot.routeConfig.path || ""}')`
  }
}, ca = class {
  constructor(e) {
    this.snapshot = e, this.type = Fe.ActivationEnd
  }

  toString() {
    return `ActivationEnd(path: '${this.snapshot.routeConfig && this.snapshot.routeConfig.path || ""}')`
  }
};
var cn = class {
}, ln = class {
  constructor(e) {
    this.url = e
  }
};
var la = class {
  constructor() {
    this.outlet = null, this.route = null, this.injector = null, this.children = new Ci, this.attachRef = null
  }
}, Ci = (() => {
  let e = class e {
    constructor() {
      this.contexts = new Map
    }

    onChildOutletCreated(r, n) {
      let s = this.getOrCreateContext(r);
      s.outlet = n, this.contexts.set(r, s)
    }

    onChildOutletDestroyed(r) {
      let n = this.getContext(r);
      n && (n.outlet = null, n.attachRef = null)
    }

    onOutletDeactivated() {
      let r = this.contexts;
      return this.contexts = new Map, r
    }

    onOutletReAttached(r) {
      this.contexts = r
    }

    getOrCreateContext(r) {
      let n = this.getContext(r);
      return n || (n = new la, this.contexts.set(r, n)), n
    }

    getContext(r) {
      return this.contexts.get(r) || null
    }
  };
  e.\u0275fac = function (n) {
    return new (n || e)
  }, e.\u0275prov = we({token: e, factory: e.\u0275fac, providedIn: "root"});
  let t = e;
  return t
})(), _i = class {
  constructor(e) {
    this._root = e
  }

  get root() {
    return this._root.value
  }

  parent(e) {
    let i = this.pathFromRoot(e);
    return i.length > 1 ? i[i.length - 2] : null
  }

  children(e) {
    let i = ua(e, this._root);
    return i ? i.children.map(r => r.value) : []
  }

  firstChild(e) {
    let i = ua(e, this._root);
    return i && i.children.length > 0 ? i.children[0].value : null
  }

  siblings(e) {
    let i = ha(e, this._root);
    return i.length < 2 ? [] : i[i.length - 2].children.map(n => n.value).filter(n => n !== e)
  }

  pathFromRoot(e) {
    return ha(e, this._root).map(i => i.value)
  }
};

function ua(t, e) {
  if (t === e.value) return e;
  for (let i of e.children) {
    let r = ua(t, i);
    if (r) return r
  }
  return null
}

function ha(t, e) {
  if (t === e.value) return [e];
  for (let i of e.children) {
    let r = ha(t, i);
    if (r.length) return r.unshift(e), r
  }
  return []
}

var Xe = class {
  constructor(e, i) {
    this.value = e, this.children = i
  }

  toString() {
    return `TreeNode(${this.value})`
  }
};

function Er(t) {
  let e = {};
  return t && t.children.forEach(i => e[i.value.outlet] = i), e
}

var wi = class extends _i {
  constructor(e, i) {
    super(e), this.snapshot = i, _a(this, e)
  }

  toString() {
    return this.snapshot.toString()
  }
};

function Zc(t) {
  let e = ud(t), i = new et([new sr("", {})]), r = new et({}), n = new et({}), s = new et({}), a = new et(""),
    o = new Nr(i, r, s, a, n, oe, t, e.root);
  return o.snapshot = e.root, new wi(new Xe(o, []), e)
}

function ud(t) {
  let e = {}, i = {}, r = {}, n = "", s = new un([], e, r, n, i, oe, t, null, {});
  return new Si("", new Xe(s, []))
}

var Nr = class {
  constructor(e, i, r, n, s, a, o, d) {
    this.urlSubject = e, this.paramsSubject = i, this.queryParamsSubject = r, this.fragmentSubject = n, this.dataSubject = s, this.outlet = a, this.component = o, this._futureSnapshot = d, this.title = this.dataSubject?.pipe(Re(l => l[fn])) ?? se(void 0), this.url = e, this.params = i, this.queryParams = r, this.fragment = n, this.data = s
  }

  get routeConfig() {
    return this._futureSnapshot.routeConfig
  }

  get root() {
    return this._routerState.root
  }

  get parent() {
    return this._routerState.parent(this)
  }

  get firstChild() {
    return this._routerState.firstChild(this)
  }

  get children() {
    return this._routerState.children(this)
  }

  get pathFromRoot() {
    return this._routerState.pathFromRoot(this)
  }

  get paramMap() {
    return this._paramMap ??= this.params.pipe(Re(e => wr(e))), this._paramMap
  }

  get queryParamMap() {
    return this._queryParamMap ??= this.queryParams.pipe(Re(e => wr(e))), this._queryParamMap
  }

  toString() {
    return this.snapshot ? this.snapshot.toString() : `Future(${this._futureSnapshot})`
  }
};

function Ta(t, e, i = "emptyOnly") {
  let r, {routeConfig: n} = t;
  return e !== null && (i === "always" || n?.path === "" || !e.component && !e.routeConfig?.loadComponent) ? r = {
    params: re(re({}, e.params), t.params),
    data: re(re({}, e.data), t.data),
    resolve: re(re(re(re({}, t.data), e.data), n?.data), t._resolvedData)
  } : r = {
    params: re({}, t.params),
    data: re({}, t.data),
    resolve: re(re({}, t.data), t._resolvedData ?? {})
  }, n && el(n) && (r.resolve[fn] = n.title), r
}

var un = class {
  constructor(e, i, r, n, s, a, o, d, l) {
    this.url = e, this.params = i, this.queryParams = r, this.fragment = n, this.data = s, this.outlet = a, this.component = o, this.routeConfig = d, this._resolve = l
  }

  get title() {
    return this.data?.[fn]
  }

  get root() {
    return this._routerState.root
  }

  get parent() {
    return this._routerState.parent(this)
  }

  get firstChild() {
    return this._routerState.firstChild(this)
  }

  get children() {
    return this._routerState.children(this)
  }

  get pathFromRoot() {
    return this._routerState.pathFromRoot(this)
  }

  get paramMap() {
    return this._paramMap ??= wr(this.params), this._paramMap
  }

  get queryParamMap() {
    return this._queryParamMap ??= wr(this.queryParams), this._queryParamMap
  }

  toString() {
    let e = this.url.map(r => r.toString()).join("/"), i = this.routeConfig ? this.routeConfig.path : "";
    return `Route(url:'${e}', path:'${i}')`
  }
}, Si = class extends _i {
  constructor(e, i) {
    super(i), this.url = e, _a(this, i)
  }

  toString() {
    return Jc(this._root)
  }
};

function _a(t, e) {
  e.value._routerState = t, e.children.forEach(i => _a(t, i))
}

function Jc(t) {
  let e = t.children.length > 0 ? ` { ${t.children.map(Jc).join(", ")} } ` : "";
  return `${t.value}${e}`
}

function $s(t) {
  if (t.snapshot) {
    let e = t.snapshot, i = t._futureSnapshot;
    t.snapshot = i, dt(e.queryParams, i.queryParams) || t.queryParamsSubject.next(i.queryParams), e.fragment !== i.fragment && t.fragmentSubject.next(i.fragment), dt(e.params, i.params) || t.paramsSubject.next(i.params), Hh(e.url, i.url) || t.urlSubject.next(i.url), dt(e.data, i.data) || t.dataSubject.next(i.data)
  } else t.snapshot = t._futureSnapshot, t.dataSubject.next(t._futureSnapshot.data)
}

function da(t, e) {
  let i = dt(t.params, e.params) && Vh(t.url, e.url), r = !t.parent != !e.parent;
  return i && !r && (!t.parent || da(t.parent, e.parent))
}

function el(t) {
  return typeof t.title == "string" || t.title === null
}

var hd = (() => {
  let e = class e {
    constructor() {
      this.activated = null, this._activatedRoute = null, this.name = oe, this.activateEvents = new jr, this.deactivateEvents = new jr, this.attachEvents = new jr, this.detachEvents = new jr, this.parentContexts = ne(Ci), this.location = ne(_o), this.changeDetector = ne(fs), this.environmentInjector = ne(Vn), this.inputBinder = ne(wa, {optional: !0}), this.supportsBindingToComponentInputs = !0
    }

    get activatedComponentRef() {
      return this.activated
    }

    get isActivated() {
      return !!this.activated
    }


    get component() {
      if (!this.activated) throw new Pe(4012, !1);
      return this.activated.instance
    }

    get activatedRoute() {
      if (!this.activated) throw new Pe(4012, !1);
      return this._activatedRoute
    }

    get activatedRouteData() {
      return this._activatedRoute ? this._activatedRoute.snapshot.data : {}
    }

    ngOnChanges(r) {
      if (r.name) {
        let {firstChange: n, previousValue: s} = r.name;
        if (n) return;
        this.isTrackedInParentContexts(s) && (this.deactivate(), this.parentContexts.onChildOutletDestroyed(s)), this.initializeOutletWithName()
      }
    }

    ngOnDestroy() {
      this.isTrackedInParentContexts(this.name) && this.parentContexts.onChildOutletDestroyed(this.name), this.inputBinder?.unsubscribeFromRouteData(this)
    }

    isTrackedInParentContexts(r) {
      return this.parentContexts.getContext(r)?.outlet === this
    }

    ngOnInit() {
      this.initializeOutletWithName()
    }

    initializeOutletWithName() {
      if (this.parentContexts.onChildOutletCreated(this.name, this), this.activated) return;
      let r = this.parentContexts.getContext(this.name);
      r?.route && (r.attachRef ? this.attach(r.attachRef, r.route) : this.activateWith(r.route, r.injector))
    }

    detach() {
      if (!this.activated) throw new Pe(4012, !1);
      this.location.detach();
      let r = this.activated;
      return this.activated = null, this._activatedRoute = null, this.detachEvents.emit(r.instance), r
    }

    attach(r, n) {
      this.activated = r, this._activatedRoute = n, this.location.insert(r.hostView), this.inputBinder?.bindActivatedRouteToOutletComponent(this), this.attachEvents.emit(r.instance)
    }

    deactivate() {
      if (this.activated) {
        let r = this.component;
        this.activated.destroy(), this.activated = null, this._activatedRoute = null, this.deactivateEvents.emit(r)
      }
    }

    activateWith(r, n) {
      if (this.isActivated) throw new Pe(4013, !1);
      this._activatedRoute = r;
      let s = this.location, o = r.snapshot.component, d = this.parentContexts.getOrCreateContext(this.name).children,
        l = new fa(r, d, s.injector);
      this.activated = s.createComponent(o, {
        index: s.length,
        injector: l,
        environmentInjector: n ?? this.environmentInjector
      }), this.changeDetector.markForCheck(), this.inputBinder?.bindActivatedRouteToOutletComponent(this), this.activateEvents.emit(this.activated.instance)
    }
  };
  e.\u0275fac = function (n) {
    return new (n || e)
  }, e.\u0275dir = go({
    type: e,
    selectors: [["router-outlet"]],
    inputs: {name: "name"},
    outputs: {
      activateEvents: "activate",
      deactivateEvents: "deactivate",
      attachEvents: "attach",
      detachEvents: "detach"
    },
    exportAs: ["outlet"],
    standalone: !0,
    features: [bo]
  });
  let t = e;
  return t
})(), fa = class {
  constructor(e, i, r) {
    this.route = e, this.childContexts = i, this.parent = r
  }

  get(e, i) {
    return e === Nr ? this.route : e === Ci ? this.childContexts : this.parent.get(e, i)
  }
}, wa = new Ue("");

function dd(t, e, i) {
  let r = hn(t, e._root, i ? i._root : void 0);
  return new wi(r, e)
}

function hn(t, e, i) {
  if (i && t.shouldReuseRoute(e.value, i.value.snapshot)) {
    let r = i.value;
    r._futureSnapshot = e.value;
    let n = fd(t, e, i);
    return new Xe(r, n)
  } else {
    if (t.shouldAttach(e.value)) {
      let s = t.retrieve(e.value);
      if (s !== null) {
        let a = s.route;
        return a.value._futureSnapshot = e.value, a.children = e.children.map(o => hn(t, o)), a
      }
    }
    let r = pd(e.value), n = e.children.map(s => hn(t, s));
    return new Xe(r, n)
  }
}

function fd(t, e, i) {
  return e.children.map(r => {
    for (let n of i.children) if (t.shouldReuseRoute(r.value, n.value.snapshot)) return hn(t, r, n);
    return hn(t, r)
  })
}

function pd(t) {
  return new Nr(new et(t.url), new et(t.params), new et(t.queryParams), new et(t.fragment), new et(t.data), t.outlet, t.component, t)
}

var tl = "ngNavigationCancelingError";

function rl(t, e) {
  let {redirectTo: i, navigationBehaviorOptions: r} = Sr(e) ? {redirectTo: e, navigationBehaviorOptions: void 0} : e,
    n = nl(!1, Ye.Redirect);
  return n.url = i, n.navigationBehaviorOptions = r, n
}

function nl(t, e) {
  let i = new Error(`NavigationCancelingError: ${t || ""}`);
  return i[tl] = !0, i.cancellationCode = e, i
}

function md(t) {
  return il(t) && Sr(t.url)
}

function il(t) {
  return !!t && t[tl]
}

var gd = (() => {
  let e = class e {
  };
  e.\u0275fac = function (n) {
    return new (n || e)
  }, e.\u0275cmp = mo({
    type: e,
    selectors: [["ng-component"]],
    standalone: !0,
    features: [Ro],
    decls: 1,
    vars: 0,
    template: function (n, s) {
      n & 1 && No(0, "router-outlet")
    },
    dependencies: [hd],
    encapsulation: 2
  });
  let t = e;
  return t
})();

function vd(t, e) {
  return t.providers && !t._injector && (t._injector = So(t.providers, e, `Route: ${t.path}`)), t._injector ?? e
}

function Sa(t) {
  let e = t.children && t.children.map(Sa), i = e ? ze(re({}, t), {children: e}) : re({}, t);
  return !i.component && !i.loadComponent && (e || i.loadChildren) && i.outlet && i.outlet !== oe && (i.component = gd), i
}

function ft(t) {
  return t.outlet || oe
}

function bd(t, e) {
  let i = t.filter(r => ft(r) === e);
  return i.push(...t.filter(r => ft(r) !== e)), i
}

function pn(t) {
  if (!t) return null;
  if (t.routeConfig?._injector) return t.routeConfig._injector;
  for (let e = t.parent; e; e = e.parent) {
    let i = e.routeConfig;
    if (i?._loadedInjector) return i._loadedInjector;
    if (i?._injector) return i._injector
  }
  return null
}

var yd = (t, e, i, r) => Re(n => (new pa(e, n.targetRouterState, n.currentRouterState, i, r).activate(t), n)),
  pa = class {
    constructor(e, i, r, n, s) {
      this.routeReuseStrategy = e, this.futureState = i, this.currState = r, this.forwardEvent = n, this.inputBindingEnabled = s
    }

    activate(e) {
      let i = this.futureState._root, r = this.currState ? this.currState._root : null;
      this.deactivateChildRoutes(i, r, e), $s(this.futureState.root), this.activateChildRoutes(i, r, e)
    }

    deactivateChildRoutes(e, i, r) {
      let n = Er(i);
      e.children.forEach(s => {
        let a = s.value.outlet;
        this.deactivateRoutes(s, n[a], r), delete n[a]
      }), Object.values(n).forEach(s => {
        this.deactivateRouteAndItsChildren(s, r)
      })
    }

    deactivateRoutes(e, i, r) {
      let n = e.value, s = i ? i.value : null;
      if (n === s) if (n.component) {
        let a = r.getContext(n.outlet);
        a && this.deactivateChildRoutes(e, i, a.children)
      } else this.deactivateChildRoutes(e, i, r); else s && this.deactivateRouteAndItsChildren(i, r)
    }

    deactivateRouteAndItsChildren(e, i) {
      e.value.component && this.routeReuseStrategy.shouldDetach(e.value.snapshot) ? this.detachAndStoreRouteSubtree(e, i) : this.deactivateRouteAndOutlet(e, i)
    }

    detachAndStoreRouteSubtree(e, i) {
      let r = i.getContext(e.value.outlet), n = r && e.value.component ? r.children : i, s = Er(e);
      for (let a of Object.values(s)) this.deactivateRouteAndItsChildren(a, n);
      if (r && r.outlet) {
        let a = r.outlet.detach(), o = r.children.onOutletDeactivated();
        this.routeReuseStrategy.store(e.value.snapshot, {componentRef: a, route: e, contexts: o})
      }
    }

    deactivateRouteAndOutlet(e, i) {
      let r = i.getContext(e.value.outlet), n = r && e.value.component ? r.children : i, s = Er(e);
      for (let a of Object.values(s)) this.deactivateRouteAndItsChildren(a, n);
      r && (r.outlet && (r.outlet.deactivate(), r.children.onOutletDeactivated()), r.attachRef = null, r.route = null)
    }

    activateChildRoutes(e, i, r) {
      let n = Er(i);
      e.children.forEach(s => {
        this.activateRoutes(s, n[s.value.outlet], r), this.forwardEvent(new ca(s.value.snapshot))
      }), e.children.length && this.forwardEvent(new aa(e.value.snapshot))
    }

    activateRoutes(e, i, r) {
      let n = e.value, s = i ? i.value : null;
      if ($s(n), n === s) if (n.component) {
        let a = r.getOrCreateContext(n.outlet);
        this.activateChildRoutes(e, i, a.children)
      } else this.activateChildRoutes(e, i, r); else if (n.component) {
        let a = r.getOrCreateContext(n.outlet);
        if (this.routeReuseStrategy.shouldAttach(n.snapshot)) {
          let o = this.routeReuseStrategy.retrieve(n.snapshot);
          this.routeReuseStrategy.store(n.snapshot, null), a.children.onOutletReAttached(o.contexts), a.attachRef = o.componentRef, a.route = o.route.value, a.outlet && a.outlet.attach(o.componentRef, o.route.value), $s(o.route.value), this.activateChildRoutes(e, null, a.children)
        } else {
          let o = pn(n.snapshot);
          a.attachRef = null, a.route = n, a.injector = o, a.outlet && a.outlet.activateWith(n, a.injector), this.activateChildRoutes(e, null, a.children)
        }
      } else this.activateChildRoutes(e, null, r)
    }
  }, Ni = class {
    constructor(e) {
      this.path = e, this.route = this.path[this.path.length - 1]
    }
  }, _r = class {
    constructor(e, i) {
      this.component = e, this.route = i
    }
  };

function Ed(t, e, i) {
  let r = t._root, n = e ? e._root : null;
  return Jr(r, n, i, [r.value])
}

function Td(t) {
  let e = t.routeConfig ? t.routeConfig.canActivateChild : null;
  return !e || e.length === 0 ? null : {node: t, guards: e}
}

function Cr(t, e) {
  let i = Symbol(), r = e.get(t, i);
  return r === i ? typeof t == "function" && !po(t) ? t : e.get(t) : r
}

function Jr(t, e, i, r, n = {canDeactivateChecks: [], canActivateChecks: []}) {
  let s = Er(e);
  return t.children.forEach(a => {
    _d(a, s[a.value.outlet], i, r.concat([a.value]), n), delete s[a.value.outlet]
  }), Object.entries(s).forEach(([a, o]) => nn(o, i.getContext(a), n)), n
}

function _d(t, e, i, r, n = {canDeactivateChecks: [], canActivateChecks: []}) {
  let s = t.value, a = e ? e.value : null, o = i ? i.getContext(t.value.outlet) : null;
  if (a && s.routeConfig === a.routeConfig) {
    let d = wd(a, s, s.routeConfig.runGuardsAndResolvers);
    d ? n.canActivateChecks.push(new Ni(r)) : (s.data = a.data, s._resolvedData = a._resolvedData), s.component ? Jr(t, e, o ? o.children : null, r, n) : Jr(t, e, i, r, n), d && o && o.outlet && o.outlet.isActivated && n.canDeactivateChecks.push(new _r(o.outlet.component, a))
  } else a && nn(e, o, n), n.canActivateChecks.push(new Ni(r)), s.component ? Jr(t, null, o ? o.children : null, r, n) : Jr(t, null, i, r, n);
  return n
}

function wd(t, e, i) {
  if (typeof i == "function") return i(t, e);
  switch (i) {
    case"pathParamsChange":
      return !ar(t.url, e.url);
    case"pathParamsOrQueryParamsChange":
      return !ar(t.url, e.url) || !dt(t.queryParams, e.queryParams);
    case"always":
      return !0;
    case"paramsOrQueryParamsChange":
      return !da(t, e) || !dt(t.queryParams, e.queryParams);
    case"paramsChange":
    default:
      return !da(t, e)
  }
}

function nn(t, e, i) {
  let r = Er(t), n = t.value;
  Object.entries(r).forEach(([s, a]) => {
    n.component ? e ? nn(a, e.children.getContext(s), i) : nn(a, null, i) : nn(a, e, i)
  }), n.component ? e && e.outlet && e.outlet.isActivated ? i.canDeactivateChecks.push(new _r(e.outlet.component, n)) : i.canDeactivateChecks.push(new _r(null, n)) : i.canDeactivateChecks.push(new _r(null, n))
}

function mn(t) {
  return typeof t == "function"
}

function Sd(t) {
  return typeof t == "boolean"
}

function Nd(t) {
  return t && mn(t.canLoad)
}

function Rd(t) {
  return t && mn(t.canActivate)
}

function Cd(t) {
  return t && mn(t.canActivateChild)
}

function Ad(t) {
  return t && mn(t.canDeactivate)
}

function Dd(t) {
  return t && mn(t.canMatch)
}

function sl(t) {
  return t instanceof ao || t?.name === "EmptyError"
}

var pi = Symbol("INITIAL_VALUE");

function Rr() {
  return ot(t => Qi(t.map(e => e.pipe(mr(1), ho(pi)))).pipe(Re(e => {
    for (let i of e) if (i !== !0) {
      if (i === pi) return pi;
      if (i === !1 || i instanceof jt) return i
    }
    return !0
  }), tr(e => e !== pi), mr(1)))
}

function Md(t, e) {
  return rt(i => {
    let {targetSnapshot: r, currentSnapshot: n, guards: {canActivateChecks: s, canDeactivateChecks: a}} = i;
    return a.length === 0 && s.length === 0 ? se(ze(re({}, i), {guardsResult: !0})) : Id(a, r, n, t).pipe(rt(o => o && Sd(o) ? Ld(r, s, t, e) : se(o)), Re(o => ze(re({}, i), {guardsResult: o})))
  })
}

function Id(t, e, i, r) {
  return tt(t).pipe(rt(n => Ud(n.component, n.route, i, e, r)), qt(n => n !== !0, !0))
}

function Ld(t, e, i, r) {
  return tt(e).pipe(pr(n => oo(Od(n.route.parent, r), kd(n.route, r), Pd(t, n.path, i), xd(t, n.route, i))), qt(n => n !== !0, !0))
}

function kd(t, e) {
  return t !== null && e && e(new oa(t)), se(!0)
}

function Od(t, e) {
  return t !== null && e && e(new sa(t)), se(!0)
}

function xd(t, e, i) {
  let r = e.routeConfig ? e.routeConfig.canActivate : null;
  if (!r || r.length === 0) return se(!0);
  let n = r.map(s => Zi(() => {
    let a = pn(e) ?? i, o = Cr(s, a), d = Rd(o) ? o.canActivate(e, t) : Ht(a, () => o(e, t));
    return Vt(d).pipe(qt())
  }));
  return se(n).pipe(Rr())
}

function Pd(t, e, i) {
  let r = e[e.length - 1],
    s = e.slice(0, e.length - 1).reverse().map(a => Td(a)).filter(a => a !== null).map(a => Zi(() => {
      let o = a.guards.map(d => {
        let l = pn(a.node) ?? i, g = Cr(d, l), m = Cd(g) ? g.canActivateChild(r, t) : Ht(l, () => g(r, t));
        return Vt(m).pipe(qt())
      });
      return se(o).pipe(Rr())
    }));
  return se(s).pipe(Rr())
}

function Ud(t, e, i, r, n) {
  let s = e && e.routeConfig ? e.routeConfig.canDeactivate : null;
  if (!s || s.length === 0) return se(!0);
  let a = s.map(o => {
    let d = pn(e) ?? n, l = Cr(o, d), g = Ad(l) ? l.canDeactivate(t, e, i, r) : Ht(d, () => l(t, e, i, r));
    return Vt(g).pipe(qt())
  });
  return se(a).pipe(Rr())
}

function qd(t, e, i, r) {
  let n = e.canLoad;
  if (n === void 0 || n.length === 0) return se(!0);
  let s = n.map(a => {
    let o = Cr(a, t), d = Nd(o) ? o.canLoad(e, i) : Ht(t, () => o(e, i));
    return Vt(d)
  });
  return se(s).pipe(Rr(), al(r))
}

function al(t) {
  return io(qe(e => {
    if (Sr(e)) throw rl(t, e)
  }), Re(e => e === !0))
}

function Hd(t, e, i, r) {
  let n = e.canMatch;
  if (!n || n.length === 0) return se(!0);
  let s = n.map(a => {
    let o = Cr(a, t), d = Dd(o) ? o.canMatch(e, i) : Ht(t, () => o(e, i));
    return Vt(d)
  });
  return se(s).pipe(Rr(), al(r))
}

var dn = class {
  constructor(e) {
    this.segmentGroup = e || null
  }
}, Ri = class extends Error {
  constructor(e) {
    super(), this.urlTree = e
  }
};

function yr(t) {
  return qr(new dn(t))
}

function Fd(t) {
  return qr(new Pe(4e3, !1))
}

function jd(t) {
  return qr(nl(!1, Ye.GuardRejected))
}

var ma = class {
  constructor(e, i) {
    this.urlSerializer = e, this.urlTree = i
  }

  lineralizeSegments(e, i) {
    let r = [], n = i.root;
    for (; ;) {
      if (r = r.concat(n.segments), n.numberOfChildren === 0) return se(r);
      if (n.numberOfChildren > 1 || !n.children[oe]) return Fd(e.redirectTo);
      n = n.children[oe]
    }
  }

  applyRedirectCommands(e, i, r) {
    let n = this.applyRedirectCreateUrlTree(i, this.urlSerializer.parse(i), e, r);
    if (i.startsWith("/")) throw new Ri(n);
    return n
  }

  applyRedirectCreateUrlTree(e, i, r, n) {
    let s = this.createSegmentGroup(e, i.root, r, n);
    return new jt(s, this.createQueryParams(i.queryParams, this.urlTree.queryParams), i.fragment)
  }

  createQueryParams(e, i) {
    let r = {};
    return Object.entries(e).forEach(([n, s]) => {
      if (typeof s == "string" && s.startsWith(":")) {
        let o = s.substring(1);
        r[n] = i[o]
      } else r[n] = s
    }), r
  }

  createSegmentGroup(e, i, r, n) {
    let s = this.createSegments(e, i.segments, r, n), a = {};
    return Object.entries(i.children).forEach(([o, d]) => {
      a[o] = this.createSegmentGroup(e, d, r, n)
    }), new _e(s, a)
  }

  createSegments(e, i, r, n) {
    return i.map(s => s.path.startsWith(":") ? this.findPosParam(e, s, n) : this.findOrReturn(s, r))
  }

  findPosParam(e, i, r) {
    let n = r[i.path.substring(1)];
    if (!n) throw new Pe(4001, !1);
    return n
  }

  findOrReturn(e, i) {
    let r = 0;
    for (let n of i) {
      if (n.path === e.path) return i.splice(r), n;
      r++
    }
    return e
  }
}, ga = {matched: !1, consumedSegments: [], remainingSegments: [], parameters: {}, positionalParamSegments: {}};

function Bd(t, e, i, r, n) {
  let s = Na(t, e, i);
  return s.matched ? (r = vd(e, r), Hd(r, e, i, n).pipe(Re(a => a === !0 ? s : re({}, ga)))) : se(s)
}

function Na(t, e, i) {
  if (e.path === "**") return Vd(i);
  if (e.path === "") return e.pathMatch === "full" && (t.hasChildren() || i.length > 0) ? re({}, ga) : {
    matched: !0,
    consumedSegments: [],
    remainingSegments: i,
    parameters: {},
    positionalParamSegments: {}
  };
  let n = (e.matcher || qh)(i, t, e);
  if (!n) return re({}, ga);
  let s = {};
  Object.entries(n.posParams ?? {}).forEach(([o, d]) => {
    s[o] = d.path
  });
  let a = n.consumed.length > 0 ? re(re({}, s), n.consumed[n.consumed.length - 1].parameters) : s;
  return {
    matched: !0,
    consumedSegments: n.consumed,
    remainingSegments: i.slice(n.consumed.length),
    parameters: a,
    positionalParamSegments: n.posParams ?? {}
  }
}

function Vd(t) {
  return {
    matched: !0,
    parameters: t.length > 0 ? Hc(t).parameters : {},
    consumedSegments: t,
    remainingSegments: [],
    positionalParamSegments: {}
  }
}

function Uc(t, e, i, r) {
  return i.length > 0 && Gd(t, i, r) ? {
    segmentGroup: new _e(e, $d(r, new _e(i, t.children))),
    slicedSegments: []
  } : i.length === 0 && Wd(t, i, r) ? {
    segmentGroup: new _e(t.segments, zd(t, i, r, t.children)),
    slicedSegments: i
  } : {segmentGroup: new _e(t.segments, t.children), slicedSegments: i}
}

function zd(t, e, i, r) {
  let n = {};
  for (let s of i) if (Ai(t, e, s) && !r[ft(s)]) {
    let a = new _e([], {});
    n[ft(s)] = a
  }
  return re(re({}, r), n)
}

function $d(t, e) {
  let i = {};
  i[oe] = e;
  for (let r of t) if (r.path === "" && ft(r) !== oe) {
    let n = new _e([], {});
    i[ft(r)] = n
  }
  return i
}

function Gd(t, e, i) {
  return i.some(r => Ai(t, e, r) && ft(r) !== oe)
}

function Wd(t, e, i) {
  return i.some(r => Ai(t, e, r))
}

function Ai(t, e, i) {
  return (t.hasChildren() || e.length > 0) && i.pathMatch === "full" ? !1 : i.path === ""
}

function Kd(t, e, i, r) {
  return ft(t) !== r && (r === oe || !Ai(e, i, t)) ? !1 : Na(e, t, i).matched
}

function Xd(t, e, i) {
  return e.length === 0 && !t.children[i]
}

var va = class {
};

function Yd(t, e, i, r, n, s, a = "emptyOnly") {
  return new ba(t, e, i, r, n, a, s).recognize()
}

var Qd = 31, ba = class {
  constructor(e, i, r, n, s, a, o) {
    this.injector = e, this.configLoader = i, this.rootComponentType = r, this.config = n, this.urlTree = s, this.paramsInheritanceStrategy = a, this.urlSerializer = o, this.applyRedirects = new ma(this.urlSerializer, this.urlTree), this.absoluteRedirectCount = 0, this.allowRedirects = !0
  }

  noMatchError(e) {
    return new Pe(4002, `'${e.segmentGroup}'`)
  }

  recognize() {
    let e = Uc(this.urlTree.root, [], [], this.config).segmentGroup;
    return this.match(e).pipe(Re(i => {
      let r = new un([], Object.freeze({}), Object.freeze(re({}, this.urlTree.queryParams)), this.urlTree.fragment, {}, oe, this.rootComponentType, null, {}),
        n = new Xe(r, i), s = new Si("", n), a = nd(r, [], this.urlTree.queryParams, this.urlTree.fragment);
      return a.queryParams = this.urlTree.queryParams, s.url = this.urlSerializer.serialize(a), this.inheritParamsAndData(s._root, null), {
        state: s,
        tree: a
      }
    }))
  }

  match(e) {
    return this.processSegmentGroup(this.injector, this.config, e, oe).pipe(fr(r => {
      if (r instanceof Ri) return this.urlTree = r.urlTree, this.match(r.urlTree.root);
      throw r instanceof dn ? this.noMatchError(r) : r
    }))
  }

  inheritParamsAndData(e, i) {
    let r = e.value, n = Ta(r, i, this.paramsInheritanceStrategy);
    r.params = Object.freeze(n.params), r.data = Object.freeze(n.data), e.children.forEach(s => this.inheritParamsAndData(s, r))
  }

  processSegmentGroup(e, i, r, n) {
    return r.segments.length === 0 && r.hasChildren() ? this.processChildren(e, i, r) : this.processSegment(e, i, r, r.segments, n, !0).pipe(Re(s => s instanceof Xe ? [s] : []))
  }

  processChildren(e, i, r) {
    let n = [];
    for (let s of Object.keys(r.children)) s === "primary" ? n.unshift(s) : n.push(s);
    return tt(n).pipe(pr(s => {
      let a = r.children[s], o = bd(i, s);
      return this.processSegmentGroup(e, o, a, s)
    }), uo((s, a) => (s.push(...a), s)), Ji(null), lo(), rt(s => {
      if (s === null) return yr(r);
      let a = ol(s);
      return Zd(a), se(a)
    }))
  }

  processSegment(e, i, r, n, s, a) {
    return tt(i).pipe(pr(o => this.processSegmentAgainstRoute(o._injector ?? e, i, o, r, n, s, a).pipe(fr(d => {
      if (d instanceof dn) return se(null);
      throw d
    }))), qt(o => !!o), fr(o => {
      if (sl(o)) return Xd(r, n, s) ? se(new va) : yr(r);
      throw o
    }))
  }

  processSegmentAgainstRoute(e, i, r, n, s, a, o) {
    return Kd(r, n, s, a) ? r.redirectTo === void 0 ? this.matchSegmentAgainstRoute(e, n, r, s, a) : this.allowRedirects && o ? this.expandSegmentAgainstRouteUsingRedirect(e, n, i, r, s, a) : yr(n) : yr(n)
  }

  expandSegmentAgainstRouteUsingRedirect(e, i, r, n, s, a) {
    let {matched: o, consumedSegments: d, positionalParamSegments: l, remainingSegments: g} = Na(i, n, s);
    if (!o) return yr(i);
    n.redirectTo.startsWith("/") && (this.absoluteRedirectCount++, this.absoluteRedirectCount > Qd && (this.allowRedirects = !1));
    let m = this.applyRedirects.applyRedirectCommands(d, n.redirectTo, l);
    return this.applyRedirects.lineralizeSegments(n, m).pipe(rt(b => this.processSegment(e, r, i, b.concat(g), a, !1)))
  }

  matchSegmentAgainstRoute(e, i, r, n, s) {
    let a = Bd(i, r, n, e, this.urlSerializer);
    return r.path === "**" && (i.children = {}), a.pipe(ot(o => o.matched ? (e = r._injector ?? e, this.getChildConfig(e, r, n).pipe(ot(({routes: d}) => {
      let l = r._loadedInjector ?? e, {consumedSegments: g, remainingSegments: m, parameters: b} = o,
        I = new un(g, b, Object.freeze(re({}, this.urlTree.queryParams)), this.urlTree.fragment, ef(r), ft(r), r.component ?? r._loadedComponent ?? null, r, tf(r)), {
          segmentGroup: U,
          slicedSegments: O
        } = Uc(i, g, m, d);
      if (O.length === 0 && U.hasChildren()) return this.processChildren(l, d, U).pipe(Re(x => x === null ? null : new Xe(I, x)));
      if (d.length === 0 && O.length === 0) return se(new Xe(I, []));
      let Y = ft(r) === s;
      return this.processSegment(l, d, U, O, Y ? oe : s, !0).pipe(Re(x => new Xe(I, x instanceof Xe ? [x] : [])))
    }))) : yr(i)))
  }

  getChildConfig(e, i, r) {
    return i.children ? se({
      routes: i.children,
      injector: e
    }) : i.loadChildren ? i._loadedRoutes !== void 0 ? se({
      routes: i._loadedRoutes,
      injector: i._loadedInjector
    }) : qd(e, i, r, this.urlSerializer).pipe(rt(n => n ? this.configLoader.loadChildren(e, i).pipe(qe(s => {
      i._loadedRoutes = s.routes, i._loadedInjector = s.injector
    })) : jd(i))) : se({routes: [], injector: e})
  }
};

function Zd(t) {
  t.sort((e, i) => e.value.outlet === oe ? -1 : i.value.outlet === oe ? 1 : e.value.outlet.localeCompare(i.value.outlet))
}

function Jd(t) {
  let e = t.value.routeConfig;
  return e && e.path === ""
}

function ol(t) {
  let e = [], i = new Set;
  for (let r of t) {
    if (!Jd(r)) {
      e.push(r);
      continue
    }
    let n = e.find(s => r.value.routeConfig === s.value.routeConfig);
    n !== void 0 ? (n.children.push(...r.children), i.add(n)) : e.push(r)
  }
  for (let r of i) {
    let n = ol(r.children);
    e.push(new Xe(r.value, n))
  }
  return e.filter(r => !i.has(r))
}

function ef(t) {
  return t.data || {}
}

function tf(t) {
  return t.resolve || {}
}

function rf(t, e, i, r, n, s) {
  return rt(a => Yd(t, e, i, r, a.extractedUrl, n, s).pipe(Re(({state: o, tree: d}) => ze(re({}, a), {
    targetSnapshot: o,
    urlAfterRedirects: d
  }))))
}

function nf(t, e) {
  return rt(i => {
    let {targetSnapshot: r, guards: {canActivateChecks: n}} = i;
    if (!n.length) return se(i);
    let s = new Set(n.map(d => d.route)), a = new Set;
    for (let d of s) if (!a.has(d)) for (let l of cl(d)) a.add(l);
    let o = 0;
    return tt(a).pipe(pr(d => s.has(d) ? sf(d, r, t, e) : (d.data = Ta(d, d.parent, t).resolve, se(void 0))), qe(() => o++), es(1), rt(d => o === a.size ? se(i) : Ut))
  })
}

function cl(t) {
  let e = t.children.map(i => cl(i)).flat();
  return [t, ...e]
}

function sf(t, e, i, r) {
  let n = t.routeConfig, s = t._resolve;
  return n?.title !== void 0 && !el(n) && (s[fn] = n.title), af(s, t, e, r).pipe(Re(a => (t._resolvedData = a, t.data = Ta(t, t.parent, i).resolve, null)))
}

function af(t, e, i, r) {
  let n = Ks(t);
  if (n.length === 0) return se({});
  let s = {};
  return tt(n).pipe(rt(a => of(t[a], e, i, r).pipe(qt(), qe(o => {
    s[a] = o
  }))), es(1), co(s), fr(a => sl(a) ? Ut : qr(a)))
}

function of(t, e, i, r) {
  let n = pn(e) ?? r, s = Cr(t, n), a = s.resolve ? s.resolve(e, i) : Ht(n, () => s(e, i));
  return Vt(a)
}

function Gs(t) {
  return ot(e => {
    let i = t(e);
    return i ? tt(i).pipe(Re(() => e)) : se(e)
  })
}

var ll = (() => {
  let e = class e {
    buildTitle(r) {
      let n, s = r.root;
      for (; s !== void 0;) n = this.getResolvedTitleForRoute(s) ?? n, s = s.children.find(a => a.outlet === oe);
      return n
    }

    getResolvedTitleForRoute(r) {
      return r.data[fn]
    }
  };
  e.\u0275fac = function (n) {
    return new (n || e)
  }, e.\u0275prov = we({token: e, factory: () => ne(cf), providedIn: "root"});
  let t = e;
  return t
})(), cf = (() => {
  let e = class e extends ll {
    constructor(r) {
      super(), this.title = r
    }

    updateTitle(r) {
      let n = this.buildTitle(r);
      n !== void 0 && this.title.setTitle(n)
    }
  };
  e.\u0275fac = function (n) {
    return new (n || e)(Se(nc))
  }, e.\u0275prov = we({token: e, factory: e.\u0275fac, providedIn: "root"});
  let t = e;
  return t
})(), Ra = new Ue("", {providedIn: "root", factory: () => ({})}), Ca = new Ue(""), lf = (() => {
  let e = class e {
    constructor() {
      this.componentLoaders = new WeakMap, this.childrenLoaders = new WeakMap, this.compiler = ne(hs)
    }

    loadComponent(r) {
      if (this.componentLoaders.get(r)) return this.componentLoaders.get(r);
      if (r._loadedComponent) return se(r._loadedComponent);
      this.onLoadStartListener && this.onLoadStartListener(r);
      let n = Vt(r.loadComponent()).pipe(Re(ul), qe(a => {
        this.onLoadEndListener && this.onLoadEndListener(r), r._loadedComponent = a
      }), Hr(() => {
        this.componentLoaders.delete(r)
      })), s = new Yi(n, () => new Tt).pipe(Xi());
      return this.componentLoaders.set(r, s), s
    }

    loadChildren(r, n) {
      if (this.childrenLoaders.get(n)) return this.childrenLoaders.get(n);
      if (n._loadedRoutes) return se({routes: n._loadedRoutes, injector: n._loadedInjector});
      this.onLoadStartListener && this.onLoadStartListener(n);
      let a = uf(n, this.compiler, r, this.onLoadEndListener).pipe(Hr(() => {
        this.childrenLoaders.delete(n)
      })), o = new Yi(a, () => new Tt).pipe(Xi());
      return this.childrenLoaders.set(n, o), o
    }
  };
  e.\u0275fac = function (n) {
    return new (n || e)
  }, e.\u0275prov = we({token: e, factory: e.\u0275fac, providedIn: "root"});
  let t = e;
  return t
})();

function uf(t, e, i, r) {
  return Vt(t.loadChildren()).pipe(Re(ul), rt(n => n instanceof wo || Array.isArray(n) ? se(n) : tt(e.compileModuleAsync(n))), Re(n => {
    r && r(t);
    let s, a, o = !1;
    return Array.isArray(n) ? (a = n, o = !0) : (s = n.create(i).injector, a = s.get(Ca, [], {
      optional: !0,
      self: !0
    }).flat()), {routes: a.map(Sa), injector: s}
  }))
}

function hf(t) {
  return t && typeof t == "object" && "default" in t
}

function ul(t) {
  return hf(t) ? t.default : t
}

var Aa = (() => {
  let e = class e {
  };
  e.\u0275fac = function (n) {
    return new (n || e)
  }, e.\u0275prov = we({token: e, factory: () => ne(df), providedIn: "root"});
  let t = e;
  return t
})(), df = (() => {
  let e = class e {
    shouldProcessUrl(r) {
      return !0
    }

    extract(r) {
      return r
    }

    merge(r, n) {
      return r
    }
  };
  e.\u0275fac = function (n) {
    return new (n || e)
  }, e.\u0275prov = we({token: e, factory: e.\u0275fac, providedIn: "root"});
  let t = e;
  return t
})(), ff = new Ue("");
var pf = (() => {
  let e = class e {
    constructor() {
      this.currentNavigation = null, this.currentTransition = null, this.lastSuccessfulNavigation = null, this.events = new Tt, this.transitionAbortSubject = new Tt, this.configLoader = ne(lf), this.environmentInjector = ne(Vn), this.urlSerializer = ne(Ea), this.rootContexts = ne(Ci), this.location = ne(Zn), this.inputBindingEnabled = ne(wa, {optional: !0}) !== null, this.titleStrategy = ne(ll), this.options = ne(Ra, {optional: !0}) || {}, this.paramsInheritanceStrategy = this.options.paramsInheritanceStrategy || "emptyOnly", this.urlHandlingStrategy = ne(Aa), this.createViewTransition = ne(ff, {optional: !0}), this.navigationId = 0, this.afterPreactivation = () => se(void 0), this.rootComponentType = null;
      let r = s => this.events.next(new na(s)), n = s => this.events.next(new ia(s));
      this.configLoader.onLoadEndListener = n, this.configLoader.onLoadStartListener = r
    }

    get hasRequestedNavigation() {
      return this.navigationId !== 0
    }

    complete() {
      this.transitions?.complete()
    }

    handleNavigationRequest(r) {
      let n = ++this.navigationId;
      this.transitions?.next(ze(re(re({}, this.transitions.value), r), {id: n}))
    }

    setupNavigations(r, n, s) {
      return this.transitions = new et({
        id: 0,
        currentUrlTree: n,
        currentRawUrl: n,
        extractedUrl: this.urlHandlingStrategy.extract(n),
        urlAfterRedirects: this.urlHandlingStrategy.extract(n),
        rawUrl: n,
        extras: {},
        resolve: null,
        reject: null,
        promise: Promise.resolve(!0),
        source: rn,
        restoredState: null,
        currentSnapshot: s.snapshot,
        targetSnapshot: null,
        currentRouterState: s,
        targetRouterState: null,
        guards: {canActivateChecks: [], canDeactivateChecks: []},
        guardsResult: null
      }), this.transitions.pipe(tr(a => a.id !== 0), Re(a => ze(re({}, a), {extractedUrl: this.urlHandlingStrategy.extract(a.rawUrl)})), ot(a => {
        let o = !1, d = !1;
        return se(a).pipe(ot(l => {
          if (this.navigationId > a.id) return this.cancelNavigationTransition(a, "", Ye.SupersededByNewNavigation), Ut;
          this.currentTransition = a, this.currentNavigation = {
            id: l.id,
            initialUrl: l.rawUrl,
            extractedUrl: l.extractedUrl,
            trigger: l.source,
            extras: l.extras,
            previousNavigation: this.lastSuccessfulNavigation ? ze(re({}, this.lastSuccessfulNavigation), {previousNavigation: null}) : null
          };
          let g = !r.navigated || this.isUpdatingInternalState() || this.isUpdatedBrowserUrl(),
            m = l.extras.onSameUrlNavigation ?? r.onSameUrlNavigation;
          if (!g && m !== "reload") {
            let b = "";
            return this.events.next(new cr(l.id, this.urlSerializer.serialize(l.rawUrl), b, Zs.IgnoredSameUrlNavigation)), l.resolve(null), Ut
          }
          if (this.urlHandlingStrategy.shouldProcessUrl(l.rawUrl)) return se(l).pipe(ot(b => {
            let I = this.transitions?.getValue();
            return this.events.next(new an(b.id, this.urlSerializer.serialize(b.extractedUrl), b.source, b.restoredState)), I !== this.transitions?.getValue() ? Ut : Promise.resolve(b)
          }), rf(this.environmentInjector, this.configLoader, this.rootComponentType, r.config, this.urlSerializer, this.paramsInheritanceStrategy), qe(b => {
            a.targetSnapshot = b.targetSnapshot, a.urlAfterRedirects = b.urlAfterRedirects, this.currentNavigation = ze(re({}, this.currentNavigation), {finalUrl: b.urlAfterRedirects});
            let I = new Ti(b.id, this.urlSerializer.serialize(b.extractedUrl), this.urlSerializer.serialize(b.urlAfterRedirects), b.targetSnapshot);
            this.events.next(I)
          }));
          if (g && this.urlHandlingStrategy.shouldProcessUrl(l.currentRawUrl)) {
            let {id: b, extractedUrl: I, source: U, restoredState: O, extras: Y} = l,
              x = new an(b, this.urlSerializer.serialize(I), U, O);
            this.events.next(x);
            let w = Zc(this.rootComponentType).snapshot;
            return this.currentTransition = a = ze(re({}, l), {
              targetSnapshot: w,
              urlAfterRedirects: I,
              extras: ze(re({}, Y), {skipLocationChange: !1, replaceUrl: !1})
            }), this.currentNavigation.finalUrl = I, se(a)
          } else {
            let b = "";
            return this.events.next(new cr(l.id, this.urlSerializer.serialize(l.extractedUrl), b, Zs.IgnoredByUrlHandlingStrategy)), l.resolve(null), Ut
          }
        }), qe(l => {
          let g = new Js(l.id, this.urlSerializer.serialize(l.extractedUrl), this.urlSerializer.serialize(l.urlAfterRedirects), l.targetSnapshot);
          this.events.next(g)
        }), Re(l => (this.currentTransition = a = ze(re({}, l), {guards: Ed(l.targetSnapshot, l.currentSnapshot, this.rootContexts)}), a)), Md(this.environmentInjector, l => this.events.next(l)), qe(l => {
          if (a.guardsResult = l.guardsResult, Sr(l.guardsResult)) throw rl(this.urlSerializer, l.guardsResult);
          let g = new ea(l.id, this.urlSerializer.serialize(l.extractedUrl), this.urlSerializer.serialize(l.urlAfterRedirects), l.targetSnapshot, !!l.guardsResult);
          this.events.next(g)
        }), tr(l => l.guardsResult ? !0 : (this.cancelNavigationTransition(l, "", Ye.GuardRejected), !1)), Gs(l => {
          if (l.guards.canActivateChecks.length) return se(l).pipe(qe(g => {
            let m = new ta(g.id, this.urlSerializer.serialize(g.extractedUrl), this.urlSerializer.serialize(g.urlAfterRedirects), g.targetSnapshot);
            this.events.next(m)
          }), ot(g => {
            let m = !1;
            return se(g).pipe(nf(this.paramsInheritanceStrategy, this.environmentInjector), qe({
              next: () => m = !0,
              complete: () => {
                m || this.cancelNavigationTransition(g, "", Ye.NoDataFromResolver)
              }
            }))
          }), qe(g => {
            let m = new ra(g.id, this.urlSerializer.serialize(g.extractedUrl), this.urlSerializer.serialize(g.urlAfterRedirects), g.targetSnapshot);
            this.events.next(m)
          }))
        }), Gs(l => {
          let g = m => {
            let b = [];
            m.routeConfig?.loadComponent && !m.routeConfig._loadedComponent && b.push(this.configLoader.loadComponent(m.routeConfig).pipe(qe(I => {
              m.component = I
            }), Re(() => {
            })));
            for (let I of m.children) b.push(...g(I));
            return b
          };
          return Qi(g(l.targetSnapshot.root)).pipe(Ji(null), mr(1))
        }), Gs(() => this.afterPreactivation()), ot(() => {
          let {currentSnapshot: l, targetSnapshot: g} = a,
            m = this.createViewTransition?.(this.environmentInjector, l.root, g.root);
          return m ? tt(m).pipe(Re(() => a)) : se(a)
        }), Re(l => {
          let g = dd(r.routeReuseStrategy, l.targetSnapshot, l.currentRouterState);
          return this.currentTransition = a = ze(re({}, l), {targetRouterState: g}), this.currentNavigation.targetRouterState = g, a
        }), qe(() => {
          this.events.next(new cn)
        }), yd(this.rootContexts, r.routeReuseStrategy, l => this.events.next(l), this.inputBindingEnabled), mr(1), qe({
          next: l => {
            o = !0, this.lastSuccessfulNavigation = this.currentNavigation, this.events.next(new or(l.id, this.urlSerializer.serialize(l.extractedUrl), this.urlSerializer.serialize(l.urlAfterRedirects))), this.titleStrategy?.updateTitle(l.targetRouterState.snapshot), l.resolve(!0)
          }, complete: () => {
            o = !0
          }
        }), fo(this.transitionAbortSubject.pipe(qe(l => {
          throw l
        }))), Hr(() => {
          !o && !d && this.cancelNavigationTransition(a, "", Ye.SupersededByNewNavigation), this.currentTransition?.id === a.id && (this.currentNavigation = null, this.currentTransition = null)
        }), fr(l => {
          if (d = !0, il(l)) this.events.next(new Bt(a.id, this.urlSerializer.serialize(a.extractedUrl), l.message, l.cancellationCode)), md(l) ? this.events.next(new ln(l.url)) : a.resolve(!1); else {
            this.events.next(new on(a.id, this.urlSerializer.serialize(a.extractedUrl), l, a.targetSnapshot ?? void 0));
            try {
              a.resolve(r.errorHandler(l))
            } catch (g) {
              this.options.resolveNavigationPromiseOnError ? a.resolve(!1) : a.reject(g)
            }
          }
          return Ut
        }))
      }))
    }

    cancelNavigationTransition(r, n, s) {
      let a = new Bt(r.id, this.urlSerializer.serialize(r.extractedUrl), n, s);
      this.events.next(a), r.resolve(!1)
    }

    isUpdatingInternalState() {
      return this.currentTransition?.extractedUrl.toString() !== this.currentTransition?.currentUrlTree.toString()
    }

    isUpdatedBrowserUrl() {
      return this.urlHandlingStrategy.extract(this.urlSerializer.parse(this.location.path(!0))).toString() !== this.currentTransition?.extractedUrl.toString() && !this.currentTransition?.extras.skipLocationChange
    }
  };
  e.\u0275fac = function (n) {
    return new (n || e)
  }, e.\u0275prov = we({token: e, factory: e.\u0275fac, providedIn: "root"});
  let t = e;
  return t
})();

function mf(t) {
  return t !== rn
}

var gf = (() => {
  let e = class e {
  };
  e.\u0275fac = function (n) {
    return new (n || e)
  }, e.\u0275prov = we({token: e, factory: () => ne(vf), providedIn: "root"});
  let t = e;
  return t
})(), ya = class {
  shouldDetach(e) {
    return !1
  }

  store(e, i) {
  }

  shouldAttach(e) {
    return !1
  }

  retrieve(e) {
    return null
  }

  shouldReuseRoute(e, i) {
    return e.routeConfig === i.routeConfig
  }
}, vf = (() => {
  let e = class e extends ya {
  };
  e.\u0275fac = (() => {
    let r;
    return function (s) {
      return (r || (r = rs(e)))(s || e)
    }
  })(), e.\u0275prov = we({token: e, factory: e.\u0275fac, providedIn: "root"});
  let t = e;
  return t
})(), hl = (() => {
  let e = class e {
  };
  e.\u0275fac = function (n) {
    return new (n || e)
  }, e.\u0275prov = we({token: e, factory: () => ne(bf), providedIn: "root"});
  let t = e;
  return t
})(), bf = (() => {
  let e = class e extends hl {
    constructor() {
      super(...arguments), this.location = ne(Zn), this.urlSerializer = ne(Ea), this.options = ne(Ra, {optional: !0}) || {}, this.canceledNavigationResolution = this.options.canceledNavigationResolution || "replace", this.urlHandlingStrategy = ne(Aa), this.urlUpdateStrategy = this.options.urlUpdateStrategy || "deferred", this.currentUrlTree = new jt, this.rawUrlTree = this.currentUrlTree, this.currentPageId = 0, this.lastSuccessfulId = -1, this.routerState = Zc(null), this.stateMemento = this.createStateMemento()
    }

    get browserPageId() {
      return this.canceledNavigationResolution !== "computed" ? this.currentPageId : this.restoredState()?.\u0275routerPageId ?? this.currentPageId
    }

    getCurrentUrlTree() {
      return this.currentUrlTree
    }

    getRawUrlTree() {
      return this.rawUrlTree
    }

    restoredState() {
      return this.location.getState()
    }

    getRouterState() {
      return this.routerState
    }

    createStateMemento() {
      return {rawUrlTree: this.rawUrlTree, currentUrlTree: this.currentUrlTree, routerState: this.routerState}
    }

    registerNonRouterCurrentEntryChangeListener(r) {
      return this.location.subscribe(n => {
        n.type === "popstate" && r(n.url, n.state)
      })
    }

    handleRouterEvent(r, n) {
      if (r instanceof an) this.stateMemento = this.createStateMemento(); else if (r instanceof cr) this.rawUrlTree = n.initialUrl; else if (r instanceof Ti) {
        if (this.urlUpdateStrategy === "eager" && !n.extras.skipLocationChange) {
          let s = this.urlHandlingStrategy.merge(n.finalUrl, n.initialUrl);
          this.setBrowserUrl(s, n)
        }
      } else r instanceof cn ? (this.currentUrlTree = n.finalUrl, this.rawUrlTree = this.urlHandlingStrategy.merge(n.finalUrl, n.initialUrl), this.routerState = n.targetRouterState, this.urlUpdateStrategy === "deferred" && (n.extras.skipLocationChange || this.setBrowserUrl(this.rawUrlTree, n))) : r instanceof Bt && (r.code === Ye.GuardRejected || r.code === Ye.NoDataFromResolver) ? this.restoreHistory(n) : r instanceof on ? this.restoreHistory(n, !0) : r instanceof or && (this.lastSuccessfulId = r.id, this.currentPageId = this.browserPageId)
    }

    setBrowserUrl(r, n) {
      let s = this.urlSerializer.serialize(r);
      if (this.location.isCurrentPathEqualTo(s) || n.extras.replaceUrl) {
        let a = this.browserPageId, o = re(re({}, n.extras.state), this.generateNgRouterState(n.id, a));
        this.location.replaceState(s, "", o)
      } else {
        let a = re(re({}, n.extras.state), this.generateNgRouterState(n.id, this.browserPageId + 1));
        this.location.go(s, "", a)
      }
    }

    restoreHistory(r, n = !1) {
      if (this.canceledNavigationResolution === "computed") {
        let s = this.browserPageId, a = this.currentPageId - s;
        a !== 0 ? this.location.historyGo(a) : this.currentUrlTree === r.finalUrl && a === 0 && (this.resetState(r), this.resetUrlToCurrentUrlTree())
      } else this.canceledNavigationResolution === "replace" && (n && this.resetState(r), this.resetUrlToCurrentUrlTree())
    }

    resetState(r) {
      this.routerState = this.stateMemento.routerState, this.currentUrlTree = this.stateMemento.currentUrlTree, this.rawUrlTree = this.urlHandlingStrategy.merge(this.currentUrlTree, r.finalUrl ?? this.rawUrlTree)
    }

    resetUrlToCurrentUrlTree() {
      this.location.replaceState(this.urlSerializer.serialize(this.rawUrlTree), "", this.generateNgRouterState(this.lastSuccessfulId, this.currentPageId))
    }

    generateNgRouterState(r, n) {
      return this.canceledNavigationResolution === "computed" ? {
        navigationId: r,
        \u0275routerPageId: n
      } : {navigationId: r}
    }
  };
  e.\u0275fac = (() => {
    let r;
    return function (s) {
      return (r || (r = rs(e)))(s || e)
    }
  })(), e.\u0275prov = we({token: e, factory: e.\u0275fac, providedIn: "root"});
  let t = e;
  return t
})(), en = function (t) {
  return t[t.COMPLETE = 0] = "COMPLETE", t[t.FAILED = 1] = "FAILED", t[t.REDIRECTING = 2] = "REDIRECTING", t
}(en || {});

function yf(t, e) {
  t.events.pipe(tr(i => i instanceof or || i instanceof Bt || i instanceof on || i instanceof cr), Re(i => i instanceof or || i instanceof cr ? en.COMPLETE : (i instanceof Bt ? i.code === Ye.Redirect || i.code === Ye.SupersededByNewNavigation : !1) ? en.REDIRECTING : en.FAILED), tr(i => i !== en.REDIRECTING), mr(1)).subscribe(() => {
    e()
  })
}

function Ef(t) {
  throw t
}

var Tf = {paths: "exact", fragment: "ignored", matrixParams: "ignored", queryParams: "exact"},
  _f = {paths: "subset", fragment: "ignored", matrixParams: "ignored", queryParams: "subset"}, dl = (() => {
    let e = class e {
      constructor() {
        this.disposed = !1, this.isNgZoneEnabled = !1, this.console = ne(Kn), this.stateManager = ne(hl), this.options = ne(Ra, {optional: !0}) || {}, this.pendingTasks = ne(cs), this.urlUpdateStrategy = this.options.urlUpdateStrategy || "deferred", this.navigationTransitions = ne(pf), this.urlSerializer = ne(Ea), this.location = ne(Zn), this.urlHandlingStrategy = ne(Aa), this._events = new Tt, this.errorHandler = this.options.errorHandler || Ef, this.navigated = !1, this.routeReuseStrategy = ne(gf), this.onSameUrlNavigation = this.options.onSameUrlNavigation || "ignore", this.config = ne(Ca, {optional: !0})?.flat() ?? [], this.componentInputBindingEnabled = !!ne(wa, {optional: !0}), this.eventsSubscription = new no, this.isNgZoneEnabled = ne(nt) instanceof nt && nt.isInAngularZone(), this.resetConfig(this.config), this.navigationTransitions.setupNavigations(this, this.currentUrlTree, this.routerState).subscribe({
          error: r => {
            this.console.warn(r)
          }
        }), this.subscribeToNavigationEvents()
      }

      get currentUrlTree() {
        return this.stateManager.getCurrentUrlTree()
      }

      get rawUrlTree() {
        return this.stateManager.getRawUrlTree()
      }

      get events() {
        return this._events
      }

      get routerState() {
        return this.stateManager.getRouterState()
      }


      get url() {
        return this.serializeUrl(this.currentUrlTree)
      }

      get lastSuccessfulNavigation() {
        return this.navigationTransitions.lastSuccessfulNavigation
      }

      subscribeToNavigationEvents() {
        let r = this.navigationTransitions.events.subscribe(n => {
          try {
            let s = this.navigationTransitions.currentTransition, a = this.navigationTransitions.currentNavigation;
            if (s !== null && a !== null) {
              if (this.stateManager.handleRouterEvent(n, a), n instanceof Bt && n.code !== Ye.Redirect && n.code !== Ye.SupersededByNewNavigation) this.navigated = !0; else if (n instanceof or) this.navigated = !0; else if (n instanceof ln) {
                let o = this.urlHandlingStrategy.merge(n.url, s.currentRawUrl), d = {
                  info: s.extras.info,
                  skipLocationChange: s.extras.skipLocationChange,
                  replaceUrl: this.urlUpdateStrategy === "eager" || mf(s.source)
                };
                this.scheduleNavigation(o, rn, null, d, {resolve: s.resolve, reject: s.reject, promise: s.promise})
              }
            }
            Sf(n) && this._events.next(n)
          } catch (s) {
            this.navigationTransitions.transitionAbortSubject.next(s)
          }
        });
        this.eventsSubscription.add(r)
      }


      resetRootComponentType(r) {
        this.routerState.root.component = r, this.navigationTransitions.rootComponentType = r
      }

      initialNavigation() {
        this.setUpLocationChangeListener(), this.navigationTransitions.hasRequestedNavigation || this.navigateToSyncWithBrowser(this.location.path(!0), rn, this.stateManager.restoredState())
      }

      setUpLocationChangeListener() {
        this.nonRouterCurrentEntryChangeSubscription ??= this.stateManager.registerNonRouterCurrentEntryChangeListener((r, n) => {
          setTimeout(() => {
            this.navigateToSyncWithBrowser(r, "popstate", n)
          }, 0)
        })
      }

      navigateToSyncWithBrowser(r, n, s) {
        let a = {replaceUrl: !0}, o = s?.navigationId ? s : null;
        if (s) {
          let l = re({}, s);
          delete l.navigationId, delete l.\u0275routerPageId, Object.keys(l).length !== 0 && (a.state = l)
        }
        let d = this.parseUrl(r);
        this.scheduleNavigation(d, n, o, a)
      }

      getCurrentNavigation() {
        return this.navigationTransitions.currentNavigation
      }

      resetConfig(r) {
        this.config = r.map(Sa), this.navigated = !1
      }

      ngOnDestroy() {
        this.dispose()
      }

      dispose() {
        this.navigationTransitions.complete(), this.nonRouterCurrentEntryChangeSubscription && (this.nonRouterCurrentEntryChangeSubscription.unsubscribe(), this.nonRouterCurrentEntryChangeSubscription = void 0), this.disposed = !0, this.eventsSubscription.unsubscribe()
      }

      createUrlTree(r, n = {}) {
        let {relativeTo: s, queryParams: a, fragment: o, queryParamsHandling: d, preserveFragment: l} = n,
          g = l ? this.currentUrlTree.fragment : o, m = null;
        switch (d) {
          case"merge":
            m = re(re({}, this.currentUrlTree.queryParams), a);
            break;
          case"preserve":
            m = this.currentUrlTree.queryParams;
            break;
          default:
            m = a || null
        }
        m !== null && (m = this.removeEmptyProps(m));
        let b;
        try {
          let I = s ? s.snapshot : this.routerState.snapshot.root;
          b = Kc(I)
        } catch {
          (typeof r[0] != "string" || !r[0].startsWith("/")) && (r = []), b = this.currentUrlTree.root
        }
        return Xc(b, r, m, g ?? null)
      }

      navigateByUrl(r, n = {skipLocationChange: !1}) {
        let s = Sr(r) ? r : this.parseUrl(r), a = this.urlHandlingStrategy.merge(s, this.rawUrlTree);
        return this.scheduleNavigation(a, rn, null, n)
      }

      navigate(r, n = {skipLocationChange: !1}) {
        return wf(r), this.navigateByUrl(this.createUrlTree(r, n), n)
      }

      serializeUrl(r) {
        return this.urlSerializer.serialize(r)
      }

      parseUrl(r) {
        try {
          return this.urlSerializer.parse(r)
        } catch {
          return this.urlSerializer.parse("/")
        }
      }

      isActive(r, n) {
        let s;
        if (n === !0 ? s = re({}, Tf) : n === !1 ? s = re({}, _f) : s = n, Sr(r)) return kc(this.currentUrlTree, r, s);
        let a = this.parseUrl(r);
        return kc(this.currentUrlTree, a, s)
      }

      removeEmptyProps(r) {
        return Object.entries(r).reduce((n, [s, a]) => (a != null && (n[s] = a), n), {})
      }

      scheduleNavigation(r, n, s, a, o) {
        if (this.disposed) return Promise.resolve(!1);
        let d, l, g;
        o ? (d = o.resolve, l = o.reject, g = o.promise) : g = new Promise((b, I) => {
          d = b, l = I
        });
        let m = this.pendingTasks.add();
        return yf(this, () => {
          queueMicrotask(() => this.pendingTasks.remove(m))
        }), this.navigationTransitions.handleNavigationRequest({
          source: n,
          restoredState: s,
          currentUrlTree: this.currentUrlTree,
          currentRawUrl: this.currentUrlTree,
          rawUrl: r,
          extras: a,
          resolve: d,
          reject: l,
          promise: g,
          currentSnapshot: this.routerState.snapshot,
          currentRouterState: this.routerState
        }), g.catch(b => Promise.reject(b))
      }
    };
    e.\u0275fac = function (n) {
      return new (n || e)
    }, e.\u0275prov = we({token: e, factory: e.\u0275fac, providedIn: "root"});
    let t = e;
    return t
  })();

function wf(t) {
  for (let e = 0; e < t.length; e++) if (t[e] == null) throw new Pe(4008, !1)
}

function Sf(t) {
  return !(t instanceof cn) && !(t instanceof ln)
}

var Nf = new Ue("");

function Cm(t, ...e) {
  return rr([{provide: Ca, multi: !0, useValue: t}, [], {provide: Nr, useFactory: Rf, deps: [dl]}, {
    provide: Xn,
    multi: !0,
    useFactory: Cf
  }, e.map(i => i.\u0275providers)])
}

function Rf(t) {
  return t.routerState.root
}

function Cf() {
  let t = ne(zn);
  return e => {
    let i = t.get(nr);
    if (e !== i.components[0]) return;
    let r = t.get(dl), n = t.get(Af);
    t.get(Df) === 1 && r.initialNavigation(), t.get(Mf, null, ts.Optional)?.setUpPreloading(), t.get(Nf, null, ts.Optional)?.init(), r.resetRootComponentType(i.componentTypes[0]), n.closed || (n.next(), n.complete(), n.unsubscribe())
  }
}

var Af = new Ue("", {factory: () => new Tt}), Df = new Ue("", {providedIn: "root", factory: () => 1});
var Mf = new Ue("");
export {si as a, dp as b, fp as c, di as d, Ah as e, Up as f, Ph as g, qp as h, Hp as i, uf as j, dl as k, Cm as l};
