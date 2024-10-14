<script setup lang="ts">

import ShowCard from '@/docs/ShowCard.vue';
import { PageType } from '@/PageType.ts';
import usePagination from '@/usePagination.ts';
import { faBackward, faBackwardStep, faForward, faForwardStep } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

const {
  total,
  perPage,
  currentPage,
  maxItems,
  pages,
  pagesCount,
} = usePagination({ total: 150, perPage: 10, currentPage: 1 });

const code = `<script setup lang="ts">
import { usePagination, PageType } from '@asika32764/vue-pagination';

const {
  total,
  perPage,
  currentPage,
  maxItems,
  pages,
  pagesCount,
} = usePagination({ total: 150, perPage: 10, currentPage: 1 });

<\/script>

<template>
  <div class="pagination">
    <div v-for="item of pages" class="page-item">
      <a href="javascript:void(0)" class="page-link"
        :class="{ active: item.active, disabled: item.disabled }"
        @click.prevent="currentPage = item.page"
      >
        <FontAwesomeIcon v-if="item.type === PageType.FIRST" :icon="faBackwardStep" />
        <FontAwesomeIcon v-else-if="item.type === PageType.PREVIOUS" :icon="faBackward" />
        <FontAwesomeIcon v-else-if="item.type === PageType.NEXT" :icon="faForward" />
        <FontAwesomeIcon v-else-if="item.type === PageType.LAST" :icon="faForwardStep" />
        <span v-else>{{ item.page }}</span>
      </a>
    </div>
  </div>
</template>`;

</script>

<template>
<ShowCard :code>
  <div class="d-flex flex-column align-items-center gap-3">
    <div class="pagination">
      <div v-for="item of pages" class="page-item">
        <a href="javascript:void(0)" class="page-link"
          :class="{ active: item.active, disabled: item.disabled }"
          @click.prevent="currentPage = item.page"
        >
          <FontAwesomeIcon v-if="item.type === PageType.FIRST" :icon="faBackwardStep" />
          <FontAwesomeIcon v-else-if="item.type === PageType.PREVIOUS" :icon="faBackward" />
          <FontAwesomeIcon v-else-if="item.type === PageType.NEXT" :icon="faForward" />
          <FontAwesomeIcon v-else-if="item.type === PageType.LAST" :icon="faForwardStep" />
          <span v-else>{{ item.page }}</span>
        </a>
      </div>
    </div>

    <table class="table table-bordered">
      <tbody>
      <tr>
        <th>Total</th>
        <td>
          <input type="number" v-model="total" class="form-control form-control-sm">
        </td>
      </tr>
      <tr>
        <th>Per Page</th>
        <td>
          <input type="number" v-model="perPage" class="form-control form-control-sm">
        </td>
      </tr>
      <tr>
        <th>Current Page</th>
        <td>
          <input type="number" v-model="currentPage" class="form-control form-control-sm">
        </td>
      </tr>
      <tr>
        <th>Pages Count</th>
        <td>{{ pagesCount }}</td>
      </tr>
      <tr>
        <th>Max Items</th>
        <td>
          <input type="number" v-model="maxItems" class="form-control form-control-sm">
        </td>
      </tr>
      </tbody>
    </table>
  </div>
</ShowCard>
</template>

<style scoped>

</style>
