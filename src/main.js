import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './index.css'
import { vueKeycloak } from '@baloise/vue-keycloak'

 const app = createApp(App)

 app.use(vueKeycloak, {
   initOptions: {
     flow: 'standard', 
     checkLoginIframe: false, 
     onLoad: 'login-required', 
   },
   config: {
     url : 'http://192.168.0.103:8180/auth',
     realm : 'myrealm',
     clientId : 'app-auth',
    //onLoad  : 'check-sso',
   }
 }).use(router).mount('#app')

 app.config.compilerOptions.isCustomElement = (tag) => {
  return tag.startsWith('float-')
}
