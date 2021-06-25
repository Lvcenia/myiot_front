import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'



import installElementPlus from './plugins/element'
import axios from "axios";
import utils from "./Common/utils";

axios.interceptors.request.use(
    config => {
        if (localStorage.getItem('Authorization')) {
            config.headers.Authorization = localStorage.getItem('Authorization');
        }

        return config;
    },
    error => {
        return Promise.reject(error);
    });


const app = createApp(App)
installElementPlus(app)
app.config.globalProperties.Server = "http://localhost:12500"
app.config.globalProperties.$axios = axios
app.config.globalProperties.$utils = utils
app.config.globalProperties.$app = App


app.use(store)
    .use(router)
    .mount('#app')
