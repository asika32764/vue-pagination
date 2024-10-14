import { defineComponent as B, mergeModels as N, useModel as X, computed as O, ref as n, watch as G, openBlock as F, createElementBlock as M, Fragment as W, renderList as j, renderSlot as d, mergeProps as f, createElementVNode as v, normalizeClass as P, unref as m, createTextVNode as q, toDisplayString as z } from "vue";
var s = /* @__PURE__ */ ((r) => (r.FIRST = "first", r.PREVIOUS = "previous", r.LOWER = "lower", r.CURRENT = "current", r.HIGHER = "higher", r.NEXT = "next", r.LAST = "last", r))(s || {});
const D = ["href", "onClick", "disabled"], K = /* @__PURE__ */ B({
  __name: "VuePagination",
  props: /* @__PURE__ */ N({
    total: {},
    perPage: {},
    maxItems: { default: 5 },
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
  setup(r, { emit: T }) {
    const o = r, h = X(r, "modelValue"), L = T, c = O(() => Math.ceil(o.total / o.perPage)), p = n(), C = n(), k = n([]), E = n([]), R = n(), b = n(), I = n(), U = O(() => [
      p.value,
      C.value,
      ...k.value,
      I.value,
      ...E.value,
      R.value,
      b.value
    ].filter((e) => e != null));
    G(
      [
        h,
        () => o.total,
        () => o.perPage
      ],
      (e) => {
        $(), L("pages-updated", ...e);
      }
    ), $();
    function H() {
      p.value = void 0, C.value = void 0, R.value = void 0, b.value = void 0, I.value = void 0, k.value = [], E.value = [];
    }
    function $() {
      H();
      const e = h.value;
      let l = o.maxItems;
      l % 2 === 0 && l++;
      const t = (l - 1) / 2, S = e - 1;
      let V = Math.min(t, S);
      const A = c.value - e;
      let y = Math.min(t, A);
      e + t > c.value ? V = l - y - 1 : e - t <= 0 && (y = l - V - 1);
      for (let i = e - V; i < e; i++)
        k.value.push(u(s.LOWER, i));
      C.value = u(s.PREVIOUS, e - 1, { disabled: e === 1 }), p.value = u(s.FIRST, 1, { disabled: e === 1 });
      for (let i = e + 1; i <= y + e; i++)
        E.value.push(u(s.HIGHER, i));
      R.value = u(s.NEXT, e + 1, { disabled: e === c.value }), b.value = u(s.LAST, c.value, { disabled: e === c.value }), I.value = u(s.CURRENT, e, { active: !0 });
    }
    function u(e, l, t = {}) {
      return {
        type: e,
        page: l,
        active: t.active ?? !1,
        disabled: t.disabled ?? !1
      };
    }
    function a(e) {
      return o.route ? o.route === !0 ? { query: { page: e.page } } : o.route(e) : "javascript:void(0)";
    }
    function w(e, l) {
      o.route || (h.value = l.page, L("page-click", e, l.page));
    }
    return (e, l) => (F(), M("div", null, [
      (F(!0), M(W, null, j(U.value, (t) => d(e.$slots, "page-item", f({
        key: `${t.type}-${t.page}`,
        ref_for: !0
      }, { page: t, href: a(t) }), () => [
        v("div", {
          class: P(e.itemClass)
        }, [
          v("a", {
            href: a(t),
            onClick: (S) => w(S, t),
            class: P([e.linkClass, [t.active ? e.activeClass : null, t.disabled ? e.disabledClass : null]]),
            disabled: t.disabled
          }, [
            t.type === m(s).FIRST ? d(e.$slots, "first-icon", f({
              key: 0,
              ref_for: !0
            }, { page: t, href: a(t) }), () => [
              l[0] || (l[0] = v("span", null, "First", -1))
            ]) : t.type === m(s).PREVIOUS ? d(e.$slots, "previous-icon", f({
              key: 1,
              ref_for: !0
            }, { page: t, href: a(t) }), () => [
              l[1] || (l[1] = v("span", { "aria-hidden": "true" }, "«", -1))
            ]) : t.type === m(s).NEXT ? d(e.$slots, "next-icon", f({
              key: 2,
              ref_for: !0
            }, { page: t, href: a(t) }), () => [
              l[2] || (l[2] = v("span", { "aria-hidden": "true" }, "»", -1))
            ]) : t.type === m(s).LAST ? d(e.$slots, "last-icon", f({
              key: 3,
              ref_for: !0
            }, { page: t, href: a(t) }), () => [
              l[3] || (l[3] = v("span", null, "Last", -1))
            ]) : d(e.$slots, "page", f({
              key: 4,
              ref_for: !0
            }, { page: t, href: a(t) }), () => [
              q(z(t.page), 1)
            ])
          ], 10, D)
        ], 2)
      ])), 128))
    ]));
  }
});
export {
  K as default
};
