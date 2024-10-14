<script setup lang="ts">
import { PageType } from '../../PageType';
import { faBackward, faBackwardStep, faForward, faForwardStep } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { ref } from 'vue';
import VuePagination from '../../VuePagination.vue';

const total = ref(150);
const perPage = ref(15);
const page = ref(1);

const code = `import { PageType } from '@asika32764/vue-pagination';

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
</VuePagination>`;

</script>

<template>
<div class="card">
  <div class="card-body">
    <div class="d-flex justify-content-center border p-3 bg-light">
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
    </div>

    <div class="mt-3">
      <pre class="bg-dark p-3 text-light rounded m-0">{{ code }}</pre>
    </div>
  </div>
</div>
</template>

<style scoped>

</style>
