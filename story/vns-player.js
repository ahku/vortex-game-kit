//#region ../../node_modules/.pnpm/@vue+shared@3.5.43/node_modules/@vue/shared/dist/shared.esm-bundler.js
// @__NO_SIDE_EFFECTS__
function e(e) {
	let t = /* @__PURE__ */ Object.create(null);
	for (let n of e.split(",")) t[n] = 1;
	return (e) => e in t;
}
var t = {}, n = [], r = () => {}, i = () => !1, a = (e) => e.charCodeAt(0) === 111 && e.charCodeAt(1) === 110 && (e.charCodeAt(2) > 122 || e.charCodeAt(2) < 97), o = (e) => e.startsWith("onUpdate:"), s = Object.assign, c = (e, t) => {
	let n = e.indexOf(t);
	n > -1 && e.splice(n, 1);
}, l = Object.prototype.hasOwnProperty, u = (e, t) => l.call(e, t), d = Array.isArray, f = (e) => x(e) === "[object Map]", p = (e) => x(e) === "[object Set]", m = (e) => x(e) === "[object Date]", h = (e) => typeof e == "function", g = (e) => typeof e == "string", _ = (e) => typeof e == "symbol", v = (e) => typeof e == "object" && !!e, y = (e) => (v(e) || h(e)) && h(e.then) && h(e.catch), b = Object.prototype.toString, x = (e) => b.call(e), S = (e) => x(e).slice(8, -1), C = (e) => x(e) === "[object Object]", w = (e) => g(e) && e !== "NaN" && e[0] !== "-" && "" + parseInt(e, 10) === e, T = /* @__PURE__ */ e(",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"), E = (e) => {
	let t = /* @__PURE__ */ Object.create(null);
	return ((n) => t[n] || (t[n] = e(n)));
}, ee = /-\w/g, D = E((e) => e.replace(ee, (e) => e.slice(1).toUpperCase())), te = /\B([A-Z])/g, ne = E((e) => e.replace(te, "-$1").toLowerCase()), re = E((e) => e.charAt(0).toUpperCase() + e.slice(1)), O = E((e) => e ? `on${re(e)}` : ""), k = (e, t) => !Object.is(e, t), ie = (e, ...t) => {
	for (let n = 0; n < e.length; n++) e[n](...t);
}, ae = (e, t, n, r = !1) => {
	Object.defineProperty(e, t, {
		configurable: !0,
		enumerable: !1,
		writable: r,
		value: n
	});
}, A = (e) => {
	let t = parseFloat(e);
	return isNaN(t) ? e : t;
}, oe = (e) => {
	let t = g(e) ? Number(e) : NaN;
	return isNaN(t) ? e : t;
}, se, ce = () => se ||= typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : typeof window < "u" ? window : typeof global < "u" ? global : {};
function j(e) {
	if (d(e)) {
		let t = {};
		for (let n = 0; n < e.length; n++) {
			let r = e[n], i = g(r) ? de(r) : j(r);
			if (i) for (let e in i) t[e] = i[e];
		}
		return t;
	}
	if (g(e) || v(e)) return e;
}
var le = /;(?![^(]*\))/g, ue = /:([^]+)/, M = /"(?:[^"\\]|\\[^])*"|'(?:[^'\\]|\\[^])*'|\\[^]|\/\*[^]*?\*\//g;
function de(e) {
	let t = {};
	return e.replace(M, (e) => e.startsWith("/*") ? "" : e).split(le).forEach((e) => {
		if (e) {
			let n = e.split(ue);
			n.length > 1 && (t[n[0].trim()] = n[1].trim());
		}
	}), t;
}
function N(e) {
	let t = "";
	if (g(e)) t = e;
	else if (d(e)) for (let n = 0; n < e.length; n++) {
		let r = N(e[n]);
		r && (t += r + " ");
	}
	else if (v(e)) for (let n in e) e[n] && (t += n + " ");
	return t.trim();
}
var fe = "itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly", pe = /* @__PURE__ */ e(fe);
fe + "";
function me(e) {
	return !!e || e === "";
}
function he(e, t, n) {
	if (e.length !== t.length) return !1;
	let r = !0;
	for (let i = 0; r && i < e.length; i++) r = ye(e[i], t[i], n);
	return r;
}
function ge(e, t, n) {
	if (e.size !== t.size) return !1;
	let r = Array.from(t), i = new Uint8Array(r.length);
	for (let t of e) {
		let e = -1;
		for (let a = 0; a < r.length; a++) if (!i[a] && ye(t, r[a], n)) {
			e = a;
			break;
		}
		if (e < 0) return !1;
		i[e] = 1;
	}
	return !0;
}
function _e(e, t, n) {
	let r = f(e), i = f(t);
	if (r || i || (r = p(e), i = p(t), r || i)) return r && i ? ge(e, t, n) : !1;
	if (Object.keys(e).length !== Object.keys(t).length) return !1;
	for (let r in e) {
		let i = e.hasOwnProperty(r), a = t.hasOwnProperty(r);
		if (i && !a || !i && a || !ye(e[r], t[r], n)) return !1;
	}
	return String(e) === String(t);
}
function ve(e, t, n, r) {
	n ||= [/* @__PURE__ */ new Map(), /* @__PURE__ */ new Map()];
	let [i, a] = n;
	if (i.has(e) || a.has(t)) return i.get(e) === t && a.get(t) === e;
	i.set(e, t), a.set(t, e);
	let o = r(e, t, n);
	return i.delete(e), a.delete(t), o;
}
function ye(e, t, n) {
	if (e === t) return !0;
	let r = m(e), i = m(t);
	return r || i ? r && i ? e.getTime() === t.getTime() : !1 : (r = _(e), i = _(t), r || i ? e === t : (r = d(e), i = d(t), r || i ? r && i ? ve(e, t, n, he) : !1 : (r = v(e), i = v(t), r || i ? !r || !i ? !1 : ve(e, t, n, _e) : String(e) === String(t))));
}
var be = (e) => !!(e && e.__v_isRef === !0), P = (e) => g(e) ? e : e == null ? "" : d(e) || v(e) && (e.toString === b || !h(e.toString)) ? be(e) ? P(e.value) : JSON.stringify(e, xe, 2) : String(e), xe = (e, t) => be(t) ? xe(e, t.value) : f(t) ? { [`Map(${t.size})`]: [...t.entries()].reduce((e, [t, n], r) => (e[Se(t, r) + " =>"] = n, e), {}) } : p(t) ? { [`Set(${t.size})`]: [...t.values()].map((e) => Se(e)) } : _(t) ? Se(t) : v(t) && !d(t) && !C(t) ? String(t) : t, Se = (e, t = "") => _(e) ? `Symbol(${e.description ?? t})` : e, Ce, we = class {
	constructor(e = !1) {
		this.detached = e, this._active = !0, this._on = 0, this.effects = [], this.cleanups = [], this._isPaused = !1, this._warnOnRun = !0, this.__v_skip = !0, !e && Ce && (Ce.active ? (this.parent = Ce, this.index = (Ce.scopes || (Ce.scopes = [])).push(this) - 1) : (this._active = !1, this._warnOnRun = !1));
	}
	get active() {
		return this._active;
	}
	pause() {
		if (this._active) {
			this._isPaused = !0;
			let e, t;
			if (this.scopes) {
				let n = this.scopes.slice();
				for (e = 0, t = n.length; e < t; e++) n[e].pause();
			}
			for (e = 0, t = this.effects.length; e < t; e++) this.effects[e].pause();
		}
	}
	resume() {
		if (this._active && this._isPaused) {
			this._isPaused = !1;
			let e, t;
			if (this.scopes) {
				let n = this.scopes.slice();
				for (e = 0, t = n.length; e < t; e++) n[e].resume();
			}
			let n = this.effects.slice();
			for (e = 0, t = n.length; e < t; e++) n[e].resume();
		}
	}
	run(e) {
		if (this._active) {
			let t = Ce;
			try {
				return Ce = this, e();
			} finally {
				Ce = t;
			}
		}
	}
	on() {
		++this._on === 1 && (this.prevScope = Ce, Ce = this);
	}
	off() {
		if (this._on > 0 && --this._on === 0) {
			if (Ce === this) Ce = this.prevScope;
			else {
				let e = Ce;
				for (; e;) {
					if (e.prevScope === this) {
						e.prevScope = this.prevScope;
						break;
					}
					e = e.prevScope;
				}
			}
			this.prevScope = void 0;
		}
	}
	stop(e) {
		if (this._active) {
			this._active = !1;
			let t, n;
			for (t = 0, n = this.effects.length; t < n; t++) this.effects[t].stop();
			for (this.effects.length = 0, t = 0, n = this.cleanups.length; t < n; t++) this.cleanups[t]();
			if (this.cleanups.length = 0, this.scopes) {
				let e = this.scopes.slice();
				for (t = 0, n = e.length; t < n; t++) e[t].stop(!0);
				this.scopes.length = 0;
			}
			if (!this.detached && this.parent && !e) {
				let e = this.parent.scopes.pop();
				e && e !== this && (this.parent.scopes[this.index] = e, e.index = this.index);
			}
			this.parent = void 0;
		}
	}
};
function Te() {
	return Ce;
}
var Ee, De = /* @__PURE__ */ new WeakSet(), Oe = class {
	constructor(e) {
		this.fn = e, this.deps = void 0, this.depsTail = void 0, this.flags = 5, this.next = void 0, this.cleanup = void 0, this.scheduler = void 0, Ce && (Ce.active ? Ce.effects.push(this) : this.flags &= -2);
	}
	pause() {
		this.flags |= 64;
	}
	resume() {
		this.flags & 64 && (this.flags &= -65, De.has(this) && (De.delete(this), this.trigger()));
	}
	notify() {
		this.flags & 2 && !(this.flags & 32) || this.flags & 8 || Me(this);
	}
	run() {
		if (!(this.flags & 1)) return this.fn();
		this.flags |= 2, Ge(this), Fe(this);
		let e = Ee, t = Ve;
		Ee = this, Ve = !0;
		try {
			return this.fn();
		} finally {
			Ie(this), Ee = e, Ve = t, this.flags &= -3;
		}
	}
	stop() {
		if (this.flags & 1) {
			for (let e = this.deps; e; e = e.nextDep) ze(e);
			this.deps = this.depsTail = void 0, Ge(this), this.onStop && this.onStop(), this.flags &= -2;
		}
	}
	trigger() {
		this.flags & 64 ? De.add(this) : this.scheduler ? this.scheduler() : this.runIfDirty();
	}
	runIfDirty() {
		Le(this) && this.run();
	}
	get dirty() {
		return Le(this);
	}
}, ke = 0, Ae, je;
function Me(e, t = !1) {
	e.flags |= 8, t ? (e.next = je, je = e) : (e.next = Ae, Ae = e);
}
function Ne() {
	ke++;
}
function Pe() {
	if (--ke > 0) return;
	if (je) {
		let e = je;
		for (je = void 0; e;) {
			let t = e.next;
			e.next = void 0, e.flags &= -9, e = t;
		}
	}
	let e;
	for (; Ae;) {
		let t = Ae;
		for (Ae = void 0; t;) {
			let n = t.next;
			if (t.next = void 0, t.flags &= -9, t.flags & 1) try {
				t.trigger();
			} catch (t) {
				e ||= t;
			}
			t = n;
		}
	}
	if (e) throw e;
}
function Fe(e) {
	for (let t = e.deps; t; t = t.nextDep) t.version = -1, t.prevActiveLink = t.dep.activeLink, t.dep.activeLink = t;
}
function Ie(e) {
	let t, n = e.depsTail, r = n;
	for (; r;) {
		let e = r.prevDep;
		r.version === -1 ? (r === n && (n = e), ze(r), Be(r)) : t = r, r.dep.activeLink = r.prevActiveLink, r.prevActiveLink = void 0, r = e;
	}
	e.deps = t, e.depsTail = n;
}
function Le(e) {
	for (let t = e.deps; t; t = t.nextDep) if (t.dep.version !== t.version || t.dep.computed && (Re(t.dep.computed) || t.dep.version !== t.version)) return !0;
	return !!e._dirty;
}
function Re(e) {
	if (e.flags & 4 && !(e.flags & 16) || (e.flags &= -17, e.globalVersion === Ke) || (e.globalVersion = Ke, !e.isSSR && e.flags & 128 && (!e.deps && !e._dirty || !Le(e)))) return;
	e.flags |= 2;
	let t = e.dep, n = Ee, r = Ve;
	Ee = e, Ve = !0;
	try {
		Fe(e);
		let n = e.fn(e._value);
		(t.version === 0 || k(n, e._value)) && (e.flags |= 128, e._value = n, t.version++);
	} catch (e) {
		throw t.version++, e;
	} finally {
		Ee = n, Ve = r, Ie(e), e.flags &= -3;
	}
}
function ze(e, t = !1) {
	let { dep: n, prevSub: r, nextSub: i } = e;
	if (r && (r.nextSub = i, e.prevSub = void 0), i && (i.prevSub = r, e.nextSub = void 0), n.subs === e && (n.subs = r, !r && n.computed)) {
		n.computed.flags &= -5;
		for (let e = n.computed.deps; e; e = e.nextDep) ze(e, !0);
	}
	!t && !--n.sc && n.map && n.map.delete(n.key);
}
function Be(e) {
	let { prevDep: t, nextDep: n } = e;
	t && (t.nextDep = n, e.prevDep = void 0), n && (n.prevDep = t, e.nextDep = void 0);
}
var Ve = !0, He = [];
function Ue() {
	He.push(Ve), Ve = !1;
}
function We() {
	let e = He.pop();
	Ve = e === void 0 || e;
}
function Ge(e) {
	let { cleanup: t } = e;
	if (e.cleanup = void 0, t) {
		let e = Ee;
		Ee = void 0;
		try {
			t();
		} finally {
			Ee = e;
		}
	}
}
var Ke = 0, qe = class {
	constructor(e, t) {
		this.sub = e, this.dep = t, this.version = t.version, this.nextDep = this.prevDep = this.nextSub = this.prevSub = this.prevActiveLink = void 0;
	}
}, Je = class {
	constructor(e) {
		this.computed = e, this.version = 0, this.activeLink = void 0, this.subs = void 0, this.map = void 0, this.key = void 0, this.sc = 0, this.__v_skip = !0;
	}
	track(e) {
		if (!Ee || !Ve || Ee === this.computed) return;
		let t = this.activeLink;
		if (t === void 0 || t.sub !== Ee) t = this.activeLink = new qe(Ee, this), Ee.deps ? (t.prevDep = Ee.depsTail, Ee.depsTail.nextDep = t, Ee.depsTail = t) : Ee.deps = Ee.depsTail = t, Ye(t);
		else if (t.version === -1 && (t.version = this.version, t.nextDep)) {
			let e = t.nextDep;
			e.prevDep = t.prevDep, t.prevDep && (t.prevDep.nextDep = e), t.prevDep = Ee.depsTail, t.nextDep = void 0, Ee.depsTail.nextDep = t, Ee.depsTail = t, Ee.deps === t && (Ee.deps = e);
		}
		return t;
	}
	trigger(e) {
		this.version++, Ke++, this.notify(e);
	}
	notify(e) {
		Ne();
		try {
			for (let e = this.subs; e; e = e.prevSub) e.sub.notify() && e.sub.dep.notify();
		} finally {
			Pe();
		}
	}
};
function Ye(e) {
	if (e.dep.sc++, e.sub.flags & 4) {
		let t = e.dep.computed;
		if (t && !e.dep.subs) {
			t.flags |= 20;
			for (let e = t.deps; e; e = e.nextDep) Ye(e);
		}
		let n = e.dep.subs;
		n !== e && (e.prevSub = n, n && (n.nextSub = e)), e.dep.subs = e;
	}
}
var Xe = /* @__PURE__ */ new WeakMap(), Ze = /* @__PURE__ */ Symbol(""), Qe = /* @__PURE__ */ Symbol(""), $e = /* @__PURE__ */ Symbol("");
function et(e, t, n) {
	if (Ve && Ee) {
		let t = Xe.get(e);
		t || Xe.set(e, t = /* @__PURE__ */ new Map());
		let r = t.get(n);
		r || (t.set(n, r = new Je()), r.map = t, r.key = n), r.track();
	}
}
function tt(e, t, n, r, i, a) {
	let o = Xe.get(e);
	if (!o) {
		Ke++;
		return;
	}
	let s = (e) => {
		e && e.trigger();
	};
	if (Ne(), t === "clear") o.forEach(s);
	else {
		let i = d(e), a = i && w(n);
		if (i && n === "length") {
			let e = Number(r);
			o.forEach((t, n) => {
				(n === "length" || n === $e || !_(n) && n >= e) && s(t);
			});
		} else switch ((n !== void 0 || o.has(void 0)) && s(o.get(n)), a && s(o.get($e)), t) {
			case "add":
				i ? a && s(o.get("length")) : (s(o.get(Ze)), f(e) && s(o.get(Qe)));
				break;
			case "delete":
				i || (s(o.get(Ze)), f(e) && s(o.get(Qe)));
				break;
			case "set": f(e) && s(o.get(Ze));
		}
	}
	Pe();
}
function nt(e) {
	let t = /* @__PURE__ */ Ut(e);
	return t === e || (et(t, "iterate", $e), /* @__PURE__ */ Vt(e)) ? t : /* @__PURE__ */ Bt(e) ? /* @__PURE__ */ zt(e) ? t.map((e) => Kt(Gt(e))) : t.map(Kt) : t.map(Gt);
}
function rt(e) {
	return et(e = /* @__PURE__ */ Ut(e), "iterate", $e), e;
}
function it(e, t) {
	return /* @__PURE__ */ Bt(e) ? Kt(/* @__PURE__ */ zt(e) ? Gt(t) : t) : Gt(t);
}
var at = {
	__proto__: null,
	[Symbol.iterator]() {
		return ot(this, Symbol.iterator, (e) => it(this, e));
	},
	concat(...e) {
		return nt(this).concat(...e.map((e) => d(e) ? nt(e) : e));
	},
	entries() {
		return ot(this, "entries", (e) => (e[1] = it(this, e[1]), e));
	},
	every(e, t) {
		return ct(this, "every", e, t, void 0, arguments);
	},
	filter(e, t) {
		return ct(this, "filter", e, t, (e) => e.map((e) => it(this, e)), arguments);
	},
	find(e, t) {
		return ct(this, "find", e, t, (e) => it(this, e), arguments);
	},
	findIndex(e, t) {
		return ct(this, "findIndex", e, t, void 0, arguments);
	},
	findLast(e, t) {
		return ct(this, "findLast", e, t, (e) => it(this, e), arguments);
	},
	findLastIndex(e, t) {
		return ct(this, "findLastIndex", e, t, void 0, arguments);
	},
	forEach(e, t) {
		return ct(this, "forEach", e, t, void 0, arguments);
	},
	includes(...e) {
		return ut(this, "includes", e);
	},
	indexOf(...e) {
		return ut(this, "indexOf", e);
	},
	join(e) {
		return nt(this).join(e);
	},
	lastIndexOf(...e) {
		return ut(this, "lastIndexOf", e);
	},
	map(e, t) {
		return ct(this, "map", e, t, void 0, arguments);
	},
	pop() {
		return dt(this, "pop");
	},
	push(...e) {
		return dt(this, "push", e);
	},
	reduce(e, ...t) {
		return lt(this, "reduce", e, t);
	},
	reduceRight(e, ...t) {
		return lt(this, "reduceRight", e, t);
	},
	shift() {
		return dt(this, "shift");
	},
	some(e, t) {
		return ct(this, "some", e, t, void 0, arguments);
	},
	splice(...e) {
		return dt(this, "splice", e);
	},
	toReversed() {
		return nt(this).toReversed();
	},
	toSorted(e) {
		return nt(this).toSorted(e);
	},
	toSpliced(...e) {
		return nt(this).toSpliced(...e);
	},
	unshift(...e) {
		return dt(this, "unshift", e);
	},
	values() {
		return ot(this, "values", (e) => it(this, e));
	}
};
function ot(e, t, n) {
	let r = rt(e), i = r[t]();
	return r !== e && !/* @__PURE__ */ Vt(e) && (i._next = i.next, i.next = () => {
		let e = i._next();
		return e.done || (e.value = n(e.value)), e;
	}), i;
}
var st = Array.prototype;
function ct(e, t, n, r, i, a) {
	let o = rt(e), s = o !== e && !/* @__PURE__ */ Vt(e), c = o[t];
	if (c !== st[t]) {
		let t = c.apply(e, a);
		return s ? Gt(t) : t;
	}
	let l = n;
	o !== e && (s ? l = function(t, r) {
		return n.call(this, it(e, t), r, e);
	} : n.length > 2 && (l = function(t, r) {
		return n.call(this, t, r, e);
	}));
	let u = c.call(o, l, r);
	return s && i ? i(u) : u;
}
function lt(e, t, n, r) {
	let i = rt(e), a = i !== e && !/* @__PURE__ */ Vt(e), o = n, s = !1;
	i !== e && (a ? (s = r.length === 0, o = function(t, r, i) {
		return s && (s = !1, t = it(e, t)), n.call(this, t, it(e, r), i, e);
	}) : n.length > 3 && (o = function(t, r, i) {
		return n.call(this, t, r, i, e);
	}));
	let c = i[t](o, ...r);
	return s ? it(e, c) : c;
}
function ut(e, t, n) {
	let r = /* @__PURE__ */ Ut(e);
	et(r, "iterate", $e);
	let i = r[t](...n);
	return (i === -1 || i === !1) && /* @__PURE__ */ Ht(n[0]) ? (n[0] = /* @__PURE__ */ Ut(n[0]), r[t](...n)) : i;
}
function dt(e, t, n = []) {
	Ue(), Ne();
	let r = (/* @__PURE__ */ Ut(e))[t].apply(e, n);
	return Pe(), We(), r;
}
var ft = /* @__PURE__ */ e("__proto__,__v_isRef,__isVue"), pt = new Set(/* @__PURE__ */ Object.getOwnPropertyNames(Symbol).filter((e) => e !== "arguments" && e !== "caller").map((e) => Symbol[e]).filter(_));
function mt(e) {
	_(e) || (e = String(e));
	let t = /* @__PURE__ */ Ut(this);
	return et(t, "has", e), t.hasOwnProperty(e);
}
var ht = class {
	constructor(e = !1, t = !1) {
		this._isReadonly = e, this._isShallow = t;
	}
	get(e, t, n) {
		if (t === "__v_skip") return e.__v_skip;
		let r = this._isReadonly, i = this._isShallow;
		if (t === "__v_isReactive") return !r;
		if (t === "__v_isReadonly") return r;
		if (t === "__v_isShallow") return i;
		if (t === "__v_raw") return n === (r ? i ? Nt : Mt : i ? jt : At).get(e) || Object.getPrototypeOf(e) === Object.getPrototypeOf(n) ? e : void 0;
		let a = d(e);
		if (!r) {
			let e;
			if (a && (e = at[t])) return e;
			if (t === "hasOwnProperty") return mt;
		}
		let o = Reflect.get(e, t, /* @__PURE__ */ qt(e) ? e : n);
		if ((_(t) ? pt.has(t) : ft(t)) || (r || et(e, "get", t), i)) return o;
		if (/* @__PURE__ */ qt(o)) {
			let e = a && w(t) ? o : o.value;
			return r && v(e) ? /* @__PURE__ */ Lt(e) : e;
		}
		return v(o) ? r ? /* @__PURE__ */ Lt(o) : /* @__PURE__ */ Ft(o) : o;
	}
}, gt = class extends ht {
	constructor(e = !1) {
		super(!1, e);
	}
	set(e, t, n, r) {
		let i = e[t], a = d(e) && w(t);
		if (!this._isShallow) {
			let e = /* @__PURE__ */ Bt(i);
			if (!/* @__PURE__ */ Vt(n) && !/* @__PURE__ */ Bt(n) && (i = /* @__PURE__ */ Ut(i), n = /* @__PURE__ */ Ut(n)), !a && /* @__PURE__ */ qt(i) && !/* @__PURE__ */ qt(n)) return e || (i.value = n), !0;
		}
		let o = a ? Number(t) < e.length : u(e, t), s = Reflect.set(e, t, n, /* @__PURE__ */ qt(e) ? e : r);
		return e === /* @__PURE__ */ Ut(r) && s && (o ? k(n, i) && tt(e, "set", t, n, i) : tt(e, "add", t, n)), s;
	}
	deleteProperty(e, t) {
		let n = u(e, t), r = e[t], i = Reflect.deleteProperty(e, t);
		return i && n && tt(e, "delete", t, void 0, r), i;
	}
	has(e, t) {
		let n = Reflect.has(e, t);
		return (!_(t) || !pt.has(t)) && et(e, "has", t), n;
	}
	ownKeys(e) {
		return et(e, "iterate", d(e) ? "length" : Ze), Reflect.ownKeys(e);
	}
}, _t = class extends ht {
	constructor(e = !1) {
		super(!0, e);
	}
	set(e, t) {
		return !0;
	}
	deleteProperty(e, t) {
		return !0;
	}
}, vt = /* @__PURE__ */ new gt(), yt = /* @__PURE__ */ new _t(), bt = /* @__PURE__ */ new gt(!0), xt = (e) => e, St = (e) => Reflect.getPrototypeOf(e);
function Ct(e, t, n) {
	return function(...r) {
		let i = this.__v_raw, a = /* @__PURE__ */ Ut(i), o = f(a), c = e === "entries" || e === Symbol.iterator && o, l = e === "keys" && o, u = i[e](...r), d = n ? xt : t ? Kt : Gt;
		return !t && et(a, "iterate", l ? Qe : Ze), s(Object.create(u), { next() {
			let { value: e, done: t } = u.next();
			return t ? {
				value: e,
				done: t
			} : {
				value: c ? [d(e[0]), d(e[1])] : d(e),
				done: t
			};
		} });
	};
}
function wt(e) {
	return function(...t) {
		return e === "delete" ? !1 : e === "clear" ? void 0 : this;
	};
}
function Tt(e, t) {
	let n = {
		get(n) {
			let r = this.__v_raw, i = /* @__PURE__ */ Ut(r), a = /* @__PURE__ */ Ut(n);
			e || (k(n, a) && et(i, "get", n), et(i, "get", a));
			let { has: o } = St(i), s = t ? xt : e ? Kt : Gt;
			if (o.call(i, n)) return s(r.get(n));
			if (o.call(i, a)) return s(r.get(a));
			r !== i && r.get(n);
		},
		get size() {
			let t = this.__v_raw;
			return !e && et(/* @__PURE__ */ Ut(t), "iterate", Ze), t.size;
		},
		has(t) {
			let n = this.__v_raw, r = /* @__PURE__ */ Ut(n), i = /* @__PURE__ */ Ut(t);
			return e || (k(t, i) && et(r, "has", t), et(r, "has", i)), t === i ? n.has(t) : n.has(t) || n.has(i);
		},
		forEach(n, r) {
			let i = this, a = i.__v_raw, o = /* @__PURE__ */ Ut(a), s = t ? xt : e ? Kt : Gt;
			return !e && et(o, "iterate", Ze), a.forEach((e, t) => n.call(r, s(e), s(t), i));
		}
	};
	return s(n, e ? {
		add: wt("add"),
		set: wt("set"),
		delete: wt("delete"),
		clear: wt("clear")
	} : {
		add(e) {
			let n = /* @__PURE__ */ Ut(this), r = St(n), i = /* @__PURE__ */ Ut(e), a = !t && !/* @__PURE__ */ Vt(e) && !/* @__PURE__ */ Bt(e) ? i : e;
			return r.has.call(n, a) || k(e, a) && r.has.call(n, e) || k(i, a) && r.has.call(n, i) || (n.add(a), tt(n, "add", a, a)), this;
		},
		set(e, n) {
			!t && !/* @__PURE__ */ Vt(n) && !/* @__PURE__ */ Bt(n) && (n = /* @__PURE__ */ Ut(n));
			let r = /* @__PURE__ */ Ut(this), { has: i, get: a } = St(r), o = i.call(r, e);
			o ||= (e = /* @__PURE__ */ Ut(e), i.call(r, e));
			let s = a.call(r, e);
			return r.set(e, n), o ? k(n, s) && tt(r, "set", e, n, s) : tt(r, "add", e, n), this;
		},
		delete(e) {
			let t = /* @__PURE__ */ Ut(this), { has: n, get: r } = St(t), i = n.call(t, e);
			i ||= (e = /* @__PURE__ */ Ut(e), n.call(t, e));
			let a = r ? r.call(t, e) : void 0, o = t.delete(e);
			return i && tt(t, "delete", e, void 0, a), o;
		},
		clear() {
			let e = /* @__PURE__ */ Ut(this), t = e.size !== 0, n = e.clear();
			return t && tt(e, "clear", void 0, void 0, void 0), n;
		}
	}), [
		"keys",
		"values",
		"entries",
		Symbol.iterator
	].forEach((r) => {
		n[r] = Ct(r, e, t);
	}), n;
}
function Et(e, t) {
	let n = Tt(e, t);
	return (t, r, i) => r === "__v_isReactive" ? !e : r === "__v_isReadonly" ? e : r === "__v_raw" ? t : Reflect.get(u(n, r) && r in t ? n : t, r, i);
}
var Dt = { get: /* @__PURE__ */ Et(!1, !1) }, Ot = { get: /* @__PURE__ */ Et(!1, !0) }, kt = { get: /* @__PURE__ */ Et(!0, !1) }, At = /* @__PURE__ */ new WeakMap(), jt = /* @__PURE__ */ new WeakMap(), Mt = /* @__PURE__ */ new WeakMap(), Nt = /* @__PURE__ */ new WeakMap();
function Pt(e) {
	switch (e) {
		case "Object":
		case "Array": return 1;
		case "Map":
		case "Set":
		case "WeakMap":
		case "WeakSet": return 2;
		default: return 0;
	}
}
// @__NO_SIDE_EFFECTS__
function Ft(e) {
	return /* @__PURE__ */ Bt(e) ? e : Rt(e, !1, vt, Dt, At);
}
// @__NO_SIDE_EFFECTS__
function It(e) {
	return Rt(e, !1, bt, Ot, jt);
}
// @__NO_SIDE_EFFECTS__
function Lt(e) {
	return Rt(e, !0, yt, kt, Mt);
}
function Rt(e, t, n, r, i) {
	if (!v(e) || e.__v_raw && !(t && e.__v_isReactive) || e.__v_skip || !Object.isExtensible(e)) return e;
	let a = i.get(e);
	if (a) return a;
	let o = Pt(S(e));
	if (o === 0) return e;
	let s = new Proxy(e, o === 2 ? r : n);
	return i.set(e, s), s;
}
// @__NO_SIDE_EFFECTS__
function zt(e) {
	return /* @__PURE__ */ Bt(e) ? /* @__PURE__ */ zt(e.__v_raw) : !!(e && e.__v_isReactive);
}
// @__NO_SIDE_EFFECTS__
function Bt(e) {
	return !!(e && e.__v_isReadonly);
}
// @__NO_SIDE_EFFECTS__
function Vt(e) {
	return !!(e && e.__v_isShallow);
}
// @__NO_SIDE_EFFECTS__
function Ht(e) {
	return e ? !!e.__v_raw : !1;
}
// @__NO_SIDE_EFFECTS__
function Ut(e) {
	let t = e && e.__v_raw;
	return t ? /* @__PURE__ */ Ut(t) : e;
}
function Wt(e) {
	return !u(e, "__v_skip") && Object.isExtensible(e) && ae(e, "__v_skip", !0), e;
}
var Gt = (e) => v(e) ? /* @__PURE__ */ Ft(e) : e, Kt = (e) => v(e) ? /* @__PURE__ */ Lt(e) : e;
// @__NO_SIDE_EFFECTS__
function qt(e) {
	return e ? e.__v_isRef === !0 : !1;
}
// @__NO_SIDE_EFFECTS__
function F(e) {
	return Yt(e, !1);
}
// @__NO_SIDE_EFFECTS__
function Jt(e) {
	return Yt(e, !0);
}
function Yt(e, t) {
	return /* @__PURE__ */ qt(e) ? e : new Xt(e, t);
}
var Xt = class {
	constructor(e, t) {
		this.dep = new Je(), this.__v_isRef = !0, this.__v_isShallow = !1, this._rawValue = t ? e : /* @__PURE__ */ Ut(e), this._value = t ? e : Gt(e), this.__v_isShallow = t;
	}
	get value() {
		return this.dep.track(), this._value;
	}
	set value(e) {
		let t = this._rawValue, n = this.__v_isShallow || /* @__PURE__ */ Vt(e) || /* @__PURE__ */ Bt(e);
		e = n ? e : /* @__PURE__ */ Ut(e), k(e, t) && (this._rawValue = e, this._value = n ? e : Gt(e), this.dep.trigger());
	}
};
function I(e) {
	return /* @__PURE__ */ qt(e) ? e.value : e;
}
var Zt = {
	get: (e, t, n) => t === "__v_raw" ? e : I(Reflect.get(e, t, n)),
	set: (e, t, n, r) => {
		let i = e[t];
		return /* @__PURE__ */ qt(i) && !/* @__PURE__ */ qt(n) ? (i.value = n, !0) : Reflect.set(e, t, n, r);
	}
};
function Qt(e) {
	return /* @__PURE__ */ zt(e) ? e : new Proxy(e, Zt);
}
var $t = class {
	constructor(e) {
		this.__v_isRef = !0, this._value = void 0;
		let t = this.dep = new Je(), { get: n, set: r } = e(t.track.bind(t), t.trigger.bind(t));
		this._get = n, this._set = r;
	}
	get value() {
		return this._value = this._get();
	}
	set value(e) {
		this._set(e);
	}
};
function en(e) {
	return new $t(e);
}
var tn = class {
	constructor(e, t, n) {
		this.fn = e, this.setter = t, this._value = void 0, this.dep = new Je(this), this.__v_isRef = !0, this.deps = void 0, this.depsTail = void 0, this.flags = 16, this.globalVersion = Ke - 1, this.next = void 0, this.effect = this, this.__v_isReadonly = !t, this.isSSR = n;
	}
	notify() {
		if (this.flags |= 16, !(this.flags & 8) && Ee !== this) return Me(this, !0), !0;
	}
	get value() {
		let e = this.dep.track();
		return Re(this), e && (e.version = this.dep.version), this._value;
	}
	set value(e) {
		this.setter && this.setter(e);
	}
};
// @__NO_SIDE_EFFECTS__
function nn(e, t, n = !1) {
	let r, i;
	return h(e) ? r = e : (r = e.get, i = e.set), new tn(r, i, n);
}
var rn = {}, an = /* @__PURE__ */ new WeakMap(), on = void 0;
function sn(e, t = !1, n = on) {
	if (n) {
		let t = an.get(n);
		t || an.set(n, t = []), t.push(e);
	}
}
function cn(e, n, i = t) {
	let { immediate: a, deep: o, once: s, scheduler: l, augmentJob: u, call: f } = i, p = (e) => o ? e : /* @__PURE__ */ Vt(e) || o === !1 || o === 0 ? ln(e, 1) : ln(e), m, g, _, v, y = !1, b = !1;
	if (/* @__PURE__ */ qt(e) ? (g = () => e.value, y = /* @__PURE__ */ Vt(e)) : /* @__PURE__ */ zt(e) ? (g = () => p(e), y = !0) : d(e) ? (b = !0, y = e.some((e) => /* @__PURE__ */ zt(e) || /* @__PURE__ */ Vt(e)), g = () => e.map((e) => {
		if (/* @__PURE__ */ qt(e)) return e.value;
		if (/* @__PURE__ */ zt(e)) return p(e);
		if (h(e)) return f ? f(e, 2) : e();
	})) : g = h(e) ? n ? f ? () => f(e, 2) : e : () => {
		if (_) {
			Ue();
			try {
				_();
			} finally {
				We();
			}
		}
		let t = on;
		on = m;
		try {
			return f ? f(e, 3, [v]) : e(v);
		} finally {
			on = t;
		}
	} : r, n && o) {
		let e = g, t = o === !0 ? Infinity : o;
		g = () => ln(e(), t);
	}
	let x = Te(), S = () => {
		m.stop(), x && x.active && c(x.effects, m);
	};
	if (s && n) {
		let e = n;
		n = (...t) => {
			let n = e(...t);
			return S(), n;
		};
	}
	let C = b ? Array(e.length).fill(rn) : rn, w = (e) => {
		if (m.flags & 1 && (m.dirty || e)) {
			if (n) {
				let t = m.run();
				if (e || o || y || (b ? t.some((e, t) => k(e, C[t])) : k(t, C))) {
					_ && _();
					let e = on;
					on = m;
					try {
						let e = [
							t,
							C === rn ? void 0 : b && C[0] === rn ? [] : C,
							v
						];
						C = t, f ? f(n, 3, e) : n(...e);
					} finally {
						on = e;
					}
				}
			} else m.run();
		}
	};
	return u && u(w), m = new Oe(g), m.scheduler = l ? () => l(w, !1) : w, v = (e) => sn(e, !1, m), _ = m.onStop = () => {
		let e = an.get(m);
		if (e) {
			if (f) f(e, 4);
			else for (let t of e) t();
			an.delete(m);
		}
	}, n ? a ? w(!0) : C = m.run() : l ? l(w.bind(null, !0), !0) : m.run(), S.pause = m.pause.bind(m), S.resume = m.resume.bind(m), S.stop = S, S;
}
function ln(e, t = Infinity, n) {
	if (t <= 0 || !v(e) || e.__v_skip || (n ||= /* @__PURE__ */ new Map(), (n.get(e) || 0) >= t)) return e;
	if (n.set(e, t), t--, /* @__PURE__ */ qt(e)) ln(e.value, t, n);
	else if (d(e)) for (let r = 0; r < e.length; r++) ln(e[r], t, n);
	else if (p(e) || f(e)) e.forEach((e) => {
		ln(e, t, n);
	});
	else if (C(e)) {
		for (let r in e) ln(e[r], t, n);
		for (let r of Object.getOwnPropertySymbols(e)) Object.prototype.propertyIsEnumerable.call(e, r) && ln(e[r], t, n);
	}
	return e;
}
//#endregion
//#region ../../node_modules/.pnpm/@vue+runtime-core@3.5.43/node_modules/@vue/runtime-core/dist/runtime-core.esm-bundler.js
function un(e, t, n, r) {
	try {
		return r ? e(...r) : e();
	} catch (e) {
		fn(e, t, n);
	}
}
function dn(e, t, n, r) {
	if (h(e)) {
		let i = un(e, t, n, r);
		return i && y(i) && i.catch((e) => {
			fn(e, t, n);
		}), i;
	}
	if (d(e)) {
		let i = [];
		for (let a = 0; a < e.length; a++) i.push(dn(e[a], t, n, r));
		return i;
	}
}
function fn(e, n, r, i = !0) {
	let a = n ? n.vnode : null, { errorHandler: o, throwUnhandledErrorInProduction: s } = n && n.appContext.config || t;
	if (n) {
		let t = n.parent, i = n.proxy, a = `https://vuejs.org/error-reference/#runtime-${r}`;
		for (; t;) {
			let n = t.ec;
			if (n) {
				for (let t = 0; t < n.length; t++) if (n[t](e, i, a) === !1) return;
			}
			t = t.parent;
		}
		if (o) {
			Ue(), un(o, null, 10, [
				e,
				i,
				a
			]), We();
			return;
		}
	}
	pn(e, r, a, i, s);
}
function pn(e, t, n, r = !0, i = !1) {
	if (i) throw e;
	console.error(e);
}
var mn = [], hn = -1, gn = [], _n = null, vn = 0, yn = /* @__PURE__ */ Promise.resolve(), bn = null;
function xn(e) {
	let t = bn || yn;
	return e ? t.then(this ? e.bind(this) : e) : t;
}
function Sn(e) {
	let t = hn + 1, n = mn.length;
	for (; t < n;) {
		let r = t + n >>> 1, i = mn[r], a = On(i);
		a < e || a === e && i.flags & 2 ? t = r + 1 : n = r;
	}
	return t;
}
function Cn(e) {
	if (!(e.flags & 1)) {
		let t = On(e), n = mn[mn.length - 1];
		!n || !(e.flags & 2) && t >= On(n) ? mn.push(e) : mn.splice(Sn(t), 0, e), e.flags |= 1, wn();
	}
}
function wn() {
	bn ||= yn.then(kn);
}
function Tn(e) {
	if (!d(e)) _n && e.id === -1 ? _n.splice(vn + 1, 0, e) : e.flags & 1 || (gn.push(e), e.flags |= 1);
	else for (let t = 0; t < e.length; t++) gn.push(e[t]);
	wn();
}
function En(e, t, n = hn + 1) {
	for (; n < mn.length; n++) {
		let t = mn[n];
		if (t && t.flags & 2) {
			if (e && t.id !== e.uid) continue;
			mn.splice(n, 1), n--, t.flags & 4 && (t.flags &= -2), t(), t.flags & 4 || (t.flags &= -2);
		}
	}
}
function Dn(e) {
	if (gn.length) {
		let e = [...new Set(gn)].sort((e, t) => On(e) - On(t));
		if (gn.length = 0, _n) {
			for (let t = 0; t < e.length; t++) _n.push(e[t]);
			return;
		}
		for (_n = e, vn = 0; vn < _n.length; vn++) {
			let e = _n[vn];
			e.flags & 4 && (e.flags &= -2), e.flags & 8 || e(), e.flags &= -2;
		}
		_n = null, vn = 0;
	}
}
var On = (e) => e.id == null ? e.flags & 2 ? -1 : Infinity : e.id;
function kn(e) {
	try {
		for (hn = 0; hn < mn.length; hn++) {
			let e = mn[hn];
			e && !(e.flags & 8) && (e.flags & 4 && (e.flags &= -2), un(e, e.i, e.i ? 15 : 14), e.flags & 4 || (e.flags &= -2));
		}
	} finally {
		for (; hn < mn.length; hn++) {
			let e = mn[hn];
			e && (e.flags &= -2);
		}
		hn = -1, mn.length = 0, Dn(e), bn = null, (mn.length || gn.length) && kn(e);
	}
}
var An = null, jn = null;
function Mn(e) {
	let t = An;
	return An = e, jn = e && e.type.__scopeId || null, t;
}
function Nn(e, t = An, n) {
	if (!t || e._n) return e;
	let r = (...n) => {
		r._d && sa(-1);
		let i = Mn(t), a = ra.length, o;
		try {
			o = e(...n);
		} finally {
			for (let e = ra.length; e > a; e--) aa();
			Mn(i), r._d && sa(1);
		}
		return o;
	};
	return r._n = !0, r._c = !0, r._d = !0, r;
}
function Pn(e, t, n, r) {
	let i = e.dirs, a = t && t.dirs;
	for (let o = 0; o < i.length; o++) {
		let s = i[o];
		a && (s.oldValue = a[o].value);
		let c = s.dir[r];
		c && (Ue(), dn(c, n, 8, [
			e.el,
			s,
			e,
			t
		]), We());
	}
}
function Fn(e, t) {
	if (Ta) {
		let n = Ta.provides, r = Ta.parent && Ta.parent.provides;
		r === n && (n = Ta.provides = Object.create(r)), n[e] = t;
	}
}
function In(e, t, n = !1) {
	let r = Ea();
	if (r || li) {
		let i = li ? li._context.provides : r ? r.parent == null || r.ce ? r.vnode.appContext && r.vnode.appContext.provides : r.parent.provides : void 0;
		if (i && e in i) return i[e];
		if (arguments.length > 1) return n && h(t) ? t.call(r && r.proxy) : t;
	}
}
var Ln = /* @__PURE__ */ Symbol.for("v-scx"), Rn = () => In(Ln);
function zn(e, t) {
	return Vn(e, null, { flush: "sync" });
}
function Bn(e, t, n) {
	return Vn(e, t, n);
}
function Vn(e, n, i = t) {
	let { immediate: a, deep: o, flush: c, once: l } = i, u = s({}, i), d = n && a || !n && c !== "post", f;
	if (Ma) {
		if (c === "sync") {
			let e = Rn();
			f = e.__watcherHandles ||= [];
		} else if (!d) {
			let e = () => {};
			return e.stop = r, e.resume = r, e.pause = r, e;
		}
	}
	let p = Ta;
	u.call = (e, t, n) => dn(e, p, t, n);
	let m = !1;
	c === "post" ? u.scheduler = (e) => {
		Vi(e, p && p.suspense);
	} : c !== "sync" && (m = !0, u.scheduler = (e, t) => {
		t ? e() : Cn(e);
	}), u.augmentJob = (e) => {
		n && (e.flags |= 4), m && (e.flags |= 2, p && (e.id = p.uid, e.i = p));
	};
	let h = cn(e, n, u);
	return Ma && (f ? f.push(h) : d && h()), h;
}
function Hn(e, t, n) {
	let r = this.proxy, i = g(e) ? e.includes(".") ? Un(r, e) : () => r[e] : e.bind(r, r), a;
	h(t) ? a = t : (a = t.handler, n = t);
	let o = ka(this), s = Vn(i, a.bind(r), n);
	return o(), s;
}
function Un(e, t) {
	let n = t.split(".");
	return () => {
		let t = e;
		for (let e = 0; e < n.length && t; e++) t = t[n[e]];
		return t;
	};
}
var Wn = /* @__PURE__ */ Symbol("_vte"), Gn = (e) => e.__isTeleport, Kn = /* @__PURE__ */ Symbol("_leaveCb"), qn = /* @__PURE__ */ Symbol("_enterCb");
function Jn() {
	let e = {
		isMounted: !1,
		isLeaving: !1,
		isUnmounting: !1,
		leavingVNodes: /* @__PURE__ */ new Map()
	};
	return Cr(() => {
		e.isMounted = !0;
	}), Er(() => {
		e.isUnmounting = !0;
	}), e;
}
var Yn = [Function, Array], Xn = {
	mode: String,
	appear: Boolean,
	persisted: Boolean,
	onBeforeEnter: Yn,
	onEnter: Yn,
	onAfterEnter: Yn,
	onEnterCancelled: Yn,
	onBeforeLeave: Yn,
	onLeave: Yn,
	onAfterLeave: Yn,
	onLeaveCancelled: Yn,
	onBeforeAppear: Yn,
	onAppear: Yn,
	onAfterAppear: Yn,
	onAppearCancelled: Yn
}, Zn = (e) => {
	let t = e.subTree;
	return t.component ? Zn(t.component) : t;
}, Qn = {
	name: "BaseTransition",
	props: Xn,
	setup(e, { slots: t }) {
		let n = Ea(), r = Jn();
		return () => {
			let i = t.default && or(t.default(), !0), a = i && i.length ? $n(i) : n.subTree ? U() : void 0;
			if (!a) return;
			let o = /* @__PURE__ */ Ut(e), { mode: s } = o;
			if (r.isLeaving) return rr(a);
			let c = ir(a);
			if (!c) return rr(a);
			let l = nr(c, o, r, n, (e) => l = e);
			c.type !== ta && ar(c, l);
			let u = n.subTree && ir(n.subTree);
			if (u && u.type !== ta && !ua(u, c) && Zn(n).type !== ta) {
				let e = nr(u, o, r, n);
				if (ar(u, e), s === "out-in" && c.type !== ta) return r.isLeaving = !0, e.afterLeave = () => {
					r.isLeaving = !1, n.job.flags & 8 || n.update(), delete e.afterLeave, u = void 0;
				}, rr(a);
				s === "in-out" && c.type !== ta ? e.delayLeave = (e, t, n) => {
					let i = tr(r, u);
					i[String(u.key)] = u, e[Kn] = () => {
						t(), e[Kn] = void 0, delete l.delayedLeave, u = void 0;
					}, l.delayedLeave = () => {
						n(), delete l.delayedLeave, u = void 0;
					};
				} : u = void 0;
			} else u &&= void 0;
			return a;
		};
	}
};
function $n(e) {
	let t = e[0];
	if (e.length > 1) {
		for (let n of e) if (n.type !== ta) {
			t = n;
			break;
		}
	}
	return t;
}
var er = Qn;
function tr(e, t) {
	let { leavingVNodes: n } = e, r = n.get(t.type);
	return r || (r = /* @__PURE__ */ Object.create(null), n.set(t.type, r)), r;
}
function nr(e, t, n, r, i) {
	let { appear: a, mode: o, persisted: s = !1, onBeforeEnter: c, onEnter: l, onAfterEnter: u, onEnterCancelled: f, onBeforeLeave: p, onLeave: m, onAfterLeave: h, onLeaveCancelled: g, onBeforeAppear: _, onAppear: v, onAfterAppear: y, onAppearCancelled: b } = t, x = String(e.key), S = tr(n, e), C = (e, t) => {
		e && dn(e, r, 9, t);
	}, w = (e, t) => {
		let n = t[1];
		C(e, t), d(e) ? e.every((e) => e.length <= 1) && n() : e.length <= 1 && n();
	}, T = {
		mode: o,
		persisted: s,
		beforeEnter(t) {
			let r = c;
			if (!n.isMounted) {
				if (a) r = _ || c;
				else return;
			}
			t[Kn] && t[Kn](!0);
			let i = S[x];
			i && ua(e, i) && i.el[Kn] && i.el[Kn](), C(r, [t]);
		},
		enter(t) {
			if (S[x] === e) return;
			let r = l, i = u, o = f;
			if (!n.isMounted) {
				if (a) r = v || l, i = y || u, o = b || f;
				else return;
			}
			let s = !1;
			t[qn] = (e) => {
				s || (s = !0, C(e ? o : i, [t]), T.delayedLeave && T.delayedLeave(), t[qn] = void 0);
			};
			let c = t[qn].bind(null, !1);
			r ? w(r, [t, c]) : c();
		},
		leave(t, r) {
			let i = String(e.key);
			if (t[qn] && t[qn](!0), n.isUnmounting) return r();
			C(p, [t]);
			let a = !1;
			t[Kn] = (n) => {
				a || (a = !0, r(), C(n ? g : h, [t]), t[Kn] = void 0, S[i] === e && delete S[i]);
			};
			let o = t[Kn].bind(null, !1);
			S[i] = e, m ? w(m, [t, o]) : o();
		},
		clone(e) {
			let a = nr(e, t, n, r, i);
			return i && i(a), a;
		}
	};
	return T;
}
function rr(e) {
	if (hr(e)) return e = ha(e), e.children = null, e;
}
function ir(e) {
	if (!hr(e)) return Gn(e.type) && e.children ? $n(e.children) : e;
	if (e.component) return e.component.subTree;
	let { shapeFlag: t, children: n } = e;
	if (n) {
		if (t & 16) return n[0];
		if (t & 32 && h(n.default)) return n.default();
	}
}
function ar(e, t) {
	if (e.shapeFlag & 6 && e.component) {
		e.transition = t;
		let n = e.component.subTree;
		ar(Gn(n.type) && ir(n) || n, t);
	} else e.shapeFlag & 128 ? (e.ssContent.transition = t.clone(e.ssContent), e.ssFallback.transition = t.clone(e.ssFallback)) : e.transition = t;
}
function or(e, t = !1, n) {
	let r = [], i = 0;
	for (let a = 0; a < e.length; a++) {
		let o = e[a], s = n == null ? o.key : String(n) + String(o.key == null ? a : o.key);
		o.type === L ? (o.patchFlag & 128 && i++, r = r.concat(or(o.children, t, s))) : (t || o.type !== ta) && r.push(s == null ? o : ha(o, { key: s }));
	}
	if (i > 1) for (let e = 0; e < r.length; e++) r[e].patchFlag = -2;
	return r;
}
// @__NO_SIDE_EFFECTS__
function sr(e, t) {
	return h(e) ? /* @__PURE__ */ s({ name: e.name }, t, { setup: e }) : e;
}
function cr(e) {
	e.ids = [
		e.ids[0] + e.ids[2]++ + "-",
		0,
		0
	];
}
function lr(e) {
	let n = Ea(), r = /* @__PURE__ */ Jt(null);
	if (n) {
		let i = n.refs === t ? n.refs = {} : n.refs;
		Object.defineProperty(i, e, {
			enumerable: !0,
			get: () => r.value,
			set: (e) => r.value = e
		});
	}
	return r;
}
function ur(e, t) {
	let n;
	return !!((n = Object.getOwnPropertyDescriptor(e, t)) && !n.configurable);
}
var dr = /* @__PURE__ */ new WeakMap();
function fr(e, n, r, a, o = !1) {
	if (d(e)) {
		e.forEach((e, t) => fr(e, n && (d(n) ? n[t] : n), r, a, o));
		return;
	}
	if (mr(a) && !o) {
		a.shapeFlag & 512 && a.type.__asyncResolved && a.component.subTree.component && fr(e, n, r, a.component.subTree);
		return;
	}
	let s = a.shapeFlag & 4 ? za(a.component) : a.el, l = o ? null : s, { i: f, r: p } = e, m = n && n.r, _ = f.refs === t ? f.refs = {} : f.refs, v = f.setupState, y = /* @__PURE__ */ Ut(v), b = v === t ? i : (e) => !ur(_, e) && u(y, e), x = (e, t) => !(t && ur(_, t));
	if (m != null && m !== p) {
		if (pr(n), g(m)) _[m] = null, b(m) && (v[m] = null);
		else if (/* @__PURE__ */ qt(m)) {
			let e = n;
			x(m, e.k) && (m.value = null), e.k && (_[e.k] = null);
		}
	}
	if (h(p)) un(p, f, 12, [l, _]);
	else {
		let t = g(p), n = /* @__PURE__ */ qt(p);
		if (t || n) {
			let i = () => {
				if (e.f) {
					let n = t ? b(p) ? v[p] : _[p] : x(p) || !e.k ? p.value : _[e.k];
					if (o) d(n) && c(n, s);
					else if (d(n)) n.includes(s) || n.push(s);
					else if (t) _[p] = [s], b(p) && (v[p] = _[p]);
					else {
						let t = [s];
						x(p, e.k) && (p.value = t), e.k && (_[e.k] = t);
					}
				} else t ? (_[p] = l, b(p) && (v[p] = l)) : n && (x(p, e.k) && (p.value = l), e.k && (_[e.k] = l));
			};
			if (l) {
				let t = () => {
					i(), dr.delete(e);
				};
				t.id = -1, dr.set(e, t), Vi(t, r);
			} else pr(e), i();
		}
	}
}
function pr(e) {
	let t = dr.get(e);
	t && (t.flags |= 8, dr.delete(e));
}
ce().requestIdleCallback, ce().cancelIdleCallback;
var mr = (e) => !!e.type.__asyncLoader, hr = (e) => e.type.__isKeepAlive;
function gr(e, t) {
	vr(e, "a", t);
}
function _r(e, t) {
	vr(e, "da", t);
}
function vr(e, t, n = Ta) {
	let r = e.__wdc ||= () => {
		let t = n;
		for (; t;) {
			if (t.isDeactivated) return;
			t = t.parent;
		}
		return e();
	};
	if (br(t, r, n), n) {
		let e = n.parent;
		for (; e && e.parent;) hr(e.parent.vnode) && yr(r, t, n, e), e = e.parent;
	}
}
function yr(e, t, n, r) {
	let i = br(t, e, r, !0);
	Dr(() => {
		c(r[t], i);
	}, n);
}
function br(e, t, n = Ta, r = !1) {
	if (n) {
		let i = n[e] || (n[e] = []), a = t.__weh ||= (...r) => {
			Ue();
			let i = ka(n), a = dn(t, n, e, r);
			return i(), We(), a;
		};
		return r ? i.unshift(a) : i.push(a), a;
	}
}
var xr = (e) => (t, n = Ta) => {
	(!Ma || e === "sp") && br(e, (...e) => t(...e), n);
}, Sr = xr("bm"), Cr = xr("m"), wr = xr("bu"), Tr = xr("u"), Er = xr("bum"), Dr = xr("um"), Or = xr("sp"), kr = xr("rtg"), Ar = xr("rtc");
function jr(e, t = Ta) {
	br("ec", e, t);
}
var Mr = /* @__PURE__ */ Symbol.for("v-ndc");
function Nr(e, t, n, r) {
	let i, a = n && n[r], o = d(e);
	if (o || g(e)) {
		let n = o && /* @__PURE__ */ zt(e), r = !1, s = !1;
		n && (r = !/* @__PURE__ */ Vt(e), s = /* @__PURE__ */ Bt(e), e = rt(e)), i = Array(e.length);
		for (let n = 0, o = e.length; n < o; n++) i[n] = t(r ? s ? Kt(Gt(e[n])) : Gt(e[n]) : e[n], n, void 0, a && a[n]);
	} else if (typeof e == "number") {
		i = Array(e);
		for (let n = 0; n < e; n++) i[n] = t(n + 1, n, void 0, a && a[n]);
	} else if (v(e)) {
		if (e[Symbol.iterator]) i = Array.from(e, (e, n) => t(e, n, void 0, a && a[n]));
		else {
			let n = Object.keys(e);
			i = Array(n.length);
			for (let r = 0, o = n.length; r < o; r++) {
				let o = n[r];
				i[r] = t(e[o], o, r, a && a[r]);
			}
		}
	} else i = [];
	return n && (n[r] = i), i;
}
function Pr(e, t, n, r, i, a) {
	if (n ??= {}, An.ce || An.parent && mr(An.parent) && An.parent.ce) {
		let e = a != null && n.key == null ? s({}, n, { key: a }) : n, i = Object.keys(e).length > 0;
		return t !== "default" && (e.name = t), R(), B(L, null, [H("slot", e, r && r())], i ? -2 : 64);
	}
	let o = e[t];
	o && o._c && (o._d = !1);
	let c = ra.length;
	R();
	let l;
	try {
		let i = o && Fr(o(n)), s = n.key || a || i && i.key;
		l = B(L, { key: (s && !_(s) ? s : `_${t}`) + (!i && r ? "_fb" : "") }, i || (r ? r() : []), i && e._ === 1 ? 64 : -2);
	} catch (e) {
		for (let e = ra.length; e > c; e--) aa();
		throw e;
	} finally {
		o && o._c && (o._d = !0);
	}
	return !i && l.scopeId && (l.slotScopeIds = [l.scopeId + "-s"]), l;
}
function Fr(e) {
	return e.some((e) => !la(e) || !(e.type === ta || e.type === L && !Fr(e.children))) ? e : null;
}
var Ir = (e) => e ? ja(e) ? za(e) : Ir(e.parent) : null, Lr = /* @__PURE__ */ s(/* @__PURE__ */ Object.create(null), {
	$: (e) => e,
	$el: (e) => e.vnode.el,
	$data: (e) => e.data,
	$props: (e) => e.props,
	$attrs: (e) => e.attrs,
	$slots: (e) => e.slots,
	$refs: (e) => e.refs,
	$parent: (e) => Ir(e.parent),
	$root: (e) => Ir(e.root),
	$host: (e) => e.ce,
	$emit: (e) => e.emit,
	$options: (e) => Xr(e),
	$forceUpdate: (e) => e.f ||= () => {
		Cn(e.update);
	},
	$nextTick: (e) => e.n ||= xn.bind(e.proxy),
	$watch: (e) => Hn.bind(e)
}), Rr = (e, n) => e !== t && !e.__isScriptSetup && u(e, n), zr = {
	get({ _: e }, n) {
		if (n === "__v_skip") return !0;
		let { ctx: r, setupState: i, data: a, props: o, accessCache: s, type: c, appContext: l } = e;
		if (n[0] !== "$") {
			let e = s[n];
			if (e !== void 0) switch (e) {
				case 1: return i[n];
				case 2: return a[n];
				case 4: return r[n];
				case 3: return o[n];
			}
			else if (Rr(i, n)) return s[n] = 1, i[n];
			else if (a !== t && u(a, n)) return s[n] = 2, a[n];
			else if (u(o, n)) return s[n] = 3, o[n];
			else if (r !== t && u(r, n)) return s[n] = 4, r[n];
			else Gr && (s[n] = 0);
		}
		let d = Lr[n], f, p;
		if (d) return n === "$attrs" && et(e.attrs, "get", ""), d(e);
		if ((f = c.__cssModules) && (f = f[n])) return f;
		if (r !== t && u(r, n)) return s[n] = 4, r[n];
		if (p = l.config.globalProperties, u(p, n)) return p[n];
	},
	set({ _: e }, n, r) {
		let { data: i, setupState: a, ctx: o } = e;
		return Rr(a, n) ? (a[n] = r, !0) : i !== t && u(i, n) ? (i[n] = r, !0) : u(e.props, n) || n[0] === "$" && n.slice(1) in e ? !1 : (o[n] = r, !0);
	},
	has({ _: { data: e, setupState: n, accessCache: r, ctx: i, appContext: a, props: o, type: s } }, c) {
		let l;
		return !!(r[c] || e !== t && c[0] !== "$" && u(e, c) || Rr(n, c) || u(o, c) || u(i, c) || u(Lr, c) || u(a.config.globalProperties, c) || (l = s.__cssModules) && l[c]);
	},
	defineProperty(e, t, n) {
		return n.get == null ? u(n, "value") && this.set(e, t, n.value, null) : e._.accessCache[t] = 0, Reflect.defineProperty(e, t, n);
	}
};
function Br() {
	return Hr("useSlots").slots;
}
function Vr() {
	return Hr("useAttrs").attrs;
}
function Hr(e) {
	let t = Ea();
	return t.setupContext ||= Ra(t);
}
function Ur(e) {
	return d(e) ? e.reduce((e, t) => (e[t] = null, e), {}) : e;
}
function Wr(e, t) {
	return !e || !t ? e || t : d(e) && d(t) ? e.concat(t) : s({}, Ur(e), Ur(t));
}
var Gr = !0;
function Kr(e) {
	let t = Xr(e), n = e.proxy, i = e.ctx;
	Gr = !1, t.beforeCreate && Jr(t.beforeCreate, e, "bc");
	let { data: a, computed: o, methods: s, watch: c, provide: l, inject: u, created: f, beforeMount: p, mounted: m, beforeUpdate: g, updated: _, activated: y, deactivated: b, beforeDestroy: x, beforeUnmount: S, destroyed: C, unmounted: w, render: T, renderTracked: E, renderTriggered: ee, errorCaptured: D, serverPrefetch: te, expose: ne, inheritAttrs: re, components: O, directives: k, filters: ie } = t;
	if (u && qr(u, i, null), s) for (let e in s) {
		let t = s[e];
		h(t) && (i[e] = t.bind(n));
	}
	if (a) {
		let t = a.call(n, n);
		v(t) && (e.data = /* @__PURE__ */ Ft(t));
	}
	if (Gr = !0, o) for (let e in o) {
		let t = o[e], a = W({
			get: h(t) ? t.bind(n, n) : h(t.get) ? t.get.bind(n, n) : r,
			set: !h(t) && h(t.set) ? t.set.bind(n) : r
		});
		Object.defineProperty(i, e, {
			enumerable: !0,
			configurable: !0,
			get: () => a.value,
			set: (e) => a.value = e
		});
	}
	if (c) for (let e in c) Yr(c[e], i, n, e);
	if (l) {
		let e = h(l) ? l.call(n) : l;
		Reflect.ownKeys(e).forEach((t) => {
			Fn(t, e[t]);
		});
	}
	f && Jr(f, e, "c");
	function ae(e, t) {
		d(t) ? t.forEach((t) => e(t.bind(n))) : t && e(t.bind(n));
	}
	if (ae(Sr, p), ae(Cr, m), ae(wr, g), ae(Tr, _), ae(gr, y), ae(_r, b), ae(jr, D), ae(Ar, E), ae(kr, ee), ae(Er, S), ae(Dr, w), ae(Or, te), d(ne)) {
		if (ne.length) {
			let t = e.exposed ||= {};
			ne.forEach((e) => {
				Object.defineProperty(t, e, {
					get: () => n[e],
					set: (t) => n[e] = t,
					enumerable: !0
				});
			});
		} else e.exposed ||= {};
	}
	T && e.render === r && (e.render = T), re != null && (e.inheritAttrs = re), O && (e.components = O), k && (e.directives = k), te && cr(e);
}
function qr(e, t, n = r) {
	d(e) && (e = ti(e));
	for (let n in e) {
		let r = e[n], i;
		i = v(r) ? "default" in r ? In(r.from || n, r.default, !0) : In(r.from || n) : In(r), /* @__PURE__ */ qt(i) ? Object.defineProperty(t, n, {
			enumerable: !0,
			configurable: !0,
			get: () => i.value,
			set: (e) => i.value = e
		}) : t[n] = i;
	}
}
function Jr(e, t, n) {
	dn(d(e) ? e.map((e) => e.bind(t.proxy)) : e.bind(t.proxy), t, n);
}
function Yr(e, t, n, r) {
	let i = r.includes(".") ? Un(n, r) : () => n[r];
	if (g(e)) {
		let n = t[e];
		h(n) && Bn(i, n);
	} else if (h(e)) Bn(i, e.bind(n));
	else if (v(e)) {
		if (d(e)) e.forEach((e) => Yr(e, t, n, r));
		else {
			let r = h(e.handler) ? e.handler.bind(n) : t[e.handler];
			h(r) && Bn(i, r, e);
		}
	}
}
function Xr(e) {
	let t = e.type, { mixins: n, extends: r } = t, { mixins: i, optionsCache: a, config: { optionMergeStrategies: o } } = e.appContext, s = a.get(t), c;
	return s ? c = s : !i.length && !n && !r ? c = t : (c = {}, i.length && i.forEach((e) => Zr(c, e, o, !0)), Zr(c, t, o)), v(t) && a.set(t, c), c;
}
function Zr(e, t, n, r = !1) {
	let { mixins: i, extends: a } = t;
	a && Zr(e, a, n, !0), i && i.forEach((t) => Zr(e, t, n, !0));
	for (let i in t) if (!(r && i === "expose")) {
		let r = Qr[i] || n && n[i];
		e[i] = r ? r(e[i], t[i]) : t[i];
	}
	return e;
}
var Qr = {
	data: $r,
	props: ii,
	emits: ii,
	methods: ri,
	computed: ri,
	beforeCreate: ni,
	created: ni,
	beforeMount: ni,
	mounted: ni,
	beforeUpdate: ni,
	updated: ni,
	beforeDestroy: ni,
	beforeUnmount: ni,
	destroyed: ni,
	unmounted: ni,
	activated: ni,
	deactivated: ni,
	errorCaptured: ni,
	serverPrefetch: ni,
	components: ri,
	directives: ri,
	watch: ai,
	provide: $r,
	inject: ei
};
function $r(e, t) {
	return t ? e ? function() {
		return s(h(e) ? e.call(this, this) : e, h(t) ? t.call(this, this) : t);
	} : t : e;
}
function ei(e, t) {
	return ri(ti(e), ti(t));
}
function ti(e) {
	if (d(e)) {
		let t = {};
		for (let n = 0; n < e.length; n++) t[e[n]] = e[n];
		return t;
	}
	return e;
}
function ni(e, t) {
	return e ? [...new Set([].concat(e, t))] : t;
}
function ri(e, t) {
	return e ? s(/* @__PURE__ */ Object.create(null), e, t) : t;
}
function ii(e, t) {
	return e ? d(e) && d(t) ? [.../* @__PURE__ */ new Set([...e, ...t])] : s(/* @__PURE__ */ Object.create(null), Ur(e), Ur(t ?? {})) : t;
}
function ai(e, t) {
	if (!e) return t;
	if (!t) return e;
	let n = s(/* @__PURE__ */ Object.create(null), e);
	for (let r in t) n[r] = ni(e[r], t[r]);
	return n;
}
function oi() {
	return {
		app: null,
		config: {
			isNativeTag: i,
			performance: !1,
			globalProperties: {},
			optionMergeStrategies: {},
			errorHandler: void 0,
			warnHandler: void 0,
			compilerOptions: {}
		},
		mixins: [],
		components: {},
		directives: {},
		provides: /* @__PURE__ */ Object.create(null),
		optionsCache: /* @__PURE__ */ new WeakMap(),
		propsCache: /* @__PURE__ */ new WeakMap(),
		emitsCache: /* @__PURE__ */ new WeakMap()
	};
}
var si = 0;
function ci(e, t) {
	return function(n, r = null) {
		h(n) || (n = s({}, n)), r != null && !v(r) && (r = null);
		let i = oi(), a = /* @__PURE__ */ new WeakSet(), o = [], c = !1, l = i.app = {
			_uid: si++,
			_component: n,
			_props: r,
			_container: null,
			_context: i,
			_instance: null,
			version: Ha,
			get config() {
				return i.config;
			},
			set config(e) {},
			use(e, ...t) {
				return a.has(e) || (e && h(e.install) ? (a.add(e), e.install(l, ...t)) : h(e) && (a.add(e), e(l, ...t))), l;
			},
			mixin(e) {
				return i.mixins.includes(e) || i.mixins.push(e), l;
			},
			component(e, t) {
				return t ? (i.components[e] = t, l) : i.components[e];
			},
			directive(e, t) {
				return t ? (i.directives[e] = t, l) : i.directives[e];
			},
			mount(a, o, s) {
				if (!c) {
					let u = l._ceVNode || H(n, r);
					return u.appContext = i, s === !0 ? s = "svg" : s === !1 && (s = void 0), o && t ? t(u, a) : e(u, a, s), c = !0, l._container = a, a.__vue_app__ = l, za(u.component);
				}
			},
			onUnmount(e) {
				o.push(e);
			},
			unmount() {
				c && (dn(o, l._instance, 16), e(null, l._container), delete l._container.__vue_app__);
			},
			provide(e, t) {
				return i.provides[e] = t, l;
			},
			runWithContext(e) {
				let t = li;
				li = l;
				try {
					return e();
				} finally {
					li = t;
				}
			}
		};
		return l;
	};
}
var li = null;
function ui(e, n, r = t) {
	let i = Ea(), a = D(n), o = ne(n), s = di(e, a), c = en((s, c) => {
		let l, u = t, d;
		return zn(() => {
			let t = e[a];
			k(l, t) && (l = t, c());
		}), {
			get() {
				return s(), r.get ? r.get(l) : l;
			},
			set(e) {
				let s = r.set ? r.set(e) : e;
				if (!k(s, l) && !(u !== t && k(e, u))) return;
				let f = i.vnode.props, p = !!(f && (n in f || a in f || o in f) && (`onUpdate:${n}` in f || `onUpdate:${a}` in f || `onUpdate:${o}` in f));
				p || (l = e, c()), i.emit(`update:${n}`, s), k(e, u) && (k(e, s) && !k(s, d) || p && u !== t && !k(s, l)) && c(), u = e, d = s;
			}
		};
	});
	return c[Symbol.iterator] = () => {
		let e = 0;
		return { next() {
			return e < 2 ? {
				value: e++ ? s || t : c,
				done: !1
			} : { done: !0 };
		} };
	}, c;
}
var di = (e, t) => t === "modelValue" || t === "model-value" ? e.modelModifiers : e[`${t}Modifiers`] || e[`${D(t)}Modifiers`] || e[`${ne(t)}Modifiers`];
function fi(e, n, ...r) {
	if (e.isUnmounted) return;
	let i = e.vnode.props || t, a = r, o = n.startsWith("update:"), s = o && di(i, n.slice(7));
	s && (s.trim && (a = r.map((e) => g(e) ? e.trim() : e)), s.number && (a = a.map(A)));
	let c, l = i[c = O(n)] || i[c = O(D(n))];
	!l && o && (l = i[c = O(ne(n))]), l && dn(l, e, 6, a);
	let u = i[c + "Once"];
	if (u) {
		if (!e.emitted) e.emitted = {};
		else if (e.emitted[c]) return;
		e.emitted[c] = !0, dn(u, e, 6, a);
	}
}
var pi = /* @__PURE__ */ new WeakMap();
function mi(e, t, n = !1) {
	let r = n ? pi : t.emitsCache, i = r.get(e);
	if (i !== void 0) return i;
	let a = e.emits, o = {}, c = !1;
	if (!h(e)) {
		let r = (e) => {
			let n = mi(e, t, !0);
			n && (c = !0, s(o, n));
		};
		!n && t.mixins.length && t.mixins.forEach(r), e.extends && r(e.extends), e.mixins && e.mixins.forEach(r);
	}
	return !a && !c ? (v(e) && r.set(e, null), null) : (d(a) ? a.forEach((e) => o[e] = null) : s(o, a), v(e) && r.set(e, o), o);
}
function hi(e, t) {
	return !e || !a(t) ? !1 : (t = t.slice(2), t = t === "Once" ? t : t.replace(/Once$/, ""), u(e, t[0].toLowerCase() + t.slice(1)) || u(e, ne(t)) || u(e, t));
}
function gi(e) {
	let { type: t, vnode: n, proxy: r, withProxy: i, propsOptions: [a], slots: s, attrs: c, emit: l, render: u, renderCache: d, props: f, data: p, setupState: m, ctx: h, inheritAttrs: g } = e, _ = Mn(e), v, y;
	try {
		if (n.shapeFlag & 4) {
			let e = i || r, t = e;
			v = _a(u.call(t, e, d, f, m, p, h)), y = c;
		} else {
			let e = t;
			v = _a(e.length > 1 ? e(f, {
				attrs: c,
				slots: s,
				emit: l
			}) : e(f, null)), y = t.props ? c : _i(c);
		}
	} catch (t) {
		ra.length = 0, fn(t, e, 1), v = H(ta);
	}
	let b = v;
	if (y && g !== !1) {
		let e = Object.keys(y), { shapeFlag: t } = b;
		e.length && t & 7 && (a && e.some(o) && (y = vi(y, a)), b = ha(b, y, !1, !0));
	}
	return n.dirs && (b = ha(b, null, !1, !0), b.dirs = b.dirs ? b.dirs.concat(n.dirs) : n.dirs), n.transition && ar(Gn(b.type) && ir(b) || b, n.transition), v = b, Mn(_), v;
}
var _i = (e) => {
	let t;
	for (let n in e) (n === "class" || n === "style" || a(n)) && ((t ||= {})[n] = e[n]);
	return t;
}, vi = (e, t) => {
	let n = {};
	for (let r in e) (!o(r) || !(r.slice(9) in t)) && (n[r] = e[r]);
	return n;
};
function yi(e, t, n) {
	let { props: r, children: i, component: a } = e, { props: o, children: s, patchFlag: c } = t, l = a.emitsOptions;
	if (t.dirs || t.transition) return !0;
	if (n && c >= 0) {
		if (c & 1024) return !0;
		if (c & 16) return r ? bi(r, o, l) : !!o;
		if (c & 8) {
			let e = t.dynamicProps;
			for (let t = 0; t < e.length; t++) {
				let n = e[t];
				if (xi(o, r, n) && !hi(l, n)) return !0;
			}
		}
	} else return (i || s) && (!s || !s.$stable) ? !0 : r === o ? !1 : r ? !o || bi(r, o, l) : !!o;
	return !1;
}
function bi(e, t, n) {
	let r = Object.keys(t);
	if (r.length !== Object.keys(e).length) return !0;
	for (let i = 0; i < r.length; i++) {
		let a = r[i];
		if (xi(t, e, a) && !hi(n, a)) return !0;
	}
	return !1;
}
function xi(e, t, n) {
	let r = e[n], i = t[n];
	return n === "style" && v(r) && v(i) ? !ye(r, i) : r !== i;
}
function Si({ vnode: e, parent: t, suspense: n }, r) {
	for (; t;) {
		let n = t.subTree;
		if (n.suspense && n.suspense.activeBranch === e && (n.suspense.vnode.el = n.el = r, e = n), n === e) (e = t.vnode).el = r, t = t.parent;
		else break;
	}
	n && n.activeBranch === e && (n.vnode.el = r);
}
var Ci = {}, wi = () => Object.create(Ci), Ti = (e) => Object.getPrototypeOf(e) === Ci;
function Ei(e, t, n, r = !1) {
	let i = {}, a = wi();
	e.propsDefaults = /* @__PURE__ */ Object.create(null), Oi(e, t, i, a);
	for (let t in e.propsOptions[0]) t in i || (i[t] = void 0);
	e.props = n ? r ? i : /* @__PURE__ */ It(i) : e.type.props ? i : a, e.attrs = a;
}
function Di(e, t, n, r) {
	let { props: i, attrs: a, vnode: { patchFlag: o } } = e, s = /* @__PURE__ */ Ut(i), [c] = e.propsOptions, l = !1;
	if ((r || o > 0) && !(o & 16)) {
		if (o & 8) {
			let n = e.vnode.dynamicProps;
			for (let r = 0; r < n.length; r++) {
				let o = n[r];
				if (hi(e.emitsOptions, o)) continue;
				let d = t[o];
				if (c) {
					if (u(a, o)) d !== a[o] && (a[o] = d, l = !0);
					else {
						let t = D(o);
						i[t] = ki(c, s, t, d, e, !1);
					}
				} else d !== a[o] && (a[o] = d, l = !0);
			}
		}
	} else {
		Oi(e, t, i, a) && (l = !0);
		let r;
		for (let a in s) (!t || !u(t, a) && ((r = ne(a)) === a || !u(t, r))) && (c ? n && (n[a] !== void 0 || n[r] !== void 0) && (i[a] = ki(c, s, a, void 0, e, !0)) : delete i[a]);
		if (a !== s) for (let e in a) (!t || !u(t, e)) && (delete a[e], l = !0);
	}
	l && tt(e.attrs, "set", "");
}
function Oi(e, n, r, i) {
	let [a, o] = e.propsOptions, s = !1, c;
	if (n) for (let t in n) {
		if (T(t)) continue;
		let l = n[t], d;
		a && u(a, d = D(t)) ? !o || !o.includes(d) ? r[d] = l : (c ||= {})[d] = l : hi(e.emitsOptions, t) || (!(t in i) || l !== i[t]) && (i[t] = l, s = !0);
	}
	if (o) {
		let n = /* @__PURE__ */ Ut(r), i = c || t;
		for (let t = 0; t < o.length; t++) {
			let s = o[t];
			r[s] = ki(a, n, s, i[s], e, !u(i, s));
		}
	}
	return s;
}
function ki(e, t, n, r, i, a) {
	let o = e[n];
	if (o != null) {
		let e = u(o, "default");
		if (e && r === void 0) {
			let e = o.default;
			if (o.type !== Function && !o.skipFactory && h(e)) {
				let { propsDefaults: a } = i;
				if (n in a) r = a[n];
				else {
					let o = ka(i);
					r = a[n] = e.call(null, t), o();
				}
			} else r = e;
			i.ce && i.ce._setProp(n, r);
		}
		o[0] && (a && !e ? r = !1 : o[1] && (r === "" || r === ne(n)) && (r = !0));
	}
	return r;
}
var Ai = /* @__PURE__ */ new WeakMap();
function ji(e, r, i = !1) {
	let a = i ? Ai : r.propsCache, o = a.get(e);
	if (o) return o;
	let c = e.props, l = {}, f = [], p = !1;
	if (!h(e)) {
		let t = (e) => {
			p = !0;
			let [t, n] = ji(e, r, !0);
			s(l, t), n && f.push(...n);
		};
		!i && r.mixins.length && r.mixins.forEach(t), e.extends && t(e.extends), e.mixins && e.mixins.forEach(t);
	}
	if (!c && !p) return v(e) && a.set(e, n), n;
	if (d(c)) for (let e = 0; e < c.length; e++) {
		let n = D(c[e]);
		Mi(n) && (l[n] = t);
	}
	else if (c) for (let e in c) {
		let t = D(e);
		if (Mi(t)) {
			let n = c[e], r = l[t] = d(n) || h(n) ? { type: n } : s({}, n), i = r.type, a = !1, o = !0;
			if (d(i)) for (let e = 0; e < i.length; ++e) {
				let t = i[e], n = h(t) && t.name;
				if (n === "Boolean") {
					a = !0;
					break;
				}
				n === "String" && (o = !1);
			}
			else a = h(i) && i.name === "Boolean";
			r[0] = a, r[1] = o, (a || u(r, "default")) && f.push(t);
		}
	}
	let m = [l, f];
	return v(e) && a.set(e, m), m;
}
function Mi(e) {
	return e[0] !== "$" && !T(e);
}
var Ni = (e) => e === "_" || e === "_ctx" || e === "$stable", Pi = (e) => d(e) ? e.map(_a) : [_a(e)], Fi = (e, t, n) => {
	if (t._n) return t;
	let r = Nn((...e) => Pi(t(...e)), n);
	return r._c = !1, r;
}, Ii = (e, t, n) => {
	let r = e._ctx;
	for (let n in e) {
		if (Ni(n)) continue;
		let i = e[n];
		if (h(i)) t[n] = Fi(n, i, r);
		else if (i != null) {
			let e = Pi(i);
			t[n] = () => e;
		}
	}
}, Li = (e, t) => {
	let n = Pi(t);
	e.slots.default = () => n;
}, Ri = (e, t, n) => {
	for (let r in t) (n || !Ni(r)) && (e[r] = t[r]);
}, zi = (e, t, n) => {
	let r = e.slots = wi();
	if (e.vnode.shapeFlag & 32) {
		let e = t._;
		e ? (Ri(r, t, n), n && ae(r, "_", e, !0)) : Ii(t, r);
	} else t && Li(e, t);
}, Bi = (e, n, r) => {
	let { vnode: i, slots: a } = e, o = !0, s = t;
	if (i.shapeFlag & 32) {
		let e = n._;
		e ? r && e === 1 ? o = !1 : Ri(a, n, r) : (o = !n.$stable, Ii(n, a)), s = n;
	} else n && (Li(e, n), s = { default: 1 });
	if (o) for (let e in a) !Ni(e) && s[e] == null && delete a[e];
}, Vi = $i;
function Hi(e) {
	return Ui(e);
}
function Ui(e, i) {
	let a = ce();
	a.__VUE__ = !0;
	let { insert: o, remove: s, patchProp: c, createElement: l, createText: u, createComment: d, setText: f, setElementText: p, parentNode: m, nextSibling: h, setScopeId: g = r, insertStaticContent: _ } = e, v = (e, t, r, i = null, a = null, o = null, s = void 0, c = null, l = !!t.dynamicChildren) => {
		if (e === t) return;
		e && !ua(e, t) && (i = he(e), de(e, a, o, !0), e = null), t.patchFlag === -2 && (l = !1, t.dynamicChildren = null), t.dynamicChildren && e && e.dynamicChildren && e.dynamicChildren.hasOnce && (t.dynamicChildren === n && (t.dynamicChildren = []), t.dynamicChildren.hasOnce = !0);
		let { type: u, ref: d, shapeFlag: f } = t;
		switch (u) {
			case ea:
				y(e, t, r, i);
				break;
			case ta:
				b(e, t, r, i);
				break;
			case na:
				e ?? x(t, r, i, s);
				break;
			case L:
				O(e, t, r, i, a, o, s, c, l);
				break;
			default: f & 1 ? w(e, t, r, i, a, o, s, c, l) : f & 6 ? k(e, t, r, i, a, o, s, c, l) : (f & 64 || f & 128) && u.process(e, t, r, i, a, o, s, c, l, ve);
		}
		d != null && a ? fr(d, e && e.ref, o, t || e, !t) : d == null && e && e.ref != null && fr(e.ref, null, o, e, !0);
	}, y = (e, t, n, r) => {
		if (e == null) o(t.el = u(t.children), n, r);
		else {
			let n = t.el = e.el;
			t.children !== e.children && f(n, t.children);
		}
	}, b = (e, t, n, r) => {
		e == null ? o(t.el = d(t.children || ""), n, r) : t.el = e.el;
	}, x = (e, t, n, r) => {
		[e.el, e.anchor] = _(e.children, t, n, r, e.el, e.anchor);
	}, S = ({ el: e, anchor: t }, n, r) => {
		let i;
		for (; e && e !== t;) i = h(e), o(e, n, r), e = i;
		o(t, n, r);
	}, C = ({ el: e, anchor: t }) => {
		let n;
		for (; e && e !== t;) n = h(e), s(e), e = n;
		s(t);
	}, w = (e, t, n, r, i, a, o, s, c) => {
		if (t.type === "svg" ? o = "svg" : t.type === "math" && (o = "mathml"), e == null) E(t, n, r, i, a, o, s, c);
		else {
			let n = e.el && e.el._isVueCE ? e.el : null;
			try {
				n && n._beginPatch(), te(e, t, i, a, o, s, c);
			} finally {
				n && n._endPatch();
			}
		}
	}, E = (e, t, n, r, i, a, s, u) => {
		let d, f, { props: m, shapeFlag: h, transition: g, dirs: _ } = e;
		if (d = e.el = l(e.type, a, m && m.is, m), h & 8 ? p(d, e.children) : h & 16 && D(e.children, d, null, r, i, Wi(e, a), s, u), _ && Pn(e, null, r, "created"), ee(d, e, e.scopeId, s, r), m) {
			for (let e in m) e !== "value" && !T(e) && c(d, e, null, m[e], a, r);
			"value" in m && c(d, "value", null, m.value, a), (f = m.onVnodeBeforeMount) && xa(f, r, e);
		}
		_ && Pn(e, null, r, "beforeMount");
		let v = Ki(i, g);
		v && g.beforeEnter(d), o(d, t, n), ((f = m && m.onVnodeMounted) || v || _) && Vi(() => {
			try {
				f && xa(f, r, e), v && g.enter(d), _ && Pn(e, null, r, "mounted");
			} finally {}
		}, i);
	}, ee = (e, t, n, r, i) => {
		if (n && g(e, n), r) for (let t = 0; t < r.length; t++) g(e, r[t]);
		if (i) {
			let n = i.subTree;
			if (t === n || Qi(n.type) && (n.ssContent === t || n.ssFallback === t)) {
				let t = i.vnode;
				ee(e, t, t.scopeId, t.slotScopeIds, i.parent);
			}
		}
	}, D = (e, t, n, r, i, a, o, s, c = 0) => {
		for (let l = c; l < e.length; l++) {
			let c = e[l] = s ? va(e[l]) : _a(e[l]);
			v(null, c, t, n, r, i, a, o, s);
		}
	}, te = (e, n, r, i, a, o, s) => {
		let l = n.el = e.el, { patchFlag: u, dynamicChildren: d, dirs: f } = n;
		u |= e.patchFlag & 16;
		let m = e.props || t, h = n.props || t, g;
		if (r && Gi(r, !1), (g = h.onVnodeBeforeUpdate) && xa(g, r, n, e), f && Pn(n, e, r, "beforeUpdate"), r && Gi(r, !0), d && (!e.dynamicChildren || e.dynamicChildren.length !== d.length) && (u = 0, s = !1, d = null), (m.innerHTML && h.innerHTML == null || m.textContent && h.textContent == null) && p(l, ""), d ? ne(e.dynamicChildren, d, l, r, i, Wi(n, a), o) : s || j(e, n, l, null, r, i, Wi(n, a), o, !1), u > 0) {
			if (u & 16) re(l, m, h, r, a);
			else if (u & 2 && m.class !== h.class && c(l, "class", null, h.class, a), u & 4 && c(l, "style", m.style, h.style, a), u & 8) {
				let e = n.dynamicProps;
				for (let t = 0; t < e.length; t++) {
					let n = e[t], i = m[n], o = h[n];
					(o !== i || n === "value") && c(l, n, i, o, a, r);
				}
			}
			u & 1 && e.children !== n.children && p(l, n.children);
		} else !s && d == null && re(l, m, h, r, a);
		((g = h.onVnodeUpdated) || f) && Vi(() => {
			g && xa(g, r, n, e), f && Pn(n, e, r, "updated");
		}, i);
	}, ne = (e, t, n, r, i, a, o) => {
		for (let s = 0; s < t.length; s++) {
			let c = e[s], l = t[s], u = c.el && (c.type === L || !ua(c, l) || c.shapeFlag & 198) ? m(c.el) : n;
			v(c, l, u, null, r, i, a, o, !0);
		}
	}, re = (e, n, r, i, a) => {
		if (n !== r) {
			if (n !== t) for (let t in n) !T(t) && !(t in r) && c(e, t, n[t], null, a, i);
			for (let t in r) {
				if (T(t)) continue;
				let o = r[t], s = n[t];
				o !== s && t !== "value" && c(e, t, s, o, a, i);
			}
			"value" in r && c(e, "value", n.value, r.value, a);
		}
	}, O = (e, t, n, r, i, a, s, c, l) => {
		let d = t.el = e ? e.el : u(""), f = t.anchor = e ? e.anchor : u(""), { patchFlag: p, dynamicChildren: m, slotScopeIds: h } = t;
		h && (c = c ? c.concat(h) : h), e == null ? (o(d, n, r), o(f, n, r), D(t.children || [], n, f, i, a, s, c, l)) : p > 0 && p & 64 && m && e.dynamicChildren && e.dynamicChildren.length === m.length ? (ne(e.dynamicChildren, m, n, i, a, s, c), (t.key != null || i && t === i.subTree) && qi(e, t, !0)) : j(e, t, n, f, i, a, s, c, l);
	}, k = (e, t, n, r, i, a, o, s, c) => {
		t.slotScopeIds = s, e == null ? t.shapeFlag & 512 ? i.ctx.activate(t, n, r, o, c) : ae(t, n, r, i, a, o, c) : A(e, t, c);
	}, ae = (e, t, n, r, i, a, o) => {
		let s = e.component = wa(e, r, i);
		if (hr(e) && (s.ctx.renderer = ve), Na(s, !1, o), s.asyncDep) {
			if (i && i.registerDep(s, oe, o), !e.el) {
				let r = s.subTree = H(ta);
				b(null, r, t, n), e.placeholder = r.el;
			}
		} else oe(s, e, t, n, i, a, o);
	}, A = (e, t, n) => {
		let r = t.component = e.component;
		if (yi(e, t, n)) {
			if (r.asyncDep && !r.asyncResolved) {
				t.el = e.el, se(r, t, n);
				return;
			}
			r.next = t, r.update();
		} else t.el = e.el, r.vnode = t;
	}, oe = (e, t, n, r, i, a, o) => {
		let s = () => {
			if (e.isMounted) {
				let { next: t, bu: n, u: r, parent: s, vnode: c } = e;
				{
					let n = Yi(e);
					if (n) {
						t && (t.el = c.el, se(e, t, o)), n.asyncDep.then(() => {
							Vi(() => {
								e.isUnmounted || l();
							}, i);
						});
						return;
					}
				}
				let u = t, d;
				Gi(e, !1), t ? (t.el = c.el, se(e, t, o)) : t = c, n && ie(n), (d = t.props && t.props.onVnodeBeforeUpdate) && xa(d, s, t, c), Gi(e, !0);
				let f = gi(e), p = e.subTree;
				e.subTree = f, v(p, f, m(p.el), he(p), e, i, a), t.el = f.el, u === null && Si(e, f.el), r && Vi(r, i), (d = t.props && t.props.onVnodeUpdated) && Vi(() => xa(d, s, t, c), i);
			} else {
				let o, { el: s, props: c } = t, { bm: l, m: u, parent: d, root: f, type: p } = e, m = mr(t);
				if (Gi(e, !1), l && ie(l), !m && (o = c && c.onVnodeBeforeMount) && xa(o, d, t), Gi(e, !0), s && be) {
					let t = () => {
						e.subTree = gi(e), be(s, e.subTree, e, i, null);
					};
					m && p.__asyncHydrate ? p.__asyncHydrate(s, e, t) : t();
				} else {
					f.ce && f.ce._hasShadowRoot() && f.ce._injectChildStyle(p, e.parent ? e.parent.type : void 0);
					let o = e.subTree = gi(e);
					v(null, o, n, r, e, i, a), t.el = o.el;
				}
				if (u && Vi(u, i), !m && (o = c && c.onVnodeMounted)) {
					let e = t;
					Vi(() => xa(o, d, e), i);
				}
				(t.shapeFlag & 256 || d && mr(d.vnode) && d.vnode.shapeFlag & 256) && e.a && Vi(e.a, i), e.isMounted = !0, t = n = r = null;
			}
		};
		e.scope.on();
		let c = e.effect = new Oe(s);
		e.scope.off();
		let l = e.update = c.run.bind(c), u = e.job = c.runIfDirty.bind(c);
		u.i = e, u.id = e.uid, c.scheduler = () => Cn(u), Gi(e, !0), l();
	}, se = (e, t, n) => {
		t.component = e;
		let r = e.vnode.props;
		e.vnode = t, e.next = null, Di(e, t.props, r, n), Bi(e, t.children, n), Ue(), En(e), We();
	}, j = (e, t, n, r, i, a, o, s, c = !1) => {
		let l = e && e.children, u = e ? e.shapeFlag : 0, d = t.children, { patchFlag: f, shapeFlag: m } = t;
		if (f > 0) {
			if (f & 128) {
				ue(l, d, n, r, i, a, o, s, c);
				return;
			}
			if (f & 256) {
				le(l, d, n, r, i, a, o, s, c);
				return;
			}
		}
		m & 8 ? (u & 16 && me(l, i, a), d !== l && p(n, d)) : u & 16 ? m & 16 ? ue(l, d, n, r, i, a, o, s, c) : me(l, i, a, !0) : (u & 8 && p(n, ""), m & 16 && D(d, n, r, i, a, o, s, c));
	}, le = (e, t, r, i, a, o, s, c, l) => {
		e ||= n, t ||= n;
		let u = e.length, d = t.length, f = Math.min(u, d), p = 0;
		for (; p < f; p++) {
			let n = t[p] = l ? va(t[p]) : _a(t[p]);
			v(e[p], n, r, null, a, o, s, c, l);
		}
		u > d ? me(e, a, o, !0, !1, f) : D(t, r, i, a, o, s, c, l, f);
	}, ue = (e, t, r, i, a, o, s, c, l) => {
		let u = 0, d = t.length, f = e.length - 1, p = d - 1;
		for (; u <= f && u <= p;) {
			let n = e[u], i = t[u] = l ? va(t[u]) : _a(t[u]);
			if (ua(n, i)) v(n, i, r, null, a, o, s, c, l);
			else break;
			u++;
		}
		for (; u <= f && u <= p;) {
			let n = e[f], i = t[p] = l ? va(t[p]) : _a(t[p]);
			if (ua(n, i)) v(n, i, r, null, a, o, s, c, l);
			else break;
			f--, p--;
		}
		if (u > f) {
			if (u <= p) {
				let e = p + 1, n = e < d ? t[e].el : i;
				for (; u <= p;) v(null, t[u] = l ? va(t[u]) : _a(t[u]), r, n, a, o, s, c, l), u++;
			}
		} else if (u > p) for (; u <= f;) de(e[u], a, o, !0), u++;
		else {
			let m = u, h = u, g = /* @__PURE__ */ new Map();
			for (u = h; u <= p; u++) {
				let e = t[u] = l ? va(t[u]) : _a(t[u]);
				e.key != null && g.set(e.key, u);
			}
			let _, y = 0, b = p - h + 1, x = !1, S = 0, C = Array(b);
			for (u = 0; u < b; u++) C[u] = 0;
			for (u = m; u <= f; u++) {
				let n = e[u];
				if (y >= b) {
					de(n, a, o, !0);
					continue;
				}
				let i;
				if (n.key != null) i = g.get(n.key);
				else for (_ = h; _ <= p; _++) if (C[_ - h] === 0 && ua(n, t[_])) {
					i = _;
					break;
				}
				i === void 0 ? de(n, a, o, !0) : (C[i - h] = u + 1, i >= S ? S = i : x = !0, v(n, t[i], r, null, a, o, s, c, l), y++);
			}
			let w = x ? Ji(C) : n;
			for (_ = w.length - 1, u = b - 1; u >= 0; u--) {
				let e = h + u, n = t[e], f = t[e + 1], p = e + 1 < d ? f.el || Zi(f) : i;
				C[u] === 0 ? v(null, n, r, p, a, o, s, c, l) : x && (_ < 0 || u !== w[_] ? M(n, r, p, 2) : _--);
			}
		}
	}, M = (e, t, n, r, i = null) => {
		let { el: a, type: c, transition: l, children: u, shapeFlag: d } = e;
		if (d & 6) M(e.component.subTree, t, n, r);
		else if (d & 128) e.suspense.move(t, n, r);
		else if (d & 64) c.move(e, t, n, ve);
		else if (c === L) {
			o(a, t, n);
			for (let e = 0; e < u.length; e++) M(u[e], t, n, r);
			o(e.anchor, t, n);
		} else if (c === na) S(e, t, n);
		else if (r !== 2 && d & 1 && l) {
			if (r === 0) l.persisted && !a[Kn] ? o(a, t, n) : (l.beforeEnter(a), o(a, t, n), Vi(() => l.enter(a), i));
			else {
				let { leave: r, delayLeave: i, afterLeave: c } = l, u = () => {
					e.ctx.isUnmounted ? s(a) : o(a, t, n);
				}, d = () => {
					let e = a._isLeaving || !!a[Kn];
					a._isLeaving && a[Kn](!0), l.persisted && !e ? u() : r(a, () => {
						u(), c && c();
					});
				};
				i ? i(a, u, d) : d();
			}
		} else o(a, t, n);
	}, de = (e, t, n, r = !1, i = !1) => {
		let { type: a, props: o, ref: s, children: c, dynamicChildren: l, shapeFlag: u, patchFlag: d, dirs: f, cacheIndex: p, memo: m } = e;
		if ((d === -2 || l && l.hasOnce) && (i = !1), s != null && (Ue(), fr(s, null, n, e, !0), We()), p != null && (!e.ctx || e.ctx === t) && (t.renderCache[p] = void 0), u & 256) {
			t.ctx.deactivate(e);
			return;
		}
		let h = u & 1 && f, g = !mr(e), _;
		if (g && (_ = o && o.onVnodeBeforeUnmount) && xa(_, t, e), u & 6) pe(e.component, n, r);
		else {
			if (u & 128) {
				e.suspense.unmount(n, r);
				return;
			}
			h && Pn(e, null, t, "beforeUnmount"), u & 64 ? e.type.remove(e, t, n, ve, r) : l && !l.hasOnce && (a !== L || d > 0 && d & 64) ? me(l, t, n, !1, !0) : (a === L && d & 384 || !i && u & 16) && me(c, t, n), r && N(e);
		}
		let v = m != null && p == null;
		(g && (_ = o && o.onVnodeUnmounted) || h || v) && Vi(() => {
			_ && xa(_, t, e), h && Pn(e, null, t, "unmounted"), v && (e.el = null);
		}, n);
	}, N = (e) => {
		let { type: t, el: n, anchor: r, transition: i } = e;
		if (t === L) {
			fe(n, r);
			return;
		}
		if (t === na) {
			C(e), i && !i.persisted && i.afterLeave && i.afterLeave();
			return;
		}
		let a = () => {
			s(n), i && !i.persisted && i.afterLeave && i.afterLeave();
		};
		if (e.shapeFlag & 1 && i && !i.persisted) {
			let { leave: t, delayLeave: r } = i, o = () => t(n, a);
			r ? r(e.el, a, o) : o();
		} else a();
	}, fe = (e, t) => {
		let n;
		for (; e !== t;) n = h(e), s(e), e = n;
		s(t);
	}, pe = (e, t, n) => {
		let { bum: r, scope: i, job: a, subTree: o, um: s, m: c, a: l } = e;
		Xi(c), Xi(l), r && ie(r), i.stop(), a ? (a.flags |= 8, de(o, e, t, n)) : e.vnode.el && o && (o.transition = e.vnode.transition, de(o, e, t, n)), s && Vi(s, t), Vi(() => {
			e.isUnmounted = !0;
		}, t);
	}, me = (e, t, n, r = !1, i = !1, a = 0) => {
		for (let o = a; o < e.length; o++) de(e[o], t, n, r, i);
	}, he = (e) => {
		if (e.shapeFlag & 6) return he(e.component.subTree);
		if (e.shapeFlag & 128) return e.suspense.next();
		let t = h(e.anchor || e.el), n = t && t[Wn];
		return n ? h(n) : t;
	}, ge = !1, _e = (e, t, n) => {
		let r;
		e == null ? t._vnode && (de(t._vnode, null, null, !0), r = t._vnode.component) : v(t._vnode || null, e, t, null, null, null, n), t._vnode = e, ge ||= (ge = !0, En(r), Dn(), !1);
	}, ve = {
		p: v,
		um: de,
		m: M,
		r: N,
		mt: ae,
		mc: D,
		pc: j,
		pbc: ne,
		n: he,
		o: e
	}, ye, be;
	return i && ([ye, be] = i(ve)), {
		render: _e,
		hydrate: ye,
		createApp: ci(_e, ye)
	};
}
function Wi({ type: e, props: t }, n) {
	return n === "svg" && e === "foreignObject" || n === "mathml" && e === "annotation-xml" && t && t.encoding && t.encoding.includes("html") ? void 0 : n;
}
function Gi({ effect: e, job: t }, n) {
	n ? (e.flags |= 32, t.flags |= 4) : (e.flags &= -33, t.flags &= -5);
}
function Ki(e, t) {
	return (!e || e && !e.pendingBranch) && t && !t.persisted;
}
function qi(e, t, n = !1) {
	let r = e.children, i = t.children;
	if (d(r) && d(i)) for (let e = 0; e < r.length; e++) {
		let t = r[e], a = i[e];
		a.shapeFlag & 1 && !a.dynamicChildren && ((a.patchFlag <= 0 || a.patchFlag === 32) && (a = i[e] = va(i[e]), a.el = t.el), !n && a.patchFlag !== -2 && qi(t, a)), a.type === ea && (a.patchFlag === -1 && (a = i[e] = va(a)), a.el = t.el), a.type === ta && !a.el && (a.el = t.el);
	}
}
function Ji(e) {
	let t = e.slice(), n = [0], r, i, a, o, s, c = e.length;
	for (r = 0; r < c; r++) {
		let c = e[r];
		if (c !== 0) {
			if (i = n[n.length - 1], e[i] < c) {
				t[r] = i, n.push(r);
				continue;
			}
			for (a = 0, o = n.length - 1; a < o;) s = a + o >> 1, e[n[s]] < c ? a = s + 1 : o = s;
			c < e[n[a]] && (a > 0 && (t[r] = n[a - 1]), n[a] = r);
		}
	}
	for (a = n.length, o = n[a - 1]; a-- > 0;) n[a] = o, o = t[o];
	return n;
}
function Yi(e) {
	let t = e.subTree.component;
	if (t) return t.asyncDep && !t.asyncResolved ? t : Yi(t);
}
function Xi(e) {
	if (e) for (let t = 0; t < e.length; t++) e[t].flags |= 8;
}
function Zi(e) {
	if (e.placeholder) return e.placeholder;
	let t = e.component;
	return t ? Zi(t.subTree) : null;
}
var Qi = (e) => e.__isSuspense;
function $i(e, t) {
	t && t.pendingBranch ? d(e) ? t.effects.push(...e) : t.effects.push(e) : Tn(e);
}
var L = /* @__PURE__ */ Symbol.for("v-fgt"), ea = /* @__PURE__ */ Symbol.for("v-txt"), ta = /* @__PURE__ */ Symbol.for("v-cmt"), na = /* @__PURE__ */ Symbol.for("v-stc"), ra = [], ia = null;
function R(e = !1) {
	ra.push(ia = e ? null : []);
}
function aa() {
	ra.pop(), ia = ra[ra.length - 1] || null;
}
var oa = 1;
function sa(e, t = !1) {
	oa += e, e < 0 && ia && t && (ia.hasOnce = !0);
}
function ca(e) {
	return e.dynamicChildren = oa > 0 ? ia || n : null, aa(), oa > 0 && ia && ia.push(e), e;
}
function z(e, t, n, r, i, a) {
	return ca(V(e, t, n, r, i, a, !0));
}
function B(e, t, n, r, i) {
	return ca(H(e, t, n, r, i, !0));
}
function la(e) {
	return e ? e.__v_isVNode === !0 : !1;
}
function ua(e, t) {
	return e.type === t.type && e.key === t.key;
}
var da = ({ key: e }) => e ?? null, fa = ({ ref: e, ref_key: t, ref_for: n }) => (typeof e == "number" && (e = "" + e), e == null ? null : g(e) || /* @__PURE__ */ qt(e) || h(e) ? {
	i: An,
	r: e,
	k: t,
	f: !!n
} : e);
function V(e, t = null, n = null, r = 0, i = null, a = e === L ? 0 : 1, o = !1, s = !1) {
	let c = {
		__v_isVNode: !0,
		__v_skip: !0,
		type: e,
		props: t,
		key: t && da(t),
		ref: t && fa(t),
		scopeId: jn,
		slotScopeIds: null,
		children: n,
		component: null,
		suspense: null,
		ssContent: null,
		ssFallback: null,
		dirs: null,
		transition: null,
		el: null,
		anchor: null,
		target: null,
		targetStart: null,
		targetAnchor: null,
		staticCount: 0,
		shapeFlag: a,
		patchFlag: r,
		dynamicProps: i,
		dynamicChildren: null,
		appContext: null,
		ctx: An
	};
	return s ? (ya(c, n), a & 128 && e.normalize(c)) : n && (c.shapeFlag |= g(n) ? 8 : 16), oa > 0 && !o && ia && (c.patchFlag > 0 || a & 6) && c.patchFlag !== 32 && ia.push(c), c;
}
var H = pa;
function pa(e, t = null, n = null, r = 0, i = null, a = !1) {
	if ((!e || e === Mr) && (e = ta), la(e)) {
		let r = ha(e, t, !0);
		return n && ya(r, n), oa > 0 && !a && ia && (r.shapeFlag & 6 ? ia[ia.indexOf(e)] = r : ia.push(r)), r.patchFlag = -2, r;
	}
	if (Ba(e) && (e = e.__vccOpts), t) {
		t = ma(t);
		let { class: e, style: n } = t;
		e && !g(e) && (t.class = N(e)), v(n) && (/* @__PURE__ */ Ht(n) && !d(n) && (n = s({}, n)), t.style = j(n));
	}
	let o = g(e) ? 1 : Qi(e) ? 128 : Gn(e) ? 64 : v(e) ? 4 : h(e) ? 2 : 0;
	return V(e, t, n, r, i, o, a, !0);
}
function ma(e) {
	return e ? /* @__PURE__ */ Ht(e) || Ti(e) ? s({}, e) : e : null;
}
function ha(e, t, n = !1, r = !1) {
	let { props: i, ref: a, patchFlag: o, children: s, transition: c } = e, l = t ? ba(i || {}, t) : i, u = {
		__v_isVNode: !0,
		__v_skip: !0,
		type: e.type,
		props: l,
		key: l && da(l),
		ref: t && t.ref ? n && a ? d(a) ? a.concat(fa(t)) : [a, fa(t)] : fa(t) : a,
		scopeId: e.scopeId,
		slotScopeIds: e.slotScopeIds,
		children: s,
		target: e.target,
		targetStart: e.targetStart,
		targetAnchor: e.targetAnchor,
		staticCount: e.staticCount,
		shapeFlag: e.shapeFlag,
		patchFlag: t && e.type !== L ? o === -1 ? 16 : o | 16 : o,
		dynamicProps: e.dynamicProps,
		dynamicChildren: e.dynamicChildren,
		appContext: e.appContext,
		dirs: e.dirs,
		transition: c,
		component: e.component,
		suspense: e.suspense,
		ssContent: e.ssContent && ha(e.ssContent),
		ssFallback: e.ssFallback && ha(e.ssFallback),
		placeholder: e.placeholder,
		el: e.el,
		anchor: e.anchor,
		ctx: e.ctx,
		ce: e.ce,
		cacheIndex: e.cacheIndex
	};
	return c && r && ar(u, c.clone(u)), u;
}
function ga(e = " ", t = 0) {
	return H(ea, null, e, t);
}
function U(e = "", t = !1) {
	return t ? (R(), B(ta, null, e)) : H(ta, null, e);
}
function _a(e) {
	return e == null || typeof e == "boolean" ? H(ta) : d(e) ? H(L, null, e.slice()) : la(e) ? va(e) : H(ea, null, String(e));
}
function va(e) {
	return e.el === null && e.patchFlag !== -1 || e.memo ? e : ha(e);
}
function ya(e, t) {
	let n = 0, { shapeFlag: r } = e;
	if (t == null) t = null;
	else if (d(t)) n = 16;
	else if (typeof t == "object") {
		if (r & 65) {
			let n = t.default;
			n && (n._c && (n._d = !1), ya(e, n()), n._c && (n._d = !0));
			return;
		}
		{
			n = 32;
			let r = t._;
			!r && !Ti(t) ? t._ctx = An : r === 3 && An && (An.slots._ === 1 ? t._ = 1 : (t._ = 2, e.patchFlag |= 1024));
		}
	} else if (h(t)) {
		if (r & 65) {
			ya(e, { default: t });
			return;
		}
		t = {
			default: t,
			_ctx: An
		}, n = 32;
	} else t = String(t), r & 64 ? (n = 16, t = [ga(t)]) : n = 8;
	e.children = t, e.shapeFlag |= n;
}
function ba(...e) {
	let t = {};
	for (let n = 0; n < e.length; n++) {
		let r = e[n];
		for (let e in r) if (e === "class") t.class !== r.class && (t.class = N([t.class, r.class]));
		else if (e === "style") t.style = j([t.style, r.style]);
		else if (a(e)) {
			let n = t[e], i = r[e];
			i && n !== i && !(d(n) && n.includes(i)) ? t[e] = n ? [].concat(n, i) : i : i == null && n == null && !o(e) && (t[e] = i);
		} else e !== "" && (t[e] = r[e]);
	}
	return t;
}
function xa(e, t, n, r = null) {
	dn(e, t, 7, [n, r]);
}
var Sa = oi(), Ca = 0;
function wa(e, n, r) {
	let i = e.type, a = (n ? n.appContext : e.appContext) || Sa, o = {
		uid: Ca++,
		vnode: e,
		type: i,
		parent: n,
		appContext: a,
		root: null,
		next: null,
		subTree: null,
		effect: null,
		update: null,
		job: null,
		scope: new we(!0),
		render: null,
		proxy: null,
		exposed: null,
		exposeProxy: null,
		withProxy: null,
		provides: n ? n.provides : Object.create(a.provides),
		ids: n ? n.ids : [
			"",
			0,
			0
		],
		accessCache: null,
		renderCache: [],
		components: null,
		directives: null,
		propsOptions: ji(i, a),
		emitsOptions: mi(i, a),
		emit: null,
		emitted: null,
		propsDefaults: t,
		inheritAttrs: i.inheritAttrs,
		ctx: t,
		data: t,
		props: t,
		attrs: t,
		slots: t,
		refs: t,
		setupState: t,
		setupContext: null,
		suspense: r,
		suspenseId: r ? r.pendingId : 0,
		asyncDep: null,
		asyncResolved: !1,
		isMounted: !1,
		isUnmounted: !1,
		isDeactivated: !1,
		bc: null,
		c: null,
		bm: null,
		m: null,
		bu: null,
		u: null,
		um: null,
		bum: null,
		da: null,
		a: null,
		rtg: null,
		rtc: null,
		ec: null,
		sp: null
	};
	return o.ctx = { _: o }, o.root = n ? n.root : o, o.emit = fi.bind(null, o), e.ce && e.ce(o), o;
}
var Ta = null, Ea = () => Ta || An, Da, Oa;
{
	let e = ce(), t = (t, n) => {
		let r;
		return (r = e[t]) || (r = e[t] = []), r.push(n), (e) => {
			r.length > 1 ? r.forEach((t) => t(e)) : r[0](e);
		};
	};
	Da = t("__VUE_INSTANCE_SETTERS__", (e) => Ta = e), Oa = t("__VUE_SSR_SETTERS__", (e) => Ma = e);
}
var ka = (e) => {
	let t = Ta;
	return Da(e), e.scope.on(), () => {
		e.scope.off(), Da(t);
	};
}, Aa = () => {
	Ta && Ta.scope.off(), Da(null);
};
function ja(e) {
	return e.vnode.shapeFlag & 4;
}
var Ma = !1;
function Na(e, t = !1, n = !1) {
	t && Oa(t);
	let { props: r, children: i } = e.vnode, a = ja(e);
	Ei(e, r, a, t), zi(e, i, n || t);
	let o = a ? Pa(e, t) : void 0;
	return t && Oa(!1), o;
}
function Pa(e, t) {
	let n = e.type;
	e.accessCache = /* @__PURE__ */ Object.create(null), e.proxy = new Proxy(e.ctx, zr);
	let { setup: r } = n;
	if (r) {
		Ue();
		let n = e.setupContext = r.length > 1 ? Ra(e) : null, i = ka(e), a = un(r, e, 0, [e.props, n]), o = y(a);
		if (We(), i(), (o || e.sp) && !mr(e) && cr(e), o) {
			if (a.then(Aa, Aa), t) return a.then((n) => {
				Oa(!0);
				try {
					Fa(e, n, t);
				} finally {
					Oa(!1);
				}
			}).catch((t) => {
				fn(t, e, 0);
			});
			e.asyncDep = a;
		} else Fa(e, a, t);
	} else Ia(e, t);
}
function Fa(e, t, n) {
	h(t) ? e.type.__ssrInlineRender ? e.ssrRender = t : e.render = t : v(t) && (e.setupState = Qt(t)), Ia(e, n);
}
function Ia(e, t, n) {
	let i = e.type;
	e.render ||= i.render || r;
	{
		let t = ka(e);
		Ue();
		try {
			Kr(e);
		} finally {
			We(), t();
		}
	}
}
var La = { get(e, t) {
	return et(e, "get", ""), e[t];
} };
function Ra(e) {
	return {
		attrs: new Proxy(e.attrs, La),
		slots: e.slots,
		emit: e.emit,
		expose: (t) => {
			e.exposed = t || {};
		}
	};
}
function za(e) {
	return e.exposed ? e.exposeProxy ||= new Proxy(Qt(Wt(e.exposed)), {
		get(t, n) {
			if (n in t) return t[n];
			if (n in Lr) return Lr[n](e);
		},
		has(e, t) {
			return t in e || t in Lr;
		}
	}) : e.proxy;
}
function Ba(e) {
	return h(e) && "__vccOpts" in e;
}
var W = (e, t) => /* @__PURE__ */ nn(e, t, Ma);
function Va(e, t, n) {
	try {
		sa(-1);
		let r = arguments.length;
		return r === 2 ? v(t) && !d(t) ? la(t) ? H(e, null, [t]) : H(e, t) : H(e, null, t) : (r > 3 ? n = Array.prototype.slice.call(arguments, 2) : r === 3 && la(n) && (n = [n]), H(e, t, n));
	} finally {
		sa(1);
	}
}
var Ha = "3.5.43", Ua = void 0, Wa = typeof window < "u" && window.trustedTypes;
if (Wa) try {
	Ua = /* @__PURE__ */ Wa.createPolicy("vue", { createHTML: (e) => e });
} catch {}
var Ga = Ua ? (e) => Ua.createHTML(e) : (e) => e, Ka = "http://www.w3.org/2000/svg", qa = "http://www.w3.org/1998/Math/MathML", Ja = typeof document < "u" ? document : null, Ya = Ja && /* @__PURE__ */ Ja.createElement("template"), Xa = {
	insert: (e, t, n) => {
		t.insertBefore(e, n || null);
	},
	remove: (e) => {
		let t = e.parentNode;
		t && t.removeChild(e);
	},
	createElement: (e, t, n, r) => {
		let i = t === "svg" ? Ja.createElementNS(Ka, e) : t === "mathml" ? Ja.createElementNS(qa, e) : n ? Ja.createElement(e, { is: n }) : Ja.createElement(e);
		return e === "select" && r && r.multiple != null && i.setAttribute("multiple", r.multiple), i;
	},
	createText: (e) => Ja.createTextNode(e),
	createComment: (e) => Ja.createComment(e),
	setText: (e, t) => {
		e.nodeValue = t;
	},
	setElementText: (e, t) => {
		e.textContent = t;
	},
	parentNode: (e) => e.parentNode,
	nextSibling: (e) => e.nextSibling,
	querySelector: (e) => Ja.querySelector(e),
	setScopeId(e, t) {
		e.setAttribute(t, "");
	},
	insertStaticContent(e, t, n, r, i, a) {
		let o = n ? n.previousSibling : t.lastChild;
		if (i && (i === a || i.nextSibling)) for (; t.insertBefore(i.cloneNode(!0), n), i !== a && (i = i.nextSibling););
		else {
			Ya.innerHTML = Ga(r === "svg" ? `<svg>${e}</svg>` : r === "mathml" ? `<math>${e}</math>` : e);
			let i = Ya.content;
			if (r === "svg" || r === "mathml") {
				let e = i.firstChild;
				for (; e.firstChild;) i.appendChild(e.firstChild);
				i.removeChild(e);
			}
			t.insertBefore(i, n);
		}
		return [o ? o.nextSibling : t.firstChild, n ? n.previousSibling : t.lastChild];
	}
}, Za = "transition", Qa = "animation", $a = /* @__PURE__ */ Symbol("_vtc"), eo = {
	name: String,
	type: String,
	css: {
		type: Boolean,
		default: !0
	},
	duration: [
		String,
		Number,
		Object
	],
	enterFromClass: String,
	enterActiveClass: String,
	enterToClass: String,
	appearFromClass: String,
	appearActiveClass: String,
	appearToClass: String,
	leaveFromClass: String,
	leaveActiveClass: String,
	leaveToClass: String
}, to = /* @__PURE__ */ s({}, Xn, eo), no = /* @__PURE__ */ ((e) => (e.displayName = "Transition", e.props = to, e))((e, { slots: t }) => Va(er, ao(e), t)), ro = (e, t = []) => {
	d(e) ? e.forEach((e) => e(...t)) : e && e(...t);
}, io = (e) => e ? d(e) ? e.some((e) => e.length > 1) : e.length > 1 : !1;
function ao(e) {
	let t = {};
	for (let n in e) n in eo || (t[n] = e[n]);
	if (e.css === !1) return t;
	let { name: n = "v", type: r, duration: i, enterFromClass: a = `${n}-enter-from`, enterActiveClass: o = `${n}-enter-active`, enterToClass: c = `${n}-enter-to`, appearFromClass: l = a, appearActiveClass: u = o, appearToClass: d = c, leaveFromClass: f = `${n}-leave-from`, leaveActiveClass: p = `${n}-leave-active`, leaveToClass: m = `${n}-leave-to` } = e, h = oo(i), g = h && h[0], _ = h && h[1], { onBeforeEnter: v, onEnter: y, onEnterCancelled: b, onLeave: x, onLeaveCancelled: S, onBeforeAppear: C = v, onAppear: w = y, onAppearCancelled: T = b } = t, E = (e, t, n, r) => {
		e._enterCancelled = r, lo(e, t ? d : c), lo(e, t ? u : o), n && n();
	}, ee = (e, t) => {
		e._isLeaving = !1, lo(e, f), lo(e, m), lo(e, p), t && t();
	}, D = (e) => (t, n) => {
		let i = e ? w : y, o = () => E(t, e, n);
		ro(i, [t, o]), uo(() => {
			lo(t, e ? l : a), co(t, e ? d : c), io(i) || po(t, r, g, o);
		});
	};
	return s(t, {
		onBeforeEnter(e) {
			ro(v, [e]), co(e, a), co(e, o);
		},
		onBeforeAppear(e) {
			ro(C, [e]), co(e, l), co(e, u);
		},
		onEnter: D(!1),
		onAppear: D(!0),
		onLeave(e, t) {
			e._isLeaving = !0;
			let n = () => ee(e, t);
			co(e, f), e._enterCancelled ? (co(e, p), _o(e)) : (_o(e), co(e, p)), uo(() => {
				e._isLeaving && (lo(e, f), co(e, m), io(x) || po(e, r, _, n));
			}), ro(x, [e, n]);
		},
		onEnterCancelled(e) {
			E(e, !1, void 0, !0), ro(b, [e]);
		},
		onAppearCancelled(e) {
			E(e, !0, void 0, !0), ro(T, [e]);
		},
		onLeaveCancelled(e) {
			ee(e), ro(S, [e]);
		}
	});
}
function oo(e) {
	if (e == null) return null;
	if (v(e)) return [so(e.enter), so(e.leave)];
	{
		let t = so(e);
		return [t, t];
	}
}
function so(e) {
	return oe(e);
}
function co(e, t) {
	t.split(/\s+/).forEach((t) => t && e.classList.add(t)), (e[$a] || (e[$a] = /* @__PURE__ */ new Set())).add(t);
}
function lo(e, t) {
	t.split(/\s+/).forEach((t) => t && e.classList.remove(t));
	let n = e[$a];
	n && (n.delete(t), n.size || (e[$a] = void 0));
}
function uo(e) {
	requestAnimationFrame(() => {
		requestAnimationFrame(e);
	});
}
var fo = 0;
function po(e, t, n, r) {
	let i = e._endId = ++fo, a = () => {
		i === e._endId && r();
	};
	if (n != null) return setTimeout(a, n);
	let { type: o, timeout: s, propCount: c } = mo(e, t);
	if (!o) return r();
	let l = o + "end", u = 0, d = () => {
		e.removeEventListener(l, f), a();
	}, f = (t) => {
		t.target === e && ++u >= c && d();
	};
	setTimeout(() => {
		u < c && d();
	}, s + 1), e.addEventListener(l, f);
}
function mo(e, t) {
	let n = window.getComputedStyle(e), r = (e) => (n[e] || "").split(", "), i = r(`${Za}Delay`), a = r(`${Za}Duration`), o = ho(i, a), s = r(`${Qa}Delay`), c = r(`${Qa}Duration`), l = ho(s, c), u = null, d = 0, f = 0;
	t === Za ? o > 0 && (u = Za, d = o, f = a.length) : t === Qa ? l > 0 && (u = Qa, d = l, f = c.length) : (d = Math.max(o, l), u = d > 0 ? o > l ? Za : Qa : null, f = u ? u === Za ? a.length : c.length : 0);
	let p = u === Za && /\b(?:transform|all)(?:,|$)/.test(r(`${Za}Property`).toString());
	return {
		type: u,
		timeout: d,
		propCount: f,
		hasTransform: p
	};
}
function ho(e, t) {
	for (; e.length < t.length;) e = e.concat(e);
	return Math.max(...t.map((t, n) => go(t) + go(e[n])));
}
function go(e) {
	return e === "auto" ? 0 : Number(e.slice(0, -1).replace(",", ".")) * 1e3;
}
function _o(e) {
	return (e ? e.ownerDocument : document).body.offsetHeight;
}
function vo(e, t, n) {
	let r = e[$a];
	r && (t = (t ? [t, ...r] : [...r]).join(" ")), t == null ? e.removeAttribute("class") : n ? e.setAttribute("class", t) : e.className = t;
}
var yo = /* @__PURE__ */ Symbol("_vod"), bo = /* @__PURE__ */ Symbol("_vsh"), xo = /* @__PURE__ */ Symbol(""), So = /(?:^|;)\s*display\s*:/;
function Co(e, t, n) {
	let r = e.style, i = g(n), a = !1;
	if (n && !i) {
		if (t) {
			if (g(t)) for (let e of t.split(";")) {
				let t = e.slice(0, e.indexOf(":")).trim();
				n[t] ?? To(r, t, "");
			}
			else for (let e in t) n[e] ?? To(r, e, "");
		}
		for (let i in n) {
			i === "display" && (a = !0);
			let o = n[i];
			o == null ? To(r, i, "") : ko(e, i, !g(t) && t ? t[i] : void 0, o) || To(r, i, o);
		}
	} else if (i) {
		if (t !== n) {
			let e = r[xo];
			e && (n += ";" + e), r.cssText = n, a = So.test(n);
		}
	} else t && e.removeAttribute("style");
	yo in e && (e[yo] = a ? r.display : "", e[bo] && (r.display = "none"));
}
var wo = /\s*!important$/;
function To(e, t, n) {
	if (d(n)) n.forEach((n) => To(e, t, n));
	else if (n ??= "", t.startsWith("--")) wo.test(n) ? e.setProperty(t, n.replace(wo, ""), "important") : e.setProperty(t, n);
	else {
		let r = Oo(e, t);
		wo.test(n) ? e.setProperty(ne(r), n.replace(wo, ""), "important") : e[r] = n;
	}
}
var Eo = [
	"Webkit",
	"Moz",
	"ms"
], Do = {};
function Oo(e, t) {
	let n = Do[t];
	if (n) return n;
	let r = D(t);
	if (r !== "filter" && r in e) return Do[t] = r;
	r = re(r);
	for (let n = 0; n < Eo.length; n++) {
		let i = Eo[n] + r;
		if (i in e) return Do[t] = i;
	}
	return t;
}
function ko(e, t, n, r) {
	return e.tagName === "TEXTAREA" && (t === "width" || t === "height") && g(r) && n === r;
}
var Ao = "http://www.w3.org/1999/xlink";
function jo(e, t, n, r, i, a = pe(t)) {
	r && t.startsWith("xlink:") ? n == null ? e.removeAttributeNS(Ao, t.slice(6, t.length)) : e.setAttributeNS(Ao, t, n) : n == null || a && !me(n) ? e.removeAttribute(t) : e.setAttribute(t, a ? "" : _(n) ? String(n) : n);
}
function Mo(e, t, n, r, i) {
	if (t === "innerHTML" || t === "textContent") {
		n != null && (e[t] = t === "innerHTML" ? Ga(n) : n);
		return;
	}
	let a = e.tagName;
	if (t === "value" && a !== "PROGRESS" && !a.includes("-")) {
		let r = a === "OPTION" ? e.getAttribute("value") || "" : e.value, i = n == null ? e.type === "checkbox" ? "on" : "" : String(n);
		(r !== i || !("_value" in e)) && (e.value = i), n ?? e.removeAttribute(t), e._value = n;
		return;
	}
	let o = !1;
	if (n === "" || n == null) {
		let r = typeof e[t];
		r === "boolean" ? n = me(n) : n == null && r === "string" ? (n = "", o = !0) : r === "number" && (n = 0, o = !0);
	}
	try {
		e[t] = n;
	} catch {}
	o && e.removeAttribute(i || t);
}
function No(e, t, n, r) {
	e.addEventListener(t, n, r);
}
function Po(e, t, n, r) {
	e.removeEventListener(t, n, r);
}
var Fo = /* @__PURE__ */ Symbol("_vei");
function Io(e, t, n, r, i = null) {
	let a = e[Fo] || (e[Fo] = {}), o = a[t];
	if (r && o) o.value = r;
	else {
		let [n, s] = zo(t);
		r ? No(e, n, a[t] = Uo(r, i), s) : o && (Po(e, n, o, s), a[t] = void 0);
	}
}
var Lo = /(Once|Passive|Capture)$/, Ro = /^on:?(?:Once|Passive|Capture)$/;
function zo(e) {
	let t, n;
	for (; (n = e.match(Lo)) && !Ro.test(e);) t ||= {}, e = e.slice(0, e.length - n[1].length), t[n[1].toLowerCase()] = !0;
	return [e[2] === ":" ? e.slice(3) : ne(e.slice(2)), t];
}
var Bo = 0, Vo = /* @__PURE__ */ Promise.resolve(), Ho = () => Bo ||= (Vo.then(() => Bo = 0), Date.now());
function Uo(e, t) {
	let n = (e) => {
		if (!e._vts) e._vts = Date.now();
		else if (e._vts <= n.attached) return;
		let r = n.value;
		if (d(r)) {
			let n = e.stopImmediatePropagation;
			e.stopImmediatePropagation = () => {
				n.call(e), e._stopped = !0;
			};
			let i = r.slice(), a = [e];
			for (let n = 0; n < i.length && !e._stopped; n++) {
				let e = i[n];
				e && dn(e, t, 5, a);
			}
		} else dn(r, t, 5, [e]);
	};
	return n.value = e, n.attached = Ho(), n;
}
var Wo = (e) => e.charCodeAt(0) === 111 && e.charCodeAt(1) === 110 && e.charCodeAt(2) > 96 && e.charCodeAt(2) < 123, Go = (e, t, n, r, i, s) => {
	let c = i === "svg";
	t === "class" ? vo(e, r, c) : t === "style" ? Co(e, n, r) : a(t) ? o(t) || Io(e, t, n, r, s) : (t[0] === "." ? (t = t.slice(1), 1) : t[0] === "^" ? (t = t.slice(1), 0) : Ko(e, t, r, c)) ? (Mo(e, t, r), !e.tagName.includes("-") && (t === "value" || t === "checked" || t === "selected") && jo(e, t, r, c, s, t !== "value")) : e._isVueCE && (qo(e, t) || e._def.__asyncLoader && (/[A-Z]/.test(t) || !g(r))) ? Mo(e, D(t), r, s, t) : (t === "true-value" ? e._trueValue = r : t === "false-value" && (e._falseValue = r), jo(e, t, r, c));
};
function Ko(e, t, n, r) {
	if (r) return !!(t === "innerHTML" || t === "textContent" || t in e && Wo(t) && h(n));
	if (t === "spellcheck" || t === "draggable" || t === "translate" || t === "autocorrect" || t === "sandbox" && e.tagName === "IFRAME" || t === "form" || t === "list" && e.tagName === "INPUT" || t === "type" && e.tagName === "TEXTAREA") return !1;
	if (t === "width" || t === "height") {
		let t = e.tagName;
		if (t === "IMG" || t === "VIDEO" || t === "CANVAS" || t === "SOURCE") return !1;
	}
	return Wo(t) && g(n) ? !1 : t in e;
}
function qo(e, t) {
	let n = e._def.props;
	if (!n) return !1;
	let r = D(t);
	return Array.isArray(n) ? n.some((e) => D(e) === r) : Object.keys(n).some((e) => D(e) === r);
}
var Jo = {};
// @__NO_SIDE_EFFECTS__
function Yo(e, t, n) {
	let r = /* @__PURE__ */ sr(e, t);
	C(r) && (r = s({}, r, t));
	class i extends Zo {
		constructor(e) {
			super(r, e, n);
		}
	}
	return i.def = r, i;
}
var Xo = typeof HTMLElement < "u" ? HTMLElement : class {}, Zo = class e extends Xo {
	constructor(e, t = {}, n = hs) {
		super(), this._def = e, this._props = t, this._createApp = n, this._isVueCE = !0, this._instance = null, this._app = null, this._nonce = this._def.nonce, this._connected = !1, this._resolved = !1, this._patching = !1, this._dirty = !1, this._numberProps = null, this._styleChildren = /* @__PURE__ */ new WeakSet(), this._styleAnchors = /* @__PURE__ */ new WeakMap(), this._ob = null, this.shadowRoot && n !== hs ? this._root = this.shadowRoot : e.shadowRoot === !1 ? this._root = this : (this.attachShadow(s({}, e.shadowRootOptions, { mode: "open" })), this._root = this.shadowRoot);
	}
	connectedCallback() {
		if (!this.isConnected) return;
		!this.shadowRoot && !this._resolved && this._parseSlots(), this._connected = !0;
		let t = this;
		for (; t &&= t.assignedSlot || t.parentNode || t.host;) if (t instanceof e) {
			this._parent = t;
			break;
		}
		this._instance || (this._resolved ? this._mount(this._def) : t && t._pendingResolve ? this._pendingResolve = t._pendingResolve.then(() => {
			if (this._pendingResolve = void 0, this.isConnected) return this._resolveDef();
		}) : this._resolveDef());
	}
	_setParent(e = this._parent) {
		e && (this._instance.parent = e._instance, this._inheritParentContext(e));
	}
	_inheritParentContext(e = this._parent) {
		e && this._app && Object.setPrototypeOf(this._app._context.provides, e._instance.provides);
	}
	disconnectedCallback() {
		this._connected = !1, xn(() => {
			this._connected || (this._ob &&= (this._ob.disconnect(), null), this._app && this._app.unmount(), this._instance && (this._instance.ce = void 0), this._app = this._instance = null, this._teleportTargets &&= (this._teleportTargets.clear(), void 0));
		});
	}
	_processMutations(e) {
		for (let t of e) this._setAttr(t.attributeName);
	}
	_resolveDef() {
		if (this._pendingResolve) return this._pendingResolve;
		for (let e = 0; e < this.attributes.length; e++) this._setAttr(this.attributes[e].name);
		this._ob = new MutationObserver(this._processMutations.bind(this)), this._ob.observe(this, { attributes: !0 });
		let e = (e, t = !1) => {
			this._resolved = !0, this._pendingResolve = void 0;
			let { props: n, styles: r } = e, i;
			if (n && !d(n)) for (let e in n) {
				let t = n[e];
				(t === Number || t && t.type === Number) && (e in this._props && (this._props[e] = oe(this._props[e])), (i ||= /* @__PURE__ */ Object.create(null))[D(e)] = !0);
			}
			this._numberProps = i, this._resolveProps(e), this.shadowRoot && this._applyStyles(r), this._mount(e);
		}, t = this._def.__asyncLoader;
		if (t) return this._pendingResolve = t().then((t) => {
			t.configureApp = this._def.configureApp, e(this._def = t, !0);
		}), this._pendingResolve;
		e(this._def);
	}
	_mount(e) {
		this._app = this._createApp(e), this._inheritParentContext(), e.configureApp && e.configureApp(this._app), this._app._ceVNode = this._createVNode(), this._app.mount(this._root);
		let t = this._instance && this._instance.exposed;
		if (t) for (let e in t) u(this, e) || Object.defineProperty(this, e, { get: () => I(t[e]) });
	}
	_resolveProps(e) {
		let { props: t } = e, n = d(t) ? t : Object.keys(t || {});
		for (let e of Object.keys(this)) e[0] !== "_" && n.includes(e) && this._setProp(e, this[e]);
		for (let e of n.map(D)) Object.defineProperty(this, e, {
			get() {
				return this._getProp(e);
			},
			set(t) {
				this._setProp(e, t, !0, !this._patching);
			}
		});
	}
	_setAttr(e) {
		if (e.startsWith("data-v-")) return;
		let t = this.hasAttribute(e), n = t ? this.getAttribute(e) : Jo, r = D(e);
		t && this._numberProps && this._numberProps[r] && (n = oe(n)), this._setProp(r, n, !1, !0);
	}
	_getProp(e) {
		return this._props[e];
	}
	_setProp(e, t, n = !0, r = !1) {
		if (t !== this._props[e] && (this._dirty = !0, t === Jo ? delete this._props[e] : (this._props[e] = t, e === "key" && this._app && (this._app._ceVNode.key = t)), r && this._instance && this._update(), n)) {
			let n = this._ob;
			n && (this._processMutations(n.takeRecords()), n.disconnect()), t === !0 ? this.setAttribute(ne(e), "") : typeof t == "string" || typeof t == "number" ? this.setAttribute(ne(e), t + "") : t || this.removeAttribute(ne(e)), n && n.observe(this, { attributes: !0 });
		}
	}
	_update() {
		let e = this._createVNode();
		this._app && (e.appContext = this._app._context), ms(e, this._root);
	}
	_createVNode() {
		let e = {};
		this.shadowRoot || (e.onVnodeMounted = e.onVnodeUpdated = this._renderSlots.bind(this));
		let t = H(this._def, s(e, this._props));
		return this._instance || (t.ce = (e) => {
			this._instance = e, e.ce = this, e.isCE = !0;
			let t = (e, t) => {
				this.dispatchEvent(new CustomEvent(e, C(t[0]) ? s({ detail: t }, t[0]) : { detail: t }));
			};
			e.emit = (e, ...n) => {
				t(e, n), ne(e) !== e && t(ne(e), n);
			}, this._setParent();
		}), t;
	}
	_applyStyles(e, t, n) {
		if (!e) return;
		if (t) {
			if (t === this._def || this._styleChildren.has(t)) return;
			this._styleChildren.add(t);
		}
		let r = this._nonce, i = this.shadowRoot, a = n ? this._getStyleAnchor(n) || this._getStyleAnchor(this._def) : this._getRootStyleInsertionAnchor(i), o = null;
		for (let s = e.length - 1; s >= 0; s--) {
			let c = document.createElement("style");
			r && c.setAttribute("nonce", r), c.textContent = e[s], i.insertBefore(c, o || a), o = c, s === 0 && (n || this._styleAnchors.set(this._def, c), t && this._styleAnchors.set(t, c));
		}
	}
	_getStyleAnchor(e) {
		if (!e) return null;
		let t = this._styleAnchors.get(e);
		return t && t.parentNode === this.shadowRoot ? t : (t && this._styleAnchors.delete(e), null);
	}
	_getRootStyleInsertionAnchor(e) {
		for (let t = 0; t < e.childNodes.length; t++) {
			let n = e.childNodes[t];
			if (!(n instanceof HTMLStyleElement)) return n;
		}
		return null;
	}
	_parseSlots() {
		let e = this._slots = {}, t;
		for (; t = this.firstChild;) {
			let n = t.nodeType === 1 && t.getAttribute("slot") || "default";
			(e[n] || (e[n] = [])).push(t), this.removeChild(t);
		}
	}
	_renderSlots() {
		let e = this._getSlots(), t = this._instance.type.__scopeId;
		for (let n = 0; n < e.length; n++) {
			let r = e[n], i = r.getAttribute("name") || "default", a = this._slots[i], o = r.parentNode;
			if (a) for (let e of a) {
				if (t && e.nodeType === 1) {
					let n = t + "-s", r = document.createTreeWalker(e, 1);
					e.setAttribute(n, "");
					let i;
					for (; i = r.nextNode();) i.setAttribute(n, "");
				}
				o.insertBefore(e, r);
			}
			else for (; r.firstChild;) o.insertBefore(r.firstChild, r);
			o.removeChild(r);
		}
	}
	_getSlots() {
		let e = [this];
		this._teleportTargets && e.push(...this._teleportTargets);
		let t = /* @__PURE__ */ new Set();
		for (let n of e) {
			let e = n.querySelectorAll("slot");
			for (let n = 0; n < e.length; n++) t.add(e[n]);
		}
		return Array.from(t);
	}
	_injectChildStyle(e, t) {
		this._applyStyles(e.styles, e, t);
	}
	_beginPatch() {
		this._patching = !0, this._dirty = !1;
	}
	_endPatch() {
		this._patching = !1, this._dirty && this._instance && this._update();
	}
	_hasShadowRoot() {
		return this._def.shadowRoot !== !1;
	}
	_removeChildStyle(e) {}
}, Qo = /* @__PURE__ */ new WeakMap(), $o = /* @__PURE__ */ new WeakMap(), es = /* @__PURE__ */ Symbol("_moveCb"), ts = /* @__PURE__ */ Symbol("_enterCb"), ns = /* @__PURE__ */ ((e) => (delete e.props.mode, e))({
	name: "TransitionGroup",
	props: /* @__PURE__ */ s({}, to, {
		tag: String,
		moveClass: String
	}),
	setup(e, { slots: t }) {
		let n = Ea(), r = Jn(), i, a;
		return Tr(() => {
			if (!i.length) return;
			let t = e.moveClass || `${e.name || "v"}-move`;
			if (!ss(i[0].el, n.vnode.el, t)) {
				i = [];
				return;
			}
			i.forEach(rs), i.forEach(is);
			let r = i.filter(as);
			_o(n.vnode.el), r.forEach((e) => {
				let n = e.el, r = n.style;
				co(n, t), r.transform = r.webkitTransform = r.transitionDuration = "";
				let i = n[es] = (e) => {
					e && e.target !== n || (!e || e.propertyName.endsWith("transform")) && (n.removeEventListener("transitionend", i), n[es] = null, lo(n, t));
				};
				n.addEventListener("transitionend", i);
			}), i = [];
		}), () => {
			let o = /* @__PURE__ */ Ut(e), s = ao(o), c = o.tag || L;
			if (i = [], a) for (let e = 0; e < a.length; e++) {
				let t = a[e];
				t.el && t.el instanceof Element && !t.el[bo] && (i.push(t), ar(t, nr(t, s, r, n)), Qo.set(t, os(t.el)));
			}
			a = t.default ? or(t.default()) : [];
			for (let e = 0; e < a.length; e++) {
				let t = a[e];
				t.key != null && ar(t, nr(t, s, r, n));
			}
			return H(c, null, a);
		};
	}
});
function rs(e) {
	let t = e.el;
	t[es] && t[es](), t[ts] && t[ts]();
}
function is(e) {
	$o.set(e, os(e.el));
}
function as(e) {
	let t = Qo.get(e), n = $o.get(e), r = t.left - n.left, i = t.top - n.top;
	if (r || i) {
		let t = e.el, n = t.style, a = t.getBoundingClientRect(), o = 1, s = 1;
		return t.offsetWidth && (o = a.width / t.offsetWidth), t.offsetHeight && (s = a.height / t.offsetHeight), (!Number.isFinite(o) || o === 0) && (o = 1), (!Number.isFinite(s) || s === 0) && (s = 1), Math.abs(o - 1) < .01 && (o = 1), Math.abs(s - 1) < .01 && (s = 1), n.transform = n.webkitTransform = `translate(${r / o}px,${i / s}px)`, n.transitionDuration = "0s", e;
	}
}
function os(e) {
	let t = e.getBoundingClientRect();
	return {
		left: t.left,
		top: t.top
	};
}
function ss(e, t, n) {
	let r = e.cloneNode(), i = e[$a];
	i && i.forEach((e) => {
		e.split(/\s+/).forEach((e) => e && r.classList.remove(e));
	}), n.split(/\s+/).forEach((e) => e && r.classList.add(e)), r.style.display = "none";
	let a = t.nodeType === 1 ? t : t.parentNode;
	a.appendChild(r);
	let { hasTransform: o } = mo(r);
	return a.removeChild(r), o;
}
var cs = [
	"ctrl",
	"shift",
	"alt",
	"meta"
], ls = {
	stop: (e) => e.stopPropagation(),
	prevent: (e) => e.preventDefault(),
	self: (e) => e.target !== e.currentTarget,
	ctrl: (e) => !e.ctrlKey,
	shift: (e) => !e.shiftKey,
	alt: (e) => !e.altKey,
	meta: (e) => !e.metaKey,
	left: (e) => "button" in e && e.button !== 0,
	middle: (e) => "button" in e && e.button !== 1,
	right: (e) => "button" in e && e.button !== 2,
	exact: (e, t) => cs.some((n) => e[`${n}Key`] && !t.includes(n))
}, us = (e, t) => {
	if (!e) return e;
	let n = e._withMods ||= {}, r = t.join(".");
	return n[r] || (n[r] = ((n, ...r) => {
		for (let e = 0; e < t.length; e++) {
			let r = ls[t[e]];
			if (r && r(n, t)) return;
		}
		return e(n, ...r);
	}));
}, ds = /* @__PURE__ */ s({ patchProp: Go }, Xa), fs;
function ps() {
	return fs ||= Hi(ds);
}
var ms = ((...e) => {
	ps().render(...e);
}), hs = ((...e) => {
	let t = ps().createApp(...e), { mount: n } = t;
	return t.mount = (e) => {
		let r = _s(e);
		if (!r) return;
		let i = t._component;
		!h(i) && !i.render && !i.template && (i.template = r.innerHTML), r.nodeType === 1 && (r.textContent = "");
		let a = n(r, !1, gs(r));
		return r instanceof Element && (r.removeAttribute("v-cloak"), r.setAttribute("data-v-app", "")), a;
	}, t;
});
function gs(e) {
	if (e instanceof SVGElement) return "svg";
	if (typeof MathMLElement == "function" && e instanceof MathMLElement) return "mathml";
}
function _s(e) {
	return g(e) ? document.querySelector(e) : e;
}
//#endregion
//#region src/shims/UModal.vue
var vs = /* @__PURE__ */ sr({
	__name: "UModal",
	setup(e) {
		return (e, t) => U("", !0);
	}
}), ys = "[role=\"dialog\"][data-state=\"open\"], [role=\"alertdialog\"][data-state=\"open\"]";
function bs(e) {
	let t = e.querySelectorAll(ys);
	return t[t.length - 1] ?? null;
}
//#endregion
//#region ../../apps/studio/app/utils/dialogEscape.ts
var xs = "[aria-expanded=\"true\"][aria-controls]", Ss = "[role=\"listbox\"], [role=\"menu\"], [data-reka-select-content]";
function Cs(e, t) {
	let n = e;
	return typeof n?.closest == "function" && (n.closest(Ss) || n.closest(xs)) ? !0 : !!bs(t)?.querySelector(`${xs}, ${Ss}`);
}
function ws(e, t, n = document) {
	if (e.key !== "Escape" || e.defaultPrevented || e.isComposing || !t) return !1;
	let r = bs(n);
	return !r || !r.contains(t) ? !1 : !Cs(e.target, n);
}
//#endregion
//#region ../../apps/studio/app/composables/useDialogEscape.ts
function Ts(e, t) {
	let n = (n) => {
		ws(n, e.value) && (n.preventDefault(), t());
	};
	Cr(() => document.addEventListener("keydown", n, !0)), Er(() => document.removeEventListener("keydown", n, !0));
}
//#endregion
//#region ../../node_modules/.pnpm/zod@4.6.5/node_modules/zod/v4/core/util.js
function Es(e) {
	let t = Object.values(e).filter((e) => typeof e == "number");
	return Object.entries(e).filter(([e, n]) => t.indexOf(+e) === -1).map(([e, t]) => t);
}
function Ds(e, t = "|") {
	return e.map((e) => ec(e)).join(t);
}
function Os(e, t) {
	return typeof t == "bigint" ? t.toString() : t;
}
var ks = class {
	constructor(e) {
		this._getter = e, this._value = void 0;
	}
	get value() {
		let e = this._getter;
		return e !== void 0 && (this._value = e(), this._getter = void 0), this._value;
	}
};
function As(e) {
	return new ks(e);
}
function js(e) {
	return e == null;
}
function Ms(e) {
	let t = +!!e.startsWith("^"), n = e.endsWith("$") ? e.length - 1 : e.length;
	return e.slice(t, n);
}
function Ns(e, t) {
	let n = e / t, r = Math.round(n), i = 4 * 2 ** -52 * Math.max(Math.abs(n), 1);
	return Math.abs(n - r) < i ? 0 : n - r;
}
var Ps = /* @__PURE__*/ Symbol("evaluating");
function Fs(e, t, n) {
	let r;
	Object.defineProperty(e, t, {
		get() {
			if (r !== Ps) return r === void 0 && (r = Ps, r = n()), r;
		},
		set(n) {
			Object.defineProperty(e, t, { value: n });
		},
		configurable: !0
	});
}
function Is(e, t, n) {
	Object.defineProperty(e, t, {
		value: n,
		writable: !0,
		enumerable: !0,
		configurable: !0
	});
}
function Ls(e) {
	let t = Object.getOwnPropertyDescriptor(e, "shape");
	return t?.get ? t.get.raw : t?.value;
}
function Rs(e) {
	return Ls(e._zod.def) ?? e._zod.def.shape;
}
function zs(e, t, n) {
	Object.defineProperty(e, t, {
		get() {
			let e = n();
			return Is(this, t, e), e;
		},
		enumerable: !0,
		configurable: !0
	});
}
function Bs(e, t, n) {
	t in e ? Is(e, t, n) : e[t] = n;
}
function Vs(e, t, n, r) {
	let i = Rs(t);
	for (let a of n) {
		let n = Object.getOwnPropertyDescriptor(i, a);
		n.enumerable && (n.get ? zs(e, a, () => {
			let e = t._zod.def.shape[a];
			return r ? r(e, a) : e;
		}) : Bs(e, a, r ? r(n.value, a) : n.value));
	}
}
function Hs(e, t) {
	for (let n of Reflect.ownKeys(t)) {
		let r = Object.getOwnPropertyDescriptor(t, n);
		r.enumerable && (r.get ? zs(e, n, () => t[n]) : Bs(e, n, r.value));
	}
}
function Us(...e) {
	let t = {};
	for (let n of e) {
		let e = Object.getOwnPropertyDescriptors(n);
		Object.assign(t, e);
	}
	return Object.defineProperties({}, t);
}
function Ws(e) {
	return JSON.stringify(e);
}
function Gs(e) {
	return e.toLowerCase().trim().replace(/[^\w\s-]/g, "").replace(/[\s_-]+/g, "-").replace(/^-+|-+$/g, "");
}
var Ks = "captureStackTrace" in Error ? Error.captureStackTrace : (...e) => {};
function qs(e) {
	return typeof e == "object" && !!e && !Array.isArray(e);
}
var Js = /* @__PURE__*/ As(() => {
	if (Uc.jitless || typeof navigator < "u" && navigator?.userAgent?.includes("Cloudflare")) return !1;
	try {
		return Function(""), !0;
	} catch {
		return !1;
	}
});
function Ys(e) {
	if (qs(e) === !1) return !1;
	let t = e.constructor;
	if (t === void 0 || typeof t != "function") return !0;
	let n = t.prototype;
	return qs(n) !== !1 && Object.prototype.hasOwnProperty.call(n, "isPrototypeOf") !== !1;
}
function Xs(e) {
	return Ys(e) ? { ...e } : Array.isArray(e) ? [...e] : e instanceof Map ? new Map(e) : e instanceof Set ? new Set(e) : e;
}
var Zs = /* @__PURE__*/ new Set([
	"string",
	"number",
	"symbol"
]);
function Qs(e) {
	return e.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
function $s(e, t, n) {
	let r = new e._zod.constr(t ?? e._zod.def);
	return (!t || n?.parent) && (r._zod.parent = e), r;
}
function G(e) {
	let t = e;
	if (!t) return {};
	if (typeof t == "string") return { error: () => t };
	if (t?.message !== void 0) {
		if (t?.error !== void 0) throw Error("Cannot specify both `message` and `error` params");
		t.error = t.message;
	}
	return delete t.message, typeof t.error == "string" ? {
		...t,
		error: () => t.error
	} : t;
}
function ec(e) {
	return typeof e == "bigint" ? e.toString() + "n" : typeof e == "string" ? `"${e}"` : `${e}`;
}
function tc(e) {
	return Object.keys(e).filter((t) => e[t]._zod.optin !== void 0 && e[t]._zod.optout === "optional");
}
var nc = {
	safeint: [-(2 ** 53 - 1), 2 ** 53 - 1],
	int32: [-2147483648, 2147483647],
	uint32: [0, 4294967295],
	float32: [-34028234663852886e22, 34028234663852886e22],
	float64: [-Number.MAX_VALUE, Number.MAX_VALUE]
}, rc = {
	int64: [/* @__PURE__*/ BigInt("-9223372036854775808"), /* @__PURE__*/ BigInt("9223372036854775807")],
	uint64: [/* @__PURE__*/ BigInt(0), /* @__PURE__*/ BigInt("18446744073709551615")]
};
function ic(e, t) {
	let n = e._zod.def, r = n.checks;
	if (r && r.length > 0) throw Error(".pick() cannot be used on object schemas containing refinements");
	let i = {};
	return Vs(i, e, ac(e, t)), $s(e, Us(n, {
		shape: i,
		checks: []
	}));
}
function ac(e, t) {
	let n = Rs(e), r = [];
	for (let e of Reflect.ownKeys(t)) {
		if (!Object.getOwnPropertyDescriptor(n, e)?.enumerable) throw Error(`Unrecognized key: "${String(e)}"`);
		t[e] && r.push(e);
	}
	return r;
}
function oc(e, t) {
	let n = e._zod.def, r = n.checks;
	if (r && r.length > 0) throw Error(".omit() cannot be used on object schemas containing refinements");
	let i = new Set(ac(e, t)), a = {};
	return Vs(a, e, Reflect.ownKeys(Rs(e)).filter((e) => !i.has(e))), $s(e, Us(n, {
		shape: a,
		checks: []
	}));
}
function sc(e, t) {
	if (!Ys(t)) throw Error("Invalid input to extend: expected a plain object");
	let n = e._zod.def.checks;
	if (n && n.length > 0) {
		let n = Rs(e);
		for (let e of Reflect.ownKeys(t)) if (Object.getOwnPropertyDescriptor(n, e) !== void 0) throw Error("Cannot overwrite keys on object schemas containing refinements. Use `.safeExtend()` instead.");
	}
	return $s(e, Us(e._zod.def, { shape: cc(e, t) }));
}
function cc(e, t) {
	let n = {};
	return Vs(n, e, Reflect.ownKeys(Rs(e))), Hs(n, t), n;
}
function lc(e, t) {
	if (!Ys(t)) throw Error("Invalid input to safeExtend: expected a plain object");
	return $s(e, Us(e._zod.def, { shape: cc(e, t) }));
}
function uc(e, t) {
	if (!t?._zod?.def) throw Error("Invalid input to merge: expected an object schema. To merge a plain shape, use `.extend()`.");
	if (e._zod.def.checks?.length) throw Error(".merge() cannot be used on object schemas containing refinements. Use .safeExtend() instead.");
	let n = {};
	return Vs(n, e, Reflect.ownKeys(Rs(e))), Vs(n, t, Reflect.ownKeys(Rs(t))), $s(e, Us(e._zod.def, {
		shape: n,
		get catchall() {
			return t._zod.def.catchall;
		},
		checks: t._zod.def.checks ?? []
	}));
}
function dc(e, t, n, r = "partial") {
	let i = t._zod.def.checks;
	if (i && i.length > 0) throw Error(`.${r}() cannot be used on object schemas containing refinements`);
	let a = n ? new Set(ac(t, n)) : void 0, o = {};
	return Vs(o, t, Reflect.ownKeys(Rs(t)), e && ((t, n) => a && !a.has(n) ? t : new e({
		type: "optional",
		innerType: t
	}))), $s(t, Us(t._zod.def, {
		shape: o,
		checks: []
	}));
}
function fc(e, t, n) {
	let r = n ? new Set(ac(t, n)) : void 0, i = {};
	return Vs(i, t, Reflect.ownKeys(Rs(t)), (t, n) => r && !r.has(n) ? t : new e({
		type: "nonoptional",
		innerType: t
	})), $s(t, Us(t._zod.def, { shape: i }));
}
function pc(e, t = 0) {
	if (e.aborted === !0) return !0;
	for (let n = t; n < e.issues.length; n++) if (e.issues[n]?.continue !== !0) return !0;
	return !1;
}
function mc(e, t = 0) {
	if (e.aborted === !0) return !0;
	for (let n = t; n < e.issues.length; n++) if (e.issues[n]?.continue === !1) return !0;
	return !1;
}
function hc(e, t) {
	return t.map((t) => {
		var n;
		return (n = t).path ?? (n.path = []), t.path.unshift(e), t;
	});
}
function gc(e) {
	return typeof e == "string" ? e : e?.message;
}
function _c(e, t, n) {
	var r;
	for (let i = t; i < e.length; i++) (r = e[i]).schema ?? (r.schema = n);
}
function vc(e, t, n) {
	var r;
	let i = e.inst?._zod?.traits;
	i?.has("$ZodType") && (i.has("$ZodCheck") ? (r = e).schema ?? (r.schema = e.inst) : e.schema = e.inst);
	let a = e.schema === e.inst ? void 0 : e.schema?._zod.def?.error, o = e.message ? e.message : gc(e.inst?._zod.def?.error?.(e)) ?? gc(a?.(e)) ?? gc(t?.error?.(e)) ?? gc(n.customError?.(e)) ?? gc(n.localeError?.(e)) ?? "Invalid input", s = {};
	for (let t of Object.keys(e)) t !== "inst" && t !== "schema" && t !== "continue" && t !== "input" && t !== "__proto__" && (s[t] = e[t]);
	return s.path ??= [], s.message = o, t?.reportInput && (s.input = e.input), s;
}
var yc = /[\uD800-\uDBFF]/;
function bc(e) {
	let t = e.length;
	if (!yc.test(e)) return t;
	let n = t;
	for (let r = 0; r < t - 1; r++) (e.charCodeAt(r) & 64512) == 55296 && (e.charCodeAt(r + 1) & 64512) == 56320 && (n--, r++);
	return n;
}
function xc(e) {
	return Array.isArray(e) ? "array" : typeof e == "string" ? "string" : "unknown";
}
function Sc(e) {
	let t = typeof e;
	switch (t) {
		case "number": return Number.isNaN(e) ? "nan" : "number";
		case "object": {
			if (e === null) return "null";
			if (Array.isArray(e)) return "array";
			let t = e;
			if (t && Object.getPrototypeOf(t) !== Object.prototype && "constructor" in t && t.constructor) return t.constructor.name;
		}
	}
	return t;
}
function Cc(...e) {
	let [t, n, r] = e;
	return typeof t == "string" ? {
		message: t,
		code: "custom",
		input: n,
		inst: r
	} : { ...t };
}
function wc(e, t) {
	for (let n in t) {
		let r = Object.getOwnPropertyDescriptor(t, n);
		r.get ? Object.defineProperty(e, n, {
			...r,
			enumerable: !1
		}) : Oc(e, n, r.value);
	}
}
function Tc(e, t, n, r = !0) {
	return Object.defineProperty(e, t, {
		configurable: !0,
		writable: !0,
		enumerable: r,
		value: n
	}), n;
}
function Ec(e, t, n) {
	return Tc(e, t, n, !1);
}
function Dc(e, t) {
	for (let n in e) {
		let r = e[n];
		Object.defineProperty(t, n, {
			configurable: !0,
			enumerable: !0,
			get() {
				return Tc(this, n, r(this));
			},
			set(e) {
				Tc(this, n, e);
			}
		});
	}
	return t;
}
function Oc(e, t, n) {
	Object.defineProperty(e, t, {
		configurable: !0,
		get() {
			return this == null ? n : Tc(this, t, n.bind(this));
		},
		set(e) {
			Tc(this, t, e);
		}
	});
}
function kc(e, t) {
	let n = Object.getPrototypeOf(e);
	return t in n ? void 0 : n;
}
var Ac, jc = !1, Mc = {
	configurable: !0,
	get() {
		jc = !0;
	}
};
function Nc(e, t, n) {
	let r = Object.getPrototypeOf(e._zod);
	t in r && Ac !== e._zod ? Ac = void 0 : (Ac = e._zod, Object.defineProperty(r, t, {
		configurable: !0,
		get() {
			Object.defineProperty(this, t, Mc);
			let e = jc;
			jc = !1;
			try {
				let r = n(this);
				return jc ? delete this[t] : Object.defineProperty(this, t, {
					configurable: !0,
					writable: !0,
					value: r
				}), jc ||= e, r;
			} catch (n) {
				throw delete this[t], jc ||= e, n;
			}
		},
		set(e) {
			Object.defineProperty(this, t, {
				configurable: !0,
				writable: !0,
				value: e
			});
		}
	}));
}
function Pc(e, t, n, r) {
	let i = kc(e, t);
	i && Object.defineProperty(i, t, {
		configurable: !0,
		get() {
			let e = {
				configurable: !0,
				writable: !0,
				enumerable: r,
				value: void 0
			};
			return Object.defineProperty(this, t, e), e.value = n(this), Object.defineProperty(this, t, e), e.value;
		},
		set(e) {
			Object.defineProperty(this, t, {
				configurable: !0,
				writable: !0,
				enumerable: r,
				value: e
			});
		}
	});
}
var Fc = "~constantCatch";
function Ic(e) {
	let t = () => e;
	return t[Fc] = !0, t;
}
//#endregion
//#region ../../node_modules/.pnpm/zod@4.6.5/node_modules/zod/v4/core/core.js
var Lc, Rc = {
	value: void 0,
	enumerable: !1
}, zc = "captureStackTrace" in Error ? Error : null;
function Bc(e) {
	let t = zc;
	if (t) {
		let n = t.stackTraceLimit;
		if (typeof n == "number") {
			try {
				t.stackTraceLimit = 0;
			} catch {
				return zc = null, new e();
			}
			try {
				return new e();
			} finally {
				t.stackTraceLimit = n;
			}
		}
	}
	return new e();
}
function K(e, t, n, r) {
	let i = {};
	function a(e) {
		this.def = e, this.constr = d, this.traits = /* @__PURE__ */ new Set();
	}
	a.prototype = i;
	let o = n, s = o && /* @__PURE__ */ new WeakSet();
	function c(n, r) {
		if (!n._zod) {
			Rc.value = new a(r);
			try {
				Object.defineProperty(n, "_zod", Rc);
			} finally {
				Rc.value = void 0;
			}
		} else if (n._zod.traits.has(e)) return;
		if (n._zod.traits.add(e), t(n, r), s) {
			let e = Object.getPrototypeOf(n), t = n._zod.constr.prototype, r = e;
			for (; r && r !== t;) r = Object.getPrototypeOf(r);
			let i = r ?? e;
			s.has(i) || (s.add(i), wc(i, o));
		}
		let i = d.prototype;
		for (let e in i) Object.prototype.hasOwnProperty.call(i, e) && (e in n || (n[e] = i[e].bind(n)));
	}
	let l = r?.Parent ?? Object;
	class u extends l {}
	Object.defineProperty(u, "name", { value: e });
	function d(e) {
		let t = r?.Parent ? Bc(u) : this;
		c(t, e);
		let n = t._zod.deferred;
		if (n) {
			for (let e of n) e();
			t._zod.deferred = void 0;
		}
		let i = globalThis.__zod_globalConfig?.postProcessor;
		return i && i(t), t;
	}
	return Object.defineProperty(d, "init", { value: c }), Object.defineProperty(d, Symbol.hasInstance, { value: (t) => r?.Parent && t instanceof r.Parent ? !0 : t?._zod?.traits?.has(e) }), Object.defineProperty(d, "name", { value: e }), d;
}
var Vc = class extends Error {
	constructor() {
		super("Encountered Promise during synchronous parse. Use .parseAsync() instead.");
	}
}, Hc = class extends Error {
	constructor(e) {
		super(`Encountered unidirectional transform during encode: ${e}`), this.name = "ZodEncodeError";
	}
};
(Lc = globalThis).__zod_globalConfig ?? (Lc.__zod_globalConfig = {});
var Uc = globalThis.__zod_globalConfig;
function Wc(e) {
	return e && Object.assign(Uc, e), Uc;
}
//#endregion
//#region ../../node_modules/.pnpm/zod@4.6.5/node_modules/zod/v4/core/errors.js
function Gc() {
	let e = this._zod;
	return e.message ??= JSON.stringify(e.def, Os, 2), e.message;
}
function Kc(e) {
	this._zod.message = e;
}
var qc = {
	get: Gc,
	set: Kc,
	enumerable: !0,
	configurable: !0
}, Jc = {
	value: void 0,
	enumerable: !1
}, Yc = /* @__PURE__ */ new WeakSet([Object.prototype, Error.prototype]), Xc = (e, t) => {
	e.name = "$ZodError", Jc.value = t, Object.defineProperty(e, "issues", Jc), Jc.value = void 0, Object.defineProperty(e, "message", qc);
	let n = Object.getPrototypeOf(e);
	Yc.has(n) || (Yc.add(n), Object.defineProperty(n, "toString", {
		configurable: !0,
		enumerable: !1,
		get() {
			let e = () => this.message;
			return Object.defineProperty(this, "toString", {
				value: e,
				configurable: !0,
				writable: !0
			}), e;
		},
		set(e) {
			Object.defineProperty(this, "toString", {
				value: e,
				configurable: !0,
				writable: !0
			});
		}
	}));
}, Zc = K("$ZodError", Xc);
K("$ZodError", Xc, void 0, { Parent: Error });
function Qc(e, t, n) {
	return Object.prototype.hasOwnProperty.call(e, t) || (t === "__proto__" ? Object.defineProperty(e, t, {
		value: n(),
		writable: !0,
		enumerable: !0,
		configurable: !0
	}) : e[t] = n()), e[t];
}
function $c(e, t = (e) => e.message) {
	let n = {}, r = [];
	for (let i of e.issues) i.path.length > 0 ? Qc(n, i.path[0], () => []).push(t(i)) : r.push(t(i));
	return {
		formErrors: r,
		fieldErrors: n
	};
}
function el(e, t = (e) => e.message) {
	let n = { _errors: [] }, r = (e, i = []) => {
		for (let a of e.issues) if (a.code === "invalid_union" && a.errors.length) a.errors.map((e) => r({ issues: e }, [...i, ...a.path]));
		else if (a.code === "invalid_key") r({ issues: a.issues }, [...i, ...a.path]);
		else if (a.code === "invalid_element") r({ issues: a.issues }, [...i, ...a.path]);
		else {
			let e = [...i, ...a.path];
			if (e.length === 0) n._errors.push(t(a));
			else {
				let r = n, i = 0;
				for (; i < e.length;) {
					let n = e[i], o = i === e.length - 1;
					if (n === "_errors") {
						o && r._errors.push(t(a)), i++;
						continue;
					}
					Object.prototype.hasOwnProperty.call(r, n) || Object.defineProperty(r, n, {
						value: { _errors: [] },
						enumerable: !0,
						writable: !0,
						configurable: !0
					});
					let s = r[n];
					o && s._errors.push(t(a)), r = s, i++;
				}
			}
		}
	};
	return r(e), n;
}
//#endregion
//#region ../../node_modules/.pnpm/zod@4.6.5/node_modules/zod/v4/core/parse.js
function tl(e, t) {
	return {
		callee: t?.callee ?? e,
		Err: t?.Err
	};
}
var nl = (e) => {
	let t = (n, r, i, a) => {
		let o = i ? {
			...i,
			async: !1
		} : { async: !1 }, s = n._zod.run({
			value: r,
			issues: []
		}, o);
		if (s instanceof Promise) throw new Vc();
		if (s.issues.length) {
			let n = new ((a?.Err) ?? e)(s.issues.map((e) => vc(e, o, Wc())));
			throw Ks(n, a?.callee ?? t), n;
		}
		return s.value;
	};
	return t;
}, rl = (e) => {
	let t = async (n, r, i, a) => {
		let o = i ? {
			...i,
			async: !0
		} : { async: !0 }, s = n._zod.run({
			value: r,
			issues: []
		}, o);
		if (s instanceof Promise && (s = await s), s.issues.length) {
			let n = new ((a?.Err) ?? e)(s.issues.map((e) => vc(e, o, Wc())));
			throw Ks(n, a?.callee ?? t), n;
		}
		return s.value;
	};
	return t;
}, il = (e) => (t, n, r) => {
	let i = r ? {
		...r,
		async: !1
	} : { async: !1 }, a = t._zod.run({
		value: n,
		issues: []
	}, i);
	if (a instanceof Promise) throw new Vc();
	return a.issues.length ? al(e, a.issues, i) : {
		success: !0,
		data: a.value
	};
};
function al(e, t, n) {
	let r;
	return {
		success: !1,
		get error() {
			return r || (r = new e(t.map((e) => vc(e, n, Wc()))), t = void 0, n = void 0), r;
		},
		set error(e) {
			r = e, t = void 0, n = void 0;
		}
	};
}
var ol = (e) => async (t, n, r) => {
	let i = r ? {
		...r,
		async: !0
	} : { async: !0 }, a = t._zod.run({
		value: n,
		issues: []
	}, i);
	return a instanceof Promise && (a = await a), a.issues.length ? al(e, a.issues, i) : {
		success: !0,
		data: a.value
	};
}, sl = /* @__PURE__ */ Symbol.for("zod.compile.invalid"), cl = /* @__PURE__ */ Symbol.for("zod.compile.fallback"), ll = ((e, t, n) => {
	let r = e._zod.bag.validator;
	if (r !== void 0) {
		if (r(t) !== sl) return !0;
		if (r.definite === !0 && n === void 0) return !1;
	}
	return ul(e, t, n);
});
function ul(e, t, n) {
	let r = n ? {
		...n,
		async: !1,
		abortEarly: !0
	} : {
		async: !1,
		abortEarly: !0
	}, i = e._zod.bag.fallbackRun, a;
	if (i ? (r[cl] = !0, a = i({
		value: t,
		issues: []
	}, r)) : a = e._zod.run({
		value: t,
		issues: []
	}, r), a instanceof Promise) throw new Vc();
	return a.issues.length === 0;
}
var dl = async (e, t, n) => {
	let r = n ? {
		...n,
		async: !0,
		abortEarly: !0
	} : {
		async: !0,
		abortEarly: !0
	}, i = e._zod.run({
		value: t,
		issues: []
	}, r);
	return i instanceof Promise && (i = await i), i.issues.length === 0;
}, fl = (e) => {
	let t = nl(e), n = (e, r, i, a) => {
		let o = i ? {
			...i,
			direction: "backward"
		} : { direction: "backward" };
		return t(e, r, o, tl(n, a));
	};
	return n;
}, pl = (e) => {
	let t = nl(e), n = (e, r, i, a) => t(e, r, i, tl(n, a));
	return n;
}, ml = (e) => {
	let t = rl(e), n = async (e, r, i, a) => {
		let o = i ? {
			...i,
			direction: "backward"
		} : { direction: "backward" };
		return await t(e, r, o, tl(n, a));
	};
	return n;
}, hl = (e) => {
	let t = rl(e), n = async (e, r, i, a) => await t(e, r, i, tl(n, a));
	return n;
}, gl = (e) => (t, n, r) => {
	let i = r ? {
		...r,
		direction: "backward"
	} : { direction: "backward" };
	return il(e)(t, n, i);
}, _l = (e) => (t, n, r) => il(e)(t, n, r), vl = (e) => async (t, n, r) => {
	let i = r ? {
		...r,
		direction: "backward"
	} : { direction: "backward" };
	return ol(e)(t, n, i);
}, yl = (e) => async (t, n, r) => ol(e)(t, n, r), bl = /^[cC][0-9a-z]{6,}$/, xl = /^[0-9a-z]+$/, Sl = /^[0-7][0-9A-HJKMNP-TV-Za-hjkmnp-tv-z]{25}$/, Cl = /^[0-9a-vA-V]{20}$/, wl = /^[A-Za-z0-9]{27}$/, Tl = /^[a-zA-Z0-9_-]{21}$/;
function El(e) {
	return RegExp(`^[a-zA-Z0-9_-]{${e}}$`);
}
var Dl = /^P(?:(\d+W)|(?!.*W)(?=\d|T\d)(\d+Y)?(\d+M)?(\d+D)?(T(?=\d)(\d+H)?(\d+M)?(\d+([.,]\d+)?S)?)?)$/, Ol = /^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12})$/, kl = (e) => e ? RegExp(`^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-${e}[0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12})$`) : /^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-8][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}|00000000-0000-0000-0000-000000000000|ffffffff-ffff-ffff-ffff-ffffffffffff)$/, Al = /^(?:[A-Za-z0-9_'+\-]+\.)*[A-Za-z0-9_'+\-]*[A-Za-z0-9_+-]@(?:[A-Za-z0-9][A-Za-z0-9\-]*\.)+[A-Za-z]{2,}$/, jl = "^(?=[\\s\\S]*[\\p{Extended_Pictographic}\\p{Regional_Indicator}\\u20E3])[\\p{Extended_Pictographic}\\p{Emoji_Component}]+$";
function Ml() {
	return new RegExp(jl, "u");
}
var Nl = /^(?:(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])$/, Pl = /^(([0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:))$/, Fl = /^((25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\/([0-9]|[1-2][0-9]|3[0-2])$/, Il = /^(([0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:))\/(12[0-8]|1[01][0-9]|[1-9]?[0-9])$/, Ll = /^$|^(?:[0-9a-zA-Z+/]{4})*(?:(?:[0-9a-zA-Z+/]{2}==)|(?:[0-9a-zA-Z+/]{3}=))?$/, Rl = /^(?:[A-Za-z0-9_-]{4})*(?:[A-Za-z0-9_-]{2,3})?$/, zl = /^https?$/, Bl = /^\+[1-9]\d{6,14}$/, Vl = "(?:(?:\\d\\d[2468][048]|\\d\\d[13579][26]|\\d\\d0[48]|[02468][048]00|[13579][26]00)-02-29|\\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\\d|30)|(?:02)-(?:0[1-9]|1\\d|2[0-8])))";
function Hl(e) {
	return RegExp(`^${e}$`);
}
var Ul = /*@__PURE__*/ Hl(Vl);
function Wl(e) {
	let t = "(?:[01]\\d|2[0-3]):[0-5]\\d";
	return typeof e.precision == "number" ? e.precision === -1 ? `${t}` : e.precision === 0 ? `${t}:[0-5]\\d` : `${t}:[0-5]\\d\\.\\d{${e.precision}}` : e.seconds ? `${t}:[0-5]\\d(?:\\.\\d+)?` : `${t}(?::[0-5]\\d(?:\\.\\d+)?)?`;
}
function Gl(e) {
	return RegExp(`^${Wl(e)}$`);
}
function Kl(e) {
	let t = ["Z"];
	e.offset && t.push("([+-](?:[01]\\d|2[0-3]):[0-5]\\d)");
	let n = `${Wl({
		precision: e.precision,
		seconds: !0
	})}(?:${t.join("|")})`, r = e.local ? `${n}|${Wl({ precision: e.precision })}` : n;
	return RegExp(`^${Vl}T(?:${r})$`);
}
var ql = /^[\s\S]{0,}$/, Jl = /^-?\d+$/, Yl = /^-?\d+(?:\.\d+)?$/, Xl = /^(?:true|false)$/i, Zl = /^null$/i, Ql = /^[^A-Z]*$/, $l = /^[^a-z]*$/, eu = /*@__PURE__*/ K("$ZodCheck", (e, t) => {
	var n;
	e._zod ??= {}, e._zod.def = t, (n = e._zod).onattach ?? (n.onattach = []);
}), tu = (e) => {
	let t = e.value;
	return !js(t) && t.length !== void 0;
}, nu = {
	number: "number",
	bigint: "bigint",
	object: "date"
}, ru = /*@__PURE__*/ K("$ZodCheckLessThan", (e, t) => {
	eu.init(e, t);
	let n = nu[typeof t.value];
	e._zod.check = (r) => {
		(t.inclusive ? r.value <= t.value : r.value < t.value) || r.issues.push({
			origin: nu[typeof r.value] ?? n,
			code: "too_big",
			maximum: typeof t.value == "object" ? t.value.getTime() : t.value,
			input: r.value,
			inclusive: t.inclusive,
			inst: e,
			continue: !t.abort
		});
	};
}), iu = /*@__PURE__*/ K("$ZodCheckGreaterThan", (e, t) => {
	eu.init(e, t);
	let n = nu[typeof t.value];
	e._zod.check = (r) => {
		(t.inclusive ? r.value >= t.value : r.value > t.value) || r.issues.push({
			origin: nu[typeof r.value] ?? n,
			code: "too_small",
			minimum: typeof t.value == "object" ? t.value.getTime() : t.value,
			input: r.value,
			inclusive: t.inclusive,
			inst: e,
			continue: !t.abort
		});
	};
}), au = /*@__PURE__*/ K("$ZodCheckMultipleOf", (e, t) => {
	eu.init(e, t), e._zod.check = (n) => {
		if (typeof n.value != typeof t.value) throw Error("Cannot mix number and bigint in multiple_of check.");
		(typeof n.value == "bigint" ? t.value !== BigInt(0) && n.value % t.value === BigInt(0) : Ns(n.value, t.value) === 0) || n.issues.push({
			origin: typeof n.value,
			code: "not_multiple_of",
			divisor: t.value,
			input: n.value,
			inst: e,
			continue: !t.abort
		});
	};
}), ou = /*@__PURE__*/ K("$ZodCheckNumberFormat", (e, t) => {
	eu.init(e, t), t.format = t.format || "float64";
	let n = t.format?.includes("int"), r = n ? "int" : "number", [i, a] = nc[t.format];
	e._zod.check = (o) => {
		let s = o.value;
		if (n) {
			if (!Number.isInteger(s)) {
				o.issues.push({
					expected: r,
					format: t.format,
					code: "invalid_type",
					continue: !1,
					input: s,
					inst: e
				});
				return;
			}
			if (!Number.isSafeInteger(s)) {
				s > 0 ? o.issues.push({
					input: s,
					code: "too_big",
					maximum: 2 ** 53 - 1,
					note: "Integers must be within the safe integer range.",
					inst: e,
					origin: r,
					inclusive: !0,
					continue: !t.abort
				}) : o.issues.push({
					input: s,
					code: "too_small",
					minimum: -(2 ** 53 - 1),
					note: "Integers must be within the safe integer range.",
					inst: e,
					origin: r,
					inclusive: !0,
					continue: !t.abort
				});
				return;
			}
		}
		s < i && o.issues.push({
			origin: "number",
			input: s,
			code: "too_small",
			minimum: i,
			inclusive: !0,
			inst: e,
			continue: !t.abort
		}), s > a && o.issues.push({
			origin: "number",
			input: s,
			code: "too_big",
			maximum: a,
			inclusive: !0,
			inst: e,
			continue: !t.abort
		});
	};
}), su = /*@__PURE__*/ K("$ZodCheckMaxLength", (e, t) => {
	var n;
	eu.init(e, t), (n = e._zod.def).when ?? (n.when = tu), e._zod.check = (n) => {
		let r = n.value, i = r.length;
		if ((typeof r == "string" && i > t.maximum ? bc(r) : i) <= t.maximum) return;
		let a = xc(r);
		n.issues.push({
			origin: a,
			code: "too_big",
			maximum: t.maximum,
			inclusive: !0,
			input: r,
			inst: e,
			continue: !t.abort
		});
	};
}), cu = /*@__PURE__*/ K("$ZodCheckMinLength", (e, t) => {
	var n;
	eu.init(e, t), (n = e._zod.def).when ?? (n.when = tu), e._zod.check = (n) => {
		let r = n.value, i = r.length;
		if ((typeof r == "string" && i >= t.minimum && i < t.minimum * 2 ? bc(r) : i) >= t.minimum) return;
		let a = xc(r);
		n.issues.push({
			origin: a,
			code: "too_small",
			minimum: t.minimum,
			inclusive: !0,
			input: r,
			inst: e,
			continue: !t.abort
		});
	};
}), lu = /*@__PURE__*/ K("$ZodCheckLengthEquals", (e, t) => {
	var n;
	eu.init(e, t), (n = e._zod.def).when ?? (n.when = tu), e._zod.check = (n) => {
		let r = n.value, i = r.length, a = typeof r == "string" && i >= t.length && i <= t.length * 2 ? bc(r) : i;
		if (a === t.length) return;
		let o = xc(r), s = a > t.length;
		n.issues.push({
			origin: o,
			...s ? {
				code: "too_big",
				maximum: t.length
			} : {
				code: "too_small",
				minimum: t.length
			},
			inclusive: !0,
			exact: !0,
			input: n.value,
			inst: e,
			continue: !t.abort
		});
	};
}), uu = /*@__PURE__*/ K("$ZodCheckStringFormat", (e, t) => {
	var n, r;
	eu.init(e, t), t.pattern ? (n = e._zod).check ?? (n.check = (n) => {
		t.pattern.lastIndex = 0, !t.pattern.test(n.value) && n.issues.push({
			origin: "string",
			code: "invalid_format",
			format: t.format,
			input: n.value,
			...t.pattern ? { pattern: t.pattern.toString() } : {},
			inst: e,
			continue: !t.abort
		});
	}) : (r = e._zod).check ?? (r.check = () => {});
}), du = /*@__PURE__*/ K("$ZodCheckRegex", (e, t) => {
	uu.init(e, t), e._zod.check = (n) => {
		t.pattern.lastIndex = 0, !t.pattern.test(n.value) && n.issues.push({
			origin: "string",
			code: "invalid_format",
			format: "regex",
			input: n.value,
			pattern: t.pattern.toString(),
			inst: e,
			continue: !t.abort
		});
	};
}), fu = /*@__PURE__*/ K("$ZodCheckLowerCase", (e, t) => {
	t.pattern ??= Ql, uu.init(e, t);
}), pu = /*@__PURE__*/ K("$ZodCheckUpperCase", (e, t) => {
	t.pattern ??= $l, uu.init(e, t);
}), mu = /*@__PURE__*/ K("$ZodCheckIncludes", (e, t) => {
	eu.init(e, t);
	let n = Qs(t.includes);
	t.pattern = new RegExp(typeof t.position == "number" ? `^.{${t.position},}${n}` : n), e._zod.check = (n) => {
		n.value.includes(t.includes, t.position) || n.issues.push({
			origin: "string",
			code: "invalid_format",
			format: "includes",
			includes: t.includes,
			input: n.value,
			inst: e,
			continue: !t.abort
		});
	};
}), hu = /*@__PURE__*/ K("$ZodCheckStartsWith", (e, t) => {
	eu.init(e, t);
	let n = RegExp(`^${Qs(t.prefix)}.*`);
	t.pattern ??= n, e._zod.check = (n) => {
		n.value.startsWith(t.prefix) || n.issues.push({
			origin: "string",
			code: "invalid_format",
			format: "starts_with",
			prefix: t.prefix,
			input: n.value,
			inst: e,
			continue: !t.abort
		});
	};
}), gu = /*@__PURE__*/ K("$ZodCheckEndsWith", (e, t) => {
	eu.init(e, t);
	let n = RegExp(`.*${Qs(t.suffix)}$`);
	t.pattern ??= n, e._zod.check = (n) => {
		n.value.endsWith(t.suffix) || n.issues.push({
			origin: "string",
			code: "invalid_format",
			format: "ends_with",
			suffix: t.suffix,
			input: n.value,
			inst: e,
			continue: !t.abort
		});
	};
}), _u = /*@__PURE__*/ K("$ZodCheckOverwrite", (e, t) => {
	eu.init(e, t), e._zod.check = (e) => {
		e.value = t.tx(e.value);
	};
}), vu = class {
	constructor(e = [], t = {}) {
		this.content = [], this.indent = 0, this.args = e, this.closed = t;
	}
	indented(e) {
		this.indent += 1;
		try {
			e(this);
		} finally {
			--this.indent;
		}
	}
	write(e) {
		if (typeof e == "function") {
			e(this, { execution: "sync" }), e(this, { execution: "async" });
			return;
		}
		let t = e.split("\n").filter((e) => e), n = Math.min(...t.map((e) => e.length - e.trimStart().length)), r = t.map((e) => e.slice(n)).map((e) => " ".repeat(this.indent * 2) + e);
		for (let e of r) this.content.push(e);
	}
	compile() {
		let e = Function, t = this?.content ?? [""];
		return new e(...Object.keys(this.closed), `return function (${this.args.join(", ")}) {\n${t.join("\n")}\n};`)(...Object.values(this.closed));
	}
}, yu = {
	major: 4,
	minor: 6,
	patch: 5
}, bu = /*@__PURE__*/ K("$ZodType", (e, t) => {
	var n;
	e ??= {}, e._zod.def = t, e._zod.bag = e._zod.bag || {}, e._zod.version = yu;
	let r = e._zod.def.checks, i = e._zod.traits.has("$ZodCheck") ? [e, ...r ?? []] : r?.length ? [...r] : [];
	for (let t of i) for (let n of t._zod.onattach) n(e);
	if (i.length === 0) (n = e._zod).deferred ?? (n.deferred = []), e._zod.deferred?.push(() => {
		e._zod.run = e._zod.parse;
	});
	else {
		let t = (t, n, r) => {
			if (t.memo) return t;
			let i = pc(t), a;
			for (let o of n) {
				if (o._zod.def.when) {
					if (mc(t) || !o._zod.def.when(t)) continue;
				} else if (i) continue;
				let n = t.issues.length, s = o._zod.check(t);
				if (s instanceof Promise && r?.async === !1) throw new Vc();
				if (a || s instanceof Promise) a = (a ?? Promise.resolve()).then(async () => {
					await s, t.issues.length !== n && (_c(t.issues, n, e), i ||= pc(t, n));
				});
				else {
					if (t.issues.length === n) continue;
					_c(t.issues, n, e), i ||= pc(t, n);
				}
			}
			return a ? a.then(() => t) : t;
		}, n = (n, r, a) => {
			if (pc(n)) return n.aborted = !0, n;
			let o = t(r, i, a);
			if (o instanceof Promise) {
				if (a.async === !1) throw new Vc();
				return o.then((t) => e._zod.parse(t, a));
			}
			return e._zod.parse(o, a);
		};
		e._zod.run = (r, a) => {
			if (a.skipChecks) return e._zod.parse(r, a);
			if (a.direction === "backward") {
				let t = e._zod.parse({
					value: r.value,
					issues: []
				}, {
					...a,
					skipChecks: !0
				});
				return t instanceof Promise ? t.then((e) => n(e, r, a)) : n(t, r, a);
			}
			let o = e._zod.parse(r, a);
			if (o instanceof Promise) {
				if (a.async === !1) throw new Vc();
				return o.then((e) => t(e, i, a));
			}
			return t(o, i, a);
		};
	}
}, {
	get "~standard"() {
		return Ec(this, "~standard", Cu(this));
	},
	set "~standard"(e) {
		Tc(this, "~standard", e);
	}
}), xu = (e, t) => e.issues.length ? { issues: e.issues.map((e) => vc(e, t, Wc())) } : { value: e.value };
async function Su(e, t) {
	let n = { async: !0 };
	return xu(await e._zod.run({
		value: t,
		issues: []
	}, n), n);
}
function Cu(e) {
	return {
		validate: (t) => {
			let n = { async: !1 };
			try {
				let r = e._zod.run({
					value: t,
					issues: []
				}, n);
				if (!(r instanceof Promise)) return xu(r, n);
			} catch {}
			return Su(e, t);
		},
		vendor: "zod",
		version: 1
	};
}
var wu = /*@__PURE__*/ K("$ZodString", (e, t) => {
	bu.init(e, t), e._zod.pattern = t.pattern ?? ql, e._zod.parse = (n, r) => {
		if (t.coerce) try {
			n.value = String(n.value);
		} catch {}
		return typeof n.value == "string" || n.issues.push({
			expected: "string",
			code: "invalid_type",
			input: n.value,
			inst: e
		}), n;
	};
}), Tu = /*@__PURE__*/ K("$ZodStringFormat", (e, t) => {
	uu.init(e, t), wu.init(e, t);
}), Eu = /*@__PURE__*/ K("$ZodGUID", (e, t) => {
	t.pattern ??= Ol, Tu.init(e, t);
}), Du = /*@__PURE__*/ K("$ZodUUID", (e, t) => {
	if (t.version) {
		let e = {
			v1: 1,
			v2: 2,
			v3: 3,
			v4: 4,
			v5: 5,
			v6: 6,
			v7: 7,
			v8: 8
		}[t.version];
		if (e === void 0) throw Error(`Invalid UUID version: "${t.version}"`);
		t.pattern ??= kl(e);
	} else t.pattern ??= kl();
	Tu.init(e, t);
}), Ou = /*@__PURE__*/ K("$ZodEmail", (e, t) => {
	t.pattern ??= Al, Tu.init(e, t);
});
function ku(e) {
	try {
		return typeof URL < "u" && typeof URL.canParse == "function" ? URL.canParse(e) : (new URL(e), !0);
	} catch {
		return !1;
	}
}
function Au(e, t) {
	return !("normalize" in t) && !("hostname" in t) && !("protocol" in t) ? ku(e) || 2 : ju(e, t);
}
function ju(e, t) {
	if (!t.normalize && t.protocol?.source === zl.source && !/^https?:\/\//i.test(e)) return 1;
	try {
		if (typeof URL < "u") {
			let t = URL;
			if (typeof t.parse == "function") return t.parse(e) ?? 2;
		}
		return new URL(e);
	} catch {
		return 2;
	}
}
var Mu = /[\t\n\r]/g;
function Nu(e) {
	return e.replace(Mu, "");
}
function Pu(e, t) {
	return t.lastIndex = 0, t.test(e.hostname);
}
function Fu(e, t) {
	return t.lastIndex = 0, t.test(e.protocol.endsWith(":") ? e.protocol.slice(0, -1) : e.protocol);
}
var Iu = /*@__PURE__*/ K("$ZodURL", (e, t) => {
	Tu.init(e, t), e._zod.check = (n) => {
		try {
			let r = n.value.trim(), i = Au(r, t);
			if (i === 1) {
				n.issues.push({
					code: "invalid_format",
					format: "url",
					note: "Invalid URL format",
					input: n.value,
					inst: e,
					continue: !t.abort
				});
				return;
			}
			if (i === 2) {
				n.issues.push({
					code: "invalid_format",
					format: "url",
					input: n.value,
					inst: e,
					continue: !t.abort
				});
				return;
			}
			if (i === !0) {
				n.value = Nu(r);
				return;
			}
			t.hostname && !Pu(i, t.hostname) && n.issues.push({
				code: "invalid_format",
				format: "url",
				note: "Invalid hostname",
				pattern: t.hostname.source,
				input: n.value,
				inst: e,
				continue: !t.abort
			}), t.protocol && !Fu(i, t.protocol) && n.issues.push({
				code: "invalid_format",
				format: "url",
				note: "Invalid protocol",
				pattern: t.protocol.source,
				input: n.value,
				inst: e,
				continue: !t.abort
			}), n.value = t.normalize ? i.href : Nu(r);
			return;
		} catch {
			n.issues.push({
				code: "invalid_format",
				format: "url",
				input: n.value,
				inst: e,
				continue: !t.abort
			});
		}
	};
}), Lu = /*@__PURE__*/ K("$ZodEmoji", (e, t) => {
	t.pattern ??= Ml(), Tu.init(e, t);
}), Ru = /*@__PURE__*/ K("$ZodNanoID", (e, t) => {
	if (t.length !== void 0 && (!Number.isInteger(t.length) || t.length < 1)) throw Error(`Invalid nanoid length: ${t.length}`);
	t.pattern ??= t.length === void 0 ? Tl : El(t.length), Tu.init(e, t);
}), zu = /*@__PURE__*/ K("$ZodCUID", (e, t) => {
	t.pattern ??= bl, Tu.init(e, t);
}), Bu = /*@__PURE__*/ K("$ZodCUID2", (e, t) => {
	t.pattern ??= xl, Tu.init(e, t);
}), Vu = /*@__PURE__*/ K("$ZodULID", (e, t) => {
	t.pattern ??= Sl, Tu.init(e, t);
}), Hu = /*@__PURE__*/ K("$ZodXID", (e, t) => {
	t.pattern ??= Cl, Tu.init(e, t);
}), Uu = /*@__PURE__*/ K("$ZodKSUID", (e, t) => {
	t.pattern ??= wl, Tu.init(e, t);
}), Wu = /*@__PURE__*/ K("$ZodISODateTime", (e, t) => {
	t.pattern ??= Kl(t), Tu.init(e, t);
}), Gu = /*@__PURE__*/ K("$ZodISODate", (e, t) => {
	t.pattern ??= Ul, Tu.init(e, t);
}), Ku = /*@__PURE__*/ K("$ZodISOTime", (e, t) => {
	t.pattern ??= Gl(t), Tu.init(e, t);
}), qu = /*@__PURE__*/ K("$ZodISODuration", (e, t) => {
	t.pattern ??= Dl, Tu.init(e, t);
}), Ju = /*@__PURE__*/ K("$ZodIPv4", (e, t) => {
	t.pattern ??= Nl, Tu.init(e, t);
}), Yu = /^[0-9a-fA-F:.]+$/;
function Xu(e) {
	return Yu.test(e) ? ku(`http://[${e}]`) : !1;
}
var Zu = /*@__PURE__*/ K("$ZodIPv6", (e, t) => {
	t.pattern ??= Pl, Tu.init(e, t), e._zod.check = (n) => {
		Xu(n.value) || n.issues.push({
			code: "invalid_format",
			format: "ipv6",
			input: n.value,
			inst: e,
			continue: !t.abort
		});
	};
}), Qu = /*@__PURE__*/ K("$ZodCIDRv4", (e, t) => {
	t.pattern ??= Fl, Tu.init(e, t);
});
function $u(e) {
	let t = e.split("/");
	if (t.length !== 2) return !1;
	let [n, r] = t;
	if (!r) return !1;
	let i = Number(r);
	return `${i}` !== r || i < 0 || i > 128 ? !1 : Xu(n);
}
var ed = /*@__PURE__*/ K("$ZodCIDRv6", (e, t) => {
	t.pattern ??= Il, Tu.init(e, t), e._zod.check = (n) => {
		$u(n.value) || n.issues.push({
			code: "invalid_format",
			format: "cidrv6",
			input: n.value,
			inst: e,
			continue: !t.abort
		});
	};
});
function td(e) {
	if (e === "") return !0;
	if (/\s/.test(e) || e.length % 4 != 0) return !1;
	try {
		return atob(e), !0;
	} catch {
		return !1;
	}
}
var nd = /^[0-9a-zA-Z+/]*={0,2}$/, rd = /*@__PURE__*/ K("$ZodBase64", (e, t) => {
	t.pattern ??= nd, Tu.init(e, t), e._zod.check = (n) => {
		td(n.value) || n.issues.push({
			code: "invalid_format",
			format: "base64",
			input: n.value,
			inst: e,
			continue: !t.abort
		});
	};
}), id = /^[A-Za-z0-9_-]*$/;
function ad(e) {
	if (!id.test(e)) return !1;
	let t = e.replace(/[-_]/g, (e) => e === "-" ? "+" : "/");
	return td(t.padEnd(Math.ceil(t.length / 4) * 4, "="));
}
var od = /*@__PURE__*/ K("$ZodBase64URL", (e, t) => {
	t.pattern ??= id, Tu.init(e, t), e._zod.check = (n) => {
		ad(n.value) || n.issues.push({
			code: "invalid_format",
			format: "base64url",
			input: n.value,
			inst: e,
			continue: !t.abort
		});
	};
}), sd = /*@__PURE__*/ K("$ZodE164", (e, t) => {
	t.pattern ??= Bl, Tu.init(e, t);
});
function cd(e, t = null) {
	try {
		let n = e.split(".");
		if (n.length !== 3) return !1;
		let [r] = n;
		if (!r) return !1;
		let i = JSON.parse(atob(r));
		return !("typ" in i && i?.typ !== "JWT" || !i.alg || t && (!("alg" in i) || i.alg !== t));
	} catch {
		return !1;
	}
}
var ld = /*@__PURE__*/ K("$ZodJWT", (e, t) => {
	Tu.init(e, t), e._zod.check = (n) => {
		cd(n.value, t.alg) || n.issues.push({
			code: "invalid_format",
			format: "jwt",
			input: n.value,
			inst: e,
			continue: !t.abort
		});
	};
}), ud = /*@__PURE__*/ K("$ZodNumber", (e, t) => {
	bu.init(e, t), e._zod.pattern = Yl, e._zod.parse = (n, r) => {
		if (t.coerce) try {
			n.value = Number(n.value);
		} catch {}
		let i = n.value;
		if (typeof i == "number" && !Number.isNaN(i) && Number.isFinite(i)) return n;
		let a = typeof i == "number" ? Number.isNaN(i) ? "NaN" : Number.isFinite(i) ? void 0 : String(i) : void 0;
		return n.issues.push({
			expected: "number",
			code: "invalid_type",
			input: i,
			inst: e,
			...a ? { received: a } : {}
		}), n;
	};
}), dd = /*@__PURE__*/ K("$ZodNumberFormat", (e, t) => {
	ou.init(e, t), ud.init(e, t);
}), fd = /*@__PURE__*/ K("$ZodBoolean", (e, t) => {
	bu.init(e, t), e._zod.pattern = Xl, e._zod.parse = (n, r) => {
		if (t.coerce) try {
			n.value = !!n.value;
		} catch {}
		let i = n.value;
		return typeof i == "boolean" || n.issues.push({
			expected: "boolean",
			code: "invalid_type",
			input: i,
			inst: e
		}), n;
	};
}), pd = /*@__PURE__*/ K("$ZodNull", (e, t) => {
	bu.init(e, t), e._zod.pattern = Zl, e._zod.values = /* @__PURE__ */ new Set([null]), e._zod.parse = (t, n) => {
		let r = t.value;
		return r === null || t.issues.push({
			expected: "null",
			code: "invalid_type",
			input: r,
			inst: e
		}), t;
	};
}), md = /*@__PURE__*/ K("$ZodUnknown", (e, t) => {
	bu.init(e, t), e._zod.parse = (e) => e;
}), hd = /*@__PURE__*/ K("$ZodNever", (e, t) => {
	bu.init(e, t), e._zod.parse = (t, n) => (t.issues.push({
		expected: "never",
		code: "invalid_type",
		input: t.value,
		inst: e
	}), t);
});
function gd(e, t, n) {
	e.issues.length && t.issues.push(...hc(n, e.issues)), t.value[n] = e.value;
}
var _d = /*@__PURE__*/ K("$ZodArray", (e, t) => {
	bu.init(e, t);
	let n = Uc.memoizer;
	n?.attach(e), e._zod.parse = (r, i) => {
		let a = r.value;
		if (!Array.isArray(a)) return r.issues.push({
			expected: "array",
			code: "invalid_type",
			input: a,
			inst: e
		}), r;
		r.value = n ? n.alloc(e, r, Array(a.length), i) : Array(a.length);
		let o = [], s = i?.abortEarly;
		for (let e = 0; e < a.length; e++) {
			let n = a[e], c = t.element._zod.run({
				value: n,
				issues: []
			}, i);
			if (c instanceof Promise) o.push(c.then((t) => gd(t, r, e)));
			else if (gd(c, r, e), s && c.issues.length !== 0 && pc(c)) break;
		}
		return o.length ? Promise.all(o).then(() => r) : r;
	};
});
function vd(e, t, n, r, i, a) {
	let o = n in r, s = a === "optional";
	if (o || !s || i !== "optional") {
		if (e.issues.length) {
			if (i !== void 0 && s && !o) return;
			t.issues.push(...hc(n, e.issues));
		}
		!o && i === void 0 ? e.issues.length || t.issues.push({
			code: "invalid_type",
			expected: "nonoptional",
			input: void 0,
			path: [n]
		}) : e.value === void 0 ? (o || i === "defaulted" && !s) && (t.value[n] = void 0) : t.value[n] = e.value;
	}
}
var yd = [];
function bd(e) {
	let t = Object.keys(e.shape), n = Object.getOwnPropertySymbols(e.shape), r = n.length ? n : yd, i = r.length ? [...t, ...r] : t;
	for (let t of i) if (!e.shape?.[t]?._zod?.traits?.has("$ZodType")) throw Error(`Invalid element at key "${String(t)}": expected a Zod schema`);
	let a = tc(e.shape);
	return {
		...e,
		allKeys: i,
		symbolKeys: r,
		keySet: new Set(t),
		numKeys: t.length,
		optionalKeys: new Set(a)
	};
}
function xd(e, t, n, r, i, a, o) {
	let s = [], c = i.keySet, l = i.catchall._zod, u = l.def.type, d = l.optin, f = l.optout, p = 0;
	for (let i in t) {
		if (o && n.issues.length !== p) {
			if (pc(n, p)) break;
			p = n.issues.length;
		}
		if (c.has(i)) continue;
		if (i === "__proto__") {
			u === "never" && s.push(i);
			continue;
		}
		if (u === "never") {
			s.push(i);
			continue;
		}
		let a = l.run({
			value: t[i],
			issues: []
		}, r);
		a instanceof Promise ? e.push(a.then((e) => vd(e, n, i, t, d, f))) : vd(a, n, i, t, d, f);
	}
	return s.length && n.issues.push({
		code: "unrecognized_keys",
		keys: s,
		input: t,
		inst: a,
		continue: !0
	}), e.length ? Promise.all(e).then(() => n) : n;
}
var Sd = /*@__PURE__*/ K("$ZodObject", (e, t) => {
	bu.init(e, t);
	let n = Object.getOwnPropertyDescriptor(t, "shape"), r = n?.get ? n.get.raw : t.shape ?? {};
	if (r) {
		let e = () => {
			let n = { ...r };
			return Object.defineProperty(t, "shape", { value: n }), e.raw = n, n;
		};
		e.raw = r, Object.defineProperty(t, "shape", { get: e });
	}
	let i = As(() => bd(t));
	Nc(e, "propValues", (e) => {
		let t = e.def.shape, n = {};
		for (let e in t) {
			let r = t[e]._zod;
			if (r.values) {
				Object.prototype.hasOwnProperty.call(n, e) || Is(n, e, /* @__PURE__ */ new Set());
				for (let t of r.values) n[e].add(t);
				r.optin !== void 0 && n[e].add(void 0);
			}
		}
		return n;
	});
	let a = qs, o = t.catchall, s, c = Uc.memoizer;
	c?.attach(e), e._zod.parse = (t, n) => {
		s ??= i.value;
		let r = t.value;
		if (!a(r)) return t.issues.push({
			expected: "object",
			code: "invalid_type",
			input: r,
			inst: e
		}), t;
		t.value = c ? c.alloc(e, t, {}, n) : {};
		let l = [], u = s.shape, d = n?.abortEarly, f = t.issues.length;
		for (let e of s.allKeys) {
			if (d && t.issues.length !== f) {
				if (pc(t, f)) break;
				f = t.issues.length;
			}
			if (e === "__proto__") continue;
			let i = u[e], a = i._zod.optin, o = i._zod.optout, s = i._zod.run({
				value: r[e],
				issues: []
			}, n);
			s instanceof Promise ? l.push(s.then((n) => vd(n, t, e, r, a, o))) : vd(s, t, e, r, a, o);
		}
		return o ? xd(l, r, t, n, i.value, e, d === !0) : l.length ? Promise.all(l).then(() => t) : t;
	};
}), Cd = /*@__PURE__*/ K("$ZodObjectJIT", (e, t) => {
	Sd.init(e, t);
	let n = e._zod.parse, r = As(() => bd(t)), i = Uc.memoizer, a = (t) => {
		let n = r.value, a = n.symbolKeys, o = new vu(["payload", "ctx"], {
			shape: t,
			inst: e,
			memo: i,
			syms: a
		}), s = (e) => `shape[${e}]._zod.run({ value: input[${e}], issues: [] }, ctx)`, c = (e, t) => `
          let ${e}_ab = false;
          for (let i = 0; i < ${e}.issues.length; i++) {
            const iss = ${e}.issues[i];
            iss.path = iss.path ? [${t}, ...iss.path] : [${t}];
            payload.issues.push(iss);
            if (iss.continue !== true) ${e}_ab = true;
          }
          if (${e}_ab && ctx && ctx.abortEarly) {
            payload.value = newResult;
            return payload;
          }`;
		o.write("const input = payload.value;");
		let l = Object.create(null), u = 0;
		for (let e of n.allKeys) l[e] = `key_${u++}`;
		o.write(i ? "const newResult = memo.alloc(inst, payload, {}, ctx);" : "const newResult = {};");
		for (let e of n.allKeys) {
			if (e === "__proto__") continue;
			let n = l[e], r = typeof e == "symbol" ? `syms[${a.indexOf(e)}]` : Ws(e), i = `${r} in input`, u = t[e], d = u?._zod?.optin, f = d !== void 0, p = u?._zod?.optout === "optional";
			if (o.write(`const ${n} = ${s(r)};`), f && p) {
				let e = d === "optional" ? `${n}_present` : `${n}.value !== undefined || ${n}_present`;
				o.write(`
        const ${n}_present = ${i};
        if (!${n}.issues.length || ${n}_present) {
          if (${n}.issues.length) {${c(n, r)}
          }

          if (${e}) {
            newResult[${r}] = ${n}.value;
          }
        }

      `);
			} else f ? (o.write(`
        if (${n}.issues.length) {${c(n, r)}
        }
      `), d === "defaulted" ? o.write(`newResult[${r}] = ${n}.value;`) : o.write(`
        if (${n}.value !== undefined || ${i}) {
          newResult[${r}] = ${n}.value;
        }
      `)) : o.write(`
        const ${n}_present = ${i};
        if (${n}.issues.length) {${c(n, r)}
        }
        if (!${n}_present && !${n}.issues.length) {
          payload.issues.push({
            code: "invalid_type",
            expected: "nonoptional",
            input: undefined,
            path: [${r}]
          });
          if (ctx && ctx.abortEarly) {
            payload.value = newResult;
            return payload;
          }
        }

        if (${n}_present) {
          newResult[${r}] = ${n}.value;
        }

      `);
		}
		return o.write("payload.value = newResult;"), o.write("return payload;"), o.compile();
	}, o, s = qs, c = !Uc.jitless, l = c && Js.value, u = t.catchall, d;
	e._zod.parse = (i, f) => {
		d ??= r.value;
		let p = i.value;
		return s(p) ? c && l && f?.async === !1 && f.jitless !== !0 ? (o ||= a(t.shape), i = o(i, f), u ? xd([], p, i, f, d, e, f?.abortEarly === !0) : i) : n(i, f) : (i.issues.push({
			expected: "object",
			code: "invalid_type",
			input: p,
			inst: e
		}), i);
	};
});
function wd(e, t, n, r) {
	for (let n of e) if (n.issues.length === 0) return t.value = n.value, t;
	let i = e.filter((e) => !pc(e));
	return i.length === 1 ? (t.value = i[0].value, i[0]) : (t.issues.push({
		code: "invalid_union",
		input: t.value,
		inst: n,
		errors: e.map((e) => e.issues.map((e) => vc(e, r, Wc())))
	}), t);
}
var Td = /*@__PURE__*/ K("$ZodUnion", (e, t) => {
	bu.init(e, t), Nc(e, "optin", (e) => e.def.options.some((e) => e._zod.optin === "defaulted") ? "defaulted" : e.def.options.some((e) => e._zod.optin !== void 0) ? "optional" : void 0), Nc(e, "optout", (e) => e.def.options.some((e) => e._zod.optout === "optional") ? "optional" : void 0), Nc(e, "values", (e) => {
		if (e.def.options.every((e) => e._zod.values)) return new Set(e.def.options.flatMap((e) => Array.from(e._zod.values)));
	}), Nc(e, "pattern", (e) => {
		if (e.def.options.every((e) => e._zod.pattern)) {
			let t = e.def.options.map((e) => e._zod.pattern);
			return RegExp(`^(${t.map((e) => Ms(e.source)).join("|")})$`);
		}
	});
	let n = t.options.length === 1 ? t.options[0]._zod.run : null;
	e._zod.parse = (r, i) => {
		if (n) return n(r, i);
		let a = !1, o = [];
		for (let e of t.options) {
			let t = e._zod.run({
				value: r.value,
				issues: []
			}, i);
			if (t instanceof Promise) o.push(t), a = !0;
			else {
				if (t.issues.length === 0) return t;
				o.push(t);
			}
		}
		return a ? Promise.all(o).then((t) => wd(t, r, e, i)) : wd(o, r, e, i);
	};
});
function Ed(e) {
	let t = /* @__PURE__ */ new Map();
	for (let n of e.options) {
		let r = n._zod.propValues?.[e.discriminator];
		if (!r || r.size === 0) throw Error(`Invalid discriminated union option at index "${e.options.indexOf(n)}"`);
		for (let e of r) if (t.has(e)) {
			if (e !== void 0) throw Error(`Duplicate discriminator value "${String(e)}"`);
			t.set(e, null);
		} else t.set(e, n);
	}
	return t;
}
var Dd = /*@__PURE__*/ K("$ZodDiscriminatedUnion", (e, t) => {
	t.inclusive = !1, Td.init(e, t);
	let n = e._zod.parse;
	Nc(e, "propValues", (e) => {
		let t = {}, n = 0;
		for (let r of e.def.options) {
			let i = r._zod.propValues;
			if (!i || Object.keys(i).length === 0) throw Error(`Invalid discriminated union option at index "${e.def.options.indexOf(r)}"`);
			i[e.def.discriminator]?.has(void 0) && n++;
			for (let [e, n] of Object.entries(i)) {
				Object.prototype.hasOwnProperty.call(t, e) || Is(t, e, /* @__PURE__ */ new Set());
				for (let r of n) t[e].add(r);
			}
		}
		return !e.def.unionFallback && n > 1 && t[e.def.discriminator]?.delete(void 0), t;
	}), t.options.forEach((e, n) => {
		let r = Ls(e._zod.def);
		if (r && !Object.prototype.hasOwnProperty.call(r, t.discriminator)) throw Error(`Invalid discriminated union option at index "${n}"`);
	});
	let r = As(() => Ed(t));
	e._zod.parse = (i, a) => {
		let o = i.value;
		if (!qs(o)) return i.issues.push({
			code: "invalid_type",
			expected: "object",
			input: o,
			inst: e
		}), i;
		let s = o?.[t.discriminator], c = r.value.get(s);
		return c && (s !== void 0 || a.direction !== "backward") ? c._zod.run(i, a) : t.unionFallback || a.direction === "backward" ? n(i, a) : (i.issues.push({
			code: "invalid_union",
			errors: [],
			note: "No matching discriminator",
			discriminator: t.discriminator,
			options: Array.from(r.value.keys()).filter((e) => r.value.get(e) !== null),
			input: o,
			path: [t.discriminator],
			inst: e
		}), i);
	};
}), Od = /*@__PURE__*/ K("$ZodIntersection", (e, t) => {
	bu.init(e, t), e._zod.parse = (e, n) => {
		let r = e.value, i = t.left._zod.run({
			value: r,
			issues: []
		}, n), a = t.right._zod.run({
			value: r,
			issues: []
		}, n);
		return i instanceof Promise || a instanceof Promise ? Promise.all([i, a]).then(([t, n]) => Ad(e, t, n)) : Ad(e, i, a);
	};
});
function kd(e, t) {
	if (e === t || e instanceof Date && t instanceof Date && +e == +t) return {
		valid: !0,
		data: e
	};
	if (Ys(e) && Ys(t)) {
		let n = Object.keys(t), r = Object.keys(e).filter((e) => n.indexOf(e) !== -1), i = {
			...e,
			...t
		};
		Object.prototype.hasOwnProperty.call(i, "__proto__") && delete i.__proto__;
		for (let n of r) {
			if (n === "__proto__") continue;
			let r = kd(e[n], t[n]);
			if (!r.valid) return {
				valid: !1,
				mergeErrorPath: [n, ...r.mergeErrorPath]
			};
			i[n] = r.data;
		}
		return {
			valid: !0,
			data: i
		};
	}
	if (Array.isArray(e) && Array.isArray(t)) {
		if (e.length !== t.length) return {
			valid: !1,
			mergeErrorPath: []
		};
		let n = [];
		for (let r = 0; r < e.length; r++) {
			let i = e[r], a = t[r], o = kd(i, a);
			if (!o.valid) return {
				valid: !1,
				mergeErrorPath: [r, ...o.mergeErrorPath]
			};
			n.push(o.data);
		}
		return {
			valid: !0,
			data: n
		};
	}
	return {
		valid: !1,
		mergeErrorPath: []
	};
}
function Ad(e, t, n) {
	let r = /* @__PURE__ */ new Map(), i, a = /* @__PURE__ */ new Map(), o = (e, t) => {
		let n;
		if (e.code === "unrecognized_keys" && !e.path?.length) i ??= e, n = e.keys;
		else if (e.code === "invalid_key" && e.origin === "record" && e.path?.length === 1) {
			let t = String(e.path[0]);
			a.has(t) || a.set(t, e), n = [t];
		} else return !1;
		for (let e of n) r.has(e) || r.set(e, {}), r.get(e)[t] = !0;
		return !0;
	};
	for (let n of t.issues) o(n, "l") || e.issues.push(n);
	for (let t of n.issues) o(t, "r") || e.issues.push(t);
	let s = [...r].filter(([, e]) => e.l && e.r).map(([e]) => e);
	if (s.length) {
		let t = i ? s.filter((e) => i.keys.includes(e)) : [];
		t.length && e.issues.push({
			...i,
			keys: t
		});
		for (let n of s) !t.includes(n) && a.has(n) && e.issues.push(a.get(n));
	}
	let c = kd(t.value, n.value);
	if (!c.valid) {
		if (pc(e)) return e;
		throw Error(`Unmergable intersection. Error path: ${JSON.stringify(c.mergeErrorPath)}`);
	}
	return e.value = c.data, e;
}
var jd = /*@__PURE__*/ K("$ZodRecord", (e, t) => {
	bu.init(e, t);
	let n = Uc.memoizer;
	n?.attach(e), e._zod.parse = (r, i) => {
		let a = r.value;
		if (!Ys(a)) return r.issues.push({
			expected: "record",
			code: "invalid_type",
			input: a,
			inst: e
		}), r;
		let o = [], s = t.keyType._zod.values;
		if (s && !t.partial) {
			r.value = n ? n.alloc(e, r, {}, i) : {};
			let c = /* @__PURE__ */ new Set();
			for (let n of s) if (typeof n == "string" || typeof n == "number" || typeof n == "symbol") {
				if (c.add(typeof n == "number" ? n.toString() : n), n === "__proto__") continue;
				let s = t.keyType._zod.run({
					value: n,
					issues: []
				}, i);
				if (s instanceof Promise) throw Error("Async schemas not supported in object keys currently");
				if (s.issues.length) {
					r.issues.push({
						code: "invalid_key",
						origin: "record",
						issues: s.issues.map((e) => vc(e, i, Wc())),
						input: n,
						path: [n],
						inst: e
					});
					continue;
				}
				let l = s.value;
				if (l === "__proto__") continue;
				let u = t.valueType._zod.run({
					value: a[n],
					issues: []
				}, i);
				u instanceof Promise ? o.push(u.then((e) => {
					e.issues.length && r.issues.push(...hc(n, e.issues)), r.value[l] = e.value;
				})) : (u.issues.length && r.issues.push(...hc(n, u.issues)), r.value[l] = u.value);
			}
			let l;
			for (let e in a) if (!c.has(e)) {
				if (t.mode === "loose") {
					if (e === "__proto__") continue;
					r.value[e] = a[e];
				} else l ??= [], l.push(e);
			}
			l && l.length > 0 && r.issues.push({
				code: "unrecognized_keys",
				input: a,
				inst: e,
				keys: l,
				continue: !0
			});
		} else {
			r.value = n ? n.alloc(e, r, {}, i) : {};
			let c;
			for (let n of Reflect.ownKeys(a)) {
				if (n === "__proto__" || !Object.prototype.propertyIsEnumerable.call(a, n)) continue;
				let l = t.keyType._zod.run({
					value: n,
					issues: []
				}, i);
				if (l instanceof Promise) throw Error("Async schemas not supported in object keys currently");
				if (typeof n == "string" && Yl.test(n) && l.issues.length) {
					let e = t.keyType._zod.run({
						value: Number(n),
						issues: []
					}, i);
					if (e instanceof Promise) throw Error("Async schemas not supported in object keys currently");
					e.issues.length === 0 && (l = e);
				}
				if (l.issues.length) {
					t.mode === "loose" ? r.value[n] = a[n] : s ? (c ??= [], c.push(n)) : r.issues.push({
						code: "invalid_key",
						origin: "record",
						issues: l.issues.map((e) => vc(e, i, Wc())),
						input: n,
						path: [n],
						inst: e
					});
					continue;
				}
				let u = l.value;
				if (u === "__proto__") continue;
				let d = t.valueType._zod.run({
					value: a[n],
					issues: []
				}, i);
				d instanceof Promise ? o.push(d.then((e) => {
					e.issues.length && r.issues.push(...hc(n, e.issues)), r.value[u] = e.value;
				})) : (d.issues.length && r.issues.push(...hc(n, d.issues)), r.value[u] = d.value);
			}
			c && c.length > 0 && r.issues.push({
				code: "unrecognized_keys",
				input: a,
				inst: e,
				keys: c,
				continue: !0
			});
		}
		return o.length ? Promise.all(o).then(() => r) : r;
	};
}), Md = /*@__PURE__*/ K("$ZodEnum", (e, t) => {
	bu.init(e, t);
	let n = Es(t.entries), r = new Set(n);
	e._zod.values = r, Nc(e, "pattern", (e) => {
		let t = Es(e.def.entries).filter((e) => Zs.has(typeof e));
		return RegExp(t.length ? `^(${t.map((e) => Qs(e.toString())).join("|")})$` : "^[^\\s\\S]$");
	}), e._zod.parse = (t, i) => {
		let a = t.value;
		return r.has(a) || t.issues.push({
			code: "invalid_value",
			values: n,
			input: a,
			inst: e
		}), t;
	};
}), Nd = /*@__PURE__*/ K("$ZodLiteral", (e, t) => {
	bu.init(e, t);
	let n = new Set(t.values);
	e._zod.values = n, Nc(e, "pattern", (e) => {
		let t = e.def.values;
		return RegExp(t.length ? `^(${t.map((e) => typeof e == "string" ? Qs(e) : e ? Qs(e.toString()) : String(e)).join("|")})$` : "^[^\\s\\S]$");
	}), e._zod.parse = (r, i) => {
		let a = r.value;
		return n.has(a) || r.issues.push({
			code: "invalid_value",
			values: t.values,
			input: a,
			inst: e
		}), r;
	};
}), Pd = /*@__PURE__*/ K("$ZodTransform", (e, t) => {
	bu.init(e, t), e._zod.optin = "optional", Uc.memoizer?.guard(e), e._zod.parse = (n, r) => {
		if (r.direction === "backward") throw new Hc(e.constructor.name);
		let i = t.transform(n.value, n);
		if (r.async) return (i instanceof Promise ? i : Promise.resolve(i)).then((e) => (n.value = e, n));
		if (i instanceof Promise) throw new Vc();
		return n.value = i, n;
	};
});
function Fd(e, t) {
	return e.value = t.issues.length ? void 0 : t.value, e;
}
var Id = /*@__PURE__*/ K("$ZodOptional", (e, t) => {
	bu.init(e, t), Nc(e, "optin", (e) => e.def.innerType._zod.optin === "defaulted" ? "defaulted" : "optional"), e._zod.optout = "optional", Nc(e, "values", (e) => {
		let t = e.def.innerType._zod.values;
		return t ? /* @__PURE__ */ new Set([...t, void 0]) : void 0;
	}), Nc(e, "pattern", (e) => {
		let t = e.def.innerType._zod.pattern;
		return t ? RegExp(`^(${Ms(t.source)})?$`) : void 0;
	}), e._zod.parse = (e, n) => {
		if (e.value === void 0) {
			if (t.innerType._zod.optin !== "defaulted") return e;
			let r = t.innerType._zod.run({
				value: e.value,
				issues: []
			}, n);
			return r instanceof Promise ? r.then((t) => Fd(e, t)) : Fd(e, r);
		}
		return t.innerType._zod.run(e, n);
	};
}), Ld = /*@__PURE__*/ K("$ZodExactOptional", (e, t) => {
	Id.init(e, t), Nc(e, "values", (e) => e.def.innerType._zod.values), Nc(e, "pattern", (e) => e.def.innerType._zod.pattern), e._zod.parse = (e, n) => t.innerType._zod.run(e, n);
}), Rd = /*@__PURE__*/ K("$ZodNullable", (e, t) => {
	bu.init(e, t), Nc(e, "optin", (e) => e.def.innerType._zod.optin), Nc(e, "optout", (e) => e.def.innerType._zod.optout), Nc(e, "pattern", (e) => {
		let t = e.def.innerType._zod.pattern;
		return t ? RegExp(`^(${Ms(t.source)}|null)$`) : void 0;
	}), Nc(e, "values", (e) => e.def.innerType._zod.values ? /* @__PURE__ */ new Set([...e.def.innerType._zod.values, null]) : void 0), e._zod.parse = (e, n) => e.value === null ? e : t.innerType._zod.run(e, n);
}), zd = /*@__PURE__*/ K("$ZodDefault", (e, t) => {
	bu.init(e, t), e._zod.optin = "defaulted", Nc(e, "values", (e) => e.def.innerType._zod.values), e._zod.parse = (e, n) => {
		if (n.direction === "backward") return t.innerType._zod.run(e, n);
		if (e.value === void 0) return e.value = t.defaultValue, e;
		let r = t.innerType._zod.run(e, n);
		return r instanceof Promise ? r.then((e) => Bd(e, t)) : Bd(r, t);
	};
});
function Bd(e, t) {
	return e.value === void 0 && (e.value = t.defaultValue), e;
}
var Vd = /*@__PURE__*/ K("$ZodPrefault", (e, t) => {
	bu.init(e, t), e._zod.optin = "defaulted", Nc(e, "values", (e) => e.def.innerType._zod.values), e._zod.parse = (e, n) => (n.direction === "backward" || e.value === void 0 && (e.value = t.defaultValue), t.innerType._zod.run(e, n));
}), Hd = /*@__PURE__*/ K("$ZodNonOptional", (e, t) => {
	bu.init(e, t), Nc(e, "values", (e) => {
		let t = e.def.innerType._zod.values;
		return t ? new Set([...t].filter((e) => e !== void 0)) : void 0;
	}), e._zod.parse = (n, r) => {
		let i = t.innerType._zod.run(n, r);
		return i instanceof Promise ? i.then((t) => Ud(t, e)) : Ud(i, e);
	};
});
function Ud(e, t) {
	return !e.issues.length && e.value === void 0 && e.issues.push({
		code: "invalid_type",
		expected: "nonoptional",
		input: e.value,
		inst: t
	}), e;
}
function Wd(e, t, n, r) {
	return t.issues.length ? (e.value = n.catchValue({
		...t,
		value: e.value,
		error: { issues: t.issues.map((e) => vc(e, r, Wc())) },
		input: e.value
	}), e) : (e.value = t.value, t.memo && (e.memo = !0), e);
}
var Gd = /*@__PURE__*/ K("$ZodCatch", (e, t) => {
	bu.init(e, t), Nc(e, "optin", (e) => e.def.innerType._zod.optin === "defaulted" ? "defaulted" : "optional"), Nc(e, "optout", (e) => e.def.innerType._zod.optout), Nc(e, "values", (e) => e.def.innerType._zod.values), e._zod.parse = (e, n) => {
		if (n.direction === "backward") return t.innerType._zod.run(e, n);
		let r = t.innerType._zod.run({
			value: e.value,
			issues: []
		}, n);
		return r instanceof Promise ? r.then((r) => Wd(e, r, t, n)) : Wd(e, r, t, n);
	};
}), Kd = /*@__PURE__*/ K("$ZodPipe", (e, t) => {
	bu.init(e, t), Nc(e, "values", (e) => e.def.in._zod.values), Nc(e, "optin", (e) => e.def.in._zod.optin), Nc(e, "optout", (e) => e.def.out._zod.optout), Nc(e, "propValues", (e) => e.def.in._zod.propValues), e._zod.parse = (e, n) => {
		if (n.direction === "backward") {
			let r = t.out._zod.run(e, n);
			return r instanceof Promise ? r.then((e) => qd(e, t.in, n)) : qd(r, t.in, n);
		}
		let r = t.in._zod.run(e, n);
		return r instanceof Promise ? r.then((e) => qd(e, t.out, n)) : qd(r, t.out, n);
	};
});
function qd(e, t, n) {
	return e.issues.some((e) => e.code !== "unrecognized_keys") ? (e.aborted = !0, e) : t._zod.run({
		value: e.value,
		issues: e.issues
	}, n);
}
var Jd = /*@__PURE__*/ K("$ZodReadonly", (e, t) => {
	bu.init(e, t), Nc(e, "propValues", (e) => e.def.innerType._zod.propValues), Nc(e, "values", (e) => e.def.innerType._zod.values), Nc(e, "optin", (e) => e.def.innerType?._zod?.optin), Nc(e, "optout", (e) => e.def.innerType?._zod?.optout), e._zod.parse = (e, n) => {
		if (n.direction === "backward") return t.innerType._zod.run(e, n);
		let r = t.innerType._zod.run(e, n);
		return r instanceof Promise ? r.then(Yd) : Yd(r);
	};
});
function Yd(e) {
	return e.memo || (e.value = Object.freeze(e.value)), e;
}
var Xd = /*@__PURE__*/ K("$ZodLazy", (e, t) => {
	bu.init(e, t), Fs(e._zod, "innerType", () => {
		let e = t;
		return e._cachedInner ||= t.getter(), e._cachedInner;
	}), Nc(e, "pattern", (e) => e.innerType?._zod?.pattern), Nc(e, "propValues", (e) => e.innerType?._zod?.propValues), Nc(e, "optin", (e) => e.innerType?._zod?.optin ?? void 0), Nc(e, "optout", (e) => e.innerType?._zod?.optout ?? void 0), e._zod.parse = (t, n) => e._zod.innerType._zod.run(t, n);
}), Zd = /*@__PURE__*/ K("$ZodCustom", (e, t) => {
	eu.init(e, t), bu.init(e, t), e._zod.parse = (e, t) => e, e._zod.check = (n) => {
		let r = n.value, i = t.fn(r);
		if (i instanceof Promise) return i.then((t) => Qd(t, n, r, e));
		Qd(i, n, r, e);
	};
});
function Qd(e, t, n, r) {
	if (!e) {
		let e = {
			code: "custom",
			input: n,
			inst: r,
			path: [...r._zod.def.path ?? []],
			continue: !r._zod.def.abort
		};
		r._zod.def.params && (e.params = r._zod.def.params), t.issues.push(Cc(e));
	}
}
//#endregion
//#region ../../node_modules/.pnpm/zod@4.6.5/node_modules/zod/v4/core/memoizer.js
var $d = class extends Error {
	constructor() {
		super("Cannot parse a reference cycle that closes through a transform"), this.name = "ZodCyclicError";
	}
}, ef = "~memo", tf = [];
function nf(e) {
	return typeof e == "object" && !!e;
}
function rf(e) {
	return e.map((e) => e.path ? {
		...e,
		path: e.path.slice()
	} : { ...e });
}
var af = /*@__PURE__*/ new WeakMap(), of = 0, sf = 1, cf = 2;
function lf(e, t, n) {
	let r = af.get(e);
	if (r !== void 0) return r ? cf : of;
	if (t.has(e)) return cf;
	t.add(e);
	let i = of, a = (e) => {
		if (i !== cf && e?._zod) {
			let r = lf(e, t, n);
			r > i && (i = r);
		}
	}, o = (e, r) => {
		let i = of;
		for (let a of Reflect.ownKeys(e)) {
			let o = Object.getOwnPropertyDescriptor(e, a);
			if (r && !o.enumerable) continue;
			let s = o.get ? sf : o.value?._zod ? lf(o.value, t, n) : of;
			s > i && (i = s);
		}
		return i;
	}, s = (e) => {
		e > i && (i = e);
	}, c = e._zod.def;
	switch (c.type) {
		case "object": {
			let e = Ls(c);
			s(e ? o(e, !0) : sf), a(c.catchall);
			break;
		}
		case "array":
			a(c.element);
			break;
		case "tuple":
			for (let e of c.items) a(e);
			a(c.rest);
			break;
		case "record":
		case "map":
			a(c.keyType), a(c.valueType);
			break;
		case "set":
			a(c.valueType);
			break;
		case "union":
			for (let e of c.options) a(e);
			break;
		case "intersection":
			a(c.left), a(c.right);
			break;
		case "optional":
		case "nullable":
		case "default":
		case "prefault":
		case "catch":
		case "readonly":
		case "nonoptional":
		case "promise":
		case "success":
			a(c.innerType);
			break;
		case "pipe":
			a(c.in), a(c.out);
			break;
		case "function":
			a(c.input), a(c.output);
			break;
		case "lazy": {
			let r = c._cachedInner ?? (n ? e._zod.innerType : void 0);
			s(r ? lf(r, t, !1) : sf);
			break;
		}
		case "template_literal":
		case "string":
		case "number":
		case "int":
		case "boolean":
		case "bigint":
		case "symbol":
		case "undefined":
		case "null":
		case "void":
		case "never":
		case "any":
		case "unknown":
		case "date":
		case "nan":
		case "enum":
		case "literal":
		case "file":
		case "transform":
		case "custom": break;
		default: for (let e in c) {
			let t = Object.getOwnPropertyDescriptor(c, e);
			if (!t || t.get) continue;
			let n = t.value;
			if (n && typeof n == "object") {
				if (n._zod) a(n);
				else if (Array.isArray(n)) for (let e of n) a(e);
			}
		}
	}
	return t.delete(e), uf(e, i);
}
function uf(e, t) {
	return t !== sf && af.set(e, t === cf), t;
}
function df(e, t) {
	let n = e.buckets.get(t);
	return n || (n = /* @__PURE__ */ new WeakMap(), e.buckets.set(t, n)), n;
}
var ff, pf = [], mf = {
	alloc(e, t, n) {
		let r = ff;
		if (!r) return n;
		ff = void 0;
		let i = {
			value: n,
			issues: null
		};
		return r.set(t.value, i), pf.push(i), n;
	},
	guard(e) {
		var t;
		(t = e._zod).deferred ?? (t.deferred = []), e._zod.deferred.push(() => {
			let t = e._zod.parse, n = (e, n) => {
				if (n.direction !== "backward" && gf(n, e.value)) throw new $d();
				return t(e, n);
			};
			e._zod.parse = n, e._zod.run === t && (e._zod.run = n);
		});
	},
	attach(e) {
		var t;
		let n, r = !1, i, a;
		(t = e._zod).deferred ?? (t.deferred = []), e._zod.deferred.push(() => {
			let t = e._zod.parse, o = (s, c) => {
				if (n === void 0) {
					let i = lf(e, /* @__PURE__ */ new Set(), !1);
					if (i === of) return e._zod.parse = t, e._zod.run === o && (e._zod.run = t), t(s, c);
					i === cf || r ? n = !0 : r = !0;
				}
				let l = s.value;
				if (!nf(l)) return t(s, c);
				let u = c[ef];
				u || (u = {
					buckets: /* @__PURE__ */ new WeakMap(),
					backEdges: void 0
				}, c[ef] = u);
				let d;
				i === c ? d = a : (d = df(u, e), i = c, a = d);
				let f = d.get(l);
				if (f) return s.value = f.value, f.issues ? f.issues.length && s.issues.push(...rf(f.issues)) : (s.memo = !0, u.backEdges ?? (u.backEdges = /* @__PURE__ */ new WeakSet()), u.backEdges.add(f.value)), s;
				ff = d;
				let p = pf.length, m = t(s, c);
				ff = void 0;
				let h = pf.length > p ? pf.pop() : void 0;
				return m instanceof Promise ? m.then((e) => (h && (h.issues = e.issues.length ? rf(e.issues) : tf), e)) : (h && (h.issues = m.issues.length ? rf(m.issues) : tf), m);
			};
			e._zod.parse = o, e._zod.run === t && (e._zod.run = o);
		});
	}
};
function hf() {
	return mf;
}
function gf(e, t) {
	let n = e[ef]?.backEdges;
	return n !== void 0 && nf(t) && n.has(t);
}
//#endregion
//#region ../../node_modules/.pnpm/zod@4.6.5/node_modules/zod/v4/locales/en.js
var _f = () => {
	let e = {
		string: {
			unit: "characters",
			verb: "to have"
		},
		file: {
			unit: "bytes",
			verb: "to have"
		},
		array: {
			unit: "items",
			verb: "to have"
		},
		set: {
			unit: "items",
			verb: "to have"
		},
		map: {
			unit: "entries",
			verb: "to have"
		}
	};
	function t(t) {
		return e[t] ?? null;
	}
	let n = {
		regex: "input",
		email: "email address",
		url: "URL",
		emoji: "emoji",
		uuid: "UUID",
		uuidv4: "UUIDv4",
		uuidv6: "UUIDv6",
		nanoid: "nanoid",
		guid: "GUID",
		cuid: "cuid",
		cuid2: "cuid2",
		ulid: "ULID",
		xid: "XID",
		ksuid: "KSUID",
		datetime: "ISO datetime",
		date: "ISO date",
		time: "ISO time",
		duration: "ISO duration",
		ipv4: "IPv4 address",
		ipv6: "IPv6 address",
		mac: "MAC address",
		cidrv4: "IPv4 range",
		cidrv6: "IPv6 range",
		base64: "base64-encoded string",
		base64url: "base64url-encoded string",
		json_string: "JSON string",
		e164: "E.164 number",
		currency_code: "currency code",
		credit_card: "credit card number",
		iban: "IBAN",
		jwt: "JWT",
		template_literal: "input"
	}, r = { nan: "NaN" };
	function i(e, t) {
		return e === "number" && typeof t == "number" && !Number.isFinite(t) ? String(t) : r[e] ?? e;
	}
	return (e) => {
		switch (e.code) {
			case "invalid_type": return `Invalid input: expected ${i(e.expected)}, received ${i(Sc(e.input), e.input)}`;
			case "invalid_value": return e.values.length === 1 ? `Invalid input: expected ${ec(e.values[0])}` : `Invalid option: expected one of ${Ds(e.values, "|")}`;
			case "too_big": {
				let n = e.exact ? "exactly " : e.inclusive ? "<=" : "<", r = t(e.origin);
				return r ? `Too big: expected ${e.origin ?? "value"} to have ${n}${e.maximum.toString()} ${r.unit ?? "elements"}` : `Too big: expected ${e.origin ?? "value"} to be ${n}${e.maximum.toString()}`;
			}
			case "too_small": {
				let n = e.exact ? "exactly " : e.inclusive ? ">=" : ">", r = t(e.origin);
				return r ? `Too small: expected ${e.origin} to have ${n}${e.minimum.toString()} ${r.unit}` : `Too small: expected ${e.origin} to be ${n}${e.minimum.toString()}`;
			}
			case "invalid_format": {
				let t = e;
				return t.format === "starts_with" ? `Invalid string: must start with "${t.prefix}"` : t.format === "ends_with" ? `Invalid string: must end with "${t.suffix}"` : t.format === "includes" ? `Invalid string: must include "${t.includes}"` : t.format === "regex" ? `Invalid string: must match pattern ${t.pattern}` : `Invalid ${n[t.format] ?? e.format}`;
			}
			case "not_multiple_of": return `Invalid number: must be a multiple of ${e.divisor}`;
			case "unrecognized_keys": return `Unrecognized key${e.keys.length > 1 ? "s" : ""}: ${Ds(e.keys, ", ")}`;
			case "invalid_key": return `Invalid key in ${e.origin}`;
			case "invalid_union": return e.options && Array.isArray(e.options) && e.options.length > 0 ? `Invalid discriminator value. Expected ${e.options.map((e) => `'${e}'`).join(" | ")}` : e.inclusive === !1 ? "Invalid input: more than one option matched" : "Invalid input";
			case "invalid_element": return `Invalid value in ${e.origin}`;
			default: return "Invalid input";
		}
	};
};
function vf() {
	return { localeError: _f() };
}
//#endregion
//#region ../../node_modules/.pnpm/zod@4.6.5/node_modules/zod/v4/core/registries.js
var yf, bf = class {
	constructor() {
		this._map = /* @__PURE__ */ new WeakMap(), this._idmap = /* @__PURE__ */ new Map();
	}
	add(e, ...t) {
		let n = t[0];
		return this._map.set(e, n), n && typeof n == "object" && "id" in n && this._idmap.set(n.id, e), this;
	}
	clear() {
		return this._map = /* @__PURE__ */ new WeakMap(), this._idmap = /* @__PURE__ */ new Map(), this;
	}
	remove(e) {
		let t = this._map.get(e);
		return t && typeof t == "object" && "id" in t && this._idmap.delete(t.id), this._map.delete(e), this;
	}
	get(e) {
		let t = e._zod.parent;
		if (t) {
			let n = { ...this.get(t) ?? {} };
			delete n.id;
			let r = {
				...n,
				...this._map.get(e)
			};
			return Object.keys(r).length ? r : void 0;
		}
		return this._map.get(e);
	}
	has(e) {
		return this._map.has(e);
	}
};
function xf() {
	return new bf();
}
(yf = globalThis).__zod_globalRegistry ?? (yf.__zod_globalRegistry = xf());
var Sf = globalThis.__zod_globalRegistry;
//#endregion
//#region ../../node_modules/.pnpm/zod@4.6.5/node_modules/zod/v4/core/api.js
function Cf(e) {
	return e.checks &&= [...e.checks], e;
}
// @__NO_SIDE_EFFECTS__
function wf(e, t) {
	return new e(Cf({
		type: "string",
		...G(t)
	}));
}
// @__NO_SIDE_EFFECTS__
function Tf(e, t) {
	return new e({
		type: "string",
		format: "email",
		check: "string_format",
		abort: !1,
		...G(t)
	});
}
// @__NO_SIDE_EFFECTS__
function Ef(e, t) {
	return new e({
		type: "string",
		format: "guid",
		check: "string_format",
		abort: !1,
		...G(t)
	});
}
// @__NO_SIDE_EFFECTS__
function Df(e, t) {
	return new e({
		type: "string",
		format: "uuid",
		check: "string_format",
		abort: !1,
		...G(t)
	});
}
// @__NO_SIDE_EFFECTS__
function Of(e, t) {
	return new e({
		type: "string",
		format: "uuid",
		check: "string_format",
		abort: !1,
		version: "v4",
		...G(t)
	});
}
// @__NO_SIDE_EFFECTS__
function kf(e, t) {
	return new e({
		type: "string",
		format: "uuid",
		check: "string_format",
		abort: !1,
		version: "v6",
		...G(t)
	});
}
// @__NO_SIDE_EFFECTS__
function Af(e, t) {
	return new e({
		type: "string",
		format: "uuid",
		check: "string_format",
		abort: !1,
		version: "v7",
		...G(t)
	});
}
// @__NO_SIDE_EFFECTS__
function jf(e, t) {
	return new e({
		type: "string",
		format: "url",
		check: "string_format",
		abort: !1,
		...G(t)
	});
}
// @__NO_SIDE_EFFECTS__
function Mf(e, t) {
	return new e({
		type: "string",
		format: "emoji",
		check: "string_format",
		abort: !1,
		...G(t)
	});
}
// @__NO_SIDE_EFFECTS__
function Nf(e, t) {
	return new e({
		type: "string",
		format: "nanoid",
		check: "string_format",
		abort: !1,
		...G(t)
	});
}
// @__NO_SIDE_EFFECTS__
function Pf(e, t) {
	return new e({
		type: "string",
		format: "cuid",
		check: "string_format",
		abort: !1,
		...G(t)
	});
}
// @__NO_SIDE_EFFECTS__
function Ff(e, t) {
	return new e({
		type: "string",
		format: "cuid2",
		check: "string_format",
		abort: !1,
		...G(t)
	});
}
// @__NO_SIDE_EFFECTS__
function If(e, t) {
	return new e({
		type: "string",
		format: "ulid",
		check: "string_format",
		abort: !1,
		...G(t)
	});
}
// @__NO_SIDE_EFFECTS__
function Lf(e, t) {
	return new e({
		type: "string",
		format: "xid",
		check: "string_format",
		abort: !1,
		...G(t)
	});
}
// @__NO_SIDE_EFFECTS__
function Rf(e, t) {
	return new e({
		type: "string",
		format: "ksuid",
		check: "string_format",
		abort: !1,
		...G(t)
	});
}
// @__NO_SIDE_EFFECTS__
function zf(e, t) {
	return new e({
		type: "string",
		format: "ipv4",
		check: "string_format",
		abort: !1,
		...G(t)
	});
}
// @__NO_SIDE_EFFECTS__
function Bf(e, t) {
	return new e({
		type: "string",
		format: "ipv6",
		check: "string_format",
		abort: !1,
		...G(t)
	});
}
// @__NO_SIDE_EFFECTS__
function Vf(e, t) {
	return new e({
		type: "string",
		format: "cidrv4",
		check: "string_format",
		abort: !1,
		...G(t)
	});
}
// @__NO_SIDE_EFFECTS__
function Hf(e, t) {
	return new e({
		type: "string",
		format: "cidrv6",
		check: "string_format",
		abort: !1,
		...G(t)
	});
}
// @__NO_SIDE_EFFECTS__
function Uf(e, t) {
	return new e({
		type: "string",
		format: "base64",
		check: "string_format",
		abort: !1,
		...G(t)
	});
}
// @__NO_SIDE_EFFECTS__
function Wf(e, t) {
	return new e({
		type: "string",
		format: "base64url",
		check: "string_format",
		abort: !1,
		...G(t)
	});
}
// @__NO_SIDE_EFFECTS__
function Gf(e, t) {
	return new e({
		type: "string",
		format: "e164",
		check: "string_format",
		abort: !1,
		...G(t)
	});
}
// @__NO_SIDE_EFFECTS__
function Kf(e, t) {
	return new e({
		type: "string",
		format: "jwt",
		check: "string_format",
		abort: !1,
		...G(t)
	});
}
// @__NO_SIDE_EFFECTS__
function qf(e, t) {
	return new e({
		type: "string",
		format: "datetime",
		check: "string_format",
		offset: !1,
		local: !1,
		precision: null,
		...G(t)
	});
}
// @__NO_SIDE_EFFECTS__
function Jf(e, t) {
	return new e({
		type: "string",
		format: "date",
		check: "string_format",
		...G(t)
	});
}
// @__NO_SIDE_EFFECTS__
function Yf(e, t) {
	return new e({
		type: "string",
		format: "time",
		check: "string_format",
		precision: null,
		...G(t)
	});
}
// @__NO_SIDE_EFFECTS__
function Xf(e, t) {
	return new e({
		type: "string",
		format: "duration",
		check: "string_format",
		...G(t)
	});
}
// @__NO_SIDE_EFFECTS__
function Zf(e, t) {
	return new e(Cf({
		type: "number",
		checks: [],
		...G(t)
	}));
}
// @__NO_SIDE_EFFECTS__
function Qf(e, t) {
	return new e({
		type: "number",
		check: "number_format",
		abort: !1,
		format: "safeint",
		...G(t)
	});
}
// @__NO_SIDE_EFFECTS__
function $f(e, t) {
	return new e({
		type: "boolean",
		...G(t)
	});
}
// @__NO_SIDE_EFFECTS__
function ep(e, t) {
	return new e({
		type: "null",
		...G(t)
	});
}
// @__NO_SIDE_EFFECTS__
function tp(e) {
	return new e({ type: "unknown" });
}
// @__NO_SIDE_EFFECTS__
function np(e, t) {
	return new e({
		type: "never",
		...G(t)
	});
}
// @__NO_SIDE_EFFECTS__
function rp(e, t) {
	return new ru({
		check: "less_than",
		...G(t),
		value: e,
		inclusive: !1
	});
}
// @__NO_SIDE_EFFECTS__
function ip(e, t) {
	return new ru({
		check: "less_than",
		...G(t),
		value: e,
		inclusive: !0
	});
}
// @__NO_SIDE_EFFECTS__
function ap(e, t) {
	return new iu({
		check: "greater_than",
		...G(t),
		value: e,
		inclusive: !1
	});
}
// @__NO_SIDE_EFFECTS__
function op(e, t) {
	return new iu({
		check: "greater_than",
		...G(t),
		value: e,
		inclusive: !0
	});
}
// @__NO_SIDE_EFFECTS__
function sp(e, t) {
	return new au({
		check: "multiple_of",
		...G(t),
		value: e
	});
}
// @__NO_SIDE_EFFECTS__
function cp(e, t) {
	return new su({
		check: "max_length",
		...G(t),
		maximum: e
	});
}
// @__NO_SIDE_EFFECTS__
function lp(e, t) {
	return new cu({
		check: "min_length",
		...G(t),
		minimum: e
	});
}
// @__NO_SIDE_EFFECTS__
function up(e, t) {
	return new lu({
		check: "length_equals",
		...G(t),
		length: e
	});
}
// @__NO_SIDE_EFFECTS__
function dp(e, t) {
	return new du({
		check: "string_format",
		format: "regex",
		...G(t),
		pattern: e
	});
}
// @__NO_SIDE_EFFECTS__
function fp(e) {
	return new fu({
		check: "string_format",
		format: "lowercase",
		...G(e)
	});
}
// @__NO_SIDE_EFFECTS__
function pp(e) {
	return new pu({
		check: "string_format",
		format: "uppercase",
		...G(e)
	});
}
// @__NO_SIDE_EFFECTS__
function mp(e, t) {
	return new mu({
		check: "string_format",
		format: "includes",
		...G(t),
		includes: e
	});
}
// @__NO_SIDE_EFFECTS__
function hp(e, t) {
	return new hu({
		check: "string_format",
		format: "starts_with",
		...G(t),
		prefix: e
	});
}
// @__NO_SIDE_EFFECTS__
function gp(e, t) {
	return new gu({
		check: "string_format",
		format: "ends_with",
		...G(t),
		suffix: e
	});
}
// @__NO_SIDE_EFFECTS__
function _p(e) {
	return new _u({
		check: "overwrite",
		tx: e
	});
}
// @__NO_SIDE_EFFECTS__
function vp(e) {
	return /* @__PURE__ */ _p((t) => t.normalize(e));
}
// @__NO_SIDE_EFFECTS__
function yp() {
	return /* @__PURE__ */ _p((e) => e.trim());
}
// @__NO_SIDE_EFFECTS__
function bp() {
	return /* @__PURE__ */ _p((e) => e.toLowerCase());
}
// @__NO_SIDE_EFFECTS__
function xp() {
	return /* @__PURE__ */ _p((e) => e.toUpperCase());
}
// @__NO_SIDE_EFFECTS__
function Sp() {
	return /* @__PURE__ */ _p((e) => Gs(e));
}
// @__NO_SIDE_EFFECTS__
function Cp(e, t, n) {
	return new e({
		type: "array",
		element: t,
		...G(n)
	});
}
// @__NO_SIDE_EFFECTS__
function wp(e, t, n) {
	return new e({
		type: "custom",
		check: "custom",
		fn: t,
		...G(n)
	});
}
// @__NO_SIDE_EFFECTS__
function Tp(e, t) {
	let n = /* @__PURE__ */ Ep((t) => (t.addIssue = (e) => {
		if (typeof e == "string") t.issues.push(Cc(e, t.value, n._zod.def));
		else {
			let r = e;
			r.fatal && (r.continue = !1), r.code ??= "custom", "input" in r || (r.input = t.value), r.inst ??= n, r.continue ??= !n._zod.def.abort, t.issues.push(Cc(r));
		}
	}, e(t.value, t)), t);
	return n;
}
// @__NO_SIDE_EFFECTS__
function Ep(e, t) {
	let n = new eu({
		check: "custom",
		...G(t)
	});
	return n._zod.check = e, n;
}
//#endregion
//#region ../../node_modules/.pnpm/zod@4.6.5/node_modules/zod/v4/core/to-json-schema.js
function Dp(e, ...t) {
	for (let n of t) for (let t of Reflect.ownKeys(n)) Object.prototype.propertyIsEnumerable.call(n, t) && Is(e, t, n[t]);
	return e;
}
function Op(e) {
	let t = e?.target ?? "draft-2020-12";
	return t === "draft-4" && (t = "draft-04"), t === "draft-7" && (t = "draft-07"), {
		processors: e.processors ?? {},
		metadataRegistry: e?.metadata ?? Sf,
		target: t,
		unrepresentable: e?.unrepresentable ?? "throw",
		override: e?.override ?? (() => {}),
		io: e?.io ?? "output",
		counter: 0,
		seen: /* @__PURE__ */ new Map(),
		sharedDefsExtractedFor: void 0,
		sharedEmitDoneFor: void 0,
		cycles: e?.cycles ?? "ref",
		reused: e?.reused ?? "inline",
		intersections: [],
		deferred: [],
		external: e?.external ?? void 0
	};
}
function kp(e, t, n, r, i) {
	let a = typeof t.unrepresentable == "function" ? t.unrepresentable({
		zodSchema: e,
		path: r.path,
		message: i
	}) : t.unrepresentable;
	if (a === "any") return !1;
	if (a === void 0 || a === "throw") throw Error(i);
	return Object.assign(n, a), !0;
}
function Ap(e, t, n = {
	path: [],
	schemaPath: []
}) {
	var r;
	let i = e._zod.def, a = t.seen.get(e);
	if (a) return a.count++, n.schemaPath.includes(e) && (a.cycle = n.path), a.schema;
	let o = {
		schema: {},
		count: 1,
		cycle: void 0,
		path: n.path
	};
	t.seen.set(e, o), t.sharedDefsExtractedFor = void 0, t.sharedEmitDoneFor = void 0;
	let s = e._zod.toJSONSchema?.();
	if (s) o.schema = s;
	else {
		let r = {
			...n,
			schemaPath: [...n.schemaPath, e],
			path: n.path
		};
		if (e._zod.processJSONSchema) e._zod.processJSONSchema(t, o.schema, r);
		else {
			let n = o.schema, a = t.processors[i.type];
			if (!a) throw Error(`[toJSONSchema]: Non-representable type encountered: ${i.type}`);
			a(e, t, n, r);
		}
		let a = e._zod.parent;
		a && (o.ref ||= a, Ap(a, t, r), t.seen.get(a).isParent = !0);
	}
	let c = t.metadataRegistry.get(e);
	return c && Dp(o.schema, c), t.io === "input" && Bp(e) && (delete o.schema.examples, delete o.schema.default), t.io === "input" && "_prefault" in o.schema && ((r = o.schema).default ?? (r.default = o.schema._prefault)), delete o.schema._prefault, t.seen.get(e).schema;
}
function jp(e) {
	return e.replace(/~/g, "~0").replace(/\//g, "~1");
}
function Mp(e, t) {
	let n = e.seen.get(t);
	if (!n) throw Error("Unprocessed schema. This is a bug in Zod.");
	if (e.external && e.sharedDefsExtractedFor === e.external) return;
	let r = /* @__PURE__ */ new Map();
	for (let t of e.seen.entries()) {
		let n = e.metadataRegistry.get(t[0])?.id;
		if (n) {
			let e = r.get(n);
			if (e && e !== t[0]) throw Error(`Duplicate schema id "${n}" detected during JSON Schema conversion. Two different schemas cannot share the same id when converted together.`);
			r.set(n, t[0]);
		}
	}
	let i = (t) => {
		let r = e.target === "draft-2020-12" ? "$defs" : "definitions";
		if (e.external) {
			let n = e.external.registry.get(t[0])?.id, i = e.external.uri ?? ((e) => e);
			if (n) return { ref: i(n) };
			let a = t[1].defId ?? t[1].schema.id ?? `schema${e.counter++}`;
			return t[1].defId = a, {
				defId: a,
				ref: `${i("__shared")}#/${r}/${jp(a)}`
			};
		}
		let i = `#/${r}/`;
		if (t[1] === n && !t[1].schema.id) return { ref: "#" };
		let a = t[1].schema.id ?? `__schema${e.counter++}`;
		return {
			defId: a,
			ref: i + jp(a)
		};
	}, a = (e) => {
		if (e[1].schema.$ref) return;
		let t = e[1], { ref: n, defId: r } = i(e);
		t.def = { ...t.schema }, r && (t.defId = r);
		let a = t.schema;
		for (let e in a) delete a[e];
		a.$ref = n;
	};
	if (e.cycles === "throw") for (let t of e.seen.entries()) {
		let e = t[1];
		if (e.cycle) throw Error(`Cycle detected: #/${e.cycle?.join("/")}/<root>

Set the \`cycles\` parameter to \`"ref"\` to resolve cyclical schemas with defs.`);
	}
	for (let n of e.seen.entries()) {
		let r = n[1];
		if (t === n[0]) a(n);
		else {
			if (e.external) {
				let r = e.external.registry.get(n[0])?.id;
				if (t !== n[0] && r) {
					a(n);
					continue;
				}
			}
			(e.metadataRegistry.get(n[0])?.id || r.cycle || r.count > 1 && e.reused === "ref") && a(n);
		}
	}
	e.external && (e.sharedDefsExtractedFor = e.external);
}
function Np(e) {
	let t = e.anyOf;
	if (!Array.isArray(t) || t.length === 0 || e.type !== void 0) return;
	let n = [];
	for (let e of t) {
		if (!e || typeof e != "object") return;
		Np(e);
		let t = Object.keys(e);
		if (t.length !== 1 || t[0] !== "type") return;
		let r = e.type;
		for (let e of Array.isArray(r) ? r : [r]) {
			if (typeof e != "string") return;
			n.includes(e) || n.push(e);
		}
	}
	delete e.anyOf, e.type = n.length === 1 ? n[0] : n;
}
var Pp = /* @__PURE__ */ new Set([
	"type",
	"properties",
	"required",
	"additionalProperties"
]), Fp = ["oneOf", "anyOf"];
function Ip(e) {
	let t = e.additionalProperties;
	return t === void 0 || t === !1 || typeof t != "object" || !t ? null : Object.keys(t).length ? t : null;
}
function Lp(e) {
	let t = [];
	for (let n of e) {
		if (typeof n != "object" || n.type !== "object") return null;
		for (let e in n) if (!Pp.has(e)) return null;
		t.push(n);
	}
	let n = {}, r = /* @__PURE__ */ new Set();
	for (let e of t) {
		for (let r in e.properties) {
			if (Object.prototype.hasOwnProperty.call(n, r)) continue;
			let e = [];
			for (let n of t) {
				let t = n.properties?.[r] ?? Ip(n);
				t != null && (e.some((e) => JSON.stringify(e) === JSON.stringify(t)) || e.push(t));
			}
			Is(n, r, e.length === 1 ? e[0] : Lp(e) ?? { allOf: e });
		}
		for (let t of e.required ?? []) r.add(t);
	}
	let i = {
		type: "object",
		properties: n
	};
	if (r.size && (i.required = [...r]), t.every((e) => e.additionalProperties === !1)) i.additionalProperties = !1;
	else {
		let e = [];
		for (let n of t) {
			let t = Ip(n);
			t && !e.some((e) => JSON.stringify(e) === JSON.stringify(t)) && e.push(t);
		}
		e.length === 1 ? i.additionalProperties = e[0] : e.length > 1 && (i.additionalProperties = { allOf: e });
	}
	return i;
}
function Rp(e) {
	let t = e.allOf;
	if (!Array.isArray(t) || t.length < 2) return;
	for (let t of Pp) if (t in e) return;
	let n = t.filter((e) => Fp.some((t) => Array.isArray(e[t]))), r = null;
	if (!n.length) r = Lp(t);
	else {
		let e = n[0], i = Fp.find((t) => Array.isArray(e[t]));
		if (Object.keys(e).length !== 1) return;
		let a = t.filter((t) => t !== e), o = e[i].map((e) => Lp([...a, e]));
		if (o.some((e) => !e)) return;
		r = { [i]: o };
	}
	r && (delete e.allOf, Dp(e, r));
}
function zp(e, t) {
	let n = e.seen.get(t);
	if (!n) throw Error("Unprocessed schema. This is a bug in Zod.");
	let r = (t) => {
		let n = e.seen.get(t);
		if (n.ref === null) return;
		let i = n.def ?? n.schema, a = { ...i }, o = n.ref;
		if (n.ref = null, o) {
			r(o);
			let n = e.seen.get(o), s = n.schema;
			if (s.$ref && (e.target === "draft-07" || e.target === "draft-04" || e.target === "openapi-3.0") ? (i.allOf = i.allOf ?? [], i.allOf.push(s)) : Dp(i, s), Dp(i, a), t._zod.parent === o) for (let e in i) e !== "$ref" && e !== "allOf" && (e in a || delete i[e]);
			if (s.$ref && n.def) for (let e in i) e !== "$ref" && e !== "allOf" && e in n.def && JSON.stringify(i[e]) === JSON.stringify(n.def[e]) && delete i[e];
		}
		let s = t._zod.parent;
		if (s && s !== o) {
			r(s);
			let t = e.seen.get(s);
			if (t?.schema.$ref && (i.$ref = t.schema.$ref, t.def)) for (let e in i) e !== "$ref" && e !== "allOf" && e in t.def && JSON.stringify(i[e]) === JSON.stringify(t.def[e]) && delete i[e];
		}
		e.override({
			zodSchema: t,
			jsonSchema: i,
			path: n.path ?? []
		});
	};
	if (!e.external || e.sharedEmitDoneFor !== e.external) {
		for (let t of [...e.seen.entries()].reverse()) r(t[0]);
		if (e.target !== "openapi-3.0") for (let t of e.seen.entries()) Np(t[1].def ?? t[1].schema);
		for (let t of e.deferred) t();
		if (e.intersections.length) {
			let t = /* @__PURE__ */ new Map();
			for (let n of e.seen.values()) for (let e of [n.schema, n.def]) {
				let n = e?.allOf;
				if (!Array.isArray(n)) continue;
				let r = t.get(n);
				r ? r.push(e) : t.set(n, [e]);
			}
			for (let n of e.intersections) for (let e of t.get(n) ?? []) Rp(e);
		}
	}
	let i = {};
	if (e.target === "draft-2020-12" ? i.$schema = "https://json-schema.org/draft/2020-12/schema" : e.target === "draft-07" ? i.$schema = "http://json-schema.org/draft-07/schema#" : e.target === "draft-04" ? i.$schema = "http://json-schema.org/draft-04/schema#" : e.target, e.external?.uri) {
		let n = e.external.registry.get(t)?.id;
		if (!n) throw Error("Schema is missing an `id` property");
		i.$id = e.external.uri(n);
	}
	Dp(i, n.defId ? n.schema : n.def ?? n.schema);
	let a = e.metadataRegistry.get(t)?.id;
	a !== void 0 && i.id === a && delete i.id;
	let o = e.external?.defs ?? {};
	if (!e.external || e.sharedEmitDoneFor !== e.external) for (let t of e.seen.entries()) {
		let e = t[1];
		e.def && e.defId && (e.def.id === e.defId && delete e.def.id, Is(o, e.defId, e.def));
	}
	e.external && (e.sharedEmitDoneFor = e.external), e.external || Object.keys(o).length > 0 && (e.target === "draft-2020-12" ? i.$defs = o : i.definitions = o);
	try {
		let n = JSON.parse(JSON.stringify(i));
		return Object.defineProperty(n, "~standard", {
			value: {
				...t["~standard"],
				jsonSchema: {
					input: Hp(t, "input", e.processors),
					output: Hp(t, "output", e.processors)
				}
			},
			enumerable: !1,
			writable: !1
		}), n;
	} catch {
		throw Error("Error converting schema to JSON.");
	}
}
function Bp(e, t) {
	let n = t ?? { seen: /* @__PURE__ */ new Set() };
	if (n.seen.has(e)) return !1;
	n.seen.add(e);
	let r = e._zod.def;
	if (r.type === "transform") return !0;
	if (r.type === "array") return Bp(r.element, n);
	if (r.type === "set") return Bp(r.valueType, n);
	if (r.type === "lazy") return Bp(r.getter(), n);
	if (r.type === "promise" || r.type === "optional" || r.type === "nonoptional" || r.type === "nullable" || r.type === "readonly" || r.type === "default" || r.type === "prefault" || r.type === "catch") return Bp(r.innerType, n);
	if (r.type === "intersection") return Bp(r.left, n) || Bp(r.right, n);
	if (r.type === "record" || r.type === "map") return Bp(r.keyType, n) || Bp(r.valueType, n);
	if (r.type === "pipe") return e._zod.traits.has("$ZodCodec") ? !0 : Bp(r.in, n) || Bp(r.out, n);
	if (r.type === "object") {
		for (let e in r.shape) if (Bp(r.shape[e], n)) return !0;
		return !1;
	}
	if (r.type === "union") {
		for (let e of r.options) if (Bp(e, n)) return !0;
		return !1;
	}
	if (r.type === "tuple") {
		for (let e of r.items) if (Bp(e, n)) return !0;
		return !!(r.rest && Bp(r.rest, n));
	}
	return !1;
}
var Vp = (e, t = {}) => (n) => {
	let r = Op({
		...n,
		processors: t
	});
	return Ap(e, r), Mp(r, e), zp(r, e);
}, Hp = (e, t, n = {}) => (r) => {
	let { libraryOptions: i, target: a } = r ?? {}, o = Op({
		...i ?? {},
		target: a,
		io: t,
		processors: n
	});
	return Ap(e, o), Mp(o, e), zp(o, e);
}, Up = (e, t, n) => {
	(e[t] === void 0 || n > e[t]) && (e[t] = n);
}, Wp = (e, t, n) => {
	(e[t] === void 0 || n < e[t]) && (e[t] = n);
}, Gp = (e, t) => {
	Up(e, "minimum", t), Wp(e, "maximum", t);
}, Kp = (e, t) => {
	e.multipleOf ??= [], e.multipleOf.includes(t) || e.multipleOf.push(t);
}, qp = (e, t) => {
	e.patterns ??= /* @__PURE__ */ new Set(), e.patterns.add(t);
}, Jp = (e, t) => {
	e.mime = e.mime ? e.mime.filter((e) => t.includes(e)) : [...t];
}, Yp = (e, t) => {
	e.format = t, t.includes("int") && (e.isInt = !0);
}, Xp = (e, t) => Up(e, "minimum", t.minimum), Zp = (e, t) => Wp(e, "maximum", t.maximum), Qp = (e) => (t, n) => {
	Yp(t, n.format);
	let [r, i] = e[n.format];
	Up(t, "minimum", r), Wp(t, "maximum", i);
}, $p = {
	greater_than: (e, t) => Up(e, t.inclusive ? "minimum" : "exclusiveMinimum", t.value),
	less_than: (e, t) => Wp(e, t.inclusive ? "maximum" : "exclusiveMaximum", t.value),
	multiple_of: (e, t) => Kp(e, t.value),
	number_format: Qp(nc),
	bigint_format: Qp(rc),
	min_length: Xp,
	max_length: Zp,
	length_equals: (e, t) => Gp(e, t.length),
	min_size: Xp,
	max_size: Zp,
	size_equals: (e, t) => Gp(e, t.size),
	string_format: (e, t) => {
		Yp(e, t.format), t.pattern && qp(e, t.pattern), (t.format === "base64" || t.format === "base64url") && (e.contentEncoding = t.format), (t.local || t.precision === -1) && (e.laxFormat = !0);
	},
	mime_type: (e, t) => Jp(e, t.mime)
};
function em(e) {
	let t = {}, n = e._zod.def, r = e._zod.traits.has("$ZodCheck") ? [e, ...n.checks ?? []] : n.checks ?? [];
	for (let e of r) $p[e._zod.def.check]?.(t, e._zod.def);
	let i = e._zod.bag;
	i.minimum !== void 0 && Up(t, "minimum", i.minimum), i.exclusiveMinimum !== void 0 && Up(t, "exclusiveMinimum", i.exclusiveMinimum), i.maximum !== void 0 && Wp(t, "maximum", i.maximum), i.exclusiveMaximum !== void 0 && Wp(t, "exclusiveMaximum", i.exclusiveMaximum), i.multipleOf !== void 0 && Kp(t, i.multipleOf), i.format !== void 0 && (t.format ??= i.format, i.format.includes("int") && (t.isInt = !0)), i.mime && Jp(t, i.mime);
	for (let e of i.patterns ?? []) qp(t, e);
	return t;
}
var tm = {
	guid: "uuid",
	url: "uri",
	datetime: "date-time",
	json_string: "json-string",
	regex: ""
}, nm = /* @__PURE__ */ new Map([[nd, Ll], [id, Rl]]), rm = (e) => nm.get(e) ?? e, im = (e, t, n, r) => {
	let i = n;
	i.type = "string";
	let { minimum: a, maximum: o, format: s, patterns: c, contentEncoding: l, laxFormat: u } = em(e);
	if (typeof a == "number" && (i.minLength = a), typeof o == "number" && (i.maxLength = o), s && (i.format = tm[s] ?? s, i.format === "" && delete i.format, (s === "time" || u) && delete i.format), l && (i.contentEncoding = l), c && c.size > 0) {
		let e = [...c].map(rm);
		e.length === 1 ? i.pattern = e[0].source : e.length > 1 && (i.allOf = [...e.map((e) => ({
			...t.target === "draft-07" || t.target === "draft-04" || t.target === "openapi-3.0" ? { type: "string" } : {},
			pattern: e.source
		}))]);
	}
}, am = (e, t, n, r) => {
	let i = n, { minimum: a, maximum: o, multipleOf: s, exclusiveMaximum: c, exclusiveMinimum: l, isInt: u } = em(e);
	i.type = u ? "integer" : "number";
	let d = typeof l == "number" && l >= (a ?? -Infinity), f = typeof c == "number" && c <= (o ?? Infinity), p = t.target === "draft-04" || t.target === "openapi-3.0";
	if (d ? p ? (i.minimum = l, i.exclusiveMinimum = !0) : i.exclusiveMinimum = l : typeof a == "number" && (i.minimum = a), f ? p ? (i.maximum = c, i.exclusiveMaximum = !0) : i.exclusiveMaximum = c : typeof o == "number" && (i.maximum = o), s) {
		let n = /* @__PURE__ */ new Set();
		for (let a of s) Number.isFinite(a) && a !== 0 ? n.add(Math.abs(a)) : kp(e, t, i, r, `A multipleOf divisor of ${a} cannot be represented in JSON Schema`);
		let [a, ...o] = n;
		a !== void 0 && (i.multipleOf = a), o.length && (i.allOf = [...i.allOf ?? [], ...o.map((e) => ({ multipleOf: e }))]);
	}
}, om = (e, t, n, r) => {
	n.type = "boolean";
}, sm = (e, t, n, r) => {
	t.target === "openapi-3.0" ? (n.type = "string", n.nullable = !0, n.enum = [null]) : n.type = "null";
}, cm = (e, t, n, r) => {
	n.not = {};
}, lm = (e, t, n, r) => {
	let i = e._zod.def, a = Es(i.entries);
	a.length === 0 ? n.not = {} : (a.every((e) => typeof e == "number") && (n.type = "number"), a.every((e) => typeof e == "string") && (n.type = "string"), n.enum = a);
}, um = (e, t, n, r) => {
	let i = e._zod.def;
	if (i.values.length === 0) {
		n.not = {};
		return;
	}
	let a = [];
	for (let o of i.values) if (o === void 0) {
		if (kp(e, t, n, r, "Literal `undefined` cannot be represented in JSON Schema")) return;
	} else if (typeof o == "bigint") {
		if (kp(e, t, n, r, "BigInt literals cannot be represented in JSON Schema")) return;
		a.push(Number(o));
	} else a.push(o);
	if (a.length !== 0) {
		if (a.length === 1) {
			let e = a[0];
			n.type = e === null ? "null" : typeof e, t.target === "draft-04" || t.target === "openapi-3.0" ? n.enum = [e] : n.const = e;
		} else a.every((e) => typeof e == "number") && (n.type = "number"), a.every((e) => typeof e == "string") && (n.type = "string"), a.every((e) => typeof e == "boolean") && (n.type = "boolean"), a.every((e) => e === null) && (n.type = "null"), n.enum = a;
	}
}, dm = (e, t, n, r) => {
	kp(e, t, n, r, "Custom types cannot be represented in JSON Schema");
}, fm = (e, t, n, r) => {
	kp(e, t, n, r, "Transforms cannot be represented in JSON Schema");
}, pm = (e, t, n, r) => {
	let i = n, a = e._zod.def, { minimum: o, maximum: s } = em(e);
	typeof o == "number" && (i.minItems = o), typeof s == "number" && (i.maxItems = s), i.type = "array", i.items = Ap(a.element, t, {
		...r,
		path: [...r.path, "items"]
	});
};
function mm(e) {
	let t = e._zod.def;
	return t.type === "pipe" && t.in._zod.traits.has("$ZodTransform") ? mm(t.out) : t.type === "catch" ? mm(t.innerType) : e._zod.optin;
}
var hm = (e, t, n, r) => {
	let i = n, a = e._zod.def, o = a.shape;
	if (Object.getOwnPropertySymbols(o).length && kp(e, t, i, r, "Symbol keys cannot be represented in JSON Schema")) return;
	i.type = "object", i.properties = {};
	for (let e in o) Is(i.properties, e, Ap(o[e], t, {
		...r,
		path: [
			...r.path,
			"properties",
			e
		]
	}));
	let s = [];
	for (let e of Object.keys(o)) {
		let n = a.shape[e];
		(t.io === "input" ? mm(n) === void 0 : n._zod.optout === void 0) && s.push(e);
	}
	s.length > 0 && (i.required = s), a.catchall?._zod.def.type === "never" ? i.additionalProperties = !1 : a.catchall ? a.catchall && (i.additionalProperties = Ap(a.catchall, t, {
		...r,
		path: [...r.path, "additionalProperties"]
	})) : t.io === "output" && (i.additionalProperties = !1);
}, gm = (e, t, n, r) => {
	let i = e._zod.def, a = i.inclusive === !1, o = i.options.map((e, n) => Ap(e, t, {
		...r,
		path: [
			...r.path,
			a ? "oneOf" : "anyOf",
			n
		]
	}));
	a ? n.oneOf = o : n.anyOf = o;
}, _m = (e, t, n, r) => {
	let i = e._zod.def, a = Ap(i.left, t, {
		...r,
		path: [
			...r.path,
			"allOf",
			0
		]
	}), o = Ap(i.right, t, {
		...r,
		path: [
			...r.path,
			"allOf",
			1
		]
	}), s = (e) => "allOf" in e && Object.keys(e).length === 1, c = [...s(a) ? a.allOf : [a], ...s(o) ? o.allOf : [o]];
	n.allOf = c, t.intersections.push(c);
};
function vm(e, t, n) {
	if (t.$ref) {
		if (n.has(t)) return t;
		n.add(t);
		let r = e.get(t)?.def;
		if (!r) return t;
		let i = vm(e, r, n);
		return i === r ? t : i;
	}
	for (let r of ["anyOf", "oneOf"]) {
		let i = t[r];
		if (!Array.isArray(i)) continue;
		let a = i.map((t) => vm(e, t, n));
		a.some((e, t) => e !== i[t]) && (t = {
			...t,
			[r]: a
		});
	}
	let r = Array.isArray(t.type) ? t.type : [t.type], i = !r.includes("string") && r.some((e) => e === "number" || e === "integer"), a = t.enum ?? (t.const === void 0 ? void 0 : [t.const]);
	if (!i && !a?.some((e) => typeof e == "number")) return t;
	let { minimum: o, maximum: s, exclusiveMinimum: c, exclusiveMaximum: l, multipleOf: u, format: d, id: f, ...p } = t;
	return p.enum ? p.enum = p.enum.map((e) => typeof e == "number" ? String(e) : e) : typeof p.const == "number" && (p.const = String(p.const)), i && (p.type = "string", a || (p.pattern = (r.includes("number") ? Yl : Jl).source)), p;
}
var ym = /* @__PURE__ */ new WeakMap();
function bm(e) {
	let t = /* @__PURE__ */ new Map();
	for (let n of e.seen.values()) n.def && !t.has(n.schema) && t.set(n.schema, n);
	let n = /* @__PURE__ */ new Map();
	for (let r of ym.get(e) ?? []) {
		let i = e.seen.get(r), a = (i?.def ?? i?.schema)?.propertyNames;
		if (!a || a === !0 || n.has(a)) continue;
		let o = vm(t, a, /* @__PURE__ */ new Set());
		o !== a && n.set(a, o);
	}
	if (n.size) for (let t of e.seen.values()) for (let e of [t.schema, t.def]) {
		let t = e && n.get(e.propertyNames);
		t && (e.propertyNames = t);
	}
}
var xm = (e, t, n, r) => {
	let i = n, a = e._zod.def;
	i.type = "object";
	let o = a.keyType, s = em(o).patterns;
	if (a.mode === "loose" && s && s.size > 0) {
		let e = Ap(a.valueType, t, {
			...r,
			path: [
				...r.path,
				"patternProperties",
				"*"
			]
		});
		i.patternProperties = {};
		for (let t of s) Is(i.patternProperties, rm(t).source, e);
	} else {
		if (t.target === "draft-07" || t.target === "draft-2020-12") {
			i.propertyNames = Ap(a.keyType, t, {
				...r,
				path: [...r.path, "propertyNames"]
			});
			let n = ym.get(t);
			n || (n = [], ym.set(t, n), t.deferred.push(() => bm(t))), n.push(e);
		}
		i.additionalProperties = Ap(a.valueType, t, {
			...r,
			path: [...r.path, "additionalProperties"]
		});
	}
	let c = o._zod.values, l = t.io === "input" && mm(a.valueType) !== void 0;
	if (c && !a.partial && !l) {
		let e = [...c].filter((e) => typeof e == "string" || typeof e == "number");
		e.length > 0 && (i.required = e.map(String));
	}
}, Sm = (e, t, n, r) => {
	let i = e._zod.def, a = Ap(i.innerType, t, r), o = t.seen.get(e);
	t.target === "openapi-3.0" ? (o.ref = i.innerType, n.nullable = !0) : n.anyOf = [a, { type: "null" }];
}, Cm = (e, t, n, r) => {
	let i = e._zod.def;
	Ap(i.innerType, t, r);
	let a = t.seen.get(e);
	a.ref = i.innerType;
}, wm = Symbol();
function Tm(e, t, n, r, i) {
	let a = !1, o = JSON.stringify(e, (e, t) => typeof t == "bigint" ? (a = !0, null) : t);
	return a ? (kp(t, n, r, i, "BigInt defaults cannot be represented in JSON Schema"), wm) : JSON.parse(o);
}
var Em = (e, t, n, r) => {
	let i = e._zod.def;
	Ap(i.innerType, t, r);
	let a = t.seen.get(e);
	a.ref = i.innerType;
	let o = Tm(i.defaultValue, e, t, n, r);
	o !== wm && (n.default = o);
}, Dm = (e, t, n, r) => {
	let i = e._zod.def;
	Ap(i.innerType, t, r);
	let a = t.seen.get(e);
	if (a.ref = i.innerType, t.io !== "input") return;
	let o = Tm(i.defaultValue, e, t, n, r);
	o !== wm && (n._prefault = o);
}, Om = (e, t, n, r) => {
	let i = e._zod.def;
	Ap(i.innerType, t, r);
	let a = t.seen.get(e);
	a.ref = i.innerType;
	let o;
	try {
		o = i.catchValue(void 0);
	} catch {
		kp(e, t, n, r, "Dynamic catch values are not supported in JSON Schema");
		return;
	}
	n.default = o;
}, km = (e, t, n, r) => {
	let i = e._zod.def, a = i.in._zod.traits.has("$ZodTransform"), o = t.io === "input" ? a ? i.out : i.in : i.out;
	Ap(o, t, r);
	let s = t.seen.get(e);
	s.ref = o;
}, Am = (e, t, n, r) => {
	let i = e._zod.def;
	Ap(i.innerType, t, r);
	let a = t.seen.get(e);
	a.ref = i.innerType, n.readOnly = !0;
}, jm = (e, t, n, r) => {
	let i = e._zod.def;
	Ap(i.innerType, t, r);
	let a = t.seen.get(e);
	a.ref = i.innerType;
}, Mm = (e, t, n, r) => {
	let i = e._zod.innerType;
	Ap(i, t, r);
	let a = t.seen.get(e);
	a.ref = i;
}, Nm = /* @__PURE__ */ new WeakSet([Object.prototype, Error.prototype]);
function Pm(e, t, n) {
	Object.defineProperty(e, t, {
		configurable: !0,
		enumerable: !1,
		get() {
			let e = n(this);
			return Object.defineProperty(this, t, {
				value: e,
				configurable: !0,
				writable: !0
			}), e;
		},
		set(e) {
			Object.defineProperty(this, t, {
				value: e,
				configurable: !0,
				writable: !0
			});
		}
	});
}
var Fm = /*@__PURE__*/ K("ZodError", (e, t) => {
	Zc.init(e, t), e.name = "ZodError";
	let n = Object.getPrototypeOf(e);
	Nm.has(n) || (Nm.add(n), Pm(n, "format", (e) => (t) => el(e, t)), Pm(n, "flatten", (e) => (t) => $c(e, t)), Pm(n, "addIssue", (e) => (t) => {
		e.issues.push(t), e.message = JSON.stringify(e.issues, Os, 2);
	}), Pm(n, "addIssues", (e) => (t) => {
		e.issues.push(...t), e.message = JSON.stringify(e.issues, Os, 2);
	}), Object.defineProperty(n, "isEmpty", {
		configurable: !0,
		enumerable: !1,
		get() {
			return this.issues.length === 0;
		}
	}));
}, void 0, { Parent: Error }), Im = /* @__PURE__ */ nl(Fm), Lm = /* @__PURE__ */ rl(Fm), Rm = /* @__PURE__ */ il(Fm), zm = /* @__PURE__ */ ol(Fm), Bm = /* @__PURE__ */ fl(Fm), Vm = /* @__PURE__ */ pl(Fm), Hm = /* @__PURE__ */ ml(Fm), Um = /* @__PURE__ */ hl(Fm), Wm = /* @__PURE__ */ gl(Fm), Gm = /* @__PURE__ */ _l(Fm), Km = /* @__PURE__ */ vl(Fm), qm = /* @__PURE__ */ yl(Fm);
//#endregion
//#region ../../node_modules/.pnpm/zod@4.6.5/node_modules/zod/v4/classic/schemas.js
function Jm() {
	Uc.localeError || Wc(vf());
}
function Ym() {
	Uc.memoizer || Wc({ memoizer: hf() });
}
var Xm = /*@__PURE__*/ K("ZodType", (e, t) => (Jm(), bu.init(e, t), e.def = t, e.type = t.type, e), {
	check(...e) {
		let t = this.def;
		return this.clone(Us(t, { checks: [...t.checks ?? [], ...e.map((e) => typeof e == "function" ? { _zod: {
			check: e,
			def: { check: "custom" },
			onattach: []
		} } : e)] }), { parent: !0 });
	},
	with(...e) {
		return this.check(...e);
	},
	clone(e, t) {
		return $s(this, e, t);
	},
	brand() {
		return this;
	},
	register(e, t) {
		return e.add(this, t), this;
	},
	refine(e, t) {
		return this.check(gg(e, t));
	},
	superRefine(e, t) {
		return this.check(_g(e, t));
	},
	overwrite(e) {
		return this.check(/* @__PURE__ */ _p(e));
	},
	optional() {
		return Xh(this);
	},
	exactOptional() {
		return Qh(this);
	},
	nullable() {
		return eg(this);
	},
	nullish() {
		return Xh(eg(this));
	},
	nonoptional(e) {
		return og(this, e);
	},
	array() {
		return Fh(this);
	},
	or(e) {
		return Rh([this, e]);
	},
	and(e) {
		return Hh(this, e);
	},
	transform(e) {
		return ug(this, Jh(e));
	},
	default(e) {
		return ng(this, e);
	},
	prefault(e) {
		return ig(this, e);
	},
	catch(e) {
		return cg(this, e);
	},
	pipe(e) {
		return ug(this, e);
	},
	readonly() {
		return fg(this);
	},
	describe(e) {
		let t = this.clone();
		return Sf.add(t, { description: e }), t;
	},
	meta(...e) {
		if (e.length === 0) return Sf.get(this);
		let t = this.clone();
		return Sf.add(t, e[0]), t;
	},
	isOptional() {
		return this.safeParse(void 0).success;
	},
	isNullable() {
		return this.safeParse(null).success;
	},
	apply(e, ...t) {
		return t.length === 0 ? e(this) : e(this, ...t);
	},
	get "~standard"() {
		return Ec(this, "~standard", {
			...Cu(this),
			jsonSchema: {
				input: Hp(this, "input"),
				output: Hp(this, "output")
			}
		});
	},
	set "~standard"(e) {
		Tc(this, "~standard", e);
	},
	parse: function e(t, n) {
		return Im(this, t, n, { callee: e });
	},
	parseAsync: async function e(t, n) {
		return await Lm(this, t, n, { callee: e });
	},
	safeParse(e, t) {
		return Rm(this, e, t);
	},
	async safeParseAsync(e, t) {
		return zm(this, e, t);
	},
	get spa() {
		return this?.safeParseAsync;
	},
	set spa(e) {
		Tc(this, "spa", e);
	},
	validate(e, t) {
		return ll(this, e, t);
	},
	validateAsync(e, t) {
		return dl(this, e, t);
	},
	encode: function e(t, n) {
		return Bm(this, t, n, { callee: e });
	},
	decode: function e(t, n) {
		return Vm(this, t, n, { callee: e });
	},
	encodeAsync: async function e(t, n) {
		return await Hm(this, t, n, { callee: e });
	},
	decodeAsync: async function e(t, n) {
		return await Um(this, t, n, { callee: e });
	},
	safeEncode(e, t) {
		return Wm(this, e, t);
	},
	safeDecode(e, t) {
		return Gm(this, e, t);
	},
	async safeEncodeAsync(e, t) {
		return Km(this, e, t);
	},
	async safeDecodeAsync(e, t) {
		return qm(this, e, t);
	},
	toJSONSchema(e) {
		return Vp(this, {})(e);
	},
	get description() {
		return Sf.get(this)?.description;
	},
	get _def() {
		return this._zod.def;
	}
}), Zm = /*@__PURE__*/ K("_ZodString", (e, t) => {
	wu.init(e, t), Xm.init(e, t), e._zod.processJSONSchema = (t, n, r) => im(e, t, n, r);
}, /*@__PURE__*/ Dc({
	format: (e) => em(e).format ?? null,
	minLength: (e) => em(e).minimum ?? null,
	maxLength: (e) => em(e).maximum ?? null
}, {
	regex(...e) {
		return this.check(/* @__PURE__ */ dp(...e));
	},
	includes(...e) {
		return this.check(/* @__PURE__ */ mp(...e));
	},
	startsWith(...e) {
		return this.check(/* @__PURE__ */ hp(...e));
	},
	endsWith(...e) {
		return this.check(/* @__PURE__ */ gp(...e));
	},
	min(...e) {
		return this.check(/* @__PURE__ */ lp(...e));
	},
	max(...e) {
		return this.check(/* @__PURE__ */ cp(...e));
	},
	length(...e) {
		return this.check(/* @__PURE__ */ up(...e));
	},
	nonempty(...e) {
		return this.check(/* @__PURE__ */ lp(1, ...e));
	},
	lowercase(e) {
		return this.check(/* @__PURE__ */ fp(e));
	},
	uppercase(e) {
		return this.check(/* @__PURE__ */ pp(e));
	},
	trim() {
		return this.check(/* @__PURE__ */ yp());
	},
	normalize(...e) {
		return this.check(/* @__PURE__ */ vp(...e));
	},
	toLowerCase() {
		return this.check(/* @__PURE__ */ bp());
	},
	toUpperCase() {
		return this.check(/* @__PURE__ */ xp());
	},
	slugify() {
		return this.check(/* @__PURE__ */ Sp());
	}
})), Qm = /*@__PURE__*/ K("ZodString", (e, t) => {
	wu.init(e, t), Zm.init(e, t);
}, {
	email(e) {
		return this.check(/* @__PURE__ */ Tf(ih, e));
	},
	url(e) {
		return this.check(/* @__PURE__ */ jf(sh, e));
	},
	jwt(e) {
		return this.check(/* @__PURE__ */ Kf(Sh, e));
	},
	emoji(e) {
		return this.check(/* @__PURE__ */ Mf(ch, e));
	},
	guid(e) {
		return this.check(/* @__PURE__ */ Ef(ah, e));
	},
	uuid(e) {
		return this.check(/* @__PURE__ */ Df(oh, e));
	},
	uuidv4(e) {
		return this.check(/* @__PURE__ */ Of(oh, e));
	},
	uuidv6(e) {
		return this.check(/* @__PURE__ */ kf(oh, e));
	},
	uuidv7(e) {
		return this.check(/* @__PURE__ */ Af(oh, e));
	},
	nanoid(e) {
		return this.check(/* @__PURE__ */ Nf(lh, e));
	},
	cuid(e) {
		return this.check(/* @__PURE__ */ Pf(uh, e));
	},
	cuid2(e) {
		return this.check(/* @__PURE__ */ Ff(dh, e));
	},
	ulid(e) {
		return this.check(/* @__PURE__ */ If(fh, e));
	},
	base64(e) {
		return this.check(/* @__PURE__ */ Uf(yh, e));
	},
	base64url(e) {
		return this.check(/* @__PURE__ */ Wf(bh, e));
	},
	xid(e) {
		return this.check(/* @__PURE__ */ Lf(ph, e));
	},
	ksuid(e) {
		return this.check(/* @__PURE__ */ Rf(mh, e));
	},
	ipv4(e) {
		return this.check(/* @__PURE__ */ zf(hh, e));
	},
	ipv6(e) {
		return this.check(/* @__PURE__ */ Bf(gh, e));
	},
	cidrv4(e) {
		return this.check(/* @__PURE__ */ Vf(_h, e));
	},
	cidrv6(e) {
		return this.check(/* @__PURE__ */ Hf(vh, e));
	},
	e164(e) {
		return this.check(/* @__PURE__ */ Gf(xh, e));
	},
	datetime(e) {
		return this.check(/* @__PURE__ */ qf(eh, e));
	},
	date(e) {
		return this.check(/* @__PURE__ */ Jf(th, e));
	},
	time(e) {
		return this.check(/* @__PURE__ */ Yf(nh, e));
	},
	duration(e) {
		return this.check(/* @__PURE__ */ Xf(rh, e));
	}
});
function q(e) {
	return /* @__PURE__ */ wf(Qm, e);
}
var $m = /*@__PURE__*/ K("ZodStringFormat", (e, t) => {
	Tu.init(e, t), Zm.init(e, t);
}), eh = /*@__PURE__*/ K("ZodISODateTime", (e, t) => {
	Wu.init(e, t), $m.init(e, t);
}), th = /*@__PURE__*/ K("ZodISODate", (e, t) => {
	Gu.init(e, t), $m.init(e, t);
}), nh = /*@__PURE__*/ K("ZodISOTime", (e, t) => {
	Ku.init(e, t), $m.init(e, t);
}), rh = /*@__PURE__*/ K("ZodISODuration", (e, t) => {
	qu.init(e, t), $m.init(e, t);
}), ih = /*@__PURE__*/ K("ZodEmail", (e, t) => {
	Ou.init(e, t), $m.init(e, t);
}), ah = /*@__PURE__*/ K("ZodGUID", (e, t) => {
	Eu.init(e, t), $m.init(e, t);
}), oh = /*@__PURE__*/ K("ZodUUID", (e, t) => {
	Du.init(e, t), $m.init(e, t);
}), sh = /*@__PURE__*/ K("ZodURL", (e, t) => {
	Iu.init(e, t), $m.init(e, t);
}), ch = /*@__PURE__*/ K("ZodEmoji", (e, t) => {
	Lu.init(e, t), $m.init(e, t);
}), lh = /*@__PURE__*/ K("ZodNanoID", (e, t) => {
	Ru.init(e, t), $m.init(e, t);
}), uh = /*@__PURE__*/ K("ZodCUID", (e, t) => {
	zu.init(e, t), $m.init(e, t);
}), dh = /*@__PURE__*/ K("ZodCUID2", (e, t) => {
	Bu.init(e, t), $m.init(e, t);
}), fh = /*@__PURE__*/ K("ZodULID", (e, t) => {
	Vu.init(e, t), $m.init(e, t);
}), ph = /*@__PURE__*/ K("ZodXID", (e, t) => {
	Hu.init(e, t), $m.init(e, t);
}), mh = /*@__PURE__*/ K("ZodKSUID", (e, t) => {
	Uu.init(e, t), $m.init(e, t);
}), hh = /*@__PURE__*/ K("ZodIPv4", (e, t) => {
	Ju.init(e, t), $m.init(e, t);
}), gh = /*@__PURE__*/ K("ZodIPv6", (e, t) => {
	Zu.init(e, t), $m.init(e, t);
}), _h = /*@__PURE__*/ K("ZodCIDRv4", (e, t) => {
	Qu.init(e, t), $m.init(e, t);
}), vh = /*@__PURE__*/ K("ZodCIDRv6", (e, t) => {
	ed.init(e, t), $m.init(e, t);
}), yh = /*@__PURE__*/ K("ZodBase64", (e, t) => {
	rd.init(e, t), $m.init(e, t);
}), bh = /*@__PURE__*/ K("ZodBase64URL", (e, t) => {
	od.init(e, t), $m.init(e, t);
}), xh = /*@__PURE__*/ K("ZodE164", (e, t) => {
	sd.init(e, t), $m.init(e, t);
}), Sh = /*@__PURE__*/ K("ZodJWT", (e, t) => {
	ld.init(e, t), $m.init(e, t);
}), Ch = /*@__PURE__*/ K("ZodNumber", (e, t) => {
	ud.init(e, t), Xm.init(e, t), e._zod.processJSONSchema = (t, n, r) => am(e, t, n, r), e.isFinite = !0;
}, /*@__PURE__*/ Dc({
	minValue: (e) => {
		let { minimum: t, exclusiveMinimum: n } = em(e);
		return Math.max(t ?? -Infinity, n ?? -Infinity);
	},
	maxValue: (e) => {
		let { maximum: t, exclusiveMaximum: n } = em(e);
		return Math.min(t ?? Infinity, n ?? Infinity);
	},
	isInt: (e) => {
		let { isInt: t, multipleOf: n } = em(e);
		return !!t || !!n?.some(Number.isSafeInteger);
	},
	format: (e) => em(e).format ?? null
}, {
	gt(e, t) {
		return this.check(/* @__PURE__ */ ap(e, t));
	},
	gte(e, t) {
		return this.check(/* @__PURE__ */ op(e, t));
	},
	min(e, t) {
		return this.check(/* @__PURE__ */ op(e, t));
	},
	lt(e, t) {
		return this.check(/* @__PURE__ */ rp(e, t));
	},
	lte(e, t) {
		return this.check(/* @__PURE__ */ ip(e, t));
	},
	max(e, t) {
		return this.check(/* @__PURE__ */ ip(e, t));
	},
	int(e) {
		return this.check(Th(e));
	},
	safe(e) {
		return this.check(Th(e));
	},
	positive(e) {
		return this.check(/* @__PURE__ */ ap(0, e));
	},
	nonnegative(e) {
		return this.check(/* @__PURE__ */ op(0, e));
	},
	negative(e) {
		return this.check(/* @__PURE__ */ rp(0, e));
	},
	nonpositive(e) {
		return this.check(/* @__PURE__ */ ip(0, e));
	},
	multipleOf(e, t) {
		return this.check(/* @__PURE__ */ sp(e, t));
	},
	step(e, t) {
		return this.check(/* @__PURE__ */ sp(e, t));
	},
	finite() {
		return this;
	}
}));
function J(e) {
	return /* @__PURE__ */ Zf(Ch, e);
}
var wh = /*@__PURE__*/ K("ZodNumberFormat", (e, t) => {
	dd.init(e, t), Ch.init(e, t);
});
function Th(e) {
	return /* @__PURE__ */ Qf(wh, e);
}
var Eh = /*@__PURE__*/ K("ZodBoolean", (e, t) => {
	fd.init(e, t), Xm.init(e, t), e._zod.processJSONSchema = (t, n, r) => om(e, t, n, r);
});
function Dh(e) {
	return /* @__PURE__ */ $f(Eh, e);
}
var Oh = /*@__PURE__*/ K("ZodNull", (e, t) => {
	pd.init(e, t), Xm.init(e, t), e._zod.processJSONSchema = (t, n, r) => sm(e, t, n, r);
});
function kh(e) {
	return /* @__PURE__ */ ep(Oh, e);
}
var Ah = /*@__PURE__*/ K("ZodUnknown", (e, t) => {
	md.init(e, t), Xm.init(e, t), e._zod.processJSONSchema = (e, t, n) => void 0;
});
function jh() {
	return /* @__PURE__ */ tp(Ah);
}
var Mh = /*@__PURE__*/ K("ZodNever", (e, t) => {
	hd.init(e, t), Xm.init(e, t), e._zod.processJSONSchema = (t, n, r) => cm(e, t, n, r);
});
function Nh(e) {
	return /* @__PURE__ */ np(Mh, e);
}
var Ph = /*@__PURE__*/ K("ZodArray", (e, t) => {
	Ym(), _d.init(e, t), Xm.init(e, t), e._zod.processJSONSchema = (t, n, r) => pm(e, t, n, r), e.element = t.element;
}, {
	min(e, t) {
		return this.check(/* @__PURE__ */ lp(e, t));
	},
	nonempty(e) {
		return this.check(/* @__PURE__ */ lp(1, e));
	},
	max(e, t) {
		return this.check(/* @__PURE__ */ cp(e, t));
	},
	length(e, t) {
		return this.check(/* @__PURE__ */ up(e, t));
	},
	unwrap() {
		return this.element;
	}
});
function Fh(e, t) {
	return /* @__PURE__ */ Cp(Ph, e, t);
}
var Ih = /*@__PURE__*/ K("ZodObject", (e, t) => {
	Ym(), Cd.init(e, t), Xm.init(e, t), e._zod.processJSONSchema = (t, n, r) => hm(e, t, n, r), Pc(e, "shape", (e) => e._zod.def.shape, !1);
}, {
	keyof() {
		return X(Object.keys(this._zod.def.shape));
	},
	catchall(e) {
		return this.clone(Us(this._zod.def, { catchall: e }));
	},
	passthrough() {
		return this.clone(Us(this._zod.def, { catchall: jh() }));
	},
	loose() {
		return this.clone(Us(this._zod.def, { catchall: jh() }));
	},
	strict() {
		return this.clone(Us(this._zod.def, { catchall: Nh() }));
	},
	strip() {
		return this.clone(Us(this._zod.def, { catchall: void 0 }));
	},
	extend(e) {
		return sc(this, e);
	},
	safeExtend(e) {
		return lc(this, e);
	},
	merge(e) {
		return uc(this, e);
	},
	pick(e) {
		return ic(this, e);
	},
	omit(e) {
		return oc(this, e);
	},
	partial(...e) {
		return dc(Yh, this, e[0]);
	},
	exactPartial(...e) {
		return dc(Zh, this, e[0], "exactPartial");
	},
	required(...e) {
		return fc(ag, this, e[0]);
	}
});
function Y(e, t) {
	return new Ih({
		type: "object",
		shape: e,
		catchall: Nh(),
		...G(t)
	});
}
var Lh = /*@__PURE__*/ K("ZodUnion", (e, t) => {
	Td.init(e, t), Xm.init(e, t), e._zod.processJSONSchema = (t, n, r) => gm(e, t, n, r), e.options = t.options;
});
function Rh(e, t) {
	return new Lh({
		type: "union",
		options: e,
		...G(t)
	});
}
var zh = /*@__PURE__*/ K("ZodDiscriminatedUnion", (e, t) => {
	Lh.init(e, t), Dd.init(e, t);
});
function Bh(e, t, n) {
	return new zh({
		type: "union",
		options: t,
		discriminator: e,
		...G(n)
	});
}
var Vh = /*@__PURE__*/ K("ZodIntersection", (e, t) => {
	Od.init(e, t), Xm.init(e, t), e._zod.processJSONSchema = (t, n, r) => _m(e, t, n, r);
});
function Hh(e, t) {
	return new Vh({
		type: "intersection",
		left: e,
		right: t
	});
}
var Uh = /*@__PURE__*/ K("ZodRecord", (e, t) => {
	Ym(), jd.init(e, t), Xm.init(e, t), e._zod.processJSONSchema = (t, n, r) => xm(e, t, n, r), e.keyType = t.keyType, e.valueType = t.valueType;
});
function Wh(e, t, n) {
	return !t || !t._zod ? new Uh({
		type: "record",
		keyType: q(),
		valueType: e,
		...G(t)
	}) : new Uh({
		type: "record",
		keyType: e,
		valueType: t,
		...G(n)
	});
}
var Gh = /*@__PURE__*/ K("ZodEnum", (e, t) => {
	Md.init(e, t), Xm.init(e, t), e._zod.processJSONSchema = (t, n, r) => lm(e, t, n, r), e.enum = t.entries, e.options = [...e._zod.values];
	let n = new Set(Object.keys(t.entries));
	e.extract = (e, r) => {
		let i = {};
		for (let r of e) if (n.has(r)) i[r] = t.entries[r];
		else throw Error(`Key ${r} not found in enum`);
		return new Gh({
			...t,
			checks: [],
			...G(r),
			entries: i
		});
	}, e.exclude = (e, r) => {
		let i = { ...t.entries };
		for (let t of e) if (n.has(t)) delete i[t];
		else throw Error(`Key ${t} not found in enum`);
		return new Gh({
			...t,
			checks: [],
			...G(r),
			entries: i
		});
	};
});
function X(e, t) {
	return new Gh({
		type: "enum",
		entries: Array.isArray(e) ? Object.fromEntries(e.map((e) => [e, e])) : e,
		...G(t)
	});
}
var Kh = /*@__PURE__*/ K("ZodLiteral", (e, t) => {
	Nd.init(e, t), Xm.init(e, t), e._zod.processJSONSchema = (t, n, r) => um(e, t, n, r), e.values = new Set(t.values), Object.defineProperty(e, "value", { get() {
		if (t.values.length > 1) throw Error("This schema contains multiple valid literal values. Use `.values` instead.");
		return t.values[0];
	} });
});
function Z(e, t) {
	return new Kh({
		type: "literal",
		values: Array.isArray(e) ? e : [e],
		...G(t)
	});
}
var qh = /*@__PURE__*/ K("ZodTransform", (e, t) => {
	Ym(), Pd.init(e, t), Xm.init(e, t), e._zod.processJSONSchema = (t, n, r) => fm(e, t, n, r), e._zod.parse = (n, r) => {
		if (r.direction === "backward") throw new Hc(e.constructor.name);
		n.addIssue = (r) => {
			if (typeof r == "string") n.issues.push(Cc(r, n.value, t));
			else {
				let t = r;
				t.fatal && (t.continue = !1), t.code ??= "custom", "input" in t || (t.input = n.value), t.inst ??= e, n.issues.push(Cc(t));
			}
		};
		let i = t.transform(n.value, n);
		return i instanceof Promise ? i.then((e) => (n.value = e, n)) : (n.value = i, n);
	};
});
function Jh(e) {
	return new qh({
		type: "transform",
		transform: e
	});
}
var Yh = /*@__PURE__*/ K("ZodOptional", (e, t) => {
	Id.init(e, t), Xm.init(e, t), e._zod.processJSONSchema = (t, n, r) => jm(e, t, n, r), e.unwrap = () => e._zod.def.innerType;
});
function Xh(e) {
	return new Yh({
		type: "optional",
		innerType: e
	});
}
var Zh = /*@__PURE__*/ K("ZodExactOptional", (e, t) => {
	Ld.init(e, t), Xm.init(e, t), e._zod.processJSONSchema = (t, n, r) => jm(e, t, n, r), e.unwrap = () => e._zod.def.innerType;
});
function Qh(e) {
	return new Zh({
		type: "optional",
		innerType: e
	});
}
var $h = /*@__PURE__*/ K("ZodNullable", (e, t) => {
	Rd.init(e, t), Xm.init(e, t), e._zod.processJSONSchema = (t, n, r) => Sm(e, t, n, r), e.unwrap = () => e._zod.def.innerType;
});
function eg(e) {
	return new $h({
		type: "nullable",
		innerType: e
	});
}
var tg = /*@__PURE__*/ K("ZodDefault", (e, t) => {
	zd.init(e, t), Xm.init(e, t), e._zod.processJSONSchema = (t, n, r) => Em(e, t, n, r), e.unwrap = () => e._zod.def.innerType, e.removeDefault = e.unwrap;
});
function ng(e, t) {
	return new tg({
		type: "default",
		innerType: e,
		get defaultValue() {
			return typeof t == "function" ? t() : Xs(t);
		}
	});
}
var rg = /*@__PURE__*/ K("ZodPrefault", (e, t) => {
	Vd.init(e, t), Xm.init(e, t), e._zod.processJSONSchema = (t, n, r) => Dm(e, t, n, r), e.unwrap = () => e._zod.def.innerType;
});
function ig(e, t) {
	return new rg({
		type: "prefault",
		innerType: e,
		get defaultValue() {
			return typeof t == "function" ? t() : Xs(t);
		}
	});
}
var ag = /*@__PURE__*/ K("ZodNonOptional", (e, t) => {
	Hd.init(e, t), Xm.init(e, t), e._zod.processJSONSchema = (t, n, r) => Cm(e, t, n, r), e.unwrap = () => e._zod.def.innerType;
});
function og(e, t) {
	return new ag({
		type: "nonoptional",
		innerType: e,
		...G(t)
	});
}
var sg = /*@__PURE__*/ K("ZodCatch", (e, t) => {
	Gd.init(e, t), Xm.init(e, t), e._zod.processJSONSchema = (t, n, r) => Om(e, t, n, r), e.unwrap = () => e._zod.def.innerType, e.removeCatch = e.unwrap;
});
function cg(e, t) {
	return new sg({
		type: "catch",
		innerType: e,
		catchValue: typeof t == "function" ? t : Ic(t)
	});
}
var lg = /*@__PURE__*/ K("ZodPipe", (e, t) => {
	Kd.init(e, t), Xm.init(e, t), e._zod.processJSONSchema = (t, n, r) => km(e, t, n, r), e.in = t.in, e.out = t.out;
});
function ug(e, t) {
	return new lg({
		type: "pipe",
		in: e,
		out: t
	});
}
var dg = /*@__PURE__*/ K("ZodReadonly", (e, t) => {
	Jd.init(e, t), Xm.init(e, t), e._zod.processJSONSchema = (t, n, r) => Am(e, t, n, r), e.unwrap = () => e._zod.def.innerType;
});
function fg(e) {
	return new dg({
		type: "readonly",
		innerType: e
	});
}
var pg = /*@__PURE__*/ K("ZodLazy", (e, t) => {
	Xd.init(e, t), Xm.init(e, t), e._zod.processJSONSchema = (t, n, r) => Mm(e, t, n, r), e.unwrap = () => e._zod.def.getter();
});
function mg(e) {
	return new pg({
		type: "lazy",
		getter: e
	});
}
var hg = /*@__PURE__*/ K("ZodCustom", (e, t) => {
	Zd.init(e, t), Xm.init(e, t), e._zod.processJSONSchema = (t, n, r) => dm(e, t, n, r);
});
function gg(e, t = {}) {
	return /* @__PURE__ */ wp(hg, e, t);
}
function _g(e, t) {
	return /* @__PURE__ */ Tp(e, t);
}
function vg(e) {
	let t = mg(() => Rh([
		q(e),
		J(),
		Dh(),
		kh(),
		Fh(t),
		Wh(q(), t)
	]));
	return t;
}
//#endregion
//#region ../schema/src/common.ts
var yg = q().regex(/^[A-Za-z][A-Za-z0-9_-]{0,63}$/, "must start with a letter and use only letters, digits, _ or -"), bg = yg, xg = q().regex(/^[a-z0-9][a-z0-9_./-]{0,127}$/, "asset keys use lower-case letters, digits, _ . / -"), Sg = Rh([Z(""), xg]), Cg = q().regex(/^[A-Za-z][A-Za-z0-9_.-]{0,63}$/, "flag names start with a letter; letters, digits, _ . - allowed"), wg = Rh([
	Dh(),
	J(),
	q()
]), Tg = q().regex(/^[a-z]{2,3}(-[A-Za-z0-9]{2,8})*$/, "use a language tag such as en or zh-Hans"), Eg = X([
	"far-left",
	"left",
	"center",
	"right",
	"far-right"
]), Dg = Y({
	x: J().min(0).max(1),
	y: J().min(0).max(1),
	scale: J().positive().max(10).optional()
}), Og = q().regex(/^#[0-9a-fA-F]{6}$/, "use a color written as #rrggbb, such as #000000"), kg = J().int().min(0).max(6e5), Ag = J().min(0).max(1), jg = mg(() => Rh([
	Y({
		flag: Cg,
		is: wg
	}),
	Y({
		flag: Cg,
		isNot: wg
	}),
	Y({
		flag: Cg,
		gt: J()
	}),
	Y({
		flag: Cg,
		gte: J()
	}),
	Y({
		flag: Cg,
		lt: J()
	}),
	Y({
		flag: Cg,
		lte: J()
	}),
	Y({ completed: yg }),
	Y({ and: Fh(jg).min(1) }),
	Y({ or: Fh(jg).min(1) }),
	Y({ not: jg })
])), Mg = Rh([Y({
	flag: Cg,
	to: wg
}), Y({
	flag: Cg,
	add: J()
})]);
function Ng(e, t = /* @__PURE__ */ new Set()) {
	return "flag" in e ? t.add(e.flag) : "and" in e ? e.and.forEach((e) => Ng(e, t)) : "or" in e ? e.or.forEach((e) => Ng(e, t)) : "not" in e && Ng(e.not, t), t;
}
function Pg(e) {
	return "completed" in e ? !0 : "and" in e ? e.and.some(Pg) : "or" in e ? e.or.some(Pg) : "not" in e && Pg(e.not);
}
var Fg = X([
	"shake",
	"flash-white",
	"flash-red",
	"zoom",
	"blur",
	"glitch",
	"fade-black",
	"rain",
	"snow",
	"embers",
	"dream-glow",
	"old-film",
	"vignette"
]), Ig = J().min(.1).max(5), Lg = J().min(.1).max(5), Rg = {
	durationMs: kg.optional(),
	intensity: Ag.optional(),
	speed: Ig.optional(),
	size: Lg.optional()
}, zg = (e, t) => ({
	label: e,
	min: 0,
	max: 1,
	step: .05,
	default: t
}), Bg = (e = "Speed") => ({
	label: e,
	min: .25,
	max: 4,
	step: .05,
	default: 1
}), Vg = (e) => ({
	label: e,
	min: .25,
	max: 4,
	step: .05,
	default: 1
}), Hg = {
	shake: {
		label: "Shake",
		defaultDurationMs: 700,
		params: {
			intensity: zg("Strength", .7),
			speed: Bg("Shakes per second")
		}
	},
	"flash-white": {
		label: "White flash",
		defaultDurationMs: 400,
		params: { intensity: zg("Brightness", .9) }
	},
	"flash-red": {
		label: "Red flash",
		defaultDurationMs: 500,
		params: { intensity: zg("Brightness", .8) }
	},
	zoom: {
		label: "Zoom pulse",
		defaultDurationMs: 1200,
		params: { intensity: zg("How far", .6) }
	},
	blur: {
		label: "Blur",
		defaultDurationMs: 1500,
		params: { intensity: zg("Amount", .6) }
	},
	glitch: {
		label: "Glitch",
		defaultDurationMs: 700,
		params: {
			intensity: zg("Strength", .7),
			speed: Bg("Glitch rate")
		}
	},
	"fade-black": {
		label: "Fade to black",
		defaultDurationMs: 2e3,
		params: {}
	},
	rain: {
		label: "Rain",
		defaultDurationMs: 5e3,
		params: {
			intensity: zg("Visibility", .7),
			speed: Bg("Fall speed"),
			size: Vg("Drop length")
		}
	},
	snow: {
		label: "Snow",
		defaultDurationMs: 5e3,
		params: {
			intensity: zg("Visibility", .8),
			speed: Bg("Fall speed"),
			size: Vg("Flake size")
		}
	},
	embers: {
		label: "Embers",
		defaultDurationMs: 5e3,
		params: {
			intensity: zg("Visibility", .8),
			speed: Bg("Rise speed"),
			size: Vg("Ember size")
		}
	},
	"dream-glow": {
		label: "Dream glow",
		defaultDurationMs: 4e3,
		params: {
			intensity: zg("Glow", .7),
			speed: Bg("Pulse rate"),
			size: Vg("Spread")
		}
	},
	"old-film": {
		label: "Old film",
		defaultDurationMs: 6e3,
		params: {
			intensity: zg("Grain", .7),
			speed: Bg("Flicker rate")
		}
	},
	vignette: {
		label: "Vignette",
		defaultDurationMs: 3e3,
		params: {
			intensity: zg("Darkness", .85),
			size: Vg("Reach")
		}
	}
};
function Ug(e) {
	let t = Hg[e.name];
	return {
		name: e.name,
		durationMs: e.durationMs ?? t.defaultDurationMs,
		intensity: e.intensity ?? t.params.intensity?.default ?? .7,
		speed: e.speed ?? t.params.speed?.default ?? 1,
		size: e.size ?? t.params.size?.default ?? 1
	};
}
var Wg = X([
	"both",
	"stage",
	"dialog",
	"none"
]), Gg = (e) => e === "both" || e === "stage", Kg = (e) => e === "both" || e === "dialog", qg = X([
	"left",
	"right",
	"follow"
]), Jg = X([
	"off",
	"subtle",
	"strong"
]), Yg = X([
	"cut",
	"fade",
	"slide"
]), Xg = Y({
	show: Wg.optional(),
	faceSide: qg.optional(),
	tone: Jg.optional(),
	dim: Jg.optional(),
	shrink: Dh().optional(),
	animation: Yg.optional()
});
function Zg(e) {
	return {
		dim: e?.dim ?? e?.tone ?? "subtle",
		shrink: e?.shrink ?? !1
	};
}
var Qg = {
	show: "both",
	faceSide: "left",
	tone: "subtle",
	animation: "fade"
};
function $g(e) {
	return {
		show: e?.show ?? Qg.show,
		faceSide: e?.faceSide ?? Qg.faceSide,
		tone: e?.tone ?? Qg.tone,
		animation: e?.animation ?? Qg.animation
	};
}
var e_ = {
	subtle: {
		brightness: .8,
		saturate: 1,
		scale: 1
	},
	strong: {
		brightness: .55,
		saturate: .7,
		scale: .96
	}
}, t_ = .5, n_ = .9;
function r_(e, t = 0) {
	if (e === "off") return {
		brightness: 1,
		saturate: 1,
		scale: 1
	};
	let n = e_[e];
	return {
		...n,
		brightness: 1 - Math.min(n_, 1 - n.brightness + t)
	};
}
var i_ = X([
	"face",
	"temporary",
	"stage",
	"leave"
]), a_ = X(["back", "front"]), o_ = X(["replace", "share"]), s_ = Y({
	picture: i_.optional(),
	slot: Eg.optional(),
	pos: Dg.optional(),
	ifTaken: o_.optional(),
	flip: Dh().optional(),
	layer: a_.optional(),
	faceSide: qg.optional(),
	show: Wg.optional(),
	toneDown: Dh().optional(),
	animation: Yg.optional()
}), c_ = [
	"left",
	"center",
	"right"
], l_ = X([
	"dawn",
	"day",
	"dusk",
	"night",
	"storm",
	"dream"
]), u_ = X([
	"fade",
	"cut",
	"blur"
]), d_ = J().min(.25).max(2), f_ = Bh("op", [
	Y({
		op: Z("bg"),
		asset: xg,
		fadeMs: kg.optional(),
		style: u_.optional()
	}),
	Y({
		op: Z("music"),
		asset: xg.nullable(),
		fadeMs: kg.optional(),
		volume: Ag.optional()
	}),
	Y({
		op: Z("sfx"),
		asset: xg,
		volume: Ag.optional()
	}),
	Y({
		op: Z("enter"),
		who: yg,
		slot: Eg.optional(),
		pos: Dg.optional(),
		expr: q().max(64).optional(),
		share: Dh().optional(),
		flip: Dh().optional(),
		layer: a_.optional(),
		animation: Yg.optional(),
		fadeMs: kg.optional()
	}),
	Y({
		op: Z("exit"),
		who: yg,
		animation: Yg.optional(),
		fadeMs: kg.optional()
	}),
	Y({
		op: Z("expr"),
		who: yg,
		expr: q().max(64)
	}),
	Y({
		op: Z("show"),
		id: yg,
		asset: xg,
		slot: Eg.optional(),
		pos: Dg.optional(),
		layer: X(["back", "front"]).optional(),
		fadeMs: kg.optional()
	}),
	Y({
		op: Z("hide"),
		id: yg,
		fadeMs: kg.optional()
	}),
	Y({
		op: Z("effect"),
		name: Fg,
		...Rg
	}),
	Y({
		op: Z("tone"),
		mood: l_,
		fadeMs: kg.optional()
	}),
	Y({
		op: Z("dim"),
		amount: Ag
	}),
	Y({
		op: Z("backdrop"),
		brightness: d_.optional(),
		blur: Ag.optional()
	}),
	Y({
		op: Z("light"),
		who: yg,
		brightness: d_
	}),
	Y({
		op: Z("clear"),
		what: X([
			"portraits",
			"objects",
			"all"
		]),
		animation: Yg.optional(),
		when: X(["with", "before"]).optional()
	})
]), p_ = kg, m_ = Rh([Eg, Dg]), h_ = X([
	"top-left",
	"top",
	"top-right",
	"left",
	"center",
	"right",
	"bottom-left",
	"bottom",
	"bottom-right"
]), g_ = X(["cover", "contain"]), __ = X([
	"fade",
	"left",
	"right",
	"top",
	"bottom"
]), v_ = X([
	"linear",
	"in",
	"out",
	"inOut"
]), y_ = (e, t) => Fh(Y({
	t: kg,
	value: J().min(e).max(t),
	ease: v_.optional()
})).max(200), b_ = Y({
	x: y_(-5, 5).optional(),
	y: y_(-5, 5).optional(),
	scale: y_(0, 8).optional(),
	scaleY: y_(0, 8).optional(),
	rotation: y_(-3600, 3600).optional(),
	opacity: y_(0, 1).optional()
}), x_ = {
	locked: Z(!0).optional(),
	hidden: Z(!0).optional()
}, S_ = Bh("type", [
	Y({
		type: Z("image"),
		...x_,
		startTime: p_,
		endTime: p_.optional(),
		label: q().max(120).optional(),
		src: Sg,
		position: m_.optional(),
		focus: h_.optional(),
		pivot: h_.optional(),
		fit: g_.optional(),
		scale: J().min(.1).max(4).optional(),
		offset: Y({
			x: J().min(-1).max(1),
			y: J().min(-1).max(1)
		}).optional(),
		fadeInMs: kg.optional(),
		fadeOutMs: kg.optional(),
		enter: __.optional(),
		exit: __.optional(),
		animation: b_.optional(),
		animated: Z(!0).optional()
	}),
	Y({
		type: Z("video"),
		...x_,
		startTime: p_,
		endTime: p_.optional(),
		label: q().max(120).optional(),
		src: Sg,
		position: m_.optional(),
		focus: h_.optional(),
		pivot: h_.optional(),
		fit: g_.optional(),
		scale: J().min(.1).max(4).optional(),
		offset: Y({
			x: J().min(-1).max(1),
			y: J().min(-1).max(1)
		}).optional(),
		loop: Dh().optional(),
		fadeInMs: kg.optional(),
		fadeOutMs: kg.optional(),
		enter: __.optional(),
		exit: __.optional(),
		animation: b_.optional(),
		animated: Z(!0).optional()
	}),
	Y({
		type: Z("text"),
		...x_,
		startTime: p_,
		endTime: p_.optional(),
		label: q().max(120).optional(),
		textKey: bg,
		position: m_.optional(),
		align: X([
			"left",
			"center",
			"right"
		]).optional(),
		font: X(["serif", "sans"]).optional(),
		bold: Dh().optional(),
		italic: Dh().optional(),
		shadow: Dh().optional(),
		size: J().min(.5).max(30).optional(),
		color: Og.optional(),
		fadeInMs: kg.optional(),
		fadeOutMs: kg.optional(),
		enter: __.optional(),
		exit: __.optional(),
		animation: b_.optional(),
		animated: Z(!0).optional()
	}),
	Y({
		type: Z("color"),
		...x_,
		startTime: p_,
		endTime: p_.optional(),
		label: q().max(120).optional(),
		color: Og.optional(),
		strength: Ag.optional(),
		fadeInMs: kg.optional(),
		fadeOutMs: kg.optional(),
		animation: b_.optional(),
		animated: Z(!0).optional()
	}),
	Y({
		type: Z("sound"),
		startTime: p_,
		endTime: p_.optional(),
		fadeOutMs: kg.optional(),
		label: q().max(120).optional(),
		src: Sg,
		volume: Ag.optional()
	}),
	Y({
		type: Z("voice"),
		startTime: p_,
		endTime: p_.optional(),
		fadeOutMs: kg.optional(),
		label: q().max(120).optional(),
		src: Sg,
		volume: Ag.optional(),
		duckMusic: Dh().optional()
	}),
	Y({
		type: Z("music_stop"),
		startTime: p_,
		label: q().max(120).optional(),
		fadeMs: kg.optional()
	}),
	Y({
		type: Z("music"),
		startTime: p_,
		endTime: p_.optional(),
		fadeOutMs: kg.optional(),
		label: q().max(120).optional(),
		src: Sg,
		fadeMs: kg.optional(),
		volume: Ag.optional()
	}),
	Y({
		type: Z("effect"),
		startTime: p_,
		label: q().max(120).optional(),
		name: Fg,
		...Rg
	}),
	Y({
		type: Z("end_scene"),
		startTime: p_
	})
]), C_ = Y({
	imageFadeInMs: kg.optional(),
	imageFadeOutMs: kg.optional(),
	imageEnter: __.optional(),
	imageExit: __.optional()
}), w_ = Y({
	label: q().max(120).optional(),
	defaults: C_.optional(),
	items: Fh(S_)
}), T_ = Y({
	autoplay: Dh().optional(),
	pauseGame: Dh().optional(),
	durationMs: J().int().min(0).max(6e5).optional()
});
function E_(e, t, n) {
	let r = n?.autoplay ?? t?.autoplay ?? !1, i = n?.durationMs ?? t?.durationMs;
	return {
		autoplay: r,
		pauseGame: !r || (n?.pauseGame ?? t?.pauseGame ?? !1),
		allowManualAdvance: !r || (e?.autoplayAllowManualAdvance ?? !0),
		delayMs: e?.autoplayDelayMs ?? 600,
		...i === void 0 ? {} : { durationMs: i }
	};
}
var D_ = Y({
	delayMs: J().int().min(0).max(6e5).optional(),
	allowManualAdvance: Dh().optional(),
	pauseGame: Dh().optional()
});
function O_(e = {}) {
	return {
		autoplay: !0,
		delayMs: e.delayMs ?? 600,
		allowManualAdvance: e.allowManualAdvance ?? !0,
		pauseGame: e.pauseGame ?? !1
	};
}
var k_ = X(["top", "bottom"]), A_ = [
	"bubble",
	"face-box",
	"box"
], j_ = ["standard", "long"], M_ = X([
	"portrait-short",
	"portrait-long",
	"together",
	"text-short",
	"text-long"
]), N_ = [
	"left",
	"center",
	"right"
], P_ = X(["filled", "outlined"]), F_ = Y({
	mode: X([...A_, "auto"]).optional(),
	position: k_.optional(),
	enter: M_.optional()
}), I_ = Y({
	mode: X(j_).optional(),
	position: k_.optional(),
	align: X(N_).optional(),
	horizontalAlign: X(N_).optional()
}), L_ = Y({
	line: F_.optional(),
	narration: I_.optional()
}), R_ = {
	mode: "face-box",
	position: "bottom",
	enter: "portrait-short"
}, z_ = {
	mode: "standard",
	position: "top",
	align: "left",
	horizontalAlign: "left"
}, B_ = (e) => e ? "box" : "face-box", V_ = (e, t) => {
	let n = e?.mode ?? t?.line?.mode;
	return n === void 0 || n === "auto";
};
function H_(e, t, n) {
	return {
		mode: V_(e, t) ? B_(n?.stagePortrait) : e?.mode ?? t?.line?.mode,
		position: e?.position ?? t?.line?.position ?? R_.position,
		enter: e?.enter ?? t?.line?.enter ?? R_.enter
	};
}
function U_(e, t) {
	return {
		mode: e?.mode ?? t?.narration?.mode ?? z_.mode,
		position: e?.position ?? t?.narration?.position ?? z_.position,
		align: e?.align ?? t?.narration?.align ?? z_.align,
		horizontalAlign: e?.horizontalAlign ?? t?.narration?.horizontalAlign ?? e?.align ?? t?.narration?.align ?? z_.horizontalAlign
	};
}
//#endregion
//#region ../schema/src/steps.ts
var W_ = {
	id: yg,
	when: jg.optional(),
	stage: Fh(f_).optional(),
	note: q().max(500).optional(),
	hidden: Dh().optional(),
	inRoute: yg.optional()
}, G_ = Y({
	...W_,
	type: Z("narration"),
	presentation: I_.optional(),
	playback: T_.optional(),
	text: bg,
	voice: xg.optional(),
	duckMusic: Dh().optional()
}), K_ = X([
	"crossfade",
	"cut",
	"in-out"
]), q_ = Y({
	...W_,
	type: Z("line"),
	presentation: F_.optional(),
	playback: T_.optional(),
	speaker: yg,
	expr: q().max(64).optional(),
	exprChange: K_.optional(),
	portrait: s_.optional(),
	text: bg,
	voice: xg.optional(),
	duckMusic: Dh().optional()
}), J_ = Y({
	...W_,
	type: Z("sequence"),
	ref: yg,
	blocking: Dh().default(!0),
	skippable: Dh().default(!0),
	trigger: X(["auto", "onClick"]).default("auto"),
	skipPromptKey: bg.optional(),
	hold: Dh().default(!1),
	keepDialog: Dh().default(!1),
	layer: X(["behind", "front"]).default("behind")
}), Y_ = Y({
	...W_,
	type: Z("hold-end"),
	start: yg,
	ending: X(["fade", "cut"]).default("fade"),
	fadeMs: J().int().min(0).max(1e4).default(500)
}), X_ = Y({
	...W_,
	type: Z("delay"),
	ms: kg,
	skippable: Dh().default(!1)
}), Z_ = X([
	"picture",
	"music",
	"dialog"
]), Q_ = X([
	"out",
	"in",
	"through"
]), $_ = J().int().min(0).max(1e4), ev = Y({
	...W_,
	type: Z("transition"),
	mode: Q_.default("through"),
	color: Og.default("#000000"),
	affects: Fh(Z_).min(1).refine((e) => new Set(e).size === e.length, "list each part once").default(["picture", "music"]),
	outMs: $_.default(1e3),
	holdMs: $_.default(500),
	inMs: $_.default(1e3),
	skippable: Dh().default(!1)
}), tv = Y({
	...W_,
	type: Z("event"),
	name: yg,
	params: Wh(q(), vg()).optional(),
	outcomes: Fh(yg).min(1),
	default: yg,
	resultFlag: Cg.optional()
}), nv = Y({
	...W_,
	type: Z("set"),
	set: Fh(Mg).min(1)
}), rv = Y({
	id: yg,
	text: bg,
	when: jg.optional(),
	set: Fh(Mg).optional()
}), iv = Y({
	...W_,
	type: Z("choice"),
	prompt: bg.optional(),
	options: Fh(rv).min(2)
}), av = Y({
	...W_,
	type: Z("end"),
	exit: yg
}), ov = Y({
	...W_,
	type: Z("leave"),
	from: X(["scene", "fork"]).default("scene")
}), sv = Y({
	...W_,
	type: Z("goto"),
	scene: yg.optional(),
	mark: yg.optional()
}), cv = Y({
	...W_,
	type: Z("mark"),
	label: q().max(80).default("")
}), lv = Y({
	id: yg,
	label: q().max(80).optional(),
	when: jg.optional()
}), uv = Y({
	...W_,
	type: Z("fork"),
	routes: Fh(lv).min(1)
}), dv = Bh("type", [
	Y({
		...W_,
		type: Z("autoplay-start"),
		settings: D_.optional()
	}),
	Y({
		...W_,
		type: Z("autoplay-end"),
		start: yg
	}),
	G_,
	q_,
	J_,
	X_,
	ev,
	Y_,
	tv,
	nv,
	iv,
	av,
	uv,
	ov,
	sv,
	cv
]);
//#endregion
//#region ../schema/src/routes.ts
function fv(e) {
	let t = /* @__PURE__ */ new Map();
	for (let n of e) if (n.type === "fork") for (let e of n.routes) t.has(e.id) || t.set(e.id, {
		fork: n,
		route: e
	});
	return t;
}
function pv(e, t) {
	let n = [], r = /* @__PURE__ */ new Set(), i = e.inRoute;
	for (; i && !r.has(i);) {
		r.add(i);
		let e = t.get(i);
		if (!e) break;
		n.unshift(e), i = e.fork.inRoute;
	}
	return n;
}
function mv(e, t) {
	let n = [];
	for (let { fork: r, route: i } of pv(e, t)) r.when && n.push(r.when), i.when && n.push(i.when);
	if (e.when && n.push(e.when), n.length !== 0) return n.length === 1 ? n[0] : { and: n };
}
function hv(e) {
	if (!e.some((e) => e.type === "fork" || e.inRoute)) return [...e];
	let t = fv(e);
	return e.map((e) => {
		let n = mv(e, t);
		if (!n && !e.inRoute && e.type !== "fork") return e;
		let r = { ...e };
		return delete r.inRoute, delete r.when, e.type === "fork" && (delete r.routes, r.type = "set", r.set = []), n && (r.when = n), r;
	});
}
function gv(e, t) {
	let n = e[t];
	if (n?.type !== "fork") return t;
	let r = fv(e), i = t;
	return e.forEach((e, t) => {
		t > i && pv(e, r).some((e) => e.fork === n) && (i = t);
	}), i;
}
function _v(e, t) {
	let n = e[t];
	if (n?.type !== "leave") return;
	if (n.from === "scene") return "scene";
	let r = pv(n, fv(e)).at(-1)?.fork;
	if (!r) return;
	let i = e[gv(e, e.indexOf(r)) + 1];
	return i ? i.id : "scene";
}
//#endregion
//#region ../schema/src/transition.ts
var vv = {
	mode: "through",
	color: "#000000",
	affects: ["picture", "music"],
	outMs: 1e3,
	holdMs: 500,
	inMs: 1e3,
	skippable: !1
};
function yv(e) {
	let t = e.mode ?? vv.mode;
	return {
		mode: t,
		color: e.color ?? vv.color,
		affects: [...e.affects ?? vv.affects],
		outMs: t === "in" ? 0 : e.outMs ?? vv.outMs,
		holdMs: t === "through" ? e.holdMs ?? vv.holdMs : 0,
		inMs: t === "out" ? 0 : e.inMs ?? vv.inMs,
		skippable: e.skippable ?? vv.skippable
	};
}
//#endregion
//#region ../schema/src/character.ts
var bv = Y({
	x: J().min(0).max(100),
	y: J().min(0).max(100),
	zoom: J().min(.05).max(8)
}), xv = Y({
	x: J().min(0).max(1),
	y: J().min(0).max(1),
	size: J().min(.02).max(1)
}), Sv = {
	x: .49,
	y: .22,
	size: .37
}, Cv = Y({
	scale: J().min(.3).max(2).optional(),
	lift: J().min(-.5).max(.5).optional(),
	sameAs: q().min(1).max(64).optional(),
	flip: Dh().optional(),
	head: xv.optional()
}), wv = Y({
	id: yg,
	speakerBadge: P_.optional(),
	names: Wh(Tg, q().min(1).max(80)).refine((e) => Object.keys(e).length > 0, "at least one name"),
	fullNames: Wh(Tg, q().min(1).max(160)).optional(),
	faceCrops: Wh(q().max(64), bv).optional(),
	color: q().regex(/^#[0-9a-fA-F]{6}$/).optional(),
	label: q().max(80).optional(),
	note: q().max(2e3).optional(),
	expressions: Wh(q().max(64), xg).default({}),
	faces: Wh(q().max(64), xg).optional(),
	expressionOrder: Fh(q().max(64)).max(200).optional(),
	defaultExpression: q().max(64).optional(),
	home: Eg.optional(),
	faceSide: qg.optional(),
	dimExtra: J().min(0).max(t_).optional(),
	fits: Wh(q().max(64), Cv).optional()
});
function Tv(e, t, n) {
	let r = (e) => e.split("-")[0].toLowerCase(), i = (t) => e[t] ?? Object.entries(e).find(([e]) => r(e) === r(t))?.[1];
	return i(t) ?? i(n) ?? Object.values(e)[0];
}
function Ev(e, t) {
	let n = /* @__PURE__ */ new Map();
	for (let t of e) n.set(t.id, t);
	for (let e of t) n.set(e.id, e);
	return [...n.values()];
}
function Dv(e) {
	let t = /* @__PURE__ */ new Set([...Object.keys(e.expressions), ...Object.keys(e.faces ?? {})]), n = (e.expressionOrder ?? []).filter((e) => t.has(e));
	return [.../* @__PURE__ */ new Set([...n, ...t])];
}
function Ov(e) {
	let t = Dv(e);
	return e.defaultExpression && t.includes(e.defaultExpression) ? e.defaultExpression : t[0];
}
function kv(e, t) {
	return t !== void 0 && Dv(e).includes(t) ? t : Ov(e);
}
function Av(e, t) {
	if (!e) return;
	let n = kv(e, t);
	if (n === void 0) return;
	let r = e.faces?.[n];
	if (r) return {
		asset: r,
		art: !1,
		expression: n
	};
	let i = e.expressions[n];
	return i ? {
		asset: i,
		art: !0,
		expression: n
	} : void 0;
}
function jv(e, t) {
	if (!e) return;
	let n = t === void 0 ? void 0 : e.expressions[t];
	if (n && t !== void 0) return {
		asset: n,
		expression: t
	};
	let r = Ov(e), i = r === void 0 ? void 0 : e.expressions[r];
	if (i && r !== void 0) return {
		asset: i,
		expression: r
	};
	for (let t of Dv(e)) {
		let n = e.expressions[t];
		if (n) return {
			asset: n,
			expression: t
		};
	}
}
function Mv(e, t) {
	return jv(e, t)?.asset;
}
function Nv(e, t) {
	let n = jv(e, t);
	if (!n || !e) return;
	let r = e.fits?.[n.expression];
	if (!r?.sameAs) return r;
	let i = /* @__PURE__ */ new Set([n.expression]), a = r;
	for (; a.sameAs;) {
		if (i.has(a.sameAs) || !e.expressions[a.sameAs]) return {
			scale: r.scale,
			lift: r.lift,
			flip: r.flip
		};
		i.add(a.sameAs), a = e.fits?.[a.sameAs] ?? {};
	}
	return {
		scale: a.scale,
		lift: a.lift,
		flip: r.flip
	};
}
function Pv(e, t) {
	let n = jv(e, t);
	if (!n || !e) return;
	let r = Ov(e);
	return e.fits?.[n.expression]?.head ?? (r === void 0 ? void 0 : e.fits?.[r]?.head) ?? Sv;
}
function Fv(e, t) {
	return Av(e, t)?.asset;
}
var Iv = X([
	"slow",
	"normal",
	"fast",
	"instant"
]), Lv = {
	slow: 12,
	normal: 24,
	fast: 48,
	instant: 0
}, Rv = (e) => Lv[e ?? "normal"], zv = 1500, Bv = X([
	"title",
	"corner",
	"quiet"
]), Vv = X(["serif", "default"]), Hv = {
	stage: "rgb(18 21 26 / 0.85)",
	night: "rgb(0 0 0 / 0.7)",
	deep: "rgb(0 0 0 / 0.9)",
	dusk: "rgb(30 27 75 / 0.8)",
	paper: "rgb(255 255 255 / 0.85)",
	clear: "rgb(0 0 0 / 0)"
}, Uv = {
	warm: "#eec68b",
	soft: "rgb(255 255 255 / 0.15)",
	bright: "rgb(255 255 255 / 0.55)",
	dark: "rgb(0 0 0 / 0.45)",
	none: "rgb(0 0 0 / 0)"
}, Wv = {
	story: "#fff3e2",
	white: "#ffffff",
	cream: "#fdf6e3",
	ink: "#111111"
}, Gv = {
	ink: "rgb(0 0 0 / 0.85)",
	dusk: "rgb(30 27 75 / 0.9)",
	paper: "rgb(255 255 255 / 0.9)",
	clear: "rgb(0 0 0 / 0)"
}, Kv = {
	speaker: "",
	bright: "rgb(255 255 255 / 0.55)",
	dark: "rgb(0 0 0 / 0.45)",
	none: "rgb(0 0 0 / 0)"
}, qv = (e) => Rh([X(Object.keys(e)), Og]), Jv = X([
	"square",
	"rounded",
	"round"
]), Yv = Y({
	box: Dh().optional(),
	background: qv(Hv).optional(),
	border: qv(Uv).optional(),
	text: qv(Wv).optional(),
	corners: Jv.optional()
}), Xv = Y({
	box: Dh().optional(),
	background: qv(Gv).optional(),
	border: qv(Kv).optional(),
	corners: Jv.optional()
}), Zv = Y({
	presentation: L_.optional(),
	advancedSteps: Dh().optional(),
	textSpeed: Iv.optional(),
	autoplayDelayMs: J().int().min(0).max(6e5).optional(),
	autoplayAllowManualAdvance: Dh().optional(),
	textStyle: Vv.optional(),
	sceneFadeOutMs: J().int().min(0).max(1e4).optional(),
	sceneFadeInMs: J().int().min(0).max(1e4).optional(),
	sceneGapMs: J().int().min(0).max(1e4).optional(),
	sceneTitleMs: J().int().min(0).max(1e4).optional(),
	sceneTitleGapMs: J().int().min(0).max(1e4).optional(),
	sceneStart: Bv.optional(),
	portraits: Xg.optional(),
	styles: Y({
		narration: Yv.optional(),
		line: Yv.optional(),
		nameTag: Xv.optional()
	}).optional()
}), Qv = {
	narration: {
		box: !1,
		background: Hv.stage,
		border: Uv.warm,
		text: Wv.white,
		corners: "rounded"
	},
	line: {
		box: !0,
		background: Hv.stage,
		border: Uv.warm,
		text: Wv.story,
		corners: "rounded"
	}
}, $v = (e, t, n) => e === void 0 ? n : t[e] ?? e;
function ey(e, t) {
	let n = Qv[e], r = t?.styles?.[e];
	return {
		box: r?.box ?? n.box,
		background: $v(r?.background, Hv, n.background),
		border: $v(r?.border, Uv, n.border),
		text: $v(r?.text, Wv, n.text),
		corners: r?.corners ?? n.corners
	};
}
var ty = {
	box: !0,
	background: Gv.ink,
	border: "",
	corners: "rounded"
};
function ny(e) {
	let t = e?.styles?.nameTag;
	return {
		box: t?.box ?? ty.box,
		background: $v(t?.background, Gv, ty.background),
		border: $v(t?.border, Kv, ty.border),
		corners: t?.corners ?? ty.corners
	};
}
//#endregion
//#region ../schema/src/story.ts
var ry = Y({
	type: X([
		"boolean",
		"number",
		"string"
	]),
	default: wg,
	description: q().max(300).optional()
}), iy = Y({
	exits: Fh(yg).default([]),
	reads: Fh(Cg).default([]),
	sets: Fh(Cg).default([]),
	hostEvents: Fh(yg).default([]),
	characters: Fh(yg).default([]),
	assets: Fh(xg).default([])
}), ay = X(["overlay", "full"]), oy = Y({
	description: q().max(200).optional(),
	presentation: ay.optional()
}), sy = Y({
	id: yg,
	meta: Y({
		title: q().min(1).max(120),
		subtitle: q().max(200).optional(),
		location: q().max(120).optional(),
		time: q().max(60).optional(),
		displayTitle: bg.optional(),
		displaySubtitle: bg.optional(),
		start: Bv.optional(),
		backgroundAsset: xg.optional()
	}),
	trigger: oy.optional(),
	when: jg.optional(),
	after: Rh([Y({ scene: yg }), Y({ end: Z(!0) })]).optional(),
	playback: T_.optional(),
	steps: Fh(dv)
}), cy = (e) => e.trigger?.presentation ?? "overlay", ly = Y({
	schemaVersion: Z(1),
	id: yg,
	meta: Y({
		title: q().min(1).max(160),
		episode: J().int().min(0).optional(),
		summary: q().max(1e3).optional(),
		titleKey: bg.optional(),
		summaryKey: bg.optional(),
		authors: Fh(q().max(80)).optional()
	}),
	languages: Y({
		source: Tg,
		available: Fh(Tg).default([])
	}),
	settings: Zv.optional(),
	contract: iy.prefault({}),
	flags: Wh(Cg, ry).default({}),
	scenes: Fh(sy).min(1),
	sequences: Wh(yg, w_).default({}),
	characters: Fh(wv).default([]).refine((e) => new Set(e.map((e) => e.id)).size === e.length, "duplicate character id")
}), uy = [
	{
		id: "win",
		label: "Win"
	},
	{
		id: "lose",
		label: "Lose"
	},
	{
		id: "give_up",
		label: "Give up"
	}
], dy = {
	id: "signal",
	label: "Message game",
	help: "Sends the game a message, such as a ping or a hello. The story carries on at once; the game decides what, if anything, to do with it.",
	params: [{
		key: "signal",
		label: "Message",
		type: "string",
		required: !0,
		slug: !0,
		help: "A short name for the message, in lowercase words joined by hyphens, such as introduce-enemy or hello. A game ignores a message it does not know."
	}],
	oneWay: !0,
	outcomes: [{
		id: "sent",
		label: "Sent"
	}],
	default: "sent",
	card: "Sends the game a message: {signal}"
}, fy = {
	id: "game",
	name: "Any game",
	icon: "i-lucide-gamepad-2",
	help: "A game that answers win or lose. Works with any host that handles the event \"game\".",
	actionKey: "action",
	actionWhenUnset: "play",
	actions: [{
		id: "play",
		label: "Play the game",
		params: [{
			key: "id",
			label: "What to start",
			type: "string",
			help: "An id the game understands: a level, an encounter. Leave it empty for the default."
		}],
		outcomes: uy,
		default: "win",
		resultFlag: "game_result"
	}, dy]
}, py = {
	id: "result",
	label: "Game result",
	help: "How the game ended: win, lose or give up.",
	params: [],
	outcomes: uy,
	default: "win",
	resultFlag: "game_result"
}, my = (e) => uy.every((t) => e.outcomes.some((e) => e.id === t.id));
function hy(e) {
	let t = [...e.actions.some(my) ? [] : [py], ...e.actions.some((e) => e.id === dy.id) ? [] : [dy]], n = [...e.actions, ...t], r = [...n.filter((e) => e.id !== dy.id), ...n.filter((e) => e.id === dy.id)];
	return t.length === 0 && r.every((t, n) => t === e.actions[n]) ? e : {
		...e,
		actionKey: e.actionKey ?? "action",
		actions: r
	};
}
//#endregion
//#region ../../apps/studio/app/handover/games.ts
var gy = [...[{
	id: "turn-tactics-1",
	name: "Turn Tactics",
	icon: "i-lucide-swords",
	help: "A turn-based tactical game. A battle stays alive between these events, so a story can play over it.",
	actionKey: "action",
	actions: [
		{
			id: "start",
			label: "Start battle",
			help: "Creates the battle, pauses it and puts the dialog over it.",
			params: [
				{
					key: "battleId",
					label: "Battle ID",
					type: "number",
					required: !0,
					help: "The battle encounter ID in the game."
				},
				{
					key: "battleMusic",
					label: "Battle music",
					type: "music",
					help: "Plays while the battle runs. Leave it empty and the game uses its own."
				},
				{
					key: "victoryMusic",
					label: "Victory music",
					type: "music",
					help: "Plays from the winning blow until the story continues. Leave it empty and the game uses its own."
				},
				{
					key: "defeatMusic",
					label: "Defeat music",
					type: "music",
					help: "Plays when the player loses. Leave it empty and the game uses its own."
				}
			],
			card: "Tells the game to start the battle[ (battle {battleId})]",
			fixed: { presentation: "overlay" },
			outcomes: [{
				id: "ready",
				label: "Ready"
			}],
			default: "ready",
			resultFlag: "battle_start",
			overlay: "enter"
		},
		{
			id: "ready",
			label: "Battle ready",
			help: "Waits for the battle intro to finish, so the dialog starts after it.",
			params: [],
			after: "start",
			outcomes: [{
				id: "ready",
				label: "Ready"
			}],
			default: "ready",
			card: "Waits for the game: the battle is ready",
			resultFlag: "battle_ready"
		},
		{
			id: "objective",
			label: "Wait for player objective",
			help: "Hides the dialog and lets the player play until the objective is done or failed.",
			params: [{
				key: "objectiveId",
				label: "Objective",
				type: "select",
				required: !0,
				custom: !0,
				slug: !0,
				help: "The game’s name for what the player must do. Pick one it knows, or type your own name if your stage defines one.",
				options: [
					{
						value: "select-character",
						label: "Select a character",
						outcomes: ["completed"]
					},
					{
						value: "move-near-enemy",
						label: "Move close to the enemy",
						outcomes: ["completed", "failed"]
					},
					{
						value: "attack-enemy",
						label: "Attack the enemy",
						outcomes: ["completed", "failed"]
					}
				]
			}],
			after: "start",
			outcomes: [{
				id: "completed",
				label: "Completed"
			}, {
				id: "failed",
				label: "Failed"
			}],
			default: "completed",
			card: "Tells the game to wait for the player[: {objectiveId}]",
			resultFlag: "objective_result"
		},
		{
			id: "signal",
			label: "Message game",
			help: "Sends the game a message, such as a ping or a hello. The story carries on at once; the game decides what, if anything, to do with it.",
			params: [{
				key: "signal",
				label: "Message",
				type: "select",
				required: !0,
				custom: !0,
				slug: !0,
				help: "Pick a message the game knows, or type your own name. A game ignores a message it does not know.",
				options: [{
					value: "introduce-enemy",
					label: "Highlight enemy"
				}, {
					value: "end-introduction",
					label: "Stop highlighting enemy"
				}]
			}],
			after: "start",
			oneWay: !0,
			outcomes: [{
				id: "sent",
				label: "Sent"
			}],
			default: "sent",
			card: "Sends the game a message: {signal}"
		},
		{
			id: "finish",
			label: "Finish battle",
			help: "Lets the battle play out, waits for the player to accept the result, and returns to the full story.",
			params: [],
			after: "start",
			outcomes: uy,
			card: "Tells the game to play the battle out, then continues on win or lose",
			default: "win",
			resultFlag: "battle_result",
			overlay: "leave"
		}
	]
}].map((e) => hy(e)), fy], _y = (e) => gy.find((t) => t.id === e);
//#endregion
//#region ../../apps/studio/app/handover/describe.ts
function vy(e, t) {
	if (!e.actionKey) return e.actions[0];
	let n = t.params?.[e.actionKey] ?? e.actionWhenUnset;
	return e.actions.find((e) => e.id === n);
}
//#endregion
//#region ../../apps/studio/app/handover/span.ts
function yy(e) {
	let t = _y(e.name), n = t ? vy(t, e) : void 0;
	return n?.overlay ? n.overlay === "leave" ? "leave" : (e.params?.presentation ?? n.fixed?.presentation) === "overlay" ? "enter" : null : null;
}
function by(e) {
	let t = /* @__PURE__ */ new Map(), n = "story";
	for (let r of e) {
		if (r.trigger !== void 0) {
			if (r.trigger?.presentation !== "full") for (let e of r.steps) e.hidden || t.set(e.id, "over");
			continue;
		}
		let e = n === "story" ? "story" : "unsure";
		for (let n of r.steps) {
			if (n.hidden || (e !== "story" && t.set(n.id, e), n.type !== "event")) continue;
			let r = yy(n);
			r && (e = n.inRoute ? "unsure" : r === "enter" ? "over" : "story");
		}
		n = e;
	}
	return t;
}
[.../* @__PURE__ */ new Set([
	"line",
	"narration",
	"delay",
	"sequence",
	"hold-end"
])];
function xy(e) {
	if (e.endTime !== void 0) return {
		afterMs: Math.max(0, e.endTime - e.startTime),
		fadeMs: e.fadeOutMs ?? 0
	};
}
function Sy(e, t) {
	switch (t.type) {
		case "sound":
			t.src && e.playSfx(t.src, t.volume ?? 1, xy(t));
			break;
		case "voice":
			t.src && e.playVoice(t.src, {
				volume: t.volume ?? 1,
				duck: t.duckMusic !== !1,
				layer: !0,
				end: xy(t)
			});
			break;
		case "music":
			t.src && e.setMusic(t.src, {
				volume: t.volume ?? 1,
				fadeMs: t.fadeMs ?? 600
			});
			break;
		case "music_stop": e.setMusic(null, { fadeMs: t.fadeMs ?? 1500 });
	}
}
//#endregion
//#region ../schema/src/strings.ts
var Cy = Rh([q(), Y({
	text: q(),
	sourceHash: q().regex(/^[0-9a-f]{8}$/).optional()
})]), wy = Y({
	schemaVersion: Z(1),
	lang: Tg,
	entries: Wh(bg, Cy)
});
function Ty(e) {
	if (e !== void 0) return typeof e == "string" ? e : e.text;
}
var Ey = Y({
	kind: X([
		"background",
		"portrait",
		"object",
		"scene",
		"effect",
		"music",
		"sfx",
		"voice",
		"video"
	]),
	url: q().max(2048).optional(),
	hash: q().max(128).optional(),
	width: J().int().positive().optional(),
	height: J().int().positive().optional(),
	durationMs: kg.optional(),
	bytes: J().int().nonnegative().optional(),
	credit: q().max(500).optional()
}), Dy = Y({
	schemaVersion: Z(1),
	assets: Wh(xg, Ey),
	imageSizes: Wh(q().max(40), J().int().positive()).optional()
});
Object.values({
	image: ".png,.jpg,.jpeg,.webp,image/png,image/jpeg,image/webp",
	audio: ".mp3,.ogg,audio/mpeg,audio/ogg",
	video: ".mp4,.webm,video/mp4,video/webm"
}).join(",");
var Oy = {
	thumbnail: 320,
	dialogPortrait: 560,
	avatar: 320,
	stagePortrait: 1300,
	sequencePicture: 1300,
	background: 1920
};
Y({
	columns: J().int().min(1).max(256),
	rows: J().int().min(1).max(256),
	margin: J().int().min(0).max(4096),
	spacing: J().int().min(0).max(4096),
	firstFrame: J().int().min(0),
	frameCount: J().int().min(1).max(4096),
	fps: J().min(.1).max(120),
	playback: X([
		"loop",
		"once",
		"ping-pong"
	]),
	randomStart: Dh().optional(),
	animated: Dh().optional()
}).superRefine((e, t) => {
	(e.columns * e.rows > 4096 || e.firstFrame + e.frameCount > e.columns * e.rows) && t.addIssue({
		code: "custom",
		message: "Frames must fit inside the sheet."
	});
}), Y({
	width: J().positive().max(1e5),
	height: J().positive().max(1e5).optional()
}), Y({
	opacity: J().min(0).max(1),
	blendMode: X([
		"source-over",
		"multiply",
		"screen",
		"overlay",
		"lighter",
		"darken",
		"lighten",
		"soft-light",
		"hard-light",
		"difference"
	])
});
//#endregion
//#region ../schema/src/workspace.ts
var ky = Y({
	schemaVersion: Z(1),
	flags: Wh(Cg, ry)
});
Y({
	id: yg,
	name: q().min(1).max(80),
	fonts: Y({
		body: q().max(200),
		name: q().max(200).optional()
	}),
	textSpeedCps: J().positive().max(500).default(40),
	fadeMs: J().int().min(0).max(5e3).default(400),
	imageFadeInMs: J().int().min(0).max(5e3).optional(),
	imageFadeOutMs: J().int().min(0).max(5e3).optional(),
	imageEnter: __.optional(),
	imageExit: __.optional(),
	dialogBox: Y({
		anchor: X(["bottom", "top"]).default("bottom"),
		opacity: J().min(0).max(1).default(.85),
		nameplate: Dh().default(!0)
	})
});
//#endregion
//#region ../schema/src/collection.ts
var Ay = Y({
	id: yg,
	story: yg,
	kind: X(["main", "side"]),
	title: q().max(120).optional(),
	unlock: jg.optional(),
	position: Y({
		x: J(),
		y: J()
	}).optional()
});
Y({
	schemaVersion: Z(1),
	id: yg,
	meta: Y({ title: q().min(1).max(160) }),
	nodes: Fh(Ay),
	edges: Fh(Y({
		from: yg,
		to: yg
	})).default([])
}), Y({
	schemaVersion: Z(1),
	story: ly,
	strings: Wh(Tg, wy),
	assets: Dy,
	characters: Fh(wv).default([]),
	registry: ky.optional()
}), Y({
	story: ly,
	strings: Wh(Tg, wy)
});
//#endregion
//#region ../schema/src/validate.ts
function jy(e) {
	return e.resultFlag ?? `${e.id}_result`;
}
function* My(e) {
	for (let t = 0; t < e.scenes.length; t++) {
		let n = e.scenes[t];
		for (let e = 0; e < n.steps.length; e++) yield {
			step: n.steps[e],
			path: `scenes[${t}].steps[${e}]`,
			sceneIndex: t
		};
	}
}
function Ny(e) {
	switch (e.type) {
		case "narration":
		case "line": return [e.text];
		case "choice": return [...e.prompt ? [e.prompt] : [], ...e.options.map((e) => e.text)];
		case "sequence": return e.skipPromptKey ? [e.skipPromptKey] : [];
		default: return [];
	}
}
function Py(e) {
	let t = [], n = [];
	e.type === "line" && t.push(e.speaker), (e.type === "line" || e.type === "narration") && e.voice && n.push(e.voice);
	for (let r of e.stage ?? []) (r.op === "enter" || r.op === "exit" || r.op === "expr") && t.push(r.who), (r.op === "bg" || r.op === "sfx" || r.op === "show") && n.push(r.asset), r.op === "music" && r.asset && n.push(r.asset);
	return {
		who: t,
		assets: n
	};
}
function Fy(e) {
	let t = [];
	if (e.when && t.push(e.when), e.type === "fork") for (let n of e.routes) n.when && t.push(n.when);
	if (e.type === "choice") for (let n of e.options) n.when && t.push(n.when);
	return t;
}
function Iy(e) {
	let t = [];
	if (e.type === "set") for (let n of e.set) t.push(n.flag);
	if (e.type === "choice") for (let n of e.options) for (let e of n.set ?? []) t.push(e.flag);
	return e.type === "event" && t.push(jy(e)), t;
}
var Ly = (e) => [...new Set(e)].sort();
function Ry(e) {
	let t = /* @__PURE__ */ new Set();
	for (let n of e.scenes) n.when && Ng(n.when, t);
	let n = [];
	for (let { step: r } of My(e)) {
		for (let e of Fy(r)) Ng(e, t);
		r.type === "event" && n.push(r);
	}
	return n.filter((e) => e.outcomes.length > 1 && t.has(jy(e))).map((e) => e.id);
}
function zy(e) {
	let t = new Set(Object.keys(e.flags)), n = /* @__PURE__ */ new Set(), r = /* @__PURE__ */ new Set(), i = /* @__PURE__ */ new Set(), a = /* @__PURE__ */ new Set(), o = /* @__PURE__ */ new Set(), s = /* @__PURE__ */ new Set(), c = /* @__PURE__ */ new Set();
	for (let { step: t } of My(e)) t.type === "event" && (o.add(t.name), t.resultFlag || n.add(jy(t)));
	let l = (e) => !t.has(e) && !n.has(e);
	for (let t of e.scenes) if (t.when) for (let e of Ng(t.when)) l(e) && r.add(e);
	for (let { step: t } of My(e)) {
		for (let e of Fy(t)) for (let t of Ng(e)) l(t) && r.add(t);
		for (let e of Iy(t)) l(e) && i.add(e);
		t.type === "end" && t.exit !== "done" && a.add(t.exit);
		let e = Py(t);
		e.who.forEach((e) => s.add(e)), e.assets.forEach((e) => c.add(e));
	}
	for (let t of Object.values(e.sequences)) for (let e of t.items) "src" in e && e.src && c.add(e.src);
	for (let t of e.scenes) t.meta.backgroundAsset && c.add(t.meta.backgroundAsset);
	return {
		exits: Ly(a),
		reads: Ly(r),
		sets: Ly(i),
		hostEvents: Ly(o),
		characters: Ly(s),
		assets: Ly(c)
	};
}
var By = /* @__PURE__ */ new Set([
	"bg",
	"music",
	"enter",
	"exit",
	"expr",
	"show",
	"hide",
	"tone",
	"dim",
	"backdrop",
	"light",
	"clear"
]);
function Vy(e, t = {}) {
	let n = [], r = (e, t, r, i) => n.push({
		level: e,
		code: t,
		message: r,
		path: i
	}), i = (e, t, n) => r("error", e, t, n), a = (e, t, n) => r("warning", e, t, n), o = /* @__PURE__ */ new Set();
	e.scenes.forEach((e, t) => {
		o.has(e.id) && i("duplicate-id", `Scene id "${e.id}" is used more than once.`, `scenes[${t}]`), o.add(e.id);
	});
	let s = /* @__PURE__ */ new Set(), c = /* @__PURE__ */ new Set();
	for (let { step: t, path: n } of My(e)) s.has(t.id) && i("duplicate-id", `Step id "${t.id}" is used more than once.`, n), s.add(t.id), t.type === "mark" && c.add(t.id);
	e.scenes.forEach((e, t) => {
		let n = /* @__PURE__ */ new Set();
		e.steps.forEach((e, r) => {
			if (e.type !== "mark") return;
			let i = e.label.trim().toLowerCase();
			i && n.has(i) && a("duplicate-mark-label", `Two loop points in this scene are called "${e.label}".`, `scenes[${t}].steps[${r}]`), n.add(i);
		});
	}), e.scenes.forEach((e, t) => {
		let n = /* @__PURE__ */ new Map();
		e.steps.forEach((e, r) => {
			if (e.type === "fork") for (let a of e.routes) n.has(a.id) ? i("duplicate-id", `Route id "${a.id}" is used more than once in the scene.`, `scenes[${t}].steps[${r}]`) : n.set(a.id, r);
		}), e.steps.forEach((e, r) => {
			if (!e.inRoute) return;
			let a = n.get(e.inRoute), o = `scenes[${t}].steps[${r}]`;
			a === void 0 ? i("unknown-route", `Step "${e.id}" is in route "${e.inRoute}", which no fork has.`, o) : a >= r && i("route-before-fork", `Step "${e.id}" comes before the fork of its route.`, o);
		});
	});
	let l = new Set(Object.keys(e.flags)), u = /* @__PURE__ */ new Set();
	for (let { step: t } of My(e)) t.type === "event" && !t.resultFlag && u.add(jy(t));
	let d = new Set(Object.keys(t.registry?.flags ?? {})), f = /* @__PURE__ */ new Set([...e.contract.reads, ...e.contract.sets]), p = (e) => l.has(e) || u.has(e) || d.has(e) || f.has(e);
	for (let e of l) d.has(e) && i("flag-shadows-shared", `Local flag "${e}" has the same name as a shared flag in the workspace.`, `flags.${e}`);
	let m = t.characters || e.characters.length > 0 ? new Map(Ev(t.characters ?? [], e.characters).map((e) => [e.id, e])) : void 0, h = /* @__PURE__ */ new Set(), g = /* @__PURE__ */ new Set(), _ = (t, n, r) => {
		p(t) ? d.has(t) && !l.has(t) && !u.has(t) && ((n === "read" ? e.contract.reads : e.contract.sets).includes(t) || a(n === "read" ? "contract-reads-missing" : "contract-sets-missing", `Shared flag "${t}" is ${n === "read" ? "read" : "set"} but not listed in the contract.`, r)) : i("unknown-flag", `Flag "${t}" is not declared in the story, the workspace registry or the contract.`, r);
	};
	for (let t of [e.meta.titleKey, e.meta.summaryKey]) t && g.add(t);
	for (let t of e.scenes) for (let e of [t.meta.displayTitle, t.meta.displaySubtitle]) e && g.add(e);
	let v = /* @__PURE__ */ new Set(["done", ...e.contract.exits]), y = /* @__PURE__ */ new Map(), b = /* @__PURE__ */ new Set();
	for (let { step: t, path: n } of My(e)) t.type === "sequence" && t.hold && y.set(t.id, n), t.type === "hold-end" && (y.has(t.start) ? b.add(t.start) : a("hold-end-without-start", `This end step has no held sequence before it (step "${t.start}").`, `${n}.start`));
	for (let [e, t] of y) b.has(e) || a("hold-never-ends", "This held sequence is never ended, so it stays to the end.", t);
	let x = /* @__PURE__ */ new Map();
	for (let { step: t } of My(e)) x.set(t.id, t.hidden === !0);
	for (let { step: t, path: n } of My(e)) t.type === "hold-end" && y.has(t.start) && x.get(t.start) !== (t.hidden === !0) && a("hold-half-hidden", "A held sequence and its end step must both be hidden or both shown.", n);
	for (let [t, n] of e.scenes.entries()) {
		let e = [];
		for (let [r, i] of n.steps.entries()) {
			let n = `scenes[${t}].steps[${r}]`;
			if (i.type === "autoplay-start" && e.push(i), i.type === "autoplay-end") {
				let t = e.at(-1);
				!t || t.id !== i.start ? a("autoplay-unpaired", "Autoplay end must follow its matching start in the same scene, without crossing another block.", n) : (e.pop(), !!t.hidden != !!i.hidden && a("autoplay-half-hidden", "Autoplay start and end must be hidden or shown together.", n), t.inRoute !== i.inRoute && a("autoplay-route", "Autoplay start and end must belong to the same route.", n));
			}
		}
		for (let r of e) a("autoplay-never-ends", "Autoplay start needs a matching end in this scene.", `scenes[${t}].steps[${n.steps.indexOf(r)}]`);
	}
	let S = [...My(e)].filter(({ step: e }) => e.hidden === !0 && (e.stage ?? []).some((e) => By.has(e.op)));
	S.length > 0 && a("hidden-sets-stage", S.length === 1 ? "A hidden step sets up the stage, so the steps after it see a different stage." : `${S.length} hidden steps set up the stage, so the steps after them see a different stage.`, S[0].path);
	let C = null, w = "";
	for (let { step: t, path: n } of My(e)) {
		if (w = n, t.type === "transition" && !t.when) {
			let e = t.mode ?? "through";
			e === "out" ? C = n : (e === "in" && C === null && a("fade-in-without-out", "This fade in has no fade out before it, so it does nothing.", n), C = null);
		}
		t.type === "end" && C !== null && (a("ends-faded-out", "The story ends while the screen is still faded out.", n), C = null);
	}
	C !== null && a("ends-faded-out", "The story ends while the screen is still faded out.", w);
	let T = new Set(e.scenes.filter((e) => e.trigger).map((e) => e.id));
	e.scenes.forEach((e, t) => {
		if (!e.trigger) return;
		let n = new Set(e.steps.filter((e) => e.type === "mark").map((e) => e.id));
		e.steps.forEach((e, r) => {
			let a = `scenes[${t}].steps[${r}]`;
			e.type === "end" && i("end-in-triggered", "A scene the game starts has no Ending: it ends when it runs out of steps, or at a Leave scene step.", a), e.type === "event" && i("event-in-triggered", "A scene the game starts cannot hand over to the game: it has no game events.", a), e.type === "goto" && (e.scene !== void 0 || e.mark !== void 0 && !n.has(e.mark)) && i("goto-out-of-triggered", "A Go to step in a scene the game starts can only go to a loop point of the same scene.", a);
		});
	}), e.scenes.forEach((e, t) => {
		if (e.trigger && e.after && i("triggered-after", "A scene the game starts has no \"after\": it ends when it runs out of steps.", `scenes[${t}].after`), e.after && "scene" in e.after && T.has(e.after.scene) && i("into-triggered", `The scene "${e.after.scene}" is started by the game, so no scene can continue with it.`, `scenes[${t}].after`), e.after && "scene" in e.after && !o.has(e.after.scene) && a("unknown-scene", `The scene "${e.after.scene}" that this scene continues with does not exist.`, `scenes[${t}].after`), e.when) {
			for (let n of Ng(e.when)) _(n, "read", `scenes[${t}].when`);
			Pg(e.when) && a("completed-in-story", "\"completed\" conditions only work in collections, not inside a story.", `scenes[${t}].when`);
		}
	});
	let E = /* @__PURE__ */ new Map();
	for (let { step: t, path: n } of My(e)) t.type === "event" && E.set(jy(t), {
		outcomes: t.outcomes,
		path: n
	});
	let ee = /* @__PURE__ */ new Set(), D = (e, t) => {
		if ("flag" in e) {
			let n = E.get(e.flag);
			if (!n) return;
			ee.add(e.flag);
			let r = "is" in e ? e.is : "isNot" in e ? e.isNot : void 0;
			typeof r == "string" && !n.outcomes.includes(r) && a("unknown-outcome", `"${e.flag}" is never "${r}": the event reports ${n.outcomes.map((e) => `"${e}"`).join(", ")}.`, t);
		} else "and" in e ? e.and.forEach((e) => D(e, t)) : "or" in e ? e.or.forEach((e) => D(e, t)) : "not" in e && D(e.not, t);
	};
	e.scenes.forEach((e, t) => {
		e.when && D(e.when, `scenes[${t}].when`);
	});
	for (let { step: t, path: n } of My(e)) for (let e of Fy(t)) D(e, `${n}.when`);
	for (let [e, { outcomes: t, path: n }] of E) t.length > 1 && !ee.has(e) && a("event-result-unused", "Nothing in the story reads the result of this event, so every outcome plays the same.", n);
	for (let { step: n, path: r } of My(e)) {
		n.type === "goto" && (n.scene !== void 0 && n.mark !== void 0 ? i("goto-target", "A Go to step has a scene or a loop point, not both.", r) : n.scene === void 0 && n.mark === void 0 ? a("goto-target", "This Go to step has nowhere to go.", r) : n.scene !== void 0 && !o.has(n.scene) ? a("unknown-scene", `The scene "${n.scene}" this step goes to does not exist.`, r) : n.scene !== void 0 && T.has(n.scene) ? i("into-triggered", `The scene "${n.scene}" is started by the game, so a Go to step cannot go to it.`, r) : n.mark !== void 0 && !c.has(n.mark) && a("unknown-mark", "The loop point this step goes back to does not exist.", r)), n.type === "leave" && n.from === "fork" && !n.inRoute && a("leave-fork-outside", "Leave fork does nothing outside a fork route.", r);
		for (let e of Fy(n)) {
			for (let t of Ng(e)) _(t, "read", `${r}.when`);
			Pg(e) && a("completed-in-story", "\"completed\" conditions only work in collections, not inside a story.", `${r}.when`);
		}
		for (let e of Iy(n)) _(e, "set", r);
		if (n.type === "sequence" && (h.add(n.ref), n.ref in e.sequences || i("unknown-sequence", `Sequence "${n.ref}" is not defined.`, `${r}.ref`)), n.type === "event" && (n.outcomes.includes(n.default) || i("bad-default-outcome", `Default outcome "${n.default}" is not one of the outcomes.`, `${r}.default`), new Set(n.outcomes).size !== n.outcomes.length && i("duplicate-outcome", "Outcomes must be unique.", `${r}.outcomes`)), n.type === "choice") {
			let e = /* @__PURE__ */ new Set();
			n.options.forEach((t, n) => {
				e.has(t.id) && i("duplicate-id", `Option id "${t.id}" is used more than once.`, `${r}.options[${n}]`), e.add(t.id);
			});
		}
		n.type === "end" && !v.has(n.exit) && i("unknown-exit", `Exit "${n.exit}" is not "done" or listed in the contract.`, `${r}.exit`);
		for (let e of Ny(n)) g.add(e), t.strings && !(e in t.strings.entries) && i("missing-string", `String "${e}" is missing from the ${t.strings.lang} table.`, r);
		let s = Py(n);
		if (m && !n.hidden) {
			for (let e of s.who) m.has(e) || i("unknown-character", `Character "${e}" is neither in the workspace nor in the story.`, r);
			let e = [];
			n.type === "line" && e.push([n.speaker, n.expr]);
			for (let t of n.stage ?? []) (t.op === "enter" || t.op === "expr") && e.push([t.who, t.expr]);
			let t = [];
			n.type === "line" && (n.portrait?.picture === "temporary" || n.portrait?.picture === "stage") && t.push([n.speaker, n.expr]);
			for (let e of n.stage ?? []) e.op === "enter" && t.push([e.who, e.expr]);
			for (let [e, n] of t) {
				let t = m.get(e);
				t && !Mv(t, n) && a("no-stage-picture", `Character "${e}" has no stage picture${n ? ` for "${n}"` : ""}, so a placeholder is drawn.`, r);
			}
			for (let [t, n] of e) {
				let e = m.get(t), i = e ? Dv(e) : [];
				e && n && i.length > 0 && !i.includes(n) && a("unknown-expression", `Character "${t}" has no expression "${n}".`, r);
			}
		}
		if (t.assets && !n.hidden) for (let e of s.assets) e in t.assets.assets || a("unresolved-asset", `Asset "${e}" is not in the asset manifest (placeholder).`, r);
	}
	t.assets && e.scenes.forEach((e, n) => {
		let r = e.meta.backgroundAsset;
		r && !(r in t.assets.assets) && a("unresolved-asset", `Asset "${r}" is not in the asset manifest (placeholder).`, `scenes[${n}].meta.backgroundAsset`);
	});
	for (let [n, r] of Object.entries(e.sequences)) h.has(n) || a("unused-sequence", `Sequence "${n}" is never played.`, `sequences.${n}`), r.items.forEach((e, r) => {
		let o = `sequences.${n}.items[${r}]`;
		if (e.type === "text" && (g.add(e.textKey), t.strings && !(e.textKey in t.strings.entries) && i("missing-string", `String "${e.textKey}" is missing from the ${t.strings.lang} table.`, o)), (e.type === "image" || e.type === "text" || e.type === "video" || e.type === "color") && e.endTime !== void 0 && e.endTime <= e.startTime && i("bad-timing", "endTime must be after startTime.", o), "animation" in e && e.animation) {
			let t = "endTime" in e && e.endTime !== void 0 ? e.endTime - e.startTime : void 0;
			for (let [n, r] of Object.entries(e.animation)) {
				let e = r.map((e) => e.t);
				e.every((t, n) => n === 0 || t > e[n - 1]) || i("bad-keyframes", `Keyframes of "${n}" must be in time order, one per time.`, `${o}.animation.${n}`), t !== void 0 && e.some((e) => e > t) && a("keyframe-after-end", `A keyframe of "${n}" is after the item ends and is never reached.`, `${o}.animation.${n}`);
			}
		}
		"src" in e && e.src === "" && a("placeholder-asset", "Item has no asset linked yet.", o), "src" in e && e.src && t.assets && !(e.src in t.assets.assets) && a("unresolved-asset", `Asset "${e.src}" is not in the asset manifest (placeholder).`, o);
	});
	if (t.strings) for (let e of Object.keys(t.strings.entries)) g.has(e) || a("unused-string", `String "${e}" is not used by any step.`, `strings.${e}`);
	let te = zy(e), ne = (e, t) => t.filter((t) => !e.includes(t));
	for (let [t, n] of [["hostEvents", "contract-host-events-missing"], ["characters", "contract-characters-missing"]]) {
		let r = ne(e.contract[t], te[t]);
		r.length && a(n, `Contract.${t} is missing: ${r.join(", ")}.`, `contract.${t}`);
	}
	return n;
}
var Hy = (e) => e.some((e) => e.level === "error"), Uy = (e) => e === "zh" ? "zh-Hans" : e, Wy = (e, t) => Uy(e) === Uy(t), Gy = (e) => `vns.lang.${e}`;
function Ky(e) {
	let t = e.toLowerCase();
	return t === "zh" || /^zh-(cn|sg|hans)/.test(t) ? "zh-Hans" : t.startsWith("zh") ? "zh-Hant" : t.split("-")[0] ?? t;
}
function qy(e, t, n) {
	let r = [.../* @__PURE__ */ new Set([e.source, ...e.available])], i = (e) => r.find((t) => Wy(t, e));
	if (t) {
		let e = i(t);
		if (e) return e;
	}
	for (let e of n) {
		let t = i(Ky(e));
		if (t) return t;
	}
	return e.source;
}
function Jy(e) {
	let t = Uy(e);
	if (t === "zh-Hans") return "zh";
	if (t.split("-")[0] === "en") return "en";
}
function Yy(e) {
	return /^zh(-(hans|cn|sg))?$/i.test(e) ? "中文" : new Intl.DisplayNames([e], { type: "language" }).of(e) ?? e;
}
function Xy(e) {
	return /\p{Script=Latin}/u.test(Yy(e)) ? e.split("-")[0].toUpperCase() : Yy(e);
}
function Zy(e) {
	let t = Xy(e);
	return /\p{Script=Latin}/u.test(t) ? t : Array.from(t)[0] ?? t;
}
//#endregion
//#region ../../apps/studio/app/composables/usePlayerI18n.ts
var Qy = Symbol("playerLang"), $y = Symbol("playerWords");
function eb(e) {
	let t = In($y, null);
	if (t) {
		let n = e ?? In(Qy, null);
		return {
			t: (e, r = {}) => t.t(e, r, n?.value),
			ready: t.ready,
			locale: /* @__PURE__ */ F(n?.value ?? "en")
		};
	}
	let n = useI18n(), r = e ?? In(Qy, null), { $i18n: i } = useNuxtApp(), a = W(() => r ? Jy(r.value) : void 0), o = /* @__PURE__ */ F(0);
	Bn(a, async (e) => {
		e && e !== n.locale.value && (await i.loadLocaleMessages(e), o.value++);
	}, { immediate: !0 });
	let s = W(() => {
		o.value;
		let e = a.value;
		return !e || e === n.locale.value || n.availableLocales.includes(e);
	});
	function c(e, t = {}) {
		if (o.value, !s.value) return "";
		let r = a.value;
		return r ? n.t(e, t, { locale: r }) : n.t(e, t);
	}
	return {
		t: c,
		ready: s,
		locale: n.locale
	};
}
//#endregion
//#region ../../apps/studio/app/components/player/Flags.vue?vue&type=script&setup=true&lang.ts
var tb = { class: "text-muted" }, nb = { class: "text-highlighted" }, rb = /* @__PURE__ */ sr({
	__name: "Flags",
	props: /*@__PURE__*/ Wr({ flags: { type: Object } }, {
		open: {
			type: Boolean,
			required: !0
		},
		openModifiers: {}
	}),
	emits: ["update:open"],
	setup(e) {
		let t = ui(e, "open"), n = lr("bodyRoot");
		Ts(n, () => {
			t.value = !1;
		});
		let { t: r } = eb();
		return (i, a) => {
			let o = vs;
			return R(), B(o, {
				open: t.value,
				"onUpdate:open": a[0] ||= (e) => t.value = e,
				title: I(r)("player.flags"),
				description: I(r)("player.flagsHint")
			}, {
				body: Nn(() => [V("dl", {
					ref_key: "bodyRoot",
					ref: n,
					class: "grid grid-cols-[auto_1fr] gap-x-6 gap-y-1 font-mono text-sm"
				}, [(R(!0), z(L, null, Nr(e.flags, (e, t) => (R(), z(L, { key: t }, [V("dt", tb, P(t), 1), V("dd", nb, P(String(e)), 1)], 64))), 128))], 512)]),
				_: 1
			}, 8, [
				"open",
				"title",
				"description"
			]);
		};
	}
}), ib = {
	check: "<path fill=\"none\" stroke=\"currentColor\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"2\" d=\"M20 6L9 17l-5-5\"/>",
	clapperboard: "<path fill=\"none\" stroke=\"currentColor\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"2\" d=\"m12.296 3.464l3.02 3.956M20.2 6L3 11l-.9-2.4c-.3-1.1.3-2.2 1.3-2.5l13.5-4c1.1-.3 2.2.3 2.5 1.3zM3 11h18v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2zm3.18-5.724l3.1 3.899\"/>",
	"copy-plus": "<g fill=\"none\" stroke=\"currentColor\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"2\"><path d=\"M15 12v6m-3-3h6\"/><rect width=\"14\" height=\"14\" x=\"8\" y=\"8\" rx=\"2\" ry=\"2\"/><path d=\"M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2\"/></g>",
	flag: "<path fill=\"none\" stroke=\"currentColor\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"2\" d=\"M4 22V4a1 1 0 0 1 .4-.8A6 6 0 0 1 8 2c3 0 5 2 7.333 2q2 0 3.067-.8A1 1 0 0 1 20 4v10a1 1 0 0 1-.4.8A6 6 0 0 1 16 16c-3 0-5-2-8-2a6 6 0 0 0-4 1.528\"/>",
	"git-branch": "<g fill=\"none\" stroke=\"currentColor\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"2\"><path d=\"M15 6a9 9 0 0 0-9 9V3\"/><circle cx=\"18\" cy=\"6\" r=\"3\"/><circle cx=\"6\" cy=\"18\" r=\"3\"/></g>",
	house: "<g fill=\"none\" stroke=\"currentColor\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"2\"><path d=\"M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8\"/><path d=\"M3 10a2 2 0 0 1 .709-1.528l7-6a2 2 0 0 1 2.582 0l7 6A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z\"/></g>",
	image: "<g fill=\"none\" stroke=\"currentColor\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"2\"><rect width=\"18\" height=\"18\" x=\"3\" y=\"3\" rx=\"2\" ry=\"2\"/><circle cx=\"9\" cy=\"9\" r=\"2\"/><path d=\"m21 15l-3.086-3.086a2 2 0 0 0-2.828 0L6 21\"/></g>",
	maximize: "<path fill=\"none\" stroke=\"currentColor\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"2\" d=\"M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3M3 16v3a2 2 0 0 0 2 2h3m8 0h3a2 2 0 0 0 2-2v-3\"/>",
	"message-circle": "<path fill=\"none\" stroke=\"currentColor\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"2\" d=\"M2.992 16.342a2 2 0 0 1 .094 1.167l-1.065 3.29a1 1 0 0 0 1.236 1.168l3.413-.998a2 2 0 0 1 1.099.092a10 10 0 1 0-4.777-4.719\"/>",
	minimize: "<path fill=\"none\" stroke=\"currentColor\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"2\" d=\"M8 3v3a2 2 0 0 1-2 2H3m18 0h-3a2 2 0 0 1-2-2V3M3 16h3a2 2 0 0 1 2 2v3m8 0v-3a2 2 0 0 1 2-2h3\"/>",
	pause: "<g fill=\"none\" stroke=\"currentColor\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"2\"><rect width=\"5\" height=\"18\" x=\"14\" y=\"3\" rx=\"1\"/><rect width=\"5\" height=\"18\" x=\"5\" y=\"3\" rx=\"1\"/></g>",
	play: "<path fill=\"none\" stroke=\"currentColor\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"2\" d=\"M5 5a2 2 0 0 1 3.008-1.728l11.997 6.998a2 2 0 0 1 .003 3.458l-12 7A2 2 0 0 1 5 19z\"/>",
	save: "<g fill=\"none\" stroke=\"currentColor\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"2\"><path d=\"M15.2 3a2 2 0 0 1 1.4.6l3.8 3.8a2 2 0 0 1 .6 1.4V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z\"/><path d=\"M17 21v-7a1 1 0 0 0-1-1H8a1 1 0 0 0-1 1v7M7 3v4a1 1 0 0 0 1 1h7\"/></g>",
	"scroll-text": "<g fill=\"none\" stroke=\"currentColor\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"2\"><path d=\"M15 12h-5m5-4h-5m9 9V5a2 2 0 0 0-2-2H4\"/><path d=\"M8 21h12a2 2 0 0 0 2-2v-1a1 1 0 0 0-1-1H11a1 1 0 0 0-1 1v1a2 2 0 1 1-4 0V5a2 2 0 1 0-4 0v2a1 1 0 0 0 1 1h3\"/></g>",
	"volume-2": "<path fill=\"none\" stroke=\"currentColor\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"2\" d=\"M11 4.702a.705.705 0 0 0-1.203-.498L6.413 7.587A1.4 1.4 0 0 1 5.416 8H3a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2.416a1.4 1.4 0 0 1 .997.413l3.383 3.384A.705.705 0 0 0 11 19.298zM16 9a5 5 0 0 1 0 6m3.364 3.364a9 9 0 0 0 0-12.728\"/>",
	"volume-x": "<path fill=\"none\" stroke=\"currentColor\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"2\" d=\"M11 4.702a.7.7 0 0 0-1.203-.498L6.413 7.587A1.4 1.4 0 0 1 5.416 8H3a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2.416a1.4 1.4 0 0 1 .997.413l3.383 3.384A.7.7 0 0 0 11 19.298zm5.5 9.798l5-5m-5 0l5 5\"/>"
}, ab = ["viewBox", "innerHTML"], ob = /* @__PURE__ */ sr({
	__name: "UIcon",
	props: { name: { type: String } },
	setup(e) {
		let t = e, n = W(() => ib[t.name.replace(/^i-lucide-/, "")] ?? "");
		return (e, t) => (R(), z("svg", {
			class: "vn-ui-icon",
			viewBox: `0 0 ${I(24)} ${I(24)}`,
			width: "1em",
			height: "1em",
			"aria-hidden": "true",
			innerHTML: n.value
		}, null, 8, ab));
	}
}), sb = [
	"data-variant",
	"data-color",
	"data-size",
	"data-icon-only"
], cb = /* @__PURE__ */ sr({
	__name: "UButton",
	props: {
		icon: { type: String },
		label: { type: String },
		color: { type: String },
		variant: { type: String },
		size: { type: String },
		square: { type: Boolean }
	},
	setup(e) {
		let t = Br();
		return (n, r) => {
			let i = ob;
			return R(), z("button", {
				type: "button",
				class: "vn-ui-button",
				"data-variant": e.variant,
				"data-color": e.color,
				"data-size": e.size,
				"data-icon-only": e.icon && !e.label && !I(t).default ? "" : void 0
			}, [e.icon ? (R(), B(i, {
				key: 0,
				name: e.icon
			}, null, 8, ["name"])) : U("", !0), Pr(n.$slots, "default", {}, () => [ga(P(e.label), 1)])], 8, sb);
		};
	}
});
//#endregion
//#region ../engine/src/conditions.ts
function lb(e, t) {
	if ("flag" in e) {
		let n = t.getFlag(e.flag);
		return "is" in e ? n !== void 0 && n === e.is : "isNot" in e ? n === void 0 || n !== e.isNot : typeof n == "number" ? "gt" in e ? n > e.gt : "gte" in e ? n >= e.gte : "lt" in e ? n < e.lt : n <= e.lte : !1;
	}
	return "completed" in e ? t.isCompleted?.(e.completed) ?? !1 : "and" in e ? e.and.every((e) => lb(e, t)) : "or" in e ? e.or.some((e) => lb(e, t)) : !lb(e.not, t);
}
function ub(e, t) {
	return "to" in t ? t.to : (typeof e == "number" ? e : 0) + t.add;
}
function db(e, t) {
	let n = {};
	for (let [e, r] of Object.entries(t?.flags ?? {})) n[e] = r.default;
	for (let [t, r] of Object.entries(e.flags)) n[t] = r.default;
	return n;
}
//#endregion
//#region ../engine/src/scenes.ts
function fb(e, t, n, r, i, a = 0, o = !1) {
	return {
		id: e,
		type: "transition",
		mode: t,
		color: "#000000",
		affects: o ? ["picture", "dialog"] : ["picture"],
		outMs: n,
		holdMs: a,
		inMs: r,
		skippable: !1,
		...i ? { stage: i } : {}
	};
}
function pb(e) {
	let t = e.settings?.sceneFadeOutMs ?? 500, n = e.settings?.sceneFadeInMs ?? 500, r = e.settings?.sceneGapMs ?? 1500, i = e.settings?.sceneTitleMs ?? 3500, a = e.settings?.sceneTitleGapMs ?? 1e3, o = e.scenes.filter((e) => !e.trigger), s = [...o, ...e.scenes.filter((e) => e.trigger)], c = new Set(e.scenes.filter((e) => e.trigger).map((e) => e.id)), l = [], u = /* @__PURE__ */ new Map(), d = /* @__PURE__ */ new Map();
	s.forEach((o, s) => {
		let f = [], p = c.has(o.id), m = p ? 0 : t, h = p ? 0 : n, g = p ? 0 : r, _ = p ? 0 : i, v = p ? "quiet" : o.meta.start ?? e.settings?.sceneStart ?? "title";
		o.steps.forEach((e, t) => {
			e.type === "leave" && u.set(e.id, _v(o.steps, t)), e.type === "goto" && e.scene !== void 0 && e.mark === void 0 && u.set(e.id, { scene: e.scene }), e.type === "goto" && e.mark !== void 0 && e.scene === void 0 && u.set(e.id, { mark: e.mark });
		});
		let y = s > 0 ? g : 0, b = p && cy(o) === "overlay" ? void 0 : o.meta.backgroundAsset, x = b ? [{
			op: "bg",
			asset: b
		}] : [], S = (s > 0 ? m > 0 || h > 0 || y > 0 : h > 0) || x.length > 0, C = fv(o.steps);
		hv(o.steps).forEach((e, t) => {
			let n = t === 0, r = pv(o.steps[t], C).map(({ fork: e, route: t }) => {
				let n = [e.when, t.when].filter((e) => e !== void 0);
				return {
					fork: e.id,
					route: t.id,
					...n.length > 0 ? { when: n.length === 1 ? n[0] : { and: n } } : {}
				};
			}), i = o.steps[t].when, a = r.length > 0 ? {
				chain: r,
				...i ? { own: i } : {}
			} : {};
			if (n && S && e.type !== "transition") {
				let t = !e.hidden && !e.when, { stage: n, ...r } = e, i = [...x, ...t ? n ?? [] : []];
				f.push({
					sceneId: o.id,
					sceneStart: !1,
					step: fb(`scene-in:${o.id}`, "through", 0, h, i.length > 0 ? i : void 0, y)
				}), f.push({
					sceneId: o.id,
					sceneStart: !0,
					step: t ? r : e,
					...a
				});
			} else {
				let t = n && e.type === "transition" && x.length > 0 ? {
					...e,
					stage: [...x, ...e.stage ?? []]
				} : e;
				f.push({
					sceneId: o.id,
					sceneStart: n,
					step: t,
					...a
				});
			}
		});
		let w = o.meta, T = f.findIndex((e) => e.sceneStart);
		if (_ > 0 && v === "title" && (w.title?.trim() || w.displayTitle) && T >= 0) {
			let e = f[T], t = e.step.type === "transition" ? T + 1 : T;
			f[T] = {
				...e,
				sceneStart: !1
			}, f.splice(t, 0, {
				sceneId: o.id,
				sceneStart: !1,
				title: _,
				step: {
					id: `scene-title:${o.id}`,
					type: "delay",
					ms: _,
					skippable: !0
				}
			}), a > 0 && f.splice(t + 1, 0, {
				sceneId: o.id,
				sceneStart: !1,
				step: {
					id: `scene-title-tail:${o.id}`,
					type: "delay",
					ms: a,
					skippable: !0
				}
			});
		}
		if (m > 0) {
			let e = (e) => {
				for (let t = e - 1; t >= 0; t--) if (!f[t].step.hidden) return t;
				return -1;
			}, t = f.length, n = e(f.length);
			n >= 0 && f[n].step.type === "end" && (t = n, n = e(n));
			let r = f[n]?.step;
			if (r && r.type !== "transition") {
				let e = r.type === "sequence" && r.blocking && !r.hold ? r : null;
				e && (f[n] = {
					...f[n],
					step: {
						...e,
						hold: !0
					}
				});
				let i = n;
				for (; i > 0 && (f[i].step.hidden || f[i].step.type === "set");) i--;
				let a = ["line", "narration"].includes(f[i]?.step.type ?? ""), s = [{
					sceneId: o.id,
					sceneStart: !1,
					step: fb(`scene-out:${o.id}`, "out", m, 0, void 0, 0, a)
				}];
				e && s.push({
					sceneId: o.id,
					sceneStart: !1,
					step: {
						id: `scene-hold-end:${o.id}`,
						type: "hold-end",
						start: e.id,
						ending: "cut",
						fadeMs: 0
					}
				}), f.splice(t, 0, ...s), d.set(o.id, s[0].step.id);
			}
		}
		if (o.after && !p) {
			let e = `scene-after:${o.id}`;
			f.push({
				sceneId: o.id,
				sceneStart: !1,
				step: {
					id: e,
					type: "leave",
					from: "scene"
				}
			}), u.set(e, "end" in o.after ? "end" : { scene: o.after.scene });
		}
		v === "quiet" && (f = f.map((e) => e.sceneStart ? {
			...e,
			quiet: !0
		} : e)), v === "corner" && (f = f.map((e) => e.sceneStart ? {
			...e,
			corner: !0
		} : e));
		let E = o.when;
		E && (f = f.map((e) => ({
			...e,
			step: {
				...e.step,
				when: e.step.when ? { and: [E, e.step.when] } : E
			},
			...e.chain ? { own: e.own ? { and: [E, e.own] } : E } : {}
		}))), l.push(...f);
	});
	let f = /* @__PURE__ */ new Map();
	for (let e of l) f.has(e.sceneId) || f.set(e.sceneId, e.step.id);
	let p = o.map((e) => e.id), m = new Set(l.map((e) => e.step.id));
	return l.map((e) => {
		if (e.step.type !== "leave" && e.step.type !== "goto" || !u.has(e.step.id)) return e;
		let t = u.get(e.step.id);
		if (t === void 0) return e;
		if (t === "end") return {
			...e,
			jump: null
		};
		if (typeof t == "object" && "mark" in t) return m.has(t.mark) ? {
			...e,
			jump: t.mark
		} : e;
		if (typeof t == "object") {
			let n = f.get(t.scene);
			return n === void 0 ? e : {
				...e,
				jump: n
			};
		}
		if (t !== "scene") return {
			...e,
			jump: t
		};
		if (c.has(e.sceneId)) return {
			...e,
			jump: null
		};
		let n = d.get(e.sceneId);
		if (n) return {
			...e,
			jump: n
		};
		for (let t = p.indexOf(e.sceneId) + 1; t < p.length; t++) {
			let n = f.get(p[t]);
			if (n) return {
				...e,
				jump: n
			};
		}
		return {
			...e,
			jump: null
		};
	});
}
//#endregion
//#region ../engine/src/stage.ts
function mb() {
	return {
		background: null,
		music: null,
		tone: null,
		portraits: {},
		objects: {},
		veil: null
	};
}
function hb(e, ...t) {
	let n = { ...e };
	for (let e of t) delete n[e];
	return n;
}
function gb(e, t) {
	return Object.fromEntries(Object.entries(e).filter(([e]) => e !== t));
}
var _b = (e) => typeof e == "function" ? { defaultExpression: e } : e ?? {};
function vb(e, t, n) {
	return Object.entries(e.portraits).filter(([e, r]) => e !== n && r.slot === t && !r.pos).map(([e]) => e);
}
function yb(e, t, n = {}) {
	let r = _b(n).defaultExpression ?? (() => void 0);
	switch (t.op) {
		case "bg": return {
			...e,
			background: t.asset
		};
		case "music": return {
			...e,
			music: t.asset === null ? null : {
				asset: t.asset,
				volume: t.volume ?? 1
			}
		};
		case "tone": return {
			...e,
			tone: t.mood
		};
		case "dim": {
			let n = { ...e };
			return delete n.dim, t.amount > 0 ? {
				...n,
				dim: t.amount
			} : n;
		}
		case "backdrop": {
			let n = { ...e };
			delete n.backdrop;
			let r = t.brightness !== void 0 && t.brightness !== 1 ? t.brightness : void 0, i = t.blur ? t.blur : void 0;
			return r !== void 0 || i !== void 0 ? {
				...n,
				backdrop: {
					...r === void 0 ? {} : { brightness: r },
					...i === void 0 ? {} : { blur: i }
				}
			} : n;
		}
		case "light": {
			let n = e.portraits[t.who];
			if (!n) return e;
			let r = hb(n, "brightness");
			return {
				...e,
				portraits: {
					...e.portraits,
					[t.who]: t.brightness === 1 ? r : {
						...r,
						brightness: t.brightness
					}
				}
			};
		}
		case "enter": {
			let n = t.expr ?? r(t.who), i = t.share === !1 && t.slot && !t.pos ? vb(e, t.slot, t.who).reduce(gb, e.portraits) : e.portraits;
			return {
				...e,
				portraits: {
					...i,
					[t.who]: {
						...t.slot ? { slot: t.slot } : {},
						...t.pos ? { pos: t.pos } : {},
						...n ? { expr: n } : {},
						...t.flip ? { flip: !0 } : {},
						...t.layer ? { layer: t.layer } : {}
					}
				}
			};
		}
		case "exit": return {
			...e,
			portraits: gb(e.portraits, t.who)
		};
		case "expr": {
			let n = e.portraits[t.who];
			if (!n) return e;
			let r = hb(n, "exprChange");
			return {
				...e,
				portraits: {
					...e.portraits,
					[t.who]: {
						...r,
						expr: t.expr
					}
				}
			};
		}
		case "show": return {
			...e,
			objects: {
				...e.objects,
				[t.id]: {
					asset: t.asset,
					...t.slot ? { slot: t.slot } : {},
					...t.pos ? { pos: t.pos } : {},
					layer: t.layer ?? "front"
				}
			}
		};
		case "hide": return {
			...e,
			objects: gb(e.objects, t.id)
		};
		case "clear": return {
			...e,
			portraits: {},
			objects: {}
		};
		case "sfx":
		case "effect": return e;
	}
}
function bb(e, t, n) {
	return t.reduce((e, t) => yb(e, t, n), e);
}
function xb(e) {
	let t = Object.entries(e.portraits).filter(([, e]) => e.temporary).map(([e]) => e);
	return t.length === 0 ? e : {
		...e,
		portraits: t.reduce(gb, e.portraits)
	};
}
function Sb(e, t, n) {
	let r = t.speaker, i = t.portrait, a = e.portraits[r], o = i?.layer ?? a?.layer, s = a ? hb(a, "exprChange") : {}, c = a && t.expr && t.expr !== (a.expr ?? n.defaultExpression?.(r)) && t.exprChange ? { exprChange: t.exprChange } : {}, l = (t) => ({
		...e,
		portraits: {
			...e.portraits,
			[r]: {
				...t,
				...o ? { layer: o } : {}
			}
		}
	}), u = i?.show === void 0 ? n.stageByDefault !== !1 : Gg(i.show), d = i?.faceSide === "left" || i?.faceSide === "right" ? i.faceSide : void 0, f = i?.picture ?? (a || u && (t.expr || n.defaultExpression?.(r) || n.hasPicture?.(r)) ? "temporary" : "face");
	if (f === "face") return e;
	if (f === "leave") return a ? l({
		...s,
		...t.expr ? { expr: t.expr } : {},
		...c,
		temporary: !0
	}) : e;
	let p = t.expr ?? a?.expr ?? n.defaultExpression?.(r), m = i?.flip ?? a?.flip;
	if (a && !a.temporary && f === "temporary") {
		let e = i?.slot ?? (i?.pos ? void 0 : d), n = i?.pos !== void 0 || e !== void 0, r = hb(s, "slot", "pos");
		return l({
			...n ? r : s,
			...i?.pos ? { pos: i.pos } : e ? { slot: e } : {},
			...t.expr ? { expr: t.expr } : {},
			...c
		});
	}
	let h = i?.pos, g = h ? void 0 : i?.slot ?? d ?? a?.slot ?? n.home?.(r) ?? n.speakerSide?.(r, i) ?? "left", _ = e.portraits;
	if (g) {
		let t = vb(e, g, r);
		f === "stage" && (_ = ((i?.ifTaken ?? "replace") === "replace" ? t : t.slice(0, t.length - 1)).reduce(gb, _));
	}
	return {
		...e,
		portraits: {
			..._,
			[r]: {
				...g ? { slot: g } : {},
				...h ? { pos: h } : {},
				...p ? { expr: p } : {},
				...c,
				...m ? { flip: !0 } : {},
				...o ? { layer: o } : {},
				...a?.brightness ? { brightness: a.brightness } : {},
				...f === "temporary" ? { temporary: !0 } : {}
			}
		}
	};
}
function Cb(e, t, n) {
	let r = _b(n), i = t.stage ?? [], a = bb(t.type === "transition" && yv(t).mode === "out" ? e : xb(e), i.filter((e) => e.op !== "light"), r);
	if (t.type === "autoplay-start" && (a = {
		...a,
		autoplay: [...(a.autoplay ?? []).filter((e) => e.start !== t.id), {
			start: t.id,
			settings: O_(t.settings)
		}]
	}), t.type === "autoplay-end") {
		let e = a.autoplay?.findIndex((e) => e.start === t.start) ?? -1;
		if (e >= 0) {
			let t = a.autoplay.slice(0, e);
			a = { ...a }, t.length ? a.autoplay = t : delete a.autoplay;
		}
	}
	if (t.type === "line" && (a = Sb(a, t, r)), a = bb(a, i.filter((e) => e.op === "light"), r), t.type !== "transition") return a;
	let o = yv(t);
	return {
		...a,
		veil: o.mode === "out" ? {
			color: o.color,
			affects: o.affects
		} : null
	};
}
function wb() {
	let e = /* @__PURE__ */ new Set(), t = null, n = {}, r = [], i = /* @__PURE__ */ new Map(), a = {}, o = "en", s = {}, c = {}, l = [], u = {}, d = mb(), f = "idle", p = -1, m = /* @__PURE__ */ new Map(), h, g, _ = null, v = /* @__PURE__ */ new Set(), y = /* @__PURE__ */ new Set(), b = (e) => v.has(e.name) || y.has(e.id), x = !1, S = /* @__PURE__ */ new Map(), C = 0, w = null, T = (t, ...n) => {
		for (let r of [...e]) r[t]?.apply(r, n);
	}, E = () => {
		if (!t) throw Error("No story loaded. Call load() first.");
		return t;
	}, ee = (e) => {
		let t = Ty(a[o]?.entries[e]);
		if (t !== void 0) return t;
		let n = E().story.languages.source;
		return Ty(a[n]?.entries[e]) ?? `⟦${e}⟧`;
	}, D = (e) => E().characters.find((t) => t.id === e), te = (e) => {
		let t = D(e)?.names;
		return t ? Tv(t, o, E().story.languages.source) ?? e : e;
	}, ne = {
		defaultExpression: (e) => D(e)?.defaultExpression,
		hasPicture: (e) => Object.keys(D(e)?.expressions ?? {}).length > 0,
		home: (e) => D(e)?.home,
		speakerSide: (e, t) => {
			let n = $g(E().story.settings?.portraits);
			if (!Kg(t?.show ?? n.show)) return;
			let r = t?.faceSide ?? D(e)?.faceSide ?? n.faceSide;
			return r === "follow" ? void 0 : r;
		},
		get stageByDefault() {
			return Gg($g(E().story.settings?.portraits).show);
		}
	}, re = (e) => s[e], O = (e, t) => {
		let n = s[e];
		s = {
			...s,
			[e]: t
		}, n !== t && T("flagChanged", e, t, n);
	}, k = {
		getFlag: re,
		isCompleted: (e) => n.isCompleted?.(e) ?? !1
	}, ie = (e) => x || e.when === void 0 || lb(e.when, k), ae = (e) => {
		let t = e.chain;
		if (x || !t || S.size === 0) return ie(e.step);
		let n = !1;
		for (let e of t) {
			let t = S.get(e.fork);
			if (t !== void 0) {
				if (t !== e.route) return !1;
				n = !0;
			}
		}
		if (!n) return ie(e.step);
		let r = t.flatMap((e) => !S.has(e.fork) && e.when ? [e.when] : []);
		return e.own && r.push(e.own), r.every((e) => lb(e, k));
	}, A = (e, t) => {
		_ = {
			view: e,
			stage: d
		}, T("view", e, d, t);
	}, oe = (e) => e.filter((e) => e.op === "effect" || e.op === "sfx"), se = (e, t = !1) => {
		let n = E().story, r = n.scenes.find((t) => t.steps.some((t) => t.id === e.id)), i = d.autoplay?.at(-1)?.settings, a = e.type === "line" || e.type === "narration" ? e.playback?.durationMs : void 0, o = (e.type === "line" || e.type === "narration") && (r?.playback || e.playback || n.settings?.autoplayDelayMs !== void 0 || n.settings?.autoplayAllowManualAdvance !== void 0) ? E_(n.settings, r?.playback, e.playback) : void 0, s = i ? {
			...i,
			...a === void 0 ? {} : { durationMs: a }
		} : o, c = s ? { playback: s } : {};
		switch (e.type) {
			case "narration": return {
				kind: "narration",
				presentation: U_(e.presentation, n.settings?.presentation),
				...c,
				stepId: e.id,
				text: ee(e.text),
				...e.voice ? { voice: e.voice } : {},
				...e.voice && e.duckMusic === !1 ? { duckMusic: !1 } : {}
			};
			case "line": {
				let t = D(e.speaker)?.color, r = D(e.speaker)?.speakerBadge;
				return {
					kind: "line",
					presentation: H_(e.presentation, n.settings?.presentation, { stagePortrait: !!e.speaker && !!d.portraits[e.speaker] && Object.keys(D(e.speaker)?.expressions ?? {}).length > 0 }),
					...r ? { speakerBadge: r } : {},
					...c,
					stepId: e.id,
					speaker: e.speaker,
					speakerName: te(e.speaker),
					...t ? { speakerColor: t } : {},
					...e.expr ? { expr: e.expr } : {},
					...e.portrait ? { portrait: e.portrait } : {},
					text: ee(e.text),
					...e.voice ? { voice: e.voice } : {},
					...e.voice && e.duckMusic === !1 ? { duckMusic: !1 } : {}
				};
			}
			case "choice": {
				let t = e.options.filter((e) => ie(e)).map((e) => ({
					id: e.id,
					text: ee(e.text)
				}));
				return {
					kind: "choice",
					stepId: e.id,
					...e.prompt ? { prompt: ee(e.prompt) } : {},
					options: t
				};
			}
			case "sequence": return {
				kind: "sequence",
				...c,
				stepId: e.id,
				sequenceId: e.ref,
				sequence: E().story.sequences[e.ref] ?? { items: [] },
				blocking: e.blocking,
				hold: !!e.hold,
				keepDialog: !!e.keepDialog,
				layer: e.layer === "front" ? "front" : "behind",
				skippable: e.skippable,
				trigger: e.trigger,
				...e.skipPromptKey ? { skipPrompt: ee(e.skipPromptKey) } : {}
			};
			case "delay": return {
				kind: "delay",
				...c,
				stepId: e.id,
				ms: e.ms,
				skippable: !!e.skippable
			};
			case "transition": return {
				kind: "transition",
				...c,
				stepId: e.id,
				...yv(e),
				covered: t
			};
			case "hold-end": return {
				kind: "hold-end",
				stepId: e.id,
				start: e.start,
				ending: e.ending,
				fadeMs: e.fadeMs
			};
			case "event": return {
				kind: "waiting-for-host",
				stepId: e.id,
				event: e.name,
				params: e.params ?? {}
			};
			default: return null;
		}
	}, ce = (e) => {
		let t = E().story.scenes.find((t) => t.id === e).meta;
		return {
			sceneId: e,
			title: t.displayTitle ? ee(t.displayTitle) : t.title,
			...t.displaySubtitle ? { subtitle: ee(t.displaySubtitle) } : t.subtitle ? { subtitle: t.subtitle } : {},
			...t.location ? { location: t.location } : {},
			...t.time ? { time: t.time } : {}
		};
	}, j = (e) => {
		let t = E().story.scenes.find((t) => t.id === e);
		return (t.trigger ? "quiet" : t.meta.start ?? E().story.settings?.sceneStart ?? "title") === "corner" ? {
			...ce(e),
			corner: !0
		} : ce(e);
	}, le = (e) => {
		let t = w;
		t && (w = null, {phase: f, cursor: p, stage: d, exitName: g, current: _, chosenRoutes: S} = t.outer, T("playEnd", {
			sceneId: t.sceneId,
			exit: e
		}));
	}, ue = (e) => {
		w ? le(e) : (f = "ended", g = e, A({
			kind: "ended",
			exit: e
		}, []), T("exit", e));
	}, M = (e, t = !1) => {
		let n = e, a = 0;
		for (;;) {
			let o = r[n], s = w ? n >= w.from && n < w.to : n < C;
			if (!o || !s) return ue("done");
			let { step: c } = o;
			if (d.autoplay) {
				let e = d.autoplay.filter((e) => {
					let t = r.findIndex((t) => t.step.id === e.start), i = r.findIndex((t) => t.step.type === "autoplay-end" && t.step.start === e.start);
					return t >= 0 && i >= 0 && n >= t && n <= i && r[t]?.sceneId === o.sceneId;
				});
				e.length !== d.autoplay.length && (d = { ...d }, e.length ? d.autoplay = e : delete d.autoplay);
			}
			if (!(t && n === e) && (c.hidden || !ae(o)) || c.type === "choice" && !c.options.some((e) => ie(e))) {
				n++;
				continue;
			}
			if (p = n, !w) {
				if (h !== void 0 && o.sceneId !== h) for (let [e, t] of [...m]) t !== o.sceneId && (m.delete(e), A({
					kind: "hold-end",
					stepId: `scene-end:${e}`,
					start: e,
					ending: "cut",
					fadeMs: 0,
					force: !0
				}, []));
				h = o.sceneId;
			}
			w || l.push(c.id);
			let g = c.stage ?? [], _ = d.veil !== null;
			d = Cb(d, c, ne), o.sceneStart && !o.quiet ? T("scene", o.corner ? {
				...ce(o.sceneId),
				corner: !0
			} : ce(o.sceneId)) : o.title !== void 0 && T("scene", {
				...ce(o.sceneId),
				durationMs: o.title
			});
			for (let e of oe(g)) T("transient", e);
			switch (c.type) {
				case "narration":
				case "line":
					f = "showing", A(se(c), g);
					return;
				case "set":
					for (let e of c.set) O(e.flag, ub(re(e.flag), e));
					n++;
					continue;
				case "choice":
					f = "choice", A(se(c), g);
					return;
				case "sequence": {
					let e = se(c);
					if (c.hold && !w && m.set(c.id, o.sceneId), c.blocking) {
						f = "sequence", A(e, g);
						return;
					}
					A(e, g), n++;
					continue;
				}
				case "delay":
					f = "delay", A(se(c), g);
					return;
				case "transition":
					f = "transition", A(se(c, _), g);
					return;
				case "hold-end":
					A(se(c), g), n++;
					continue;
				case "event":
					if (b(c)) {
						f = "waiting", A(se(c), g), u[c.id] = (u[c.id] ?? 0) + 1, T("hostEvent", {
							stepId: c.id,
							visit: u[c.id],
							name: c.name,
							params: c.params ?? {},
							outcomes: c.outcomes
						});
						return;
					}
					O(jy(c), c.default), n++;
					continue;
				case "autoplay-start":
				case "autoplay-end":
				case "mark":
					n++;
					continue;
				case "leave":
				case "goto":
					if (o.jump === void 0) {
						n++;
						continue;
					}
					if (o.jump === null) {
						ue("done");
						return;
					}
					if (++a > 1e3) {
						ue("loop");
						return;
					}
					n = i.get(o.jump) ?? n + 1;
					continue;
				case "end":
					ue(c.exit);
					return;
			}
		}
	}, de = (e) => r[e]?.step;
	return {
		apiVersion: 1,
		get lang() {
			return o;
		},
		load(e, x = {}) {
			let S = Vy(e.story, {
				...e.strings[e.story.languages.source] ? { strings: e.strings[e.story.languages.source] } : {},
				...e.registry ? { registry: e.registry } : {},
				characters: e.characters,
				assets: e.assets
			});
			if (Hy(S)) {
				let t = S.filter((e) => e.level === "error").slice(0, 5);
				throw Error(`Story "${e.story.id}" is invalid:\n` + t.map((e) => `- ${e.path}: ${e.message}`).join("\n"));
			}
			t = e, n = x, r = pb(e.story), w = null;
			let T = new Set(e.story.scenes.filter((e) => e.trigger).map((e) => e.id)), E = r.findIndex((e) => T.has(e.sceneId));
			C = E < 0 ? r.length : E, i = new Map(r.map((e, t) => [e.step.id, t])), a = e.strings, o = x.lang && a[x.lang] ? x.lang : e.story.languages.source, v = new Set(x.hostEvents ?? []), y = new Set(x.hostEventSteps ?? []);
			let ee = [];
			for (let t of e.story.contract.reads.length ? e.story.contract.reads : []) x.hostFlags?.[t] === void 0 && e.registry?.flags[t] === void 0 && ee.push(`Shared flag "${t}" was not provided by the host.`);
			for (let { step: e } of r) e.type === "event" && !b(e) && ee.push(`Host event "${e.name}" is not handled; step "${e.id}" will use its default outcome "${e.default}".`);
			return c = {
				...db(e.story, e.registry),
				...x.hostFlags ?? {}
			}, s = { ...c }, l = [], m.clear(), h = void 0, u = {}, d = mb(), f = "idle", p = -1, g = void 0, _ = null, { warnings: [...new Set(ee)] };
		},
		start(e = {}) {
			E(), w = null, s = {
				...c,
				...e.flags ?? {}
			}, l = [], m.clear(), h = void 0, u = {}, d = mb(), g = void 0, _ = null, x = !1, S = /* @__PURE__ */ new Map();
			let t = 0, n = e.from;
			if (n) {
				let a = i.get(n.stepId);
				if (a === void 0 || r[a].sceneId !== n.sceneId) throw Error(`Cannot start at unknown step "${n.sceneId}/${n.stepId}".`);
				t = a;
				let o = E().story.scenes.find((e) => e.id === n.sceneId), s = o?.steps[0];
				if (e.withOpening && o && !o.trigger && s?.id === n.stepId && !s.hidden && !s.when) {
					let e = r.findIndex((e) => e.sceneId === n.sceneId);
					e >= 0 && e < a && (t = e);
				}
				let c = 0, u = E().story.scenes.find((e) => e.id === n.sceneId);
				if (u?.trigger) {
					for (c = a; c > 0 && r[c - 1].sceneId === n.sceneId;) c--;
					let e = a;
					for (; r[e]?.sceneId === n.sceneId;) e++;
					w = {
						sceneId: u.id,
						presentation: cy(u),
						from: c,
						to: e,
						outer: {
							phase: "idle",
							cursor: -1,
							stage: mb(),
							exitName: void 0,
							current: null,
							chosenRoutes: /* @__PURE__ */ new Map()
						}
					};
				}
				for (let e of r[a].chain ?? []) S.set(e.fork, e.route);
				let f = /* @__PURE__ */ new Map();
				for (let e = c; e < t; e++) {
					let t = r[e].step;
					if (!t.hidden && ae(r[e])) {
						if (w || l.push(t.id), d = Cb(d, t, ne), t.type === "set") for (let e of t.set) O(e.flag, ub(re(e.flag), e));
						else t.type === "event" && !b(t) ? O(jy(t), t.default) : t.type === "sequence" && t.hold ? (f.set(t.id, t), m.set(t.id, r[e].sceneId)) : t.type === "hold-end" && (f.delete(t.start), m.delete(t.start));
					}
				}
				for (let [e] of [...f]) m.get(e) !== r[t].sceneId && (f.delete(e), m.delete(e));
				for (let e of f.values()) {
					let t = se(e);
					t?.kind === "sequence" && A({
						...t,
						blocking: !1,
						played: !0
					}, []);
				}
			}
			x = !!e.ignoreConditions, M(t, n !== void 0);
		},
		play(e) {
			let t = E().story.scenes.find((t) => t.id === e);
			if (!t?.trigger) return { status: "unknown" };
			if (w || f !== "idle" && f !== "ended" && f !== "waiting") return { status: "busy" };
			if (!x && t.when && !lb(t.when, k)) return { status: "skipped" };
			let n = r.findIndex((t) => t.sceneId === e);
			if (n < 0) return { status: "skipped" };
			let i = n;
			for (; r[i]?.sceneId === e;) i++;
			let a = cy(t);
			return w = {
				sceneId: e,
				presentation: a,
				from: n,
				to: i,
				outer: {
					phase: f,
					cursor: p,
					stage: d,
					exitName: g,
					current: _,
					chosenRoutes: S
				}
			}, d = mb(), S = /* @__PURE__ */ new Map(), g = void 0, f = "idle", p = -1, _ = null, T("playStart", {
				sceneId: e,
				presentation: a
			}), M(n), {
				status: "started",
				presentation: a
			};
		},
		cancelPlay() {
			w && le("cancelled");
		},
		getPlaying: () => w ? {
			sceneId: w.sceneId,
			presentation: w.presentation
		} : null,
		advance() {
			f === "showing" && M(p + 1);
		},
		choose(e) {
			if (f !== "choice") throw Error("There is no choice to answer right now.");
			let t = de(p);
			if (t?.type !== "choice") throw Error("Internal error: not at a choice step.");
			let n = t.options.find((t) => t.id === e && ie(t));
			if (!n) throw Error(`"${e}" is not an available option at "${t.id}".`);
			for (let e of n.set ?? []) O(e.flag, ub(re(e.flag), e));
			M(p + 1);
		},
		resume(e) {
			if (f !== "waiting") throw Error("The engine is not waiting for the host.");
			let t = de(p);
			if (t?.type !== "event") throw Error("Internal error: not at an event step.");
			if (e === "error" && !t.outcomes.includes("error") && (e = t.default), !t.outcomes.includes(e)) throw Error(`"${e}" is not an outcome of event "${t.name}" (expected: ${t.outcomes.join(", ")}).`);
			O(jy(t), e), M(p + 1);
		},
		sequenceDone() {
			f === "sequence" && M(p + 1);
		},
		delayDone() {
			f === "delay" && M(p + 1);
		},
		transitionDone() {
			f === "transition" && M(p + 1);
		},
		setLanguage(e) {
			if (!t) return;
			o = a[e] ? e : t.story.languages.source;
			let n = de(p);
			if (!n || f === "idle" || f === "ended") return;
			let r = se(n);
			r && A(r, []);
		},
		getView: () => _,
		getFlags: () => ({ ...s }),
		getFlag: re,
		setFlag(e, t) {
			O(e, t);
		},
		snapshot() {
			let e = E(), t = w ? w.outer : {
				phase: f,
				cursor: p,
				exitName: g
			}, n = r[t.cursor];
			return {
				apiVersion: 1,
				storyId: e.story.id,
				schemaVersion: e.schemaVersion,
				lang: o,
				cursor: t.phase === "idle" || t.phase === "ended" || !n ? null : {
					sceneId: n.sceneId,
					stepId: n.step.id
				},
				...t.exitName === void 0 ? {} : { ended: t.exitName },
				flags: { ...s },
				history: [...l],
				visits: { ...u }
			};
		},
		restore(e) {
			let t = E();
			if (e.apiVersion !== 1) throw Error(`Snapshot is for engine API ${e.apiVersion}, this is 1.`);
			if (e.storyId !== t.story.id) throw Error(`Snapshot belongs to story "${e.storyId}", not "${t.story.id}".`);
			o = a[e.lang] ? e.lang : t.story.languages.source, w = null, s = { ...e.flags }, l = [...e.history], u = { ...e.visits ?? {} }, d = mb();
			let n = !1;
			if (l.forEach((e, t) => {
				let a = i.get(e), o = a === void 0 ? void 0 : r[a].step;
				t === l.length - 1 && (n = d.veil !== null), o && (d = Cb(d, o, ne));
			}), g = e.ended, e.ended !== void 0) {
				f = "ended", p = -1, A({
					kind: "ended",
					exit: e.ended
				}, []);
				return;
			}
			if (!e.cursor) {
				f = "idle", p = -1, _ = null;
				return;
			}
			let c = i.get(e.cursor.stepId);
			if (c === void 0) throw Error(`Snapshot refers to unknown step "${e.cursor.stepId}".`);
			p = c;
			let m = r[c].step;
			switch (T("scene", j(r[c].sceneId)), m.type) {
				case "choice":
					f = "choice";
					break;
				case "sequence":
					f = "sequence";
					break;
				case "delay":
					f = "delay";
					break;
				case "transition":
					f = "transition";
					break;
				case "event":
					f = "waiting";
					break;
				default: f = "showing";
			}
			let h = se(m, n);
			h && A(h, []), m.type === "event" && b(m) && T("hostEvent", {
				stepId: m.id,
				visit: u[m.id] ?? 1,
				name: m.name,
				params: m.params ?? {},
				outcomes: m.outcomes
			});
		},
		subscribe(t) {
			return e.add(t), () => e.delete(t);
		}
	};
}
//#endregion
//#region ../engine/src/markup.ts
var Tb = /\[(\/?)([a-z][a-z0-9-]*)(?::([^\]]*))?\]/gi;
function Eb(e) {
	let t = [], n = [], r = 0, i = (e) => {
		e && t.push({
			kind: "text",
			text: e,
			tags: [...n]
		});
	};
	for (let a of e.matchAll(Tb)) {
		i(e.slice(r, a.index)), r = (a.index ?? 0) + a[0].length;
		let o = a[1] === "/", s = (a[2] ?? "").toLowerCase();
		if (s === "pause" && !o) {
			let e = Number(a[3]);
			t.push({
				kind: "pause",
				ms: Number.isFinite(e) && e >= 0 ? e : 0
			});
		} else if (o) {
			let e = n.lastIndexOf(s);
			e >= 0 && n.splice(e, 1);
		} else n.push(s);
	}
	return i(e.slice(r)), t;
}
function Db(e) {
	return e.replace(Tb, "");
}
//#endregion
//#region ../engine/src/animation.ts
var Ob = {
	linear: (e) => e,
	in: (e) => e * e * e,
	out: (e) => 1 - (1 - e) ** 3,
	inOut: (e) => e < .5 ? 4 * e * e * e : 1 - (-2 * e + 2) ** 3 / 2
};
function kb(e, t) {
	if (!e || e.length === 0) return;
	let n = e.every((t, n) => n === 0 || t.t >= e[n - 1].t) ? e : [...e].sort((e, t) => e.t - t.t), r = n[0], i = n[n.length - 1];
	if (t <= r.t) return r.value;
	if (t >= i.t) return i.value;
	let a = 1;
	for (; n[a].t < t;) a++;
	let o = n[a - 1], s = n[a], c = s.t - o.t;
	if (c <= 0) return s.value;
	let l = Ob[o.ease ?? "linear"]((t - o.t) / c);
	return o.value + (s.value - o.value) * l;
}
var Ab = {
	x: 0,
	y: 0,
	scale: 1,
	scaleY: 1,
	rotation: 0,
	opacity: 1
};
function jb(e, t) {
	let n = { ...Ab };
	if (!e) return n;
	for (let r of Object.keys(Ab)) {
		let i = kb(e[r], t);
		i !== void 0 && (n[r] = i);
	}
	return n;
}
//#endregion
//#region ../engine/src/sequence.ts
function Mb(e) {
	let t = 0;
	for (let n of e.items) {
		let e = "endTime" in n && n.endTime !== void 0 ? n.endTime : n.startTime;
		t = Math.max(t, e);
	}
	return t;
}
function Nb(e, t) {
	return e.items.filter((e) => (e.type === "image" || e.type === "text" || e.type === "video" || e.type === "color") && !e.hidden && t >= e.startTime && (e.endTime === void 0 || t < e.endTime));
}
function Pb(e, t, n) {
	let r = e.items.filter((e) => e.type !== "image" && e.type !== "text" && e.type !== "video" && e.type !== "color" && e.startTime >= t && e.startTime < n);
	for (let i of e.items) {
		if (i.type !== "music" || i.endTime === void 0 || i.endTime <= i.startTime) continue;
		let a = i.endTime, o = Math.min(i.fadeOutMs ?? 1500, a - i.startTime), s = a - o;
		s < t || s >= n || e.items.some((e) => e !== i && e.type === "music" && e.startTime > i.startTime && e.startTime <= a) || r.push({
			type: "music_stop",
			startTime: s,
			fadeMs: o
		});
	}
	return r;
}
var Fb = (e) => Hb(e) ?? Mb(e);
function Ib(e, t, n) {
	return {
		inMs: t.fadeInMs ?? e.defaults?.imageFadeInMs ?? n?.imageFadeInMs ?? 300,
		outMs: t.fadeOutMs ?? e.defaults?.imageFadeOutMs ?? n?.imageFadeOutMs ?? 300
	};
}
function Lb(e, t, n, r) {
	let { inMs: i, outMs: a } = Ib(e, t, r), o = 1;
	return i > 0 && (o = Math.min(o, (n - t.startTime) / i)), a > 0 && (o = Math.min(o, ((t.endTime ?? Fb(e)) - n) / a)), Math.max(0, Math.min(1, o));
}
function Rb(e, t, n) {
	return {
		enter: ("enter" in t ? t.enter : void 0) ?? e.defaults?.imageEnter ?? n?.imageEnter ?? "fade",
		exit: ("exit" in t ? t.exit : void 0) ?? e.defaults?.imageExit ?? n?.imageExit ?? "fade"
	};
}
var zb = {
	left: {
		x: -1,
		y: 0
	},
	right: {
		x: 1,
		y: 0
	},
	top: {
		x: 0,
		y: -1
	},
	bottom: {
		x: 0,
		y: 1
	}
};
function Bb(e, t, n, r) {
	let { inMs: i, outMs: a } = Ib(e, t, r), { enter: o, exit: s } = Rb(e, t, r), c = 0, l = 0;
	if (o !== "fade" && i > 0) {
		let e = 1 - Math.min(1, Math.max(0, (n - t.startTime) / i)), r = zb[o], a = e ** 3;
		c += r.x * a, l += r.y * a;
	}
	if (s !== "fade" && a > 0) {
		let r = 1 - Math.min(1, Math.max(0, ((t.endTime ?? Fb(e)) - n) / a)), i = zb[s], o = r ** 3;
		c += i.x * o, l += i.y * o;
	}
	return {
		x: c,
		y: l
	};
}
function Vb(e, t) {
	return !("exit" in t && t.exit !== void 0) && (t.endTime === void 0 || t.endTime >= Fb(e));
}
function Hb(e) {
	let t = e.items.filter((e) => e.type === "end_scene").map((e) => e.startTime);
	return t.length ? Math.min(...t) : void 0;
}
function Ub(e, t, n, r) {
	let i = Wb(t), a = i ? {
		x: 0,
		y: 0
	} : Bb(e, t, n, r), o = jb(t.animation, n - t.startTime), s = t.animation?.scale !== void 0;
	return {
		opacity: Math.max(0, Math.min(1, (i ? 1 : Lb(e, t, n, r)) * o.opacity)),
		x: a.x + o.x,
		y: a.y + o.y,
		scale: o.scale,
		scaleY: t.animation?.scaleY === void 0 && s ? o.scale : o.scaleY,
		rotation: o.rotation
	};
}
var Wb = (e) => e.animated === !0 || e.animation !== void 0 && Object.values(e.animation).some((e) => e?.length);
function Gb(e, t, n) {
	let r = Math.max(0, t - e.startTime) / 1e3;
	return e.loop && n !== void 0 && n > 0 ? r % n : r;
}
function Kb(e, t, n) {
	let r = Math.abs(e - t);
	return n !== void 0 && n > 0 && (r = Math.min(r, n - r % n)), r * 1e3 > 150;
}
//#endregion
//#region ../engine/src/autoplay.ts
function qb(e, t, n) {
	let r = 0, i = 0, a = !1;
	return { tick(o, s, c) {
		if (!s) return !1;
		if (r += Math.max(0, o), n !== void 0) return r >= n && !c;
		if (!a && r >= e && !c) return a = !0, t === 0;
		if (a) {
			if (c) return a = !1, i = 0, !1;
			i += Math.max(0, o);
		}
		return a && i >= t;
	} };
}
//#endregion
//#region ../../apps/studio/app/utils/clock.ts
var Jb = (e, t) => new Intl.DateTimeFormat(t, {
	dateStyle: "short",
	timeStyle: "short",
	hourCycle: "h23"
}).format(e), Yb = { class: "min-w-0 text-sm" }, Xb = { class: "font-medium text-highlighted" }, Zb = {
	key: 0,
	class: "truncate text-muted"
}, Qb = {
	key: 1,
	class: "text-muted"
}, $b = { class: "flex shrink-0 gap-2" }, ex = /* @__PURE__ */ sr({
	__name: "SaveSlots",
	props: /*@__PURE__*/ Wr({ slots: { type: Array } }, {
		open: {
			type: Boolean,
			required: !0
		},
		openModifiers: {}
	}),
	emits: /*@__PURE__*/ Wr(["save", "load"], ["update:open"]),
	setup(e, { emit: t }) {
		let n = ui(e, "open"), r = t, i = lr("bodyRoot");
		Ts(i, () => {
			n.value = !1;
		});
		let { t: a, locale: o } = eb(), s = (e) => Jb(e, o.value);
		return (t, o) => {
			let c = cb, l = vs;
			return R(), B(l, {
				open: n.value,
				"onUpdate:open": o[0] ||= (e) => n.value = e,
				title: I(a)("player.saveLoad")
			}, {
				body: Nn(() => [V("ul", {
					ref_key: "bodyRoot",
					ref: i,
					class: "grid gap-3"
				}, [(R(!0), z(L, null, Nr(e.slots, (e, t) => (R(), z("li", {
					key: t,
					class: "grid gap-2 rounded-md border border-default p-3 sm:flex sm:items-center sm:justify-between sm:gap-3"
				}, [V("div", Yb, [V("p", Xb, P(I(a)("player.slot", { n: t + 1 })), 1), e ? (R(), z("p", Zb, P(s(e.savedAt)) + " · " + P(I(Db)(e.label)), 1)) : (R(), z("p", Qb, P(I(a)("player.slotEmpty")), 1))]), V("div", $b, [H(c, {
					size: "sm",
					onClick: (e) => r("save", t + 1)
				}, {
					default: Nn(() => [ga(P(I(a)("player.save")), 1)]),
					_: 1
				}, 8, ["onClick"]), H(c, {
					size: "sm",
					color: "neutral",
					variant: "subtle",
					disabled: !e,
					onClick: (e) => r("load", t + 1)
				}, {
					default: Nn(() => [ga(P(I(a)("player.load")), 1)]),
					_: 1
				}, 8, ["disabled", "onClick"])])]))), 128))], 512)]),
				_: 1
			}, 8, ["open", "title"]);
		};
	}
});
//#endregion
//#region ../../apps/studio/app/utils/sizedUrl.ts
function tx(e, t) {
	return e?.startsWith("/api/") ? `${e}${e.includes("?") ? "&" : "?"}w=${t}` : e;
}
//#endregion
//#region ../../apps/studio/app/components/player/Log.vue?vue&type=script&setup=true&lang.ts
var nx = ["src", "alt"], rx = { class: "min-w-0" }, ix = { class: "text-default" }, ax = {
	key: 0,
	class: "text-sm text-muted"
}, ox = /* @__PURE__ */ sr({
	__name: "Log",
	props: /*@__PURE__*/ Wr({ entries: { type: Array } }, {
		open: {
			type: Boolean,
			required: !0
		},
		openModifiers: {}
	}),
	emits: ["update:open"],
	setup(e) {
		let t = ui(e, "open"), n = lr("bodyRoot");
		Ts(n, () => {
			t.value = !1;
		});
		let { t: r } = eb();
		return (i, a) => {
			let o = vs;
			return R(), B(o, {
				open: t.value,
				"onUpdate:open": a[0] ||= (e) => t.value = e,
				title: I(r)("player.log")
			}, {
				body: Nn(() => [V("ol", {
					ref_key: "bodyRoot",
					ref: n,
					class: "grid max-h-[60vh] gap-3 overflow-auto pr-1"
				}, [(R(!0), z(L, null, Nr(e.entries, (e) => (R(), z("li", {
					key: e.stepId,
					class: "flex items-start gap-3 text-sm"
				}, [e.face ? (R(), z("img", {
					key: 0,
					src: ("sizedUrl" in i ? i.sizedUrl : I(tx))(e.face.url, I(Oy).thumbnail),
					alt: e.face.label,
					class: "size-8 shrink-0 rounded-full object-cover"
				}, null, 8, nx)) : U("", !0), V("p", rx, [e.speaker ? (R(), z("span", {
					key: 0,
					class: "mr-2 font-semibold",
					style: j({ color: e.color })
				}, P(e.speaker), 5)) : U("", !0), V("span", ix, P(I(Db)(e.text)), 1)])]))), 128)), e.entries.length ? U("", !0) : (R(), z("li", ax, P(I(r)("player.logEmpty")), 1))], 512)]),
				_: 1
			}, 8, ["open", "title"]);
		};
	}
}), sx = /* @__PURE__ */ sr({
	__name: "UFormField",
	setup(e) {
		return (e, t) => U("", !0);
	}
}), cx = /* @__PURE__ */ sr({
	__name: "USelect",
	setup(e) {
		return (e, t) => U("", !0);
	}
}), lx = {
	key: 1,
	class: "text-sm text-highlighted"
}, ux = { class: "flex w-full justify-end" }, dx = /* @__PURE__ */ sr({
	__name: "CopyDialog",
	props: {
		open: { type: Boolean },
		slug: { type: String },
		projects: { type: Array }
	},
	emits: ["update:open"],
	setup(e, { emit: t }) {
		let n = e, r = t, { t: i } = eb(), a = useToast(), o = /* @__PURE__ */ F("");
		Bn(() => n.open, (e) => {
			e && (o.value = n.projects[0]?.id ?? "");
		});
		let s = W(() => n.projects.map((e) => ({
			label: e.name,
			value: e.id
		}))), c = /* @__PURE__ */ F(!1);
		async function l() {
			if (o.value && !c.value) {
				c.value = !0;
				try {
					let e = await $fetch(`/api/play/${encodeURIComponent(n.slug)}/copy`, {
						method: "POST",
						body: { targetWorkspaceId: o.value }
					});
					r("update:open", !1), a.add({
						title: i("player.copy.done"),
						color: "success"
					}), await navigateTo(`/w/${e.workspaceId}/stories/${e.storyId}`);
				} catch {
					a.add({
						title: i("player.copy.failed"),
						color: "error"
					});
				} finally {
					c.value = !1;
				}
			}
		}
		return (t, n) => {
			let a = cx, u = sx, d = cb, f = vs;
			return R(), B(f, {
				open: e.open,
				title: I(i)("player.copy.title"),
				description: I(i)("player.copy.help"),
				"onUpdate:open": n[1] ||= (e) => r("update:open", e)
			}, {
				body: Nn(() => [e.projects.length > 1 ? (R(), B(u, {
					key: 0,
					label: I(i)("player.copy.target")
				}, {
					default: Nn(() => [H(a, {
						modelValue: I(o),
						"onUpdate:modelValue": n[0] ||= (e) => /* @__PURE__ */ qt(o) ? o.value = e : null,
						items: I(s),
						class: "w-full"
					}, null, 8, ["modelValue", "items"])]),
					_: 1
				}, 8, ["label"])) : (R(), z("p", lx, P(e.projects[0]?.name), 1))]),
				footer: Nn(() => [V("div", ux, [H(d, {
					icon: "i-lucide-copy-plus",
					loading: I(c),
					label: I(i)("player.copy.confirm"),
					onClick: l
				}, null, 8, ["loading", "label"])])]),
				_: 1
			}, 8, [
				"open",
				"title",
				"description"
			]);
		};
	}
});
//#endregion
//#region ../../apps/studio/app/utils/stageInformation.ts
function fx(e, t) {
	let n = e.story.meta.titleKey;
	return n && (Ty(e.strings[t]?.entries[n]) || Ty(e.strings[e.story.languages.source]?.entries[n])) || e.story.meta.title;
}
var px = /* @__PURE__ */ new WeakMap();
function mx(e, t) {
	let n = px.get(e.story);
	return n || (n = new Map(pb(e.story).map((e, t) => [e.step.id, t])), px.set(e.story, n)), n.get(t);
}
function hx(e, t, n, { showBeforeTitle: r = !1 } = {}) {
	let i = e.story.scenes.filter((e) => !e.trigger), a = i.findIndex((e) => e.steps.some((e) => e.id === n) || n === `scene-title:${e.id}` || n === `scene-title-tail:${e.id}` || n === `scene-out:${e.id}` || n === `scene-hold-end:${e.id}` || n === `scene-after:${e.id}`), o = i[a];
	if (!o || (o.meta.start ?? e.story.settings?.sceneStart) === "quiet") return null;
	if (!r && n) {
		let t = mx(e, n), r = mx(e, `scene-title:${o.id}`);
		if (t !== void 0 && r !== void 0 && t < r) return null;
	}
	let s = (n) => n ? Ty(e.strings[t]?.entries[n]) || Ty(e.strings[e.story.languages.source]?.entries[n]) : void 0;
	return {
		title: s(o.meta.displayTitle) ?? "",
		subtitle: s(o.meta.displaySubtitle),
		number: a + 1,
		corner: !0
	};
}
//#endregion
//#region ../../apps/studio/app/utils/titleScreen.ts
function gx(e) {
	return e && e > 0 ? String(e).padStart(2, "0") : void 0;
}
function _x(e, t) {
	let n = e.story.meta.summaryKey;
	return n && (Ty(e.strings[t]?.entries[n]) || Ty(e.strings[e.story.languages.source]?.entries[n])) || e.story.meta.summary;
}
function vx(e) {
	let t = e.story.scenes.find((e) => !e.trigger);
	if (!t) return;
	let n = t.steps.find((e) => !e.hidden), r = n?.when ? void 0 : n?.stage?.find((e) => e.op === "bg"), i = t.meta.backgroundAsset ?? (r?.op === "bg" ? r.asset : void 0), a = i ? e.assets.assets[i] : void 0;
	return a && [
		"background",
		"scene",
		"object",
		"portrait"
	].includes(a.kind) ? a.url : void 0;
}
//#endregion
//#region ../../apps/studio/app/components/player/TitleScreen.vue?vue&type=script&setup=true&lang.ts
var yx = ["src"], bx = {
	key: 0,
	class: "vn-title-episode"
}, xx = { class: "vn-title-heading" }, Sx = {
	key: 1,
	class: "vn-title-summary"
}, Cx = { class: "vn-title-actions" }, wx = ["aria-label"], Tx = {
	key: 3,
	class: "vn-title-warnings"
}, Ex = /* @__PURE__ */ sr({
	__name: "TitleScreen",
	props: {
		bundle: { type: null },
		lang: { type: String },
		canContinue: { type: Boolean },
		warnings: { type: Array }
	},
	emits: [
		"start",
		"continue",
		"language"
	],
	setup(e, { emit: t }) {
		let n = e, r = t, { t: i, ready: a } = eb(), o = W(() => gx(n.bundle.story.meta.episode)), s = W(() => fx(n.bundle, n.lang)), c = W(() => _x(n.bundle, n.lang)), l = W(() => tx(vx(n.bundle), Oy.background)), u = /* @__PURE__ */ F(!1);
		Bn(l, () => u.value = !1);
		let d = W(() => n.bundle.story.languages.available), f = Yy, p = Xy;
		return (t, n) => {
			let m = cb;
			return R(), z("div", {
				class: "vn-title-screen",
				onClick: n[3] ||= us(() => {}, ["stop"])
			}, [
				I(l) && !I(u) ? (R(), z("img", {
					key: 0,
					src: I(l),
					class: "vn-title-art",
					alt: "",
					onError: n[0] ||= (e) => u.value = !0
				}, null, 40, yx)) : U("", !0),
				n[4] ||= V("div", {
					class: "vn-title-treatment",
					"aria-hidden": "true"
				}, null, -1),
				V("div", {
					class: "vn-title-content",
					style: j(I(a) ? void 0 : { visibility: "hidden" })
				}, [
					I(o) ? (R(), z("p", bx, P(I(i)("player.episode", { n: I(o) })), 1)) : U("", !0),
					V("h1", xx, P(I(s)), 1),
					I(c) ? (R(), z("p", Sx, P(I(c)), 1)) : U("", !0),
					V("div", Cx, [H(m, {
						type: "button",
						color: "neutral",
						variant: "soft",
						class: "vn-question-answer",
						onClick: n[1] ||= (e) => r("start")
					}, {
						default: Nn(() => [ga(P(I(i)("player.start")), 1)]),
						_: 1
					}), e.canContinue ? (R(), B(m, {
						key: 0,
						type: "button",
						color: "neutral",
						variant: "soft",
						class: "vn-question-answer vn-answer-secondary",
						onClick: n[2] ||= (e) => r("continue")
					}, {
						default: Nn(() => [ga(P(I(i)("player.continue")), 1)]),
						_: 1
					})) : U("", !0)]),
					I(d).length > 1 ? (R(), z("div", {
						key: 2,
						class: "vn-title-languages",
						role: "group",
						"aria-label": I(i)("player.storyLanguage")
					}, [(R(!0), z(L, null, Nr(I(d), (t) => (R(), B(m, {
						key: t,
						size: "sm",
						color: "neutral",
						variant: "outline",
						class: N({ "is-active bg-white/10": t === e.lang }),
						"aria-pressed": t === e.lang,
						"aria-label": I(f)(t),
						title: I(f)(t),
						onClick: (e) => r("language", t)
					}, {
						default: Nn(() => [ga(P(I(p)(t)), 1)]),
						_: 2
					}, 1032, [
						"class",
						"aria-pressed",
						"aria-label",
						"title",
						"onClick"
					]))), 128))], 8, wx)) : U("", !0),
					e.warnings.length ? (R(), z("ul", Tx, [(R(!0), z(L, null, Nr(e.warnings, (e) => (R(), z("li", { key: e }, P(e), 1))), 128))])) : U("", !0)
				], 4)
			]);
		};
	}
});
//#endregion
//#region ../../apps/studio/app/utils/keepPlayerStageFocus.ts
function Dx(e) {
	if (e.button !== 0) return;
	e.preventDefault();
	let t = e.currentTarget;
	t instanceof HTMLElement && t.closest(".vn-player")?.focus({ preventScroll: !0 });
}
//#endregion
//#region ../../apps/studio/app/components/player/Toolbar.vue?vue&type=script&setup=true&lang.ts
var Ox = {
	key: 6,
	ref: "languageRoot",
	class: "relative"
}, kx = ["aria-label"], Ax = ["aria-selected"], jx = ["onClick"], Mx = /* @__PURE__ */ sr({
	__name: "Toolbar",
	props: {
		muted: { type: Boolean },
		languages: { type: Array },
		lang: { type: String },
		fullscreen: { type: Boolean },
		canCopy: { type: Boolean },
		autoplay: { type: Boolean },
		speed: { type: null },
		testing: { type: Boolean },
		showEveryStep: { type: Boolean },
		minimal: { type: Boolean }
	},
	emits: [
		"log",
		"saves",
		"flags",
		"mute",
		"autoplay",
		"speed",
		"fullscreen",
		"title",
		"copy",
		"conditions",
		"language"
	],
	setup(e, { emit: t }) {
		let n = e, r = t, { t: i } = eb(), a = W(() => n.languages ?? []), o = /* @__PURE__ */ F(!1), s = lr("languageRoot");
		function c() {
			let e = a.value;
			e.length === 2 ? r("language", e.find((e) => e !== n.lang) ?? e[0]) : o.value = !o.value;
		}
		function l(e) {
			o.value = !1, e !== n.lang && r("language", e);
		}
		function u(e) {
			o.value && !s.value?.contains(e.target) && (o.value = !1);
		}
		return Cr(() => document.addEventListener("pointerdown", u)), Er(() => document.removeEventListener("pointerdown", u)), (t, n) => {
			let s = cb, u = ob;
			return R(), z("div", {
				class: "vn-toolbar absolute right-[1.4cqw] bottom-[1.4cqw] z-40 flex max-w-[calc(100%-24px)] flex-wrap justify-end gap-1",
				onClick: n[11] ||= us(() => {}, ["stop"])
			}, [
				e.minimal ? U("", !0) : (R(), B(s, {
					key: 0,
					icon: "i-lucide-scroll-text",
					color: "neutral",
					variant: "subtle",
					size: "sm",
					"aria-label": I(i)("player.log"),
					onMousedown: "keepPlayerStageFocus" in t ? t.keepPlayerStageFocus : I(Dx),
					onClick: n[0] ||= (e) => r("log")
				}, null, 8, ["aria-label", "onMousedown"])),
				e.minimal ? U("", !0) : (R(), B(s, {
					key: 1,
					icon: "i-lucide-save",
					color: "neutral",
					variant: "subtle",
					size: "sm",
					"aria-label": I(i)("player.saveLoad"),
					onMousedown: "keepPlayerStageFocus" in t ? t.keepPlayerStageFocus : I(Dx),
					onClick: n[1] ||= (e) => r("saves")
				}, null, 8, ["aria-label", "onMousedown"])),
				e.testing && !e.minimal ? (R(), B(s, {
					key: 2,
					icon: "i-lucide-git-branch",
					color: e.showEveryStep ? "primary" : "neutral",
					variant: e.showEveryStep ? "solid" : "subtle",
					size: "sm",
					"aria-label": I(i)("player.showEveryStep"),
					"aria-pressed": !!e.showEveryStep,
					title: e.showEveryStep ? I(i)("player.followingNo") : I(i)("player.followingYes"),
					onMousedown: "keepPlayerStageFocus" in t ? t.keepPlayerStageFocus : I(Dx),
					onClick: n[2] ||= (e) => r("conditions")
				}, null, 8, [
					"color",
					"variant",
					"aria-label",
					"aria-pressed",
					"title",
					"onMousedown"
				])) : U("", !0),
				e.minimal ? U("", !0) : (R(), B(s, {
					key: 3,
					icon: "i-lucide-flag",
					color: "neutral",
					variant: "subtle",
					size: "sm",
					"aria-label": I(i)("player.flags"),
					onMousedown: "keepPlayerStageFocus" in t ? t.keepPlayerStageFocus : I(Dx),
					onClick: n[3] ||= (e) => r("flags")
				}, null, 8, ["aria-label", "onMousedown"])),
				e.minimal ? U("", !0) : (R(), B(s, {
					key: 4,
					icon: e.autoplay ? "i-lucide-pause" : "i-lucide-play",
					color: e.autoplay ? "primary" : "neutral",
					variant: e.autoplay ? "soft" : "subtle",
					size: "sm",
					"aria-label": e.autoplay ? I(i)("player.autoplayStop") : I(i)("player.autoplay"),
					"aria-pressed": !!e.autoplay,
					title: e.autoplay ? I(i)("player.autoplayStop") : I(i)("player.autoplay"),
					onMousedown: "keepPlayerStageFocus" in t ? t.keepPlayerStageFocus : I(Dx),
					onClick: n[4] ||= (e) => r("autoplay")
				}, null, 8, [
					"icon",
					"color",
					"variant",
					"aria-label",
					"aria-pressed",
					"title",
					"onMousedown"
				])),
				e.autoplay ? (R(), B(s, {
					key: 5,
					color: "primary",
					variant: "soft",
					size: "sm",
					label: I(i)(`player.speed.${e.speed ?? "normal"}`),
					"aria-label": I(i)("player.speedLabel", { speed: I(i)(`player.speed.${e.speed ?? "normal"}`) }),
					title: I(i)("player.speedLabel", { speed: I(i)(`player.speed.${e.speed ?? "normal"}`) }),
					onMousedown: "keepPlayerStageFocus" in t ? t.keepPlayerStageFocus : I(Dx),
					onClick: n[5] ||= (e) => r("speed")
				}, null, 8, [
					"label",
					"aria-label",
					"title",
					"onMousedown"
				])) : U("", !0),
				I(a).length > 1 ? (R(), z("div", Ox, [H(s, {
					color: "neutral",
					variant: "subtle",
					size: "sm",
					square: "",
					class: "size-8 justify-center overflow-hidden p-0 text-xs font-semibold",
					label: ("storyLanguageShort" in t ? t.storyLanguageShort : I(Zy))(e.lang ?? I(a)[0]),
					"aria-label": I(i)("player.storyLanguage"),
					"aria-expanded": I(a).length > 2 ? I(o) : void 0,
					title: I(i)("player.storyLanguage"),
					onMousedown: "keepPlayerStageFocus" in t ? t.keepPlayerStageFocus : I(Dx),
					onClick: c
				}, null, 8, [
					"label",
					"aria-label",
					"aria-expanded",
					"title",
					"onMousedown"
				]), I(o) ? (R(), z("ul", {
					key: 0,
					role: "listbox",
					"aria-label": I(i)("player.storyLanguage"),
					class: "absolute right-0 bottom-full mb-1 grid min-w-full gap-px overflow-hidden rounded-md border border-default bg-elevated p-1 shadow-lg"
				}, [(R(!0), z(L, null, Nr(I(a), (r) => (R(), z("li", {
					key: r,
					role: "option",
					"aria-selected": r === e.lang
				}, [V("button", {
					type: "button",
					class: N(["flex w-full cursor-pointer items-center justify-between gap-3 rounded px-2 py-1 text-left text-sm whitespace-nowrap hover:bg-white/10", r === e.lang ? "bg-white/10 text-white" : "text-white/70"]),
					onMousedown: n[6] ||= (...e) => ("keepPlayerStageFocus" in t ? t.keepPlayerStageFocus : I(Dx)) && ("keepPlayerStageFocus" in t ? t.keepPlayerStageFocus : I(Dx))(...e),
					onClick: (e) => l(r)
				}, [ga(P(("storyLanguageName" in t ? t.storyLanguageName : I(Yy))(r)) + " ", 1), r === e.lang ? (R(), B(u, {
					key: 0,
					name: "i-lucide-check",
					class: "size-3.5"
				})) : U("", !0)], 42, jx)], 8, Ax))), 128))], 8, kx)) : U("", !0)], 512)) : U("", !0),
				H(s, {
					icon: e.muted ? "i-lucide-volume-x" : "i-lucide-volume-2",
					color: "neutral",
					variant: "subtle",
					size: "sm",
					"aria-label": e.muted ? I(i)("player.unmute") : I(i)("player.mute"),
					onMousedown: "keepPlayerStageFocus" in t ? t.keepPlayerStageFocus : I(Dx),
					onClick: n[7] ||= (e) => r("mute")
				}, null, 8, [
					"icon",
					"aria-label",
					"onMousedown"
				]),
				e.minimal ? U("", !0) : (R(), B(s, {
					key: 7,
					icon: e.fullscreen ? "i-lucide-minimize" : "i-lucide-maximize",
					color: "neutral",
					variant: "subtle",
					size: "sm",
					"aria-label": e.fullscreen ? I(i)("player.exitFullscreen") : I(i)("player.fullscreen"),
					onMousedown: "keepPlayerStageFocus" in t ? t.keepPlayerStageFocus : I(Dx),
					onClick: n[8] ||= (e) => r("fullscreen")
				}, null, 8, [
					"icon",
					"aria-label",
					"onMousedown"
				])),
				e.canCopy && !e.minimal ? (R(), B(s, {
					key: 8,
					icon: "i-lucide-copy-plus",
					color: "neutral",
					variant: "subtle",
					size: "sm",
					"aria-label": I(i)("player.copyToProject"),
					onMousedown: "keepPlayerStageFocus" in t ? t.keepPlayerStageFocus : I(Dx),
					onClick: n[9] ||= (e) => r("copy")
				}, null, 8, ["aria-label", "onMousedown"])) : U("", !0),
				e.minimal ? U("", !0) : (R(), B(s, {
					key: 9,
					icon: "i-lucide-house",
					color: "neutral",
					variant: "subtle",
					size: "sm",
					"aria-label": I(i)("player.toTitle"),
					onMousedown: "keepPlayerStageFocus" in t ? t.keepPlayerStageFocus : I(Dx),
					onClick: n[10] ||= (e) => r("title")
				}, null, 8, ["aria-label", "onMousedown"]))
			]);
		};
	}
}), Nx = { class: "vn-end-content" }, Px = { class: "vn-end-heading" }, Fx = { class: "vn-title-actions" }, Ix = { class: "vn-end-flags" }, Lx = { class: "vn-end-exit" }, Rx = /* @__PURE__ */ sr({
	__name: "EndScreen",
	props: {
		exit: { type: String },
		flags: { type: Object }
	},
	emits: ["restart", "title"],
	setup(e, { emit: t }) {
		let n = e, r = t, { t: i } = eb(), a = W(() => Object.entries(n.flags));
		return (t, n) => {
			let o = cb;
			return R(), z("div", {
				class: "vn-end-screen",
				onClick: n[2] ||= us(() => {}, ["stop"])
			}, [V("div", Nx, [
				V("h2", Px, P(I(i)("player.theEnd")), 1),
				n[3] ||= V("span", {
					class: "vn-end-rule",
					"aria-hidden": "true"
				}, null, -1),
				V("div", Fx, [H(o, {
					size: "lg",
					class: "vn-question-answer",
					onClick: n[0] ||= (e) => r("restart")
				}, {
					default: Nn(() => [ga(P(I(i)("player.playAgain")), 1)]),
					_: 1
				}), H(o, {
					size: "lg",
					color: "neutral",
					variant: "subtle",
					class: "vn-question-answer vn-answer-secondary",
					onClick: n[1] ||= (e) => r("title")
				}, {
					default: Nn(() => [ga(P(I(i)("player.toTitle")), 1)]),
					_: 1
				})]),
				V("details", Ix, [
					V("summary", null, P(I(i)("player.endDetails")), 1),
					V("h3", null, P(I(i)("player.endingName")), 1),
					V("p", Lx, [V("span", null, P(I(i)("player.exit")), 1), V("span", null, P(e.exit), 1)]),
					I(a).length ? (R(), z(L, { key: 0 }, [
						V("h3", null, P(I(i)("player.flags")), 1),
						V("p", null, P(I(i)("player.flagsHelp")), 1),
						V("dl", null, [(R(!0), z(L, null, Nr(I(a), ([e, t]) => (R(), z(L, { key: e }, [V("dt", null, P(e), 1), V("dd", null, P(String(t)), 1)], 64))), 128))])
					], 64)) : U("", !0)
				])
			])]);
		};
	}
}), zx = /* @__PURE__ */ sr({
	__name: "UCard",
	setup(e) {
		return (e, t) => U("", !0);
	}
}), Bx = /* @__PURE__ */ sr({
	__name: "UProgress",
	setup(e) {
		return (e, t) => U("", !0);
	}
}), Vx = { class: "grid gap-3" }, Hx = { class: "text-sm text-muted" }, Ux = { class: "grid gap-2" }, Wx = {
	class: "min-h-6 text-sm text-highlighted",
	"aria-live": "polite"
}, Gx = { class: "flex flex-wrap gap-2" }, Kx = 2e3, qx = /* @__PURE__ */ sr({
	__name: "MockBattle",
	props: {
		params: { type: Object },
		outcomes: { type: Array }
	},
	emits: ["outcome"],
	setup(e, { emit: t }) {
		let n = e, r = t, { t: i } = eb(), a = W(() => Number(n.params.difficulty ?? 1)), o = W(() => Number(n.params.waves ?? 1)), s = W(() => String(n.params.enemy ?? "enemy")), c = /* @__PURE__ */ F(1), l = /* @__PURE__ */ F(100), u = /* @__PURE__ */ F(40), d = /* @__PURE__ */ F(""), f = !1;
		function p(e) {
			f || (f = !0, r("outcome", e));
		}
		let m;
		Cr(() => {
			m = setInterval(() => {
				if (f) return;
				let e = 8 + Math.floor(Math.random() * 7 * a.value);
				l.value = Math.max(0, l.value - e), d.value = i("player.battle.enemyHit", {
					enemy: s.value,
					n: e
				}), l.value === 0 && p("lose");
			}, Kx);
		}), Er(() => clearInterval(m));
		function h() {
			if (f) return;
			let e = 12 + Math.floor(Math.random() * 14);
			if (u.value = Math.max(0, u.value - e), d.value = i("player.battle.hit", { n: e }), u.value === 0) {
				if (c.value >= o.value) return p("win");
				c.value += 1, u.value = 40 + 10 * a.value, d.value = i("player.battle.nextWave", { n: c.value });
			}
		}
		return (t, n) => {
			let r = Bx, f = cb;
			return R(), z("div", Vx, [
				V("p", Hx, P(I(i)("player.battle.title", {
					enemy: I(s),
					wave: I(c),
					waves: I(o)
				})), 1),
				V("div", Ux, [H(r, {
					"model-value": I(l),
					max: 100,
					color: "success",
					size: "md",
					"aria-label": I(i)("player.battle.you")
				}, null, 8, ["model-value", "aria-label"]), H(r, {
					"model-value": I(u),
					max: 40 + 10 * I(a),
					color: "error",
					size: "md",
					"aria-label": I(s)
				}, null, 8, [
					"model-value",
					"max",
					"aria-label"
				])]),
				V("p", Wx, P(I(d)), 1),
				V("div", Gx, [H(f, { onClick: h }, {
					default: Nn(() => [ga(P(I(i)("player.battle.attack")), 1)]),
					_: 1
				}), e.outcomes.includes("flee") ? (R(), B(f, {
					key: 0,
					color: "neutral",
					variant: "subtle",
					onClick: n[0] ||= (e) => p("flee")
				}, {
					default: Nn(() => [ga(P(I(i)("player.battle.flee")), 1)]),
					_: 1
				})) : U("", !0)])
			]);
		};
	}
}), Jx = Array.isArray, Yx = (e) => {
	if (!e && e !== 0 && e !== 0n) return "";
	if (typeof e == "string") return e;
	if (typeof e == "number") return e === e ? "" + e : "";
	if (typeof e == "bigint") return "" + e;
	let t = "";
	if (Jx(e)) {
		let n = e.length;
		for (let r = 0; r < n; r++) {
			let n = e[r];
			if (!n && n !== 0 && n !== 0n) continue;
			let i = typeof n == "string" ? n : Yx(n);
			i && (t && (t += " "), t += i);
		}
		return t;
	}
	if (typeof e == "object") for (let n in e) e[n] && (t && (t += " "), t += n);
	return t;
}, Xx = /\s+/g, Zx = Array.isArray, Qx = (e) => typeof e != "string" || !e ? e : e.replace(Xx, " ").trim(), $x = (e) => {
	let t = e.length;
	if (t === 0) return !1;
	let n = e.charCodeAt(0), r = e.charCodeAt(t - 1);
	if (n === 32 || r === 32 || n >= 9 && n <= 13 || n === 160 || r >= 9 && r <= 13 || r === 160) return !0;
	for (let n = 0; n < t; n++) {
		let r = e.charCodeAt(n);
		if (r >= 9 && r <= 13 || r === 160 || r === 32 && n + 1 < t && e.charCodeAt(n + 1) === 32) return !0;
	}
	return !1;
}, eS = (...e) => {
	let t = Yx(e);
	if (t) return $x(t) ? Qx(t) : t;
}, tS = (e) => e === !1 ? "false" : e === !0 ? "true" : e === 0 ? "0" : e, nS = (e) => {
	if (!e || typeof e != "object") return !0;
	for (let t in e) return !1;
	return !0;
}, rS = (e, t) => {
	if (e === t) return !0;
	if (!e || !t) return !1;
	let n = e, r = t, i = Object.keys(n), a = Object.keys(r);
	if (i.length !== a.length) return !1;
	for (let e = 0; e < i.length; e++) {
		let t = i[e];
		if (!a.includes(t) || n[t] !== r[t]) return !1;
	}
	return !0;
}, iS = (e, t) => {
	let n = e;
	for (let e in t) if (Object.hasOwn(t, e)) {
		let r = t[e];
		n[e] = e in n ? eS(n[e], r) : r;
	}
	return e;
}, aS = (e, t) => {
	for (let n = 0; n < e.length; n++) {
		let r = e[n];
		Zx(r) ? aS(r, t) : r && t.push(r);
	}
}, oS = (...e) => {
	let t = [];
	aS(e, t);
	let n = [];
	for (let e = 0; e < t.length; e++) t[e] && n.push(t[e]);
	return n;
}, sS = (e, t) => {
	let n = e, r = t, i = {};
	for (let e in n) {
		let t = n[e];
		if (e in r) {
			let n = r[e];
			i[e] = Zx(t) || Zx(n) ? oS(n, t) : typeof t == "object" && typeof n == "object" && t && n ? sS(t, n) : n + " " + t;
		} else i[e] = t;
	}
	for (let e in r) e in n || (i[e] = r[e]);
	return i;
}, cS = {
	twMerge: !0,
	twMergeConfig: {}
}, lS = 256, uS = 128, dS = /* @__PURE__ */ Symbol("tv-cache-miss"), fS = (e) => e?.class != null && e.class !== "" || e?.className != null && e.className !== "", pS = (e) => {
	if (e === void 0) return "";
	if (e === null) return "null";
	if (typeof e == "string") return e;
	if (typeof e == "boolean") return e ? "true" : "false";
	if (typeof e == "number") return e === 0 ? "0" : String(e);
	if (typeof e == "bigint") return String(e);
	let t = tS(e), n = typeof t;
	if (n === "string" || n === "number" || n === "boolean" || n === "bigint") return String(t);
	if (n === "object") try {
		return JSON.stringify(t);
	} catch {
		return null;
	}
	return null;
}, mS = (e, t) => {
	if (t === void 0) return e;
	if (t === null) return e + "null";
	let n = typeof t;
	if (n === "string" || n === "number" || n === "boolean" || n === "bigint") return e + String(t);
	if (Array.isArray(t)) return e + t.join("\0");
	try {
		return e + JSON.stringify(t);
	} catch {
		return e + "?";
	}
}, hS = (e, t, n, r) => {
	let i = "", a = /* @__PURE__ */ Object.create(null);
	for (let r = 0; r < e.length; r++) {
		let o = e[r];
		a[o] = 1;
		let s = t[o];
		n && n[o] !== void 0 && (s = n[o]);
		let c = pS(s);
		if (c === null) return null;
		i += o + ":" + c + ";";
	}
	let o = [];
	for (let e in t) e === "class" || e === "className" || a[e] || (a[e] = 1, o.push(e));
	if (n) for (let e in n) e === "class" || e === "className" || a[e] || n[e] === void 0 || (a[e] = 1, o.push(e));
	o.length > 1 && o.sort();
	for (let e = 0; e < o.length; e++) {
		let r = o[e], a = t[r];
		n && n[r] !== void 0 && (a = n[r]);
		let s = pS(a);
		if (s === null) return null;
		i += r + ":" + s + ";";
	}
	return i;
}, gS = (e, t) => {
	let n = "";
	for (let t = 0; t < e.length; t++) {
		let { conditionKeys: r, source: i } = e[t];
		for (let e = 0; e < r.length; e++) {
			let t = r[e];
			n += t + "=", n = mS(n, i[t]), n += ",";
		}
		n += "c=", n = mS(n, i.class), n += "|cn=", n = mS(n, i.className), n += ";";
	}
	for (let e = 0; e < t.length; e++) {
		let { conditionKeys: r, source: i } = t[e];
		for (let e = 0; e < r.length; e++) {
			let t = r[e];
			n += t + "=", n = mS(n, i[t]), n += ",";
		}
		Array.isArray(i.slots) && (n += "slots=" + i.slots.join(",") + ","), n += "c=", n = mS(n, i.class), n += "|cn=", n = mS(n, i.className), n += ";";
	}
	return n;
}, _S = (e = lS) => {
	let t = /* @__PURE__ */ new Map(), n = null;
	return {
		get(e) {
			if (t.has(e)) return t.get(e);
			if (n?.has(e)) {
				let r = n.get(e);
				return t.set(e, r), r;
			}
			return dS;
		},
		set(r, i) {
			t.size >= e && (n = t, t = /* @__PURE__ */ new Map()), t.set(r, i);
		}
	};
}, vS = (e = lS) => {
	let t = _S(e);
	return {
		get(e) {
			return t.get(e);
		},
		set(e, n) {
			t.set(e, n);
		}
	};
}, yS = (e = uS) => {
	let t = /* @__PURE__ */ new Map(), n = null, r = 0;
	return {
		get(e, i) {
			let a = t.get(e);
			if (a) {
				let e = a.get(i);
				if (e !== void 0 || a.has(i)) return e;
			}
			if (n) {
				let a = n.get(e);
				if (a) {
					let n = a.get(i);
					if (n !== void 0 || a.has(i)) {
						let a = t.get(e);
						return a || (a = /* @__PURE__ */ new Map(), t.set(e, a)), a.has(i) || r++, a.set(i, n), n;
					}
				}
			}
			return dS;
		},
		set(i, a, o) {
			r >= e && (n = t, t = /* @__PURE__ */ new Map(), r = 0);
			let s = t.get(i);
			s || (s = /* @__PURE__ */ new Map(), t.set(i, s)), s.has(a) || r++, s.set(a, o);
		}
	};
}, bS = (e, t) => {
	let n = null;
	return (r, i) => {
		if (!fS(i)) return r;
		let a = i.class, o = i.className;
		if (a != null && a !== "" && typeof a != "string" || o != null && o !== "" && typeof o != "string") return e(t, r, a, o);
		n ??= yS();
		let s = r ?? "", c = (typeof a == "string" ? a : "") + "\0" + (typeof o == "string" ? o : ""), l = n.get(s, c);
		if (l !== dS) return l;
		let u = e(t, r, a, o);
		return n.set(s, c, u), u;
	};
};
function xS() {
	let e = null, t = {}, n = !1;
	return {
		get cachedTwMerge() {
			return e;
		},
		set cachedTwMerge(t) {
			e = t;
		},
		get cachedTwMergeConfig() {
			return t;
		},
		set cachedTwMergeConfig(e) {
			t = e;
		},
		get didTwMergeConfigChange() {
			return n;
		},
		set didTwMergeConfigChange(e) {
			n = e;
		},
		reset() {
			e = null, t = {}, n = !1;
		}
	};
}
var SS = xS(), CS = (e) => {
	!nS(e.twMergeConfig) && !rS(e.twMergeConfig, SS.cachedTwMergeConfig) && (SS.didTwMergeConfigChange = !0, SS.cachedTwMergeConfig = e.twMergeConfig);
}, wS = (e, t) => {
	let n = [];
	for (let r = 0; r < t.length; r++) {
		let i = t[r], a = e[i];
		n.push({
			key: i,
			values: a,
			isEmpty: nS(a)
		});
	}
	return n;
}, TS = (e) => {
	if (!Array.isArray(e) || e.length === 0) return [];
	let t = [];
	for (let n = 0; n < e.length; n++) {
		let r = e[n], i = [];
		for (let e in r) e !== "class" && e !== "className" && i.push(e);
		t.push({
			conditionKeys: i,
			source: r
		});
	}
	return t;
}, ES = (e) => {
	if (!Array.isArray(e) || e.length === 0) return [];
	let t = [];
	for (let n = 0; n < e.length; n++) {
		let r = e[n], i = [];
		for (let e in r) e !== "slots" && e !== "class" && e !== "className" && i.push(e);
		t.push({
			conditionKeys: i,
			source: r
		});
	}
	return t;
}, DS = (e) => {
	let t = {};
	for (let n = 0; n < e.length; n++) {
		let r = e[n], i = r.source.slots;
		if (Array.isArray(i)) for (let e = 0; e < i.length; e++) {
			let n = i[e];
			t[n] || (t[n] = []), t[n].push(r);
		}
	}
	return t;
}, OS = (e, t) => {
	let { extend: n = null, slots: r = {}, variants: i = {}, compoundVariants: a = [], compoundSlots: o = [], defaultVariants: s = {} } = e, c = {
		...cS,
		...t
	}, l = e.slots !== void 0, u = n?.base ? eS(n.base, e?.base) : e?.base, d = n?.variants && !nS(n.variants) ? sS(i, n.variants) : i, f = n?.defaultVariants && !nS(n.defaultVariants) ? {
		...n.defaultVariants,
		...s
	} : s;
	CS(c);
	let p = !n?.slots || nS(n.slots), m = l ? p && n?.base ? eS(e?.base, n.base) : typeof e?.base == "string" || e?.base == null ? e.base : eS(e.base) : void 0, h = l ? {
		base: m,
		...r
	} : {}, g = p ? h : iS({ ...n?.slots }, nS(h) ? { base: e?.base } : h), _ = !n?.compoundVariants || nS(n.compoundVariants) ? a : oS(n?.compoundVariants, a), v = !n?.compoundSlots || nS(n.compoundSlots) ? o : oS(n?.compoundSlots, o), y = Object.keys(d);
	return {
		config: c,
		extend: n,
		base: u,
		variants: d,
		defaultVariants: f,
		slots: g,
		compoundVariants: _,
		compoundSlots: v,
		compiledVariants: null,
		compiledCompoundVariants: null,
		compiledCompoundSlots: null,
		compiledCompoundSlotsBySlot: null,
		deferredError: _ && !Array.isArray(_) ? /* @__PURE__ */ TypeError(`The "compoundVariants" prop must be an array. Received: ${typeof _}`) : v && !Array.isArray(v) ? /* @__PURE__ */ TypeError(`The "compoundSlots" prop must be an array. Received: ${typeof v}`) : null,
		mode: l || !p ? "slots" : y.length === 0 ? "plain" : "variants",
		slotKeys: null,
		variantKeys: y
	};
}, kS = (e) => (e.compiledVariants === null && (e.compiledVariants = wS(e.variants, e.variantKeys), e.compiledCompoundVariants = TS(e.compoundVariants), e.compiledCompoundSlots = ES(e.compoundSlots), e.compiledCompoundSlotsBySlot = DS(e.compiledCompoundSlots), e.slotKeys = e.slots && typeof e.slots == "object" ? Object.keys(e.slots) : []), e), AS = [], jS = [], MS = [], NS = [], PS = [], FS = (e, t, n) => {
	let r = {};
	for (let t in e) r[t] = e[t];
	if (t) for (let e in t) t[e] !== void 0 && (r[e] = t[e]);
	if (n) for (let e in n) n[e] !== void 0 && (r[e] = n[e]);
	return r;
}, IS = (e) => e == null || e === !1, LS = (e, t) => {
	if (!Array.isArray(e)) return e === t || IS(e) && IS(t);
	for (let n = 0; n < e.length; n++) {
		let r = e[n];
		if (r === t || IS(r) && IS(t)) return !0;
	}
	return !1;
}, RS = (e, t, n, r) => {
	if (e.isEmpty) return null;
	let i = r?.[e.key] ?? n?.[e.key];
	if (i === null) return null;
	let a = tS(i);
	if (typeof a == "object") return null;
	let o = t?.[e.key], s = a ?? tS(o);
	return e.values[s || "false"];
}, zS = (e, t) => {
	let { conditionKeys: n, source: r } = e;
	for (let e = 0; e < n.length; e++) {
		let i = n[e];
		if (!LS(r[i], t[i])) return !1;
	}
	return !0;
}, BS = (e, t, n) => {
	typeof n == "string" ? t === "base" && e.push(n) : n && typeof n == "object" && n[t] && e.push(n[t]);
}, VS = (e, t, n) => {
	let r = jS;
	r.length = 0;
	for (let i = 0; i < e.length; i++) {
		let a = RS(e[i], t, n);
		a && r.push(a);
	}
	return r;
}, HS = (e, t, n, r, i) => {
	let a = jS;
	a.length = 0;
	for (let o = 0; o < t.length; o++) {
		let s = RS(t[o], n, r, i), c = e === "base" && typeof s == "string" ? s : s && s[e];
		c && a.push(c);
	}
	return a;
}, US = (e, t) => {
	let n = MS;
	n.length = 0;
	for (let r = 0; r < e.length; r++) {
		let i = e[r];
		zS(i, t) && (i.source.class && n.push(i.source.class), i.source.className && n.push(i.source.className));
	}
	return n;
}, WS = (e, t, n) => {
	let r = NS;
	r.length = 0;
	for (let i = 0; i < t.length; i++) {
		let a = t[i];
		zS(a, n) && (BS(r, e, a.source.class), BS(r, e, a.source.className));
	}
	return r;
}, GS = (e, t) => {
	let n = PS;
	n.length = 0;
	for (let r = 0; r < e.length; r++) {
		let i = e[r];
		zS(i, t) && (i.source.class && n.push(i.source.class), i.source.className && n.push(i.source.className));
	}
	return n;
}, KS = (e, t) => {
	let { base: n, config: r } = e, i = dS, a = bS(t, r);
	return ((e) => (i === dS && (i = t(r, n)), a(i, e)));
}, qS = (e, t) => {
	let { base: n, config: r, defaultVariants: i, deferredError: a, variantKeys: o } = e, s = e.compiledCompoundVariants, c = e.compiledVariants, l = AS, u = null, d = bS(t, r), f = 1, p = (e) => {
		let a = s.length > 0 ? US(s, FS(i, e)) : void 0;
		return t(r, n, VS(c, i, e), a);
	};
	return ((t) => {
		if (a) throw a;
		(c === null || s === null) && (kS(e), c = e.compiledVariants, s = e.compiledCompoundVariants, l = e.compiledCompoundSlots ?? AS);
		let n;
		if (f > 0) f--, n = p(t);
		else {
			u ??= vS();
			let e = hS(o, i, t);
			if (e !== null) {
				let r = s.length > 0 || l.length > 0 ? gS(s, l) : "", i = e + "#" + r, a = u.get(i);
				a === dS ? (n = p(t), u.set(i, n)) : n = a;
			} else n = p(t);
		}
		return d(n, t);
	});
}, JS = (e, t) => {
	let { config: n, defaultVariants: r, deferredError: i, slots: a, variantKeys: o } = e, s = null, c = null, l = null, u = null, d = !1, f = null, p = null, m = 1, h = () => {
		if (l !== null) return;
		(e.compiledVariants === null || e.compiledCompoundVariants === null || e.compiledCompoundSlots === null || e.compiledCompoundSlotsBySlot === null || e.slotKeys === null) && kS(e);
		let i = e.compiledVariants;
		s = e.compiledCompoundVariants, c = e.compiledCompoundSlots;
		let o = e.compiledCompoundSlotsBySlot;
		l = e.slotKeys, d = s.length > 0 || c.length > 0, f = bS(t, n);
		let p = Array(l.length);
		for (let e = 0; e < l.length; e++) {
			let c = l[e], u = o[c] ?? AS;
			p[e] = (e, o) => {
				let l = d ? FS(r, e, o) : void 0, f = l ? WS(c, s, l) : void 0, p = l ? GS(u, l) : void 0;
				return t(n, a[c], HS(c, i, r, e, o), f, p);
			};
		}
		u = p;
	}, g = (e) => {
		let t = l, n = u, r = f, i = {};
		for (let a = 0; a < t.length; a++) {
			let o = n[a], s = o(e);
			i[t[a]] = (t) => {
				if (t == null) return s;
				let n = !1;
				for (let e in t) if (e !== "class" && e !== "className" && t[e] !== void 0) {
					n = !0;
					break;
				}
				return r(n ? o(e, t) : s, t);
			};
		}
		return i;
	};
	return ((e) => {
		if (i) throw i;
		if (h(), m > 0) return m--, g(e);
		let t = hS(o, r, e);
		if (t === null) return g(e);
		let n = d ? gS(s, c) : "", a = t + "#" + n;
		p ??= _S();
		let l = p.get(a);
		if (l !== dS) return l;
		let u = g(e);
		return p.set(a, u), u;
	});
}, YS = (e, t) => {
	if (e.mode === "plain") return KS(e, t);
	let n;
	return ((r) => (n ??= e.mode === "slots" ? JS(e, t) : qS(e, t), n(r)));
}, XS = (e, t) => {
	e.variantKeys = t.variantKeys, e.extend = t.extend, e.base = t.base, e.slots = t.slots, e.variants = t.variants, e.defaultVariants = t.defaultVariants, e.compoundSlots = t.compoundSlots, e.compoundVariants = t.compoundVariants;
}, ZS = (e) => {
	let t = (t, n) => {
		let r = OS(t, n), i = YS(r, e);
		return XS(i, r), i;
	};
	return {
		tv: t,
		createTV: (e) => (n, r) => t(n, r ? sS(e, r) : e)
	};
}, QS = (e, t) => {
	let n = e.length, r = t.length, i = Array(n + r);
	for (let t = 0; t < n; t++) i[t] = e[t];
	for (let e = 0; e < r; e++) i[n + e] = t[e];
	return i;
}, $S = (e, t) => ({
	classGroupId: e,
	validator: t
}), eC = (e = /* @__PURE__ */ new Map(), t = null, n) => ({
	nextPart: e,
	validators: t,
	classGroupId: n
}), tC = "-", nC = [], rC = "arbitrary..", iC = (e) => {
	let t = sC(e), { conflictingClassGroups: n, conflictingClassGroupModifiers: r } = e;
	return {
		getClassGroupId: (e) => {
			if (e[0] === "[" && e[e.length - 1] === "]") return oC(e);
			let n = e.split(tC);
			return aC(n, +(n[0] === "" && n.length > 1), t);
		},
		getConflictingClassGroupIds: (e, t) => {
			if (t) {
				let t = r[e], i = n[e];
				return t ? i ? QS(i, t) : t : i || nC;
			}
			return n[e] || nC;
		}
	};
}, aC = (e, t, n) => {
	if (e.length - t === 0) return n.classGroupId;
	let r = e[t], i = n.nextPart.get(r);
	if (i) {
		let n = aC(e, t + 1, i);
		if (n) return n;
	}
	let a = n.validators;
	if (a === null) return;
	let o = t === 0 ? e.join(tC) : e.slice(t).join(tC), s = a.length;
	for (let e = 0; e < s; e++) {
		let t = a[e];
		if (t.validator(o)) return t.classGroupId;
	}
}, oC = (e) => {
	let t = e.slice(1, -1), n = t.indexOf(":");
	if (n === -1) return;
	let r = t.slice(0, n);
	return r ? rC + r : void 0;
}, sC = (e) => {
	let { theme: t, classGroups: n } = e;
	return cC(n, t);
}, cC = (e, t) => {
	let n = eC();
	for (let r in e) {
		let i = e[r];
		lC(i, n, r, t);
	}
	return n;
}, lC = (e, t, n, r) => {
	let i = e.length;
	for (let a = 0; a < i; a++) {
		let i = e[a];
		uC(i, t, n, r);
	}
}, uC = (e, t, n, r) => {
	typeof e == "string" ? dC(e, t, n) : typeof e == "function" ? fC(e, t, n, r) : pC(e, t, n, r);
}, dC = (e, t, n) => {
	let r = e === "" ? t : mC(t, e);
	r.classGroupId = n;
}, fC = (e, t, n, r) => {
	hC(e) ? lC(e(r), t, n, r) : (t.validators === null && (t.validators = []), t.validators.push($S(n, e)));
}, pC = (e, t, n, r) => {
	let i = Object.entries(e), a = i.length;
	for (let e = 0; e < a; e++) {
		let [a, o] = i[e];
		lC(o, mC(t, a), n, r);
	}
}, mC = (e, t) => {
	let n = e, r = t.split(tC), i = r.length;
	for (let e = 0; e < i; e++) {
		let t = r[e], i = n.nextPart.get(t);
		i || (i = eC(), n.nextPart.set(t, i)), n = i;
	}
	return n;
}, hC = (e) => "isThemeGetter" in e && e.isThemeGetter === !0, gC = "!", _C = 58, vC = 47, yC = 91, bC = 93, xC = 40, SC = 41, CC = 33, wC = (e, t, n, r) => ({
	modifiers: e,
	hasImportantModifier: t,
	baseClassName: n,
	maybePostfixModifierPosition: r,
	isExternal: void 0
}), TC = (e) => {
	let t = [], n = 0, r = 0, i = 0, a, o = e.length;
	for (let s = 0; s < o; s++) {
		let o = e.charCodeAt(s);
		if (n === 0 && r === 0) {
			if (o === _C) {
				t.push(e.slice(i, s)), i = s + 1;
				continue;
			}
			if (o === vC) {
				a = s;
				continue;
			}
		}
		o === yC ? n++ : o === bC ? n-- : o === xC ? r++ : o === SC && r--;
	}
	let s = t.length === 0 ? e : e.slice(i), c = s, l = !1, u = s.length - 1;
	s.charCodeAt(u) === CC ? (c = s.slice(0, -1), l = !0) : s.charCodeAt(0) === CC && (c = s.slice(1), l = !0);
	let d = a && a > i ? a - i : void 0;
	return wC(t, l, c, d);
}, EC = (e) => {
	let t = new Set(e.orderSensitiveModifiers);
	return (e) => {
		let n = [], r = [];
		for (let i = 0; i < e.length; i++) {
			let a = e[i], o = a[0] === "[", s = t.has(a);
			if (o || s) {
				if (r.length > 0) {
					r.sort();
					for (let e = 0; e < r.length; e++) n.push(r[e]);
					r = [];
				}
				n.push(a);
			} else r.push(a);
		}
		if (r.length > 0) {
			r.sort();
			for (let e = 0; e < r.length; e++) n.push(r[e]);
		}
		return n;
	};
}, DC = {
	isExternal: !0,
	classId: -1,
	conflictIds: []
}, OC = 4096, kC = 16384, AC = (e) => {
	let t = EC(e), n = jC(e), { getClassGroupId: r, getConflictingClassGroupIds: i } = iC(e), a = /* @__PURE__ */ Object.create(null), o = /* @__PURE__ */ Object.create(null), s = 0, c = /* @__PURE__ */ new Int32Array(256), l = 0, u = /* @__PURE__ */ new Uint8Array(64), d = !1, f = (e) => {
		let t = [], n = e.length, r = -1;
		d = !1;
		for (let i = 0; i < n; i++) {
			let n = e.charCodeAt(i);
			n === 32 ? r !== -1 && (t.push(e.slice(r, i)), r = -1) : n >= 9 && n <= 13 ? (d = !0, r !== -1 && (t.push(e.slice(r, i)), r = -1)) : r === -1 && (r = i);
		}
		return r !== -1 && t.push(e.slice(r)), t;
	}, p = /* @__PURE__ */ new Map(), m = 0, h = (e) => {
		let t = p.get(e);
		if (t === void 0 && (t = m++, p.set(e, t), t >= c.length)) {
			let e = new Int32Array(c.length * 2);
			e.set(c), c = e;
		}
		return t;
	}, g = (e) => {
		let { isExternal: a, modifiers: o, hasImportantModifier: s, baseClassName: c, maybePostfixModifierPosition: l } = TC(e);
		if (a) return DC;
		let u = !!l, d;
		if (u) {
			let e = c.substring(0, l);
			d = r(e);
			let t = d && n[d] ? r(c) : void 0;
			t && t !== d && (d = t, u = !1);
		} else d = r(c);
		if (!d) {
			if (!u || (d = r(c), !d)) return DC;
			u = !1;
		}
		let f = o.length === 0 ? "" : o.length === 1 ? o[0] : t(o).join(":"), p = s ? f + gC : f, m = i(d, u), g = [];
		for (let e = 0; e < m.length; e++) g.push(h(p + m[e]));
		return {
			isExternal: !1,
			classId: h(p + d),
			conflictIds: g
		};
	}, _ = (e) => {
		let t = a[e];
		return t === void 0 && (t = o[e], t === void 0 && (t = g(e)), a[e] = t, ++s > OC && (s = 0, o = a, a = /* @__PURE__ */ Object.create(null))), t;
	};
	return {
		parseClassName: TC,
		sortModifiers: t,
		postfixLookupClassGroupIds: n,
		getClassGroupId: r,
		getConflictingClassGroupIds: i,
		getClassDescriptor: _,
		mergeClassList: (e) => {
			let t = f(e), n = t.length;
			if (n === 1) return t[0];
			m > kC && (p.clear(), m = 0, a = /* @__PURE__ */ Object.create(null), o = /* @__PURE__ */ Object.create(null), s = 0), l = l + 1 | 0, l === 0 && (l = 1);
			let r = l;
			if (n > u.length) {
				let e = u.length;
				for (; e < n;) e *= 2;
				u = new Uint8Array(e);
			}
			let i = !1, h = 0;
			for (let e = n - 1; e >= 0; --e) {
				let n = t[e];
				h += n.length;
				let a = _(n);
				if (a.isExternal) {
					u[e] = 1;
					continue;
				}
				let o = a.classId;
				if (c[o] === r) {
					u[e] = 0, i = !0;
					continue;
				}
				c[o] = r;
				let s = a.conflictIds;
				for (let e = 0; e < s.length; e++) c[s[e]] = r;
				u[e] = 1;
			}
			if (!i && !d && e.length === h + n - 1) return e;
			let g = "";
			for (let e = 0; e < n; e++) u[e] === 1 && (g && (g += " "), g += t[e]);
			return g;
		}
	};
}, jC = (e) => {
	let t = /* @__PURE__ */ Object.create(null), n = e.postfixLookupClassGroups;
	if (n) for (let e = 0; e < n.length; e++) t[n[e]] = !0;
	return t;
}, MC = 500, NC = (e) => {
	let t, n, r = /* @__PURE__ */ Object.create(null), i = /* @__PURE__ */ Object.create(null), a = 0, o = (r) => (t = AC(e()), n = t.mergeClassList, c.mergeString = s, s(r)), s = (e) => {
		let t = r[e];
		return t === void 0 && (t = i[e], t === void 0 && (t = n(e)), r[e] = t, ++a > MC && (a = 0, i = r, r = /* @__PURE__ */ Object.create(null))), t;
	}, c = (...e) => c.mergeString(Yx(e));
	return c.mergeString = o, c;
}, PC = [], FC = (e) => {
	let t = (t) => t[e] || PC;
	return t.isThemeGetter = !0, t;
}, IC = /^\[(?:(\w[\w-]*):)?(.+)\]$/i, LC = /^\((?:(\w[\w-]*):)?(.+)\)$/i, RC = /^\d+(?:\.\d+)?\/\d+(?:\.\d+)?$/, zC = /^(\d+(\.\d+)?)?(xs|sm|md|lg|xl)$/, BC = /\d+(%|px|r?em|[sdl]?v([hwib]|min|max)|pt|pc|in|cm|mm|cap|ch|ex|r?lh|cq(w|h|i|b|min|max))|\b(calc|min|max|clamp)\(.+\)|^0$/, VC = /^(rgba?|hsla?|hwb|(ok)?(lab|lch)|color-mix)\(.+\)$/, HC = /^(inset_)?-?((\d+)?\.?(\d+)[a-z]+|0)_-?((\d+)?\.?(\d+)[a-z]+|0)/, UC = /^(url|image|image-set|cross-fade|element|(repeating-)?(linear|radial|conic)-gradient)\(.+\)$/, WC = Number, GC = Number.isNaN, KC = Number.isInteger, qC = (e) => RC.test(e), JC = (e) => !!e && !GC(WC(e)), YC = (e) => !!e && KC(WC(e)), XC = (e) => e.endsWith("%") && JC(e.slice(0, -1)), ZC = (e) => zC.test(e), QC = () => !0, $C = (e) => BC.test(e) && !VC.test(e), ew = () => !1, tw = (e) => HC.test(e), nw = (e) => UC.test(e), rw = (e) => !Q(e) && !$(e), iw = (e) => e.startsWith("@container") && (e[10] === "/" && e[11] !== void 0 || e[11] === "s" && e[16] !== void 0 && e.startsWith("-size/", 10) || e[11] === "n" && e[18] !== void 0 && e.startsWith("-normal/", 10)), aw = (e) => bw(e, ww, ew), Q = (e) => IC.test(e), ow = (e) => bw(e, Tw, $C), sw = (e) => bw(e, Ew, JC), cw = (e) => bw(e, Ow, QC), lw = (e) => bw(e, Dw, ew), uw = (e) => bw(e, Sw, ew), dw = (e) => bw(e, Cw, nw), fw = (e) => bw(e, kw, tw), $ = (e) => LC.test(e), pw = (e) => xw(e, Tw), mw = (e) => xw(e, Dw), hw = (e) => xw(e, Sw), gw = (e) => xw(e, ww), _w = (e) => xw(e, Cw), vw = (e) => xw(e, kw, !0), yw = (e) => xw(e, Ow, !0), bw = (e, t, n) => {
	let r = IC.exec(e);
	return r ? r[1] ? t(r[1]) : n(r[2]) : !1;
}, xw = (e, t, n = !1) => {
	let r = LC.exec(e);
	return r ? r[1] ? t(r[1]) : n : !1;
}, Sw = (e) => e === "position" || e === "percentage", Cw = (e) => e === "image" || e === "url", ww = (e) => e === "length" || e === "size" || e === "bg-size", Tw = (e) => e === "length", Ew = (e) => e === "number", Dw = (e) => e === "family-name", Ow = (e) => e === "number" || e === "weight", kw = (e) => e === "shadow", Aw = () => {
	let e = FC("color"), t = FC("font"), n = FC("text"), r = FC("font-weight"), i = FC("tracking"), a = FC("leading"), o = FC("breakpoint"), s = FC("container"), c = FC("spacing"), l = FC("radius"), u = FC("shadow"), d = FC("inset-shadow"), f = FC("text-shadow"), p = FC("drop-shadow"), m = FC("blur"), h = FC("perspective"), g = FC("aspect"), _ = FC("ease"), v = FC("animate"), y = () => [
		"auto",
		"avoid",
		"all",
		"avoid-page",
		"page",
		"left",
		"right",
		"column"
	], b = () => [
		"center",
		"top",
		"bottom",
		"left",
		"right",
		"top-left",
		"left-top",
		"top-right",
		"right-top",
		"bottom-right",
		"right-bottom",
		"bottom-left",
		"left-bottom"
	], x = () => [
		...b(),
		$,
		Q
	], S = () => [
		"auto",
		"hidden",
		"clip",
		"visible",
		"scroll"
	], C = () => [
		"auto",
		"contain",
		"none"
	], w = () => [
		$,
		Q,
		c
	], T = () => [
		qC,
		"full",
		"auto",
		...w()
	], E = () => [
		YC,
		"none",
		"subgrid",
		$,
		Q
	], ee = () => [
		"auto",
		{ span: [
			"full",
			YC,
			$,
			Q
		] },
		YC,
		$,
		Q
	], D = () => [
		YC,
		"auto",
		$,
		Q
	], te = () => [
		"auto",
		"min",
		"max",
		"fr",
		$,
		Q
	], ne = () => [
		"start",
		"end",
		"center",
		"between",
		"around",
		"evenly",
		"stretch",
		"baseline",
		"center-safe",
		"end-safe"
	], re = () => [
		"start",
		"end",
		"center",
		"stretch",
		"center-safe",
		"end-safe"
	], O = () => ["auto", ...w()], k = () => [
		qC,
		"auto",
		"full",
		"dvw",
		"dvh",
		"lvw",
		"lvh",
		"svw",
		"svh",
		"min",
		"max",
		"fit",
		...w()
	], ie = () => [
		qC,
		"screen",
		"full",
		"dvw",
		"lvw",
		"svw",
		"min",
		"max",
		"fit",
		...w()
	], ae = () => [
		qC,
		"screen",
		"full",
		"lh",
		"dvh",
		"lvh",
		"svh",
		"min",
		"max",
		"fit",
		...w()
	], A = () => [
		e,
		$,
		Q
	], oe = () => [
		...b(),
		hw,
		uw,
		{ position: [$, Q] }
	], se = () => ["no-repeat", { repeat: [
		"",
		"x",
		"y",
		"space",
		"round"
	] }], ce = () => [
		"auto",
		"cover",
		"contain",
		gw,
		aw,
		{ size: [$, Q] }
	], j = () => [
		XC,
		pw,
		ow
	], le = () => [
		"",
		"none",
		"full",
		l,
		$,
		Q
	], ue = () => [
		"",
		JC,
		pw,
		ow
	], M = () => [
		"solid",
		"dashed",
		"dotted",
		"double"
	], de = () => [
		"normal",
		"multiply",
		"screen",
		"overlay",
		"darken",
		"lighten",
		"color-dodge",
		"color-burn",
		"hard-light",
		"soft-light",
		"difference",
		"exclusion",
		"hue",
		"saturation",
		"color",
		"luminosity"
	], N = () => [
		JC,
		XC,
		hw,
		uw
	], fe = () => [
		"",
		"none",
		m,
		$,
		Q
	], pe = () => [
		"none",
		JC,
		$,
		Q
	], me = () => [
		"none",
		JC,
		$,
		Q
	], he = () => [
		JC,
		$,
		Q
	], ge = () => [
		qC,
		"full",
		...w()
	];
	return {
		theme: {
			animate: [
				"spin",
				"ping",
				"pulse",
				"bounce"
			],
			aspect: ["video"],
			blur: [ZC],
			breakpoint: [ZC],
			color: [QC],
			container: [ZC],
			"drop-shadow": [ZC],
			ease: [
				"in",
				"out",
				"in-out"
			],
			font: [rw],
			"font-weight": [
				"thin",
				"extralight",
				"light",
				"normal",
				"medium",
				"semibold",
				"bold",
				"extrabold",
				"black"
			],
			"inset-shadow": [ZC],
			leading: [
				"none",
				"tight",
				"snug",
				"normal",
				"relaxed",
				"loose"
			],
			perspective: [
				"dramatic",
				"near",
				"normal",
				"midrange",
				"distant",
				"none"
			],
			radius: [ZC],
			shadow: [ZC],
			spacing: ["px", JC],
			text: [ZC],
			"text-shadow": [ZC],
			tracking: [
				"tighter",
				"tight",
				"normal",
				"wide",
				"wider",
				"widest"
			]
		},
		classGroups: {
			aspect: [{ aspect: [
				"auto",
				"square",
				qC,
				Q,
				$,
				g
			] }],
			container: ["container"],
			"container-type": [{ "@container": [
				"",
				"normal",
				"size",
				$,
				Q
			] }],
			"container-named": [iw],
			columns: [{ columns: [
				JC,
				Q,
				$,
				s
			] }],
			"break-after": [{ "break-after": y() }],
			"break-before": [{ "break-before": y() }],
			"break-inside": [{ "break-inside": [
				"auto",
				"avoid",
				"avoid-page",
				"avoid-column"
			] }],
			"box-decoration": [{ "box-decoration": ["slice", "clone"] }],
			box: [{ box: ["border", "content"] }],
			display: [
				"block",
				"inline-block",
				"inline",
				"flex",
				"inline-flex",
				"table",
				"inline-table",
				"table-caption",
				"table-cell",
				"table-column",
				"table-column-group",
				"table-footer-group",
				"table-header-group",
				"table-row-group",
				"table-row",
				"flow-root",
				"grid",
				"inline-grid",
				"contents",
				"list-item",
				"hidden"
			],
			sr: ["sr-only", "not-sr-only"],
			float: [{ float: [
				"right",
				"left",
				"none",
				"start",
				"end"
			] }],
			clear: [{ clear: [
				"left",
				"right",
				"both",
				"none",
				"start",
				"end"
			] }],
			isolation: ["isolate", "isolation-auto"],
			"object-fit": [{ object: [
				"contain",
				"cover",
				"fill",
				"none",
				"scale-down"
			] }],
			"object-position": [{ object: x() }],
			overflow: [{ overflow: S() }],
			"overflow-x": [{ "overflow-x": S() }],
			"overflow-y": [{ "overflow-y": S() }],
			overscroll: [{ overscroll: C() }],
			"overscroll-x": [{ "overscroll-x": C() }],
			"overscroll-y": [{ "overscroll-y": C() }],
			position: [
				"static",
				"fixed",
				"absolute",
				"relative",
				"sticky"
			],
			inset: [{ inset: T() }],
			"inset-x": [{ "inset-x": T() }],
			"inset-y": [{ "inset-y": T() }],
			start: [{
				"inset-s": T(),
				start: T()
			}],
			end: [{
				"inset-e": T(),
				end: T()
			}],
			"inset-bs": [{ "inset-bs": T() }],
			"inset-be": [{ "inset-be": T() }],
			top: [{ top: T() }],
			right: [{ right: T() }],
			bottom: [{ bottom: T() }],
			left: [{ left: T() }],
			visibility: [
				"visible",
				"invisible",
				"collapse"
			],
			z: [{ z: [
				YC,
				"auto",
				$,
				Q
			] }],
			basis: [{ basis: [
				qC,
				"full",
				"auto",
				s,
				...w()
			] }],
			"flex-direction": [{ flex: [
				"row",
				"row-reverse",
				"col",
				"col-reverse"
			] }],
			"flex-wrap": [{ flex: [
				"nowrap",
				"wrap",
				"wrap-reverse"
			] }],
			flex: [{ flex: [
				JC,
				qC,
				"auto",
				"initial",
				"none",
				Q
			] }],
			grow: [{ grow: [
				"",
				JC,
				$,
				Q
			] }],
			shrink: [{ shrink: [
				"",
				JC,
				$,
				Q
			] }],
			order: [{ order: [
				YC,
				"first",
				"last",
				"none",
				$,
				Q
			] }],
			"grid-cols": [{ "grid-cols": E() }],
			"col-start-end": [{ col: ee() }],
			"col-start": [{ "col-start": D() }],
			"col-end": [{ "col-end": D() }],
			"grid-rows": [{ "grid-rows": E() }],
			"row-start-end": [{ row: ee() }],
			"row-start": [{ "row-start": D() }],
			"row-end": [{ "row-end": D() }],
			"grid-flow": [{ "grid-flow": [
				"row",
				"col",
				"dense",
				"row-dense",
				"col-dense"
			] }],
			"auto-cols": [{ "auto-cols": te() }],
			"auto-rows": [{ "auto-rows": te() }],
			gap: [{ gap: w() }],
			"gap-x": [{ "gap-x": w() }],
			"gap-y": [{ "gap-y": w() }],
			"justify-content": [{ justify: [...ne(), "normal"] }],
			"justify-items": [{ "justify-items": [...re(), "normal"] }],
			"justify-self": [{ "justify-self": ["auto", ...re()] }],
			"align-content": [{ content: ["normal", ...ne()] }],
			"align-items": [{ items: [...re(), { baseline: ["", "last"] }] }],
			"align-self": [{ self: [
				"auto",
				...re(),
				{ baseline: ["", "last"] }
			] }],
			"place-content": [{ "place-content": ne() }],
			"place-items": [{ "place-items": [...re(), "baseline"] }],
			"place-self": [{ "place-self": ["auto", ...re()] }],
			p: [{ p: w() }],
			px: [{ px: w() }],
			py: [{ py: w() }],
			ps: [{ ps: w() }],
			pe: [{ pe: w() }],
			pbs: [{ pbs: w() }],
			pbe: [{ pbe: w() }],
			pt: [{ pt: w() }],
			pr: [{ pr: w() }],
			pb: [{ pb: w() }],
			pl: [{ pl: w() }],
			m: [{ m: O() }],
			mx: [{ mx: O() }],
			my: [{ my: O() }],
			ms: [{ ms: O() }],
			me: [{ me: O() }],
			mbs: [{ mbs: O() }],
			mbe: [{ mbe: O() }],
			mt: [{ mt: O() }],
			mr: [{ mr: O() }],
			mb: [{ mb: O() }],
			ml: [{ ml: O() }],
			"space-x": [{ "space-x": w() }],
			"space-x-reverse": ["space-x-reverse"],
			"space-y": [{ "space-y": w() }],
			"space-y-reverse": ["space-y-reverse"],
			size: [{ size: k() }],
			"inline-size": [{ inline: ["auto", ...ie()] }],
			"min-inline-size": [{ "min-inline": ["auto", ...ie()] }],
			"max-inline-size": [{ "max-inline": ["none", ...ie()] }],
			"block-size": [{ block: ["auto", ...ae()] }],
			"min-block-size": [{ "min-block": ["auto", ...ae()] }],
			"max-block-size": [{ "max-block": ["none", ...ae()] }],
			w: [{ w: [
				s,
				"screen",
				...k()
			] }],
			"min-w": [{ "min-w": [
				s,
				"screen",
				"none",
				...k()
			] }],
			"max-w": [{ "max-w": [
				s,
				"screen",
				"none",
				"prose",
				{ screen: [o] },
				...k()
			] }],
			h: [{ h: [
				"screen",
				"lh",
				...k()
			] }],
			"min-h": [{ "min-h": [
				"screen",
				"lh",
				"none",
				...k()
			] }],
			"max-h": [{ "max-h": [
				"screen",
				"lh",
				...k()
			] }],
			"font-size": [{ text: [
				"base",
				n,
				pw,
				ow
			] }],
			"font-smoothing": ["antialiased", "subpixel-antialiased"],
			"font-style": ["italic", "not-italic"],
			"font-weight": [{ font: [
				r,
				yw,
				cw
			] }],
			"font-stretch": [{ "font-stretch": [
				"ultra-condensed",
				"extra-condensed",
				"condensed",
				"semi-condensed",
				"normal",
				"semi-expanded",
				"expanded",
				"extra-expanded",
				"ultra-expanded",
				XC,
				Q
			] }],
			"font-family": [{ font: [
				mw,
				lw,
				t
			] }],
			"font-features": [{ "font-features": [Q] }],
			"fvn-normal": ["normal-nums"],
			"fvn-ordinal": ["ordinal"],
			"fvn-slashed-zero": ["slashed-zero"],
			"fvn-figure": ["lining-nums", "oldstyle-nums"],
			"fvn-spacing": ["proportional-nums", "tabular-nums"],
			"fvn-fraction": ["diagonal-fractions", "stacked-fractions"],
			tracking: [{ tracking: [
				i,
				$,
				Q
			] }],
			"line-clamp": [{ "line-clamp": [
				JC,
				"none",
				$,
				sw
			] }],
			leading: [{ leading: [a, ...w()] }],
			"list-image": [{ "list-image": [
				"none",
				$,
				Q
			] }],
			"list-style-position": [{ list: ["inside", "outside"] }],
			"list-style-type": [{ list: [
				"disc",
				"decimal",
				"none",
				$,
				Q
			] }],
			"text-alignment": [{ text: [
				"left",
				"center",
				"right",
				"justify",
				"start",
				"end"
			] }],
			"placeholder-color": [{ placeholder: A() }],
			"text-color": [{ text: A() }],
			"text-decoration": [
				"underline",
				"overline",
				"line-through",
				"no-underline"
			],
			"text-decoration-style": [{ decoration: [...M(), "wavy"] }],
			"text-decoration-thickness": [{ decoration: [
				JC,
				"from-font",
				"auto",
				$,
				ow
			] }],
			"text-decoration-color": [{ decoration: A() }],
			"underline-offset": [{ "underline-offset": [
				JC,
				"auto",
				$,
				Q
			] }],
			"text-transform": [
				"uppercase",
				"lowercase",
				"capitalize",
				"normal-case"
			],
			"text-overflow": [
				"truncate",
				"text-ellipsis",
				"text-clip"
			],
			"text-wrap": [{ text: [
				"wrap",
				"nowrap",
				"balance",
				"pretty"
			] }],
			indent: [{ indent: w() }],
			"tab-size": [{ tab: [
				YC,
				$,
				Q
			] }],
			"vertical-align": [{ align: [
				"baseline",
				"top",
				"middle",
				"bottom",
				"text-top",
				"text-bottom",
				"sub",
				"super",
				$,
				Q
			] }],
			whitespace: [{ whitespace: [
				"normal",
				"nowrap",
				"pre",
				"pre-line",
				"pre-wrap",
				"break-spaces"
			] }],
			break: [{ break: [
				"normal",
				"words",
				"all",
				"keep"
			] }],
			wrap: [{ wrap: [
				"break-word",
				"anywhere",
				"normal"
			] }],
			hyphens: [{ hyphens: [
				"none",
				"manual",
				"auto"
			] }],
			content: [{ content: [
				"none",
				$,
				Q
			] }],
			"bg-attachment": [{ bg: [
				"fixed",
				"local",
				"scroll"
			] }],
			"bg-clip": [{ "bg-clip": [
				"border",
				"padding",
				"content",
				"text"
			] }],
			"bg-origin": [{ "bg-origin": [
				"border",
				"padding",
				"content"
			] }],
			"bg-position": [{ bg: oe() }],
			"bg-repeat": [{ bg: se() }],
			"bg-size": [{ bg: ce() }],
			"bg-image": [{ bg: [
				"none",
				{
					linear: [
						{ to: [
							"t",
							"tr",
							"r",
							"br",
							"b",
							"bl",
							"l",
							"tl"
						] },
						YC,
						$,
						Q
					],
					radial: [
						"",
						$,
						Q
					],
					conic: [
						YC,
						$,
						Q
					]
				},
				_w,
				dw
			] }],
			"bg-color": [{ bg: A() }],
			"gradient-from-pos": [{ from: j() }],
			"gradient-via-pos": [{ via: j() }],
			"gradient-to-pos": [{ to: j() }],
			"gradient-from": [{ from: A() }],
			"gradient-via": [{ via: A() }],
			"gradient-to": [{ to: A() }],
			rounded: [{ rounded: le() }],
			"rounded-s": [{ "rounded-s": le() }],
			"rounded-e": [{ "rounded-e": le() }],
			"rounded-t": [{ "rounded-t": le() }],
			"rounded-r": [{ "rounded-r": le() }],
			"rounded-b": [{ "rounded-b": le() }],
			"rounded-l": [{ "rounded-l": le() }],
			"rounded-ss": [{ "rounded-ss": le() }],
			"rounded-se": [{ "rounded-se": le() }],
			"rounded-ee": [{ "rounded-ee": le() }],
			"rounded-es": [{ "rounded-es": le() }],
			"rounded-tl": [{ "rounded-tl": le() }],
			"rounded-tr": [{ "rounded-tr": le() }],
			"rounded-br": [{ "rounded-br": le() }],
			"rounded-bl": [{ "rounded-bl": le() }],
			"border-w": [{ border: ue() }],
			"border-w-x": [{ "border-x": ue() }],
			"border-w-y": [{ "border-y": ue() }],
			"border-w-s": [{ "border-s": ue() }],
			"border-w-e": [{ "border-e": ue() }],
			"border-w-bs": [{ "border-bs": ue() }],
			"border-w-be": [{ "border-be": ue() }],
			"border-w-t": [{ "border-t": ue() }],
			"border-w-r": [{ "border-r": ue() }],
			"border-w-b": [{ "border-b": ue() }],
			"border-w-l": [{ "border-l": ue() }],
			"divide-x": [{ "divide-x": ue() }],
			"divide-x-reverse": ["divide-x-reverse"],
			"divide-y": [{ "divide-y": ue() }],
			"divide-y-reverse": ["divide-y-reverse"],
			"border-style": [{ border: [
				...M(),
				"hidden",
				"none"
			] }],
			"divide-style": [{ divide: [
				...M(),
				"hidden",
				"none"
			] }],
			"border-color": [{ border: A() }],
			"border-color-x": [{ "border-x": A() }],
			"border-color-y": [{ "border-y": A() }],
			"border-color-s": [{ "border-s": A() }],
			"border-color-e": [{ "border-e": A() }],
			"border-color-bs": [{ "border-bs": A() }],
			"border-color-be": [{ "border-be": A() }],
			"border-color-t": [{ "border-t": A() }],
			"border-color-r": [{ "border-r": A() }],
			"border-color-b": [{ "border-b": A() }],
			"border-color-l": [{ "border-l": A() }],
			"divide-color": [{ divide: A() }],
			"outline-style": [{ outline: [
				...M(),
				"none",
				"hidden"
			] }],
			"outline-offset": [{ "outline-offset": [
				JC,
				$,
				Q
			] }],
			"outline-w": [{ outline: [
				"",
				JC,
				pw,
				ow
			] }],
			"outline-color": [{ outline: A() }],
			shadow: [{ shadow: [
				"",
				"none",
				u,
				vw,
				fw
			] }],
			"shadow-color": [{ shadow: A() }],
			"inset-shadow": [{ "inset-shadow": [
				"none",
				d,
				vw,
				fw
			] }],
			"inset-shadow-color": [{ "inset-shadow": A() }],
			"ring-w": [{ ring: ue() }],
			"ring-w-inset": ["ring-inset"],
			"ring-color": [{ ring: A() }],
			"ring-offset-w": [{ "ring-offset": [JC, ow] }],
			"ring-offset-color": [{ "ring-offset": A() }],
			"inset-ring-w": [{ "inset-ring": ue() }],
			"inset-ring-color": [{ "inset-ring": A() }],
			"text-shadow": [{ "text-shadow": [
				"none",
				f,
				vw,
				fw
			] }],
			"text-shadow-color": [{ "text-shadow": A() }],
			opacity: [{ opacity: [
				JC,
				$,
				Q
			] }],
			"mix-blend": [{ "mix-blend": [
				...de(),
				"plus-darker",
				"plus-lighter"
			] }],
			"bg-blend": [{ "bg-blend": de() }],
			"mask-clip": [{ "mask-clip": [
				"border",
				"padding",
				"content",
				"fill",
				"stroke",
				"view"
			] }, "mask-no-clip"],
			"mask-composite": [{ mask: [
				"add",
				"subtract",
				"intersect",
				"exclude"
			] }],
			"mask-image-linear-pos": [{ "mask-linear": [JC] }],
			"mask-image-linear-from-pos": [{ "mask-linear-from": N() }],
			"mask-image-linear-to-pos": [{ "mask-linear-to": N() }],
			"mask-image-linear-from-color": [{ "mask-linear-from": A() }],
			"mask-image-linear-to-color": [{ "mask-linear-to": A() }],
			"mask-image-t-from-pos": [{ "mask-t-from": N() }],
			"mask-image-t-to-pos": [{ "mask-t-to": N() }],
			"mask-image-t-from-color": [{ "mask-t-from": A() }],
			"mask-image-t-to-color": [{ "mask-t-to": A() }],
			"mask-image-r-from-pos": [{ "mask-r-from": N() }],
			"mask-image-r-to-pos": [{ "mask-r-to": N() }],
			"mask-image-r-from-color": [{ "mask-r-from": A() }],
			"mask-image-r-to-color": [{ "mask-r-to": A() }],
			"mask-image-b-from-pos": [{ "mask-b-from": N() }],
			"mask-image-b-to-pos": [{ "mask-b-to": N() }],
			"mask-image-b-from-color": [{ "mask-b-from": A() }],
			"mask-image-b-to-color": [{ "mask-b-to": A() }],
			"mask-image-l-from-pos": [{ "mask-l-from": N() }],
			"mask-image-l-to-pos": [{ "mask-l-to": N() }],
			"mask-image-l-from-color": [{ "mask-l-from": A() }],
			"mask-image-l-to-color": [{ "mask-l-to": A() }],
			"mask-image-x-from-pos": [{ "mask-x-from": N() }],
			"mask-image-x-to-pos": [{ "mask-x-to": N() }],
			"mask-image-x-from-color": [{ "mask-x-from": A() }],
			"mask-image-x-to-color": [{ "mask-x-to": A() }],
			"mask-image-y-from-pos": [{ "mask-y-from": N() }],
			"mask-image-y-to-pos": [{ "mask-y-to": N() }],
			"mask-image-y-from-color": [{ "mask-y-from": A() }],
			"mask-image-y-to-color": [{ "mask-y-to": A() }],
			"mask-image-radial": [{ "mask-radial": [$, Q] }],
			"mask-image-radial-from-pos": [{ "mask-radial-from": N() }],
			"mask-image-radial-to-pos": [{ "mask-radial-to": N() }],
			"mask-image-radial-from-color": [{ "mask-radial-from": A() }],
			"mask-image-radial-to-color": [{ "mask-radial-to": A() }],
			"mask-image-radial-shape": [{ "mask-radial": ["circle", "ellipse"] }],
			"mask-image-radial-size": [{ "mask-radial": [{
				closest: ["side", "corner"],
				farthest: ["side", "corner"]
			}] }],
			"mask-image-radial-pos": [{ "mask-radial-at": b() }],
			"mask-image-conic-pos": [{ "mask-conic": [JC] }],
			"mask-image-conic-from-pos": [{ "mask-conic-from": N() }],
			"mask-image-conic-to-pos": [{ "mask-conic-to": N() }],
			"mask-image-conic-from-color": [{ "mask-conic-from": A() }],
			"mask-image-conic-to-color": [{ "mask-conic-to": A() }],
			"mask-mode": [{ mask: [
				"alpha",
				"luminance",
				"match"
			] }],
			"mask-origin": [{ "mask-origin": [
				"border",
				"padding",
				"content",
				"fill",
				"stroke",
				"view"
			] }],
			"mask-position": [{ mask: oe() }],
			"mask-repeat": [{ mask: se() }],
			"mask-size": [{ mask: ce() }],
			"mask-type": [{ "mask-type": ["alpha", "luminance"] }],
			"mask-image": [{ mask: [
				"none",
				$,
				Q
			] }],
			filter: [{ filter: [
				"",
				"none",
				$,
				Q
			] }],
			blur: [{ blur: fe() }],
			brightness: [{ brightness: [
				JC,
				$,
				Q
			] }],
			contrast: [{ contrast: [
				JC,
				$,
				Q
			] }],
			"drop-shadow": [{ "drop-shadow": [
				"",
				"none",
				p,
				vw,
				fw
			] }],
			"drop-shadow-color": [{ "drop-shadow": A() }],
			grayscale: [{ grayscale: [
				"",
				JC,
				$,
				Q
			] }],
			"hue-rotate": [{ "hue-rotate": [
				JC,
				$,
				Q
			] }],
			invert: [{ invert: [
				"",
				JC,
				$,
				Q
			] }],
			saturate: [{ saturate: [
				JC,
				$,
				Q
			] }],
			sepia: [{ sepia: [
				"",
				JC,
				$,
				Q
			] }],
			"backdrop-filter": [{ "backdrop-filter": [
				"",
				"none",
				$,
				Q
			] }],
			"backdrop-blur": [{ "backdrop-blur": fe() }],
			"backdrop-brightness": [{ "backdrop-brightness": [
				JC,
				$,
				Q
			] }],
			"backdrop-contrast": [{ "backdrop-contrast": [
				JC,
				$,
				Q
			] }],
			"backdrop-grayscale": [{ "backdrop-grayscale": [
				"",
				JC,
				$,
				Q
			] }],
			"backdrop-hue-rotate": [{ "backdrop-hue-rotate": [
				JC,
				$,
				Q
			] }],
			"backdrop-invert": [{ "backdrop-invert": [
				"",
				JC,
				$,
				Q
			] }],
			"backdrop-opacity": [{ "backdrop-opacity": [
				JC,
				$,
				Q
			] }],
			"backdrop-saturate": [{ "backdrop-saturate": [
				JC,
				$,
				Q
			] }],
			"backdrop-sepia": [{ "backdrop-sepia": [
				"",
				JC,
				$,
				Q
			] }],
			"border-collapse": [{ border: ["collapse", "separate"] }],
			"border-spacing": [{ "border-spacing": w() }],
			"border-spacing-x": [{ "border-spacing-x": w() }],
			"border-spacing-y": [{ "border-spacing-y": w() }],
			"table-layout": [{ table: ["auto", "fixed"] }],
			caption: [{ caption: ["top", "bottom"] }],
			transition: [{ transition: [
				"",
				"all",
				"colors",
				"opacity",
				"shadow",
				"transform",
				"none",
				$,
				Q
			] }],
			"transition-behavior": [{ transition: ["normal", "discrete"] }],
			duration: [{ duration: [
				JC,
				"initial",
				$,
				Q
			] }],
			ease: [{ ease: [
				"linear",
				"initial",
				_,
				$,
				Q
			] }],
			delay: [{ delay: [
				JC,
				$,
				Q
			] }],
			animate: [{ animate: [
				"none",
				v,
				$,
				Q
			] }],
			backface: [{ backface: ["hidden", "visible"] }],
			perspective: [{ perspective: [
				h,
				$,
				Q
			] }],
			"perspective-origin": [{ "perspective-origin": x() }],
			rotate: [{ rotate: pe() }],
			"rotate-x": [{ "rotate-x": pe() }],
			"rotate-y": [{ "rotate-y": pe() }],
			"rotate-z": [{ "rotate-z": pe() }],
			scale: [{ scale: me() }],
			"scale-x": [{ "scale-x": me() }],
			"scale-y": [{ "scale-y": me() }],
			"scale-z": [{ "scale-z": me() }],
			"scale-3d": ["scale-3d"],
			skew: [{ skew: he() }],
			"skew-x": [{ "skew-x": he() }],
			"skew-y": [{ "skew-y": he() }],
			transform: [{ transform: [
				$,
				Q,
				"",
				"none",
				"gpu",
				"cpu"
			] }],
			"transform-origin": [{ origin: x() }],
			"transform-style": [{ transform: ["3d", "flat"] }],
			translate: [{ translate: ge() }],
			"translate-x": [{ "translate-x": ge() }],
			"translate-y": [{ "translate-y": ge() }],
			"translate-z": [{ "translate-z": ge() }],
			"translate-none": ["translate-none"],
			zoom: [{ zoom: [
				YC,
				$,
				Q
			] }],
			accent: [{ accent: A() }],
			appearance: [{ appearance: ["none", "auto"] }],
			"caret-color": [{ caret: A() }],
			"color-scheme": [{ scheme: [
				"normal",
				"dark",
				"light",
				"light-dark",
				"only-dark",
				"only-light"
			] }],
			cursor: [{ cursor: [
				"auto",
				"default",
				"pointer",
				"wait",
				"text",
				"move",
				"help",
				"not-allowed",
				"none",
				"context-menu",
				"progress",
				"cell",
				"crosshair",
				"vertical-text",
				"alias",
				"copy",
				"no-drop",
				"grab",
				"grabbing",
				"all-scroll",
				"col-resize",
				"row-resize",
				"n-resize",
				"e-resize",
				"s-resize",
				"w-resize",
				"ne-resize",
				"nw-resize",
				"se-resize",
				"sw-resize",
				"ew-resize",
				"ns-resize",
				"nesw-resize",
				"nwse-resize",
				"zoom-in",
				"zoom-out",
				$,
				Q
			] }],
			"field-sizing": [{ "field-sizing": ["fixed", "content"] }],
			"pointer-events": [{ "pointer-events": ["auto", "none"] }],
			resize: [{ resize: [
				"none",
				"",
				"y",
				"x"
			] }],
			"scroll-behavior": [{ scroll: ["auto", "smooth"] }],
			"scrollbar-thumb-color": [{ "scrollbar-thumb": A() }],
			"scrollbar-track-color": [{ "scrollbar-track": A() }],
			"scrollbar-gutter": [{ "scrollbar-gutter": [
				"auto",
				"stable",
				"both"
			] }],
			"scrollbar-w": [{ scrollbar: [
				"auto",
				"thin",
				"none"
			] }],
			"scroll-m": [{ "scroll-m": w() }],
			"scroll-mx": [{ "scroll-mx": w() }],
			"scroll-my": [{ "scroll-my": w() }],
			"scroll-ms": [{ "scroll-ms": w() }],
			"scroll-me": [{ "scroll-me": w() }],
			"scroll-mbs": [{ "scroll-mbs": w() }],
			"scroll-mbe": [{ "scroll-mbe": w() }],
			"scroll-mt": [{ "scroll-mt": w() }],
			"scroll-mr": [{ "scroll-mr": w() }],
			"scroll-mb": [{ "scroll-mb": w() }],
			"scroll-ml": [{ "scroll-ml": w() }],
			"scroll-p": [{ "scroll-p": w() }],
			"scroll-px": [{ "scroll-px": w() }],
			"scroll-py": [{ "scroll-py": w() }],
			"scroll-ps": [{ "scroll-ps": w() }],
			"scroll-pe": [{ "scroll-pe": w() }],
			"scroll-pbs": [{ "scroll-pbs": w() }],
			"scroll-pbe": [{ "scroll-pbe": w() }],
			"scroll-pt": [{ "scroll-pt": w() }],
			"scroll-pr": [{ "scroll-pr": w() }],
			"scroll-pb": [{ "scroll-pb": w() }],
			"scroll-pl": [{ "scroll-pl": w() }],
			"snap-align": [{ snap: [
				"start",
				"end",
				"center",
				"align-none"
			] }],
			"snap-stop": [{ snap: ["normal", "always"] }],
			"snap-type": [{ snap: [
				"none",
				"x",
				"y",
				"both"
			] }],
			"snap-strictness": [{ snap: ["mandatory", "proximity"] }],
			touch: [{ touch: [
				"auto",
				"none",
				"manipulation"
			] }],
			"touch-x": [{ "touch-pan": [
				"x",
				"left",
				"right"
			] }],
			"touch-y": [{ "touch-pan": [
				"y",
				"up",
				"down"
			] }],
			"touch-pz": ["touch-pinch-zoom"],
			select: [{ select: [
				"none",
				"text",
				"all",
				"auto"
			] }],
			"will-change": [{ "will-change": [
				"auto",
				"scroll",
				"contents",
				"transform",
				$,
				Q
			] }],
			fill: [{ fill: ["none", ...A()] }],
			"stroke-w": [{ stroke: [
				JC,
				pw,
				ow,
				sw
			] }],
			stroke: [{ stroke: ["none", ...A()] }],
			"forced-color-adjust": [{ "forced-color-adjust": ["auto", "none"] }]
		},
		conflictingClassGroups: {
			"container-named": ["container-type"],
			overflow: ["overflow-x", "overflow-y"],
			overscroll: ["overscroll-x", "overscroll-y"],
			inset: [
				"inset-x",
				"inset-y",
				"inset-bs",
				"inset-be",
				"start",
				"end",
				"top",
				"right",
				"bottom",
				"left"
			],
			"inset-x": ["right", "left"],
			"inset-y": ["top", "bottom"],
			flex: [
				"basis",
				"grow",
				"shrink"
			],
			gap: ["gap-x", "gap-y"],
			p: [
				"px",
				"py",
				"ps",
				"pe",
				"pbs",
				"pbe",
				"pt",
				"pr",
				"pb",
				"pl"
			],
			px: ["pr", "pl"],
			py: ["pt", "pb"],
			m: [
				"mx",
				"my",
				"ms",
				"me",
				"mbs",
				"mbe",
				"mt",
				"mr",
				"mb",
				"ml"
			],
			mx: ["mr", "ml"],
			my: ["mt", "mb"],
			size: ["w", "h"],
			"font-size": ["leading"],
			"fvn-normal": [
				"fvn-ordinal",
				"fvn-slashed-zero",
				"fvn-figure",
				"fvn-spacing",
				"fvn-fraction"
			],
			"fvn-ordinal": ["fvn-normal"],
			"fvn-slashed-zero": ["fvn-normal"],
			"fvn-figure": ["fvn-normal"],
			"fvn-spacing": ["fvn-normal"],
			"fvn-fraction": ["fvn-normal"],
			"line-clamp": ["display", "overflow"],
			rounded: [
				"rounded-s",
				"rounded-e",
				"rounded-t",
				"rounded-r",
				"rounded-b",
				"rounded-l",
				"rounded-ss",
				"rounded-se",
				"rounded-ee",
				"rounded-es",
				"rounded-tl",
				"rounded-tr",
				"rounded-br",
				"rounded-bl"
			],
			"rounded-s": ["rounded-ss", "rounded-es"],
			"rounded-e": ["rounded-se", "rounded-ee"],
			"rounded-t": ["rounded-tl", "rounded-tr"],
			"rounded-r": ["rounded-tr", "rounded-br"],
			"rounded-b": ["rounded-br", "rounded-bl"],
			"rounded-l": ["rounded-tl", "rounded-bl"],
			"border-spacing": ["border-spacing-x", "border-spacing-y"],
			"border-w": [
				"border-w-x",
				"border-w-y",
				"border-w-s",
				"border-w-e",
				"border-w-bs",
				"border-w-be",
				"border-w-t",
				"border-w-r",
				"border-w-b",
				"border-w-l"
			],
			"border-w-x": ["border-w-r", "border-w-l"],
			"border-w-y": ["border-w-t", "border-w-b"],
			"border-color": [
				"border-color-x",
				"border-color-y",
				"border-color-s",
				"border-color-e",
				"border-color-bs",
				"border-color-be",
				"border-color-t",
				"border-color-r",
				"border-color-b",
				"border-color-l"
			],
			"border-color-x": ["border-color-r", "border-color-l"],
			"border-color-y": ["border-color-t", "border-color-b"],
			translate: [
				"translate-x",
				"translate-y",
				"translate-none"
			],
			"translate-none": [
				"translate",
				"translate-x",
				"translate-y",
				"translate-z"
			],
			"scroll-m": [
				"scroll-mx",
				"scroll-my",
				"scroll-ms",
				"scroll-me",
				"scroll-mbs",
				"scroll-mbe",
				"scroll-mt",
				"scroll-mr",
				"scroll-mb",
				"scroll-ml"
			],
			"scroll-mx": ["scroll-mr", "scroll-ml"],
			"scroll-my": ["scroll-mt", "scroll-mb"],
			"scroll-p": [
				"scroll-px",
				"scroll-py",
				"scroll-ps",
				"scroll-pe",
				"scroll-pbs",
				"scroll-pbe",
				"scroll-pt",
				"scroll-pr",
				"scroll-pb",
				"scroll-pl"
			],
			"scroll-px": ["scroll-pr", "scroll-pl"],
			"scroll-py": ["scroll-pt", "scroll-pb"],
			touch: [
				"touch-x",
				"touch-y",
				"touch-pz"
			],
			"touch-x": ["touch"],
			"touch-y": ["touch"],
			"touch-pz": ["touch"]
		},
		conflictingClassGroupModifiers: { "font-size": ["leading"] },
		postfixLookupClassGroups: ["container-type"],
		orderSensitiveModifiers: [
			"*",
			"**",
			"after",
			"backdrop",
			"before",
			"details-content",
			"file",
			"first-letter",
			"first-line",
			"marker",
			"placeholder",
			"selection"
		]
	};
}, jw = (e, { extend: t = {}, override: n = {} }) => (Nw(e.theme, n.theme), Nw(e.classGroups, n.classGroups), Nw(e.conflictingClassGroups, n.conflictingClassGroups), Nw(e.conflictingClassGroupModifiers, n.conflictingClassGroupModifiers), Mw(e, "postfixLookupClassGroups", n.postfixLookupClassGroups), Mw(e, "orderSensitiveModifiers", n.orderSensitiveModifiers), Pw(e.theme, t.theme), Pw(e.classGroups, t.classGroups), Pw(e.conflictingClassGroups, t.conflictingClassGroups), Pw(e.conflictingClassGroupModifiers, t.conflictingClassGroupModifiers), Fw(e, t, "postfixLookupClassGroups"), Fw(e, t, "orderSensitiveModifiers"), e), Mw = (e, t, n) => {
	n !== void 0 && (e[t] = n);
}, Nw = (e, t) => {
	if (t) for (let n in t) Mw(e, n, t[n]);
}, Pw = (e, t) => {
	if (t) for (let n in t) Fw(e, t, n);
}, Fw = (e, t, n) => {
	let r = t[n];
	r !== void 0 && (e[n] = e[n] ? e[n].concat(r) : r);
}, Iw = (e) => NC(e ? typeof e == "function" ? () => e(Aw()) : () => jw(Aw(), e) : Aw), Lw = (e) => {
	if (nS(e)) return;
	let t = e, n = { ...t.extend ?? {} };
	for (let e of [
		"theme",
		"classGroups",
		"conflictingClassGroups",
		"conflictingClassGroupModifiers",
		"postfixLookupClassGroups",
		"orderSensitiveModifiers",
		"cacheSize",
		"prefix",
		"separator",
		"experimentalParseClassName"
	]) t[e] !== void 0 && n[e] === void 0 && (n[e] = t[e]);
	let r = {};
	if (Object.keys(n).length > 0 && (r.extend = n), t.override != null && !nS(t.override) && (r.override = t.override), r.extend || r.override) return r;
}, Rw = (e) => {
	let t = Iw(Lw(e));
	return (e) => t.mergeString(e);
}, zw, Bw = () => (zw ||= Iw(), zw), Vw = () => ((!SS.cachedTwMerge || SS.didTwMergeConfigChange) && (SS.didTwMergeConfigChange = !1, SS.cachedTwMerge = Rw(SS.cachedTwMergeConfig)), SS.cachedTwMerge), Hw = (e) => {
	let t = e?.twMergeConfig;
	t && !nS(t) && (rS(t, SS.cachedTwMergeConfig) || (SS.cachedTwMergeConfig = t, SS.didTwMergeConfigChange = !0));
}, Uw = (e) => Yx(e);
(() => {
	let e = /* @__PURE__ */ Error();
	return !("line" in e) && !("lineNumber" in e);
})();
var Ww = SS.reset.bind(SS);
SS.reset = () => {
	zw = void 0, Ww();
};
var Gw = (e, t) => {
	let n = Uw(e);
	return !n || !(t?.twMerge ?? !0) ? n || void 0 : n.indexOf(" ") === -1 ? n : (Hw(t), (t?.twMergeConfig && !nS(t.twMergeConfig) ? Vw() : Bw().mergeString)(n) || void 0);
}, Kw = ZS((e, ...t) => Gw(t, e)), qw = Kw.tv;
Kw.createTV;
//#endregion
//#region ../../apps/studio/app/components/ui/StatusPill.vue
var Jw = /* @__PURE__ */ sr({
	__name: "StatusPill",
	props: { tone: { type: null } },
	setup(e) {
		let t = qw({
			base: "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ring-1 ring-inset",
			variants: { tone: {
				done: "bg-success/10 text-success ring-success/30",
				next: "bg-primary/10 text-primary ring-primary/30",
				later: "bg-elevated text-muted ring-default"
			} },
			defaultVariants: { tone: "later" }
		}), n = e;
		return (e, r) => (R(), z("span", { class: N(I(t)({ tone: n.tone })) }, [Pr(e.$slots, "default")], 2));
	}
}), Yw = { class: "flex items-center justify-between gap-3" }, Xw = { class: "font-semibold text-highlighted" }, Zw = { class: "grid gap-4" }, Qw = { class: "text-sm text-muted" }, $w = { class: "flex flex-wrap gap-2" }, eT = {
	key: 2,
	class: "grid gap-1.5 rounded-md border border-default bg-elevated/40 p-2"
}, tT = { class: "text-xs font-medium text-highlighted" }, nT = { class: "flex flex-wrap gap-2" }, rT = { class: "text-xs text-muted" }, iT = { class: "cursor-pointer" }, aT = { class: "mt-1 overflow-auto rounded bg-elevated p-2" }, oT = /* @__PURE__ */ sr({
	__name: "HostEvent",
	props: {
		event: { type: Object },
		testing: { type: Boolean }
	},
	emits: ["resume"],
	setup(e, { emit: t }) {
		let n = t, { t: r } = eb();
		return (t, i) => {
			let a = Jw, o = qx, s = cb, c = zx;
			return R(), z("div", {
				class: "absolute inset-0 z-40 grid place-items-center bg-black/70 p-[3cqw]",
				onClick: i[1] ||= us(() => {}, ["stop"])
			}, [H(c, { class: "w-[min(34rem,90%)]" }, {
				header: Nn(() => [V("div", Yw, [V("h2", Xw, P(I(r)("player.hostEvent", { name: e.event.name })), 1), H(a, { tone: "next" }, {
					default: Nn(() => [ga(P(I(r)("player.mockHost")), 1)]),
					_: 1
				})])]),
				default: Nn(() => [V("div", Zw, [
					e.event.name === "battle" ? (R(), B(o, {
						key: 0,
						params: e.event.params,
						outcomes: e.event.outcomes,
						onOutcome: i[0] ||= (e) => n("resume", e)
					}, null, 8, ["params", "outcomes"])) : (R(), z(L, { key: 1 }, [V("p", Qw, P(I(r)("player.hostEventHint")), 1), V("div", $w, [(R(!0), z(L, null, Nr(e.event.outcomes, (e) => (R(), B(s, {
						key: e,
						onClick: (t) => n("resume", e)
					}, {
						default: Nn(() => [ga(P(e), 1)]),
						_: 2
					}, 1032, ["onClick"]))), 128))])], 64)),
					e.testing ? (R(), z("div", eT, [V("p", tT, P(I(r)("player.pickResult")), 1), V("div", nT, [(R(!0), z(L, null, Nr(e.event.outcomes, (e) => (R(), B(s, {
						key: `pick-${e}`,
						color: "neutral",
						variant: "outline",
						size: "sm",
						onClick: (t) => n("resume", e)
					}, {
						default: Nn(() => [ga(P(e), 1)]),
						_: 2
					}, 1032, ["onClick"]))), 128))])])) : U("", !0),
					V("details", rT, [V("summary", iT, P(I(r)("player.params")), 1), V("pre", aT, P(JSON.stringify(e.event.params, null, 2)), 1)])
				])]),
				_: 1
			})]);
		};
	}
}), sT = Symbol("rich-placeholders");
function cT(e) {
	let t = 0;
	for (let n of e.trim().toLowerCase()) t = t * 31 + n.codePointAt(0) >>> 0;
	return t % 360;
}
function lT(e) {
	let t = cT(e);
	return {
		fill: `linear-gradient(135deg, hsl(${t} 45% 26% / 0.85), hsl(${t} 40% 14% / 0.9))`,
		border: `hsl(${t} 70% 68% / 0.9)`,
		text: `hsl(${t} 80% 92%)`
	};
}
//#endregion
//#region ../../apps/studio/app/components/player/Placeholder.vue?vue&type=script&setup=true&lang.ts
var uT = ["aria-label"], dT = { class: "line-clamp-3 text-[2.2cqw] leading-tight font-medium break-words" }, fT = ["aria-label"], pT = /* @__PURE__ */ sr({
	__name: "Placeholder",
	props: {
		label: { type: String },
		kind: { type: String }
	},
	setup(e) {
		let t = e, n = In(sT, !1), r = W(() => lT(t.label));
		return (t, i) => {
			let a = ob;
			return I(n) ? (R(), z("div", {
				key: 0,
				class: "grid size-full place-content-center place-items-center gap-[0.6cqw] overflow-hidden rounded-md border-2 border-dashed p-[1.5cqw] text-center",
				style: j({
					background: I(r).fill,
					borderColor: I(r).border,
					color: I(r).text
				}),
				role: "img",
				"aria-label": e.label
			}, [H(a, {
				name: e.kind === "video" ? "i-lucide-clapperboard" : "i-lucide-image",
				class: "size-[3.2cqw] opacity-80"
			}, null, 8, ["name"]), V("span", dT, P(e.label), 1)], 12, uT)) : (R(), z("div", {
				key: 1,
				class: "grid size-full place-items-center rounded-md border border-dashed border-white/40 bg-white/10 p-2 text-center text-[1.6cqw] text-white/70",
				role: "img",
				"aria-label": e.label
			}, P(e.label), 9, fT));
		};
	}
}), mT = {
	"top-left": "0% 0%",
	top: "50% 0%",
	"top-right": "100% 0%",
	left: "0% 50%",
	center: "50% 50%",
	right: "100% 50%",
	"bottom-left": "0% 100%",
	bottom: "50% 100%",
	"bottom-right": "100% 100%"
}, hT = ["src", "alt"], gT = /* @__PURE__ */ sr({
	__name: "Asset",
	props: {
		url: {
			default: void 0,
			type: null
		},
		label: { type: String },
		fit: {
			default: "contain",
			type: String
		},
		focus: {
			default: void 0,
			type: null
		},
		width: {
			default: Oy.background,
			type: null
		}
	},
	setup(e) {
		let t = e;
		return (n, r) => {
			let i = pT;
			return e.url ? (R(), z("img", {
				key: 0,
				src: ("sizedUrl" in n ? n.sizedUrl : I(tx))(t.url, t.width),
				alt: e.label,
				draggable: "false",
				class: N(["size-full select-none", e.fit === "cover" ? "object-cover" : "object-contain"]),
				style: j(e.focus ? { objectPosition: I(mT)[e.focus] } : void 0)
			}, null, 14, hT)) : (R(), B(i, {
				key: 1,
				label: e.label,
				kind: "image"
			}, null, 8, ["label"]));
		};
	}
}), _T = [
	"src",
	"aria-label",
	"loop"
], vT = /* @__PURE__ */ sr({
	__name: "SequenceVideo",
	props: {
		item: { type: Object },
		url: {
			default: void 0,
			type: null
		},
		at: { type: Number },
		playing: { type: Boolean },
		label: { type: String },
		fit: {
			default: "cover",
			type: String
		},
		focus: {
			default: void 0,
			type: null
		}
	},
	setup(e) {
		let t = e, n = lr("el");
		function r() {
			let e = n.value;
			if (!e || e.readyState === 0) return;
			let r = Number.isFinite(e.duration) && e.duration > 0 ? e.duration : void 0, i = t.item.loop === !0, a = Gb(t.item, t.at, r);
			!i && r !== void 0 && a >= r ? (e.paused || e.pause(), Math.abs(e.currentTime - r) > .05 && (e.currentTime = r)) : t.playing ? (!e.seeking && Kb(e.currentTime, a, i ? r : void 0) && (e.currentTime = a), e.paused && e.play().catch(() => void 0)) : (e.paused || e.pause(), !e.seeking && Math.abs(e.currentTime - a) > .02 && (e.currentTime = a));
		}
		return Bn(() => [t.at, t.playing], r, { flush: "post" }), (t, i) => {
			let a = pT;
			return e.url ? (R(), z("video", {
				key: 0,
				ref_key: "el",
				ref: n,
				src: e.url,
				"aria-label": e.label,
				loop: e.item.loop === !0,
				muted: "",
				playsinline: "",
				disablepictureinpicture: "",
				preload: "auto",
				class: N(["size-full select-none", e.fit === "cover" ? "object-cover" : "object-contain"]),
				style: j(e.focus ? { objectPosition: I(mT)[e.focus] } : void 0),
				onLoadedmetadata: r,
				onLoadeddata: r
			}, null, 46, _T)) : (R(), B(a, {
				key: 1,
				label: e.label,
				kind: "video"
			}, null, 8, ["label"]));
		};
	}
}), yT = {
	shake: {
		target: "world",
		motion: "vn-shake"
	},
	zoom: {
		target: "world",
		motion: "vn-zoom"
	},
	blur: {
		target: "world",
		motion: "vn-blur"
	},
	glitch: {
		target: "world",
		motion: "vn-glitch"
	},
	"flash-white": {
		target: "overlay",
		motion: "vn-fx-flash-white"
	},
	"flash-red": {
		target: "overlay",
		motion: "vn-fx-flash-red"
	},
	"fade-black": {
		target: "overlay",
		motion: "vn-fx-fade-black"
	},
	rain: {
		target: "overlay",
		motion: "vn-fx-rain"
	},
	snow: {
		target: "overlay",
		motion: "vn-fx-snow"
	},
	embers: {
		target: "overlay",
		motion: "vn-fx-embers"
	},
	"dream-glow": {
		target: "overlay",
		motion: "vn-fx-dream-glow"
	},
	"old-film": {
		target: "overlay",
		motion: "vn-fx-old-film"
	},
	vignette: {
		target: "overlay",
		motion: "vn-fx-vignette"
	}
}, bT = {
	"far-left": .1,
	left: .28,
	center: .5,
	right: .72,
	"far-right": .9
}, xT = (e, t) => e === void 0 || Math.abs(e - t) < 1e-6;
function ST(e, t) {
	let n = t.x || t.y ? `translate(${t.x * 100}cqw, ${t.y * 56.25}cqw)` : "", r = t.rotation && Math.abs(t.rotation) > 1e-6 ? `rotate(${t.rotation}deg)` : "", i = t.scale ?? 1, a = t.scaleY ?? i, o = xT(i, 1) && xT(a, 1) ? "" : xT(i, a) ? `scale(${i})` : `scale(${i}, ${a})`, s = e.position, c = Wb(e), l = c ? void 0 : e.offset, u = c ? void 0 : e.scale;
	if (!s) {
		let t = [
			n,
			l ? `translate(${l.x * 100}%, ${l.y * 100}%)` : "",
			r,
			u !== void 0 && u !== 1 ? `scale(${u})` : "",
			o
		].filter(Boolean), i = {
			inset: "0",
			width: "100%",
			height: "100%",
			...e.pivot ? { transformOrigin: mT[e.pivot] } : {}
		};
		return t.length ? {
			...i,
			transform: t.join(" ")
		} : i;
	}
	let d = typeof s == "string" ? bT[s] : s.x, f = typeof s == "string" ? .5 : s.y, p = typeof s == "string" ? 1 : s.scale ?? 1;
	return {
		...e.pivot ? { transformOrigin: mT[e.pivot] } : {},
		left: `${d * 100}%`,
		top: `${f * 100}%`,
		width: `${40 * p}%`,
		aspectRatio: "4 / 3",
		transform: [
			"translate(-50%, -50%)",
			n,
			r,
			o
		].filter(Boolean).join(" ")
	};
}
var CT = {
	serif: "var(--font-serif)",
	sans: "var(--font-sans)"
};
function wT(e, t, n) {
	let r = e.position, i = r === void 0 ? .5 : typeof r == "string" ? bT[r] : r.x, a = r === void 0 || typeof r == "string" ? .5 : r.y, o = r === void 0 ? .8 : .4 * (typeof r == "string" ? 1 : r.scale ?? 1), s = t.x || t.y ? `translate(${t.x * 100}cqw, ${t.y * 56.25}cqw)` : "", c = t.rotation && Math.abs(t.rotation) > 1e-6 ? `rotate(${t.rotation}deg)` : "", l = t.scale ?? 1, u = t.scaleY ?? l, d = xT(l, 1) && xT(u, 1) ? "" : xT(l, u) ? `scale(${l})` : `scale(${l}, ${u})`;
	return {
		left: `${i * 100}%`,
		top: `${a * 100}%`,
		width: `${o * 100}%`,
		transform: [
			"translate(-50%, -50%)",
			s,
			c,
			d
		].filter(Boolean).join(" "),
		textAlign: e.align ?? "center",
		fontSize: `${e.size ?? 4}cqw`,
		lineHeight: "1.3",
		color: e.color ?? "#ffffff",
		textShadow: e.shadow === !1 ? "none" : "0 0.15cqw 0.6cqw rgba(0, 0, 0, 0.75)",
		whiteSpace: "pre-wrap",
		...e.bold ? { fontWeight: "700" } : {},
		...e.italic ? { fontStyle: "italic" } : {},
		fontFamily: e.font ? CT[e.font] : n === "default" ? "var(--font-story-sans)" : CT.serif
	};
}
var TT = {
	b: "font-bold",
	i: "italic",
	loud: "vn-text-loud",
	whisper: "vn-text-whisper"
};
function ET(e) {
	return Eb(e).flatMap((e) => e.kind === "text" ? [{
		text: e.text,
		classes: e.tags.map((e) => TT[e]).filter((e) => !!e)
	}] : []);
}
//#endregion
//#region ../../apps/studio/app/utils/preload.ts
function DT(e, t, n = 6) {
	let r = e.story.scenes.find((e) => e.steps.some((e) => e.id === t));
	if (!r) return [];
	let i = r.steps.findIndex((e) => e.id === t), a = /* @__PURE__ */ new Map(), o = (e, t, n) => a.set(`${n}:${e}:${t ?? ""}`, {
		who: e,
		expr: t,
		kind: n
	});
	for (let e of r.steps.slice(i + 1, i + 1 + n)) {
		e.type === "line" && (o(e.speaker, e.expr, "face"), e.portrait?.picture !== "face" && o(e.speaker, e.expr, "stage"));
		for (let t of e.stage ?? []) (t.op === "enter" || t.op === "expr") && o(t.who, t.expr, "stage");
	}
	let s = [];
	for (let { who: t, expr: n, kind: r } of a.values()) {
		let i = e.characters.find((e) => e.id === t), a = r === "face" ? Fv(i, n) : Mv(i, n), o = a ? e.assets.assets[a]?.url : void 0;
		o && s.push({
			url: o,
			width: r === "face" ? Oy.dialogPortrait : Oy.stagePortrait
		});
	}
	return s;
}
function OT(e, t) {
	let n = /* @__PURE__ */ new Set();
	for (let r of e.items) {
		let e = r.type === "video" && r.src ? t.assets.assets[r.src]?.url : void 0;
		e && n.add(e);
	}
	return [...n];
}
function kT(e, t, n = 4) {
	let r = e.story.scenes.find((e) => e.steps.some((e) => e.id === t));
	if (!r) return [];
	let i = r.steps.findIndex((e) => e.id === t), a = /* @__PURE__ */ new Set();
	for (let t of r.steps.slice(i + 1, i + 1 + n)) {
		let n = t.type === "sequence" ? e.story.sequences[t.ref] : void 0;
		if (n) for (let t of OT(n, e)) a.add(t);
	}
	return [...a];
}
//#endregion
//#region ../../apps/studio/app/components/player/Sequence.vue?vue&type=script&setup=true&lang.ts
var AT = { class: "grid gap-[1.4cqw] rounded-[1cqw] bg-default p-[2.4cqw] text-center text-default" }, jT = { class: "text-[2.2cqw]" }, MT = { class: "flex justify-center gap-[1cqw]" }, NT = /* @__PURE__ */ sr({
	__name: "Sequence",
	props: {
		sequence: { type: null },
		bundle: { type: null },
		audio: { type: Object },
		overlay: {
			type: Boolean,
			default: !1
		},
		hold: {
			type: Boolean,
			default: !1
		},
		frozen: {
			type: Boolean,
			default: !1
		},
		behind: {
			type: Boolean,
			default: !1
		},
		hostPaused: {
			type: Boolean,
			default: !1
		},
		leavingMs: {
			default: null,
			type: [Number, null]
		},
		skippable: {
			type: Boolean,
			default: !0
		},
		trigger: {
			default: "auto",
			type: String
		},
		skipPrompt: {
			default: void 0,
			type: null
		},
		lang: {
			default: void 0,
			type: String
		}
	},
	emits: [
		"done",
		"skipped",
		"played",
		"effect"
	],
	setup(e, { emit: t }) {
		let n = (e) => e.type === "image" || e.type === "video" || e.type === "color", r = e, i = t, { t: a } = eb(), o = /* @__PURE__ */ F(r.trigger === "onClick" && !r.overlay), s = /* @__PURE__ */ F(!1), c = /* @__PURE__ */ F(0), l = W(() => Fb(r.sequence)), u = 0, d = 0, f = 0, p = !1, m = /* @__PURE__ */ F(!1);
		function h(e = !1) {
			p || (p = !0, cancelAnimationFrame(u), e && i("skipped"), i("done"));
		}
		function g() {
			o.value = !1, d = performance.now(), f = -1, u = requestAnimationFrame(_);
		}
		function _(e) {
			if (m.value || r.hostPaused) {
				d = e, u = requestAnimationFrame(_);
				return;
			}
			let t = c.value + (e - d);
			d = e;
			for (let e of Pb(r.sequence, f < 0 ? 0 : f, t)) e.type === "effect" ? i("effect", {
				op: "effect",
				name: e.name,
				durationMs: e.durationMs,
				intensity: e.intensity,
				speed: e.speed,
				size: e.size
			}) : Sy(r.audio, e);
			f = t, t >= l.value && r.hold && r.overlay ? (c.value = l.value, i("played")) : (c.value = t, t >= l.value ? h() : u = requestAnimationFrame(_));
		}
		Cr(() => {
			r.frozen ? c.value = l.value : o.value || g();
		}), Er(() => cancelAnimationFrame(u));
		function v() {
			r.skipPrompt ? (s.value = !0, m.value = !0) : h(!0);
		}
		function y(e) {
			s.value = !1, m.value = !1, e && h(!0);
		}
		let b = (e) => r.hold && Vb(r.sequence, e), x = W(() => {
			let e = c.value, t = Nb(r.sequence, e).filter(n);
			if (!r.hold) return t;
			let i = r.sequence.items.filter((r) => n(r) && !r.hidden && e >= r.startTime && b(r) && !t.includes(r));
			return [...t, ...i];
		}), S = W(() => !o.value && !m.value && !r.hostPaused && !r.frozen && c.value < l.value), C = [];
		Cr(() => {
			for (let e of OT(r.sequence, r.bundle)) {
				let t = document.createElement("video");
				t.preload = "auto", t.muted = !0, t.src = e, C.push(t);
			}
		}), Er(() => {
			for (let e of C) e.removeAttribute("src"), e.load();
			C.length = 0;
		});
		function w(e) {
			let t = b(e) ? {
				...e,
				endTime: 2 ** 53 - 1
			} : e, n = Ub(r.sequence, t, c.value);
			return {
				background: e.color ?? "#000000",
				opacity: String(n.opacity * (e.strength ?? .6))
			};
		}
		function T(e) {
			let t = b(e) ? {
				...e,
				endTime: 2 ** 53 - 1
			} : e, n = Ub(r.sequence, t, c.value);
			return {
				opacity: String(n.opacity),
				...ST(t, n)
			};
		}
		let E = W(() => Nb(r.sequence, c.value).filter((e) => e.type === "text"));
		function ee(e) {
			let t = r.bundle.story.languages.source;
			return Ty(r.bundle.strings[r.lang ?? t]?.entries[e]) ?? Ty(r.bundle.strings[t]?.entries[e]) ?? "";
		}
		function D(e) {
			let t = Ub(r.sequence, e, c.value);
			return {
				opacity: String(t.opacity),
				...wT(e, t, r.bundle.story.settings?.textStyle)
			};
		}
		let te = (e) => e ? r.bundle.assets.assets[e]?.url : void 0;
		return (t, n) => {
			let r = vT, i = gT, l = cb;
			return R(), z("div", {
				class: N(["absolute inset-0", [e.behind ? "z-10" : "z-30", e.overlay ? "pointer-events-none" : ""]]),
				style: j(e.leavingMs === null ? void 0 : {
					opacity: 0,
					transition: `opacity ${e.leavingMs}ms linear`
				}),
				onClick: n[4] ||= us((e) => I(o) ? g() : void 0, ["stop"])
			}, [
				(R(!0), z(L, null, Nr(I(x), (t) => (R(), z(L, { key: e.sequence.items.indexOf(t) }, [t.type === "color" ? (R(), z("div", {
					key: 0,
					class: "absolute inset-0",
					style: j(w(t))
				}, null, 4)) : (R(), z("div", {
					key: 1,
					class: "absolute",
					style: j(T(t))
				}, [t.type === "video" ? (R(), B(r, {
					key: 0,
					item: t,
					url: te(t.src),
					at: I(c),
					playing: I(S),
					label: t.label ?? t.src ?? "video",
					focus: t.focus,
					fit: t.fit ?? "cover"
				}, null, 8, [
					"item",
					"url",
					"at",
					"playing",
					"label",
					"focus",
					"fit"
				])) : (R(), B(i, {
					key: 1,
					url: te(t.src),
					label: t.label ?? t.src ?? "image",
					focus: t.focus,
					fit: t.fit ?? "cover"
				}, null, 8, [
					"url",
					"label",
					"focus",
					"fit"
				]))], 4))], 64))), 128)),
				(R(!0), z(L, null, Nr(I(E), (e, t) => (R(), z("div", {
					key: `t${e.startTime}-${t}`,
					class: "absolute",
					style: j(D(e))
				}, [(R(!0), z(L, null, Nr(I(ET)(ee(e.textKey)), (e, t) => (R(), z("span", {
					key: t,
					class: N(e.classes)
				}, P(e.text), 3))), 128))], 4))), 128)),
				I(o) ? (R(), z("button", {
					key: 0,
					type: "button",
					class: "absolute inset-0 grid cursor-pointer place-items-center text-[2.6cqw] text-white",
					onClick: n[0] ||= us((e) => g(), ["stop"])
				}, P(I(a)("player.clickToPlay")), 1)) : U("", !0),
				!e.overlay && e.skippable && !I(o) && !I(s) ? (R(), B(l, {
					key: 1,
					class: N(["absolute left-1/2 -translate-x-1/2", e.behind ? "top-[2cqw]" : "bottom-[max(16px,2.5%)]"]),
					color: "neutral",
					variant: "subtle",
					size: "sm",
					onClick: us(v, ["stop"])
				}, {
					default: Nn(() => [ga(P(I(a)("player.skip")), 1)]),
					_: 1
				}, 8, ["class"])) : U("", !0),
				I(s) ? (R(), z("div", {
					key: 2,
					class: "absolute inset-0 grid place-items-center bg-black/60",
					onClick: n[3] ||= us(() => {}, ["stop"])
				}, [V("div", AT, [V("p", jT, P(e.skipPrompt), 1), V("div", MT, [H(l, {
					color: "primary",
					onClick: n[1] ||= (e) => y(!0)
				}, {
					default: Nn(() => [ga(P(I(a)("player.yes")), 1)]),
					_: 1
				}), H(l, {
					color: "neutral",
					variant: "subtle",
					onClick: n[2] ||= (e) => y(!1)
				}, {
					default: Nn(() => [ga(P(I(a)("player.no")), 1)]),
					_: 1
				})])])])) : U("", !0)
			], 6);
		};
	}
}), PT = ["data-static"], FT = { class: "vn-question-content" }, IT = ["aria-label"], LT = /* @__PURE__ */ sr({
	__name: "Choices",
	props: {
		view: { type: Object },
		static: { type: Boolean }
	},
	emits: ["choose", "prompt"],
	setup(e, { emit: t }) {
		let n = t;
		return (t, r) => {
			let i = cb;
			return R(), z("div", {
				class: "vn-question",
				"data-static": !!e.static,
				onClick: r[1] ||= us(() => {}, ["stop"]),
				onDblclick: r[2] ||= (e) => n("prompt")
			}, [V("div", FT, [e.view.prompt ? (R(), z("p", {
				key: 0,
				class: "vn-question-prompt",
				onClick: r[0] ||= (e) => n("prompt")
			}, P(e.view.prompt), 1)) : U("", !0), V("div", {
				class: "vn-question-answers",
				role: "group",
				"aria-label": e.view.prompt
			}, [(R(!0), z(L, null, Nr(e.view.options, (e, r) => (R(), B(i, {
				key: e.id,
				type: "button",
				color: "neutral",
				variant: "soft",
				class: "vn-question-answer",
				"data-option": e.id,
				style: j({ "--i": r + 1 }),
				"aria-keyshortcuts": r < 9 ? String(r + 1) : void 0,
				onMousedown: "keepPlayerStageFocus" in t ? t.keepPlayerStageFocus : I(Dx),
				onClick: (t) => n("choose", e.id)
			}, {
				default: Nn(() => [ga(P(e.text), 1)]),
				_: 2
			}, 1032, [
				"data-option",
				"style",
				"aria-keyshortcuts",
				"onMousedown",
				"onClick"
			]))), 128))], 8, IT)])], 40, PT);
		};
	}
}), RT = ["src", "alt"], zT = /* @__PURE__ */ sr({
	__name: "PortraitImage",
	props: {
		url: { type: String },
		label: { type: String },
		crop: { type: null },
		flip: { type: Boolean }
	},
	setup(e) {
		let t = e, n = /* @__PURE__ */ F(1);
		function r(e) {
			let t = e.target;
			t.naturalWidth && t.naturalHeight && (n.value = t.naturalWidth / t.naturalHeight);
		}
		let i = W(() => ({
			width: `calc(max(100cqw, calc(100cqh * ${n.value})) * ${t.crop?.zoom ?? 1})`,
			left: `${t.crop?.x ?? 50}%`,
			top: `${t.crop?.y ?? 0}%`,
			transform: `translate(-${t.crop?.x ?? 50}%, -${t.crop?.y ?? 0}%)`
		}));
		return (t, n) => (R(), z("span", {
			class: "[container-type:size] relative block size-full overflow-hidden",
			style: j(e.flip ? { transform: "scaleX(-1)" } : void 0)
		}, [V("img", {
			src: e.url,
			alt: e.label ?? "",
			draggable: "false",
			class: "absolute h-auto max-h-none max-w-none select-none",
			style: j(I(i)),
			onLoad: r
		}, null, 44, RT)], 4));
	}
}), BT = [
	"data-position",
	"data-mode",
	"data-horizontal-align"
], VT = /* @__PURE__ */ sr({
	__name: "NarrationBackdrop",
	props: {
		position: { type: String },
		mode: { type: String },
		horizontalAlign: { type: String }
	},
	setup(e) {
		let t = Array.from({ length: 8 }, (e, t) => {
			let n = t * 12.5, r = (t + 1) * 12.5;
			return {
				blur: (8 - t) / 8,
				mask: `linear-gradient(var(--vn-treatment-direction), transparent ${Math.max(0, n - 2)}%, black ${n === 0 ? 0 : n + 1}%, black ${r - 1}%, transparent ${Math.min(100, r + 2)}%)`
			};
		});
		return (n, r) => (R(), z("div", {
			class: "vn-narration-treatment",
			"data-position": e.position,
			"data-mode": e.mode,
			"data-horizontal-align": e.horizontalAlign,
			"aria-hidden": "true"
		}, [(R(!0), z(L, null, Nr(I(t), (e, t) => (R(), z("div", {
			key: t,
			class: "vn-narration-blur-band",
			style: j({
				backdropFilter: `blur(calc(var(--vn-treatment-blur) * ${e.blur}))`,
				WebkitBackdropFilter: `blur(calc(var(--vn-treatment-blur) * ${e.blur}))`,
				maskImage: e.mask,
				WebkitMaskImage: e.mask
			})
		}, null, 4))), 128)), r[0] ||= V("div", { class: "vn-narration-shade" }, null, -1)], 8, BT));
	}
}), HT = 620 / 941, UT = {
	"far-left": .1,
	left: .23,
	center: .5,
	right: .77,
	"far-right": .9
};
//#endregion
//#region ../../apps/studio/app/utils/speakerBadge.ts
function WT(e) {
	let t = (e.slice(1).match(/.{2}/g)?.map((e) => parseInt(e, 16) / 255) ?? [
		.6,
		.5,
		.4
	]).map((e) => e <= .04045 ? e / 12.92 : ((e + .055) / 1.055) ** 2.4);
	return .2126 * t[0] + .7152 * t[1] + .0722 * t[2] > .179 ? "#080a0d" : "#fff3e2";
}
function GT(e) {
	return e < 480 ? "waiting" : e < 780 ? "entering" : "ready";
}
function KT(e, t) {
	return t.bubble && !(e?.bubble && t.speaker && e.speaker === t.speaker);
}
var qT = 480, JT = 1e3;
function YT(e) {
	switch (e) {
		case "portrait-short": return {
			boxWait: qT,
			portraitDelay: 0
		};
		case "portrait-long": return {
			boxWait: JT,
			portraitDelay: 0
		};
		case "text-short": return {
			boxWait: 0,
			portraitDelay: qT
		};
		case "text-long": return {
			boxWait: 0,
			portraitDelay: JT
		};
		default: return {
			boxWait: 0,
			portraitDelay: 0
		};
	}
}
function XT(e, t) {
	return t !== null && !(e && e.kind === t.kind && e.position === t.position);
}
function ZT(e, t) {
	return e < t ? "waiting" : e < t + 260 ? "entering" : "ready";
}
var QT = (e) => e + 100, $T = (e, t, n) => Math.max(t, Math.min(Math.max(t, n), e));
function eE(e, t, n) {
	let r = Math.min(16, e.width * .03), i = Math.min(40, e.height * .18), a = n.x + n.radius + 40, o = n.x - n.radius - 40 - t.width, s = e.width - a - r, c = n.x - n.radius - 40 - r, l = Math.max(s, c) >= t.width, u = $T(l ? s >= c ? a : o : n.x - t.width / 2, r, e.width - r - t.width), d = n.y - n.radius - 40 - t.height, f = $T(l ? n.y - t.height * .4 : d >= r ? d : n.y + n.radius + 40, r, e.height - i - r - t.height), p = n.x < u || n.x > u + t.width || n.y < f || n.y > f + t.height, m;
	if (n.tail && p && n.x >= 0 && n.x <= e.width && n.y >= 0 && n.y <= e.height - i) {
		let r = n.x - u, i = n.y - f, a = Math.min(Math.max(4, e.width * (7.5 / 1672)), t.width / 8, t.height / 8), o = $T(r, a * 2, t.width - a * 2), s = $T(i, a * 2, t.height - a * 2), c = r < 0 || r > t.width, l = r < 0 ? .5 : r > t.width ? t.width - .5 : o, d = c ? s : i < 0 ? .5 : t.height - .5, p = Math.hypot(r - l, i - d), h = Math.min(Math.max(0, p - n.radius), Math.max(7, e.width * (12 / 1672)));
		if (h > 3) {
			let e = l + (r - l) / p * h, t = d + (i - d) / p * h;
			m = c ? `M ${l} ${d - a} L ${e} ${t} L ${l} ${d + a}` : `M ${l - a} ${d} L ${e} ${t} L ${l + a} ${d}`;
		}
	}
	return {
		x: u,
		y: f,
		tail: m
	};
}
//#endregion
//#region ../../apps/studio/app/composables/useSpeechBubble.ts
function tE(e, t, n, r) {
	let i = /* @__PURE__ */ Jt(null), a = 0;
	function o() {
		let t = e.value, a = t?.parentElement;
		if (!t || !a) return;
		let o = a.getBoundingClientRect(), s = a.clientWidth, c = a.clientHeight;
		if (!s || !c || !o.width || !o.height) return;
		let l = s / o.width, u = c / o.height, d = Array.from(a.querySelectorAll("[data-stage-portrait]")).find((e) => e.dataset.stagePortrait === n.value && e.dataset.present === "true"), f = d?.querySelector("[data-bubble-head]"), p = d?.querySelector("img"), m = f?.getBoundingClientRect(), h = d?.getBoundingClientRect(), g = m && p?.complete && p.naturalWidth ? {
			x: (m.left + m.width / 2 - o.left) * l,
			y: (m.top + m.height / 2 - o.top) * u,
			radius: Math.max(m.width * l, m.height * u) / 2,
			tail: !0
		} : {
			x: h ? (h.left + h.width / 2 - o.left) * l : r.value * s,
			y: h ? (h.top - o.top) * u + h.height * u * .15 : c * .3,
			radius: 0,
			tail: !1
		}, _ = t.getBoundingClientRect(), v = _.width * l, y = _.height * u, b = {
			...eE({
				width: s,
				height: c
			}, {
				width: v,
				height: y
			}, g),
			width: v,
			height: y,
			portraitPending: !!p && !p.complete
		}, x = i.value;
		(!x || Math.abs(x.x - b.x) > .1 || Math.abs(x.y - b.y) > .1 || x.width !== b.width || x.height !== b.height || x.tail !== b.tail || x.portraitPending !== b.portraitPending) && (i.value = b);
	}
	function s() {
		o(), a = requestAnimationFrame(s);
	}
	return Bn(t, (e) => {
		cancelAnimationFrame(a), i.value = null, e && xn(() => {
			t.value && s();
		});
	}, { immediate: !0 }), Er(() => cancelAnimationFrame(a)), i;
}
//#endregion
//#region ../../apps/studio/app/utils/typewriter.ts
function nE(e, t) {
	let n = [], r = t > 0 ? 1e3 / t : 0, i = 0;
	for (let t of Eb(e)) if (t.kind === "pause") r > 0 && (i += t.ms);
	else for (let e of Array.from(t.text)) n.push({
		ch: e,
		tags: t.tags,
		at: i
	}), i += r;
	return {
		chars: n,
		total: n.length ? n[n.length - 1]?.at ?? 0 : 0
	};
}
function rE(e, t) {
	let n = 0, r = e.length;
	for (; n < r;) {
		let i = n + r >> 1;
		(e[i]?.at ?? 0) <= t ? n = i + 1 : r = i;
	}
	return n;
}
function iE(e, t) {
	let n = [];
	for (let r of e.slice(0, t)) {
		let e = n[n.length - 1];
		e && e.tags === r.tags ? e.text += r.ch : n.push({
			tags: r.tags,
			text: r.ch
		});
	}
	return n;
}
//#endregion
//#region ../../apps/studio/app/components/player/Dialog.vue?vue&type=script&setup=true&lang.ts
var aE = [
	"part",
	"data-gradient-border",
	"data-mode",
	"data-bubble-entrance",
	"data-box-entrance",
	"data-position",
	"data-align",
	"data-horizontal-align",
	"aria-label"
], oE = ["viewBox"], sE = ["d"], cE = [
	"part",
	"data-inline",
	"data-corners",
	"data-badge"
], lE = ["part"], uE = ["part", "data-fade"], dE = {
	class: "whitespace-pre-wrap",
	"aria-live": "polite"
}, fE = {
	key: 0,
	class: "invisible"
}, pE = {
	key: 2,
	class: "vn-continue-arrow",
	"aria-hidden": "true"
}, mE = /* @__PURE__ */ sr({
	inheritAttrs: !1,
	__name: "Dialog",
	props: {
		view: { type: Object },
		cps: {
			default: 24,
			type: Number
		},
		bubbleX: {
			default: UT.left,
			type: Number
		},
		hideContinue: {
			type: Boolean,
			default: !1
		},
		allowAdvance: {
			type: Boolean,
			default: !0
		},
		face: {
			default: void 0,
			type: null
		},
		settings: {
			default: void 0,
			type: null
		}
	},
	emits: ["advance", "finished"],
	setup(e, { expose: t, emit: n }) {
		let r = e, i = n, { t: a } = eb(), o = Vr();
		function s(e) {
			return o["data-dialog-playback"] === "automatic" ? `${e} ${e.replace("dialog", "dialog-automatic")}` : e;
		}
		let c = W(() => r.view.kind === "line" ? H_(r.view.presentation, r.settings?.presentation) : U_(r.view.presentation, r.settings?.presentation)), l = W(() => r.view.kind === "line" && c.value.mode === "bubble"), u = W(() => r.view.kind === "line" ? H_(r.view.presentation, r.settings?.presentation).enter : "portrait-short"), d = lr("panel"), f = tE(d, l, W(() => r.view.kind === "line" ? r.view.speaker : void 0), W(() => r.bubbleX)), p = W(() => l.value ? {
			left: `${f.value?.x ?? 0}px`,
			top: `${f.value?.y ?? 0}px`,
			visibility: f.value ? "visible" : "hidden"
		} : {}), m = W(() => r.view.kind === "narration" ? U_(r.view.presentation, r.settings?.presentation) : null), h = W(() => r.view.kind === "line" && c.value.mode === "face-box" ? r.face : void 0);
		Bn(() => r.view.stepId, () => {
			d.value && d.value.querySelector(".vn-dialog-content")?.scrollTo(0, 0);
		});
		let g = W(() => ny(r.settings)), _ = W(() => ey(r.view.kind, r.settings)), v = W(() => [void 0, "warm"].includes(r.settings?.styles?.[r.view.kind]?.border)), y = W(() => {
			let e = m.value;
			return e && (e.mode === "long" || e.align === "center") ? e.align : "left";
		}), b = W(() => ({
			color: _.value.text,
			"--vn-panel-background": _.value.background,
			"--vn-panel-border": _.value.border,
			"--vn-text-align": y.value,
			"--vn-story-font": r.settings?.textStyle === "default" ? "var(--font-story-sans)" : "var(--font-serif)",
			..._.value.box ? {
				backgroundColor: _.value.background,
				borderColor: v.value ? "transparent" : _.value.border
			} : {}
		})), x = W(() => {
			if (r.view.kind !== "line") return {};
			let e = r.view.speakerBadge === "filled" && g.value.box, t = r.view.speakerColor ?? (e ? "#9c8768" : "#EEC68B");
			return {
				color: e ? WT(t) : t,
				backgroundColor: g.value.box ? e ? t : g.value.background : "transparent",
				borderColor: e ? t : g.value.border || t
			};
		}), S = {
			shake: "vn-text-shake",
			wave: "vn-text-wave",
			whisper: "vn-text-whisper",
			loud: "vn-text-loud",
			b: "font-bold",
			i: "italic"
		}, C = window.matchMedia("(prefers-reduced-motion: reduce)").matches, w = W(() => nE(r.view.text, C ? 0 : r.cps)), T = /* @__PURE__ */ F(r.cps <= 0 ? w.value.chars.length : 0), E = W(() => l.value ? null : r.view.kind === "line" ? {
			kind: "line",
			position: c.value.position
		} : _.value.box ? {
			kind: "narration",
			position: c.value.position
		} : null), ee = W(() => !!E.value && r.cps > 0 && !C), D = /* @__PURE__ */ F((l.value || E.value) && r.cps > 0 && !C ? "waiting" : "ready"), te = W(() => l.value && r.cps > 0 && !C), ne = W(() => D.value === "waiting" || D.value === "entering"), re = W(() => !ne.value && T.value >= w.value.chars.length), O = null, k = !1, ie = null, ae = !1, A = null, oe = 0;
		function se() {
			return !!d.value?.parentElement?.querySelector("[data-stage-portrait][data-present='true'][class*='-enter-active']");
		}
		let ce = 0, le = null;
		function ue(e) {
			if (k && (!f.value || f.value.portraitPending) || ae && oe++ < 1) {
				ce = requestAnimationFrame(ue);
				return;
			}
			le ??= e;
			let t = e - le;
			ae && A === null && (A = se() ? YT(u.value).boxWait : 0);
			let n = k ? 780 : ae ? QT(A ?? 0) : 0;
			D.value = k ? GT(t) : ae ? ZT(t, A ?? 0) : "ready", T.value = t < n ? 0 : rE(w.value.chars, t - n), re.value || (ce = requestAnimationFrame(ue));
		}
		function M() {
			cancelAnimationFrame(ce);
			let e = {
				bubble: l.value,
				speaker: r.view.kind === "line" ? r.view.speaker : void 0
			};
			k = te.value && KT(O, e), O = e, ae = ee.value && XT(ie, E.value), ie = E.value, A = null, oe = 0, C || r.cps <= 0 ? (D.value = "ready", T.value = w.value.chars.length) : (T.value = 0, D.value = k || ae ? "waiting" : "ready", le = null, ce = requestAnimationFrame(ue));
		}
		Bn(() => [
			r.view.stepId,
			r.view.text,
			l.value,
			r.cps
		], M), Cr(M), Bn(() => re.value && r.view.stepId, (e) => {
			e && i("finished");
		}, { immediate: !0 }), Er(() => cancelAnimationFrame(ce));
		let de = W(() => {
			let e = 0;
			return iE(w.value.chars, w.value.chars.length).map((t) => {
				let n = t.tags.map((e) => S[e]).filter((e) => !!e), r = t.tags.some((e) => e === "wave" || e === "shake"), i = Array.from(t.text), a = e;
				e += i.length;
				let o = Math.max(0, Math.min(i.length, T.value - a));
				return {
					classes: n,
					seen: i.slice(0, o).join(""),
					hidden: i.slice(o).join(""),
					chars: r ? i.map((e, t) => ({
						ch: e,
						n: a + t,
						hidden: a + t >= T.value
					})) : null
				};
			});
		});
		function fe() {
			r.allowAdvance && (re.value ? i("advance") : (cancelAnimationFrame(ce), D.value = "skipped", T.value = w.value.chars.length));
		}
		return t({ activate: fe }), (t, n) => {
			let r = VT, i = zT, o = pT;
			return R(), z(L, null, [I(m) && !I(_).box ? (R(), B(r, {
				key: 0,
				position: I(m).position,
				mode: I(m).mode,
				"horizontal-align": I(m).horizontalAlign,
				style: j(t.$attrs.style)
			}, null, 8, [
				"position",
				"mode",
				"horizontal-align",
				"style"
			])) : U("", !0), V("div", ba({
				ref_key: "panel",
				ref: d
			}, t.$attrs, {
				class: ["vn-dialog vn-story-panel select-none", [
					`vn-story-panel--${e.view.kind}`,
					{
						"vn-story-panel--framed": I(_).box,
						"vn-story-panel--face": !!I(h)
					},
					`vn-story-panel--${I(_).corners}`
				]],
				part: s("dialog"),
				"data-gradient-border": I(_).box && I(v),
				"data-mode": I(c).mode,
				"data-bubble-entrance": I(te) ? I(D) : void 0,
				"data-box-entrance": I(ee) ? I(D) : void 0,
				"data-position": I(c).position,
				"data-align": I(y),
				"data-horizontal-align": I(m)?.horizontalAlign,
				style: [
					I(b),
					I(p),
					{
						"--vn-bubble-enter-duration": `${I(300)}ms`,
						"--vn-box-enter-duration": `${I(260)}ms`
					}
				],
				role: "region",
				"aria-label": I(a)("player.dialog"),
				onClick: us(fe, ["stop"])
			}), [
				I(l) && I(f)?.tail && I(_).box ? (R(), z("svg", {
					key: 0,
					class: "vn-bubble-tail",
					viewBox: `0 0 ${I(f).width} ${I(f).height}`,
					"aria-hidden": "true",
					width: "100%",
					height: "100%"
				}, [V("path", { d: I(f).tail }, null, 8, sE)], 8, oE)) : U("", !0),
				e.view.kind === "line" ? (R(), z("div", {
					key: 1,
					class: N(["vn-speaker-badge", { "vn-speaker-badge--plain": !I(g).box }]),
					part: s("dialog-name"),
					"data-inline": I(l),
					"data-corners": I(g).corners,
					"data-badge": e.view.speakerBadge ?? "outlined",
					style: j(I(l) ? { color: e.view.kind === "line" ? e.view.speakerColor : void 0 } : I(x))
				}, [Pr(t.$slots, "speaker", {}, () => [ga(P(e.view.speakerName), 1)])], 14, cE)) : U("", !0),
				V("div", { class: N(["vn-dialog-content", { "vn-dialog-content--right": I(h)?.side === "right" }]) }, [I(h) ? (R(), z("div", {
					key: 0,
					class: "vn-dialog-face",
					part: s("dialog-face")
				}, [I(h).url ? (R(), B(i, {
					key: 0,
					url: ("sizedUrl" in t ? t.sizedUrl : I(tx))(I(h).url, I(Oy).dialogPortrait) ?? I(h).url,
					label: I(h).label,
					crop: I(h).crop
				}, null, 8, [
					"url",
					"label",
					"crop"
				])) : (R(), B(o, {
					key: 1,
					label: I(h).label,
					kind: "image"
				}, null, 8, ["label"]))], 8, lE)) : U("", !0), (R(), z("div", {
					key: e.view.stepId,
					class: "vn-story-text",
					part: s("dialog-text"),
					"data-fade": e.cps > 0
				}, [Pr(t.$slots, "text", {}, () => [V("p", dE, [(R(!0), z(L, null, Nr(I(de), (e, t) => (R(), z(L, { key: t }, [e.chars ? (R(!0), z(L, { key: 0 }, Nr(e.chars, (t) => (R(), z("span", {
					key: t.n,
					class: N([
						e.classes,
						"whitespace-pre",
						t.hidden ? "invisible" : ""
					]),
					style: j({ "--vn-char": String(t.n) })
				}, P(t.ch), 7))), 128)) : (R(), z("span", {
					key: 1,
					class: N(e.classes)
				}, [ga(P(e.seen), 1), e.hidden ? (R(), z("span", fE, P(e.hidden), 1)) : U("", !0)], 2))], 64))), 128))])])], 8, uE))], 2),
				I(re) && !e.hideContinue && !e.view.playback?.autoplay ? (R(), z("span", pE, "▼")) : U("", !0)
			], 16, aE)], 64);
		};
	}
});
//#endregion
//#region ../../apps/studio/app/constants/sceneCard.ts
function hE(e, t = 500, n = 500) {
	let r = Math.max(0, e ?? 3500), i = Math.min(t, r * .45), a = Math.min(n, r * .3);
	return {
		enter: i,
		shadeDelay: 2 / 9 * i,
		textDelay: 0,
		exit: a,
		exitAt: r - a
	};
}
//#endregion
//#region ../../apps/studio/app/components/player/SceneCard.vue?vue&type=script&setup=true&lang.ts
var gE = {
	key: 0,
	class: "vn-scene-corner-label"
}, _E = {
	key: 1,
	class: "vn-scene-corner-title"
}, vE = {
	key: 2,
	class: "vn-scene-corner-subtitle"
}, yE = ["data-shown", "data-instant"], bE = { class: "vn-scene-opening-copy" }, xE = {
	key: 0,
	class: "vn-scene-opening-label"
}, SE = { class: "vn-scene-opening-title" }, CE = {
	key: 1,
	class: "vn-scene-opening-subtitle"
}, wE = /* @__PURE__ */ sr({
	__name: "SceneCard",
	props: {
		card: { type: [Object, null] },
		fadeInMs: {
			default: void 0,
			type: Number
		},
		fadeOutMs: {
			default: void 0,
			type: Number
		},
		static: { type: Boolean },
		autoplay: {
			type: Boolean,
			default: !0
		},
		veil: {
			default: null,
			type: [Object, null]
		}
	},
	emits: ["afterLeave"],
	setup(e, { emit: t }) {
		let { t: n } = eb(), r = t, i = e, a = W(() => {
			let e = i.veil;
			if (e?.affects.includes("picture")) return {
				opacity: 1 - e.opacity,
				transition: e.ms > 0 ? `opacity ${e.ms}ms linear` : "none"
			};
		}), o = window.matchMedia("(prefers-reduced-motion: reduce)").matches, s = W(() => !!i.static || o), c = /* @__PURE__ */ F(s.value), l = /* @__PURE__ */ F(i.card?.durationMs), u = W(() => hE(l.value, i.fadeInMs, i.fadeOutMs)), d, f = 0;
		function p() {
			clearTimeout(d), cancelAnimationFrame(f);
		}
		Bn(() => i.card, (e) => {
			p(), e && (l.value = e.durationMs, e.corner || s.value ? c.value = !0 : (c.value = !1, e.durationMs !== 0 && (f = requestAnimationFrame(() => {
				f = requestAnimationFrame(() => c.value = !0);
			}), e.durationMs !== void 0 && i.autoplay !== !1 && (d = setTimeout(() => c.value = !1, u.value.exitAt)))));
		}, { immediate: !0 }), Bn(() => i.autoplay, (e) => {
			clearTimeout(d), !(!i.card || i.card.corner || s.value) && (c.value = !0, e !== !1 && i.card.durationMs !== void 0 && (d = setTimeout(() => c.value = !1, u.value.exitAt)));
		}), Er(p);
		let m = W(() => ({
			"--vn-scene-enter": `${s.value ? 0 : u.value.enter}ms`,
			"--vn-scene-shade-delay": `${s.value ? 0 : u.value.shadeDelay}ms`,
			"--vn-scene-text-delay": `${s.value ? 0 : u.value.textDelay}ms`,
			"--vn-scene-text-enter": `${s.value ? 0 : u.value.enter}ms`,
			"--vn-scene-exit": `${s.value ? 0 : u.value.exit}ms`
		}));
		return (t, i) => (R(), z(L, null, [V("div", {
			class: "pointer-events-none absolute inset-0 z-30",
			style: j(I(a))
		}, [H(no, {
			name: I(s) ? "" : "vn-scene-corner",
			duration: I(s) ? 0 : {
				enter: I(700),
				leave: 300
			},
			appear: !I(s)
		}, {
			default: Nn(() => [e.card?.corner ? (R(), z("div", {
				key: `corner-${e.card.number}-${e.card.title}`,
				"data-testid": "scene-corner",
				class: "vn-scene-corner"
			}, [
				e.card.number ? (R(), z("p", gE, P(I(n)("player.sceneNumber", { n: String(e.card.number).padStart(2, "0") })), 1)) : U("", !0),
				e.card.title ? (R(), z("p", _E, P(e.card.title), 1)) : U("", !0),
				e.card.subtitle ? (R(), z("p", vE, P(e.card.subtitle), 1)) : U("", !0)
			])) : U("", !0)]),
			_: 1
		}, 8, [
			"name",
			"duration",
			"appear"
		])], 4), H(no, {
			name: I(s) ? "" : "vn-scene-opening",
			duration: I(s) ? 0 : {
				enter: I(u).enter + I(u).shadeDelay,
				leave: I(c) ? I(u).exit : 0
			},
			appear: !I(s),
			onAfterLeave: i[0] ||= (e) => r("afterLeave")
		}, {
			default: Nn(() => [e.card && !e.card.corner ? (R(), z("div", {
				key: `opening-${e.card.number}-${e.card.title}`,
				class: "vn-scene-opening",
				"data-shown": I(c),
				"data-instant": I(s),
				style: j(I(m))
			}, [
				i[1] ||= V("div", { class: "vn-scene-opening-blur" }, null, -1),
				i[2] ||= V("div", { class: "vn-scene-opening-shade" }, null, -1),
				V("div", bE, [
					e.card.number ? (R(), z("p", xE, P(I(n)("player.sceneNumber", { n: String(e.card.number).padStart(2, "0") })), 1)) : U("", !0),
					V("h2", SE, P(e.card.title), 1),
					e.card.subtitle || e.card.location || e.card.time ? (R(), z("p", CE, P(e.card.subtitle || [e.card.location, e.card.time].filter(Boolean).join(" · ")), 1)) : U("", !0)
				])
			], 12, yE)) : U("", !0)]),
			_: 1
		}, 8, [
			"name",
			"duration",
			"appear"
		])], 64));
	}
}), TE = ["title"], EE = /* @__PURE__ */ sr({
	__name: "UTooltip",
	props: { text: { type: String } },
	setup(e) {
		return (t, n) => (R(), z("span", { title: e.text }, [Pr(t.$slots, "default")], 8, TE));
	}
}), DE = /* @__PURE__ */ new Map();
function OE(e, t) {
	return DE.has(e) || DE.set(e, /* @__PURE__ */ F(t())), DE.get(e);
}
function kE() {
	return { query: {} };
}
//#endregion
//#region ../../apps/studio/app/composables/useStageLayout.ts
function AE() {
	let e = kE();
	return OE("stage-layout", () => e.query.stageLayout === "classic" ? "classic" : "corners");
}
//#endregion
//#region ../../apps/studio/app/components/player/StageInformation.vue?vue&type=script&setup=true&lang.ts
var jE = ["title"], ME = ["aria-label", "aria-expanded"], NE = [
	"aria-label",
	"aria-valuenow",
	"aria-valuetext"
], PE = ["data-complete"], FE = {
	key: 0,
	class: "vn-stage-progress-details"
}, IE = ["data-ready", "aria-hidden"], LE = { class: "vn-stage-continue-full" }, RE = { class: "vn-stage-continue-compact" }, zE = /* @__PURE__ */ sr({
	__name: "StageInformation",
	props: {
		bundle: { type: null },
		lang: { type: String },
		stepId: { type: null },
		progress: { type: Object },
		ready: { type: Boolean },
		openingCard: { type: Boolean },
		veil: { type: [Object, null] },
		preview: { type: Boolean },
		continueOnly: { type: Boolean }
	},
	setup(e) {
		let t = e, n = AE(), r = W(() => t.lang);
		Fn(Qy, r);
		let { t: i } = eb(r), a = W(() => {
			let e = fx(t.bundle, t.lang), n = gx(t.bundle.story.meta.episode);
			return n ? `${i("player.episode", { n })} – ${e}` : e;
		}), o = W(() => hx(t.bundle, t.lang, t.stepId, { showBeforeTitle: !!t.preview })), s = W(() => i(t.progress.approximate ? "player.progressEstimate" : "player.progressExact", {
			current: t.progress.current,
			total: t.progress.total
		})), c = /* @__PURE__ */ F(!1);
		Cr(() => {
			c.value = window.matchMedia("(pointer: coarse)").matches;
		});
		let l = /* @__PURE__ */ F(!1);
		return Bn(() => t.stepId, () => {
			l.value = !1;
		}), (t, r) => {
			let u = EE, d = wE;
			return R(), z(L, null, [
				e.continueOnly ? U("", !0) : (R(), z("div", {
					key: 0,
					class: "vn-stage-heading",
					title: I(a)
				}, P(I(a)), 9, jE)),
				e.continueOnly ? U("", !0) : (R(), B(u, {
					key: 1,
					text: I(s),
					content: {
						side: I(n) === "corners" ? "top" : "bottom",
						align: "end"
					},
					ui: { text: "font-sans" }
				}, {
					default: Nn(() => [V("button", {
						class: "vn-stage-progress",
						type: "button",
						"aria-label": I(s),
						"aria-expanded": I(l),
						onMousedown: r[0] ||= (...e) => ("keepPlayerStageFocus" in t ? t.keepPlayerStageFocus : I(Dx)) && ("keepPlayerStageFocus" in t ? t.keepPlayerStageFocus : I(Dx))(...e),
						onClick: r[1] ||= us((e) => l.value = !I(l), ["stop"]),
						onKeydown: r[2] ||= us(() => {}, ["stop"]),
						onBlur: r[3] ||= (e) => l.value = !1
					}, [V("span", {
						role: "progressbar",
						"aria-label": I(i)("player.progress"),
						"aria-valuemin": 0,
						"aria-valuemax": 100,
						"aria-valuenow": Math.round(e.progress.ratio * 100),
						"aria-valuetext": I(s),
						class: "vn-stage-progress-track"
					}, [V("span", {
						"data-complete": e.progress.ratio >= 1,
						style: j({ width: `${e.progress.ratio * 100}%` })
					}, null, 12, PE)], 8, NE), I(l) ? (R(), z("span", FE, P(I(s)), 1)) : U("", !0)], 40, ME)]),
					_: 1
				}, 8, ["text", "content"])),
				e.continueOnly ? U("", !0) : (R(), B(d, {
					key: 2,
					card: e.openingCard ? null : I(o),
					static: e.preview,
					veil: e.veil ?? null
				}, null, 8, [
					"card",
					"static",
					"veil"
				])),
				V("div", {
					class: "vn-stage-continue",
					"data-ready": !!e.ready && !e.preview,
					"aria-hidden": !e.ready || e.preview,
					role: "status"
				}, [V("span", LE, P(I(i)(I(c) ? "player.advanceTouch" : "player.advanceDesktop")), 1), V("span", RE, P(I(i)("player.continue")), 1)], 8, IE)
			], 64);
		};
	}
}), BE = /* @__PURE__ */ sr({
	__name: "Veil",
	props: { veil: { type: [Object, null] } },
	setup(e) {
		return (t, n) => e.veil && e.veil.affects.includes("picture") ? (R(), z("div", {
			key: 0,
			class: "pointer-events-none absolute inset-0 z-[15]",
			"aria-hidden": "true",
			style: j({
				backgroundColor: e.veil.color,
				opacity: e.veil.opacity,
				transition: e.veil.ms > 0 ? `opacity ${e.veil.ms}ms linear` : "none"
			})
		}, null, 4)) : U("", !0);
	}
}), VE = {
	shake: 160,
	glitch: 350
};
function HE(e) {
	let t = e.filter((e) => yT[e.name].target === "world");
	if (!t.length) return;
	let n = {}, r = [];
	for (let e of t) {
		let t = yT[e.name].motion, i = VE[e.name];
		if (i !== void 0) {
			let n = i / e.speed, a = Math.max(1, Math.round(e.durationMs / n));
			r.push(`${t} ${n.toFixed(1)}ms linear ${a}`);
		} else r.push(`${t} ${e.durationMs}ms ease-in-out 1`);
		n[`--vn-i-${e.name}`] = String(e.intensity), n[`--vn-size-${e.name}`] = String(e.size);
	}
	return n.animation = r.join(", "), n;
}
function UE(e) {
	return {
		"--vn-ms": `${e.durationMs}ms`,
		"--vn-i": String(e.intensity),
		"--vn-speed": String(e.speed),
		"--vn-size": String(e.size)
	};
}
//#endregion
//#region ../../apps/studio/app/components/player/Effects.vue?vue&type=script&setup=true&lang.ts
var WE = {
	class: "pointer-events-none absolute inset-0 z-10",
	"aria-hidden": "true"
}, GE = /* @__PURE__ */ sr({
	__name: "Effects",
	props: { effects: { type: Array } },
	setup(e) {
		let t = (e) => e.filter((e) => yT[e.name].target === "overlay");
		return (n, r) => (R(), z("div", WE, [(R(!0), z(L, null, Nr(t(e.effects), (e) => (R(), z("div", {
			key: e.id,
			class: N(["vn-fx", I(yT)[e.name].motion]),
			style: j(("overlayVars" in n ? n.overlayVars : I(UE))(e))
		}, null, 6))), 128))]));
	}
}), KE = ["src", "alt"], qE = /* @__PURE__ */ sr({
	__name: "PortraitArt",
	props: {
		url: { type: String },
		label: { type: String },
		flip: { type: Boolean },
		head: { type: [Object, null] },
		change: { type: null }
	},
	setup(e) {
		let t = e, n = /* @__PURE__ */ Jt({
			url: t.url,
			label: t.label,
			flip: t.flip,
			head: t.head,
			change: t.change
		}), r = W(() => n.value.change === "cut" ? "vn-expr-cut" : n.value.change === "in-out" ? "vn-expr-inout" : "vn-expr");
		return Bn(() => [
			t.url,
			t.label,
			t.flip,
			t.head,
			t.change
		], ([e, t, r, i, a], o, s) => {
			if (e === n.value.url) {
				n.value = {
					url: e,
					label: t,
					flip: r,
					head: i,
					change: a
				};
				return;
			}
			let c = !1;
			s(() => {
				c = !0;
			});
			let l = new Image();
			l.src = tx(e, Oy.stagePortrait) ?? e;
			let u = () => {
				c || (n.value = {
					url: e,
					label: t,
					flip: r,
					head: i,
					change: a
				});
			};
			l.decode ? l.decode().then(u, u) : (l.onload = u, l.onerror = u, l.complete && u());
		}), (e, t) => (R(), B(ns, {
			name: I(r),
			tag: "div",
			class: "grid h-full grid-rows-[100%]",
			duration: I(n).change === "in-out" ? 250 : void 0
		}, {
			default: Nn(() => [I(n).head ? (R(), z("span", {
				key: "bubble-head",
				"data-bubble-head": "",
				"aria-hidden": "true",
				class: "pointer-events-none invisible absolute aspect-square -translate-x-1/2 -translate-y-1/2",
				style: j(I(n).head)
			}, null, 4)) : U("", !0), (R(), z("img", {
				key: I(n).url,
				src: ("sizedUrl" in e ? e.sizedUrl : I(tx))(I(n).url, I(Oy).stagePortrait),
				alt: I(n).label,
				draggable: "false",
				class: "col-start-1 row-start-1 h-full w-auto max-w-none justify-self-center select-none",
				style: j(I(n).flip ? { transform: "scaleX(-1)" } : void 0)
			}, null, 12, KE))]),
			_: 1
		}, 8, ["name", "duration"]));
	}
}), JE = (e, t) => !e || !t || e.kind !== t.kind ? !1 : "id" in e && "id" in t ? e.id === t.id : !0, YE = ["onClick"], XE = [
	"data-stage-portrait",
	"data-present",
	"onPointerdown",
	"onPointermove",
	"onPointerup",
	"onClick"
], ZE = ["title"], QE = [
	"title",
	"onPointerdown",
	"onPointermove",
	"onPointerup",
	"onDblclick"
], $E = ["onClick"], eD = .14, tD = 3, nD = /* @__PURE__ */ sr({
	__name: "Stage",
	props: {
		stage: { type: Object },
		bundle: { type: null },
		fadeMs: { type: Number },
		bgStyle: { type: null },
		worldStyle: { type: Object },
		selectable: { type: Boolean },
		portraitsOnly: { type: Boolean },
		noTint: { type: Boolean },
		seeThrough: { type: Boolean },
		speaker: { type: null },
		toneDown: { type: Boolean },
		selected: { type: [Object, null] },
		movable: { type: Boolean },
		headGuide: { type: String },
		animation: { type: null },
		enterDelayMs: { type: Number }
	},
	emits: ["pick", "place"],
	setup(e, { emit: t }) {
		let n = e, { t: r } = eb(), i = t, a = qw({
			base: "",
			variants: {
				selectable: { true: "cursor-pointer hover:outline-2 hover:outline-primary/60" },
				selected: { true: "outline-3 outline-primary hover:outline-primary" }
			}
		}), o = (e) => !!n.selectable && (!n.portraitsOnly || e.kind === "portrait"), s = (e) => o(e) ? a({
			selectable: !0,
			selected: JE(n.selected ?? null, e)
		}) : "";
		function c(e, t) {
			o(e) && (t.stopPropagation(), i("pick", e));
		}
		let l = qw({
			base: "absolute inset-0 transition-colors duration-1000",
			variants: { mood: {
				dawn: "bg-tone-dawn",
				day: "bg-tone-day",
				dusk: "bg-tone-dusk",
				night: "bg-tone-night",
				storm: "bg-tone-storm",
				dream: "bg-tone-dream"
			} },
			defaultVariants: { mood: "day" }
		}), u = (e) => e ? n.bundle.assets.assets[e]?.url : void 0, d = (e) => n.bundle.characters.find((t) => t.id === e), f = W(() => $g(n.bundle.story.settings?.portraits)), p = W(() => ({
			on: !!n.speaker && !!n.stage.portraits[n.speaker] && Object.keys(n.stage.portraits).length > 1,
			emphasis: Zg(n.bundle.story.settings?.portraits)
		}));
		function m(e) {
			let { on: t, emphasis: r } = p.value;
			if (!t) return null;
			let i = r.dim, a = n.toneDown === !1 ? "off" : n.toneDown === !0 && i === "off" ? "subtle" : i;
			return a !== "off" || r.shrink ? {
				brightness: r_(a, d(e)?.dimExtra).brightness,
				scale: r.shrink ? .96 : 1
			} : null;
		}
		let h = (e, t) => (e.brightness ?? 1) * t, g = W(() => {
			let e = n.stage.backdrop;
			return {
				filter: [e?.brightness === void 0 ? "" : `brightness(${e.brightness})`, e?.blur ? `blur(${e.blur * tD}cqw)` : ""].filter(Boolean).join(" ") || "none",
				transform: e?.blur ? `scale(${1 + e.blur * tD * .025})` : "none"
			};
		}), _ = W(() => {
			let e = Object.entries(n.stage.portraits), t = /* @__PURE__ */ new Map();
			for (let [n, r] of e) {
				if (r.pos) continue;
				let e = r.slot ?? "center";
				t.set(e, [...t.get(e) ?? [], n]);
			}
			return e.map(([e, r], i) => {
				let a = d(e), o = r.expr ?? a?.defaultExpression, s = Mv(a, o), c = Nv(a, o), l = r.pos ? [e] : t.get(r.slot ?? "center") ?? [e], f = (l.indexOf(e) - (l.length - 1) / 2) * eD, p = y.value?.who === e ? y.value : null, g = (r.pos ? r.pos.x : UT[r.slot ?? "center"]) + f, _ = p?.mode === "move" ? p.x : g, v = n.speaker === e, b = v ? null : m(e), x = (p?.mode === "resize" ? p.scale : r.pos?.scale ?? 1) * (c?.scale ?? 1) * (b?.scale ?? 1), S = p?.mode === "move" && p.y !== void 0 ? p.y : r.pos?.y, C = S === void 0 ? 0 : (1 - S) * 100, w = u(s), T = w ? Pv(a, o) : void 0, E = c?.flip === !0 != (r.flip === !0);
				return {
					who: e,
					x: _,
					head: T ? {
						left: `${(E ? 1 - T.x : T.x) * 100}%`,
						top: `${T.y * 100}%`,
						height: `${T.size * 100}%`
					} : null,
					fitScale: c?.scale ?? 1,
					current: r,
					label: `${e}${o ? ` (${o})` : ""}`,
					url: w,
					flip: E,
					style: {
						left: `${_ * 100}%`,
						bottom: `${C + (c?.lift ?? 0) * 100}%`,
						height: `${HT * 100 * x}%`,
						zIndex: r.layer === "back" ? 1 + i : r.layer === "front" ? 50 + i : v ? 30 : 10 + i,
						"--vn-slide": g < .5 ? "-40%" : "40%",
						...h(r, b?.brightness ?? 1) === 1 ? {} : { filter: `brightness(${h(r, b?.brightness ?? 1)})` },
						...w ? {} : { aspectRatio: "3 / 5" }
					}
				};
			});
		}), v = W(() => n.animation ?? f.value.animation), y = /* @__PURE__ */ F(null), b = lr("root"), x = !1, S = (e, t, n) => Math.min(n, Math.max(t, e)), C = (e, t = 3) => Math.round(e * 10 ** t) / 10 ** t, w = (e) => JE(n.selected ?? null, {
			kind: "portrait",
			id: e
		}), T = (e) => !!n.movable && !!n.selectable && w(e);
		function E(e) {
			let t = b.value?.getBoundingClientRect();
			return !t || t.width === 0 ? null : {
				x: (e.clientX - t.left) / t.width,
				y: (e.clientY - t.top) / t.height,
				w: t.width,
				h: t.height
			};
		}
		function ee(e) {
			return c_.reduce((t, n) => Math.abs(UT[n] - e) < Math.abs(UT[t] - e) ? n : t);
		}
		function D(e, t) {
			if (!T(e.who) || t.button !== 0) return;
			let n = E(t);
			n && (t.currentTarget.setPointerCapture(t.pointerId), y.value = {
				who: e.who,
				mode: "move",
				x: e.x,
				y: e.current.pos?.y,
				scale: e.current.pos?.scale ?? 1,
				free: !1,
				grab: n.x - e.x,
				grabY: n.y - (e.current.pos?.y ?? 1),
				startX: t.clientX,
				startY: t.clientY,
				moved: !1
			});
		}
		function te(e, t) {
			T(e.who) && t.button === 0 && (t.stopPropagation(), t.currentTarget.setPointerCapture(t.pointerId), y.value = {
				who: e.who,
				mode: "resize",
				x: e.x,
				y: e.current.pos?.y,
				scale: e.current.pos?.scale ?? 1,
				free: !0,
				grab: 0,
				grabY: 0,
				startX: t.clientX,
				startY: t.clientY,
				moved: !1
			});
		}
		function ne(e, t) {
			let n = y.value;
			if (!n || n.who !== e.who) return;
			let r = E(t);
			if (r && !(!n.moved && Math.hypot(t.clientX - n.startX, t.clientY - n.startY) < 4)) {
				if (n.moved = !0, n.mode === "resize") {
					let t = e.current.pos ? e.current.pos.y : 1, i = S(t - r.y, .12, 1.4);
					n.scale = S(C(i / HT / e.fitScale, 2), .3, 3);
				} else n.free = t.shiftKey, n.x = S(r.x - n.grab, 0, 1), n.y = n.free ? S(C(r.y - n.grabY), .5, 1) : void 0;
			}
		}
		function re(e) {
			let t = y.value;
			if (y.value = null, t && t.who === e.who && t.moved) {
				if (x = !0, t.mode === "resize") {
					let n = e.current.pos ?? {
						x: C(UT[e.current.slot ?? "center"]),
						y: 1
					};
					i("place", e.who, { pos: {
						x: n.x,
						y: n.y,
						scale: t.scale
					} });
				} else t.free ? i("place", e.who, { pos: {
					x: C(t.x),
					y: t.y ?? 1,
					...e.current.pos?.scale === void 0 ? {} : { scale: e.current.pos.scale }
				} }) : i("place", e.who, { slot: ee(t.x) });
			}
		}
		function O(e) {
			let t = e.current.pos;
			t?.scale !== void 0 && i("place", e.who, { pos: {
				x: t.x,
				y: t.y
			} });
		}
		function k(e, t) {
			x ? (x = !1, t.stopPropagation()) : c({
				kind: "portrait",
				id: e
			}, t);
		}
		let ie = W(() => y.value?.mode === "move" && y.value.moved && !y.value.free ? c_.map((e) => ({
			pos: e,
			x: UT[e],
			near: ee(y.value.x) === e
		})) : []), ae = (e) => Object.entries(n.stage.objects).filter(([, t]) => t.layer === e).map(([e, t]) => {
			let n = t.pos ? t.pos.x : bT[t.slot ?? "center"], r = t.pos ? t.pos.y : .55;
			return {
				id: e,
				url: u(t.asset),
				label: t.asset,
				style: {
					left: `${n * 100}%`,
					top: `${r * 100}%`,
					width: `${36 * (t.pos?.scale ?? 1)}%`,
					aspectRatio: "4 / 3"
				}
			};
		}), A = W(() => ae("back")), oe = W(() => ae("front"));
		return (t, n) => {
			let i = gT, a = qE, d = ob;
			return R(), z("div", {
				ref_key: "root",
				ref: b,
				class: N(["absolute inset-0 overflow-hidden", e.seeThrough ? "" : "bg-black"]),
				style: j({
					"--vn-fade": `${e.fadeMs}ms`,
					"--vn-portrait-enter-delay": `${e.enterDelayMs ?? 0}ms`
				})
			}, [V("div", {
				class: "absolute inset-0 will-change-transform",
				style: j(e.worldStyle)
			}, [
				V("div", {
					class: "vn-backdrop pointer-events-none absolute inset-0",
					style: j(I(g))
				}, [H(no, { name: e.bgStyle === "cut" || e.bgStyle === "blur" ? `vn-bg-${e.bgStyle}` : "vn-fade" }, {
					default: Nn(() => [e.stage.background && !e.seeThrough ? (R(), z("div", {
						key: e.stage.background,
						"data-stage-background": "",
						class: N(["pointer-events-auto absolute inset-0", o({ kind: "background" }) ? "cursor-pointer" : ""]),
						onClick: n[0] ||= (e) => c({ kind: "background" }, e)
					}, [H(i, {
						url: u(e.stage.background),
						label: e.stage.background,
						fit: "cover"
					}, null, 8, ["url", "label"])], 2)) : U("", !0)]),
					_: 1
				}, 8, ["name"])], 4),
				H(ns, {
					name: "vn-fade",
					tag: "div",
					class: "pointer-events-none absolute inset-0"
				}, {
					default: Nn(() => [(R(!0), z(L, null, Nr(I(A), (e) => (R(), z("div", {
						key: e.id,
						class: N(["pointer-events-auto absolute -translate-x-1/2 -translate-y-1/2", s({
							kind: "object",
							id: e.id
						})]),
						style: j(e.style),
						onClick: (t) => c({
							kind: "object",
							id: e.id
						}, t)
					}, [H(i, {
						url: e.url,
						label: e.label
					}, null, 8, ["url", "label"])], 14, YE))), 128))]),
					_: 1
				}),
				e.seeThrough ? U("", !0) : (R(), z("div", {
					key: 0,
					class: "pointer-events-none absolute inset-0 bg-black",
					style: j({
						opacity: e.stage.dim ?? 0,
						transition: "opacity var(--vn-fade) linear"
					})
				}, null, 4)),
				e.noTint ? U("", !0) : (R(), z("div", {
					key: 1,
					class: N([I(l)({ mood: e.stage.tone ?? "day" }), "pointer-events-none"])
				}, null, 2)),
				H(ns, {
					name: `vn-portrait-${I(v)}`,
					duration: {
						enter: I(v) === "cut" ? e.enterDelayMs ?? 0 : e.fadeMs + (e.enterDelayMs ?? 0),
						leave: I(v) === "cut" ? 0 : e.fadeMs
					},
					"data-enter-delayed": !!e.enterDelayMs,
					tag: "div",
					class: "pointer-events-none absolute inset-0"
				}, {
					default: Nn(() => [(R(!0), z(L, null, Nr(I(_), (t) => (R(), z("div", {
						key: t.who,
						"data-stage-portrait": t.who,
						"data-present": !!e.stage.portraits[t.who],
						class: N(["pointer-events-auto absolute -translate-x-1/2", [
							s({
								kind: "portrait",
								id: t.who
							}),
							I(y)?.who === t.who ? "" : "transition-[left,bottom,height,filter] duration-1000 ease-in-out",
							T(t.who) ? "cursor-grab touch-none active:cursor-grabbing" : ""
						]]),
						style: j(t.style),
						onPointerdown: (e) => D(t, e),
						onPointermove: (e) => ne(t, e),
						onPointerup: (e) => re(t),
						onPointercancel: n[3] ||= (e) => y.value = null,
						onClick: (e) => k(t.who, e)
					}, [
						t.url ? (R(), B(a, {
							key: 0,
							url: t.url,
							label: t.label,
							flip: t.flip,
							head: t.head,
							change: t.current.exprChange
						}, null, 8, [
							"url",
							"label",
							"flip",
							"head",
							"change"
						])) : (R(), B(i, {
							key: 1,
							url: t.url,
							label: t.label,
							width: I(Oy).stagePortrait
						}, null, 8, [
							"url",
							"label",
							"width"
						])),
						t.head && e.headGuide ? (R(), z("span", {
							key: 2,
							class: N(["pointer-events-none absolute z-20 aspect-square -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-dashed border-amber-300 shadow-[0_0_0_1px_rgb(0_0_0/0.45)] transition-opacity", e.headGuide === "focus" ? "bg-amber-300/25 opacity-100" : "bg-amber-300/10 opacity-75"]),
							style: j(t.head),
							"data-head-guide": ""
						}, null, 6)) : U("", !0),
						e.selectable && e.speaker === t.who ? (R(), z("span", {
							key: 3,
							class: N(["absolute top-[2%] z-10 grid size-[2.4cqw] min-h-4 min-w-4 place-items-center rounded-full bg-primary text-white shadow ring-2 ring-white", t.x > .5 ? "right-[4%]" : "left-[4%]"]),
							title: I(r)("editor.speakerMarker", { name: t.label })
						}, [H(d, {
							name: "i-lucide-message-circle",
							class: "size-[65%]"
						})], 10, ZE)) : U("", !0),
						T(t.who) ? (R(), z("span", {
							key: 4,
							"data-resize": "",
							class: "absolute top-0 left-1/2 size-[2.2cqw] min-h-3 min-w-3 -translate-x-1/2 -translate-y-1/2 cursor-ns-resize touch-none rounded-full border-2 border-white bg-primary shadow",
							title: I(r)("editor.portrait.resizeHandle"),
							onPointerdown: (e) => te(t, e),
							onPointermove: (e) => ne(t, e),
							onPointerup: (e) => re(t),
							onPointercancel: n[1] ||= (e) => y.value = null,
							onDblclick: us((e) => O(t), ["stop"]),
							onClick: n[2] ||= us(() => {}, ["stop"])
						}, null, 40, QE)) : U("", !0)
					], 46, XE))), 128))]),
					_: 1
				}, 8, [
					"name",
					"duration",
					"data-enter-delayed"
				]),
				(R(!0), z(L, null, Nr(I(ie), (e) => (R(), z("div", {
					key: e.pos,
					class: N(["pointer-events-none absolute inset-y-0 z-40 w-[10%] -translate-x-1/2 border-x border-dashed transition-colors", e.near ? "border-primary bg-primary/20" : "border-white/30"]),
					style: j({ left: `${e.x * 100}%` })
				}, null, 6))), 128)),
				H(ns, {
					name: "vn-fade",
					tag: "div",
					class: "pointer-events-none absolute inset-0"
				}, {
					default: Nn(() => [(R(!0), z(L, null, Nr(I(oe), (e) => (R(), z("div", {
						key: e.id,
						class: N(["pointer-events-auto absolute -translate-x-1/2 -translate-y-1/2", s({
							kind: "object",
							id: e.id
						})]),
						style: j(e.style),
						onClick: (t) => c({
							kind: "object",
							id: e.id
						}, t)
					}, [H(i, {
						url: e.url,
						label: e.label
					}, null, 8, ["url", "label"])], 14, $E))), 128))]),
					_: 1
				})
			], 4)], 6);
		};
	}
}), rD = {
	class: "pointer-events-none absolute inset-0",
	style: {
		"background-color": "#26262c",
		"background-image": "repeating-conic-gradient(#33333b 0% 25%, #26262c 0% 50%)",
		"background-size": "4cqw 4cqw"
	}
}, iD = {
	key: 0,
	class: "absolute top-[3cqw] left-1/2 -translate-x-1/2 rounded-full bg-black/50 px-[2cqw] py-[0.6cqw] text-[1.8cqw] whitespace-nowrap text-white/80"
}, aD = /* @__PURE__ */ sr({
	__name: "Checkerboard",
	props: { label: { type: String } },
	setup(e) {
		return (t, n) => (R(), z("div", rD, [e.label ? (R(), z("p", iD, P(e.label), 1)) : U("", !0)]));
	}
});
//#endregion
//#region ../../apps/studio/app/utils/portrait.ts
function oD(e, t, n) {
	let r = e.characters.find((e) => e.id === t.speaker), i = t.portrait?.faceSide ?? r?.faceSide ?? $g(e.story.settings?.portraits).faceSide;
	if (i !== "follow") return i;
	let a = t.speaker ? n?.portraits[t.speaker] : void 0;
	return (a?.pos ? a.pos.x : a?.slot ? UT[a.slot] : .5) > .6 ? "right" : "left";
}
function sD(e, t, n) {
	if (t.kind !== "line" || !t.speaker) return;
	let r = t.portrait?.show ?? $g(e.story.settings?.portraits).show;
	if (r === "stage" || r === "none") return;
	let i = e.characters.find((e) => e.id === t.speaker), a = Av(i, t.expr ?? n?.portraits[t.speaker]?.expr), o = a?.asset;
	if (o) return {
		url: e.assets.assets[o]?.url,
		label: o,
		side: oD(e, t, n),
		...a && i?.faceCrops?.[a.expression] ? { crop: i.faceCrops[a.expression] } : {}
	};
}
function cD(e) {
	return e?.kind === "line" ? {
		speaker: e.speaker,
		toneDown: e.portrait?.toneDown
	} : {
		speaker: void 0,
		toneDown: void 0
	};
}
function lD(e, t) {
	let n = $g(e.story.settings?.portraits).animation;
	if (!t) return n;
	let r = e.story.scenes.flatMap((e) => e.steps).find((e) => e.id === t);
	if (!r) return n;
	if (r.type === "line" && r.portrait?.animation) return r.portrait.animation;
	for (let e of [...r.stage ?? []].reverse()) if ((e.op === "enter" || e.op === "exit" || e.op === "clear") && e.animation) return e.animation;
	return n;
}
function uD(e, t, n) {
	let r = e.characters.find((e) => e.id === t.speaker), i = t.speaker ? n?.portraits[t.speaker] : void 0;
	return i?.pos?.x ?? t.portrait?.pos?.x ?? UT[i?.slot ?? t.portrait?.slot ?? r?.home ?? "left"];
}
//#endregion
//#region ../../apps/studio/app/utils/storyProgress.ts
function dD(e) {
	let t = pb(e).filter((t) => !e.scenes.find((e) => e.id === t.sceneId)?.trigger), n = new Map(t.map((e, t) => [e.step.id, t])), r = new Set(t.filter(({ step: e }) => !e.hidden && (e.type === "line" || e.type === "narration")).map(({ step: e }) => e.id));
	return (e) => {
		let i = e.stepId ? n.get(e.stepId) : void 0, a = e.history ? e.history.filter((e) => r.has(e)).length : i === void 0 ? 0 : t.slice(0, i + 1).filter(({ step: e }) => r.has(e.id)).length;
		if (e.ended) return {
			current: a,
			total: a,
			approximate: !1,
			ratio: 1
		};
		let o = /* @__PURE__ */ new Set();
		function s(t) {
			if (!t || e.ignoreConditions) return !0;
			if ("flag" in t) return o.has(t.flag) ? void 0 : lb(t, { getFlag: (t) => e.flags[t] });
			if ("completed" in t) return;
			if ("not" in t) {
				let e = s(t.not);
				return e === void 0 ? void 0 : !e;
			}
			let n = ("and" in t ? t.and : t.or).map(s);
			return "and" in t ? n.includes(!1) ? !1 : !n.includes(void 0) || void 0 : n.includes(!0) ? !0 : n.includes(void 0) ? void 0 : !1;
		}
		let c = 0, l = !e.history && t.some(({ step: e }) => !!e.when), u = /* @__PURE__ */ new Set(), d = i === void 0 ? 0 : i + 1;
		function f(e) {
			if (e.type === "choice") for (let t of e.options) for (let e of t.set ?? []) o.add(e.flag);
			if (e.type === "event" && o.add(jy(e)), e.type === "set") for (let t of e.set) o.add(t.flag);
		}
		for (i !== void 0 && f(t[i].step); d < t.length;) {
			if (u.has(d)) {
				l = !0, c += 1;
				break;
			}
			u.add(d);
			let e = t[d], i = e.step, a = !i.hidden && s(i.when);
			if (a === !1) d++;
			else {
				if (a === void 0 && (l = !0), r.has(i.id) && (c += a === void 0 ? .5 : 1), i.type === "end") {
					if (a === !0) break;
					l = !0;
				}
				if (f(i), e.jump !== void 0) {
					if (a === void 0) {
						l = !0, d++;
						continue;
					}
					if (e.jump === null) break;
					let t = n.get(e.jump);
					if (t !== void 0) {
						d = t;
						continue;
					}
				}
				d++;
			}
		}
		let p = Math.max(a, Math.round(a + c));
		return {
			current: a,
			total: p,
			approximate: l,
			ratio: Math.min(.99, p ? a / p : 0)
		};
	};
}
function fD(e, t) {
	let n = (t) => `vns:save:${e}:${t}`, r = (r) => {
		try {
			let i = t?.getItem(n(r));
			if (!i) return;
			let a = JSON.parse(i);
			return a.snapshot?.storyId === e ? a : void 0;
		} catch {
			return;
		}
	}, i = (e, r) => {
		try {
			return t?.setItem(n(e), JSON.stringify(r)), t !== null;
		} catch {
			return !1;
		}
	};
	return {
		read: r,
		write: i,
		auto: () => r("auto"),
		writeAuto: (e, t) => i("auto", {
			snapshot: e,
			savedAt: Date.now(),
			label: t
		}),
		clear(e) {
			try {
				t?.removeItem(n(e));
			} catch {}
		},
		slots: () => Array.from({ length: 3 }, (e, t) => r(`slot${t + 1}`))
	};
}
//#endregion
//#region ../../apps/studio/app/utils/audio.ts
var pD = .35, mD = 200, hD = 600, gD = class {
	resolve;
	create;
	music = null;
	muted = !1;
	suspended = !1;
	master = 1;
	fading = /* @__PURE__ */ new Set();
	effects = /* @__PURE__ */ new Set();
	voices = /* @__PURE__ */ new Set();
	endings = /* @__PURE__ */ new Set();
	duck = 1;
	duckTimer;
	cover = 1;
	coverTimer;
	constructor(e, t = (e) => new Audio(e)) {
		this.resolve = e, this.create = t;
	}
	get isMuted() {
		return this.muted;
	}
	get currentMusic() {
		return this.music?.key ?? null;
	}
	suspend() {
		this.suspended || (this.suspended = !0, this.music?.el.pause());
	}
	resume() {
		this.suspended && (this.suspended = !1, this.music && Promise.resolve(this.music.el.play()).catch(() => void 0));
	}
	setMuted(e) {
		this.muted = e, this.music && (this.music.el.volume = this.musicVolume(this.music)), this.syncVoices();
	}
	setMasterVolume(e) {
		this.master = Math.min(1, Math.max(0, e)), this.music && (this.music.el.volume = this.musicVolume(this.music)), this.syncVoices();
	}
	syncVoices() {
		for (let e of this.voices) e.el.volume = this.effective(e.level);
	}
	setMusic(e, t = {}) {
		let n = t.volume ?? 1, r = t.fadeMs ?? 800;
		if (this.music && this.music.key === e) {
			this.fade(this.music, n, r);
			return;
		}
		let i = this.music;
		if (this.music = null, i && this.fade(i, 0, r, () => this.dispose(i)), e === null) return;
		let a = this.resolve(e);
		if (!a) return;
		let o = this.create(a);
		o.loop = !0, o.volume = 0, t.offsetMs && t.offsetMs > 0 && this.seek(o, t.offsetMs);
		let s = {
			key: e,
			el: o,
			level: 0
		};
		this.music = s, this.suspended || Promise.resolve(o.play()).catch(() => void 0), this.fade(s, n, r);
	}
	seek(e, t) {
		let n = () => {
			let n = e.duration, r = t / 1e3;
			try {
				e.currentTime = n !== void 0 && Number.isFinite(n) && n > 0 ? r % n : r;
			} catch {}
		};
		n(), (e.duration === void 0 || !Number.isFinite(e.duration)) && (e.onloadedmetadata = n);
	}
	playSfx(e, t = 1, n) {
		this.playOnce(e, t, n);
	}
	playVoice(e, t = {}) {
		t.layer || this.stopVoice({ keepLayered: !0 });
		let n = this.resolve(e);
		if (!n || this.muted || this.suspended) return;
		let r = this.create(n), i = t.volume ?? 1;
		r.volume = this.effective(i);
		let a = {
			el: r,
			ducking: t.duck !== !1,
			layered: !!t.layer,
			level: i
		};
		this.voices.add(a);
		let o = () => this.release(a);
		r.onended = o, r.onerror = o, t.end && (a.cancelEnd = this.scheduleEnd(r, r.volume, t.end, o)), this.syncDuck(), Promise.resolve(r.play()).catch(o);
	}
	get speaking() {
		for (let e of this.voices) if (!e.layered) return !0;
		return !1;
	}
	stopVoice(e = {}) {
		for (let t of [...this.voices]) e.keepLayered && t.layered || (t.cancelEnd?.(), t.el.onended = null, t.el.onerror = null, t.el.pause(), t.el.currentTime = 0, this.voices.delete(t));
		this.syncDuck();
	}
	release(e) {
		e.cancelEnd?.(), this.voices.delete(e), this.syncDuck();
	}
	syncDuck() {
		let e = [...this.voices].some((e) => e.ducking);
		this.rampDuck(e ? pD : 1);
	}
	rampDuck(e) {
		this.duckTimer && clearInterval(this.duckTimer);
		let t = this.duck, n = e < t ? mD : hD, r = Date.now(), i = () => {
			this.music && (this.music.el.volume = this.musicVolume(this.music));
		};
		t !== e && (this.duckTimer = setInterval(() => {
			let a = Math.min(1, (Date.now() - r) / n);
			this.duck = t + (e - t) * a, i(), a >= 1 && (clearInterval(this.duckTimer), this.duckTimer = void 0);
		}, 40));
	}
	musicVolume(e) {
		return this.effective(e.level * this.duck * this.cover);
	}
	fadeMusicTo(e, t) {
		this.coverTimer && clearInterval(this.coverTimer), this.coverTimer = void 0;
		let n = Math.min(1, Math.max(0, e)), r = this.cover, i = () => {
			this.music && (this.music.el.volume = this.musicVolume(this.music));
		};
		if (t <= 0 || r === n) {
			this.cover = n, i();
			return;
		}
		let a = Date.now();
		this.coverTimer = setInterval(() => {
			let e = Math.min(1, (Date.now() - a) / t);
			this.cover = r + (n - r) * e, i(), e >= 1 && (clearInterval(this.coverTimer), this.coverTimer = void 0);
		}, 40);
	}
	stopSounds() {
		this.stopVoice();
		for (let e of this.effects) e.onended = null, e.onerror = null, e.pause(), e.currentTime = 0;
		this.effects.clear();
	}
	stopAll() {
		this.stopVoice();
		for (let e of [...this.endings]) e();
		for (let e of this.effects) e.onended = null, e.onerror = null, e.pause(), e.currentTime = 0;
		if (this.effects.clear(), this.music) {
			let e = this.music;
			this.music = null, this.dispose(e);
		}
		for (let e of [...this.fading]) this.dispose(e);
		this.fadeMusicTo(1, 0);
	}
	scheduleEnd(e, t, n, r) {
		let i = Math.min(Math.max(n.fadeMs ?? 0, 0), n.afterMs), a = {}, o = () => {
			clearTimeout(a.cut), clearTimeout(a.fadeStart), clearInterval(a.fade), this.endings.delete(o);
		};
		return this.endings.add(o), i > 0 && (a.fadeStart = setTimeout(() => {
			let n = Date.now();
			a.fade = setInterval(() => {
				let r = Math.min(1, (Date.now() - n) / i);
				e.volume = this.muted ? 0 : t * (1 - r);
			}, 40);
		}, n.afterMs - i)), a.cut = setTimeout(() => {
			o(), e.onended = null, e.onerror = null, e.pause(), e.currentTime = 0, r();
		}, n.afterMs), o;
	}
	playOnce(e, t, n) {
		let r = this.resolve(e);
		if (!r || this.muted || this.suspended) return;
		let i = this.create(r);
		i.volume = this.effective(t), this.effects.add(i);
		let a, o = () => {
			a?.(), this.effects.delete(i);
		};
		i.onended = o, i.onerror = o, n && (a = this.scheduleEnd(i, i.volume, n, o)), Promise.resolve(i.play()).catch(o);
	}
	effective(e) {
		return this.muted ? 0 : Math.min(1, Math.max(0, e * this.master));
	}
	fade(e, t, n, r) {
		e.timer && clearInterval(e.timer);
		let i = e.level;
		if (n <= 0 || i === t) {
			e.level = t, e.el.volume = this.musicVolume(e), r?.();
			return;
		}
		this.fading.add(e);
		let a = Date.now();
		e.timer = setInterval(() => {
			let o = Math.min(1, (Date.now() - a) / n);
			e.level = i + (t - i) * o, e.el.volume = this.musicVolume(e), o >= 1 && (clearInterval(e.timer), e.timer = void 0, this.fading.delete(e), r?.());
		}, 40);
	}
	dispose(e) {
		e.timer && clearInterval(e.timer), this.fading.delete(e), e.el.pause(), e.el.currentTime = 0;
	}
}, _D = 2600, vD = 400, yD = "vns.muted";
function bD(e, t, n = {}) {
	let r = n.engine !== void 0, i = n.engine ?? wb(), a = n.persist ?? !0, o = fD(e.story.id, a ? xD() : null), s = n.audio ?? new gD((t) => e.assets.assets[t]?.url), c = /* @__PURE__ */ F(!1), l = /* @__PURE__ */ F(r ? "playing" : "title"), u = /* @__PURE__ */ Jt(null), d = /* @__PURE__ */ Jt(mb()), f = /* @__PURE__ */ F(vD), p = /* @__PURE__ */ F("fade"), m = /* @__PURE__ */ F(null), h = /* @__PURE__ */ F(null), g = /* @__PURE__ */ F(null), _ = /* @__PURE__ */ F([]), v = /* @__PURE__ */ F([]), y = /* @__PURE__ */ F([]), b = /* @__PURE__ */ F(null), x = /* @__PURE__ */ Jt({}), S = a ? xD() : null, C = /* @__PURE__ */ F(t ?? (a ? qy(e.story.languages, (() => {
		try {
			return S?.getItem(Gy(e.story.id)) ?? null;
		} catch {
			return null;
		}
	})(), navigator.languages ?? []) : e.story.languages.source)), w = n.mute ? null : xD(), T = /* @__PURE__ */ F(n.mute?.current() ?? !1), E = n.mute?.subscribe((e) => T.value = e);
	try {
		n.mute || (T.value = w?.getItem(yD) === "1");
	} catch {}
	!n.audio && !n.mute && s.setMuted(T.value);
	let ee = /* @__PURE__ */ F([]), D = /* @__PURE__ */ F(!1), te = /* @__PURE__ */ F(null), ne = /* @__PURE__ */ F(o.slots()), re = 1, O = [], k = !1, ie, ae = !0;
	function A() {
		clearTimeout(ie);
		let e = m.value;
		e && !e.corner && (ae || e.durationMs === void 0) && (ie = setTimeout(() => m.value = null, e.durationMs ?? _D));
	}
	let oe = null;
	r || (ee.value = i.load(e, {
		lang: C.value,
		hostEvents: e.story.contract.hostEvents,
		...n.stopAtBranchingEvents ? { hostEventSteps: Ry(e.story) } : {}
	}).warnings), C.value = i.lang, x.value = i.getFlags(), D.value = o.auto() !== void 0;
	function se(e, t) {
		let n = re++, r = Ug(e);
		_.value = [..._.value, {
			id: n,
			...r,
			...t ? { owner: t } : {}
		}], setTimeout(() => {
			_.value = _.value.filter((e) => e.id !== n);
		}, r.durationMs + 100);
	}
	function ce(t) {
		if (t.kind !== "line" && t.kind !== "narration") return;
		let n = t.kind === "line" ? sD(e, t, d.value) : void 0, r = {
			stepId: t.stepId,
			...t.kind === "line" ? {
				speaker: t.speakerName,
				...t.speakerColor ? { color: t.speakerColor } : {}
			} : {},
			...n?.url ? { face: {
				url: n.url,
				label: n.label
			} } : {},
			text: t.text
		};
		y.value[y.value.length - 1]?.stepId === t.stepId ? y.value = [...y.value.slice(0, -1), r] : y.value = [...y.value, r];
	}
	let j = null, le = !1;
	function ue(e, t) {
		let n = t.find((e) => e.op === "music"), i = e.music?.asset ?? null, a = s.currentMusic !== i && (!r || le);
		le = !1, (n || i !== j || a) && (j = i, s.setMusic(e.music?.asset ?? null, {
			volume: e.music?.volume ?? 1,
			fadeMs: n && "fadeMs" in n ? n.fadeMs : void 0
		}));
	}
	let M = (e) => {
		let t = e.flatMap((e) => "fadeMs" in e && e.fadeMs !== void 0 ? [e.fadeMs] : []);
		return t.length ? Math.max(...t) : vD;
	}, de = (e) => e.filter((e) => e.op === "bg").at(-1)?.style ?? "fade";
	function N(e) {
		let t = e.veil;
		t ? h.value = {
			color: t.color,
			affects: t.affects,
			opacity: 1,
			ms: 0
		} : h.value && h.value.opacity !== 0 && (h.value = {
			...h.value,
			opacity: 0,
			ms: 0
		}), s.fadeMusicTo(+!t?.affects.includes("music"), 0);
	}
	function fe() {
		if (oe) for (let e of oe.timers) clearTimeout(e);
		oe = null, g.value = null;
	}
	function pe(e, t, n) {
		fe(), u.value = e;
		let r = e.affects.includes("picture"), i = e.affects.includes("music"), a = e.mode === "through" && r, o = !1, c = () => {
			o || (o = !0, f.value = a ? 0 : M(n), p.value = de(n), d.value = t, ue(t, n));
		};
		a || c();
		let l = [], m = (e, t) => void l.push(setTimeout(t, e)), _ = (t, n) => {
			h.value = {
				color: e.color,
				affects: e.affects,
				opacity: t,
				ms: n
			};
		}, v = 30 + e.outMs, y = v + e.holdMs, b = y + e.inMs;
		_(+!!e.covered, 0), e.mode !== "in" && (e.affects.includes("dialog") && (g.value = {
			opacity: 1,
			ms: 0
		}), m(30, () => {
			_(1, e.outMs), i && s.fadeMusicTo(0, e.outMs), g.value &&= {
				opacity: 0,
				ms: e.outMs
			};
		})), a && m(v, c), e.mode !== "out" && m(y, () => {
			_(0, e.inMs), i && s.fadeMusicTo(1, e.inMs);
		}), m(b, () => me()), oe = {
			stepId: e.stepId,
			timers: l,
			land: () => {
				c(), N(t);
			}
		};
	}
	function me() {
		let e = oe;
		if (e) {
			oe = null;
			for (let t of e.timers) clearTimeout(t);
			g.value = null, e.land(), i.transitionDone();
		}
	}
	let he = {
		view(t, n, r) {
			if (t.kind === "transition") oe?.stepId === t.stepId ? u.value = t : pe(t, n, r);
			else {
				if (N(n), m.value?.durationMs !== void 0 && (t.kind !== "delay" || !t.stepId.startsWith("scene-title:")) && (clearTimeout(ie), m.value = null), u.value = t, d.value = n, (t.kind === "line" || t.kind === "narration" || t.kind === "choice" || t.kind === "delay") && O[O.length - 1]?.stepId !== t.stepId) {
					let n = e.story.scenes.find((e) => e.steps.some((e) => e.id === t.stepId))?.id;
					n && O.push({
						sceneId: n,
						stepId: t.stepId
					});
				}
				if (f.value = M(r), p.value = de(r), ue(n, r), (t.kind === "line" || t.kind === "narration") && (t.voice ? s.playVoice(t.voice, { duck: t.duckMusic !== !1 }) : s.stopVoice({ keepLayered: !0 })), t.kind === "sequence" && !t.blocking && (v.value = [...v.value, {
					id: re++,
					sequenceId: t.sequenceId,
					sequence: t.sequence,
					stepId: t.stepId,
					layer: t.layer,
					hold: t.hold,
					leavingMs: null,
					played: t.played ?? !1,
					frozen: t.played ?? !1,
					endAfterMs: null
				}]), t.kind === "hold-end" && ye(t.start, t.ending === "cut" ? 0 : t.fadeMs, t.force), ce(t), t.kind === "narration" || t.kind === "line" || t.kind === "choice") {
					let e = t.kind === "choice" ? t.prompt ?? "" : t.text;
					o.writeAuto(i.snapshot(), e.slice(0, 80)), D.value = !0;
				}
			}
		},
		transient(e) {
			e.op === "effect" ? se(e) : s.playSfx(e.asset, e.volume ?? 1);
		},
		scene(t) {
			m.value = {
				...t,
				number: e.story.scenes.filter((e) => !e.trigger).findIndex((e) => e.id === t.sceneId) + 1
			}, A();
		},
		hostEvent(e) {
			r || (b.value = e);
		},
		flagChanged() {
			x.value = i.getFlags();
		}
	}, ge = i.subscribe(he), _e = r ? i.getView() : null;
	_e && he.view?.(_e.view, _e.stage, []);
	function ve(e, t) {
		let n = () => {
			v.value = v.value.filter((t) => !e.includes(t.id));
		};
		t <= 0 ? n() : (v.value = v.value.map((n) => e.includes(n.id) ? {
			...n,
			leavingMs: t
		} : n), setTimeout(n, t + 50));
	}
	function ye(e, t, n = !1) {
		let r = v.value.filter((t) => t.hold && t.stepId === e);
		if (ve(r.filter((e) => n || e.played).map((e) => e.id), t), n) return;
		let i = r.filter((e) => !e.played).map((e) => e.id);
		i.length && (v.value = v.value.map((e) => i.includes(e.id) ? {
			...e,
			endAfterMs: t
		} : e));
	}
	function be(e) {
		let t = v.value.find((t) => t.id === e);
		t && !t.played && (v.value = v.value.map((t) => t.id === e ? {
			...t,
			played: !0
		} : t), t.endAfterMs !== null && ve([e], t.endAfterMs));
	}
	function P() {
		fe(), _.value = [], v.value = [], b.value = null, m.value = null;
	}
	return {
		engine: i,
		audio: s,
		paused: c,
		bundle: e,
		screen: l,
		view: u,
		stage: d,
		fadeMs: f,
		bgStyle: p,
		sceneCard: m,
		veil: h,
		dialogFade: g,
		effects: _,
		overlays: v,
		log: y,
		hostEvent: b,
		flags: x,
		lang: C,
		muted: T,
		warnings: ee,
		hasAutosave: D,
		heldDelay: te,
		slots: ne,
		triggerEffect: se,
		restoreMusic() {
			le = !0;
		},
		setPaused(e) {
			c.value !== e && (c.value = e, e && s.stopVoice());
		},
		setSceneTitleAutoplay(e) {
			ae = e, A();
		},
		begin(e, t = {}) {
			P(), y.value = [], O = [], te.value = null, k = !!t.ignoreConditions, l.value = "playing", i.start({
				...e ? {
					from: e,
					...t.withOpening ? { withOpening: !0 } : {}
				} : {},
				...t.ignoreConditions ? { ignoreConditions: !0 } : {}
			});
		},
		continueGame() {
			let e = o.auto();
			return e ? (P(), l.value = "playing", C.value = e.snapshot.lang, i.restore(e.snapshot), x.value = i.getFlags(), !0) : !1;
		},
		advance: () => i.advance(),
		speaking: () => s.speaking,
		delayDone() {
			te.value = null, i.delayDone();
		},
		transitionDone: me,
		back() {
			let e = u.value && "stepId" in u.value ? u.value.stepId : null, t = O[O.length - 1]?.stepId === e ? O.pop() : void 0, n = O.pop();
			if (!n) return t && O.push(t), !1;
			let r = y.value.findIndex((e) => e.stepId === n.stepId);
			return r >= 0 && (y.value = y.value.slice(0, r)), P(), s.stopVoice(), te.value = null, i.start({
				from: n,
				...k ? { ignoreConditions: !0 } : {}
			}), u.value?.kind === "delay" && (te.value = u.value.stepId), !0;
		},
		choose: (e) => i.choose(e),
		sequenceSkipped(e) {
			_.value = _.value.filter((t) => t.owner !== e), s.stopSounds();
		},
		sequenceDone() {
			let e = u.value;
			e?.kind === "sequence" && e.hold && e.blocking && (v.value = [...v.value, {
				id: re++,
				sequenceId: e.sequenceId,
				sequence: e.sequence,
				stepId: e.stepId,
				layer: e.layer,
				hold: !0,
				leavingMs: null,
				played: !0,
				frozen: !0,
				endAfterMs: null
			}]), i.sequenceDone();
		},
		resume(e) {
			b.value = null, i.resume(e);
		},
		holdPlayed: be,
		finishOverlay(e) {
			v.value = v.value.filter((t) => t.id !== e);
		},
		setLanguage(t) {
			i.setLanguage(t), C.value = i.lang;
			try {
				S?.setItem(Gy(e.story.id), C.value);
			} catch {}
		},
		toggleMute() {
			if (n.mute) n.mute.set(!T.value);
			else {
				T.value = !T.value, s.setMuted(T.value);
				try {
					w?.setItem(yD, T.value ? "1" : "0");
				} catch {}
			}
		},
		save(e) {
			let t = u.value, n = t && (t.kind === "line" || t.kind === "narration") ? t.text.slice(0, 80) : "", r = o.write(`slot${e}`, {
				snapshot: i.snapshot(),
				savedAt: Date.now(),
				label: n
			});
			return ne.value = o.slots(), r;
		},
		load(e) {
			let t = o.read(`slot${e}`);
			return t ? (P(), l.value = "playing", C.value = t.snapshot.lang, i.restore(t.snapshot), x.value = i.getFlags(), !0) : !1;
		},
		toTitle() {
			s.stopAll(), P(), h.value = null, d.value = mb(), u.value = null, l.value = "title", D.value = o.auto() !== void 0;
		},
		watchVisibility() {
			if (n.audio) return () => void 0;
			let e = () => document.hidden ? s.suspend() : s.resume(), t = () => s.suspend();
			return document.addEventListener("visibilitychange", e), window.addEventListener("pagehide", t), window.addEventListener("pageshow", e), e(), () => {
				document.removeEventListener("visibilitychange", e), window.removeEventListener("pagehide", t), window.removeEventListener("pageshow", e);
			};
		},
		dispose() {
			ge(), E?.(), n.audio || s.stopAll(), fe(), clearTimeout(ie);
		}
	};
}
function xD() {
	try {
		return window.localStorage;
	} catch {
		return null;
	}
}
//#endregion
//#region ../../apps/studio/app/utils/autoplay.ts
var SD = [
	"slow",
	"normal",
	"fast"
], CD = {
	slow: 1.6,
	normal: 1,
	fast: .55
};
function wD(e) {
	return SD[(SD.indexOf(e) + 1) % SD.length];
}
function TD(e, t = "normal") {
	let n = Math.min(7e3, Math.max(1400, 900 + e * 45));
	return Math.round(Math.max(700, n * CD[t]));
}
//#endregion
//#region ../../apps/studio/app/components/player/Player.vue?vue&type=script&setup=true&lang.ts
var ED = ["lang"], DD = ["data-stage-layout", "data-text-style"], OD = {
	key: 4,
	class: "pointer-events-none absolute top-[1.2cqw] left-1/2 z-50 -translate-x-1/2 rounded-full bg-red-600/90 px-[1.4cqw] py-[0.4cqw] text-[1.4cqw] leading-none font-semibold tracking-wide text-white uppercase",
	role: "status"
}, kD = { class: "sr-only" }, AD = "vns.autoplaySpeed", jD = 320, MD = 220, ND = 200, PD = 1e3, FD = /*#__PURE__*/ ((e, t) => {
	let n = e.__vccOpts || e;
	for (let [e, r] of t) n[e] = r;
	return n;
})(/* @__PURE__ */ sr({
	__name: "Player",
	props: {
		bundle: { type: null },
		lang: {
			default: void 0,
			type: String
		},
		embedded: { type: Boolean },
		sceneTitleAutoplay: {
			type: Boolean,
			default: !0
		},
		from: {
			default: void 0,
			type: Object
		},
		withOpening: {
			type: Boolean,
			default: !1
		},
		copyProjects: {
			default: void 0,
			type: Array
		},
		slug: {
			default: void 0,
			type: String
		},
		engine: {
			default: void 0,
			type: Object
		},
		audio: {
			default: void 0,
			type: Object
		},
		mute: {
			default: void 0,
			type: Object
		},
		mode: {
			default: "full",
			type: String
		},
		paused: {
			type: Boolean,
			default: !1
		},
		controls: {
			type: Boolean,
			default: !0
		},
		active: {
			type: Boolean,
			default: !0
		},
		language: {
			default: void 0,
			type: String
		}
	},
	emits: [
		"exit",
		"restart",
		"gameplay"
	],
	setup(e, { emit: t }) {
		let n = e, r = t, i = n.engine !== void 0, a = bD(n.bundle, n.lang, {
			persist: !n.embedded && !i,
			stopAtBranchingEvents: !!n.embedded,
			...n.engine ? { engine: n.engine } : {},
			...n.audio ? { audio: n.audio } : {},
			...n.mute ? { mute: n.mute } : {}
		});
		Bn(() => n.paused, (e) => a.setPaused(!!e), { immediate: !0 }), Bn(() => [n.active, n.mode], ([e, t], [n]) => {
			i && e && !n && t === "full" && a.restoreMusic();
		}), Bn(() => n.language, (e) => {
			i && e && e !== a.lang.value && a.setLanguage(e);
		}, { immediate: !0 }), Bn(() => n.sceneTitleAutoplay, (e) => a.setSceneTitleAutoplay(e !== !1), {
			immediate: !0,
			flush: "sync"
		});
		let o = /* @__PURE__ */ F(!1);
		Bn(a.sceneCard, (e) => {
			e && !e.corner && (o.value = !0);
		}, { flush: "sync" });
		function s() {
			(!a.sceneCard.value || a.sceneCard.value.corner) && (o.value = !1);
		}
		let c = W(() => by(n.bundle.story.scenes)), l = OE("preview-show-every-step", () => !1), u = W(() => !!n.embedded && l.value);
		Fn(Qy, a.lang);
		let { t: d } = eb(a.lang), f = /* @__PURE__ */ F(!1), p = AE(), m = lr("root"), h = lr("stageEl"), g = qw({
			slots: {
				outer: "grid w-full place-items-center bg-black",
				stage: "vn-player @container relative aspect-video overflow-hidden bg-black text-white outline-none"
			},
			variants: {
				embedded: {
					false: {
						outer: "h-dvh",
						stage: "w-[min(100vw,calc(100dvh*16/9))]"
					},
					true: {
						outer: "h-full",
						stage: "w-full"
					}
				},
				overlay: { true: {
					outer: "bg-transparent",
					stage: "self-end bg-transparent"
				} }
			}
		}), _ = /* @__PURE__ */ F(!1);
		function v() {
			_.value = !!m.value && document.fullscreenElement === m.value;
		}
		function y() {
			document.fullscreenElement ? document.exitFullscreen() : m.value?.requestFullscreen?.().then(() => h.value?.focus({ preventScroll: !0 }));
		}
		let b = W(() => g({
			embedded: (!!n.embedded || i) && !_.value,
			overlay: i && n.mode === "overlay"
		})), x = () => void 0;
		Cr(() => {
			x = a.watchVisibility(), n.from && a.begin(n.from, {
				ignoreConditions: u.value,
				withOpening: n.withOpening
			}), n.embedded && setTimeout(() => h.value?.focus({ preventScroll: !0 }), 80), document.addEventListener("fullscreenchange", v);
		}), Er(() => {
			document.removeEventListener("fullscreenchange", v), document.fullscreenElement === m.value && document.exitFullscreen(), x(), a.dispose();
		});
		let S = W(() => {
			let e = a.view.value;
			return e && "stepId" in e ? e.stepId : void 0;
		}), C = W(() => i ? n.mode === "overlay" : !!S.value && c.value.get(S.value) === "over"), w = /* @__PURE__ */ F(!1), T;
		Bn(() => a.stage.value, (e, t) => {
			let r = S.value;
			if (!r || !t || T) return;
			let i = n.bundle.story.scenes.flatMap((e) => e.steps).find((e) => e.id === r)?.stage?.some((e) => e.op === "clear" && e.what !== "objects" && e.when === "before"), o = Object.keys(t.portraits).length > Object.keys(e.portraits).length;
			i && o && lD(n.bundle, r) !== "cut" && (w.value = !0, T = setTimeout(() => {
				w.value = !1, T = void 0;
			}, a.fadeMs.value));
		}), Er(() => clearTimeout(T));
		let E = /* @__PURE__ */ new Set(), ee = /* @__PURE__ */ F(null), D = [];
		Er(() => D.forEach(clearTimeout));
		function te(e, t = !1) {
			if (ee.value) return;
			let r = n.bundle.story.settings, i = r?.sceneFadeOutMs ?? 500, a = r?.sceneFadeInMs ?? 500, o = r?.sceneGapMs ?? 1500, s = (e, t) => void D.push(setTimeout(t, e));
			ee.value = {
				opacity: 0,
				ms: 0
			}, s(30, () => ee.value = {
				opacity: 1,
				ms: i
			}), s(30 + i + o, () => {
				e(), t ? (ee.value = {
					opacity: 0,
					ms: a
				}, s(a + 50, () => ee.value = null)) : s(120, () => ee.value = null);
			});
		}
		let ne = [];
		Er(() => {
			for (let e of ne) e.removeAttribute("src"), e.load();
			ne.length = 0;
		}), Bn(S, (e) => {
			if (e) {
				for (let { url: t, width: r } of DT(n.bundle, e)) {
					let e = tx(t, r);
					e && !E.has(e) && (E.add(e), new Image().src = e);
				}
				for (let t of kT(n.bundle, e)) {
					if (E.has(t)) continue;
					E.add(t);
					let e = document.createElement("video");
					e.preload = "auto", e.muted = !0, e.src = t, ne.push(e);
				}
			}
		}, { immediate: !0 });
		let re = lr("dialog"), O = /* @__PURE__ */ F(!1);
		function k() {
			try {
				let e = localStorage.getItem(AD);
				return SD.find((t) => t === e) ?? "normal";
			} catch {
				return "normal";
			}
		}
		let ie = /* @__PURE__ */ F(k());
		function ae() {
			ie.value = wD(ie.value);
			try {
				localStorage.setItem(AD, ie.value);
			} catch {}
		}
		let A = /* @__PURE__ */ F(null);
		function oe() {
			O.value = !O.value;
		}
		let se = /* @__PURE__ */ F(!1), ce = /* @__PURE__ */ F(!1), le = /* @__PURE__ */ F(!1), ue = W(() => HE(a.effects.value)), M = W(() => {
			let e = a.view.value;
			return e && (e.kind === "line" || e.kind === "narration") ? e : null;
		}), de = W(() => {
			if (M.value?.kind !== "line") return 0;
			let e = H_(M.value.presentation, n.bundle.story.settings?.presentation);
			return e.mode === "bubble" ? 0 : YT(e.enter).portraitDelay;
		}), fe = W(() => dD(n.bundle.story)), pe = W(() => {
			a.view.value, a.flags.value;
			let e = a.engine.snapshot();
			return fe.value({
				stepId: e.cursor?.stepId,
				history: e.history,
				flags: e.flags,
				ended: a.view.value?.kind === "ended",
				ignoreConditions: u.value
			});
		}), me = /* @__PURE__ */ F(!1), he;
		Cr(() => {
			he = setInterval(() => {
				me.value = a.speaking();
			}, 50);
		}), Er(() => clearInterval(he)), Bn(M, () => {
			me.value = a.speaking();
		});
		let ge = W(() => !!M.value && A.value === M.value.stepId && !me.value && Se.value && !w.value && !be.value && !a.hostEvent.value), _e = W(() => {
			let e = a.view.value, t = !!e?.playback?.autoplay && !e.playback.pauseGame && (e.kind !== "sequence" || e.trigger !== "onClick");
			return i && n.mode === "overlay" && t ? "active" : "paused";
		});
		Bn(_e, (e) => r("gameplay", e), { immediate: !0 });
		let ve = W(() => {
			let e = a.view.value;
			return e?.kind === "choice" ? e : null;
		}), ye = W(() => {
			let e = a.view.value;
			return e?.kind === "sequence" && e.blocking ? e : null;
		}), be = W(() => se.value || ce.value || le.value || f.value);
		Bn(M, () => {
			A.value = null;
		}, { flush: "sync" });
		let xe = W(() => M.value?.playback?.autoplay ?? !1), Se = W(() => !xe.value || M.value?.playback?.allowManualAdvance !== !1);
		Bn(() => [
			M.value,
			O.value,
			ie.value
		], (e, t, r) => {
			let i = M.value;
			if (!i || !O.value && !i.playback?.autoplay) return;
			let o = qb(TD(nE(i.text, 0).chars.length, xe.value ? "normal" : ie.value), i.playback?.delayMs ?? 600, xe.value ? i.playback?.durationMs : void 0), s = performance.now(), c = () => {
				s = performance.now();
			};
			document.addEventListener("visibilitychange", c);
			let l = setInterval(() => {
				let e = performance.now(), t = e - s;
				s = e, !(document.hidden || n.paused || be.value || w.value || a.screen.value !== "playing") && o.tick(t, A.value === i.stepId, a.speaking()) && (clearInterval(l), a.advance());
			}, 50);
			r(() => {
				clearInterval(l), document.removeEventListener("visibilitychange", c);
			});
		});
		let Ce = W(() => {
			let e = a.view.value;
			return e?.kind === "delay" ? e : null;
		}), we = 0;
		Bn(() => Ce.value?.stepId, (e) => {
			we = e ? performance.now() : 0;
		}, {
			immediate: !0,
			flush: "sync"
		});
		function Te() {
			let e = Ce.value;
			return e?.stepId.startsWith("scene-title:") ? performance.now() - we < Math.min(zv, e.ms) : !1;
		}
		Bn(() => [
			Ce.value?.stepId,
			Ce.value?.stepId.startsWith("scene-title:") ? n.sceneTitleAutoplay : void 0,
			Ce.value?.stepId.startsWith("scene-title-tail:") ? o.value : !1
		], ([e], t, r) => {
			let i = Ce.value;
			if (!e || !i || e.startsWith("scene-title:") && n.sceneTitleAutoplay === !1 || e.startsWith("scene-title-tail:") && o.value) return;
			if (!i.playback?.autoplay) {
				let e = setTimeout(() => a.delayDone(), i.ms);
				r(() => clearTimeout(e));
				return;
			}
			let s = qb(0, 0, i.ms), c = performance.now(), l = () => {
				c = performance.now();
			};
			document.addEventListener("visibilitychange", l);
			let u = setInterval(() => {
				let e = performance.now(), t = e - c;
				c = e, !(document.hidden || be.value || w.value) && s.tick(t, !0, !1) && (clearInterval(u), a.delayDone());
			}, 50);
			r(() => {
				clearInterval(u), document.removeEventListener("visibilitychange", l);
			});
		}, { immediate: !0 });
		let Ee = W(() => {
			let e = a.view.value;
			return e?.kind === "transition" ? e : null;
		}), De = W(() => {
			let e = a.view.value;
			return e?.kind === "ended" && a.overlays.value.length === 0 ? e : null;
		}), Oe = /* @__PURE__ */ Jt(null);
		Bn(() => a.view.value, (e) => {
			e?.kind === "line" || e?.kind === "narration" ? Oe.value = e : e && e.kind !== "sequence" && e.kind !== "hold-end" && e.kind !== "transition" && (Oe.value = null);
		});
		let ke = W(() => ye.value?.keepDialog || Ee.value && a.dialogFade.value ? Oe.value : null), Ae = W(() => {
			let e = Ee.value ? a.dialogFade.value : null;
			return e ? {
				opacity: e.opacity,
				transition: e.ms > 0 ? `opacity ${e.ms}ms linear` : "none"
			} : void 0;
		}), je = W(() => {
			let e = a.veil.value;
			return e?.affects.includes("picture") ? {
				opacity: 1 - e.opacity,
				transition: e.ms > 0 ? `opacity ${e.ms}ms linear` : "none"
			} : void 0;
		});
		function Me() {
			if (!window.matchMedia("(pointer: coarse)").matches) {
				let e = window.getSelection();
				if (e && !e.isCollapsed && e.toString().trim()) return;
			}
			Ee.value && (Ee.value.skippable || n.embedded) ? a.transitionDone() : Ce.value && (Ce.value.skippable || n.embedded) ? Te() || a.delayDone() : M.value && re.value?.activate();
		}
		function Ne(e) {
			let t = n.bundle.story.scenes.flatMap((e) => e.steps.map((t) => ({
				sceneId: e.id,
				step: t
			}))), r = new Set(e > 0 ? [
				"narration",
				"line",
				"choice",
				"sequence",
				"delay",
				"transition"
			] : [
				"narration",
				"line",
				"choice",
				"sequence"
			]), i = S.value, o = -1;
			if (!i && a.view.value?.kind === "ended") {
				if (e > 0 || (i = a.log.value[a.log.value.length - 1]?.stepId ?? t.filter((e) => r.has(e.step.type)).pop()?.step.id, o = t.findIndex((e) => e.step.id === i), o < 0)) return !1;
				o -= e;
			}
			if (!i) return !1;
			let s = o >= 0 ? o : t.findIndex((e) => e.step.id === i);
			if (s < 0) return !1;
			for (let n = s + e; n >= 0 && n < t.length; n += e) {
				let i = t[n];
				if (!i.step.hidden && r.has(i.step.type) && !(e < 0 && i.step.type === "sequence" && t[s]?.step.type !== "sequence")) return a.begin({
					sceneId: i.sceneId,
					stepId: i.step.id
				}, { ignoreConditions: u.value }), !0;
			}
			return !1;
		}
		let Pe = /* @__PURE__ */ F(!1), Fe = typeof navigator < "u" && /Mac|iPhone|iPad/.test(navigator.platform);
		function Ie(e) {
			return e.code !== "KeyD" || !e.ctrlKey || e.metaKey ? !1 : Fe ? !e.altKey : e.altKey;
		}
		function Le(e) {
			!n.embedded && !Pe.value && e.preventDefault();
		}
		function Re(e) {
			if (!n.active) return;
			let t = e.target instanceof HTMLElement ? e.target : null;
			if (!t?.closest("input, textarea, select, button, [contenteditable=\"true\"]")) {
				if (n.embedded) {
					let e = m.value?.closest("[role=\"dialog\"]") ?? m.value;
					if (!(t && e?.contains(t))) return;
				}
				if (!n.embedded && Ie(e)) e.preventDefault(), Pe.value = !Pe.value;
				else if (!(a.screen.value !== "playing" || se.value || ce.value || le.value)) {
					if (e.key === " " || e.key === "Enter" || e.key === "ArrowRight" || e.key === "ArrowDown") Ee.value && (Ee.value.skippable || n.embedded) ? (e.preventDefault(), a.transitionDone()) : Ce.value && (Ce.value.skippable || n.embedded) ? (e.preventDefault(), Te() || a.delayDone()) : M.value ? (i && _e.value !== "active" && e.stopPropagation(), e.preventDefault(), i && _e.value === "active" || re.value?.activate()) : n.embedded && !e.altKey && (e.key === "ArrowRight" || e.key === "ArrowDown") && Ne(1) && e.preventDefault();
					else if (e.key === "ArrowLeft") {
						if (!n.embedded && !Pe.value) return;
						e.altKey && n.embedded ? Ne(-1) && e.preventDefault() : a.back() && e.preventDefault();
					} else if (!i && (e.key === "a" || e.key === "A") && !e.altKey && !e.ctrlKey && !e.metaKey) e.preventDefault(), oe();
					else if (!i && (e.key === "f" || e.key === "F") && !e.altKey && !e.ctrlKey && !e.metaKey) e.preventDefault(), y();
					else if (ve.value && /^[1-9]$/.test(e.key)) {
						let t = ve.value.options[Number(e.key) - 1];
						t && He(t.id);
					}
				}
			}
		}
		let ze = {
			"--vn-choice-hold": `${jD}ms`,
			"--vn-choice-fade": `${MD}ms`,
			"--vn-choice-others": `${ND}ms`
		}, Be = /* @__PURE__ */ F(!1), Ve;
		function He(e) {
			if (Be.value) return;
			let t = m.value?.querySelector(`.vn-question [data-option="${CSS.escape(e)}"]`);
			!t || window.matchMedia("(prefers-reduced-motion: reduce)").matches ? a.choose(e) : (t.setAttribute("data-chosen", "true"), Be.value = !0, Ve = setTimeout(() => {
				Be.value = !1, a.choose(e);
			}, PD));
		}
		Er(() => clearTimeout(Ve)), Cr(() => {
			window.addEventListener("keydown", Re, i), window.addEventListener("contextmenu", Le);
		}), Er(() => {
			window.removeEventListener("keydown", Re, i), window.removeEventListener("contextmenu", Le);
		});
		function Ue() {
			i ? r("restart") : a.begin(void 0, { ignoreConditions: u.value });
		}
		function We() {
			l.value = !l.value;
			let e = S.value, t = e ? n.bundle.story.scenes.find((t) => t.steps.some((t) => t.id === e)) : null;
			a.begin(t && e ? {
				sceneId: t.id,
				stepId: e
			} : n.from, { ignoreConditions: u.value });
		}
		function Ge(e) {
			a.load(e) && (ce.value = !1);
		}
		return (t, n) => {
			let c = aD, u = nD, g = GE, v = BE, x = wE, T = zE, E = mE, D = LT, ne = NT, k = oT, fe = Rx, me = Mx, he = Ex, _e = dx, be = ox, Ce = ex, we = rb;
			return R(), z("div", {
				ref_key: "root",
				ref: m,
				"data-owns-keys": "",
				class: N(I(b).outer()),
				lang: ("languageKey" in t ? t.languageKey : I(Uy))(I(a).lang.value)
			}, [
				V("div", {
					ref_key: "stageEl",
					ref: h,
					class: N(I(b).stage()),
					"data-stage-layout": I(p),
					"data-text-style": e.bundle.story.settings?.textStyle ?? "serif",
					tabindex: "-1",
					onClick: Me
				}, [
					I(C) && !i ? (R(), B(c, {
						key: 0,
						label: e.embedded ? void 0 : I(d)("player.gameHere")
					}, null, 8, ["label"])) : U("", !0),
					H(u, ba({
						stage: I(a).stage.value,
						"see-through": I(C),
						"no-tint": i && I(C),
						bundle: e.bundle,
						"fade-ms": I(a).fadeMs.value,
						"bg-style": I(a).bgStyle.value,
						"world-style": I(ue),
						animation: ("portraitAnimationOf" in t ? t.portraitAnimationOf : I(lD))(e.bundle, I(S)),
						"enter-delay-ms": I(de)
					}, ("stageLook" in t ? t.stageLook : I(cD))(I(M))), null, 16, [
						"stage",
						"see-through",
						"no-tint",
						"bundle",
						"fade-ms",
						"bg-style",
						"world-style",
						"animation",
						"enter-delay-ms"
					]),
					H(g, { effects: I(a).effects.value }, null, 8, ["effects"]),
					H(v, { veil: I(a).veil.value }, null, 8, ["veil"]),
					H(x, {
						card: I(a).sceneCard.value?.corner ? null : I(a).sceneCard.value,
						"fade-in-ms": e.bundle.story.settings?.sceneFadeInMs ?? I(500),
						"fade-out-ms": e.bundle.story.settings?.sceneFadeOutMs ?? I(500),
						autoplay: e.sceneTitleAutoplay,
						onAfterLeave: s
					}, null, 8, [
						"card",
						"fade-in-ms",
						"fade-out-ms",
						"autoplay"
					]),
					I(a).screen.value === "playing" ? (R(), z(L, { key: 1 }, [
						H(T, {
							"continue-only": i && I(C),
							bundle: e.bundle,
							lang: I(a).lang.value,
							"step-id": I(S),
							progress: I(pe),
							ready: I(ge),
							"opening-card": I(o),
							veil: I(a).veil.value
						}, null, 8, [
							"continue-only",
							"bundle",
							"lang",
							"step-id",
							"progress",
							"ready",
							"opening-card",
							"veil"
						]),
						I(M) && !I(w) ? (R(), B(E, {
							key: 0,
							ref_key: "dialog",
							ref: re,
							view: I(M),
							face: ("dialogFace" in t ? t.dialogFace : I(sD))(e.bundle, I(M), I(a).stage.value),
							"bubble-x": ("bubbleOriginX" in t ? t.bubbleOriginX : I(uD))(e.bundle, I(M), I(a).stage.value),
							cps: I(Rv)(e.bundle.story.settings?.textSpeed),
							settings: e.bundle.story.settings,
							"allow-advance": I(Se),
							"hide-continue": "",
							"data-dialog-playback": I(xe) ? "automatic" : "interactive",
							onAdvance: I(a).advance,
							onFinished: n[0] ||= (e) => A.value = I(M)?.stepId ?? null
						}, null, 8, [
							"view",
							"face",
							"bubble-x",
							"cps",
							"settings",
							"allow-advance",
							"data-dialog-playback",
							"onAdvance"
						])) : U("", !0),
						H(no, { name: "vn-question" }, {
							default: Nn(() => [I(ve) && !I(w) ? (R(), B(D, {
								key: 0,
								view: I(ve),
								"data-leaving": I(Be) || void 0,
								style: ze,
								onChoose: He
							}, null, 8, ["view", "data-leaving"])) : U("", !0)]),
							_: 1
						}),
						I(ke) ? (R(), B(E, {
							key: `kept-${I(ke).stepId}`,
							class: "pointer-events-none",
							view: I(ke),
							face: ("dialogFace" in t ? t.dialogFace : I(sD))(e.bundle, I(ke), I(a).stage.value),
							"bubble-x": ("bubbleOriginX" in t ? t.bubbleOriginX : I(uD))(e.bundle, I(ke), I(a).stage.value),
							cps: 0,
							settings: e.bundle.story.settings,
							style: j(I(Ae)),
							"hide-continue": ""
						}, null, 8, [
							"view",
							"face",
							"bubble-x",
							"settings",
							"style"
						])) : U("", !0),
						I(ye) ? (R(), B(ne, {
							key: I(ye).stepId,
							hold: I(ye).hold,
							behind: !!I(ke),
							sequence: I(ye).sequence,
							bundle: e.bundle,
							audio: I(a).audio,
							"host-paused": I(a).paused.value,
							skippable: I(ye).skippable,
							trigger: I(ye).trigger,
							"skip-prompt": I(ye).skipPrompt,
							lang: I(a).lang.value,
							onEffect: n[1] ||= (e) => I(a).triggerEffect(e, I(ye)?.stepId),
							onSkipped: n[2] ||= (e) => I(ye) && I(a).sequenceSkipped(I(ye).stepId),
							onDone: I(a).sequenceDone
						}, null, 8, [
							"hold",
							"behind",
							"sequence",
							"bundle",
							"audio",
							"host-paused",
							"skippable",
							"trigger",
							"skip-prompt",
							"lang",
							"onDone"
						])) : U("", !0),
						(R(!0), z(L, null, Nr(I(a).overlays.value, (t) => (R(), B(ne, {
							key: t.id,
							sequence: t.sequence,
							bundle: e.bundle,
							audio: I(a).audio,
							"host-paused": I(a).paused.value,
							overlay: "",
							hold: t.hold,
							frozen: t.frozen,
							behind: t.layer === "behind",
							lang: I(a).lang.value,
							"leaving-ms": t.leavingMs,
							style: j(t.layer === "front" ? I(je) : void 0),
							onEffect: I(a).triggerEffect,
							onPlayed: (e) => I(a).holdPlayed(t.id),
							onDone: (e) => I(a).finishOverlay(t.id)
						}, null, 8, [
							"sequence",
							"bundle",
							"audio",
							"host-paused",
							"hold",
							"frozen",
							"behind",
							"lang",
							"leaving-ms",
							"style",
							"onEffect",
							"onPlayed",
							"onDone"
						]))), 128)),
						I(a).hostEvent.value ? (R(), B(k, {
							key: 3,
							event: I(a).hostEvent.value,
							testing: !!e.embedded,
							onResume: I(a).resume
						}, null, 8, [
							"event",
							"testing",
							"onResume"
						])) : U("", !0),
						I(De) ? (R(), B(fe, {
							key: 4,
							exit: I(De).exit,
							flags: I(a).flags.value,
							onRestart: Ue,
							onTitle: n[3] ||= (e) => i ? r("exit") : I(a).toTitle()
						}, null, 8, ["exit", "flags"])) : U("", !0),
						e.controls ? (R(), B(me, {
							key: 5,
							minimal: i,
							"can-copy": (e.copyProjects?.length ?? 0) > 0 && !!e.slug,
							muted: I(a).muted.value,
							languages: e.bundle.story.languages.available,
							lang: I(a).lang.value,
							fullscreen: I(_),
							autoplay: I(O),
							testing: !!e.embedded,
							"show-every-step": I(l),
							speed: I(ie),
							onConditions: We,
							onLanguage: I(a).setLanguage,
							onAutoplay: oe,
							onSpeed: ae,
							onFullscreen: y,
							onLog: n[4] ||= (e) => se.value = !0,
							onSaves: n[5] ||= (e) => ce.value = !0,
							onFlags: n[6] ||= (e) => le.value = !0,
							onMute: I(a).toggleMute,
							onTitle: I(a).toTitle,
							onCopy: n[7] ||= (e) => f.value = !0
						}, null, 8, [
							"can-copy",
							"muted",
							"languages",
							"lang",
							"fullscreen",
							"autoplay",
							"testing",
							"show-every-step",
							"speed",
							"onLanguage",
							"onMute",
							"onTitle"
						])) : U("", !0)
					], 64)) : (R(), B(he, {
						key: 2,
						bundle: e.bundle,
						lang: I(a).lang.value,
						"can-continue": I(a).hasAutosave.value,
						warnings: I(a).warnings.value,
						onStart: n[8] ||= (e) => te(() => I(a).begin()),
						onContinue: n[9] ||= (e) => te(() => I(a).continueGame(), !0),
						onLanguage: I(a).setLanguage
					}, null, 8, [
						"bundle",
						"lang",
						"can-continue",
						"warnings",
						"onLanguage"
					])),
					I(ee) ? (R(), z("div", {
						key: 3,
						class: "absolute inset-0 z-[60] bg-black",
						"aria-hidden": "true",
						style: j({
							opacity: I(ee).opacity,
							transition: I(ee).ms > 0 ? `opacity ${I(ee).ms}ms linear` : "none"
						})
					}, null, 4)) : U("", !0),
					I(Pe) ? (R(), z("div", OD, " Debug mode ")) : U("", !0)
				], 10, DD),
				e.slug && e.copyProjects?.length ? (R(), B(_e, {
					key: 0,
					open: I(f),
					"onUpdate:open": n[10] ||= (e) => /* @__PURE__ */ qt(f) ? f.value = e : null,
					slug: e.slug,
					projects: e.copyProjects
				}, null, 8, [
					"open",
					"slug",
					"projects"
				])) : U("", !0),
				H(be, {
					open: I(se),
					"onUpdate:open": n[11] ||= (e) => /* @__PURE__ */ qt(se) ? se.value = e : null,
					entries: I(a).log.value
				}, null, 8, ["open", "entries"]),
				H(Ce, {
					open: I(ce),
					"onUpdate:open": n[12] ||= (e) => /* @__PURE__ */ qt(ce) ? ce.value = e : null,
					slots: I(a).slots.value,
					onSave: I(a).save,
					onLoad: Ge
				}, null, 8, [
					"open",
					"slots",
					"onSave"
				]),
				H(we, {
					open: I(le),
					"onUpdate:open": n[13] ||= (e) => /* @__PURE__ */ qt(le) ? le.value = e : null,
					flags: I(a).flags.value
				}, null, 8, ["open", "flags"]),
				V("span", kD, P(I(d)("player.hint")), 1)
			], 10, ED);
		};
	}
}), [["styles", ["@media (pointer:coarse){.vn-player[data-v-8a81c351]{-webkit-user-select:none;user-select:none}}"]], ["__scopeId", "data-v-8a81c351"]]), ID = {
	en: {
		progress: "Story progress",
		progressExact: "{current} / {total}",
		progressEstimate: "{current} / {total}",
		sceneNumber: "Scene {n}",
		advanceTouch: "Tap to continue",
		advanceDesktop: "Click to continue",
		loading: "Loading",
		gameHere: "The game plays here",
		dialog: "Dialogue",
		hint: "Press Space, Enter or click to continue. Press 1-9 to choose.",
		start: "Start",
		continue: "Continue",
		episode: "Episode {n}",
		storyLanguage: "Story language",
		log: "Backlog",
		logEmpty: "Nothing yet.",
		saveLoad: "Save and load",
		slot: "Slot {n}",
		slotEmpty: "Empty",
		save: "Save",
		load: "Load",
		flags: "Flags",
		flagsHint: "Current flag values, for testing.",
		mute: "Mute",
		unmute: "Unmute",
		autoplay: "Autoplay (A)",
		autoplayStop: "Stop autoplay (A)",
		speed: {
			slow: "Slow",
			normal: "Normal",
			fast: "Fast"
		},
		speedLabel: "Autoplay speed: {speed}. Click to change.",
		fullscreen: "Fullscreen (F)",
		exitFullscreen: "Leave fullscreen (F)",
		toTitle: "Title screen",
		playAgain: "Play again",
		theEnd: "The end",
		endDetails: "Ending details",
		endingName: "Ending name",
		flagsHelp: "What the story remembered while you played.",
		exit: "Exit",
		skip: "Skip",
		yes: "Yes",
		no: "No",
		clickToPlay: "Click to play",
		hostEvent: "Host event: {name}",
		mockHost: "Mock host",
		pickResult: "Test: pick the result",
		showEveryStep: "Show every step, ignoring conditions",
		followingYes: "Following the story's conditions. Click to ignore them and play every step.",
		followingNo: "Ignoring conditions: every step plays. Click to follow the conditions.",
		params: "Parameters",
		hostEventHint: "In a real game this is where gameplay happens. Pick an outcome to continue the story.",
		battle: {
			title: "{enemy}, wave {wave} of {waves}",
			you: "You",
			attack: "Attack",
			flee: "Flee",
			hit: "You hit for {n}.",
			enemyHit: "{enemy} hits you for {n}.",
			nextWave: "Wave {n}!"
		},
		list: {
			addedIn: "Added in v{version}",
			title: "Demos",
			intro: "Stories bundled with the studio for testing the player. All art and audio are generated placeholders.",
			play: "Play",
			languages: "Languages",
			loading: "Loading stories…",
			empty: "No stories found. Run the examples build.",
			error: "Could not load this story."
		},
		copyToProject: "Copy to my project",
		copy: {
			title: "Copy this story to my project",
			help: "Add a copy of this story, with its characters and media, to a project of yours. The original is not changed.",
			target: "Copy to",
			confirm: "Copy",
			done: "Copied to your project.",
			failed: "Could not copy the story."
		}
	},
	zh: {
		progress: "故事进度",
		progressExact: "{current} / {total}",
		progressEstimate: "{current} / {total}",
		sceneNumber: "场景 {n}",
		advanceTouch: "轻触继续",
		advanceDesktop: "点击继续",
		loading: "加载中",
		gameHere: "游戏在这里进行",
		dialog: "对话",
		hint: "按空格、回车或点击继续。按 1-9 选择。",
		start: "开始",
		continue: "继续",
		episode: "第 {n} 集",
		storyLanguage: "故事语言",
		log: "回顾",
		logEmpty: "暂无内容。",
		saveLoad: "存档与读档",
		slot: "存档 {n}",
		slotEmpty: "空",
		save: "保存",
		load: "读取",
		flags: "标记",
		flagsHint: "当前标记的值，用于测试。",
		mute: "静音",
		unmute: "取消静音",
		autoplay: "自动播放 (A)",
		autoplayStop: "停止自动播放 (A)",
		speed: {
			slow: "慢",
			normal: "正常",
			fast: "快"
		},
		speedLabel: "自动播放速度：{speed}。点击切换。",
		fullscreen: "全屏 (F)",
		exitFullscreen: "退出全屏 (F)",
		toTitle: "标题画面",
		playAgain: "再玩一次",
		theEnd: "完",
		endDetails: "结局详情",
		endingName: "结局名称",
		flagsHelp: "故事在游玩中记住的标记。",
		exit: "结局",
		skip: "跳过",
		yes: "是",
		no: "否",
		clickToPlay: "点击播放",
		hostEvent: "宿主事件：{name}",
		mockHost: "模拟宿主",
		pickResult: "测试：选择结果",
		showEveryStep: "显示每一步，忽略条件",
		followingYes: "正在遵循故事的条件。点击后忽略条件，播放每一步。",
		followingNo: "正在忽略条件，播放每一步。点击后遵循条件。",
		params: "参数",
		hostEventHint: "在真实游戏中，这里会进入玩法。选择一个结果以继续故事。",
		battle: {
			title: "{enemy}，第 {wave} / {waves} 波",
			you: "你",
			attack: "攻击",
			flee: "逃跑",
			hit: "你造成了 {n} 点伤害。",
			enemyHit: "{enemy}对你造成 {n} 点伤害。",
			nextWave: "第 {n} 波！"
		},
		list: {
			addedIn: "新增于 v{version}",
			title: "演示",
			intro: "随工作室附带的测试故事，用于测试播放器。所有图片和音频均为自动生成的占位素材。",
			play: "试玩",
			languages: "语言",
			loading: "正在加载故事……",
			empty: "没有找到故事。请先运行示例构建。",
			error: "无法加载这个故事。"
		},
		copyToProject: "复制到我的项目",
		copy: {
			title: "把这个故事复制到我的项目",
			help: "把这个故事连同角色和素材复制一份到你的项目里。原故事不会改动。",
			target: "复制到",
			confirm: "复制",
			done: "已复制到你的项目。",
			failed: "无法复制这个故事。"
		}
	}
};
function LD(e, t) {
	let n = e;
	for (let e of t) {
		if (n === void 0 || typeof n == "string") return;
		n = n[e];
	}
	return typeof n == "string" ? n : void 0;
}
function RD(e = /* @__PURE__ */ F({})) {
	return {
		ready: W(() => !0),
		t(t, n = {}, r) {
			let i = r ? Jy(r) ?? "en" : "en", a = t.replace(/^player\./, "").split(".");
			return (e.value[t] ?? LD(ID[i], a) ?? LD(ID.en, a) ?? t).replace(/\{(\w+)\}/g, (e, t) => String(n[t] ?? `{${t}}`));
		}
	};
}
//#endregion
//#region src/contract.ts
var zD = 1, BD = "/*! tailwindcss v4.3.3 | MIT License | https://tailwindcss.com */\n@layer properties{@supports (((-webkit-hyphens:none)) and (not (margin-trim:inline))) or ((-moz-orient:inline) and (not (color:rgb(from red r g b)))){*,:before,:after,::backdrop{--tw-translate-x:0;--tw-translate-y:0;--tw-translate-z:0;--tw-rotate-x:initial;--tw-rotate-y:initial;--tw-rotate-z:initial;--tw-skew-x:initial;--tw-skew-y:initial;--tw-border-style:solid;--tw-leading:initial;--tw-font-weight:initial;--tw-tracking:initial;--tw-shadow:0 0 #0000;--tw-shadow-color:initial;--tw-shadow-alpha:100%;--tw-inset-shadow:0 0 #0000;--tw-inset-shadow-color:initial;--tw-inset-shadow-alpha:100%;--tw-ring-color:initial;--tw-ring-shadow:0 0 #0000;--tw-inset-ring-color:initial;--tw-inset-ring-shadow:0 0 #0000;--tw-ring-inset:initial;--tw-ring-offset-width:0px;--tw-ring-offset-color:#fff;--tw-ring-offset-shadow:0 0 #0000;--tw-outline-style:solid;--tw-blur:initial;--tw-brightness:initial;--tw-contrast:initial;--tw-grayscale:initial;--tw-hue-rotate:initial;--tw-invert:initial;--tw-opacity:initial;--tw-saturate:initial;--tw-sepia:initial;--tw-drop-shadow:initial;--tw-drop-shadow-color:initial;--tw-drop-shadow-alpha:100%;--tw-drop-shadow-size:initial;--tw-duration:initial;--tw-ease:initial}}}@layer theme{:root,:host{--font-sans:system-ui, -apple-system, \"Segoe UI\", \"PingFang SC\", \"Microsoft YaHei\", \"Noto Sans SC\", sans-serif;--font-serif:Georgia, \"Times New Roman\", \"Songti SC\", \"Noto Serif SC\", \"Source Han Serif SC\", serif;--font-mono:ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, \"Liberation Mono\", \"Courier New\", monospace;--color-red-600:oklch(57.7% .245 27.325);--color-amber-300:oklch(87.9% .169 91.605);--color-black:#000;--color-white:#fff;--spacing:.25rem;--text-xs:.75rem;--text-xs--line-height:calc(1 / .75);--text-sm:.875rem;--text-sm--line-height:calc(1.25 / .875);--font-weight-medium:500;--font-weight-semibold:600;--font-weight-bold:700;--tracking-wide:.025em;--leading-tight:1.25;--radius-md:.375rem;--ease-out:cubic-bezier(0, 0, .2, 1);--ease-in-out:cubic-bezier(.4, 0, .2, 1);--aspect-video:16 / 9;--default-transition-duration:.15s;--default-transition-timing-function:cubic-bezier(.4, 0, .2, 1);--default-font-family:var(--font-sans);--default-mono-font-family:var(--font-mono);--color-tone-dawn:#ffaa7833;--color-tone-day:#fff0;--color-tone-dusk:#ff6e3c3d;--color-tone-night:#0a145080;--color-tone-storm:#0f192d8c;--color-tone-dream:#a078ff42;--color-fx-rain:#c8dcff8c;--color-fx-snow:#ffffffd9;--color-fx-ember:#ff963ce6;--color-fx-flash-white:#fff;--color-fx-flash-red:#dc1e1e;--color-fx-black:#000;--color-fx-glow:#ffe6ff80;--font-story-sans:Arial, sans-serif;--color-brand-400:#d9bc88;--color-brand-700:#8e6c3c}}@layer base{*,:after,:before,::backdrop{box-sizing:border-box;border:0 solid;margin:0;padding:0}::file-selector-button{box-sizing:border-box;border:0 solid;margin:0;padding:0}html,:host{-webkit-text-size-adjust:100%;tab-size:4;line-height:1.5;font-family:var(--default-font-family,-apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", \"Noto Sans\", Arial, sans-serif, \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\", \"Noto Color Emoji\");font-feature-settings:var(--default-font-feature-settings,normal);font-variation-settings:var(--default-font-variation-settings,normal);-webkit-tap-highlight-color:transparent}hr{height:0;color:inherit;border-top-width:1px}abbr:where([title]){-webkit-text-decoration:underline dotted;text-decoration:underline dotted}h1,h2,h3,h4,h5,h6{font-size:inherit;font-weight:inherit}a{color:inherit;-webkit-text-decoration:inherit;-webkit-text-decoration:inherit;-webkit-text-decoration:inherit;-webkit-text-decoration:inherit;text-decoration:inherit}b,strong{font-weight:bolder}code,kbd,samp,pre{font-family:var(--default-mono-font-family,ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, \"Liberation Mono\", \"Courier New\", monospace);font-feature-settings:var(--default-mono-font-feature-settings,normal);font-variation-settings:var(--default-mono-font-variation-settings,normal);font-size:1em}small{font-size:80%}sub,sup{vertical-align:baseline;font-size:75%;line-height:0;position:relative}sub{bottom:-.25em}sup{top:-.5em}table{text-indent:0;border-color:inherit;border-collapse:collapse}:-moz-focusring:where(:not(iframe)){outline:auto}progress{vertical-align:baseline}summary{display:list-item}ol,ul,menu{list-style:none}img,svg,video,canvas,audio,iframe,embed,object{vertical-align:middle;display:block}img,video{max-width:100%;height:auto}button,input,select,optgroup,textarea{font:inherit;font-feature-settings:inherit;font-variation-settings:inherit;letter-spacing:inherit;color:inherit;opacity:1;background-color:#0000;border-radius:0}::file-selector-button{font:inherit;font-feature-settings:inherit;font-variation-settings:inherit;letter-spacing:inherit;color:inherit;opacity:1;background-color:#0000;border-radius:0}:where(select:is([multiple],[size])) optgroup{font-weight:bolder}:where(select:is([multiple],[size])) optgroup option{padding-inline-start:20px}::file-selector-button{margin-inline-end:4px}::placeholder{opacity:1}@supports (not ((-webkit-appearance:-apple-pay-button))) or (contain-intrinsic-size:1px){::placeholder{color:currentColor}@supports (color:color-mix(in lab, red, red)){::placeholder{color:color-mix(in oklab, currentcolor 50%, transparent)}}}textarea{resize:vertical}::-webkit-search-decoration{-webkit-appearance:none}::-webkit-date-and-time-value{min-height:1lh;text-align:inherit}::-webkit-datetime-edit{display:inline-flex}::-webkit-datetime-edit-fields-wrapper{padding:0}::-webkit-datetime-edit{padding-block:0}::-webkit-datetime-edit-year-field{padding-block:0}::-webkit-datetime-edit-month-field{padding-block:0}::-webkit-datetime-edit-day-field{padding-block:0}::-webkit-datetime-edit-hour-field{padding-block:0}::-webkit-datetime-edit-minute-field{padding-block:0}::-webkit-datetime-edit-second-field{padding-block:0}::-webkit-datetime-edit-millisecond-field{padding-block:0}::-webkit-datetime-edit-meridiem-field{padding-block:0}::-webkit-calendar-picker-indicator{line-height:1}:-moz-ui-invalid{box-shadow:none}button,input:where([type=button],[type=reset],[type=submit]){appearance:button}::file-selector-button{appearance:button}::-webkit-inner-spin-button{height:auto}::-webkit-outer-spin-button{height:auto}[hidden]:where(:not([hidden=until-found])){display:none!important}}@layer components{@keyframes vn-shake{0%,to{translate:0;rotate:0deg}15%{translate:calc(var(--vn-i-shake,.7) * -4%) calc(var(--vn-i-shake,.7) * 1.6%);rotate:calc(var(--vn-i-shake,.7) * -.5deg)}35%{translate:calc(var(--vn-i-shake,.7) * 3.6%) calc(var(--vn-i-shake,.7) * -2%);rotate:calc(var(--vn-i-shake,.7) * .4deg)}55%{translate:calc(var(--vn-i-shake,.7) * -2.8%) calc(var(--vn-i-shake,.7) * 2.4%);rotate:calc(var(--vn-i-shake,.7) * -.3deg)}75%{translate:calc(var(--vn-i-shake,.7) * 2%) calc(var(--vn-i-shake,.7) * -1.2%);rotate:calc(var(--vn-i-shake,.7) * .2deg)}}@keyframes vn-zoom{0%,to{scale:1}50%{scale:calc(1 + var(--vn-i-zoom,.6) * .2)}}@keyframes vn-blur{0%,to{filter:blur()}40%,60%{filter:blur(calc(var(--vn-i-blur,.6) * 16px))}}@keyframes vn-glitch{0%,to{filter:none;translate:0}15%{translate:calc(var(--vn-i-glitch,.7) * 3%) 0;filter:hue-rotate(90deg)saturate(2)}30%{translate:calc(var(--vn-i-glitch,.7) * -3.4%) 0;filter:hue-rotate(-60deg)contrast(1.4)}45%{translate:0 calc(var(--vn-i-glitch,.7) * 1.4%);filter:invert(.2)saturate(3)}60%{translate:calc(var(--vn-i-glitch,.7) * 2.4%) 0;filter:hue-rotate(180deg)}80%{translate:calc(var(--vn-i-glitch,.7) * -1.2%) 0;filter:none}}.vn-fx{pointer-events:none;position:absolute;inset:0;overflow:hidden}.vn-fx:before{content:\"\";position:absolute;inset:-10%}@keyframes vn-flash{0%{opacity:0}12%{opacity:var(--vn-i,.9)}to{opacity:0}}@keyframes vn-fade-black{0%{opacity:0}40%,60%{opacity:1}to{opacity:0}}@keyframes vn-ambient{0%{opacity:0}10%,85%{opacity:var(--vn-i,.8)}to{opacity:0}}.vn-fx-flash-white{background:var(--color-fx-flash-white);animation:vn-flash var(--vn-ms,.4s) ease-out forwards}.vn-fx-flash-red{background:var(--color-fx-flash-red);animation:vn-flash var(--vn-ms,.5s) ease-out forwards}.vn-fx-fade-black{background:var(--color-fx-black);animation:vn-fade-black var(--vn-ms,2s) ease-in-out forwards}@keyframes vn-rain-fall{to{background-position:calc(-42px * var(--vn-size,1)) calc(180px * var(--vn-size,1)), calc(-71px * var(--vn-size,1)) calc(260px * var(--vn-size,1))}}.vn-fx-rain{animation:vn-ambient var(--vn-ms,5s) linear forwards}.vn-fx-rain:before{background-image:linear-gradient(105deg, transparent 47%, var(--color-fx-rain) 50%, transparent 53%), linear-gradient(105deg, transparent 48%, var(--color-fx-rain) 50%, transparent 52%);background-size:calc(42px * var(--vn-size,1)) calc(90px * var(--vn-size,1)), calc(71px * var(--vn-size,1)) calc(130px * var(--vn-size,1));animation:vn-rain-fall calc(.45s / var(--vn-speed,1)) linear infinite}@keyframes vn-snow-fall{to{background-position:calc(90px * var(--vn-size,1)) calc(440px * var(--vn-size,1)), calc(-160px * var(--vn-size,1)) calc(570px * var(--vn-size,1))}}.vn-fx-snow{animation:vn-ambient var(--vn-ms,5s) linear forwards}.vn-fx-snow:before{background-image:radial-gradient(circle, var(--color-fx-snow) 0 calc(2px * var(--vn-size,1)), transparent calc(3px * var(--vn-size,1))), radial-gradient(circle, var(--color-fx-snow) 0 calc(3px * var(--vn-size,1)), transparent calc(4px * var(--vn-size,1)));background-size:calc(90px * var(--vn-size,1)) calc(110px * var(--vn-size,1)), calc(160px * var(--vn-size,1)) calc(190px * var(--vn-size,1));animation:vn-snow-fall calc(6s / var(--vn-speed,1)) linear infinite}@keyframes vn-ember-rise{to{background-position:calc(120px * var(--vn-size,1)) calc(-420px * var(--vn-size,1)), calc(-230px * var(--vn-size,1)) calc(-690px * var(--vn-size,1))}}.vn-fx-embers{animation:vn-ambient var(--vn-ms,5s) linear forwards}.vn-fx-embers:before{background-image:radial-gradient(circle, var(--color-fx-ember) 0 calc(2px * var(--vn-size,1)), transparent calc(4px * var(--vn-size,1))), radial-gradient(circle, var(--color-fx-ember) 0 calc(3px * var(--vn-size,1)), transparent calc(5px * var(--vn-size,1)));background-size:calc(120px * var(--vn-size,1)) calc(140px * var(--vn-size,1)), calc(230px * var(--vn-size,1)) calc(230px * var(--vn-size,1));animation:vn-ember-rise calc(5s / var(--vn-speed,1)) linear infinite}@keyframes vn-glow-pulse{50%{opacity:.7;transform:scale(1.12)}}.vn-fx-dream-glow{animation:vn-ambient var(--vn-ms,4s) ease-in-out forwards;mix-blend-mode:screen}.vn-fx-dream-glow:before{background:radial-gradient(circle at 50% 40%, var(--color-fx-glow), transparent calc(65% * var(--vn-size,1)));animation:vn-glow-pulse calc(2.4s / var(--vn-speed,1)) ease-in-out infinite}@keyframes vn-film-flicker{0%,to{opacity:.55}30%{opacity:.85}60%{opacity:.4}}.vn-fx-old-film{animation:vn-ambient var(--vn-ms,6s) linear forwards;-webkit-backdrop-filter:sepia(.8)contrast(1.1)brightness(.95);backdrop-filter:sepia(.8)contrast(1.1)brightness(.95)}.vn-fx-old-film:before{animation:vn-film-flicker calc(.18s / var(--vn-speed,1)) steps(2) infinite;background:repeating-linear-gradient(0deg,#0000001a 0 1px,#0000 1px 4px)}.vn-fx-vignette{animation:vn-ambient var(--vn-ms,3s) linear forwards;background:radial-gradient(ellipse at center, transparent max(0%, calc(70% - var(--vn-size,1) * 25%)), #000000d9 100%)}@keyframes vn-text-shake{25%{translate:1px -1px}50%{translate:-1px 1px}75%{translate:1px 1px}}@keyframes vn-text-wave{50%{translate:0 -.25em}}.vn-text-shake{animation:.12s linear infinite vn-text-shake;display:inline-block}.vn-text-wave{animation:1s ease-in-out infinite vn-text-wave;animation-delay:calc(var(--vn-char,0) * 70ms);display:inline-block}.vn-text-whisper{opacity:.75;font-size:max(18px,.82em);font-style:italic}.vn-text-loud{font-size:1.25em;font-weight:700}.vn-ui-button{color:var(--ui-text);background:var(--ui-bg-accented);border-radius:.375rem;justify-content:center;align-items:center;gap:.375rem;padding:.375rem .625rem;font-size:.875rem;font-weight:500;line-height:1.25;display:inline-flex}@supports (color:color-mix(in lab, red, red)){.vn-ui-button{background:color-mix(in srgb, var(--ui-bg-accented) 60%, transparent)}}.vn-ui-button{box-shadow:inset 0 0 0 1px var(--ui-border-accented);cursor:pointer}.vn-ui-button:hover{background:var(--ui-bg-accented)}.vn-ui-button:focus-visible{outline:2px solid var(--ui-primary);outline-offset:2px}.vn-ui-button[data-icon-only]{padding:.375rem}.vn-ui-button[data-size=lg]{padding:.625rem 1.25rem;font-size:1rem}.vn-ui-button[data-color=primary][data-variant=solid],.vn-ui-button:not([data-color]):not([data-variant]),.vn-ui-button[data-color=primary]:not([data-variant=soft]):not([data-variant=subtle]){color:var(--ui-text-inverted);background:var(--ui-primary);box-shadow:none}.vn-ui-button[data-color=primary][data-variant=soft]{color:var(--ui-primary);background:var(--ui-primary)}@supports (color:color-mix(in lab, red, red)){.vn-ui-button[data-color=primary][data-variant=soft]{background:color-mix(in srgb, var(--ui-primary) 15%, transparent)}}.vn-ui-button[data-color=primary][data-variant=soft]{box-shadow:none}}@layer utilities{.\\@container,.\\[container-type\\:inline-size\\]{container-type:inline-size}.\\[container-type\\:size\\]{container-type:size}.pointer-events-auto{pointer-events:auto}.pointer-events-none{pointer-events:none}.collapse{visibility:collapse}.invisible{visibility:hidden}.visible{visibility:visible}.sr-only{clip-path:inset(50%);white-space:nowrap;border-width:0;width:1px;height:1px;margin:-1px;padding:0;position:absolute;overflow:hidden}.absolute{position:absolute}.fixed{position:fixed}.relative{position:relative}.static{position:static}.inset-0{inset:0}.inset-y-0{inset-block:0}.top-0{top:0}.top-\\[1\\.2cqw\\]{top:1.2cqw}.top-\\[2\\%\\]{top:2%}.top-\\[2cqw\\]{top:2cqw}.top-\\[3cqw\\]{top:3cqw}.right-0{right:0}.right-\\[1\\.4cqw\\]{right:1.4cqw}.right-\\[4\\%\\]{right:4%}.bottom-\\[1\\.4cqw\\]{bottom:1.4cqw}.bottom-\\[max\\(16px\\,2\\.5\\%\\)\\]{bottom:max(16px,2.5%)}.bottom-full{bottom:100%}.left-0{left:0}.left-1\\/2{left:50%}.left-\\[4\\%\\]{left:4%}.z-10{z-index:10}.z-20{z-index:20}.z-30{z-index:30}.z-40{z-index:40}.z-50{z-index:50}.z-\\[15\\]{z-index:15}.z-\\[60\\]{z-index:60}.col-start-1{grid-column-start:1}.row-start-1{grid-row-start:1}.container{width:100%}@media (width>=40rem){.container{max-width:40rem}}@media (width>=48rem){.container{max-width:48rem}}@media (width>=64rem){.container{max-width:64rem}}@media (width>=80rem){.container{max-width:80rem}}@media (width>=96rem){.container{max-width:96rem}}.mt-1{margin-top:var(--spacing)}.mr-2{margin-right:calc(var(--spacing) * 2)}.mb-1{margin-bottom:var(--spacing)}.line-clamp-3{-webkit-line-clamp:3;-webkit-box-orient:vertical;display:-webkit-box;overflow:hidden}.block{display:block}.flex{display:flex}.grid{display:grid}.hidden{display:none}.inline{display:inline}.inline-flex{display:inline-flex}.table{display:table}.aspect-square{aspect-ratio:1}.aspect-video{aspect-ratio:var(--aspect-video)}.size-3\\.5{width:calc(var(--spacing) * 3.5);height:calc(var(--spacing) * 3.5)}.size-8{width:calc(var(--spacing) * 8);height:calc(var(--spacing) * 8)}.size-\\[2\\.2cqw\\]{width:2.2cqw;height:2.2cqw}.size-\\[2\\.4cqw\\]{width:2.4cqw;height:2.4cqw}.size-\\[3\\.2cqw\\]{width:3.2cqw;height:3.2cqw}.size-\\[65\\%\\]{width:65%;height:65%}.size-full{width:100%;height:100%}.h-0\\.5{height:calc(var(--spacing) * .5)}.h-auto{height:auto}.h-dvh{height:100dvh}.h-full{height:100%}.max-h-\\[60vh\\]{max-height:60vh}.max-h-none{max-height:none}.min-h-3{min-height:calc(var(--spacing) * 3)}.min-h-4{min-height:calc(var(--spacing) * 4)}.min-h-6{min-height:calc(var(--spacing) * 6)}.min-h-screen{min-height:100vh}.w-1\\/3{width:33.3333%}.w-40{width:calc(var(--spacing) * 40)}.w-\\[10\\%\\]{width:10%}.w-\\[min\\(34rem\\,90\\%\\)\\]{width:min(34rem,90%)}.w-\\[min\\(100vw\\,calc\\(100dvh\\*16\\/9\\)\\)\\]{width:min(100vw,177.778dvh)}.w-auto{width:auto}.w-full{width:100%}.max-w-\\[calc\\(100\\%-24px\\)\\]{max-width:calc(100% - 24px)}.max-w-none{max-width:none}.min-w-0{min-width:0}.min-w-3{min-width:calc(var(--spacing) * 3)}.min-w-4{min-width:calc(var(--spacing) * 4)}.min-w-full{min-width:100%}.shrink{flex-shrink:1}.shrink-0{flex-shrink:0}.grow{flex-grow:1}.origin-top-left{transform-origin:0 0}.-translate-x-1\\/2{--tw-translate-x:calc(calc(1 / 2 * 100%) * -1);translate:var(--tw-translate-x) var(--tw-translate-y)}.-translate-y-1\\/2{--tw-translate-y:calc(calc(1 / 2 * 100%) * -1);translate:var(--tw-translate-x) var(--tw-translate-y)}.transform{transform:var(--tw-rotate-x,) var(--tw-rotate-y,) var(--tw-rotate-z,) var(--tw-skew-x,) var(--tw-skew-y,)}.cursor-grab{cursor:grab}.cursor-ns-resize{cursor:ns-resize}.cursor-pointer{cursor:pointer}.touch-none{touch-action:none}.resize{resize:both}.grid-cols-\\[auto_1fr\\]{grid-template-columns:auto 1fr}.grid-rows-\\[100\\%\\]{grid-template-rows:100%}.flex-wrap{flex-wrap:wrap}.place-content-center{place-content:center}.place-items-center{place-items:center}.items-center{align-items:center}.items-start{align-items:flex-start}.justify-between{justify-content:space-between}.justify-center{justify-content:center}.justify-end{justify-content:flex-end}.gap-1{gap:var(--spacing)}.gap-1\\.5{gap:calc(var(--spacing) * 1.5)}.gap-2{gap:calc(var(--spacing) * 2)}.gap-3{gap:calc(var(--spacing) * 3)}.gap-4{gap:calc(var(--spacing) * 4)}.gap-\\[0\\.6cqw\\]{gap:.6cqw}.gap-\\[1\\.4cqw\\]{gap:1.4cqw}.gap-\\[1cqw\\]{gap:1cqw}.gap-px{gap:1px}.gap-x-6{column-gap:calc(var(--spacing) * 6)}.gap-y-1{row-gap:var(--spacing)}.self-end{align-self:flex-end}.justify-self-center{justify-self:center}.truncate{text-overflow:ellipsis;white-space:nowrap;overflow:hidden}.overflow-auto{overflow:auto}.overflow-hidden{overflow:hidden}.rounded{border-radius:.25rem}.rounded-\\[1cqw\\]{border-radius:1cqw}.rounded-full{border-radius:2147483647px}.rounded-md{border-radius:var(--radius-md)}.border{border-style:var(--tw-border-style);border-width:1px}.border-2{border-style:var(--tw-border-style);border-width:2px}.border-x{border-inline-style:var(--tw-border-style);border-inline-width:1px}.border-dashed{--tw-border-style:dashed;border-style:dashed}.border-\\[color-mix\\(in_oklab\\,var\\(--ui-border-accented\\)_40\\%\\,white\\)\\]{border-color:var(--ui-border-accented)}@supports (color:color-mix(in lab, red, red)){.border-\\[color-mix\\(in_oklab\\,var\\(--ui-border-accented\\)_40\\%\\,white\\)\\]{border-color:color-mix(in oklab,var(--ui-border-accented) 40%,white)}}.border-\\[color-mix\\(in_oklab\\,var\\(--ui-error\\)_55\\%\\,white\\)\\]{border-color:var(--ui-error)}@supports (color:color-mix(in lab, red, red)){.border-\\[color-mix\\(in_oklab\\,var\\(--ui-error\\)_55\\%\\,white\\)\\]{border-color:color-mix(in oklab,var(--ui-error) 55%,white)}}.border-\\[color-mix\\(in_oklab\\,var\\(--ui-info\\)_55\\%\\,white\\)\\]{border-color:var(--ui-info)}@supports (color:color-mix(in lab, red, red)){.border-\\[color-mix\\(in_oklab\\,var\\(--ui-info\\)_55\\%\\,white\\)\\]{border-color:color-mix(in oklab,var(--ui-info) 55%,white)}}.border-\\[color-mix\\(in_oklab\\,var\\(--ui-success\\)_55\\%\\,white\\)\\]{border-color:var(--ui-success)}@supports (color:color-mix(in lab, red, red)){.border-\\[color-mix\\(in_oklab\\,var\\(--ui-success\\)_55\\%\\,white\\)\\]{border-color:color-mix(in oklab,var(--ui-success) 55%,white)}}.border-\\[color-mix\\(in_oklab\\,var\\(--ui-warning\\)_55\\%\\,white\\)\\]{border-color:var(--ui-warning)}@supports (color:color-mix(in lab, red, red)){.border-\\[color-mix\\(in_oklab\\,var\\(--ui-warning\\)_55\\%\\,white\\)\\]{border-color:color-mix(in oklab,var(--ui-warning) 55%,white)}}.border-accented{border-color:var(--ui-border-accented);border-color:var(--ui-bg-accented)}.border-amber-300{border-color:var(--color-amber-300)}.border-default{border-color:var(--ui-border)}.border-error\\/40{border-color:var(--ui-error)}@supports (color:color-mix(in lab, red, red)){.border-error\\/40{border-color:color-mix(in oklab, var(--ui-error) 40%, transparent)}}.border-error\\/60{border-color:var(--ui-error)}@supports (color:color-mix(in lab, red, red)){.border-error\\/60{border-color:color-mix(in oklab, var(--ui-error) 60%, transparent)}}.border-info\\/40{border-color:var(--ui-info)}@supports (color:color-mix(in lab, red, red)){.border-info\\/40{border-color:color-mix(in oklab, var(--ui-info) 40%, transparent)}}.border-info\\/60{border-color:var(--ui-info)}@supports (color:color-mix(in lab, red, red)){.border-info\\/60{border-color:color-mix(in oklab, var(--ui-info) 60%, transparent)}}.border-primary{border-color:var(--ui-primary)}.border-success\\/40{border-color:var(--ui-success)}@supports (color:color-mix(in lab, red, red)){.border-success\\/40{border-color:color-mix(in oklab, var(--ui-success) 40%, transparent)}}.border-success\\/60{border-color:var(--ui-success)}@supports (color:color-mix(in lab, red, red)){.border-success\\/60{border-color:color-mix(in oklab, var(--ui-success) 60%, transparent)}}.border-warning\\/40{border-color:var(--ui-warning)}@supports (color:color-mix(in lab, red, red)){.border-warning\\/40{border-color:color-mix(in oklab, var(--ui-warning) 40%, transparent)}}.border-warning\\/60{border-color:var(--ui-warning)}@supports (color:color-mix(in lab, red, red)){.border-warning\\/60{border-color:color-mix(in oklab, var(--ui-warning) 60%, transparent)}}.border-white{border-color:var(--color-white)}.border-white\\/30{border-color:#ffffff4d}@supports (color:color-mix(in lab, red, red)){.border-white\\/30{border-color:color-mix(in oklab, var(--color-white) 30%, transparent)}}.border-white\\/40{border-color:#fff6}@supports (color:color-mix(in lab, red, red)){.border-white\\/40{border-color:color-mix(in oklab, var(--color-white) 40%, transparent)}}.bg-accented{background-color:var(--ui-bg-accented)}.bg-amber-300\\/10{background-color:#ffd2361a}@supports (color:color-mix(in lab, red, red)){.bg-amber-300\\/10{background-color:color-mix(in oklab, var(--color-amber-300) 10%, transparent)}}.bg-amber-300\\/25{background-color:#ffd23640}@supports (color:color-mix(in lab, red, red)){.bg-amber-300\\/25{background-color:color-mix(in oklab, var(--color-amber-300) 25%, transparent)}}.bg-black{background-color:var(--color-black)}.bg-black\\/50{background-color:#00000080}@supports (color:color-mix(in lab, red, red)){.bg-black\\/50{background-color:color-mix(in oklab, var(--color-black) 50%, transparent)}}.bg-black\\/60{background-color:#0009}@supports (color:color-mix(in lab, red, red)){.bg-black\\/60{background-color:color-mix(in oklab, var(--color-black) 60%, transparent)}}.bg-black\\/70{background-color:#000000b3}@supports (color:color-mix(in lab, red, red)){.bg-black\\/70{background-color:color-mix(in oklab, var(--color-black) 70%, transparent)}}.bg-default{background-color:var(--ui-bg)}.bg-elevated,.bg-elevated\\/40{background-color:var(--ui-bg-elevated)}@supports (color:color-mix(in lab, red, red)){.bg-elevated\\/40{background-color:color-mix(in oklab, var(--ui-bg-elevated) 40%, transparent)}}.bg-error,.bg-error\\/20{background-color:var(--ui-error)}@supports (color:color-mix(in lab, red, red)){.bg-error\\/20{background-color:color-mix(in oklab, var(--ui-error) 20%, transparent)}}.bg-error\\/45{background-color:var(--ui-error)}@supports (color:color-mix(in lab, red, red)){.bg-error\\/45{background-color:color-mix(in oklab, var(--ui-error) 45%, transparent)}}.bg-info\\/20{background-color:var(--ui-info)}@supports (color:color-mix(in lab, red, red)){.bg-info\\/20{background-color:color-mix(in oklab, var(--ui-info) 20%, transparent)}}.bg-info\\/45{background-color:var(--ui-info)}@supports (color:color-mix(in lab, red, red)){.bg-info\\/45{background-color:color-mix(in oklab, var(--ui-info) 45%, transparent)}}.bg-primary,.bg-primary\\/10{background-color:var(--ui-primary)}@supports (color:color-mix(in lab, red, red)){.bg-primary\\/10{background-color:color-mix(in oklab, var(--ui-primary) 10%, transparent)}}.bg-primary\\/20{background-color:var(--ui-primary)}@supports (color:color-mix(in lab, red, red)){.bg-primary\\/20{background-color:color-mix(in oklab, var(--ui-primary) 20%, transparent)}}.bg-red-600\\/90{background-color:#e40014e6}@supports (color:color-mix(in lab, red, red)){.bg-red-600\\/90{background-color:color-mix(in oklab, var(--color-red-600) 90%, transparent)}}.bg-success\\/10{background-color:var(--ui-success)}@supports (color:color-mix(in lab, red, red)){.bg-success\\/10{background-color:color-mix(in oklab, var(--ui-success) 10%, transparent)}}.bg-success\\/20{background-color:var(--ui-success)}@supports (color:color-mix(in lab, red, red)){.bg-success\\/20{background-color:color-mix(in oklab, var(--ui-success) 20%, transparent)}}.bg-success\\/45{background-color:var(--ui-success)}@supports (color:color-mix(in lab, red, red)){.bg-success\\/45{background-color:color-mix(in oklab, var(--ui-success) 45%, transparent)}}.bg-tone-dawn{background-color:var(--color-tone-dawn)}.bg-tone-day{background-color:var(--color-tone-day)}.bg-tone-dream{background-color:var(--color-tone-dream)}.bg-tone-dusk{background-color:var(--color-tone-dusk)}.bg-tone-night{background-color:var(--color-tone-night)}.bg-tone-storm{background-color:var(--color-tone-storm)}.bg-transparent{background-color:#0000}.bg-warning\\/20{background-color:var(--ui-warning)}@supports (color:color-mix(in lab, red, red)){.bg-warning\\/20{background-color:color-mix(in oklab, var(--ui-warning) 20%, transparent)}}.bg-warning\\/45{background-color:var(--ui-warning)}@supports (color:color-mix(in lab, red, red)){.bg-warning\\/45{background-color:color-mix(in oklab, var(--ui-warning) 45%, transparent)}}.bg-white\\/10{background-color:#ffffff1a}@supports (color:color-mix(in lab, red, red)){.bg-white\\/10{background-color:color-mix(in oklab, var(--color-white) 10%, transparent)}}.bg-\\[repeating-linear-gradient\\(-45deg\\,var\\(--ui-bg-accented\\)_0_12px\\,var\\(--ui-border-accented\\)_12px_24px\\)\\]{background-image:repeating-linear-gradient(-45deg,var(--ui-bg-accented) 0 12px,var(--ui-border-accented) 12px 24px)}.bg-\\[repeating-linear-gradient\\(-45deg\\,var\\(--ui-bg-elevated\\)_0_12px\\,var\\(--ui-bg-accented\\)_12px_24px\\)\\]{background-image:repeating-linear-gradient(-45deg,var(--ui-bg-elevated) 0 12px,var(--ui-bg-accented) 12px 24px)}.object-contain{object-fit:contain}.object-cover{object-fit:cover}.p-0{padding:0}.p-1{padding:var(--spacing)}.p-2{padding:calc(var(--spacing) * 2)}.p-3{padding:calc(var(--spacing) * 3)}.p-6{padding:calc(var(--spacing) * 6)}.p-\\[1\\.5cqw\\]{padding:1.5cqw}.p-\\[2\\.4cqw\\]{padding:2.4cqw}.p-\\[3cqw\\]{padding:3cqw}.px-2{padding-inline:calc(var(--spacing) * 2)}.px-2\\.5{padding-inline:calc(var(--spacing) * 2.5)}.px-\\[1\\.4cqw\\]{padding-inline:1.4cqw}.px-\\[2cqw\\]{padding-inline:2cqw}.py-0\\.5{padding-block:calc(var(--spacing) * .5)}.py-1{padding-block:var(--spacing)}.py-\\[0\\.4cqw\\]{padding-block:.4cqw}.py-\\[0\\.6cqw\\]{padding-block:.6cqw}.pr-1{padding-right:var(--spacing)}.text-center{text-align:center}.text-left{text-align:left}.font-mono{font-family:var(--font-mono)}.font-sans{font-family:var(--font-sans)}.text-sm{font-size:var(--text-sm);line-height:var(--tw-leading,var(--text-sm--line-height))}.text-xs{font-size:var(--text-xs);line-height:var(--tw-leading,var(--text-xs--line-height))}.text-\\[1\\.4cqw\\]{font-size:1.4cqw}.text-\\[1\\.6cqw\\]{font-size:1.6cqw}.text-\\[1\\.8cqw\\]{font-size:1.8cqw}.text-\\[2\\.2cqw\\]{font-size:2.2cqw}.text-\\[2\\.6cqw\\]{font-size:2.6cqw}.leading-none{--tw-leading:1;line-height:1}.leading-tight{--tw-leading:var(--leading-tight);line-height:var(--leading-tight)}.font-bold{--tw-font-weight:var(--font-weight-bold);font-weight:var(--font-weight-bold)}.font-medium{--tw-font-weight:var(--font-weight-medium);font-weight:var(--font-weight-medium)}.font-semibold{--tw-font-weight:var(--font-weight-semibold);font-weight:var(--font-weight-semibold)}.tracking-wide{--tw-tracking:var(--tracking-wide);letter-spacing:var(--tracking-wide)}.break-words{overflow-wrap:break-word}.whitespace-nowrap{white-space:nowrap}.whitespace-pre{white-space:pre}.whitespace-pre-wrap{white-space:pre-wrap}.text-default{color:var(--ui-text)}.text-highlighted{color:var(--ui-text-highlighted)}.text-muted{color:var(--ui-text-muted)}.text-primary{color:var(--ui-primary)}.text-success{color:var(--ui-success)}.text-white{color:var(--color-white)}.text-white\\/70{color:#ffffffb3}@supports (color:color-mix(in lab, red, red)){.text-white\\/70{color:color-mix(in oklab, var(--color-white) 70%, transparent)}}.text-white\\/80{color:#fffc}@supports (color:color-mix(in lab, red, red)){.text-white\\/80{color:color-mix(in oklab, var(--color-white) 80%, transparent)}}.lowercase{text-transform:lowercase}.uppercase{text-transform:uppercase}.italic{font-style:italic}.opacity-75{opacity:.75}.opacity-80{opacity:.8}.opacity-100{opacity:1}.shadow{--tw-shadow:0 1px 3px 0 var(--tw-shadow-color,#0000001a), 0 1px 2px -1px var(--tw-shadow-color,#0000001a);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.shadow-\\[0_0_0_1px_rgb\\(0_0_0\\/0\\.45\\)\\]{--tw-shadow:0 0 0 1px var(--tw-shadow-color,#00000073);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.shadow-lg{--tw-shadow:0 10px 15px -3px var(--tw-shadow-color,#0000001a), 0 4px 6px -4px var(--tw-shadow-color,#0000001a);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.ring,.ring-1{--tw-ring-shadow:var(--tw-ring-inset,) 0 0 0 calc(1px + var(--tw-ring-offset-width)) var(--tw-ring-color,currentcolor);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.ring-2{--tw-ring-shadow:var(--tw-ring-inset,) 0 0 0 calc(2px + var(--tw-ring-offset-width)) var(--tw-ring-color,currentcolor);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.ring-primary\\/30{--tw-ring-color:var(--ui-primary)}@supports (color:color-mix(in lab, red, red)){.ring-primary\\/30{--tw-ring-color:color-mix(in oklab, var(--ui-primary) 30%, transparent)}}.ring-success\\/30{--tw-ring-color:var(--ui-success)}@supports (color:color-mix(in lab, red, red)){.ring-success\\/30{--tw-ring-color:color-mix(in oklab, var(--ui-success) 30%, transparent)}}.ring-white{--tw-ring-color:var(--color-white)}.outline{outline-style:var(--tw-outline-style);outline-width:1px}.outline-3{outline-style:var(--tw-outline-style);outline-width:3px}.outline-primary{outline-color:var(--ui-primary)}.blur{--tw-blur:blur(8px);filter:var(--tw-blur,) var(--tw-brightness,) var(--tw-contrast,) var(--tw-grayscale,) var(--tw-hue-rotate,) var(--tw-invert,) var(--tw-saturate,) var(--tw-sepia,) var(--tw-drop-shadow,)}.filter{filter:var(--tw-blur,) var(--tw-brightness,) var(--tw-contrast,) var(--tw-grayscale,) var(--tw-hue-rotate,) var(--tw-invert,) var(--tw-saturate,) var(--tw-sepia,) var(--tw-drop-shadow,)}.transition{transition-property:color,background-color,border-color,outline-color,text-decoration-color,fill,stroke,--tw-gradient-from,--tw-gradient-via,--tw-gradient-to,opacity,box-shadow,transform,translate,scale,rotate,filter,-webkit-backdrop-filter,backdrop-filter,display,content-visibility,overlay,pointer-events;transition-timing-function:var(--tw-ease,var(--default-transition-timing-function));transition-duration:var(--tw-duration,var(--default-transition-duration))}.transition-\\[left\\,bottom\\,height\\,filter\\]{transition-property:left,bottom,height,filter;transition-timing-function:var(--tw-ease,var(--default-transition-timing-function));transition-duration:var(--tw-duration,var(--default-transition-duration))}.transition-colors{transition-property:color,background-color,border-color,outline-color,text-decoration-color,fill,stroke,--tw-gradient-from,--tw-gradient-via,--tw-gradient-to;transition-timing-function:var(--tw-ease,var(--default-transition-timing-function));transition-duration:var(--tw-duration,var(--default-transition-duration))}.transition-opacity{transition-property:opacity;transition-timing-function:var(--tw-ease,var(--default-transition-timing-function));transition-duration:var(--tw-duration,var(--default-transition-duration))}.duration-1000{--tw-duration:1s;transition-duration:1s}.ease-in-out{--tw-ease:var(--ease-in-out);transition-timing-function:var(--ease-in-out)}.ease-out{--tw-ease:var(--ease-out);transition-timing-function:var(--ease-out)}.will-change-transform{will-change:transform}.outline-none{--tw-outline-style:none;outline-style:none}.select-none{-webkit-user-select:none;user-select:none}.\\[pause\\:500\\]{pause:500}.\\[pause\\:800\\]{pause:800}.\\[pause\\:2000\\]{pause:2000}.\\[pause\\:N\\]{pause:N}.\\[pause\\:ms\\]{pause:ms}.ring-inset{--tw-ring-inset:inset}@media (hover:hover){.hover\\:bg-white\\/10:hover{background-color:#ffffff1a}@supports (color:color-mix(in lab, red, red)){.hover\\:bg-white\\/10:hover{background-color:color-mix(in oklab, var(--color-white) 10%, transparent)}}.hover\\:outline-2:hover{outline-style:var(--tw-outline-style);outline-width:2px}.hover\\:outline-primary:hover,.hover\\:outline-primary\\/60:hover{outline-color:var(--ui-primary)}@supports (color:color-mix(in lab, red, red)){.hover\\:outline-primary\\/60:hover{outline-color:color-mix(in oklab, var(--ui-primary) 60%, transparent)}}}.active\\:cursor-grabbing:active{cursor:grabbing}@media (width>=40rem){.sm\\:flex{display:flex}.sm\\:items-center{align-items:center}.sm\\:justify-between{justify-content:space-between}.sm\\:gap-3{gap:calc(var(--spacing) * 3)}}}.vn-bg-cut-enter-active,.vn-bg-cut-leave-active{transition:none}.vn-bg-cut-leave-active{opacity:0}.vn-bg-blur-enter-active,.vn-bg-blur-leave-active{transition:opacity var(--vn-fade,.4s) ease, filter var(--vn-fade,.4s) ease, transform var(--vn-fade,.4s) ease}.vn-bg-blur-enter-from,.vn-bg-blur-leave-to{opacity:0;filter:blur(1.4cqw);transform:scale(1.06)}.vn-portrait-cut-enter-active,.vn-portrait-cut-leave-active{transition:none}.vn-portrait-fade-leave-active{transition:opacity var(--vn-fade,.4s) ease}.vn-portrait-fade-enter-active{transition:opacity var(--vn-fade,.4s) ease var(--vn-portrait-enter-delay,0s)}.vn-portrait-fade-enter-from,.vn-portrait-fade-leave-to{opacity:0}.vn-portrait-slide-leave-active{transition:opacity var(--vn-fade,.4s) ease, transform var(--vn-fade,.4s) ease}.vn-portrait-slide-enter-active{transition:opacity var(--vn-fade,.4s) ease var(--vn-portrait-enter-delay,0s), transform var(--vn-fade,.4s) ease var(--vn-portrait-enter-delay,0s)}[data-enter-delayed=true]>.vn-portrait-cut-enter-from{opacity:0}[data-enter-delayed=true]>.vn-portrait-cut-enter-active{transition:opacity 0s linear var(--vn-portrait-enter-delay,0s)}.vn-portrait-slide-enter-from,.vn-portrait-slide-leave-to{opacity:0;transform:translateX(var(--vn-slide,0%))}.vn-expr-enter-active,.vn-expr-leave-active{transition:opacity .25s}.vn-expr-enter-from,.vn-expr-leave-to{opacity:0}.vn-expr-inout-enter-active{transition:opacity .25s}.vn-expr-inout-enter-from{opacity:0}@media (prefers-reduced-motion:reduce){.vn-expr-inout-enter-active{transition:none}}.vn-fade-enter-active,.vn-fade-leave-active{transition:opacity var(--vn-fade,.4s) ease}.vn-fade-enter-from,.vn-fade-leave-to{opacity:0}.vn-backdrop{transition:filter var(--vn-fade,.4s) ease, transform var(--vn-fade,.4s) ease}@media (prefers-reduced-motion:reduce){.vn-backdrop{transition:none}}.vn-story-panel{--vn-story-font:var(--font-serif);z-index:20;font-family:var(--vn-story-font);overflow-wrap:anywhere;text-align:var(--vn-text-align,left);scrollbar-width:thin;max-height:74%;position:absolute;overflow:clip auto}.vn-story-panel--line{text-wrap:pretty;width:63.4%;min-height:5.98cqw;padding:2.27cqw 1.675cqw 1.675cqw;font-size:clamp(20px,1.5354cqw,32px);line-height:1.4;left:50%;overflow:visible;transform:translate(-50%)}.vn-story-panel--line[data-position=top]{top:8.18%}.vn-story-panel--line[data-position=bottom]{bottom:max(9.5%,3.6cqw)}.vn-story-panel--framed{--vn-border-width:max(2px, .119617cqw);border:var(--vn-border-width) solid;box-shadow:0 1.435cqw .718cqw -1.136cqw #000000a8,0 .897cqw 1.495cqw #0003,0 1.495cqw .598cqw #0003,inset 0 .239cqw .239cqw #00000040}.vn-story-panel--framed[data-gradient-border=true]{background-clip:padding-box;overflow:visible}.vn-story-panel--framed[data-gradient-border=true]:before{content:\"\";inset:calc(-1 * var(--vn-border-width));border-radius:inherit;padding:var(--vn-border-width);pointer-events:none;-webkit-mask-composite:xor;-webkit-mask-source-type:auto,auto;-webkit-mask-composite:xor;-webkit-mask-source-type:auto,auto;background:linear-gradient(#eec68bcc 0%,#f2d09ecc 19.714%,#fff1dccc 32.695%,#f2cf9ccc 44.233%,#9c8768cc 100%);position:absolute;-webkit-mask-image:linear-gradient(#fff 0 0),linear-gradient(#fff 0 0);mask-image:linear-gradient(#fff 0 0),linear-gradient(#fff 0 0);-webkit-mask-position:0 0,0 0;mask-position:0 0,0 0;-webkit-mask-size:auto,auto;mask-size:auto,auto;-webkit-mask-repeat:repeat,repeat;mask-repeat:repeat,repeat;-webkit-mask-clip:content-box,border-box;mask-clip:content-box,border-box;-webkit-mask-origin:content-box,border-box;mask-origin:content-box,border-box;-webkit-mask-composite:xor;mask-composite:exclude;-webkit-mask-source-type:auto,auto;mask-mode:match-source,match-source}.vn-story-panel--rounded{border-radius:max(4px,.359cqw)}.vn-story-panel--square{border-radius:0}.vn-story-panel--round{border-radius:1.2cqw}.vn-dialog-content{align-items:flex-start;gap:1.435cqw;display:flex}.vn-dialog-content--right{flex-direction:row-reverse}.vn-story-text{min-width:0;font:inherit;line-height:inherit;text-align:inherit;flex:1}.vn-story-text p{margin:0}.vn-dialog-face{aspect-ratio:1;background:#12151ad9;border:1px solid #9c876866;border-radius:.239cqw;flex:0 0 clamp(32px,6.58cqw,110px);width:clamp(32px,6.58cqw,110px);overflow:hidden}.vn-speaker-badge{overflow-wrap:anywhere;border:max(2px,.16cqw) solid;border-radius:.239cqw;max-width:calc(100% - 3.35cqw);padding:.24cqw .598cqw;font-size:clamp(16px,1.316cqw,26px);font-weight:600;line-height:1.2;position:absolute;top:-1.316cqw;left:1.675cqw}.vn-speaker-badge--plain{background:0 0!important;border-color:#0000!important}.vn-speaker-badge[data-corners=square]{border-radius:0}.vn-speaker-badge[data-corners=round]{border-radius:1.2cqw}.vn-story-panel--line .vn-story-text{scrollbar-width:thin;max-height:32cqw;overflow-y:auto}.vn-continue-arrow{opacity:.7;font-size:max(16px,.9em);position:absolute;bottom:.3cqw;right:.6cqw}.vn-story-panel--narration{text-shadow:0 .299cqw .239cqw #00000040;text-wrap:pretty;width:59.81%;font-size:clamp(20px,1.7746cqw,36px);line-height:1.6;left:20.095%}.vn-story-panel--narration[data-mode=standard][data-position=top]{top:10.52%}.vn-story-panel--narration[data-mode=standard][data-position=bottom]{bottom:max(15.3%,40px)}.vn-story-panel--narration[data-mode=long]{transform:translateY(-50%)}.vn-story-panel--narration[data-mode=long][data-position=top]{top:43.9%}.vn-story-panel--narration[data-mode=long][data-position=bottom]{top:56.1%}.vn-story-panel--narration[data-mode=long][data-horizontal-align=left]{left:7.18%}.vn-story-panel--narration[data-mode=long][data-horizontal-align=right]{left:auto;right:7.18%}.vn-story-panel--narration.vn-story-panel--framed{padding:1.675cqw}.vn-narration-treatment{--vn-treatment-direction:to bottom;--vn-treatment-blur:.457536cqw;--vn-treatment-dark:.8;--vn-treatment-mid:.63;--vn-treatment-mid-stop:16.8292%;--vn-treatment-clear-stop:82.6955%;pointer-events:none;z-index:19;width:100%;height:31.46%;position:absolute;top:0;left:0}.vn-narration-treatment[data-position=bottom]{--vn-treatment-direction:to top;top:auto;bottom:0}.vn-narration-treatment[data-mode=standard][data-position=bottom]{--vn-treatment-mid-stop:19.1647%;--vn-treatment-clear-stop:90%}.vn-narration-treatment[data-mode=long]{height:76.09%}.vn-narration-treatment[data-mode=long][data-horizontal-align=left],.vn-narration-treatment[data-mode=long][data-horizontal-align=right]{--vn-treatment-dark:.6;--vn-treatment-mid:.5;width:76.5%;height:100%;top:0;bottom:0}.vn-narration-treatment[data-mode=long][data-horizontal-align=left]{--vn-treatment-direction:to right}.vn-narration-treatment[data-mode=long][data-horizontal-align=right]{--vn-treatment-direction:to left;left:auto;right:0}.vn-narration-blur-band,.vn-narration-shade{position:absolute;inset:0}.vn-narration-blur-band,.vn-narration-shade,.vn-story-panel--narration .vn-story-text[data-fade=true]{opacity:1;transition:opacity .9s ease-in-out}.vn-narration-shade{transition-delay:.2s}@starting-style{.vn-narration-blur-band,.vn-narration-shade,.vn-story-panel--narration .vn-story-text[data-fade=true]{opacity:0}}@media (prefers-reduced-motion:reduce){.vn-narration-blur-band,.vn-narration-shade,.vn-story-panel--narration .vn-story-text[data-fade=true]{transition:none}}.vn-narration-shade{background:linear-gradient(var(--vn-treatment-direction), rgb(0 0 0/var(--vn-treatment-dark)) 0%, rgb(0 0 0/var(--vn-treatment-mid)) var(--vn-treatment-mid-stop), #0000 var(--vn-treatment-clear-stop))}@container (width<=640px){.vn-story-panel--narration[data-mode=long][data-position=top]{max-height:60%;top:calc(44% - 17.6px)}.vn-story-panel--narration[data-mode=long][data-position=bottom]{max-height:60%;top:calc(56% - 22.4px)}.vn-story-panel--line{width:88%;padding:3cqw 2cqw 2cqw}.vn-story-panel--narration{width:82%;left:9%}.vn-story-panel--narration[data-mode=long][data-horizontal-align=left]{left:7.18%}.vn-story-panel--narration[data-mode=long][data-horizontal-align=right]{right:7.18%}}.vn-background-selection{pointer-events:none;z-index:50;outline-offset:-3px;position:absolute;inset:0}.vn-editor-stage:has([data-stage-background]:hover)>.vn-background-selection:not([data-selected=true]){outline:2px solid var(--ui-primary)}@supports (color:color-mix(in lab, red, red)){.vn-editor-stage:has([data-stage-background]:hover)>.vn-background-selection:not([data-selected=true]){outline:2px solid color-mix(in srgb, var(--ui-primary) 60%, transparent)}}.vn-editor-stage>.vn-background-selection[data-selected=true]{outline:3px solid var(--ui-primary)}.vn-story-panel--line[data-mode=bubble]{flex-direction:column;gap:max(6px,.4785cqw);width:max-content;min-width:min(max(180px,16.746cqw),100% - 32px);max-width:min(max(240px,24.82cqw),100% - 32px);min-height:0;max-height:calc(100% - min(40px,18cqh) - 32px);padding:max(10px,1.316cqw) max(12px,1.495cqw);font-size:clamp(18px,1.1962cqw,24px);line-height:1.3;display:flex;bottom:auto;transform:translate(0)}.vn-story-panel--line[data-mode=bubble] .vn-speaker-badge{color:#9c8768;background:0 0;border:0;border-radius:0;flex:none;max-width:100%;padding:0;font-size:clamp(16px,1.0766cqw,22px);position:static}.vn-story-panel--line[data-mode=bubble] .vn-dialog-content{scrollbar-width:thin;min-height:0;overflow-y:auto}.vn-story-panel--line[data-mode=bubble] .vn-story-text{max-height:none;overflow:visible}.vn-bubble-tail{inset:calc(-1 * var(--vn-border-width));width:calc(100% + 2 * var(--vn-border-width));height:calc(100% + 2 * var(--vn-border-width));pointer-events:none;fill:var(--vn-panel-border);fill-opacity:.6;stroke:none;stroke-linejoin:round;position:absolute;overflow:visible}.vn-story-panel--line[data-mode=bubble][data-bubble-entrance=waiting]{opacity:0;pointer-events:none;transition:none;translate:0 6px}.vn-story-panel--line[data-mode=bubble][data-bubble-entrance=entering]{opacity:1;transition:opacity var(--vn-bubble-enter-duration) ease-out, translate var(--vn-bubble-enter-duration) ease-out;translate:0}@media (prefers-reduced-motion:reduce){.vn-story-panel--line[data-mode=bubble][data-bubble-entrance]{opacity:1;transition:none;translate:none}}.vn-story-panel[data-box-entrance][data-position=top]{--vn-box-from:calc(max(10px, 1.2cqw) * -1)}.vn-story-panel[data-box-entrance][data-position=bottom]{--vn-box-from:max(10px, 1.2cqw)}.vn-story-panel[data-box-entrance=waiting]{opacity:0;translate:0 var(--vn-box-from,0);pointer-events:none;transition:none}.vn-story-panel[data-box-entrance=entering]{opacity:1;transition:opacity calc(var(--vn-box-enter-duration) * .7) ease-out, translate var(--vn-box-enter-duration) ease-out;translate:0}@media (prefers-reduced-motion:reduce){.vn-story-panel[data-box-entrance]{opacity:1;transition:none;translate:none}}.vn-story-panel--line[data-mode=bubble].vn-story-panel--framed{--vn-border-width:max(2px, .0598cqw)}.vn-story-panel--line[data-mode=bubble][data-gradient-border=true]:before{background:linear-gradient(#ffe8c599,#eec68b99)}.vn-story-panel--line[data-mode=bubble] .vn-story-text{opacity:.9}.vn-story-panel--line[data-mode=bubble] .vn-speaker-badge{color:#eec68bcc}.vn-story-panel--line[data-mode=bubble].vn-story-panel--rounded{border-radius:max(4px,.359cqw)}.vn-story-panel--line[data-mode=bubble][data-bubble-entrance=ready],.vn-story-panel--line[data-mode=bubble][data-bubble-entrance=skipped]{opacity:1;transition:none;translate:none}.vn-stage-heading{pointer-events:none;z-index:35;white-space:nowrap;text-overflow:ellipsis;max-width:calc(100% - 140px);font:.7177cqw/1.25 var(--font-story-sans);letter-spacing:.2em;text-transform:uppercase;color:#ffffff80;text-shadow:0 1px 4px #000;position:absolute;top:max(12px,1.675cqw);left:max(12px,1.914cqw);overflow:hidden}.vn-stage-progress{z-index:40;box-sizing:border-box;cursor:help;background:#181e28;border:0;border-radius:999px;place-items:center;width:5.20335cqw;height:1.01675cqw;padding:0;display:grid;position:absolute;top:1.3744cqw;right:1.555cqw;box-shadow:inset 0 0 0 .0598cqw #00000080}.vn-stage-progress:focus-visible{outline-offset:3px;outline:2px solid #eec68b}.vn-stage-progress-track{background:#3e4650;border-radius:999px;width:4.36603cqw;height:.35885cqw;display:block;overflow:hidden;box-shadow:inset 0 1px 1px #0000004d}.vn-stage-progress-track>span{border-radius:inherit;background:linear-gradient(90deg,#bbb,#999);height:100%;transition:width .35s ease-out;display:block;box-shadow:inset 0 0 0 .0598cqw #d1d1d1}.vn-stage-progress-track>span[data-complete=true]{background:linear-gradient(90deg,#eec68b,#ffe9cb);box-shadow:inset 0 0 0 .0598cqw #fff1de}.vn-stage-progress-details{background:var(--ui-bg);width:max-content;max-width:min(300px,80cqw);box-shadow:0 0 0 1px var(--ui-border);color:var(--ui-text-highlighted);font:var(--text-xs)/var(--text-xs--line-height) var(--font-sans);border-radius:4px;padding:6px 10px;position:absolute;top:calc(100% + 8px);right:0}.vn-scene-corner{pointer-events:none;z-index:30;text-align:left;color:#fff;opacity:.7;border-left:.2392cqw solid #9c8768;row-gap:.42cqw;max-width:min(30%,360px);padding:.7177cqw 0 .7177cqw 1.1354cqw;display:grid;position:absolute;bottom:max(16px,1.555cqw);left:max(12px,1.435cqw)}.vn-scene-corner-label{font:600 .5981cqw/1.2 var(--font-story-sans);letter-spacing:.34em;text-transform:uppercase;color:#eec68b;opacity:.8}.vn-scene-corner-title{overflow-wrap:anywhere;min-width:0;max-width:min(100%,13.5167cqw);font:1.546cqw/1.143 var(--vn-scene-title-font,var(--font-serif));opacity:.8}.vn-scene-corner-subtitle{font:.7775cqw/1.231 var(--font-story-sans);color:#fffc;opacity:.8}.vn-stage-continue{pointer-events:none;z-index:35;text-align:center;-webkit-backdrop-filter:blur(12px);color:#fff3e2c4;max-width:40%;font:600 11px/1.3 var(--font-story-sans);letter-spacing:.16em;text-transform:uppercase;opacity:0;transform-origin:50%;--vn-continue-cycle:1.1s;--vn-continue-delay:.9s;background:#080a0e33;border-radius:6px;padding:7px 12px;transition:opacity .3s ease-out;position:absolute;bottom:max(22px,4%);left:50%;transform:translate(-50%)}.vn-stage-continue:after{content:\"\";border-inline:7px solid #0000;border-top:7px solid #f4efe5;margin-left:-7px;position:absolute;top:calc(100% + 2px);left:50%}.vn-stage-continue[data-ready=true]{opacity:1;animation:vn-continue-pulse var(--vn-continue-cycle) ease-in-out var(--vn-continue-delay) infinite;transition-duration:.9s;transition-timing-function:ease-in-out}.vn-stage-continue[data-ready=true]:after{animation:vn-continue-bob var(--vn-continue-cycle) ease-in-out var(--vn-continue-delay) infinite}@keyframes vn-continue-pulse{0%,to{opacity:1;transform:scale(1)translate(-50%)}50%{opacity:.9;color:#fff;transform:scale(1)translate(-50%)}}@keyframes vn-continue-bob{0%,to{transform:translateY(0)}50%{transform:translateY(3px)}}.vn-stage-continue-compact{display:none}@container (width<=1000px){.vn-scene-corner-subtitle{display:none}}@container (width<=640px){:is(:is(.vn-player,.vn-editor-stage)[data-stage-layout=classic]:has(.vn-stage-heading) .vn-story-panel--narration[data-mode=standard][data-position=top],:is(.vn-player,.vn-editor-stage)[data-stage-layout=classic]:has(.vn-stage-heading) .vn-story-panel--line:not([data-mode=bubble])[data-position=top]){top:max(10.52%,28px)}.vn-stage-heading{letter-spacing:.06em;max-width:calc(100% - 120px);top:12px}.vn-scene-corner{max-width:30%;padding-left:8px}.vn-scene-corner-label{display:none}.vn-scene-corner-title{white-space:nowrap;text-overflow:ellipsis;overflow:hidden}.vn-stage-continue-full{display:none}.vn-stage-continue-compact{display:inline}.vn-stage-continue{max-width:30%}}:is(.vn-player,.vn-editor-stage)[data-stage-layout=corners] .vn-scene-corner{top:max(12px,1.675cqw);bottom:auto}:is(.vn-player,.vn-editor-stage)[data-stage-layout=corners] .vn-toolbar{top:1.4cqw;bottom:auto}:is(.vn-player,.vn-editor-stage)[data-stage-layout=corners] .vn-stage-heading{max-width:28%;top:auto;bottom:max(16px,1.255cqw);left:max(12px,1.435cqw)}:is(.vn-player,.vn-editor-stage)[data-stage-layout=corners] .vn-stage-progress{top:auto;bottom:max(16px,1.155cqw);right:max(12px,1.335cqw)}:is(.vn-player,.vn-editor-stage)[data-stage-layout=corners] .vn-stage-progress-details{top:auto;bottom:calc(100% + 8px)}@container (width<=640px){:is(.vn-player,.vn-editor-stage)[data-stage-layout=corners] .vn-stage-heading{bottom:12px}:is(.vn-player,.vn-editor-stage)[data-stage-layout=corners] .vn-story-panel--narration[data-mode=standard][data-position=top]{top:max(10.52%,44px)}:is(.vn-player,.vn-editor-stage)[data-stage-layout=corners] .vn-story-panel--line:not([data-mode=bubble])[data-position=top]{top:max(8.18%,44px)}}@media (prefers-reduced-motion:reduce){.vn-stage-progress-track>span,.vn-stage-continue,.vn-stage-continue[data-ready=true],.vn-stage-continue[data-ready=true]:after{transition:none;animation:none}}.vn-scene-opening{pointer-events:none;z-index:25;place-items:center;display:grid;position:absolute;inset:0}.vn-scene-opening-blur,.vn-scene-opening-shade{position:absolute;inset:0}.vn-scene-opening-blur{-webkit-backdrop-filter:blur(.35885cqw);transition:backdrop-filter var(--vn-scene-enter) ease-in-out}.vn-scene-opening-shade{opacity:1;transition:opacity var(--vn-scene-enter) ease-in-out var(--vn-scene-shade-delay);background:#0000004d}.vn-scene-opening-copy{text-align:center;color:#fff;opacity:1;filter:blur();width:100%;max-width:38cqw;max-height:80%;transition:opacity var(--vn-scene-text-enter) ease-in-out var(--vn-scene-text-delay), transform var(--vn-scene-text-enter) ease-in-out var(--vn-scene-text-delay), filter var(--vn-scene-text-enter) ease-in-out var(--vn-scene-text-delay);justify-items:center;margin-top:-5cqh;display:grid;position:relative;overflow-y:auto;transform:translateY(0)}.vn-scene-opening-label{font:600 max(10px, .7177cqw)/1.25 var(--font-story-sans);letter-spacing:.34em;text-transform:uppercase;color:#eec68b;opacity:.8;margin-bottom:2.25cqw;font-weight:600}.vn-scene-opening-title{overflow-wrap:anywhere;width:100%;font:max(28px, 5.0239cqw)/.95238 var(--vn-scene-title-font,var(--font-serif))}.vn-scene-opening-subtitle{font:max(14px, .95694cqw)/1.1875 var(--font-story-sans);color:#fff9;margin-top:1.9139cqw}.vn-scene-opening:is([data-shown=false],.vn-scene-opening-leave-to) .vn-scene-opening-blur{-webkit-backdrop-filter:blur()}.vn-scene-opening:is([data-shown=false],.vn-scene-opening-leave-to) .vn-scene-opening-shade{opacity:0}.vn-scene-opening:is([data-shown=false],.vn-scene-opening-leave-to) .vn-scene-opening-copy{opacity:0;filter:blur(1.5px);transform:translateY(3px)}.vn-scene-opening[data-shown=false]>*,.vn-scene-opening.vn-scene-opening-leave-active>*{transition-duration:var(--vn-scene-exit);transition-delay:0s}.vn-scene-opening[data-instant=true]>*{transition:none}.vn-scene-corner-enter-active{transition:opacity .7s ease-in-out}.vn-scene-corner-leave-active{transition:opacity .3s ease-out}.vn-scene-corner-enter-from,.vn-scene-corner-leave-to{opacity:0}.vn-question{z-index:35;-webkit-backdrop-filter:blur(4px);backdrop-filter:blur(4px);background:#0006;place-items:center;padding:4cqw;animation:.5s ease-in-out both vn-question-shade-in;display:grid;position:absolute;inset:0;overflow-y:auto}@keyframes vn-question-shade-in{0%{background-color:#0000}to{background-color:#0009}}.vn-question[data-static=true]{animation:none}.vn-question-prompt,.vn-question-answer{animation:vn-question-rise var(--vn-choice-in,.4s) ease-out calc(var(--vn-choice-in-delay,.2s) + var(--vn-choice-in-step,.1s) * var(--i,0)) both}@keyframes vn-question-rise{0%{opacity:0;transform:translateY(1.2cqw)}}.vn-question[data-static=true] .vn-question-prompt,.vn-question[data-static=true] .vn-question-answer{animation:none}.vn-question-leave-active,.vn-question[data-leaving=true]{pointer-events:none;animation:vn-question-shade-out var(--vn-choice-fade,.25s) ease-in-out var(--vn-choice-hold,.15s) both}.vn-question-leave-active .vn-question-prompt,.vn-question-leave-active .vn-question-answer:not([data-chosen=true]),.vn-question[data-leaving=true] .vn-question-prompt,.vn-question[data-leaving=true] .vn-question-answer:not([data-chosen=true]){animation:vn-question-content-out var(--vn-choice-others,.2s) ease-in-out both}.vn-question-leave-active .vn-question-answer[data-chosen=true],.vn-question[data-leaving=true] .vn-question-answer[data-chosen=true]{animation:vn-answer-grow calc(var(--vn-choice-hold,.15s) + var(--vn-choice-fade,.25s)) ease-out both, vn-question-content-out var(--vn-choice-fade,.25s) ease-in var(--vn-choice-hold,.15s) both}@keyframes vn-question-shade-out{0%{-webkit-backdrop-filter:blur(4px);backdrop-filter:blur(4px);background-color:#0009}to{-webkit-backdrop-filter:blur();backdrop-filter:blur();background-color:#0000}}@keyframes vn-question-content-out{to{opacity:0}}@keyframes vn-answer-grow{to{transform:scale(1.08)}}@media (prefers-reduced-motion:reduce){.vn-question,.vn-question *,.vn-question-leave-active,.vn-question-leave-active *{animation:none}}.vn-question-content{justify-items:center;row-gap:4cqw;width:100%;margin:auto;display:grid;transform:translateY(-2cqh)}.vn-question-prompt{color:#fff3e2;text-align:center;max-width:85%;font:max(18px, 2.8708cqw)/1.2 var(--font-serif);text-shadow:0 2px 8px #000000b3;overflow-wrap:anywhere}.vn-question-answers{gap:max(10px,1.4354cqw);width:min(80cqw,max(240px,21.5311cqw));display:grid}.vn-question-answer{color:#fff3e2cc;min-height:max(40px,4.3062cqw);font:max(18px, 1.4746cqw)/1.2 var(--font-serif);white-space:normal;overflow-wrap:anywhere;text-align:center;background:linear-gradient(#49576acc,#2f3a4acc);border:max(1px,.1196cqw) solid #7e91a980;border-radius:max(5px,.7177cqw);justify-content:center;padding:max(8px,.8373cqw) max(12px,1.1962cqw);transition:background .18s,border-color .18s,color .18s,box-shadow .18s;box-shadow:0 4px 12px #0003,inset 0 1px #ffffff0f}@media (hover:hover){.vn-question-answer:hover{color:#fff3e2;background:linear-gradient(#6b7787e6,#404d60e6);border-color:#eee3d0b3}}.vn-question-answer:focus-visible{outline-offset:3px;outline:2px solid #eec68b}.vn-question-answer:active{color:#eec68b;background:linear-gradient(#8c8b86f2,#444f60f2);border-color:#c7ae87}.vn-question-answer.vn-answer-secondary{color:#fff3e2a6;background:linear-gradient(#1a202ad9,#0d1118d9);border-color:#7e91a980;box-shadow:0 4px 12px #0003,inset 0 1px #ffffff0f}@media (hover:hover){.vn-question-answer.vn-answer-secondary:hover{color:#fff3e2e6;background:linear-gradient(#28313fe6,#151b25e6);border-color:#eee3d0b3}}.vn-question-answer.vn-answer-secondary:active{color:#eec68b;background:linear-gradient(#343a42f2,#151b25f2);border-color:#c7ae87}@media (prefers-reduced-motion:reduce){.vn-scene-opening>*,.vn-scene-corner-enter-active,.vn-scene-corner-leave-active,.vn-question-answer{transition:none}}:is(.vn-player,.vn-editor-stage)[data-text-style=default]{--vn-scene-title-font:var(--font-story-sans)}.vn-title-screen{z-index:50;color:#fff;text-align:center;background:radial-gradient(at 50% 30%,#1b2938,#080a0d 75%);place-items:safe center;padding:max(20px,3cqw);display:grid;position:absolute;inset:0;overflow-y:auto}.vn-title-art,.vn-title-treatment{pointer-events:none;width:100%;height:100%;position:absolute;inset:0}.vn-title-art{object-fit:cover;filter:blur(6px);opacity:.6}.vn-title-treatment{background:linear-gradient(#080a0d4d,#080a0dcc)}.vn-title-content{justify-items:center;gap:max(18px,1.9139cqw);width:100%;max-width:70cqw;margin:auto;padding-block:1cqw;display:grid;position:relative}.vn-title-episode{font:600 max(12px, 1cqw)/1.3 var(--font-story-sans);letter-spacing:.3em;text-transform:uppercase;color:#eec68bcc}.vn-title-heading{max-width:100%;font:max(32px, 5.0239cqw)/1.08 var(--vn-scene-title-font,var(--font-serif));color:#ffffffe6;overflow-wrap:anywhere;font-weight:400}.vn-title-summary{max-width:54cqw;font:max(16px, 1.0766cqw)/1.6 var(--font-story-sans);color:#fff9}.vn-title-actions{flex-wrap:wrap;justify-content:center;gap:max(10px,.7177cqw);margin-top:.6cqw;display:flex}.vn-title-actions .vn-question-answer{min-width:max(100px,7.177cqw);min-height:max(36px,2.3923cqw);font:max(16px, 1.0766cqw)/1.2 var(--vn-scene-title-font,var(--font-serif));border-width:1px;border-radius:max(5px,.3589cqw);padding:max(8px,.4785cqw) max(20px,1.4354cqw)}.vn-title-languages{font-family:var(--font-story-sans);border:1px solid #7e91a940;border-radius:max(5px,.3589cqw);flex-wrap:wrap;justify-content:center;gap:0;display:flex;overflow:hidden}.vn-title-languages button{box-shadow:none;border-radius:0}.vn-title-languages .is-active{color:#fff;background-color:#7e91a966}.vn-title-warnings{text-align:left;max-width:54cqw;font:12px/1.5 var(--font-sans);color:var(--ui-text-muted)}@container (width<=640px){.vn-title-screen{place-items:start center}.vn-title-content,.vn-title-summary,.vn-title-warnings{max-width:100%}}.vn-end-screen{z-index:30;color:#fff;text-align:center;background:radial-gradient(at 50% 40%,#1b2938d1,#080a0df0 75%);place-items:safe center;padding:max(20px,3cqw);animation:.7s ease-out both vn-end-fade;display:grid;position:absolute;inset:0;overflow-y:auto}.vn-end-content{justify-items:center;gap:max(16px,1.6cqw);width:100%;max-width:60cqw;margin:auto;display:grid}.vn-end-heading{font:max(40px, 6cqw)/1.05 var(--vn-scene-title-font,var(--font-serif));letter-spacing:.02em;color:#ffffffeb;font-weight:400;animation:.8s ease-out .2s both vn-end-rise}.vn-end-rule{background:linear-gradient(90deg,#0000,#eec68b,#0000);width:max(48px,5cqw);height:1px;animation:.8s ease-out .35s both vn-end-rise;display:block}.vn-end-flags{width:min(30rem,100%);font:12px/1.5 var(--font-sans);text-align:left;color:#ffffff8c;background:#ffffff08;border:1px solid #7e91a938;border-radius:6px;margin-top:.6cqw;padding:8px 12px;animation:.8s ease-out .75s both vn-end-rise}.vn-end-flags summary{cursor:pointer;opacity:.8;letter-spacing:.12em;text-transform:uppercase}.vn-end-flags summary:hover{opacity:1}.vn-end-flags[open] summary{margin-bottom:8px}.vn-end-flags h3{color:#ffffffb3;margin:10px 0 2px;font-weight:600}.vn-end-flags h3+p{color:#fff6;margin-bottom:6px;font-size:11px}.vn-end-exit{font-family:var(--font-mono);color:#fffc;gap:16px;display:flex}.vn-end-exit span:first-child{color:#ffffff80}.vn-end-flags dl{max-height:10rem;font-family:var(--font-mono);grid-template-columns:auto 1fr;gap:2px 16px;display:grid;overflow:auto}.vn-end-flags dd{color:#ffffffd9}@keyframes vn-end-fade{0%{opacity:0}}@keyframes vn-end-rise{0%{opacity:0;transform:translateY(1cqw)}}@media (prefers-reduced-motion:reduce){.vn-end-screen,.vn-end-heading,.vn-end-rule,.vn-end-screen .vn-title-actions,.vn-end-flags{animation:none}}:host{--ui-primary:var(--color-brand-400);--ui-bg:#0e1219;--ui-bg-muted:#121821;--ui-bg-elevated:#151b25;--ui-bg-accented:#1e2633;--ui-border:#232b39;--ui-border-accented:#3b4659;--ui-text-dimmed:#6b7585;--ui-text-muted:#98a2b3;--ui-text-toned:#bcc3cf;--ui-text:#e6e1d6;--ui-text-highlighted:#f4efe5;--ui-text-inverted:#0e1219;--ui-error:#e07a7e;--ui-success:#76c99f;--ui-warning:#e2b86b;--ui-info:#7aa7e0;--lightningcss-light: ;--lightningcss-dark:initial;color-scheme:dark;display:block}.vn-ui-icon{flex:none;width:1.25rem;height:1.25rem}:host{pointer-events:auto}:host([data-gameplay=active]){pointer-events:none}:host([data-gameplay=active]) :is(.vn-story-panel,.vn-toolbar){pointer-events:auto}@property --tw-translate-x{syntax:\"*\";inherits:false;initial-value:0}@property --tw-translate-y{syntax:\"*\";inherits:false;initial-value:0}@property --tw-translate-z{syntax:\"*\";inherits:false;initial-value:0}@property --tw-rotate-x{syntax:\"*\";inherits:false}@property --tw-rotate-y{syntax:\"*\";inherits:false}@property --tw-rotate-z{syntax:\"*\";inherits:false}@property --tw-skew-x{syntax:\"*\";inherits:false}@property --tw-skew-y{syntax:\"*\";inherits:false}@property --tw-border-style{syntax:\"*\";inherits:false;initial-value:solid}@property --tw-leading{syntax:\"*\";inherits:false}@property --tw-font-weight{syntax:\"*\";inherits:false}@property --tw-tracking{syntax:\"*\";inherits:false}@property --tw-shadow{syntax:\"*\";inherits:false;initial-value:0 0 #0000}@property --tw-shadow-color{syntax:\"*\";inherits:false}@property --tw-shadow-alpha{syntax:\"<percentage>\";inherits:false;initial-value:100%}@property --tw-inset-shadow{syntax:\"*\";inherits:false;initial-value:0 0 #0000}@property --tw-inset-shadow-color{syntax:\"*\";inherits:false}@property --tw-inset-shadow-alpha{syntax:\"<percentage>\";inherits:false;initial-value:100%}@property --tw-ring-color{syntax:\"*\";inherits:false}@property --tw-ring-shadow{syntax:\"*\";inherits:false;initial-value:0 0 #0000}@property --tw-inset-ring-color{syntax:\"*\";inherits:false}@property --tw-inset-ring-shadow{syntax:\"*\";inherits:false;initial-value:0 0 #0000}@property --tw-ring-inset{syntax:\"*\";inherits:false}@property --tw-ring-offset-width{syntax:\"<length>\";inherits:false;initial-value:0}@property --tw-ring-offset-color{syntax:\"*\";inherits:false;initial-value:#fff}@property --tw-ring-offset-shadow{syntax:\"*\";inherits:false;initial-value:0 0 #0000}@property --tw-outline-style{syntax:\"*\";inherits:false;initial-value:solid}@property --tw-blur{syntax:\"*\";inherits:false}@property --tw-brightness{syntax:\"*\";inherits:false}@property --tw-contrast{syntax:\"*\";inherits:false}@property --tw-grayscale{syntax:\"*\";inherits:false}@property --tw-hue-rotate{syntax:\"*\";inherits:false}@property --tw-invert{syntax:\"*\";inherits:false}@property --tw-opacity{syntax:\"*\";inherits:false}@property --tw-saturate{syntax:\"*\";inherits:false}@property --tw-sepia{syntax:\"*\";inherits:false}@property --tw-drop-shadow{syntax:\"*\";inherits:false}@property --tw-drop-shadow-color{syntax:\"*\";inherits:false}@property --tw-drop-shadow-alpha{syntax:\"<percentage>\";inherits:false;initial-value:100%}@property --tw-drop-shadow-size{syntax:\"*\";inherits:false}@property --tw-duration{syntax:\"*\";inherits:false}@property --tw-ease{syntax:\"*\";inherits:false}", VD = /* @__PURE__ */ Yo({
	...FD,
	inheritAttrs: !1,
	styles: [...FD.styles ?? [], BD]
}, { configureApp(e) {
	e.provide($y, RD());
} });
function HD() {
	if (typeof document > "u" || document.getElementById("vns-player-properties")) return;
	let e = BD.match(/@property\s+--[\w-]+\s*\{[^}]*\}/g);
	if (!e?.length) return;
	let t = document.createElement("style");
	t.id = "vns-player-properties", t.textContent = e.join("\n"), document.head.append(t);
}
function UD(e = "vns-player") {
	HD(), customElements.get(e) || customElements.define(e, VD);
}
//#endregion
export { zD as PLAYER_CONTRACT, VD as PlayerElement, UD as defineVnsPlayer };
