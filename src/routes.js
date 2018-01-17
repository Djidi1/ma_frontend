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
      path:'/audit/:obj_id/:id',
      component:require('./assets/vue/pages/audit.vue')
    },
    {
      path:'/settings/',
      component:require('./assets/vue/Components/settings.vue')
    }
]
