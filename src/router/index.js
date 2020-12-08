import Vue from 'vue'
import Router from 'vue-router'

import axios from 'axios'
import VueAxios from 'vue-axios'

const JoinMeeting = () => import('@/components/JoinMeeting')
const Meeting = () => import('@/components/Meeting')
const AutoLogger = () => import('@/components/AutoLogger')
const ViewVoting = () => import('@/components/ViewVoting')
const VotingResult = () => import('@/components/VotingResult')


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
      path: '/log',
      name: 'log',
      component: AutoLogger,
      props: true
    },
    {
      path: '/meeting',
      name: 'meeting',
      component: Meeting,
      props: true
    },
    {
      path: '/voting',
      name: 'voting',
      component: ViewVoting,
      props: true
    },
    {
      path: '/results',
      name: 'results',
      component: VotingResult,
      props: true
    }
  ]
})
