import Vue from 'vue'
import VueRouter from 'vue-router'
import GetCode from '../views/GetCode'
import Home from '../components/Home'
import AllGrade from '../components/subcomponent/AllGrade'
import FailedList from '../components/subcomponent/FailedList'
import Single from '../components/subcomponent/Single'
import '../assets/css/global.css'
Vue.use(VueRouter)

const routes = [
  { path: '/', redirect: '/getCode' },
  { path: '/getCode', component: GetCode },
  {
    path: '/home',
    name: 'home',
    component: Home,
    children: [
      { path: '/home/all', name: 'all', component: AllGrade },
      { path: '/home/failed', component: FailedList },
      { path: '/home/single', component: Single }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
