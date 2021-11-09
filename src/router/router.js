import Vue from 'vue'
import VueRouter from 'vue-router'


import Intro from '@/components/Intro'
import Day from '@/components/Day'
import Calendar from '@/components/Calendar'
import Setting from '@/components/Setting'
import Login from '@/components/Login'



Vue.use(VueRouter)

const routes = [
  {
    path : '*',
    redirect : '/login'
  },
  {
    path: '/intro/:user', //유저가 접속할 URL 패턴
    name: 'intro', 
    component: Intro,
    meta : {
      requiresAuth : true
    } 
  },
  {
    path: '/:user/day/:date', //date라는 파라미터를 받기 위해 지정해준다.
    name: 'day',
    component: Day,
    meta : {
      requiresAuth : true
    }
  },
  {
    path: '/:user/calendar', 
    name: 'calendar',
    component: Calendar,
    meta : {
      requiresAuth : true
    }
  },
  {
    path: '/:user/setting', 
    name: 'setting',
    component: Setting,
    meta : {
      requiresAuth : true
    }

  },
  // {
  //   path: '/:user/about', 
  //   name: 'about',
  //   component: About,
  //   meta : {
  //     requiresAuth : true
  //   }
  // },
  {
    path: '/login', 
    name: 'login',
    component: Login
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
