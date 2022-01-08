import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './index.css'
import { vueKeycloak } from '@baloise/vue-keycloak'

 ///===тест вариант1
 const app = createApp(App)

 app.use(vueKeycloak, {
   initOptions: {
     flow: 'standard', // default
     checkLoginIframe: false, // default
     onLoad: 'login-required', // default
   },
   config: {
     url : 'http://localhost:8180/auth',
     realm : 'myrealm',
     clientId : 'app-auth',
    //onLoad  : 'check-sso',
   }
 }).use(router).mount('#app')


