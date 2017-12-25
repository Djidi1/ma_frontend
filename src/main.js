// Import Vue
import Vue from 'vue'

// Import F7
import Framework7 from 'framework7'

// Import F7 Vue Plugin
import Framework7Vue from 'framework7-vue'

/* Import F7 iOS Theme Styles
import Framework7Theme from 'framework7/dist/css/framework7.ios.min.css'
import Framework7ThemeColors from 'framework7/dist/css/framework7.ios.colors.min.css'
*/
 import Framework7Theme from 'framework7/dist/css/framework7.material.min.css'
 import Framework7ThemeColors from 'framework7/dist/css/framework7.material.colors.min.css'


// Import App Custom Styles
import AppStyles from './assets/sass/main.scss'
import AppStylesCustom from './assets/sass/custom.scss'

import  FAicon from 'font-awesome/css/font-awesome.css';

// Import Routes
import Routes from './routes.js'

// Import App Component
import App from './main.vue'
import Login from './assets/vue/pages/login.vue'


// Init F7 Vue Plugin
Vue.use(Framework7Vue)


// Init App
new Vue({
  el: '#app',
    template: '<app/>',

  // Init Framework7 by passing parameters here
  framework7: {
    root: '#app',
    /* Uncomment to enable Material theme: */
    material: true,
    routes: Routes
  },

  // Register App Component
  components: {
    app: App,
      login:Login

  },
    data: {
        list : [
            {
                name:'Object1',
                status:'new',
                color:'red'
            },
            {
                name:'Object2',
                status:'new',
                color:'green'
            },
            {
                name:'Object3',
                status:'old',
                color:'blue'
            },
            {
                name:'Object4',
                status:'',
                color:'red'
            },
            {
                name:'Object5',
                status:'ready',
                color:'red'
            }

        ],
        auth:false
    },
    methods:{
        check_user_auth:function(){
          if  (localStorage.hasOwnProperty('auth_token')) {
              return true;
          } else{
              return false;
          }
        }

    }

})
