import { computed as $, ref as d, watchEffect as A, isReadonly as B, isRef as H, defineComponent as X, mergeModels as N, useModel as D, watch as O, openBlock as T, createElementBlock as w, Fragment as G, renderList as W, unref as b, renderSlot as k, mergeProps as g, createElementVNode as I, normalizeClass as j, createBlock as q, resolveDynamicComponent as x, withCtx as z, createTextVNode as J, toDisplayString as K } from "vue";
var u = /* @__PURE__ */ ((t) => (t.FIRST = "first", t.PREVIOUS = "previous", t.LOWER = "lower", t.CURRENT = "current", t.HIGHER = "higher", t.NEXT = "next", t.LAST = "last", t))(u || {});
function Q(t = {}) {
  const h = y(t.total ?? 0), s = y(t.perPage ?? 0), i = y(t.currentPage ?? 1), r = $(() => Math.ceil(h.value / s.value)), E = y(t.maxItems ?? 5), o = d(), C = d(), m = d([]), e = d([]), n = d(), a = d(), R = d(), F = $(() => [
    o.value,
    C.value,
    ...m.value,
    R.value,
    ...e.value,
    n.value,
    a.value
  ].filter((l) => l != null)), V = () => {
    U(), i.value > r.value && !B(i) && (i.value = r.value || 1);
    const l = i.value;
    let c = E.value;
    c % 2 === 0 && c++;
    const v = (c - 1) / 2, L = l - 1;
    let P = Math.min(v, L);
    const M = r.value - l;
    let S = Math.min(v, M);
    l + v > r.value ? P = Math.min(c - S - 1, L) : l - v <= 0 && (S = Math.min(c - P - 1, M));
    for (let p = l - P; p < l; p++)
      m.value.push(f(u.LOWER, p));
    C.value = f(u.PREVIOUS, l - 1, { disabled: l === 1 }), o.value = f(u.FIRST, 1, { disabled: l === 1 });
    for (let p = l + 1; p <= S + l; p++)
      e.value.push(f(u.HIGHER, p));
    n.value = f(u.NEXT, l + 1, { disabled: l === r.value }), a.value = f(u.LAST, r.value, { disabled: l === r.value }), R.value = f(u.CURRENT, l, { active: !0 });
  };
  function f(l, c, v = {}) {
    return {
      type: l,
      page: c,
      active: v.active ?? !1,
      disabled: v.disabled ?? !1
    };
  }
  function U() {
    o.value = void 0, C.value = void 0, n.value = void 0, a.value = void 0, R.value = void 0, m.value = [], e.value = [];
  }
  return A(() => {
    V();
  }), {
    compile: V,
    total: h,
    perPage: s,
    currentPage: i,
    pages: F,
    pagesCount: r,
    maxItems: E
  };
}
function y(t) {
  return typeof t == "function" && (t = d(t())), H(t) ? t : d(t);
}
const Z = /* @__PURE__ */ X({
  __name: "VuePagination",
  props: /* @__PURE__ */ N({
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
  emits: /* @__PURE__ */ N(["page-click", "pages-updated", "page-changed"], ["update:modelValue"]),
  setup(t, { emit: h }) {
    const s = t, i = D(t, "modelValue"), r = h;
    O(
      [
        i,
        () => s.total,
        () => s.perPage,
        () => s.maxItems
      ],
      (e) => {
        r("pages-updated", ...e);
      }
    ), O(i, () => {
      r("page-changed", i.value);
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
    function C(e, n) {
      s.route || (i.value = n.page), r("page-click", e, n);
    }
    function m(e) {
      return s.linkTag === "a" ? {
        href: o(e)
      } : s.linkTag === "button" ? {
        disabled: e.disabled
      } : {
        to: o(e),
        disabled: e.disabled
      };
    }
    return (e, n) => (T(), w("div", null, [
      (T(!0), w(G, null, W(b(E), (a) => k(e.$slots, "page-item", g({
        key: `${a.type}-${a.page}`,
        ref_for: !0
      }, { item: a, to: o(a) }), () => [
        I("div", {
          class: j([a.active ? e.activeClass : null, a.disabled ? e.disabledClass : null, e.itemClass])
        }, [
          (T(), q(x(e.linkTag), g({ ref_for: !0 }, m(a), {
            onClick: (R) => C(R, a),
            class: [a.active ? e.activeClass : null, a.disabled ? e.disabledClass : null, e.linkClass]
          }), {
            default: z(() => [
              a.type === b(u).FIRST ? k(e.$slots, "first-icon", g({
                key: 0,
                ref_for: !0
              }, { item: a, to: o(a) }), () => [
                n[0] || (n[0] = I("span", null, "First", -1))
              ]) : a.type === b(u).PREVIOUS ? k(e.$slots, "previous-icon", g({
                key: 1,
                ref_for: !0
              }, { item: a, to: o(a) }), () => [
                n[1] || (n[1] = I("span", { "aria-hidden": "true" }, "«", -1))
              ]) : a.type === b(u).NEXT ? k(e.$slots, "next-icon", g({
                key: 2,
                ref_for: !0
              }, { item: a, to: o(a) }), () => [
                n[2] || (n[2] = I("span", { "aria-hidden": "true" }, "»", -1))
              ]) : a.type === b(u).LAST ? k(e.$slots, "last-icon", g({
                key: 3,
                ref_for: !0
              }, { item: a, to: o(a) }), () => [
                n[3] || (n[3] = I("span", null, "Last", -1))
              ]) : k(e.$slots, "page", g({
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
