<script setup lang="ts">
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
<div class="card">
  <div class="card-body">
    <div class="d-flex justify-content-center border p-3 bg-light">
      <VuePagination
        v-model="page"
        :total="total"
        :per-page="perPage"
      >
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
