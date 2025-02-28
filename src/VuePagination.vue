<script setup lang="ts">
import usePagination from './usePagination.ts';
import { watch } from 'vue';
import PageItem from './PageItem';
import { PageType } from './PageType';

const props = withDefaults(
  defineProps<{
    total: number;
    perPage: number;
    maxItems?: number;
    linkTag?: any;
    itemClass?: any;
    linkClass?: any;
    activeClass?: any;
    disabledClass?: any;
    route?: ((page: PageItem) => any) | boolean;
  }>(),
  {
    maxItems: 5,
    linkTag: 'a',
  },
);

const currentPage = defineModel({
  default: 1,
});

const emits = defineEmits(['page-click', 'pages-updated']);

watch(
  [
    currentPage,
    () => props.total,
    () => props.perPage,
    () => props.maxItems,
  ],
  (v) => {
    emits('pages-updated', ...v);
  },
);

const { pages } = usePagination({
  total: () => props.total,
  perPage: () => props.perPage,
  currentPage,
  maxItems: () => props.maxItems
});

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
    emits('page-click', event, page);
  }
}

function linkAttrs(item: PageItem) {
  if (props.linkTag === 'a') {
    return {
      href: createLink(item),
    };
  }

  if (props.linkTag === 'button') {
    return {
      disabled: item.disabled,
    };
  }

  return {
    to: createLink(item),
    disabled: item.disabled,
  };
}
</script>

<template>
  <div>
    <slot v-for="item of pages"
      :key="`${item.type}-${item.page}`"
      name="page-item"
      v-bind="{ item, to: createLink(item) }"
    >
      <div :class="[ item.active ? activeClass : null, item.disabled ? disabledClass : null, itemClass ]">
        <component :is="linkTag"
          v-bind="linkAttrs(item)"
          @click="clickPage($event, item)"
          :class="[ item.active ? activeClass : null, item.disabled ? disabledClass : null, linkClass ]"
        >
          <slot v-if="item.type === PageType.FIRST" name="first-icon" v-bind="{ item, to: createLink(item) }">
            <span>First</span>
          </slot>
          <slot v-else-if="item.type === PageType.PREVIOUS" name="previous-icon"
            v-bind="{ item, to: createLink(item) }">
            <span aria-hidden="true">&laquo;</span>
          </slot>
          <slot v-else-if="item.type === PageType.NEXT" name="next-icon" v-bind="{ item, to: createLink(item) }">
            <span aria-hidden="true">&raquo;</span>
          </slot>
          <slot v-else-if="item.type === PageType.LAST" name="last-icon" v-bind="{ item, to: createLink(item) }">
            <span>Last</span>
          </slot>
          <slot v-else name="page" v-bind="{ item, to: createLink(item) }">{{ item.page }}</slot>
        </component>
      </div>
    </slot>
  </div>
</template>

<style scoped>

</style>
