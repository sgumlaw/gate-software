import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '@/assets/css/tailwind.css'
import { SwitchPlugin } from "@syncfusion/ej2-vue-buttons";
import { DiagramPlugin, Diagram ,Snapping } from '@syncfusion/ej2-vue-diagrams';

Vue.use(SwitchPlugin);
Vue.use(DiagramPlugin);
Diagram.Inject(Snapping);

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
