<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import PageItem from './PageItem';
import { PageType } from './PageType';

const props = withDefaults(
    defineProps<{
      total: number;
      perPage: number;
      maxItems?: number;
      itemClass?: any;
      linkClass?: any;
      activeClass?: any;
      disabledClass?: any;
      route?: ((page: PageItem) => any) | true;
    }>(),
    {
      maxItems: 5,
    }
);

const currentPage = defineModel({
  default: 1
});

const emits = defineEmits(['page-click', 'pages-updated']);

const pages = computed(() =>  Math.ceil(props.total / props.perPage));

const first = ref<PageItem>();
const previous = ref<PageItem>();
const lowers = ref<PageItem[]>([]);
const highers = ref<PageItem[]>([]);
const next = ref<PageItem>();
const last = ref<PageItem>();
const current = ref<PageItem>();
const compiledPages = computed<PageItem[]>(() => {
  return [
    first.value,
    previous.value,
    ...lowers.value,
    current.value,
    ...highers.value,
    next.value,
    last.value
  ].filter((p) => p != null);
});

watch(
    [
      currentPage,
      () => props.total,
      () => props.perPage
    ],
    (v) => {
      compile();
      emits('pages-updated', ...v);
    },
);

compile();

function reset() {
  first.value = undefined;
  previous.value = undefined;
  next.value = undefined;
  last.value = undefined;
  current.value = undefined;
  lowers.value = [];
  highers.value = [];
}

function compile() {
  reset();

  const page = currentPage.value;
  let maxItems = props.maxItems;

  // Ensure max is odd
  if (maxItems % 2 === 0) {
    maxItems++;
  }

  const halfCount = (maxItems - 1) / 2;

  const leftOffset = page - 1;
  let leftCount = Math.min(halfCount, leftOffset);

  const rightOffset = pages.value - page;
  let rightCount = Math.min(halfCount, rightOffset);

  if (page + halfCount > pages.value) {
    leftCount = maxItems - rightCount - 1;
  } else if (page - halfCount <= 0) {
    rightCount = maxItems - leftCount - 1;
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
  next.value = createPageItem(PageType.NEXT, page + 1, { disabled: page === pages.value });

  // Last
  last.value = createPageItem(PageType.LAST, pages.value, { disabled: page === pages.value });

  // Current
  current.value = createPageItem(PageType.CURRENT, page, { active: true });
}

function createPageItem(type: PageType, page: number, extra: Record<string, any> = {}): PageItem {
  return {
    type,
    page,
    active: extra.active ?? false,
    disabled: extra.disabled ?? false,
  };
}

function createLink(page: PageItem) {
  if (props.route) {
    if (props.route === true) {
      return { query: { page: page.page } };
    }

    return props.route(page);
  }

  return 'javascript:void(0)';
}

function clickPage(event: MouseEvent, page: PageItem) {
  if (!props.route) {
    currentPage.value = page.page;
    emits('page-click', event, page.page);
  }
}
</script>

<template>
  <div>
    <slot v-for="page of compiledPages"
      :key="`${page.type}-${page.page}`"
      name="page-item"
      v-bind="{ page, href: createLink(page) }"
    >
      <div :class="itemClass">
        <a :href="createLink(page)"
            @click="clickPage($event, page)"
            v-bind:class="linkClass"
            :class="[ page.active ? activeClass : null, page.disabled ? disabledClass : null ]"
            :disabled="page.disabled"
        >
          <slot v-if="page.type === PageType.FIRST" name="first-icon" v-bind="{ page, href: createLink(page) }">
            <span>First</span>
          </slot>
          <slot v-else-if="page.type === PageType.PREVIOUS" name="previous-icon" v-bind="{ page, href: createLink(page) }">
            <span aria-hidden="true">&laquo;</span>
          </slot>
          <slot v-else-if="page.type === PageType.NEXT" name="next-icon" v-bind="{ page, href: createLink(page) }">
            <span aria-hidden="true">&raquo;</span>
          </slot>
          <slot v-else-if="page.type === PageType.LAST" name="last-icon" v-bind="{ page, href: createLink(page) }">
            <span>Last</span>
          </slot>
          <slot v-else name="page" v-bind="{ page, href: createLink(page) }">{{ page.page }}</slot>
        </a>
      </div>
    </slot>
  </div>
</template>

<style scoped>

</style>
