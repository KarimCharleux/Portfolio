import './polyfills.server.mjs';
import {a as Ie, b as gn, d as el} from "./chunk-VVCT4QZE.mjs";

var tl = null;
var wi = 1, nl = Symbol("SIGNAL");

function A(t) {
  let e = tl;
  return tl = t, e
}

var rl = {
  version: 0,
  lastCleanEpoch: 0,
  dirty: !1,
  producerNode: void 0,
  producerLastReadVersion: void 0,
  producerIndexOfThis: void 0,
  nextProducerIndex: 0,
  liveConsumerNode: void 0,
  liveConsumerIndexOfThis: void 0,
  consumerAllowSignalWrites: !1,
  consumerIsAlwaysLive: !1,
  producerMustRecompute: () => !1,
  producerRecomputeValue: () => {
  },
  consumerMarkedDirty: () => {
  },
  consumerOnSignalRead: () => {
  }
};

function Mp(t) {
  if (!(_i(t) && !t.dirty) && !(!t.dirty && t.lastCleanEpoch === wi)) {
    if (!t.producerMustRecompute(t) && !bi(t)) {
      t.dirty = !1, t.lastCleanEpoch = wi;
      return
    }
    t.producerRecomputeValue(t), t.dirty = !1, t.lastCleanEpoch = wi
  }
}

function ol(t) {
  return t && (t.nextProducerIndex = 0), A(t)
}

function il(t, e) {
  if (A(e), !(!t || t.producerNode === void 0 || t.producerIndexOfThis === void 0 || t.producerLastReadVersion === void 0)) {
    if (_i(t)) for (let n = t.nextProducerIndex; n < t.producerNode.length; n++) Ii(t.producerNode[n], t.producerIndexOfThis[n]);
    for (; t.producerNode.length > t.nextProducerIndex;) t.producerNode.pop(), t.producerLastReadVersion.pop(), t.producerIndexOfThis.pop()
  }
}

function bi(t) {
  fr(t);
  for (let e = 0; e < t.producerNode.length; e++) {
    let n = t.producerNode[e], r = t.producerLastReadVersion[e];
    if (r !== n.version || (Mp(n), r !== n.version)) return !0
  }
  return !1
}

function sl(t) {
  if (fr(t), _i(t)) for (let e = 0; e < t.producerNode.length; e++) Ii(t.producerNode[e], t.producerIndexOfThis[e]);
  t.producerNode.length = t.producerLastReadVersion.length = t.producerIndexOfThis.length = 0, t.liveConsumerNode && (t.liveConsumerNode.length = t.liveConsumerIndexOfThis.length = 0)
}

function Ii(t, e) {
  if (Tp(t), fr(t), t.liveConsumerNode.length === 1) for (let r = 0; r < t.producerNode.length; r++) Ii(t.producerNode[r], t.producerIndexOfThis[r]);
  let n = t.liveConsumerNode.length - 1;
  if (t.liveConsumerNode[e] = t.liveConsumerNode[n], t.liveConsumerIndexOfThis[e] = t.liveConsumerIndexOfThis[n], t.liveConsumerNode.length--, t.liveConsumerIndexOfThis.length--, e < t.liveConsumerNode.length) {
    let r = t.liveConsumerIndexOfThis[e], o = t.liveConsumerNode[e];
    fr(o), o.producerIndexOfThis[r] = e
  }
}

function _i(t) {
  return t.consumerIsAlwaysLive || (t?.liveConsumerNode?.length ?? 0) > 0
}

function fr(t) {
  t.producerNode ??= [], t.producerIndexOfThis ??= [], t.producerLastReadVersion ??= []
}

function Tp(t) {
  t.liveConsumerNode ??= [], t.liveConsumerIndexOfThis ??= []
}

function xp() {
  throw new Error
}

var Np = xp;

function al(t) {
  Np = t
}

function w(t) {
  return typeof t == "function"
}

function jt(t) {
  let n = t(r => {
    Error.call(r), r.stack = new Error().stack
  });
  return n.prototype = Object.create(Error.prototype), n.prototype.constructor = n, n
}

var hr = jt(t => function (n) {
  t(this), this.message = n ? `${n.length} errors occurred during unsubscription:
${n.map((r, o) => `${o + 1}) ${r.toString()}`).join(`
  `)}` : "", this.name = "UnsubscriptionError", this.errors = n
});

function gt(t, e) {
  if (t) {
    let n = t.indexOf(e);
    0 <= n && t.splice(n, 1)
  }
}

var K = class t {
  constructor(e) {
    this.initialTeardown = e, this.closed = !1, this._parentage = null, this._finalizers = null
  }

  unsubscribe() {
    let e;
    if (!this.closed) {
      this.closed = !0;
      let {_parentage: n} = this;
      if (n) if (this._parentage = null, Array.isArray(n)) for (let i of n) i.remove(this); else n.remove(this);
      let {initialTeardown: r} = this;
      if (w(r)) try {
        r()
      } catch (i) {
        e = i instanceof hr ? i.errors : [i]
      }
      let {_finalizers: o} = this;
      if (o) {
        this._finalizers = null;
        for (let i of o) try {
          ul(i)
        } catch (s) {
          e = e ?? [], s instanceof hr ? e = [...e, ...s.errors] : e.push(s)
        }
      }
      if (e) throw new hr(e)
    }
  }

  add(e) {
    var n;
    if (e && e !== this) if (this.closed) ul(e); else {
      if (e instanceof t) {
        if (e.closed || e._hasParent(this)) return;
        e._addParent(this)
      }
      (this._finalizers = (n = this._finalizers) !== null && n !== void 0 ? n : []).push(e)
    }
  }

  _hasParent(e) {
    let {_parentage: n} = this;
    return n === e || Array.isArray(n) && n.includes(e)
  }

  _addParent(e) {
    let {_parentage: n} = this;
    this._parentage = Array.isArray(n) ? (n.push(e), n) : n ? [n, e] : e
  }

  _removeParent(e) {
    let {_parentage: n} = this;
    n === e ? this._parentage = null : Array.isArray(n) && gt(n, e)
  }

  remove(e) {
    let {_finalizers: n} = this;
    n && gt(n, e), e instanceof t && e._removeParent(this)
  }
};
K.EMPTY = (() => {
  let t = new K;
  return t.closed = !0, t
})();
var Ci = K.EMPTY;

function pr(t) {
  return t instanceof K || t && "closed" in t && w(t.remove) && w(t.add) && w(t.unsubscribe)
}

function ul(t) {
  w(t) ? t() : t.unsubscribe()
}

var Me = {
  onUnhandledError: null,
  onStoppedNotification: null,
  Promise: void 0,
  useDeprecatedSynchronousErrorHandling: !1,
  useDeprecatedNextContext: !1
};
var Vt = {
  setTimeout(t, e, ...n) {
    let {delegate: r} = Vt;
    return r?.setTimeout ? r.setTimeout(t, e, ...n) : setTimeout(t, e, ...n)
  }, clearTimeout(t) {
    let {delegate: e} = Vt;
    return (e?.clearTimeout || clearTimeout)(t)
  }, delegate: void 0
};

function mr(t) {
  Vt.setTimeout(() => {
    let {onUnhandledError: e} = Me;
    if (e) e(t); else throw t
  })
}

function yn() {
}

var ll = Si("C", void 0, void 0);

function cl(t) {
  return Si("E", void 0, t)
}

function dl(t) {
  return Si("N", t, void 0)
}

function Si(t, e, n) {
  return {kind: t, value: e, error: n}
}

var yt = null;

function Bt(t) {
  if (Me.useDeprecatedSynchronousErrorHandling) {
    let e = !yt;
    if (e && (yt = {errorThrown: !1, error: null}), t(), e) {
      let {errorThrown: n, error: r} = yt;
      if (yt = null, n) throw r
    }
  } else t()
}

function fl(t) {
  Me.useDeprecatedSynchronousErrorHandling && yt && (yt.errorThrown = !0, yt.error = t)
}

var vt = class extends K {
  constructor(e) {
    super(), this.isStopped = !1, e ? (this.destination = e, pr(e) && e.add(this)) : this.destination = Fp
  }

  static create(e, n, r) {
    return new qe(e, n, r)
  }

  next(e) {
    this.isStopped ? Ti(dl(e), this) : this._next(e)
  }

  error(e) {
    this.isStopped ? Ti(cl(e), this) : (this.isStopped = !0, this._error(e))
  }

  complete() {
    this.isStopped ? Ti(ll, this) : (this.isStopped = !0, this._complete())
  }

  unsubscribe() {
    this.closed || (this.isStopped = !0, super.unsubscribe(), this.destination = null)
  }

  _next(e) {
    this.destination.next(e)
  }

  _error(e) {
    try {
      this.destination.error(e)
    } finally {
      this.unsubscribe()
    }
  }

  _complete() {
    try {
      this.destination.complete()
    } finally {
      this.unsubscribe()
    }
  }
}, Ap = Function.prototype.bind;

function Mi(t, e) {
  return Ap.call(t, e)
}

var xi = class {
  constructor(e) {
    this.partialObserver = e
  }

  next(e) {
    let {partialObserver: n} = this;
    if (n.next) try {
      n.next(e)
    } catch (r) {
      gr(r)
    }
  }

  error(e) {
    let {partialObserver: n} = this;
    if (n.error) try {
      n.error(e)
    } catch (r) {
      gr(r)
    } else gr(e)
  }

  complete() {
    let {partialObserver: e} = this;
    if (e.complete) try {
      e.complete()
    } catch (n) {
      gr(n)
    }
  }
}, qe = class extends vt {
  constructor(e, n, r) {
    super();
    let o;
    if (w(e) || !e) o = {next: e ?? void 0, error: n ?? void 0, complete: r ?? void 0}; else {
      let i;
      this && Me.useDeprecatedNextContext ? (i = Object.create(e), i.unsubscribe = () => this.unsubscribe(), o = {
        next: e.next && Mi(e.next, i),
        error: e.error && Mi(e.error, i),
        complete: e.complete && Mi(e.complete, i)
      }) : o = e
    }
    this.destination = new xi(o)
  }
};

function gr(t) {
  Me.useDeprecatedSynchronousErrorHandling ? fl(t) : mr(t)
}

function Op(t) {
  throw t
}

function Ti(t, e) {
  let {onStoppedNotification: n} = Me;
  n && Vt.setTimeout(() => n(t, e))
}

var Fp = {closed: !0, next: yn, error: Op, complete: yn};
var $t = typeof Symbol == "function" && Symbol.observable || "@@observable";

function se(t) {
  return t
}

function Pp(...t) {
  return Ni(t)
}

function Ni(t) {
  return t.length === 0 ? se : t.length === 1 ? t[0] : function (n) {
    return t.reduce((r, o) => o(r), n)
  }
}

var O = (() => {
  class t {
    constructor(n) {
      n && (this._subscribe = n)
    }

    lift(n) {
      let r = new t;
      return r.source = this, r.operator = n, r
    }

    subscribe(n, r, o) {
      let i = kp(n) ? n : new qe(n, r, o);
      return Bt(() => {
        let {operator: s, source: a} = this;
        i.add(s ? s.call(i, a) : a ? this._subscribe(i) : this._trySubscribe(i))
      }), i
    }

    _trySubscribe(n) {
      try {
        return this._subscribe(n)
      } catch (r) {
        n.error(r)
      }
    }

    forEach(n, r) {
      return r = hl(r), new r((o, i) => {
        let s = new qe({
          next: a => {
            try {
              n(a)
            } catch (u) {
              i(u), s.unsubscribe()
            }
          }, error: i, complete: o
        });
        this.subscribe(s)
      })
    }

    _subscribe(n) {
      var r;
      return (r = this.source) === null || r === void 0 ? void 0 : r.subscribe(n)
    }

    [$t]() {
      return this
    }

    pipe(...n) {
      return Ni(n)(this)
    }

    toPromise(n) {
      return n = hl(n), new n((r, o) => {
        let i;
        this.subscribe(s => i = s, s => o(s), () => r(i))
      })
    }
  }

  return t.create = e => new t(e), t
})();

function hl(t) {
  var e;
  return (e = t ?? Me.Promise) !== null && e !== void 0 ? e : Promise
}

function Rp(t) {
  return t && w(t.next) && w(t.error) && w(t.complete)
}

function kp(t) {
  return t && t instanceof vt || Rp(t) && pr(t)
}

function Ai(t) {
  return w(t?.lift)
}

function S(t) {
  return e => {
    if (Ai(e)) return e.lift(function (n) {
      try {
        return t(n, this)
      } catch (r) {
        this.error(r)
      }
    });
    throw new TypeError("Unable to lift unknown Observable type")
  }
}

function C(t, e, n, r, o) {
  return new Oi(t, e, n, r, o)
}

var Oi = class extends vt {
  constructor(e, n, r, o, i, s) {
    super(e), this.onFinalize = i, this.shouldUnsubscribe = s, this._next = n ? function (a) {
      try {
        n(a)
      } catch (u) {
        e.error(u)
      }
    } : super._next, this._error = o ? function (a) {
      try {
        o(a)
      } catch (u) {
        e.error(u)
      } finally {
        this.unsubscribe()
      }
    } : super._error, this._complete = r ? function () {
      try {
        r()
      } catch (a) {
        e.error(a)
      } finally {
        this.unsubscribe()
      }
    } : super._complete
  }

  unsubscribe() {
    var e;
    if (!this.shouldUnsubscribe || this.shouldUnsubscribe()) {
      let {closed: n} = this;
      super.unsubscribe(), !n && ((e = this.onFinalize) === null || e === void 0 || e.call(this))
    }
  }
};

function Fi() {
  return S((t, e) => {
    let n = null;
    t._refCount++;
    let r = C(e, void 0, void 0, void 0, () => {
      if (!t || t._refCount <= 0 || 0 < --t._refCount) {
        n = null;
        return
      }
      let o = t._connection, i = n;
      n = null, o && (!i || o === i) && o.unsubscribe(), e.unsubscribe()
    });
    t.subscribe(r), r.closed || (n = t.connect())
  })
}

var Pi = class extends O {
  constructor(e, n) {
    super(), this.source = e, this.subjectFactory = n, this._subject = null, this._refCount = 0, this._connection = null, Ai(e) && (this.lift = e.lift)
  }

  _subscribe(e) {
    return this.getSubject().subscribe(e)
  }

  getSubject() {
    let e = this._subject;
    return (!e || e.isStopped) && (this._subject = this.subjectFactory()), this._subject
  }

  _teardown() {
    this._refCount = 0;
    let {_connection: e} = this;
    this._subject = this._connection = null, e?.unsubscribe()
  }

  connect() {
    let e = this._connection;
    if (!e) {
      e = this._connection = new K;
      let n = this.getSubject();
      e.add(this.source.subscribe(C(n, void 0, () => {
        this._teardown(), n.complete()
      }, r => {
        this._teardown(), n.error(r)
      }, () => this._teardown()))), e.closed && (this._connection = null, e = K.EMPTY)
    }
    return e
  }

  refCount() {
    return Fi()(this)
  }
};
var pl = jt(t => function () {
  t(this), this.name = "ObjectUnsubscribedError", this.message = "object unsubscribed"
});
var _e = (() => {
  class t extends O {
    constructor() {
      super(), this.closed = !1, this.currentObservers = null, this.observers = [], this.isStopped = !1, this.hasError = !1, this.thrownError = null
    }

    get observed() {
      var n;
      return ((n = this.observers) === null || n === void 0 ? void 0 : n.length) > 0
    }

    lift(n) {
      let r = new yr(this, this);
      return r.operator = n, r
    }

    _throwIfClosed() {
      if (this.closed) throw new pl
    }

    next(n) {
      Bt(() => {
        if (this._throwIfClosed(), !this.isStopped) {
          this.currentObservers || (this.currentObservers = Array.from(this.observers));
          for (let r of this.currentObservers) r.next(n)
        }
      })
    }

    error(n) {
      Bt(() => {
        if (this._throwIfClosed(), !this.isStopped) {
          this.hasError = this.isStopped = !0, this.thrownError = n;
          let {observers: r} = this;
          for (; r.length;) r.shift().error(n)
        }
      })
    }

    complete() {
      Bt(() => {
        if (this._throwIfClosed(), !this.isStopped) {
          this.isStopped = !0;
          let {observers: n} = this;
          for (; n.length;) n.shift().complete()
        }
      })
    }

    unsubscribe() {
      this.isStopped = this.closed = !0, this.observers = this.currentObservers = null
    }

    _trySubscribe(n) {
      return this._throwIfClosed(), super._trySubscribe(n)
    }

    _subscribe(n) {
      return this._throwIfClosed(), this._checkFinalizedStatuses(n), this._innerSubscribe(n)
    }

    _innerSubscribe(n) {
      let {hasError: r, isStopped: o, observers: i} = this;
      return r || o ? Ci : (this.currentObservers = null, i.push(n), new K(() => {
        this.currentObservers = null, gt(i, n)
      }))
    }

    _checkFinalizedStatuses(n) {
      let {hasError: r, thrownError: o, isStopped: i} = this;
      r ? n.error(o) : i && n.complete()
    }

    asObservable() {
      let n = new O;
      return n.source = this, n
    }
  }

  return t.create = (e, n) => new yr(e, n), t
})(), yr = class extends _e {
  constructor(e, n) {
    super(), this.destination = e, this.source = n
  }

  next(e) {
    var n, r;
    (r = (n = this.destination) === null || n === void 0 ? void 0 : n.next) === null || r === void 0 || r.call(n, e)
  }

  error(e) {
    var n, r;
    (r = (n = this.destination) === null || n === void 0 ? void 0 : n.error) === null || r === void 0 || r.call(n, e)
  }

  complete() {
    var e, n;
    (n = (e = this.destination) === null || e === void 0 ? void 0 : e.complete) === null || n === void 0 || n.call(e)
  }

  _subscribe(e) {
    var n, r;
    return (r = (n = this.source) === null || n === void 0 ? void 0 : n.subscribe(e)) !== null && r !== void 0 ? r : Ci
  }
};
var vn = class extends _e {
  constructor(e) {
    super(), this._value = e
  }

  get value() {
    return this.getValue()
  }

  _subscribe(e) {
    let n = super._subscribe(e);
    return !n.closed && e.next(this._value), n
  }

  getValue() {
    let {hasError: e, thrownError: n, _value: r} = this;
    if (e) throw n;
    return this._throwIfClosed(), r
  }

  next(e) {
    super.next(this._value = e)
  }
};
var Dn = {
  now() {
    return (Dn.delegate || Date).now()
  }, delegate: void 0
};
var vr = class extends _e {
  constructor(e = 1 / 0, n = 1 / 0, r = Dn) {
    super(), this._bufferSize = e, this._windowTime = n, this._timestampProvider = r, this._buffer = [], this._infiniteTimeWindow = !0, this._infiniteTimeWindow = n === 1 / 0, this._bufferSize = Math.max(1, e), this._windowTime = Math.max(1, n)
  }

  next(e) {
    let {isStopped: n, _buffer: r, _infiniteTimeWindow: o, _timestampProvider: i, _windowTime: s} = this;
    n || (r.push(e), !o && r.push(i.now() + s)), this._trimBuffer(), super.next(e)
  }

  _subscribe(e) {
    this._throwIfClosed(), this._trimBuffer();
    let n = this._innerSubscribe(e), {_infiniteTimeWindow: r, _buffer: o} = this, i = o.slice();
    for (let s = 0; s < i.length && !e.closed; s += r ? 1 : 2) e.next(i[s]);
    return this._checkFinalizedStatuses(e), n
  }

  _trimBuffer() {
    let {_bufferSize: e, _timestampProvider: n, _buffer: r, _infiniteTimeWindow: o} = this, i = (o ? 1 : 2) * e;
    if (e < 1 / 0 && i < r.length && r.splice(0, r.length - i), !o) {
      let s = n.now(), a = 0;
      for (let u = 1; u < r.length && r[u] <= s; u += 2) a = u;
      a && r.splice(0, a + 1)
    }
  }
};
var Dr = class extends K {
  constructor(e, n) {
    super()
  }

  schedule(e, n = 0) {
    return this
  }
};
var En = {
  setInterval(t, e, ...n) {
    let {delegate: r} = En;
    return r?.setInterval ? r.setInterval(t, e, ...n) : setInterval(t, e, ...n)
  }, clearInterval(t) {
    let {delegate: e} = En;
    return (e?.clearInterval || clearInterval)(t)
  }, delegate: void 0
};
var Er = class extends Dr {
  constructor(e, n) {
    super(e, n), this.scheduler = e, this.work = n, this.pending = !1
  }

  schedule(e, n = 0) {
    var r;
    if (this.closed) return this;
    this.state = e;
    let o = this.id, i = this.scheduler;
    return o != null && (this.id = this.recycleAsyncId(i, o, n)), this.pending = !0, this.delay = n, this.id = (r = this.id) !== null && r !== void 0 ? r : this.requestAsyncId(i, this.id, n), this
  }

  requestAsyncId(e, n, r = 0) {
    return En.setInterval(e.flush.bind(e, this), r)
  }

  recycleAsyncId(e, n, r = 0) {
    if (r != null && this.delay === r && this.pending === !1) return n;
    n != null && En.clearInterval(n)
  }

  execute(e, n) {
    if (this.closed) return new Error("executing a cancelled action");
    this.pending = !1;
    let r = this._execute(e, n);
    if (r) return r;
    this.pending === !1 && this.id != null && (this.id = this.recycleAsyncId(this.scheduler, this.id, null))
  }

  _execute(e, n) {
    let r = !1, o;
    try {
      this.work(e)
    } catch (i) {
      r = !0, o = i || new Error("Scheduled action threw falsy error")
    }
    if (r) return this.unsubscribe(), o
  }

  unsubscribe() {
    if (!this.closed) {
      let {id: e, scheduler: n} = this, {actions: r} = n;
      this.work = this.state = this.scheduler = null, this.pending = !1, gt(r, this), e != null && (this.id = this.recycleAsyncId(n, e, null)), this.delay = null, super.unsubscribe()
    }
  }
};
var Ht = class t {
  constructor(e, n = t.now) {
    this.schedulerActionCtor = e, this.now = n
  }

  schedule(e, n = 0, r) {
    return new this.schedulerActionCtor(this, e).schedule(r, n)
  }
};
Ht.now = Dn.now;
var wr = class extends Ht {
  constructor(e, n = Ht.now) {
    super(e, n), this.actions = [], this._active = !1
  }

  flush(e) {
    let {actions: n} = this;
    if (this._active) {
      n.push(e);
      return
    }
    let r;
    this._active = !0;
    do if (r = e.execute(e.state, e.delay)) break; while (e = n.shift());
    if (this._active = !1, r) {
      for (; e = n.shift();) e.unsubscribe();
      throw r
    }
  }
};
var wn = new wr(Er), ml = wn;
var Dt = new O(t => t.complete());

function br(t) {
  return t && w(t.schedule)
}

function Ri(t) {
  return t[t.length - 1]
}

function Ir(t) {
  return w(Ri(t)) ? t.pop() : void 0
}

function Le(t) {
  return br(Ri(t)) ? t.pop() : void 0
}

function gl(t, e) {
  return typeof Ri(t) == "number" ? t.pop() : e
}

function vl(t, e, n, r) {
  function o(i) {
    return i instanceof n ? i : new n(function (s) {
      s(i)
    })
  }

  return new (n || (n = Promise))(function (i, s) {
    function a(c) {
      try {
        l(r.next(c))
      } catch (d) {
        s(d)
      }
    }

    function u(c) {
      try {
        l(r.throw(c))
      } catch (d) {
        s(d)
      }
    }

    function l(c) {
      c.done ? i(c.value) : o(c.value).then(a, u)
    }

    l((r = r.apply(t, e || [])).next())
  })
}

function yl(t) {
  var e = typeof Symbol == "function" && Symbol.iterator, n = e && t[e], r = 0;
  if (n) return n.call(t);
  if (t && typeof t.length == "number") return {
    next: function () {
      return t && r >= t.length && (t = void 0), {value: t && t[r++], done: !t}
    }
  };
  throw new TypeError(e ? "Object is not iterable." : "Symbol.iterator is not defined.")
}

function Et(t) {
  return this instanceof Et ? (this.v = t, this) : new Et(t)
}

function Dl(t, e, n) {
  if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
  var r = n.apply(t, e || []), o, i = [];
  return o = {}, s("next"), s("throw"), s("return"), o[Symbol.asyncIterator] = function () {
    return this
  }, o;

  function s(f) {
    r[f] && (o[f] = function (h) {
      return new Promise(function (p, m) {
        i.push([f, h, p, m]) > 1 || a(f, h)
      })
    })
  }

  function a(f, h) {
    try {
      u(r[f](h))
    } catch (p) {
      d(i[0][3], p)
    }
  }

  function u(f) {
    f.value instanceof Et ? Promise.resolve(f.value.v).then(l, c) : d(i[0][2], f)
  }

  function l(f) {
    a("next", f)
  }

  function c(f) {
    a("throw", f)
  }

  function d(f, h) {
    f(h), i.shift(), i.length && a(i[0][0], i[0][1])
  }
}

function El(t) {
  if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
  var e = t[Symbol.asyncIterator], n;
  return e ? e.call(t) : (t = typeof yl == "function" ? yl(t) : t[Symbol.iterator](), n = {}, r("next"), r("throw"), r("return"), n[Symbol.asyncIterator] = function () {
    return this
  }, n);

  function r(i) {
    n[i] = t[i] && function (s) {
      return new Promise(function (a, u) {
        s = t[i](s), o(a, u, s.done, s.value)
      })
    }
  }

  function o(i, s, a, u) {
    Promise.resolve(u).then(function (l) {
      i({value: l, done: a})
    }, s)
  }
}

var Ut = t => t && typeof t.length == "number" && typeof t != "function";

function _r(t) {
  return w(t?.then)
}

function Cr(t) {
  return w(t[$t])
}

function Sr(t) {
  return Symbol.asyncIterator && w(t?.[Symbol.asyncIterator])
}

function Mr(t) {
  return new TypeError(`You provided ${t !== null && typeof t == "object" ? "an invalid object" : `'${t}'`} where a stream was expected. You can provide an Observable, Promise, ReadableStream, Array, AsyncIterable, or Iterable.`)
}

function Lp() {
  return typeof Symbol != "function" || !Symbol.iterator ? "@@iterator" : Symbol.iterator
}

var Tr = Lp();

function xr(t) {
  return w(t?.[Tr])
}

function Nr(t) {
  return Dl(this, arguments, function* () {
    let n = t.getReader();
    try {
      for (; ;) {
        let {value: r, done: o} = yield Et(n.read());
        if (o) return yield Et(void 0);
        yield yield Et(r)
      }
    } finally {
      n.releaseLock()
    }
  })
}

function Ar(t) {
  return w(t?.getReader)
}

function V(t) {
  if (t instanceof O) return t;
  if (t != null) {
    if (Cr(t)) return jp(t);
    if (Ut(t)) return Vp(t);
    if (_r(t)) return Bp(t);
    if (Sr(t)) return wl(t);
    if (xr(t)) return $p(t);
    if (Ar(t)) return Hp(t)
  }
  throw Mr(t)
}

function jp(t) {
  return new O(e => {
    let n = t[$t]();
    if (w(n.subscribe)) return n.subscribe(e);
    throw new TypeError("Provided object does not correctly implement Symbol.observable")
  })
}

function Vp(t) {
  return new O(e => {
    for (let n = 0; n < t.length && !e.closed; n++) e.next(t[n]);
    e.complete()
  })
}

function Bp(t) {
  return new O(e => {
    t.then(n => {
      e.closed || (e.next(n), e.complete())
    }, n => e.error(n)).then(null, mr)
  })
}

function $p(t) {
  return new O(e => {
    for (let n of t) if (e.next(n), e.closed) return;
    e.complete()
  })
}

function wl(t) {
  return new O(e => {
    Up(t, e).catch(n => e.error(n))
  })
}

function Hp(t) {
  return wl(Nr(t))
}

function Up(t, e) {
  var n, r, o, i;
  return vl(this, void 0, void 0, function* () {
    try {
      for (n = El(t); r = yield n.next(), !r.done;) {
        let s = r.value;
        if (e.next(s), e.closed) return
      }
    } catch (s) {
      o = {error: s}
    } finally {
      try {
        r && !r.done && (i = n.return) && (yield i.call(n))
      } finally {
        if (o) throw o.error
      }
    }
    e.complete()
  })
}

function ce(t, e, n, r = 0, o = !1) {
  let i = e.schedule(function () {
    n(), o ? t.add(this.schedule(null, r)) : this.unsubscribe()
  }, r);
  if (t.add(i), !o) return i
}

function Or(t, e = 0) {
  return S((n, r) => {
    n.subscribe(C(r, o => ce(r, t, () => r.next(o), e), () => ce(r, t, () => r.complete(), e), o => ce(r, t, () => r.error(o), e)))
  })
}

function Fr(t, e = 0) {
  return S((n, r) => {
    r.add(t.schedule(() => n.subscribe(r), e))
  })
}

function bl(t, e) {
  return V(t).pipe(Fr(e), Or(e))
}

function Il(t, e) {
  return V(t).pipe(Fr(e), Or(e))
}

function _l(t, e) {
  return new O(n => {
    let r = 0;
    return e.schedule(function () {
      r === t.length ? n.complete() : (n.next(t[r++]), n.closed || this.schedule())
    })
  })
}

function Cl(t, e) {
  return new O(n => {
    let r;
    return ce(n, e, () => {
      r = t[Tr](), ce(n, e, () => {
        let o, i;
        try {
          ({value: o, done: i} = r.next())
        } catch (s) {
          n.error(s);
          return
        }
        i ? n.complete() : n.next(o)
      }, 0, !0)
    }), () => w(r?.return) && r.return()
  })
}

function Pr(t, e) {
  if (!t) throw new Error("Iterable cannot be null");
  return new O(n => {
    ce(n, e, () => {
      let r = t[Symbol.asyncIterator]();
      ce(n, e, () => {
        r.next().then(o => {
          o.done ? n.complete() : n.next(o.value)
        })
      }, 0, !0)
    })
  })
}

function Sl(t, e) {
  return Pr(Nr(t), e)
}

function Ml(t, e) {
  if (t != null) {
    if (Cr(t)) return bl(t, e);
    if (Ut(t)) return _l(t, e);
    if (_r(t)) return Il(t, e);
    if (Sr(t)) return Pr(t, e);
    if (xr(t)) return Cl(t, e);
    if (Ar(t)) return Sl(t, e)
  }
  throw Mr(t)
}

function je(t, e) {
  return e ? Ml(t, e) : V(t)
}

function zp(...t) {
  let e = Le(t);
  return je(t, e)
}

function qp(t, e) {
  let n = w(t) ? t : () => t, r = o => o.error(n());
  return new O(e ? o => e.schedule(r, 0, o) : r)
}

function Gp(t) {
  return !!t && (t instanceof O || w(t.lift) && w(t.subscribe))
}

var wt = jt(t => function () {
  t(this), this.name = "EmptyError", this.message = "no elements in sequence"
});

function Tl(t) {
  return t instanceof Date && !isNaN(t)
}

function Ge(t, e) {
  return S((n, r) => {
    let o = 0;
    n.subscribe(C(r, i => {
      r.next(t.call(e, i, o++))
    }))
  })
}

var {isArray: Wp} = Array;

function Qp(t, e) {
  return Wp(e) ? t(...e) : t(e)
}

function zt(t) {
  return Ge(e => Qp(t, e))
}

var {isArray: Kp} = Array, {getPrototypeOf: Yp, prototype: Zp, keys: Jp} = Object;

function Rr(t) {
  if (t.length === 1) {
    let e = t[0];
    if (Kp(e)) return {args: e, keys: null};
    if (Xp(e)) {
      let n = Jp(e);
      return {args: n.map(r => e[r]), keys: n}
    }
  }
  return {args: t, keys: null}
}

function Xp(t) {
  return t && typeof t == "object" && Yp(t) === Zp
}

function kr(t, e) {
  return t.reduce((n, r, o) => (n[r] = e[o], n), {})
}

function em(...t) {
  let e = Le(t), n = Ir(t), {args: r, keys: o} = Rr(t);
  if (r.length === 0) return je([], e);
  let i = new O(tm(r, e, o ? s => kr(o, s) : se));
  return n ? i.pipe(zt(n)) : i
}

function tm(t, e, n = se) {
  return r => {
    xl(e, () => {
      let {length: o} = t, i = new Array(o), s = o, a = o;
      for (let u = 0; u < o; u++) xl(e, () => {
        let l = je(t[u], e), c = !1;
        l.subscribe(C(r, d => {
          i[u] = d, c || (c = !0, a--), a || r.next(n(i.slice()))
        }, () => {
          --s || r.complete()
        }))
      }, r)
    }, r)
  }
}

function xl(t, e, n) {
  t ? ce(n, t, e) : e()
}

function Nl(t, e, n, r, o, i, s, a) {
  let u = [], l = 0, c = 0, d = !1, f = () => {
    d && !u.length && !l && e.complete()
  }, h = m => l < r ? p(m) : u.push(m), p = m => {
    i && e.next(m), l++;
    let D = !1;
    V(n(m, c++)).subscribe(C(e, E => {
      o?.(E), i ? h(E) : e.next(E)
    }, () => {
      D = !0
    }, void 0, () => {
      if (D) try {
        for (l--; u.length && l < r;) {
          let E = u.shift();
          s ? ce(e, s, () => p(E)) : p(E)
        }
        f()
      } catch (E) {
        e.error(E)
      }
    }))
  };
  return t.subscribe(C(e, h, () => {
    d = !0, f()
  })), () => {
    a?.()
  }
}

function We(t, e, n = 1 / 0) {
  return w(e) ? We((r, o) => Ge((i, s) => e(r, i, o, s))(V(t(r, o))), n) : (typeof e == "number" && (n = e), S((r, o) => Nl(r, o, t, n)))
}

function Lr(t = 1 / 0) {
  return We(se, t)
}

function Al() {
  return Lr(1)
}

function jr(...t) {
  return Al()(je(t, Le(t)))
}

function nm(t) {
  return new O(e => {
    V(t()).subscribe(e)
  })
}

function rm(...t) {
  let e = Ir(t), {args: n, keys: r} = Rr(t), o = new O(i => {
    let {length: s} = n;
    if (!s) {
      i.complete();
      return
    }
    let a = new Array(s), u = s, l = s;
    for (let c = 0; c < s; c++) {
      let d = !1;
      V(n[c]).subscribe(C(i, f => {
        d || (d = !0, l--), a[c] = f
      }, () => u--, void 0, () => {
        (!u || !d) && (l || i.next(r ? kr(r, a) : a), i.complete())
      }))
    }
  });
  return e ? o.pipe(zt(e)) : o
}

var om = ["addListener", "removeListener"], im = ["addEventListener", "removeEventListener"], sm = ["on", "off"];

function ki(t, e, n, r) {
  if (w(n) && (r = n, n = void 0), r) return ki(t, e, n).pipe(zt(r));
  let [o, i] = lm(t) ? im.map(s => a => t[s](e, a, n)) : am(t) ? om.map(Ol(t, e)) : um(t) ? sm.map(Ol(t, e)) : [];
  if (!o && Ut(t)) return We(s => ki(s, e, n))(V(t));
  if (!o) throw new TypeError("Invalid event target");
  return new O(s => {
    let a = (...u) => s.next(1 < u.length ? u : u[0]);
    return o(a), () => i(a)
  })
}

function Ol(t, e) {
  return n => r => t[n](e, r)
}

function am(t) {
  return w(t.addListener) && w(t.removeListener)
}

function um(t) {
  return w(t.on) && w(t.off)
}

function lm(t) {
  return w(t.addEventListener) && w(t.removeEventListener)
}

function Fl(t = 0, e, n = ml) {
  let r = -1;
  return e != null && (br(e) ? n = e : r = e), new O(o => {
    let i = Tl(t) ? +t - n.now() : t;
    i < 0 && (i = 0);
    let s = 0;
    return n.schedule(function () {
      o.closed || (o.next(s++), 0 <= r ? this.schedule(void 0, r) : o.complete())
    }, i)
  })
}

function cm(...t) {
  let e = Le(t), n = gl(t, 1 / 0), r = t;
  return r.length ? r.length === 1 ? V(r[0]) : Lr(n)(je(r, e)) : Dt
}

function bt(t, e) {
  return S((n, r) => {
    let o = 0;
    n.subscribe(C(r, i => t.call(e, i, o++) && r.next(i)))
  })
}

function Pl(t) {
  return S((e, n) => {
    let r = !1, o = null, i = null, s = !1, a = () => {
      if (i?.unsubscribe(), i = null, r) {
        r = !1;
        let l = o;
        o = null, n.next(l)
      }
      s && n.complete()
    }, u = () => {
      i = null, s && n.complete()
    };
    e.subscribe(C(n, l => {
      r = !0, o = l, i || V(t(l)).subscribe(i = C(n, a, u))
    }, () => {
      s = !0, (!r || !i || i.closed) && n.complete()
    }))
  })
}

function dm(t, e = wn) {
  return Pl(() => Fl(t, e))
}

function Rl(t) {
  return S((e, n) => {
    let r = null, o = !1, i;
    r = e.subscribe(C(n, void 0, void 0, s => {
      i = V(t(s, Rl(t)(e))), r ? (r.unsubscribe(), r = null, i.subscribe(n)) : o = !0
    })), o && (r.unsubscribe(), r = null, i.subscribe(n))
  })
}

function kl(t, e, n, r, o) {
  return (i, s) => {
    let a = n, u = e, l = 0;
    i.subscribe(C(s, c => {
      let d = l++;
      u = a ? t(u, c, d) : (a = !0, c), r && s.next(u)
    }, o && (() => {
      a && s.next(u), s.complete()
    })))
  }
}

function fm(t, e) {
  return w(e) ? We(t, e, 1) : We(t, 1)
}

function hm(t, e = wn) {
  return S((n, r) => {
    let o = null, i = null, s = null, a = () => {
      if (o) {
        o.unsubscribe(), o = null;
        let l = i;
        i = null, r.next(l)
      }
    };

    function u() {
      let l = s + t, c = e.now();
      if (c < l) {
        o = this.schedule(void 0, l - c), r.add(o);
        return
      }
      a()
    }

    n.subscribe(C(r, l => {
      i = l, s = e.now(), o || (o = e.schedule(u, t), r.add(o))
    }, () => {
      a(), r.complete()
    }, void 0, () => {
      i = o = null
    }))
  })
}

function bn(t) {
  return S((e, n) => {
    let r = !1;
    e.subscribe(C(n, o => {
      r = !0, n.next(o)
    }, () => {
      r || n.next(t), n.complete()
    }))
  })
}

function Li(t) {
  return t <= 0 ? () => Dt : S((e, n) => {
    let r = 0;
    e.subscribe(C(n, o => {
      ++r <= t && (n.next(o), t <= r && n.complete())
    }))
  })
}

function pm(t) {
  return Ge(() => t)
}

function mm(t, e = se) {
  return t = t ?? gm, S((n, r) => {
    let o, i = !0;
    n.subscribe(C(r, s => {
      let a = e(s);
      (i || !t(o, a)) && (i = !1, o = a, r.next(s))
    }))
  })
}

function gm(t, e) {
  return t === e
}

function Vr(t = ym) {
  return S((e, n) => {
    let r = !1;
    e.subscribe(C(n, o => {
      r = !0, n.next(o)
    }, () => r ? n.complete() : n.error(t())))
  })
}

function ym() {
  return new wt
}

function vm(t) {
  return S((e, n) => {
    try {
      e.subscribe(n)
    } finally {
      n.add(t)
    }
  })
}

function ji(t, e) {
  let n = arguments.length >= 2;
  return r => r.pipe(t ? bt((o, i) => t(o, i, r)) : se, Li(1), n ? bn(e) : Vr(() => new wt))
}

function Vi(t) {
  return t <= 0 ? () => Dt : S((e, n) => {
    let r = [];
    e.subscribe(C(n, o => {
      r.push(o), t < r.length && r.shift()
    }, () => {
      for (let o of r) n.next(o);
      n.complete()
    }, void 0, () => {
      r = null
    }))
  })
}

function Dm(t, e) {
  let n = arguments.length >= 2;
  return r => r.pipe(t ? bt((o, i) => t(o, i, r)) : se, Vi(1), n ? bn(e) : Vr(() => new wt))
}

function Em(t, e) {
  return S(kl(t, e, arguments.length >= 2, !0))
}

function Ll(t = {}) {
  let {connector: e = () => new _e, resetOnError: n = !0, resetOnComplete: r = !0, resetOnRefCountZero: o = !0} = t;
  return i => {
    let s, a, u, l = 0, c = !1, d = !1, f = () => {
      a?.unsubscribe(), a = void 0
    }, h = () => {
      f(), s = u = void 0, c = d = !1
    }, p = () => {
      let m = s;
      h(), m?.unsubscribe()
    };
    return S((m, D) => {
      l++, !d && !c && f();
      let E = u = u ?? e();
      D.add(() => {
        l--, l === 0 && !d && !c && (a = Bi(p, o))
      }), E.subscribe(D), !s && l > 0 && (s = new qe({
        next: k => E.next(k), error: k => {
          d = !0, f(), a = Bi(h, n, k), E.error(k)
        }, complete: () => {
          c = !0, f(), a = Bi(h, r), E.complete()
        }
      }), V(m).subscribe(s))
    })(i)
  }
}

function Bi(t, e, ...n) {
  if (e === !0) {
    t();
    return
  }
  if (e === !1) return;
  let r = new qe({
    next: () => {
      r.unsubscribe(), t()
    }
  });
  return V(e(...n)).subscribe(r)
}

function wm(t, e, n) {
  let r, o = !1;
  return t && typeof t == "object" ? {
    bufferSize: r = 1 / 0,
    windowTime: e = 1 / 0,
    refCount: o = !1,
    scheduler: n
  } = t : r = t ?? 1 / 0, Ll({
    connector: () => new vr(r, e, n),
    resetOnError: !0,
    resetOnComplete: !1,
    resetOnRefCountZero: o
  })
}

function bm(t) {
  return bt((e, n) => t <= n)
}

function Im(...t) {
  let e = Le(t);
  return S((n, r) => {
    (e ? jr(t, n, e) : jr(t, n)).subscribe(r)
  })
}

function _m(t, e) {
  return S((n, r) => {
    let o = null, i = 0, s = !1, a = () => s && !o && r.complete();
    n.subscribe(C(r, u => {
      o?.unsubscribe();
      let l = 0, c = i++;
      V(t(u, c)).subscribe(o = C(r, d => r.next(e ? e(u, d, c, l++) : d), () => {
        o = null, a()
      }))
    }, () => {
      s = !0, a()
    }))
  })
}

function Cm(t) {
  return S((e, n) => {
    V(t).subscribe(C(n, () => n.complete(), yn)), !n.closed && e.subscribe(n)
  })
}

function Sm(t, e, n) {
  let r = w(t) || e || n ? {next: t, error: e, complete: n} : t;
  return r ? S((o, i) => {
    var s;
    (s = r.subscribe) === null || s === void 0 || s.call(r);
    let a = !0;
    o.subscribe(C(i, u => {
      var l;
      (l = r.next) === null || l === void 0 || l.call(r, u), i.next(u)
    }, () => {
      var u;
      a = !1, (u = r.complete) === null || u === void 0 || u.call(r), i.complete()
    }, u => {
      var l;
      a = !1, (l = r.error) === null || l === void 0 || l.call(r, u), i.error(u)
    }, () => {
      var u, l;
      a && ((u = r.unsubscribe) === null || u === void 0 || u.call(r)), (l = r.finalize) === null || l === void 0 || l.call(r)
    }))
  }) : se
}

var Tc = "https://g.co/ng/security#xss", g = class extends Error {
  constructor(e, n) {
    super(xc(e, n)), this.code = e
  }
};

function xc(t, e) {
  return `${`NG0${Math.abs(t)}`}${e ? ": " + e : ""}`
}

function Gn(t) {
  return {toString: t}.toString()
}

var Br = "__parameters__";

function Mm(t) {
  return function (...n) {
    if (t) {
      let r = t(...n);
      for (let o in r) this[o] = r[o]
    }
  }
}

function Tm(t, e, n) {
  return Gn(() => {
    let r = Mm(e);

    function o(...i) {
      if (this instanceof o) return r.apply(this, i), this;
      let s = new o(...i);
      return a.annotation = s, a;

      function a(u, l, c) {
        let d = u.hasOwnProperty(Br) ? u[Br] : Object.defineProperty(u, Br, {value: []})[Br];
        for (; d.length <= c;) d.push(null);
        return (d[c] = d[c] || []).push(s), u
      }
    }

    return n && (o.prototype = Object.create(n.prototype)), o.prototype.ngMetadataName = t, o.annotationCls = o, o
  })
}

var Qe = globalThis;

function $(t) {
  for (let e in t) if (t[e] === $) return e;
  throw Error("Could not find renamed property on target object.")
}

function xm(t, e) {
  for (let n in e) e.hasOwnProperty(n) && !t.hasOwnProperty(n) && (t[n] = e[n])
}

function de(t) {
  if (typeof t == "string") return t;
  if (Array.isArray(t)) return "[" + t.map(de).join(", ") + "]";
  if (t == null) return "" + t;
  if (t.overriddenName) return `${t.overriddenName}`;
  if (t.name) return `${t.name}`;
  let e = t.toString();
  if (e == null) return "" + e;
  let n = e.indexOf(`
`);
  return n === -1 ? e : e.substring(0, n)
}

function os(t, e) {
  return t == null || t === "" ? e === null ? "" : e : e == null || e === "" ? t : t + " " + e
}

var Nm = $({__forward_ref__: $});

function Nc(t) {
  return t.__forward_ref__ = Nc, t.toString = function () {
    return de(this())
  }, t
}

function ae(t) {
  return Ac(t) ? t() : t
}

function Ac(t) {
  return typeof t == "function" && t.hasOwnProperty(Nm) && t.__forward_ref__ === Nc
}

function H(t) {
  return {token: t.token, providedIn: t.providedIn || null, factory: t.factory, value: void 0}
}

function Oc(t) {
  return {providers: t.providers || [], imports: t.imports || []}
}

function Oo(t) {
  return jl(t, Fc) || jl(t, Pc)
}

function VN(t) {
  return Oo(t) !== null
}

function jl(t, e) {
  return t.hasOwnProperty(e) ? t[e] : null
}

function Am(t) {
  let e = t && (t[Fc] || t[Pc]);
  return e || null
}

function Vl(t) {
  return t && (t.hasOwnProperty(Bl) || t.hasOwnProperty(Om)) ? t[Bl] : null
}

var Fc = $({\u0275prov: $}), Bl = $({\u0275inj: $}), Pc = $({ngInjectableDef: $}), Om = $({ngInjectorDef: $}),
  R = class {
    constructor(e, n) {
      this._desc = e, this.ngMetadataName = "InjectionToken", this.\u0275prov = void 0, typeof n == "number" ? this.__NG_ELEMENT_ID__ = n : n !== void 0 && (this.\u0275prov = H({
        token: this,
        providedIn: n.providedIn || "root",
        factory: n.factory
      }))
    }

    get multi() {
      return this
    }

    toString() {
      return `InjectionToken ${this._desc}`
    }
  };

function Rc(t) {
  return t && !!t.\u0275providers
}

var Fm = $({\u0275cmp: $}), Pm = $({\u0275dir: $}), Rm = $({\u0275pipe: $}), km = $({\u0275mod: $}),
  ro = $({\u0275fac: $}), In = $({__NG_ELEMENT_ID__: $}), $l = $({__NG_ENV_ID__: $});

function xe(t) {
  return typeof t == "string" ? t : t == null ? "" : String(t)
}

function Lm(t) {
  return typeof t == "function" ? t.name || t.toString() : typeof t == "object" && t != null && typeof t.type == "function" ? t.type.name || t.type.toString() : xe(t)
}

function jm(t, e) {
  let n = e ? `. Dependency path: ${e.join(" > ")} > ${t}` : "";
  throw new g(-200, t)
}

function pa(t, e) {
  throw new g(-201, !1)
}

var F = function (t) {
  return t[t.Default = 0] = "Default", t[t.Host = 1] = "Host", t[t.Self = 2] = "Self", t[t.SkipSelf = 4] = "SkipSelf", t[t.Optional = 8] = "Optional", t
}(F || {}), is;

function kc() {
  return is
}

function Ce(t) {
  let e = is;
  return is = t, e
}

function Lc(t, e, n) {
  let r = Oo(t);
  if (r && r.providedIn == "root") return r.value === void 0 ? r.value = r.factory() : r.value;
  if (n & F.Optional) return null;
  if (e !== void 0) return e;
  pa(t, "Injector")
}

var Vm = {}, Sn = Vm, ss = "__NG_DI_FLAG__", oo = "ngTempTokenPath", Bm = "ngTokenPath", $m = /\n/gm, Hm = "\u0275",
  Hl = "__source", Qt;

function Um() {
  return Qt
}

function rt(t) {
  let e = Qt;
  return Qt = t, e
}

function zm(t, e = F.Default) {
  if (Qt === void 0) throw new g(-203, !1);
  return Qt === null ? Lc(t, void 0, e) : Qt.get(t, e & F.Optional ? null : void 0, e)
}

function te(t, e = F.Default) {
  return (kc() || zm)(ae(t), e)
}

function M(t, e = F.Default) {
  return te(t, Fo(e))
}

function Fo(t) {
  return typeof t > "u" || typeof t == "number" ? t : 0 | (t.optional && 8) | (t.host && 1) | (t.self && 2) | (t.skipSelf && 4)
}

function as(t) {
  let e = [];
  for (let n = 0; n < t.length; n++) {
    let r = ae(t[n]);
    if (Array.isArray(r)) {
      if (r.length === 0) throw new g(900, !1);
      let o, i = F.Default;
      for (let s = 0; s < r.length; s++) {
        let a = r[s], u = Gm(a);
        typeof u == "number" ? u === -1 ? o = a.token : i |= u : o = a
      }
      e.push(te(o, i))
    } else e.push(te(r))
  }
  return e
}

function qm(t, e) {
  return t[ss] = e, t.prototype[ss] = e, t
}

function Gm(t) {
  return t[ss]
}

function Wm(t, e, n, r) {
  let o = t[oo];
  throw e[Hl] && o.unshift(e[Hl]), t.message = Qm(`
` + t.message, o, n, r), t[Bm] = o, t[oo] = null, t
}

function Qm(t, e, n, r = null) {
  t = t && t.charAt(0) === `
` && t.charAt(1) == Hm ? t.slice(2) : t;
  let o = de(e);
  if (Array.isArray(e)) o = e.map(de).join(" -> "); else if (typeof e == "object") {
    let i = [];
    for (let s in e) if (e.hasOwnProperty(s)) {
      let a = e[s];
      i.push(s + ":" + (typeof a == "string" ? JSON.stringify(a) : de(a)))
    }
    o = `{${i.join(", ")}}`
  }
  return `${n}${r ? "(" + r + ")" : ""}[${o}]: ${t.replace($m, `
  `)}`
}

var BN = qm(Tm("Optional"), 8);

function Yt(t, e) {
  let n = t.hasOwnProperty(ro);
  return n ? t[ro] : null
}

function Km(t, e, n) {
  if (t.length !== e.length) return !1;
  for (let r = 0; r < t.length; r++) {
    let o = t[r], i = e[r];
    if (n && (o = n(o), i = n(i)), i !== o) return !1
  }
  return !0
}

function Ym(t) {
  return t.flat(Number.POSITIVE_INFINITY)
}

function ma(t, e) {
  t.forEach(n => Array.isArray(n) ? ma(n, e) : e(n))
}

function jc(t, e, n) {
  e >= t.length ? t.push(n) : t.splice(e, 0, n)
}

function io(t, e) {
  return e >= t.length - 1 ? t.pop() : t.splice(e, 1)[0]
}

function Zm(t, e) {
  let n = [];
  for (let r = 0; r < t; r++) n.push(e);
  return n
}

function Jm(t, e, n, r) {
  let o = t.length;
  if (o == e) t.push(n, r); else if (o === 1) t.push(r, t[0]), t[0] = n; else {
    for (o--, t.push(t[o - 1], t[o]); o > e;) {
      let i = o - 2;
      t[o] = t[i], o--
    }
    t[e] = n, t[e + 1] = r
  }
}

function Po(t, e, n) {
  let r = Wn(t, e);
  return r >= 0 ? t[r | 1] = n : (r = ~r, Jm(t, r, e, n)), r
}

function $i(t, e) {
  let n = Wn(t, e);
  if (n >= 0) return t[n | 1]
}

function Wn(t, e) {
  return Xm(t, e, 1)
}

function Xm(t, e, n) {
  let r = 0, o = t.length >> n;
  for (; o !== r;) {
    let i = r + (o - r >> 1), s = t[i << n];
    if (e === s) return i << n;
    s > e ? o = i : r = i + 1
  }
  return ~(o << n)
}

var Zt = {}, ue = [], Mn = new R(""), Vc = new R("", -1), Bc = new R(""), so = class {
  get(e, n = Sn) {
    if (n === Sn) {
      let r = new Error(`NullInjectorError: No provider for ${de(e)}!`);
      throw r.name = "NullInjectorError", r
    }
    return n
  }
}, $c = function (t) {
  return t[t.OnPush = 0] = "OnPush", t[t.Default = 1] = "Default", t
}($c || {}), Jt = function (t) {
  return t[t.Emulated = 0] = "Emulated", t[t.None = 2] = "None", t[t.ShadowDom = 3] = "ShadowDom", t
}(Jt || {}), fe = function (t) {
  return t[t.None = 0] = "None", t[t.SignalBased = 1] = "SignalBased", t[t.HasDecoratorInputTransform = 2] = "HasDecoratorInputTransform", t
}(fe || {});

function eg(t, e, n) {
  let r = t.length;
  for (; ;) {
    let o = t.indexOf(e, n);
    if (o === -1) return o;
    if (o === 0 || t.charCodeAt(o - 1) <= 32) {
      let i = e.length;
      if (o + i === r || t.charCodeAt(o + i) <= 32) return o
    }
    n = o + 1
  }
}

function us(t, e, n) {
  let r = 0;
  for (; r < n.length;) {
    let o = n[r];
    if (typeof o == "number") {
      if (o !== 0) break;
      r++;
      let i = n[r++], s = n[r++], a = n[r++];
      t.setAttribute(e, s, a, i)
    } else {
      let i = o, s = n[++r];
      ng(i) ? t.setProperty(e, i, s) : t.setAttribute(e, i, s), r++
    }
  }
  return r
}

function tg(t) {
  return t === 3 || t === 4 || t === 6
}

function ng(t) {
  return t.charCodeAt(0) === 64
}

function Tn(t, e) {
  if (!(e === null || e.length === 0)) if (t === null || t.length === 0) t = e.slice(); else {
    let n = -1;
    for (let r = 0; r < e.length; r++) {
      let o = e[r];
      typeof o == "number" ? n = o : n === 0 || (n === -1 || n === 2 ? Ul(t, n, o, null, e[++r]) : Ul(t, n, o, null, null))
    }
  }
  return t
}

function Ul(t, e, n, r, o) {
  let i = 0, s = t.length;
  if (e === -1) s = -1; else for (; i < t.length;) {
    let a = t[i++];
    if (typeof a == "number") {
      if (a === e) {
        s = -1;
        break
      } else if (a > e) {
        s = i - 1;
        break
      }
    }
  }
  for (; i < t.length;) {
    let a = t[i];
    if (typeof a == "number") break;
    if (a === n) {
      if (r === null) {
        o !== null && (t[i + 1] = o);
        return
      } else if (r === t[i + 1]) {
        t[i + 2] = o;
        return
      }
    }
    i++, r !== null && i++, o !== null && i++
  }
  s !== -1 && (t.splice(s, 0, e), i = s + 1), t.splice(i++, 0, n), r !== null && t.splice(i++, 0, r), o !== null && t.splice(i++, 0, o)
}

var Hc = "ng-template";

function rg(t, e, n, r) {
  let o = 0;
  if (r) {
    for (; o < e.length && typeof e[o] == "string"; o += 2) if (e[o] === "class" && eg(e[o + 1].toLowerCase(), n, 0) !== -1) return !0
  } else if (ga(t)) return !1;
  if (o = e.indexOf(1, o), o > -1) {
    let i;
    for (; ++o < e.length && typeof (i = e[o]) == "string";) if (i.toLowerCase() === n) return !0
  }
  return !1
}

function ga(t) {
  return t.type === 4 && t.value !== Hc
}

function og(t, e, n) {
  let r = t.type === 4 && !n ? Hc : t.value;
  return e === r
}

function ig(t, e, n) {
  let r = 4, o = t.attrs, i = o !== null ? ug(o) : 0, s = !1;
  for (let a = 0; a < e.length; a++) {
    let u = e[a];
    if (typeof u == "number") {
      if (!s && !Te(r) && !Te(u)) return !1;
      if (s && Te(u)) continue;
      s = !1, r = u | r & 1;
      continue
    }
    if (!s) if (r & 4) {
      if (r = 2 | r & 1, u !== "" && !og(t, u, n) || u === "" && e.length === 1) {
        if (Te(r)) return !1;
        s = !0
      }
    } else if (r & 8) {
      if (o === null || !rg(t, o, u, n)) {
        if (Te(r)) return !1;
        s = !0
      }
    } else {
      let l = e[++a], c = sg(u, o, ga(t), n);
      if (c === -1) {
        if (Te(r)) return !1;
        s = !0;
        continue
      }
      if (l !== "") {
        let d;
        if (c > i ? d = "" : d = o[c + 1].toLowerCase(), r & 2 && l !== d) {
          if (Te(r)) return !1;
          s = !0
        }
      }
    }
  }
  return Te(r) || s
}

function Te(t) {
  return (t & 1) === 0
}

function sg(t, e, n, r) {
  if (e === null) return -1;
  let o = 0;
  if (r || !n) {
    let i = !1;
    for (; o < e.length;) {
      let s = e[o];
      if (s === t) return o;
      if (s === 3 || s === 6) i = !0; else if (s === 1 || s === 2) {
        let a = e[++o];
        for (; typeof a == "string";) a = e[++o];
        continue
      } else {
        if (s === 4) break;
        if (s === 0) {
          o += 4;
          continue
        }
      }
      o += i ? 1 : 2
    }
    return -1
  } else return lg(e, t)
}

function Uc(t, e, n = !1) {
  for (let r = 0; r < e.length; r++) if (ig(t, e[r], n)) return !0;
  return !1
}

function ag(t) {
  let e = t.attrs;
  if (e != null) {
    let n = e.indexOf(5);
    if (!(n & 1)) return e[n + 1]
  }
  return null
}

function ug(t) {
  for (let e = 0; e < t.length; e++) {
    let n = t[e];
    if (tg(n)) return e
  }
  return t.length
}

function lg(t, e) {
  let n = t.indexOf(4);
  if (n > -1) for (n++; n < t.length;) {
    let r = t[n];
    if (typeof r == "number") return -1;
    if (r === e) return n;
    n++
  }
  return -1
}

function cg(t, e) {
  e:for (let n = 0; n < e.length; n++) {
    let r = e[n];
    if (t.length === r.length) {
      for (let o = 0; o < t.length; o++) if (t[o] !== r[o]) continue e;
      return !0
    }
  }
  return !1
}

function zl(t, e) {
  return t ? ":not(" + e.trim() + ")" : e
}

function dg(t) {
  let e = t[0], n = 1, r = 2, o = "", i = !1;
  for (; n < t.length;) {
    let s = t[n];
    if (typeof s == "string") if (r & 2) {
      let a = t[++n];
      o += "[" + s + (a.length > 0 ? '="' + a + '"' : "") + "]"
    } else r & 8 ? o += "." + s : r & 4 && (o += " " + s); else o !== "" && !Te(s) && (e += zl(i, o), o = ""), r = s, i = i || !Te(r);
    n++
  }
  return o !== "" && (e += zl(i, o)), e
}

function fg(t) {
  return t.map(dg).join(",")
}

function hg(t) {
  let e = [], n = [], r = 1, o = 2;
  for (; r < t.length;) {
    let i = t[r];
    if (typeof i == "string") o === 2 ? i !== "" && e.push(i, t[++r]) : o === 8 && n.push(i); else {
      if (!Te(o)) break;
      o = i
    }
    r++
  }
  return {attrs: e, classes: n}
}

function $N(t) {
  return Gn(() => {
    let e = Qc(t), n = gn(Ie({}, e), {
      decls: t.decls,
      vars: t.vars,
      template: t.template,
      consts: t.consts || null,
      ngContentSelectors: t.ngContentSelectors,
      onPush: t.changeDetection === $c.OnPush,
      directiveDefs: null,
      pipeDefs: null,
      dependencies: e.standalone && t.dependencies || null,
      getStandaloneInjector: null,
      signals: t.signals ?? !1,
      data: t.data || {},
      encapsulation: t.encapsulation || Jt.Emulated,
      styles: t.styles || ue,
      _: null,
      schemas: t.schemas || null,
      tView: null,
      id: ""
    });
    Kc(n);
    let r = t.dependencies;
    return n.directiveDefs = Gl(r, !1), n.pipeDefs = Gl(r, !0), n.id = yg(n), n
  })
}

function pg(t) {
  return st(t) || qc(t)
}

function mg(t) {
  return t !== null
}

function zc(t) {
  return Gn(() => ({
    type: t.type,
    bootstrap: t.bootstrap || ue,
    declarations: t.declarations || ue,
    imports: t.imports || ue,
    exports: t.exports || ue,
    transitiveCompileScopes: null,
    schemas: t.schemas || null,
    id: t.id || null
  }))
}

function ql(t, e) {
  if (t == null) return Zt;
  let n = {};
  for (let r in t) if (t.hasOwnProperty(r)) {
    let o = t[r], i, s, a = fe.None;
    Array.isArray(o) ? (a = o[0], i = o[1], s = o[2] ?? i) : (i = o, s = o), e ? (n[i] = a !== fe.None ? [r, a] : r, e[i] = s) : n[i] = r
  }
  return n
}

function ya(t) {
  return Gn(() => {
    let e = Qc(t);
    return Kc(e), e
  })
}

function st(t) {
  return t[Fm] || null
}

function qc(t) {
  return t[Pm] || null
}

function Gc(t) {
  return t[Rm] || null
}

function gg(t) {
  let e = st(t) || qc(t) || Gc(t);
  return e !== null ? e.standalone : !1
}

function Wc(t, e) {
  let n = t[km] || null;
  if (!n && e === !0) throw new Error(`Type ${de(t)} does not have '\u0275mod' property.`);
  return n
}

function Qc(t) {
  let e = {};
  return {
    type: t.type,
    providersResolver: null,
    factory: null,
    hostBindings: t.hostBindings || null,
    hostVars: t.hostVars || 0,
    hostAttrs: t.hostAttrs || null,
    contentQueries: t.contentQueries || null,
    declaredInputs: e,
    inputTransforms: null,
    inputConfig: t.inputs || Zt,
    exportAs: t.exportAs || null,
    standalone: t.standalone === !0,
    signals: t.signals === !0,
    selectors: t.selectors || ue,
    viewQuery: t.viewQuery || null,
    features: t.features || null,
    setInput: null,
    findHostDirectiveDefs: null,
    hostDirectives: null,
    inputs: ql(t.inputs, e),
    outputs: ql(t.outputs),
    debugInfo: null
  }
}

function Kc(t) {
  t.features?.forEach(e => e(t))
}

function Gl(t, e) {
  if (!t) return null;
  let n = e ? Gc : pg;
  return () => (typeof t == "function" ? t() : t).map(r => n(r)).filter(mg)
}

function yg(t) {
  let e = 0,
    n = [t.selectors, t.ngContentSelectors, t.hostVars, t.hostAttrs, t.consts, t.vars, t.decls, t.encapsulation, t.standalone, t.signals, t.exportAs, JSON.stringify(t.inputs), JSON.stringify(t.outputs), Object.getOwnPropertyNames(t.type.prototype), !!t.contentQueries, !!t.viewQuery].join("|");
  for (let o of n) e = Math.imul(31, e) + o.charCodeAt(0) << 0;
  return e += 2147483648, "c" + e
}

function Yc(t) {
  return {\u0275providers: t}
}

function vg(...t) {
  return {\u0275providers: Zc(!0, t), \u0275fromNgModule: !0}
}

function Zc(t, ...e) {
  let n = [], r = new Set, o, i = s => {
    n.push(s)
  };
  return ma(e, s => {
    let a = s;
    ls(a, i, [], r) && (o ||= [], o.push(a))
  }), o !== void 0 && Jc(o, i), n
}

function Jc(t, e) {
  for (let n = 0; n < t.length; n++) {
    let {ngModule: r, providers: o} = t[n];
    va(o, i => {
      e(i, r)
    })
  }
}

function ls(t, e, n, r) {
  if (t = ae(t), !t) return !1;
  let o = null, i = Vl(t), s = !i && st(t);
  if (!i && !s) {
    let u = t.ngModule;
    if (i = Vl(u), i) o = u; else return !1
  } else {
    if (s && !s.standalone) return !1;
    o = t
  }
  let a = r.has(o);
  if (s) {
    if (a) return !1;
    if (r.add(o), s.dependencies) {
      let u = typeof s.dependencies == "function" ? s.dependencies() : s.dependencies;
      for (let l of u) ls(l, e, n, r)
    }
  } else if (i) {
    if (i.imports != null && !a) {
      r.add(o);
      let l;
      try {
        ma(i.imports, c => {
          ls(c, e, n, r) && (l ||= [], l.push(c))
        })
      } finally {
      }
      l !== void 0 && Jc(l, e)
    }
    if (!a) {
      let l = Yt(o) || (() => new o);
      e({provide: o, useFactory: l, deps: ue}, o), e({provide: Bc, useValue: o, multi: !0}, o), e({
        provide: Mn,
        useValue: () => te(o),
        multi: !0
      }, o)
    }
    let u = i.providers;
    if (u != null && !a) {
      let l = t;
      va(u, c => {
        e(c, l)
      })
    }
  } else return !1;
  return o !== t && t.providers !== void 0
}

function va(t, e) {
  for (let n of t) Rc(n) && (n = n.\u0275providers), Array.isArray(n) ? va(n, e) : e(n)
}

var Dg = $({provide: String, useValue: $});

function Xc(t) {
  return t !== null && typeof t == "object" && Dg in t
}

function Eg(t) {
  return !!(t && t.useExisting)
}

function wg(t) {
  return !!(t && t.useFactory)
}

function Xt(t) {
  return typeof t == "function"
}

function bg(t) {
  return !!t.useClass
}

var ed = new R(""), Yr = {}, Ig = {}, Hi;

function Da() {
  return Hi === void 0 && (Hi = new so), Hi
}

var at = class {
}, xn = class extends at {
  constructor(e, n, r, o) {
    super(), this.parent = n, this.source = r, this.scopes = o, this.records = new Map, this._ngOnDestroyHooks = new Set, this._onDestroyHooks = [], this._destroyed = !1, ds(e, s => this.processProvider(s)), this.records.set(Vc, qt(void 0, this)), o.has("environment") && this.records.set(at, qt(void 0, this));
    let i = this.records.get(ed);
    i != null && typeof i.value == "string" && this.scopes.add(i.value), this.injectorDefTypes = new Set(this.get(Bc, ue, F.Self))
  }

  get destroyed() {
    return this._destroyed
  }

  destroy() {
    this.assertNotDestroyed(), this._destroyed = !0;
    let e = A(null);
    try {
      for (let r of this._ngOnDestroyHooks) r.ngOnDestroy();
      let n = this._onDestroyHooks;
      this._onDestroyHooks = [];
      for (let r of n) r()
    } finally {
      this.records.clear(), this._ngOnDestroyHooks.clear(), this.injectorDefTypes.clear(), A(e)
    }
  }

  onDestroy(e) {
    return this.assertNotDestroyed(), this._onDestroyHooks.push(e), () => this.removeOnDestroy(e)
  }

  runInContext(e) {
    this.assertNotDestroyed();
    let n = rt(this), r = Ce(void 0), o;
    try {
      return e()
    } finally {
      rt(n), Ce(r)
    }
  }

  get(e, n = Sn, r = F.Default) {
    if (this.assertNotDestroyed(), e.hasOwnProperty($l)) return e[$l](this);
    r = Fo(r);
    let o, i = rt(this), s = Ce(void 0);
    try {
      if (!(r & F.SkipSelf)) {
        let u = this.records.get(e);
        if (u === void 0) {
          let l = Tg(e) && Oo(e);
          l && this.injectableDefInScope(l) ? u = qt(cs(e), Yr) : u = null, this.records.set(e, u)
        }
        if (u != null) return this.hydrate(e, u)
      }
      let a = r & F.Self ? Da() : this.parent;
      return n = r & F.Optional && n === Sn ? null : n, a.get(e, n)
    } catch (a) {
      if (a.name === "NullInjectorError") {
        if ((a[oo] = a[oo] || []).unshift(de(e)), i) throw a;
        return Wm(a, e, "R3InjectorError", this.source)
      } else throw a
    } finally {
      Ce(s), rt(i)
    }
  }

  resolveInjectorInitializers() {
    let e = A(null), n = rt(this), r = Ce(void 0), o;
    try {
      let i = this.get(Mn, ue, F.Self);
      for (let s of i) s()
    } finally {
      rt(n), Ce(r), A(e)
    }
  }

  toString() {
    let e = [], n = this.records;
    for (let r of n.keys()) e.push(de(r));
    return `R3Injector[${e.join(", ")}]`
  }

  assertNotDestroyed() {
    if (this._destroyed) throw new g(205, !1)
  }

  processProvider(e) {
    e = ae(e);
    let n = Xt(e) ? e : ae(e && e.provide), r = Cg(e);
    if (!Xt(e) && e.multi === !0) {
      let o = this.records.get(n);
      o || (o = qt(void 0, Yr, !0), o.factory = () => as(o.multi), this.records.set(n, o)), n = e, o.multi.push(e)
    }
    this.records.set(n, r)
  }

  hydrate(e, n) {
    let r = A(null);
    try {
      return n.value === Yr && (n.value = Ig, n.value = n.factory()), typeof n.value == "object" && n.value && Mg(n.value) && this._ngOnDestroyHooks.add(n.value), n.value
    } finally {
      A(r)
    }
  }

  injectableDefInScope(e) {
    if (!e.providedIn) return !1;
    let n = ae(e.providedIn);
    return typeof n == "string" ? n === "any" || this.scopes.has(n) : this.injectorDefTypes.has(n)
  }

  removeOnDestroy(e) {
    let n = this._onDestroyHooks.indexOf(e);
    n !== -1 && this._onDestroyHooks.splice(n, 1)
  }
};

function cs(t) {
  let e = Oo(t), n = e !== null ? e.factory : Yt(t);
  if (n !== null) return n;
  if (t instanceof R) throw new g(204, !1);
  if (t instanceof Function) return _g(t);
  throw new g(204, !1)
}

function _g(t) {
  if (t.length > 0) throw new g(204, !1);
  let n = Am(t);
  return n !== null ? () => n.factory(t) : () => new t
}

function Cg(t) {
  if (Xc(t)) return qt(void 0, t.useValue);
  {
    let e = td(t);
    return qt(e, Yr)
  }
}

function td(t, e, n) {
  let r;
  if (Xt(t)) {
    let o = ae(t);
    return Yt(o) || cs(o)
  } else if (Xc(t)) r = () => ae(t.useValue); else if (wg(t)) r = () => t.useFactory(...as(t.deps || [])); else if (Eg(t)) r = () => te(ae(t.useExisting)); else {
    let o = ae(t && (t.useClass || t.provide));
    if (Sg(t)) r = () => new o(...as(t.deps)); else return Yt(o) || cs(o)
  }
  return r
}

function qt(t, e, n = !1) {
  return {factory: t, value: e, multi: n ? [] : void 0}
}

function Sg(t) {
  return !!t.deps
}

function Mg(t) {
  return t !== null && typeof t == "object" && typeof t.ngOnDestroy == "function"
}

function Tg(t) {
  return typeof t == "function" || typeof t == "object" && t instanceof R
}

function ds(t, e) {
  for (let n of t) Array.isArray(n) ? ds(n, e) : n && Rc(n) ? ds(n.\u0275providers, e) : e(n)
}

function HN(t, e) {
  t instanceof xn && t.assertNotDestroyed();
  let n, r = rt(t), o = Ce(void 0);
  try {
    return e()
  } finally {
    rt(r), Ce(o)
  }
}

function xg() {
  return kc() !== void 0 || Um() != null
}

function Ng(t) {
  let e = Qe.ng;
  if (e && e.\u0275compilerFacade) return e.\u0275compilerFacade;
  throw new Error("JIT compiler unavailable")
}

function Ag(t) {
  return typeof t == "function"
}

var W = 0, I = 1, _ = 2, J = 3, Ae = 4, ye = 5, ge = 6, Nn = 7, re = 8, en = 9, Oe = 10, j = 11, An = 12, Wl = 13,
  an = 14, le = 15, Qn = 16, Gt = 17, Ye = 18, Ro = 19, nd = 20, ot = 21, Ui = 22, _t = 23, U = 25, Ea = 1, On = 6,
  Ze = 7, ao = 8, tn = 9, ne = 10, wa = function (t) {
    return t[t.None = 0] = "None", t[t.HasTransplantedViews = 2] = "HasTransplantedViews", t
  }(wa || {});

function Ke(t) {
  return Array.isArray(t) && typeof t[Ea] == "object"
}

function ve(t) {
  return Array.isArray(t) && t[Ea] === !0
}

function rd(t) {
  return (t.flags & 4) !== 0
}

function un(t) {
  return t.componentOffset > -1
}

function ba(t) {
  return (t.flags & 1) === 1
}

function Je(t) {
  return !!t.template
}

function Ia(t) {
  return (t[_] & 512) !== 0
}

function Og(t) {
  return (t.type & 16) === 16
}

function Fg(t) {
  return (t[_] & 32) === 32
}

var fs = class {
  constructor(e, n, r) {
    this.previousValue = e, this.currentValue = n, this.firstChange = r
  }

  isFirstChange() {
    return this.firstChange
  }
};

function od(t, e, n, r) {
  e !== null ? e.applyValueToInputSignal(e, r) : t[n] = r
}

function ko() {
  return id
}

function id(t) {
  return t.type.prototype.ngOnChanges && (t.setInput = Rg), Pg
}

ko.ngInherit = !0;

function Pg() {
  let t = ad(this), e = t?.current;
  if (e) {
    let n = t.previous;
    if (n === Zt) t.previous = e; else for (let r in e) n[r] = e[r];
    t.current = null, this.ngOnChanges(e)
  }
}

function Rg(t, e, n, r, o) {
  let i = this.declaredInputs[r], s = ad(t) || kg(t, {previous: Zt, current: null}), a = s.current || (s.current = {}),
    u = s.previous, l = u[i];
  a[i] = new fs(l && l.currentValue, n, u === Zt), od(t, e, o, n)
}

var sd = "__ngSimpleChanges__";

function ad(t) {
  return t[sd] || null
}

function kg(t, e) {
  return t[sd] = e
}

var Ql = null;
var Ve = function (t, e, n) {
  Ql?.(t, e, n)
}, Lg = "svg", jg = "math", Vg = !1;

function Bg() {
  return Vg
}

function Z(t) {
  for (; Array.isArray(t);) t = t[W];
  return t
}

function _a(t) {
  for (; Array.isArray(t);) {
    if (typeof t[Ea] == "object") return t;
    t = t[W]
  }
  return null
}

function ud(t, e) {
  return Z(e[t])
}

function De(t, e) {
  return Z(e[t.index])
}

function Ca(t, e) {
  return t.data[e]
}

function $g(t, e) {
  return t[e]
}

function lt(t, e) {
  let n = e[t];
  return Ke(n) ? n : n[W]
}

function Hg(t) {
  return (t[_] & 4) === 4
}

function Sa(t) {
  return (t[_] & 128) === 128
}

function Ug(t) {
  return ve(t[J])
}

function uo(t, e) {
  return e == null ? null : t[e]
}

function ld(t) {
  t[Gt] = 0
}

function zg(t) {
  t[_] & 1024 || (t[_] |= 1024, Sa(t) && Fn(t))
}

function qg(t, e) {
  for (; t > 0;) e = e[an], t--;
  return e
}

function Ma(t) {
  return !!(t[_] & 9216 || t[_t]?.dirty)
}

function hs(t) {
  t[Oe].changeDetectionScheduler?.notify(1), Ma(t) ? Fn(t) : t[_] & 64 && (Bg() ? (t[_] |= 1024, Fn(t)) : t[Oe].changeDetectionScheduler?.notify())
}

function Fn(t) {
  t[Oe].changeDetectionScheduler?.notify();
  let e = Pn(t);
  for (; e !== null && !(e[_] & 8192 || (e[_] |= 8192, !Sa(e)));) e = Pn(e)
}

function cd(t, e) {
  if ((t[_] & 256) === 256) throw new g(911, !1);
  t[ot] === null && (t[ot] = []), t[ot].push(e)
}

function Gg(t, e) {
  if (t[ot] === null) return;
  let n = t[ot].indexOf(e);
  n !== -1 && t[ot].splice(n, 1)
}

function Pn(t) {
  let e = t[J];
  return ve(e) ? e[J] : e
}

var x = {lFrame: Dd(null), bindingsEnabled: !0, skipHydrationRootTNode: null};

function Wg() {
  return x.lFrame.elementDepthCount
}

function Qg() {
  x.lFrame.elementDepthCount++
}

function Kg() {
  x.lFrame.elementDepthCount--
}

function dd() {
  return x.bindingsEnabled
}

function ln() {
  return x.skipHydrationRootTNode !== null
}

function Yg(t) {
  return x.skipHydrationRootTNode === t
}

function Zg(t) {
  x.skipHydrationRootTNode = t
}

function Jg() {
  x.skipHydrationRootTNode = null
}

function N() {
  return x.lFrame.lView
}

function Q() {
  return x.lFrame.tView
}

function UN(t) {
  return x.lFrame.contextLView = t, t[re]
}

function zN(t) {
  return x.lFrame.contextLView = null, t
}

function he() {
  let t = fd();
  for (; t !== null && t.type === 64;) t = t.parent;
  return t
}

function fd() {
  return x.lFrame.currentTNode
}

function Xg() {
  let t = x.lFrame, e = t.currentTNode;
  return t.isParent ? e : e.parent
}

function Kn(t, e) {
  let n = x.lFrame;
  n.currentTNode = t, n.isParent = e
}

function hd() {
  return x.lFrame.isParent
}

function pd() {
  x.lFrame.isParent = !1
}

function ey() {
  return x.lFrame.contextLView
}

function md() {
  return x.lFrame.bindingIndex
}

function ty(t) {
  return x.lFrame.bindingIndex = t
}

function Ot() {
  return x.lFrame.bindingIndex++
}

function Lo(t) {
  let e = x.lFrame, n = e.bindingIndex;
  return e.bindingIndex = e.bindingIndex + t, n
}

function ny() {
  return x.lFrame.inI18n
}

function ry(t, e) {
  let n = x.lFrame;
  n.bindingIndex = n.bindingRootIndex = t, ps(e)
}

function oy() {
  return x.lFrame.currentDirectiveIndex
}

function ps(t) {
  x.lFrame.currentDirectiveIndex = t
}

function Ta(t) {
  let e = x.lFrame.currentDirectiveIndex;
  return e === -1 ? null : t[e]
}

function gd() {
  return x.lFrame.currentQueryIndex
}

function xa(t) {
  x.lFrame.currentQueryIndex = t
}

function iy(t) {
  let e = t[I];
  return e.type === 2 ? e.declTNode : e.type === 1 ? t[ye] : null
}

function yd(t, e, n) {
  if (n & F.SkipSelf) {
    let o = e, i = t;
    for (; o = o.parent, o === null && !(n & F.Host);) if (o = iy(i), o === null || (i = i[an], o.type & 10)) break;
    if (o === null) return !1;
    e = o, t = i
  }
  let r = x.lFrame = vd();
  return r.currentTNode = e, r.lView = t, !0
}

function Na(t) {
  let e = vd(), n = t[I];
  x.lFrame = e, e.currentTNode = n.firstChild, e.lView = t, e.tView = n, e.contextLView = t, e.bindingIndex = n.bindingStartIndex, e.inI18n = !1
}

function vd() {
  let t = x.lFrame, e = t === null ? null : t.child;
  return e === null ? Dd(t) : e
}

function Dd(t) {
  let e = {
    currentTNode: null,
    isParent: !0,
    lView: null,
    tView: null,
    selectedIndex: -1,
    contextLView: null,
    elementDepthCount: 0,
    currentNamespace: null,
    currentDirectiveIndex: -1,
    bindingRootIndex: -1,
    bindingIndex: -1,
    currentQueryIndex: 0,
    parent: t,
    child: null,
    inI18n: !1
  };
  return t !== null && (t.child = e), e
}

function Ed() {
  let t = x.lFrame;
  return x.lFrame = t.parent, t.currentTNode = null, t.lView = null, t
}

var wd = Ed;

function Aa() {
  let t = Ed();
  t.isParent = !0, t.tView = null, t.selectedIndex = -1, t.contextLView = null, t.elementDepthCount = 0, t.currentDirectiveIndex = -1, t.currentNamespace = null, t.bindingRootIndex = -1, t.bindingIndex = -1, t.currentQueryIndex = 0
}

function sy(t) {
  return (x.lFrame.contextLView = qg(t, x.lFrame.contextLView))[re]
}

function ct() {
  return x.lFrame.selectedIndex
}

function Ct(t) {
  x.lFrame.selectedIndex = t
}

function Yn() {
  let t = x.lFrame;
  return Ca(t.tView, t.selectedIndex)
}

function bd() {
  return x.lFrame.currentNamespace
}

var Id = !0;

function Oa() {
  return Id
}

function $e(t) {
  Id = t
}

function ay(t, e, n) {
  let {ngOnChanges: r, ngOnInit: o, ngDoCheck: i} = e.type.prototype;
  if (r) {
    let s = id(e);
    (n.preOrderHooks ??= []).push(t, s), (n.preOrderCheckHooks ??= []).push(t, s)
  }
  o && (n.preOrderHooks ??= []).push(0 - t, o), i && ((n.preOrderHooks ??= []).push(t, i), (n.preOrderCheckHooks ??= []).push(t, i))
}

function Fa(t, e) {
  for (let n = e.directiveStart, r = e.directiveEnd; n < r; n++) {
    let i = t.data[n].type.prototype, {
      ngAfterContentInit: s,
      ngAfterContentChecked: a,
      ngAfterViewInit: u,
      ngAfterViewChecked: l,
      ngOnDestroy: c
    } = i;
    s && (t.contentHooks ??= []).push(-n, s), a && ((t.contentHooks ??= []).push(n, a), (t.contentCheckHooks ??= []).push(n, a)), u && (t.viewHooks ??= []).push(-n, u), l && ((t.viewHooks ??= []).push(n, l), (t.viewCheckHooks ??= []).push(n, l)), c != null && (t.destroyHooks ??= []).push(n, c)
  }
}

function Zr(t, e, n) {
  _d(t, e, 3, n)
}

function Jr(t, e, n, r) {
  (t[_] & 3) === n && _d(t, e, n, r)
}

function zi(t, e) {
  let n = t[_];
  (n & 3) === e && (n &= 16383, n += 1, t[_] = n)
}

function _d(t, e, n, r) {
  let o = r !== void 0 ? t[Gt] & 65535 : 0, i = r ?? -1, s = e.length - 1, a = 0;
  for (let u = o; u < s; u++) if (typeof e[u + 1] == "number") {
    if (a = e[u], r != null && a >= r) break
  } else e[u] < 0 && (t[Gt] += 65536), (a < i || i == -1) && (uy(t, n, e, u), t[Gt] = (t[Gt] & 4294901760) + u + 2), u++
}

function Kl(t, e) {
  Ve(4, t, e);
  let n = A(null);
  try {
    e.call(t)
  } finally {
    A(n), Ve(5, t, e)
  }
}

function uy(t, e, n, r) {
  let o = n[r] < 0, i = n[r + 1], s = o ? -n[r] : n[r], a = t[s];
  o ? t[_] >> 14 < t[Gt] >> 16 && (t[_] & 3) === e && (t[_] += 16384, Kl(a, i)) : Kl(a, i)
}

var Kt = -1, St = class {
  constructor(e, n, r) {
    this.factory = e, this.resolving = !1, this.canSeeViewProviders = n, this.injectImpl = r
  }
};

function ly(t) {
  return t instanceof St
}

function cy(t) {
  return t != null && typeof t == "object" && (t.insertBeforeIndex === null || typeof t.insertBeforeIndex == "number" || Array.isArray(t.insertBeforeIndex))
}

function dy(t) {
  return (t.flags & 8) !== 0
}

function fy(t) {
  return (t.flags & 16) !== 0
}

function Cd(t) {
  return t !== Kt
}

function lo(t) {
  return t & 32767
}

function hy(t) {
  return t >> 16
}

function co(t, e) {
  let n = hy(t), r = e;
  for (; n > 0;) r = r[an], n--;
  return r
}

var ms = !0;

function Yl(t) {
  let e = ms;
  return ms = t, e
}

var py = 256, Sd = py - 1, Md = 5, my = 0, Be = {};

function gy(t, e, n) {
  let r;
  typeof n == "string" ? r = n.charCodeAt(0) || 0 : n.hasOwnProperty(In) && (r = n[In]), r == null && (r = n[In] = my++);
  let o = r & Sd, i = 1 << o;
  e.data[t + (o >> Md)] |= i
}

function fo(t, e) {
  let n = Td(t, e);
  if (n !== -1) return n;
  let r = e[I];
  r.firstCreatePass && (t.injectorIndex = e.length, qi(r.data, t), qi(e, null), qi(r.blueprint, null));
  let o = Pa(t, e), i = t.injectorIndex;
  if (Cd(o)) {
    let s = lo(o), a = co(o, e), u = a[I].data;
    for (let l = 0; l < 8; l++) e[i + l] = a[s + l] | u[s + l]
  }
  return e[i + 8] = o, i
}

function qi(t, e) {
  t.push(0, 0, 0, 0, 0, 0, 0, 0, e)
}

function Td(t, e) {
  return t.injectorIndex === -1 || t.parent && t.parent.injectorIndex === t.injectorIndex || e[t.injectorIndex + 8] === null ? -1 : t.injectorIndex
}

function Pa(t, e) {
  if (t.parent && t.parent.injectorIndex !== -1) return t.parent.injectorIndex;
  let n = 0, r = null, o = e;
  for (; o !== null;) {
    if (r = Fd(o), r === null) return Kt;
    if (n++, o = o[an], r.injectorIndex !== -1) return r.injectorIndex | n << 16
  }
  return Kt
}

function gs(t, e, n) {
  gy(t, e, n)
}

function xd(t, e, n) {
  if (n & F.Optional || t !== void 0) return t;
  pa(e, "NodeInjector")
}

function Nd(t, e, n, r) {
  if (n & F.Optional && r === void 0 && (r = null), !(n & (F.Self | F.Host))) {
    let o = t[en], i = Ce(void 0);
    try {
      return o ? o.get(e, r, n & F.Optional) : Lc(e, r, n & F.Optional)
    } finally {
      Ce(i)
    }
  }
  return xd(r, e, n)
}

function Ad(t, e, n, r = F.Default, o) {
  if (t !== null) {
    if (e[_] & 2048 && !(r & F.Self)) {
      let s = Ey(t, e, n, r, Be);
      if (s !== Be) return s
    }
    let i = Od(t, e, n, r, Be);
    if (i !== Be) return i
  }
  return Nd(e, n, r, o)
}

function Od(t, e, n, r, o) {
  let i = vy(n);
  if (typeof i == "function") {
    if (!yd(e, t, r)) return r & F.Host ? xd(o, n, r) : Nd(e, n, r, o);
    try {
      let s;
      if (s = i(r), s == null && !(r & F.Optional)) pa(n); else return s
    } finally {
      wd()
    }
  } else if (typeof i == "number") {
    let s = null, a = Td(t, e), u = Kt, l = r & F.Host ? e[le][ye] : null;
    for ((a === -1 || r & F.SkipSelf) && (u = a === -1 ? Pa(t, e) : e[a + 8], u === Kt || !Jl(r, !1) ? a = -1 : (s = e[I], a = lo(u), e = co(u, e))); a !== -1;) {
      let c = e[I];
      if (Zl(i, a, c.data)) {
        let d = yy(a, e, n, s, r, l);
        if (d !== Be) return d
      }
      u = e[a + 8], u !== Kt && Jl(r, e[I].data[a + 8] === l) && Zl(i, a, e) ? (s = c, a = lo(u), e = co(u, e)) : a = -1
    }
  }
  return o
}

function yy(t, e, n, r, o, i) {
  let s = e[I], a = s.data[t + 8], u = r == null ? un(a) && ms : r != s && (a.type & 3) !== 0,
    l = o & F.Host && i === a, c = Xr(a, s, n, u, l);
  return c !== null ? Mt(e, s, c, a) : Be
}

function Xr(t, e, n, r, o) {
  let i = t.providerIndexes, s = e.data, a = i & 1048575, u = t.directiveStart, l = t.directiveEnd, c = i >> 20,
    d = r ? a : a + c, f = o ? a + c : l;
  for (let h = d; h < f; h++) {
    let p = s[h];
    if (h < u && n === p || h >= u && p.type === n) return h
  }
  if (o) {
    let h = s[u];
    if (h && Je(h) && h.type === n) return u
  }
  return null
}

function Mt(t, e, n, r) {
  let o = t[n], i = e.data;
  if (ly(o)) {
    let s = o;
    s.resolving && jm(Lm(i[n]));
    let a = Yl(s.canSeeViewProviders);
    s.resolving = !0;
    let u, l = s.injectImpl ? Ce(s.injectImpl) : null, c = yd(t, r, F.Default);
    try {
      o = t[n] = s.factory(void 0, i, t, r), e.firstCreatePass && n >= r.directiveStart && ay(n, i[n], e)
    } finally {
      l !== null && Ce(l), Yl(a), s.resolving = !1, wd()
    }
  }
  return o
}

function vy(t) {
  if (typeof t == "string") return t.charCodeAt(0) || 0;
  let e = t.hasOwnProperty(In) ? t[In] : void 0;
  return typeof e == "number" ? e >= 0 ? e & Sd : Dy : e
}

function Zl(t, e, n) {
  let r = 1 << t;
  return !!(n[e + (t >> Md)] & r)
}

function Jl(t, e) {
  return !(t & F.Self) && !(t & F.Host && e)
}

var It = class {
  constructor(e, n) {
    this._tNode = e, this._lView = n
  }

  get(e, n, r) {
    return Ad(this._tNode, this._lView, e, Fo(r), n)
  }
};

function Dy() {
  return new It(he(), N())
}

function qN(t) {
  return Gn(() => {
    let e = t.prototype.constructor, n = e[ro] || ys(e), r = Object.prototype,
      o = Object.getPrototypeOf(t.prototype).constructor;
    for (; o && o !== r;) {
      let i = o[ro] || ys(o);
      if (i && i !== n) return i;
      o = Object.getPrototypeOf(o)
    }
    return i => new i
  })
}

function ys(t) {
  return Ac(t) ? () => {
    let e = ys(ae(t));
    return e && e()
  } : Yt(t)
}

function Ey(t, e, n, r, o) {
  let i = t, s = e;
  for (; i !== null && s !== null && s[_] & 2048 && !(s[_] & 512);) {
    let a = Od(i, s, n, r | F.Self, Be);
    if (a !== Be) return a;
    let u = i.parent;
    if (!u) {
      let l = s[nd];
      if (l) {
        let c = l.get(n, Be, r);
        if (c !== Be) return c
      }
      u = Fd(s), s = s[an]
    }
    i = u
  }
  return o
}

function Fd(t) {
  let e = t[I], n = e.type;
  return n === 2 ? e.declTNode : n === 1 ? t[ye] : null
}

function Xl(t, e = null, n = null, r) {
  let o = Pd(t, e, n, r);
  return o.resolveInjectorInitializers(), o
}

function Pd(t, e = null, n = null, r, o = new Set) {
  let i = [n || ue, vg(t)];
  return r = r || (typeof t == "object" ? void 0 : de(t)), new xn(i, e || Da(), r || null, o)
}

var dt = (() => {
  let e = class e {
    static create(r, o) {
      if (Array.isArray(r)) return Xl({name: ""}, o, r, "");
      {
        let i = r.name ?? "";
        return Xl({name: i}, r.parent, r.providers, i)
      }
    }
  };
  e.THROW_IF_NOT_FOUND = Sn, e.NULL = new so, e.\u0275prov = H({
    token: e,
    providedIn: "any",
    factory: () => te(Vc)
  }), e.__NG_ELEMENT_ID__ = -1;
  let t = e;
  return t
})();
var wy = "ngOriginalError";

function Gi(t) {
  return t[wy]
}

var Tt = class {
  constructor() {
    this._console = console
  }

  handleError(e) {
    let n = this._findOriginalError(e);
    this._console.error("ERROR", e), n && this._console.error("ORIGINAL ERROR", n)
  }

  _findOriginalError(e) {
    let n = e && Gi(e);
    for (; n && Gi(n);) n = Gi(n);
    return n || null
  }
}, Rd = new R("", {providedIn: "root", factory: () => M(Tt).handleError.bind(void 0)}), kd = (() => {
  let e = class e {
  };
  e.__NG_ELEMENT_ID__ = by, e.__NG_ENV_ID__ = r => r;
  let t = e;
  return t
})(), vs = class extends kd {
  constructor(e) {
    super(), this._lView = e
  }

  onDestroy(e) {
    return cd(this._lView, e), () => Gg(this._lView, e)
  }
};

function by() {
  return new vs(N())
}

function Iy() {
  return cn(he(), N())
}

function cn(t, e) {
  return new Ft(De(t, e))
}

var Ft = (() => {
  let e = class e {
    constructor(r) {
      this.nativeElement = r
    }
  };
  e.__NG_ELEMENT_ID__ = Iy;
  let t = e;
  return t
})();

function _y(t) {
  return t instanceof Ft ? t.nativeElement : t
}

var Ds = class extends _e {
  constructor(e = !1) {
    super(), this.destroyRef = void 0, this.__isAsync = e, xg() && (this.destroyRef = M(kd, {optional: !0}) ?? void 0)
  }

  emit(e) {
    let n = A(null);
    try {
      super.next(e)
    } finally {
      A(n)
    }
  }

  subscribe(e, n, r) {
    let o = e, i = n || (() => null), s = r;
    if (e && typeof e == "object") {
      let u = e;
      o = u.next?.bind(u), i = u.error?.bind(u), s = u.complete?.bind(u)
    }
    this.__isAsync && (i = Wi(i), o && (o = Wi(o)), s && (s = Wi(s)));
    let a = super.subscribe({next: o, error: i, complete: s});
    return e instanceof K && e.add(a), a
  }
};

function Wi(t) {
  return e => {
    setTimeout(t, void 0, e)
  }
}

var Ne = Ds;

function Cy() {
  return this._results[Symbol.iterator]()
}

var Es = class t {
  constructor(e = !1) {
    this._emitDistinctChangesOnly = e, this.dirty = !0, this._onDirty = void 0, this._results = [], this._changesDetected = !1, this._changes = void 0, this.length = 0, this.first = void 0, this.last = void 0;
    let n = t.prototype;
    n[Symbol.iterator] || (n[Symbol.iterator] = Cy)
  }

  get changes() {
    return this._changes ??= new Ne
  }

  get(e) {
    return this._results[e]
  }

  map(e) {
    return this._results.map(e)
  }

  filter(e) {
    return this._results.filter(e)
  }

  find(e) {
    return this._results.find(e)
  }

  reduce(e, n) {
    return this._results.reduce(e, n)
  }

  forEach(e) {
    this._results.forEach(e)
  }

  some(e) {
    return this._results.some(e)
  }

  toArray() {
    return this._results.slice()
  }

  toString() {
    return this._results.toString()
  }

  reset(e, n) {
    this.dirty = !1;
    let r = Ym(e);
    (this._changesDetected = !Km(this._results, r, n)) && (this._results = r, this.length = r.length, this.last = r[this.length - 1], this.first = r[0])
  }

  notifyOnChanges() {
    this._changes !== void 0 && (this._changesDetected || !this._emitDistinctChangesOnly) && this._changes.emit(this)
  }

  onDirty(e) {
    this._onDirty = e
  }

  setDirty() {
    this.dirty = !0, this._onDirty?.()
  }

  destroy() {
    this._changes !== void 0 && (this._changes.complete(), this._changes.unsubscribe())
  }
}, Rn = "ngSkipHydration", Sy = "ngskiphydration";

function Ld(t) {
  let e = t.mergedAttrs;
  if (e === null) return !1;
  for (let n = 0; n < e.length; n += 2) {
    let r = e[n];
    if (typeof r == "number") return !1;
    if (typeof r == "string" && r.toLowerCase() === Sy) return !0
  }
  return !1
}

function jd(t) {
  return t.hasAttribute(Rn)
}

function ho(t) {
  return (t.flags & 128) === 128
}

function po(t) {
  if (ho(t)) return !0;
  let e = t.parent;
  for (; e;) {
    if (ho(t) || Ld(e)) return !0;
    e = e.parent
  }
  return !1
}

var Vd = new Map, My = 0;

function Ty() {
  return My++
}

function xy(t) {
  Vd.set(t[Ro], t)
}

function Ny(t) {
  Vd.delete(t[Ro])
}

var ec = "__ngContext__";

function xt(t, e) {
  Ke(e) ? (t[ec] = e[Ro], xy(e)) : t[ec] = e
}

function Bd(t) {
  return Hd(t[An])
}

function $d(t) {
  return Hd(t[Ae])
}

function Hd(t) {
  for (; t !== null && !ve(t);) t = t[Ae];
  return t
}

var ws;

function GN(t) {
  ws = t
}

function Zn() {
  if (ws !== void 0) return ws;
  if (typeof document < "u") return document;
  throw new g(210, !1)
}

var Ay = new R("", {providedIn: "root", factory: () => Oy}), Oy = "ng", Fy = new R(""),
  Jn = new R("", {providedIn: "platform", factory: () => "unknown"});
var WN = new R(""), QN = new R("", {
  providedIn: "root",
  factory: () => Zn().body?.querySelector("[ngCspNonce]")?.getAttribute("ngCspNonce") || null
}), Ra = {
  breakpoints: [16, 32, 48, 64, 96, 128, 256, 384, 640, 750, 828, 1080, 1200, 1920, 2048, 3840],
  placeholderResolution: 30,
  disableImageSizeWarning: !1,
  disableImageLazyLoadWarning: !1
}, Ud = new R("", {providedIn: "root", factory: () => Ra});

function Py() {
  let t = new jo;
  return M(Jn) === "browser" && (t.store = Ry(Zn(), M(Ay))), t
}

var jo = (() => {
  let e = class e {
    constructor() {
      this.store = {}, this.onSerializeCallbacks = {}
    }

    get isEmpty() {
      return Object.keys(this.store).length === 0
    }

    get(r, o) {
      return this.store[r] !== void 0 ? this.store[r] : o
    }

    set(r, o) {
      this.store[r] = o
    }

    remove(r) {
      delete this.store[r]
    }

    hasKey(r) {
      return this.store.hasOwnProperty(r)
    }

    onSerialize(r, o) {
      this.onSerializeCallbacks[r] = o
    }

    toJson() {
      for (let r in this.onSerializeCallbacks) if (this.onSerializeCallbacks.hasOwnProperty(r)) try {
        this.store[r] = this.onSerializeCallbacks[r]()
      } catch (o) {
        console.warn("Exception in onSerialize callback: ", o)
      }
      return JSON.stringify(this.store).replace(/</g, "\\u003C")
    }
  };
  e.\u0275prov = H({token: e, providedIn: "root", factory: Py});
  let t = e;
  return t
})();

function Ry(t, e) {
  let n = t.getElementById(e + "-state");
  if (n?.textContent) try {
    return JSON.parse(n.textContent)
  } catch (r) {
    console.warn("Exception while restoring TransferState for app " + e, r)
  }
  return {}
}

var ka = "h", La = "b", kn = function (t) {
    return t.FirstChild = "f", t.NextSibling = "n", t
  }(kn || {}), bs = "e", Is = "t", Ln = "c", mo = "x", nn = "r", _s = "i", Cs = "n", eo = "d", ky = "__nghData__",
  ja = ky, _n = "ngh", Ly = "nghm", zd = () => null;

function jy(t, e, n = !1) {
  let r = t.getAttribute(_n);
  if (r == null) return null;
  let [o, i] = r.split("|");
  if (r = n ? i : o, !r) return null;
  let s = i ? `|${i}` : "", a = n ? o : s, u = {};
  if (r !== "") {
    let c = e.get(jo, null, {optional: !0});
    c !== null && (u = c.get(ja, [])[Number(r)])
  }
  let l = {data: u, firstChild: t.firstChild ?? null};
  return n && (l.firstChild = t, Vo(l, 0, t.nextSibling)), a ? t.setAttribute(_n, a) : t.removeAttribute(_n), l
}

function Vy() {
  zd = jy
}

function Va(t, e, n = !1) {
  return zd(t, e, n)
}

function qd(t) {
  let e = t._lView;
  return e[I].type === 2 ? null : (Ia(e) && (e = e[U]), e)
}

function By(t) {
  return t.textContent?.replace(/\s/gm, "")
}

function $y(t) {
  let e = Zn(), n = e.createNodeIterator(t, NodeFilter.SHOW_COMMENT, {
    acceptNode(i) {
      let s = By(i);
      return s === "ngetn" || s === "ngtns" ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT
    }
  }), r, o = [];
  for (; r = n.nextNode();) o.push(r);
  for (let i of o) i.textContent === "ngetn" ? i.replaceWith(e.createTextNode("")) : i.remove()
}

function Vo(t, e, n) {
  t.segmentHeads ??= {}, t.segmentHeads[e] = n
}

function Ss(t, e) {
  return t.segmentHeads?.[e] ?? null
}

function Hy(t, e) {
  let n = t.data, r = n[bs]?.[e] ?? null;
  return r === null && n[Ln]?.[e] && (r = Ba(t, e)), r
}

function Gd(t, e) {
  return t.data[Ln]?.[e] ?? null
}

function Ba(t, e) {
  let n = Gd(t, e) ?? [], r = 0;
  for (let o of n) r += o[nn] * (o[mo] ?? 1);
  return r
}

function Bo(t, e) {
  if (typeof t.disconnectedNodes > "u") {
    let n = t.data[eo];
    t.disconnectedNodes = n ? new Set(n) : null
  }
  return !!t.disconnectedNodes?.has(e)
}

var $r = new R(""), Wd = !1, Qd = new R("", {providedIn: "root", factory: () => Wd}), Uy = new R(""), Hr;

function zy() {
  if (Hr === void 0 && (Hr = null, Qe.trustedTypes)) try {
    Hr = Qe.trustedTypes.createPolicy("angular", {createHTML: t => t, createScript: t => t, createScriptURL: t => t})
  } catch {
  }
  return Hr
}

function $o(t) {
  return zy()?.createHTML(t) || t
}

var Ur;

function qy() {
  if (Ur === void 0 && (Ur = null, Qe.trustedTypes)) try {
    Ur = Qe.trustedTypes.createPolicy("angular#unsafe-bypass", {
      createHTML: t => t,
      createScript: t => t,
      createScriptURL: t => t
    })
  } catch {
  }
  return Ur
}

function tc(t) {
  return qy()?.createHTML(t) || t
}

var go = class {
  constructor(e) {
    this.changingThisBreaksApplicationSecurity = e
  }

  toString() {
    return `SafeValue must use [property]=binding: ${this.changingThisBreaksApplicationSecurity} (see ${Tc})`
  }
};

function dn(t) {
  return t instanceof go ? t.changingThisBreaksApplicationSecurity : t
}

function Gy(t, e) {
  let n = Wy(t);
  if (n != null && n !== e) {
    if (n === "ResourceURL" && e === "URL") return !0;
    throw new Error(`Required a safe ${e}, got a ${n} (see ${Tc})`)
  }
  return n === e
}

function Wy(t) {
  return t instanceof go && t.getTypeName() || null
}

function Qy(t) {
  let e = new Ts(t);
  return Ky() ? new Ms(e) : e
}

var Ms = class {
  constructor(e) {
    this.inertDocumentHelper = e
  }

  getInertBodyElement(e) {
    e = "<body><remove></remove>" + e;
    try {
      let n = new window.DOMParser().parseFromString($o(e), "text/html").body;
      return n === null ? this.inertDocumentHelper.getInertBodyElement(e) : (n.removeChild(n.firstChild), n)
    } catch {
      return null
    }
  }
}, Ts = class {
  constructor(e) {
    this.defaultDoc = e, this.inertDocument = this.defaultDoc.implementation.createHTMLDocument("sanitization-inert")
  }

  getInertBodyElement(e) {
    let n = this.inertDocument.createElement("template");
    return n.innerHTML = $o(e), n
  }
};

function Ky() {
  try {
    return !!new window.DOMParser().parseFromString($o(""), "text/html")
  } catch {
    return !1
  }
}

var Yy = /^(?!javascript:)(?:[a-z0-9+.-]+:|[^&:\/?#]*(?:[\/?#]|$))/i;

function Zy(t) {
  return t = String(t), t.match(Yy) ? t : "unsafe:" + t
}

function Xe(t) {
  let e = {};
  for (let n of t.split(",")) e[n] = !0;
  return e
}

function Xn(...t) {
  let e = {};
  for (let n of t) for (let r in n) n.hasOwnProperty(r) && (e[r] = !0);
  return e
}

var Kd = Xe("area,br,col,hr,img,wbr"), Yd = Xe("colgroup,dd,dt,li,p,tbody,td,tfoot,th,thead,tr"), Zd = Xe("rp,rt"),
  Jy = Xn(Zd, Yd),
  Xy = Xn(Yd, Xe("address,article,aside,blockquote,caption,center,del,details,dialog,dir,div,dl,figure,figcaption,footer,h1,h2,h3,h4,h5,h6,header,hgroup,hr,ins,main,map,menu,nav,ol,pre,section,summary,table,ul")),
  ev = Xn(Zd, Xe("a,abbr,acronym,audio,b,bdi,bdo,big,br,cite,code,del,dfn,em,font,i,img,ins,kbd,label,map,mark,picture,q,ruby,rp,rt,s,samp,small,source,span,strike,strong,sub,sup,time,track,tt,u,var,video")),
  nc = Xn(Kd, Xy, ev, Jy), Jd = Xe("background,cite,href,itemtype,longdesc,poster,src,xlink:href"),
  tv = Xe("abbr,accesskey,align,alt,autoplay,axis,bgcolor,border,cellpadding,cellspacing,class,clear,color,cols,colspan,compact,controls,coords,datetime,default,dir,download,face,headers,height,hidden,hreflang,hspace,ismap,itemscope,itemprop,kind,label,lang,language,loop,media,muted,nohref,nowrap,open,preload,rel,rev,role,rows,rowspan,rules,scope,scrolling,shape,size,sizes,span,srclang,srcset,start,summary,tabindex,target,title,translate,type,usemap,valign,value,vspace,width"),
  nv = Xe("aria-activedescendant,aria-atomic,aria-autocomplete,aria-busy,aria-checked,aria-colcount,aria-colindex,aria-colspan,aria-controls,aria-current,aria-describedby,aria-details,aria-disabled,aria-dropeffect,aria-errormessage,aria-expanded,aria-flowto,aria-grabbed,aria-haspopup,aria-hidden,aria-invalid,aria-keyshortcuts,aria-label,aria-labelledby,aria-level,aria-live,aria-modal,aria-multiline,aria-multiselectable,aria-orientation,aria-owns,aria-placeholder,aria-posinset,aria-pressed,aria-readonly,aria-relevant,aria-required,aria-roledescription,aria-rowcount,aria-rowindex,aria-rowspan,aria-selected,aria-setsize,aria-sort,aria-valuemax,aria-valuemin,aria-valuenow,aria-valuetext"),
  rv = Xn(Jd, tv, nv), ov = Xe("script,style,template"), xs = class {
    constructor() {
      this.sanitizedSomething = !1, this.buf = []
    }

    sanitizeChildren(e) {
      let n = e.firstChild, r = !0, o = [];
      for (; n;) {
        if (n.nodeType === Node.ELEMENT_NODE ? r = this.startElement(n) : n.nodeType === Node.TEXT_NODE ? this.chars(n.nodeValue) : this.sanitizedSomething = !0, r && n.firstChild) {
          o.push(n), n = av(n);
          continue
        }
        for (; n;) {
          n.nodeType === Node.ELEMENT_NODE && this.endElement(n);
          let i = sv(n);
          if (i) {
            n = i;
            break
          }
          n = o.pop()
        }
      }
      return this.buf.join("")
    }

    startElement(e) {
      let n = rc(e).toLowerCase();
      if (!nc.hasOwnProperty(n)) return this.sanitizedSomething = !0, !ov.hasOwnProperty(n);
      this.buf.push("<"), this.buf.push(n);
      let r = e.attributes;
      for (let o = 0; o < r.length; o++) {
        let i = r.item(o), s = i.name, a = s.toLowerCase();
        if (!rv.hasOwnProperty(a)) {
          this.sanitizedSomething = !0;
          continue
        }
        let u = i.value;
        Jd[a] && (u = Zy(u)), this.buf.push(" ", s, '="', oc(u), '"')
      }
      return this.buf.push(">"), !0
    }

    endElement(e) {
      let n = rc(e).toLowerCase();
      nc.hasOwnProperty(n) && !Kd.hasOwnProperty(n) && (this.buf.push("</"), this.buf.push(n), this.buf.push(">"))
    }

    chars(e) {
      this.buf.push(oc(e))
    }
  };

function iv(t, e) {
  return (t.compareDocumentPosition(e) & Node.DOCUMENT_POSITION_CONTAINED_BY) !== Node.DOCUMENT_POSITION_CONTAINED_BY
}

function sv(t) {
  let e = t.nextSibling;
  if (e && t !== e.previousSibling) throw Xd(e);
  return e
}

function av(t) {
  let e = t.firstChild;
  if (e && iv(t, e)) throw Xd(e);
  return e
}

function rc(t) {
  let e = t.nodeName;
  return typeof e == "string" ? e : "FORM"
}

function Xd(t) {
  return new Error(`Failed to sanitize html because the element is clobbered: ${t.outerHTML}`)
}

var uv = /[\uD800-\uDBFF][\uDC00-\uDFFF]/g, lv = /([^\#-~ |!])/g;

function oc(t) {
  return t.replace(/&/g, "&amp;").replace(uv, function (e) {
    let n = e.charCodeAt(0), r = e.charCodeAt(1);
    return "&#" + ((n - 55296) * 1024 + (r - 56320) + 65536) + ";"
  }).replace(lv, function (e) {
    return "&#" + e.charCodeAt(0) + ";"
  }).replace(/</g, "&lt;").replace(/>/g, "&gt;")
}

var zr;

function cv(t, e) {
  let n = null;
  try {
    zr = zr || Qy(t);
    let r = e ? String(e) : "";
    n = zr.getInertBodyElement(r);
    let o = 5, i = r;
    do {
      if (o === 0) throw new Error("Failed to sanitize html because the input is unstable");
      o--, r = i, i = n.innerHTML, n = zr.getInertBodyElement(r)
    } while (r !== i);
    let a = new xs().sanitizeChildren(ic(n) || n);
    return $o(a)
  } finally {
    if (n) {
      let r = ic(n) || n;
      for (; r.firstChild;) r.removeChild(r.firstChild)
    }
  }
}

function ic(t) {
  return "content" in t && dv(t) ? t.content : null
}

function dv(t) {
  return t.nodeType === Node.ELEMENT_NODE && t.nodeName === "TEMPLATE"
}

var ef = function (t) {
  return t[t.NONE = 0] = "NONE", t[t.HTML = 1] = "HTML", t[t.STYLE = 2] = "STYLE", t[t.SCRIPT = 3] = "SCRIPT", t[t.URL = 4] = "URL", t[t.RESOURCE_URL = 5] = "RESOURCE_URL", t
}(ef || {});

function KN(t) {
  let e = fv();
  return e ? tc(e.sanitize(ef.HTML, t) || "") : Gy(t, "HTML") ? tc(dn(t)) : cv(Zn(), xe(t))
}

function fv() {
  let t = N();
  return t && t[Oe].sanitizer
}

var hv = /^>|^->|<!--|-->|--!>|<!-$/g, pv = /(<|>)/g, mv = "\u200B$1\u200B";

function gv(t) {
  return t.replace(hv, e => e.replace(pv, mv))
}

function yv(t) {
  return t.ownerDocument.body
}

function tf(t) {
  return t instanceof Function ? t() : t
}

function qr(t) {
  return (t ?? M(dt)).get(Jn) === "browser"
}

var yo = function (t) {
  return t[t.Important = 1] = "Important", t[t.DashCase = 2] = "DashCase", t
}(yo || {}), vv;

function $a(t, e) {
  return vv(t, e)
}

function Wt(t, e, n, r, o) {
  if (r != null) {
    let i, s = !1;
    ve(r) ? i = r : Ke(r) && (s = !0, r = r[W]);
    let a = Z(r);
    t === 0 && n !== null ? o == null ? of(e, n, a) : vo(e, n, a, o || null, !0) : t === 1 && n !== null ? vo(e, n, a, o || null, !0) : t === 2 ? Wa(e, a, s) : t === 3 && e.destroyNode(a), i != null && Fv(e, t, i, n, o)
  }
}

function Ha(t, e) {
  return t.createText(e)
}

function Dv(t, e, n) {
  t.setValue(e, n)
}

function Ua(t, e) {
  return t.createComment(gv(e))
}

function Ho(t, e, n) {
  return t.createElement(e, n)
}

function Ev(t, e) {
  nf(t, e), e[W] = null, e[ye] = null
}

function wv(t, e, n, r, o, i) {
  r[W] = o, r[ye] = e, zo(t, r, n, 1, o, i)
}

function nf(t, e) {
  e[Oe].changeDetectionScheduler?.notify(1), zo(t, e, e[j], 2, null, null)
}

function bv(t) {
  let e = t[An];
  if (!e) return Qi(t[I], t);
  for (; e;) {
    let n = null;
    if (Ke(e)) n = e[An]; else {
      let r = e[ne];
      r && (n = r)
    }
    if (!n) {
      for (; e && !e[Ae] && e !== t;) Ke(e) && Qi(e[I], e), e = e[J];
      e === null && (e = t), Ke(e) && Qi(e[I], e), n = e && e[Ae]
    }
    e = n
  }
}

function Iv(t, e, n, r) {
  let o = ne + r, i = n.length;
  r > 0 && (n[o - 1][Ae] = e), r < i - ne ? (e[Ae] = n[o], jc(n, ne + r, e)) : (n.push(e), e[Ae] = null), e[J] = n;
  let s = e[Qn];
  s !== null && n !== s && _v(s, e);
  let a = e[Ye];
  a !== null && a.insertView(t), hs(e), e[_] |= 128
}

function _v(t, e) {
  let n = t[tn], o = e[J][J][le];
  e[le] !== o && (t[_] |= wa.HasTransplantedViews), n === null ? t[tn] = [e] : n.push(e)
}

function rf(t, e) {
  let n = t[tn], r = n.indexOf(e);
  n.splice(r, 1)
}

function jn(t, e) {
  if (t.length <= ne) return;
  let n = ne + e, r = t[n];
  if (r) {
    let o = r[Qn];
    o !== null && o !== t && rf(o, r), e > 0 && (t[n - 1][Ae] = r[Ae]);
    let i = io(t, ne + e);
    Ev(r[I], r);
    let s = i[Ye];
    s !== null && s.detachView(i[I]), r[J] = null, r[Ae] = null, r[_] &= -129
  }
  return r
}

function Uo(t, e) {
  if (!(e[_] & 256)) {
    let n = e[j];
    n.destroyNode && zo(t, e, n, 3, null, null), bv(e)
  }
}

function Qi(t, e) {
  if (e[_] & 256) return;
  let n = A(null);
  try {
    e[_] &= -129, e[_] |= 256, e[_t] && sl(e[_t]), Sv(t, e), Cv(t, e), e[I].type === 1 && e[j].destroy();
    let r = e[Qn];
    if (r !== null && ve(e[J])) {
      r !== e[J] && rf(r, e);
      let o = e[Ye];
      o !== null && o.detachView(t)
    }
    Ny(e)
  } finally {
    A(n)
  }
}

function Cv(t, e) {
  let n = t.cleanup, r = e[Nn];
  if (n !== null) for (let i = 0; i < n.length - 1; i += 2) if (typeof n[i] == "string") {
    let s = n[i + 3];
    s >= 0 ? r[s]() : r[-s].unsubscribe(), i += 2
  } else {
    let s = r[n[i + 1]];
    n[i].call(s)
  }
  r !== null && (e[Nn] = null);
  let o = e[ot];
  if (o !== null) {
    e[ot] = null;
    for (let i = 0; i < o.length; i++) {
      let s = o[i];
      s()
    }
  }
}

function Sv(t, e) {
  let n;
  if (t != null && (n = t.destroyHooks) != null) for (let r = 0; r < n.length; r += 2) {
    let o = e[n[r]];
    if (!(o instanceof St)) {
      let i = n[r + 1];
      if (Array.isArray(i)) for (let s = 0; s < i.length; s += 2) {
        let a = o[i[s]], u = i[s + 1];
        Ve(4, a, u);
        try {
          u.call(a)
        } finally {
          Ve(5, a, u)
        }
      } else {
        Ve(4, o, i);
        try {
          i.call(o)
        } finally {
          Ve(5, o, i)
        }
      }
    }
  }
}

function za(t, e, n) {
  return Mv(t, e.parent, n)
}

function Mv(t, e, n) {
  let r = e;
  for (; r !== null && r.type & 40;) e = r, r = e.parent;
  if (r === null) return n[W];
  {
    let {componentOffset: o} = r;
    if (o > -1) {
      let {encapsulation: i} = t.data[r.directiveStart + o];
      if (i === Jt.None || i === Jt.Emulated) return null
    }
    return De(r, n)
  }
}

function vo(t, e, n, r, o) {
  t.insertBefore(e, n, r, o)
}

function of(t, e, n) {
  t.appendChild(e, n)
}

function sc(t, e, n, r, o) {
  r !== null ? vo(t, e, n, r, o) : of(t, e, n)
}

function Tv(t, e, n, r) {
  t.removeChild(e, n, r)
}

function qa(t, e) {
  return t.parentNode(e)
}

function xv(t, e) {
  return t.nextSibling(e)
}

function sf(t, e, n) {
  return Av(t, e, n)
}

function Nv(t, e, n) {
  return t.type & 40 ? De(t, n) : null
}

var Av = Nv, ac;

function Ga(t, e, n, r) {
  let o = za(t, r, e), i = e[j], s = r.parent || e[ye], a = sf(s, r, e);
  if (o != null) if (Array.isArray(n)) for (let u = 0; u < n.length; u++) sc(i, o, n[u], a, !1); else sc(i, o, n, a, !1);
  ac !== void 0 && ac(i, r, e, n, o)
}

function Cn(t, e) {
  if (e !== null) {
    let n = e.type;
    if (n & 3) return De(e, t);
    if (n & 4) return Ns(-1, t[e.index]);
    if (n & 8) {
      let r = e.child;
      if (r !== null) return Cn(t, r);
      {
        let o = t[e.index];
        return ve(o) ? Ns(-1, o) : Z(o)
      }
    } else {
      if (n & 32) return $a(e, t)() || Z(t[e.index]);
      {
        let r = af(t, e);
        if (r !== null) {
          if (Array.isArray(r)) return r[0];
          let o = Pn(t[le]);
          return Cn(o, r)
        } else return Cn(t, e.next)
      }
    }
  }
  return null
}

function af(t, e) {
  if (e !== null) {
    let r = t[le][ye], o = e.projection;
    return r.projection[o]
  }
  return null
}

function Ns(t, e) {
  let n = ne + t + 1;
  if (n < e.length) {
    let r = e[n], o = r[I].firstChild;
    if (o !== null) return Cn(r, o)
  }
  return e[Ze]
}

function Wa(t, e, n) {
  let r = qa(t, e);
  r && Tv(t, r, e, n)
}

function uf(t) {
  t.textContent = ""
}

function Qa(t, e, n, r, o, i, s) {
  for (; n != null;) {
    let a = r[n.index], u = n.type;
    if (s && e === 0 && (a && xt(Z(a), r), n.flags |= 2), (n.flags & 32) !== 32) if (u & 8) Qa(t, e, n.child, r, o, i, !1), Wt(e, t, o, a, i); else if (u & 32) {
      let l = $a(n, r), c;
      for (; c = l();) Wt(e, t, o, c, i);
      Wt(e, t, o, a, i)
    } else u & 16 ? lf(t, e, r, n, o, i) : Wt(e, t, o, a, i);
    n = s ? n.projectionNext : n.next
  }
}

function zo(t, e, n, r, o, i) {
  Qa(n, r, t.firstChild, e, o, i, !1)
}

function Ov(t, e, n) {
  let r = e[j], o = za(t, n, e), i = n.parent || e[ye], s = sf(i, n, e);
  lf(r, 0, e, n, o, s)
}

function lf(t, e, n, r, o, i) {
  let s = n[le], u = s[ye].projection[r.projection];
  if (Array.isArray(u)) for (let l = 0; l < u.length; l++) {
    let c = u[l];
    Wt(e, t, o, c, i)
  } else {
    let l = u, c = s[J];
    ho(r) && (l.flags |= 128), Qa(t, e, l, c, o, i, !0)
  }
}

function Fv(t, e, n, r, o) {
  let i = n[Ze], s = Z(n);
  i !== s && Wt(e, t, r, i, o);
  for (let a = ne; a < n.length; a++) {
    let u = n[a];
    zo(u[I], u, t, e, r, i)
  }
}

function Pv(t, e, n, r, o) {
  if (e) o ? t.addClass(n, r) : t.removeClass(n, r); else {
    let i = r.indexOf("-") === -1 ? void 0 : yo.DashCase;
    o == null ? t.removeStyle(n, r, i) : (typeof o == "string" && o.endsWith("!important") && (o = o.slice(0, -10), i |= yo.Important), t.setStyle(n, r, o, i))
  }
}

function Rv(t, e, n) {
  t.setAttribute(e, "style", n)
}

function cf(t, e, n) {
  n === "" ? t.removeAttribute(e, "class") : t.setAttribute(e, "class", n)
}

function df(t, e, n) {
  let {mergedAttrs: r, classes: o, styles: i} = n;
  r !== null && us(t, e, r), o !== null && cf(t, e, o), i !== null && Rv(t, e, i)
}

var Pe = {};

function YN(t = 1) {
  ff(Q(), N(), ct() + t, !1)
}

function ff(t, e, n, r) {
  if (!r) if ((e[_] & 3) === 3) {
    let i = t.preOrderCheckHooks;
    i !== null && Zr(e, i, n)
  } else {
    let i = t.preOrderHooks;
    i !== null && Jr(e, i, 0, n)
  }
  Ct(n)
}

function er(t, e = F.Default) {
  let n = N();
  if (n === null) return te(t, e);
  let r = he();
  return Ad(r, n, ae(t), e)
}

function ZN() {
  let t = "invalid";
  throw new Error(t)
}

function hf(t, e, n, r, o, i) {
  let s = A(null);
  try {
    let a = null;
    o & fe.SignalBased && (a = e[r][nl]), a !== null && a.transformFn !== void 0 && (i = a.transformFn(i)), o & fe.HasDecoratorInputTransform && (i = t.inputTransforms[r].call(e, i)), t.setInput !== null ? t.setInput(e, a, i, n, r) : od(e, a, r, i)
  } finally {
    A(s)
  }
}

function kv(t, e) {
  let n = t.hostBindingOpCodes;
  if (n !== null) try {
    for (let r = 0; r < n.length; r++) {
      let o = n[r];
      if (o < 0) Ct(~o); else {
        let i = o, s = n[++r], a = n[++r];
        ry(s, i);
        let u = e[i];
        a(2, u)
      }
    }
  } finally {
    Ct(-1)
  }
}

function qo(t, e, n, r, o, i, s, a, u, l, c) {
  let d = e.blueprint.slice();
  return d[W] = o, d[_] = r | 4 | 128 | 8 | 64, (l !== null || t && t[_] & 2048) && (d[_] |= 2048), ld(d), d[J] = d[an] = t, d[re] = n, d[Oe] = s || t && t[Oe], d[j] = a || t && t[j], d[en] = u || t && t[en] || null, d[ye] = i, d[Ro] = Ty(), d[ge] = c, d[nd] = l, d[le] = e.type == 2 ? t[le] : d, d
}

function tr(t, e, n, r, o) {
  let i = t.data[e];
  if (i === null) i = Lv(t, e, n, r, o), ny() && (i.flags |= 32); else if (i.type & 64) {
    i.type = n, i.value = r, i.attrs = o;
    let s = Xg();
    i.injectorIndex = s === null ? -1 : s.injectorIndex
  }
  return Kn(i, !0), i
}

function Lv(t, e, n, r, o) {
  let i = fd(), s = hd(), a = s ? i : i && i.parent, u = t.data[e] = zv(t, a, n, e, r, o);
  return t.firstChild === null && (t.firstChild = u), i !== null && (s ? i.child == null && u.parent !== null && (i.child = u) : i.next === null && (i.next = u, u.prev = i)), u
}

function pf(t, e, n, r) {
  if (n === 0) return -1;
  let o = e.length;
  for (let i = 0; i < n; i++) e.push(r), t.blueprint.push(r), t.data.push(null);
  return o
}

function mf(t, e, n, r, o) {
  let i = ct(), s = r & 2;
  try {
    Ct(-1), s && e.length > U && ff(t, e, U, !1), Ve(s ? 2 : 0, o), n(r, o)
  } finally {
    Ct(i), Ve(s ? 3 : 1, o)
  }
}

function gf(t, e, n) {
  if (rd(e)) {
    let r = A(null);
    try {
      let o = e.directiveStart, i = e.directiveEnd;
      for (let s = o; s < i; s++) {
        let a = t.data[s];
        if (a.contentQueries) {
          let u = n[s];
          a.contentQueries(1, u, s)
        }
      }
    } finally {
      A(r)
    }
  }
}

function yf(t, e, n) {
  dd() && (Yv(t, e, n, De(n, e)), (n.flags & 64) === 64 && If(t, e, n))
}

function vf(t, e, n = De) {
  let r = e.localNames;
  if (r !== null) {
    let o = e.index + 1;
    for (let i = 0; i < r.length; i += 2) {
      let s = r[i + 1], a = s === -1 ? n(e, t) : t[s];
      t[o++] = a
    }
  }
}

function Df(t) {
  let e = t.tView;
  return e === null || e.incompleteFirstPass ? t.tView = Ka(1, null, t.template, t.decls, t.vars, t.directiveDefs, t.pipeDefs, t.viewQuery, t.schemas, t.consts, t.id) : e
}

function Ka(t, e, n, r, o, i, s, a, u, l, c) {
  let d = U + r, f = d + o, h = jv(d, f), p = typeof l == "function" ? l() : l;
  return h[I] = {
    type: t,
    blueprint: h,
    template: n,
    queries: null,
    viewQuery: a,
    declTNode: e,
    data: h.slice().fill(null, d),
    bindingStartIndex: d,
    expandoStartIndex: f,
    hostBindingOpCodes: null,
    firstCreatePass: !0,
    firstUpdatePass: !0,
    staticViewQueries: !1,
    staticContentQueries: !1,
    preOrderHooks: null,
    preOrderCheckHooks: null,
    contentHooks: null,
    contentCheckHooks: null,
    viewHooks: null,
    viewCheckHooks: null,
    destroyHooks: null,
    cleanup: null,
    contentQueries: null,
    components: null,
    directiveRegistry: typeof i == "function" ? i() : i,
    pipeRegistry: typeof s == "function" ? s() : s,
    firstChild: null,
    schemas: u,
    consts: p,
    incompleteFirstPass: !1,
    ssrId: c
  }
}

function jv(t, e) {
  let n = [];
  for (let r = 0; r < e; r++) n.push(r < t ? null : Pe);
  return n
}

function Vv(t, e, n, r) {
  let i = r.get(Qd, Wd) || n === Jt.ShadowDom, s = t.selectRootElement(e, i);
  return Bv(s), s
}

function Bv(t) {
  Ef(t)
}

var Ef = () => null;

function $v(t) {
  jd(t) ? uf(t) : $y(t)
}

function Hv() {
  Ef = $v
}

function Uv(t, e, n, r) {
  let o = Sf(e);
  o.push(n), t.firstCreatePass && Mf(t).push(r, o.length - 1)
}

function zv(t, e, n, r, o, i) {
  let s = e ? e.injectorIndex : -1, a = 0;
  return ln() && (a |= 128), {
    type: n,
    index: r,
    insertBeforeIndex: null,
    injectorIndex: s,
    directiveStart: -1,
    directiveEnd: -1,
    directiveStylingLast: -1,
    componentOffset: -1,
    propertyBindings: null,
    flags: a,
    providerIndexes: 0,
    value: o,
    attrs: i,
    mergedAttrs: null,
    localNames: null,
    initialInputs: void 0,
    inputs: null,
    outputs: null,
    tView: null,
    next: null,
    prev: null,
    projectionNext: null,
    child: null,
    parent: e,
    projection: null,
    styles: null,
    stylesWithoutHost: null,
    residualStyles: void 0,
    classes: null,
    classesWithoutHost: null,
    residualClasses: void 0,
    classBindings: 0,
    styleBindings: 0
  }
}

function uc(t, e, n, r, o) {
  for (let i in e) {
    if (!e.hasOwnProperty(i)) continue;
    let s = e[i];
    if (s === void 0) continue;
    r ??= {};
    let a, u = fe.None;
    Array.isArray(s) ? (a = s[0], u = s[1]) : a = s;
    let l = i;
    if (o !== null) {
      if (!o.hasOwnProperty(i)) continue;
      l = o[i]
    }
    t === 0 ? lc(r, n, l, a, u) : lc(r, n, l, a)
  }
  return r
}

function lc(t, e, n, r, o) {
  let i;
  t.hasOwnProperty(n) ? (i = t[n]).push(e, r) : i = t[n] = [e, r], o !== void 0 && i.push(o)
}

function qv(t, e, n) {
  let r = e.directiveStart, o = e.directiveEnd, i = t.data, s = e.attrs, a = [], u = null, l = null;
  for (let c = r; c < o; c++) {
    let d = i[c], f = n ? n.get(d) : null, h = f ? f.inputs : null, p = f ? f.outputs : null;
    u = uc(0, d.inputs, c, u, h), l = uc(1, d.outputs, c, l, p);
    let m = u !== null && s !== null && !ga(e) ? aD(u, c, s) : null;
    a.push(m)
  }
  u !== null && (u.hasOwnProperty("class") && (e.flags |= 8), u.hasOwnProperty("style") && (e.flags |= 16)), e.initialInputs = a, e.inputs = u, e.outputs = l
}

function Gv(t) {
  return t === "class" ? "className" : t === "for" ? "htmlFor" : t === "formaction" ? "formAction" : t === "innerHtml" ? "innerHTML" : t === "readonly" ? "readOnly" : t === "tabindex" ? "tabIndex" : t
}

function Go(t, e, n, r, o, i, s, a) {
  let u = De(e, n), l = e.inputs, c;
  !a && l != null && (c = l[r]) ? (Ya(t, n, c, r, o), un(e) && Wv(n, e.index)) : e.type & 3 ? (r = Gv(r), o = s != null ? s(o, e.value || "", r) : o, i.setProperty(u, r, o)) : e.type & 12
}

function Wv(t, e) {
  let n = lt(e, t);
  n[_] & 16 || (n[_] |= 64)
}

function wf(t, e, n, r) {
  if (dd()) {
    let o = r === null ? null : {"": -1}, i = Jv(t, n), s, a;
    i === null ? s = a = null : [s, a] = i, s !== null && bf(t, e, n, s, o, a), o && Xv(n, r, o)
  }
  n.mergedAttrs = Tn(n.mergedAttrs, n.attrs)
}

function bf(t, e, n, r, o, i) {
  for (let l = 0; l < r.length; l++) gs(fo(n, e), t, r[l].type);
  tD(n, t.data.length, r.length);
  for (let l = 0; l < r.length; l++) {
    let c = r[l];
    c.providersResolver && c.providersResolver(c)
  }
  let s = !1, a = !1, u = pf(t, e, r.length, null);
  for (let l = 0; l < r.length; l++) {
    let c = r[l];
    n.mergedAttrs = Tn(n.mergedAttrs, c.hostAttrs), nD(t, n, e, u, c), eD(u, c, o), c.contentQueries !== null && (n.flags |= 4), (c.hostBindings !== null || c.hostAttrs !== null || c.hostVars !== 0) && (n.flags |= 64);
    let d = c.type.prototype;
    !s && (d.ngOnChanges || d.ngOnInit || d.ngDoCheck) && ((t.preOrderHooks ??= []).push(n.index), s = !0), !a && (d.ngOnChanges || d.ngDoCheck) && ((t.preOrderCheckHooks ??= []).push(n.index), a = !0), u++
  }
  qv(t, n, i)
}

function Qv(t, e, n, r, o) {
  let i = o.hostBindings;
  if (i) {
    let s = t.hostBindingOpCodes;
    s === null && (s = t.hostBindingOpCodes = []);
    let a = ~e.index;
    Kv(s) != a && s.push(a), s.push(n, r, i)
  }
}

function Kv(t) {
  let e = t.length;
  for (; e > 0;) {
    let n = t[--e];
    if (typeof n == "number" && n < 0) return n
  }
  return 0
}

function Yv(t, e, n, r) {
  let o = n.directiveStart, i = n.directiveEnd;
  un(n) && rD(e, n, t.data[o + n.componentOffset]), t.firstCreatePass || fo(n, e), xt(r, e);
  let s = n.initialInputs;
  for (let a = o; a < i; a++) {
    let u = t.data[a], l = Mt(e, t, a, n);
    if (xt(l, e), s !== null && sD(e, a - o, l, u, n, s), Je(u)) {
      let c = lt(n.index, e);
      c[re] = Mt(e, t, a, n)
    }
  }
}

function If(t, e, n) {
  let r = n.directiveStart, o = n.directiveEnd, i = n.index, s = oy();
  try {
    Ct(i);
    for (let a = r; a < o; a++) {
      let u = t.data[a], l = e[a];
      ps(a), (u.hostBindings !== null || u.hostVars !== 0 || u.hostAttrs !== null) && Zv(u, l)
    }
  } finally {
    Ct(-1), ps(s)
  }
}

function Zv(t, e) {
  t.hostBindings !== null && t.hostBindings(1, e)
}

function Jv(t, e) {
  let n = t.directiveRegistry, r = null, o = null;
  if (n) for (let i = 0; i < n.length; i++) {
    let s = n[i];
    if (Uc(e, s.selectors, !1)) if (r || (r = []), Je(s)) if (s.findHostDirectiveDefs !== null) {
      let a = [];
      o = o || new Map, s.findHostDirectiveDefs(s, a, o), r.unshift(...a, s);
      let u = a.length;
      As(t, e, u)
    } else r.unshift(s), As(t, e, 0); else o = o || new Map, s.findHostDirectiveDefs?.(s, r, o), r.push(s)
  }
  return r === null ? null : [r, o]
}

function As(t, e, n) {
  e.componentOffset = n, (t.components ??= []).push(e.index)
}

function Xv(t, e, n) {
  if (e) {
    let r = t.localNames = [];
    for (let o = 0; o < e.length; o += 2) {
      let i = n[e[o + 1]];
      if (i == null) throw new g(-301, !1);
      r.push(e[o], i)
    }
  }
}

function eD(t, e, n) {
  if (n) {
    if (e.exportAs) for (let r = 0; r < e.exportAs.length; r++) n[e.exportAs[r]] = t;
    Je(e) && (n[""] = t)
  }
}

function tD(t, e, n) {
  t.flags |= 1, t.directiveStart = e, t.directiveEnd = e + n, t.providerIndexes = e
}

function nD(t, e, n, r, o) {
  t.data[r] = o;
  let i = o.factory || (o.factory = Yt(o.type, !0)), s = new St(i, Je(o), er);
  t.blueprint[r] = s, n[r] = s, Qv(t, e, r, pf(t, n, o.hostVars, Pe), o)
}

function rD(t, e, n) {
  let r = De(e, t), o = Df(n), i = t[Oe].rendererFactory, s = 16;
  n.signals ? s = 4096 : n.onPush && (s = 64);
  let a = Wo(t, qo(t, o, null, s, r, e, null, i.createRenderer(r, n), null, null, null));
  t[e.index] = a
}

function oD(t, e, n, r, o, i) {
  let s = De(t, e);
  iD(e[j], s, i, t.value, n, r, o)
}

function iD(t, e, n, r, o, i, s) {
  if (i == null) t.removeAttribute(e, o, n); else {
    let a = s == null ? xe(i) : s(i, r || "", o);
    t.setAttribute(e, o, a, n)
  }
}

function sD(t, e, n, r, o, i) {
  let s = i[e];
  if (s !== null) for (let a = 0; a < s.length;) {
    let u = s[a++], l = s[a++], c = s[a++], d = s[a++];
    hf(r, n, u, l, c, d)
  }
}

function aD(t, e, n) {
  let r = null, o = 0;
  for (; o < n.length;) {
    let i = n[o];
    if (i === 0) {
      o += 4;
      continue
    } else if (i === 5) {
      o += 2;
      continue
    }
    if (typeof i == "number") break;
    if (t.hasOwnProperty(i)) {
      r === null && (r = []);
      let s = t[i];
      for (let a = 0; a < s.length; a += 3) if (s[a] === e) {
        r.push(i, s[a + 1], s[a + 2], n[o + 1]);
        break
      }
    }
    o += 2
  }
  return r
}

function _f(t, e, n, r) {
  return [t, !0, 0, e, null, r, null, n, null, null]
}

function Cf(t, e) {
  let n = t.contentQueries;
  if (n !== null) {
    let r = A(null);
    try {
      for (let o = 0; o < n.length; o += 2) {
        let i = n[o], s = n[o + 1];
        if (s !== -1) {
          let a = t.data[s];
          xa(i), a.contentQueries(2, e[s], s)
        }
      }
    } finally {
      A(r)
    }
  }
}

function Wo(t, e) {
  return t[An] ? t[Wl][Ae] = e : t[An] = e, t[Wl] = e, e
}

function Os(t, e, n) {
  xa(0);
  let r = A(null);
  try {
    e(t, n)
  } finally {
    A(r)
  }
}

function Sf(t) {
  return t[Nn] || (t[Nn] = [])
}

function Mf(t) {
  return t.cleanup || (t.cleanup = [])
}

function Tf(t, e, n) {
  return (t === null || Je(t)) && (n = _a(n[e.index])), n[j]
}

function xf(t, e) {
  let n = t[en], r = n ? n.get(Tt, null) : null;
  r && r.handleError(e)
}

function Ya(t, e, n, r, o) {
  for (let i = 0; i < n.length;) {
    let s = n[i++], a = n[i++], u = n[i++], l = e[s], c = t.data[s];
    hf(c, l, r, a, u, o)
  }
}

function uD(t, e, n) {
  let r = ud(e, t);
  Dv(t[j], r, n)
}

function lD(t, e) {
  let n = lt(e, t), r = n[I];
  cD(r, n);
  let o = n[W];
  o !== null && n[ge] === null && (n[ge] = Va(o, n[en])), Za(r, n, n[re])
}

function cD(t, e) {
  for (let n = e.length; n < t.blueprint.length; n++) e.push(t.blueprint[n])
}

function Za(t, e, n) {
  Na(e);
  try {
    let r = t.viewQuery;
    r !== null && Os(1, r, n);
    let o = t.template;
    o !== null && mf(t, e, o, 1, n), t.firstCreatePass && (t.firstCreatePass = !1), e[Ye]?.finishViewCreation(t), t.staticContentQueries && Cf(t, e), t.staticViewQueries && Os(2, t.viewQuery, n);
    let i = t.components;
    i !== null && dD(e, i)
  } catch (r) {
    throw t.firstCreatePass && (t.incompleteFirstPass = !0, t.firstCreatePass = !1), r
  } finally {
    e[_] &= -5, Aa()
  }
}

function dD(t, e) {
  for (let n = 0; n < e.length; n++) lD(t, e[n])
}

function Qo(t, e, n, r) {
  let o = A(null);
  try {
    let i = e.tView, a = t[_] & 4096 ? 4096 : 16,
      u = qo(t, i, n, a, null, e, null, null, r?.injector ?? null, r?.embeddedViewInjector ?? null, r?.dehydratedView ?? null),
      l = t[e.index];
    u[Qn] = l;
    let c = t[Ye];
    return c !== null && (u[Ye] = c.createEmbeddedView(i)), Za(i, u, n), u
  } finally {
    A(o)
  }
}

function Nf(t, e) {
  let n = ne + e;
  if (n < t.length) return t[n]
}

function Vn(t, e) {
  return !e || e.firstChild === null || ho(t)
}

function Ko(t, e, n, r = !0) {
  let o = e[I];
  if (Iv(o, e, t, n), r) {
    let s = Ns(n, t), a = e[j], u = qa(a, t[Ze]);
    u !== null && wv(o, t[ye], a, e, u, s)
  }
  let i = e[ge];
  i !== null && i.firstChild !== null && (i.firstChild = null)
}

function Af(t, e) {
  let n = jn(t, e);
  return n !== void 0 && Uo(n[I], n), n
}

function Bn(t, e, n, r, o = !1) {
  for (; n !== null;) {
    let i = e[n.index];
    i !== null && r.push(Z(i)), ve(i) && Of(i, r);
    let s = n.type;
    if (s & 8) Bn(t, e, n.child, r); else if (s & 32) {
      let a = $a(n, e), u;
      for (; u = a();) r.push(u)
    } else if (s & 16) {
      let a = af(e, n);
      if (Array.isArray(a)) r.push(...a); else {
        let u = Pn(e[le]);
        Bn(u[I], u, a, r, !0)
      }
    }
    n = o ? n.projectionNext : n.next
  }
  return r
}

function Of(t, e) {
  for (let n = ne; n < t.length; n++) {
    let r = t[n], o = r[I].firstChild;
    o !== null && Bn(r[I], r, o, e)
  }
  t[Ze] !== t[W] && e.push(t[Ze])
}

var Ff = [];

function fD(t) {
  return t[_t] ?? hD(t)
}

function hD(t) {
  let e = Ff.pop() ?? Object.create(mD);
  return e.lView = t, e
}

function pD(t) {
  t.lView[_t] !== t && (t.lView = null, Ff.push(t))
}

var mD = gn(Ie({}, rl), {
  consumerIsAlwaysLive: !0, consumerMarkedDirty: t => {
    Fn(t.lView)
  }, consumerOnSignalRead() {
    this.lView[_t] = this
  }
}), Pf = 100;

function Rf(t, e = !0, n = 0) {
  let r = t[Oe], o = r.rendererFactory, i = !1;
  i || o.begin?.();
  try {
    gD(t, n)
  } catch (s) {
    throw e && xf(t, s), s
  } finally {
    i || (o.end?.(), r.inlineEffectRunner?.flush())
  }
}

function gD(t, e) {
  Fs(t, e);
  let n = 0;
  for (; Ma(t);) {
    if (n === Pf) throw new g(103, !1);
    n++, Fs(t, 1)
  }
}

function yD(t, e, n, r) {
  let o = e[_];
  if ((o & 256) === 256) return;
  let i = !1;
  !i && e[Oe].inlineEffectRunner?.flush(), Na(e);
  let s = null, a = null;
  !i && vD(t) && (a = fD(e), s = ol(a));
  try {
    ld(e), ty(t.bindingStartIndex), n !== null && mf(t, e, n, 2, r);
    let u = (o & 3) === 3;
    if (!i) if (u) {
      let d = t.preOrderCheckHooks;
      d !== null && Zr(e, d, null)
    } else {
      let d = t.preOrderHooks;
      d !== null && Jr(e, d, 0, null), zi(e, 0)
    }
    if (DD(e), kf(e, 0), t.contentQueries !== null && Cf(t, e), !i) if (u) {
      let d = t.contentCheckHooks;
      d !== null && Zr(e, d)
    } else {
      let d = t.contentHooks;
      d !== null && Jr(e, d, 1), zi(e, 1)
    }
    kv(t, e);
    let l = t.components;
    l !== null && jf(e, l, 0);
    let c = t.viewQuery;
    if (c !== null && Os(2, c, r), !i) if (u) {
      let d = t.viewCheckHooks;
      d !== null && Zr(e, d)
    } else {
      let d = t.viewHooks;
      d !== null && Jr(e, d, 2), zi(e, 2)
    }
    if (t.firstUpdatePass === !0 && (t.firstUpdatePass = !1), e[Ui]) {
      for (let d of e[Ui]) d();
      e[Ui] = null
    }
    i || (e[_] &= -73)
  } catch (u) {
    throw Fn(e), u
  } finally {
    a !== null && (il(a, s), pD(a)), Aa()
  }
}

function vD(t) {
  return t.type !== 2
}

function kf(t, e) {
  for (let n = Bd(t); n !== null; n = $d(n)) for (let r = ne; r < n.length; r++) {
    let o = n[r];
    Lf(o, e)
  }
}

function DD(t) {
  for (let e = Bd(t); e !== null; e = $d(e)) {
    if (!(e[_] & wa.HasTransplantedViews)) continue;
    let n = e[tn];
    for (let r = 0; r < n.length; r++) {
      let o = n[r], i = o[J];
      zg(o)
    }
  }
}

function ED(t, e, n) {
  let r = lt(e, t);
  Lf(r, n)
}

function Lf(t, e) {
  Sa(t) && Fs(t, e)
}

function Fs(t, e) {
  let r = t[I], o = t[_], i = t[_t], s = !!(e === 0 && o & 16);
  if (s ||= !!(o & 64 && e === 0), s ||= !!(o & 1024), s ||= !!(i?.dirty && bi(i)), i && (i.dirty = !1), t[_] &= -9217, s) yD(r, t, r.template, t[re]); else if (o & 8192) {
    kf(t, 1);
    let a = r.components;
    a !== null && jf(t, a, 1)
  }
}

function jf(t, e, n) {
  for (let r = 0; r < e.length; r++) ED(t, e[r], n)
}

function Ja(t) {
  for (t[Oe].changeDetectionScheduler?.notify(); t;) {
    t[_] |= 64;
    let e = Pn(t);
    if (Ia(t) && !e) return t;
    t = e
  }
  return null
}

var Nt = class {
  constructor(e, n, r = !0) {
    this._lView = e, this._cdRefInjectingView = n, this.notifyErrorHandler = r, this._appRef = null, this._attachedToViewContainer = !1
  }

  get rootNodes() {
    let e = this._lView, n = e[I];
    return Bn(n, e, n.firstChild, [])
  }

  get context() {
    return this._lView[re]
  }

  set context(e) {
    this._lView[re] = e
  }

  get destroyed() {
    return (this._lView[_] & 256) === 256
  }

  destroy() {
    if (this._appRef) this._appRef.detachView(this); else if (this._attachedToViewContainer) {
      let e = this._lView[J];
      if (ve(e)) {
        let n = e[ao], r = n ? n.indexOf(this) : -1;
        r > -1 && (jn(e, r), io(n, r))
      }
      this._attachedToViewContainer = !1
    }
    Uo(this._lView[I], this._lView)
  }

  onDestroy(e) {
    cd(this._lView, e)
  }

  markForCheck() {
    Ja(this._cdRefInjectingView || this._lView)
  }

  detach() {
    this._lView[_] &= -129
  }

  reattach() {
    hs(this._lView), this._lView[_] |= 128
  }

  detectChanges() {
    this._lView[_] |= 1024, Rf(this._lView, this.notifyErrorHandler)
  }

  checkNoChanges() {
  }

  attachToViewContainerRef() {
    if (this._appRef) throw new g(902, !1);
    this._attachedToViewContainer = !0
  }

  detachFromAppRef() {
    this._appRef = null, nf(this._lView[I], this._lView)
  }

  attachToAppRef(e) {
    if (this._attachedToViewContainer) throw new g(902, !1);
    this._appRef = e, hs(this._lView)
  }
}, $n = (() => {
  let e = class e {
  };
  e.__NG_ELEMENT_ID__ = ID;
  let t = e;
  return t
})(), wD = $n, bD = class extends wD {
  constructor(e, n, r) {
    super(), this._declarationLView = e, this._declarationTContainer = n, this.elementRef = r
  }

  get ssrId() {
    return this._declarationTContainer.tView?.ssrId || null
  }

  createEmbeddedView(e, n) {
    return this.createEmbeddedViewImpl(e, n)
  }

  createEmbeddedViewImpl(e, n, r) {
    let o = Qo(this._declarationLView, this._declarationTContainer, e, {embeddedViewInjector: n, dehydratedView: r});
    return new Nt(o)
  }
};

function ID() {
  return Yo(he(), N())
}

function Yo(t, e) {
  return t.type & 4 ? new bD(e, t, cn(t, e)) : null
}

var Ps = "<-- AT THIS LOCATION";

function _D(t) {
  switch (t) {
    case 4:
      return "view container";
    case 2:
      return "element";
    case 8:
      return "ng-container";
    case 32:
      return "icu";
    case 64:
      return "i18n";
    case 16:
      return "projection";
    case 1:
      return "text";
    default:
      return "<unknown>"
  }
}

function CD(t, e) {
  let n = `During serialization, Angular was unable to find an element in the DOM:

`, r = `${ND(t, e, !1)}

`, o = OD();
  throw new g(-502, n + r + o)
}

function SD(t) {
  let e = "During serialization, Angular detected DOM nodes that were created outside of Angular context and provided as projectable nodes (likely via `ViewContainerRef.createComponent` or `createComponent` APIs). Hydration is not supported for such cases, consider refactoring the code to avoid this pattern or using `ngSkipHydration` on the host element of the component.\n\n",
    n = `${AD(t)}

`, r = e + n + FD();
  return new g(-503, r)
}

function MD(t) {
  let e = [];
  if (t.attrs) for (let n = 0; n < t.attrs.length;) {
    let r = t.attrs[n++];
    if (typeof r == "number") break;
    let o = t.attrs[n++];
    e.push(`${r}="${Do(o)}"`)
  }
  return e.join(" ")
}

var TD = new Set(["ngh", "ng-version", "ng-server-context"]);

function xD(t) {
  let e = [];
  for (let n = 0; n < t.attributes.length; n++) {
    let r = t.attributes[n];
    TD.has(r.name) || e.push(`${r.name}="${Do(r.value)}"`)
  }
  return e.join(" ")
}

function Ki(t, e = "\u2026") {
  switch (t.type) {
    case 1:
      return `#text${t.value ? `(${t.value})` : ""}`;
    case 2:
      let r = MD(t), o = t.value.toLowerCase();
      return `<${o}${r ? " " + r : ""}>${e}</${o}>`;
    case 8:
      return "<!-- ng-container -->";
    case 4:
      return "<!-- container -->";
    default:
      return `#node(${_D(t.type)})`
  }
}

function to(t, e = "\u2026") {
  let n = t;
  switch (n.nodeType) {
    case Node.ELEMENT_NODE:
      let r = n.tagName.toLowerCase(), o = xD(n);
      return `<${r}${o ? " " + o : ""}>${e}</${r}>`;
    case Node.TEXT_NODE:
      let i = n.textContent ? Do(n.textContent) : "";
      return `#text${i ? `(${i})` : ""}`;
    case Node.COMMENT_NODE:
      return `<!-- ${Do(n.textContent ?? "")} -->`;
    default:
      return `#node(${n.nodeType})`
  }
}

function ND(t, e, n) {
  let r = "  ", o = "";
  e.prev ? (o += r + `\u2026
`, o += r + Ki(e.prev) + `
`) : e.type && e.type & 12 && (o += r + `\u2026
`), n ? (o += r + Ki(e) + `
`, o += r + `<!-- container -->  ${Ps}
`) : o += r + Ki(e) + `  ${Ps}
`, o += r + `\u2026
`;
  let i = e.type ? za(t[I], e, t) : null;
  return i && (o = to(i, `
` + o)), o
}

function AD(t) {
  let e = "  ", n = "", r = t;
  return r.previousSibling && (n += e + `\u2026
`, n += e + to(r.previousSibling) + `
`), n += e + to(r) + `  ${Ps}
`, t.nextSibling && (n += e + `\u2026
`), t.parentNode && (n = to(r.parentNode, `
` + n)), n
}

function OD(t) {
  return `To fix this problem:
  * check ${t ? `the "${t}"` : "corresponding"} component for hydration-related issues
  * check to see if your template has valid HTML structure
  * or skip hydration by adding the \`ngSkipHydration\` attribute to its host node in a template

`
}

function FD() {
  return `Note: attributes are only displayed to better represent the DOM but have no effect on hydration mismatches.

`
}

function PD(t) {
  return t.replace(/\s+/gm, "")
}

function Do(t, e = 50) {
  return t ? (t = PD(t), t.length > e ? `${t.substring(0, e - 1)}\u2026` : t) : ""
}

function Vf(t) {
  let e = t[On] ?? [], r = t[J][j];
  for (let o of e) RD(o, r);
  t[On] = ue
}

function RD(t, e) {
  let n = 0, r = t.firstChild;
  if (r) {
    let o = t.data[nn];
    for (; n < o;) {
      let i = r.nextSibling;
      Wa(e, r, !1), r = i, n++
    }
  }
}

function Bf(t) {
  Vf(t);
  for (let e = ne; e < t.length; e++) Eo(t[e])
}

function kD(t) {
  let e = t[ge]?.i18nNodes;
  if (e) {
    let n = t[j];
    for (let r of e.values()) Wa(n, r, !1);
    t[ge].i18nNodes = void 0
  }
}

function Eo(t) {
  kD(t);
  let e = t[I];
  for (let n = U; n < e.bindingStartIndex; n++) if (ve(t[n])) {
    let r = t[n];
    Bf(r)
  } else Ke(t[n]) && Eo(t[n])
}

function LD(t) {
  let e = t._views;
  for (let n of e) {
    let r = qd(n);
    if (r !== null && r[W] !== null) if (Ke(r)) Eo(r); else {
      let o = r[W];
      Eo(o), Bf(r)
    }
  }
}

var jD = new RegExp(`^(\\d+)*(${La}|${ka})*(.*)`);

function VD(t, e) {
  let n = [t];
  for (let r of e) {
    let o = n.length - 1;
    if (o > 0 && n[o - 1] === r) {
      let i = n[o] || 1;
      n[o] = i + 1
    } else n.push(r, "")
  }
  return n.join("")
}

function BD(t) {
  let e = t.match(jD), [n, r, o, i] = e, s = r ? parseInt(r, 10) : o, a = [];
  for (let [u, l, c] of i.matchAll(/(f|n)(\d*)/g)) {
    let d = parseInt(c, 10) || 1;
    a.push(l, d)
  }
  return [s, ...a]
}

function $D(t) {
  return !t.prev && t.parent?.type === 8
}

function Yi(t) {
  return t.index - U
}

function Hn(t, e) {
  return !(t.type & 16) && !!e[t.index] && !Z(e[t.index])?.isConnected
}

function HD(t, e) {
  let n = t.i18nNodes;
  if (n) {
    let r = n.get(e);
    return r && n.delete(e), r
  }
  return null
}

function Zo(t, e, n, r) {
  let o = Yi(r), i = HD(t, o);
  if (!i) {
    let s = t.data[Cs];
    if (s?.[o]) i = zD(s[o], n); else if (e.firstChild === r) i = t.firstChild; else {
      let a = r.prev === null, u = r.prev ?? r.parent;
      if ($D(r)) {
        let l = Yi(r.parent);
        i = Ss(t, l)
      } else {
        let l = De(u, n);
        if (a) i = l.firstChild; else {
          let c = Yi(u), d = Ss(t, c);
          if (u.type === 2 && d) {
            let h = Ba(t, c) + 1;
            i = Jo(h, d)
          } else i = l.nextSibling
        }
      }
    }
  }
  return i
}

function Jo(t, e) {
  let n = e;
  for (let r = 0; r < t; r++) n = n.nextSibling;
  return n
}

function UD(t, e) {
  let n = t;
  for (let r = 0; r < e.length; r += 2) {
    let o = e[r], i = e[r + 1];
    for (let s = 0; s < i; s++) switch (o) {
      case kn.FirstChild:
        n = n.firstChild;
        break;
      case kn.NextSibling:
        n = n.nextSibling;
        break
    }
  }
  return n
}

function zD(t, e) {
  let [n, ...r] = BD(t), o;
  if (n === ka) o = e[le][W]; else if (n === La) o = yv(e[le][W]); else {
    let i = Number(n);
    o = Z(e[i + U])
  }
  return UD(o, r)
}

function Rs(t, e) {
  if (t === e) return [];
  if (t.parentElement == null || e.parentElement == null) return null;
  if (t.parentElement === e.parentElement) return qD(t, e);
  {
    let n = e.parentElement, r = Rs(t, n), o = Rs(n.firstChild, e);
    return !r || !o ? null : [...r, kn.FirstChild, ...o]
  }
}

function qD(t, e) {
  let n = [], r = null;
  for (r = t; r != null && r !== e; r = r.nextSibling) n.push(kn.NextSibling);
  return r == null ? null : n
}

function cc(t, e, n) {
  let r = Rs(t, e);
  return r === null ? null : VD(n, r)
}

function GD(t, e) {
  let n = t.parent, r, o, i;
  for (; n !== null && Hn(n, e);) n = n.parent;
  n === null || !(n.type & 3) ? (r = i = ka, o = e[le][W]) : (r = n.index, o = Z(e[r]), i = xe(r - U));
  let s = Z(e[t.index]);
  if (t.type & 12) {
    let u = Cn(e, t);
    u && (s = u)
  }
  let a = cc(o, s, i);
  if (a === null && o !== s) {
    let u = o.ownerDocument.body;
    if (a = cc(u, s, La), a === null) throw CD(e, t)
  }
  return a
}

function WD(t, e) {
  let n = [];
  for (let r of e) for (let o = 0; o < (r[mo] ?? 1); o++) {
    let i = {data: r, firstChild: null};
    r[nn] > 0 && (i.firstChild = t, t = Jo(r[nn], t)), n.push(i)
  }
  return [t, n]
}

var $f = () => null;

function QD(t, e) {
  let n = t[On];
  return !e || n === null || n.length === 0 ? null : n[0].data[_s] === e ? n.shift() : (Vf(t), null)
}

function KD() {
  $f = QD
}

function Un(t, e) {
  return $f(t, e)
}

var ks = class {
}, Ls = class {
}, wo = class {
};

function YD(t) {
  let e = Error(`No component factory found for ${de(t)}.`);
  return e[ZD] = t, e
}

var ZD = "ngComponent";
var js = class {
  resolveComponentFactory(e) {
    throw YD(e)
  }
}, Xo = (() => {
  let e = class e {
  };
  e.NULL = new js;
  let t = e;
  return t
})(), Vs = class {
}, Xa = (() => {
  let e = class e {
    constructor() {
      this.destroyNode = null
    }
  };
  e.__NG_ELEMENT_ID__ = () => JD();
  let t = e;
  return t
})();

function JD() {
  let t = N(), e = he(), n = lt(e.index, t);
  return (Ke(n) ? n : t)[j]
}

var XD = (() => {
  let e = class e {
  };
  e.\u0275prov = H({token: e, providedIn: "root", factory: () => null});
  let t = e;
  return t
})(), Zi = {};
var dc = new Set;

function fn(t) {
  dc.has(t) || (dc.add(t), performance?.mark?.("mark_feature_usage", {detail: {feature: t}}))
}

function fc(...t) {
}

function eE() {
  let t = typeof Qe.requestAnimationFrame == "function", e = Qe[t ? "requestAnimationFrame" : "setTimeout"],
    n = Qe[t ? "cancelAnimationFrame" : "clearTimeout"];
  if (typeof Zone < "u" && e && n) {
    let r = e[Zone.__symbol__("OriginalDelegate")];
    r && (e = r);
    let o = n[Zone.__symbol__("OriginalDelegate")];
    o && (n = o)
  }
  return {nativeRequestAnimationFrame: e, nativeCancelAnimationFrame: n}
}

var ie = class t {
  constructor({
                enableLongStackTrace: e = !1,
                shouldCoalesceEventChangeDetection: n = !1,
                shouldCoalesceRunChangeDetection: r = !1
              }) {
    if (this.hasPendingMacrotasks = !1, this.hasPendingMicrotasks = !1, this.isStable = !0, this.onUnstable = new Ne(!1), this.onMicrotaskEmpty = new Ne(!1), this.onStable = new Ne(!1), this.onError = new Ne(!1), typeof Zone > "u") throw new g(908, !1);
    Zone.assertZonePatched();
    let o = this;
    o._nesting = 0, o._outer = o._inner = Zone.current, Zone.TaskTrackingZoneSpec && (o._inner = o._inner.fork(new Zone.TaskTrackingZoneSpec)), e && Zone.longStackTraceZoneSpec && (o._inner = o._inner.fork(Zone.longStackTraceZoneSpec)), o.shouldCoalesceEventChangeDetection = !r && n, o.shouldCoalesceRunChangeDetection = r, o.lastRequestAnimationFrameId = -1, o.nativeRequestAnimationFrame = eE().nativeRequestAnimationFrame, rE(o)
  }

  static isInAngularZone() {
    return typeof Zone < "u" && Zone.current.get("isAngularZone") === !0
  }

  static assertInAngularZone() {
    if (!t.isInAngularZone()) throw new g(909, !1)
  }

  static assertNotInAngularZone() {
    if (t.isInAngularZone()) throw new g(909, !1)
  }

  run(e, n, r) {
    return this._inner.run(e, n, r)
  }

  runTask(e, n, r, o) {
    let i = this._inner, s = i.scheduleEventTask("NgZoneEvent: " + o, e, tE, fc, fc);
    try {
      return i.runTask(s, n, r)
    } finally {
      i.cancelTask(s)
    }
  }

  runGuarded(e, n, r) {
    return this._inner.runGuarded(e, n, r)
  }

  runOutsideAngular(e) {
    return this._outer.run(e)
  }
}, tE = {};

function eu(t) {
  if (t._nesting == 0 && !t.hasPendingMicrotasks && !t.isStable) try {
    t._nesting++, t.onMicrotaskEmpty.emit(null)
  } finally {
    if (t._nesting--, !t.hasPendingMicrotasks) try {
      t.runOutsideAngular(() => t.onStable.emit(null))
    } finally {
      t.isStable = !0
    }
  }
}

function nE(t) {
  t.isCheckStableRunning || t.lastRequestAnimationFrameId !== -1 || (t.lastRequestAnimationFrameId = t.nativeRequestAnimationFrame.call(Qe, () => {
    t.fakeTopEventTask || (t.fakeTopEventTask = Zone.root.scheduleEventTask("fakeTopEventTask", () => {
      t.lastRequestAnimationFrameId = -1, Bs(t), t.isCheckStableRunning = !0, eu(t), t.isCheckStableRunning = !1
    }, void 0, () => {
    }, () => {
    })), t.fakeTopEventTask.invoke()
  }), Bs(t))
}

function rE(t) {
  let e = () => {
    nE(t)
  };
  t._inner = t._inner.fork({
    name: "angular", properties: {isAngularZone: !0}, onInvokeTask: (n, r, o, i, s, a) => {
      if (oE(a)) return n.invokeTask(o, i, s, a);
      try {
        return hc(t), n.invokeTask(o, i, s, a)
      } finally {
        (t.shouldCoalesceEventChangeDetection && i.type === "eventTask" || t.shouldCoalesceRunChangeDetection) && e(), pc(t)
      }
    }, onInvoke: (n, r, o, i, s, a, u) => {
      try {
        return hc(t), n.invoke(o, i, s, a, u)
      } finally {
        t.shouldCoalesceRunChangeDetection && e(), pc(t)
      }
    }, onHasTask: (n, r, o, i) => {
      n.hasTask(o, i), r === o && (i.change == "microTask" ? (t._hasPendingMicrotasks = i.microTask, Bs(t), eu(t)) : i.change == "macroTask" && (t.hasPendingMacrotasks = i.macroTask))
    }, onHandleError: (n, r, o, i) => (n.handleError(o, i), t.runOutsideAngular(() => t.onError.emit(i)), !1)
  })
}

function Bs(t) {
  t._hasPendingMicrotasks || (t.shouldCoalesceEventChangeDetection || t.shouldCoalesceRunChangeDetection) && t.lastRequestAnimationFrameId !== -1 ? t.hasPendingMicrotasks = !0 : t.hasPendingMicrotasks = !1
}

function hc(t) {
  t._nesting++, t.isStable && (t.isStable = !1, t.onUnstable.emit(null))
}

function pc(t) {
  t._nesting--, eu(t)
}

var $s = class {
  constructor() {
    this.hasPendingMicrotasks = !1, this.hasPendingMacrotasks = !1, this.isStable = !0, this.onUnstable = new Ne, this.onMicrotaskEmpty = new Ne, this.onStable = new Ne, this.onError = new Ne
  }

  run(e, n, r) {
    return e.apply(n, r)
  }

  runGuarded(e, n, r) {
    return e.apply(n, r)
  }

  runOutsideAngular(e) {
    return e()
  }

  runTask(e, n, r, o) {
    return e.apply(n, r)
  }
};

function oE(t) {
  return !Array.isArray(t) || t.length !== 1 ? !1 : t[0].data?.__ignore_ng_zone__ === !0
}

function iE(t = "zone.js", e) {
  return t === "noop" ? new $s : t === "zone.js" ? new ie(e) : t
}

var Hf = (() => {
  let e = class e {
    constructor() {
      this.handler = null, this.internalCallbacks = []
    }

    execute() {
      this.executeInternalCallbacks(), this.handler?.execute()
    }

    executeInternalCallbacks() {
      let r = [...this.internalCallbacks];
      this.internalCallbacks.length = 0;
      for (let o of r) o()
    }

    ngOnDestroy() {
      this.handler?.destroy(), this.handler = null, this.internalCallbacks.length = 0
    }
  };
  e.\u0275prov = H({token: e, providedIn: "root", factory: () => new e});
  let t = e;
  return t
})();

function Hs(t, e, n) {
  let r = n ? t.styles : null, o = n ? t.classes : null, i = 0;
  if (e !== null) for (let s = 0; s < e.length; s++) {
    let a = e[s];
    if (typeof a == "number") i = a; else if (i == 1) o = os(o, a); else if (i == 2) {
      let u = a, l = e[++s];
      r = os(r, u + ": " + l + ";")
    }
  }
  n ? t.styles = r : t.stylesWithoutHost = r, n ? t.classes = o : t.classesWithoutHost = o
}

var bo = class extends Xo {
  constructor(e) {
    super(), this.ngModule = e
  }

  resolveComponentFactory(e) {
    let n = st(e);
    return new zn(n, this.ngModule)
  }
};

function mc(t) {
  let e = [];
  for (let n in t) {
    if (!t.hasOwnProperty(n)) continue;
    let r = t[n];
    r !== void 0 && e.push({propName: Array.isArray(r) ? r[0] : r, templateName: n})
  }
  return e
}

function sE(t) {
  let e = t.toLowerCase();
  return e === "svg" ? Lg : e === "math" ? jg : null
}

var Us = class {
  constructor(e, n) {
    this.injector = e, this.parentInjector = n
  }

  get(e, n, r) {
    r = Fo(r);
    let o = this.injector.get(e, Zi, r);
    return o !== Zi || n === Zi ? o : this.parentInjector.get(e, n, r)
  }
}, zn = class extends wo {
  constructor(e, n) {
    super(), this.componentDef = e, this.ngModule = n, this.componentType = e.type, this.selector = fg(e.selectors), this.ngContentSelectors = e.ngContentSelectors ? e.ngContentSelectors : [], this.isBoundToModule = !!n
  }

  get inputs() {
    let e = this.componentDef, n = e.inputTransforms, r = mc(e.inputs);
    if (n !== null) for (let o of r) n.hasOwnProperty(o.propName) && (o.transform = n[o.propName]);
    return r
  }

  get outputs() {
    return mc(this.componentDef.outputs)
  }

  create(e, n, r, o) {
    let i = A(null);
    try {
      o = o || this.ngModule;
      let s = o instanceof at ? o : o?.injector;
      s && this.componentDef.getStandaloneInjector !== null && (s = this.componentDef.getStandaloneInjector(s) || s);
      let a = s ? new Us(e, s) : e, u = a.get(Vs, null);
      if (u === null) throw new g(407, !1);
      let l = a.get(XD, null), c = a.get(Hf, null), d = a.get(ks, null), f = {
          rendererFactory: u,
          sanitizer: l,
          inlineEffectRunner: null,
          afterRenderEventManager: c,
          changeDetectionScheduler: d
        }, h = u.createRenderer(null, this.componentDef), p = this.componentDef.selectors[0][0] || "div",
        m = r ? Vv(h, r, this.componentDef.encapsulation, a) : Ho(h, p, sE(p)), D = 512;
      this.componentDef.signals ? D |= 4096 : this.componentDef.onPush || (D |= 16);
      let E = null;
      m !== null && (E = Va(m, a, !0));
      let k = Ka(0, null, null, 1, 0, null, null, null, null, null, null),
        L = qo(null, k, null, D, null, null, f, h, a, null, E);
      Na(L);
      let B, pe;
      try {
        let q = this.componentDef, G, X = null;
        q.findHostDirectiveDefs ? (G = [], X = new Map, q.findHostDirectiveDefs(q, G, X), G.push(q)) : G = [q];
        let ze = aE(L, m), tt = uE(ze, m, q, G, L, f, h);
        pe = Ca(k, U), m && dE(h, q, m, r), n !== void 0 && fE(pe, this.ngContentSelectors, n), B = cE(tt, q, G, X, L, [hE]), Za(k, L, null)
      } finally {
        Aa()
      }
      return new zs(this.componentType, B, cn(pe, L), L, pe)
    } finally {
      A(i)
    }
  }
}, zs = class extends Ls {
  constructor(e, n, r, o, i) {
    super(), this.location = r, this._rootLView = o, this._tNode = i, this.previousInputValues = null, this.instance = n, this.hostView = this.changeDetectorRef = new Nt(o, void 0, !1), this.componentType = e
  }

  get injector() {
    return new It(this._tNode, this._rootLView)
  }

  setInput(e, n) {
    let r = this._tNode.inputs, o;
    if (r !== null && (o = r[e])) {
      if (this.previousInputValues ??= new Map, this.previousInputValues.has(e) && Object.is(this.previousInputValues.get(e), n)) return;
      let i = this._rootLView;
      Ya(i[I], i, o, e, n), this.previousInputValues.set(e, n);
      let s = lt(this._tNode.index, i);
      Ja(s)
    }
  }

  destroy() {
    this.hostView.destroy()
  }

  onDestroy(e) {
    this.hostView.onDestroy(e)
  }
};

function aE(t, e) {
  let n = t[I], r = U;
  return t[r] = e, tr(n, r, 2, "#host", null)
}

function uE(t, e, n, r, o, i, s) {
  let a = o[I];
  lE(r, t, e, s);
  let u = null;
  e !== null && (u = Va(e, o[en]));
  let l = i.rendererFactory.createRenderer(e, n), c = 16;
  n.signals ? c = 4096 : n.onPush && (c = 64);
  let d = qo(o, Df(n), null, c, o[t.index], t, i, l, null, null, u);
  return a.firstCreatePass && As(a, t, r.length - 1), Wo(o, d), o[t.index] = d
}

function lE(t, e, n, r) {
  for (let o of t) e.mergedAttrs = Tn(e.mergedAttrs, o.hostAttrs);
  e.mergedAttrs !== null && (Hs(e, e.mergedAttrs, !0), n !== null && df(r, n, e))
}

function cE(t, e, n, r, o, i) {
  let s = he(), a = o[I], u = De(s, o);
  bf(a, o, s, n, null, r);
  for (let c = 0; c < n.length; c++) {
    let d = s.directiveStart + c, f = Mt(o, a, d, s);
    xt(f, o)
  }
  If(a, o, s), u && xt(u, o);
  let l = Mt(o, a, s.directiveStart + s.componentOffset, s);
  if (t[re] = o[re] = l, i !== null) for (let c of i) c(l, e);
  return gf(a, s, o), l
}

function dE(t, e, n, r) {
  if (r) us(t, n, ["ng-version", "17.3.1"]); else {
    let {attrs: o, classes: i} = hg(e.selectors[0]);
    o && us(t, n, o), i && i.length > 0 && cf(t, n, i.join(" "))
  }
}

function fE(t, e, n) {
  let r = t.projection = [];
  for (let o = 0; o < e.length; o++) {
    let i = n[o];
    r.push(i != null ? Array.from(i) : null)
  }
}

function hE() {
  let t = he();
  Fa(N()[I], t)
}

var nr = (() => {
  let e = class e {
  };
  e.__NG_ELEMENT_ID__ = pE;
  let t = e;
  return t
})();

function pE() {
  let t = he();
  return zf(t, N())
}

var mE = nr, Uf = class extends mE {
  constructor(e, n, r) {
    super(), this._lContainer = e, this._hostTNode = n, this._hostLView = r
  }

  get element() {
    return cn(this._hostTNode, this._hostLView)
  }

  get injector() {
    return new It(this._hostTNode, this._hostLView)
  }

  get parentInjector() {
    let e = Pa(this._hostTNode, this._hostLView);
    if (Cd(e)) {
      let n = co(e, this._hostLView), r = lo(e), o = n[I].data[r + 8];
      return new It(o, n)
    } else return new It(null, this._hostLView)
  }

  get length() {
    return this._lContainer.length - ne
  }

  clear() {
    for (; this.length > 0;) this.remove(this.length - 1)
  }

  get(e) {
    let n = gc(this._lContainer);
    return n !== null && n[e] || null
  }

  createEmbeddedView(e, n, r) {
    let o, i;
    typeof r == "number" ? o = r : r != null && (o = r.index, i = r.injector);
    let s = Un(this._lContainer, e.ssrId), a = e.createEmbeddedViewImpl(n || {}, i, s);
    return this.insertImpl(a, o, Vn(this._hostTNode, s)), a
  }

  createComponent(e, n, r, o, i) {
    let s = e && !Ag(e), a;
    if (s) a = n; else {
      let p = n || {};
      a = p.index, r = p.injector, o = p.projectableNodes, i = p.environmentInjector || p.ngModuleRef
    }
    let u = s ? e : new zn(st(e)), l = r || this.parentInjector;
    if (!i && u.ngModule == null) {
      let m = (s ? l : this.parentInjector).get(at, null);
      m && (i = m)
    }
    let c = st(u.componentType ?? {}), d = Un(this._lContainer, c?.id ?? null), f = d?.firstChild ?? null,
      h = u.create(l, o, f, i);
    return this.insertImpl(h.hostView, a, Vn(this._hostTNode, d)), h
  }

  insert(e, n) {
    return this.insertImpl(e, n, !0)
  }

  insertImpl(e, n, r) {
    let o = e._lView;
    if (Ug(o)) {
      let a = this.indexOf(e);
      if (a !== -1) this.detach(a); else {
        let u = o[J], l = new Uf(u, u[ye], u[J]);
        l.detach(l.indexOf(e))
      }
    }
    let i = this._adjustIndex(n), s = this._lContainer;
    return Ko(s, o, i, r), e.attachToViewContainerRef(), jc(Ji(s), i, e), e
  }

  move(e, n) {
    return this.insert(e, n)
  }

  indexOf(e) {
    let n = gc(this._lContainer);
    return n !== null ? n.indexOf(e) : -1
  }

  remove(e) {
    let n = this._adjustIndex(e, -1), r = jn(this._lContainer, n);
    r && (io(Ji(this._lContainer), n), Uo(r[I], r))
  }

  detach(e) {
    let n = this._adjustIndex(e, -1), r = jn(this._lContainer, n);
    return r && io(Ji(this._lContainer), n) != null ? new Nt(r) : null
  }

  _adjustIndex(e, n = 0) {
    return e ?? this.length + n
  }
};

function gc(t) {
  return t[ao]
}

function Ji(t) {
  return t[ao] || (t[ao] = [])
}

function zf(t, e) {
  let n, r = e[t.index];
  return ve(r) ? n = r : (n = _f(r, e, null, t), e[t.index] = n, Wo(e, n)), qf(n, e, t, r), new Uf(n, t, e)
}

function gE(t, e) {
  let n = t[j], r = n.createComment(""), o = De(e, t), i = qa(n, o);
  return vo(n, i, r, xv(n, o), !1), r
}

var qf = Gf, tu = () => !1;

function yE(t, e, n) {
  return tu(t, e, n)
}

function Gf(t, e, n, r) {
  if (t[Ze]) return;
  let o;
  n.type & 8 ? o = Z(r) : o = gE(e, n), t[Ze] = o
}

function vE(t, e, n) {
  if (t[Ze] && t[On]) return !0;
  let r = n[ge], o = e.index - U;
  if (!r || po(e) || Bo(r, o)) return !1;
  let s = Ss(r, o), a = r.data[Ln]?.[o], [u, l] = WD(s, a);
  return t[Ze] = u, t[On] = l, !0
}

function DE(t, e, n, r) {
  tu(t, n, e) || Gf(t, e, n, r)
}

function EE() {
  qf = DE, tu = vE
}

var qs = class t {
  constructor(e) {
    this.queryList = e, this.matches = null
  }

  clone() {
    return new t(this.queryList)
  }

  setDirty() {
    this.queryList.setDirty()
  }
}, Gs = class t {
  constructor(e = []) {
    this.queries = e
  }

  createEmbeddedView(e) {
    let n = e.queries;
    if (n !== null) {
      let r = e.contentQueries !== null ? e.contentQueries[0] : n.length, o = [];
      for (let i = 0; i < r; i++) {
        let s = n.getByIndex(i), a = this.queries[s.indexInDeclarationView];
        o.push(a.clone())
      }
      return new t(o)
    }
    return null
  }

  insertView(e) {
    this.dirtyQueriesWithMatches(e)
  }

  detachView(e) {
    this.dirtyQueriesWithMatches(e)
  }

  finishViewCreation(e) {
    this.dirtyQueriesWithMatches(e)
  }

  dirtyQueriesWithMatches(e) {
    for (let n = 0; n < this.queries.length; n++) nu(e, n).matches !== null && this.queries[n].setDirty()
  }
}, Io = class {
  constructor(e, n, r = null) {
    this.flags = n, this.read = r, typeof e == "string" ? this.predicate = TE(e) : this.predicate = e
  }
}, Ws = class t {
  constructor(e = []) {
    this.queries = e
  }

  get length() {
    return this.queries.length
  }

  elementStart(e, n) {
    for (let r = 0; r < this.queries.length; r++) this.queries[r].elementStart(e, n)
  }

  elementEnd(e) {
    for (let n = 0; n < this.queries.length; n++) this.queries[n].elementEnd(e)
  }

  embeddedTView(e) {
    let n = null;
    for (let r = 0; r < this.length; r++) {
      let o = n !== null ? n.length : 0, i = this.getByIndex(r).embeddedTView(e, o);
      i && (i.indexInDeclarationView = r, n !== null ? n.push(i) : n = [i])
    }
    return n !== null ? new t(n) : null
  }

  template(e, n) {
    for (let r = 0; r < this.queries.length; r++) this.queries[r].template(e, n)
  }

  getByIndex(e) {
    return this.queries[e]
  }

  track(e) {
    this.queries.push(e)
  }
}, Qs = class t {
  constructor(e, n = -1) {
    this.metadata = e, this.matches = null, this.indexInDeclarationView = -1, this.crossesNgTemplate = !1, this._appliesToNextNode = !0, this._declarationNodeIndex = n
  }

  elementStart(e, n) {
    this.isApplyingToNode(n) && this.matchTNode(e, n)
  }

  elementEnd(e) {
    this._declarationNodeIndex === e.index && (this._appliesToNextNode = !1)
  }

  template(e, n) {
    this.elementStart(e, n)
  }

  embeddedTView(e, n) {
    return this.isApplyingToNode(e) ? (this.crossesNgTemplate = !0, this.addMatch(-e.index, n), new t(this.metadata)) : null
  }

  isApplyingToNode(e) {
    if (this._appliesToNextNode && (this.metadata.flags & 1) !== 1) {
      let n = this._declarationNodeIndex, r = e.parent;
      for (; r !== null && r.type & 8 && r.index !== n;) r = r.parent;
      return n === (r !== null ? r.index : -1)
    }
    return this._appliesToNextNode
  }

  matchTNode(e, n) {
    let r = this.metadata.predicate;
    if (Array.isArray(r)) for (let o = 0; o < r.length; o++) {
      let i = r[o];
      this.matchTNodeWithReadOption(e, n, wE(n, i)), this.matchTNodeWithReadOption(e, n, Xr(n, e, i, !1, !1))
    } else r === $n ? n.type & 4 && this.matchTNodeWithReadOption(e, n, -1) : this.matchTNodeWithReadOption(e, n, Xr(n, e, r, !1, !1))
  }

  matchTNodeWithReadOption(e, n, r) {
    if (r !== null) {
      let o = this.metadata.read;
      if (o !== null) if (o === Ft || o === nr || o === $n && n.type & 4) this.addMatch(n.index, -2); else {
        let i = Xr(n, e, o, !1, !1);
        i !== null && this.addMatch(n.index, i)
      } else this.addMatch(n.index, r)
    }
  }

  addMatch(e, n) {
    this.matches === null ? this.matches = [e, n] : this.matches.push(e, n)
  }
};

function wE(t, e) {
  let n = t.localNames;
  if (n !== null) {
    for (let r = 0; r < n.length; r += 2) if (n[r] === e) return n[r + 1]
  }
  return null
}

function bE(t, e) {
  return t.type & 11 ? cn(t, e) : t.type & 4 ? Yo(t, e) : null
}

function IE(t, e, n, r) {
  return n === -1 ? bE(e, t) : n === -2 ? _E(t, e, r) : Mt(t, t[I], n, e)
}

function _E(t, e, n) {
  if (n === Ft) return cn(e, t);
  if (n === $n) return Yo(e, t);
  if (n === nr) return zf(e, t)
}

function Wf(t, e, n, r) {
  let o = e[Ye].queries[r];
  if (o.matches === null) {
    let i = t.data, s = n.matches, a = [];
    for (let u = 0; s !== null && u < s.length; u += 2) {
      let l = s[u];
      if (l < 0) a.push(null); else {
        let c = i[l];
        a.push(IE(e, c, s[u + 1], n.metadata.read))
      }
    }
    o.matches = a
  }
  return o.matches
}

function Ks(t, e, n, r) {
  let o = t.queries.getByIndex(n), i = o.matches;
  if (i !== null) {
    let s = Wf(t, e, o, n);
    for (let a = 0; a < i.length; a += 2) {
      let u = i[a];
      if (u > 0) r.push(s[a / 2]); else {
        let l = i[a + 1], c = e[-u];
        for (let d = ne; d < c.length; d++) {
          let f = c[d];
          f[Qn] === f[J] && Ks(f[I], f, l, r)
        }
        if (c[tn] !== null) {
          let d = c[tn];
          for (let f = 0; f < d.length; f++) {
            let h = d[f];
            Ks(h[I], h, l, r)
          }
        }
      }
    }
  }
  return r
}

function CE(t, e) {
  return t[Ye].queries[e].queryList
}

function Qf(t, e, n) {
  let r = new Es((n & 4) === 4);
  return Uv(t, e, r, r.destroy), (e[Ye] ??= new Gs).queries.push(new qs(r)) - 1
}

function SE(t, e, n) {
  let r = Q();
  return r.firstCreatePass && (Kf(r, new Io(t, e, n), -1), (e & 2) === 2 && (r.staticViewQueries = !0)), Qf(r, N(), e)
}

function ME(t, e, n, r) {
  let o = Q();
  if (o.firstCreatePass) {
    let i = he();
    Kf(o, new Io(e, n, r), i.index), xE(o, t), (n & 2) === 2 && (o.staticContentQueries = !0)
  }
  return Qf(o, N(), n)
}

function TE(t) {
  return t.split(",").map(e => e.trim())
}

function Kf(t, e, n) {
  t.queries === null && (t.queries = new Ws), t.queries.track(new Qs(e, n))
}

function xE(t, e) {
  let n = t.contentQueries || (t.contentQueries = []), r = n.length ? n[n.length - 1] : -1;
  e !== r && n.push(t.queries.length - 1, e)
}

function nu(t, e) {
  return t.queries.getByIndex(e)
}

function NE(t, e) {
  let n = t[I], r = nu(n, e);
  return r.crossesNgTemplate ? Ks(n, t, e, []) : Wf(n, t, r, e)
}

function AE(t) {
  let e = [], n = new Map;

  function r(o) {
    let i = n.get(o);
    if (!i) {
      let s = t(o);
      n.set(o, i = s.then(RE))
    }
    return i
  }

  return _o.forEach((o, i) => {
    let s = [];
    o.templateUrl && s.push(r(o.templateUrl).then(l => {
      o.template = l
    }));
    let a = typeof o.styles == "string" ? [o.styles] : o.styles || [];
    if (o.styles = a, o.styleUrl && o.styleUrls?.length) throw new Error("@Component cannot define both `styleUrl` and `styleUrls`. Use `styleUrl` if the component has one stylesheet, or `styleUrls` if it has multiple");
    if (o.styleUrls?.length) {
      let l = o.styles.length, c = o.styleUrls;
      o.styleUrls.forEach((d, f) => {
        a.push(""), s.push(r(d).then(h => {
          a[l + f] = h, c.splice(c.indexOf(d), 1), c.length == 0 && (o.styleUrls = void 0)
        }))
      })
    } else o.styleUrl && s.push(r(o.styleUrl).then(l => {
      a.push(l), o.styleUrl = void 0
    }));
    let u = Promise.all(s).then(() => kE(i));
    e.push(u)
  }), FE(), Promise.all(e).then(() => {
  })
}

var _o = new Map, OE = new Set;

function FE() {
  let t = _o;
  return _o = new Map, t
}

function PE() {
  return _o.size === 0
}

function RE(t) {
  return typeof t == "string" ? t : t.text()
}

function kE(t) {
  OE.delete(t)
}

function LE(t) {
  return Object.getPrototypeOf(t.prototype).constructor
}

function jE(t) {
  let e = LE(t.type), n = !0, r = [t];
  for (; e;) {
    let o;
    if (Je(t)) o = e.\u0275cmp || e.\u0275dir; else {
      if (e.\u0275cmp) throw new g(903, !1);
      o = e.\u0275dir
    }
    if (o) {
      if (n) {
        r.push(o);
        let s = t;
        s.inputs = Gr(t.inputs), s.inputTransforms = Gr(t.inputTransforms), s.declaredInputs = Gr(t.declaredInputs), s.outputs = Gr(t.outputs);
        let a = o.hostBindings;
        a && UE(t, a);
        let u = o.viewQuery, l = o.contentQueries;
        if (u && $E(t, u), l && HE(t, l), VE(t, o), xm(t.outputs, o.outputs), Je(o) && o.data.animation) {
          let c = t.data;
          c.animation = (c.animation || []).concat(o.data.animation)
        }
      }
      let i = o.features;
      if (i) for (let s = 0; s < i.length; s++) {
        let a = i[s];
        a && a.ngInherit && a(t), a === jE && (n = !1)
      }
    }
    e = Object.getPrototypeOf(e)
  }
  BE(r)
}

function VE(t, e) {
  for (let n in e.inputs) {
    if (!e.inputs.hasOwnProperty(n) || t.inputs.hasOwnProperty(n)) continue;
    let r = e.inputs[n];
    if (r !== void 0 && (t.inputs[n] = r, t.declaredInputs[n] = e.declaredInputs[n], e.inputTransforms !== null)) {
      let o = Array.isArray(r) ? r[0] : r;
      if (!e.inputTransforms.hasOwnProperty(o)) continue;
      t.inputTransforms ??= {}, t.inputTransforms[o] = e.inputTransforms[o]
    }
  }
}

function BE(t) {
  let e = 0, n = null;
  for (let r = t.length - 1; r >= 0; r--) {
    let o = t[r];
    o.hostVars = e += o.hostVars, o.hostAttrs = Tn(o.hostAttrs, n = Tn(n, o.hostAttrs))
  }
}

function Gr(t) {
  return t === Zt ? {} : t === ue ? [] : t
}

function $E(t, e) {
  let n = t.viewQuery;
  n ? t.viewQuery = (r, o) => {
    e(r, o), n(r, o)
  } : t.viewQuery = e
}

function HE(t, e) {
  let n = t.contentQueries;
  n ? t.contentQueries = (r, o, i) => {
    e(r, o, i), n(r, o, i)
  } : t.contentQueries = e
}

function UE(t, e) {
  let n = t.hostBindings;
  n ? t.hostBindings = (r, o) => {
    e(r, o), n(r, o)
  } : t.hostBindings = e
}

function Yf(t) {
  let e = t.inputConfig, n = {};
  for (let r in e) if (e.hasOwnProperty(r)) {
    let o = e[r];
    Array.isArray(o) && o[3] && (n[r] = o[3])
  }
  t.inputTransforms = n
}

var ut = class {
}, Ys = class {
};
var Co = class extends ut {
  constructor(e, n, r) {
    super(), this._parent = n, this._bootstrapComponents = [], this.destroyCbs = [], this.componentFactoryResolver = new bo(this);
    let o = Wc(e);
    this._bootstrapComponents = tf(o.bootstrap), this._r3Injector = Pd(e, n, [{
      provide: ut,
      useValue: this
    }, {
      provide: Xo,
      useValue: this.componentFactoryResolver
    }, ...r], de(e), new Set(["environment"])), this._r3Injector.resolveInjectorInitializers(), this.instance = this._r3Injector.get(e)
  }

  get injector() {
    return this._r3Injector
  }

  destroy() {
    let e = this._r3Injector;
    !e.destroyed && e.destroy(), this.destroyCbs.forEach(n => n()), this.destroyCbs = null
  }

  onDestroy(e) {
    this.destroyCbs.push(e)
  }
}, So = class extends Ys {
  constructor(e) {
    super(), this.moduleType = e
  }

  create(e) {
    return new Co(this.moduleType, e, [])
  }
};

function zE(t, e, n) {
  return new Co(t, e, n)
}

var Mo = class extends ut {
  constructor(e) {
    super(), this.componentFactoryResolver = new bo(this), this.instance = null;
    let n = new xn([...e.providers, {provide: ut, useValue: this}, {
      provide: Xo,
      useValue: this.componentFactoryResolver
    }], e.parent || Da(), e.debugName, new Set(["environment"]));
    this.injector = n, e.runEnvironmentInitializers && n.resolveInjectorInitializers()
  }

  destroy() {
    this.injector.destroy()
  }

  onDestroy(e) {
    this.injector.onDestroy(e)
  }
};

function qE(t, e, n = null) {
  return new Mo({providers: t, parent: e, debugName: n, runEnvironmentInitializers: !0}).injector
}

var Zf = (() => {
  let e = class e {
    constructor() {
      this.taskId = 0, this.pendingTasks = new Set, this.hasPendingTasks = new vn(!1)
    }

    get _hasPendingTasks() {
      return this.hasPendingTasks.value
    }

    add() {
      this._hasPendingTasks || this.hasPendingTasks.next(!0);
      let r = this.taskId++;
      return this.pendingTasks.add(r), r
    }

    remove(r) {
      this.pendingTasks.delete(r), this.pendingTasks.size === 0 && this._hasPendingTasks && this.hasPendingTasks.next(!1)
    }

    ngOnDestroy() {
      this.pendingTasks.clear(), this._hasPendingTasks && this.hasPendingTasks.next(!1)
    }
  };
  e.\u0275fac = function (o) {
    return new (o || e)
  }, e.\u0275prov = H({token: e, factory: e.\u0275fac, providedIn: "root"});
  let t = e;
  return t
})();

function Fe(t, e, n) {
  let r = t[e];
  return Object.is(r, n) ? !1 : (t[e] = n, !0)
}

function Zs(t, e, n, r) {
  let o = Fe(t, e, n);
  return Fe(t, e + 1, r) || o
}

function GE(t, e, n, r, o, i) {
  let s = Zs(t, e, n, r);
  return Zs(t, e + 2, o, i) || s
}

function rr(t) {
  return (t.flags & 32) === 32
}

function WE(t, e, n, r, o, i, s, a, u) {
  let l = e.consts, c = tr(e, t, 4, s || null, uo(l, a));
  wf(e, n, c, uo(l, u)), Fa(e, c);
  let d = c.tView = Ka(2, c, r, o, i, e.directiveRegistry, e.pipeRegistry, null, e.schemas, l, null);
  return e.queries !== null && (e.queries.template(e, c), d.queries = e.queries.embeddedTView(c)), c
}

function Js(t, e, n, r, o, i, s, a) {
  let u = N(), l = Q(), c = t + U, d = l.firstCreatePass ? WE(c, l, u, e, n, r, o, i, s) : l.data[c];
  Kn(d, !1);
  let f = Jf(l, u, d, t);
  Oa() && Ga(l, u, f, d), xt(f, u);
  let h = _f(f, u, f, d);
  return u[c] = h, Wo(u, h), yE(h, d, u), ba(d) && yf(l, u, d), s != null && vf(u, d, a), Js
}

var Jf = Xf;

function Xf(t, e, n, r) {
  return $e(!0), e[j].createComment("")
}

function QE(t, e, n, r) {
  let o = e[ge], i = !o || ln() || rr(n) || Bo(o, r);
  if ($e(i), i) return Xf(t, e, n, r);
  let s = o.data[Is]?.[r] ?? null;
  s !== null && n.tView !== null && n.tView.ssrId === null && (n.tView.ssrId = s);
  let a = Zo(o, t, e, n);
  Vo(o, r, a);
  let u = Ba(o, r);
  return Jo(u, a)
}

function KE() {
  Jf = QE
}

function YE(t, e, n, r) {
  let o = N(), i = Ot();
  if (Fe(o, i, e)) {
    let s = Q(), a = Yn();
    oD(a, o, t, e, n, r)
  }
  return YE
}

function eh(t, e, n, r) {
  return Fe(t, Ot(), n) ? e + xe(n) + r : Pe
}

function ZE(t, e, n, r, o, i) {
  let s = md(), a = Zs(t, s, n, o);
  return Lo(2), a ? e + xe(n) + r + xe(o) + i : Pe
}

function JE(t, e, n, r, o, i, s, a, u, l) {
  let c = md(), d = GE(t, c, n, o, s, u);
  return Lo(4), d ? e + xe(n) + r + xe(o) + i + xe(s) + a + xe(u) + l : Pe
}

function Wr(t, e) {
  return t << 17 | e << 2
}

function At(t) {
  return t >> 17 & 32767
}

function XE(t) {
  return (t & 2) == 2
}

function ew(t, e) {
  return t & 131071 | e << 17
}

function Xs(t) {
  return t | 2
}

function rn(t) {
  return (t & 131068) >> 2
}

function Xi(t, e) {
  return t & -131069 | e << 2
}

function tw(t) {
  return (t & 1) === 1
}

function ea(t) {
  return t | 1
}

function nw(t, e, n, r, o, i) {
  let s = i ? e.classBindings : e.styleBindings, a = At(s), u = rn(s);
  t[r] = n;
  let l = !1, c;
  if (Array.isArray(n)) {
    let d = n;
    c = d[1], (c === null || Wn(d, c) > 0) && (l = !0)
  } else c = n;
  if (o) if (u !== 0) {
    let f = At(t[a + 1]);
    t[r + 1] = Wr(f, a), f !== 0 && (t[f + 1] = Xi(t[f + 1], r)), t[a + 1] = ew(t[a + 1], r)
  } else t[r + 1] = Wr(a, 0), a !== 0 && (t[a + 1] = Xi(t[a + 1], r)), a = r; else t[r + 1] = Wr(u, 0), a === 0 ? a = r : t[u + 1] = Xi(t[u + 1], r), u = r;
  l && (t[r + 1] = Xs(t[r + 1])), yc(t, c, r, !0), yc(t, c, r, !1), rw(e, c, t, r, i), s = Wr(a, u), i ? e.classBindings = s : e.styleBindings = s
}

function rw(t, e, n, r, o) {
  let i = o ? t.residualClasses : t.residualStyles;
  i != null && typeof e == "string" && Wn(i, e) >= 0 && (n[r + 1] = ea(n[r + 1]))
}

function yc(t, e, n, r) {
  let o = t[n + 1], i = e === null, s = r ? At(o) : rn(o), a = !1;
  for (; s !== 0 && (a === !1 || i);) {
    let u = t[s], l = t[s + 1];
    ow(u, e) && (a = !0, t[s + 1] = r ? ea(l) : Xs(l)), s = r ? At(l) : rn(l)
  }
  a && (t[n + 1] = r ? Xs(o) : ea(o))
}

function ow(t, e) {
  return t === null || e == null || (Array.isArray(t) ? t[1] : t) === e ? !0 : Array.isArray(t) && typeof e == "string" ? Wn(t, e) >= 0 : !1
}

var Y = {textEnd: 0, key: 0, keyEnd: 0, value: 0, valueEnd: 0};

function th(t) {
  return t.substring(Y.key, Y.keyEnd)
}

function iw(t) {
  return t.substring(Y.value, Y.valueEnd)
}

function sw(t) {
  return oh(t), nh(t, on(t, 0, Y.textEnd))
}

function nh(t, e) {
  let n = Y.textEnd;
  return n === e ? -1 : (e = Y.keyEnd = uw(t, Y.key = e, n), on(t, e, n))
}

function aw(t) {
  return oh(t), rh(t, on(t, 0, Y.textEnd))
}

function rh(t, e) {
  let n = Y.textEnd, r = Y.key = on(t, e, n);
  return n === r ? -1 : (r = Y.keyEnd = lw(t, r, n), r = vc(t, r, n, 58), r = Y.value = on(t, r, n), r = Y.valueEnd = cw(t, r, n), vc(t, r, n, 59))
}

function oh(t) {
  Y.key = 0, Y.keyEnd = 0, Y.value = 0, Y.valueEnd = 0, Y.textEnd = t.length
}

function on(t, e, n) {
  for (; e < n && t.charCodeAt(e) <= 32;) e++;
  return e
}

function uw(t, e, n) {
  for (; e < n && t.charCodeAt(e) > 32;) e++;
  return e
}

function lw(t, e, n) {
  let r;
  for (; e < n && ((r = t.charCodeAt(e)) === 45 || r === 95 || (r & -33) >= 65 && (r & -33) <= 90 || r >= 48 && r <= 57);) e++;
  return e
}

function vc(t, e, n, r) {
  return e = on(t, e, n), e < n && e++, e
}

function cw(t, e, n) {
  let r = -1, o = -1, i = -1, s = e, a = s;
  for (; s < n;) {
    let u = t.charCodeAt(s++);
    if (u === 59) return a;
    u === 34 || u === 39 ? a = s = Dc(t, u, s, n) : e === s - 4 && i === 85 && o === 82 && r === 76 && u === 40 ? a = s = Dc(t, 41, s, n) : u > 32 && (a = s), i = o, o = r, r = u & -33
  }
  return a
}

function Dc(t, e, n, r) {
  let o = -1, i = n;
  for (; i < r;) {
    let s = t.charCodeAt(i++);
    if (s == e && o !== 92) return i;
    s == 92 && o === 92 ? o = 0 : o = s
  }
  throw new Error
}

function dw(t, e, n) {
  let r = N(), o = Ot();
  if (Fe(r, o, e)) {
    let i = Q(), s = Yn();
    Go(i, s, r, t, e, r[j], n, !1)
  }
  return dw
}

function ta(t, e, n, r, o) {
  let i = e.inputs, s = o ? "class" : "style";
  Ya(t, n, i[s], s, r)
}

function ru(t, e, n) {
  return sh(t, e, n, !1), ru
}

function fw(t, e) {
  return sh(t, e, null, !0), fw
}

function ih(t) {
  ah(ch, hw, t, !1)
}

function hw(t, e) {
  for (let n = aw(e); n >= 0; n = rh(e, n)) ch(t, th(e), iw(e))
}

function eA(t) {
  ah(Ew, pw, t, !0)
}

function pw(t, e) {
  for (let n = sw(e); n >= 0; n = nh(e, n)) Po(t, th(e), !0)
}

function sh(t, e, n, r) {
  let o = N(), i = Q(), s = Lo(2);
  if (i.firstUpdatePass && lh(i, t, s, r), e !== Pe && Fe(o, s, e)) {
    let a = i.data[ct()];
    dh(i, a, o, o[j], t, o[s + 1] = bw(e, n), r, s)
  }
}

function ah(t, e, n, r) {
  let o = Q(), i = Lo(2);
  o.firstUpdatePass && lh(o, null, i, r);
  let s = N();
  if (n !== Pe && Fe(s, i, n)) {
    let a = o.data[ct()];
    if (fh(a, r) && !uh(o, i)) {
      let u = r ? a.classesWithoutHost : a.stylesWithoutHost;
      u !== null && (n = os(u, n || "")), ta(o, a, s, n, r)
    } else ww(o, a, s, s[j], s[i + 1], s[i + 1] = Dw(t, e, n), r, i)
  }
}

function uh(t, e) {
  return e >= t.expandoStartIndex
}

function lh(t, e, n, r) {
  let o = t.data;
  if (o[n + 1] === null) {
    let i = o[ct()], s = uh(t, n);
    fh(i, r) && e === null && !s && (e = !1), e = mw(o, i, e, r), nw(o, i, e, n, s, r)
  }
}

function mw(t, e, n, r) {
  let o = Ta(t), i = r ? e.residualClasses : e.residualStyles;
  if (o === null) (r ? e.classBindings : e.styleBindings) === 0 && (n = es(null, t, e, n, r), n = qn(n, e.attrs, r), i = null); else {
    let s = e.directiveStylingLast;
    if (s === -1 || t[s] !== o) if (n = es(o, t, e, n, r), i === null) {
      let u = gw(t, e, r);
      u !== void 0 && Array.isArray(u) && (u = es(null, t, e, u[1], r), u = qn(u, e.attrs, r), yw(t, e, r, u))
    } else i = vw(t, e, r)
  }
  return i !== void 0 && (r ? e.residualClasses = i : e.residualStyles = i), n
}

function gw(t, e, n) {
  let r = n ? e.classBindings : e.styleBindings;
  if (rn(r) !== 0) return t[At(r)]
}

function yw(t, e, n, r) {
  let o = n ? e.classBindings : e.styleBindings;
  t[At(o)] = r
}

function vw(t, e, n) {
  let r, o = e.directiveEnd;
  for (let i = 1 + e.directiveStylingLast; i < o; i++) {
    let s = t[i].hostAttrs;
    r = qn(r, s, n)
  }
  return qn(r, e.attrs, n)
}

function es(t, e, n, r, o) {
  let i = null, s = n.directiveEnd, a = n.directiveStylingLast;
  for (a === -1 ? a = n.directiveStart : a++; a < s && (i = e[a], r = qn(r, i.hostAttrs, o), i !== t);) a++;
  return t !== null && (n.directiveStylingLast = a), r
}

function qn(t, e, n) {
  let r = n ? 1 : 2, o = -1;
  if (e !== null) for (let i = 0; i < e.length; i++) {
    let s = e[i];
    typeof s == "number" ? o = s : o === r && (Array.isArray(t) || (t = t === void 0 ? [] : ["", t]), Po(t, s, n ? !0 : e[++i]))
  }
  return t === void 0 ? null : t
}

function Dw(t, e, n) {
  if (n == null || n === "") return ue;
  let r = [], o = dn(n);
  if (Array.isArray(o)) for (let i = 0; i < o.length; i++) t(r, o[i], !0); else if (typeof o == "object") for (let i in o) o.hasOwnProperty(i) && t(r, i, o[i]); else typeof o == "string" && e(r, o);
  return r
}

function ch(t, e, n) {
  Po(t, e, dn(n))
}

function Ew(t, e, n) {
  let r = String(e);
  r !== "" && !r.includes(" ") && Po(t, r, n)
}

function ww(t, e, n, r, o, i, s, a) {
  o === Pe && (o = ue);
  let u = 0, l = 0, c = 0 < o.length ? o[0] : null, d = 0 < i.length ? i[0] : null;
  for (; c !== null || d !== null;) {
    let f = u < o.length ? o[u + 1] : void 0, h = l < i.length ? i[l + 1] : void 0, p = null, m;
    c === d ? (u += 2, l += 2, f !== h && (p = d, m = h)) : d === null || c !== null && c < d ? (u += 2, p = c) : (l += 2, p = d, m = h), p !== null && dh(t, e, n, r, p, m, s, a), c = u < o.length ? o[u] : null, d = l < i.length ? i[l] : null
  }
}

function dh(t, e, n, r, o, i, s, a) {
  if (!(e.type & 3)) return;
  let u = t.data, l = u[a + 1], c = tw(l) ? Ec(u, e, n, o, rn(l), s) : void 0;
  if (!To(c)) {
    To(i) || XE(l) && (i = Ec(u, null, n, o, a, s));
    let d = ud(ct(), n);
    Pv(r, s, d, o, i)
  }
}

function Ec(t, e, n, r, o, i) {
  let s = e === null, a;
  for (; o > 0;) {
    let u = t[o], l = Array.isArray(u), c = l ? u[1] : u, d = c === null, f = n[o + 1];
    f === Pe && (f = d ? ue : void 0);
    let h = d ? $i(f, r) : c === r ? f : void 0;
    if (l && !To(h) && (h = $i(u, r)), To(h) && (a = h, s)) return a;
    let p = t[o + 1];
    o = s ? At(p) : rn(p)
  }
  if (e !== null) {
    let u = i ? e.residualClasses : e.residualStyles;
    u != null && (a = $i(u, r))
  }
  return a
}

function To(t) {
  return t !== void 0
}

function bw(t, e) {
  return t == null || t === "" || (typeof e == "string" ? t = t + e : typeof t == "object" && (t = de(dn(t)))), t
}

function fh(t, e) {
  return (t.flags & (e ? 8 : 16)) !== 0
}

var na = class {
  destroy(e) {
  }

  updateValue(e, n) {
  }

  swap(e, n) {
    let r = Math.min(e, n), o = Math.max(e, n), i = this.detach(o);
    if (o - r > 1) {
      let s = this.detach(r);
      this.attach(r, i), this.attach(o, s)
    } else this.attach(r, i)
  }

  move(e, n) {
    this.attach(n, this.detach(e))
  }
};

function ts(t, e, n, r, o) {
  return t === n && Object.is(e, r) ? 1 : Object.is(o(t, e), o(n, r)) ? -1 : 0
}

function Iw(t, e, n) {
  let r, o, i = 0, s = t.length - 1;
  if (Array.isArray(e)) {
    let a = e.length - 1;
    for (; i <= s && i <= a;) {
      let u = t.at(i), l = e[i], c = ts(i, u, i, l, n);
      if (c !== 0) {
        c < 0 && t.updateValue(i, l), i++;
        continue
      }
      let d = t.at(s), f = e[a], h = ts(s, d, a, f, n);
      if (h !== 0) {
        h < 0 && t.updateValue(s, f), s--, a--;
        continue
      }
      let p = n(i, u), m = n(s, d), D = n(i, l);
      if (Object.is(D, m)) {
        let E = n(a, f);
        Object.is(E, p) ? (t.swap(i, s), t.updateValue(s, f), a--, s--) : t.move(s, i), t.updateValue(i, l), i++;
        continue
      }
      if (r ??= new xo, o ??= bc(t, i, s, n), ra(t, r, i, D)) t.updateValue(i, l), i++, s++; else if (o.has(D)) r.set(p, t.detach(i)), s--; else {
        let E = t.create(i, e[i]);
        t.attach(i, E), i++, s++
      }
    }
    for (; i <= a;) wc(t, r, n, i, e[i]), i++
  } else if (e != null) {
    let a = e[Symbol.iterator](), u = a.next();
    for (; !u.done && i <= s;) {
      let l = t.at(i), c = u.value, d = ts(i, l, i, c, n);
      if (d !== 0) d < 0 && t.updateValue(i, c), i++, u = a.next(); else {
        r ??= new xo, o ??= bc(t, i, s, n);
        let f = n(i, c);
        if (ra(t, r, i, f)) t.updateValue(i, c), i++, s++, u = a.next(); else if (!o.has(f)) t.attach(i, t.create(i, c)), i++, s++, u = a.next(); else {
          let h = n(i, l);
          r.set(h, t.detach(i)), s--
        }
      }
    }
    for (; !u.done;) wc(t, r, n, t.length, u.value), u = a.next()
  }
  for (; i <= s;) t.destroy(t.detach(s--));
  r?.forEach(a => {
    t.destroy(a)
  })
}

function ra(t, e, n, r) {
  return e !== void 0 && e.has(r) ? (t.attach(n, e.get(r)), e.delete(r), !0) : !1
}

function wc(t, e, n, r, o) {
  if (ra(t, e, r, n(r, o))) t.updateValue(r, o); else {
    let i = t.create(r, o);
    t.attach(r, i)
  }
}

function bc(t, e, n, r) {
  let o = new Set;
  for (let i = e; i <= n; i++) o.add(r(i, t.at(i)));
  return o
}

var xo = class {
  constructor() {
    this.kvMap = new Map, this._vMap = void 0
  }

  has(e) {
    return this.kvMap.has(e)
  }

  delete(e) {
    if (!this.has(e)) return !1;
    let n = this.kvMap.get(e);
    return this._vMap !== void 0 && this._vMap.has(n) ? (this.kvMap.set(e, this._vMap.get(n)), this._vMap.delete(n)) : this.kvMap.delete(e), !0
  }

  get(e) {
    return this.kvMap.get(e)
  }

  set(e, n) {
    if (this.kvMap.has(e)) {
      let r = this.kvMap.get(e);
      this._vMap === void 0 && (this._vMap = new Map);
      let o = this._vMap;
      for (; o.has(r);) r = o.get(r);
      o.set(r, n)
    } else this.kvMap.set(e, n)
  }

  forEach(e) {
    for (let [n, r] of this.kvMap) if (e(r, n), this._vMap !== void 0) {
      let o = this._vMap;
      for (; o.has(r);) r = o.get(r), e(r, n)
    }
  }
};

function tA(t, e, n) {
  fn("NgControlFlow");
  let r = N(), o = Ot(), i = aa(r, U + t), s = 0;
  if (Fe(r, o, e)) {
    let a = A(null);
    try {
      if (Af(i, s), e !== -1) {
        let u = ua(r[I], U + e), l = Un(i, u.tView.ssrId), c = Qo(r, u, n, {dehydratedView: l});
        Ko(i, c, s, Vn(u, l))
      }
    } finally {
      A(a)
    }
  } else {
    let a = Nf(i, s);
    a !== void 0 && (a[re] = n)
  }
}

var oa = class {
  constructor(e, n, r) {
    this.lContainer = e, this.$implicit = n, this.$index = r
  }

  get $count() {
    return this.lContainer.length - ne
  }
};
var ia = class {
  constructor(e, n, r) {
    this.hasEmptyBlock = e, this.trackByFn = n, this.liveCollection = r
  }
};

function nA(t, e, n, r, o, i, s, a, u, l, c, d, f) {
  fn("NgControlFlow");
  let h = u !== void 0, p = N(), m = a ? s.bind(p[le][re]) : s, D = new ia(h, m);
  p[U + t] = D, Js(t + 1, e, n, r, o, i), h && Js(t + 2, u, l, c, d, f)
}

var sa = class extends na {
  constructor(e, n, r) {
    super(), this.lContainer = e, this.hostLView = n, this.templateTNode = r, this.needsIndexUpdate = !1
  }

  get length() {
    return this.lContainer.length - ne
  }

  at(e) {
    return this.getLView(e)[re].$implicit
  }

  attach(e, n) {
    let r = n[ge];
    this.needsIndexUpdate ||= e !== this.length, Ko(this.lContainer, n, e, Vn(this.templateTNode, r))
  }

  detach(e) {
    return this.needsIndexUpdate ||= e !== this.length - 1, _w(this.lContainer, e)
  }

  create(e, n) {
    let r = Un(this.lContainer, this.templateTNode.tView.ssrId);
    return Qo(this.hostLView, this.templateTNode, new oa(this.lContainer, n, e), {dehydratedView: r})
  }

  destroy(e) {
    Uo(e[I], e)
  }

  updateValue(e, n) {
    this.getLView(e)[re].$implicit = n
  }

  reset() {
    this.needsIndexUpdate = !1
  }

  updateIndexes() {
    if (this.needsIndexUpdate) for (let e = 0; e < this.length; e++) this.getLView(e)[re].$index = e
  }

  getLView(e) {
    return Cw(this.lContainer, e)
  }
};

function rA(t) {
  let e = A(null), n = ct();
  try {
    let r = N(), o = r[I], i = r[n];
    if (i.liveCollection === void 0) {
      let a = n + 1, u = aa(r, a), l = ua(o, a);
      i.liveCollection = new sa(u, r, l)
    } else i.liveCollection.reset();
    let s = i.liveCollection;
    if (Iw(s, t, i.trackByFn), s.updateIndexes(), i.hasEmptyBlock) {
      let a = Ot(), u = s.length === 0;
      if (Fe(r, a, u)) {
        let l = n + 2, c = aa(r, l);
        if (u) {
          let d = ua(o, l), f = Un(c, d.tView.ssrId), h = Qo(r, d, void 0, {dehydratedView: f});
          Ko(c, h, 0, Vn(d, f))
        } else Af(c, 0)
      }
    }
  } finally {
    A(e)
  }
}

function aa(t, e) {
  return t[e]
}

function _w(t, e) {
  return jn(t, e)
}

function Cw(t, e) {
  return Nf(t, e)
}

function ua(t, e) {
  return Ca(t, e)
}

function Sw(t, e, n, r, o, i) {
  let s = e.consts, a = uo(s, o), u = tr(e, t, 2, r, a);
  return wf(e, n, u, uo(s, i)), u.attrs !== null && Hs(u, u.attrs, !1), u.mergedAttrs !== null && Hs(u, u.mergedAttrs, !0), e.queries !== null && e.queries.elementStart(e, u), u
}

function hh(t, e, n, r) {
  let o = N(), i = Q(), s = U + t, a = o[j], u = i.firstCreatePass ? Sw(s, i, o, e, n, r) : i.data[s],
    l = mh(i, o, u, a, e, t);
  o[s] = l;
  let c = ba(u);
  return Kn(u, !0), df(a, l, u), !rr(u) && Oa() && Ga(i, o, l, u), Wg() === 0 && xt(l, o), Qg(), c && (yf(i, o, u), gf(i, u, o)), r !== null && vf(o, u), hh
}

function ph() {
  let t = he();
  hd() ? pd() : (t = t.parent, Kn(t, !1));
  let e = t;
  Yg(e) && Jg(), Kg();
  let n = Q();
  return n.firstCreatePass && (Fa(n, t), rd(t) && n.queries.elementEnd(t)), e.classesWithoutHost != null && dy(e) && ta(n, e, N(), e.classesWithoutHost, !0), e.stylesWithoutHost != null && fy(e) && ta(n, e, N(), e.stylesWithoutHost, !1), ph
}

function Mw(t, e, n, r) {
  return hh(t, e, n, r), ph(), Mw
}

var mh = (t, e, n, r, o, i) => ($e(!0), Ho(r, o, bd()));

function Tw(t, e, n, r, o, i) {
  let s = e[ge], a = !s || ln() || rr(n) || Bo(s, i);
  if ($e(a), a) return Ho(r, o, bd());
  let u = Zo(s, t, e, n);
  return Gd(s, i) && Vo(s, i, u.nextSibling), s && (Ld(n) || jd(u)) && un(n) && (Zg(n), uf(u)), u
}

function xw() {
  mh = Tw
}

var Nw = (t, e, n, r) => ($e(!0), Ua(e[j], ""));

function Aw(t, e, n, r) {
  let o, i = e[ge], s = !i || ln() || rr(n);
  if ($e(s), s) return Ua(e[j], "");
  let a = Zo(i, t, e, n), u = Hy(i, r);
  return Vo(i, r, a), o = Jo(u, a), o
}

function Ow() {
  Nw = Aw
}

function oA() {
  return N()
}

function Fw(t, e, n) {
  let r = N(), o = Ot();
  if (Fe(r, o, e)) {
    let i = Q(), s = Yn();
    Go(i, s, r, t, e, r[j], n, !0)
  }
  return Fw
}

function Pw(t, e, n) {
  let r = N(), o = Ot();
  if (Fe(r, o, e)) {
    let i = Q(), s = Yn(), a = Ta(i.data), u = Tf(a, s, r);
    Go(i, s, r, t, e, u, n, !0)
  }
  return Pw
}

var sn = "en-US";
var Rw = sn;

function gh(t) {
  typeof t == "string" && (Rw = t.toLowerCase().replace(/_/g, "-"))
}

function yh(t, e, n) {
  let r = t[j];
  switch (n) {
    case Node.COMMENT_NODE:
      return Ua(r, e);
    case Node.TEXT_NODE:
      return Ha(r, e);
    case Node.ELEMENT_NODE:
      return Ho(r, e, null)
  }
}

var kw = (t, e, n, r) => ($e(!0), yh(t, n, r));

function Lw(t, e, n, r) {
  return $e(!0), yh(t, n, r)
}

function jw() {
  kw = Lw
}

function Vw(t, e, n, r) {
  let o = N(), i = Q(), s = he();
  return vh(i, o, o[j], s, t, e, r), Vw
}

function Bw(t, e) {
  let n = he(), r = N(), o = Q(), i = Ta(o.data), s = Tf(i, n, r);
  return vh(o, r, s, n, t, e), Bw
}

function $w(t, e, n, r) {
  let o = t.cleanup;
  if (o != null) for (let i = 0; i < o.length - 1; i += 2) {
    let s = o[i];
    if (s === n && o[i + 1] === r) {
      let a = e[Nn], u = o[i + 2];
      return a.length > u ? a[u] : null
    }
    typeof s == "string" && (i += 2)
  }
  return null
}

function vh(t, e, n, r, o, i, s) {
  let a = ba(r), l = t.firstCreatePass && Mf(t), c = e[re], d = Sf(e), f = !0;
  if (r.type & 3 || s) {
    let m = De(r, e), D = s ? s(m) : m, E = d.length, k = s ? B => s(Z(B[r.index])) : r.index, L = null;
    if (!s && a && (L = $w(t, e, o, r.index)), L !== null) {
      let B = L.__ngLastListenerFn__ || L;
      B.__ngNextListenerFn__ = i, L.__ngLastListenerFn__ = i, f = !1
    } else {
      i = _c(r, e, c, i, !1);
      let B = n.listen(D, o, i);
      d.push(i, B), l && l.push(o, k, E, E + 1)
    }
  } else i = _c(r, e, c, i, !1);
  let h = r.outputs, p;
  if (f && h !== null && (p = h[o])) {
    let m = p.length;
    if (m) for (let D = 0; D < m; D += 2) {
      let E = p[D], k = p[D + 1], pe = e[E][k].subscribe(i), q = d.length;
      d.push(i, pe), l && l.push(o, r.index, q, -(q + 1))
    }
  }
}

function Ic(t, e, n, r) {
  let o = A(null);
  try {
    return Ve(6, e, n), n(r) !== !1
  } catch (i) {
    return xf(t, i), !1
  } finally {
    Ve(7, e, n), A(o)
  }
}

function _c(t, e, n, r, o) {
  return function i(s) {
    if (s === Function) return r;
    let a = t.componentOffset > -1 ? lt(t.index, e) : e;
    Ja(a);
    let u = Ic(e, n, r, s), l = i.__ngNextListenerFn__;
    for (; l;) u = Ic(e, n, l, s) && u, l = l.__ngNextListenerFn__;
    return o && u === !1 && s.preventDefault(), u
  }
}

function iA(t = 1) {
  return sy(t)
}

function Hw(t, e) {
  let n = null, r = ag(t);
  for (let o = 0; o < e.length; o++) {
    let i = e[o];
    if (i === "*") {
      n = o;
      continue
    }
    if (r === null ? Uc(t, i, !0) : cg(r, i)) return o
  }
  return n
}

function sA(t) {
  let e = N()[le][ye];
  if (!e.projection) {
    let n = t ? t.length : 1, r = e.projection = Zm(n, null), o = r.slice(), i = e.child;
    for (; i !== null;) {
      let s = t ? Hw(i, t) : 0;
      s !== null && (o[s] ? o[s].projectionNext = i : r[s] = i, o[s] = i), i = i.next
    }
  }
}

function aA(t, e = 0, n) {
  let r = N(), o = Q(), i = tr(o, U + t, 16, null, n || null);
  i.projection === null && (i.projection = e), pd(), (!r[ge] || ln()) && (i.flags & 32) !== 32 && Ov(o, r, i)
}

function Uw(t, e, n) {
  return Dh(t, "", e, "", n), Uw
}

function Dh(t, e, n, r, o) {
  let i = N(), s = eh(i, e, n, r);
  if (s !== Pe) {
    let a = Q(), u = Yn();
    Go(a, u, i, t, s, i[j], o, !1)
  }
  return Dh
}

function uA(t, e, n, r) {
  ME(t, e, n, r)
}

function lA(t, e, n) {
  SE(t, e, n)
}

function cA(t) {
  let e = N(), n = Q(), r = gd();
  xa(r + 1);
  let o = nu(n, r);
  if (t.dirty && Hg(e) === ((o.metadata.flags & 2) === 2)) {
    if (o.matches === null) t.reset([]); else {
      let i = NE(e, r);
      t.reset(i, _y), t.notifyOnChanges()
    }
    return !0
  }
  return !1
}

function dA() {
  return CE(N(), gd())
}

function fA(t) {
  let e = ey();
  return $g(e, U + t)
}

function hA(t, e, n, r, o) {
  let i = N(), s = ZE(i, t, e, n, r, o);
  ih(s)
}

function pA(t, e, n, r, o, i, s, a, u) {
  let l = N(), c = JE(l, t, e, n, r, o, i, s, a, u);
  ih(c)
}

function mA(t, e = "") {
  let n = N(), r = Q(), o = t + U, i = r.firstCreatePass ? tr(r, o, 1, e, null) : r.data[o], s = Eh(r, n, i, e, t);
  n[o] = s, Oa() && Ga(r, n, s, i), Kn(i, !1)
}

var Eh = (t, e, n, r, o) => ($e(!0), Ha(e[j], r));

function zw(t, e, n, r, o) {
  let i = e[ge], s = !i || ln() || rr(n) || Bo(i, o);
  return $e(s), s ? Ha(e[j], r) : Zo(i, t, e, n)
}

function qw() {
  Eh = zw
}

function Gw(t) {
  return wh("", t, ""), Gw
}

function wh(t, e, n) {
  let r = N(), o = eh(r, t, e, n);
  return o !== Pe && uD(r, ct(), o), wh
}

function Ww(t, e, n) {
  let r = Q();
  if (r.firstCreatePass) {
    let o = Je(t);
    la(n, r.data, r.blueprint, o, !0), la(e, r.data, r.blueprint, o, !1)
  }
}

function la(t, e, n, r, o) {
  if (t = ae(t), Array.isArray(t)) for (let i = 0; i < t.length; i++) la(t[i], e, n, r, o); else {
    let i = Q(), s = N(), a = he(), u = Xt(t) ? t : ae(t.provide), l = td(t), c = a.providerIndexes & 1048575,
      d = a.directiveStart, f = a.providerIndexes >> 20;
    if (Xt(t) || !t.multi) {
      let h = new St(l, o, er), p = rs(u, e, o ? c : c + f, d);
      p === -1 ? (gs(fo(a, s), i, u), ns(i, t, e.length), e.push(u), a.directiveStart++, a.directiveEnd++, o && (a.providerIndexes += 1048576), n.push(h), s.push(h)) : (n[p] = h, s[p] = h)
    } else {
      let h = rs(u, e, c + f, d), p = rs(u, e, c, c + f), m = h >= 0 && n[h], D = p >= 0 && n[p];
      if (o && !D || !o && !m) {
        gs(fo(a, s), i, u);
        let E = Yw(o ? Kw : Qw, n.length, o, r, l);
        !o && D && (n[p].providerFactory = E), ns(i, t, e.length, 0), e.push(u), a.directiveStart++, a.directiveEnd++, o && (a.providerIndexes += 1048576), n.push(E), s.push(E)
      } else {
        let E = bh(n[o ? p : h], l, !o && r);
        ns(i, t, h > -1 ? h : p, E)
      }
      !o && r && D && n[p].componentProviders++
    }
  }
}

function ns(t, e, n, r) {
  let o = Xt(e), i = bg(e);
  if (o || i) {
    let u = (i ? ae(e.useClass) : e).prototype.ngOnDestroy;
    if (u) {
      let l = t.destroyHooks || (t.destroyHooks = []);
      if (!o && e.multi) {
        let c = l.indexOf(n);
        c === -1 ? l.push(n, [r, u]) : l[c + 1].push(r, u)
      } else l.push(n, u)
    }
  }
}

function bh(t, e, n) {
  return n && t.componentProviders++, t.multi.push(e) - 1
}

function rs(t, e, n, r) {
  for (let o = n; o < r; o++) if (e[o] === t) return o;
  return -1
}

function Qw(t, e, n, r) {
  return ca(this.multi, [])
}

function Kw(t, e, n, r) {
  let o = this.multi, i;
  if (this.providerFactory) {
    let s = this.providerFactory.componentProviders, a = Mt(n, n[I], this.providerFactory.index, r);
    i = a.slice(0, s), ca(o, i);
    for (let u = s; u < a.length; u++) i.push(a[u])
  } else i = [], ca(o, i);
  return i
}

function ca(t, e) {
  for (let n = 0; n < t.length; n++) {
    let r = t[n];
    e.push(r())
  }
  return e
}

function Yw(t, e, n, r, o) {
  let i = new St(t, n, er);
  return i.multi = [], i.index = e, i.componentProviders = 0, bh(i, o, r && !n), i
}

function gA(t, e = []) {
  return n => {
    n.providersResolver = (r, o) => Ww(r, o ? o(t) : t, e)
  }
}

var Zw = (() => {
  let e = class e {
    constructor(r) {
      this._injector = r, this.cachedInjectors = new Map
    }

    getOrCreateStandaloneInjector(r) {
      if (!r.standalone) return null;
      if (!this.cachedInjectors.has(r)) {
        let o = Zc(!1, r.type), i = o.length > 0 ? qE([o], this._injector, `Standalone[${r.type.name}]`) : null;
        this.cachedInjectors.set(r, i)
      }
      return this.cachedInjectors.get(r)
    }

    ngOnDestroy() {
      try {
        for (let r of this.cachedInjectors.values()) r !== null && r.destroy()
      } finally {
        this.cachedInjectors.clear()
      }
    }
  };
  e.\u0275prov = H({token: e, providedIn: "environment", factory: () => new e(te(at))});
  let t = e;
  return t
})();

function yA(t) {
  fn("NgStandalone"), t.getStandaloneInjector = e => e.get(Zw).getOrCreateStandaloneInjector(t)
}

function vA(t, e) {
  return Yo(t, e)
}

var Qr = null;

function Jw(t) {
  Qr !== null && (t.defaultEncapsulation !== Qr.defaultEncapsulation || t.preserveWhitespaces !== Qr.preserveWhitespaces) || (Qr = t)
}

var DA = (() => {
  let e = class e {
    log(r) {
      console.log(r)
    }

    warn(r) {
      console.warn(r)
    }
  };
  e.\u0275fac = function (o) {
    return new (o || e)
  }, e.\u0275prov = H({token: e, factory: e.\u0275fac, providedIn: "platform"});
  let t = e;
  return t
})();
var Xw = new R(""), eb = new R(""), EA = (() => {
  let e = class e {
    constructor(r, o, i) {
      this._ngZone = r, this.registry = o, this._pendingCount = 0, this._isZoneStable = !0, this._callbacks = [], this.taskTrackingZone = null, ou || (nb(i), i.addToWindow(o)), this._watchAngularEvents(), r.run(() => {
        this.taskTrackingZone = typeof Zone > "u" ? null : Zone.current.get("TaskTrackingZone")
      })
    }

    _watchAngularEvents() {
      this._ngZone.onUnstable.subscribe({
        next: () => {
          this._isZoneStable = !1
        }
      }), this._ngZone.runOutsideAngular(() => {
        this._ngZone.onStable.subscribe({
          next: () => {
            ie.assertNotInAngularZone(), queueMicrotask(() => {
              this._isZoneStable = !0, this._runCallbacksIfReady()
            })
          }
        })
      })
    }

    increasePendingRequestCount() {
      return this._pendingCount += 1, this._pendingCount
    }

    decreasePendingRequestCount() {
      if (this._pendingCount -= 1, this._pendingCount < 0) throw new Error("pending async requests below zero");
      return this._runCallbacksIfReady(), this._pendingCount
    }

    isStable() {
      return this._isZoneStable && this._pendingCount === 0 && !this._ngZone.hasPendingMacrotasks
    }

    _runCallbacksIfReady() {
      if (this.isStable()) queueMicrotask(() => {
        for (; this._callbacks.length !== 0;) {
          let r = this._callbacks.pop();
          clearTimeout(r.timeoutId), r.doneCb()
        }
      }); else {
        let r = this.getPendingTasks();
        this._callbacks = this._callbacks.filter(o => o.updateCb && o.updateCb(r) ? (clearTimeout(o.timeoutId), !1) : !0)
      }
    }

    getPendingTasks() {
      return this.taskTrackingZone ? this.taskTrackingZone.macroTasks.map(r => ({
        source: r.source,
        creationLocation: r.creationLocation,
        data: r.data
      })) : []
    }

    addCallback(r, o, i) {
      let s = -1;
      o && o > 0 && (s = setTimeout(() => {
        this._callbacks = this._callbacks.filter(a => a.timeoutId !== s), r()
      }, o)), this._callbacks.push({doneCb: r, timeoutId: s, updateCb: i})
    }

    whenStable(r, o, i) {
      if (i && !this.taskTrackingZone) throw new Error('Task tracking zone is required when passing an update callback to whenStable(). Is "zone.js/plugins/task-tracking" loaded?');
      this.addCallback(r, o, i), this._runCallbacksIfReady()
    }

    getPendingRequestCount() {
      return this._pendingCount
    }

    registerApplication(r) {
      this.registry.registerApplication(r, this)
    }

    unregisterApplication(r) {
      this.registry.unregisterApplication(r)
    }

    findProviders(r, o, i) {
      return []
    }
  };
  e.\u0275fac = function (o) {
    return new (o || e)(te(ie), te(tb), te(eb))
  }, e.\u0275prov = H({token: e, factory: e.\u0275fac});
  let t = e;
  return t
})(), tb = (() => {
  let e = class e {
    constructor() {
      this._applications = new Map
    }

    registerApplication(r, o) {
      this._applications.set(r, o)
    }

    unregisterApplication(r) {
      this._applications.delete(r)
    }

    unregisterAllApplications() {
      this._applications.clear()
    }

    getTestability(r) {
      return this._applications.get(r) || null
    }

    getAllTestabilities() {
      return Array.from(this._applications.values())
    }

    getAllRootElements() {
      return Array.from(this._applications.keys())
    }

    findTestabilityInTree(r, o = !0) {
      return ou?.findTestabilityInTree(this, r, o) ?? null
    }
  };
  e.\u0275fac = function (o) {
    return new (o || e)
  }, e.\u0275prov = H({token: e, factory: e.\u0275fac, providedIn: "platform"});
  let t = e;
  return t
})();

function nb(t) {
  ou = t
}

var ou;

function iu(t) {
  return !!t && typeof t.then == "function"
}

function Ih(t) {
  return !!t && typeof t.subscribe == "function"
}

var rb = new R(""), su = (() => {
  let e = class e {
    constructor() {
      this.initialized = !1, this.done = !1, this.donePromise = new Promise((r, o) => {
        this.resolve = r, this.reject = o
      }), this.appInits = M(rb, {optional: !0}) ?? []
    }

    runInitializers() {
      if (this.initialized) return;
      let r = [];
      for (let i of this.appInits) {
        let s = i();
        if (iu(s)) r.push(s); else if (Ih(s)) {
          let a = new Promise((u, l) => {
            s.subscribe({complete: u, error: l})
          });
          r.push(a)
        }
      }
      let o = () => {
        this.done = !0, this.resolve()
      };
      Promise.all(r).then(() => {
        o()
      }).catch(i => {
        this.reject(i)
      }), r.length === 0 && o(), this.initialized = !0
    }
  };
  e.\u0275fac = function (o) {
    return new (o || e)
  }, e.\u0275prov = H({token: e, factory: e.\u0275fac, providedIn: "root"});
  let t = e;
  return t
})(), _h = new R("");

function Ch() {
  al(() => {
    throw new g(600, !1)
  })
}

function ob(t) {
  return t.isBoundToModule
}

function Sh(t, e, n) {
  try {
    let r = n();
    return iu(r) ? r.catch(o => {
      throw e.runOutsideAngular(() => t.handleError(o)), o
    }) : r
  } catch (r) {
    throw e.runOutsideAngular(() => t.handleError(r)), r
  }
}

function Mh(t, e) {
  return Array.isArray(e) ? e.reduce(Mh, t) : Ie(Ie({}, t), e)
}

var ei = (() => {
  let e = class e {
    constructor() {
      this._bootstrapListeners = [], this._runningTick = !1, this._destroyed = !1, this._destroyListeners = [], this._views = [], this.internalErrorHandler = M(Rd), this.afterRenderEffectManager = M(Hf), this.externalTestViews = new Set, this.beforeRender = new _e, this.afterTick = new _e, this.componentTypes = [], this.components = [], this.isStable = M(Zf).hasPendingTasks.pipe(Ge(r => !r)), this._injector = M(at)
    }

    get destroyed() {
      return this._destroyed
    }

    get injector() {
      return this._injector
    }

    get viewCount() {
      return this._views.length
    }

    bootstrap(r, o) {
      let i = r instanceof wo;
      if (!this._injector.get(su).done) {
        let h = !i && gg(r), p = !1;
        throw new g(405, p)
      }
      let a;
      i ? a = r : a = this._injector.get(Xo).resolveComponentFactory(r), this.componentTypes.push(a.componentType);
      let u = ob(a) ? void 0 : this._injector.get(ut), l = o || a.selector, c = a.create(dt.NULL, [], l, u),
        d = c.location.nativeElement, f = c.injector.get(Xw, null);
      return f?.registerApplication(d), c.onDestroy(() => {
        this.detachView(c.hostView), no(this.components, c), f?.unregisterApplication(d)
      }), this._loadComponent(c), c
    }

    tick() {
      this._tick(!0)
    }

    _tick(r) {
      if (this._runningTick) throw new g(101, !1);
      let o = A(null);
      try {
        this._runningTick = !0, this.detectChangesInAttachedViews(r)
      } catch (i) {
        this.internalErrorHandler(i)
      } finally {
        this.afterTick.next(), this._runningTick = !1, A(o)
      }
    }

    detectChangesInAttachedViews(r) {
      let o = 0, i = this.afterRenderEffectManager;
      for (; ;) {
        if (o === Pf) throw new g(103, !1);
        if (r) {
          let s = o === 0;
          this.beforeRender.next(s);
          for (let {_lView: a, notifyErrorHandler: u} of this._views) sb(a, s, u)
        }
        if (o++, i.executeInternalCallbacks(), ![...this.externalTestViews.keys(), ...this._views].some(({_lView: s}) => da(s)) && (i.execute(), ![...this.externalTestViews.keys(), ...this._views].some(({_lView: s}) => da(s)))) break
      }
    }

    attachView(r) {
      let o = r;
      this._views.push(o), o.attachToAppRef(this)
    }

    detachView(r) {
      let o = r;
      no(this._views, o), o.detachFromAppRef()
    }

    _loadComponent(r) {
      this.attachView(r.hostView), this.tick(), this.components.push(r);
      let o = this._injector.get(_h, []);
      [...this._bootstrapListeners, ...o].forEach(i => i(r))
    }

    ngOnDestroy() {
      if (!this._destroyed) try {
        this._destroyListeners.forEach(r => r()), this._views.slice().forEach(r => r.destroy())
      } finally {
        this._destroyed = !0, this._views = [], this._bootstrapListeners = [], this._destroyListeners = []
      }
    }

    onDestroy(r) {
      return this._destroyListeners.push(r), () => no(this._destroyListeners, r)
    }

    destroy() {
      if (this._destroyed) throw new g(406, !1);
      let r = this._injector;
      r.destroy && !r.destroyed && r.destroy()
    }

    warnIfDestroyed() {
    }
  };
  e.\u0275fac = function (o) {
    return new (o || e)
  }, e.\u0275prov = H({token: e, factory: e.\u0275fac, providedIn: "root"});
  let t = e;
  return t
})();

function no(t, e) {
  let n = t.indexOf(e);
  n > -1 && t.splice(n, 1)
}

var Kr;

function ib(t) {
  Kr ??= new WeakMap;
  let e = Kr.get(t);
  if (e) return e;
  let n = t.isStable.pipe(ji(r => r)).toPromise().then(() => {
  });
  return Kr.set(t, n), t.onDestroy(() => Kr?.delete(t)), n
}

function sb(t, e, n) {
  !e && !da(t) || ab(t, n, e)
}

function da(t) {
  return Ma(t)
}

function ab(t, e, n) {
  let r;
  n ? (r = 0, t[_] |= 1024) : t[_] & 64 ? r = 0 : r = 1, Rf(t, e, r)
}

var fa = class {
  constructor(e, n) {
    this.ngModuleFactory = e, this.componentFactories = n
  }
}, wA = (() => {
  let e = class e {
    compileModuleSync(r) {
      return new So(r)
    }

    compileModuleAsync(r) {
      return Promise.resolve(this.compileModuleSync(r))
    }

    compileModuleAndAllComponentsSync(r) {
      let o = this.compileModuleSync(r), i = Wc(r), s = tf(i.declarations).reduce((a, u) => {
        let l = st(u);
        return l && a.push(new zn(l)), a
      }, []);
      return new fa(o, s)
    }

    compileModuleAndAllComponentsAsync(r) {
      return Promise.resolve(this.compileModuleAndAllComponentsSync(r))
    }

    clearCache() {
    }

    clearCacheFor(r) {
    }

    getModuleId(r) {
    }
  };
  e.\u0275fac = function (o) {
    return new (o || e)
  }, e.\u0275prov = H({token: e, factory: e.\u0275fac, providedIn: "root"});
  let t = e;
  return t
})(), ub = new R("");

function lb(t, e, n) {
  let r = new So(n);
  return Promise.resolve(r)
}

function Cc(t) {
  for (let e = t.length - 1; e >= 0; e--) if (t[e] !== void 0) return t[e]
}

var cb = (() => {
  let e = class e {
    constructor() {
      this.zone = M(ie), this.applicationRef = M(ei)
    }

    initialize() {
      this._onMicrotaskEmptySubscription || (this._onMicrotaskEmptySubscription = this.zone.onMicrotaskEmpty.subscribe({
        next: () => {
          this.zone.run(() => {
            this.applicationRef.tick()
          })
        }
      }))
    }

    ngOnDestroy() {
      this._onMicrotaskEmptySubscription?.unsubscribe()
    }
  };
  e.\u0275fac = function (o) {
    return new (o || e)
  }, e.\u0275prov = H({token: e, factory: e.\u0275fac, providedIn: "root"});
  let t = e;
  return t
})();

function Th(t) {
  return [{provide: ie, useFactory: t}, {
    provide: Mn, multi: !0, useFactory: () => {
      let e = M(cb, {optional: !0});
      return () => e.initialize()
    }
  }, {
    provide: Mn, multi: !0, useFactory: () => {
      let e = M(hb);
      return () => {
        e.initialize()
      }
    }
  }, {provide: Rd, useFactory: db}]
}

function db() {
  let t = M(ie), e = M(Tt);
  return n => t.runOutsideAngular(() => e.handleError(n))
}

function fb(t) {
  let e = Th(() => new ie(xh(t)));
  return Yc([[], e])
}

function xh(t) {
  return {
    enableLongStackTrace: !1,
    shouldCoalesceEventChangeDetection: t?.eventCoalescing ?? !1,
    shouldCoalesceRunChangeDetection: t?.runCoalescing ?? !1
  }
}

var hb = (() => {
  let e = class e {
    constructor() {
      this.subscription = new K, this.initialized = !1, this.zone = M(ie), this.pendingTasks = M(Zf)
    }

    initialize() {
      if (this.initialized) return;
      this.initialized = !0;
      let r = null;
      !this.zone.isStable && !this.zone.hasPendingMacrotasks && !this.zone.hasPendingMicrotasks && (r = this.pendingTasks.add()), this.zone.runOutsideAngular(() => {
        this.subscription.add(this.zone.onStable.subscribe(() => {
          ie.assertNotInAngularZone(), queueMicrotask(() => {
            r !== null && !this.zone.hasPendingMacrotasks && !this.zone.hasPendingMicrotasks && (this.pendingTasks.remove(r), r = null)
          })
        }))
      }), this.subscription.add(this.zone.onUnstable.subscribe(() => {
        ie.assertInAngularZone(), r ??= this.pendingTasks.add()
      }))
    }

    ngOnDestroy() {
      this.subscription.unsubscribe()
    }
  };
  e.\u0275fac = function (o) {
    return new (o || e)
  }, e.\u0275prov = H({token: e, factory: e.\u0275fac, providedIn: "root"});
  let t = e;
  return t
})();

function pb() {
  return typeof $localize < "u" && $localize.locale || sn
}

var ti = new R("", {providedIn: "root", factory: () => M(ti, F.Optional | F.SkipSelf) || pb()});
var au = new R(""), Nh = (() => {
  let e = class e {
    constructor(r) {
      this._injector = r, this._modules = [], this._destroyListeners = [], this._destroyed = !1
    }

    get injector() {
      return this._injector
    }

    get destroyed() {
      return this._destroyed
    }


    bootstrapModuleFactory(r, o) {
      let i = iE(o?.ngZone, xh({eventCoalescing: o?.ngZoneEventCoalescing, runCoalescing: o?.ngZoneRunCoalescing}));
      return i.run(() => {
        let s = zE(r.moduleType, this.injector, Th(() => i)), a = s.injector.get(Tt, null);
        return i.runOutsideAngular(() => {
          let u = i.onError.subscribe({
            next: l => {
              a.handleError(l)
            }
          });
          s.onDestroy(() => {
            no(this._modules, s), u.unsubscribe()
          })
        }), Sh(a, i, () => {
          let u = s.injector.get(su);
          return u.runInitializers(), u.donePromise.then(() => {
            let l = s.injector.get(ti, sn);
            return gh(l || sn), this._moduleDoBootstrap(s), s
          })
        })
      })
    }

    bootstrapModule(r, o = []) {
      let i = Mh({}, o);
      return lb(this.injector, i, r).then(s => this.bootstrapModuleFactory(s, i))
    }

    _moduleDoBootstrap(r) {
      let o = r.injector.get(ei);
      if (r._bootstrapComponents.length > 0) r._bootstrapComponents.forEach(i => o.bootstrap(i)); else if (r.instance.ngDoBootstrap) r.instance.ngDoBootstrap(o); else throw new g(-403, !1);
      this._modules.push(r)
    }

    onDestroy(r) {
      this._destroyListeners.push(r)
    }

    destroy() {
      if (this._destroyed) throw new g(404, !1);
      this._modules.slice().forEach(o => o.destroy()), this._destroyListeners.forEach(o => o());
      let r = this._injector.get(au, null);
      r && (r.forEach(o => o()), r.clear()), this._destroyed = !0
    }
  };
  e.\u0275fac = function (o) {
    return new (o || e)(te(dt))
  }, e.\u0275prov = H({token: e, factory: e.\u0275fac, providedIn: "platform"});
  let t = e;
  return t
})(), it = null, Ah = new R("");

function mb(t) {
  if (it && !it.get(Ah, !1)) throw new g(400, !1);
  Ch(), it = t;
  let e = t.get(Nh);
  return Ph(t), e
}

function gb(t, e, n = []) {
  let r = `Platform: ${e}`, o = new R(r);
  return (i = []) => {
    let s = Fh();
    if (!s || s.injector.get(Ah, !1)) {
      let a = [...n, ...i, {provide: o, useValue: !0}];
      t ? t(a) : mb(Oh(a, r))
    }
    return yb(o)
  }
}

function Oh(t = [], e) {
  return dt.create({
    name: e,
    providers: [{provide: ed, useValue: "platform"}, {provide: au, useValue: new Set([() => it = null])}, ...t]
  })
}

function yb(t) {
  let e = Fh();
  if (!e) throw new g(401, !1);
  return e
}

function Fh() {
  return it?.get(Nh) ?? null
}

function vb(t = []) {
  if (it) return it;
  let e = Oh(t);
  return it = e, Ch(), Ph(e), e
}

function Ph(t) {
  t.get(Fy, null)?.forEach(n => n())
}

var uu = (() => {
  let e = class e {
  };
  e.__NG_ELEMENT_ID__ = Db;
  let t = e;
  return t
})();

function Db(t) {
  return Eb(he(), N(), (t & 16) === 16)
}

function Eb(t, e, n) {
  if (un(t) && !n) {
    let r = lt(t.index, e);
    return new Nt(r, r)
  } else if (t.type & 47) {
    let r = e[le];
    return new Nt(r, e)
  }
  return null
}

var bA = gb(null, "core", []);

function IA(t) {
  try {
    let {rootComponent: e, appProviders: n, platformProviders: r} = t, o = vb(r), i = [fb(), ...n || []],
      a = new Mo({providers: i, parent: o, debugName: "", runEnvironmentInitializers: !1}).injector, u = a.get(ie);
    return u.run(() => {
      a.resolveInjectorInitializers();
      let l = a.get(Tt, null), c;
      u.runOutsideAngular(() => {
        c = u.onError.subscribe({
          next: h => {
            l.handleError(h)
          }
        })
      });
      let d = () => a.destroy(), f = o.get(au);
      return f.add(d), a.onDestroy(() => {
        c.unsubscribe(), f.delete(d)
      }), Sh(l, u, () => {
        let h = a.get(su);
        return h.runInitializers(), h.donePromise.then(() => {
          let p = a.get(ti, sn);
          gh(p || sn);
          let m = a.get(ei);
          return e !== void 0 && m.bootstrap(e), m
        })
      })
    })
  } catch (e) {
    return Promise.reject(e)
  }
}

var Sc = !1, Rh = !1;

function wb() {
  Sc || (Sc = !0, Vy(), xw(), qw(), Ow(), KE(), EE(), KD(), Hv(), jw())
}

function bb(t, e) {
  return ib(t)
}

function _A() {
  return Yc([{
    provide: $r, useFactory: () => {
      let t = !0;
      return qr() && (t = !!M(jo, {optional: !0})?.get(ja, null)), t && fn("NgHydration"), t
    }
  }, {
    provide: Mn, useValue: () => {
      Rh = !!M(Uy, {optional: !0}), qr() && M($r) && (_b(), wb())
    }, multi: !0
  }, {provide: Qd, useFactory: () => qr() && M($r)}, {
    provide: _h, useFactory: () => {
      if (qr() && M($r)) {
        let t = M(ei), e = M(dt);
        return () => {
          bb(t, e).then(() => {
            ie.assertInAngularZone(), LD(t)
          })
        }
      }
      return () => {
      }
    }, multi: !0
  }])
}

function Ib() {
  return Rh
}

function _b() {
  let t = Zn(), e;
  for (let n of t.body.childNodes) if (n.nodeType === Node.COMMENT_NODE && n.textContent?.trim() === Ly) {
    e = n;
    break
  }
  if (!e) throw new g(-507, !1)
}

var ha = class {
  constructor() {
    this.views = [], this.indexByContent = new Map
  }

  add(e) {
    let n = JSON.stringify(e);
    if (!this.indexByContent.has(n)) {
      let r = this.views.length;
      return this.views.push(e), this.indexByContent.set(n, r), r
    }
    return this.indexByContent.get(n)
  }

  getAll() {
    return this.views
  }
}, Cb = 0;

function kh(t) {
  return t.ssrId || (t.ssrId = `t${Cb++}`), t.ssrId
}

function Lh(t, e, n) {
  let r = [];
  return Bn(t, e, n, r), r.length
}

function Sb(t) {
  let e = [];
  return Of(t, e), e.length
}

function jh(t, e) {
  let n = t[W];
  return n && !n.hasAttribute(Rn) ? Ao(n, t, e) : null
}

function Vh(t, e) {
  let n = _a(t[W]), r = jh(n, e), o = Z(n[W]), i = t[J], s = Ao(o, i, e), a = n[j], u = `${r}|${s}`;
  a.setAttribute(o, _n, u)
}

function CA(t, e) {
  let n = new ha, r = new Map, o = t._views;
  for (let a of o) {
    let u = qd(a);
    if (u !== null) {
      let l = {serializedViewCollection: n, corruptedTextNodes: r};
      ve(u) ? Vh(u, l) : jh(u, l), Nb(r, e)
    }
  }
  let i = n.getAll();
  t.injector.get(jo).set(ja, i)
}

function Mb(t, e) {
  let n = [], r = "";
  for (let o = ne; o < t.length; o++) {
    let i = t[o], s, a, u;
    if (Ia(i) && (i = i[U], ve(i))) {
      a = Sb(i) + 1, Vh(i, e);
      let c = _a(i[W]);
      u = {[_s]: c[I].ssrId, [nn]: a}
    }
    if (!u) {
      let c = i[I];
      c.type === 1 ? (s = c.ssrId, a = 1) : (s = kh(c), a = Lh(c, i, c.firstChild)), u = Ie({
        [_s]: s,
        [nn]: a
      }, Bh(t[o], e))
    }
    let l = JSON.stringify(u);
    if (n.length > 0 && l === r) {
      let c = n[n.length - 1];
      c[mo] ??= 1, c[mo]++
    } else r = l, n.push(u)
  }
  return n
}

function No(t, e, n) {
  let r = e.index - U;
  t[Cs] ??= {}, t[Cs][r] = GD(e, n)
}

function Mc(t, e) {
  let n = e.index - U;
  t[eo] ??= [], t[eo].includes(n) || t[eo].push(n)
}

function Bh(t, e) {
  let n = {}, r = t[I];
  for (let o = U; o < r.bindingStartIndex; o++) {
    let i = r.data[o], s = o - U;
    if (cy(i)) {
      if (Hn(i, t) && Ab(i)) {
        Mc(n, i);
        continue
      }
      if (Array.isArray(i.projection)) {
        for (let a of i.projection) if (a) if (!Array.isArray(a)) !Og(a) && !po(a) && (Hn(a, t) ? Mc(n, a) : No(n, a, t)); else throw SD(Z(t[o]))
      }
      if (Tb(n, i, t), ve(t[o])) {
        let a = i.tView;
        a !== null && (n[Is] ??= {}, n[Is][s] = kh(a));
        let u = t[o][W];
        if (Array.isArray(u)) {
          let l = Z(u);
          l.hasAttribute(Rn) || Ao(l, u, e)
        }
        n[Ln] ??= {}, n[Ln][s] = Mb(t[o], e)
      } else if (Array.isArray(t[o])) {
        let a = Z(t[o][W]);
        a.hasAttribute(Rn) || Ao(a, t[o], e)
      } else if (i.type & 8) n[bs] ??= {}, n[bs][s] = Lh(r, t, i.child); else if (i.type & 16) {
        let a = i.next;
        for (; a !== null && a.type & 16;) a = a.next;
        a && !po(a) && No(n, a, t)
      } else if (i.type & 1) {
        let a = Z(t[o]);
        a.textContent === "" ? e.corruptedTextNodes.set(a, "ngetn") : a.nextSibling?.nodeType === Node.TEXT_NODE && e.corruptedTextNodes.set(a, "ngtns")
      }
    }
  }
  return n
}

function Tb(t, e, n) {
  e.projectionNext && e.projectionNext !== e.next && !po(e.projectionNext) && No(t, e.projectionNext, n), e.prev === null && e.parent !== null && Hn(e.parent, n) && !Hn(e, n) && No(t, e, n)
}

function xb(t) {
  let e = t[re];
  return e?.constructor ? st(e.constructor)?.encapsulation === Jt.ShadowDom : !1
}

function Ao(t, e, n) {
  let r = e[j];
  if (Fg(e) && !Ib() || xb(e)) return r.setAttribute(t, Rn, ""), null;
  {
    let o = Bh(e, n), i = n.serializedViewCollection.add(o);
    return r.setAttribute(t, _n, i.toString()), i
  }
}

function Nb(t, e) {
  for (let [n, r] of t) n.after(e.createComment(r))
}

function Ab(t) {
  let e = t;
  for (; e != null;) {
    if (un(e)) return !0;
    e = e.parent
  }
  return !1
}

function or(t) {
  return typeof t == "boolean" ? t : t != null && t !== "false"
}

function lu(t, e = NaN) {
  return !isNaN(parseFloat(t)) && !isNaN(Number(t)) ? Number(t) : e
}

function SA(...t) {
  return t.reduce((e, n) => Object.assign(e, n, {providers: [...e.providers, ...n.providers]}), {providers: []})
}

var Gh = null;

function cu() {
  return Gh
}

function ZA(t) {
  Gh ??= t
}

var Hh = class {
};
var ni = new R(""), Wh = (() => {
  let e = class e {
    historyGo(r) {
      throw new Error("")
    }
  };
  e.\u0275fac = function (o) {
    return new (o || e)
  }, e.\u0275prov = H({token: e, factory: () => M(Ob), providedIn: "platform"});
  let t = e;
  return t
})();
var Ob = (() => {
  let e = class e extends Wh {
    constructor() {
      super(), this._doc = M(ni), this._location = window.location, this._history = window.history
    }


    get href() {
      return this._location.href
    }

    get protocol() {
      return this._location.protocol
    }

    get hostname() {
      return this._location.hostname
    }

    get port() {
      return this._location.port
    }

    get pathname() {
      return this._location.pathname
    }

    set pathname(r) {
      this._location.pathname = r
    }

    get search() {
      return this._location.search
    }

    get hash() {
      return this._location.hash
    }

    getBaseHrefFromDOM() {
      return cu().getBaseHref(this._doc)
    }

    onPopState(r) {
      let o = cu().getGlobalEventTarget(this._doc, "window");
      return o.addEventListener("popstate", r, !1), () => o.removeEventListener("popstate", r)
    }

    onHashChange(r) {
      let o = cu().getGlobalEventTarget(this._doc, "window");
      return o.addEventListener("hashchange", r, !1), () => o.removeEventListener("hashchange", r)
    }

    pushState(r, o, i) {
      this._history.pushState(r, o, i)
    }

    replaceState(r, o, i) {
      this._history.replaceState(r, o, i)
    }

    forward() {
      this._history.forward()
    }

    back() {
      this._history.back()
    }

    historyGo(r = 0) {
      this._history.go(r)
    }

    getState() {
      return this._history.state
    }
  };
  e.\u0275fac = function (o) {
    return new (o || e)
  }, e.\u0275prov = H({token: e, factory: () => new e, providedIn: "platform"});
  let t = e;
  return t
})();

function Qh(t, e) {
  if (t.length == 0) return e;
  if (e.length == 0) return t;
  let n = 0;
  return t.endsWith("/") && n++, e.startsWith("/") && n++, n == 2 ? t + e.substring(1) : n == 1 ? t + e : t + "/" + e
}

function Uh(t) {
  let e = t.match(/#|\?|$/), n = e && e.index || t.length, r = n - (t[n - 1] === "/" ? 1 : 0);
  return t.slice(0, r) + t.slice(n)
}

function Pt(t) {
  return t && t[0] !== "?" ? "?" + t : t
}

var hu = (() => {
  let e = class e {
    historyGo(r) {
      throw new Error("")
    }
  };
  e.\u0275fac = function (o) {
    return new (o || e)
  }, e.\u0275prov = H({token: e, factory: () => M(Pb), providedIn: "root"});
  let t = e;
  return t
})(), Fb = new R(""), Pb = (() => {
  let e = class e extends hu {
    constructor(r, o) {
      super(), this._platformLocation = r, this._removeListenerFns = [], this._baseHref = o ?? this._platformLocation.getBaseHrefFromDOM() ?? M(ni).location?.origin ?? ""
    }

    ngOnDestroy() {
      for (; this._removeListenerFns.length;) this._removeListenerFns.pop()()
    }

    onPopState(r) {
      this._removeListenerFns.push(this._platformLocation.onPopState(r), this._platformLocation.onHashChange(r))
    }

    getBaseHref() {
      return this._baseHref
    }

    prepareExternalUrl(r) {
      return Qh(this._baseHref, r)
    }

    path(r = !1) {
      let o = this._platformLocation.pathname + Pt(this._platformLocation.search), i = this._platformLocation.hash;
      return i && r ? `${o}${i}` : o
    }

    pushState(r, o, i, s) {
      let a = this.prepareExternalUrl(i + Pt(s));
      this._platformLocation.pushState(r, o, a)
    }

    replaceState(r, o, i, s) {
      let a = this.prepareExternalUrl(i + Pt(s));
      this._platformLocation.replaceState(r, o, a)
    }

    forward() {
      this._platformLocation.forward()
    }

    back() {
      this._platformLocation.back()
    }

    getState() {
      return this._platformLocation.getState()
    }

    historyGo(r = 0) {
      this._platformLocation.historyGo?.(r)
    }
  };
  e.\u0275fac = function (o) {
    return new (o || e)(te(Wh), te(Fb, 8))
  }, e.\u0275prov = H({token: e, factory: e.\u0275fac, providedIn: "root"});
  let t = e;
  return t
})();
var Rb = (() => {
  let e = class e {
    constructor(r) {
      this._subject = new Ne, this._urlChangeListeners = [], this._urlChangeSubscription = null, this._locationStrategy = r;
      let o = this._locationStrategy.getBaseHref();
      this._basePath = jb(Uh(zh(o))), this._locationStrategy.onPopState(i => {
        this._subject.emit({url: this.path(!0), pop: !0, state: i.state, type: i.type})
      })
    }

    ngOnDestroy() {
      this._urlChangeSubscription?.unsubscribe(), this._urlChangeListeners = []
    }

    path(r = !1) {
      return this.normalize(this._locationStrategy.path(r))
    }

    getState() {
      return this._locationStrategy.getState()
    }

    isCurrentPathEqualTo(r, o = "") {
      return this.path() == this.normalize(r + Pt(o))
    }

    normalize(r) {
      return e.stripTrailingSlash(Lb(this._basePath, zh(r)))
    }

    prepareExternalUrl(r) {
      return r && r[0] !== "/" && (r = "/" + r), this._locationStrategy.prepareExternalUrl(r)
    }

    go(r, o = "", i = null) {
      this._locationStrategy.pushState(i, "", r, o), this._notifyUrlChangeListeners(this.prepareExternalUrl(r + Pt(o)), i)
    }

    replaceState(r, o = "", i = null) {
      this._locationStrategy.replaceState(i, "", r, o), this._notifyUrlChangeListeners(this.prepareExternalUrl(r + Pt(o)), i)
    }

    forward() {
      this._locationStrategy.forward()
    }

    back() {
      this._locationStrategy.back()
    }

    historyGo(r = 0) {
      this._locationStrategy.historyGo?.(r)
    }

    onUrlChange(r) {
      return this._urlChangeListeners.push(r), this._urlChangeSubscription ??= this.subscribe(o => {
        this._notifyUrlChangeListeners(o.url, o.state)
      }), () => {
        let o = this._urlChangeListeners.indexOf(r);
        this._urlChangeListeners.splice(o, 1), this._urlChangeListeners.length === 0 && (this._urlChangeSubscription?.unsubscribe(), this._urlChangeSubscription = null)
      }
    }

    _notifyUrlChangeListeners(r = "", o) {
      this._urlChangeListeners.forEach(i => i(r, o))
    }

    subscribe(r, o, i) {
      return this._subject.subscribe({next: r, error: o, complete: i})
    }
  };
  e.normalizeQueryParams = Pt, e.joinWithSlash = Qh, e.stripTrailingSlash = Uh, e.\u0275fac = function (o) {
    return new (o || e)(te(hu))
  }, e.\u0275prov = H({token: e, factory: () => kb(), providedIn: "root"});
  let t = e;
  return t
})();

function kb() {
  return new Rb(te(hu))
}

function Lb(t, e) {
  if (!t || !e.startsWith(t)) return e;
  let n = e.substring(t.length);
  return n === "" || ["/", ";", "?", "#"].includes(n[0]) ? n : e
}

function zh(t) {
  return t.replace(/\/index.html$/, "")
}

function jb(t) {
  if (new RegExp("^(https?:)?//").test(t)) {
    let [, n] = t.split(/\/\/[^\/]+/);
    return n
  }
  return t
}

function JA(t, e) {
  e = encodeURIComponent(e);
  for (let n of t.split(";")) {
    let r = n.indexOf("="), [o, i] = r == -1 ? [n, ""] : [n.slice(0, r), n.slice(r + 1)];
    if (o.trim() === e) return decodeURIComponent(i)
  }
  return null
}

var XA = (() => {
  let e = class e {
    constructor(r) {
      this._viewContainerRef = r, this._viewRef = null, this.ngTemplateOutletContext = null, this.ngTemplateOutlet = null, this.ngTemplateOutletInjector = null
    }

    ngOnChanges(r) {
      if (this._shouldRecreateView(r)) {
        let o = this._viewContainerRef;
        if (this._viewRef && o.remove(o.indexOf(this._viewRef)), !this.ngTemplateOutlet) {
          this._viewRef = null;
          return
        }
        let i = this._createContextForwardProxy();
        this._viewRef = o.createEmbeddedView(this.ngTemplateOutlet, i, {injector: this.ngTemplateOutletInjector ?? void 0})
      }
    }

    _shouldRecreateView(r) {
      return !!r.ngTemplateOutlet || !!r.ngTemplateOutletInjector
    }

    _createContextForwardProxy() {
      return new Proxy({}, {
        set: (r, o, i) => this.ngTemplateOutletContext ? Reflect.set(this.ngTemplateOutletContext, o, i) : !1,
        get: (r, o, i) => {
          if (this.ngTemplateOutletContext) return Reflect.get(this.ngTemplateOutletContext, o, i)
        }
      })
    }
  };
  e.\u0275fac = function (o) {
    return new (o || e)(er(nr))
  }, e.\u0275dir = ya({
    type: e,
    selectors: [["", "ngTemplateOutlet", ""]],
    inputs: {
      ngTemplateOutletContext: "ngTemplateOutletContext",
      ngTemplateOutlet: "ngTemplateOutlet",
      ngTemplateOutletInjector: "ngTemplateOutletInjector"
    },
    standalone: !0,
    features: [ko]
  });
  let t = e;
  return t
})();
var eO = (() => {
  let e = class e {
  };
  e.\u0275fac = function (o) {
    return new (o || e)
  }, e.\u0275mod = zc({type: e}), e.\u0275inj = Oc({});
  let t = e;
  return t
})(), Vb = "browser", Bb = "server";

function $b(t) {
  return t === Vb
}

function Hb(t) {
  return t === Bb
}

var tO = (() => {
  let e = class e {
  };
  e.\u0275prov = H({token: e, providedIn: "root", factory: () => $b(M(Jn)) ? new du(M(ni), window) : new fu});
  let t = e;
  return t
})(), du = class {
  constructor(e, n) {
    this.document = e, this.window = n, this.offset = () => [0, 0]
  }

  setOffset(e) {
    Array.isArray(e) ? this.offset = () => e : this.offset = e
  }

  getScrollPosition() {
    return [this.window.scrollX, this.window.scrollY]
  }

  scrollToPosition(e) {
    this.window.scrollTo(e[0], e[1])
  }

  scrollToAnchor(e) {
    let n = Ub(this.document, e);
    n && (this.scrollToElement(n), n.focus())
  }

  setHistoryScrollRestoration(e) {
    this.window.history.scrollRestoration = e
  }

  scrollToElement(e) {
    let n = e.getBoundingClientRect(), r = n.left + this.window.pageXOffset, o = n.top + this.window.pageYOffset,
      i = this.offset();
    this.window.scrollTo(r - i[0], o - i[1])
  }
};

function Ub(t, e) {
  let n = t.getElementById(e) || t.getElementsByName(e)[0];
  if (n) return n;
  if (typeof t.createTreeWalker == "function" && t.body && typeof t.body.attachShadow == "function") {
    let r = t.createTreeWalker(t.body, NodeFilter.SHOW_ELEMENT), o = r.currentNode;
    for (; o;) {
      let i = o.shadowRoot;
      if (i) {
        let s = i.getElementById(e) || i.querySelector(`[name="${e}"]`);
        if (s) return s
      }
      o = r.nextNode()
    }
  }
  return null
}

var fu = class {
  setOffset(e) {
  }

  getScrollPosition() {
    return [0, 0]
  }

  scrollToPosition(e) {
  }

  scrollToAnchor(e) {
  }

  setHistoryScrollRestoration(e) {
  }
}, qh = class {
};
var Kh = t => t.src, zb = new R("", {providedIn: "root", factory: () => Kh});
var qb = new R("NG_OPTIMIZED_PRELOADED_IMAGES", {providedIn: "root", factory: () => new Set}), Gb = (() => {
  let e = class e {
    constructor() {
      this.preloadedImages = M(qb), this.document = M(ni)
    }

    createPreloadLinkTag(r, o, i, s) {
      if (this.preloadedImages.has(o)) return;
      this.preloadedImages.add(o);
      let a = r.createElement("link");
      r.setAttribute(a, "as", "image"), r.setAttribute(a, "href", o), r.setAttribute(a, "rel", "preload"), r.setAttribute(a, "fetchpriority", "high"), s && r.setAttribute(a, "imageSizes", s), i && r.setAttribute(a, "imageSrcset", i), r.appendChild(this.document.head, a)
    }
  };
  e.\u0275fac = function (o) {
    return new (o || e)
  }, e.\u0275prov = H({token: e, factory: e.\u0275fac, providedIn: "root"});
  let t = e;
  return t
})();
var Wb = /^((\s*\d+w\s*(,|$)){1,})$/;
var Qb = [1, 2], Kb = 640;
var Yb = 1920, Zb = 1080;
var nO = (() => {
  let e = class e {
    constructor() {
      this.imageLoader = M(zb), this.config = Jb(M(Ud)), this.renderer = M(Xa), this.imgElement = M(Ft).nativeElement, this.injector = M(dt), this.isServer = Hb(M(Jn)), this.preloadLinkCreator = M(Gb), this.lcpObserver = null, this._renderedSrc = null, this.priority = !1, this.disableOptimizedSrcset = !1, this.fill = !1
    }

    ngOnInit() {
      fn("NgOptimizedImage"), this.placeholder && this.removePlaceholderOnLoad(this.imgElement), this.setHostAttributes()
    }

    setHostAttributes() {
      this.fill ? this.sizes ||= "100vw" : (this.setHostAttribute("width", this.width.toString()), this.setHostAttribute("height", this.height.toString())), this.setHostAttribute("loading", this.getLoadingBehavior()), this.setHostAttribute("fetchpriority", this.getFetchPriority()), this.setHostAttribute("ng-img", "true");
      let r = this.updateSrcAndSrcset();
      this.sizes && this.setHostAttribute("sizes", this.sizes), this.isServer && this.priority && this.preloadLinkCreator.createPreloadLinkTag(this.renderer, this.getRewrittenSrc(), r, this.sizes)
    }

    ngOnChanges(r) {
      if (r.ngSrc && !r.ngSrc.isFirstChange()) {
        let o = this._renderedSrc;
        this.updateSrcAndSrcset(!0);
        let i = this._renderedSrc;
        this.lcpObserver !== null && o && i && o !== i && this.injector.get(ie).runOutsideAngular(() => {
          this.lcpObserver?.updateImage(o, i)
        })
      }
    }

    callImageLoader(r) {
      let o = r;
      return this.loaderParams && (o.loaderParams = this.loaderParams), this.imageLoader(o)
    }

    getLoadingBehavior() {
      return !this.priority && this.loading !== void 0 ? this.loading : this.priority ? "eager" : "lazy"
    }

    getFetchPriority() {
      return this.priority ? "high" : "auto"
    }

    getRewrittenSrc() {
      if (!this._renderedSrc) {
        let r = {src: this.ngSrc};
        this._renderedSrc = this.callImageLoader(r)
      }
      return this._renderedSrc
    }

    getRewrittenSrcset() {
      let r = Wb.test(this.ngSrcset);
      return this.ngSrcset.split(",").filter(i => i !== "").map(i => {
        i = i.trim();
        let s = r ? parseFloat(i) : parseFloat(i) * this.width;
        return `${this.callImageLoader({src: this.ngSrc, width: s})} ${i}`
      }).join(", ")
    }

    getAutomaticSrcset() {
      return this.sizes ? this.getResponsiveSrcset() : this.getFixedSrcset()
    }

    getResponsiveSrcset() {
      let {breakpoints: r} = this.config, o = r;
      return this.sizes?.trim() === "100vw" && (o = r.filter(s => s >= Kb)), o.map(s => `${this.callImageLoader({
        src: this.ngSrc,
        width: s
      })} ${s}w`).join(", ")
    }

    updateSrcAndSrcset(r = !1) {
      r && (this._renderedSrc = null);
      let o = this.getRewrittenSrc();
      this.setHostAttribute("src", o);
      let i;
      return this.ngSrcset ? i = this.getRewrittenSrcset() : this.shouldGenerateAutomaticSrcset() && (i = this.getAutomaticSrcset()), i && this.setHostAttribute("srcset", i), i
    }

    getFixedSrcset() {
      return Qb.map(o => `${this.callImageLoader({src: this.ngSrc, width: this.width * o})} ${o}x`).join(", ")
    }

    shouldGenerateAutomaticSrcset() {
      let r = !1;
      return this.sizes || (r = this.width > Yb || this.height > Zb), !this.disableOptimizedSrcset && !this.srcset && this.imageLoader !== Kh && !r
    }

    generatePlaceholder(r) {
      let {placeholderResolution: o} = this.config;
      return r === !0 ? `url(${this.callImageLoader({
        src: this.ngSrc,
        width: o,
        isPlaceholder: !0
      })})` : typeof r == "string" && r.startsWith("data:") ? `url(${r})` : null
    }

    shouldBlurPlaceholder(r) {
      return !r || !r.hasOwnProperty("blur") ? !0 : !!r.blur
    }

    removePlaceholderOnLoad(r) {
      let o = () => {
        let a = this.injector.get(uu);
        i(), s(), this.placeholder = !1, a.markForCheck()
      }, i = this.renderer.listen(r, "load", o), s = this.renderer.listen(r, "error", o)
    }

    ngOnDestroy() {
    }

    setHostAttribute(r, o) {
      this.renderer.setAttribute(this.imgElement, r, o)
    }
  };
  e.\u0275fac = function (o) {
    return new (o || e)
  }, e.\u0275dir = ya({
    type: e,
    selectors: [["img", "ngSrc", ""]],
    hostVars: 18,
    hostBindings: function (o, i) {
      o & 2 && ru("position", i.fill ? "absolute" : null)("width", i.fill ? "100%" : null)("height", i.fill ? "100%" : null)("inset", i.fill ? "0" : null)("background-size", i.placeholder ? "cover" : null)("background-position", i.placeholder ? "50% 50%" : null)("background-repeat", i.placeholder ? "no-repeat" : null)("background-image", i.placeholder ? i.generatePlaceholder(i.placeholder) : null)("filter", i.placeholder && i.shouldBlurPlaceholder(i.placeholderConfig) ? "blur(15px)" : null)
    },
    inputs: {
      ngSrc: [fe.HasDecoratorInputTransform, "ngSrc", "ngSrc", Xb],
      ngSrcset: "ngSrcset",
      sizes: "sizes",
      width: [fe.HasDecoratorInputTransform, "width", "width", lu],
      height: [fe.HasDecoratorInputTransform, "height", "height", lu],
      loading: "loading",
      priority: [fe.HasDecoratorInputTransform, "priority", "priority", or],
      loaderParams: "loaderParams",
      disableOptimizedSrcset: [fe.HasDecoratorInputTransform, "disableOptimizedSrcset", "disableOptimizedSrcset", or],
      fill: [fe.HasDecoratorInputTransform, "fill", "fill", or],
      placeholder: [fe.HasDecoratorInputTransform, "placeholder", "placeholder", eI],
      placeholderConfig: "placeholderConfig",
      src: "src",
      srcset: "srcset"
    },
    standalone: !0,
    features: [Yf, ko]
  });
  let t = e;
  return t
})();

function Jb(t) {
  let e = {};
  return t.breakpoints && (e.breakpoints = t.breakpoints.sort((n, r) => n - r)), Object.assign({}, Ra, t, e)
}

function Xb(t) {
  return typeof t == "string" ? t : dn(t)
}

function eI(t) {
  return typeof t == "string" && t.startsWith("data:") ? t : or(t)
}

var T = function (t) {
  return t[t.State = 0] = "State", t[t.Transition = 1] = "Transition", t[t.Sequence = 2] = "Sequence", t[t.Group = 3] = "Group", t[t.Animate = 4] = "Animate", t[t.Keyframes = 5] = "Keyframes", t[t.Style = 6] = "Style", t[t.Trigger = 7] = "Trigger", t[t.Reference = 8] = "Reference", t[t.AnimateChild = 9] = "AnimateChild", t[t.AnimateRef = 10] = "AnimateRef", t[t.Query = 11] = "Query", t[t.Stagger = 12] = "Stagger", t
}(T || {}), He = "*";

function iO(t, e) {
  return {type: T.Trigger, name: t, definitions: e, options: {}}
}

function sO(t, e = null) {
  return {type: T.Animate, styles: e, timings: t}
}

function Yh(t, e = null) {
  return {type: T.Sequence, steps: t, options: e}
}

function pu(t) {
  return {type: T.Style, styles: t, offset: null}
}

function aO(t, e, n) {
  return {type: T.State, name: t, styles: e, options: n}
}

function uO(t, e, n = null) {
  return {type: T.Transition, expr: t, animation: e, options: n}
}

var ft = class {
  constructor(e = 0, n = 0) {
    this._onDoneFns = [], this._onStartFns = [], this._onDestroyFns = [], this._originalOnDoneFns = [], this._originalOnStartFns = [], this._started = !1, this._destroyed = !1, this._finished = !1, this._position = 0, this.parentPlayer = null, this.totalTime = e + n
  }

  _onFinish() {
    this._finished || (this._finished = !0, this._onDoneFns.forEach(e => e()), this._onDoneFns = [])
  }

  onStart(e) {
    this._originalOnStartFns.push(e), this._onStartFns.push(e)
  }

  onDone(e) {
    this._originalOnDoneFns.push(e), this._onDoneFns.push(e)
  }

  onDestroy(e) {
    this._onDestroyFns.push(e)
  }

  hasStarted() {
    return this._started
  }

  init() {
  }

  play() {
    this.hasStarted() || (this._onStart(), this.triggerMicrotask()), this._started = !0
  }

  triggerMicrotask() {
    queueMicrotask(() => this._onFinish())
  }

  _onStart() {
    this._onStartFns.forEach(e => e()), this._onStartFns = []
  }

  pause() {
  }

  restart() {
  }

  finish() {
    this._onFinish()
  }

  destroy() {
    this._destroyed || (this._destroyed = !0, this.hasStarted() || this._onStart(), this.finish(), this._onDestroyFns.forEach(e => e()), this._onDestroyFns = [])
  }

  reset() {
    this._started = !1, this._finished = !1, this._onStartFns = this._originalOnStartFns, this._onDoneFns = this._originalOnDoneFns
  }

  setPosition(e) {
    this._position = this.totalTime ? e * this.totalTime : 1
  }

  getPosition() {
    return this.totalTime ? this._position / this.totalTime : 1
  }

  triggerCallback(e) {
    let n = e == "start" ? this._onStartFns : this._onDoneFns;
    n.forEach(r => r()), n.length = 0
  }
}, ir = class {
  constructor(e) {
    this._onDoneFns = [], this._onStartFns = [], this._finished = !1, this._started = !1, this._destroyed = !1, this._onDestroyFns = [], this.parentPlayer = null, this.totalTime = 0, this.players = e;
    let n = 0, r = 0, o = 0, i = this.players.length;
    i == 0 ? queueMicrotask(() => this._onFinish()) : this.players.forEach(s => {
      s.onDone(() => {
        ++n == i && this._onFinish()
      }), s.onDestroy(() => {
        ++r == i && this._onDestroy()
      }), s.onStart(() => {
        ++o == i && this._onStart()
      })
    }), this.totalTime = this.players.reduce((s, a) => Math.max(s, a.totalTime), 0)
  }

  _onFinish() {
    this._finished || (this._finished = !0, this._onDoneFns.forEach(e => e()), this._onDoneFns = [])
  }

  init() {
    this.players.forEach(e => e.init())
  }

  onStart(e) {
    this._onStartFns.push(e)
  }

  _onStart() {
    this.hasStarted() || (this._started = !0, this._onStartFns.forEach(e => e()), this._onStartFns = [])
  }

  onDone(e) {
    this._onDoneFns.push(e)
  }

  onDestroy(e) {
    this._onDestroyFns.push(e)
  }

  hasStarted() {
    return this._started
  }

  play() {
    this.parentPlayer || this.init(), this._onStart(), this.players.forEach(e => e.play())
  }

  pause() {
    this.players.forEach(e => e.pause())
  }

  restart() {
    this.players.forEach(e => e.restart())
  }

  finish() {
    this._onFinish(), this.players.forEach(e => e.finish())
  }

  destroy() {
    this._onDestroy()
  }

  _onDestroy() {
    this._destroyed || (this._destroyed = !0, this._onFinish(), this.players.forEach(e => e.destroy()), this._onDestroyFns.forEach(e => e()), this._onDestroyFns = [])
  }

  reset() {
    this.players.forEach(e => e.reset()), this._destroyed = !1, this._finished = !1, this._started = !1
  }

  setPosition(e) {
    let n = e * this.totalTime;
    this.players.forEach(r => {
      let o = r.totalTime ? Math.min(1, n / r.totalTime) : 1;
      r.setPosition(o)
    })
  }

  getPosition() {
    let e = this.players.reduce((n, r) => n === null || r.totalTime > n.totalTime ? r : n, null);
    return e != null ? e.getPosition() : 0
  }

  beforeDestroy() {
    this.players.forEach(e => {
      e.beforeDestroy && e.beforeDestroy()
    })
  }

  triggerCallback(e) {
    let n = e == "start" ? this._onStartFns : this._onDoneFns;
    n.forEach(r => r()), n.length = 0
  }
}, ri = "!";

function Zh(t) {
  return new g(3e3, !1)
}

function tI() {
  return new g(3100, !1)
}

function nI() {
  return new g(3101, !1)
}

function rI(t) {
  return new g(3001, !1)
}

function oI(t) {
  return new g(3003, !1)
}

function iI(t) {
  return new g(3004, !1)
}

function sI(t, e) {
  return new g(3005, !1)
}

function aI() {
  return new g(3006, !1)
}

function uI() {
  return new g(3007, !1)
}

function lI(t, e) {
  return new g(3008, !1)
}

function cI(t) {
  return new g(3002, !1)
}

function dI(t, e, n, r, o) {
  return new g(3010, !1)
}

function fI() {
  return new g(3011, !1)
}

function hI() {
  return new g(3012, !1)
}

function pI() {
  return new g(3200, !1)
}

function mI() {
  return new g(3202, !1)
}

function gI() {
  return new g(3013, !1)
}

function yI(t) {
  return new g(3014, !1)
}

function vI(t) {
  return new g(3015, !1)
}

function DI(t) {
  return new g(3016, !1)
}

function EI(t) {
  return new g(3500, !1)
}

function wI(t) {
  return new g(3501, !1)
}

function bI(t, e) {
  return new g(3404, !1)
}

function II(t) {
  return new g(3502, !1)
}

function _I(t) {
  return new g(3503, !1)
}

function CI() {
  return new g(3300, !1)
}

function SI(t) {
  return new g(3504, !1)
}

function MI(t) {
  return new g(3301, !1)
}

function TI(t, e) {
  return new g(3302, !1)
}

function xI(t) {
  return new g(3303, !1)
}

function NI(t, e) {
  return new g(3400, !1)
}

function AI(t) {
  return new g(3401, !1)
}

function OI(t) {
  return new g(3402, !1)
}

function FI(t, e) {
  return new g(3505, !1)
}

var PI = new Set(["-moz-outline-radius", "-moz-outline-radius-bottomleft", "-moz-outline-radius-bottomright", "-moz-outline-radius-topleft", "-moz-outline-radius-topright", "-ms-grid-columns", "-ms-grid-rows", "-webkit-line-clamp", "-webkit-text-fill-color", "-webkit-text-stroke", "-webkit-text-stroke-color", "accent-color", "all", "backdrop-filter", "background", "background-color", "background-position", "background-size", "block-size", "border", "border-block-end", "border-block-end-color", "border-block-end-width", "border-block-start", "border-block-start-color", "border-block-start-width", "border-bottom", "border-bottom-color", "border-bottom-left-radius", "border-bottom-right-radius", "border-bottom-width", "border-color", "border-end-end-radius", "border-end-start-radius", "border-image-outset", "border-image-slice", "border-image-width", "border-inline-end", "border-inline-end-color", "border-inline-end-width", "border-inline-start", "border-inline-start-color", "border-inline-start-width", "border-left", "border-left-color", "border-left-width", "border-radius", "border-right", "border-right-color", "border-right-width", "border-start-end-radius", "border-start-start-radius", "border-top", "border-top-color", "border-top-left-radius", "border-top-right-radius", "border-top-width", "border-width", "bottom", "box-shadow", "caret-color", "clip", "clip-path", "color", "column-count", "column-gap", "column-rule", "column-rule-color", "column-rule-width", "column-width", "columns", "filter", "flex", "flex-basis", "flex-grow", "flex-shrink", "font", "font-size", "font-size-adjust", "font-stretch", "font-variation-settings", "font-weight", "gap", "grid-column-gap", "grid-gap", "grid-row-gap", "grid-template-columns", "grid-template-rows", "height", "inline-size", "input-security", "inset", "inset-block", "inset-block-end", "inset-block-start", "inset-inline", "inset-inline-end", "inset-inline-start", "left", "letter-spacing", "line-clamp", "line-height", "margin", "margin-block-end", "margin-block-start", "margin-bottom", "margin-inline-end", "margin-inline-start", "margin-left", "margin-right", "margin-top", "mask", "mask-border", "mask-position", "mask-size", "max-block-size", "max-height", "max-inline-size", "max-lines", "max-width", "min-block-size", "min-height", "min-inline-size", "min-width", "object-position", "offset", "offset-anchor", "offset-distance", "offset-path", "offset-position", "offset-rotate", "opacity", "order", "outline", "outline-color", "outline-offset", "outline-width", "padding", "padding-block-end", "padding-block-start", "padding-bottom", "padding-inline-end", "padding-inline-start", "padding-left", "padding-right", "padding-top", "perspective", "perspective-origin", "right", "rotate", "row-gap", "scale", "scroll-margin", "scroll-margin-block", "scroll-margin-block-end", "scroll-margin-block-start", "scroll-margin-bottom", "scroll-margin-inline", "scroll-margin-inline-end", "scroll-margin-inline-start", "scroll-margin-left", "scroll-margin-right", "scroll-margin-top", "scroll-padding", "scroll-padding-block", "scroll-padding-block-end", "scroll-padding-block-start", "scroll-padding-bottom", "scroll-padding-inline", "scroll-padding-inline-end", "scroll-padding-inline-start", "scroll-padding-left", "scroll-padding-right", "scroll-padding-top", "scroll-snap-coordinate", "scroll-snap-destination", "scrollbar-color", "shape-image-threshold", "shape-margin", "shape-outside", "tab-size", "text-decoration", "text-decoration-color", "text-decoration-thickness", "text-emphasis", "text-emphasis-color", "text-indent", "text-shadow", "text-underline-offset", "top", "transform", "transform-origin", "translate", "vertical-align", "visibility", "width", "word-spacing", "z-index", "zoom"]);

function ht(t) {
  switch (t.length) {
    case 0:
      return new ft;
    case 1:
      return t[0];
    default:
      return new ir(t)
  }
}

function mp(t, e, n = new Map, r = new Map) {
  let o = [], i = [], s = -1, a = null;
  if (e.forEach(u => {
    let l = u.get("offset"), c = l == s, d = c && a || new Map;
    u.forEach((f, h) => {
      let p = h, m = f;
      if (h !== "offset") switch (p = t.normalizePropertyName(p, o), m) {
        case ri:
          m = n.get(h);
          break;
        case He:
          m = r.get(h);
          break;
        default:
          m = t.normalizeStyleValue(h, p, m, o);
          break
      }
      d.set(p, m)
    }), c || i.push(d), a = d, s = l
  }), o.length) throw II(o);
  return i
}

function Bu(t, e, n, r) {
  switch (e) {
    case"start":
      t.onStart(() => r(n && mu(n, "start", t)));
      break;
    case"done":
      t.onDone(() => r(n && mu(n, "done", t)));
      break;
    case"destroy":
      t.onDestroy(() => r(n && mu(n, "destroy", t)));
      break
  }
}

function mu(t, e, n) {
  let r = n.totalTime, o = !!n.disabled,
    i = $u(t.element, t.triggerName, t.fromState, t.toState, e || t.phaseName, r ?? t.totalTime, o), s = t._data;
  return s != null && (i._data = s), i
}

function $u(t, e, n, r, o = "", i = 0, s) {
  return {element: t, triggerName: e, fromState: n, toState: r, phaseName: o, totalTime: i, disabled: !!s}
}

function we(t, e, n) {
  let r = t.get(e);
  return r || t.set(e, r = n), r
}

function Jh(t) {
  let e = t.indexOf(":"), n = t.substring(1, e), r = t.slice(e + 1);
  return [n, r]
}

var RI = typeof document > "u" ? null : document.documentElement;

function Hu(t) {
  let e = t.parentNode || t.host || null;
  return e === RI ? null : e
}

function kI(t) {
  return t.substring(1, 6) == "ebkit"
}

var Rt = null, Xh = !1;

function LI(t) {
  Rt || (Rt = jI() || {}, Xh = Rt.style ? "WebkitAppearance" in Rt.style : !1);
  let e = !0;
  return Rt.style && !kI(t) && (e = t in Rt.style, !e && Xh && (e = "Webkit" + t.charAt(0).toUpperCase() + t.slice(1) in Rt.style)), e
}

function hO(t) {
  return PI.has(t)
}

function jI() {
  return typeof document < "u" ? document.body : null
}

function gp(t, e) {
  for (; e;) {
    if (e === t) return !0;
    e = Hu(e)
  }
  return !1
}

function yp(t, e, n) {
  if (n) return Array.from(t.querySelectorAll(e));
  let r = t.querySelector(e);
  return r ? [r] : []
}

var vp = (() => {
  let e = class e {
    validateStyleProperty(r) {
      return LI(r)
    }

    matchesElement(r, o) {
      return !1
    }

    containsElement(r, o) {
      return gp(r, o)
    }

    getParentElement(r) {
      return Hu(r)
    }

    query(r, o, i) {
      return yp(r, o, i)
    }

    computeStyle(r, o, i) {
      return i || ""
    }

    animate(r, o, i, s, a, u = [], l) {
      return new ft(i, s)
    }
  };
  e.\u0275fac = function (o) {
    return new (o || e)
  }, e.\u0275prov = H({token: e, factory: e.\u0275fac});
  let t = e;
  return t
})(), Ku = class Ku {
};
Ku.NOOP = new vp;
var ep = Ku, wu = class {
  }, bu = class {
    normalizePropertyName(e, n) {
      return e
    }

    normalizeStyleValue(e, n, r, o) {
      return r
    }
  }, VI = 1e3, Dp = "{{", BI = "}}", Uu = "ng-enter", li = "ng-leave", oi = "ng-trigger", ci = ".ng-trigger",
  tp = "ng-animating", Iu = ".ng-animating";

function et(t) {
  if (typeof t == "number") return t;
  let e = t.match(/^(-?[\.\d]+)(m?s)/);
  return !e || e.length < 2 ? 0 : _u(parseFloat(e[1]), e[2])
}

function _u(t, e) {
  switch (e) {
    case"s":
      return t * VI;
    default:
      return t
  }
}

function di(t, e, n) {
  return t.hasOwnProperty("duration") ? t : $I(t, e, n)
}

function $I(t, e, n) {
  let r = /^(-?[\.\d]+)(m?s)(?:\s+(-?[\.\d]+)(m?s))?(?:\s+([-a-z]+(?:\(.+?\))?))?$/i, o, i = 0, s = "";
  if (typeof t == "string") {
    let a = t.match(r);
    if (a === null) return e.push(Zh(t)), {duration: 0, delay: 0, easing: ""};
    o = _u(parseFloat(a[1]), a[2]);
    let u = a[3];
    u != null && (i = _u(parseFloat(u), a[4]));
    let l = a[5];
    l && (s = l)
  } else o = t;
  if (!n) {
    let a = !1, u = e.length;
    o < 0 && (e.push(tI()), a = !0), i < 0 && (e.push(nI()), a = !0), a && e.splice(u, 0, Zh(t))
  }
  return {duration: o, delay: i, easing: s}
}

function HI(t) {
  return t.length ? t[0] instanceof Map ? t : t.map(e => new Map(Object.entries(e))) : []
}

function np(t) {
  return Array.isArray(t) ? new Map(...t) : new Map(t)
}

function Ue(t, e, n) {
  e.forEach((r, o) => {
    let i = zu(o);
    n && !n.has(o) && n.set(o, t.style[i]), t.style[i] = r
  })
}

function Lt(t, e) {
  e.forEach((n, r) => {
    let o = zu(r);
    t.style[o] = ""
  })
}

function sr(t) {
  return Array.isArray(t) ? t.length == 1 ? t[0] : Yh(t) : t
}

function UI(t, e, n) {
  let r = e.params || {}, o = Ep(t);
  o.length && o.forEach(i => {
    r.hasOwnProperty(i) || n.push(rI(i))
  })
}

var Cu = new RegExp(`${Dp}\\s*(.+?)\\s*${BI}`, "g");

function Ep(t) {
  let e = [];
  if (typeof t == "string") {
    let n;
    for (; n = Cu.exec(t);) e.push(n[1]);
    Cu.lastIndex = 0
  }
  return e
}

function ur(t, e, n) {
  let r = `${t}`, o = r.replace(Cu, (i, s) => {
    let a = e[s];
    return a == null && (n.push(oI(s)), a = ""), a.toString()
  });
  return o == r ? t : o
}

var zI = /-+([a-z0-9])/g;

function zu(t) {
  return t.replace(zI, (...e) => e[1].toUpperCase())
}

function pO(t) {
  return t.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase()
}

function qI(t, e) {
  return t === 0 || e === 0
}

function GI(t, e, n) {
  if (n.size && e.length) {
    let r = e[0], o = [];
    if (n.forEach((i, s) => {
      r.has(s) || o.push(s), r.set(s, i)
    }), o.length) for (let i = 1; i < e.length; i++) {
      let s = e[i];
      o.forEach(a => s.set(a, qu(t, a)))
    }
  }
  return e
}

function Ee(t, e, n) {
  switch (e.type) {
    case T.Trigger:
      return t.visitTrigger(e, n);
    case T.State:
      return t.visitState(e, n);
    case T.Transition:
      return t.visitTransition(e, n);
    case T.Sequence:
      return t.visitSequence(e, n);
    case T.Group:
      return t.visitGroup(e, n);
    case T.Animate:
      return t.visitAnimate(e, n);
    case T.Keyframes:
      return t.visitKeyframes(e, n);
    case T.Style:
      return t.visitStyle(e, n);
    case T.Reference:
      return t.visitReference(e, n);
    case T.AnimateChild:
      return t.visitAnimateChild(e, n);
    case T.AnimateRef:
      return t.visitAnimateRef(e, n);
    case T.Query:
      return t.visitQuery(e, n);
    case T.Stagger:
      return t.visitStagger(e, n);
    default:
      throw iI(e.type)
  }
}

function qu(t, e) {
  return window.getComputedStyle(t)[e]
}

var WI = new Set(["width", "height", "minWidth", "minHeight", "maxWidth", "maxHeight", "left", "top", "bottom", "right", "fontSize", "outlineWidth", "outlineOffset", "paddingTop", "paddingLeft", "paddingBottom", "paddingRight", "marginTop", "marginLeft", "marginBottom", "marginRight", "borderRadius", "borderWidth", "borderTopWidth", "borderLeftWidth", "borderRightWidth", "borderBottomWidth", "textIndent", "perspective"]),
  Su = class extends wu {
    normalizePropertyName(e, n) {
      return zu(e)
    }

    normalizeStyleValue(e, n, r, o) {
      let i = "", s = r.toString().trim();
      if (WI.has(n) && r !== 0 && r !== "0") if (typeof r == "number") i = "px"; else {
        let a = r.match(/^[+-]?[\d\.]+([a-z]*)$/);
        a && a[1].length == 0 && o.push(sI(e, r))
      }
      return s + i
    }
  };
var fi = "*";

function QI(t, e) {
  let n = [];
  return typeof t == "string" ? t.split(/\s*,\s*/).forEach(r => KI(r, n, e)) : n.push(t), n
}

function KI(t, e, n) {
  if (t[0] == ":") {
    let u = YI(t, n);
    if (typeof u == "function") {
      e.push(u);
      return
    }
    t = u
  }
  let r = t.match(/^(\*|[-\w]+)\s*(<?[=-]>)\s*(\*|[-\w]+)$/);
  if (r == null || r.length < 4) return n.push(vI(t)), e;
  let o = r[1], i = r[2], s = r[3];
  e.push(rp(o, s));
  let a = o == fi && s == fi;
  i[0] == "<" && !a && e.push(rp(s, o))
}

function YI(t, e) {
  switch (t) {
    case":enter":
      return "void => *";
    case":leave":
      return "* => void";
    case":increment":
      return (n, r) => parseFloat(r) > parseFloat(n);
    case":decrement":
      return (n, r) => parseFloat(r) < parseFloat(n);
    default:
      return e.push(DI(t)), "* => *"
  }
}

var ii = new Set(["true", "1"]), si = new Set(["false", "0"]);

function rp(t, e) {
  let n = ii.has(t) || si.has(t), r = ii.has(e) || si.has(e);
  return (o, i) => {
    let s = t == fi || t == o, a = e == fi || e == i;
    return !s && n && typeof o == "boolean" && (s = o ? ii.has(t) : si.has(t)), !a && r && typeof i == "boolean" && (a = i ? ii.has(e) : si.has(e)), s && a
  }
}

var wp = ":self", ZI = new RegExp(`s*${wp}s*,?`, "g");

function Gu(t, e, n, r) {
  return new Mu(t).build(e, n, r)
}

var op = "", Mu = class {
  constructor(e) {
    this._driver = e
  }

  build(e, n, r) {
    let o = new Tu(n);
    return this._resetContextStyleTimingState(o), Ee(this, sr(e), o)
  }

  _resetContextStyleTimingState(e) {
    e.currentQuerySelector = op, e.collectedStyles = new Map, e.collectedStyles.set(op, new Map), e.currentTime = 0
  }

  visitTrigger(e, n) {
    let r = n.queryCount = 0, o = n.depCount = 0, i = [], s = [];
    return e.name.charAt(0) == "@" && n.errors.push(aI()), e.definitions.forEach(a => {
      if (this._resetContextStyleTimingState(n), a.type == T.State) {
        let u = a, l = u.name;
        l.toString().split(/\s*,\s*/).forEach(c => {
          u.name = c, i.push(this.visitState(u, n))
        }), u.name = l
      } else if (a.type == T.Transition) {
        let u = this.visitTransition(a, n);
        r += u.queryCount, o += u.depCount, s.push(u)
      } else n.errors.push(uI())
    }), {type: T.Trigger, name: e.name, states: i, transitions: s, queryCount: r, depCount: o, options: null}
  }

  visitState(e, n) {
    let r = this.visitStyle(e.styles, n), o = e.options && e.options.params || null;
    if (r.containsDynamicStyles) {
      let i = new Set, s = o || {};
      r.styles.forEach(a => {
        a instanceof Map && a.forEach(u => {
          Ep(u).forEach(l => {
            s.hasOwnProperty(l) || i.add(l)
          })
        })
      }), i.size && n.errors.push(lI(e.name, [...i.values()]))
    }
    return {type: T.State, name: e.name, style: r, options: o ? {params: o} : null}
  }

  visitTransition(e, n) {
    n.queryCount = 0, n.depCount = 0;
    let r = Ee(this, sr(e.animation), n), o = QI(e.expr, n.errors);
    return {
      type: T.Transition,
      matchers: o,
      animation: r,
      queryCount: n.queryCount,
      depCount: n.depCount,
      options: kt(e.options)
    }
  }

  visitSequence(e, n) {
    return {type: T.Sequence, steps: e.steps.map(r => Ee(this, r, n)), options: kt(e.options)}
  }

  visitGroup(e, n) {
    let r = n.currentTime, o = 0, i = e.steps.map(s => {
      n.currentTime = r;
      let a = Ee(this, s, n);
      return o = Math.max(o, n.currentTime), a
    });
    return n.currentTime = o, {type: T.Group, steps: i, options: kt(e.options)}
  }

  visitAnimate(e, n) {
    let r = t_(e.timings, n.errors);
    n.currentAnimateTimings = r;
    let o, i = e.styles ? e.styles : pu({});
    if (i.type == T.Keyframes) o = this.visitKeyframes(i, n); else {
      let s = e.styles, a = !1;
      if (!s) {
        a = !0;
        let l = {};
        r.easing && (l.easing = r.easing), s = pu(l)
      }
      n.currentTime += r.duration + r.delay;
      let u = this.visitStyle(s, n);
      u.isEmptyStep = a, o = u
    }
    return n.currentAnimateTimings = null, {type: T.Animate, timings: r, style: o, options: null}
  }

  visitStyle(e, n) {
    let r = this._makeStyleAst(e, n);
    return this._validateStyleAst(r, n), r
  }

  _makeStyleAst(e, n) {
    let r = [], o = Array.isArray(e.styles) ? e.styles : [e.styles];
    for (let a of o) typeof a == "string" ? a === He ? r.push(a) : n.errors.push(cI(a)) : r.push(new Map(Object.entries(a)));
    let i = !1, s = null;
    return r.forEach(a => {
      if (a instanceof Map && (a.has("easing") && (s = a.get("easing"), a.delete("easing")), !i)) {
        for (let u of a.values()) if (u.toString().indexOf(Dp) >= 0) {
          i = !0;
          break
        }
      }
    }), {type: T.Style, styles: r, easing: s, offset: e.offset, containsDynamicStyles: i, options: null}
  }

  _validateStyleAst(e, n) {
    let r = n.currentAnimateTimings, o = n.currentTime, i = n.currentTime;
    r && i > 0 && (i -= r.duration + r.delay), e.styles.forEach(s => {
      typeof s != "string" && s.forEach((a, u) => {
        let l = n.collectedStyles.get(n.currentQuerySelector), c = l.get(u), d = !0;
        c && (i != o && i >= c.startTime && o <= c.endTime && (n.errors.push(dI(u, c.startTime, c.endTime, i, o)), d = !1), i = c.startTime), d && l.set(u, {
          startTime: i,
          endTime: o
        }), n.options && UI(a, n.options, n.errors)
      })
    })
  }

  visitKeyframes(e, n) {
    let r = {type: T.Keyframes, styles: [], options: null};
    if (!n.currentAnimateTimings) return n.errors.push(fI()), r;
    let o = 1, i = 0, s = [], a = !1, u = !1, l = 0, c = e.steps.map(E => {
      let k = this._makeStyleAst(E, n), L = k.offset != null ? k.offset : e_(k.styles), B = 0;
      return L != null && (i++, B = k.offset = L), u = u || B < 0 || B > 1, a = a || B < l, l = B, s.push(B), k
    });
    u && n.errors.push(hI()), a && n.errors.push(pI());
    let d = e.steps.length, f = 0;
    i > 0 && i < d ? n.errors.push(mI()) : i == 0 && (f = o / (d - 1));
    let h = d - 1, p = n.currentTime, m = n.currentAnimateTimings, D = m.duration;
    return c.forEach((E, k) => {
      let L = f > 0 ? k == h ? 1 : f * k : s[k], B = L * D;
      n.currentTime = p + m.delay + B, m.duration = B, this._validateStyleAst(E, n), E.offset = L, r.styles.push(E)
    }), r
  }

  visitReference(e, n) {
    return {type: T.Reference, animation: Ee(this, sr(e.animation), n), options: kt(e.options)}
  }

  visitAnimateChild(e, n) {
    return n.depCount++, {type: T.AnimateChild, options: kt(e.options)}
  }

  visitAnimateRef(e, n) {
    return {type: T.AnimateRef, animation: this.visitReference(e.animation, n), options: kt(e.options)}
  }

  visitQuery(e, n) {
    let r = n.currentQuerySelector, o = e.options || {};
    n.queryCount++, n.currentQuery = e;
    let [i, s] = JI(e.selector);
    n.currentQuerySelector = r.length ? r + " " + i : i, we(n.collectedStyles, n.currentQuerySelector, new Map);
    let a = Ee(this, sr(e.animation), n);
    return n.currentQuery = null, n.currentQuerySelector = r, {
      type: T.Query,
      selector: i,
      limit: o.limit || 0,
      optional: !!o.optional,
      includeSelf: s,
      animation: a,
      originalSelector: e.selector,
      options: kt(e.options)
    }
  }

  visitStagger(e, n) {
    n.currentQuery || n.errors.push(gI());
    let r = e.timings === "full" ? {duration: 0, delay: 0, easing: "full"} : di(e.timings, n.errors, !0);
    return {type: T.Stagger, animation: Ee(this, sr(e.animation), n), timings: r, options: null}
  }
};

function JI(t) {
  let e = !!t.split(/\s*,\s*/).find(n => n == wp);
  return e && (t = t.replace(ZI, "")), t = t.replace(/@\*/g, ci).replace(/@\w+/g, n => ci + "-" + n.slice(1)).replace(/:animating/g, Iu), [t, e]
}

function XI(t) {
  return t ? Ie({}, t) : null
}

var Tu = class {
  constructor(e) {
    this.errors = e, this.queryCount = 0, this.depCount = 0, this.currentTransition = null, this.currentQuery = null, this.currentQuerySelector = null, this.currentAnimateTimings = null, this.currentTime = 0, this.collectedStyles = new Map, this.options = null, this.unsupportedCSSPropertiesFound = new Set
  }
};

function e_(t) {
  if (typeof t == "string") return null;
  let e = null;
  if (Array.isArray(t)) t.forEach(n => {
    if (n instanceof Map && n.has("offset")) {
      let r = n;
      e = parseFloat(r.get("offset")), r.delete("offset")
    }
  }); else if (t instanceof Map && t.has("offset")) {
    let n = t;
    e = parseFloat(n.get("offset")), n.delete("offset")
  }
  return e
}

function t_(t, e) {
  if (t.hasOwnProperty("duration")) return t;
  if (typeof t == "number") {
    let i = di(t, e).duration;
    return gu(i, 0, "")
  }
  let n = t;
  if (n.split(/\s+/).some(i => i.charAt(0) == "{" && i.charAt(1) == "{")) {
    let i = gu(0, 0, "");
    return i.dynamic = !0, i.strValue = n, i
  }
  let o = di(n, e);
  return gu(o.duration, o.delay, o.easing)
}

function kt(t) {
  return t ? (t = Ie({}, t), t.params && (t.params = XI(t.params))) : t = {}, t
}

function gu(t, e, n) {
  return {duration: t, delay: e, easing: n}
}

function Wu(t, e, n, r, o, i, s = null, a = !1) {
  return {
    type: 1,
    element: t,
    keyframes: e,
    preStyleProps: n,
    postStyleProps: r,
    duration: o,
    delay: i,
    totalTime: o + i,
    easing: s,
    subTimeline: a
  }
}

var mn = class {
  constructor() {
    this._map = new Map
  }

  get(e) {
    return this._map.get(e) || []
  }

  append(e, n) {
    let r = this._map.get(e);
    r || this._map.set(e, r = []), r.push(...n)
  }

  has(e) {
    return this._map.has(e)
  }

  clear() {
    this._map.clear()
  }
}, n_ = 1, r_ = ":enter", o_ = new RegExp(r_, "g"), i_ = ":leave", s_ = new RegExp(i_, "g");

function Qu(t, e, n, r, o, i = new Map, s = new Map, a, u, l = []) {
  return new xu().buildKeyframes(t, e, n, r, o, i, s, a, u, l)
}

var xu = class {
  buildKeyframes(e, n, r, o, i, s, a, u, l, c = []) {
    l = l || new mn;
    let d = new Nu(e, n, l, o, i, c, []);
    d.options = u;
    let f = u.delay ? et(u.delay) : 0;
    d.currentTimeline.delayNextStep(f), d.currentTimeline.setStyles([s], null, d.errors, u), Ee(this, r, d);
    let h = d.timelines.filter(p => p.containsAnimation());
    if (h.length && a.size) {
      let p;
      for (let m = h.length - 1; m >= 0; m--) {
        let D = h[m];
        if (D.element === n) {
          p = D;
          break
        }
      }
      p && !p.allowOnlyTimelineStyles() && p.setStyles([a], null, d.errors, u)
    }
    return h.length ? h.map(p => p.buildKeyframes()) : [Wu(n, [], [], [], 0, f, "", !1)]
  }

  visitTrigger(e, n) {
  }

  visitState(e, n) {
  }

  visitTransition(e, n) {
  }

  visitAnimateChild(e, n) {
    let r = n.subInstructions.get(n.element);
    if (r) {
      let o = n.createSubContext(e.options), i = n.currentTimeline.currentTime,
        s = this._visitSubInstructions(r, o, o.options);
      i != s && n.transformIntoNewTimeline(s)
    }
    n.previousNode = e
  }

  visitAnimateRef(e, n) {
    let r = n.createSubContext(e.options);
    r.transformIntoNewTimeline(), this._applyAnimationRefDelays([e.options, e.animation.options], n, r), this.visitReference(e.animation, r), n.transformIntoNewTimeline(r.currentTimeline.currentTime), n.previousNode = e
  }

  _applyAnimationRefDelays(e, n, r) {
    for (let o of e) {
      let i = o?.delay;
      if (i) {
        let s = typeof i == "number" ? i : et(ur(i, o?.params ?? {}, n.errors));
        r.delayNextStep(s)
      }
    }
  }

  _visitSubInstructions(e, n, r) {
    let i = n.currentTimeline.currentTime, s = r.duration != null ? et(r.duration) : null,
      a = r.delay != null ? et(r.delay) : null;
    return s !== 0 && e.forEach(u => {
      let l = n.appendInstructionToTimeline(u, s, a);
      i = Math.max(i, l.duration + l.delay)
    }), i
  }

  visitReference(e, n) {
    n.updateOptions(e.options, !0), Ee(this, e.animation, n), n.previousNode = e
  }

  visitSequence(e, n) {
    let r = n.subContextCount, o = n, i = e.options;
    if (i && (i.params || i.delay) && (o = n.createSubContext(i), o.transformIntoNewTimeline(), i.delay != null)) {
      o.previousNode.type == T.Style && (o.currentTimeline.snapshotCurrentStyles(), o.previousNode = hi);
      let s = et(i.delay);
      o.delayNextStep(s)
    }
    e.steps.length && (e.steps.forEach(s => Ee(this, s, o)), o.currentTimeline.applyStylesToKeyframe(), o.subContextCount > r && o.transformIntoNewTimeline()), n.previousNode = e
  }

  visitGroup(e, n) {
    let r = [], o = n.currentTimeline.currentTime, i = e.options && e.options.delay ? et(e.options.delay) : 0;
    e.steps.forEach(s => {
      let a = n.createSubContext(e.options);
      i && a.delayNextStep(i), Ee(this, s, a), o = Math.max(o, a.currentTimeline.currentTime), r.push(a.currentTimeline)
    }), r.forEach(s => n.currentTimeline.mergeTimelineCollectedStyles(s)), n.transformIntoNewTimeline(o), n.previousNode = e
  }

  _visitTiming(e, n) {
    if (e.dynamic) {
      let r = e.strValue, o = n.params ? ur(r, n.params, n.errors) : r;
      return di(o, n.errors)
    } else return {duration: e.duration, delay: e.delay, easing: e.easing}
  }

  visitAnimate(e, n) {
    let r = n.currentAnimateTimings = this._visitTiming(e.timings, n), o = n.currentTimeline;
    r.delay && (n.incrementTime(r.delay), o.snapshotCurrentStyles());
    let i = e.style;
    i.type == T.Keyframes ? this.visitKeyframes(i, n) : (n.incrementTime(r.duration), this.visitStyle(i, n), o.applyStylesToKeyframe()), n.currentAnimateTimings = null, n.previousNode = e
  }

  visitStyle(e, n) {
    let r = n.currentTimeline, o = n.currentAnimateTimings;
    !o && r.hasCurrentStyleProperties() && r.forwardFrame();
    let i = o && o.easing || e.easing;
    e.isEmptyStep ? r.applyEmptyStep(i) : r.setStyles(e.styles, i, n.errors, n.options), n.previousNode = e
  }

  visitKeyframes(e, n) {
    let r = n.currentAnimateTimings, o = n.currentTimeline.duration, i = r.duration,
      a = n.createSubContext().currentTimeline;
    a.easing = r.easing, e.styles.forEach(u => {
      let l = u.offset || 0;
      a.forwardTime(l * i), a.setStyles(u.styles, u.easing, n.errors, n.options), a.applyStylesToKeyframe()
    }), n.currentTimeline.mergeTimelineCollectedStyles(a), n.transformIntoNewTimeline(o + i), n.previousNode = e
  }

  visitQuery(e, n) {
    let r = n.currentTimeline.currentTime, o = e.options || {}, i = o.delay ? et(o.delay) : 0;
    i && (n.previousNode.type === T.Style || r == 0 && n.currentTimeline.hasCurrentStyleProperties()) && (n.currentTimeline.snapshotCurrentStyles(), n.previousNode = hi);
    let s = r, a = n.invokeQuery(e.selector, e.originalSelector, e.limit, e.includeSelf, !!o.optional, n.errors);
    n.currentQueryTotal = a.length;
    let u = null;
    a.forEach((l, c) => {
      n.currentQueryIndex = c;
      let d = n.createSubContext(e.options, l);
      i && d.delayNextStep(i), l === n.element && (u = d.currentTimeline), Ee(this, e.animation, d), d.currentTimeline.applyStylesToKeyframe();
      let f = d.currentTimeline.currentTime;
      s = Math.max(s, f)
    }), n.currentQueryIndex = 0, n.currentQueryTotal = 0, n.transformIntoNewTimeline(s), u && (n.currentTimeline.mergeTimelineCollectedStyles(u), n.currentTimeline.snapshotCurrentStyles()), n.previousNode = e
  }

  visitStagger(e, n) {
    let r = n.parentContext, o = n.currentTimeline, i = e.timings, s = Math.abs(i.duration),
      a = s * (n.currentQueryTotal - 1), u = s * n.currentQueryIndex;
    switch (i.duration < 0 ? "reverse" : i.easing) {
      case"reverse":
        u = a - u;
        break;
      case"full":
        u = r.currentStaggerTime;
        break
    }
    let c = n.currentTimeline;
    u && c.delayNextStep(u);
    let d = c.currentTime;
    Ee(this, e.animation, n), n.previousNode = e, r.currentStaggerTime = o.currentTime - d + (o.startTime - r.currentTimeline.startTime)
  }
}, hi = {}, Nu = class t {
  constructor(e, n, r, o, i, s, a, u) {
    this._driver = e, this.element = n, this.subInstructions = r, this._enterClassName = o, this._leaveClassName = i, this.errors = s, this.timelines = a, this.parentContext = null, this.currentAnimateTimings = null, this.previousNode = hi, this.subContextCount = 0, this.options = {}, this.currentQueryIndex = 0, this.currentQueryTotal = 0, this.currentStaggerTime = 0, this.currentTimeline = u || new pi(this._driver, n, 0), a.push(this.currentTimeline)
  }

  get params() {
    return this.options.params
  }

  updateOptions(e, n) {
    if (!e) return;
    let r = e, o = this.options;
    r.duration != null && (o.duration = et(r.duration)), r.delay != null && (o.delay = et(r.delay));
    let i = r.params;
    if (i) {
      let s = o.params;
      s || (s = this.options.params = {}), Object.keys(i).forEach(a => {
        (!n || !s.hasOwnProperty(a)) && (s[a] = ur(i[a], s, this.errors))
      })
    }
  }

  _copyOptions() {
    let e = {};
    if (this.options) {
      let n = this.options.params;
      if (n) {
        let r = e.params = {};
        Object.keys(n).forEach(o => {
          r[o] = n[o]
        })
      }
    }
    return e
  }

  createSubContext(e = null, n, r) {
    let o = n || this.element,
      i = new t(this._driver, o, this.subInstructions, this._enterClassName, this._leaveClassName, this.errors, this.timelines, this.currentTimeline.fork(o, r || 0));
    return i.previousNode = this.previousNode, i.currentAnimateTimings = this.currentAnimateTimings, i.options = this._copyOptions(), i.updateOptions(e), i.currentQueryIndex = this.currentQueryIndex, i.currentQueryTotal = this.currentQueryTotal, i.parentContext = this, this.subContextCount++, i
  }

  transformIntoNewTimeline(e) {
    return this.previousNode = hi, this.currentTimeline = this.currentTimeline.fork(this.element, e), this.timelines.push(this.currentTimeline), this.currentTimeline
  }

  appendInstructionToTimeline(e, n, r) {
    let o = {duration: n ?? e.duration, delay: this.currentTimeline.currentTime + (r ?? 0) + e.delay, easing: ""},
      i = new Au(this._driver, e.element, e.keyframes, e.preStyleProps, e.postStyleProps, o, e.stretchStartingKeyframe);
    return this.timelines.push(i), o
  }

  incrementTime(e) {
    this.currentTimeline.forwardTime(this.currentTimeline.duration + e)
  }

  delayNextStep(e) {
    e > 0 && this.currentTimeline.delayNextStep(e)
  }

  invokeQuery(e, n, r, o, i, s) {
    let a = [];
    if (o && a.push(this.element), e.length > 0) {
      e = e.replace(o_, "." + this._enterClassName), e = e.replace(s_, "." + this._leaveClassName);
      let u = r != 1, l = this._driver.query(this.element, e, u);
      r !== 0 && (l = r < 0 ? l.slice(l.length + r, l.length) : l.slice(0, r)), a.push(...l)
    }
    return !i && a.length == 0 && s.push(yI(n)), a
  }
}, pi = class t {
  constructor(e, n, r, o) {
    this._driver = e, this.element = n, this.startTime = r, this._elementTimelineStylesLookup = o, this.duration = 0, this.easing = null, this._previousKeyframe = new Map, this._currentKeyframe = new Map, this._keyframes = new Map, this._styleSummary = new Map, this._localTimelineStyles = new Map, this._pendingStyles = new Map, this._backFill = new Map, this._currentEmptyStepKeyframe = null, this._elementTimelineStylesLookup || (this._elementTimelineStylesLookup = new Map), this._globalTimelineStyles = this._elementTimelineStylesLookup.get(n), this._globalTimelineStyles || (this._globalTimelineStyles = this._localTimelineStyles, this._elementTimelineStylesLookup.set(n, this._localTimelineStyles)), this._loadKeyframe()
  }


  get currentTime() {
    return this.startTime + this.duration
  }

  get properties() {
    let e = [];
    for (let n in this._currentKeyframe) e.push(n);
    return e
  }

  containsAnimation() {
    switch (this._keyframes.size) {
      case 0:
        return !1;
      case 1:
        return this.hasCurrentStyleProperties();
      default:
        return !0
    }
  }

  hasCurrentStyleProperties() {
    return this._currentKeyframe.size > 0
  }

  delayNextStep(e) {
    let n = this._keyframes.size === 1 && this._pendingStyles.size;
    this.duration || n ? (this.forwardTime(this.currentTime + e), n && this.snapshotCurrentStyles()) : this.startTime += e
  }

  fork(e, n) {
    return this.applyStylesToKeyframe(), new t(this._driver, e, n || this.currentTime, this._elementTimelineStylesLookup)
  }

  _loadKeyframe() {
    this._currentKeyframe && (this._previousKeyframe = this._currentKeyframe), this._currentKeyframe = this._keyframes.get(this.duration), this._currentKeyframe || (this._currentKeyframe = new Map, this._keyframes.set(this.duration, this._currentKeyframe))
  }

  forwardFrame() {
    this.duration += n_, this._loadKeyframe()
  }

  forwardTime(e) {
    this.applyStylesToKeyframe(), this.duration = e, this._loadKeyframe()
  }

  _updateStyle(e, n) {
    this._localTimelineStyles.set(e, n), this._globalTimelineStyles.set(e, n), this._styleSummary.set(e, {
      time: this.currentTime,
      value: n
    })
  }

  allowOnlyTimelineStyles() {
    return this._currentEmptyStepKeyframe !== this._currentKeyframe
  }

  applyEmptyStep(e) {
    e && this._previousKeyframe.set("easing", e);
    for (let [n, r] of this._globalTimelineStyles) this._backFill.set(n, r || He), this._currentKeyframe.set(n, He);
    this._currentEmptyStepKeyframe = this._currentKeyframe
  }

  setStyles(e, n, r, o) {
    n && this._previousKeyframe.set("easing", n);
    let i = o && o.params || {}, s = a_(e, this._globalTimelineStyles);
    for (let [a, u] of s) {
      let l = ur(u, i, r);
      this._pendingStyles.set(a, l), this._localTimelineStyles.has(a) || this._backFill.set(a, this._globalTimelineStyles.get(a) ?? He), this._updateStyle(a, l)
    }
  }

  applyStylesToKeyframe() {
    this._pendingStyles.size != 0 && (this._pendingStyles.forEach((e, n) => {
      this._currentKeyframe.set(n, e)
    }), this._pendingStyles.clear(), this._localTimelineStyles.forEach((e, n) => {
      this._currentKeyframe.has(n) || this._currentKeyframe.set(n, e)
    }))
  }

  snapshotCurrentStyles() {
    for (let [e, n] of this._localTimelineStyles) this._pendingStyles.set(e, n), this._updateStyle(e, n)
  }

  getFinalKeyframe() {
    return this._keyframes.get(this.duration)
  }

  mergeTimelineCollectedStyles(e) {
    e._styleSummary.forEach((n, r) => {
      let o = this._styleSummary.get(r);
      (!o || n.time > o.time) && this._updateStyle(r, n.value)
    })
  }

  buildKeyframes() {
    this.applyStylesToKeyframe();
    let e = new Set, n = new Set, r = this._keyframes.size === 1 && this.duration === 0, o = [];
    this._keyframes.forEach((a, u) => {
      let l = new Map([...this._backFill, ...a]);
      l.forEach((c, d) => {
        c === ri ? e.add(d) : c === He && n.add(d)
      }), r || l.set("offset", u / this.duration), o.push(l)
    });
    let i = [...e.values()], s = [...n.values()];
    if (r) {
      let a = o[0], u = new Map(a);
      a.set("offset", 0), u.set("offset", 1), o = [a, u]
    }
    return Wu(this.element, o, i, s, this.duration, this.startTime, this.easing, !1)
  }
}, Au = class extends pi {
  constructor(e, n, r, o, i, s, a = !1) {
    super(e, n, s.delay), this.keyframes = r, this.preStyleProps = o, this.postStyleProps = i, this._stretchStartingKeyframe = a, this.timings = {
      duration: s.duration,
      delay: s.delay,
      easing: s.easing
    }
  }

  containsAnimation() {
    return this.keyframes.length > 1
  }

  buildKeyframes() {
    let e = this.keyframes, {delay: n, duration: r, easing: o} = this.timings;
    if (this._stretchStartingKeyframe && n) {
      let i = [], s = r + n, a = n / s, u = new Map(e[0]);
      u.set("offset", 0), i.push(u);
      let l = new Map(e[0]);
      l.set("offset", ip(a)), i.push(l);
      let c = e.length - 1;
      for (let d = 1; d <= c; d++) {
        let f = new Map(e[d]), h = f.get("offset"), p = n + h * r;
        f.set("offset", ip(p / s)), i.push(f)
      }
      r = s, n = 0, o = "", e = i
    }
    return Wu(this.element, e, this.preStyleProps, this.postStyleProps, r, n, o, !0)
  }
};

function ip(t, e = 3) {
  let n = Math.pow(10, e - 1);
  return Math.round(t * n) / n
}

function a_(t, e) {
  let n = new Map, r;
  return t.forEach(o => {
    if (o === "*") {
      r ??= e.keys();
      for (let i of r) n.set(i, He)
    } else for (let [i, s] of o) n.set(i, s)
  }), n
}

function sp(t, e, n, r, o, i, s, a, u, l, c, d, f) {
  return {
    type: 0,
    element: t,
    triggerName: e,
    isRemovalTransition: o,
    fromState: n,
    fromStyles: i,
    toState: r,
    toStyles: s,
    timelines: a,
    queriedElements: u,
    preStyleProps: l,
    postStyleProps: c,
    totalTime: d,
    errors: f
  }
}

var yu = {}, mi = class {
  constructor(e, n, r) {
    this._triggerName = e, this.ast = n, this._stateStyles = r
  }

  match(e, n, r, o) {
    return u_(this.ast.matchers, e, n, r, o)
  }

  buildStyles(e, n, r) {
    let o = this._stateStyles.get("*");
    return e !== void 0 && (o = this._stateStyles.get(e?.toString()) || o), o ? o.buildStyles(n, r) : new Map
  }

  build(e, n, r, o, i, s, a, u, l, c) {
    let d = [], f = this.ast.options && this.ast.options.params || yu, h = a && a.params || yu,
      p = this.buildStyles(r, h, d), m = u && u.params || yu, D = this.buildStyles(o, m, d), E = new Set, k = new Map,
      L = new Map, B = o === "void", pe = {params: bp(m, f), delay: this.ast.options?.delay},
      q = c ? [] : Qu(e, n, this.ast.animation, i, s, p, D, pe, l, d), G = 0;
    return q.forEach(X => {
      G = Math.max(X.duration + X.delay, G)
    }), d.length ? sp(n, this._triggerName, r, o, B, p, D, [], [], k, L, G, d) : (q.forEach(X => {
      let ze = X.element, tt = we(k, ze, new Set);
      X.preStyleProps.forEach(pt => tt.add(pt));
      let Yu = we(L, ze, new Set);
      X.postStyleProps.forEach(pt => Yu.add(pt)), ze !== n && E.add(ze)
    }), sp(n, this._triggerName, r, o, B, p, D, q, [...E.values()], k, L, G))
  }
};

function u_(t, e, n, r, o) {
  return t.some(i => i(e, n, r, o))
}

function bp(t, e) {
  let n = Ie({}, e);
  return Object.entries(t).forEach(([r, o]) => {
    o != null && (n[r] = o)
  }), n
}

var Ou = class {
  constructor(e, n, r) {
    this.styles = e, this.defaultParams = n, this.normalizer = r
  }

  buildStyles(e, n) {
    let r = new Map, o = bp(e, this.defaultParams);
    return this.styles.styles.forEach(i => {
      typeof i != "string" && i.forEach((s, a) => {
        s && (s = ur(s, o, n));
        let u = this.normalizer.normalizePropertyName(a, n);
        s = this.normalizer.normalizeStyleValue(a, u, s, n), r.set(a, s)
      })
    }), r
  }
};

function l_(t, e, n) {
  return new Fu(t, e, n)
}

var Fu = class {
  constructor(e, n, r) {
    this.name = e, this.ast = n, this._normalizer = r, this.transitionFactories = [], this.states = new Map, n.states.forEach(o => {
      let i = o.options && o.options.params || {};
      this.states.set(o.name, new Ou(o.style, i, r))
    }), ap(this.states, "true", "1"), ap(this.states, "false", "0"), n.transitions.forEach(o => {
      this.transitionFactories.push(new mi(e, o, this.states))
    }), this.fallbackTransition = c_(e, this.states, this._normalizer)
  }

  get containsQueries() {
    return this.ast.queryCount > 0
  }

  matchTransition(e, n, r, o) {
    return this.transitionFactories.find(s => s.match(e, n, r, o)) || null
  }

  matchStyles(e, n, r) {
    return this.fallbackTransition.buildStyles(e, n, r)
  }
};

function c_(t, e, n) {
  let r = [(s, a) => !0], o = {type: T.Sequence, steps: [], options: null},
    i = {type: T.Transition, animation: o, matchers: r, options: null, queryCount: 0, depCount: 0};
  return new mi(t, i, e)
}

function ap(t, e, n) {
  t.has(e) ? t.has(n) || t.set(n, t.get(e)) : t.has(n) && t.set(e, t.get(n))
}

var d_ = new mn, Pu = class {
    constructor(e, n, r) {
      this.bodyNode = e, this._driver = n, this._normalizer = r, this._animations = new Map, this._playersById = new Map, this.players = []
    }

    register(e, n) {
      let r = [], o = [], i = Gu(this._driver, n, r, o);
      if (r.length) throw _I(r);
      o.length && void 0, this._animations.set(e, i)
    }

    _buildPlayer(e, n, r) {
      let o = e.element, i = mp(this._normalizer, e.keyframes, n, r);
      return this._driver.animate(o, i, e.duration, e.delay, e.easing, [], !0)
    }

    create(e, n, r = {}) {
      let o = [], i = this._animations.get(e), s, a = new Map;
      if (i ? (s = Qu(this._driver, n, i, Uu, li, new Map, new Map, r, d_, o), s.forEach(c => {
        let d = we(a, c.element, new Map);
        c.postStyleProps.forEach(f => d.set(f, null))
      })) : (o.push(CI()), s = []), o.length) throw SI(o);
      a.forEach((c, d) => {
        c.forEach((f, h) => {
          c.set(h, this._driver.computeStyle(d, h, He))
        })
      });
      let u = s.map(c => {
        let d = a.get(c.element);
        return this._buildPlayer(c, new Map, d)
      }), l = ht(u);
      return this._playersById.set(e, l), l.onDestroy(() => this.destroy(e)), this.players.push(l), l
    }

    destroy(e) {
      let n = this._getPlayer(e);
      n.destroy(), this._playersById.delete(e);
      let r = this.players.indexOf(n);
      r >= 0 && this.players.splice(r, 1)
    }

    _getPlayer(e) {
      let n = this._playersById.get(e);
      if (!n) throw MI(e);
      return n
    }

    listen(e, n, r, o) {
      let i = $u(n, "", "", "");
      return Bu(this._getPlayer(e), r, i, o), () => {
      }
    }

    command(e, n, r, o) {
      if (r == "register") {
        this.register(e, o[0]);
        return
      }
      if (r == "create") {
        let s = o[0] || {};
        this.create(e, n, s);
        return
      }
      let i = this._getPlayer(e);
      switch (r) {
        case"play":
          i.play();
          break;
        case"pause":
          i.pause();
          break;
        case"reset":
          i.reset();
          break;
        case"restart":
          i.restart();
          break;
        case"finish":
          i.finish();
          break;
        case"init":
          i.init();
          break;
        case"setPosition":
          i.setPosition(parseFloat(o[0]));
          break;
        case"destroy":
          this.destroy(e);
          break
      }
    }
  }, up = "ng-animate-queued", f_ = ".ng-animate-queued", vu = "ng-animate-disabled", h_ = ".ng-animate-disabled",
  p_ = "ng-star-inserted", m_ = ".ng-star-inserted", g_ = [],
  Ip = {namespaceId: "", setForRemoval: !1, setForMove: !1, hasAnimation: !1, removedBeforeQueried: !1},
  y_ = {namespaceId: "", setForMove: !1, setForRemoval: !1, hasAnimation: !1, removedBeforeQueried: !0},
  Re = "__ng_removed", lr = class {
    constructor(e, n = "") {
      this.namespaceId = n;
      let r = e && e.hasOwnProperty("value"), o = r ? e.value : e;
      if (this.value = D_(o), r) {
        let i = e, {value: s} = i, a = el(i, ["value"]);
        this.options = a
      } else this.options = {};
      this.options.params || (this.options.params = {})
    }

    get params() {
      return this.options.params
    }

    absorbOptions(e) {
      let n = e.params;
      if (n) {
        let r = this.options.params;
        Object.keys(n).forEach(o => {
          r[o] == null && (r[o] = n[o])
        })
      }
    }
  }, ar = "void", Du = new lr(ar), Ru = class {
    constructor(e, n, r) {
      this.id = e, this.hostElement = n, this._engine = r, this.players = [], this._triggers = new Map, this._queue = [], this._elementListeners = new Map, this._hostClassName = "ng-tns-" + e, Se(n, this._hostClassName)
    }

    listen(e, n, r, o) {
      if (!this._triggers.has(n)) throw TI(r, n);
      if (r == null || r.length == 0) throw xI(n);
      if (!E_(r)) throw NI(r, n);
      let i = we(this._elementListeners, e, []), s = {name: n, phase: r, callback: o};
      i.push(s);
      let a = we(this._engine.statesByElement, e, new Map);
      return a.has(n) || (Se(e, oi), Se(e, oi + "-" + n), a.set(n, Du)), () => {
        this._engine.afterFlush(() => {
          let u = i.indexOf(s);
          u >= 0 && i.splice(u, 1), this._triggers.has(n) || a.delete(n)
        })
      }
    }

    register(e, n) {
      return this._triggers.has(e) ? !1 : (this._triggers.set(e, n), !0)
    }

    _getTrigger(e) {
      let n = this._triggers.get(e);
      if (!n) throw AI(e);
      return n
    }

    trigger(e, n, r, o = !0) {
      let i = this._getTrigger(n), s = new cr(this.id, n, e), a = this._engine.statesByElement.get(e);
      a || (Se(e, oi), Se(e, oi + "-" + n), this._engine.statesByElement.set(e, a = new Map));
      let u = a.get(n), l = new lr(r, this.id);
      if (!(r && r.hasOwnProperty("value")) && u && l.absorbOptions(u.options), a.set(n, l), u || (u = Du), !(l.value === ar) && u.value === l.value) {
        if (!I_(u.params, l.params)) {
          let m = [], D = i.matchStyles(u.value, u.params, m), E = i.matchStyles(l.value, l.params, m);
          m.length ? this._engine.reportError(m) : this._engine.afterFlush(() => {
            Lt(e, D), Ue(e, E)
          })
        }
        return
      }
      let f = we(this._engine.playersByElement, e, []);
      f.forEach(m => {
        m.namespaceId == this.id && m.triggerName == n && m.queued && m.destroy()
      });
      let h = i.matchTransition(u.value, l.value, e, l.params), p = !1;
      if (!h) {
        if (!o) return;
        h = i.fallbackTransition, p = !0
      }
      return this._engine.totalQueuedPlayers++, this._queue.push({
        element: e,
        triggerName: n,
        transition: h,
        fromState: u,
        toState: l,
        player: s,
        isFallbackTransition: p
      }), p || (Se(e, up), s.onStart(() => {
        hn(e, up)
      })), s.onDone(() => {
        let m = this.players.indexOf(s);
        m >= 0 && this.players.splice(m, 1);
        let D = this._engine.playersByElement.get(e);
        if (D) {
          let E = D.indexOf(s);
          E >= 0 && D.splice(E, 1)
        }
      }), this.players.push(s), f.push(s), s
    }

    deregister(e) {
      this._triggers.delete(e), this._engine.statesByElement.forEach(n => n.delete(e)), this._elementListeners.forEach((n, r) => {
        this._elementListeners.set(r, n.filter(o => o.name != e))
      })
    }

    clearElementCache(e) {
      this._engine.statesByElement.delete(e), this._elementListeners.delete(e);
      let n = this._engine.playersByElement.get(e);
      n && (n.forEach(r => r.destroy()), this._engine.playersByElement.delete(e))
    }

    _signalRemovalForInnerTriggers(e, n) {
      let r = this._engine.driver.query(e, ci, !0);
      r.forEach(o => {
        if (o[Re]) return;
        let i = this._engine.fetchNamespacesByElement(o);
        i.size ? i.forEach(s => s.triggerLeaveAnimation(o, n, !1, !0)) : this.clearElementCache(o)
      }), this._engine.afterFlushAnimationsDone(() => r.forEach(o => this.clearElementCache(o)))
    }

    triggerLeaveAnimation(e, n, r, o) {
      let i = this._engine.statesByElement.get(e), s = new Map;
      if (i) {
        let a = [];
        if (i.forEach((u, l) => {
          if (s.set(l, u.value), this._triggers.has(l)) {
            let c = this.trigger(e, l, ar, o);
            c && a.push(c)
          }
        }), a.length) return this._engine.markElementAsRemoved(this.id, e, !0, n, s), r && ht(a).onDone(() => this._engine.processLeaveNode(e)), !0
      }
      return !1
    }

    prepareLeaveAnimationListeners(e) {
      let n = this._elementListeners.get(e), r = this._engine.statesByElement.get(e);
      if (n && r) {
        let o = new Set;
        n.forEach(i => {
          let s = i.name;
          if (o.has(s)) return;
          o.add(s);
          let u = this._triggers.get(s).fallbackTransition, l = r.get(s) || Du, c = new lr(ar), d = new cr(this.id, s, e);
          this._engine.totalQueuedPlayers++, this._queue.push({
            element: e,
            triggerName: s,
            transition: u,
            fromState: l,
            toState: c,
            player: d,
            isFallbackTransition: !0
          })
        })
      }
    }

    removeNode(e, n) {
      let r = this._engine;
      if (e.childElementCount && this._signalRemovalForInnerTriggers(e, n), this.triggerLeaveAnimation(e, n, !0)) return;
      let o = !1;
      if (r.totalAnimations) {
        let i = r.players.length ? r.playersByQueriedElement.get(e) : [];
        if (i && i.length) o = !0; else {
          let s = e;
          for (; s = s.parentNode;) if (r.statesByElement.get(s)) {
            o = !0;
            break
          }
        }
      }
      if (this.prepareLeaveAnimationListeners(e), o) r.markElementAsRemoved(this.id, e, !1, n); else {
        let i = e[Re];
        (!i || i === Ip) && (r.afterFlush(() => this.clearElementCache(e)), r.destroyInnerAnimations(e), r._onRemovalComplete(e, n))
      }
    }

    insertNode(e, n) {
      Se(e, this._hostClassName)
    }

    drainQueuedTransitions(e) {
      let n = [];
      return this._queue.forEach(r => {
        let o = r.player;
        if (o.destroyed) return;
        let i = r.element, s = this._elementListeners.get(i);
        s && s.forEach(a => {
          if (a.name == r.triggerName) {
            let u = $u(i, r.triggerName, r.fromState.value, r.toState.value);
            u._data = e, Bu(r.player, a.phase, u, a.callback)
          }
        }), o.markedForDestroy ? this._engine.afterFlush(() => {
          o.destroy()
        }) : n.push(r)
      }), this._queue = [], n.sort((r, o) => {
        let i = r.transition.ast.depCount, s = o.transition.ast.depCount;
        return i == 0 || s == 0 ? i - s : this._engine.driver.containsElement(r.element, o.element) ? 1 : -1
      })
    }

    destroy(e) {
      this.players.forEach(n => n.destroy()), this._signalRemovalForInnerTriggers(this.hostElement, e)
    }
  }, ku = class {
    constructor(e, n, r, o) {
      this.bodyNode = e, this.driver = n, this._normalizer = r, this.scheduler = o, this.players = [], this.newHostElements = new Map, this.playersByElement = new Map, this.playersByQueriedElement = new Map, this.statesByElement = new Map, this.disabledNodes = new Set, this.totalAnimations = 0, this.totalQueuedPlayers = 0, this._namespaceLookup = {}, this._namespaceList = [], this._flushFns = [], this._whenQuietFns = [], this.namespacesByHostElement = new Map, this.collectedEnterElements = [], this.collectedLeaveElements = [], this.onRemovalComplete = (i, s) => {
      }
    }

    get queuedPlayers() {
      let e = [];
      return this._namespaceList.forEach(n => {
        n.players.forEach(r => {
          r.queued && e.push(r)
        })
      }), e
    }

    _onRemovalComplete(e, n) {
      this.onRemovalComplete(e, n)
    }

    createNamespace(e, n) {
      let r = new Ru(e, n, this);
      return this.bodyNode && this.driver.containsElement(this.bodyNode, n) ? this._balanceNamespaceList(r, n) : (this.newHostElements.set(n, r), this.collectEnterElement(n)), this._namespaceLookup[e] = r
    }

    _balanceNamespaceList(e, n) {
      let r = this._namespaceList, o = this.namespacesByHostElement;
      if (r.length - 1 >= 0) {
        let s = !1, a = this.driver.getParentElement(n);
        for (; a;) {
          let u = o.get(a);
          if (u) {
            let l = r.indexOf(u);
            r.splice(l + 1, 0, e), s = !0;
            break
          }
          a = this.driver.getParentElement(a)
        }
        s || r.unshift(e)
      } else r.push(e);
      return o.set(n, e), e
    }

    register(e, n) {
      let r = this._namespaceLookup[e];
      return r || (r = this.createNamespace(e, n)), r
    }

    registerTrigger(e, n, r) {
      let o = this._namespaceLookup[e];
      o && o.register(n, r) && this.totalAnimations++
    }

    destroy(e, n) {
      e && (this.afterFlush(() => {
      }), this.afterFlushAnimationsDone(() => {
        let r = this._fetchNamespace(e);
        this.namespacesByHostElement.delete(r.hostElement);
        let o = this._namespaceList.indexOf(r);
        o >= 0 && this._namespaceList.splice(o, 1), r.destroy(n), delete this._namespaceLookup[e]
      }))
    }

    _fetchNamespace(e) {
      return this._namespaceLookup[e]
    }

    fetchNamespacesByElement(e) {
      let n = new Set, r = this.statesByElement.get(e);
      if (r) {
        for (let o of r.values()) if (o.namespaceId) {
          let i = this._fetchNamespace(o.namespaceId);
          i && n.add(i)
        }
      }
      return n
    }

    trigger(e, n, r, o) {
      if (ai(n)) {
        let i = this._fetchNamespace(e);
        if (i) return i.trigger(n, r, o), !0
      }
      return !1
    }

    insertNode(e, n, r, o) {
      if (!ai(n)) return;
      let i = n[Re];
      if (i && i.setForRemoval) {
        i.setForRemoval = !1, i.setForMove = !0;
        let s = this.collectedLeaveElements.indexOf(n);
        s >= 0 && this.collectedLeaveElements.splice(s, 1)
      }
      if (e) {
        let s = this._fetchNamespace(e);
        s && s.insertNode(n, r)
      }
      o && this.collectEnterElement(n)
    }

    collectEnterElement(e) {
      this.collectedEnterElements.push(e)
    }

    markElementAsDisabled(e, n) {
      n ? this.disabledNodes.has(e) || (this.disabledNodes.add(e), Se(e, vu)) : this.disabledNodes.has(e) && (this.disabledNodes.delete(e), hn(e, vu))
    }

    removeNode(e, n, r) {
      if (ai(n)) {
        this.scheduler?.notify();
        let o = e ? this._fetchNamespace(e) : null;
        o ? o.removeNode(n, r) : this.markElementAsRemoved(e, n, !1, r);
        let i = this.namespacesByHostElement.get(n);
        i && i.id !== e && i.removeNode(n, r)
      } else this._onRemovalComplete(n, r)
    }

    markElementAsRemoved(e, n, r, o, i) {
      this.collectedLeaveElements.push(n), n[Re] = {
        namespaceId: e,
        setForRemoval: o,
        hasAnimation: r,
        removedBeforeQueried: !1,
        previousTriggersValues: i
      }
    }

    listen(e, n, r, o, i) {
      return ai(n) ? this._fetchNamespace(e).listen(n, r, o, i) : () => {
      }
    }

    _buildInstruction(e, n, r, o, i) {
      return e.transition.build(this.driver, e.element, e.fromState.value, e.toState.value, r, o, e.fromState.options, e.toState.options, n, i)
    }

    destroyInnerAnimations(e) {
      let n = this.driver.query(e, ci, !0);
      n.forEach(r => this.destroyActiveAnimationsForElement(r)), this.playersByQueriedElement.size != 0 && (n = this.driver.query(e, Iu, !0), n.forEach(r => this.finishActiveQueriedAnimationOnElement(r)))
    }

    destroyActiveAnimationsForElement(e) {
      let n = this.playersByElement.get(e);
      n && n.forEach(r => {
        r.queued ? r.markedForDestroy = !0 : r.destroy()
      })
    }

    finishActiveQueriedAnimationOnElement(e) {
      let n = this.playersByQueriedElement.get(e);
      n && n.forEach(r => r.finish())
    }

    whenRenderingDone() {
      return new Promise(e => {
        if (this.players.length) return ht(this.players).onDone(() => e());
        e()
      })
    }

    processLeaveNode(e) {
      let n = e[Re];
      if (n && n.setForRemoval) {
        if (e[Re] = Ip, n.namespaceId) {
          this.destroyInnerAnimations(e);
          let r = this._fetchNamespace(n.namespaceId);
          r && r.clearElementCache(e)
        }
        this._onRemovalComplete(e, n.setForRemoval)
      }
      e.classList?.contains(vu) && this.markElementAsDisabled(e, !1), this.driver.query(e, h_, !0).forEach(r => {
        this.markElementAsDisabled(r, !1)
      })
    }

    flush(e = -1) {
      let n = [];
      if (this.newHostElements.size && (this.newHostElements.forEach((r, o) => this._balanceNamespaceList(r, o)), this.newHostElements.clear()), this.totalAnimations && this.collectedEnterElements.length) for (let r = 0; r < this.collectedEnterElements.length; r++) {
        let o = this.collectedEnterElements[r];
        Se(o, p_)
      }
      if (this._namespaceList.length && (this.totalQueuedPlayers || this.collectedLeaveElements.length)) {
        let r = [];
        try {
          n = this._flushAnimations(r, e)
        } finally {
          for (let o = 0; o < r.length; o++) r[o]()
        }
      } else for (let r = 0; r < this.collectedLeaveElements.length; r++) {
        let o = this.collectedLeaveElements[r];
        this.processLeaveNode(o)
      }
      if (this.totalQueuedPlayers = 0, this.collectedEnterElements.length = 0, this.collectedLeaveElements.length = 0, this._flushFns.forEach(r => r()), this._flushFns = [], this._whenQuietFns.length) {
        let r = this._whenQuietFns;
        this._whenQuietFns = [], n.length ? ht(n).onDone(() => {
          r.forEach(o => o())
        }) : r.forEach(o => o())
      }
    }

    reportError(e) {
      throw OI(e)
    }

    _flushAnimations(e, n) {
      let r = new mn, o = [], i = new Map, s = [], a = new Map, u = new Map, l = new Map, c = new Set;
      this.disabledNodes.forEach(y => {
        c.add(y);
        let v = this.driver.query(y, f_, !0);
        for (let b = 0; b < v.length; b++) c.add(v[b])
      });
      let d = this.bodyNode, f = Array.from(this.statesByElement.keys()), h = dp(f, this.collectedEnterElements),
        p = new Map, m = 0;
      h.forEach((y, v) => {
        let b = Uu + m++;
        p.set(v, b), y.forEach(P => Se(P, b))
      });
      let D = [], E = new Set, k = new Set;
      for (let y = 0; y < this.collectedLeaveElements.length; y++) {
        let v = this.collectedLeaveElements[y], b = v[Re];
        b && b.setForRemoval && (D.push(v), E.add(v), b.hasAnimation ? this.driver.query(v, m_, !0).forEach(P => E.add(P)) : k.add(v))
      }
      let L = new Map, B = dp(f, Array.from(E));
      B.forEach((y, v) => {
        let b = li + m++;
        L.set(v, b), y.forEach(P => Se(P, b))
      }), e.push(() => {
        h.forEach((y, v) => {
          let b = p.get(v);
          y.forEach(P => hn(P, b))
        }), B.forEach((y, v) => {
          let b = L.get(v);
          y.forEach(P => hn(P, b))
        }), D.forEach(y => {
          this.processLeaveNode(y)
        })
      });
      let pe = [], q = [];
      for (let y = this._namespaceList.length - 1; y >= 0; y--) this._namespaceList[y].drainQueuedTransitions(n).forEach(b => {
        let P = b.player, ee = b.element;
        if (pe.push(P), this.collectedEnterElements.length) {
          let oe = ee[Re];
          if (oe && oe.setForMove) {
            if (oe.previousTriggersValues && oe.previousTriggersValues.has(b.triggerName)) {
              let mt = oe.previousTriggersValues.get(b.triggerName), be = this.statesByElement.get(b.element);
              if (be && be.has(b.triggerName)) {
                let dr = be.get(b.triggerName);
                dr.value = mt, be.set(b.triggerName, dr)
              }
            }
            P.destroy();
            return
          }
        }
        let ke = !d || !this.driver.containsElement(d, ee), me = L.get(ee), nt = p.get(ee),
          z = this._buildInstruction(b, r, nt, me, ke);
        if (z.errors && z.errors.length) {
          q.push(z);
          return
        }
        if (ke) {
          P.onStart(() => Lt(ee, z.fromStyles)), P.onDestroy(() => Ue(ee, z.toStyles)), o.push(P);
          return
        }
        if (b.isFallbackTransition) {
          P.onStart(() => Lt(ee, z.fromStyles)), P.onDestroy(() => Ue(ee, z.toStyles)), o.push(P);
          return
        }
        let Xu = [];
        z.timelines.forEach(oe => {
          oe.stretchStartingKeyframe = !0, this.disabledNodes.has(oe.element) || Xu.push(oe)
        }), z.timelines = Xu, r.append(ee, z.timelines);
        let Sp = {instruction: z, player: P, element: ee};
        s.push(Sp), z.queriedElements.forEach(oe => we(a, oe, []).push(P)), z.preStyleProps.forEach((oe, mt) => {
          if (oe.size) {
            let be = u.get(mt);
            be || u.set(mt, be = new Set), oe.forEach((dr, Ei) => be.add(Ei))
          }
        }), z.postStyleProps.forEach((oe, mt) => {
          let be = l.get(mt);
          be || l.set(mt, be = new Set), oe.forEach((dr, Ei) => be.add(Ei))
        })
      });
      if (q.length) {
        let y = [];
        q.forEach(v => {
          y.push(FI(v.triggerName, v.errors))
        }), pe.forEach(v => v.destroy()), this.reportError(y)
      }
      let G = new Map, X = new Map;
      s.forEach(y => {
        let v = y.element;
        r.has(v) && (X.set(v, v), this._beforeAnimationBuild(y.player.namespaceId, y.instruction, G))
      }), o.forEach(y => {
        let v = y.element;
        this._getPreviousPlayers(v, !1, y.namespaceId, y.triggerName, null).forEach(P => {
          we(G, v, []).push(P), P.destroy()
        })
      });
      let ze = D.filter(y => fp(y, u, l)), tt = new Map;
      cp(tt, this.driver, k, l, He).forEach(y => {
        fp(y, u, l) && ze.push(y)
      });
      let pt = new Map;
      h.forEach((y, v) => {
        cp(pt, this.driver, new Set(y), u, ri)
      }), ze.forEach(y => {
        let v = tt.get(y), b = pt.get(y);
        tt.set(y, new Map([...v?.entries() ?? [], ...b?.entries() ?? []]))
      });
      let Di = [], Zu = [], Ju = {};
      s.forEach(y => {
        let {element: v, player: b, instruction: P} = y;
        if (r.has(v)) {
          if (c.has(v)) {
            b.onDestroy(() => Ue(v, P.toStyles)), b.disabled = !0, b.overrideTotalTime(P.totalTime), o.push(b);
            return
          }
          let ee = Ju;
          if (X.size > 1) {
            let me = v, nt = [];
            for (; me = me.parentNode;) {
              let z = X.get(me);
              if (z) {
                ee = z;
                break
              }
              nt.push(me)
            }
            nt.forEach(z => X.set(z, ee))
          }
          let ke = this._buildAnimation(b.namespaceId, P, G, i, pt, tt);
          if (b.setRealPlayer(ke), ee === Ju) Di.push(b); else {
            let me = this.playersByElement.get(ee);
            me && me.length && (b.parentPlayer = ht(me)), o.push(b)
          }
        } else Lt(v, P.fromStyles), b.onDestroy(() => Ue(v, P.toStyles)), Zu.push(b), c.has(v) && o.push(b)
      }), Zu.forEach(y => {
        let v = i.get(y.element);
        if (v && v.length) {
          let b = ht(v);
          y.setRealPlayer(b)
        }
      }), o.forEach(y => {
        y.parentPlayer ? y.syncPlayerEvents(y.parentPlayer) : y.destroy()
      });
      for (let y = 0; y < D.length; y++) {
        let v = D[y], b = v[Re];
        if (hn(v, li), b && b.hasAnimation) continue;
        let P = [];
        if (a.size) {
          let ke = a.get(v);
          ke && ke.length && P.push(...ke);
          let me = this.driver.query(v, Iu, !0);
          for (let nt = 0; nt < me.length; nt++) {
            let z = a.get(me[nt]);
            z && z.length && P.push(...z)
          }
        }
        let ee = P.filter(ke => !ke.destroyed);
        ee.length ? w_(this, v, ee) : this.processLeaveNode(v)
      }
      return D.length = 0, Di.forEach(y => {
        this.players.push(y), y.onDone(() => {
          y.destroy();
          let v = this.players.indexOf(y);
          this.players.splice(v, 1)
        }), y.play()
      }), Di
    }

    afterFlush(e) {
      this._flushFns.push(e)
    }

    afterFlushAnimationsDone(e) {
      this._whenQuietFns.push(e)
    }

    _getPreviousPlayers(e, n, r, o, i) {
      let s = [];
      if (n) {
        let a = this.playersByQueriedElement.get(e);
        a && (s = a)
      } else {
        let a = this.playersByElement.get(e);
        if (a) {
          let u = !i || i == ar;
          a.forEach(l => {
            l.queued || !u && l.triggerName != o || s.push(l)
          })
        }
      }
      return (r || o) && (s = s.filter(a => !(r && r != a.namespaceId || o && o != a.triggerName))), s
    }

    _beforeAnimationBuild(e, n, r) {
      let o = n.triggerName, i = n.element, s = n.isRemovalTransition ? void 0 : e,
        a = n.isRemovalTransition ? void 0 : o;
      for (let u of n.timelines) {
        let l = u.element, c = l !== i, d = we(r, l, []);
        this._getPreviousPlayers(l, c, s, a, n.toState).forEach(h => {
          let p = h.getRealPlayer();
          p.beforeDestroy && p.beforeDestroy(), h.destroy(), d.push(h)
        })
      }
      Lt(i, n.fromStyles)
    }

    _buildAnimation(e, n, r, o, i, s) {
      let a = n.triggerName, u = n.element, l = [], c = new Set, d = new Set, f = n.timelines.map(p => {
        let m = p.element;
        c.add(m);
        let D = m[Re];
        if (D && D.removedBeforeQueried) return new ft(p.duration, p.delay);
        let E = m !== u, k = b_((r.get(m) || g_).map(G => G.getRealPlayer())).filter(G => {
          let X = G;
          return X.element ? X.element === m : !1
        }), L = i.get(m), B = s.get(m), pe = mp(this._normalizer, p.keyframes, L, B), q = this._buildPlayer(p, pe, k);
        if (p.subTimeline && o && d.add(m), E) {
          let G = new cr(e, a, m);
          G.setRealPlayer(q), l.push(G)
        }
        return q
      });
      l.forEach(p => {
        we(this.playersByQueriedElement, p.element, []).push(p), p.onDone(() => v_(this.playersByQueriedElement, p.element, p))
      }), c.forEach(p => Se(p, tp));
      let h = ht(f);
      return h.onDestroy(() => {
        c.forEach(p => hn(p, tp)), Ue(u, n.toStyles)
      }), d.forEach(p => {
        we(o, p, []).push(h)
      }), h
    }

    _buildPlayer(e, n, r) {
      return n.length > 0 ? this.driver.animate(e.element, n, e.duration, e.delay, e.easing, r) : new ft(e.duration, e.delay)
    }
  }, cr = class {
    constructor(e, n, r) {
      this.namespaceId = e, this.triggerName = n, this.element = r, this._player = new ft, this._containsRealPlayer = !1, this._queuedCallbacks = new Map, this.destroyed = !1, this.parentPlayer = null, this.markedForDestroy = !1, this.disabled = !1, this.queued = !0, this.totalTime = 0
    }

    setRealPlayer(e) {
      this._containsRealPlayer || (this._player = e, this._queuedCallbacks.forEach((n, r) => {
        n.forEach(o => Bu(e, r, void 0, o))
      }), this._queuedCallbacks.clear(), this._containsRealPlayer = !0, this.overrideTotalTime(e.totalTime), this.queued = !1)
    }

    getRealPlayer() {
      return this._player
    }

    overrideTotalTime(e) {
      this.totalTime = e
    }

    syncPlayerEvents(e) {
      let n = this._player;
      n.triggerCallback && e.onStart(() => n.triggerCallback("start")), e.onDone(() => this.finish()), e.onDestroy(() => this.destroy())
    }

    _queueEvent(e, n) {
      we(this._queuedCallbacks, e, []).push(n)
    }

    onDone(e) {
      this.queued && this._queueEvent("done", e), this._player.onDone(e)
    }

    onStart(e) {
      this.queued && this._queueEvent("start", e), this._player.onStart(e)
    }

    onDestroy(e) {
      this.queued && this._queueEvent("destroy", e), this._player.onDestroy(e)
    }

    init() {
      this._player.init()
    }

    hasStarted() {
      return this.queued ? !1 : this._player.hasStarted()
    }

    play() {
      !this.queued && this._player.play()
    }

    pause() {
      !this.queued && this._player.pause()
    }

    restart() {
      !this.queued && this._player.restart()
    }

    finish() {
      this._player.finish()
    }

    destroy() {
      this.destroyed = !0, this._player.destroy()
    }

    reset() {
      !this.queued && this._player.reset()
    }

    setPosition(e) {
      this.queued || this._player.setPosition(e)
    }

    getPosition() {
      return this.queued ? 0 : this._player.getPosition()
    }

    triggerCallback(e) {
      let n = this._player;
      n.triggerCallback && n.triggerCallback(e)
    }
  };

function v_(t, e, n) {
  let r = t.get(e);
  if (r) {
    if (r.length) {
      let o = r.indexOf(n);
      r.splice(o, 1)
    }
    r.length == 0 && t.delete(e)
  }
  return r
}

function D_(t) {
  return t ?? null
}

function ai(t) {
  return t && t.nodeType === 1
}

function E_(t) {
  return t == "start" || t == "done"
}

function lp(t, e) {
  let n = t.style.display;
  return t.style.display = e ?? "none", n
}

function cp(t, e, n, r, o) {
  let i = [];
  n.forEach(u => i.push(lp(u)));
  let s = [];
  r.forEach((u, l) => {
    let c = new Map;
    u.forEach(d => {
      let f = e.computeStyle(l, d, o);
      c.set(d, f), (!f || f.length == 0) && (l[Re] = y_, s.push(l))
    }), t.set(l, c)
  });
  let a = 0;
  return n.forEach(u => lp(u, i[a++])), s
}

function dp(t, e) {
  let n = new Map;
  if (t.forEach(a => n.set(a, [])), e.length == 0) return n;
  let r = 1, o = new Set(e), i = new Map;

  function s(a) {
    if (!a) return r;
    let u = i.get(a);
    if (u) return u;
    let l = a.parentNode;
    return n.has(l) ? u = l : o.has(l) ? u = r : u = s(l), i.set(a, u), u
  }

  return e.forEach(a => {
    let u = s(a);
    u !== r && n.get(u).push(a)
  }), n
}

function Se(t, e) {
  t.classList?.add(e)
}

function hn(t, e) {
  t.classList?.remove(e)
}

function w_(t, e, n) {
  ht(n).onDone(() => t.processLeaveNode(e))
}

function b_(t) {
  let e = [];
  return _p(t, e), e
}

function _p(t, e) {
  for (let n = 0; n < t.length; n++) {
    let r = t[n];
    r instanceof ir ? _p(r.players, e) : e.push(r)
  }
}

function I_(t, e) {
  let n = Object.keys(t), r = Object.keys(e);
  if (n.length != r.length) return !1;
  for (let o = 0; o < n.length; o++) {
    let i = n[o];
    if (!e.hasOwnProperty(i) || t[i] !== e[i]) return !1
  }
  return !0
}

function fp(t, e, n) {
  let r = n.get(t);
  if (!r) return !1;
  let o = e.get(t);
  return o ? r.forEach(i => o.add(i)) : e.set(t, r), n.delete(t), !0
}

var gi = class {
  constructor(e, n, r, o) {
    this._driver = n, this._normalizer = r, this._triggerCache = {}, this.onRemovalComplete = (i, s) => {
    }, this._transitionEngine = new ku(e.body, n, r, o), this._timelineEngine = new Pu(e.body, n, r), this._transitionEngine.onRemovalComplete = (i, s) => this.onRemovalComplete(i, s)
  }

  get players() {
    return [...this._transitionEngine.players, ...this._timelineEngine.players]
  }

  registerTrigger(e, n, r, o, i) {
    let s = e + "-" + o, a = this._triggerCache[s];
    if (!a) {
      let u = [], l = [], c = Gu(this._driver, i, u, l);
      if (u.length) throw bI(o, u);
      l.length && void 0, a = l_(o, c, this._normalizer), this._triggerCache[s] = a
    }
    this._transitionEngine.registerTrigger(n, o, a)
  }

  register(e, n) {
    this._transitionEngine.register(e, n)
  }

  destroy(e, n) {
    this._transitionEngine.destroy(e, n)
  }

  onInsert(e, n, r, o) {
    this._transitionEngine.insertNode(e, n, r, o)
  }

  onRemove(e, n, r) {
    this._transitionEngine.removeNode(e, n, r)
  }

  disableAnimations(e, n) {
    this._transitionEngine.markElementAsDisabled(e, n)
  }

  process(e, n, r, o) {
    if (r.charAt(0) == "@") {
      let [i, s] = Jh(r), a = o;
      this._timelineEngine.command(i, n, s, a)
    } else this._transitionEngine.trigger(e, n, r, o)
  }

  listen(e, n, r, o, i) {
    if (r.charAt(0) == "@") {
      let [s, a] = Jh(r);
      return this._timelineEngine.listen(s, n, a, i)
    }
    return this._transitionEngine.listen(e, n, r, o, i)
  }

  flush(e = -1) {
    this._transitionEngine.flush(e)
  }

  whenRenderingDone() {
    return this._transitionEngine.whenRenderingDone()
  }

  afterFlushAnimationsDone(e) {
    this._transitionEngine.afterFlushAnimationsDone(e)
  }
};

function __(t, e) {
  let n = null, r = null;
  return Array.isArray(e) && e.length ? (n = Eu(e[0]), e.length > 1 && (r = Eu(e[e.length - 1]))) : e instanceof Map && (n = Eu(e)), n || r ? new Lu(t, n, r) : null
}

var pn = class pn {
  constructor(e, n, r) {
    this._element = e, this._startStyles = n, this._endStyles = r, this._state = 0;
    let o = pn.initialStylesByElement.get(e);
    o || pn.initialStylesByElement.set(e, o = new Map), this._initialStyles = o
  }

  start() {
    this._state < 1 && (this._startStyles && Ue(this._element, this._startStyles, this._initialStyles), this._state = 1)
  }

  finish() {
    this.start(), this._state < 2 && (Ue(this._element, this._initialStyles), this._endStyles && (Ue(this._element, this._endStyles), this._endStyles = null), this._state = 1)
  }

  destroy() {
    this.finish(), this._state < 3 && (pn.initialStylesByElement.delete(this._element), this._startStyles && (Lt(this._element, this._startStyles), this._endStyles = null), this._endStyles && (Lt(this._element, this._endStyles), this._endStyles = null), Ue(this._element, this._initialStyles), this._state = 3)
  }
};
pn.initialStylesByElement = new WeakMap;
var Lu = pn;

function Eu(t) {
  let e = null;
  return t.forEach((n, r) => {
    C_(r) && (e = e || new Map, e.set(r, n))
  }), e
}

function C_(t) {
  return t === "display" || t === "position"
}

var yi = class {
  constructor(e, n, r, o) {
    this.element = e, this.keyframes = n, this.options = r, this._specialStyles = o, this._onDoneFns = [], this._onStartFns = [], this._onDestroyFns = [], this._initialized = !1, this._finished = !1, this._started = !1, this._destroyed = !1, this._originalOnDoneFns = [], this._originalOnStartFns = [], this.time = 0, this.parentPlayer = null, this.currentSnapshot = new Map, this._duration = r.duration, this._delay = r.delay || 0, this.time = this._duration + this._delay
  }

  get totalTime() {
    return this._delay + this._duration
  }

  _onFinish() {
    this._finished || (this._finished = !0, this._onDoneFns.forEach(e => e()), this._onDoneFns = [])
  }

  init() {
    this._buildPlayer(), this._preparePlayerBeforeStart()
  }

  _buildPlayer() {
    if (this._initialized) return;
    this._initialized = !0;
    let e = this.keyframes;
    this.domPlayer = this._triggerWebAnimation(this.element, e, this.options), this._finalKeyframe = e.length ? e[e.length - 1] : new Map;
    let n = () => this._onFinish();
    this.domPlayer.addEventListener("finish", n), this.onDestroy(() => {
      this.domPlayer.removeEventListener("finish", n)
    })
  }

  _preparePlayerBeforeStart() {
    this._delay ? this._resetDomPlayerState() : this.domPlayer.pause()
  }

  _convertKeyframesToObject(e) {
    let n = [];
    return e.forEach(r => {
      n.push(Object.fromEntries(r))
    }), n
  }

  _triggerWebAnimation(e, n, r) {
    return e.animate(this._convertKeyframesToObject(n), r)
  }

  onStart(e) {
    this._originalOnStartFns.push(e), this._onStartFns.push(e)
  }

  onDone(e) {
    this._originalOnDoneFns.push(e), this._onDoneFns.push(e)
  }

  onDestroy(e) {
    this._onDestroyFns.push(e)
  }

  play() {
    this._buildPlayer(), this.hasStarted() || (this._onStartFns.forEach(e => e()), this._onStartFns = [], this._started = !0, this._specialStyles && this._specialStyles.start()), this.domPlayer.play()
  }

  pause() {
    this.init(), this.domPlayer.pause()
  }

  finish() {
    this.init(), this._specialStyles && this._specialStyles.finish(), this._onFinish(), this.domPlayer.finish()
  }

  reset() {
    this._resetDomPlayerState(), this._destroyed = !1, this._finished = !1, this._started = !1, this._onStartFns = this._originalOnStartFns, this._onDoneFns = this._originalOnDoneFns
  }

  _resetDomPlayerState() {
    this.domPlayer && this.domPlayer.cancel()
  }

  restart() {
    this.reset(), this.play()
  }

  hasStarted() {
    return this._started
  }

  destroy() {
    this._destroyed || (this._destroyed = !0, this._resetDomPlayerState(), this._onFinish(), this._specialStyles && this._specialStyles.destroy(), this._onDestroyFns.forEach(e => e()), this._onDestroyFns = [])
  }

  setPosition(e) {
    this.domPlayer === void 0 && this.init(), this.domPlayer.currentTime = e * this.time
  }

  getPosition() {
    return +(this.domPlayer.currentTime ?? 0) / this.time
  }

  beforeDestroy() {
    let e = new Map;
    this.hasStarted() && this._finalKeyframe.forEach((r, o) => {
      o !== "offset" && e.set(o, this._finished ? r : qu(this.element, o))
    }), this.currentSnapshot = e
  }

  triggerCallback(e) {
    let n = e === "start" ? this._onStartFns : this._onDoneFns;
    n.forEach(r => r()), n.length = 0
  }
}, ju = class {
  validateStyleProperty(e) {
    return !0
  }

  validateAnimatableStyleProperty(e) {
    return !0
  }

  matchesElement(e, n) {
    return !1
  }

  containsElement(e, n) {
    return gp(e, n)
  }

  getParentElement(e) {
    return Hu(e)
  }

  query(e, n, r) {
    return yp(e, n, r)
  }

  computeStyle(e, n, r) {
    return qu(e, n)
  }

  animate(e, n, r, o, i, s = []) {
    let a = o == 0 ? "both" : "forwards", u = {duration: r, delay: o, fill: a};
    i && (u.easing = i);
    let l = new Map, c = s.filter(h => h instanceof yi);
    qI(r, o) && c.forEach(h => {
      h.currentSnapshot.forEach((p, m) => l.set(m, p))
    });
    let d = HI(n).map(h => new Map(h));
    d = GI(e, d, l);
    let f = __(e, d);
    return new yi(e, d, u, f)
  }
};

function mO(t, e, n) {
  return t === "noop" ? new gi(e, new vp, new bu, n) : new gi(e, new ju, new Su, n)
}

var hp = class {
  constructor(e, n) {
    this._driver = e;
    let r = [], o = [], i = Gu(e, n, r, o);
    if (r.length) throw EI(r);
    o.length && void 0, this._animationAst = i
  }

  buildTimelines(e, n, r, o, i) {
    let s = Array.isArray(n) ? np(n) : n, a = Array.isArray(r) ? np(r) : r, u = [];
    i = i || new mn;
    let l = Qu(this._driver, e, this._animationAst, Uu, li, s, a, o, i, u);
    if (u.length) throw wI(u);
    return l
  }
}, ui = "@", Cp = "@.disabled", vi = class {
  constructor(e, n, r, o) {
    this.namespaceId = e, this.delegate = n, this.engine = r, this._onDestroy = o, this.\u0275type = 0
  }

  get data() {
    return this.delegate.data
  }

  destroyNode(e) {
    this.delegate.destroyNode?.(e)
  }

  destroy() {
    this.engine.destroy(this.namespaceId, this.delegate), this.engine.afterFlushAnimationsDone(() => {
      queueMicrotask(() => {
        this.delegate.destroy()
      })
    }), this._onDestroy?.()
  }

  createElement(e, n) {
    return this.delegate.createElement(e, n)
  }

  createComment(e) {
    return this.delegate.createComment(e)
  }

  createText(e) {
    return this.delegate.createText(e)
  }

  appendChild(e, n) {
    this.delegate.appendChild(e, n), this.engine.onInsert(this.namespaceId, n, e, !1)
  }

  insertBefore(e, n, r, o = !0) {
    this.delegate.insertBefore(e, n, r), this.engine.onInsert(this.namespaceId, n, e, o)
  }

  removeChild(e, n, r) {
    this.engine.onRemove(this.namespaceId, n, this.delegate)
  }

  selectRootElement(e, n) {
    return this.delegate.selectRootElement(e, n)
  }

  parentNode(e) {
    return this.delegate.parentNode(e)
  }

  nextSibling(e) {
    return this.delegate.nextSibling(e)
  }

  setAttribute(e, n, r, o) {
    this.delegate.setAttribute(e, n, r, o)
  }

  removeAttribute(e, n, r) {
    this.delegate.removeAttribute(e, n, r)
  }

  addClass(e, n) {
    this.delegate.addClass(e, n)
  }

  removeClass(e, n) {
    this.delegate.removeClass(e, n)
  }

  setStyle(e, n, r, o) {
    this.delegate.setStyle(e, n, r, o)
  }

  removeStyle(e, n, r) {
    this.delegate.removeStyle(e, n, r)
  }

  setProperty(e, n, r) {
    n.charAt(0) == ui && n == Cp ? this.disableAnimations(e, !!r) : this.delegate.setProperty(e, n, r)
  }

  setValue(e, n) {
    this.delegate.setValue(e, n)
  }

  listen(e, n, r) {
    return this.delegate.listen(e, n, r)
  }

  disableAnimations(e, n) {
    this.engine.disableAnimations(e, n)
  }
}, Vu = class extends vi {
  constructor(e, n, r, o, i) {
    super(n, r, o, i), this.factory = e, this.namespaceId = n
  }

  setProperty(e, n, r) {
    n.charAt(0) == ui ? n.charAt(1) == "." && n == Cp ? (r = r === void 0 ? !0 : !!r, this.disableAnimations(e, r)) : this.engine.process(this.namespaceId, e, n.slice(1), r) : this.delegate.setProperty(e, n, r)
  }

  listen(e, n, r) {
    if (n.charAt(0) == ui) {
      let o = S_(e), i = n.slice(1), s = "";
      return i.charAt(0) != ui && ([i, s] = M_(i)), this.engine.listen(this.namespaceId, o, i, s, a => {
        let u = a._data || -1;
        this.factory.scheduleListenerCallback(u, r, a)
      })
    }
    return this.delegate.listen(e, n, r)
  }
};

function S_(t) {
  switch (t) {
    case"body":
      return document.body;
    case"document":
      return document;
    case"window":
      return window;
    default:
      return t
  }
}

function M_(t) {
  let e = t.indexOf("."), n = t.substring(0, e), r = t.slice(e + 1);
  return [n, r]
}

var pp = class {
  constructor(e, n, r) {
    this.delegate = e, this.engine = n, this._zone = r, this._currentId = 0, this._microtaskId = 1, this._animationCallbacksBuffer = [], this._rendererCache = new Map, this._cdRecurDepth = 0, n.onRemovalComplete = (o, i) => {
      let s = i?.parentNode(o);
      s && i.removeChild(s, o)
    }
  }

  createRenderer(e, n) {
    let r = "", o = this.delegate.createRenderer(e, n);
    if (!e || !n?.data?.animation) {
      let l = this._rendererCache, c = l.get(o);
      if (!c) {
        let d = () => l.delete(o);
        c = new vi(r, o, this.engine, d), l.set(o, c)
      }
      return c
    }
    let i = n.id, s = n.id + "-" + this._currentId;
    this._currentId++, this.engine.register(s, e);
    let a = l => {
      Array.isArray(l) ? l.forEach(a) : this.engine.registerTrigger(i, s, e, l.name, l)
    };
    return n.data.animation.forEach(a), new Vu(this, s, o, this.engine)
  }

  begin() {
    this._cdRecurDepth++, this.delegate.begin && this.delegate.begin()
  }

  _scheduleCountTask() {
    queueMicrotask(() => {
      this._microtaskId++
    })
  }

  scheduleListenerCallback(e, n, r) {
    if (e >= 0 && e < this._microtaskId) {
      this._zone.run(() => n(r));
      return
    }
    let o = this._animationCallbacksBuffer;
    o.length == 0 && queueMicrotask(() => {
      this._zone.run(() => {
        o.forEach(i => {
          let [s, a] = i;
          s(a)
        }), this._animationCallbacksBuffer = []
      })
    }), o.push([n, r])
  }

  end() {
    this._cdRecurDepth--, this._cdRecurDepth == 0 && this._zone.runOutsideAngular(() => {
      this._scheduleCountTask(), this.engine.flush(this._microtaskId)
    }), this.delegate.end && this.delegate.end()
  }

  whenRenderingDone() {
    return this.engine.whenRenderingDone()
  }
};
export {
  K as a,
  Pp as b,
  O as c,
  Fi as d,
  Pi as e,
  _e as f,
  vn as g,
  Dt as h,
  je as i,
  zp as j,
  qp as k,
  Gp as l,
  wt as m,
  Ge as n,
  em as o,
  We as p,
  jr as q,
  nm as r,
  rm as s,
  ki as t,
  cm as u,
  bt as v,
  dm as w,
  Rl as x,
  fm as y,
  hm as z,
  bn as A,
  Li as B,
  pm as C,
  mm as D,
  vm as E,
  ji as F,
  Vi as G,
  Dm as H,
  Em as I,
  wm as J,
  bm as K,
  Im as L,
  _m as M,
  Cm as N,
  Sm as O,
  g as P,
  Nc as Q,
  H as R,
  Oc as S,
  VN as T,
  R as U,
  F as V,
  te as W,
  M as X,
  BN as Y,
  Jt as Z,
  fe as _,
  $N as $,
  zc as aa,
  ya as ba,
  Yc as ca,
  ed as da,
  at as ea,
  HN as fa,
  ko as ga,
  UN as ha,
  zN as ia,
  qN as ja,
  dt as ka,
  Tt as la,
  Ft as ma,
  Ne as na,
  GN as oa,
  Ay as pa,
  Fy as qa,
  Jn as ra,
  WN as sa,
  QN as ta,
  jo as ua,
  Ly as va,
  $r as wa,
  KN as xa,
  yo as ya,
  YN as za,
  er as Aa,
  ZN as Ba,
  $n as Ca,
  ks as Da,
  Xo as Ea,
  Vs as Fa,
  Xa as Ga,
  fn as Ha,
  ie as Ia,
  nr as Ja,
  jE as Ka,
  Yf as La,
  Ys as Ma,
  qE as Na,
  Zf as Oa,
  Js as Pa,
  YE as Qa,
  dw as Ra,
  fw as Sa,
  eA as Ta,
  tA as Ua,
  nA as Va,
  rA as Wa,
  hh as Xa,
  ph as Ya,
  Mw as Za,
  oA as _a,
  Fw as $a,
  Pw as ab,
  Vw as bb,
  Bw as cb,
  iA as db,
  sA as eb,
  aA as fb,
  Uw as gb,
  uA as hb,
  lA as ib,
  cA as jb,
  dA as kb,
  fA as lb,
  hA as mb,
  pA as nb,
  mA as ob,
  Gw as pb,
  wh as qb,
  gA as rb,
  yA as sb,
  vA as tb,
  DA as ub,
  Xw as vb,
  EA as wb,
  iu as xb,
  _h as yb,
  ei as zb,
  ib as Ab,
  wA as Bb,
  Ah as Cb,
  gb as Db,
  uu as Eb,
  bA as Fb,
  IA as Gb,
  _A as Hb,
  CA as Ib,
  or as Jb,
  SA as Kb,
  cu as Lb,
  ZA as Mb,
  Hh as Nb,
  ni as Ob,
  Wh as Pb,
  Fb as Qb,
  Rb,
  JA as Sb,
  XA as Tb,
  eO as Ub,
  Vb,
  Bb as Wb,
  $b as Xb,
  Hb as Yb,
  tO as Zb,
  fu as _b,
  qh as $b,
  nO as ac,
  iO as bc,
  sO as cc,
  pu as dc,
  aO as ec,
  uO as fc,
  Hu as gc,
  LI as hc,
  hO as ic,
  gp as jc,
  yp as kc,
  vp as lc,
  ep as mc,
  wu as nc,
  bu as oc,
  HI as pc,
  pO as qc,
  qI as rc,
  Su as sc,
  gi as tc,
  yi as uc,
  ju as vc,
  mO as wc,
  hp as xc,
  vi as yc,
  Vu as zc,
  pp as Ac
};
