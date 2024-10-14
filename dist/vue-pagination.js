import { defineComponent as B, mergeModels as $, useModel as H, computed as N, ref as i, watch as X, openBlock as y, createElementBlock as O, Fragment as D, renderList as G, renderSlot as f, mergeProps as d, createElementVNode as c, normalizeClass as W, createBlock as j, resolveDynamicComponent as q, withCtx as z, unref as p, createTextVNode as J, toDisplayString as K } from "vue";
var a = /* @__PURE__ */ ((s) => (s.FIRST = "first", s.PREVIOUS = "previous", s.LOWER = "lower", s.CURRENT = "current", s.HIGHER = "higher", s.NEXT = "next", s.LAST = "last", s))(a || {});
const Y = /* @__PURE__ */ B({
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
  emits: /* @__PURE__ */ $(["page-click", "pages-updated"], ["update:modelValue"]),
  setup(s, { emit: F }) {
    const r = s, g = H(s, "modelValue"), V = F, v = N(() => Math.ceil(r.total / r.perPage)), k = i(), C = i(), b = i([]), E = i([]), R = i(), I = i(), S = i(), M = N(() => [
      k.value,
      C.value,
      ...b.value,
      S.value,
      ...E.value,
      R.value,
      I.value
    ].filter((e) => e != null));
    X(
      [
        g,
        () => r.total,
        () => r.perPage
      ],
      (e) => {
        L(), V("pages-updated", ...e);
      }
    ), L();
    function P() {
      k.value = void 0, C.value = void 0, R.value = void 0, I.value = void 0, S.value = void 0, b.value = [], E.value = [];
    }
    function L() {
      P();
      const e = g.value;
      let t = r.maxItems;
      t % 2 === 0 && t++;
      const l = (t - 1) / 2, h = e - 1;
      let m = Math.min(l, h);
      const A = v.value - e;
      let T = Math.min(l, A);
      e + l > v.value ? m = t - T - 1 : e - l <= 0 && (T = t - m - 1);
      for (let u = e - m; u < e; u++)
        b.value.push(n(a.LOWER, u));
      C.value = n(a.PREVIOUS, e - 1, { disabled: e === 1 }), k.value = n(a.FIRST, 1, { disabled: e === 1 });
      for (let u = e + 1; u <= T + e; u++)
        E.value.push(n(a.HIGHER, u));
      R.value = n(a.NEXT, e + 1, { disabled: e === v.value }), I.value = n(a.LAST, v.value, { disabled: e === v.value }), S.value = n(a.CURRENT, e, { active: !0 });
    }
    function n(e, t, l = {}) {
      return {
        type: e,
        page: t,
        active: l.active ?? !1,
        disabled: l.disabled ?? !1
      };
    }
    function o(e) {
      return r.route ? r.route === !0 ? { query: { page: e.page } } : r.route(e) : "javascript:void(0)";
    }
    function U(e, t) {
      r.route || (g.value = t.page, V("page-click", e, t));
    }
    function w(e) {
      return r.linkTag === "a" ? {
        href: o(e)
      } : r.linkTag === "button" ? {
        disabled: e.disabled
      } : {
        to: o(e),
        disabled: e.disabled
      };
    }
    return (e, t) => (y(), O("div", null, [
      (y(!0), O(D, null, G(M.value, (l) => f(e.$slots, "page-item", d({
        key: `${l.type}-${l.page}`,
        ref_for: !0
      }, { item: l, to: o(l) }), () => [
        c("div", {
          class: W(e.itemClass)
        }, [
          (y(), j(q(e.linkTag), d({ ref_for: !0 }, w(l), {
            onClick: (h) => U(h, l),
            class: [e.linkClass, [l.active ? e.activeClass : null, l.disabled ? e.disabledClass : null]]
          }), {
            default: z(() => [
              l.type === p(a).FIRST ? f(e.$slots, "first-icon", d({
                key: 0,
                ref_for: !0
              }, { item: l, to: o(l) }), () => [
                t[0] || (t[0] = c("span", null, "First", -1))
              ]) : l.type === p(a).PREVIOUS ? f(e.$slots, "previous-icon", d({
                key: 1,
                ref_for: !0
              }, { item: l, to: o(l) }), () => [
                t[1] || (t[1] = c("span", { "aria-hidden": "true" }, "«", -1))
              ]) : l.type === p(a).NEXT ? f(e.$slots, "next-icon", d({
                key: 2,
                ref_for: !0
              }, { item: l, to: o(l) }), () => [
                t[2] || (t[2] = c("span", { "aria-hidden": "true" }, "»", -1))
              ]) : l.type === p(a).LAST ? f(e.$slots, "last-icon", d({
                key: 3,
                ref_for: !0
              }, { item: l, to: o(l) }), () => [
                t[3] || (t[3] = c("span", null, "Last", -1))
              ]) : f(e.$slots, "page", d({
                key: 4,
                ref_for: !0
              }, { item: l, to: o(l) }), () => [
                J(K(l.page), 1)
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
