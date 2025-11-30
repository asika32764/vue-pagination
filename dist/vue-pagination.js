import { computed as V, ref as p, watchEffect as A, isReadonly as B, toValue as H, defineComponent as G, mergeModels as $, useModel as X, watch as w, openBlock as T, createElementBlock as N, Fragment as D, renderList as W, unref as h, renderSlot as C, mergeProps as g, createElementVNode as I, normalizeClass as j, createBlock as q, resolveDynamicComponent as x, withCtx as z, createTextVNode as J, toDisplayString as K } from "vue";
var u = /* @__PURE__ */ ((l) => (l.FIRST = "first", l.PREVIOUS = "previous", l.LOWER = "lower", l.CURRENT = "current", l.HIGHER = "higher", l.NEXT = "next", l.LAST = "last", l))(u || {});
function Q(l = {}) {
  const k = y(l.total ?? 0), s = y(l.perPage ?? 0), i = y(l.currentPage ?? 1), n = V(() => Math.ceil(k.value / s.value)), E = y(l.maxItems ?? 5), o = p(), m = p(), b = p([]), e = p([]), r = p(), a = p(), R = p(), F = V(() => [
    o.value,
    m.value,
    ...b.value,
    R.value,
    ...e.value,
    r.value,
    a.value
  ].filter((t) => t != null)), M = () => {
    U(), console.log("re-compile", s.value, n.value), i.value > n.value && !B(i) && (i.value = n.value || 1);
    const t = i.value;
    let f = E.value;
    f % 2 === 0 && f++;
    const v = (f - 1) / 2, L = t - 1;
    let P = Math.min(v, L);
    const O = n.value - t;
    let S = Math.min(v, O);
    t + v > n.value ? P = Math.min(f - S - 1, L) : t - v <= 0 && (S = Math.min(f - P - 1, O));
    for (let c = t - P; c < t; c++)
      b.value.push(d(u.LOWER, c));
    m.value = d(u.PREVIOUS, t - 1, { disabled: t === 1 }), o.value = d(u.FIRST, 1, { disabled: t === 1 });
    for (let c = t + 1; c <= S + t; c++)
      e.value.push(d(u.HIGHER, c));
    r.value = d(u.NEXT, t + 1, { disabled: t === n.value }), a.value = d(u.LAST, n.value, { disabled: t === n.value }), R.value = d(u.CURRENT, t, { active: !0 });
  };
  function d(t, f, v = {}) {
    return {
      type: t,
      page: f,
      active: v.active ?? !1,
      disabled: v.disabled ?? !1
    };
  }
  function U() {
    o.value = void 0, m.value = void 0, r.value = void 0, a.value = void 0, R.value = void 0, b.value = [], e.value = [];
  }
  return A(() => {
    M();
  }), {
    compile: M,
    total: k,
    perPage: s,
    currentPage: i,
    pages: F,
    pagesCount: n,
    maxItems: E
  };
}
function y(l) {
  return V({
    get() {
      return H(l);
    },
    set(k) {
      "value" in l ? l.value = k : console.warn("This MaybeRefOrGetter is readonly!");
    }
  });
}
const Z = /* @__PURE__ */ G({
  __name: "VuePagination",
  props: /* @__PURE__ */ $({
    total: {},
    perPage: {},
    maxItems: { default: 5 },
    linkTag: { default: "a" },
    itemClass: {},
    linkClass: {},
    activeClass: {},
    disabledClass: {},
    route: { type: [Function, Boolean] }
  }, {
    modelValue: {
      default: 1
    },
    modelModifiers: {}
  }),
  emits: /* @__PURE__ */ $(["page-click", "pages-updated", "page-changed"], ["update:modelValue"]),
  setup(l, { emit: k }) {
    const s = l, i = X(l, "modelValue"), n = k;
    w(
      [
        i,
        () => s.total,
        () => s.perPage,
        () => s.maxItems
      ],
      (e) => {
        n("pages-updated", ...e);
      }
    ), w(i, () => {
      n("page-changed", i.value);
    });
    const { pages: E } = Q({
      total: () => s.total,
      perPage: () => s.perPage,
      currentPage: i,
      maxItems: () => s.maxItems
    });
    function o(e) {
      return s.route ? s.route === !0 ? { query: { page: e.page } } : s.route(e) : "javascript:void(0)";
    }
    function m(e, r) {
      s.route || (i.value = r.page), n("page-click", e, r);
    }
    function b(e) {
      return s.linkTag === "a" ? {
        href: o(e)
      } : s.linkTag === "button" ? {
        disabled: e.disabled
      } : {
        to: o(e),
        disabled: e.disabled
      };
    }
    return (e, r) => (T(), N("div", null, [
      (T(!0), N(D, null, W(h(E), (a) => C(e.$slots, "page-item", g({
        key: `${a.type}-${a.page}`,
        ref_for: !0
      }, { item: a, to: o(a) }), () => [
        I("div", {
          class: j([a.active ? e.activeClass : null, a.disabled ? e.disabledClass : null, e.itemClass])
        }, [
          (T(), q(x(e.linkTag), g({ ref_for: !0 }, b(a), {
            onClick: (R) => m(R, a),
            class: [a.active ? e.activeClass : null, a.disabled ? e.disabledClass : null, e.linkClass]
          }), {
            default: z(() => [
              a.type === h(u).FIRST ? C(e.$slots, "first-icon", g({
                key: 0,
                ref_for: !0
              }, { item: a, to: o(a) }), () => [
                r[0] || (r[0] = I("span", null, "First", -1))
              ]) : a.type === h(u).PREVIOUS ? C(e.$slots, "previous-icon", g({
                key: 1,
                ref_for: !0
              }, { item: a, to: o(a) }), () => [
                r[1] || (r[1] = I("span", { "aria-hidden": "true" }, "«", -1))
              ]) : a.type === h(u).NEXT ? C(e.$slots, "next-icon", g({
                key: 2,
                ref_for: !0
              }, { item: a, to: o(a) }), () => [
                r[2] || (r[2] = I("span", { "aria-hidden": "true" }, "»", -1))
              ]) : a.type === h(u).LAST ? C(e.$slots, "last-icon", g({
                key: 3,
                ref_for: !0
              }, { item: a, to: o(a) }), () => [
                r[3] || (r[3] = I("span", null, "Last", -1))
              ]) : C(e.$slots, "page", g({
                key: 4,
                ref_for: !0
              }, { item: a, to: o(a) }), () => [
                J(K(a.page), 1)
              ])
            ]),
            _: 2
          }, 1040, ["onClick", "class"]))
        ], 2)
      ])), 128))
    ]));
  }
});
export {
  u as PageType,
  Z as default,
  Q as usePagination
};
