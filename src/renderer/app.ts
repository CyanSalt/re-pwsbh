import { createApp } from 'vue'
import App from './components/App.vue'

worldBridge.onReady(() => {
  createApp(App)
    .mount('#app')
})
