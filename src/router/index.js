import Vue from 'vue'
import Router from 'vue-router'

import axios from 'axios'
import VueAxios from 'vue-axios'

const JoinMeeting = () => import('@/components/JoinMeeting')
const Meeting = () => import('@/components/Meeting')

Vue.use(Router)
Vue.use(VueAxios, axios)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'join',
      component: JoinMeeting
    },
    {
      path: '/meeting',
      name: 'meeting',
      component: Meeting,
      props: true
    }
  ]
})
