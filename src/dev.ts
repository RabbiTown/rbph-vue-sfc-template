import { createApp } from 'vue';
import App from './App.vue';
import { createDevRbphContext } from './rbph-dev';
import './assets/style.css';

const rbph = createDevRbphContext();
const app = createApp(App, { rbph });

app.provide('rbph', rbph);
app.mount('#app');
