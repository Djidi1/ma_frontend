export default [
  {
    path: '/login/',
    component: require('./assets/vue/pages/login.vue')
  },
    {
      path:'/page/',
      component: require('./assets/vue/pages/page.vue')
    },

    {
      path:'/audit/:id',
      component:require('./assets/vue/pages/audit.vue')
    }
]
