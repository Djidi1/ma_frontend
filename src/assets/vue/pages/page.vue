<template>
    <!--Страница аудитов-->
        <f7-page name="audits_main" pull-to-refresh @ptr:refresh="this.$root.onRefresh" >
        <!-- Navbar -->
        <f7-navbar>
            <f7-nav-left>
                <f7-link icon="icon-bars" open-panel="left"></f7-link>
            </f7-nav-left>
            <f7-nav-center sliding>{{this.$root.localization.AuditPage_main}}</f7-nav-center>

        </f7-navbar>
            <list></list>
            <div  v-if="!hasSomething">
                <f7-block inner class="nothing" >
                    {{this.$root.localization.AuditPage_nothing}}
                </f7-block>
            </div>
            <f7-fab color="blue"  class="fab_bottom" @click="open_modal_popup()">
                <!--@click="popup_open=true"-->
               <f7-icon icon="icon-plus"></f7-icon>
            </f7-fab>
            <popup_new_object   :mode="true" ></popup_new_object>
    </f7-page>
</template>

<script>
    export default {
        name: "page",
        data:function(){
          return{
              popup_open:false,
            }
        },
        created(){
            //При создании вызываем метод по получению данных о пользователе.
          let self=this;
              if (this.$root.auth_info.name===''){
                  this.$http.post('https://test.bh-app.ru/api/get-details', {}, {headers: {'Authorization': 'Bearer ' + self.$root.auth_info.token}}).then(
                      response => {
                          self.$set(self.$root.auth_info, "name", response.body.success.name);
                          self.$set(self.$root.auth_info, "email", response.body.success.email);
                          self.$set(self.$root.auth_info, "user_info", response.body.success);
                      },
                      response => {
                          console.log('error get')
                      });
              };
              //Если в локал сторейдже нет объектов(массив пустой), вызываем метод по получению данных от сервера.
              if (!self.$root.objects.length>0){
                  this.$f7.showPreloader(this.$root.localization.modal.preloader);
                  this.$root.getData_from_server().then(result=>{
                      self.$root.objects=result.obj;
                      //Вызываем метод по загрузке вложений для комментариев.
                      self.$root.down_att(result.res);
                      this.$f7.hidePreloader()
                  });
              }
        },
       computed:{
            //Проверка есть ли объекты с аудитами.
           hasSomething(){

              let result=true;
               result=(this.$root.objects.length>0)?result:false;
               return result
           }
       },
        methods:{
            open_modal_popup(){
                let $$=Dom7;
               this.$f7.popup($$('#popup_add'));
            }
        }
    }
</script>

