import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './index.css'

createApp(App).use(router).mount('#app')
//axios.defaults.headers.get['header-name'] = 'value'
//app.use(cors({credentials: true}));