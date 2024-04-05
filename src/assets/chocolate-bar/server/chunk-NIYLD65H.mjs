import './polyfills.server.mjs';
import {a as In, b as Mn, c as Sn, f as An, l as On} from "./chunk-XDJYKW5I.mjs";
import {
  $ as T,
  $a as te,
  _ as D,
  _a as dt,
  a as wt,
  Aa as l,
  aa as S,
  ab as pn,
  ac as kn,
  B as Qt,
  Ba as _e,
  ba as g,
  bb as R,
  bc as Ce,
  c as Tt,
  Ca as Jt,
  ca as sn,
  cb as bn,
  cc as ee,
  D as Ke,
  Da as mn,
  db as O,
  dc as Mt,
  Ea as ve,
  Eb as It,
  eb as Dt,
  ec as ie,
  f as C,
  Fa as un,
  fb as $,
  fc as ne,
  g as Kt,
  Ga as ti,
  ga as pt,
  gb as kt,
  h as en,
  Ha as hn,
  ha as rt,
  hb as _t,
  i as nn,
  Ia as v,
  ia as at,
  ib as et,
  J as Qe,
  j as pe,
  Ja as xe,
  ja as Et,
  Jb as ut,
  jb as U,
  K as ge,
  Ka as q,
  ka as mt,
  Kb as yn,
  kb as Y,
  L as Je,
  La as gt,
  Lb as oi,
  lb as ni,
  ma as k,
  mb as jt,
  N as K,
  n as Nt,
  na as tt,
  nb as gn,
  o as on,
  Ob as I,
  ob as x,
  P as Vt,
  Pa as N,
  pb as ye,
  Q as ft,
  q as rn,
  Qa as Z,
  qb as we,
  R as b,
  Ra as Q,
  ra as dn,
  Rb as wn,
  rb as X,
  S as M,
  s as an,
  Sa as W,
  sa as st,
  sb as V,
  t as $e,
  Ta as fn,
  ta as ln,
  Tb as Cn,
  tb as _n,
  U as w,
  u as be,
  Ua as B,
  Ub as En,
  v as Ct,
  Va as ei,
  W as c,
  w as Xe,
  Wa as ii,
  X as F,
  Xa as h,
  xa as cn,
  Xb as Dn,
  xb as vn,
  Ya as u,
  z as Ze,
  Za as E,
  za as _,
  zb as xn
} from "./chunk-BHCZU76S.mjs";
import {a as y, b as ct} from "./chunk-VVCT4QZE.mjs";

var Fn = (() => {
  let t = class t {
  };
  t.\u0275fac = function (i) {
    return new (i || t)
  }, t.\u0275cmp = T({
    type: t,
    selectors: [["app-rules"]],
    standalone: !0,
    features: [V],
    decls: 14,
    vars: 0,
    consts: [[1, "img-container"], ["ngSrc", "assets/tab.png", "alt", "Tablette de chocolat", "width", "540", "height", "524"]],
    template: function (i, o) {
      i & 1 && (h(0, "h2"), x(1, "R\xE8gle du jeu \u{1F4DC}"), u(), h(2, "p"), x(3, ` \u{1F46C} Jouez \xE0 2 avec une tablette de chocolat virtuelle \u{1F36B}. Un seul carr\xE9 est "empoisonn\xE9" \u2620\uFE0F. Cassez la tablette \xE0 tour de r\xF4le, mais gardez le carr\xE9 empoisonn\xE9 sur la partie restante. Passez la partie sans poison \xE0 l'autre joueur \u{1F381}. Si tu manges le carr\xE9 empoisonn\xE9, tu perds \u{1F622}.
`), u(), h(4, "h2"), x(5, "Exemple de d\xE9roulement \u{1F9EE}"), u(), h(6, "p"), x(7, ` Avec une tablette 4x3, et le carr\xE9 empoisonn\xE9 au milieu, le premier joueur coupe la tablette en deux au-dessus du poison et donne la partie saine. L'adversaire fait un autre coup, et \xE0 la fin, le premier joueur se retrouve avec le carr\xE9 empoisonn\xE9 et perd \u{1F61E}.
`), u(), h(8, "h2"), x(9, "Comment gagner \xE0 coup s\xFBr ? \u{1F947}"), u(), h(10, "p"), x(11, ` Une position perdante est une position o\xF9 la somme de nim est nulle. La somme de nim dans notre cas c'est le XOR entre a, b, c et d soit
`), u(), h(12, "div", 0), E(13, "img", 1), u())
    },
    dependencies: [kn],
    styles: ["p[_ngcontent-%COMP%]{font-size:1.1em;text-align:justify;line-height:1.5em}.img-container[_ngcontent-%COMP%]{width:100%;display:flex;justify-content:center}.img-container[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]{margin-top:-10px;padding-left:40px;width:50%;height:auto}"]
  });
  let n = t;
  return n
})();
var Lt = (() => {
  let t = class t {
    constructor() {
      this.nbLines = 6, this.nbColumns = 3, this.poisonedSquareX = 0, this.poisonedSquareY = 0, this.player1 = "Joueur 1", this.player2 = "Joueur 2", this.needUpdateSubject = new Kt(!1), this.needUpdate$ = this.needUpdateSubject.asObservable(), this.eatActionSubject = new Kt(!1), this.eatAction$ = this.eatActionSubject.asObservable(), this.isPoisonedSquarePositioned = !1
    }

    getNeedUpdate() {
      return this.needUpdate$
    }

    setNeedUpdate(e) {
      this.needUpdateSubject.next(e)
    }

    getEatAction() {
      return this.eatAction$
    }

    setEatAction(e) {
      this.eatActionSubject.next(e)
    }

    getNbLines() {
      return this.nbLines
    }

    getNbColumns() {
      return this.nbColumns
    }

    getPlayer1() {
      return this.player1
    }

    getPlayer2() {
      return this.player2
    }

    setNbLines(e) {
      this.nbLines = e
    }

    setNbColumns(e) {
      this.nbColumns = e
    }

    setPlayer1(e) {
      this.player1 = e
    }

    setPlayer2(e) {
      this.player2 = e
    }

    getPoisonedSquareX() {
      return this.poisonedSquareX
    }

    getPoisonedSquareY() {
      return this.poisonedSquareY
    }

    setPoisonedSquareX(e) {
      this.poisonedSquareX = e
    }

    setPoisonedSquareY(e) {
      this.poisonedSquareY = e
    }

    setPositionPoisonedSquare() {
      this.isPoisonedSquarePositioned = !this.isPoisonedSquarePositioned
    }

    getIsPoisonedSquarePositioned() {
      return this.isPoisonedSquarePositioned
    }
  };
  t.\u0275fac = function (i) {
    return new (i || t)
  }, t.\u0275prov = b({token: t, factory: t.\u0275fac, providedIn: "root"});
  let n = t;
  return n
})();
var si;
try {
  si = typeof Intl < "u" && Intl.v8BreakIterator
} catch {
  si = !1
}
var A = (() => {
  let t = class t {
    constructor(e) {
      this._platformId = e, this.isBrowser = this._platformId ? Dn(this._platformId) : typeof document == "object" && !!document, this.EDGE = this.isBrowser && /(edge)/i.test(navigator.userAgent), this.TRIDENT = this.isBrowser && /(msie|trident)/i.test(navigator.userAgent), this.BLINK = this.isBrowser && !!(window.chrome || si) && typeof CSS < "u" && !this.EDGE && !this.TRIDENT, this.WEBKIT = this.isBrowser && /AppleWebKit/i.test(navigator.userAgent) && !this.BLINK && !this.EDGE && !this.TRIDENT, this.IOS = this.isBrowser && /iPad|iPhone|iPod/.test(navigator.userAgent) && !("MSStream" in window), this.FIREFOX = this.isBrowser && /(firefox|minefield)/i.test(navigator.userAgent), this.ANDROID = this.isBrowser && /android/i.test(navigator.userAgent) && !this.TRIDENT, this.SAFARI = this.isBrowser && /safari/i.test(navigator.userAgent) && this.WEBKIT
    }
  };
  t.\u0275fac = function (i) {
    return new (i || t)(c(dn))
  }, t.\u0275prov = b({token: t, factory: t.\u0275fac, providedIn: "root"});
  let n = t;
  return n
})();
var Bt,
  Rn = ["color", "button", "checkbox", "date", "datetime-local", "email", "file", "hidden", "image", "month", "number", "password", "radio", "range", "reset", "search", "submit", "tel", "text", "time", "url", "week"];

function di() {
  if (Bt) return Bt;
  if (typeof document != "object" || !document) return Bt = new Set(Rn), Bt;
  let n = document.createElement("input");
  return Bt = new Set(Rn.filter(t => (n.setAttribute("type", t), n.type === t))), Bt
}

var oe;

function Mr() {
  if (oe == null && typeof window < "u") try {
    window.addEventListener("test", null, Object.defineProperty({}, "passive", {get: () => oe = !0}))
  } finally {
    oe = oe || !1
  }
  return oe
}

function vt(n) {
  return Mr() ? n : !!n.capture
}

var St;

function Pn() {
  if (St == null) {
    if (typeof document != "object" || !document || typeof Element != "function" || !Element) return St = !1, St;
    if ("scrollBehavior" in document.documentElement.style) St = !0; else {
      let n = Element.prototype.scrollTo;
      n ? St = !/\{\s*\[native code\]\s*\}/.test(n.toString()) : St = !1
    }
  }
  return St
}

var ai;

function Sr() {
  if (ai == null) {
    let n = typeof document < "u" ? document.head : null;
    ai = !!(n && (n.createShadowRoot || n.attachShadow))
  }
  return ai
}

function Tn(n) {
  if (Sr()) {
    let t = n.getRootNode ? n.getRootNode() : null;
    if (typeof ShadowRoot < "u" && ShadowRoot && t instanceof ShadowRoot) return t
  }
  return null
}

function lt(n) {
  return n.composedPath ? n.composedPath()[0] : n.target
}

function re() {
  return typeof __karma__ < "u" && !!__karma__ || typeof jasmine < "u" && !!jasmine || typeof jest < "u" && !!jest || typeof Mocha < "u" && !!Mocha
}

function At(n) {
  return n != null && `${n}` != "false"
}

function zt(n) {
  return Array.isArray(n) ? n : [n]
}

function H(n) {
  return n == null ? "" : typeof n == "string" ? n : `${n}px`
}

function it(n) {
  return n instanceof k ? n.nativeElement : n
}

var Ar = (() => {
  let t = class t {
    create(e) {
      return typeof MutationObserver > "u" ? null : new MutationObserver(e)
    }
  };
  t.\u0275fac = function (i) {
    return new (i || t)
  }, t.\u0275prov = b({token: t, factory: t.\u0275fac, providedIn: "root"});
  let n = t;
  return n
})();
var Nn = (() => {
  let t = class t {
  };
  t.\u0275fac = function (i) {
    return new (i || t)
  }, t.\u0275mod = S({type: t}), t.\u0275inj = M({providers: [Ar]});
  let n = t;
  return n
})();
var Vn = new Set, Ot, Or = (() => {
  let t = class t {
    constructor(e, i) {
      this._platform = e, this._nonce = i, this._matchMedia = this._platform.isBrowser && window.matchMedia ? window.matchMedia.bind(window) : Rr
    }

    matchMedia(e) {
      return (this._platform.WEBKIT || this._platform.BLINK) && Fr(e, this._nonce), this._matchMedia(e)
    }
  };
  t.\u0275fac = function (i) {
    return new (i || t)(c(A), c(ln, 8))
  }, t.\u0275prov = b({token: t, factory: t.\u0275fac, providedIn: "root"});
  let n = t;
  return n
})();

function Fr(n, t) {
  if (!Vn.has(n)) try {
    Ot || (Ot = document.createElement("style"), t && (Ot.nonce = t), Ot.setAttribute("type", "text/css"), document.head.appendChild(Ot)), Ot.sheet && (Ot.sheet.insertRule(`@media ${n} {body{ }}`, 0), Vn.add(n))
  } catch (r) {
    console.error(r)
  }
}

function Rr(n) {
  return {
    matches: n === "all" || n === "", media: n, addListener: () => {
    }, removeListener: () => {
    }
  }
}

var Ee = (() => {
  let t = class t {
    constructor(e, i) {
      this._mediaMatcher = e, this._zone = i, this._queries = new Map, this._destroySubject = new C
    }

    ngOnDestroy() {
      this._destroySubject.next(), this._destroySubject.complete()
    }

    isMatched(e) {
      return jn(zt(e)).some(o => this._registerQuery(o).mql.matches)
    }

    observe(e) {
      let o = jn(zt(e)).map(s => this._registerQuery(s).observable), a = on(o);
      return a = rn(a.pipe(Qt(1)), a.pipe(ge(1), Ze(0))), a.pipe(Nt(s => {
        let d = {matches: !1, breakpoints: {}};
        return s.forEach(({matches: f, query: m}) => {
          d.matches = d.matches || f, d.breakpoints[m] = f
        }), d
      }))
    }

    _registerQuery(e) {
      if (this._queries.has(e)) return this._queries.get(e);
      let i = this._mediaMatcher.matchMedia(e), a = {
        observable: new Tt(s => {
          let d = f => this._zone.run(() => s.next(f));
          return i.addListener(d), () => {
            i.removeListener(d)
          }
        }).pipe(Je(i), Nt(({matches: s}) => ({query: e, matches: s})), K(this._destroySubject)), mql: i
      };
      return this._queries.set(e, a), a
    }
  };
  t.\u0275fac = function (i) {
    return new (i || t)(c(Or), c(v))
  }, t.\u0275prov = b({token: t, factory: t.\u0275fac, providedIn: "root"});
  let n = t;
  return n
})();

function jn(n) {
  return n.map(t => t.split(",")).reduce((t, r) => t.concat(r)).map(t => t.trim())
}

var Ln = {
  XSmall: "(max-width: 599.98px)",
  Small: "(min-width: 600px) and (max-width: 959.98px)",
  Medium: "(min-width: 960px) and (max-width: 1279.98px)",
  Large: "(min-width: 1280px) and (max-width: 1919.98px)",
  XLarge: "(min-width: 1920px)",
  Handset: "(max-width: 599.98px) and (orientation: portrait), (max-width: 959.98px) and (orientation: landscape)",
  Tablet: "(min-width: 600px) and (max-width: 839.98px) and (orientation: portrait), (min-width: 960px) and (max-width: 1279.98px) and (orientation: landscape)",
  Web: "(min-width: 840px) and (orientation: portrait), (min-width: 1280px) and (orientation: landscape)",
  HandsetPortrait: "(max-width: 599.98px) and (orientation: portrait)",
  TabletPortrait: "(min-width: 600px) and (max-width: 839.98px) and (orientation: portrait)",
  WebPortrait: "(min-width: 840px) and (orientation: portrait)",
  HandsetLandscape: "(max-width: 959.98px) and (orientation: landscape)",
  TabletLandscape: "(min-width: 960px) and (max-width: 1279.98px) and (orientation: landscape)",
  WebLandscape: "(min-width: 1280px) and (orientation: landscape)"
};

function ci(n) {
  return n.buttons === 0 || n.detail === 0
}

function mi(n) {
  let t = n.touches && n.touches[0] || n.changedTouches && n.changedTouches[0];
  return !!t && t.identifier === -1 && (t.radiusX == null || t.radiusX === 1) && (t.radiusY == null || t.radiusY === 1)
}

var Tr = new w("cdk-input-modality-detector-options"), Nr = {ignoreKeys: [18, 17, 224, 91, 16]}, Hn = 650,
  Ht = vt({passive: !0, capture: !0}), Vr = (() => {
    let t = class t {
      constructor(e, i, o, a) {
        this._platform = e, this._mostRecentTarget = null, this._modality = new Kt(null), this._lastTouchMs = 0, this._onKeydown = s => {
          this._options?.ignoreKeys?.some(d => d === s.keyCode) || (this._modality.next("keyboard"), this._mostRecentTarget = lt(s))
        }, this._onMousedown = s => {
          Date.now() - this._lastTouchMs < Hn || (this._modality.next(ci(s) ? "keyboard" : "mouse"), this._mostRecentTarget = lt(s))
        }, this._onTouchstart = s => {
          if (mi(s)) {
            this._modality.next("keyboard");
            return
          }
          this._lastTouchMs = Date.now(), this._modality.next("touch"), this._mostRecentTarget = lt(s)
        }, this._options = y(y({}, Nr), a), this.modalityDetected = this._modality.pipe(ge(1)), this.modalityChanged = this.modalityDetected.pipe(Ke()), e.isBrowser && i.runOutsideAngular(() => {
          o.addEventListener("keydown", this._onKeydown, Ht), o.addEventListener("mousedown", this._onMousedown, Ht), o.addEventListener("touchstart", this._onTouchstart, Ht)
        })
      }

      get mostRecentModality() {
        return this._modality.value
      }

      ngOnDestroy() {
        this._modality.complete(), this._platform.isBrowser && (document.removeEventListener("keydown", this._onKeydown, Ht), document.removeEventListener("mousedown", this._onMousedown, Ht), document.removeEventListener("touchstart", this._onTouchstart, Ht))
      }
    };
    t.\u0275fac = function (i) {
      return new (i || t)(c(A), c(v), c(I), c(Tr, 8))
    }, t.\u0275prov = b({token: t, factory: t.\u0275fac, providedIn: "root"});
    let n = t;
    return n
  })(), jr = new w("liveAnnouncerElement", {providedIn: "root", factory: Lr});

function Lr() {
  return null
}

var Br = new w("LIVE_ANNOUNCER_DEFAULT_OPTIONS"), zr = 0, Un = (() => {
  let t = class t {
    constructor(e, i, o, a) {
      this._ngZone = i, this._defaultOptions = a, this._document = o, this._liveElement = e || this._createLiveElement()
    }

    announce(e, ...i) {
      let o = this._defaultOptions, a, s;
      return i.length === 1 && typeof i[0] == "number" ? s = i[0] : [a, s] = i, this.clear(), clearTimeout(this._previousTimeout), a || (a = o && o.politeness ? o.politeness : "polite"), s == null && o && (s = o.duration), this._liveElement.setAttribute("aria-live", a), this._liveElement.id && this._exposeAnnouncerToModals(this._liveElement.id), this._ngZone.runOutsideAngular(() => (this._currentPromise || (this._currentPromise = new Promise(d => this._currentResolve = d)), clearTimeout(this._previousTimeout), this._previousTimeout = setTimeout(() => {
        this._liveElement.textContent = e, typeof s == "number" && (this._previousTimeout = setTimeout(() => this.clear(), s)), this._currentResolve?.(), this._currentPromise = this._currentResolve = void 0
      }, 100), this._currentPromise))
    }

    clear() {
      this._liveElement && (this._liveElement.textContent = "")
    }

    ngOnDestroy() {
      clearTimeout(this._previousTimeout), this._liveElement?.remove(), this._liveElement = null, this._currentResolve?.(), this._currentPromise = this._currentResolve = void 0
    }

    _createLiveElement() {
      let e = "cdk-live-announcer-element", i = this._document.getElementsByClassName(e),
        o = this._document.createElement("div");
      for (let a = 0; a < i.length; a++) i[a].remove();
      return o.classList.add(e), o.classList.add("cdk-visually-hidden"), o.setAttribute("aria-atomic", "true"), o.setAttribute("aria-live", "polite"), o.id = `cdk-live-announcer-${zr++}`, this._document.body.appendChild(o), o
    }

    _exposeAnnouncerToModals(e) {
      let i = this._document.querySelectorAll('body > .cdk-overlay-container [aria-modal="true"]');
      for (let o = 0; o < i.length; o++) {
        let a = i[o], s = a.getAttribute("aria-owns");
        s ? s.indexOf(e) === -1 && a.setAttribute("aria-owns", s + " " + e) : a.setAttribute("aria-owns", e)
      }
    }
  };
  t.\u0275fac = function (i) {
    return new (i || t)(c(jr, 8), c(v), c(I), c(Br, 8))
  }, t.\u0275prov = b({token: t, factory: t.\u0275fac, providedIn: "root"});
  let n = t;
  return n
})();
var ke = function (n) {
  return n[n.IMMEDIATE = 0] = "IMMEDIATE", n[n.EVENTUAL = 1] = "EVENTUAL", n
}(ke || {}), Hr = new w("cdk-focus-monitor-default-options"), De = vt({passive: !0, capture: !0}), Yn = (() => {
  let t = class t {
    constructor(e, i, o, a, s) {
      this._ngZone = e, this._platform = i, this._inputModalityDetector = o, this._origin = null, this._windowFocused = !1, this._originFromTouchInteraction = !1, this._elementInfo = new Map, this._monitoredElementCount = 0, this._rootNodeFocusListenerCount = new Map, this._windowFocusListener = () => {
        this._windowFocused = !0, this._windowFocusTimeoutId = window.setTimeout(() => this._windowFocused = !1)
      }, this._stopInputModalityDetector = new C, this._rootNodeFocusAndBlurListener = d => {
        let f = lt(d);
        for (let m = f; m; m = m.parentElement) d.type === "focus" ? this._onFocus(d, m) : this._onBlur(d, m)
      }, this._document = a, this._detectionMode = s?.detectionMode || ke.IMMEDIATE
    }

    monitor(e, i = !1) {
      let o = it(e);
      if (!this._platform.isBrowser || o.nodeType !== 1) return pe();
      let a = Tn(o) || this._getDocument(), s = this._elementInfo.get(o);
      if (s) return i && (s.checkChildren = !0), s.subject;
      let d = {checkChildren: i, subject: new C, rootNode: a};
      return this._elementInfo.set(o, d), this._registerGlobalListeners(d), d.subject
    }

    stopMonitoring(e) {
      let i = it(e), o = this._elementInfo.get(i);
      o && (o.subject.complete(), this._setClasses(i), this._elementInfo.delete(i), this._removeGlobalListeners(o))
    }

    focusVia(e, i, o) {
      let a = it(e), s = this._getDocument().activeElement;
      a === s ? this._getClosestElementsInfo(a).forEach(([d, f]) => this._originChanged(d, i, f)) : (this._setOrigin(i), typeof a.focus == "function" && a.focus(o))
    }

    ngOnDestroy() {
      this._elementInfo.forEach((e, i) => this.stopMonitoring(i))
    }

    _getDocument() {
      return this._document || document
    }

    _getWindow() {
      return this._getDocument().defaultView || window
    }

    _getFocusOrigin(e) {
      return this._origin ? this._originFromTouchInteraction ? this._shouldBeAttributedToTouch(e) ? "touch" : "program" : this._origin : this._windowFocused && this._lastFocusOrigin ? this._lastFocusOrigin : e && this._isLastInteractionFromInputLabel(e) ? "mouse" : "program"
    }

    _shouldBeAttributedToTouch(e) {
      return this._detectionMode === ke.EVENTUAL || !!e?.contains(this._inputModalityDetector._mostRecentTarget)
    }

    _setClasses(e, i) {
      e.classList.toggle("cdk-focused", !!i), e.classList.toggle("cdk-touch-focused", i === "touch"), e.classList.toggle("cdk-keyboard-focused", i === "keyboard"), e.classList.toggle("cdk-mouse-focused", i === "mouse"), e.classList.toggle("cdk-program-focused", i === "program")
    }

    _setOrigin(e, i = !1) {
      this._ngZone.runOutsideAngular(() => {
        if (this._origin = e, this._originFromTouchInteraction = e === "touch" && i, this._detectionMode === ke.IMMEDIATE) {
          clearTimeout(this._originTimeoutId);
          let o = this._originFromTouchInteraction ? Hn : 1;
          this._originTimeoutId = setTimeout(() => this._origin = null, o)
        }
      })
    }

    _onFocus(e, i) {
      let o = this._elementInfo.get(i), a = lt(e);
      !o || !o.checkChildren && i !== a || this._originChanged(i, this._getFocusOrigin(a), o)
    }

    _onBlur(e, i) {
      let o = this._elementInfo.get(i);
      !o || o.checkChildren && e.relatedTarget instanceof Node && i.contains(e.relatedTarget) || (this._setClasses(i), this._emitOrigin(o, null))
    }

    _emitOrigin(e, i) {
      e.subject.observers.length && this._ngZone.run(() => e.subject.next(i))
    }

    _registerGlobalListeners(e) {
      if (!this._platform.isBrowser) return;
      let i = e.rootNode, o = this._rootNodeFocusListenerCount.get(i) || 0;
      o || this._ngZone.runOutsideAngular(() => {
        i.addEventListener("focus", this._rootNodeFocusAndBlurListener, De), i.addEventListener("blur", this._rootNodeFocusAndBlurListener, De)
      }), this._rootNodeFocusListenerCount.set(i, o + 1), ++this._monitoredElementCount === 1 && (this._ngZone.runOutsideAngular(() => {
        this._getWindow().addEventListener("focus", this._windowFocusListener)
      }), this._inputModalityDetector.modalityDetected.pipe(K(this._stopInputModalityDetector)).subscribe(a => {
        this._setOrigin(a, !0)
      }))
    }

    _removeGlobalListeners(e) {
      let i = e.rootNode;
      if (this._rootNodeFocusListenerCount.has(i)) {
        let o = this._rootNodeFocusListenerCount.get(i);
        o > 1 ? this._rootNodeFocusListenerCount.set(i, o - 1) : (i.removeEventListener("focus", this._rootNodeFocusAndBlurListener, De), i.removeEventListener("blur", this._rootNodeFocusAndBlurListener, De), this._rootNodeFocusListenerCount.delete(i))
      }
      --this._monitoredElementCount || (this._getWindow().removeEventListener("focus", this._windowFocusListener), this._stopInputModalityDetector.next(), clearTimeout(this._windowFocusTimeoutId), clearTimeout(this._originTimeoutId))
    }

    _originChanged(e, i, o) {
      this._setClasses(e, i), this._emitOrigin(o, i), this._lastFocusOrigin = i
    }

    _getClosestElementsInfo(e) {
      let i = [];
      return this._elementInfo.forEach((o, a) => {
        (a === e || o.checkChildren && a.contains(e)) && i.push([a, o])
      }), i
    }

    _isLastInteractionFromInputLabel(e) {
      let {_mostRecentTarget: i, mostRecentModality: o} = this._inputModalityDetector;
      if (o !== "mouse" || !i || i === e || e.nodeName !== "INPUT" && e.nodeName !== "TEXTAREA" || e.disabled) return !1;
      let a = e.labels;
      if (a) {
        for (let s = 0; s < a.length; s++) if (a[s].contains(i)) return !0
      }
      return !1
    }
  };
  t.\u0275fac = function (i) {
    return new (i || t)(c(v), c(A), c(Vr), c(I, 8), c(Hr, 8))
  }, t.\u0275prov = b({token: t, factory: t.\u0275fac, providedIn: "root"});
  let n = t;
  return n
})();
var Ft = function (n) {
    return n[n.NONE = 0] = "NONE", n[n.BLACK_ON_WHITE = 1] = "BLACK_ON_WHITE", n[n.WHITE_ON_BLACK = 2] = "WHITE_ON_BLACK", n
  }(Ft || {}), Bn = "cdk-high-contrast-black-on-white", zn = "cdk-high-contrast-white-on-black",
  li = "cdk-high-contrast-active", qn = (() => {
    let t = class t {
      constructor(e, i) {
        this._platform = e, this._document = i, this._breakpointSubscription = F(Ee).observe("(forced-colors: active)").subscribe(() => {
          this._hasCheckedHighContrastMode && (this._hasCheckedHighContrastMode = !1, this._applyBodyHighContrastModeCssClasses())
        })
      }

      getHighContrastMode() {
        if (!this._platform.isBrowser) return Ft.NONE;
        let e = this._document.createElement("div");
        e.style.backgroundColor = "rgb(1,2,3)", e.style.position = "absolute", this._document.body.appendChild(e);
        let i = this._document.defaultView || window, o = i && i.getComputedStyle ? i.getComputedStyle(e) : null,
          a = (o && o.backgroundColor || "").replace(/ /g, "");
        switch (e.remove(), a) {
          case"rgb(0,0,0)":
          case"rgb(45,50,54)":
          case"rgb(32,32,32)":
            return Ft.WHITE_ON_BLACK;
          case"rgb(255,255,255)":
          case"rgb(255,250,239)":
            return Ft.BLACK_ON_WHITE
        }
        return Ft.NONE
      }

      ngOnDestroy() {
        this._breakpointSubscription.unsubscribe()
      }

      _applyBodyHighContrastModeCssClasses() {
        if (!this._hasCheckedHighContrastMode && this._platform.isBrowser && this._document.body) {
          let e = this._document.body.classList;
          e.remove(li, Bn, zn), this._hasCheckedHighContrastMode = !0;
          let i = this.getHighContrastMode();
          i === Ft.BLACK_ON_WHITE ? e.add(li, Bn) : i === Ft.WHITE_ON_BLACK && e.add(li, zn)
        }
      }
    };
    t.\u0275fac = function (i) {
      return new (i || t)(c(A), c(I))
    }, t.\u0275prov = b({token: t, factory: t.\u0275fac, providedIn: "root"});
    let n = t;
    return n
  })();
var Ur = new w("cdk-dir-doc", {providedIn: "root", factory: Yr});

function Yr() {
  return F(I)
}

var qr = /^(ar|ckb|dv|he|iw|fa|nqo|ps|sd|ug|ur|yi|.*[-_](Adlm|Arab|Hebr|Nkoo|Rohg|Thaa))(?!.*[-_](Latn|Cyrl)($|-|_))($|-|_)/i;

function Wr(n) {
  let t = n?.toLowerCase() || "";
  return t === "auto" && typeof navigator < "u" && navigator?.language ? qr.test(navigator.language) ? "rtl" : "ltr" : t === "rtl" ? "rtl" : "ltr"
}

var Ie = (() => {
  let t = class t {
    constructor(e) {
      if (this.value = "ltr", this.change = new tt, e) {
        let i = e.body ? e.body.dir : null, o = e.documentElement ? e.documentElement.dir : null;
        this.value = Wr(i || o || "ltr")
      }
    }

    ngOnDestroy() {
      this.change.complete()
    }
  };
  t.\u0275fac = function (i) {
    return new (i || t)(c(Ur, 8))
  }, t.\u0275prov = b({token: t, factory: t.\u0275fac, providedIn: "root"});
  let n = t;
  return n
})();
var ui = (() => {
  let t = class t {
  };
  t.\u0275fac = function (i) {
    return new (i || t)
  }, t.\u0275mod = S({type: t}), t.\u0275inj = M({});
  let n = t;
  return n
})();

function $r() {
  return !0
}

var Xr = new w("mat-sanity-checks", {providedIn: "root", factory: $r}), J = (() => {
  let t = class t {
    constructor(e, i, o) {
      this._sanityChecks = i, this._document = o, this._hasDoneGlobalChecks = !1, e._applyBodyHighContrastModeCssClasses(), this._hasDoneGlobalChecks || (this._hasDoneGlobalChecks = !0)
    }

    _checkIsEnabled(e) {
      return re() ? !1 : typeof this._sanityChecks == "boolean" ? this._sanityChecks : !!this._sanityChecks[e]
    }
  };
  t.\u0275fac = function (i) {
    return new (i || t)(c(qn), c(Xr, 8), c(I))
  }, t.\u0275mod = S({type: t}), t.\u0275inj = M({imports: [ui, ui]});
  let n = t;
  return n
})();
var Se = class {
  constructor(t, r, e, i, o) {
    this._defaultMatcher = t, this.ngControl = r, this._parentFormGroup = e, this._parentForm = i, this._stateChanges = o, this.errorState = !1
  }

  updateErrorState() {
    let t = this.errorState, r = this._parentFormGroup || this._parentForm, e = this.matcher || this._defaultMatcher,
      i = this.ngControl ? this.ngControl.control : null, o = e?.isErrorState(i, r) ?? !1;
    o !== t && (this.errorState = o, this._stateChanges.next())
  }
};
var no = (() => {
  let t = class t {
    isErrorState(e, i) {
      return !!(e && e.invalid && (e.touched || i && i.submitted))
    }
  };
  t.\u0275fac = function (i) {
    return new (i || t)
  }, t.\u0275prov = b({token: t, factory: t.\u0275fac, providedIn: "root"});
  let n = t;
  return n
})();
var nt = function (n) {
    return n[n.FADING_IN = 0] = "FADING_IN", n[n.VISIBLE = 1] = "VISIBLE", n[n.FADING_OUT = 2] = "FADING_OUT", n[n.HIDDEN = 3] = "HIDDEN", n
  }(nt || {}), pi = class {
    constructor(t, r, e, i = !1) {
      this._renderer = t, this.element = r, this.config = e, this._animationForciblyDisabledThroughCss = i, this.state = nt.HIDDEN
    }

    fadeOut() {
      this._renderer.fadeOutRipple(this)
    }
  }, $n = vt({passive: !0, capture: !0}), bi = class {
    constructor() {
      this._events = new Map, this._delegateEventHandler = t => {
        let r = lt(t);
        r && this._events.get(t.type)?.forEach((e, i) => {
          (i === r || i.contains(r)) && e.forEach(o => o.handleEvent(t))
        })
      }
    }

    addHandler(t, r, e, i) {
      let o = this._events.get(r);
      if (o) {
        let a = o.get(e);
        a ? a.add(i) : o.set(e, new Set([i]))
      } else this._events.set(r, new Map([[e, new Set([i])]])), t.runOutsideAngular(() => {
        document.addEventListener(r, this._delegateEventHandler, $n)
      })
    }

    removeHandler(t, r, e) {
      let i = this._events.get(t);
      if (!i) return;
      let o = i.get(r);
      o && (o.delete(e), o.size === 0 && i.delete(r), i.size === 0 && (this._events.delete(t), document.removeEventListener(t, this._delegateEventHandler, $n)))
    }
  }, Xn = {enterDuration: 225, exitDuration: 150}, Zr = 800, Zn = vt({passive: !0, capture: !0}),
  Kn = ["mousedown", "touchstart"], Qn = ["mouseup", "mouseleave", "touchend", "touchcancel"], ae = class ae {
    constructor(t, r, e, i) {
      this._target = t, this._ngZone = r, this._platform = i, this._isPointerDown = !1, this._activeRipples = new Map, this._pointerUpEventsRegistered = !1, i.isBrowser && (this._containerElement = it(e))
    }

    fadeInRipple(t, r, e = {}) {
      let i = this._containerRect = this._containerRect || this._containerElement.getBoundingClientRect(),
        o = y(y({}, Xn), e.animation);
      e.centered && (t = i.left + i.width / 2, r = i.top + i.height / 2);
      let a = e.radius || Kr(t, r, i), s = t - i.left, d = r - i.top, f = o.enterDuration,
        m = document.createElement("div");
      m.classList.add("mat-ripple-element"), m.style.left = `${s - a}px`, m.style.top = `${d - a}px`, m.style.height = `${a * 2}px`, m.style.width = `${a * 2}px`, e.color != null && (m.style.backgroundColor = e.color), m.style.transitionDuration = `${f}ms`, this._containerElement.appendChild(m);
      let p = window.getComputedStyle(m), G = p.transitionProperty, z = p.transitionDuration,
        j = G === "none" || z === "0s" || z === "0s, 0s" || i.width === 0 && i.height === 0, L = new pi(this, m, e, j);
      m.style.transform = "scale3d(1, 1, 1)", L.state = nt.FADING_IN, e.persistent || (this._mostRecentTransientRipple = L);
      let ot = null;
      return !j && (f || o.exitDuration) && this._ngZone.runOutsideAngular(() => {
        let Ji = () => this._finishRippleTransition(L), tn = () => this._destroyRipple(L);
        m.addEventListener("transitionend", Ji), m.addEventListener("transitioncancel", tn), ot = {
          onTransitionEnd: Ji,
          onTransitionCancel: tn
        }
      }), this._activeRipples.set(L, ot), (j || !f) && this._finishRippleTransition(L), L
    }

    fadeOutRipple(t) {
      if (t.state === nt.FADING_OUT || t.state === nt.HIDDEN) return;
      let r = t.element, e = y(y({}, Xn), t.config.animation);
      r.style.transitionDuration = `${e.exitDuration}ms`, r.style.opacity = "0", t.state = nt.FADING_OUT, (t._animationForciblyDisabledThroughCss || !e.exitDuration) && this._finishRippleTransition(t)
    }

    fadeOutAll() {
      this._getActiveRipples().forEach(t => t.fadeOut())
    }

    fadeOutAllNonPersistent() {
      this._getActiveRipples().forEach(t => {
        t.config.persistent || t.fadeOut()
      })
    }

    setupTriggerEvents(t) {
      let r = it(t);
      !this._platform.isBrowser || !r || r === this._triggerElement || (this._removeTriggerEvents(), this._triggerElement = r, Kn.forEach(e => {
        ae._eventManager.addHandler(this._ngZone, e, r, this)
      }))
    }

    handleEvent(t) {
      t.type === "mousedown" ? this._onMousedown(t) : t.type === "touchstart" ? this._onTouchStart(t) : this._onPointerUp(), this._pointerUpEventsRegistered || (this._ngZone.runOutsideAngular(() => {
        Qn.forEach(r => {
          this._triggerElement.addEventListener(r, this, Zn)
        })
      }), this._pointerUpEventsRegistered = !0)
    }

    _finishRippleTransition(t) {
      t.state === nt.FADING_IN ? this._startFadeOutTransition(t) : t.state === nt.FADING_OUT && this._destroyRipple(t)
    }

    _startFadeOutTransition(t) {
      let r = t === this._mostRecentTransientRipple, {persistent: e} = t.config;
      t.state = nt.VISIBLE, !e && (!r || !this._isPointerDown) && t.fadeOut()
    }

    _destroyRipple(t) {
      let r = this._activeRipples.get(t) ?? null;
      this._activeRipples.delete(t), this._activeRipples.size || (this._containerRect = null), t === this._mostRecentTransientRipple && (this._mostRecentTransientRipple = null), t.state = nt.HIDDEN, r !== null && (t.element.removeEventListener("transitionend", r.onTransitionEnd), t.element.removeEventListener("transitioncancel", r.onTransitionCancel)), t.element.remove()
    }

    _onMousedown(t) {
      let r = ci(t), e = this._lastTouchStartEvent && Date.now() < this._lastTouchStartEvent + Zr;
      !this._target.rippleDisabled && !r && !e && (this._isPointerDown = !0, this.fadeInRipple(t.clientX, t.clientY, this._target.rippleConfig))
    }

    _onTouchStart(t) {
      if (!this._target.rippleDisabled && !mi(t)) {
        this._lastTouchStartEvent = Date.now(), this._isPointerDown = !0;
        let r = t.changedTouches;
        if (r) for (let e = 0; e < r.length; e++) this.fadeInRipple(r[e].clientX, r[e].clientY, this._target.rippleConfig)
      }
    }

    _onPointerUp() {
      this._isPointerDown && (this._isPointerDown = !1, this._getActiveRipples().forEach(t => {
        let r = t.state === nt.VISIBLE || t.config.terminateOnPointerUp && t.state === nt.FADING_IN;
        !t.config.persistent && r && t.fadeOut()
      }))
    }

    _getActiveRipples() {
      return Array.from(this._activeRipples.keys())
    }

    _removeTriggerEvents() {
      let t = this._triggerElement;
      t && (Kn.forEach(r => ae._eventManager.removeHandler(r, t, this)), this._pointerUpEventsRegistered && Qn.forEach(r => t.removeEventListener(r, this, Zn)))
    }
  };
ae._eventManager = new bi;
var gi = ae;

function Kr(n, t, r) {
  let e = Math.max(Math.abs(n - r.left), Math.abs(n - r.right)),
    i = Math.max(Math.abs(t - r.top), Math.abs(t - r.bottom));
  return Math.sqrt(e * e + i * i)
}

var oo = new w("mat-ripple-global-options"), Qr = (() => {
  let t = class t {
    constructor(e, i, o, a, s) {
      this._elementRef = e, this._animationMode = s, this.radius = 0, this._disabled = !1, this._isInitialized = !1, this._globalOptions = a || {}, this._rippleRenderer = new gi(this, i, e, o)
    }

    get disabled() {
      return this._disabled
    }

    set disabled(e) {
      e && this.fadeOutAllNonPersistent(), this._disabled = e, this._setupTriggerEventsIfEnabled()
    }

    get trigger() {
      return this._trigger || this._elementRef.nativeElement
    }

    set trigger(e) {
      this._trigger = e, this._setupTriggerEventsIfEnabled()
    }

    get rippleConfig() {
      return {
        centered: this.centered,
        radius: this.radius,
        color: this.color,
        animation: y(y(y({}, this._globalOptions.animation), this._animationMode === "NoopAnimations" ? {
          enterDuration: 0,
          exitDuration: 0
        } : {}), this.animation),
        terminateOnPointerUp: this._globalOptions.terminateOnPointerUp
      }
    }

    get rippleDisabled() {
      return this.disabled || !!this._globalOptions.disabled
    }


    ngOnInit() {
      this._isInitialized = !0, this._setupTriggerEventsIfEnabled()
    }

    ngOnDestroy() {
      this._rippleRenderer._removeTriggerEvents()
    }

    fadeOutAll() {
      this._rippleRenderer.fadeOutAll()
    }

    fadeOutAllNonPersistent() {
      this._rippleRenderer.fadeOutAllNonPersistent()
    }

    _setupTriggerEventsIfEnabled() {
      !this.disabled && this._isInitialized && this._rippleRenderer.setupTriggerEvents(this.trigger)
    }

    launch(e, i = 0, o) {
      return typeof e == "number" ? this._rippleRenderer.fadeInRipple(e, i, y(y({}, this.rippleConfig), o)) : this._rippleRenderer.fadeInRipple(0, 0, y(y({}, this.rippleConfig), e))
    }
  };
  t.\u0275fac = function (i) {
    return new (i || t)(l(k), l(v), l(A), l(oo, 8), l(st, 8))
  }, t.\u0275dir = g({
    type: t,
    selectors: [["", "mat-ripple", ""], ["", "matRipple", ""]],
    hostAttrs: [1, "mat-ripple"],
    hostVars: 2,
    hostBindings: function (i, o) {
      i & 2 && W("mat-ripple-unbounded", o.unbounded)
    },
    inputs: {
      color: [D.None, "matRippleColor", "color"],
      unbounded: [D.None, "matRippleUnbounded", "unbounded"],
      centered: [D.None, "matRippleCentered", "centered"],
      radius: [D.None, "matRippleRadius", "radius"],
      animation: [D.None, "matRippleAnimation", "animation"],
      disabled: [D.None, "matRippleDisabled", "disabled"],
      trigger: [D.None, "matRippleTrigger", "trigger"]
    },
    exportAs: ["matRipple"],
    standalone: !0
  });
  let n = t;
  return n
})(), ro = (() => {
  let t = class t {
  };
  t.\u0275fac = function (i) {
    return new (i || t)
  }, t.\u0275mod = S({type: t}), t.\u0275inj = M({imports: [J, J]});
  let n = t;
  return n
})();
var Jn = {capture: !0}, to = ["focus", "click", "mouseenter", "touchstart"], hi = "mat-ripple-loader-uninitialized",
  fi = "mat-ripple-loader-class-name", eo = "mat-ripple-loader-centered", Me = "mat-ripple-loader-disabled",
  ao = (() => {
    let t = class t {
      constructor() {
        this._document = F(I, {optional: !0}), this._animationMode = F(st, {optional: !0}), this._globalRippleOptions = F(oo, {optional: !0}), this._platform = F(A), this._ngZone = F(v), this._hosts = new Map, this._onInteraction = e => {
          if (!(e.target instanceof HTMLElement)) return;
          let o = e.target.closest(`[${hi}]`);
          o && this._createRipple(o)
        }, this._ngZone.runOutsideAngular(() => {
          for (let e of to) this._document?.addEventListener(e, this._onInteraction, Jn)
        })
      }

      ngOnDestroy() {
        let e = this._hosts.keys();
        for (let i of e) this.destroyRipple(i);
        for (let i of to) this._document?.removeEventListener(i, this._onInteraction, Jn)
      }

      configureRipple(e, i) {
        e.setAttribute(hi, ""), (i.className || !e.hasAttribute(fi)) && e.setAttribute(fi, i.className || ""), i.centered && e.setAttribute(eo, ""), i.disabled && e.setAttribute(Me, "")
      }

      getRipple(e) {
        return this._hosts.get(e) || this._createRipple(e)
      }

      setDisabled(e, i) {
        let o = this._hosts.get(e);
        if (o) {
          o.disabled = i;
          return
        }
        i ? e.setAttribute(Me, "") : e.removeAttribute(Me)
      }

      _createRipple(e) {
        if (!this._document) return;
        let i = this._hosts.get(e);
        if (i) return i;
        e.querySelector(".mat-ripple")?.remove();
        let o = this._document.createElement("span");
        o.classList.add("mat-ripple", e.getAttribute(fi)), e.append(o);
        let a = new Qr(new k(o), this._ngZone, this._platform, this._globalRippleOptions ? this._globalRippleOptions : void 0, this._animationMode ? this._animationMode : void 0);
        return a._isInitialized = !0, a.trigger = e, a.centered = e.hasAttribute(eo), a.disabled = e.hasAttribute(Me), this.attachRipple(e, a), a
      }

      attachRipple(e, i) {
        e.removeAttribute(hi), this._hosts.set(e, i)
      }

      destroyRipple(e) {
        let i = this._hosts.get(e);
        i && (i.ngOnDestroy(), this._hosts.delete(e))
      }
    };
    t.\u0275fac = function (i) {
      return new (i || t)
    }, t.\u0275prov = b({token: t, factory: t.\u0275fac, providedIn: "root"});
    let n = t;
    return n
  })();
var ta = ["mat-button", ""],
  ea = [[["", 8, "material-icons", 3, "iconPositionEnd", ""], ["mat-icon", 3, "iconPositionEnd", ""], ["", "matButtonIcon", "", 3, "iconPositionEnd", ""]], "*", [["", "iconPositionEnd", "", 8, "material-icons"], ["mat-icon", "iconPositionEnd", ""], ["", "matButtonIcon", "", "iconPositionEnd", ""]]],
  ia = [".material-icons:not([iconPositionEnd]), mat-icon:not([iconPositionEnd]), [matButtonIcon]:not([iconPositionEnd])", "*", ".material-icons[iconPositionEnd], mat-icon[iconPositionEnd], [matButtonIcon][iconPositionEnd]"];
var na = new w("MAT_BUTTON_CONFIG");
var oa = [{attribute: "mat-button", mdcClasses: ["mdc-button", "mat-mdc-button"]}, {
  attribute: "mat-flat-button",
  mdcClasses: ["mdc-button", "mdc-button--unelevated", "mat-mdc-unelevated-button"]
}, {
  attribute: "mat-raised-button",
  mdcClasses: ["mdc-button", "mdc-button--raised", "mat-mdc-raised-button"]
}, {
  attribute: "mat-stroked-button",
  mdcClasses: ["mdc-button", "mdc-button--outlined", "mat-mdc-outlined-button"]
}, {attribute: "mat-fab", mdcClasses: ["mdc-fab", "mat-mdc-fab"]}, {
  attribute: "mat-mini-fab",
  mdcClasses: ["mdc-fab", "mdc-fab--mini", "mat-mdc-mini-fab"]
}, {attribute: "mat-icon-button", mdcClasses: ["mdc-icon-button", "mat-mdc-icon-button"]}], ra = (() => {
  let t = class t {
    constructor(e, i, o, a) {
      this._elementRef = e, this._platform = i, this._ngZone = o, this._animationMode = a, this._focusMonitor = F(Yn), this._rippleLoader = F(ao), this._isFab = !1, this._disableRipple = !1, this._disabled = !1;
      let s = F(na, {optional: !0}), d = e.nativeElement, f = d.classList;
      this.disabledInteractive = s?.disabledInteractive ?? !1, this._rippleLoader?.configureRipple(d, {className: "mat-mdc-button-ripple"});
      for (let {attribute: m, mdcClasses: p} of oa) d.hasAttribute(m) && f.add(...p)
    }

    get ripple() {
      return this._rippleLoader?.getRipple(this._elementRef.nativeElement)
    }

    set ripple(e) {
      this._rippleLoader?.attachRipple(this._elementRef.nativeElement, e)
    }

    get disableRipple() {
      return this._disableRipple
    }

    set disableRipple(e) {
      this._disableRipple = e, this._updateRippleDisabled()
    }

    get disabled() {
      return this._disabled
    }

    set disabled(e) {
      this._disabled = e, this._updateRippleDisabled()
    }

    ngAfterViewInit() {
      this._focusMonitor.monitor(this._elementRef, !0)
    }

    ngOnDestroy() {
      this._focusMonitor.stopMonitoring(this._elementRef), this._rippleLoader?.destroyRipple(this._elementRef.nativeElement)
    }

    focus(e = "program", i) {
      e ? this._focusMonitor.focusVia(this._elementRef.nativeElement, e, i) : this._elementRef.nativeElement.focus(i)
    }

    _getAriaDisabled() {
      return this.ariaDisabled != null ? this.ariaDisabled : this.disabled && this.disabledInteractive ? !0 : null
    }

    _getDisabledAttribute() {
      return this.disabledInteractive || !this.disabled ? null : !0
    }

    _updateRippleDisabled() {
      this._rippleLoader?.setDisabled(this._elementRef.nativeElement, this.disableRipple || this.disabled)
    }
  };
  t.\u0275fac = function (i) {
    _e()
  }, t.\u0275dir = g({
    type: t,
    inputs: {
      color: "color",
      disableRipple: [D.HasDecoratorInputTransform, "disableRipple", "disableRipple", ut],
      disabled: [D.HasDecoratorInputTransform, "disabled", "disabled", ut],
      ariaDisabled: [D.HasDecoratorInputTransform, "aria-disabled", "ariaDisabled", ut],
      disabledInteractive: [D.HasDecoratorInputTransform, "disabledInteractive", "disabledInteractive", ut]
    },
    features: [gt]
  });
  let n = t;
  return n
})();
var Ae = (() => {
  let t = class t extends ra {
    constructor(e, i, o, a) {
      super(e, i, o, a)
    }
  };
  t.\u0275fac = function (i) {
    return new (i || t)(l(k), l(A), l(v), l(st, 8))
  }, t.\u0275cmp = T({
    type: t,
    selectors: [["button", "mat-button", ""], ["button", "mat-raised-button", ""], ["button", "mat-flat-button", ""], ["button", "mat-stroked-button", ""]],
    hostVars: 14,
    hostBindings: function (i, o) {
      i & 2 && (Z("disabled", o._getDisabledAttribute())("aria-disabled", o._getAriaDisabled()), fn(o.color ? "mat-" + o.color : ""), W("mat-mdc-button-disabled", o.disabled)("mat-mdc-button-disabled-interactive", o.disabledInteractive)("_mat-animation-noopable", o._animationMode === "NoopAnimations")("mat-unthemed", !o.color)("mat-mdc-button-base", !0))
    },
    exportAs: ["matButton"],
    standalone: !0,
    features: [q, V],
    attrs: ta,
    ngContentSelectors: ia,
    decls: 7,
    vars: 4,
    consts: [[1, "mat-mdc-button-persistent-ripple"], [1, "mdc-button__label"], [1, "mat-mdc-focus-indicator"], [1, "mat-mdc-button-touch-target"]],
    template: function (i, o) {
      i & 1 && (Dt(ea), E(0, "span", 0), $(1), h(2, "span", 1), $(3, 1), u(), $(4, 2), E(5, "span", 2)(6, "span", 3)), i & 2 && W("mdc-button__ripple", !o._isFab)("mdc-fab__ripple", o._isFab)
    },
    styles: ['.mdc-touch-target-wrapper{display:inline}.mdc-elevation-overlay{position:absolute;border-radius:inherit;pointer-events:none;opacity:var(--mdc-elevation-overlay-opacity, 0);transition:opacity 280ms cubic-bezier(0.4, 0, 0.2, 1)}.mdc-button{position:relative;display:inline-flex;align-items:center;justify-content:center;box-sizing:border-box;min-width:64px;border:none;outline:none;line-height:inherit;user-select:none;-webkit-appearance:none;overflow:visible;vertical-align:middle;background:rgba(0,0,0,0)}.mdc-button .mdc-elevation-overlay{width:100%;height:100%;top:0;left:0}.mdc-button::-moz-focus-inner{padding:0;border:0}.mdc-button:active{outline:none}.mdc-button:hover{cursor:pointer}.mdc-button:disabled{cursor:default;pointer-events:none}.mdc-button[hidden]{display:none}.mdc-button .mdc-button__icon{margin-left:0;margin-right:8px;display:inline-block;position:relative;vertical-align:top}[dir=rtl] .mdc-button .mdc-button__icon,.mdc-button .mdc-button__icon[dir=rtl]{margin-left:8px;margin-right:0}.mdc-button .mdc-button__progress-indicator{font-size:0;position:absolute;transform:translate(-50%, -50%);top:50%;left:50%;line-height:initial}.mdc-button .mdc-button__label{position:relative}.mdc-button .mdc-button__focus-ring{pointer-events:none;border:2px solid rgba(0,0,0,0);border-radius:6px;box-sizing:content-box;position:absolute;top:50%;left:50%;transform:translate(-50%, -50%);height:calc(100% + 4px);width:calc(100% + 4px);display:none}@media screen and (forced-colors: active){.mdc-button .mdc-button__focus-ring{border-color:CanvasText}}.mdc-button .mdc-button__focus-ring::after{content:"";border:2px solid rgba(0,0,0,0);border-radius:8px;display:block;position:absolute;top:50%;left:50%;transform:translate(-50%, -50%);height:calc(100% + 4px);width:calc(100% + 4px)}@media screen and (forced-colors: active){.mdc-button .mdc-button__focus-ring::after{border-color:CanvasText}}@media screen and (forced-colors: active){.mdc-button.mdc-ripple-upgraded--background-focused .mdc-button__focus-ring,.mdc-button:not(.mdc-ripple-upgraded):focus .mdc-button__focus-ring{display:block}}.mdc-button .mdc-button__touch{position:absolute;top:50%;height:48px;left:0;right:0;transform:translateY(-50%)}.mdc-button__label+.mdc-button__icon{margin-left:8px;margin-right:0}[dir=rtl] .mdc-button__label+.mdc-button__icon,.mdc-button__label+.mdc-button__icon[dir=rtl]{margin-left:0;margin-right:8px}svg.mdc-button__icon{fill:currentColor}.mdc-button--touch{margin-top:6px;margin-bottom:6px}.mdc-button{padding:0 8px 0 8px}.mdc-button--unelevated{transition:box-shadow 280ms cubic-bezier(0.4, 0, 0.2, 1);padding:0 16px 0 16px}.mdc-button--unelevated.mdc-button--icon-trailing{padding:0 12px 0 16px}.mdc-button--unelevated.mdc-button--icon-leading{padding:0 16px 0 12px}.mdc-button--raised{transition:box-shadow 280ms cubic-bezier(0.4, 0, 0.2, 1);padding:0 16px 0 16px}.mdc-button--raised.mdc-button--icon-trailing{padding:0 12px 0 16px}.mdc-button--raised.mdc-button--icon-leading{padding:0 16px 0 12px}.mdc-button--outlined{border-style:solid;transition:border 280ms cubic-bezier(0.4, 0, 0.2, 1)}.mdc-button--outlined .mdc-button__ripple{border-style:solid;border-color:rgba(0,0,0,0)}.mat-mdc-button{font-family:var(--mdc-text-button-label-text-font);font-size:var(--mdc-text-button-label-text-size);letter-spacing:var(--mdc-text-button-label-text-tracking);font-weight:var(--mdc-text-button-label-text-weight);text-transform:var(--mdc-text-button-label-text-transform);height:var(--mdc-text-button-container-height);border-radius:var(--mdc-text-button-container-shape);padding:0 var(--mat-text-button-horizontal-padding, 8px)}.mat-mdc-button:not(:disabled){color:var(--mdc-text-button-label-text-color)}.mat-mdc-button:disabled{color:var(--mdc-text-button-disabled-label-text-color)}.mat-mdc-button .mdc-button__ripple{border-radius:var(--mdc-text-button-container-shape)}.mat-mdc-button:has(.material-icons,mat-icon,[matButtonIcon]){padding:0 var(--mat-text-button-with-icon-horizontal-padding, 8px)}.mat-mdc-button>.mat-icon{margin-right:var(--mat-text-button-icon-spacing, 8px);margin-left:var(--mat-text-button-icon-offset, 0)}[dir=rtl] .mat-mdc-button>.mat-icon{margin-right:var(--mat-text-button-icon-offset, 0);margin-left:var(--mat-text-button-icon-spacing, 8px)}.mat-mdc-button .mdc-button__label+.mat-icon{margin-right:var(--mat-text-button-icon-offset, 0);margin-left:var(--mat-text-button-icon-spacing, 8px)}[dir=rtl] .mat-mdc-button .mdc-button__label+.mat-icon{margin-right:var(--mat-text-button-icon-spacing, 8px);margin-left:var(--mat-text-button-icon-offset, 0)}.mat-mdc-button .mat-ripple-element{background-color:var(--mat-text-button-ripple-color)}.mat-mdc-button .mat-mdc-button-persistent-ripple::before{background-color:var(--mat-text-button-state-layer-color)}.mat-mdc-button.mat-mdc-button-disabled .mat-mdc-button-persistent-ripple::before{background-color:var(--mat-text-button-disabled-state-layer-color)}.mat-mdc-button:hover .mat-mdc-button-persistent-ripple::before{opacity:var(--mat-text-button-hover-state-layer-opacity)}.mat-mdc-button.cdk-program-focused .mat-mdc-button-persistent-ripple::before,.mat-mdc-button.cdk-keyboard-focused .mat-mdc-button-persistent-ripple::before,.mat-mdc-button.mat-mdc-button-disabled-interactive:focus .mat-mdc-button-persistent-ripple::before{opacity:var(--mat-text-button-focus-state-layer-opacity)}.mat-mdc-button:active .mat-mdc-button-persistent-ripple::before{opacity:var(--mat-text-button-pressed-state-layer-opacity)}.mat-mdc-button .mat-mdc-button-touch-target{position:absolute;top:50%;height:48px;left:0;right:0;transform:translateY(-50%);display:var(--mat-text-button-touch-target-display)}.mat-mdc-button[disabled],.mat-mdc-button.mat-mdc-button-disabled{cursor:default;pointer-events:none;color:var(--mdc-text-button-disabled-label-text-color)}.mat-mdc-button.mat-mdc-button-disabled-interactive{pointer-events:auto}.mat-mdc-unelevated-button{font-family:var(--mdc-filled-button-label-text-font);font-size:var(--mdc-filled-button-label-text-size);letter-spacing:var(--mdc-filled-button-label-text-tracking);font-weight:var(--mdc-filled-button-label-text-weight);text-transform:var(--mdc-filled-button-label-text-transform);height:var(--mdc-filled-button-container-height);border-radius:var(--mdc-filled-button-container-shape);padding:0 var(--mat-filled-button-horizontal-padding, 16px)}.mat-mdc-unelevated-button:not(:disabled){background-color:var(--mdc-filled-button-container-color)}.mat-mdc-unelevated-button:disabled{background-color:var(--mdc-filled-button-disabled-container-color)}.mat-mdc-unelevated-button:not(:disabled){color:var(--mdc-filled-button-label-text-color)}.mat-mdc-unelevated-button:disabled{color:var(--mdc-filled-button-disabled-label-text-color)}.mat-mdc-unelevated-button .mdc-button__ripple{border-radius:var(--mdc-filled-button-container-shape)}.mat-mdc-unelevated-button>.mat-icon{margin-right:var(--mat-filled-button-icon-spacing, 8px);margin-left:var(--mat-filled-button-icon-offset, -4px)}[dir=rtl] .mat-mdc-unelevated-button>.mat-icon{margin-right:var(--mat-filled-button-icon-offset, -4px);margin-left:var(--mat-filled-button-icon-spacing, 8px)}.mat-mdc-unelevated-button .mdc-button__label+.mat-icon{margin-right:var(--mat-filled-button-icon-offset, -4px);margin-left:var(--mat-filled-button-icon-spacing, 8px)}[dir=rtl] .mat-mdc-unelevated-button .mdc-button__label+.mat-icon{margin-right:var(--mat-filled-button-icon-spacing, 8px);margin-left:var(--mat-filled-button-icon-offset, -4px)}.mat-mdc-unelevated-button .mat-ripple-element{background-color:var(--mat-filled-button-ripple-color)}.mat-mdc-unelevated-button .mat-mdc-button-persistent-ripple::before{background-color:var(--mat-filled-button-state-layer-color)}.mat-mdc-unelevated-button.mat-mdc-button-disabled .mat-mdc-button-persistent-ripple::before{background-color:var(--mat-filled-button-disabled-state-layer-color)}.mat-mdc-unelevated-button:hover .mat-mdc-button-persistent-ripple::before{opacity:var(--mat-filled-button-hover-state-layer-opacity)}.mat-mdc-unelevated-button.cdk-program-focused .mat-mdc-button-persistent-ripple::before,.mat-mdc-unelevated-button.cdk-keyboard-focused .mat-mdc-button-persistent-ripple::before,.mat-mdc-unelevated-button.mat-mdc-button-disabled-interactive:focus .mat-mdc-button-persistent-ripple::before{opacity:var(--mat-filled-button-focus-state-layer-opacity)}.mat-mdc-unelevated-button:active .mat-mdc-button-persistent-ripple::before{opacity:var(--mat-filled-button-pressed-state-layer-opacity)}.mat-mdc-unelevated-button .mat-mdc-button-touch-target{position:absolute;top:50%;height:48px;left:0;right:0;transform:translateY(-50%);display:var(--mat-filled-button-touch-target-display)}.mat-mdc-unelevated-button[disabled],.mat-mdc-unelevated-button.mat-mdc-button-disabled{cursor:default;pointer-events:none;color:var(--mdc-filled-button-disabled-label-text-color);background-color:var(--mdc-filled-button-disabled-container-color)}.mat-mdc-unelevated-button.mat-mdc-button-disabled-interactive{pointer-events:auto}.mat-mdc-raised-button{font-family:var(--mdc-protected-button-label-text-font);font-size:var(--mdc-protected-button-label-text-size);letter-spacing:var(--mdc-protected-button-label-text-tracking);font-weight:var(--mdc-protected-button-label-text-weight);text-transform:var(--mdc-protected-button-label-text-transform);height:var(--mdc-protected-button-container-height);border-radius:var(--mdc-protected-button-container-shape);padding:0 var(--mat-protected-button-horizontal-padding, 16px);box-shadow:var(--mdc-protected-button-container-elevation-shadow)}.mat-mdc-raised-button:not(:disabled){background-color:var(--mdc-protected-button-container-color)}.mat-mdc-raised-button:disabled{background-color:var(--mdc-protected-button-disabled-container-color)}.mat-mdc-raised-button:not(:disabled){color:var(--mdc-protected-button-label-text-color)}.mat-mdc-raised-button:disabled{color:var(--mdc-protected-button-disabled-label-text-color)}.mat-mdc-raised-button .mdc-button__ripple{border-radius:var(--mdc-protected-button-container-shape)}.mat-mdc-raised-button>.mat-icon{margin-right:var(--mat-protected-button-icon-spacing, 8px);margin-left:var(--mat-protected-button-icon-offset, -4px)}[dir=rtl] .mat-mdc-raised-button>.mat-icon{margin-right:var(--mat-protected-button-icon-offset, -4px);margin-left:var(--mat-protected-button-icon-spacing, 8px)}.mat-mdc-raised-button .mdc-button__label+.mat-icon{margin-right:var(--mat-protected-button-icon-offset, -4px);margin-left:var(--mat-protected-button-icon-spacing, 8px)}[dir=rtl] .mat-mdc-raised-button .mdc-button__label+.mat-icon{margin-right:var(--mat-protected-button-icon-spacing, 8px);margin-left:var(--mat-protected-button-icon-offset, -4px)}.mat-mdc-raised-button .mat-ripple-element{background-color:var(--mat-protected-button-ripple-color)}.mat-mdc-raised-button .mat-mdc-button-persistent-ripple::before{background-color:var(--mat-protected-button-state-layer-color)}.mat-mdc-raised-button.mat-mdc-button-disabled .mat-mdc-button-persistent-ripple::before{background-color:var(--mat-protected-button-disabled-state-layer-color)}.mat-mdc-raised-button:hover .mat-mdc-button-persistent-ripple::before{opacity:var(--mat-protected-button-hover-state-layer-opacity)}.mat-mdc-raised-button.cdk-program-focused .mat-mdc-button-persistent-ripple::before,.mat-mdc-raised-button.cdk-keyboard-focused .mat-mdc-button-persistent-ripple::before,.mat-mdc-raised-button.mat-mdc-button-disabled-interactive:focus .mat-mdc-button-persistent-ripple::before{opacity:var(--mat-protected-button-focus-state-layer-opacity)}.mat-mdc-raised-button:active .mat-mdc-button-persistent-ripple::before{opacity:var(--mat-protected-button-pressed-state-layer-opacity)}.mat-mdc-raised-button .mat-mdc-button-touch-target{position:absolute;top:50%;height:48px;left:0;right:0;transform:translateY(-50%);display:var(--mat-protected-button-touch-target-display)}.mat-mdc-raised-button:hover{box-shadow:var(--mdc-protected-button-hover-container-elevation-shadow)}.mat-mdc-raised-button:focus{box-shadow:var(--mdc-protected-button-focus-container-elevation-shadow)}.mat-mdc-raised-button:active,.mat-mdc-raised-button:focus:active{box-shadow:var(--mdc-protected-button-pressed-container-elevation-shadow)}.mat-mdc-raised-button[disabled],.mat-mdc-raised-button.mat-mdc-button-disabled{cursor:default;pointer-events:none;color:var(--mdc-protected-button-disabled-label-text-color);background-color:var(--mdc-protected-button-disabled-container-color)}.mat-mdc-raised-button[disabled].mat-mdc-button-disabled,.mat-mdc-raised-button.mat-mdc-button-disabled.mat-mdc-button-disabled{box-shadow:var(--mdc-protected-button-disabled-container-elevation-shadow)}.mat-mdc-raised-button.mat-mdc-button-disabled-interactive{pointer-events:auto}.mat-mdc-outlined-button{font-family:var(--mdc-outlined-button-label-text-font);font-size:var(--mdc-outlined-button-label-text-size);letter-spacing:var(--mdc-outlined-button-label-text-tracking);font-weight:var(--mdc-outlined-button-label-text-weight);text-transform:var(--mdc-outlined-button-label-text-transform);height:var(--mdc-outlined-button-container-height);border-radius:var(--mdc-outlined-button-container-shape);padding:0 15px 0 15px;border-width:var(--mdc-outlined-button-outline-width);padding:0 var(--mat-outlined-button-horizontal-padding, 15px)}.mat-mdc-outlined-button:not(:disabled){color:var(--mdc-outlined-button-label-text-color)}.mat-mdc-outlined-button:disabled{color:var(--mdc-outlined-button-disabled-label-text-color)}.mat-mdc-outlined-button .mdc-button__ripple{border-radius:var(--mdc-outlined-button-container-shape)}.mat-mdc-outlined-button:not(:disabled){border-color:var(--mdc-outlined-button-outline-color)}.mat-mdc-outlined-button:disabled{border-color:var(--mdc-outlined-button-disabled-outline-color)}.mat-mdc-outlined-button.mdc-button--icon-trailing{padding:0 11px 0 15px}.mat-mdc-outlined-button.mdc-button--icon-leading{padding:0 15px 0 11px}.mat-mdc-outlined-button .mdc-button__ripple{top:-1px;left:-1px;bottom:-1px;right:-1px;border-width:var(--mdc-outlined-button-outline-width)}.mat-mdc-outlined-button .mdc-button__touch{left:calc(-1 * var(--mdc-outlined-button-outline-width));width:calc(100% + 2 * var(--mdc-outlined-button-outline-width))}.mat-mdc-outlined-button>.mat-icon{margin-right:var(--mat-outlined-button-icon-spacing, 8px);margin-left:var(--mat-outlined-button-icon-offset, -4px)}[dir=rtl] .mat-mdc-outlined-button>.mat-icon{margin-right:var(--mat-outlined-button-icon-offset, -4px);margin-left:var(--mat-outlined-button-icon-spacing, 8px)}.mat-mdc-outlined-button .mdc-button__label+.mat-icon{margin-right:var(--mat-outlined-button-icon-offset, -4px);margin-left:var(--mat-outlined-button-icon-spacing, 8px)}[dir=rtl] .mat-mdc-outlined-button .mdc-button__label+.mat-icon{margin-right:var(--mat-outlined-button-icon-spacing, 8px);margin-left:var(--mat-outlined-button-icon-offset, -4px)}.mat-mdc-outlined-button .mat-ripple-element{background-color:var(--mat-outlined-button-ripple-color)}.mat-mdc-outlined-button .mat-mdc-button-persistent-ripple::before{background-color:var(--mat-outlined-button-state-layer-color)}.mat-mdc-outlined-button.mat-mdc-button-disabled .mat-mdc-button-persistent-ripple::before{background-color:var(--mat-outlined-button-disabled-state-layer-color)}.mat-mdc-outlined-button:hover .mat-mdc-button-persistent-ripple::before{opacity:var(--mat-outlined-button-hover-state-layer-opacity)}.mat-mdc-outlined-button.cdk-program-focused .mat-mdc-button-persistent-ripple::before,.mat-mdc-outlined-button.cdk-keyboard-focused .mat-mdc-button-persistent-ripple::before,.mat-mdc-outlined-button.mat-mdc-button-disabled-interactive:focus .mat-mdc-button-persistent-ripple::before{opacity:var(--mat-outlined-button-focus-state-layer-opacity)}.mat-mdc-outlined-button:active .mat-mdc-button-persistent-ripple::before{opacity:var(--mat-outlined-button-pressed-state-layer-opacity)}.mat-mdc-outlined-button .mat-mdc-button-touch-target{position:absolute;top:50%;height:48px;left:0;right:0;transform:translateY(-50%);display:var(--mat-outlined-button-touch-target-display)}.mat-mdc-outlined-button[disabled],.mat-mdc-outlined-button.mat-mdc-button-disabled{cursor:default;pointer-events:none;color:var(--mdc-outlined-button-disabled-label-text-color);border-color:var(--mdc-outlined-button-disabled-outline-color)}.mat-mdc-outlined-button.mat-mdc-button-disabled-interactive{pointer-events:auto}.mat-mdc-button-base{text-decoration:none}.mat-mdc-button,.mat-mdc-unelevated-button,.mat-mdc-raised-button,.mat-mdc-outlined-button{-webkit-tap-highlight-color:rgba(0,0,0,0)}.mat-mdc-button .mat-mdc-button-ripple,.mat-mdc-button .mat-mdc-button-persistent-ripple,.mat-mdc-button .mat-mdc-button-persistent-ripple::before,.mat-mdc-unelevated-button .mat-mdc-button-ripple,.mat-mdc-unelevated-button .mat-mdc-button-persistent-ripple,.mat-mdc-unelevated-button .mat-mdc-button-persistent-ripple::before,.mat-mdc-raised-button .mat-mdc-button-ripple,.mat-mdc-raised-button .mat-mdc-button-persistent-ripple,.mat-mdc-raised-button .mat-mdc-button-persistent-ripple::before,.mat-mdc-outlined-button .mat-mdc-button-ripple,.mat-mdc-outlined-button .mat-mdc-button-persistent-ripple,.mat-mdc-outlined-button .mat-mdc-button-persistent-ripple::before{top:0;left:0;right:0;bottom:0;position:absolute;pointer-events:none;border-radius:inherit}.mat-mdc-button .mat-mdc-button-ripple,.mat-mdc-unelevated-button .mat-mdc-button-ripple,.mat-mdc-raised-button .mat-mdc-button-ripple,.mat-mdc-outlined-button .mat-mdc-button-ripple{overflow:hidden}.mat-mdc-button .mat-mdc-button-persistent-ripple::before,.mat-mdc-unelevated-button .mat-mdc-button-persistent-ripple::before,.mat-mdc-raised-button .mat-mdc-button-persistent-ripple::before,.mat-mdc-outlined-button .mat-mdc-button-persistent-ripple::before{content:"";opacity:0}.mat-mdc-button .mdc-button__label,.mat-mdc-unelevated-button .mdc-button__label,.mat-mdc-raised-button .mdc-button__label,.mat-mdc-outlined-button .mdc-button__label{z-index:1}.mat-mdc-button .mat-mdc-focus-indicator,.mat-mdc-unelevated-button .mat-mdc-focus-indicator,.mat-mdc-raised-button .mat-mdc-focus-indicator,.mat-mdc-outlined-button .mat-mdc-focus-indicator{top:0;left:0;right:0;bottom:0;position:absolute}.mat-mdc-button:focus .mat-mdc-focus-indicator::before,.mat-mdc-unelevated-button:focus .mat-mdc-focus-indicator::before,.mat-mdc-raised-button:focus .mat-mdc-focus-indicator::before,.mat-mdc-outlined-button:focus .mat-mdc-focus-indicator::before{content:""}.mat-mdc-button._mat-animation-noopable,.mat-mdc-unelevated-button._mat-animation-noopable,.mat-mdc-raised-button._mat-animation-noopable,.mat-mdc-outlined-button._mat-animation-noopable{transition:none !important;animation:none !important}.mat-mdc-button>.mat-icon,.mat-mdc-unelevated-button>.mat-icon,.mat-mdc-raised-button>.mat-icon,.mat-mdc-outlined-button>.mat-icon{display:inline-block;position:relative;vertical-align:top;font-size:1.125rem;height:1.125rem;width:1.125rem}.mat-mdc-outlined-button .mat-mdc-button-ripple,.mat-mdc-outlined-button .mdc-button__ripple{top:-1px;left:-1px;bottom:-1px;right:-1px;border-width:-1px}.mat-mdc-unelevated-button .mat-mdc-focus-indicator::before,.mat-mdc-raised-button .mat-mdc-focus-indicator::before{margin:calc(calc(var(--mat-mdc-focus-indicator-border-width, 3px) + 2px)*-1)}.mat-mdc-outlined-button .mat-mdc-focus-indicator::before{margin:calc(calc(var(--mat-mdc-focus-indicator-border-width, 3px) + 3px)*-1)}', ".cdk-high-contrast-active .mat-mdc-button:not(.mdc-button--outlined),.cdk-high-contrast-active .mat-mdc-unelevated-button:not(.mdc-button--outlined),.cdk-high-contrast-active .mat-mdc-raised-button:not(.mdc-button--outlined),.cdk-high-contrast-active .mat-mdc-outlined-button:not(.mdc-button--outlined),.cdk-high-contrast-active .mat-mdc-icon-button{outline:solid 1px}"],
    encapsulation: 2,
    changeDetection: 0
  });
  let n = t;
  return n
})();
var _i = (() => {
  let t = class t {
  };
  t.\u0275fac = function (i) {
    return new (i || t)
  }, t.\u0275mod = S({type: t}), t.\u0275inj = M({imports: [J, ro, J]});
  let n = t;
  return n
})();
var se = class {
  get isAttached() {
    return this._attachedHost != null
  }

  attach(t) {
    return this._attachedHost = t, t.attach(this)
  }

  detach() {
    let t = this._attachedHost;
    t != null && (this._attachedHost = null, t.detach())
  }

  setAttachedHost(t) {
    this._attachedHost = t
  }
}, Ut = class extends se {
  constructor(t, r, e, i, o) {
    super(), this.component = t, this.viewContainerRef = r, this.injector = e, this.componentFactoryResolver = i, this.projectableNodes = o
  }
}, Yt = class extends se {
  constructor(t, r, e, i) {
    super(), this.templateRef = t, this.viewContainerRef = r, this.context = e, this.injector = i
  }

  get origin() {
    return this.templateRef.elementRef
  }

  attach(t, r = this.context) {
    return this.context = r, super.attach(t)
  }

  detach() {
    return this.context = void 0, super.detach()
  }
}, vi = class extends se {
  constructor(t) {
    super(), this.element = t instanceof k ? t.nativeElement : t
  }
}, qt = class {
  constructor() {
    this._isDisposed = !1, this.attachDomPortal = null
  }

  hasAttached() {
    return !!this._attachedPortal
  }

  attach(t) {
    if (t instanceof Ut) return this._attachedPortal = t, this.attachComponentPortal(t);
    if (t instanceof Yt) return this._attachedPortal = t, this.attachTemplatePortal(t);
    if (this.attachDomPortal && t instanceof vi) return this._attachedPortal = t, this.attachDomPortal(t)
  }

  detach() {
    this._attachedPortal && (this._attachedPortal.setAttachedHost(null), this._attachedPortal = null), this._invokeDisposeFn()
  }

  dispose() {
    this.hasAttached() && this.detach(), this._invokeDisposeFn(), this._isDisposed = !0
  }

  setDisposeFn(t) {
    this._disposeFn = t
  }

  _invokeDisposeFn() {
    this._disposeFn && (this._disposeFn(), this._disposeFn = null)
  }
};
var Oe = class extends qt {
  constructor(t, r, e, i, o) {
    super(), this.outletElement = t, this._componentFactoryResolver = r, this._appRef = e, this._defaultInjector = i, this.attachDomPortal = a => {
      this._document;
      let s = a.element;
      s.parentNode;
      let d = this._document.createComment("dom-portal");
      s.parentNode.insertBefore(d, s), this.outletElement.appendChild(s), this._attachedPortal = a, super.setDisposeFn(() => {
        d.parentNode && d.parentNode.replaceChild(s, d)
      })
    }, this._document = o
  }

  attachComponentPortal(t) {
    let e = (t.componentFactoryResolver || this._componentFactoryResolver).resolveComponentFactory(t.component), i;
    return t.viewContainerRef ? (i = t.viewContainerRef.createComponent(e, t.viewContainerRef.length, t.injector || t.viewContainerRef.injector, t.projectableNodes || void 0), this.setDisposeFn(() => i.destroy())) : (i = e.create(t.injector || this._defaultInjector || mt.NULL), this._appRef.attachView(i.hostView), this.setDisposeFn(() => {
      this._appRef.viewCount > 0 && this._appRef.detachView(i.hostView), i.destroy()
    })), this.outletElement.appendChild(this._getComponentRootNode(i)), this._attachedPortal = t, i
  }

  attachTemplatePortal(t) {
    let r = t.viewContainerRef, e = r.createEmbeddedView(t.templateRef, t.context, {injector: t.injector});
    return e.rootNodes.forEach(i => this.outletElement.appendChild(i)), e.detectChanges(), this.setDisposeFn(() => {
      let i = r.indexOf(e);
      i !== -1 && r.remove(i)
    }), this._attachedPortal = t, e
  }

  dispose() {
    super.dispose(), this.outletElement.remove()
  }

  _getComponentRootNode(t) {
    return t.hostView.rootNodes[0]
  }
};
var xi = (() => {
  let t = class t extends qt {
    constructor(e, i, o) {
      super(), this._componentFactoryResolver = e, this._viewContainerRef = i, this._isInitialized = !1, this.attached = new tt, this.attachDomPortal = a => {
        this._document;
        let s = a.element;
        s.parentNode;
        let d = this._document.createComment("dom-portal");
        a.setAttachedHost(this), s.parentNode.insertBefore(d, s), this._getRootNode().appendChild(s), this._attachedPortal = a, super.setDisposeFn(() => {
          d.parentNode && d.parentNode.replaceChild(s, d)
        })
      }, this._document = o
    }

    get portal() {
      return this._attachedPortal
    }

    set portal(e) {
      this.hasAttached() && !e && !this._isInitialized || (this.hasAttached() && super.detach(), e && super.attach(e), this._attachedPortal = e || null)
    }

    get attachedRef() {
      return this._attachedRef
    }

    ngOnInit() {
      this._isInitialized = !0
    }

    ngOnDestroy() {
      super.dispose(), this._attachedRef = this._attachedPortal = null
    }

    attachComponentPortal(e) {
      e.setAttachedHost(this);
      let i = e.viewContainerRef != null ? e.viewContainerRef : this._viewContainerRef,
        a = (e.componentFactoryResolver || this._componentFactoryResolver).resolveComponentFactory(e.component),
        s = i.createComponent(a, i.length, e.injector || i.injector, e.projectableNodes || void 0);
      return i !== this._viewContainerRef && this._getRootNode().appendChild(s.hostView.rootNodes[0]), super.setDisposeFn(() => s.destroy()), this._attachedPortal = e, this._attachedRef = s, this.attached.emit(s), s
    }

    attachTemplatePortal(e) {
      e.setAttachedHost(this);
      let i = this._viewContainerRef.createEmbeddedView(e.templateRef, e.context, {injector: e.injector});
      return super.setDisposeFn(() => this._viewContainerRef.clear()), this._attachedPortal = e, this._attachedRef = i, this.attached.emit(i), i
    }

    _getRootNode() {
      let e = this._viewContainerRef.element.nativeElement;
      return e.nodeType === e.ELEMENT_NODE ? e : e.parentNode
    }
  };
  t.\u0275fac = function (i) {
    return new (i || t)(l(ve), l(xe), l(I))
  }, t.\u0275dir = g({
    type: t,
    selectors: [["", "cdkPortalOutlet", ""]],
    inputs: {portal: [D.None, "cdkPortalOutlet", "portal"]},
    outputs: {attached: "attached"},
    exportAs: ["cdkPortalOutlet"],
    standalone: !0,
    features: [q]
  });
  let n = t;
  return n
})();
var sa = 20, so = (() => {
  let t = class t {
    constructor(e, i, o) {
      this._ngZone = e, this._platform = i, this._scrolled = new C, this._globalSubscription = null, this._scrolledCount = 0, this.scrollContainers = new Map, this._document = o
    }

    register(e) {
      this.scrollContainers.has(e) || this.scrollContainers.set(e, e.elementScrolled().subscribe(() => this._scrolled.next(e)))
    }

    deregister(e) {
      let i = this.scrollContainers.get(e);
      i && (i.unsubscribe(), this.scrollContainers.delete(e))
    }

    scrolled(e = sa) {
      return this._platform.isBrowser ? new Tt(i => {
        this._globalSubscription || this._addGlobalListener();
        let o = e > 0 ? this._scrolled.pipe(Xe(e)).subscribe(i) : this._scrolled.subscribe(i);
        return this._scrolledCount++, () => {
          o.unsubscribe(), this._scrolledCount--, this._scrolledCount || this._removeGlobalListener()
        }
      }) : pe()
    }

    ngOnDestroy() {
      this._removeGlobalListener(), this.scrollContainers.forEach((e, i) => this.deregister(i)), this._scrolled.complete()
    }

    ancestorScrolled(e, i) {
      let o = this.getAncestorScrollContainers(e);
      return this.scrolled(i).pipe(Ct(a => !a || o.indexOf(a) > -1))
    }

    getAncestorScrollContainers(e) {
      let i = [];
      return this.scrollContainers.forEach((o, a) => {
        this._scrollableContainsElement(a, e) && i.push(a)
      }), i
    }

    _getWindow() {
      return this._document.defaultView || window
    }

    _scrollableContainsElement(e, i) {
      let o = it(i), a = e.getElementRef().nativeElement;
      do if (o == a) return !0; while (o = o.parentElement);
      return !1
    }

    _addGlobalListener() {
      this._globalSubscription = this._ngZone.runOutsideAngular(() => {
        let e = this._getWindow();
        return $e(e.document, "scroll").subscribe(() => this._scrolled.next())
      })
    }

    _removeGlobalListener() {
      this._globalSubscription && (this._globalSubscription.unsubscribe(), this._globalSubscription = null)
    }
  };
  t.\u0275fac = function (i) {
    return new (i || t)(c(v), c(A), c(I, 8))
  }, t.\u0275prov = b({token: t, factory: t.\u0275fac, providedIn: "root"});
  let n = t;
  return n
})();
var da = 20, yi = (() => {
  let t = class t {
    constructor(e, i, o) {
      this._platform = e, this._change = new C, this._changeListener = a => {
        this._change.next(a)
      }, this._document = o, i.runOutsideAngular(() => {
        if (e.isBrowser) {
          let a = this._getWindow();
          a.addEventListener("resize", this._changeListener), a.addEventListener("orientationchange", this._changeListener)
        }
        this.change().subscribe(() => this._viewportSize = null)
      })
    }

    ngOnDestroy() {
      if (this._platform.isBrowser) {
        let e = this._getWindow();
        e.removeEventListener("resize", this._changeListener), e.removeEventListener("orientationchange", this._changeListener)
      }
      this._change.complete()
    }

    getViewportSize() {
      this._viewportSize || this._updateViewportSize();
      let e = {width: this._viewportSize.width, height: this._viewportSize.height};
      return this._platform.isBrowser || (this._viewportSize = null), e
    }

    getViewportRect() {
      let e = this.getViewportScrollPosition(), {width: i, height: o} = this.getViewportSize();
      return {top: e.top, left: e.left, bottom: e.top + o, right: e.left + i, height: o, width: i}
    }

    getViewportScrollPosition() {
      if (!this._platform.isBrowser) return {top: 0, left: 0};
      let e = this._document, i = this._getWindow(), o = e.documentElement, a = o.getBoundingClientRect(),
        s = -a.top || e.body.scrollTop || i.scrollY || o.scrollTop || 0,
        d = -a.left || e.body.scrollLeft || i.scrollX || o.scrollLeft || 0;
      return {top: s, left: d}
    }

    change(e = da) {
      return e > 0 ? this._change.pipe(Xe(e)) : this._change
    }

    _getWindow() {
      return this._document.defaultView || window
    }

    _updateViewportSize() {
      let e = this._getWindow();
      this._viewportSize = this._platform.isBrowser ? {width: e.innerWidth, height: e.innerHeight} : {
        width: 0,
        height: 0
      }
    }
  };
  t.\u0275fac = function (i) {
    return new (i || t)(c(A), c(v), c(I, 8))
  }, t.\u0275prov = b({token: t, factory: t.\u0275fac, providedIn: "root"});
  let n = t;
  return n
})();
var lo = Pn(), wi = class {
  constructor(t, r) {
    this._viewportRuler = t, this._previousHTMLStyles = {top: "", left: ""}, this._isEnabled = !1, this._document = r
  }

  attach() {
  }

  enable() {
    if (this._canBeEnabled()) {
      let t = this._document.documentElement;
      this._previousScrollPosition = this._viewportRuler.getViewportScrollPosition(), this._previousHTMLStyles.left = t.style.left || "", this._previousHTMLStyles.top = t.style.top || "", t.style.left = H(-this._previousScrollPosition.left), t.style.top = H(-this._previousScrollPosition.top), t.classList.add("cdk-global-scrollblock"), this._isEnabled = !0
    }
  }

  disable() {
    if (this._isEnabled) {
      let t = this._document.documentElement, r = this._document.body, e = t.style, i = r.style,
        o = e.scrollBehavior || "", a = i.scrollBehavior || "";
      this._isEnabled = !1, e.left = this._previousHTMLStyles.left, e.top = this._previousHTMLStyles.top, t.classList.remove("cdk-global-scrollblock"), lo && (e.scrollBehavior = i.scrollBehavior = "auto"), window.scroll(this._previousScrollPosition.left, this._previousScrollPosition.top), lo && (e.scrollBehavior = o, i.scrollBehavior = a)
    }
  }

  _canBeEnabled() {
    if (this._document.documentElement.classList.contains("cdk-global-scrollblock") || this._isEnabled) return !1;
    let r = this._document.body, e = this._viewportRuler.getViewportSize();
    return r.scrollHeight > e.height || r.scrollWidth > e.width
  }
};
var Ci = class {
  constructor(t, r, e, i) {
    this._scrollDispatcher = t, this._ngZone = r, this._viewportRuler = e, this._config = i, this._scrollSubscription = null, this._detach = () => {
      this.disable(), this._overlayRef.hasAttached() && this._ngZone.run(() => this._overlayRef.detach())
    }
  }

  attach(t) {
    this._overlayRef, this._overlayRef = t
  }

  enable() {
    if (this._scrollSubscription) return;
    let t = this._scrollDispatcher.scrolled(0).pipe(Ct(r => !r || !this._overlayRef.overlayElement.contains(r.getElementRef().nativeElement)));
    this._config && this._config.threshold && this._config.threshold > 1 ? (this._initialScrollPosition = this._viewportRuler.getViewportScrollPosition().top, this._scrollSubscription = t.subscribe(() => {
      let r = this._viewportRuler.getViewportScrollPosition().top;
      Math.abs(r - this._initialScrollPosition) > this._config.threshold ? this._detach() : this._overlayRef.updatePosition()
    })) : this._scrollSubscription = t.subscribe(this._detach)
  }

  disable() {
    this._scrollSubscription && (this._scrollSubscription.unsubscribe(), this._scrollSubscription = null)
  }

  detach() {
    this.disable(), this._overlayRef = null
  }
}, Fe = class {
  enable() {
  }

  disable() {
  }

  attach() {
  }
};

function Ei(n, t) {
  return t.some(r => {
    let e = n.bottom < r.top, i = n.top > r.bottom, o = n.right < r.left, a = n.left > r.right;
    return e || i || o || a
  })
}

function co(n, t) {
  return t.some(r => {
    let e = n.top < r.top, i = n.bottom > r.bottom, o = n.left < r.left, a = n.right > r.right;
    return e || i || o || a
  })
}

var Di = class {
  constructor(t, r, e, i) {
    this._scrollDispatcher = t, this._viewportRuler = r, this._ngZone = e, this._config = i, this._scrollSubscription = null
  }

  attach(t) {
    this._overlayRef, this._overlayRef = t
  }

  enable() {
    if (!this._scrollSubscription) {
      let t = this._config ? this._config.scrollThrottle : 0;
      this._scrollSubscription = this._scrollDispatcher.scrolled(t).subscribe(() => {
        if (this._overlayRef.updatePosition(), this._config && this._config.autoClose) {
          let r = this._overlayRef.overlayElement.getBoundingClientRect(), {
            width: e,
            height: i
          } = this._viewportRuler.getViewportSize();
          Ei(r, [{
            width: e,
            height: i,
            bottom: i,
            right: e,
            top: 0,
            left: 0
          }]) && (this.disable(), this._ngZone.run(() => this._overlayRef.detach()))
        }
      })
    }
  }

  disable() {
    this._scrollSubscription && (this._scrollSubscription.unsubscribe(), this._scrollSubscription = null)
  }

  detach() {
    this.disable(), this._overlayRef = null
  }
}, ma = (() => {
  let t = class t {
    constructor(e, i, o, a) {
      this._scrollDispatcher = e, this._viewportRuler = i, this._ngZone = o, this.noop = () => new Fe, this.close = s => new Ci(this._scrollDispatcher, this._ngZone, this._viewportRuler, s), this.block = () => new wi(this._viewportRuler, this._document), this.reposition = s => new Di(this._scrollDispatcher, this._viewportRuler, this._ngZone, s), this._document = a
    }
  };
  t.\u0275fac = function (i) {
    return new (i || t)(c(so), c(yi), c(v), c(I))
  }, t.\u0275prov = b({token: t, factory: t.\u0275fac, providedIn: "root"});
  let n = t;
  return n
})(), de = class {
  constructor(t) {
    if (this.scrollStrategy = new Fe, this.panelClass = "", this.hasBackdrop = !1, this.backdropClass = "cdk-overlay-dark-backdrop", this.disposeOnNavigation = !1, t) {
      let r = Object.keys(t);
      for (let e of r) t[e] !== void 0 && (this[e] = t[e])
    }
  }
};
var ki = class {
  constructor(t, r) {
    this.connectionPair = t, this.scrollableViewProperties = r
  }
};
var po = (() => {
  let t = class t {
    constructor(e) {
      this._attachedOverlays = [], this._document = e
    }

    ngOnDestroy() {
      this.detach()
    }

    add(e) {
      this.remove(e), this._attachedOverlays.push(e)
    }

    remove(e) {
      let i = this._attachedOverlays.indexOf(e);
      i > -1 && this._attachedOverlays.splice(i, 1), this._attachedOverlays.length === 0 && this.detach()
    }
  };
  t.\u0275fac = function (i) {
    return new (i || t)(c(I))
  }, t.\u0275prov = b({token: t, factory: t.\u0275fac, providedIn: "root"});
  let n = t;
  return n
})(), ua = (() => {
  let t = class t extends po {
    constructor(e, i) {
      super(e), this._ngZone = i, this._keydownListener = o => {
        let a = this._attachedOverlays;
        for (let s = a.length - 1; s > -1; s--) if (a[s]._keydownEvents.observers.length > 0) {
          let d = a[s]._keydownEvents;
          this._ngZone ? this._ngZone.run(() => d.next(o)) : d.next(o);
          break
        }
      }
    }

    add(e) {
      super.add(e), this._isAttached || (this._ngZone ? this._ngZone.runOutsideAngular(() => this._document.body.addEventListener("keydown", this._keydownListener)) : this._document.body.addEventListener("keydown", this._keydownListener), this._isAttached = !0)
    }

    detach() {
      this._isAttached && (this._document.body.removeEventListener("keydown", this._keydownListener), this._isAttached = !1)
    }
  };
  t.\u0275fac = function (i) {
    return new (i || t)(c(I), c(v, 8))
  }, t.\u0275prov = b({token: t, factory: t.\u0275fac, providedIn: "root"});
  let n = t;
  return n
})(), ha = (() => {
  let t = class t extends po {
    constructor(e, i, o) {
      super(e), this._platform = i, this._ngZone = o, this._cursorStyleIsSet = !1, this._pointerDownListener = a => {
        this._pointerDownEventTarget = lt(a)
      }, this._clickListener = a => {
        let s = lt(a), d = a.type === "click" && this._pointerDownEventTarget ? this._pointerDownEventTarget : s;
        this._pointerDownEventTarget = null;
        let f = this._attachedOverlays.slice();
        for (let m = f.length - 1; m > -1; m--) {
          let p = f[m];
          if (p._outsidePointerEvents.observers.length < 1 || !p.hasAttached()) continue;
          if (p.overlayElement.contains(s) || p.overlayElement.contains(d)) break;
          let G = p._outsidePointerEvents;
          this._ngZone ? this._ngZone.run(() => G.next(a)) : G.next(a)
        }
      }
    }

    add(e) {
      if (super.add(e), !this._isAttached) {
        let i = this._document.body;
        this._ngZone ? this._ngZone.runOutsideAngular(() => this._addEventListeners(i)) : this._addEventListeners(i), this._platform.IOS && !this._cursorStyleIsSet && (this._cursorOriginalValue = i.style.cursor, i.style.cursor = "pointer", this._cursorStyleIsSet = !0), this._isAttached = !0
      }
    }

    detach() {
      if (this._isAttached) {
        let e = this._document.body;
        e.removeEventListener("pointerdown", this._pointerDownListener, !0), e.removeEventListener("click", this._clickListener, !0), e.removeEventListener("auxclick", this._clickListener, !0), e.removeEventListener("contextmenu", this._clickListener, !0), this._platform.IOS && this._cursorStyleIsSet && (e.style.cursor = this._cursorOriginalValue, this._cursorStyleIsSet = !1), this._isAttached = !1
      }
    }

    _addEventListeners(e) {
      e.addEventListener("pointerdown", this._pointerDownListener, !0), e.addEventListener("click", this._clickListener, !0), e.addEventListener("auxclick", this._clickListener, !0), e.addEventListener("contextmenu", this._clickListener, !0)
    }
  };
  t.\u0275fac = function (i) {
    return new (i || t)(c(I), c(A), c(v, 8))
  }, t.\u0275prov = b({token: t, factory: t.\u0275fac, providedIn: "root"});
  let n = t;
  return n
})(), bo = (() => {
  let t = class t {
    constructor(e, i) {
      this._platform = i, this._document = e
    }

    ngOnDestroy() {
      this._containerElement?.remove()
    }

    getContainerElement() {
      return this._containerElement || this._createContainer(), this._containerElement
    }

    _createContainer() {
      let e = "cdk-overlay-container";
      if (this._platform.isBrowser || re()) {
        let o = this._document.querySelectorAll(`.${e}[platform="server"], .${e}[platform="test"]`);
        for (let a = 0; a < o.length; a++) o[a].remove()
      }
      let i = this._document.createElement("div");
      i.classList.add(e), re() ? i.setAttribute("platform", "test") : this._platform.isBrowser || i.setAttribute("platform", "server"), this._document.body.appendChild(i), this._containerElement = i
    }
  };
  t.\u0275fac = function (i) {
    return new (i || t)(c(I), c(A))
  }, t.\u0275prov = b({token: t, factory: t.\u0275fac, providedIn: "root"});
  let n = t;
  return n
})(), Ii = class {
  constructor(t, r, e, i, o, a, s, d, f, m = !1) {
    this._portalOutlet = t, this._host = r, this._pane = e, this._config = i, this._ngZone = o, this._keyboardDispatcher = a, this._document = s, this._location = d, this._outsideClickDispatcher = f, this._animationsDisabled = m, this._backdropElement = null, this._backdropClick = new C, this._attachments = new C, this._detachments = new C, this._locationChanges = wt.EMPTY, this._backdropClickHandler = p => this._backdropClick.next(p), this._backdropTransitionendHandler = p => {
      this._disposeBackdrop(p.target)
    }, this._keydownEvents = new C, this._outsidePointerEvents = new C, i.scrollStrategy && (this._scrollStrategy = i.scrollStrategy, this._scrollStrategy.attach(this)), this._positionStrategy = i.positionStrategy
  }

  get overlayElement() {
    return this._pane
  }

  get backdropElement() {
    return this._backdropElement
  }

  get hostElement() {
    return this._host
  }

  attach(t) {
    !this._host.parentElement && this._previousHostParent && this._previousHostParent.appendChild(this._host);
    let r = this._portalOutlet.attach(t);
    return this._positionStrategy && this._positionStrategy.attach(this), this._updateStackingOrder(), this._updateElementSize(), this._updateElementDirection(), this._scrollStrategy && this._scrollStrategy.enable(), this._ngZone.onStable.pipe(Qt(1)).subscribe(() => {
      this.hasAttached() && this.updatePosition()
    }), this._togglePointerEvents(!0), this._config.hasBackdrop && this._attachBackdrop(), this._config.panelClass && this._toggleClasses(this._pane, this._config.panelClass, !0), this._attachments.next(), this._keyboardDispatcher.add(this), this._config.disposeOnNavigation && (this._locationChanges = this._location.subscribe(() => this.dispose())), this._outsideClickDispatcher.add(this), typeof r?.onDestroy == "function" && r.onDestroy(() => {
      this.hasAttached() && this._ngZone.runOutsideAngular(() => Promise.resolve().then(() => this.detach()))
    }), r
  }

  detach() {
    if (!this.hasAttached()) return;
    this.detachBackdrop(), this._togglePointerEvents(!1), this._positionStrategy && this._positionStrategy.detach && this._positionStrategy.detach(), this._scrollStrategy && this._scrollStrategy.disable();
    let t = this._portalOutlet.detach();
    return this._detachments.next(), this._keyboardDispatcher.remove(this), this._detachContentWhenStable(), this._locationChanges.unsubscribe(), this._outsideClickDispatcher.remove(this), t
  }

  dispose() {
    let t = this.hasAttached();
    this._positionStrategy && this._positionStrategy.dispose(), this._disposeScrollStrategy(), this._disposeBackdrop(this._backdropElement), this._locationChanges.unsubscribe(), this._keyboardDispatcher.remove(this), this._portalOutlet.dispose(), this._attachments.complete(), this._backdropClick.complete(), this._keydownEvents.complete(), this._outsidePointerEvents.complete(), this._outsideClickDispatcher.remove(this), this._host?.remove(), this._previousHostParent = this._pane = this._host = null, t && this._detachments.next(), this._detachments.complete()
  }

  hasAttached() {
    return this._portalOutlet.hasAttached()
  }

  backdropClick() {
    return this._backdropClick
  }

  attachments() {
    return this._attachments
  }

  detachments() {
    return this._detachments
  }

  keydownEvents() {
    return this._keydownEvents
  }

  outsidePointerEvents() {
    return this._outsidePointerEvents
  }

  getConfig() {
    return this._config
  }

  updatePosition() {
    this._positionStrategy && this._positionStrategy.apply()
  }

  updatePositionStrategy(t) {
    t !== this._positionStrategy && (this._positionStrategy && this._positionStrategy.dispose(), this._positionStrategy = t, this.hasAttached() && (t.attach(this), this.updatePosition()))
  }

  updateSize(t) {
    this._config = y(y({}, this._config), t), this._updateElementSize()
  }

  setDirection(t) {
    this._config = ct(y({}, this._config), {direction: t}), this._updateElementDirection()
  }

  addPanelClass(t) {
    this._pane && this._toggleClasses(this._pane, t, !0)
  }

  removePanelClass(t) {
    this._pane && this._toggleClasses(this._pane, t, !1)
  }

  getDirection() {
    let t = this._config.direction;
    return t ? typeof t == "string" ? t : t.value : "ltr"
  }

  updateScrollStrategy(t) {
    t !== this._scrollStrategy && (this._disposeScrollStrategy(), this._scrollStrategy = t, this.hasAttached() && (t.attach(this), t.enable()))
  }

  _updateElementDirection() {
    this._host.setAttribute("dir", this.getDirection())
  }

  _updateElementSize() {
    if (!this._pane) return;
    let t = this._pane.style;
    t.width = H(this._config.width), t.height = H(this._config.height), t.minWidth = H(this._config.minWidth), t.minHeight = H(this._config.minHeight), t.maxWidth = H(this._config.maxWidth), t.maxHeight = H(this._config.maxHeight)
  }

  _togglePointerEvents(t) {
    this._pane.style.pointerEvents = t ? "" : "none"
  }

  _attachBackdrop() {
    let t = "cdk-overlay-backdrop-showing";
    this._backdropElement = this._document.createElement("div"), this._backdropElement.classList.add("cdk-overlay-backdrop"), this._animationsDisabled && this._backdropElement.classList.add("cdk-overlay-backdrop-noop-animation"), this._config.backdropClass && this._toggleClasses(this._backdropElement, this._config.backdropClass, !0), this._host.parentElement.insertBefore(this._backdropElement, this._host), this._backdropElement.addEventListener("click", this._backdropClickHandler), !this._animationsDisabled && typeof requestAnimationFrame < "u" ? this._ngZone.runOutsideAngular(() => {
      requestAnimationFrame(() => {
        this._backdropElement && this._backdropElement.classList.add(t)
      })
    }) : this._backdropElement.classList.add(t)
  }

  _updateStackingOrder() {
    this._host.nextSibling && this._host.parentNode.appendChild(this._host)
  }

  detachBackdrop() {
    let t = this._backdropElement;
    if (t) {
      if (this._animationsDisabled) {
        this._disposeBackdrop(t);
        return
      }
      t.classList.remove("cdk-overlay-backdrop-showing"), this._ngZone.runOutsideAngular(() => {
        t.addEventListener("transitionend", this._backdropTransitionendHandler)
      }), t.style.pointerEvents = "none", this._backdropTimeout = this._ngZone.runOutsideAngular(() => setTimeout(() => {
        this._disposeBackdrop(t)
      }, 500))
    }
  }

  _toggleClasses(t, r, e) {
    let i = zt(r || []).filter(o => !!o);
    i.length && (e ? t.classList.add(...i) : t.classList.remove(...i))
  }

  _detachContentWhenStable() {
    this._ngZone.runOutsideAngular(() => {
      let t = this._ngZone.onStable.pipe(K(be(this._attachments, this._detachments))).subscribe(() => {
        (!this._pane || !this._host || this._pane.children.length === 0) && (this._pane && this._config.panelClass && this._toggleClasses(this._pane, this._config.panelClass, !1), this._host && this._host.parentElement && (this._previousHostParent = this._host.parentElement, this._host.remove()), t.unsubscribe())
      })
    })
  }

  _disposeScrollStrategy() {
    let t = this._scrollStrategy;
    t && (t.disable(), t.detach && t.detach())
  }

  _disposeBackdrop(t) {
    t && (t.removeEventListener("click", this._backdropClickHandler), t.removeEventListener("transitionend", this._backdropTransitionendHandler), t.remove(), this._backdropElement === t && (this._backdropElement = null)), this._backdropTimeout && (clearTimeout(this._backdropTimeout), this._backdropTimeout = void 0)
  }
}, mo = "cdk-overlay-connected-position-bounding-box", fa = /([A-Za-z%]+)$/, Mi = class {
  constructor(t, r, e, i, o) {
    this._viewportRuler = r, this._document = e, this._platform = i, this._overlayContainer = o, this._lastBoundingBoxSize = {
      width: 0,
      height: 0
    }, this._isPushed = !1, this._canPush = !0, this._growAfterOpen = !1, this._hasFlexibleDimensions = !0, this._positionLocked = !1, this._viewportMargin = 0, this._scrollables = [], this._preferredPositions = [], this._positionChanges = new C, this._resizeSubscription = wt.EMPTY, this._offsetX = 0, this._offsetY = 0, this._appliedPanelClasses = [], this.positionChanges = this._positionChanges, this.setOrigin(t)
  }

  get positions() {
    return this._preferredPositions
  }

  attach(t) {
    this._overlayRef && this._overlayRef, this._validatePositions(), t.hostElement.classList.add(mo), this._overlayRef = t, this._boundingBox = t.hostElement, this._pane = t.overlayElement, this._isDisposed = !1, this._isInitialRender = !0, this._lastPosition = null, this._resizeSubscription.unsubscribe(), this._resizeSubscription = this._viewportRuler.change().subscribe(() => {
      this._isInitialRender = !0, this.apply()
    })
  }

  apply() {
    if (this._isDisposed || !this._platform.isBrowser) return;
    if (!this._isInitialRender && this._positionLocked && this._lastPosition) {
      this.reapplyLastPosition();
      return
    }
    this._clearPanelClasses(), this._resetOverlayElementStyles(), this._resetBoundingBoxStyles(), this._viewportRect = this._getNarrowedViewportRect(), this._originRect = this._getOriginRect(), this._overlayRect = this._pane.getBoundingClientRect(), this._containerRect = this._overlayContainer.getContainerElement().getBoundingClientRect();
    let t = this._originRect, r = this._overlayRect, e = this._viewportRect, i = this._containerRect, o = [], a;
    for (let s of this._preferredPositions) {
      let d = this._getOriginPoint(t, i, s), f = this._getOverlayPoint(d, r, s), m = this._getOverlayFit(f, r, e, s);
      if (m.isCompletelyWithinViewport) {
        this._isPushed = !1, this._applyPosition(s, d);
        return
      }
      if (this._canFitWithFlexibleDimensions(m, f, e)) {
        o.push({position: s, origin: d, overlayRect: r, boundingBoxRect: this._calculateBoundingBoxRect(d, s)});
        continue
      }
      (!a || a.overlayFit.visibleArea < m.visibleArea) && (a = {
        overlayFit: m,
        overlayPoint: f,
        originPoint: d,
        position: s,
        overlayRect: r
      })
    }
    if (o.length) {
      let s = null, d = -1;
      for (let f of o) {
        let m = f.boundingBoxRect.width * f.boundingBoxRect.height * (f.position.weight || 1);
        m > d && (d = m, s = f)
      }
      this._isPushed = !1, this._applyPosition(s.position, s.origin);
      return
    }
    if (this._canPush) {
      this._isPushed = !0, this._applyPosition(a.position, a.originPoint);
      return
    }
    this._applyPosition(a.position, a.originPoint)
  }

  detach() {
    this._clearPanelClasses(), this._lastPosition = null, this._previousPushAmount = null, this._resizeSubscription.unsubscribe()
  }

  dispose() {
    this._isDisposed || (this._boundingBox && Rt(this._boundingBox.style, {
      top: "",
      left: "",
      right: "",
      bottom: "",
      height: "",
      width: "",
      alignItems: "",
      justifyContent: ""
    }), this._pane && this._resetOverlayElementStyles(), this._overlayRef && this._overlayRef.hostElement.classList.remove(mo), this.detach(), this._positionChanges.complete(), this._overlayRef = this._boundingBox = null, this._isDisposed = !0)
  }

  reapplyLastPosition() {
    if (this._isDisposed || !this._platform.isBrowser) return;
    let t = this._lastPosition;
    if (t) {
      this._originRect = this._getOriginRect(), this._overlayRect = this._pane.getBoundingClientRect(), this._viewportRect = this._getNarrowedViewportRect(), this._containerRect = this._overlayContainer.getContainerElement().getBoundingClientRect();
      let r = this._getOriginPoint(this._originRect, this._containerRect, t);
      this._applyPosition(t, r)
    } else this.apply()
  }

  withScrollableContainers(t) {
    return this._scrollables = t, this
  }

  withPositions(t) {
    return this._preferredPositions = t, t.indexOf(this._lastPosition) === -1 && (this._lastPosition = null), this._validatePositions(), this
  }

  withViewportMargin(t) {
    return this._viewportMargin = t, this
  }

  withFlexibleDimensions(t = !0) {
    return this._hasFlexibleDimensions = t, this
  }

  withGrowAfterOpen(t = !0) {
    return this._growAfterOpen = t, this
  }

  withPush(t = !0) {
    return this._canPush = t, this
  }

  withLockedPosition(t = !0) {
    return this._positionLocked = t, this
  }

  setOrigin(t) {
    return this._origin = t, this
  }

  withDefaultOffsetX(t) {
    return this._offsetX = t, this
  }

  withDefaultOffsetY(t) {
    return this._offsetY = t, this
  }

  withTransformOriginOn(t) {
    return this._transformOriginSelector = t, this
  }

  _getOriginPoint(t, r, e) {
    let i;
    if (e.originX == "center") i = t.left + t.width / 2; else {
      let a = this._isRtl() ? t.right : t.left, s = this._isRtl() ? t.left : t.right;
      i = e.originX == "start" ? a : s
    }
    r.left < 0 && (i -= r.left);
    let o;
    return e.originY == "center" ? o = t.top + t.height / 2 : o = e.originY == "top" ? t.top : t.bottom, r.top < 0 && (o -= r.top), {
      x: i,
      y: o
    }
  }

  _getOverlayPoint(t, r, e) {
    let i;
    e.overlayX == "center" ? i = -r.width / 2 : e.overlayX === "start" ? i = this._isRtl() ? -r.width : 0 : i = this._isRtl() ? 0 : -r.width;
    let o;
    return e.overlayY == "center" ? o = -r.height / 2 : o = e.overlayY == "top" ? 0 : -r.height, {
      x: t.x + i,
      y: t.y + o
    }
  }

  _getOverlayFit(t, r, e, i) {
    let o = ho(r), {x: a, y: s} = t, d = this._getOffset(i, "x"), f = this._getOffset(i, "y");
    d && (a += d), f && (s += f);
    let m = 0 - a, p = a + o.width - e.width, G = 0 - s, z = s + o.height - e.height,
      j = this._subtractOverflows(o.width, m, p), L = this._subtractOverflows(o.height, G, z), ot = j * L;
    return {
      visibleArea: ot,
      isCompletelyWithinViewport: o.width * o.height === ot,
      fitsInViewportVertically: L === o.height,
      fitsInViewportHorizontally: j == o.width
    }
  }

  _canFitWithFlexibleDimensions(t, r, e) {
    if (this._hasFlexibleDimensions) {
      let i = e.bottom - r.y, o = e.right - r.x, a = uo(this._overlayRef.getConfig().minHeight),
        s = uo(this._overlayRef.getConfig().minWidth), d = t.fitsInViewportVertically || a != null && a <= i,
        f = t.fitsInViewportHorizontally || s != null && s <= o;
      return d && f
    }
    return !1
  }

  _pushOverlayOnScreen(t, r, e) {
    if (this._previousPushAmount && this._positionLocked) return {
      x: t.x + this._previousPushAmount.x,
      y: t.y + this._previousPushAmount.y
    };
    let i = ho(r), o = this._viewportRect, a = Math.max(t.x + i.width - o.width, 0),
      s = Math.max(t.y + i.height - o.height, 0), d = Math.max(o.top - e.top - t.y, 0),
      f = Math.max(o.left - e.left - t.x, 0), m = 0, p = 0;
    return i.width <= o.width ? m = f || -a : m = t.x < this._viewportMargin ? o.left - e.left - t.x : 0, i.height <= o.height ? p = d || -s : p = t.y < this._viewportMargin ? o.top - e.top - t.y : 0, this._previousPushAmount = {
      x: m,
      y: p
    }, {x: t.x + m, y: t.y + p}
  }

  _applyPosition(t, r) {
    if (this._setTransformOrigin(t), this._setOverlayElementStyles(r, t), this._setBoundingBoxStyles(r, t), t.panelClass && this._addPanelClasses(t.panelClass), this._positionChanges.observers.length) {
      let e = this._getScrollVisibility();
      if (t !== this._lastPosition || !this._lastScrollVisibility || !pa(this._lastScrollVisibility, e)) {
        let i = new ki(t, e);
        this._positionChanges.next(i)
      }
      this._lastScrollVisibility = e
    }
    this._lastPosition = t, this._isInitialRender = !1
  }

  _setTransformOrigin(t) {
    if (!this._transformOriginSelector) return;
    let r = this._boundingBox.querySelectorAll(this._transformOriginSelector), e, i = t.overlayY;
    t.overlayX === "center" ? e = "center" : this._isRtl() ? e = t.overlayX === "start" ? "right" : "left" : e = t.overlayX === "start" ? "left" : "right";
    for (let o = 0; o < r.length; o++) r[o].style.transformOrigin = `${e} ${i}`
  }

  _calculateBoundingBoxRect(t, r) {
    let e = this._viewportRect, i = this._isRtl(), o, a, s;
    if (r.overlayY === "top") a = t.y, o = e.height - a + this._viewportMargin; else if (r.overlayY === "bottom") s = e.height - t.y + this._viewportMargin * 2, o = e.height - s + this._viewportMargin; else {
      let z = Math.min(e.bottom - t.y + e.top, t.y), j = this._lastBoundingBoxSize.height;
      o = z * 2, a = t.y - z, o > j && !this._isInitialRender && !this._growAfterOpen && (a = t.y - j / 2)
    }
    let d = r.overlayX === "start" && !i || r.overlayX === "end" && i,
      f = r.overlayX === "end" && !i || r.overlayX === "start" && i, m, p, G;
    if (f) G = e.width - t.x + this._viewportMargin * 2, m = t.x - this._viewportMargin; else if (d) p = t.x, m = e.right - t.x; else {
      let z = Math.min(e.right - t.x + e.left, t.x), j = this._lastBoundingBoxSize.width;
      m = z * 2, p = t.x - z, m > j && !this._isInitialRender && !this._growAfterOpen && (p = t.x - j / 2)
    }
    return {top: a, left: p, bottom: s, right: G, width: m, height: o}
  }

  _setBoundingBoxStyles(t, r) {
    let e = this._calculateBoundingBoxRect(t, r);
    !this._isInitialRender && !this._growAfterOpen && (e.height = Math.min(e.height, this._lastBoundingBoxSize.height), e.width = Math.min(e.width, this._lastBoundingBoxSize.width));
    let i = {};
    if (this._hasExactPosition()) i.top = i.left = "0", i.bottom = i.right = i.maxHeight = i.maxWidth = "", i.width = i.height = "100%"; else {
      let o = this._overlayRef.getConfig().maxHeight, a = this._overlayRef.getConfig().maxWidth;
      i.height = H(e.height), i.top = H(e.top), i.bottom = H(e.bottom), i.width = H(e.width), i.left = H(e.left), i.right = H(e.right), r.overlayX === "center" ? i.alignItems = "center" : i.alignItems = r.overlayX === "end" ? "flex-end" : "flex-start", r.overlayY === "center" ? i.justifyContent = "center" : i.justifyContent = r.overlayY === "bottom" ? "flex-end" : "flex-start", o && (i.maxHeight = H(o)), a && (i.maxWidth = H(a))
    }
    this._lastBoundingBoxSize = e, Rt(this._boundingBox.style, i)
  }

  _resetBoundingBoxStyles() {
    Rt(this._boundingBox.style, {
      top: "0",
      left: "0",
      right: "0",
      bottom: "0",
      height: "",
      width: "",
      alignItems: "",
      justifyContent: ""
    })
  }

  _resetOverlayElementStyles() {
    Rt(this._pane.style, {top: "", left: "", bottom: "", right: "", position: "", transform: ""})
  }

  _setOverlayElementStyles(t, r) {
    let e = {}, i = this._hasExactPosition(), o = this._hasFlexibleDimensions, a = this._overlayRef.getConfig();
    if (i) {
      let m = this._viewportRuler.getViewportScrollPosition();
      Rt(e, this._getExactOverlayY(r, t, m)), Rt(e, this._getExactOverlayX(r, t, m))
    } else e.position = "static";
    let s = "", d = this._getOffset(r, "x"), f = this._getOffset(r, "y");
    d && (s += `translateX(${d}px) `), f && (s += `translateY(${f}px)`), e.transform = s.trim(), a.maxHeight && (i ? e.maxHeight = H(a.maxHeight) : o && (e.maxHeight = "")), a.maxWidth && (i ? e.maxWidth = H(a.maxWidth) : o && (e.maxWidth = "")), Rt(this._pane.style, e)
  }

  _getExactOverlayY(t, r, e) {
    let i = {top: "", bottom: ""}, o = this._getOverlayPoint(r, this._overlayRect, t);
    if (this._isPushed && (o = this._pushOverlayOnScreen(o, this._overlayRect, e)), t.overlayY === "bottom") {
      let a = this._document.documentElement.clientHeight;
      i.bottom = `${a - (o.y + this._overlayRect.height)}px`
    } else i.top = H(o.y);
    return i
  }

  _getExactOverlayX(t, r, e) {
    let i = {left: "", right: ""}, o = this._getOverlayPoint(r, this._overlayRect, t);
    this._isPushed && (o = this._pushOverlayOnScreen(o, this._overlayRect, e));
    let a;
    if (this._isRtl() ? a = t.overlayX === "end" ? "left" : "right" : a = t.overlayX === "end" ? "right" : "left", a === "right") {
      let s = this._document.documentElement.clientWidth;
      i.right = `${s - (o.x + this._overlayRect.width)}px`
    } else i.left = H(o.x);
    return i
  }

  _getScrollVisibility() {
    let t = this._getOriginRect(), r = this._pane.getBoundingClientRect(),
      e = this._scrollables.map(i => i.getElementRef().nativeElement.getBoundingClientRect());
    return {
      isOriginClipped: co(t, e),
      isOriginOutsideView: Ei(t, e),
      isOverlayClipped: co(r, e),
      isOverlayOutsideView: Ei(r, e)
    }
  }

  _subtractOverflows(t, ...r) {
    return r.reduce((e, i) => e - Math.max(i, 0), t)
  }

  _getNarrowedViewportRect() {
    let t = this._document.documentElement.clientWidth, r = this._document.documentElement.clientHeight,
      e = this._viewportRuler.getViewportScrollPosition();
    return {
      top: e.top + this._viewportMargin,
      left: e.left + this._viewportMargin,
      right: e.left + t - this._viewportMargin,
      bottom: e.top + r - this._viewportMargin,
      width: t - 2 * this._viewportMargin,
      height: r - 2 * this._viewportMargin
    }
  }

  _isRtl() {
    return this._overlayRef.getDirection() === "rtl"
  }

  _hasExactPosition() {
    return !this._hasFlexibleDimensions || this._isPushed
  }

  _getOffset(t, r) {
    return r === "x" ? t.offsetX == null ? this._offsetX : t.offsetX : t.offsetY == null ? this._offsetY : t.offsetY
  }

  _validatePositions() {
  }

  _addPanelClasses(t) {
    this._pane && zt(t).forEach(r => {
      r !== "" && this._appliedPanelClasses.indexOf(r) === -1 && (this._appliedPanelClasses.push(r), this._pane.classList.add(r))
    })
  }

  _clearPanelClasses() {
    this._pane && (this._appliedPanelClasses.forEach(t => {
      this._pane.classList.remove(t)
    }), this._appliedPanelClasses = [])
  }

  _getOriginRect() {
    let t = this._origin;
    if (t instanceof k) return t.nativeElement.getBoundingClientRect();
    if (t instanceof Element) return t.getBoundingClientRect();
    let r = t.width || 0, e = t.height || 0;
    return {top: t.y, bottom: t.y + e, left: t.x, right: t.x + r, height: e, width: r}
  }
};

function Rt(n, t) {
  for (let r in t) t.hasOwnProperty(r) && (n[r] = t[r]);
  return n
}

function uo(n) {
  if (typeof n != "number" && n != null) {
    let [t, r] = n.split(fa);
    return !r || r === "px" ? parseFloat(t) : null
  }
  return n || null
}

function ho(n) {
  return {
    top: Math.floor(n.top),
    right: Math.floor(n.right),
    bottom: Math.floor(n.bottom),
    left: Math.floor(n.left),
    width: Math.floor(n.width),
    height: Math.floor(n.height)
  }
}

function pa(n, t) {
  return n === t ? !0 : n.isOriginClipped === t.isOriginClipped && n.isOriginOutsideView === t.isOriginOutsideView && n.isOverlayClipped === t.isOverlayClipped && n.isOverlayOutsideView === t.isOverlayOutsideView
}

var fo = "cdk-global-overlay-wrapper", Si = class {
  constructor() {
    this._cssPosition = "static", this._topOffset = "", this._bottomOffset = "", this._alignItems = "", this._xPosition = "", this._xOffset = "", this._width = "", this._height = "", this._isDisposed = !1
  }

  attach(t) {
    let r = t.getConfig();
    this._overlayRef = t, this._width && !r.width && t.updateSize({width: this._width}), this._height && !r.height && t.updateSize({height: this._height}), t.hostElement.classList.add(fo), this._isDisposed = !1
  }

  top(t = "") {
    return this._bottomOffset = "", this._topOffset = t, this._alignItems = "flex-start", this
  }

  left(t = "") {
    return this._xOffset = t, this._xPosition = "left", this
  }

  bottom(t = "") {
    return this._topOffset = "", this._bottomOffset = t, this._alignItems = "flex-end", this
  }

  right(t = "") {
    return this._xOffset = t, this._xPosition = "right", this
  }

  start(t = "") {
    return this._xOffset = t, this._xPosition = "start", this
  }

  end(t = "") {
    return this._xOffset = t, this._xPosition = "end", this
  }

  width(t = "") {
    return this._overlayRef ? this._overlayRef.updateSize({width: t}) : this._width = t, this
  }

  height(t = "") {
    return this._overlayRef ? this._overlayRef.updateSize({height: t}) : this._height = t, this
  }

  centerHorizontally(t = "") {
    return this.left(t), this._xPosition = "center", this
  }

  centerVertically(t = "") {
    return this.top(t), this._alignItems = "center", this
  }

  apply() {
    if (!this._overlayRef || !this._overlayRef.hasAttached()) return;
    let t = this._overlayRef.overlayElement.style, r = this._overlayRef.hostElement.style,
      e = this._overlayRef.getConfig(), {width: i, height: o, maxWidth: a, maxHeight: s} = e,
      d = (i === "100%" || i === "100vw") && (!a || a === "100%" || a === "100vw"),
      f = (o === "100%" || o === "100vh") && (!s || s === "100%" || s === "100vh"), m = this._xPosition,
      p = this._xOffset, G = this._overlayRef.getConfig().direction === "rtl", z = "", j = "", L = "";
    d ? L = "flex-start" : m === "center" ? (L = "center", G ? j = p : z = p) : G ? m === "left" || m === "end" ? (L = "flex-end", z = p) : (m === "right" || m === "start") && (L = "flex-start", j = p) : m === "left" || m === "start" ? (L = "flex-start", z = p) : (m === "right" || m === "end") && (L = "flex-end", j = p), t.position = this._cssPosition, t.marginLeft = d ? "0" : z, t.marginTop = f ? "0" : this._topOffset, t.marginBottom = this._bottomOffset, t.marginRight = d ? "0" : j, r.justifyContent = L, r.alignItems = f ? "flex-start" : this._alignItems
  }

  dispose() {
    if (this._isDisposed || !this._overlayRef) return;
    let t = this._overlayRef.overlayElement.style, r = this._overlayRef.hostElement, e = r.style;
    r.classList.remove(fo), e.justifyContent = e.alignItems = t.marginTop = t.marginBottom = t.marginLeft = t.marginRight = t.position = "", this._overlayRef = null, this._isDisposed = !0
  }
}, ba = (() => {
  let t = class t {
    constructor(e, i, o, a) {
      this._viewportRuler = e, this._document = i, this._platform = o, this._overlayContainer = a
    }

    global() {
      return new Si
    }

    flexibleConnectedTo(e) {
      return new Mi(e, this._viewportRuler, this._document, this._platform, this._overlayContainer)
    }
  };
  t.\u0275fac = function (i) {
    return new (i || t)(c(yi), c(I), c(A), c(bo))
  }, t.\u0275prov = b({token: t, factory: t.\u0275fac, providedIn: "root"});
  let n = t;
  return n
})(), ga = 0, go = (() => {
  let t = class t {
    constructor(e, i, o, a, s, d, f, m, p, G, z, j) {
      this.scrollStrategies = e, this._overlayContainer = i, this._componentFactoryResolver = o, this._positionBuilder = a, this._keyboardDispatcher = s, this._injector = d, this._ngZone = f, this._document = m, this._directionality = p, this._location = G, this._outsideClickDispatcher = z, this._animationsModuleType = j
    }

    create(e) {
      let i = this._createHostElement(), o = this._createPaneElement(i), a = this._createPortalOutlet(o), s = new de(e);
      return s.direction = s.direction || this._directionality.value, new Ii(a, i, o, s, this._ngZone, this._keyboardDispatcher, this._document, this._location, this._outsideClickDispatcher, this._animationsModuleType === "NoopAnimations")
    }

    position() {
      return this._positionBuilder
    }

    _createPaneElement(e) {
      let i = this._document.createElement("div");
      return i.id = `cdk-overlay-${ga++}`, i.classList.add("cdk-overlay-pane"), e.appendChild(i), i
    }

    _createHostElement() {
      let e = this._document.createElement("div");
      return this._overlayContainer.getContainerElement().appendChild(e), e
    }

    _createPortalOutlet(e) {
      return this._appRef || (this._appRef = this._injector.get(xn)), new Oe(e, this._componentFactoryResolver, this._appRef, this._injector, this._document)
    }
  };
  t.\u0275fac = function (i) {
    return new (i || t)(c(ma), c(bo), c(ve), c(ba), c(ua), c(mt), c(v), c(I), c(Ie), c(wn), c(ha), c(st, 8))
  }, t.\u0275prov = b({token: t, factory: t.\u0275fac, providedIn: "root"});
  let n = t;
  return n
})();

function va(n, t) {
  if (n & 1) {
    let r = dt();
    h(0, "div", 1)(1, "button", 2), R("click", function () {
      rt(r);
      let i = O();
      return at(i.action())
    }), x(2), u()()
  }
  if (n & 2) {
    let r = O();
    _(2), we(" ", r.data.action, " ")
  }
}

var xa = ["label"];

function ya(n, t) {
}

var wa = Math.pow(2, 31) - 1, le = class {
  constructor(t, r) {
    this._overlayRef = r, this._afterDismissed = new C, this._afterOpened = new C, this._onAction = new C, this._dismissedByAction = !1, this.containerInstance = t, t._onExit.subscribe(() => this._finishDismiss())
  }

  dismiss() {
    this._afterDismissed.closed || this.containerInstance.exit(), clearTimeout(this._durationTimeoutId)
  }

  dismissWithAction() {
    this._onAction.closed || (this._dismissedByAction = !0, this._onAction.next(), this._onAction.complete(), this.dismiss()), clearTimeout(this._durationTimeoutId)
  }

  closeWithAction() {
    this.dismissWithAction()
  }

  _dismissAfter(t) {
    this._durationTimeoutId = setTimeout(() => this.dismiss(), Math.min(t, wa))
  }

  _open() {
    this._afterOpened.closed || (this._afterOpened.next(), this._afterOpened.complete())
  }

  _finishDismiss() {
    this._overlayRef.dispose(), this._onAction.closed || this._onAction.complete(), this._afterDismissed.next({dismissedByAction: this._dismissedByAction}), this._afterDismissed.complete(), this._dismissedByAction = !1
  }

  afterDismissed() {
    return this._afterDismissed
  }

  afterOpened() {
    return this.containerInstance._onEnter
  }

  onAction() {
    return this._onAction
  }
}, _o = new w("MatSnackBarData"), Wt = class {
  constructor() {
    this.politeness = "assertive", this.announcementMessage = "", this.duration = 0, this.data = null, this.horizontalPosition = "center", this.verticalPosition = "bottom"
  }
}, Ca = (() => {
  let t = class t {
  };
  t.\u0275fac = function (i) {
    return new (i || t)
  }, t.\u0275dir = g({
    type: t,
    selectors: [["", "matSnackBarLabel", ""]],
    hostAttrs: [1, "mat-mdc-snack-bar-label", "mdc-snackbar__label"],
    standalone: !0
  });
  let n = t;
  return n
})(), Ea = (() => {
  let t = class t {
  };
  t.\u0275fac = function (i) {
    return new (i || t)
  }, t.\u0275dir = g({
    type: t,
    selectors: [["", "matSnackBarActions", ""]],
    hostAttrs: [1, "mat-mdc-snack-bar-actions", "mdc-snackbar__actions"],
    standalone: !0
  });
  let n = t;
  return n
})(), Da = (() => {
  let t = class t {
  };
  t.\u0275fac = function (i) {
    return new (i || t)
  }, t.\u0275dir = g({
    type: t,
    selectors: [["", "matSnackBarAction", ""]],
    hostAttrs: [1, "mat-mdc-snack-bar-action", "mdc-snackbar__action"],
    standalone: !0
  });
  let n = t;
  return n
})(), ka = (() => {
  let t = class t {
    constructor(e, i) {
      this.snackBarRef = e, this.data = i
    }

    get hasAction() {
      return !!this.data.action
    }

    action() {
      this.snackBarRef.dismissWithAction()
    }
  };
  t.\u0275fac = function (i) {
    return new (i || t)(l(le), l(_o))
  }, t.\u0275cmp = T({
    type: t,
    selectors: [["simple-snack-bar"]],
    hostAttrs: [1, "mat-mdc-simple-snack-bar"],
    exportAs: ["matSnackBar"],
    standalone: !0,
    features: [V],
    decls: 3,
    vars: 2,
    consts: [["matSnackBarLabel", ""], ["matSnackBarActions", ""], ["mat-button", "", "matSnackBarAction", "", 3, "click"]],
    template: function (i, o) {
      i & 1 && (h(0, "div", 0), x(1), u(), N(2, va, 3, 1, "div", 1)), i & 2 && (_(), we(" ", o.data.message, `
`), _(), B(2, o.hasAction ? 2 : -1))
    },
    dependencies: [Ae, Ca, Ea, Da],
    styles: [".mat-mdc-simple-snack-bar{display:flex}"],
    encapsulation: 2,
    changeDetection: 0
  });
  let n = t;
  return n
})(), Ia = {
  snackBarState: Ce("state", [ie("void, hidden", Mt({
    transform: "scale(0.8)",
    opacity: 0
  })), ie("visible", Mt({
    transform: "scale(1)",
    opacity: 1
  })), ne("* => visible", ee("150ms cubic-bezier(0, 0, 0.2, 1)")), ne("* => void, * => hidden", ee("75ms cubic-bezier(0.4, 0.0, 1, 1)", Mt({opacity: 0})))])
}, Ma = 0, Sa = (() => {
  let t = class t extends qt {
    constructor(e, i, o, a, s) {
      super(), this._ngZone = e, this._elementRef = i, this._changeDetectorRef = o, this._platform = a, this.snackBarConfig = s, this._document = F(I), this._trackedModals = new Set, this._announceDelay = 150, this._destroyed = !1, this._onAnnounce = new C, this._onExit = new C, this._onEnter = new C, this._animationState = "void", this._liveElementId = `mat-snack-bar-container-live-${Ma++}`, this.attachDomPortal = d => {
        this._assertNotAttached();
        let f = this._portalOutlet.attachDomPortal(d);
        return this._afterPortalAttached(), f
      }, s.politeness === "assertive" && !s.announcementMessage ? this._live = "assertive" : s.politeness === "off" ? this._live = "off" : this._live = "polite", this._platform.FIREFOX && (this._live === "polite" && (this._role = "status"), this._live === "assertive" && (this._role = "alert"))
    }

    attachComponentPortal(e) {
      this._assertNotAttached();
      let i = this._portalOutlet.attachComponentPortal(e);
      return this._afterPortalAttached(), i
    }

    attachTemplatePortal(e) {
      this._assertNotAttached();
      let i = this._portalOutlet.attachTemplatePortal(e);
      return this._afterPortalAttached(), i
    }

    onAnimationEnd(e) {
      let {fromState: i, toState: o} = e;
      if ((o === "void" && i !== "void" || o === "hidden") && this._completeExit(), o === "visible") {
        let a = this._onEnter;
        this._ngZone.run(() => {
          a.next(), a.complete()
        })
      }
    }

    enter() {
      this._destroyed || (this._animationState = "visible", this._changeDetectorRef.markForCheck(), this._changeDetectorRef.detectChanges(), this._screenReaderAnnounce())
    }

    exit() {
      return this._ngZone.run(() => {
        this._animationState = "hidden", this._changeDetectorRef.markForCheck(), this._elementRef.nativeElement.setAttribute("mat-exit", ""), clearTimeout(this._announceTimeoutId)
      }), this._onExit
    }

    ngOnDestroy() {
      this._destroyed = !0, this._clearFromModals(), this._completeExit()
    }

    _completeExit() {
      queueMicrotask(() => {
        this._onExit.next(), this._onExit.complete()
      })
    }

    _afterPortalAttached() {
      let e = this._elementRef.nativeElement, i = this.snackBarConfig.panelClass;
      i && (Array.isArray(i) ? i.forEach(s => e.classList.add(s)) : e.classList.add(i)), this._exposeToModals();
      let o = this._label.nativeElement, a = "mdc-snackbar__label";
      o.classList.toggle(a, !o.querySelector(`.${a}`))
    }

    _exposeToModals() {
      let e = this._liveElementId,
        i = this._document.querySelectorAll('body > .cdk-overlay-container [aria-modal="true"]');
      for (let o = 0; o < i.length; o++) {
        let a = i[o], s = a.getAttribute("aria-owns");
        this._trackedModals.add(a), s ? s.indexOf(e) === -1 && a.setAttribute("aria-owns", s + " " + e) : a.setAttribute("aria-owns", e)
      }
    }

    _clearFromModals() {
      this._trackedModals.forEach(e => {
        let i = e.getAttribute("aria-owns");
        if (i) {
          let o = i.replace(this._liveElementId, "").trim();
          o.length > 0 ? e.setAttribute("aria-owns", o) : e.removeAttribute("aria-owns")
        }
      }), this._trackedModals.clear()
    }

    _assertNotAttached() {
      this._portalOutlet.hasAttached()
    }

    _screenReaderAnnounce() {
      this._announceTimeoutId || this._ngZone.runOutsideAngular(() => {
        this._announceTimeoutId = setTimeout(() => {
          let e = this._elementRef.nativeElement.querySelector("[aria-hidden]"),
            i = this._elementRef.nativeElement.querySelector("[aria-live]");
          if (e && i) {
            let o = null;
            this._platform.isBrowser && document.activeElement instanceof HTMLElement && e.contains(document.activeElement) && (o = document.activeElement), e.removeAttribute("aria-hidden"), i.appendChild(e), o?.focus(), this._onAnnounce.next(), this._onAnnounce.complete()
          }
        }, this._announceDelay)
      })
    }
  };
  t.\u0275fac = function (i) {
    return new (i || t)(l(v), l(k), l(It), l(A), l(Wt))
  }, t.\u0275cmp = T({
    type: t,
    selectors: [["mat-snack-bar-container"]],
    viewQuery: function (i, o) {
      if (i & 1 && (et(xi, 7), et(xa, 7)), i & 2) {
        let a;
        U(a = Y()) && (o._portalOutlet = a.first), U(a = Y()) && (o._label = a.first)
      }
    },
    hostAttrs: [1, "mdc-snackbar", "mat-mdc-snack-bar-container", "mdc-snackbar--open"],
    hostVars: 1,
    hostBindings: function (i, o) {
      i & 1 && bn("@state.done", function (s) {
        return o.onAnimationEnd(s)
      }), i & 2 && pn("@state", o._animationState)
    },
    standalone: !0,
    features: [q, V],
    decls: 6,
    vars: 3,
    consts: [["label", ""], [1, "mdc-snackbar__surface"], [1, "mat-mdc-snack-bar-label"], ["aria-hidden", "true"], ["cdkPortalOutlet", ""]],
    template: function (i, o) {
      i & 1 && (h(0, "div", 1)(1, "div", 2, 0)(3, "div", 3), N(4, ya, 0, 0, "ng-template", 4), u(), E(5, "div"), u()()), i & 2 && (_(5), Z("aria-live", o._live)("role", o._role)("id", o._liveElementId))
    },
    dependencies: [xi],
    styles: ['.mdc-snackbar{display:none;position:fixed;right:0;bottom:0;left:0;align-items:center;justify-content:center;box-sizing:border-box;pointer-events:none;-webkit-tap-highlight-color:rgba(0,0,0,0)}.mdc-snackbar--opening,.mdc-snackbar--open,.mdc-snackbar--closing{display:flex}.mdc-snackbar--open .mdc-snackbar__label,.mdc-snackbar--open .mdc-snackbar__actions{visibility:visible}.mdc-snackbar__surface{padding-left:0;padding-right:8px;display:flex;align-items:center;justify-content:flex-start;box-sizing:border-box;transform:scale(0.8);opacity:0}.mdc-snackbar__surface::before{position:absolute;box-sizing:border-box;width:100%;height:100%;top:0;left:0;border:1px solid rgba(0,0,0,0);border-radius:inherit;content:"";pointer-events:none}@media screen and (forced-colors: active){.mdc-snackbar__surface::before{border-color:CanvasText}}[dir=rtl] .mdc-snackbar__surface,.mdc-snackbar__surface[dir=rtl]{padding-left:8px;padding-right:0}.mdc-snackbar--open .mdc-snackbar__surface{transform:scale(1);opacity:1;pointer-events:auto}.mdc-snackbar--closing .mdc-snackbar__surface{transform:scale(1)}.mdc-snackbar__label{padding-left:16px;padding-right:8px;width:100%;flex-grow:1;box-sizing:border-box;margin:0;visibility:hidden;padding-top:14px;padding-bottom:14px}[dir=rtl] .mdc-snackbar__label,.mdc-snackbar__label[dir=rtl]{padding-left:8px;padding-right:16px}.mdc-snackbar__label::before{display:inline;content:attr(data-mdc-snackbar-label-text)}.mdc-snackbar__actions{display:flex;flex-shrink:0;align-items:center;box-sizing:border-box;visibility:hidden}.mdc-snackbar__action+.mdc-snackbar__dismiss{margin-left:8px;margin-right:0}[dir=rtl] .mdc-snackbar__action+.mdc-snackbar__dismiss,.mdc-snackbar__action+.mdc-snackbar__dismiss[dir=rtl]{margin-left:0;margin-right:8px}.mat-mdc-snack-bar-container{margin:8px;position:static}.mat-mdc-snack-bar-container .mdc-snackbar__surface{min-width:344px}@media(max-width: 480px),(max-width: 344px){.mat-mdc-snack-bar-container .mdc-snackbar__surface{min-width:100%}}@media(max-width: 480px),(max-width: 344px){.mat-mdc-snack-bar-container{width:100vw}}.mat-mdc-snack-bar-container .mdc-snackbar__surface{max-width:672px}.mat-mdc-snack-bar-container .mdc-snackbar__surface{box-shadow:0px 3px 5px -1px rgba(0, 0, 0, 0.2), 0px 6px 10px 0px rgba(0, 0, 0, 0.14), 0px 1px 18px 0px rgba(0, 0, 0, 0.12)}.mat-mdc-snack-bar-container .mdc-snackbar__surface{background-color:var(--mdc-snackbar-container-color)}.mat-mdc-snack-bar-container .mdc-snackbar__surface{border-radius:var(--mdc-snackbar-container-shape)}.mat-mdc-snack-bar-container .mdc-snackbar__label{color:var(--mdc-snackbar-supporting-text-color)}.mat-mdc-snack-bar-container .mdc-snackbar__label{font-size:var(--mdc-snackbar-supporting-text-size);font-family:var(--mdc-snackbar-supporting-text-font);font-weight:var(--mdc-snackbar-supporting-text-weight);line-height:var(--mdc-snackbar-supporting-text-line-height)}.mat-mdc-snack-bar-container .mat-mdc-button.mat-mdc-snack-bar-action:not(:disabled){color:var(--mat-snack-bar-button-color);--mat-text-button-state-layer-color:currentColor;--mat-text-button-ripple-color:currentColor}.mat-mdc-snack-bar-container .mat-mdc-button.mat-mdc-snack-bar-action:not(:disabled) .mat-ripple-element{opacity:.1}.mat-mdc-snack-bar-container .mdc-snackbar__label::before{display:none}.mat-mdc-snack-bar-handset,.mat-mdc-snack-bar-container,.mat-mdc-snack-bar-label{flex:1 1 auto}.mat-mdc-snack-bar-handset .mdc-snackbar__surface{width:100%}'],
    encapsulation: 2,
    data: {animation: [Ia.snackBarState]}
  });
  let n = t;
  return n
})();

function Aa() {
  return new Wt
}

var Oa = new w("mat-snack-bar-default-options", {providedIn: "root", factory: Aa}), Re = (() => {
  let t = class t {
    constructor(e, i, o, a, s, d) {
      this._overlay = e, this._live = i, this._injector = o, this._breakpointObserver = a, this._parentSnackBar = s, this._defaultConfig = d, this._snackBarRefAtThisLevel = null, this.simpleSnackBarComponent = ka, this.snackBarContainerComponent = Sa, this.handsetCssClass = "mat-mdc-snack-bar-handset"
    }

    get _openedSnackBarRef() {
      let e = this._parentSnackBar;
      return e ? e._openedSnackBarRef : this._snackBarRefAtThisLevel
    }

    set _openedSnackBarRef(e) {
      this._parentSnackBar ? this._parentSnackBar._openedSnackBarRef = e : this._snackBarRefAtThisLevel = e
    }

    openFromComponent(e, i) {
      return this._attach(e, i)
    }

    openFromTemplate(e, i) {
      return this._attach(e, i)
    }

    open(e, i = "", o) {
      let a = y(y({}, this._defaultConfig), o);
      return a.data = {
        message: e,
        action: i
      }, a.announcementMessage === e && (a.announcementMessage = void 0), this.openFromComponent(this.simpleSnackBarComponent, a)
    }

    dismiss() {
      this._openedSnackBarRef && this._openedSnackBarRef.dismiss()
    }

    ngOnDestroy() {
      this._snackBarRefAtThisLevel && this._snackBarRefAtThisLevel.dismiss()
    }

    _attachSnackBarContainer(e, i) {
      let o = i && i.viewContainerRef && i.viewContainerRef.injector,
        a = mt.create({parent: o || this._injector, providers: [{provide: Wt, useValue: i}]}),
        s = new Ut(this.snackBarContainerComponent, i.viewContainerRef, a), d = e.attach(s);
      return d.instance.snackBarConfig = i, d.instance
    }

    _attach(e, i) {
      let o = y(y(y({}, new Wt), this._defaultConfig), i), a = this._createOverlay(o),
        s = this._attachSnackBarContainer(a, o), d = new le(s, a);
      if (e instanceof Jt) {
        let f = new Yt(e, null, {$implicit: o.data, snackBarRef: d});
        d.instance = s.attachTemplatePortal(f)
      } else {
        let f = this._createInjector(o, d), m = new Ut(e, void 0, f), p = s.attachComponentPortal(m);
        d.instance = p.instance
      }
      return this._breakpointObserver.observe(Ln.HandsetPortrait).pipe(K(a.detachments())).subscribe(f => {
        a.overlayElement.classList.toggle(this.handsetCssClass, f.matches)
      }), o.announcementMessage && s._onAnnounce.subscribe(() => {
        this._live.announce(o.announcementMessage, o.politeness)
      }), this._animateSnackBar(d, o), this._openedSnackBarRef = d, this._openedSnackBarRef
    }

    _animateSnackBar(e, i) {
      e.afterDismissed().subscribe(() => {
        this._openedSnackBarRef == e && (this._openedSnackBarRef = null), i.announcementMessage && this._live.clear()
      }), this._openedSnackBarRef ? (this._openedSnackBarRef.afterDismissed().subscribe(() => {
        e.containerInstance.enter()
      }), this._openedSnackBarRef.dismiss()) : e.containerInstance.enter(), i.duration && i.duration > 0 && e.afterOpened().subscribe(() => e._dismissAfter(i.duration))
    }

    _createOverlay(e) {
      let i = new de;
      i.direction = e.direction;
      let o = this._overlay.position().global(), a = e.direction === "rtl",
        s = e.horizontalPosition === "left" || e.horizontalPosition === "start" && !a || e.horizontalPosition === "end" && a,
        d = !s && e.horizontalPosition !== "center";
      return s ? o.left("0") : d ? o.right("0") : o.centerHorizontally(), e.verticalPosition === "top" ? o.top("0") : o.bottom("0"), i.positionStrategy = o, this._overlay.create(i)
    }

    _createInjector(e, i) {
      let o = e && e.viewContainerRef && e.viewContainerRef.injector;
      return mt.create({
        parent: o || this._injector,
        providers: [{provide: le, useValue: i}, {provide: _o, useValue: e.data}]
      })
    }
  };
  t.\u0275fac = function (i) {
    return new (i || t)(c(go), c(Un), c(mt), c(Ee), c(t, 12), c(Oa))
  }, t.\u0275prov = b({token: t, factory: t.\u0275fac, providedIn: "root"});
  let n = t;
  return n
})();
var Fa = (n, t) => t.label + t.line + t.column, Ra = (n, t) => t.id;

function Pa(n, t) {
  n & 1 && (h(0, "div", 1)(1, "span", 3), x(2, "X \u2192"), u(), h(3, "span", 4), x(4, "Y \u2193"), u()())
}

function Ta(n, t) {
  if (n & 1 && (h(0, "div", 5), x(1), u()), n & 2) {
    let r = t.$implicit;
    jt("grid-area: ", r.line, " / ", r.column, ""), _(), ye(r.label)
  }
}

function Na(n, t) {
  if (n & 1 && E(0, "div", 7), n & 2) {
    let r = O().$implicit;
    jt("grid-area: ", r.line + 2, " / ", r.column + 2, "")
  }
}

function Va(n, t) {
  if (n & 1) {
    let r = dt();
    h(0, "div", 8), R("click", function () {
      rt(r);
      let i = O().$implicit, o = O();
      return at(o.handleClick(i))
    }), u()
  }
  if (n & 2) {
    let r = O().$implicit;
    jt("grid-area: ", r.line + 2, " / ", r.column + 2, "")
  }
}

function ja(n, t) {
  if (n & 1) {
    let r = dt();
    h(0, "div", 9), R("click", function () {
      rt(r);
      let i = O().$implicit, o = O();
      return at(o.handleClick(i))
    }), u()
  }
  if (n & 2) {
    let r = O().$implicit;
    jt("grid-area: ", r.line + 2, " / ", r.column + 2, "")
  }
}

function La(n, t) {
  if (n & 1) {
    let r = dt();
    h(0, "div", 10), R("click", function () {
      rt(r);
      let i = O().$implicit, o = O();
      return at(o.handleClick(i))
    }), u()
  }
  if (n & 2) {
    let r = O().$implicit;
    jt("grid-area: ", r.line + 2, " / ", r.column + 2, "")
  }
}

function Ba(n, t) {
  if (n & 1 && N(0, Na, 1, 4, "div", 6)(1, Va, 1, 4)(2, ja, 1, 4)(3, La, 1, 4), n & 2) {
    let r = t.$implicit;
    B(0, r.isPoisoned ? 0 : r.isWaiting ? 1 : r.isSelected ? 2 : 3)
  }
}

var xo = (() => {
  let t = class t {
    constructor(e, i) {
      this.settingsService = e, this._snackBar = i, this.allChocoSquares = new Array, this.markers = new Array, this.chocoSquaresSize = 50, this.Array = Array, this.createChocoBar(), this.settingsService.getNeedUpdate().subscribe(o => {
        o && this.createChocoBar()
      }), this.settingsService.getEatAction().subscribe(o => {
        o && (this.settingsService.getIsPoisonedSquarePositioned() ? this._snackBar.open("\u274C Tu dois positionner la case empoisonn\xE9e avant de manger la tablette de chocolat !") : this.eatChocoBar())
      })
    }

    createChocoBar() {
      this.allChocoSquares = new Array, this.markers = new Array;
      let e = this.settingsService.getNbLines(), i = this.settingsService.getNbColumns();
      (this.settingsService.getPoisonedSquareX() >= i || this.settingsService.getPoisonedSquareY() >= e) && (this.settingsService.setPoisonedSquareX(0), this.settingsService.setPoisonedSquareY(0));
      for (let o = 0; o < e; o++) for (let a = 0; a < i; a++) o === 0 && this.markers.push({
        line: 1,
        column: a + 2,
        label: String(a)
      }), a === 0 && this.markers.push({
        line: o + 2,
        column: 1,
        label: String(o)
      }), this.allChocoSquares.push({
        id: `${o}-${a}`,
        line: o,
        column: a,
        isPoisoned: o === this.settingsService.getPoisonedSquareY() && a === this.settingsService.getPoisonedSquareX(),
        isWaiting: this.settingsService.getIsPoisonedSquarePositioned() && !(o === this.settingsService.getPoisonedSquareY() && a === this.settingsService.getPoisonedSquareX()),
        isSelected: !1
      })
    }

    handleClick(e) {
      this.settingsService.getIsPoisonedSquarePositioned() ? (this.settingsService.setPoisonedSquareX(e.column), this.settingsService.setPoisonedSquareY(e.line), this.settingsService.setPositionPoisonedSquare(), this.settingsService.setNeedUpdate(!0)) : e.isSelected = !e.isSelected
    }

    eatChocoBar() {
      this.allChocoSquares && this.isSelectionValid() && (this.allChocoSquares = this.allChocoSquares.filter(e => !e.isSelected))
    }

    isSelectionValid() {
      return !0
    }
  };
  t.\u0275fac = function (i) {
    return new (i || t)(l(Lt), l(Re))
  }, t.\u0275cmp = T({
    type: t,
    selectors: [["app-choco-bar"]],
    standalone: !0,
    features: [V],
    decls: 6,
    vars: 7,
    consts: [[1, "chocoBar"], [1, "label", 2, "grid-area", "1 / 1"], [1, "marker", 3, "style"], [1, "label--x"], [1, "label--y"], [1, "marker"], [1, "chocoSquare", "chocoSquare--poisoned", 3, "style"], [1, "chocoSquare", "chocoSquare--poisoned"], [1, "chocoSquare", "chocoSquare--waiting", 3, "click"], [1, "chocoSquare", "chocoSquare--selected", 3, "click"], [1, "chocoSquare", 3, "click"]],
    template: function (i, o) {
      i & 1 && (h(0, "div", 0), N(1, Pa, 5, 0, "div", 1), ei(2, Ta, 2, 5, "div", 2, Fa), ei(4, Ba, 4, 1, null, null, Ra), u()), i & 2 && (gn("grid-template-columns: repeat(", o.settingsService.getNbColumns() + 1, ", ", o.chocoSquaresSize, "px); grid-template-rows: repeat(", o.settingsService.getNbLines() + 1, ", ", o.chocoSquaresSize, "px)"), _(), B(1, o.allChocoSquares ? 1 : -1), _(), ii(o.markers), _(2), ii(o.allChocoSquares))
    },
    styles: ["html[_ngcontent-%COMP%], body[_ngcontent-%COMP%]{height:100%;width:100%;margin:0;font-family:Comfortaa,sans-serif}h1[_ngcontent-%COMP%], h2[_ngcontent-%COMP%]{text-align:center;cursor:default;-webkit-user-select:none;user-select:none;margin-top:0;color:#88572e}h1[_ngcontent-%COMP%]{font-family:Homemade Apple,Comfortaa,cursive!important;width:100%;margin:10px 0 0;font-size:3em}p[_ngcontent-%COMP%], h2[_ngcontent-%COMP%], h3[_ngcontent-%COMP%], h4[_ngcontent-%COMP%], mat-label[_ngcontent-%COMP%], input[_ngcontent-%COMP%], button[_ngcontent-%COMP%]{font-family:Comfortaa,sans-serif!important}.chocoBar[_ngcontent-%COMP%]{display:grid;gap:2px;margin:40px auto;padding-right:50px}.chocoBar[_ngcontent-%COMP%]   .marker[_ngcontent-%COMP%], .chocoBar[_ngcontent-%COMP%]   .label[_ngcontent-%COMP%]{display:flex;justify-content:center;align-items:center;color:#8a6748;cursor:default;-webkit-user-select:none;user-select:none}.chocoBar[_ngcontent-%COMP%]   .label[_ngcontent-%COMP%]{font-size:1.1em;font-weight:700}.chocoBar[_ngcontent-%COMP%]   .label--x[_ngcontent-%COMP%]{margin-left:50px}.chocoBar[_ngcontent-%COMP%]   .label--y[_ngcontent-%COMP%]{position:absolute;margin-bottom:-50px}.chocoBar[_ngcontent-%COMP%]   .chocoSquare[_ngcontent-%COMP%]{background-color:#88572e;border-radius:5px;transition:all .3s;cursor:pointer;border:10px solid rgba(200,200,200,.4);border-right-color:#0006;border-bottom-color:#0003;border-left-color:#c8c8c833}.chocoBar[_ngcontent-%COMP%]   .chocoSquare[_ngcontent-%COMP%]:hover{border:5px solid rgba(200,200,200,.4)}.chocoBar[_ngcontent-%COMP%]   .chocoSquare--selected[_ngcontent-%COMP%]{background-color:#fff;border:5px solid chocolate}.chocoBar[_ngcontent-%COMP%]   .chocoSquare--poisoned[_ngcontent-%COMP%]{background-color:red;cursor:default}.chocoBar[_ngcontent-%COMP%]   .chocoSquare--poisoned[_ngcontent-%COMP%]:hover{border:10px solid rgba(200,200,200,.4);border-right-color:#0006;border-bottom-color:#0003;border-left-color:#c8c8c833}.chocoBar[_ngcontent-%COMP%]   .chocoSquare--waiting[_ngcontent-%COMP%]{background-color:#8a6748;border:5px solid rgb(136,87,46)}.chocoBar[_ngcontent-%COMP%]   .chocoSquare--waiting[_ngcontent-%COMP%]:hover{background-color:#ff3a3a}"]
  });
  let n = t;
  return n
})();
var yo = (() => {
  let t = class t {
    constructor(e) {
      this.settingsService = e
    }

    eat() {
      this.settingsService.setEatAction(!0)
    }
  };
  t.\u0275fac = function (i) {
    return new (i || t)(l(Lt))
  }, t.\u0275cmp = T({
    type: t,
    selectors: [["app-choco-button"]],
    standalone: !0,
    features: [V],
    decls: 5,
    vars: 0,
    consts: [[1, "chocolate-button", 3, "click"], [1, "crumbs"], [1, "bar"], [1, "text"]],
    template: function (i, o) {
      i & 1 && (h(0, "button", 0), R("click", function () {
        return o.eat()
      }), E(1, "div", 1), h(2, "span", 2)(3, "span", 3), x(4, "\u{1F36B} MANGER \u{1F36B}"), u()()())
    },
    styles: ['html[_ngcontent-%COMP%], body[_ngcontent-%COMP%]{height:100%;width:100%;margin:0;font-family:Comfortaa,sans-serif}h1[_ngcontent-%COMP%], h2[_ngcontent-%COMP%]{text-align:center;cursor:default;-webkit-user-select:none;user-select:none;margin-top:0;color:#88572e}h1[_ngcontent-%COMP%]{font-family:Homemade Apple,Comfortaa,cursive!important;width:100%;margin:10px 0 0;font-size:3em}p[_ngcontent-%COMP%], h2[_ngcontent-%COMP%], h3[_ngcontent-%COMP%], h4[_ngcontent-%COMP%], mat-label[_ngcontent-%COMP%], input[_ngcontent-%COMP%], button[_ngcontent-%COMP%]{font-family:Comfortaa,sans-serif!important}.chocolate-button[_ngcontent-%COMP%]{-webkit-appearance:none;-moz-appearance:none;appearance:none;border:none;background:none;padding:0;margin:20px auto;font-size:30px;font-weight:700;cursor:pointer;width:260px;height:50px;transform:rotate(0);transition:transform .1s ease}.chocolate-button[_ngcontent-%COMP%]:hover{transform:translateY(-5px) rotate(2deg)}.chocolate-button[_ngcontent-%COMP%]   .bar[_ngcontent-%COMP%]{border-radius:.3em;display:block;transition:transform .1s ease}.chocolate-button[_ngcontent-%COMP%]   .bar[_ngcontent-%COMP%]:before, .chocolate-button[_ngcontent-%COMP%]   .bar[_ngcontent-%COMP%]:after{content:"";position:absolute;left:0;width:100%;height:100%;z-index:-1;border-radius:inherit}.chocolate-button[_ngcontent-%COMP%]   .bar[_ngcontent-%COMP%]:before{background-color:#88572e;border:.35em rgba(117,76,40,.6) ridge;top:0;z-index:0}.chocolate-button[_ngcontent-%COMP%]   .bar[_ngcontent-%COMP%]:after{top:.3em;left:.3em;background:#432b16;box-shadow:inset 0 -.05em #553310}.chocolate-button[_ngcontent-%COMP%]   .text[_ngcontent-%COMP%], .chocolate-button[_ngcontent-%COMP%]   .bar[_ngcontent-%COMP%]:before, .chocolate-button[_ngcontent-%COMP%]   .bar[_ngcontent-%COMP%]:after{transition:-webkit-clip-path .15s steps(3,start);transition:clip-path .15s steps(3,start),-webkit-clip-path .15s steps(3,start);-webkit-clip-path:polygon(100% 0,100% 100%,calc(30% + var(--x, 0) * 1px) 100%,calc(24% + var(--x, 0) * 1px) 100%,calc(7% + var(--x, 0) * 1px) 100%,calc(0% + var(--x, 0) * 1px) 100%,calc(-6% + var(--x, 0) * 1px) 100%,calc(-20% + var(--x, 0) * 1px) 100%,calc(-30% + var(--x, 0) * 1px) 100%,0 100%,0 0);clip-path:polygon(100% 0,100% 100%,calc(30% + var(--x, 0) * 1px) 100%,calc(24% + var(--x, 0) * 1px) 100%,calc(7% + var(--x, 0) * 1px) 100%,calc(0% + var(--x, 0) * 1px) 100%,calc(-6% + var(--x, 0) * 1px) 100%,calc(-20% + var(--x, 0) * 1px) 100%,calc(-30% + var(--x, 0) * 1px) 100%,0 100%,0 0)}.chocolate-button[_ngcontent-%COMP%]   .text[_ngcontent-%COMP%]{display:block;padding:.6em 0 0 1em;color:#432b16;opacity:.8;text-shadow:1px 2px #8a6748,-1px -2px black;font-family:Bitter,serif!important;font-weight:700}.crumbs[_ngcontent-%COMP%]{position:absolute;width:.3em;height:.3em;border-radius:50%;top:0;left:calc(var(--x, 0) * 1px);pointer-events:none;opacity:0}.crumbs[_ngcontent-%COMP%]:before, .crumbs[_ngcontent-%COMP%]:after{content:"";position:absolute;height:100%;width:100%;border-radius:inherit;box-shadow:1.4517001104em 2.938831013em #88572e,1.4517001104em 2.938831013em #88572e,-2.0075945738em 2.4239961644em #88572e,-2.0075945738em 2.4239961644em #88572e,.4556923561em 2.0399713366em #88572e,.4556923561em 2.0399713366em #88572e,-1.9264161995em .9359927588em #88572e,-1.9264161995em .9359927588em #88572e,2.3139865529em 1.1271407636em #88572e,2.3139865529em 1.1271407636em #88572e,1.1789511064em 2.2728693235em #88572e,1.1789511064em 2.2728693235em #88572e,-2.0874357394em 2.5732488968em #88572e,-2.0874357394em 2.5732488968em #88572e,2.9514538289em .9792461455em #88572e,2.9514538289em .9792461455em #88572e,1.089354562em .789332602em #88572e,1.089354562em .789332602em #88572e,.4777782971em .7903499654em #88572e,.4777782971em .7903499654em #88572e,-1.4927128978em 2.4296361547em #88572e,-1.4927128978em 2.4296361547em #88572e,-2.468035466em .0699618611em #88572e,-2.468035466em .0699618611em #88572e,-.9422933997em .2592097595em #88572e,-.9422933997em .2592097595em #88572e,-2.9655352497em 1.1258515591em #88572e,-2.9655352497em 1.1258515591em #88572e,-2.2468880036em 2.2939451823em #88572e,-2.2468880036em 2.2939451823em #88572e,.2290420066em .8281479998em #88572e,.2290420066em .8281479998em #88572e,1.9254525818em 1.6118099488em #88572e,1.9254525818em 1.6118099488em #88572e,.1306468401em 2.4699080718em #88572e,.1306468401em 2.4699080718em #88572e,.1257917401em 1.8010803967em #88572e,.1257917401em 1.8010803967em #88572e,-.8856827546em .3501287713em #88572e,-.8856827546em .3501287713em #88572e}.crumbs[_ngcontent-%COMP%]:before{height:70%;width:70%}.chocolate-button-animate[_ngcontent-%COMP%]{outline:none;-webkit-animation:_ngcontent-%COMP%_chomp .3s cubic-bezier(.72,.12,.32,.96);animation:_ngcontent-%COMP%_chomp .3s cubic-bezier(.72,.12,.32,.96)}@-webkit-keyframes _ngcontent-%COMP%_chomp{30%{transform:translateZ(-6vmin) rotateX(15deg) rotate(12deg)}70%{transform:translateZ(-10vmin) rotateX(0) rotate(8deg)}}@keyframes _ngcontent-%COMP%_chomp{30%{transform:translateZ(-6vmin) rotateX(15deg) rotate(12deg)}70%{transform:translateZ(-10vmin) rotateX(0) rotate(8deg)}}.chocolate-button-animate[_ngcontent-%COMP%]   .text[_ngcontent-%COMP%], .chocolate-button-animate[_ngcontent-%COMP%]   .bar[_ngcontent-%COMP%]:before, .chocolate-button-animate[_ngcontent-%COMP%]   .bar[_ngcontent-%COMP%]:after{transition:none;-webkit-clip-path:polygon(100% 0,100% 100%,calc(30% + var(--x, 0) * 1px) 100%,calc(24% + var(--x, 0) * 1px) 75%,calc(7% + var(--x, 0) * 1px) 58%,calc(0% + var(--x, 0) * 1px) 65%,calc(-6% + var(--x, 0) * 1px) 45%,calc(-20% + var(--x, 0) * 1px) 51%,calc(-30% + var(--x, 0) * 1px) 100%,0 100%,0 0);clip-path:polygon(100% 0,100% 100%,calc(30% + var(--x, 0) * 1px) 100%,calc(24% + var(--x, 0) * 1px) 75%,calc(7% + var(--x, 0) * 1px) 58%,calc(0% + var(--x, 0) * 1px) 65%,calc(-6% + var(--x, 0) * 1px) 45%,calc(-20% + var(--x, 0) * 1px) 51%,calc(-30% + var(--x, 0) * 1px) 100%,0 100%,0 0)}.chocolate-button-animate[_ngcontent-%COMP%]   .crumbs[_ngcontent-%COMP%]{opacity:1;-webkit-animation:_ngcontent-%COMP%_crumbs 1.5s ease-out both;animation:_ngcontent-%COMP%_crumbs 1.5s ease-out both}@-webkit-keyframes _ngcontent-%COMP%_crumbs{to{transform:translateY(100vh)}}@keyframes _ngcontent-%COMP%_crumbs{to{transform:translateY(100vh)}}.chocolate-button-animate[_ngcontent-%COMP%]   .crumbs[_ngcontent-%COMP%]:before{-webkit-animation:inherit;animation:inherit;-webkit-animation-name:_ngcontent-%COMP%_crumbs-left;animation-name:_ngcontent-%COMP%_crumbs-left;-webkit-animation-duration:1.2s;animation-duration:1.2s}@-webkit-keyframes _ngcontent-%COMP%_crumbs-left{to{transform:translate(-15vw) rotate(-5deg)}}@keyframes _ngcontent-%COMP%_crumbs-left{to{transform:translate(-15vw) rotate(-5deg)}}.chocolate-button-animate[_ngcontent-%COMP%]   .crumbs[_ngcontent-%COMP%]:after{-webkit-animation:inherit;animation:inherit;-webkit-animation-name:_ngcontent-%COMP%_crumbs-right;animation-name:_ngcontent-%COMP%_crumbs-right}@-webkit-keyframes _ngcontent-%COMP%_crumbs-right{to{transform:translate(15vw) rotate(5deg)}}@keyframes _ngcontent-%COMP%_crumbs-right{to{transform:translate(15vw) rotate(5deg)}}']
  });
  let n = t;
  return n
})();
var wo = (() => {
  let t = class t {
    constructor() {
      this.gameInstruction = "<b>Joueur</b> 1\uFE0F\u20E3 \xE0 toi de manger ! \u{1F36B}"
    }
  };
  t.\u0275fac = function (i) {
    return new (i || t)
  }, t.\u0275cmp = T({
    type: t,
    selectors: [["app-game"]],
    standalone: !0,
    features: [V],
    decls: 4,
    vars: 1,
    consts: [[1, "game-container"], [3, "innerHTML"]],
    template: function (i, o) {
      i & 1 && (h(0, "div", 0), E(1, "h2", 1)(2, "app-choco-bar")(3, "app-choco-button"), u()), i & 2 && (_(), Q("innerHTML", o.gameInstruction, cn))
    },
    dependencies: [xo, yo],
    styles: ["html[_ngcontent-%COMP%], body[_ngcontent-%COMP%]{height:100%;width:100%;margin:0;font-family:Comfortaa,sans-serif}h1[_ngcontent-%COMP%], h2[_ngcontent-%COMP%]{text-align:center;cursor:default;-webkit-user-select:none;user-select:none;margin-top:0;color:#88572e}h1[_ngcontent-%COMP%]{font-family:Homemade Apple,Comfortaa,cursive!important;width:100%;margin:10px 0 0;font-size:3em}p[_ngcontent-%COMP%], h2[_ngcontent-%COMP%], h3[_ngcontent-%COMP%], h4[_ngcontent-%COMP%], mat-label[_ngcontent-%COMP%], input[_ngcontent-%COMP%], button[_ngcontent-%COMP%]{font-family:Comfortaa,sans-serif!important}.game-container[_ngcontent-%COMP%]{display:flex;justify-content:start;flex-direction:column;align-items:center}.game-container[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%]{color:#553310;margin:0;font-size:1.7em;font-weight:500}"]
  });
  let n = t;
  return n
})();
var Ai = class {
  constructor(t) {
    this._box = t, this._destroyed = new C, this._resizeSubject = new C, this._elementObservables = new Map, typeof ResizeObserver < "u" && (this._resizeObserver = new ResizeObserver(r => this._resizeSubject.next(r)))
  }

  observe(t) {
    return this._elementObservables.has(t) || this._elementObservables.set(t, new Tt(r => {
      let e = this._resizeSubject.subscribe(r);
      return this._resizeObserver?.observe(t, {box: this._box}), () => {
        this._resizeObserver?.unobserve(t), e.unsubscribe(), this._elementObservables.delete(t)
      }
    }).pipe(Ct(r => r.some(e => e.target === t)), Qe({
      bufferSize: 1,
      refCount: !0
    }), K(this._destroyed))), this._elementObservables.get(t)
  }

  destroy() {
    this._destroyed.next(), this._destroyed.complete(), this._resizeSubject.complete(), this._elementObservables.clear()
  }
}, Co = (() => {
  let t = class t {
    constructor() {
      this._observers = new Map, this._ngZone = F(v), typeof ResizeObserver < "u"
    }

    ngOnDestroy() {
      for (let [, e] of this._observers) e.destroy();
      this._observers.clear(), typeof ResizeObserver < "u"
    }

    observe(e, i) {
      let o = i?.box || "content-box";
      return this._observers.has(o) || this._observers.set(o, new Ai(o)), this._observers.get(o).observe(e)
    }
  };
  t.\u0275fac = function (i) {
    return new (i || t)
  }, t.\u0275prov = b({token: t, factory: t.\u0275fac, providedIn: "root"});
  let n = t;
  return n
})();
var za = ["notch"], Ha = ["matFormFieldNotchedOutline", ""], Ua = ["*"], Ya = ["textField"],
  qa = ["iconPrefixContainer"], Wa = ["textPrefixContainer"],
  Ga = ["*", [["mat-label"]], [["", "matPrefix", ""], ["", "matIconPrefix", ""]], [["", "matTextPrefix", ""]], [["", "matTextSuffix", ""]], [["", "matSuffix", ""], ["", "matIconSuffix", ""]], [["mat-error"], ["", "matError", ""]], [["mat-hint", 3, "align", "end"]], [["mat-hint", "align", "end"]]],
  $a = ["*", "mat-label", "[matPrefix], [matIconPrefix]", "[matTextPrefix]", "[matTextSuffix]", "[matSuffix], [matIconSuffix]", "mat-error, [matError]", "mat-hint:not([align='end'])", "mat-hint[align='end']"];

function Xa(n, t) {
  n & 1 && E(0, "span", 17)
}

function Za(n, t) {
  if (n & 1 && (h(0, "label", 16), $(1, 1), N(2, Xa, 1, 0, "span", 17), u()), n & 2) {
    let r = O(2);
    Q("floating", r._shouldLabelFloat())("monitorResize", r._hasOutline())("id", r._labelId), Z("for", r._control.id), _(2), B(2, !r.hideRequiredMarker && r._control.required ? 2 : -1)
  }
}

function Ka(n, t) {
  if (n & 1 && N(0, Za, 3, 5, "label", 16), n & 2) {
    let r = O();
    B(0, r._hasFloatingLabel() ? 0 : -1)
  }
}

function Qa(n, t) {
  n & 1 && E(0, "div", 5)
}

function Ja(n, t) {
}

function ts(n, t) {
  if (n & 1 && N(0, Ja, 0, 0, "ng-template", 11), n & 2) {
    O(2);
    let r = ni(1);
    Q("ngTemplateOutlet", r)
  }
}

function es(n, t) {
  if (n & 1 && (h(0, "div", 7), N(1, ts, 1, 1, null, 11), u()), n & 2) {
    let r = O();
    Q("matFormFieldNotchedOutlineOpen", r._shouldLabelFloat()), _(), B(1, r._forceDisplayInfixLabel() ? -1 : 1)
  }
}

function is(n, t) {
  n & 1 && (h(0, "div", 8, 2), $(2, 2), u())
}

function ns(n, t) {
  n & 1 && (h(0, "div", 9, 3), $(2, 3), u())
}

function os(n, t) {
}

function rs(n, t) {
  if (n & 1 && N(0, os, 0, 0, "ng-template", 11), n & 2) {
    O();
    let r = ni(1);
    Q("ngTemplateOutlet", r)
  }
}

function as(n, t) {
  n & 1 && (h(0, "div", 12), $(1, 4), u())
}

function ss(n, t) {
  n & 1 && (h(0, "div", 13), $(1, 5), u())
}

function ds(n, t) {
  n & 1 && E(0, "div", 14)
}

function ls(n, t) {
  if (n & 1 && (h(0, "div", 18), $(1, 6), u()), n & 2) {
    let r = O();
    Q("@transitionMessages", r._subscriptAnimationState)
  }
}

function cs(n, t) {
  if (n & 1 && (h(0, "mat-hint", 20), x(1), u()), n & 2) {
    let r = O(2);
    Q("id", r._hintLabelId), _(), ye(r.hintLabel)
  }
}

function ms(n, t) {
  if (n & 1 && (h(0, "div", 19), N(1, cs, 2, 2, "mat-hint", 20), $(2, 7), E(3, "div", 21), $(4, 8), u()), n & 2) {
    let r = O();
    Q("@transitionMessages", r._subscriptAnimationState), _(), B(1, r.hintLabel ? 1 : -1)
  }
}

var Te = (() => {
  let t = class t {
  };
  t.\u0275fac = function (i) {
    return new (i || t)
  }, t.\u0275dir = g({type: t, selectors: [["mat-label"]], standalone: !0});
  let n = t;
  return n
})();
var us = new w("MatError");
var hs = 0, Eo = (() => {
  let t = class t {
    constructor() {
      this.align = "start", this.id = `mat-mdc-hint-${hs++}`
    }
  };
  t.\u0275fac = function (i) {
    return new (i || t)
  }, t.\u0275dir = g({
    type: t,
    selectors: [["mat-hint"]],
    hostAttrs: [1, "mat-mdc-form-field-hint", "mat-mdc-form-field-bottom-align"],
    hostVars: 4,
    hostBindings: function (i, o) {
      i & 2 && (te("id", o.id), Z("align", null), W("mat-mdc-form-field-hint-end", o.align === "end"))
    },
    inputs: {align: "align", id: "id"},
    standalone: !0
  });
  let n = t;
  return n
})(), fs = new w("MatPrefix");
var ps = new w("MatSuffix");
var Fo = new w("FloatingLabelParent"), Do = (() => {
  let t = class t {
    constructor(e) {
      this._elementRef = e, this._floating = !1, this._monitorResize = !1, this._resizeObserver = F(Co), this._ngZone = F(v), this._parent = F(Fo), this._resizeSubscription = new wt
    }

    get floating() {
      return this._floating
    }

    set floating(e) {
      this._floating = e, this.monitorResize && this._handleResize()
    }

    get monitorResize() {
      return this._monitorResize
    }

    set monitorResize(e) {
      this._monitorResize = e, this._monitorResize ? this._subscribeToResize() : this._resizeSubscription.unsubscribe()
    }

    get element() {
      return this._elementRef.nativeElement
    }

    ngOnDestroy() {
      this._resizeSubscription.unsubscribe()
    }

    getWidth() {
      return bs(this._elementRef.nativeElement)
    }

    _handleResize() {
      setTimeout(() => this._parent._handleLabelResized())
    }

    _subscribeToResize() {
      this._resizeSubscription.unsubscribe(), this._ngZone.runOutsideAngular(() => {
        this._resizeSubscription = this._resizeObserver.observe(this._elementRef.nativeElement, {box: "border-box"}).subscribe(() => this._handleResize())
      })
    }
  };
  t.\u0275fac = function (i) {
    return new (i || t)(l(k))
  }, t.\u0275dir = g({
    type: t,
    selectors: [["label", "matFormFieldFloatingLabel", ""]],
    hostAttrs: [1, "mdc-floating-label", "mat-mdc-floating-label"],
    hostVars: 2,
    hostBindings: function (i, o) {
      i & 2 && W("mdc-floating-label--float-above", o.floating)
    },
    inputs: {floating: "floating", monitorResize: "monitorResize"},
    standalone: !0
  });
  let n = t;
  return n
})();

function bs(n) {
  let t = n;
  if (t.offsetParent !== null) return t.scrollWidth;
  let r = t.cloneNode(!0);
  r.style.setProperty("position", "absolute"), r.style.setProperty("transform", "translate(-9999px, -9999px)"), document.documentElement.appendChild(r);
  let e = r.scrollWidth;
  return r.remove(), e
}

var ko = "mdc-line-ripple--active", Pe = "mdc-line-ripple--deactivating", Io = (() => {
  let t = class t {
    constructor(e, i) {
      this._elementRef = e, this._handleTransitionEnd = o => {
        let a = this._elementRef.nativeElement.classList, s = a.contains(Pe);
        o.propertyName === "opacity" && s && a.remove(ko, Pe)
      }, i.runOutsideAngular(() => {
        e.nativeElement.addEventListener("transitionend", this._handleTransitionEnd)
      })
    }

    activate() {
      let e = this._elementRef.nativeElement.classList;
      e.remove(Pe), e.add(ko)
    }

    deactivate() {
      this._elementRef.nativeElement.classList.add(Pe)
    }

    ngOnDestroy() {
      this._elementRef.nativeElement.removeEventListener("transitionend", this._handleTransitionEnd)
    }
  };
  t.\u0275fac = function (i) {
    return new (i || t)(l(k), l(v))
  }, t.\u0275dir = g({
    type: t,
    selectors: [["div", "matFormFieldLineRipple", ""]],
    hostAttrs: [1, "mdc-line-ripple"],
    standalone: !0
  });
  let n = t;
  return n
})(), Mo = (() => {
  let t = class t {
    constructor(e, i) {
      this._elementRef = e, this._ngZone = i, this.open = !1
    }

    ngAfterViewInit() {
      let e = this._elementRef.nativeElement.querySelector(".mdc-floating-label");
      e ? (this._elementRef.nativeElement.classList.add("mdc-notched-outline--upgraded"), typeof requestAnimationFrame == "function" && (e.style.transitionDuration = "0s", this._ngZone.runOutsideAngular(() => {
        requestAnimationFrame(() => e.style.transitionDuration = "")
      }))) : this._elementRef.nativeElement.classList.add("mdc-notched-outline--no-label")
    }

    _setNotchWidth(e) {
      !this.open || !e ? this._notch.nativeElement.style.width = "" : this._notch.nativeElement.style.width = `calc(${e}px * var(--mat-mdc-form-field-floating-label-scale, 0.75) + 9px)`
    }
  };
  t.\u0275fac = function (i) {
    return new (i || t)(l(k), l(v))
  }, t.\u0275cmp = T({
    type: t,
    selectors: [["div", "matFormFieldNotchedOutline", ""]],
    viewQuery: function (i, o) {
      if (i & 1 && et(za, 5), i & 2) {
        let a;
        U(a = Y()) && (o._notch = a.first)
      }
    },
    hostAttrs: [1, "mdc-notched-outline"],
    hostVars: 2,
    hostBindings: function (i, o) {
      i & 2 && W("mdc-notched-outline--notched", o.open)
    },
    inputs: {open: [D.None, "matFormFieldNotchedOutlineOpen", "open"]},
    standalone: !0,
    features: [V],
    attrs: Ha,
    ngContentSelectors: Ua,
    decls: 5,
    vars: 0,
    consts: [["notch", ""], [1, "mdc-notched-outline__leading"], [1, "mdc-notched-outline__notch"], [1, "mdc-notched-outline__trailing"]],
    template: function (i, o) {
      i & 1 && (Dt(), E(0, "div", 1), h(1, "div", 2, 0), $(3), u(), E(4, "div", 3))
    },
    encapsulation: 2,
    changeDetection: 0
  });
  let n = t;
  return n
})(), gs = {
  transitionMessages: Ce("transitionMessages", [ie("enter", Mt({
    opacity: 1,
    transform: "translateY(0%)"
  })), ne("void => enter", [Mt({
    opacity: 0,
    transform: "translateY(-5px)"
  }), ee("300ms cubic-bezier(0.55, 0, 0.55, 0.2)")])])
}, Oi = (() => {
  let t = class t {
  };
  t.\u0275fac = function (i) {
    return new (i || t)
  }, t.\u0275dir = g({type: t});
  let n = t;
  return n
})();
var Fi = new w("MatFormField"), _s = new w("MAT_FORM_FIELD_DEFAULT_OPTIONS"), So = 0, Ao = "fill", vs = "auto",
  Oo = "fixed", xs = "translateY(-50%)", Ro = (() => {
    let t = class t {
      constructor(e, i, o, a, s, d, f, m) {
        this._elementRef = e, this._changeDetectorRef = i, this._ngZone = o, this._dir = a, this._platform = s, this._defaults = d, this._animationMode = f, this._hideRequiredMarker = !1, this.color = "primary", this._appearance = Ao, this._subscriptSizing = null, this._hintLabel = "", this._hasIconPrefix = !1, this._hasTextPrefix = !1, this._hasIconSuffix = !1, this._hasTextSuffix = !1, this._labelId = `mat-mdc-form-field-label-${So++}`, this._hintLabelId = `mat-mdc-hint-${So++}`, this._subscriptAnimationState = "", this._destroyed = new C, this._isFocused = null, this._needsOutlineLabelOffsetUpdateOnStable = !1, d && (d.appearance && (this.appearance = d.appearance), this._hideRequiredMarker = !!d?.hideRequiredMarker, d.color && (this.color = d.color))
      }

      get hideRequiredMarker() {
        return this._hideRequiredMarker
      }

      set hideRequiredMarker(e) {
        this._hideRequiredMarker = At(e)
      }

      get floatLabel() {
        return this._floatLabel || this._defaults?.floatLabel || vs
      }

      set floatLabel(e) {
        e !== this._floatLabel && (this._floatLabel = e, this._changeDetectorRef.markForCheck())
      }

      get appearance() {
        return this._appearance
      }

      set appearance(e) {
        let i = this._appearance, o = e || this._defaults?.appearance || Ao;
        this._appearance = o, this._appearance === "outline" && this._appearance !== i && (this._needsOutlineLabelOffsetUpdateOnStable = !0)
      }

      get subscriptSizing() {
        return this._subscriptSizing || this._defaults?.subscriptSizing || Oo
      }

      set subscriptSizing(e) {
        this._subscriptSizing = e || this._defaults?.subscriptSizing || Oo
      }

      get hintLabel() {
        return this._hintLabel
      }

      set hintLabel(e) {
        this._hintLabel = e, this._processHints()
      }

      get _control() {
        return this._explicitFormFieldControl || this._formFieldControl
      }

      set _control(e) {
        this._explicitFormFieldControl = e
      }

      ngAfterViewInit() {
        this._updateFocusState(), this._subscriptAnimationState = "enter", this._changeDetectorRef.detectChanges()
      }

      ngAfterContentInit() {
        this._assertFormFieldControl(), this._initializeControl(), this._initializeSubscript(), this._initializePrefixAndSuffix(), this._initializeOutlineLabelOffsetSubscriptions()
      }

      ngAfterContentChecked() {
        this._assertFormFieldControl()
      }

      ngOnDestroy() {
        this._destroyed.next(), this._destroyed.complete()
      }

      getLabelId() {
        return this._hasFloatingLabel() ? this._labelId : null
      }

      getConnectedOverlayOrigin() {
        return this._textField || this._elementRef
      }

      _animateAndLockLabel() {
        this._hasFloatingLabel() && (this.floatLabel = "always")
      }

      _initializeControl() {
        let e = this._control;
        e.controlType && this._elementRef.nativeElement.classList.add(`mat-mdc-form-field-type-${e.controlType}`), e.stateChanges.subscribe(() => {
          this._updateFocusState(), this._syncDescribedByIds(), this._changeDetectorRef.markForCheck()
        }), e.ngControl && e.ngControl.valueChanges && e.ngControl.valueChanges.pipe(K(this._destroyed)).subscribe(() => this._changeDetectorRef.markForCheck())
      }

      _checkPrefixAndSuffixTypes() {
        this._hasIconPrefix = !!this._prefixChildren.find(e => !e._isText), this._hasTextPrefix = !!this._prefixChildren.find(e => e._isText), this._hasIconSuffix = !!this._suffixChildren.find(e => !e._isText), this._hasTextSuffix = !!this._suffixChildren.find(e => e._isText)
      }

      _initializePrefixAndSuffix() {
        this._checkPrefixAndSuffixTypes(), be(this._prefixChildren.changes, this._suffixChildren.changes).subscribe(() => {
          this._checkPrefixAndSuffixTypes(), this._changeDetectorRef.markForCheck()
        })
      }

      _initializeSubscript() {
        this._hintChildren.changes.subscribe(() => {
          this._processHints(), this._changeDetectorRef.markForCheck()
        }), this._errorChildren.changes.subscribe(() => {
          this._syncDescribedByIds(), this._changeDetectorRef.markForCheck()
        }), this._validateHints(), this._syncDescribedByIds()
      }

      _assertFormFieldControl() {
        this._control
      }

      _updateFocusState() {
        this._control.focused && !this._isFocused ? (this._isFocused = !0, this._lineRipple?.activate()) : !this._control.focused && (this._isFocused || this._isFocused === null) && (this._isFocused = !1, this._lineRipple?.deactivate()), this._textField?.nativeElement.classList.toggle("mdc-text-field--focused", this._control.focused)
      }

      _initializeOutlineLabelOffsetSubscriptions() {
        this._prefixChildren.changes.subscribe(() => this._needsOutlineLabelOffsetUpdateOnStable = !0), this._ngZone.runOutsideAngular(() => {
          this._ngZone.onStable.pipe(K(this._destroyed)).subscribe(() => {
            this._needsOutlineLabelOffsetUpdateOnStable && (this._needsOutlineLabelOffsetUpdateOnStable = !1, this._updateOutlineLabelOffset())
          })
        }), this._dir.change.pipe(K(this._destroyed)).subscribe(() => this._needsOutlineLabelOffsetUpdateOnStable = !0)
      }

      _shouldAlwaysFloat() {
        return this.floatLabel === "always"
      }

      _hasOutline() {
        return this.appearance === "outline"
      }

      _forceDisplayInfixLabel() {
        return !this._platform.isBrowser && this._prefixChildren.length && !this._shouldLabelFloat()
      }

      _hasFloatingLabel() {
        return !!this._labelChildNonStatic || !!this._labelChildStatic
      }

      _shouldLabelFloat() {
        return this._control.shouldLabelFloat || this._shouldAlwaysFloat()
      }

      _shouldForward(e) {
        let i = this._control ? this._control.ngControl : null;
        return i && i[e]
      }

      _getDisplayedMessages() {
        return this._errorChildren && this._errorChildren.length > 0 && this._control.errorState ? "error" : "hint"
      }

      _handleLabelResized() {
        this._refreshOutlineNotchWidth()
      }

      _refreshOutlineNotchWidth() {
        !this._hasOutline() || !this._floatingLabel || !this._shouldLabelFloat() ? this._notchedOutline?._setNotchWidth(0) : this._notchedOutline?._setNotchWidth(this._floatingLabel.getWidth())
      }

      _processHints() {
        this._validateHints(), this._syncDescribedByIds()
      }

      _validateHints() {
        this._hintChildren
      }

      _syncDescribedByIds() {
        if (this._control) {
          let e = [];
          if (this._control.userAriaDescribedBy && typeof this._control.userAriaDescribedBy == "string" && e.push(...this._control.userAriaDescribedBy.split(" ")), this._getDisplayedMessages() === "hint") {
            let i = this._hintChildren ? this._hintChildren.find(a => a.align === "start") : null,
              o = this._hintChildren ? this._hintChildren.find(a => a.align === "end") : null;
            i ? e.push(i.id) : this._hintLabel && e.push(this._hintLabelId), o && e.push(o.id)
          } else this._errorChildren && e.push(...this._errorChildren.map(i => i.id));
          this._control.setDescribedByIds(e)
        }
      }

      _updateOutlineLabelOffset() {
        if (!this._platform.isBrowser || !this._hasOutline() || !this._floatingLabel) return;
        let e = this._floatingLabel.element;
        if (!(this._iconPrefixContainer || this._textPrefixContainer)) {
          e.style.transform = "";
          return
        }
        if (!this._isAttachedToDom()) {
          this._needsOutlineLabelOffsetUpdateOnStable = !0;
          return
        }
        let i = this._iconPrefixContainer?.nativeElement, o = this._textPrefixContainer?.nativeElement,
          a = i?.getBoundingClientRect().width ?? 0, s = o?.getBoundingClientRect().width ?? 0,
          d = this._dir.value === "rtl" ? "-1" : "1", f = `${a + s}px`,
          p = `calc(${d} * (${f} + var(--mat-mdc-form-field-label-offset-x, 0px)))`;
        e.style.transform = `var(
        --mat-mdc-form-field-label-transform,
        ${xs} translateX(${p})
    )`
      }

      _isAttachedToDom() {
        let e = this._elementRef.nativeElement;
        if (e.getRootNode) {
          let i = e.getRootNode();
          return i && i !== e
        }
        return document.documentElement.contains(e)
      }
    };
    t.\u0275fac = function (i) {
      return new (i || t)(l(k), l(It), l(v), l(Ie), l(A), l(_s, 8), l(st, 8), l(I))
    }, t.\u0275cmp = T({
      type: t,
      selectors: [["mat-form-field"]],
      contentQueries: function (i, o, a) {
        if (i & 1 && (_t(a, Te, 5), _t(a, Te, 7), _t(a, Oi, 5), _t(a, fs, 5), _t(a, ps, 5), _t(a, us, 5), _t(a, Eo, 5)), i & 2) {
          let s;
          U(s = Y()) && (o._labelChildNonStatic = s.first), U(s = Y()) && (o._labelChildStatic = s.first), U(s = Y()) && (o._formFieldControl = s.first), U(s = Y()) && (o._prefixChildren = s), U(s = Y()) && (o._suffixChildren = s), U(s = Y()) && (o._errorChildren = s), U(s = Y()) && (o._hintChildren = s)
        }
      },
      viewQuery: function (i, o) {
        if (i & 1 && (et(Ya, 5), et(qa, 5), et(Wa, 5), et(Do, 5), et(Mo, 5), et(Io, 5)), i & 2) {
          let a;
          U(a = Y()) && (o._textField = a.first), U(a = Y()) && (o._iconPrefixContainer = a.first), U(a = Y()) && (o._textPrefixContainer = a.first), U(a = Y()) && (o._floatingLabel = a.first), U(a = Y()) && (o._notchedOutline = a.first), U(a = Y()) && (o._lineRipple = a.first)
        }
      },
      hostAttrs: [1, "mat-mdc-form-field"],
      hostVars: 42,
      hostBindings: function (i, o) {
        i & 2 && W("mat-mdc-form-field-label-always-float", o._shouldAlwaysFloat())("mat-mdc-form-field-has-icon-prefix", o._hasIconPrefix)("mat-mdc-form-field-has-icon-suffix", o._hasIconSuffix)("mat-form-field-invalid", o._control.errorState)("mat-form-field-disabled", o._control.disabled)("mat-form-field-autofilled", o._control.autofilled)("mat-form-field-no-animations", o._animationMode === "NoopAnimations")("mat-form-field-appearance-fill", o.appearance == "fill")("mat-form-field-appearance-outline", o.appearance == "outline")("mat-form-field-hide-placeholder", o._hasFloatingLabel() && !o._shouldLabelFloat())("mat-focused", o._control.focused)("mat-primary", o.color !== "accent" && o.color !== "warn")("mat-accent", o.color === "accent")("mat-warn", o.color === "warn")("ng-untouched", o._shouldForward("untouched"))("ng-touched", o._shouldForward("touched"))("ng-pristine", o._shouldForward("pristine"))("ng-dirty", o._shouldForward("dirty"))("ng-valid", o._shouldForward("valid"))("ng-invalid", o._shouldForward("invalid"))("ng-pending", o._shouldForward("pending"))
      },
      inputs: {
        hideRequiredMarker: "hideRequiredMarker",
        color: "color",
        floatLabel: "floatLabel",
        appearance: "appearance",
        subscriptSizing: "subscriptSizing",
        hintLabel: "hintLabel"
      },
      exportAs: ["matFormField"],
      standalone: !0,
      features: [X([{provide: Fi, useExisting: t}, {provide: Fo, useExisting: t}]), V],
      ngContentSelectors: $a,
      decls: 18,
      vars: 21,
      consts: [["labelTemplate", ""], ["textField", ""], ["iconPrefixContainer", ""], ["textPrefixContainer", ""], [1, "mat-mdc-text-field-wrapper", "mdc-text-field", 3, "click"], [1, "mat-mdc-form-field-focus-overlay"], [1, "mat-mdc-form-field-flex"], ["matFormFieldNotchedOutline", "", 3, "matFormFieldNotchedOutlineOpen"], [1, "mat-mdc-form-field-icon-prefix"], [1, "mat-mdc-form-field-text-prefix"], [1, "mat-mdc-form-field-infix"], [3, "ngTemplateOutlet"], [1, "mat-mdc-form-field-text-suffix"], [1, "mat-mdc-form-field-icon-suffix"], ["matFormFieldLineRipple", ""], [1, "mat-mdc-form-field-subscript-wrapper", "mat-mdc-form-field-bottom-align"], ["matFormFieldFloatingLabel", "", 3, "floating", "monitorResize", "id"], ["aria-hidden", "true", 1, "mat-mdc-form-field-required-marker", "mdc-floating-label--required"], [1, "mat-mdc-form-field-error-wrapper"], [1, "mat-mdc-form-field-hint-wrapper"], [3, "id"], [1, "mat-mdc-form-field-hint-spacer"]],
      template: function (i, o) {
        if (i & 1) {
          let a = dt();
          Dt(Ga), N(0, Ka, 1, 1, "ng-template", null, 0, _n), h(2, "div", 4, 1), R("click", function (d) {
            return rt(a), at(o._control.onContainerClick(d))
          }), N(4, Qa, 1, 0, "div", 5), h(5, "div", 6), N(6, es, 2, 2, "div", 7)(7, is, 3, 0, "div", 8)(8, ns, 3, 0, "div", 9), h(9, "div", 10), N(10, rs, 1, 1, null, 11), $(11), u(), N(12, as, 2, 0, "div", 12)(13, ss, 2, 0, "div", 13), u(), N(14, ds, 1, 0, "div", 14), u(), h(15, "div", 15), N(16, ls, 2, 1)(17, ms, 5, 2), u()
        }
        if (i & 2) {
          let a;
          _(2), W("mdc-text-field--filled", !o._hasOutline())("mdc-text-field--outlined", o._hasOutline())("mdc-text-field--no-label", !o._hasFloatingLabel())("mdc-text-field--disabled", o._control.disabled)("mdc-text-field--invalid", o._control.errorState), _(2), B(4, !o._hasOutline() && !o._control.disabled ? 4 : -1), _(2), B(6, o._hasOutline() ? 6 : -1), _(), B(7, o._hasIconPrefix ? 7 : -1), _(), B(8, o._hasTextPrefix ? 8 : -1), _(2), B(10, !o._hasOutline() || o._forceDisplayInfixLabel() ? 10 : -1), _(2), B(12, o._hasTextSuffix ? 12 : -1), _(), B(13, o._hasIconSuffix ? 13 : -1), _(), B(14, o._hasOutline() ? -1 : 14), _(), W("mat-mdc-form-field-subscript-dynamic-size", o.subscriptSizing === "dynamic"), _(), B(16, (a = o._getDisplayedMessages()) === "error" ? 16 : a === "hint" ? 17 : -1)
        }
      },
      dependencies: [Do, Mo, Cn, Io, Eo],
      styles: ['.mdc-text-field{border-top-left-radius:4px;border-top-left-radius:var(--mdc-shape-small, 4px);border-top-right-radius:4px;border-top-right-radius:var(--mdc-shape-small, 4px);border-bottom-right-radius:0;border-bottom-left-radius:0;display:inline-flex;align-items:baseline;padding:0 16px;position:relative;box-sizing:border-box;overflow:hidden;will-change:opacity,transform,color}.mdc-text-field .mdc-floating-label{top:50%;transform:translateY(-50%);pointer-events:none}.mdc-text-field__input{height:28px;width:100%;min-width:0;border:none;border-radius:0;background:none;appearance:none;padding:0}.mdc-text-field__input::-ms-clear{display:none}.mdc-text-field__input::-webkit-calendar-picker-indicator{display:none}.mdc-text-field__input:focus{outline:none}.mdc-text-field__input:invalid{box-shadow:none}@media all{.mdc-text-field__input::placeholder{opacity:0}}@media all{.mdc-text-field__input:-ms-input-placeholder{opacity:0}}@media all{.mdc-text-field--no-label .mdc-text-field__input::placeholder,.mdc-text-field--focused .mdc-text-field__input::placeholder{opacity:1}}@media all{.mdc-text-field--no-label .mdc-text-field__input:-ms-input-placeholder,.mdc-text-field--focused .mdc-text-field__input:-ms-input-placeholder{opacity:1}}.mdc-text-field__affix{height:28px;opacity:0;white-space:nowrap}.mdc-text-field--label-floating .mdc-text-field__affix,.mdc-text-field--no-label .mdc-text-field__affix{opacity:1}@supports(-webkit-hyphens: none){.mdc-text-field--outlined .mdc-text-field__affix{align-items:center;align-self:center;display:inline-flex;height:100%}}.mdc-text-field__affix--prefix{padding-left:0;padding-right:2px}[dir=rtl] .mdc-text-field__affix--prefix,.mdc-text-field__affix--prefix[dir=rtl]{padding-left:2px;padding-right:0}.mdc-text-field--end-aligned .mdc-text-field__affix--prefix{padding-left:0;padding-right:12px}[dir=rtl] .mdc-text-field--end-aligned .mdc-text-field__affix--prefix,.mdc-text-field--end-aligned .mdc-text-field__affix--prefix[dir=rtl]{padding-left:12px;padding-right:0}.mdc-text-field__affix--suffix{padding-left:12px;padding-right:0}[dir=rtl] .mdc-text-field__affix--suffix,.mdc-text-field__affix--suffix[dir=rtl]{padding-left:0;padding-right:12px}.mdc-text-field--end-aligned .mdc-text-field__affix--suffix{padding-left:2px;padding-right:0}[dir=rtl] .mdc-text-field--end-aligned .mdc-text-field__affix--suffix,.mdc-text-field--end-aligned .mdc-text-field__affix--suffix[dir=rtl]{padding-left:0;padding-right:2px}.mdc-text-field--filled{height:56px}.mdc-text-field--filled::before{display:inline-block;width:0;height:40px;content:"";vertical-align:0}.mdc-text-field--filled .mdc-floating-label{left:16px;right:initial}[dir=rtl] .mdc-text-field--filled .mdc-floating-label,.mdc-text-field--filled .mdc-floating-label[dir=rtl]{left:initial;right:16px}.mdc-text-field--filled .mdc-floating-label--float-above{transform:translateY(-106%) scale(0.75)}.mdc-text-field--filled.mdc-text-field--no-label .mdc-text-field__input{height:100%}.mdc-text-field--filled.mdc-text-field--no-label .mdc-floating-label{display:none}.mdc-text-field--filled.mdc-text-field--no-label::before{display:none}@supports(-webkit-hyphens: none){.mdc-text-field--filled.mdc-text-field--no-label .mdc-text-field__affix{align-items:center;align-self:center;display:inline-flex;height:100%}}.mdc-text-field--outlined{height:56px;overflow:visible}.mdc-text-field--outlined .mdc-floating-label--float-above{transform:translateY(-37.25px) scale(1)}.mdc-text-field--outlined.mdc-notched-outline--upgraded .mdc-floating-label--float-above,.mdc-text-field--outlined .mdc-notched-outline--upgraded .mdc-floating-label--float-above{transform:translateY(-34.75px) scale(0.75)}.mdc-text-field--outlined .mdc-floating-label--float-above{font-size:.75rem}.mdc-text-field--outlined.mdc-notched-outline--upgraded .mdc-floating-label--float-above,.mdc-text-field--outlined .mdc-notched-outline--upgraded .mdc-floating-label--float-above{font-size:1rem}.mdc-text-field--outlined .mdc-text-field__input{height:100%}.mdc-text-field--outlined .mdc-notched-outline .mdc-notched-outline__leading{border-top-left-radius:4px;border-top-left-radius:var(--mdc-shape-small, 4px);border-top-right-radius:0;border-bottom-right-radius:0;border-bottom-left-radius:4px;border-bottom-left-radius:var(--mdc-shape-small, 4px)}[dir=rtl] .mdc-text-field--outlined .mdc-notched-outline .mdc-notched-outline__leading,.mdc-text-field--outlined .mdc-notched-outline .mdc-notched-outline__leading[dir=rtl]{border-top-left-radius:0;border-top-right-radius:4px;border-top-right-radius:var(--mdc-shape-small, 4px);border-bottom-right-radius:4px;border-bottom-right-radius:var(--mdc-shape-small, 4px);border-bottom-left-radius:0}@supports(top: max(0%)){.mdc-text-field--outlined .mdc-notched-outline .mdc-notched-outline__leading{width:max(12px,var(--mdc-shape-small, 4px))}}@supports(top: max(0%)){.mdc-text-field--outlined .mdc-notched-outline .mdc-notched-outline__notch{max-width:calc(100% - max(12px,var(--mdc-shape-small, 4px))*2)}}.mdc-text-field--outlined .mdc-notched-outline .mdc-notched-outline__trailing{border-top-left-radius:0;border-top-right-radius:4px;border-top-right-radius:var(--mdc-shape-small, 4px);border-bottom-right-radius:4px;border-bottom-right-radius:var(--mdc-shape-small, 4px);border-bottom-left-radius:0}[dir=rtl] .mdc-text-field--outlined .mdc-notched-outline .mdc-notched-outline__trailing,.mdc-text-field--outlined .mdc-notched-outline .mdc-notched-outline__trailing[dir=rtl]{border-top-left-radius:4px;border-top-left-radius:var(--mdc-shape-small, 4px);border-top-right-radius:0;border-bottom-right-radius:0;border-bottom-left-radius:4px;border-bottom-left-radius:var(--mdc-shape-small, 4px)}@supports(top: max(0%)){.mdc-text-field--outlined{padding-left:max(16px,calc(var(--mdc-shape-small, 4px) + 4px))}}@supports(top: max(0%)){.mdc-text-field--outlined{padding-right:max(16px,var(--mdc-shape-small, 4px))}}@supports(top: max(0%)){.mdc-text-field--outlined+.mdc-text-field-helper-line{padding-left:max(16px,calc(var(--mdc-shape-small, 4px) + 4px))}}@supports(top: max(0%)){.mdc-text-field--outlined+.mdc-text-field-helper-line{padding-right:max(16px,var(--mdc-shape-small, 4px))}}.mdc-text-field--outlined.mdc-text-field--with-leading-icon{padding-left:0}@supports(top: max(0%)){.mdc-text-field--outlined.mdc-text-field--with-leading-icon{padding-right:max(16px,var(--mdc-shape-small, 4px))}}[dir=rtl] .mdc-text-field--outlined.mdc-text-field--with-leading-icon,.mdc-text-field--outlined.mdc-text-field--with-leading-icon[dir=rtl]{padding-right:0}@supports(top: max(0%)){[dir=rtl] .mdc-text-field--outlined.mdc-text-field--with-leading-icon,.mdc-text-field--outlined.mdc-text-field--with-leading-icon[dir=rtl]{padding-left:max(16px,var(--mdc-shape-small, 4px))}}.mdc-text-field--outlined.mdc-text-field--with-trailing-icon{padding-right:0}@supports(top: max(0%)){.mdc-text-field--outlined.mdc-text-field--with-trailing-icon{padding-left:max(16px,calc(var(--mdc-shape-small, 4px) + 4px))}}[dir=rtl] .mdc-text-field--outlined.mdc-text-field--with-trailing-icon,.mdc-text-field--outlined.mdc-text-field--with-trailing-icon[dir=rtl]{padding-left:0}@supports(top: max(0%)){[dir=rtl] .mdc-text-field--outlined.mdc-text-field--with-trailing-icon,.mdc-text-field--outlined.mdc-text-field--with-trailing-icon[dir=rtl]{padding-right:max(16px,calc(var(--mdc-shape-small, 4px) + 4px))}}.mdc-text-field--outlined.mdc-text-field--with-leading-icon.mdc-text-field--with-trailing-icon{padding-left:0;padding-right:0}.mdc-text-field--outlined .mdc-notched-outline--notched .mdc-notched-outline__notch{padding-top:1px}.mdc-text-field--outlined .mdc-floating-label{left:4px;right:initial}[dir=rtl] .mdc-text-field--outlined .mdc-floating-label,.mdc-text-field--outlined .mdc-floating-label[dir=rtl]{left:initial;right:4px}.mdc-text-field--outlined .mdc-text-field__input{display:flex;border:none !important;background-color:rgba(0,0,0,0)}.mdc-text-field--outlined .mdc-notched-outline{z-index:1}.mdc-text-field--textarea{flex-direction:column;align-items:center;width:auto;height:auto;padding:0}.mdc-text-field--textarea .mdc-floating-label{top:19px}.mdc-text-field--textarea .mdc-floating-label:not(.mdc-floating-label--float-above){transform:none}.mdc-text-field--textarea .mdc-text-field__input{flex-grow:1;height:auto;min-height:1.5rem;overflow-x:hidden;overflow-y:auto;box-sizing:border-box;resize:none;padding:0 16px}.mdc-text-field--textarea.mdc-text-field--filled::before{display:none}.mdc-text-field--textarea.mdc-text-field--filled .mdc-floating-label--float-above{transform:translateY(-10.25px) scale(0.75)}.mdc-text-field--textarea.mdc-text-field--filled .mdc-text-field__input{margin-top:23px;margin-bottom:9px}.mdc-text-field--textarea.mdc-text-field--filled.mdc-text-field--no-label .mdc-text-field__input{margin-top:16px;margin-bottom:16px}.mdc-text-field--textarea.mdc-text-field--outlined .mdc-notched-outline--notched .mdc-notched-outline__notch{padding-top:0}.mdc-text-field--textarea.mdc-text-field--outlined .mdc-floating-label--float-above{transform:translateY(-27.25px) scale(1)}.mdc-text-field--textarea.mdc-text-field--outlined.mdc-notched-outline--upgraded .mdc-floating-label--float-above,.mdc-text-field--textarea.mdc-text-field--outlined .mdc-notched-outline--upgraded .mdc-floating-label--float-above{transform:translateY(-24.75px) scale(0.75)}.mdc-text-field--textarea.mdc-text-field--outlined .mdc-floating-label--float-above{font-size:.75rem}.mdc-text-field--textarea.mdc-text-field--outlined.mdc-notched-outline--upgraded .mdc-floating-label--float-above,.mdc-text-field--textarea.mdc-text-field--outlined .mdc-notched-outline--upgraded .mdc-floating-label--float-above{font-size:1rem}.mdc-text-field--textarea.mdc-text-field--outlined .mdc-text-field__input{margin-top:16px;margin-bottom:16px}.mdc-text-field--textarea.mdc-text-field--outlined .mdc-floating-label{top:18px}.mdc-text-field--textarea.mdc-text-field--with-internal-counter .mdc-text-field__input{margin-bottom:2px}.mdc-text-field--textarea.mdc-text-field--with-internal-counter .mdc-text-field-character-counter{align-self:flex-end;padding:0 16px}.mdc-text-field--textarea.mdc-text-field--with-internal-counter .mdc-text-field-character-counter::after{display:inline-block;width:0;height:16px;content:"";vertical-align:-16px}.mdc-text-field--textarea.mdc-text-field--with-internal-counter .mdc-text-field-character-counter::before{display:none}.mdc-text-field__resizer{align-self:stretch;display:inline-flex;flex-direction:column;flex-grow:1;max-height:100%;max-width:100%;min-height:56px;min-width:fit-content;min-width:-moz-available;min-width:-webkit-fill-available;overflow:hidden;resize:both}.mdc-text-field--filled .mdc-text-field__resizer{transform:translateY(-1px)}.mdc-text-field--filled .mdc-text-field__resizer .mdc-text-field__input,.mdc-text-field--filled .mdc-text-field__resizer .mdc-text-field-character-counter{transform:translateY(1px)}.mdc-text-field--outlined .mdc-text-field__resizer{transform:translateX(-1px) translateY(-1px)}[dir=rtl] .mdc-text-field--outlined .mdc-text-field__resizer,.mdc-text-field--outlined .mdc-text-field__resizer[dir=rtl]{transform:translateX(1px) translateY(-1px)}.mdc-text-field--outlined .mdc-text-field__resizer .mdc-text-field__input,.mdc-text-field--outlined .mdc-text-field__resizer .mdc-text-field-character-counter{transform:translateX(1px) translateY(1px)}[dir=rtl] .mdc-text-field--outlined .mdc-text-field__resizer .mdc-text-field__input,[dir=rtl] .mdc-text-field--outlined .mdc-text-field__resizer .mdc-text-field-character-counter,.mdc-text-field--outlined .mdc-text-field__resizer .mdc-text-field__input[dir=rtl],.mdc-text-field--outlined .mdc-text-field__resizer .mdc-text-field-character-counter[dir=rtl]{transform:translateX(-1px) translateY(1px)}.mdc-text-field--with-leading-icon{padding-left:0;padding-right:16px}[dir=rtl] .mdc-text-field--with-leading-icon,.mdc-text-field--with-leading-icon[dir=rtl]{padding-left:16px;padding-right:0}.mdc-text-field--with-leading-icon.mdc-text-field--filled .mdc-floating-label{max-width:calc(100% - 48px);left:48px;right:initial}[dir=rtl] .mdc-text-field--with-leading-icon.mdc-text-field--filled .mdc-floating-label,.mdc-text-field--with-leading-icon.mdc-text-field--filled .mdc-floating-label[dir=rtl]{left:initial;right:48px}.mdc-text-field--with-leading-icon.mdc-text-field--filled .mdc-floating-label--float-above{max-width:calc(100%/0.75 - 64px/0.75)}.mdc-text-field--with-leading-icon.mdc-text-field--outlined .mdc-floating-label{left:36px;right:initial}[dir=rtl] .mdc-text-field--with-leading-icon.mdc-text-field--outlined .mdc-floating-label,.mdc-text-field--with-leading-icon.mdc-text-field--outlined .mdc-floating-label[dir=rtl]{left:initial;right:36px}.mdc-text-field--with-leading-icon.mdc-text-field--outlined :not(.mdc-notched-outline--notched) .mdc-notched-outline__notch{max-width:calc(100% - 60px)}.mdc-text-field--with-leading-icon.mdc-text-field--outlined .mdc-floating-label--float-above{transform:translateY(-37.25px) translateX(-32px) scale(1)}[dir=rtl] .mdc-text-field--with-leading-icon.mdc-text-field--outlined .mdc-floating-label--float-above,.mdc-text-field--with-leading-icon.mdc-text-field--outlined .mdc-floating-label--float-above[dir=rtl]{transform:translateY(-37.25px) translateX(32px) scale(1)}.mdc-text-field--with-leading-icon.mdc-text-field--outlined.mdc-notched-outline--upgraded .mdc-floating-label--float-above,.mdc-text-field--with-leading-icon.mdc-text-field--outlined .mdc-notched-outline--upgraded .mdc-floating-label--float-above{transform:translateY(-34.75px) translateX(-32px) scale(0.75)}[dir=rtl] .mdc-text-field--with-leading-icon.mdc-text-field--outlined.mdc-notched-outline--upgraded .mdc-floating-label--float-above,[dir=rtl] .mdc-text-field--with-leading-icon.mdc-text-field--outlined .mdc-notched-outline--upgraded .mdc-floating-label--float-above,.mdc-text-field--with-leading-icon.mdc-text-field--outlined.mdc-notched-outline--upgraded .mdc-floating-label--float-above[dir=rtl],.mdc-text-field--with-leading-icon.mdc-text-field--outlined .mdc-notched-outline--upgraded .mdc-floating-label--float-above[dir=rtl]{transform:translateY(-34.75px) translateX(32px) scale(0.75)}.mdc-text-field--with-leading-icon.mdc-text-field--outlined .mdc-floating-label--float-above{font-size:.75rem}.mdc-text-field--with-leading-icon.mdc-text-field--outlined.mdc-notched-outline--upgraded .mdc-floating-label--float-above,.mdc-text-field--with-leading-icon.mdc-text-field--outlined .mdc-notched-outline--upgraded .mdc-floating-label--float-above{font-size:1rem}.mdc-text-field--with-trailing-icon{padding-left:16px;padding-right:0}[dir=rtl] .mdc-text-field--with-trailing-icon,.mdc-text-field--with-trailing-icon[dir=rtl]{padding-left:0;padding-right:16px}.mdc-text-field--with-trailing-icon.mdc-text-field--filled .mdc-floating-label{max-width:calc(100% - 64px)}.mdc-text-field--with-trailing-icon.mdc-text-field--filled .mdc-floating-label--float-above{max-width:calc(100%/0.75 - 64px/0.75)}.mdc-text-field--with-trailing-icon.mdc-text-field--outlined :not(.mdc-notched-outline--notched) .mdc-notched-outline__notch{max-width:calc(100% - 60px)}.mdc-text-field--with-leading-icon.mdc-text-field--with-trailing-icon{padding-left:0;padding-right:0}.mdc-text-field--with-leading-icon.mdc-text-field--with-trailing-icon.mdc-text-field--filled .mdc-floating-label{max-width:calc(100% - 96px)}.mdc-text-field--with-leading-icon.mdc-text-field--with-trailing-icon.mdc-text-field--filled .mdc-floating-label--float-above{max-width:calc(100%/0.75 - 96px/0.75)}.mdc-text-field-helper-line{display:flex;justify-content:space-between;box-sizing:border-box}.mdc-text-field+.mdc-text-field-helper-line{padding-right:16px;padding-left:16px}.mdc-form-field>.mdc-text-field+label{align-self:flex-start}.mdc-text-field--focused .mdc-notched-outline__leading,.mdc-text-field--focused .mdc-notched-outline__notch,.mdc-text-field--focused .mdc-notched-outline__trailing{border-width:2px}.mdc-text-field--focused+.mdc-text-field-helper-line .mdc-text-field-helper-text:not(.mdc-text-field-helper-text--validation-msg){opacity:1}.mdc-text-field--focused.mdc-text-field--outlined .mdc-notched-outline--notched .mdc-notched-outline__notch{padding-top:2px}.mdc-text-field--focused.mdc-text-field--outlined.mdc-text-field--textarea .mdc-notched-outline--notched .mdc-notched-outline__notch{padding-top:0}.mdc-text-field--invalid+.mdc-text-field-helper-line .mdc-text-field-helper-text--validation-msg{opacity:1}.mdc-text-field--disabled{pointer-events:none}@media screen and (forced-colors: active){.mdc-text-field--disabled .mdc-text-field__input{background-color:Window}.mdc-text-field--disabled .mdc-floating-label{z-index:1}}.mdc-text-field--disabled .mdc-floating-label{cursor:default}.mdc-text-field--disabled.mdc-text-field--filled .mdc-text-field__ripple{display:none}.mdc-text-field--disabled .mdc-text-field__input{pointer-events:auto}.mdc-text-field--end-aligned .mdc-text-field__input{text-align:right}[dir=rtl] .mdc-text-field--end-aligned .mdc-text-field__input,.mdc-text-field--end-aligned .mdc-text-field__input[dir=rtl]{text-align:left}[dir=rtl] .mdc-text-field--ltr-text .mdc-text-field__input,[dir=rtl] .mdc-text-field--ltr-text .mdc-text-field__affix,.mdc-text-field--ltr-text[dir=rtl] .mdc-text-field__input,.mdc-text-field--ltr-text[dir=rtl] .mdc-text-field__affix{direction:ltr}[dir=rtl] .mdc-text-field--ltr-text .mdc-text-field__affix--prefix,.mdc-text-field--ltr-text[dir=rtl] .mdc-text-field__affix--prefix{padding-left:0;padding-right:2px}[dir=rtl] .mdc-text-field--ltr-text .mdc-text-field__affix--suffix,.mdc-text-field--ltr-text[dir=rtl] .mdc-text-field__affix--suffix{padding-left:12px;padding-right:0}[dir=rtl] .mdc-text-field--ltr-text .mdc-text-field__icon--leading,.mdc-text-field--ltr-text[dir=rtl] .mdc-text-field__icon--leading{order:1}[dir=rtl] .mdc-text-field--ltr-text .mdc-text-field__affix--suffix,.mdc-text-field--ltr-text[dir=rtl] .mdc-text-field__affix--suffix{order:2}[dir=rtl] .mdc-text-field--ltr-text .mdc-text-field__input,.mdc-text-field--ltr-text[dir=rtl] .mdc-text-field__input{order:3}[dir=rtl] .mdc-text-field--ltr-text .mdc-text-field__affix--prefix,.mdc-text-field--ltr-text[dir=rtl] .mdc-text-field__affix--prefix{order:4}[dir=rtl] .mdc-text-field--ltr-text .mdc-text-field__icon--trailing,.mdc-text-field--ltr-text[dir=rtl] .mdc-text-field__icon--trailing{order:5}[dir=rtl] .mdc-text-field--ltr-text.mdc-text-field--end-aligned .mdc-text-field__input,.mdc-text-field--ltr-text.mdc-text-field--end-aligned[dir=rtl] .mdc-text-field__input{text-align:right}[dir=rtl] .mdc-text-field--ltr-text.mdc-text-field--end-aligned .mdc-text-field__affix--prefix,.mdc-text-field--ltr-text.mdc-text-field--end-aligned[dir=rtl] .mdc-text-field__affix--prefix{padding-right:12px}[dir=rtl] .mdc-text-field--ltr-text.mdc-text-field--end-aligned .mdc-text-field__affix--suffix,.mdc-text-field--ltr-text.mdc-text-field--end-aligned[dir=rtl] .mdc-text-field__affix--suffix{padding-left:2px}.mdc-floating-label{position:absolute;left:0;-webkit-transform-origin:left top;transform-origin:left top;line-height:1.15rem;text-align:left;text-overflow:ellipsis;white-space:nowrap;cursor:text;overflow:hidden;will-change:transform}[dir=rtl] .mdc-floating-label,.mdc-floating-label[dir=rtl]{right:0;left:auto;-webkit-transform-origin:right top;transform-origin:right top;text-align:right}.mdc-floating-label--float-above{cursor:auto}.mdc-floating-label--required:not(.mdc-floating-label--hide-required-marker)::after{margin-left:1px;margin-right:0px;content:"*"}[dir=rtl] .mdc-floating-label--required:not(.mdc-floating-label--hide-required-marker)::after,.mdc-floating-label--required:not(.mdc-floating-label--hide-required-marker)[dir=rtl]::after{margin-left:0;margin-right:1px}.mdc-notched-outline{display:flex;position:absolute;top:0;right:0;left:0;box-sizing:border-box;width:100%;max-width:100%;height:100%;text-align:left;pointer-events:none}[dir=rtl] .mdc-notched-outline,.mdc-notched-outline[dir=rtl]{text-align:right}.mdc-notched-outline__leading,.mdc-notched-outline__notch,.mdc-notched-outline__trailing{box-sizing:border-box;height:100%;pointer-events:none}.mdc-notched-outline__trailing{flex-grow:1}.mdc-notched-outline__notch{flex:0 0 auto;width:auto}.mdc-notched-outline .mdc-floating-label{display:inline-block;position:relative;max-width:100%}.mdc-notched-outline .mdc-floating-label--float-above{text-overflow:clip}.mdc-notched-outline--upgraded .mdc-floating-label--float-above{max-width:133.3333333333%}.mdc-notched-outline--notched .mdc-notched-outline__notch{padding-left:0;padding-right:8px;border-top:none}[dir=rtl] .mdc-notched-outline--notched .mdc-notched-outline__notch,.mdc-notched-outline--notched .mdc-notched-outline__notch[dir=rtl]{padding-left:8px;padding-right:0}.mdc-notched-outline--no-label .mdc-notched-outline__notch{display:none}.mdc-line-ripple::before,.mdc-line-ripple::after{position:absolute;bottom:0;left:0;width:100%;border-bottom-style:solid;content:""}.mdc-line-ripple::before{z-index:1}.mdc-line-ripple::after{transform:scaleX(0);opacity:0;z-index:2}.mdc-line-ripple--active::after{transform:scaleX(1);opacity:1}.mdc-line-ripple--deactivating::after{opacity:0}.mdc-floating-label--float-above{transform:translateY(-106%) scale(0.75)}.mdc-notched-outline__leading,.mdc-notched-outline__notch,.mdc-notched-outline__trailing{border-top:1px solid;border-bottom:1px solid}.mdc-notched-outline__leading{border-left:1px solid;border-right:none;width:12px}[dir=rtl] .mdc-notched-outline__leading,.mdc-notched-outline__leading[dir=rtl]{border-left:none;border-right:1px solid}.mdc-notched-outline__trailing{border-left:none;border-right:1px solid}[dir=rtl] .mdc-notched-outline__trailing,.mdc-notched-outline__trailing[dir=rtl]{border-left:1px solid;border-right:none}.mdc-notched-outline__notch{max-width:calc(100% - 12px*2)}.mdc-line-ripple::before{border-bottom-width:1px}.mdc-line-ripple::after{border-bottom-width:2px}.mdc-text-field--filled{border-top-left-radius:var(--mdc-filled-text-field-container-shape);border-top-right-radius:var(--mdc-filled-text-field-container-shape);border-bottom-right-radius:0;border-bottom-left-radius:0}.mdc-text-field--filled:not(.mdc-text-field--disabled) .mdc-text-field__input{caret-color:var(--mdc-filled-text-field-caret-color)}.mdc-text-field--filled.mdc-text-field--invalid:not(.mdc-text-field--disabled) .mdc-text-field__input{caret-color:var(--mdc-filled-text-field-error-caret-color)}.mdc-text-field--filled:not(.mdc-text-field--disabled) .mdc-text-field__input{color:var(--mdc-filled-text-field-input-text-color)}.mdc-text-field--filled.mdc-text-field--disabled .mdc-text-field__input{color:var(--mdc-filled-text-field-disabled-input-text-color)}.mdc-text-field--filled:not(.mdc-text-field--disabled) .mdc-floating-label,.mdc-text-field--filled:not(.mdc-text-field--disabled) .mdc-floating-label--float-above{color:var(--mdc-filled-text-field-label-text-color)}.mdc-text-field--filled:not(.mdc-text-field--disabled).mdc-text-field--focused .mdc-floating-label,.mdc-text-field--filled:not(.mdc-text-field--disabled).mdc-text-field--focused .mdc-floating-label--float-above{color:var(--mdc-filled-text-field-focus-label-text-color)}.mdc-text-field--filled:not(.mdc-text-field--disabled):not(.mdc-text-field--focused):hover .mdc-floating-label,.mdc-text-field--filled:not(.mdc-text-field--disabled):not(.mdc-text-field--focused):hover .mdc-floating-label--float-above{color:var(--mdc-filled-text-field-hover-label-text-color)}.mdc-text-field--filled.mdc-text-field--disabled .mdc-floating-label,.mdc-text-field--filled.mdc-text-field--disabled .mdc-floating-label--float-above{color:var(--mdc-filled-text-field-disabled-label-text-color)}.mdc-text-field--filled.mdc-text-field--invalid:not(.mdc-text-field--disabled) .mdc-floating-label,.mdc-text-field--filled.mdc-text-field--invalid:not(.mdc-text-field--disabled) .mdc-floating-label--float-above{color:var(--mdc-filled-text-field-error-label-text-color)}.mdc-text-field--filled.mdc-text-field--invalid:not(.mdc-text-field--disabled).mdc-text-field--focused .mdc-floating-label,.mdc-text-field--filled.mdc-text-field--invalid:not(.mdc-text-field--disabled).mdc-text-field--focused .mdc-floating-label--float-above{color:var(--mdc-filled-text-field-error-focus-label-text-color)}.mdc-text-field--filled.mdc-text-field--invalid:not(.mdc-text-field--disabled):not(.mdc-text-field--focused):hover .mdc-floating-label,.mdc-text-field--filled.mdc-text-field--invalid:not(.mdc-text-field--disabled):not(.mdc-text-field--focused):hover .mdc-floating-label--float-above{color:var(--mdc-filled-text-field-error-hover-label-text-color)}.mdc-text-field--filled .mdc-floating-label{font-family:var(--mdc-filled-text-field-label-text-font);font-size:var(--mdc-filled-text-field-label-text-size);font-weight:var(--mdc-filled-text-field-label-text-weight);letter-spacing:var(--mdc-filled-text-field-label-text-tracking)}@media all{.mdc-text-field--filled:not(.mdc-text-field--disabled) .mdc-text-field__input::placeholder{color:var(--mdc-filled-text-field-input-text-placeholder-color)}}@media all{.mdc-text-field--filled:not(.mdc-text-field--disabled) .mdc-text-field__input:-ms-input-placeholder{color:var(--mdc-filled-text-field-input-text-placeholder-color)}}.mdc-text-field--filled:not(.mdc-text-field--disabled){background-color:var(--mdc-filled-text-field-container-color)}.mdc-text-field--filled.mdc-text-field--disabled{background-color:var(--mdc-filled-text-field-disabled-container-color)}.mdc-text-field--filled:not(.mdc-text-field--disabled) .mdc-line-ripple::before{border-bottom-color:var(--mdc-filled-text-field-active-indicator-color)}.mdc-text-field--filled:not(.mdc-text-field--disabled):not(.mdc-text-field--focused):hover .mdc-line-ripple::before{border-bottom-color:var(--mdc-filled-text-field-hover-active-indicator-color)}.mdc-text-field--filled:not(.mdc-text-field--disabled) .mdc-line-ripple::after{border-bottom-color:var(--mdc-filled-text-field-focus-active-indicator-color)}.mdc-text-field--filled.mdc-text-field--disabled .mdc-line-ripple::before{border-bottom-color:var(--mdc-filled-text-field-disabled-active-indicator-color)}.mdc-text-field--filled.mdc-text-field--invalid:not(.mdc-text-field--disabled) .mdc-line-ripple::before{border-bottom-color:var(--mdc-filled-text-field-error-active-indicator-color)}.mdc-text-field--filled.mdc-text-field--invalid:not(.mdc-text-field--disabled):not(.mdc-text-field--focused):hover .mdc-line-ripple::before{border-bottom-color:var(--mdc-filled-text-field-error-hover-active-indicator-color)}.mdc-text-field--filled.mdc-text-field--invalid:not(.mdc-text-field--disabled) .mdc-line-ripple::after{border-bottom-color:var(--mdc-filled-text-field-error-focus-active-indicator-color)}.mdc-text-field--filled .mdc-line-ripple::before{border-bottom-width:var(--mdc-filled-text-field-active-indicator-height)}.mdc-text-field--filled .mdc-line-ripple::after{border-bottom-width:var(--mdc-filled-text-field-focus-active-indicator-height)}.mdc-text-field--outlined:not(.mdc-text-field--disabled) .mdc-text-field__input{caret-color:var(--mdc-outlined-text-field-caret-color)}.mdc-text-field--outlined.mdc-text-field--invalid:not(.mdc-text-field--disabled) .mdc-text-field__input{caret-color:var(--mdc-outlined-text-field-error-caret-color)}.mdc-text-field--outlined:not(.mdc-text-field--disabled) .mdc-text-field__input{color:var(--mdc-outlined-text-field-input-text-color)}.mdc-text-field--outlined.mdc-text-field--disabled .mdc-text-field__input{color:var(--mdc-outlined-text-field-disabled-input-text-color)}.mdc-text-field--outlined:not(.mdc-text-field--disabled) .mdc-floating-label,.mdc-text-field--outlined:not(.mdc-text-field--disabled) .mdc-floating-label--float-above{color:var(--mdc-outlined-text-field-label-text-color)}.mdc-text-field--outlined:not(.mdc-text-field--disabled).mdc-text-field--focused .mdc-floating-label,.mdc-text-field--outlined:not(.mdc-text-field--disabled).mdc-text-field--focused .mdc-floating-label--float-above{color:var(--mdc-outlined-text-field-focus-label-text-color)}.mdc-text-field--outlined:not(.mdc-text-field--disabled):not(.mdc-text-field--focused):hover .mdc-floating-label,.mdc-text-field--outlined:not(.mdc-text-field--disabled):not(.mdc-text-field--focused):hover .mdc-floating-label--float-above{color:var(--mdc-outlined-text-field-hover-label-text-color)}.mdc-text-field--outlined.mdc-text-field--disabled .mdc-floating-label,.mdc-text-field--outlined.mdc-text-field--disabled .mdc-floating-label--float-above{color:var(--mdc-outlined-text-field-disabled-label-text-color)}.mdc-text-field--outlined.mdc-text-field--invalid:not(.mdc-text-field--disabled) .mdc-floating-label,.mdc-text-field--outlined.mdc-text-field--invalid:not(.mdc-text-field--disabled) .mdc-floating-label--float-above{color:var(--mdc-outlined-text-field-error-label-text-color)}.mdc-text-field--outlined.mdc-text-field--invalid:not(.mdc-text-field--disabled).mdc-text-field--focused .mdc-floating-label,.mdc-text-field--outlined.mdc-text-field--invalid:not(.mdc-text-field--disabled).mdc-text-field--focused .mdc-floating-label--float-above{color:var(--mdc-outlined-text-field-error-focus-label-text-color)}.mdc-text-field--outlined.mdc-text-field--invalid:not(.mdc-text-field--disabled):not(.mdc-text-field--focused):hover .mdc-floating-label,.mdc-text-field--outlined.mdc-text-field--invalid:not(.mdc-text-field--disabled):not(.mdc-text-field--focused):hover .mdc-floating-label--float-above{color:var(--mdc-outlined-text-field-error-hover-label-text-color)}.mdc-text-field--outlined .mdc-floating-label{font-family:var(--mdc-outlined-text-field-label-text-font);font-size:var(--mdc-outlined-text-field-label-text-size);font-weight:var(--mdc-outlined-text-field-label-text-weight);letter-spacing:var(--mdc-outlined-text-field-label-text-tracking)}@media all{.mdc-text-field--outlined:not(.mdc-text-field--disabled) .mdc-text-field__input::placeholder{color:var(--mdc-outlined-text-field-input-text-placeholder-color)}}@media all{.mdc-text-field--outlined:not(.mdc-text-field--disabled) .mdc-text-field__input:-ms-input-placeholder{color:var(--mdc-outlined-text-field-input-text-placeholder-color)}}.mdc-text-field--outlined.mdc-text-field--textarea.mdc-text-field--outlined .mdc-floating-label--float-above{font-size:calc(.75*var(--mdc-outlined-text-field-label-text-size))}.mdc-text-field--outlined.mdc-text-field--textarea.mdc-text-field--outlined.mdc-notched-outline--upgraded .mdc-floating-label--float-above,.mdc-text-field--outlined.mdc-text-field--textarea.mdc-text-field--outlined .mdc-notched-outline--upgraded .mdc-floating-label--float-above{font-size:var(--mdc-outlined-text-field-label-text-size)}.mdc-text-field--outlined .mdc-notched-outline .mdc-notched-outline__leading{border-top-left-radius:var(--mdc-outlined-text-field-container-shape);border-top-right-radius:0;border-bottom-right-radius:0;border-bottom-left-radius:var(--mdc-outlined-text-field-container-shape)}[dir=rtl] .mdc-text-field--outlined .mdc-notched-outline .mdc-notched-outline__leading,.mdc-text-field--outlined .mdc-notched-outline .mdc-notched-outline__leading[dir=rtl]{border-top-left-radius:0;border-top-right-radius:var(--mdc-outlined-text-field-container-shape);border-bottom-right-radius:var(--mdc-outlined-text-field-container-shape);border-bottom-left-radius:0}@supports(top: max(0%)){.mdc-text-field--outlined .mdc-notched-outline .mdc-notched-outline__leading{width:max(12px,var(--mdc-outlined-text-field-container-shape))}}@supports(top: max(0%)){.mdc-text-field--outlined .mdc-notched-outline .mdc-notched-outline__notch{max-width:calc(100% - max(12px,var(--mdc-outlined-text-field-container-shape))*2)}}.mdc-text-field--outlined .mdc-notched-outline .mdc-notched-outline__trailing{border-top-left-radius:0;border-top-right-radius:var(--mdc-outlined-text-field-container-shape);border-bottom-right-radius:var(--mdc-outlined-text-field-container-shape);border-bottom-left-radius:0}[dir=rtl] .mdc-text-field--outlined .mdc-notched-outline .mdc-notched-outline__trailing,.mdc-text-field--outlined .mdc-notched-outline .mdc-notched-outline__trailing[dir=rtl]{border-top-left-radius:var(--mdc-outlined-text-field-container-shape);border-top-right-radius:0;border-bottom-right-radius:0;border-bottom-left-radius:var(--mdc-outlined-text-field-container-shape)}@supports(top: max(0%)){.mdc-text-field--outlined{padding-left:max(16px,calc(var(--mdc-outlined-text-field-container-shape) + 4px))}}@supports(top: max(0%)){.mdc-text-field--outlined{padding-right:max(16px,var(--mdc-outlined-text-field-container-shape))}}@supports(top: max(0%)){.mdc-text-field--outlined+.mdc-text-field-helper-line{padding-left:max(16px,calc(var(--mdc-outlined-text-field-container-shape) + 4px))}}@supports(top: max(0%)){.mdc-text-field--outlined+.mdc-text-field-helper-line{padding-right:max(16px,var(--mdc-outlined-text-field-container-shape))}}.mdc-text-field--outlined.mdc-text-field--with-leading-icon{padding-left:0}@supports(top: max(0%)){.mdc-text-field--outlined.mdc-text-field--with-leading-icon{padding-right:max(16px,var(--mdc-outlined-text-field-container-shape))}}[dir=rtl] .mdc-text-field--outlined.mdc-text-field--with-leading-icon,.mdc-text-field--outlined.mdc-text-field--with-leading-icon[dir=rtl]{padding-right:0}@supports(top: max(0%)){[dir=rtl] .mdc-text-field--outlined.mdc-text-field--with-leading-icon,.mdc-text-field--outlined.mdc-text-field--with-leading-icon[dir=rtl]{padding-left:max(16px,var(--mdc-outlined-text-field-container-shape))}}.mdc-text-field--outlined.mdc-text-field--with-trailing-icon{padding-right:0}@supports(top: max(0%)){.mdc-text-field--outlined.mdc-text-field--with-trailing-icon{padding-left:max(16px,calc(var(--mdc-outlined-text-field-container-shape) + 4px))}}[dir=rtl] .mdc-text-field--outlined.mdc-text-field--with-trailing-icon,.mdc-text-field--outlined.mdc-text-field--with-trailing-icon[dir=rtl]{padding-left:0}@supports(top: max(0%)){[dir=rtl] .mdc-text-field--outlined.mdc-text-field--with-trailing-icon,.mdc-text-field--outlined.mdc-text-field--with-trailing-icon[dir=rtl]{padding-right:max(16px,calc(var(--mdc-outlined-text-field-container-shape) + 4px))}}.mdc-text-field--outlined.mdc-text-field--with-leading-icon.mdc-text-field--with-trailing-icon{padding-left:0;padding-right:0}.mdc-text-field--outlined:not(.mdc-text-field--disabled) .mdc-notched-outline__leading,.mdc-text-field--outlined:not(.mdc-text-field--disabled) .mdc-notched-outline__notch,.mdc-text-field--outlined:not(.mdc-text-field--disabled) .mdc-notched-outline__trailing{border-color:var(--mdc-outlined-text-field-outline-color)}.mdc-text-field--outlined:not(.mdc-text-field--disabled):not(.mdc-text-field--focused):hover .mdc-notched-outline .mdc-notched-outline__leading,.mdc-text-field--outlined:not(.mdc-text-field--disabled):not(.mdc-text-field--focused):hover .mdc-notched-outline .mdc-notched-outline__notch,.mdc-text-field--outlined:not(.mdc-text-field--disabled):not(.mdc-text-field--focused):hover .mdc-notched-outline .mdc-notched-outline__trailing{border-color:var(--mdc-outlined-text-field-hover-outline-color)}.mdc-text-field--outlined:not(.mdc-text-field--disabled).mdc-text-field--focused .mdc-notched-outline__leading,.mdc-text-field--outlined:not(.mdc-text-field--disabled).mdc-text-field--focused .mdc-notched-outline__notch,.mdc-text-field--outlined:not(.mdc-text-field--disabled).mdc-text-field--focused .mdc-notched-outline__trailing{border-color:var(--mdc-outlined-text-field-focus-outline-color)}.mdc-text-field--outlined.mdc-text-field--disabled .mdc-notched-outline__leading,.mdc-text-field--outlined.mdc-text-field--disabled .mdc-notched-outline__notch,.mdc-text-field--outlined.mdc-text-field--disabled .mdc-notched-outline__trailing{border-color:var(--mdc-outlined-text-field-disabled-outline-color)}.mdc-text-field--outlined.mdc-text-field--invalid:not(.mdc-text-field--disabled) .mdc-notched-outline__leading,.mdc-text-field--outlined.mdc-text-field--invalid:not(.mdc-text-field--disabled) .mdc-notched-outline__notch,.mdc-text-field--outlined.mdc-text-field--invalid:not(.mdc-text-field--disabled) .mdc-notched-outline__trailing{border-color:var(--mdc-outlined-text-field-error-outline-color)}.mdc-text-field--outlined.mdc-text-field--invalid:not(.mdc-text-field--disabled):not(.mdc-text-field--focused):hover .mdc-notched-outline .mdc-notched-outline__leading,.mdc-text-field--outlined.mdc-text-field--invalid:not(.mdc-text-field--disabled):not(.mdc-text-field--focused):hover .mdc-notched-outline .mdc-notched-outline__notch,.mdc-text-field--outlined.mdc-text-field--invalid:not(.mdc-text-field--disabled):not(.mdc-text-field--focused):hover .mdc-notched-outline .mdc-notched-outline__trailing{border-color:var(--mdc-outlined-text-field-error-hover-outline-color)}.mdc-text-field--outlined.mdc-text-field--invalid:not(.mdc-text-field--disabled).mdc-text-field--focused .mdc-notched-outline__leading,.mdc-text-field--outlined.mdc-text-field--invalid:not(.mdc-text-field--disabled).mdc-text-field--focused .mdc-notched-outline__notch,.mdc-text-field--outlined.mdc-text-field--invalid:not(.mdc-text-field--disabled).mdc-text-field--focused .mdc-notched-outline__trailing{border-color:var(--mdc-outlined-text-field-error-focus-outline-color)}.mdc-text-field--outlined:not(.mdc-text-field--disabled) .mdc-notched-outline .mdc-notched-outline__leading,.mdc-text-field--outlined:not(.mdc-text-field--disabled) .mdc-notched-outline .mdc-notched-outline__notch,.mdc-text-field--outlined:not(.mdc-text-field--disabled) .mdc-notched-outline .mdc-notched-outline__trailing{border-width:var(--mdc-outlined-text-field-outline-width)}.mdc-text-field--outlined:not(.mdc-text-field--disabled).mdc-text-field--focused .mdc-notched-outline .mdc-notched-outline__leading,.mdc-text-field--outlined:not(.mdc-text-field--disabled).mdc-text-field--focused .mdc-notched-outline .mdc-notched-outline__notch,.mdc-text-field--outlined:not(.mdc-text-field--disabled).mdc-text-field--focused .mdc-notched-outline .mdc-notched-outline__trailing{border-width:var(--mdc-outlined-text-field-focus-outline-width)}.mat-mdc-form-field-textarea-control{vertical-align:middle;resize:vertical;box-sizing:border-box;height:auto;margin:0;padding:0;border:none;overflow:auto}.mat-mdc-form-field-input-control.mat-mdc-form-field-input-control{-moz-osx-font-smoothing:grayscale;-webkit-font-smoothing:antialiased;font:inherit;letter-spacing:inherit;text-decoration:inherit;text-transform:inherit;border:none}.mat-mdc-form-field .mat-mdc-floating-label.mdc-floating-label{-moz-osx-font-smoothing:grayscale;-webkit-font-smoothing:antialiased;line-height:normal;pointer-events:all;will-change:auto}.mat-mdc-form-field:not(.mat-form-field-disabled) .mat-mdc-floating-label.mdc-floating-label{cursor:inherit}.mdc-text-field--no-label:not(.mdc-text-field--textarea) .mat-mdc-form-field-input-control.mdc-text-field__input,.mat-mdc-text-field-wrapper .mat-mdc-form-field-input-control{height:auto}.mat-mdc-text-field-wrapper .mat-mdc-form-field-input-control.mdc-text-field__input[type=color]{height:23px}.mat-mdc-text-field-wrapper{height:auto;flex:auto;will-change:auto}.mat-mdc-form-field-has-icon-prefix .mat-mdc-text-field-wrapper{padding-left:0;--mat-mdc-form-field-label-offset-x: -16px}.mat-mdc-form-field-has-icon-suffix .mat-mdc-text-field-wrapper{padding-right:0}[dir=rtl] .mat-mdc-text-field-wrapper{padding-left:16px;padding-right:16px}[dir=rtl] .mat-mdc-form-field-has-icon-suffix .mat-mdc-text-field-wrapper{padding-left:0}[dir=rtl] .mat-mdc-form-field-has-icon-prefix .mat-mdc-text-field-wrapper{padding-right:0}.mat-form-field-disabled .mdc-text-field__input::placeholder{color:var(--mat-form-field-disabled-input-text-placeholder-color)}.mat-form-field-disabled .mdc-text-field__input::-moz-placeholder{color:var(--mat-form-field-disabled-input-text-placeholder-color)}.mat-form-field-disabled .mdc-text-field__input::-webkit-input-placeholder{color:var(--mat-form-field-disabled-input-text-placeholder-color)}.mat-form-field-disabled .mdc-text-field__input:-ms-input-placeholder{color:var(--mat-form-field-disabled-input-text-placeholder-color)}.mat-mdc-form-field-label-always-float .mdc-text-field__input::placeholder{transition-delay:40ms;transition-duration:110ms;opacity:1}.mat-mdc-text-field-wrapper .mat-mdc-form-field-infix .mat-mdc-floating-label{left:auto;right:auto}.mat-mdc-text-field-wrapper.mdc-text-field--outlined .mdc-text-field__input{display:inline-block}.mat-mdc-form-field .mat-mdc-text-field-wrapper.mdc-text-field .mdc-notched-outline__notch{padding-top:0}.mat-mdc-text-field-wrapper::before{content:none}.mat-mdc-form-field.mat-mdc-form-field.mat-mdc-form-field.mat-mdc-form-field.mat-mdc-form-field.mat-mdc-form-field .mdc-notched-outline__notch{border-left:1px solid rgba(0,0,0,0)}[dir=rtl] .mat-mdc-form-field.mat-mdc-form-field.mat-mdc-form-field.mat-mdc-form-field.mat-mdc-form-field.mat-mdc-form-field .mdc-notched-outline__notch{border-left:none;border-right:1px solid rgba(0,0,0,0)}.mat-mdc-form-field-infix{min-height:var(--mat-form-field-container-height);padding-top:var(--mat-form-field-filled-with-label-container-padding-top);padding-bottom:var(--mat-form-field-filled-with-label-container-padding-bottom)}.mdc-text-field--outlined .mat-mdc-form-field-infix,.mdc-text-field--no-label .mat-mdc-form-field-infix{padding-top:var(--mat-form-field-container-vertical-padding);padding-bottom:var(--mat-form-field-container-vertical-padding)}.mat-mdc-text-field-wrapper .mat-mdc-form-field-flex .mat-mdc-floating-label{top:calc(var(--mat-form-field-container-height)/2)}.mdc-text-field--filled .mat-mdc-floating-label{display:var(--mat-form-field-filled-label-display, block)}.mat-mdc-text-field-wrapper.mdc-text-field--outlined .mdc-notched-outline--upgraded .mdc-floating-label--float-above{--mat-mdc-form-field-label-transform: translateY(calc(calc(6.75px + var(--mat-form-field-container-height) / 2) * -1)) scale(var(--mat-mdc-form-field-floating-label-scale, 0.75));transform:var(--mat-mdc-form-field-label-transform)}.mat-mdc-form-field-subscript-wrapper{box-sizing:border-box;width:100%;position:relative}.mat-mdc-form-field-hint-wrapper,.mat-mdc-form-field-error-wrapper{position:absolute;top:0;left:0;right:0;padding:0 16px}.mat-mdc-form-field-subscript-dynamic-size .mat-mdc-form-field-hint-wrapper,.mat-mdc-form-field-subscript-dynamic-size .mat-mdc-form-field-error-wrapper{position:static}.mat-mdc-form-field-bottom-align::before{content:"";display:inline-block;height:16px}.mat-mdc-form-field-bottom-align.mat-mdc-form-field-subscript-dynamic-size::before{content:unset}.mat-mdc-form-field-hint-end{order:1}.mat-mdc-form-field-hint-wrapper{display:flex}.mat-mdc-form-field-hint-spacer{flex:1 0 1em}.mat-mdc-form-field-error{display:block;color:var(--mat-form-field-error-text-color)}.mat-mdc-form-field-subscript-wrapper,.mat-mdc-form-field-bottom-align::before{-moz-osx-font-smoothing:grayscale;-webkit-font-smoothing:antialiased;font-family:var(--mat-form-field-subscript-text-font);line-height:var(--mat-form-field-subscript-text-line-height);font-size:var(--mat-form-field-subscript-text-size);letter-spacing:var(--mat-form-field-subscript-text-tracking);font-weight:var(--mat-form-field-subscript-text-weight)}.mat-mdc-form-field-focus-overlay{top:0;left:0;right:0;bottom:0;position:absolute;opacity:0;pointer-events:none;background-color:var(--mat-form-field-state-layer-color)}.mat-mdc-text-field-wrapper:hover .mat-mdc-form-field-focus-overlay{opacity:var(--mat-form-field-hover-state-layer-opacity)}.mat-mdc-form-field.mat-focused .mat-mdc-form-field-focus-overlay{opacity:var(--mat-form-field-focus-state-layer-opacity)}select.mat-mdc-form-field-input-control{-moz-appearance:none;-webkit-appearance:none;background-color:rgba(0,0,0,0);display:inline-flex;box-sizing:border-box}select.mat-mdc-form-field-input-control:not(:disabled){cursor:pointer}select.mat-mdc-form-field-input-control:not(.mat-mdc-native-select-inline) option{color:var(--mat-form-field-select-option-text-color)}select.mat-mdc-form-field-input-control:not(.mat-mdc-native-select-inline) option:disabled{color:var(--mat-form-field-select-disabled-option-text-color)}.mat-mdc-form-field-type-mat-native-select .mat-mdc-form-field-infix::after{content:"";width:0;height:0;border-left:5px solid rgba(0,0,0,0);border-right:5px solid rgba(0,0,0,0);border-top:5px solid;position:absolute;right:0;top:50%;margin-top:-2.5px;pointer-events:none;color:var(--mat-form-field-enabled-select-arrow-color)}[dir=rtl] .mat-mdc-form-field-type-mat-native-select .mat-mdc-form-field-infix::after{right:auto;left:0}.mat-mdc-form-field-type-mat-native-select.mat-focused .mat-mdc-form-field-infix::after{color:var(--mat-form-field-focus-select-arrow-color)}.mat-mdc-form-field-type-mat-native-select.mat-form-field-disabled .mat-mdc-form-field-infix::after{color:var(--mat-form-field-disabled-select-arrow-color)}.mat-mdc-form-field-type-mat-native-select .mat-mdc-form-field-input-control{padding-right:15px}[dir=rtl] .mat-mdc-form-field-type-mat-native-select .mat-mdc-form-field-input-control{padding-right:0;padding-left:15px}.cdk-high-contrast-active .mat-form-field-appearance-fill .mat-mdc-text-field-wrapper{outline:solid 1px}.cdk-high-contrast-active .mat-form-field-appearance-fill.mat-form-field-disabled .mat-mdc-text-field-wrapper{outline-color:GrayText}.cdk-high-contrast-active .mat-form-field-appearance-fill.mat-focused .mat-mdc-text-field-wrapper{outline:dashed 3px}.cdk-high-contrast-active .mat-mdc-form-field.mat-focused .mdc-notched-outline{border:dashed 3px}.mat-mdc-form-field-input-control[type=date],.mat-mdc-form-field-input-control[type=datetime],.mat-mdc-form-field-input-control[type=datetime-local],.mat-mdc-form-field-input-control[type=month],.mat-mdc-form-field-input-control[type=week],.mat-mdc-form-field-input-control[type=time]{line-height:1}.mat-mdc-form-field-input-control::-webkit-datetime-edit{line-height:1;padding:0;margin-bottom:-2px}.mat-mdc-form-field{--mat-mdc-form-field-floating-label-scale: 0.75;display:inline-flex;flex-direction:column;min-width:0;text-align:left;-moz-osx-font-smoothing:grayscale;-webkit-font-smoothing:antialiased;font-family:var(--mat-form-field-container-text-font);line-height:var(--mat-form-field-container-text-line-height);font-size:var(--mat-form-field-container-text-size);letter-spacing:var(--mat-form-field-container-text-tracking);font-weight:var(--mat-form-field-container-text-weight)}[dir=rtl] .mat-mdc-form-field{text-align:right}.mat-mdc-form-field .mdc-text-field--outlined .mdc-floating-label--float-above{font-size:calc(var(--mat-form-field-outlined-label-text-populated-size)*var(--mat-mdc-form-field-floating-label-scale))}.mat-mdc-form-field .mdc-text-field--outlined .mdc-notched-outline--upgraded .mdc-floating-label--float-above{font-size:var(--mat-form-field-outlined-label-text-populated-size)}.mat-mdc-form-field-flex{display:inline-flex;align-items:baseline;box-sizing:border-box;width:100%}.mat-mdc-text-field-wrapper{width:100%;z-index:0}.mat-mdc-form-field-icon-prefix,.mat-mdc-form-field-icon-suffix{align-self:center;line-height:0;pointer-events:auto;position:relative;z-index:1}.mat-mdc-form-field-icon-prefix>.mat-icon,.mat-mdc-form-field-icon-suffix>.mat-icon{padding:0 12px;box-sizing:content-box}.mat-mdc-form-field-icon-prefix{color:var(--mat-form-field-leading-icon-color)}.mat-form-field-disabled .mat-mdc-form-field-icon-prefix{color:var(--mat-form-field-disabled-leading-icon-color)}.mat-mdc-form-field-icon-suffix{color:var(--mat-form-field-trailing-icon-color)}.mat-form-field-disabled .mat-mdc-form-field-icon-suffix{color:var(--mat-form-field-disabled-trailing-icon-color)}.mat-form-field-invalid .mat-mdc-form-field-icon-suffix{color:var(--mat-form-field-error-trailing-icon-color)}.mat-form-field-invalid:not(.mat-focused):not(.mat-form-field-disabled) .mat-mdc-text-field-wrapper:hover .mat-mdc-form-field-icon-suffix{color:var(--mat-form-field-error-hover-trailing-icon-color)}.mat-form-field-invalid.mat-focused .mat-mdc-text-field-wrapper .mat-mdc-form-field-icon-suffix{color:var(--mat-form-field-error-focus-trailing-icon-color)}.mat-mdc-form-field-icon-prefix,[dir=rtl] .mat-mdc-form-field-icon-suffix{padding:0 4px 0 0}.mat-mdc-form-field-icon-suffix,[dir=rtl] .mat-mdc-form-field-icon-prefix{padding:0 0 0 4px}.mat-mdc-form-field-subscript-wrapper .mat-icon,.mat-mdc-form-field label .mat-icon{width:1em;height:1em;font-size:inherit}.mat-mdc-form-field-infix{flex:auto;min-width:0;width:180px;position:relative;box-sizing:border-box}.mat-mdc-form-field .mdc-notched-outline__notch{margin-left:-1px;-webkit-clip-path:inset(-9em -999em -9em 1px);clip-path:inset(-9em -999em -9em 1px)}[dir=rtl] .mat-mdc-form-field .mdc-notched-outline__notch{margin-left:0;margin-right:-1px;-webkit-clip-path:inset(-9em 1px -9em -999em);clip-path:inset(-9em 1px -9em -999em)}.mat-mdc-form-field:not(.mat-form-field-no-animations) .mdc-text-field__input{transition:opacity 150ms 0ms cubic-bezier(0.4, 0, 0.2, 1)}@media all{.mat-mdc-form-field:not(.mat-form-field-no-animations) .mdc-text-field__input::placeholder{transition:opacity 67ms 0ms cubic-bezier(0.4, 0, 0.2, 1)}}@media all{.mat-mdc-form-field:not(.mat-form-field-no-animations) .mdc-text-field__input:-ms-input-placeholder{transition:opacity 67ms 0ms cubic-bezier(0.4, 0, 0.2, 1)}}@media all{.mdc-text-field--no-label .mat-mdc-form-field:not(.mat-form-field-no-animations) .mdc-text-field__input::placeholder,.mdc-text-field--focused .mat-mdc-form-field:not(.mat-form-field-no-animations) .mdc-text-field__input::placeholder{transition-delay:40ms;transition-duration:110ms}}@media all{.mdc-text-field--no-label .mat-mdc-form-field:not(.mat-form-field-no-animations) .mdc-text-field__input:-ms-input-placeholder,.mdc-text-field--focused .mat-mdc-form-field:not(.mat-form-field-no-animations) .mdc-text-field__input:-ms-input-placeholder{transition-delay:40ms;transition-duration:110ms}}.mat-mdc-form-field:not(.mat-form-field-no-animations) .mdc-text-field__affix{transition:opacity 150ms 0ms cubic-bezier(0.4, 0, 0.2, 1)}.mat-mdc-form-field:not(.mat-form-field-no-animations) .mdc-text-field--filled.mdc-ripple-upgraded--background-focused .mdc-text-field__ripple::before,.mat-mdc-form-field:not(.mat-form-field-no-animations) .mdc-text-field--filled:not(.mdc-ripple-upgraded):focus .mdc-text-field__ripple::before{transition-duration:75ms}.mat-mdc-form-field:not(.mat-form-field-no-animations) .mdc-text-field--outlined .mdc-floating-label--shake{animation:mdc-floating-label-shake-float-above-text-field-outlined 250ms 1}@keyframes mdc-floating-label-shake-float-above-text-field-outlined{0%{transform:translateX(calc(0% - 0%)) translateY(calc(0% - 34.75px)) scale(0.75)}33%{animation-timing-function:cubic-bezier(0.5, 0, 0.701732, 0.495819);transform:translateX(calc(4% - 0%)) translateY(calc(0% - 34.75px)) scale(0.75)}66%{animation-timing-function:cubic-bezier(0.302435, 0.381352, 0.55, 0.956352);transform:translateX(calc(-4% - 0%)) translateY(calc(0% - 34.75px)) scale(0.75)}100%{transform:translateX(calc(0% - 0%)) translateY(calc(0% - 34.75px)) scale(0.75)}}.mat-mdc-form-field:not(.mat-form-field-no-animations) .mdc-text-field--textarea{transition:none}.mat-mdc-form-field:not(.mat-form-field-no-animations) .mdc-text-field--textarea.mdc-text-field--filled .mdc-floating-label--shake{animation:mdc-floating-label-shake-float-above-textarea-filled 250ms 1}@keyframes mdc-floating-label-shake-float-above-textarea-filled{0%{transform:translateX(calc(0% - 0%)) translateY(calc(0% - 10.25px)) scale(0.75)}33%{animation-timing-function:cubic-bezier(0.5, 0, 0.701732, 0.495819);transform:translateX(calc(4% - 0%)) translateY(calc(0% - 10.25px)) scale(0.75)}66%{animation-timing-function:cubic-bezier(0.302435, 0.381352, 0.55, 0.956352);transform:translateX(calc(-4% - 0%)) translateY(calc(0% - 10.25px)) scale(0.75)}100%{transform:translateX(calc(0% - 0%)) translateY(calc(0% - 10.25px)) scale(0.75)}}.mat-mdc-form-field:not(.mat-form-field-no-animations) .mdc-text-field--textarea.mdc-text-field--outlined .mdc-floating-label--shake{animation:mdc-floating-label-shake-float-above-textarea-outlined 250ms 1}@keyframes mdc-floating-label-shake-float-above-textarea-outlined{0%{transform:translateX(calc(0% - 0%)) translateY(calc(0% - 24.75px)) scale(0.75)}33%{animation-timing-function:cubic-bezier(0.5, 0, 0.701732, 0.495819);transform:translateX(calc(4% - 0%)) translateY(calc(0% - 24.75px)) scale(0.75)}66%{animation-timing-function:cubic-bezier(0.302435, 0.381352, 0.55, 0.956352);transform:translateX(calc(-4% - 0%)) translateY(calc(0% - 24.75px)) scale(0.75)}100%{transform:translateX(calc(0% - 0%)) translateY(calc(0% - 24.75px)) scale(0.75)}}.mat-mdc-form-field:not(.mat-form-field-no-animations) .mdc-text-field--with-leading-icon.mdc-text-field--outlined .mdc-floating-label--shake{animation:mdc-floating-label-shake-float-above-text-field-outlined-leading-icon 250ms 1}@keyframes mdc-floating-label-shake-float-above-text-field-outlined-leading-icon{0%{transform:translateX(calc(0% - 32px)) translateY(calc(0% - 34.75px)) scale(0.75)}33%{animation-timing-function:cubic-bezier(0.5, 0, 0.701732, 0.495819);transform:translateX(calc(4% - 32px)) translateY(calc(0% - 34.75px)) scale(0.75)}66%{animation-timing-function:cubic-bezier(0.302435, 0.381352, 0.55, 0.956352);transform:translateX(calc(-4% - 32px)) translateY(calc(0% - 34.75px)) scale(0.75)}100%{transform:translateX(calc(0% - 32px)) translateY(calc(0% - 34.75px)) scale(0.75)}}[dir=rtl] .mat-mdc-form-field:not(.mat-form-field-no-animations) .mdc-text-field--with-leading-icon.mdc-text-field--outlined .mdc-floating-label--shake,.mat-mdc-form-field:not(.mat-form-field-no-animations) .mdc-text-field--with-leading-icon.mdc-text-field--outlined[dir=rtl] .mdc-floating-label--shake{animation:mdc-floating-label-shake-float-above-text-field-outlined-leading-icon 250ms 1}@keyframes mdc-floating-label-shake-float-above-text-field-outlined-leading-icon-rtl{0%{transform:translateX(calc(0% - -32px)) translateY(calc(0% - 34.75px)) scale(0.75)}33%{animation-timing-function:cubic-bezier(0.5, 0, 0.701732, 0.495819);transform:translateX(calc(4% - -32px)) translateY(calc(0% - 34.75px)) scale(0.75)}66%{animation-timing-function:cubic-bezier(0.302435, 0.381352, 0.55, 0.956352);transform:translateX(calc(-4% - -32px)) translateY(calc(0% - 34.75px)) scale(0.75)}100%{transform:translateX(calc(0% - -32px)) translateY(calc(0% - 34.75px)) scale(0.75)}}.mat-mdc-form-field:not(.mat-form-field-no-animations) .mdc-floating-label{transition:transform 150ms cubic-bezier(0.4, 0, 0.2, 1),color 150ms cubic-bezier(0.4, 0, 0.2, 1)}.mdc-floating-label--shake{animation:mdc-floating-label-shake-float-above-standard 250ms 1}@keyframes mdc-floating-label-shake-float-above-standard{0%{transform:translateX(calc(0% - 0%)) translateY(calc(0% - 106%)) scale(0.75)}33%{animation-timing-function:cubic-bezier(0.5, 0, 0.701732, 0.495819);transform:translateX(calc(4% - 0%)) translateY(calc(0% - 106%)) scale(0.75)}66%{animation-timing-function:cubic-bezier(0.302435, 0.381352, 0.55, 0.956352);transform:translateX(calc(-4% - 0%)) translateY(calc(0% - 106%)) scale(0.75)}100%{transform:translateX(calc(0% - 0%)) translateY(calc(0% - 106%)) scale(0.75)}}.mat-mdc-form-field:not(.mat-form-field-no-animations) .mdc-line-ripple::after{transition:transform 180ms cubic-bezier(0.4, 0, 0.2, 1),opacity 180ms cubic-bezier(0.4, 0, 0.2, 1)}.mdc-notched-outline .mdc-floating-label{max-width:calc(100% + 1px)}.mdc-notched-outline--upgraded .mdc-floating-label--float-above{max-width:calc(133.3333333333% + 1px)}'],
      encapsulation: 2,
      data: {animation: [gs.transitionMessages]},
      changeDetection: 0
    });
    let n = t;
    return n
  })(), ce = (() => {
    let t = class t {
    };
    t.\u0275fac = function (i) {
      return new (i || t)
    }, t.\u0275mod = S({type: t}), t.\u0275inj = M({imports: [J, En, Nn, J]});
    let n = t;
    return n
  })();
var Po = vt({passive: !0}), To = (() => {
  let t = class t {
    constructor(e, i) {
      this._platform = e, this._ngZone = i, this._monitoredElements = new Map
    }

    monitor(e) {
      if (!this._platform.isBrowser) return en;
      let i = it(e), o = this._monitoredElements.get(i);
      if (o) return o.subject;
      let a = new C, s = "cdk-text-field-autofilled", d = f => {
        f.animationName === "cdk-text-field-autofill-start" && !i.classList.contains(s) ? (i.classList.add(s), this._ngZone.run(() => a.next({
          target: f.target,
          isAutofilled: !0
        }))) : f.animationName === "cdk-text-field-autofill-end" && i.classList.contains(s) && (i.classList.remove(s), this._ngZone.run(() => a.next({
          target: f.target,
          isAutofilled: !1
        })))
      };
      return this._ngZone.runOutsideAngular(() => {
        i.addEventListener("animationstart", d, Po), i.classList.add("cdk-text-field-autofill-monitored")
      }), this._monitoredElements.set(i, {
        subject: a, unlisten: () => {
          i.removeEventListener("animationstart", d, Po)
        }
      }), a
    }

    stopMonitoring(e) {
      let i = it(e), o = this._monitoredElements.get(i);
      o && (o.unlisten(), o.subject.complete(), i.classList.remove("cdk-text-field-autofill-monitored"), i.classList.remove("cdk-text-field-autofilled"), this._monitoredElements.delete(i))
    }

    ngOnDestroy() {
      this._monitoredElements.forEach((e, i) => this.stopMonitoring(i))
    }
  };
  t.\u0275fac = function (i) {
    return new (i || t)(c(A), c(v))
  }, t.\u0275prov = b({token: t, factory: t.\u0275fac, providedIn: "root"});
  let n = t;
  return n
})();
var No = (() => {
  let t = class t {
  };
  t.\u0275fac = function (i) {
    return new (i || t)
  }, t.\u0275mod = S({type: t}), t.\u0275inj = M({});
  let n = t;
  return n
})();
var Yo = (() => {
  let t = class t {
    constructor(e, i) {
      this._renderer = e, this._elementRef = i, this.onChange = o => {
      }, this.onTouched = () => {
      }
    }

    setProperty(e, i) {
      this._renderer.setProperty(this._elementRef.nativeElement, e, i)
    }

    registerOnTouched(e) {
      this.onTouched = e
    }

    registerOnChange(e) {
      this.onChange = e
    }

    setDisabledState(e) {
      this.setProperty("disabled", e)
    }
  };
  t.\u0275fac = function (i) {
    return new (i || t)(l(ti), l(k))
  }, t.\u0275dir = g({type: t});
  let n = t;
  return n
})(), qo = (() => {
  let t = class t extends Yo {
  };
  t.\u0275fac = (() => {
    let e;
    return function (o) {
      return (e || (e = Et(t)))(o || t)
    }
  })(), t.\u0275dir = g({type: t, features: [q]});
  let n = t;
  return n
})(), Vi = new w("");
var Cs = {provide: Vi, useExisting: ft(() => Ye), multi: !0};

function Es() {
  let n = oi() ? oi().getUserAgent() : "";
  return /android (\d+)/.test(n.toLowerCase())
}

var Ds = new w(""), Ye = (() => {
  let t = class t extends Yo {
    constructor(e, i, o) {
      super(e, i), this._compositionMode = o, this._composing = !1, this._compositionMode == null && (this._compositionMode = !Es())
    }

    writeValue(e) {
      let i = e ?? "";
      this.setProperty("value", i)
    }

    _handleInput(e) {
      (!this._compositionMode || this._compositionMode && !this._composing) && this.onChange(e)
    }

    _compositionStart() {
      this._composing = !0
    }

    _compositionEnd(e) {
      this._composing = !1, this._compositionMode && this.onChange(e)
    }
  };
  t.\u0275fac = function (i) {
    return new (i || t)(l(ti), l(k), l(Ds, 8))
  }, t.\u0275dir = g({
    type: t,
    selectors: [["input", "formControlName", "", 3, "type", "checkbox"], ["textarea", "formControlName", ""], ["input", "formControl", "", 3, "type", "checkbox"], ["textarea", "formControl", ""], ["input", "ngModel", "", 3, "type", "checkbox"], ["textarea", "ngModel", ""], ["", "ngDefaultControl", ""]],
    hostBindings: function (i, o) {
      i & 1 && R("input", function (s) {
        return o._handleInput(s.target.value)
      })("blur", function () {
        return o.onTouched()
      })("compositionstart", function () {
        return o._compositionStart()
      })("compositionend", function (s) {
        return o._compositionEnd(s.target.value)
      })
    },
    features: [X([Cs]), q]
  });
  let n = t;
  return n
})();

function xt(n) {
  return n == null || (typeof n == "string" || Array.isArray(n)) && n.length === 0
}

function Wo(n) {
  return n != null && typeof n.length == "number"
}

var Zt = new w(""), ji = new w(""),
  ks = /^(?=.{1,254}$)(?=.{1,64}@)[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,
  bt = class {
    static min(t) {
      return Go(t)
    }

    static max(t) {
      return $o(t)
    }

    static required(t) {
      return Xo(t)
    }

    static requiredTrue(t) {
      return Is(t)
    }

    static email(t) {
      return Ms(t)
    }

    static minLength(t) {
      return Ss(t)
    }

    static maxLength(t) {
      return As(t)
    }

    static pattern(t) {
      return Os(t)
    }

    static nullValidator(t) {
      return je(t)
    }

    static compose(t) {
      return er(t)
    }

    static composeAsync(t) {
      return ir(t)
    }
  };

function Go(n) {
  return t => {
    if (xt(t.value) || xt(n)) return null;
    let r = parseFloat(t.value);
    return !isNaN(r) && r < n ? {min: {min: n, actual: t.value}} : null
  }
}

function $o(n) {
  return t => {
    if (xt(t.value) || xt(n)) return null;
    let r = parseFloat(t.value);
    return !isNaN(r) && r > n ? {max: {max: n, actual: t.value}} : null
  }
}

function Xo(n) {
  return xt(n.value) ? {required: !0} : null
}

function Is(n) {
  return n.value === !0 ? null : {required: !0}
}

function Ms(n) {
  return xt(n.value) || ks.test(n.value) ? null : {email: !0}
}

function Ss(n) {
  return t => xt(t.value) || !Wo(t.value) ? null : t.value.length < n ? {
    minlength: {
      requiredLength: n,
      actualLength: t.value.length
    }
  } : null
}

function As(n) {
  return t => Wo(t.value) && t.value.length > n ? {maxlength: {requiredLength: n, actualLength: t.value.length}} : null
}

function Os(n) {
  if (!n) return je;
  let t, r;
  return typeof n == "string" ? (r = "", n.charAt(0) !== "^" && (r += "^"), r += n, n.charAt(n.length - 1) !== "$" && (r += "$"), t = new RegExp(r)) : (r = n.toString(), t = n), e => {
    if (xt(e.value)) return null;
    let i = e.value;
    return t.test(i) ? null : {pattern: {requiredPattern: r, actualValue: i}}
  }
}

function je(n) {
  return null
}

function Zo(n) {
  return n != null
}

function Ko(n) {
  return vn(n) ? nn(n) : n
}

function Qo(n) {
  let t = {};
  return n.forEach(r => {
    t = r != null ? y(y({}, t), r) : t
  }), Object.keys(t).length === 0 ? null : t
}

function Jo(n, t) {
  return t.map(r => r(n))
}

function Fs(n) {
  return !n.validate
}

function tr(n) {
  return n.map(t => Fs(t) ? t : r => t.validate(r))
}

function er(n) {
  if (!n) return null;
  let t = n.filter(Zo);
  return t.length == 0 ? null : function (r) {
    return Qo(Jo(r, t))
  }
}

function Li(n) {
  return n != null ? er(tr(n)) : null
}

function ir(n) {
  if (!n) return null;
  let t = n.filter(Zo);
  return t.length == 0 ? null : function (r) {
    let e = Jo(r, t).map(Ko);
    return an(e).pipe(Nt(Qo))
  }
}

function Bi(n) {
  return n != null ? ir(tr(n)) : null
}

function Vo(n, t) {
  return n === null ? [t] : Array.isArray(n) ? [...n, t] : [n, t]
}

function nr(n) {
  return n._rawValidators
}

function or(n) {
  return n._rawAsyncValidators
}

function Ri(n) {
  return n ? Array.isArray(n) ? n : [n] : []
}

function Le(n, t) {
  return Array.isArray(n) ? n.includes(t) : n === t
}

function jo(n, t) {
  let r = Ri(t);
  return Ri(n).forEach(i => {
    Le(r, i) || r.push(i)
  }), r
}

function Lo(n, t) {
  return Ri(t).filter(r => !Le(n, r))
}

var Be = class {
  constructor() {
    this._rawValidators = [], this._rawAsyncValidators = [], this._onDestroyCallbacks = []
  }

  get value() {
    return this.control ? this.control.value : null
  }

  get valid() {
    return this.control ? this.control.valid : null
  }

  get invalid() {
    return this.control ? this.control.invalid : null
  }

  get pending() {
    return this.control ? this.control.pending : null
  }

  get disabled() {
    return this.control ? this.control.disabled : null
  }

  get enabled() {
    return this.control ? this.control.enabled : null
  }

  get errors() {
    return this.control ? this.control.errors : null
  }

  get pristine() {
    return this.control ? this.control.pristine : null
  }

  get dirty() {
    return this.control ? this.control.dirty : null
  }

  get touched() {
    return this.control ? this.control.touched : null
  }

  get status() {
    return this.control ? this.control.status : null
  }

  get untouched() {
    return this.control ? this.control.untouched : null
  }

  get statusChanges() {
    return this.control ? this.control.statusChanges : null
  }

  get valueChanges() {
    return this.control ? this.control.valueChanges : null
  }

  get path() {
    return null
  }


  get validator() {
    return this._composedValidatorFn || null
  }

  get asyncValidator() {
    return this._composedAsyncValidatorFn || null
  }

  _setValidators(t) {
    this._rawValidators = t || [], this._composedValidatorFn = Li(this._rawValidators)
  }

  _setAsyncValidators(t) {
    this._rawAsyncValidators = t || [], this._composedAsyncValidatorFn = Bi(this._rawAsyncValidators)
  }

  _registerOnDestroy(t) {
    this._onDestroyCallbacks.push(t)
  }

  _invokeOnDestroyCallbacks() {
    this._onDestroyCallbacks.forEach(t => t()), this._onDestroyCallbacks = []
  }

  reset(t = void 0) {
    this.control && this.control.reset(t)
  }

  hasError(t, r) {
    return this.control ? this.control.hasError(t, r) : !1
  }

  getError(t, r) {
    return this.control ? this.control.getError(t, r) : null
  }
}, yt = class extends Be {
  get formDirective() {
    return null
  }

  get path() {
    return null
  }
}, Pt = class extends Be {
  constructor() {
    super(...arguments), this._parent = null, this.name = null, this.valueAccessor = null
  }
}, ze = class {
  constructor(t) {
    this._cd = t
  }

  get isTouched() {
    return !!this._cd?.control?.touched
  }

  get isUntouched() {
    return !!this._cd?.control?.untouched
  }

  get isPristine() {
    return !!this._cd?.control?.pristine
  }

  get isDirty() {
    return !!this._cd?.control?.dirty
  }

  get isValid() {
    return !!this._cd?.control?.valid
  }

  get isInvalid() {
    return !!this._cd?.control?.invalid
  }

  get isPending() {
    return !!this._cd?.control?.pending
  }

  get isSubmitted() {
    return !!this._cd?.submitted
  }
}, Rs = {
  "[class.ng-untouched]": "isUntouched",
  "[class.ng-touched]": "isTouched",
  "[class.ng-pristine]": "isPristine",
  "[class.ng-dirty]": "isDirty",
  "[class.ng-valid]": "isValid",
  "[class.ng-invalid]": "isInvalid",
  "[class.ng-pending]": "isPending"
}, jm = ct(y({}, Rs), {"[class.ng-submitted]": "isSubmitted"}), rr = (() => {
  let t = class t extends ze {
    constructor(e) {
      super(e)
    }
  };
  t.\u0275fac = function (i) {
    return new (i || t)(l(Pt, 2))
  }, t.\u0275dir = g({
    type: t,
    selectors: [["", "formControlName", ""], ["", "ngModel", ""], ["", "formControl", ""]],
    hostVars: 14,
    hostBindings: function (i, o) {
      i & 2 && W("ng-untouched", o.isUntouched)("ng-touched", o.isTouched)("ng-pristine", o.isPristine)("ng-dirty", o.isDirty)("ng-valid", o.isValid)("ng-invalid", o.isInvalid)("ng-pending", o.isPending)
    },
    features: [q]
  });
  let n = t;
  return n
})(), ar = (() => {
  let t = class t extends ze {
    constructor(e) {
      super(e)
    }
  };
  t.\u0275fac = function (i) {
    return new (i || t)(l(yt, 10))
  }, t.\u0275dir = g({
    type: t,
    selectors: [["", "formGroupName", ""], ["", "formArrayName", ""], ["", "ngModelGroup", ""], ["", "formGroup", ""], ["form", 3, "ngNoForm", ""], ["", "ngForm", ""]],
    hostVars: 16,
    hostBindings: function (i, o) {
      i & 2 && W("ng-untouched", o.isUntouched)("ng-touched", o.isTouched)("ng-pristine", o.isPristine)("ng-dirty", o.isDirty)("ng-valid", o.isValid)("ng-invalid", o.isInvalid)("ng-pending", o.isPending)("ng-submitted", o.isSubmitted)
    },
    features: [q]
  });
  let n = t;
  return n
})();
var me = "VALID", Ne = "INVALID", Gt = "PENDING", ue = "DISABLED";

function zi(n) {
  return (qe(n) ? n.validators : n) || null
}

function Ps(n) {
  return Array.isArray(n) ? Li(n) : n || null
}

function Hi(n, t) {
  return (qe(t) ? t.asyncValidators : n) || null
}

function Ts(n) {
  return Array.isArray(n) ? Bi(n) : n || null
}

function qe(n) {
  return n != null && !Array.isArray(n) && typeof n == "object"
}

function sr(n, t, r) {
  let e = n.controls;
  if (!(t ? Object.keys(e) : e).length) throw new Vt(1e3, "");
  if (!e[r]) throw new Vt(1001, "")
}

function dr(n, t, r) {
  n._forEachChild((e, i) => {
    if (r[i] === void 0) throw new Vt(1002, "")
  })
}

var $t = class {
  constructor(t, r) {
    this._pendingDirty = !1, this._hasOwnPendingAsyncValidator = !1, this._pendingTouched = !1, this._onCollectionChange = () => {
    }, this._parent = null, this.pristine = !0, this.touched = !1, this._onDisabledChange = [], this._assignValidators(t), this._assignAsyncValidators(r)
  }

  get validator() {
    return this._composedValidatorFn
  }

  set validator(t) {
    this._rawValidators = this._composedValidatorFn = t
  }

  get asyncValidator() {
    return this._composedAsyncValidatorFn
  }

  set asyncValidator(t) {
    this._rawAsyncValidators = this._composedAsyncValidatorFn = t
  }

  get parent() {
    return this._parent
  }

  get valid() {
    return this.status === me
  }

  get invalid() {
    return this.status === Ne
  }

  get pending() {
    return this.status == Gt
  }

  get disabled() {
    return this.status === ue
  }

  get enabled() {
    return this.status !== ue
  }

  get dirty() {
    return !this.pristine
  }

  get untouched() {
    return !this.touched
  }

  get updateOn() {
    return this._updateOn ? this._updateOn : this.parent ? this.parent.updateOn : "change"
  }

  get root() {
    let t = this;
    for (; t._parent;) t = t._parent;
    return t
  }

  setValidators(t) {
    this._assignValidators(t)
  }

  setAsyncValidators(t) {
    this._assignAsyncValidators(t)
  }

  addValidators(t) {
    this.setValidators(jo(t, this._rawValidators))
  }

  addAsyncValidators(t) {
    this.setAsyncValidators(jo(t, this._rawAsyncValidators))
  }

  removeValidators(t) {
    this.setValidators(Lo(t, this._rawValidators))
  }

  removeAsyncValidators(t) {
    this.setAsyncValidators(Lo(t, this._rawAsyncValidators))
  }

  hasValidator(t) {
    return Le(this._rawValidators, t)
  }

  hasAsyncValidator(t) {
    return Le(this._rawAsyncValidators, t)
  }

  clearValidators() {
    this.validator = null
  }

  clearAsyncValidators() {
    this.asyncValidator = null
  }

  markAsTouched(t = {}) {
    this.touched = !0, this._parent && !t.onlySelf && this._parent.markAsTouched(t)
  }

  markAllAsTouched() {
    this.markAsTouched({onlySelf: !0}), this._forEachChild(t => t.markAllAsTouched())
  }

  markAsUntouched(t = {}) {
    this.touched = !1, this._pendingTouched = !1, this._forEachChild(r => {
      r.markAsUntouched({onlySelf: !0})
    }), this._parent && !t.onlySelf && this._parent._updateTouched(t)
  }

  markAsDirty(t = {}) {
    this.pristine = !1, this._parent && !t.onlySelf && this._parent.markAsDirty(t)
  }

  markAsPristine(t = {}) {
    this.pristine = !0, this._pendingDirty = !1, this._forEachChild(r => {
      r.markAsPristine({onlySelf: !0})
    }), this._parent && !t.onlySelf && this._parent._updatePristine(t)
  }

  markAsPending(t = {}) {
    this.status = Gt, t.emitEvent !== !1 && this.statusChanges.emit(this.status), this._parent && !t.onlySelf && this._parent.markAsPending(t)
  }

  disable(t = {}) {
    let r = this._parentMarkedDirty(t.onlySelf);
    this.status = ue, this.errors = null, this._forEachChild(e => {
      e.disable(ct(y({}, t), {onlySelf: !0}))
    }), this._updateValue(), t.emitEvent !== !1 && (this.valueChanges.emit(this.value), this.statusChanges.emit(this.status)), this._updateAncestors(ct(y({}, t), {skipPristineCheck: r})), this._onDisabledChange.forEach(e => e(!0))
  }

  enable(t = {}) {
    let r = this._parentMarkedDirty(t.onlySelf);
    this.status = me, this._forEachChild(e => {
      e.enable(ct(y({}, t), {onlySelf: !0}))
    }), this.updateValueAndValidity({
      onlySelf: !0,
      emitEvent: t.emitEvent
    }), this._updateAncestors(ct(y({}, t), {skipPristineCheck: r})), this._onDisabledChange.forEach(e => e(!1))
  }

  _updateAncestors(t) {
    this._parent && !t.onlySelf && (this._parent.updateValueAndValidity(t), t.skipPristineCheck || this._parent._updatePristine(), this._parent._updateTouched())
  }

  setParent(t) {
    this._parent = t
  }

  getRawValue() {
    return this.value
  }

  updateValueAndValidity(t = {}) {
    this._setInitialStatus(), this._updateValue(), this.enabled && (this._cancelExistingSubscription(), this.errors = this._runValidator(), this.status = this._calculateStatus(), (this.status === me || this.status === Gt) && this._runAsyncValidator(t.emitEvent)), t.emitEvent !== !1 && (this.valueChanges.emit(this.value), this.statusChanges.emit(this.status)), this._parent && !t.onlySelf && this._parent.updateValueAndValidity(t)
  }

  _updateTreeValidity(t = {emitEvent: !0}) {
    this._forEachChild(r => r._updateTreeValidity(t)), this.updateValueAndValidity({
      onlySelf: !0,
      emitEvent: t.emitEvent
    })
  }

  _setInitialStatus() {
    this.status = this._allControlsDisabled() ? ue : me
  }

  _runValidator() {
    return this.validator ? this.validator(this) : null
  }

  _runAsyncValidator(t) {
    if (this.asyncValidator) {
      this.status = Gt, this._hasOwnPendingAsyncValidator = !0;
      let r = Ko(this.asyncValidator(this));
      this._asyncValidationSubscription = r.subscribe(e => {
        this._hasOwnPendingAsyncValidator = !1, this.setErrors(e, {emitEvent: t})
      })
    }
  }

  _cancelExistingSubscription() {
    this._asyncValidationSubscription && (this._asyncValidationSubscription.unsubscribe(), this._hasOwnPendingAsyncValidator = !1)
  }

  setErrors(t, r = {}) {
    this.errors = t, this._updateControlsErrors(r.emitEvent !== !1)
  }

  get(t) {
    let r = t;
    return r == null || (Array.isArray(r) || (r = r.split(".")), r.length === 0) ? null : r.reduce((e, i) => e && e._find(i), this)
  }

  getError(t, r) {
    let e = r ? this.get(r) : this;
    return e && e.errors ? e.errors[t] : null
  }

  hasError(t, r) {
    return !!this.getError(t, r)
  }

  _updateControlsErrors(t) {
    this.status = this._calculateStatus(), t && this.statusChanges.emit(this.status), this._parent && this._parent._updateControlsErrors(t)
  }

  _initObservables() {
    this.valueChanges = new tt, this.statusChanges = new tt
  }

  _calculateStatus() {
    return this._allControlsDisabled() ? ue : this.errors ? Ne : this._hasOwnPendingAsyncValidator || this._anyControlsHaveStatus(Gt) ? Gt : this._anyControlsHaveStatus(Ne) ? Ne : me
  }

  _anyControlsHaveStatus(t) {
    return this._anyControls(r => r.status === t)
  }

  _anyControlsDirty() {
    return this._anyControls(t => t.dirty)
  }

  _anyControlsTouched() {
    return this._anyControls(t => t.touched)
  }

  _updatePristine(t = {}) {
    this.pristine = !this._anyControlsDirty(), this._parent && !t.onlySelf && this._parent._updatePristine(t)
  }

  _updateTouched(t = {}) {
    this.touched = this._anyControlsTouched(), this._parent && !t.onlySelf && this._parent._updateTouched(t)
  }

  _registerOnCollectionChange(t) {
    this._onCollectionChange = t
  }

  _setUpdateStrategy(t) {
    qe(t) && t.updateOn != null && (this._updateOn = t.updateOn)
  }

  _parentMarkedDirty(t) {
    let r = this._parent && this._parent.dirty;
    return !t && !!r && !this._parent._anyControlsDirty()
  }

  _find(t) {
    return null
  }

  _assignValidators(t) {
    this._rawValidators = Array.isArray(t) ? t.slice() : t, this._composedValidatorFn = Ps(this._rawValidators)
  }

  _assignAsyncValidators(t) {
    this._rawAsyncValidators = Array.isArray(t) ? t.slice() : t, this._composedAsyncValidatorFn = Ts(this._rawAsyncValidators)
  }
}, Xt = class extends $t {
  constructor(t, r, e) {
    super(zi(r), Hi(e, r)), this.controls = t, this._initObservables(), this._setUpdateStrategy(r), this._setUpControls(), this.updateValueAndValidity({
      onlySelf: !0,
      emitEvent: !!this.asyncValidator
    })
  }

  registerControl(t, r) {
    return this.controls[t] ? this.controls[t] : (this.controls[t] = r, r.setParent(this), r._registerOnCollectionChange(this._onCollectionChange), r)
  }

  addControl(t, r, e = {}) {
    this.registerControl(t, r), this.updateValueAndValidity({emitEvent: e.emitEvent}), this._onCollectionChange()
  }

  removeControl(t, r = {}) {
    this.controls[t] && this.controls[t]._registerOnCollectionChange(() => {
    }), delete this.controls[t], this.updateValueAndValidity({emitEvent: r.emitEvent}), this._onCollectionChange()
  }

  setControl(t, r, e = {}) {
    this.controls[t] && this.controls[t]._registerOnCollectionChange(() => {
    }), delete this.controls[t], r && this.registerControl(t, r), this.updateValueAndValidity({emitEvent: e.emitEvent}), this._onCollectionChange()
  }

  contains(t) {
    return this.controls.hasOwnProperty(t) && this.controls[t].enabled
  }

  setValue(t, r = {}) {
    dr(this, !0, t), Object.keys(t).forEach(e => {
      sr(this, !0, e), this.controls[e].setValue(t[e], {onlySelf: !0, emitEvent: r.emitEvent})
    }), this.updateValueAndValidity(r)
  }

  patchValue(t, r = {}) {
    t != null && (Object.keys(t).forEach(e => {
      let i = this.controls[e];
      i && i.patchValue(t[e], {onlySelf: !0, emitEvent: r.emitEvent})
    }), this.updateValueAndValidity(r))
  }

  reset(t = {}, r = {}) {
    this._forEachChild((e, i) => {
      e.reset(t ? t[i] : null, {onlySelf: !0, emitEvent: r.emitEvent})
    }), this._updatePristine(r), this._updateTouched(r), this.updateValueAndValidity(r)
  }

  getRawValue() {
    return this._reduceChildren({}, (t, r, e) => (t[e] = r.getRawValue(), t))
  }

  _syncPendingControls() {
    let t = this._reduceChildren(!1, (r, e) => e._syncPendingControls() ? !0 : r);
    return t && this.updateValueAndValidity({onlySelf: !0}), t
  }

  _forEachChild(t) {
    Object.keys(this.controls).forEach(r => {
      let e = this.controls[r];
      e && t(e, r)
    })
  }

  _setUpControls() {
    this._forEachChild(t => {
      t.setParent(this), t._registerOnCollectionChange(this._onCollectionChange)
    })
  }

  _updateValue() {
    this.value = this._reduceValue()
  }

  _anyControls(t) {
    for (let [r, e] of Object.entries(this.controls)) if (this.contains(r) && t(e)) return !0;
    return !1
  }

  _reduceValue() {
    let t = {};
    return this._reduceChildren(t, (r, e, i) => ((e.enabled || this.disabled) && (r[i] = e.value), r))
  }

  _reduceChildren(t, r) {
    let e = t;
    return this._forEachChild((i, o) => {
      e = r(e, i, o)
    }), e
  }

  _allControlsDisabled() {
    for (let t of Object.keys(this.controls)) if (this.controls[t].enabled) return !1;
    return Object.keys(this.controls).length > 0 || this.disabled
  }

  _find(t) {
    return this.controls.hasOwnProperty(t) ? this.controls[t] : null
  }
};
var Pi = class extends Xt {
};
var We = new w("CallSetDisabledState", {providedIn: "root", factory: () => Ge}), Ge = "always";

function Ns(n, t) {
  return [...t.path, n]
}

function Ti(n, t, r = Ge) {
  Ui(n, t), t.valueAccessor.writeValue(n.value), (n.disabled || r === "always") && t.valueAccessor.setDisabledState?.(n.disabled), js(n, t), Bs(n, t), Ls(n, t), Vs(n, t)
}

function Bo(n, t, r = !0) {
  let e = () => {
  };
  t.valueAccessor && (t.valueAccessor.registerOnChange(e), t.valueAccessor.registerOnTouched(e)), Ue(n, t), n && (t._invokeOnDestroyCallbacks(), n._registerOnCollectionChange(() => {
  }))
}

function He(n, t) {
  n.forEach(r => {
    r.registerOnValidatorChange && r.registerOnValidatorChange(t)
  })
}

function Vs(n, t) {
  if (t.valueAccessor.setDisabledState) {
    let r = e => {
      t.valueAccessor.setDisabledState(e)
    };
    n.registerOnDisabledChange(r), t._registerOnDestroy(() => {
      n._unregisterOnDisabledChange(r)
    })
  }
}

function Ui(n, t) {
  let r = nr(n);
  t.validator !== null ? n.setValidators(Vo(r, t.validator)) : typeof r == "function" && n.setValidators([r]);
  let e = or(n);
  t.asyncValidator !== null ? n.setAsyncValidators(Vo(e, t.asyncValidator)) : typeof e == "function" && n.setAsyncValidators([e]);
  let i = () => n.updateValueAndValidity();
  He(t._rawValidators, i), He(t._rawAsyncValidators, i)
}

function Ue(n, t) {
  let r = !1;
  if (n !== null) {
    if (t.validator !== null) {
      let i = nr(n);
      if (Array.isArray(i) && i.length > 0) {
        let o = i.filter(a => a !== t.validator);
        o.length !== i.length && (r = !0, n.setValidators(o))
      }
    }
    if (t.asyncValidator !== null) {
      let i = or(n);
      if (Array.isArray(i) && i.length > 0) {
        let o = i.filter(a => a !== t.asyncValidator);
        o.length !== i.length && (r = !0, n.setAsyncValidators(o))
      }
    }
  }
  let e = () => {
  };
  return He(t._rawValidators, e), He(t._rawAsyncValidators, e), r
}

function js(n, t) {
  t.valueAccessor.registerOnChange(r => {
    n._pendingValue = r, n._pendingChange = !0, n._pendingDirty = !0, n.updateOn === "change" && lr(n, t)
  })
}

function Ls(n, t) {
  t.valueAccessor.registerOnTouched(() => {
    n._pendingTouched = !0, n.updateOn === "blur" && n._pendingChange && lr(n, t), n.updateOn !== "submit" && n.markAsTouched()
  })
}

function lr(n, t) {
  n._pendingDirty && n.markAsDirty(), n.setValue(n._pendingValue, {emitModelToViewChange: !1}), t.viewToModelUpdate(n._pendingValue), n._pendingChange = !1
}

function Bs(n, t) {
  let r = (e, i) => {
    t.valueAccessor.writeValue(e), i && t.viewToModelUpdate(e)
  };
  n.registerOnChange(r), t._registerOnDestroy(() => {
    n._unregisterOnChange(r)
  })
}

function cr(n, t) {
  n == null, Ui(n, t)
}

function zs(n, t) {
  return Ue(n, t)
}

function Hs(n, t) {
  if (!n.hasOwnProperty("model")) return !1;
  let r = n.model;
  return r.isFirstChange() ? !0 : !Object.is(t, r.currentValue)
}

function Us(n) {
  return Object.getPrototypeOf(n.constructor) === qo
}

function mr(n, t) {
  n._syncPendingControls(), t.forEach(r => {
    let e = r.control;
    e.updateOn === "submit" && e._pendingChange && (r.viewToModelUpdate(e._pendingValue), e._pendingChange = !1)
  })
}

function Ys(n, t) {
  if (!t) return null;
  Array.isArray(t);
  let r, e, i;
  return t.forEach(o => {
    o.constructor === Ye ? r = o : Us(o) ? e = o : i = o
  }), i || e || r || null
}

function qs(n, t) {
  let r = n.indexOf(t);
  r > -1 && n.splice(r, 1)
}

var Ws = {provide: yt, useExisting: ft(() => Yi)}, he = Promise.resolve(), Yi = (() => {
  let t = class t extends yt {
    constructor(e, i, o) {
      super(), this.callSetDisabledState = o, this.submitted = !1, this._directives = new Set, this.ngSubmit = new tt, this.form = new Xt({}, Li(e), Bi(i))
    }

    get formDirective() {
      return this
    }

    get control() {
      return this.form
    }

    get path() {
      return []
    }

    get controls() {
      return this.form.controls
    }

    ngAfterViewInit() {
      this._setUpdateStrategy()
    }

    addControl(e) {
      he.then(() => {
        let i = this._findContainer(e.path);
        e.control = i.registerControl(e.name, e.control), Ti(e.control, e, this.callSetDisabledState), e.control.updateValueAndValidity({emitEvent: !1}), this._directives.add(e)
      })
    }

    getControl(e) {
      return this.form.get(e.path)
    }

    removeControl(e) {
      he.then(() => {
        let i = this._findContainer(e.path);
        i && i.removeControl(e.name), this._directives.delete(e)
      })
    }

    addFormGroup(e) {
      he.then(() => {
        let i = this._findContainer(e.path), o = new Xt({});
        cr(o, e), i.registerControl(e.name, o), o.updateValueAndValidity({emitEvent: !1})
      })
    }

    removeFormGroup(e) {
      he.then(() => {
        let i = this._findContainer(e.path);
        i && i.removeControl(e.name)
      })
    }

    getFormGroup(e) {
      return this.form.get(e.path)
    }

    updateModel(e, i) {
      he.then(() => {
        this.form.get(e.path).setValue(i)
      })
    }

    setValue(e) {
      this.control.setValue(e)
    }

    onSubmit(e) {
      return this.submitted = !0, mr(this.form, this._directives), this.ngSubmit.emit(e), e?.target?.method === "dialog"
    }

    onReset() {
      this.resetForm()
    }

    resetForm(e = void 0) {
      this.form.reset(e), this.submitted = !1
    }

    _setUpdateStrategy() {
      this.options && this.options.updateOn != null && (this.form._updateOn = this.options.updateOn)
    }

    _findContainer(e) {
      return e.pop(), e.length ? this.form.get(e) : this.form
    }
  };
  t.\u0275fac = function (i) {
    return new (i || t)(l(Zt, 10), l(ji, 10), l(We, 8))
  }, t.\u0275dir = g({
    type: t,
    selectors: [["form", 3, "ngNoForm", "", 3, "formGroup", ""], ["ng-form"], ["", "ngForm", ""]],
    hostBindings: function (i, o) {
      i & 1 && R("submit", function (s) {
        return o.onSubmit(s)
      })("reset", function () {
        return o.onReset()
      })
    },
    inputs: {options: [D.None, "ngFormOptions", "options"]},
    outputs: {ngSubmit: "ngSubmit"},
    exportAs: ["ngForm"],
    features: [X([Ws]), q]
  });
  let n = t;
  return n
})();

function zo(n, t) {
  let r = n.indexOf(t);
  r > -1 && n.splice(r, 1)
}

function Ho(n) {
  return typeof n == "object" && n !== null && Object.keys(n).length === 2 && "value" in n && "disabled" in n
}

var Ve = class extends $t {
  constructor(t = null, r, e) {
    super(zi(r), Hi(e, r)), this.defaultValue = null, this._onChange = [], this._pendingChange = !1, this._applyFormState(t), this._setUpdateStrategy(r), this._initObservables(), this.updateValueAndValidity({
      onlySelf: !0,
      emitEvent: !!this.asyncValidator
    }), qe(r) && (r.nonNullable || r.initialValueIsDefault) && (Ho(t) ? this.defaultValue = t.value : this.defaultValue = t)
  }

  setValue(t, r = {}) {
    this.value = this._pendingValue = t, this._onChange.length && r.emitModelToViewChange !== !1 && this._onChange.forEach(e => e(this.value, r.emitViewToModelChange !== !1)), this.updateValueAndValidity(r)
  }

  patchValue(t, r = {}) {
    this.setValue(t, r)
  }

  reset(t = this.defaultValue, r = {}) {
    this._applyFormState(t), this.markAsPristine(r), this.markAsUntouched(r), this.setValue(this.value, r), this._pendingChange = !1
  }

  _updateValue() {
  }

  _anyControls(t) {
    return !1
  }

  _allControlsDisabled() {
    return this.disabled
  }

  registerOnChange(t) {
    this._onChange.push(t)
  }

  _unregisterOnChange(t) {
    zo(this._onChange, t)
  }

  registerOnDisabledChange(t) {
    this._onDisabledChange.push(t)
  }

  _unregisterOnDisabledChange(t) {
    zo(this._onDisabledChange, t)
  }

  _forEachChild(t) {
  }

  _syncPendingControls() {
    return this.updateOn === "submit" && (this._pendingDirty && this.markAsDirty(), this._pendingTouched && this.markAsTouched(), this._pendingChange) ? (this.setValue(this._pendingValue, {
      onlySelf: !0,
      emitModelToViewChange: !1
    }), !0) : !1
  }

  _applyFormState(t) {
    Ho(t) ? (this.value = this._pendingValue = t.value, t.disabled ? this.disable({
      onlySelf: !0,
      emitEvent: !1
    }) : this.enable({onlySelf: !0, emitEvent: !1})) : this.value = this._pendingValue = t
  }
};
var Gs = n => n instanceof Ve;
var ur = (() => {
  let t = class t {
  };
  t.\u0275fac = function (i) {
    return new (i || t)
  }, t.\u0275dir = g({
    type: t,
    selectors: [["form", 3, "ngNoForm", "", 3, "ngNativeValidate", ""]],
    hostAttrs: ["novalidate", ""]
  });
  let n = t;
  return n
})(), $s = {provide: Vi, useExisting: ft(() => qi), multi: !0}, qi = (() => {
  let t = class t extends qo {
    writeValue(e) {
      let i = e ?? "";
      this.setProperty("value", i)
    }

    registerOnChange(e) {
      this.onChange = i => {
        e(i == "" ? null : parseFloat(i))
      }
    }
  };
  t.\u0275fac = (() => {
    let e;
    return function (o) {
      return (e || (e = Et(t)))(o || t)
    }
  })(), t.\u0275dir = g({
    type: t,
    selectors: [["input", "type", "number", "formControlName", ""], ["input", "type", "number", "formControl", ""], ["input", "type", "number", "ngModel", ""]],
    hostBindings: function (i, o) {
      i & 1 && R("input", function (s) {
        return o.onChange(s.target.value)
      })("blur", function () {
        return o.onTouched()
      })
    },
    features: [X([$s]), q]
  });
  let n = t;
  return n
})();
var hr = new w("");
var Xs = {provide: yt, useExisting: ft(() => fe)}, fe = (() => {
  let t = class t extends yt {
    constructor(e, i, o) {
      super(), this.callSetDisabledState = o, this.submitted = !1, this._onCollectionChange = () => this._updateDomValue(), this.directives = [], this.form = null, this.ngSubmit = new tt, this._setValidators(e), this._setAsyncValidators(i)
    }


    get formDirective() {
      return this
    }

    get control() {
      return this.form
    }

    get path() {
      return []
    }

    ngOnChanges(e) {
      this._checkFormPresent(), e.hasOwnProperty("form") && (this._updateValidators(), this._updateDomValue(), this._updateRegistrations(), this._oldForm = this.form)
    }

    ngOnDestroy() {
      this.form && (Ue(this.form, this), this.form._onCollectionChange === this._onCollectionChange && this.form._registerOnCollectionChange(() => {
      }))
    }

    addControl(e) {
      let i = this.form.get(e.path);
      return Ti(i, e, this.callSetDisabledState), i.updateValueAndValidity({emitEvent: !1}), this.directives.push(e), i
    }

    getControl(e) {
      return this.form.get(e.path)
    }

    removeControl(e) {
      Bo(e.control || null, e, !1), qs(this.directives, e)
    }

    addFormGroup(e) {
      this._setUpFormContainer(e)
    }

    removeFormGroup(e) {
      this._cleanUpFormContainer(e)
    }

    getFormGroup(e) {
      return this.form.get(e.path)
    }

    addFormArray(e) {
      this._setUpFormContainer(e)
    }

    removeFormArray(e) {
      this._cleanUpFormContainer(e)
    }

    getFormArray(e) {
      return this.form.get(e.path)
    }

    updateModel(e, i) {
      this.form.get(e.path).setValue(i)
    }

    onSubmit(e) {
      return this.submitted = !0, mr(this.form, this.directives), this.ngSubmit.emit(e), e?.target?.method === "dialog"
    }

    onReset() {
      this.resetForm()
    }

    resetForm(e = void 0) {
      this.form.reset(e), this.submitted = !1
    }

    _updateDomValue() {
      this.directives.forEach(e => {
        let i = e.control, o = this.form.get(e.path);
        i !== o && (Bo(i || null, e), Gs(o) && (Ti(o, e, this.callSetDisabledState), e.control = o))
      }), this.form._updateTreeValidity({emitEvent: !1})
    }

    _setUpFormContainer(e) {
      let i = this.form.get(e.path);
      cr(i, e), i.updateValueAndValidity({emitEvent: !1})
    }

    _cleanUpFormContainer(e) {
      if (this.form) {
        let i = this.form.get(e.path);
        i && zs(i, e) && i.updateValueAndValidity({emitEvent: !1})
      }
    }

    _updateRegistrations() {
      this.form._registerOnCollectionChange(this._onCollectionChange), this._oldForm && this._oldForm._registerOnCollectionChange(() => {
      })
    }

    _updateValidators() {
      Ui(this.form, this), this._oldForm && Ue(this._oldForm, this)
    }

    _checkFormPresent() {
      this.form
    }
  };
  t.\u0275fac = function (i) {
    return new (i || t)(l(Zt, 10), l(ji, 10), l(We, 8))
  }, t.\u0275dir = g({
    type: t,
    selectors: [["", "formGroup", ""]],
    hostBindings: function (i, o) {
      i & 1 && R("submit", function (s) {
        return o.onSubmit(s)
      })("reset", function () {
        return o.onReset()
      })
    },
    inputs: {form: [D.None, "formGroup", "form"]},
    outputs: {ngSubmit: "ngSubmit"},
    exportAs: ["ngForm"],
    features: [X([Xs]), q, pt]
  });
  let n = t;
  return n
})();
var Zs = {provide: Pt, useExisting: ft(() => Wi)}, Wi = (() => {
  let t = class t extends Pt {
    constructor(e, i, o, a, s) {
      super(), this._ngModelWarningConfig = s, this._added = !1, this.name = null, this.update = new tt, this._ngModelWarningSent = !1, this._parent = e, this._setValidators(i), this._setAsyncValidators(o), this.valueAccessor = Ys(this, a)
    }

    set isDisabled(e) {
    }

    get path() {
      return Ns(this.name == null ? this.name : this.name.toString(), this._parent)
    }


    get formDirective() {
      return this._parent ? this._parent.formDirective : null
    }

    ngOnChanges(e) {
      this._added || this._setUpControl(), Hs(e, this.viewModel) && (this.viewModel = this.model, this.formDirective.updateModel(this, this.model))
    }

    ngOnDestroy() {
      this.formDirective && this.formDirective.removeControl(this)
    }

    viewToModelUpdate(e) {
      this.viewModel = e, this.update.emit(e)
    }

    _checkParentType() {
    }

    _setUpControl() {
      this._checkParentType(), this.control = this.formDirective.addControl(this), this._added = !0
    }
  };
  t._ngModelWarningSentOnce = !1, t.\u0275fac = function (i) {
    return new (i || t)(l(yt, 13), l(Zt, 10), l(ji, 10), l(Vi, 10), l(hr, 8))
  }, t.\u0275dir = g({
    type: t,
    selectors: [["", "formControlName", ""]],
    inputs: {
      name: [D.None, "formControlName", "name"],
      isDisabled: [D.None, "disabled", "isDisabled"],
      model: [D.None, "ngModel", "model"]
    },
    outputs: {update: "ngModelChange"},
    features: [X([Zs]), q, pt]
  });
  let n = t;
  return n
})();

function fr(n) {
  return typeof n == "number" ? n : parseFloat(n)
}

var Gi = (() => {
  let t = class t {
    constructor() {
      this._validator = je
    }

    ngOnChanges(e) {
      if (this.inputName in e) {
        let i = this.normalizeInput(e[this.inputName].currentValue);
        this._enabled = this.enabled(i), this._validator = this._enabled ? this.createValidator(i) : je, this._onChange && this._onChange()
      }
    }

    validate(e) {
      return this._validator(e)
    }

    registerOnValidatorChange(e) {
      this._onChange = e
    }

    enabled(e) {
      return e != null
    }
  };
  t.\u0275fac = function (i) {
    return new (i || t)
  }, t.\u0275dir = g({type: t, features: [pt]});
  let n = t;
  return n
})(), Ks = {provide: Zt, useExisting: ft(() => $i), multi: !0}, $i = (() => {
  let t = class t extends Gi {
    constructor() {
      super(...arguments), this.inputName = "max", this.normalizeInput = e => fr(e), this.createValidator = e => $o(e)
    }
  };
  t.\u0275fac = (() => {
    let e;
    return function (o) {
      return (e || (e = Et(t)))(o || t)
    }
  })(), t.\u0275dir = g({
    type: t,
    selectors: [["input", "type", "number", "max", "", "formControlName", ""], ["input", "type", "number", "max", "", "formControl", ""], ["input", "type", "number", "max", "", "ngModel", ""]],
    hostVars: 1,
    hostBindings: function (i, o) {
      i & 2 && Z("max", o._enabled ? o.max : null)
    },
    inputs: {max: "max"},
    features: [X([Ks]), q]
  });
  let n = t;
  return n
})(), Qs = {provide: Zt, useExisting: ft(() => Xi), multi: !0}, Xi = (() => {
  let t = class t extends Gi {
    constructor() {
      super(...arguments), this.inputName = "min", this.normalizeInput = e => fr(e), this.createValidator = e => Go(e)
    }
  };
  t.\u0275fac = (() => {
    let e;
    return function (o) {
      return (e || (e = Et(t)))(o || t)
    }
  })(), t.\u0275dir = g({
    type: t,
    selectors: [["input", "type", "number", "min", "", "formControlName", ""], ["input", "type", "number", "min", "", "formControl", ""], ["input", "type", "number", "min", "", "ngModel", ""]],
    hostVars: 1,
    hostBindings: function (i, o) {
      i & 2 && Z("min", o._enabled ? o.min : null)
    },
    inputs: {min: "min"},
    features: [X([Qs]), q]
  });
  let n = t;
  return n
})(), Js = {provide: Zt, useExisting: ft(() => Zi), multi: !0};
var Zi = (() => {
  let t = class t extends Gi {
    constructor() {
      super(...arguments), this.inputName = "required", this.normalizeInput = ut, this.createValidator = e => Xo
    }

    enabled(e) {
      return e
    }
  };
  t.\u0275fac = (() => {
    let e;
    return function (o) {
      return (e || (e = Et(t)))(o || t)
    }
  })(), t.\u0275dir = g({
    type: t,
    selectors: [["", "required", "", "formControlName", "", 3, "type", "checkbox"], ["", "required", "", "formControl", "", 3, "type", "checkbox"], ["", "required", "", "ngModel", "", 3, "type", "checkbox"]],
    hostVars: 1,
    hostBindings: function (i, o) {
      i & 2 && Z("required", o._enabled ? "" : null)
    },
    inputs: {required: "required"},
    features: [X([Js]), q]
  });
  let n = t;
  return n
})();
var pr = (() => {
  let t = class t {
  };
  t.\u0275fac = function (i) {
    return new (i || t)
  }, t.\u0275mod = S({type: t}), t.\u0275inj = M({});
  let n = t;
  return n
})(), Ni = class extends $t {
  constructor(t, r, e) {
    super(zi(r), Hi(e, r)), this.controls = t, this._initObservables(), this._setUpdateStrategy(r), this._setUpControls(), this.updateValueAndValidity({
      onlySelf: !0,
      emitEvent: !!this.asyncValidator
    })
  }

  get length() {
    return this.controls.length
  }

  at(t) {
    return this.controls[this._adjustIndex(t)]
  }

  push(t, r = {}) {
    this.controls.push(t), this._registerControl(t), this.updateValueAndValidity({emitEvent: r.emitEvent}), this._onCollectionChange()
  }

  insert(t, r, e = {}) {
    this.controls.splice(t, 0, r), this._registerControl(r), this.updateValueAndValidity({emitEvent: e.emitEvent})
  }

  removeAt(t, r = {}) {
    let e = this._adjustIndex(t);
    e < 0 && (e = 0), this.controls[e] && this.controls[e]._registerOnCollectionChange(() => {
    }), this.controls.splice(e, 1), this.updateValueAndValidity({emitEvent: r.emitEvent})
  }

  setControl(t, r, e = {}) {
    let i = this._adjustIndex(t);
    i < 0 && (i = 0), this.controls[i] && this.controls[i]._registerOnCollectionChange(() => {
    }), this.controls.splice(i, 1), r && (this.controls.splice(i, 0, r), this._registerControl(r)), this.updateValueAndValidity({emitEvent: e.emitEvent}), this._onCollectionChange()
  }

  setValue(t, r = {}) {
    dr(this, !1, t), t.forEach((e, i) => {
      sr(this, !1, i), this.at(i).setValue(e, {onlySelf: !0, emitEvent: r.emitEvent})
    }), this.updateValueAndValidity(r)
  }

  patchValue(t, r = {}) {
    t != null && (t.forEach((e, i) => {
      this.at(i) && this.at(i).patchValue(e, {onlySelf: !0, emitEvent: r.emitEvent})
    }), this.updateValueAndValidity(r))
  }

  reset(t = [], r = {}) {
    this._forEachChild((e, i) => {
      e.reset(t[i], {onlySelf: !0, emitEvent: r.emitEvent})
    }), this._updatePristine(r), this._updateTouched(r), this.updateValueAndValidity(r)
  }

  getRawValue() {
    return this.controls.map(t => t.getRawValue())
  }

  clear(t = {}) {
    this.controls.length < 1 || (this._forEachChild(r => r._registerOnCollectionChange(() => {
    })), this.controls.splice(0), this.updateValueAndValidity({emitEvent: t.emitEvent}))
  }

  _adjustIndex(t) {
    return t < 0 ? t + this.length : t
  }

  _syncPendingControls() {
    let t = this.controls.reduce((r, e) => e._syncPendingControls() ? !0 : r, !1);
    return t && this.updateValueAndValidity({onlySelf: !0}), t
  }

  _forEachChild(t) {
    this.controls.forEach((r, e) => {
      t(r, e)
    })
  }

  _updateValue() {
    this.value = this.controls.filter(t => t.enabled || this.disabled).map(t => t.value)
  }

  _anyControls(t) {
    return this.controls.some(r => r.enabled && t(r))
  }

  _setUpControls() {
    this._forEachChild(t => this._registerControl(t))
  }

  _allControlsDisabled() {
    for (let t of this.controls) if (t.enabled) return !1;
    return this.controls.length > 0 || this.disabled
  }

  _registerControl(t) {
    t.setParent(this), t._registerOnCollectionChange(this._onCollectionChange)
  }

  _find(t) {
    return this.at(t) ?? null
  }
};

function Uo(n) {
  return !!n && (n.asyncValidators !== void 0 || n.validators !== void 0 || n.updateOn !== void 0)
}

var br = (() => {
  let t = class t {
    constructor() {
      this.useNonNullable = !1
    }

    get nonNullable() {
      let e = new t;
      return e.useNonNullable = !0, e
    }

    group(e, i = null) {
      let o = this._reduceControls(e), a = {};
      return Uo(i) ? a = i : i !== null && (a.validators = i.validator, a.asyncValidators = i.asyncValidator), new Xt(o, a)
    }

    record(e, i = null) {
      let o = this._reduceControls(e);
      return new Pi(o, i)
    }

    control(e, i, o) {
      let a = {};
      return this.useNonNullable ? (Uo(i) ? a = i : (a.validators = i, a.asyncValidators = o), new Ve(e, ct(y({}, a), {nonNullable: !0}))) : new Ve(e, i, o)
    }

    array(e, i, o) {
      let a = e.map(s => this._createControl(s));
      return new Ni(a, i, o)
    }

    _reduceControls(e) {
      let i = {};
      return Object.keys(e).forEach(o => {
        i[o] = this._createControl(e[o])
      }), i
    }

    _createControl(e) {
      if (e instanceof Ve) return e;
      if (e instanceof $t) return e;
      if (Array.isArray(e)) {
        let i = e[0], o = e.length > 1 ? e[1] : null, a = e.length > 2 ? e[2] : null;
        return this.control(i, o, a)
      } else return this.control(e)
    }
  };
  t.\u0275fac = function (i) {
    return new (i || t)
  }, t.\u0275prov = b({token: t, factory: t.\u0275fac, providedIn: "root"});
  let n = t;
  return n
})();
var gr = (() => {
  let t = class t {
    static withConfig(e) {
      return {ngModule: t, providers: [{provide: We, useValue: e.callSetDisabledState ?? Ge}]}
    }
  };
  t.\u0275fac = function (i) {
    return new (i || t)
  }, t.\u0275mod = S({type: t}), t.\u0275inj = M({imports: [pr]});
  let n = t;
  return n
})(), _r = (() => {
  let t = class t {
    static withConfig(e) {
      return {
        ngModule: t,
        providers: [{provide: hr, useValue: e.warnOnNgModelWithFormControl ?? "always"}, {
          provide: We,
          useValue: e.callSetDisabledState ?? Ge
        }]
      }
    }
  };
  t.\u0275fac = function (i) {
    return new (i || t)
  }, t.\u0275mod = S({type: t}), t.\u0275inj = M({imports: [pr]});
  let n = t;
  return n
})();
var td = new w("MAT_INPUT_VALUE_ACCESSOR"),
  ed = ["button", "checkbox", "file", "hidden", "image", "radio", "range", "reset", "submit"], id = 0, xr = (() => {
    let t = class t {
      constructor(e, i, o, a, s, d, f, m, p, G) {
        this._elementRef = e, this._platform = i, this.ngControl = o, this._autofillMonitor = m, this._formField = G, this._uid = `mat-input-${id++}`, this.focused = !1, this.stateChanges = new C, this.controlType = "mat-input", this.autofilled = !1, this._disabled = !1, this._type = "text", this._readonly = !1, this._neverEmptyInputTypes = ["date", "datetime", "datetime-local", "month", "time", "week"].filter(L => di().has(L)), this._iOSKeyupListener = L => {
          let ot = L.target;
          !ot.value && ot.selectionStart === 0 && ot.selectionEnd === 0 && (ot.setSelectionRange(1, 1), ot.setSelectionRange(0, 0))
        };
        let z = this._elementRef.nativeElement, j = z.nodeName.toLowerCase();
        this._inputValueAccessor = f || z, this._previousNativeValue = this.value, this.id = this.id, i.IOS && p.runOutsideAngular(() => {
          e.nativeElement.addEventListener("keyup", this._iOSKeyupListener)
        }), this._errorStateTracker = new Se(d, o, s, a, this.stateChanges), this._isServer = !this._platform.isBrowser, this._isNativeSelect = j === "select", this._isTextarea = j === "textarea", this._isInFormField = !!G, this._isNativeSelect && (this.controlType = z.multiple ? "mat-native-select-multiple" : "mat-native-select")
      }

      get disabled() {
        return this._disabled
      }

      set disabled(e) {
        this._disabled = At(e), this.focused && (this.focused = !1, this.stateChanges.next())
      }

      get id() {
        return this._id
      }

      set id(e) {
        this._id = e || this._uid
      }

      get required() {
        return this._required ?? this.ngControl?.control?.hasValidator(bt.required) ?? !1
      }

      set required(e) {
        this._required = At(e)
      }

      get type() {
        return this._type
      }

      set type(e) {
        this._type = e || "text", this._validateType(), !this._isTextarea && di().has(this._type) && (this._elementRef.nativeElement.type = this._type)
      }

      get errorStateMatcher() {
        return this._errorStateTracker.matcher
      }

      set errorStateMatcher(e) {
        this._errorStateTracker.matcher = e
      }

      get value() {
        return this._inputValueAccessor.value
      }

      set value(e) {
        e !== this.value && (this._inputValueAccessor.value = e, this.stateChanges.next())
      }

      get readonly() {
        return this._readonly
      }

      set readonly(e) {
        this._readonly = At(e)
      }

      get errorState() {
        return this._errorStateTracker.errorState
      }

      set errorState(e) {
        this._errorStateTracker.errorState = e
      }


      get empty() {
        return !this._isNeverEmpty() && !this._elementRef.nativeElement.value && !this._isBadInput() && !this.autofilled
      }

      get shouldLabelFloat() {
        if (this._isNativeSelect) {
          let e = this._elementRef.nativeElement, i = e.options[0];
          return this.focused || e.multiple || !this.empty || !!(e.selectedIndex > -1 && i && i.label)
        } else return this.focused || !this.empty
      }

      ngAfterViewInit() {
        this._platform.isBrowser && this._autofillMonitor.monitor(this._elementRef.nativeElement).subscribe(e => {
          this.autofilled = e.isAutofilled, this.stateChanges.next()
        })
      }


      ngOnChanges() {
        this.stateChanges.next()
      }

      ngOnDestroy() {
        this.stateChanges.complete(), this._platform.isBrowser && this._autofillMonitor.stopMonitoring(this._elementRef.nativeElement), this._platform.IOS && this._elementRef.nativeElement.removeEventListener("keyup", this._iOSKeyupListener)
      }

      ngDoCheck() {
        this.ngControl && (this.updateErrorState(), this.ngControl.disabled !== null && this.ngControl.disabled !== this.disabled && (this.disabled = this.ngControl.disabled, this.stateChanges.next())), this._dirtyCheckNativeValue(), this._dirtyCheckPlaceholder()
      }


      focus(e) {
        this._elementRef.nativeElement.focus(e)
      }

      updateErrorState() {
        this._errorStateTracker.updateErrorState()
      }

      _focusChanged(e) {
        e !== this.focused && (this.focused = e, this.stateChanges.next())
      }


      _onInput() {
      }

      _dirtyCheckNativeValue() {
        let e = this._elementRef.nativeElement.value;
        this._previousNativeValue !== e && (this._previousNativeValue = e, this.stateChanges.next())
      }

      _dirtyCheckPlaceholder() {
        let e = this._getPlaceholder();
        if (e !== this._previousPlaceholder) {
          let i = this._elementRef.nativeElement;
          this._previousPlaceholder = e, e ? i.setAttribute("placeholder", e) : i.removeAttribute("placeholder")
        }
      }


      _getPlaceholder() {
        return this.placeholder || null
      }

      _validateType() {
        ed.indexOf(this._type) > -1
      }

      _isNeverEmpty() {
        return this._neverEmptyInputTypes.indexOf(this._type) > -1
      }

      _isBadInput() {
        let e = this._elementRef.nativeElement.validity;
        return e && e.badInput
      }

      setDescribedByIds(e) {
        e.length ? this._elementRef.nativeElement.setAttribute("aria-describedby", e.join(" ")) : this._elementRef.nativeElement.removeAttribute("aria-describedby")
      }

      onContainerClick() {
        this.focused || this.focus()
      }

      _isInlineSelect() {
        let e = this._elementRef.nativeElement;
        return this._isNativeSelect && (e.multiple || e.size > 1)
      }
    };
    t.\u0275fac = function (i) {
      return new (i || t)(l(k), l(A), l(Pt, 10), l(Yi, 8), l(fe, 8), l(no), l(td, 10), l(To), l(v), l(Fi, 8))
    }, t.\u0275dir = g({
      type: t,
      selectors: [["input", "matInput", ""], ["textarea", "matInput", ""], ["select", "matNativeControl", ""], ["input", "matNativeControl", ""], ["textarea", "matNativeControl", ""]],
      hostAttrs: [1, "mat-mdc-input-element"],
      hostVars: 18,
      hostBindings: function (i, o) {
        i & 1 && R("focus", function () {
          return o._focusChanged(!0)
        })("blur", function () {
          return o._focusChanged(!1)
        })("input", function () {
          return o._onInput()
        }), i & 2 && (te("id", o.id)("disabled", o.disabled)("required", o.required), Z("name", o.name || null)("readonly", o.readonly && !o._isNativeSelect || null)("aria-invalid", o.empty && o.required ? null : o.errorState)("aria-required", o.required)("id", o.id), W("mat-input-server", o._isServer)("mat-mdc-form-field-textarea-control", o._isInFormField && o._isTextarea)("mat-mdc-form-field-input-control", o._isInFormField)("mdc-text-field__input", o._isInFormField)("mat-mdc-native-select-inline", o._isInlineSelect()))
      },
      inputs: {
        disabled: "disabled",
        id: "id",
        placeholder: "placeholder",
        name: "name",
        required: "required",
        type: "type",
        errorStateMatcher: "errorStateMatcher",
        userAriaDescribedBy: [D.None, "aria-describedby", "userAriaDescribedBy"],
        value: "value",
        readonly: "readonly"
      },
      exportAs: ["matInput"],
      standalone: !0,
      features: [X([{provide: Oi, useExisting: t}]), pt]
    });
    let n = t;
    return n
  })(), yr = (() => {
    let t = class t {
    };
    t.\u0275fac = function (i) {
      return new (i || t)
    }, t.\u0275mod = S({type: t}), t.\u0275inj = M({imports: [J, ce, ce, No, J]});
    let n = t;
    return n
  })();
var wr = (() => {
  let t = class t {
  };
  t.\u0275fac = function (i) {
    return new (i || t)
  }, t.\u0275mod = S({type: t}), t.\u0275inj = M({imports: [J, J]});
  let n = t;
  return n
})();

function od(n, t) {
  if (n & 1) {
    let r = dt();
    h(0, "button", 10), R("click", function () {
      rt(r);
      let i = O();
      return at(i.onClickPositionPoisonedSquare())
    }), x(1, "Annuler le positionnement"), u()
  }
}

function rd(n, t) {
  if (n & 1) {
    let r = dt();
    h(0, "button", 11), R("click", function () {
      rt(r);
      let i = O();
      return at(i.onClickPositionPoisonedSquare())
    }), x(1, "Positionner le carr\xE9 empoisonn\xE9"), u()
  }
}

var Cr = (() => {
  let t = class t {
    constructor(e, i, o) {
      this.formBuilder = e, this._snackBar = i, this.settingsService = o, this.minimumColumns = 1, this.minimumLines = 1, this.maximumColumns = 10, this.maximumLines = 10, this.chocoBarForm = this.formBuilder.group({
        nbLines: ["", bt.required],
        nbColumns: ["", bt.required]
      }), this.chocoSquareForm = this.formBuilder.group({
        poisonedSquareX: ["", bt.required],
        poisonedSquareY: ["", bt.required]
      }), this.playersForm = this.formBuilder.group({player1: [""], player2: [""]})
    }

    updateChocoBar() {
      if (this.chocoBarForm.valid) {
        let e = parseInt(this.chocoBarForm.value.nbLines), i = parseInt(this.chocoBarForm.value.nbColumns);
        if (e <= 1 && i >= 2 || e >= 2 && i <= 1 || e < 2 && i < 2) {
          this._snackBar.open("\u274C L'une des valeurs doit \xEAtre sup\xE9rieure \xE0 1");
          return
        }
        this.settingsService.setNbLines(e), this.settingsService.setNbColumns(i), this._snackBar.open("\u2705 Tablette de chocolat mise \xE0 jour ! Pr\xEAt \xE0 \xEAtre mang\xE9e !"), this.settingsService.setNeedUpdate(!0);
        return
      }
      this._snackBar.open("\u274C Les valeurs doivent \xEAtre sup\xE9rieures \xE0 1 et inf\xE9rieures \xE0 " + this.maximumColumns)
    }

    updateChocoSquare() {
      if (this.chocoSquareForm.valid) {
        let e = parseInt(this.chocoSquareForm.value.poisonedSquareX),
          i = parseInt(this.chocoSquareForm.value.poisonedSquareY);
        if (e >= this.settingsService.getNbColumns() || i >= this.settingsService.getNbLines()) {
          this._snackBar.open("\u274C Les valeurs doivent \xEAtre inf\xE9rieures \xE0 " + this.settingsService.getNbLines() + " pour x et " + this.settingsService.getNbColumns() + " pour y");
          return
        }
        this.settingsService.setPoisonedSquareX(e), this.settingsService.setPoisonedSquareY(i), this._snackBar.open("\u2705 Carr\xE9 empoisonn\xE9 mise \xE0 jour !"), this.settingsService.setNeedUpdate(!0);
        return
      }
      this._snackBar.open("\u274C Les valeurs doivent \xEAtre inf\xE9rieures \xE0 " + this.settingsService.getNbLines() + " pour x et " + this.settingsService.getNbColumns() + " pour y")
    }

    updatePlayers() {
      if (this.playersForm.valid) {
        if (this.playersForm.value.player1 === "" && this.playersForm.value.player2 === "") {
          this._snackBar.open("\u274C Les deux joueurs ne peuvent pas \xEAtre vides !");
          return
        }
        if (this.playersForm.value.player1 === this.playersForm.value.player2) {
          this._snackBar.open("\u274C Les deux joueurs ne peuvent pas avoir le m\xEAme nom ! Tu veux te battre contre toi-m\xEAme ?");
          return
        }
        this.playersForm.value.player1 !== "" && this.settingsService.setPlayer1(this.playersForm.value.player1), this.playersForm.value.player2 !== "" && this.settingsService.setPlayer2(this.playersForm.value.player2), this._snackBar.open("\u2705 Joueurs mis \xE0 jour ! " + this.settingsService.getPlayer1() + " et " + this.settingsService.getPlayer2() + " sont pr\xEAts \xE0 se battre !");
        return
      }
      this._snackBar.open("\u274C Au moins un des deux joueurs doit avoir un nom !")
    }

    onClickPositionPoisonedSquare() {
      this.settingsService.setPositionPoisonedSquare(), this.settingsService.setNeedUpdate(!0)
    }
  };
  t.\u0275fac = function (i) {
    return new (i || t)(l(br), l(Re), l(Lt))
  }, t.\u0275cmp = T({
    type: t,
    selectors: [["app-settings"]],
    standalone: !0,
    features: [V],
    decls: 46,
    vars: 10,
    consts: [[3, "ngSubmit", "formGroup"], [1, "input-container"], ["matInput", "", "placeholder", "Ex. 6", "type", "number", "formControlName", "nbLines", "required", "", 3, "min", "max"], ["matInput", "", "placeholder", "Ex. 3", "type", "number", "formControlName", "nbColumns", "required", "", 3, "min", "max"], ["mat-raised-button", "", "color", "primary", "type", "submit"], ["matInput", "", "placeholder", "Ex. 0", "type", "number", "min", "0", "formControlName", "poisonedSquareX", "required", "", 3, "max"], ["matInput", "", "placeholder", "Ex. 0", "type", "number", "min", "0", "formControlName", "poisonedSquareY", "required", "", 3, "max"], ["mat-raised-button", "", "color", "primary", "type", "button", 1, "redBackground"], ["matInput", "", "placeholder", "Ex. Axel", "formControlName", "player1", "type", "text"], ["matInput", "", "placeholder", "Ex. Karim", "formControlName", "player2", "type", "text"], ["mat-raised-button", "", "color", "primary", "type", "button", 1, "redBackground", 3, "click"], ["mat-raised-button", "", "color", "primary", "type", "button", 3, "click"]],
    template: function (i, o) {
      i & 1 && (h(0, "form", 0), R("ngSubmit", function () {
        return o.updateChocoBar()
      }), h(1, "h2"), x(2, "Param\xE8tres de la tablette \u{1F36B}"), u(), h(3, "div", 1)(4, "mat-form-field")(5, "mat-label"), x(6, "Nombre de lignes"), u(), E(7, "input", 2), u(), h(8, "mat-form-field")(9, "mat-label"), x(10, "Nombre de colonnes"), u(), E(11, "input", 3), u()(), h(12, "button", 4), x(13, "Mettre \xE0 jour"), u()(), h(14, "form", 0), R("ngSubmit", function () {
        return o.updateChocoSquare()
      }), h(15, "h2"), x(16, "Position du carr\xE9 \u{1F7E5}"), u(), h(17, "div", 1)(18, "mat-form-field")(19, "mat-label"), x(20, "Position en X"), u(), E(21, "input", 5), u(), h(22, "mat-form-field")(23, "mat-label"), x(24, "Position en Y"), u(), E(25, "input", 6), u()(), h(26, "button", 4), x(27, "Positioner le carr\xE9 rouge avec X et Y"), u(), h(28, "p"), x(29, "- ou -"), u(), N(30, od, 2, 0, "button", 7)(31, rd, 2, 0), u(), h(32, "form", 0), R("ngSubmit", function () {
        return o.updatePlayers()
      }), h(33, "h2"), x(34, "Les joueurs \u{1F46B}"), u(), h(35, "div", 1)(36, "mat-form-field")(37, "mat-label"), x(38, "Nom du joueur 1\uFE0F\u20E3"), u(), E(39, "input", 8), u(), h(40, "mat-form-field")(41, "mat-label"), x(42, "Nom du joueur 2\uFE0F\u20E3"), u(), E(43, "input", 9), u()(), h(44, "button", 4), x(45, "Mettre \xE0 jour"), u()()), i & 2 && (Q("formGroup", o.chocoBarForm), _(7), kt("min", o.minimumLines), kt("max", o.maximumLines), _(4), kt("min", o.minimumColumns), kt("max", o.maximumColumns), _(3), Q("formGroup", o.chocoSquareForm), _(7), kt("max", o.settingsService.getNbColumns() - 1), _(4), kt("max", o.settingsService.getNbLines() - 1), _(5), B(30, o.settingsService.getIsPoisonedSquarePositioned() ? 30 : 31), _(2), Q("formGroup", o.playersForm))
    },
    dependencies: [gr, ur, Ye, qi, rr, ar, Zi, Xi, $i, ce, Ro, Te, yr, xr, _i, Ae, wr, _r, fe, Wi],
    styles: ["html[_ngcontent-%COMP%], body[_ngcontent-%COMP%]{height:100%;width:100%;margin:0;font-family:Comfortaa,sans-serif}h1[_ngcontent-%COMP%], h2[_ngcontent-%COMP%]{text-align:center;cursor:default;-webkit-user-select:none;user-select:none;margin-top:0;color:#88572e}h1[_ngcontent-%COMP%]{font-family:Homemade Apple,Comfortaa,cursive!important;width:100%;margin:10px 0 0;font-size:3em}p[_ngcontent-%COMP%], h2[_ngcontent-%COMP%], h3[_ngcontent-%COMP%], h4[_ngcontent-%COMP%], mat-label[_ngcontent-%COMP%], input[_ngcontent-%COMP%], button[_ngcontent-%COMP%]{font-family:Comfortaa,sans-serif!important}form[_ngcontent-%COMP%]{display:flex;flex-direction:column;justify-content:center;width:100%;margin-bottom:5%}form[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{width:100%;text-align:center}form[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]{background-color:#88572e!important}form[_ngcontent-%COMP%]   .redBackground[_ngcontent-%COMP%]{background-color:#d33131!important}form[_ngcontent-%COMP%]   .input-container[_ngcontent-%COMP%]{display:flex;justify-content:space-between;width:100%}form[_ngcontent-%COMP%]   .input-container[_ngcontent-%COMP%]   mat-form-field[_ngcontent-%COMP%]{width:49%}"]
  });
  let n = t;
  return n
})();
var Er = (() => {
  let t = class t {
  };
  t.\u0275fac = function (i) {
    return new (i || t)
  }, t.\u0275cmp = T({
    type: t,
    selectors: [["app-root"]],
    standalone: !0,
    features: [V],
    decls: 6,
    vars: 0,
    template: function (i, o) {
      i & 1 && (h(0, "h1"), x(1, "Jeu de la tablette de chocolat empoisonn\xE9e"), u(), h(2, "main"), E(3, "app-rules")(4, "app-game")(5, "app-settings"), u())
    },
    dependencies: [Fn, wo, Cr],
    styles: ["main[_ngcontent-%COMP%]{display:flex;justify-content:space-between;width:100%;flex-wrap:wrap-reverse}main[_ngcontent-%COMP%]   app-rules[_ngcontent-%COMP%], main[_ngcontent-%COMP%]   app-settings[_ngcontent-%COMP%]{margin:10px;min-width:300px}main[_ngcontent-%COMP%]   app-game[_ngcontent-%COMP%], main[_ngcontent-%COMP%]   app-rules[_ngcontent-%COMP%], main[_ngcontent-%COMP%]   app-settings[_ngcontent-%COMP%]{width:30%}"]
  });
  let n = t;
  return n
})();
var Dr = [];
var ad = "@", sd = (() => {
  let t = class t {
    constructor(e, i, o, a, s) {
      this.doc = e, this.delegate = i, this.zone = o, this.animationType = a, this.moduleImpl = s, this._rendererFactoryPromise = null, this.scheduler = F(mn, {optional: !0})
    }

    ngOnDestroy() {
      this._engine?.flush()
    }

    loadImpl() {
      return (this.moduleImpl ?? import("./chunk-NGBXQION.mjs")).catch(i => {
        throw new Vt(5300, !1)
      }).then(({\u0275createEngine: i, \u0275AnimationRendererFactory: o}) => {
        this._engine = i(this.animationType, this.doc, this.scheduler);
        let a = new o(this.delegate, this._engine, this.zone);
        return this.delegate = a, a
      })
    }

    createRenderer(e, i) {
      let o = this.delegate.createRenderer(e, i);
      if (o.\u0275type === 0) return o;
      typeof o.throwOnSyntheticProps == "boolean" && (o.throwOnSyntheticProps = !1);
      let a = new Ki(o);
      return i?.data?.animation && !this._rendererFactoryPromise && (this._rendererFactoryPromise = this.loadImpl()), this._rendererFactoryPromise?.then(s => {
        let d = s.createRenderer(e, i);
        a.use(d)
      }).catch(s => {
        a.use(o)
      }), a
    }

    begin() {
      this.delegate.begin?.()
    }

    end() {
      this.delegate.end?.()
    }

    whenRenderingDone() {
      return this.delegate.whenRenderingDone?.() ?? Promise.resolve()
    }
  };
  t.\u0275fac = function (i) {
    _e()
  }, t.\u0275prov = b({token: t, factory: t.\u0275fac});
  let n = t;
  return n
})(), Ki = class {
  constructor(t) {
    this.delegate = t, this.replay = [], this.\u0275type = 1
  }

  get data() {
    return this.delegate.data
  }

  get destroyNode() {
    return this.delegate.destroyNode
  }

  use(t) {
    if (this.delegate = t, this.replay !== null) {
      for (let r of this.replay) r(t);
      this.replay = null
    }
  }

  destroy() {
    this.replay = null, this.delegate.destroy()
  }

  createElement(t, r) {
    return this.delegate.createElement(t, r)
  }

  createComment(t) {
    return this.delegate.createComment(t)
  }

  createText(t) {
    return this.delegate.createText(t)
  }

  appendChild(t, r) {
    this.delegate.appendChild(t, r)
  }

  insertBefore(t, r, e, i) {
    this.delegate.insertBefore(t, r, e, i)
  }

  removeChild(t, r, e) {
    this.delegate.removeChild(t, r, e)
  }

  selectRootElement(t, r) {
    return this.delegate.selectRootElement(t, r)
  }

  parentNode(t) {
    return this.delegate.parentNode(t)
  }

  nextSibling(t) {
    return this.delegate.nextSibling(t)
  }

  setAttribute(t, r, e, i) {
    this.delegate.setAttribute(t, r, e, i)
  }

  removeAttribute(t, r, e) {
    this.delegate.removeAttribute(t, r, e)
  }

  addClass(t, r) {
    this.delegate.addClass(t, r)
  }

  removeClass(t, r) {
    this.delegate.removeClass(t, r)
  }

  setStyle(t, r, e, i) {
    this.delegate.setStyle(t, r, e, i)
  }

  removeStyle(t, r, e) {
    this.delegate.removeStyle(t, r, e)
  }

  setProperty(t, r, e) {
    this.shouldReplay(r) && this.replay.push(i => i.setProperty(t, r, e)), this.delegate.setProperty(t, r, e)
  }

  setValue(t, r) {
    this.delegate.setValue(t, r)
  }

  listen(t, r, e) {
    return this.shouldReplay(r) && this.replay.push(i => i.listen(t, r, e)), this.delegate.listen(t, r, e)
  }

  shouldReplay(t) {
    return this.replay !== null && t.startsWith(ad)
  }
};

function Qi(n = "animations") {
  return hn("NgAsyncAnimations"), sn([{
    provide: un,
    useFactory: (t, r, e) => new sd(t, r, e, n),
    deps: [I, In, v]
  }, {provide: st, useValue: n === "noop" ? "NoopAnimations" : "BrowserAnimations"}])
}

var kr = {providers: [On(Dr), Sn(), Qi(), Qi()]};
var dd = {providers: [An()]}, Ir = yn(kr, dd);
var ld = () => Mn(Er, Ir), Ou = ld;
export {Ou as a};
