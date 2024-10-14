import { ComponentOptionsMixin } from 'vue';
import { ComponentProvideOptions } from 'vue';
import { DefineComponent } from 'vue';
import { default as PageItem } from './PageItem';
import { PublicProps } from 'vue';

declare const __VLS_component: DefineComponent<__VLS_PublicProps, {}, {}, {}, {}, ComponentOptionsMixin, ComponentOptionsMixin, {
"page-click": (...args: any[]) => void;
"pages-updated": (...args: any[]) => void;
}, string, PublicProps, Readonly<__VLS_PublicProps> & Readonly<{
"onPage-click"?: ((...args: any[]) => any) | undefined;
"onPages-updated"?: ((...args: any[]) => any) | undefined;
}>, {
maxItems: number;
linkTag: any;
}, {}, {}, {}, string, ComponentProvideOptions, false, {}, any>;

declare const __VLS_defaults: {
    modelValue: number;
};

declare type __VLS_PublicProps = {
    modelValue?: typeof __VLS_defaults['modelValue'];
} & typeof __VLS_typeProps;

declare function __VLS_template(): {
    slots: {
        "page-item"?(_: {
            item: PageItem;
            to: any;
            key: string;
        }): any;
        "first-icon"?(_: {
            item: PageItem;
            to: any;
        }): any;
        "previous-icon"?(_: {
            item: PageItem;
            to: any;
        }): any;
        "next-icon"?(_: {
            item: PageItem;
            to: any;
        }): any;
        "last-icon"?(_: {
            item: PageItem;
            to: any;
        }): any;
        page?(_: {
            item: PageItem;
            to: any;
        }): any;
    };
    refs: {};
    attrs: Partial<{}>;
};

declare type __VLS_TemplateResult = ReturnType<typeof __VLS_template>;

declare let __VLS_typeProps: {
    total: number;
    perPage: number;
    maxItems?: number;
    linkTag?: any;
    itemClass?: any;
    linkClass?: any;
    activeClass?: any;
    disabledClass?: any;
    route?: ((page: PageItem) => any) | boolean;
};

declare type __VLS_WithTemplateSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};

declare const _default: __VLS_WithTemplateSlots<typeof __VLS_component, __VLS_TemplateResult["slots"]>;
export default _default;

export { PageItem }

export declare enum PageType {
    FIRST = "first",
    PREVIOUS = "previous",
    LOWER = "lower",
    CURRENT = "current",
    HIGHER = "higher",
    NEXT = "next",
    LAST = "last"
}

export { }
