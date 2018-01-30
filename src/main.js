// Import Vue
import Vue from 'vue'

// Import vue-resource
import VueResource from 'vue-resource'

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
import check_json from './static/check_lists.json'

// Init F7 Vue Plugin
Vue.use(Framework7Vue);
// Init Vue-ls
Vue.use(VueLocalStorage);
Vue.use(VueResource);

//Components
import List from './assets/vue/Components/list_audit.vue'
Vue.component('list',List);
import Object_list from './assets/vue/Components/object_list.vue'
Vue.component('list_object',Object_list);
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
import check_box from './assets/vue/Components/check_box_item.vue'
Vue.component('check_box_item',check_box);
import popup_new from './assets/vue/Components/popup_ne.vue'
Vue.component('popup_new',popup_new);
import audit_add from './assets/vue/Components/add_audit_form.vue'
Vue.component('audit_add',audit_add);
import popover_obj from './assets/vue/Components/popover_obj.vue'
Vue.component('popover_obj',popover_obj);
import curr_objects from './assets/vue/Components/exist_objects_list.vue'
Vue.component('curr_objects',curr_objects);
import popup_new_object from './assets/vue/Components/popup_new_object.vue'
Vue.component('popup_new_object',popup_new_object);



// Init App
new Vue({
  el: '#app',
    template: '<app/>',

  // Init Framework7 by passing parameters here
  framework7: {
    root: '#app',
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
        localization:{},
        check_list:{},
        settings:{},
        token:'empty'
    },

   watch:{
        auth_info: function(val){
          this.$ls.set('auth_info',val);
      },
       settings:function(val){
         this.$ls.set('settings',val);
       },
       list:function(val){
            this.$ls.set('list',val);
       },
       check_list:function(val){
           this.$ls.set('check_list',val);
       },
       token:function(val){
            this.$ls.set('token',val);
       }
    },

  created: function(){
        this.auth_info =this.$ls.get('auth_info',{name:'',email:'',auth:false});
        var _this=this;
        this.$ls.on('auth_info',function(val){
            _this.auth_info=val;
        });
        this.settings=this.$ls.get('settings','ru');
        this.$ls.on('settings',function(val){
           _this.settings=val;
        });
        this.token=this.$ls.get('token','');
        this.$ls.on('token',function(val){
           _this.token=val;
        });
        let data=this.$ls.get('list',data_json);
        this.list=JSON.parse(JSON.stringify(data));
        this.$ls.on('list',function(val){
          _this.list=val;
        });
        this.check_list=this.$ls.get('check_list',check_json);
        this.$ls.on('check_list',function(val){
          _this.check_list=val;
      });
        this.lang_select(this.settings);

    },

  methods:{
        check_user_auth:function(){
           return (this.auth_info.auth)
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
        },
          onRefresh(event, done){
              var self = this;
              setTimeout(function () {
                  self.list=data_json;
                  done();
              }, 2000);
          }


    }

})
