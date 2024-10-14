# Vue Pagination

[![Version](https://img.shields.io/npm/v/%40asika32764/vue-pagination.svg?style=flat-square)](https://www.npmjs.com/package/@asika32764/vue-pagination)
[![License](https://img.shields.io/npm/l/%40asika32764/vue-pagination.svg?style=flat-square)](LICENSE)

A very simple pagination without any style that supports developers to custom for every project. [DEMO](https://about.asika.tw/vue-pagination/)

<!-- TOC -->

* [Vue Pagination](#vue-pagination)
  * [Installation](#installation)
  * [Getting Started](#getting-started)
    * [Create A Simple Pagination](#create-a-simple-pagination)
  * [Parameters](#parameters)
    * [Max Items](#max-items)
    * [Page Route and LinkTag](#page-route-and-linktag)
    * [Page Click](#page-click)
  * [Custom Slots](#custom-slots)
    * [Page Icons and Numbers](#page-icons-and-numbers)
    * [Page Items](#page-items)
  * [Interfaces](#interfaces)
    * [Props](#props)
    * [Events](#events)
    * [Slots](#slots)

<!-- TOC -->

## Installation

```shell
npm i @asika32764/vue-pagination --save

# OR

yarn add @asika32764/vue-pagination
```

## Getting Started

Use bundler and Vue SFC:

```vue

<script setup lang="ts">
  import VuePagination from '@asika32764/vue-pagination';
</script>
```

Include JS file.

```html

<script src="path/to/package/dist/vue-pagination.umd.js"></script>

<script>
  const app = Vue.createApp();
  app.component('vue-pagination', VuePagination);
</script>
```

ES Module

```html

<script type="module">
  import VuePagination from 'path/to/package/dist/vue-pagination.umd.js';
  import { createApp } from 'path/to/vue.umd.js';

  const app = createApp();
  app.component('vue-pagination', VuePagination);
</script>

```

### Create A Simple Pagination

```vue

<script setup lang="ts">
  import VuePagination from '@asika32764/vue-pagination';

  const items = ref([]);
  const total = ref(0);
  const perPage = ref(15);
  const currentPage = ref(1);

  const res = axios.get('item/list', { params: { limit: perPage.value, page: currentPage } });

  items.value = res.data.items;
  total.value = res.data.totalRows;
</script>

<template>
  <VuePagination
    v-model="currentPage"
    :total="total"
    :per-page="perPage"
  />
</template>
```

You will see a pagination with empty style.

![](https://github.com/user-attachments/assets/9779f24e-5b7f-4588-ab35-a5e3eb49b4b8)

This is an example for Bootstrap style:

```vue

<template>
  <VuePagination
    v-model="currentPage"
    :total="total"
    :per-page="perPage"

    class="pagination"
    item-class="page-item"
    link-class="page-link"
    active-class="active"
    disabled-class="disabled"
  />
</template>
```

![](https://github.com/user-attachments/assets/804df744-c905-46fb-97a0-d17aa981b1e8)

You could add your own class or style to this pagination components for every UI framework.

## Parameters

### Max Items

Configure max items shows on pagination, default is `5`:

```vue

<VuePagination
  :max-items="3"
/>
```

The example that we limit it only 3 items one time:

![](https://github.com/user-attachments/assets/a7d1907b-c463-4fd3-8fd6-dd310b4a704c)

### Page Route and LinkTag

Simply add route parameter to create link for every page items:

```vue

<script setup lang="ts">
  import type { PageItem } from '@asika32764/vue-pagination';

  function createLink(item: PageItem) {
    return `blog/articles?page=${item.page}`;
  }
</script>

<template>
  <VuePagination
    :route="createLink"
  />
</template>
```

The return value can be a string for `<a href="...">` or any types. You can customize the link tag by:

```vue

<VuePagination
  :route="createLink"
  :link-tag="'button' or 'router-link'"
/>
```

The accepted `link-tag` value includes:

- `a` => Page item will be `<a>` link and route will be `href` attribute.
- `button` => Page item will be `<button>` and without route, you must use `@page-click` to handle click event.
- `router-link`, `NuxtLink` or any other component => The route will be `to="...."` props.

This is an example for VueRouter, you must install [vue-router](https://router.vuejs.org/) first to use the
`router-link` component.

```vue

<script setup lang="ts">
  import type { PageItem } from '@asika32764/vue-pagination';

  function createLink(item: PageItem) {
    return { query: { page: item.page } };
  }
</script>

<template>
  <VuePagination
    :route="createLink"
    link-tag="router-link"
  />
</template>
```

You can provide `true` to `route` prop that component will auto use `{ query: { page: item.page } }` as route:

```vue

<VuePagination
  :route="true"
  link-tag="router-link"
/>
```

### Page Click

If you want to do something on page clicked, use `@page-click` event:

```vue

<script setup lang="ts">
  import type { PageItem } from '@asika32764/vue-pagination';

  function onPageClick(event: MouseEvent, item: PageItem) {
    currentPage.value = item.page;
  }
</script>

<template>
  <VuePagination
    @page-click="onPageClick"
  />
</template>
```

## Custom Slots

### Page Icons and Numbers

```vue

<script setup lang="ts">
  import { faBackward, faBackwardStep, faForward, faForwardStep } from '@fortawesome/free-solid-svg-icons';
  import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

</script>

<template>
  <VuePagination
    v-model="page"
    :total="total"
    :per-page="perPage"
    class="pagination"
    item-class="page-item"
    link-class="page-link"
    active-class="active"
    disabled-class="disabled"
  >
    <template #first-icon>
      <FontAwesomeIcon :icon="faBackwardStep" />
    </template>
    <template #previous-icon>
      <FontAwesomeIcon :icon="faBackward" />
    </template>
    <template #next-icon>
      <FontAwesomeIcon :icon="faForward" />
    </template>
    <template #last-icon>
      <FontAwesomeIcon :icon="faForwardStep" />
    </template>
    <template #page="{ item }">
      <em>{{ item.page }}</em>
    </template>
  </VuePagination>
</template>

```

### Page Items

If you need to build your own pagination items, use `page-item` slot to implement it.

```vue

<script setup lang="ts">
  import { PageType } from '@asika32764/vue-pagination';
  import { faBackward, faBackwardStep, faForward, faForwardStep } from '@fortawesome/free-solid-svg-icons';
  import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
</script>

<template>
  <VuePagination
    v-model="page"
    :total="total"
    :per-page="perPage"
    class="pagination"
    item-class="page-item"
    link-class="page-link"
    active-class="active"
    disabled-class="disabled"
  >
    <template #page-item="{ item, to }">
      <div class="page-item">
        <NuxtLink :to="to" class="page-link"
          :class="{ active: item.active, disabled: item.disabled }"
        >
          <FontAwesomeIcon v-if="item.type === PageType.FIRST" :icon="faBackwardStep" />
          <FontAwesomeIcon v-else-if="item.type === PageType.PREVIOUS" :icon="faBackward" />
          <FontAwesomeIcon v-else-if="item.type === PageType.NEXT" :icon="faForward" />
          <FontAwesomeIcon v-else-if="item.type === PageType.LAST" :icon="faForwardStep" />
          <span v-else>{{ item.page }}</span>
        </NuxtLink>
      </div>
    </template>
  </VuePagination>
</template>
```

The `PageItem` and `PageType` interfaces:

```ts
interface PageItem {
  type: PageType;
  page: number;
  active: boolean;
  disabled: boolean;
}
```

```ts
enum PageType {
  FIRST = 'first',
  PREVIOUS = 'previous',
  LOWER = 'lower',
  CURRENT = 'current',
  HIGHER = 'higher',
  NEXT = 'next',
  LAST = 'last',
}
```

## Interfaces

### Props

| Prop             | Type                                   | Description                     |
|------------------|----------------------------------------|---------------------------------|
| `total`          | `number`                               | The total rows number.          |
| `per-page`       | `number`                               | The number per-page.            |
| `max-items`      | `?number`                              | The max items shows once time.  |
| `link-tag`       | `any`                                  | The link tag name or component. |
| `route`          | `((page: PageItem) => any) or boolean` | The route link logic.           |
| `item-class`     | `any`                                  | The page item class.            |
| `link-class`     | `any`                                  | The page link class.            |
| `active-class`   | `any`                                  | The current page class.         |
| `disabled-class` | `any`                                  | The disabled class.             |

### Events

| Event               | Interface                         | Description                                            |
|---------------------|-----------------------------------|--------------------------------------------------------|
| `page-click`        | `(e: MouseEvent, item: PageItem)` | The page clicked event.                                |
| `pages-updated`     | `([currentPage, total, perPage])` | When `currentPage`, `total`, `perPage` any one changed |
| `update:modelValue` | `(page: number)`                  | When `currentPage` changed                             |

### Slots

| Slot            | Values                        | Description                              |
|-----------------|-------------------------------|------------------------------------------|
| `first-icon`    | `{ item: PageItem, to: any }` | The item text for first link.            |
| `previous-icon` | `{ item: PageItem, to: any }` | The item text for previous link.         |
| `next-icon`     | `{ item: PageItem, to: any }` | The item text for next link.             |
| `last-icon`     | `{ item: PageItem, to: any }` | The item text for last link.             |
| `page`          | `{ item: PageItem, to: any }` | The item text for every page links.      |
| `page-item`     | `{ item: PageItem, to: any }` | The page item HTML for every page items. |

## Contribution

Run:

```shell
yarn install
yarn dev
```

The vite server will raise a doc site on `http://localhost:5173`

The doc site entry file is located at: `src/docs/main.ts`.

You can add your code at this file to test your changes, remeber don't commit your test code to git.

After developed, run this command to build dist files.

```shell
yarn build:prod
```
