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
 import f7icons from 'framework7-icons/css/framework7-icons.css'

//Vue-localstorage
import VueLocalStorage from 'vue-ls'

// Import Routes
import Routes from './routes.js'

// Import App Component
import App from './main.vue'

//Import Localization
import local_ru from "./static/local_ru"
import local_en from "./static/local_en"

//Test zone inmport json
import data_json from './static/Objects.json'

// Init F7 Vue Plugin
Vue.use(Framework7Vue);
// Init Vue-ls
Vue.use(VueLocalStorage);

//Components
import List from './assets/vue/Components/list_audit.vue'
Vue.component('list',List);
import check_item from './assets/vue/Components/chek_item.vue'
Vue.component('check_item',check_item);
import textarea from './assets/vue/Components/textarea_comment.vue'
Vue.component('text_area',textarea);
import comment from './assets/vue/Components/comment.vue'
Vue.component('comment',comment);
import attachment from './assets/vue/Components/attachment.vue'
Vue.component('attachment',attachment);
import single_comment from './assets/vue/Components/single-comment.vue'
Vue.component('single_comment',single_comment);


// Init App
new Vue({
  el: '#app',
    template: '<app/>',

  // Init Framework7 by passing parameters here
  framework7: {
    root: '#app',
    /* Uncomment to enable Material theme: */
    material: true,
    routes: Routes,
    scrollTopOnNavbarClick:true,
    hideNavbarOnPageScroll:true,
  },
    
  // Register App Component
  components: {
    app: App
  },

  data: {
        list : {},
        audits:{},
        auth_info:{},
        localization:{}



    },

   watch:{
        auth_info: function(val){
          this.$ls.set('auth_info',val);
      },
       list:function(val){
            this.$ls.set('list',val);
       }
    },

  created: function(){
        this.auth_info =this.$ls.get('auth_info',{name:'',auth:false,lang:"ru"});
        var _this=this;
        this.$ls.on('auth_info',function(val){
            _this.auth_info=val;
        });
        let data=this.$ls.get('list',data_json);
        this.list=JSON.parse(JSON.stringify(data));
        this.$ls.on('list',function(val){
          _this.list=val;
        });
        this.lang_select(this.auth_info.lang);

    },

  methods:{
        check_user_auth:function(){
            if (this.auth_info.auth) {
                    return true;
            }
            return false;
        },
        lang_select:function(val){
          switch (val){
              case "ru":
                  this.localization=local_ru;
                  break;
              case "en":
                  this.localization=local_en;
                  break;
          }
        (this.$f7!=undefined)? this.changeModalLang() :"";
        },
        update_ls:function(){
                this.$ls.set('list',this.list);
         },
        changeModalLang:function(){
            this.$f7.params.modalButtonOk=this.localization.modal.modalOk;
            this.$f7.params.modalButtonCancel=this.localization.modal.modalCancel;
        }


    }

})
