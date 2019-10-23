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
      name: 'serverCreatePage',
      component: require('@/components/ServerCreatePage.vue').default
    },
    {
      path: '/servermanage',
      name: 'serverManagePage',
      component: require('@/components/ServerManagePage.vue').default
    },
    {
      path: '/client',
      name: 'clientPage',
      component: require('@/components/ClientPage.vue').default
    },
    {
      path: '/join',
      name: 'joinPage',
      component: require('@/components/ClientJoinPage.vue').default
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
