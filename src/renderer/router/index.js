import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'mainPage',
      component: require('@/components/MainPage.vue').default
    },
    {
      path: '/server',
      name: 'serverManagePage',
      component: require('@/components/ServerManagePage.vue').default
    },
    {
      path: '/client',
      name: 'ClientPage',
      component: require('@/components/ClientPage.vue').default
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
