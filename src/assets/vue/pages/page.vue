<template>
        <f7-page pull-to-refresh @ptr:refresh="this.$root.onRefresh">
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
            <f7-fab color="blue"  class="fab_bottom" @click="popup_open=true">
               <f7-icon icon="icon-plus"></f7-icon>
            </f7-fab>
            <popup_new_object :opendPopup="popup_open" @close="popup_open=false" :mode="true" ></popup_new_object>
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
          let self=this;
          if (this.$root.auth_info.name===''){
              this.$http.post('https://test.bh-app.ru/api/get-details',{},{headers:{'Authorization':'Bearer ' + self.$root.token}}).then(
                  response=>{
                      self.$root.auth_info={name:response.body.success.name,email:response.body.success.email,user_id:response.body.success.id,auth:true};
                      self.$root.user_info=response.body.success;
                  },
                  response=>{
                      console.log('error get')
                  });
              this.$root.getData_from_server();
          }
        },
       computed:{
           hasSomething(){
              let result=true;
               result=(this.$root.audits.length>0)?result:false;
               result=(this.$root.objects.length>0)?result:false;
               return result
           }
       }
    }
</script>

