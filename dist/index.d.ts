import { ComponentOptionsMixin } from 'vue';
import { ComponentProvideOptions } from 'vue';
import { ComputedRef } from 'vue';
import { DefineComponent } from 'vue';
import { MaybeRefOrGetter } from 'vue';
import { default as PageItem } from './PageItem';
import { PublicProps } from 'vue';
import { Ref } from 'vue';

declare const __VLS_base: DefineComponent<__VLS_PublicProps, {}, {}, {}, {}, ComponentOptionsMixin, ComponentOptionsMixin, {}, string, PublicProps, Readonly<__VLS_PublicProps> & Readonly<{}>, {
maxItems: number;
linkTag: any;
}, {}, {}, {}, string, ComponentProvideOptions, false, {}, any>;

declare const __VLS_defaultModels: {
    modelValue: number;
};

declare const __VLS_export: __VLS_WithSlots<typeof __VLS_base, __VLS_Slots>;

declare type __VLS_ModelProps = {
    modelValue?: typeof __VLS_defaultModels['modelValue'];
};

declare type __VLS_Props = {
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

declare type __VLS_PublicProps = __VLS_Props & __VLS_ModelProps;

declare type __VLS_Slots = {} & {
    'page-item'?: (props: typeof __VLS_1) => any;
} & {
    'first-icon'?: (props: typeof __VLS_11) => any;
} & {
    'previous-icon'?: (props: typeof __VLS_13) => any;
} & {
    'next-icon'?: (props: typeof __VLS_15) => any;
} & {
    'last-icon'?: (props: typeof __VLS_17) => any;
} & {
    page?: (props: typeof __VLS_19) => any;
};

declare type __VLS_WithSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};

declare const _default: typeof __VLS_export;
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

export declare function usePagination(options?: UsePaginationOptions): {
    compile: () => void;
    total: Ref<number, number>;
    perPage: Ref<number, number>;
    currentPage: Ref<number, number>;
    pages: ComputedRef<PageItem[]>;
    pagesCount: ComputedRef<number>;
    maxItems: Ref<number, number>;
};

export declare interface UsePaginationOptions {
    total?: MaybeRefOrGetter<number>;
    perPage?: MaybeRefOrGetter<number>;
    currentPage?: MaybeRefOrGetter<number>;
    maxItems?: MaybeRefOrGetter<number>;
}

export { }
