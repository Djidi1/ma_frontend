<template>
    <div>
        <f7-page class="cost">
            <!-- Navbar -->
            <f7-navbar  sliding class="settings" >
                <f7-nav-left back-link="Back" sliding ></f7-nav-left>
                <f7-nav-center sliding >{{this.$root.localization.SettingPage}}</f7-nav-center>
            </f7-navbar>

            <!--User_info_change-->
            <f7-block-title>{{this.$root.localization.lang.user_block}}</f7-block-title>
            <f7-list form class="user_settings">
                <f7-list-item>
                    <f7-label floating>{{this.$root.localization.lang.name}}</f7-label>
                    <f7-input type="text" v-model="user_name"/>
                </f7-list-item>
                <f7-list-item>
                    <f7-label floating>{{this.$root.localization.lang.tel}}</f7-label>
                    <f7-input type="text" disabled />
                </f7-list-item>
            </f7-list>


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
                        <f7-button @click="cancelSetting" class="abort_button"  back> {{this.$root.localization.lang.abort}}</f7-button>
                    </div>
                    <div class="col-50">
                        <f7-button fill back @click="submitSetting"> {{this.$root.localization.lang.submit}}</f7-button>
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
                curentLang:this.$root.auth_info.lang
            }
        },
        methods:{
            curLang:function(val){
              let result;
                switch (val){
                  case "ru":
                      (this.curentLang==="ru")?result=true:result=false;
                      break;
                  case "en":
                      (this.curentLang==="en")?result=true:result=false;
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
                console.log(this.user_name);
                if (this.user_name!=this.$root.auth_info.name||this.curentLang!=this.$root.auth_info.lang){
                  let new_data={"name":this.user_name,"auth":true,lang:this.curentLang}
                  this.$root.auth_info=new_data;
                }
            },
            cancelSetting:function(){

                if (this.user_name!=this.$root.auth_info.name||this.curentLang!=this.$root.auth_info.lang){
                    this.change_l(this.$root.auth_info.lang);

                }

            }
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