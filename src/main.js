import { createApp } from 'vue'
import App from './App.vue'
import router from "@/router/index.js";
import store from "@/store/index.js";
import i18n from "@/languages/i18n.js";
import VueClipboard from "vue-clipboard2";

// import Loading from "./modules/loading/index.js";
import Message from './modules/message/index.js';
import Hashloading from "./modules/hashloading/index.js";
import UIComponents from './components/UIComps/index'
import 'vant/lib/index.css';
import Vant from 'vant'

import "./permission.js";
import "./main.css"

import { PageLocales } from "@/util/locale";

// import Web3 from "web3";
// import { Web3Connector } from "./util/rpc";
// const rpc = new Web3Connector(Web3)

import {formatUrl} from "@/util/main.js";

formatUrl()
import VConsole from 'vconsole'
import Config from "@/util/config.js";
if (Config.isDebug) {
  new VConsole()
}

const app = createApp(App)

// Loading.install(app);
Message.install(app);
Hashloading.install(app);

// app.config.globalProperties.Web3 = Web3;
// app.config.globalProperties.$rpc = rpc;

app.config.globalProperties.$local = new PageLocales();

app.use(router);
app.use(store);
app.use(i18n);
app.use(Vant);
app.use(UIComponents);
app.use(VueClipboard);

app.mount('#app')
