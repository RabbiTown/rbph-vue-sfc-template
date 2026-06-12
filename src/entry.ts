import { createApp, type App as VueApp } from 'vue';
import App from './App.vue';
import type { RbphContext } from './rbph';
import './assets/style.css';

let app: VueApp<Element> | undefined;

export function mount(el: Element, rbph: RbphContext) {
  app?.unmount();
  app = createApp(App, { rbph });
  app.provide('rbph', rbph);
  app.mount(el);

  return () => {
    app?.unmount();
    app = undefined;
  };
}

export default { mount };
