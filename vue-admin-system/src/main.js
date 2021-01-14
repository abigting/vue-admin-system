import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/index'
import storage from '@/utils/localStorage'
import './registerServiceWorker'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import '@/icons'
import '@/styles/index.scss' // global css
Vue.use(ElementUI);

Vue.config.productionTip = false

// 按钮元素控制 v-permission=" "
Vue.directive('permission', {
  inserted: (el, binding, vnode) => {
    const auths =storage.get('auths')||[];
    // let permissionList = vnode.context.$route.meta.permission||[];
    if(binding.value.toString()==='9999') return;
    if (!auths.includes(binding.value.toString())) {
      el.parentNode.removeChild(el)
    }
  }
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
