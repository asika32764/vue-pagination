import PageItem from '~/PageItem';
import { PageType } from '~/PageType.ts';
import { computed, isReadonly, isRef, type MaybeRefOrGetter, Ref, ref, watchEffect } from 'vue';

export interface UsePaginationOptions {
  total?: MaybeRefOrGetter<number>;
  perPage?: MaybeRefOrGetter<number>;
  currentPage?: MaybeRefOrGetter<number>;
  maxItems?: MaybeRefOrGetter<number>;
}

export default function usePagination(options: UsePaginationOptions = {}) {
  const total = wrapRef(options.total ?? 0);
  const perPage = wrapRef(options.perPage ?? 0);
  const currentPage = wrapRef(options.currentPage ?? 1);
  const pagesCount = computed(() => Math.ceil(total.value / perPage.value));
  const max = wrapRef(options.maxItems ?? 5);

  const first = ref<PageItem>();
  const previous = ref<PageItem>();
  const lowers = ref<PageItem[]>([]);
  const highers = ref<PageItem[]>([]);
  const next = ref<PageItem>();
  const last = ref<PageItem>();
  const current = ref<PageItem>();
  const pages = computed<PageItem[]>(() => {
    return [
      first.value,
      previous.value,
      ...lowers.value,
      current.value,
      ...highers.value,
      next.value,
      last.value,
    ].filter((p) => p != null);
  });

  const compile = () => {
    reset();

    if (currentPage.value > pagesCount.value && !isReadonly(currentPage)) {
      (currentPage as Ref).value = pagesCount.value || 1;
    }

    const page = currentPage.value;
    let maxItems = max.value;

    // Ensure max is odd
    if (maxItems % 2 === 0) {
      maxItems++;
    }

    const halfCount = (maxItems - 1) / 2;

    const leftOffset = page - 1;
    let leftCount = Math.min(halfCount, leftOffset);

    const rightOffset = pagesCount.value - page;
    let rightCount = Math.min(halfCount, rightOffset);

    if (page + halfCount > pagesCount.value) {
      leftCount = Math.min(maxItems - rightCount - 1, leftOffset);
    } else if (page - halfCount <= 0) {
      rightCount = Math.min(maxItems - leftCount - 1, rightOffset);
    }

    for (let i = page - leftCount; i < page; i++) {
      lowers.value.push(createPageItem(PageType.LOWER, i));
    }

    // Previous
    previous.value = createPageItem(PageType.PREVIOUS, page - 1, { disabled: page === 1 });

    // First
    first.value = createPageItem(PageType.FIRST, 1, { disabled: page === 1 });

    // Higher
    for (let i = page + 1; i <= rightCount + page; i++) {
      highers.value.push(createPageItem(PageType.HIGHER, i));
    }

    // Next
    next.value = createPageItem(PageType.NEXT, page + 1, { disabled: page === pagesCount.value });

    // Last
    last.value = createPageItem(PageType.LAST, pagesCount.value, { disabled: page === pagesCount.value });

    // Current
    current.value = createPageItem(PageType.CURRENT, page, { active: true });
  };

  function createPageItem(type: PageType, page: number, extra: Record<string, any> = {}): PageItem {
    return {
      type,
      page,
      active: extra.active ?? false,
      disabled: extra.disabled ?? false,
    };
  }

  function reset() {
    first.value = undefined;
    previous.value = undefined;
    next.value = undefined;
    last.value = undefined;
    current.value = undefined;
    lowers.value = [];
    highers.value = [];
  }

  watchEffect(() => {
    compile();
  });

  return {
    compile,
    total,
    perPage,
    currentPage,
    pages,
    pagesCount,
    maxItems: max,
  };
}

function wrapRef<T>(value: MaybeRefOrGetter<T>): Ref<T> {
  if (typeof value === 'function') {
    value = ref((value as Function)());
  }

  return (isRef(value) ? value : ref(value)) as Ref<T>;
}
