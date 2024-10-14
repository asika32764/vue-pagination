<script setup lang="ts">
import ShowCard from '@/docs/ShowCard.vue';
import { ref } from 'vue';
import VuePagination from '../../VuePagination.vue';

const total = ref(150);
const perPage = ref(15);
const page = ref(1);

const code = `<VuePagination
  v-model="page"
  :total="total"
  :per-page="perPage"
/>`;

</script>

<template>
  <ShowCard :code>
    <VuePagination
      v-model="page"
      :total="total"
      :per-page="perPage"
    >
    </VuePagination>
  </ShowCard>
</template>

<style scoped>

</style>
