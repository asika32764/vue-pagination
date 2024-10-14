<script setup lang="ts">
import { faCopy } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

const props = defineProps<{
  code: string;
}>();

function copyCode() {
  navigator.clipboard.writeText(props.code);
}

function highlight(code: string): string {
  // @ts-ignore
  return hljs.highlight(
    code,
    { language: 'typescript' }
  ).value;
}
</script>

<template>
  <div class="card">
    <div class="card-body">
      <div class="d-flex justify-content-center border p-3 bg-light rounded">
        <slot></slot>
      </div>

      <div class="mt-3 position-relative">
        <button class="btn btn-sm btn-light position-absolute"
          style="top: .5rem; right: .5rem;"
          @click="copyCode"
        >
          <FontAwesomeIcon :icon="faCopy" />
          Copy
        </button>
        <pre class="hljs p-3 rounded m-0"><code v-html="highlight(code)"></code></pre>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
