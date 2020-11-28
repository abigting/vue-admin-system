import Vue from 'vue'
import router from './router'
import store from './store'
import App from './App'
import 'default-passive-events'
import './permission'
import "babel-polyfill"

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI, { size: 'mini' })
import '@/icons'
import '@/styles/index.scss' // global css
import 'normalize.css' // A modern alternative to CSS resets

//loading
function timeOut(){
	setTimeout(()=>{
		this.isLoading = false;
	},280)
}
Vue.prototype.timeOut = timeOut

//移动指令 v-drag
 Vue.directive('drag',{
   inserted: function (el, binding, vnode) {
     vnode = vnode.elm
     el.onmousedown = ((event) => {
       if (event.target.className !== "drag-title-header") {
         return
       }
       let mouseX = event.clientX - vnode.offsetLeft
       let mouseY = event.clientY - vnode.offsetTop
       document.onmousemove = ((event) => {
         let left, top
         left = event.clientX - mouseX
         top = event.clientY - mouseY
         let minX = -vnode.offsetWidth / 2 + 100
         let maxX = window.innerWidth + vnode.offsetWidth / 2 - 100
         if (left <= minX) {
           left = minX
         } else if (left >= maxX) {
           left = maxX
         }
         let minY = 30
         let maxY = window.innerHeight + vnode.offsetHeight / 2 - 100
         if (top <= minY) {
           top = minY
         } else if (top >= maxY) {
           top = maxY
         }
         vnode.style.left = left + 'px'
         vnode.style.top = top + 'px'
       })
       document.onmouseup = (() => {
         document.onmousemove = document.onmouseup = null
       })
     })
     window.onresize = (() => {
       vnode.style.left = "50%"
       vnode.style.top = "50%"
     })
   }
 })

 //globaComponent
 // import nationalAddress from '@/components/nationalAddress/index.vue';
 // import levelAddress from '@/components/levelAddress/index.vue';
 // import exportTips from "@/components/exportTips/index.vue";
 // Vue.component('nationalAddress',nationalAddress);//全国地区
 // Vue.component('levelAddress',levelAddress);//跟用户等级匹配的地区
 // Vue.component('exportTips',exportTips); //导出提示条
 
 //按钮元素控制 v-permission=" "
 // Vue.directive('permission', {
 //   inserted: (el, binding, vnode) => {
 //     let permissionList = vnode.context.$route.meta.permission||[];
 //     if (!permissionList.includes(binding.value)) {
 //       el.parentNode.removeChild(el)
 //     }
 //   }
 // })

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
