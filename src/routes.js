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
        path:'/object/',
        component: require('./assets/vue/pages/objects.vue')
    },
    {
        path:'/object/:id',
        component: require('./assets/vue/pages/single_object.vue')
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
