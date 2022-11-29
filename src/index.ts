import { router } from './router'
import { createApp } from 'vue'
import { App } from './App'
import { createPinia } from 'pinia'
import { Vue3ProgressPlugin } from '@marcoschulte/vue3-progress'
import './registerSw'

import('./styles')

createApp(App)
  .use(router)
  .use(createPinia())
  .use(Vue3ProgressPlugin)
  .mount('#app')
