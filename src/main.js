// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Layout from './components/layout'
import VueRouter from 'vue-router'
import IndexPage from './pages/index'
import VueResource from 'vue-resource'
import DetailPage from './pages/detail'
import DetailAnaPage from './pages/detail/analysis'
import DetailCouPage from './pages/detail/count'
import DetailForPage from './pages/detail/forecast'
import DetailPubPage from './pages/detail/publish'
import ShowPage from './pages/detail/show'
import ShowLaw from './pages/detail/showLaw'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import TenderPage from './pages/detail/tender'
import BidPage from './pages/detail/bid'
import ForshowPage from './pages/detail/forshow'
import $ from 'jquery'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min'
import 'vue-easytable/libs/themes-base/index.css'
import {VTable,VPagination} from 'vue-easytable'


Vue.use(ElementUI)
Vue.use(VueResource)
Vue.use(VueRouter)
Vue.component(VTable.name, VTable)
Vue.component(VPagination.name, VPagination)
let router = new VueRouter({
	mode:'history',
	routes: [
	    {
           path: '/',
           component: IndexPage

	    }, 
      { 
           path: '/detail',
           component: DetailPage,
           redirect:'/detail/analysis',
           children:[
              {
                   path:'analysis',
                   component:DetailAnaPage
              },
              {
                path:'count',
                component:DetailCouPage
              },
              {
                path:'forecast',
                component:DetailForPage,
                children:[{
                  path:'forshow',
                  component:ForshowPage
                }]
              },
              {
                path:'publish',
                component:DetailPubPage
              },
              {
                path:'show',
                component:ShowPage,
                name:'ShowPage'
              },
              {
                path:'showlaw',
                component:ShowLaw,
                name:'ShowLaw'
              },
              {
                path:'bid',
                component:BidPage
              },
              {
                path:'tender',
                component:TenderPage
              }
           ]
      }
	]
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<Layout/>',
  components: { Layout }  
})
