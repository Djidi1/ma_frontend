<template>
    <!--Панель с настройками-->
    <div>
        <f7-page name="settings" class="cost">
            <!-- Navbar -->
            <f7-navbar  sliding class="settings" >
                <f7-nav-left back-link="Back" sliding @back-click.stop="cancelSetting()"></f7-nav-left>
                <f7-nav-center sliding >{{this.$root.localization.SettingPage}}</f7-nav-center>
            </f7-navbar>

            <!--User_info_change-->
            <f7-block-title>{{this.$root.localization.lang.user_block}}</f7-block-title>
            <f7-list form class="user_settings">
                <f7-list-item>
                    <f7-label floating>{{this.$root.localization.lang.name}}</f7-label>
                    <f7-input type="text" v-model="user_name"/>
                </f7-list-item>
            </f7-list>
            <!--&lt;!&ndash;server_change&ndash;&gt;-->
            <!--<f7-list form class="user_settings">-->
                <!--<f7-list-item>-->
                    <!--<f7-label floating>{{this.$root.localization.lang.server}}</f7-label>-->
                    <!--<f7-input type="text" v-model="server"/>-->
                <!--</f7-list-item>-->
                <!--<f7-list-item>-->
                    <!--<f7-label floating>{{this.$root.localization.lang.port}}</f7-label>-->
                    <!--<f7-input type="text" v-model="port"/>-->
                <!--</f7-list-item>-->
            <!--</f7-list>-->



            <!--RadioGroup-->
            <f7-block-title>{{this.$root.localization.lang.lang_block}}</f7-block-title>
            <f7-list form>
                <f7-list-item @change="change_l('ru')" radio name="lang_radio" value="ru" :title="this.$root.localization.lang.rus" :checked="curLang('ru')"></f7-list-item>
                <f7-list-item @change="change_l('en')" radio name="lang_radio" value="en" :title="this.$root.localization.lang.en" :checked="curLang('en')"></f7-list-item>
            </f7-list>


            <!--Buttons-->
            <f7-block >
                <div class="row">
                    <div class="col-50">
                        <f7-button @click="cancelSetting" class="abort_button" > {{this.$root.localization.lang.abort}}</f7-button>
                    </div>
                    <div class="col-50">
                        <f7-button fill back @click="submitSetting"> {{this.$root.localization.lang.save}}</f7-button>
                    </div>
                </div>
            </f7-block>

        </f7-page>
    </div>

</template>

<script>

    export default {
        name: "settings",

        data:function(){
            return{
                user_name:this.$root.auth_info.name,
                curentLang:this.$root.settings,
                // server:this.$root.be_server.split('/')[this.$root.be_server.split('/').length-1].split(':')[0],
                // port:this.$root.be_server.split('/')[this.$root.be_server.split('/').length-1].split(':')[1]
            }
        },

        methods:{
            curLang:function(val){
              let result;
                switch (val){
                  case "ru":
                      result=(this.curentLang==="ru")?true:false;
                      break;
                  case "en":
                      result= (this.curentLang==="en")?true:false;
                      break;
              }
              return result;
    },
            change_l:function(val){
                //Таймер прикручен для вида, чтоб сразу резко все не скакало.
                let self=this;
                this.curentLang=val;
                switch (val){
                    case "ru":
                        this.$f7.showPreloader(self.$root.localization.modal.preloader);
                        setTimeout(function(){
                            self.$root.lang_select(val);
                            self.$f7.hidePreloader();
                        },500)
                        break;
                    case "en":
                        this.$f7.showPreloader(self.$root.localization.modal.preloader);
                        setTimeout(function(){
                            self.$root.lang_select(val);
                            self.$f7.hidePreloader();
                        },500)
                        break;
                }
            },
            submitSetting:function(){
                if (this.user_name!=this.$root.auth_info.name||this.curentLang!=this.$root.settings
                    // ||this.server!=this.$root.be_server.split('/')[this.$root.be_server.split('/').length-1].split(':')[0]
                    // ||this.port!=this.$root.be_server.split('/')[this.$root.be_server.split('/').length-1].split(':')[1]
                ){
                   //this.$set(this.$root.auth_info,'name',this.user_name);
                    this.$root.auth_info={name:this.user_name,email:this.$root.auth_info.email,token:this.$root.auth_info.token,auth:true,user_info:this.$root.auth_info.user_info};
                    this.$root.settings=this.curentLang;
                    // this.$root.be_server="https://"+this.server+":"+this.port;
                }
            },
            cancelSetting:function(){
                let self=this;
                let duration=0;
                if  (this.user_name!=this.$root.auth_info.name||this.curentLang!=this.$root.settings
                    // ||this.server!=this.$root.be_server.split('/')[this.$root.be_server.split('/').length-1].split(':')[0]
                    // ||this.port!=this.$root.be_server.split('/')[this.$root.be_server.split('/').length-1].split(':')[1]
                    )
                    {
                    this.change_l(this.$root.settings);
                    duration=600;
                }
                setTimeout(function(){self.$f7.views[0].back();},duration)
            },

        }
    }
</script>

<style scoped>
.settings {
    background-color: transparent;
    color: #222222;
    border-bottom: 1px solid #f7f7f7;
}
.user_settings{
    margin-top:0!important;
}


</style>