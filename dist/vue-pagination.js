import { toRef as P, computed as $, ref as p, watchEffect as U, isReadonly as A, defineComponent as B, mergeModels as N, useModel as H, watch as x, openBlock as T, createElementBlock as O, Fragment as X, renderList as D, unref as R, renderSlot as k, mergeProps as g, createElementVNode as E, normalizeClass as G, createBlock as W, resolveDynamicComponent as j, withCtx as q, createTextVNode as z, toDisplayString as J } from "vue";
var o = /* @__PURE__ */ ((l) => (l.FIRST = "first", l.PREVIOUS = "previous", l.LOWER = "lower", l.CURRENT = "current", l.HIGHER = "higher", l.NEXT = "next", l.LAST = "last", l))(o || {});
function K(l = {}) {
  const b = P(l.total ?? 0), s = P(l.perPage ?? 0), i = P(l.currentPage ?? 1), u = $(() => Math.ceil(b.value / s.value)), h = P(l.maxItems ?? 5), n = p(), m = p(), C = p([]), e = p([]), r = p(), a = p(), I = p(), F = $(() => [
    n.value,
    m.value,
    ...C.value,
    I.value,
    ...e.value,
    r.value,
    a.value
  ].filter((t) => t != null)), V = () => {
    w(), i.value > u.value && !A(i) && (i.value = u.value);
    const t = i.value;
    let f = h.value;
    f % 2 === 0 && f++;
    const v = (f - 1) / 2, L = t - 1;
    let S = Math.min(v, L);
    const M = u.value - t;
    let y = Math.min(v, M);
    t + v > u.value ? S = Math.min(f - y - 1, L) : t - v <= 0 && (y = Math.min(f - S - 1, M));
    for (let c = t - S; c < t; c++)
      C.value.push(d(o.LOWER, c));
    m.value = d(o.PREVIOUS, t - 1, { disabled: t === 1 }), n.value = d(o.FIRST, 1, { disabled: t === 1 });
    for (let c = t + 1; c <= y + t; c++)
      e.value.push(d(o.HIGHER, c));
    r.value = d(o.NEXT, t + 1, { disabled: t === u.value }), a.value = d(o.LAST, u.value, { disabled: t === u.value }), I.value = d(o.CURRENT, t, { active: !0 });
  };
  function d(t, f, v = {}) {
    return {
      type: t,
      page: f,
      active: v.active ?? !1,
      disabled: v.disabled ?? !1
    };
  }
  function w() {
    n.value = void 0, m.value = void 0, r.value = void 0, a.value = void 0, I.value = void 0, C.value = [], e.value = [];
  }
  return U(() => {
    V();
  }), {
    compile: V,
    total: b,
    perPage: s,
    currentPage: i,
    pages: F,
    pagesCount: u,
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
  setup(l, { emit: b }) {
    const s = l, i = H(l, "modelValue"), u = b;
    x(
      [
        i,
        () => s.total,
        () => s.perPage,
        () => s.maxItems
      ],
      (e) => {
        u("pages-updated", ...e);
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
    function m(e, r) {
      s.route || (i.value = r.page, u("page-click", e, r));
    }
    function C(e) {
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
      (T(!0), O(X, null, D(R(h), (a) => k(e.$slots, "page-item", g({
        key: `${a.type}-${a.page}`,
        ref_for: !0
      }, { item: a, to: n(a) }), () => [
        E("div", {
          class: G(e.itemClass)
        }, [
          (T(), W(j(e.linkTag), g({ ref_for: !0 }, C(a), {
            onClick: (I) => m(I, a),
            class: [e.linkClass, [a.active ? e.activeClass : null, a.disabled ? e.disabledClass : null]]
          }), {
            default: q(() => [
              a.type === R(o).FIRST ? k(e.$slots, "first-icon", g({
                key: 0,
                ref_for: !0
              }, { item: a, to: n(a) }), () => [
                r[0] || (r[0] = E("span", null, "First", -1))
              ]) : a.type === R(o).PREVIOUS ? k(e.$slots, "previous-icon", g({
                key: 1,
                ref_for: !0
              }, { item: a, to: n(a) }), () => [
                r[1] || (r[1] = E("span", { "aria-hidden": "true" }, "«", -1))
              ]) : a.type === R(o).NEXT ? k(e.$slots, "next-icon", g({
                key: 2,
                ref_for: !0
              }, { item: a, to: n(a) }), () => [
                r[2] || (r[2] = E("span", { "aria-hidden": "true" }, "»", -1))
              ]) : a.type === R(o).LAST ? k(e.$slots, "last-icon", g({
                key: 3,
                ref_for: !0
              }, { item: a, to: n(a) }), () => [
                r[3] || (r[3] = E("span", null, "Last", -1))
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
