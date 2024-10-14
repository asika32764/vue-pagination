<script setup lang="ts">
import ShowCard from '@/docs/ShowCard.vue';
import { faBackward, faBackwardStep, faForward, faForwardStep } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { ref } from 'vue';
import VuePagination from '../../VuePagination.vue';

const total = ref(150);
const perPage = ref(15);
const page = ref(1);

const code = `<VuePagination
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
  </ShowCard>
</template>

<style scoped>

</style>
