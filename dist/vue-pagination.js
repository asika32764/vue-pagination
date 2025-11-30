import { computed as V, ref as p, watchEffect as A, isReadonly as B, toValue as H, defineComponent as G, mergeModels as $, useModel as X, watch as w, openBlock as T, createElementBlock as N, Fragment as D, renderList as W, unref as h, renderSlot as C, mergeProps as g, createElementVNode as I, normalizeClass as j, createBlock as q, resolveDynamicComponent as x, withCtx as z, createTextVNode as J, toDisplayString as K } from "vue";
var o = /* @__PURE__ */ ((t) => (t.FIRST = "first", t.PREVIOUS = "previous", t.LOWER = "lower", t.CURRENT = "current", t.HIGHER = "higher", t.NEXT = "next", t.LAST = "last", t))(o || {});
function Q(t = {}) {
  const k = y(t.total ?? 0), s = y(t.perPage ?? 0), i = y(t.currentPage ?? 1), n = V(() => Math.ceil(k.value / s.value)), E = y(t.maxItems ?? 5), u = p(), m = p(), b = p([]), e = p([]), r = p(), a = p(), R = p(), F = V(() => [
    u.value,
    m.value,
    ...b.value,
    R.value,
    ...e.value,
    r.value,
    a.value
  ].filter((l) => l != null)), M = () => {
    U(), i.value > n.value && !B(i) && (i.value = n.value || 1);
    const l = i.value;
    let f = E.value;
    f % 2 === 0 && f++;
    const v = (f - 1) / 2, L = l - 1;
    let P = Math.min(v, L);
    const O = n.value - l;
    let S = Math.min(v, O);
    l + v > n.value ? P = Math.min(f - S - 1, L) : l - v <= 0 && (S = Math.min(f - P - 1, O));
    for (let c = l - P; c < l; c++)
      b.value.push(d(o.LOWER, c));
    m.value = d(o.PREVIOUS, l - 1, { disabled: l === 1 }), u.value = d(o.FIRST, 1, { disabled: l === 1 });
    for (let c = l + 1; c <= S + l; c++)
      e.value.push(d(o.HIGHER, c));
    r.value = d(o.NEXT, l + 1, { disabled: l === n.value }), a.value = d(o.LAST, n.value, { disabled: l === n.value }), R.value = d(o.CURRENT, l, { active: !0 });
  };
  function d(l, f, v = {}) {
    return {
      type: l,
      page: f,
      active: v.active ?? !1,
      disabled: v.disabled ?? !1
    };
  }
  function U() {
    u.value = void 0, m.value = void 0, r.value = void 0, a.value = void 0, R.value = void 0, b.value = [], e.value = [];
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
function y(t) {
  return V({
    get() {
      return H(t);
    },
    set(k) {
      "value" in t ? t.value = k : console.warn("This MaybeRefOrGetter is readonly!");
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
  setup(t, { emit: k }) {
    const s = t, i = X(t, "modelValue"), n = k;
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
    function u(e) {
      return s.route ? s.route === !0 ? { query: { page: e.page } } : s.route(e) : "javascript:void(0)";
    }
    function m(e, r) {
      s.route || (i.value = r.page), n("page-click", e, r);
    }
    function b(e) {
      return s.linkTag === "a" ? {
        href: u(e)
      } : s.linkTag === "button" ? {
        disabled: e.disabled
      } : {
        to: u(e),
        disabled: e.disabled
      };
    }
    return (e, r) => (T(), N("div", null, [
      (T(!0), N(D, null, W(h(E), (a) => C(e.$slots, "page-item", g({
        key: `${a.type}-${a.page}`,
        ref_for: !0
      }, { item: a, to: u(a) }), () => [
        I("div", {
          class: j([a.active ? e.activeClass : null, a.disabled ? e.disabledClass : null, e.itemClass])
        }, [
          (T(), q(x(e.linkTag), g({ ref_for: !0 }, b(a), {
            onClick: (R) => m(R, a),
            class: [a.active ? e.activeClass : null, a.disabled ? e.disabledClass : null, e.linkClass]
          }), {
            default: z(() => [
              a.type === h(o).FIRST ? C(e.$slots, "first-icon", g({
                key: 0,
                ref_for: !0
              }, { item: a, to: u(a) }), () => [
                r[0] || (r[0] = I("span", null, "First", -1))
              ]) : a.type === h(o).PREVIOUS ? C(e.$slots, "previous-icon", g({
                key: 1,
                ref_for: !0
              }, { item: a, to: u(a) }), () => [
                r[1] || (r[1] = I("span", { "aria-hidden": "true" }, "«", -1))
              ]) : a.type === h(o).NEXT ? C(e.$slots, "next-icon", g({
                key: 2,
                ref_for: !0
              }, { item: a, to: u(a) }), () => [
                r[2] || (r[2] = I("span", { "aria-hidden": "true" }, "»", -1))
              ]) : a.type === h(o).LAST ? C(e.$slots, "last-icon", g({
                key: 3,
                ref_for: !0
              }, { item: a, to: u(a) }), () => [
                r[3] || (r[3] = I("span", null, "Last", -1))
              ]) : C(e.$slots, "page", g({
                key: 4,
                ref_for: !0
              }, { item: a, to: u(a) }), () => [
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
  o as PageType,
  Z as default,
  Q as usePagination
};
