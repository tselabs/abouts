import { createRouter, createWebHistory } from 'vue-router'
import { defineAsyncComponent } from 'vue'
import Loading from './components/Loading.vue'

const AsyncIndex = defineAsyncComponent({
  loader: async () => await import('./pages/IndexPage.vue'),
  loadingComponent: Loading,
})

export const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      component: async () => await Promise.resolve(AsyncIndex),
    },
  ],
})
