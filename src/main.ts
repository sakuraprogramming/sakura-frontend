import {createApp} from 'vue'
// import './style.css'
import App from './App.vue'
import Vant from 'vant';
import 'vant/lib/index.css';
import * as VueRouter from 'vue-router';
import routes from "./config/route.ts";
import './global.css'

const app = createApp(App)
const router = VueRouter.createRouter({
    history: VueRouter.createWebHashHistory(),
    routes
});
app.use(Vant);
app.use(router);
app.mount('#app')
