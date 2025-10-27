<script setup lang="ts">
import ShowCard from '~/docs/ShowCard.vue';
import { faBackward, faBackwardStep, faForward, faForwardStep } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { ref } from 'vue';
import { PageType } from '~/enum/PageType';
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
  <ShowCard :code>
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
  </ShowCard>
</template>

<style scoped>

</style>
