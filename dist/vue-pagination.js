import { toRef as P, computed as $, ref as p, watchEffect as U, isReadonly as A, defineComponent as B, mergeModels as N, useModel as H, watch as X, openBlock as T, createElementBlock as O, Fragment as D, renderList as G, unref as I, renderSlot as k, mergeProps as g, createElementVNode as R, normalizeClass as W, createBlock as j, resolveDynamicComponent as q, withCtx as x, createTextVNode as z, toDisplayString as J } from "vue";
var u = /* @__PURE__ */ ((t) => (t.FIRST = "first", t.PREVIOUS = "previous", t.LOWER = "lower", t.CURRENT = "current", t.HIGHER = "higher", t.NEXT = "next", t.LAST = "last", t))(u || {});
function K(t = {}) {
  const E = P(t.total ?? 0), s = P(t.perPage ?? 0), i = P(t.currentPage ?? 1), o = $(() => Math.ceil(E.value / s.value)), h = P(t.maxItems ?? 5), n = p(), C = p(), m = p([]), e = p([]), r = p(), a = p(), b = p(), F = $(() => [
    n.value,
    C.value,
    ...m.value,
    b.value,
    ...e.value,
    r.value,
    a.value
  ].filter((l) => l != null)), V = () => {
    w(), i.value > o.value && !A(i) && (i.value = o.value);
    const l = i.value;
    let f = h.value;
    f % 2 === 0 && f++;
    const v = (f - 1) / 2, L = l - 1;
    let S = Math.min(v, L);
    const M = o.value - l;
    let y = Math.min(v, M);
    l + v > o.value ? S = Math.min(f - y - 1, L) : l - v <= 0 && (y = Math.min(f - S - 1, M));
    for (let c = l - S; c < l; c++)
      m.value.push(d(u.LOWER, c));
    C.value = d(u.PREVIOUS, l - 1, { disabled: l === 1 }), n.value = d(u.FIRST, 1, { disabled: l === 1 });
    for (let c = l + 1; c <= y + l; c++)
      e.value.push(d(u.HIGHER, c));
    r.value = d(u.NEXT, l + 1, { disabled: l === o.value }), a.value = d(u.LAST, o.value, { disabled: l === o.value }), b.value = d(u.CURRENT, l, { active: !0 });
  };
  function d(l, f, v = {}) {
    return {
      type: l,
      page: f,
      active: v.active ?? !1,
      disabled: v.disabled ?? !1
    };
  }
  function w() {
    n.value = void 0, C.value = void 0, r.value = void 0, a.value = void 0, b.value = void 0, m.value = [], e.value = [];
  }
  return U(() => {
    V();
  }), {
    compile: V,
    total: E,
    perPage: s,
    currentPage: i,
    pages: F,
    pagesCount: o,
    maxItems: h
  };
}
const Y = /* @__PURE__ */ B({
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
  emits: /* @__PURE__ */ N(["page-click", "pages-updated"], ["update:modelValue"]),
  setup(t, { emit: E }) {
    const s = t, i = H(t, "modelValue"), o = E;
    X(
      [
        i,
        () => s.total,
        () => s.perPage,
        () => s.maxItems
      ],
      (e) => {
        o("pages-updated", ...e);
      }
    );
    const { pages: h } = K({
      total: () => s.total,
      perPage: () => s.perPage,
      currentPage: i,
      maxItems: () => s.maxItems
    });
    function n(e) {
      return s.route ? s.route === !0 ? { query: { page: e.page } } : s.route(e) : "javascript:void(0)";
    }
    function C(e, r) {
      s.route || (i.value = r.page, o("page-click", e, r));
    }
    function m(e) {
      return s.linkTag === "a" ? {
        href: n(e)
      } : s.linkTag === "button" ? {
        disabled: e.disabled
      } : {
        to: n(e),
        disabled: e.disabled
      };
    }
    return (e, r) => (T(), O("div", null, [
      (T(!0), O(D, null, G(I(h), (a) => k(e.$slots, "page-item", g({
        key: `${a.type}-${a.page}`,
        ref_for: !0
      }, { item: a, to: n(a) }), () => [
        R("div", {
          class: W([a.active ? e.activeClass : null, a.disabled ? e.disabledClass : null, e.itemClass])
        }, [
          (T(), j(q(e.linkTag), g({ ref_for: !0 }, m(a), {
            onClick: (b) => C(b, a),
            class: [a.active ? e.activeClass : null, a.disabled ? e.disabledClass : null, e.linkClass]
          }), {
            default: x(() => [
              a.type === I(u).FIRST ? k(e.$slots, "first-icon", g({
                key: 0,
                ref_for: !0
              }, { item: a, to: n(a) }), () => [
                r[0] || (r[0] = R("span", null, "First", -1))
              ]) : a.type === I(u).PREVIOUS ? k(e.$slots, "previous-icon", g({
                key: 1,
                ref_for: !0
              }, { item: a, to: n(a) }), () => [
                r[1] || (r[1] = R("span", { "aria-hidden": "true" }, "«", -1))
              ]) : a.type === I(u).NEXT ? k(e.$slots, "next-icon", g({
                key: 2,
                ref_for: !0
              }, { item: a, to: n(a) }), () => [
                r[2] || (r[2] = R("span", { "aria-hidden": "true" }, "»", -1))
              ]) : a.type === I(u).LAST ? k(e.$slots, "last-icon", g({
                key: 3,
                ref_for: !0
              }, { item: a, to: n(a) }), () => [
                r[3] || (r[3] = R("span", null, "Last", -1))
              ]) : k(e.$slots, "page", g({
                key: 4,
                ref_for: !0
              }, { item: a, to: n(a) }), () => [
                z(J(a.page), 1)
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
  Y as default
};
