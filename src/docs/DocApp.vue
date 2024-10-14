<script setup lang="ts">
import CustomPageItemsExample from './example/CustomPageItemsExample.vue';
import CustomIconsStyleExample from './example/CustomIconsStyleExample.vue';
import BootstrapStyleExample from './example/BootstrapStyleExample.vue';
import EmptyStyleExample from './example/EmptyStyleExample.vue';

const installation = `npm i @asika32764/vue-pagination --save

# OR

yarn add @asika32764/vue-pagination
`;
</script>

<template>
<div class="container py-5 d-flex flex-column gap-5">
  <header class="text-center mx-auto" style="max-width: 650px">
    <h1 class="mb-4">Vue Pagination</h1>

    <div class="d-flex gap-2 justify-content-center mb-3">
      <div>
        <a href="https://www.npmjs.com/package/@asika32764/vue-pagination" target="_blank">
          <img src="https://img.shields.io/npm/v/%40asika32764/vue-pagination.svg?style=flat-square" alt="Version">
        </a>
      </div>
      <div>
        <img src="https://img.shields.io/npm/l/%40asika32764/vue-pagination.svg?style=flat-square" alt="License">
      </div>
    </div>

    <p class="lead">
      A Vue.js 3 simple pagination component without default style that you can integrate to any framework.
    </p>

    <div class="d-flex gap-2 justify-content-center">
      <a class="btn btn-primary" href="https://github.com/asika32764/vue-pagination#readme"
        target="_blank">
        Documentation
      </a>

      <a class="btn btn-dark" href="https://github.com/asika32764/vue-pagination"
        target="_blank">
        GitHub
      </a>

      <a class="btn btn-danger" href="https://www.npmjs.com/package/@asika32764/vue-pagination"
        target="_blank">
        NPM
      </a>
    </div>
  </header>

  <section>
    <h2 class="text-center mb-3">Installation</h2>

    <div class="mx-auto" style="max-width: 650px">
      <pre class="bg-dark p-3 text-light rounded" v-html="installation"></pre>
    </div>
  </section>

  <div class="mx-auto d-flex flex-column gap-5" style="max-width: 800px; width: 100%;">
    <section>
      <h2 class="text-center mb-3">Empty Style</h2>

      <EmptyStyleExample />
    </section>

    <section>
      <h2 class="text-center mb-3">Bootstrap Style</h2>

      <BootstrapStyleExample />
    </section>

    <section>
      <h2 class="text-center mb-3">Custom Icons and Page Numbers</h2>

      <CustomIconsStyleExample />
    </section>

    <section>
      <h2 class="text-center mb-3">Custom Page Items</h2>

      <CustomPageItemsExample />
    </section>
  </div>

  <footer class="mt-5 text-center">
    Made by <a href="https://simular.co" target="_blank">Simular</a>
  </footer>
</div>
</template>

<style scoped>

</style>
