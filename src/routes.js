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
      path:'/audit/:array_index/:id',
      component:require('./assets/vue/pages/audit.vue')
    },
    {
      path:'/settings/',
      component:require('./assets/vue/Components/settings.vue')
    },
    {
      path:'/check/:audit_id/:check_id',
      component:require('./assets/vue/pages/check.vue')
    },
    {
        path:'/edit_audit/:object_index/:audit_id/',
        component:require('./assets/vue/pages/popup_edit_audit.vue')
    },
    {
        path:'/add_audit/',
        component:require('./assets/vue/pages/popup_new_object.vue')
    }
]
