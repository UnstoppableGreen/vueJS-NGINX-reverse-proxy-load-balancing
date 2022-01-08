import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './index.css'
import Keycloak from 'keycloak-js'

let initOptions = {
    url : 'http://localhost:8180/auth',
    realm : 'myrealm',
    clientId : 'app-auth',
    //onLoad  : 'login-required',
   onLoad  : 'check-sso',
  }
let keycloak = Keycloak(initOptions);

//axios.defaults.headers.get['header-name'] = 'value'
//app.use(cors({credentials: true}));
keycloak.init({onLoad: initOptions.onLoad}).then( auth => {
    if (!auth) {
        //window.location.href = initOptions.url;
    } else {
        const app=createApp(App,{ props : {keycloakInstance: keycloak}}).use(router).mount('#app');
        app.provide('keycloak', keycloak);
        app.config.globalProperties.$keycloak = keycloak;    
    }   
  })
  .catch(() => {
   // window.location.href = initOptions.url;
   /* if (window.confirm('Login Failure'))
    {
        window.location.href = initOptions.url;
    }
    else
    {
        alert("Login Failure")
    }*/

  });
    
   
 //createApp(App).use(router).mount('#app');





 axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;