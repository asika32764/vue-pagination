import { createApp } from 'vue';
import DocApp from './DocApp.vue';
import 'bootstrap/dist/css/bootstrap.css';

// @ts-ignore
hljs.registerLanguage("vue", window.hljsDefineVue);

const app = createApp(DocApp);
app.mount('#app');
