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
                    <f7-input type="text" v-model="this.user_name"/>
                </f7-list-item>
                <f7-list-item>
                    <f7-label floating>{{this.$root.localization.lang.tel}}</f7-label>
                    <f7-input type="text" disabled />
                </f7-list-item>
            </f7-list>


            <!--RadioGroup-->
            <f7-block-title>{{this.$root.localization.lang.lang_block}}</f7-block-title>
            <f7-list form>
                <f7-list-item radio name="lang_radio" value="ru" :title="this.$root.localization.lang.rus" :checked="curLang('ru')"></f7-list-item>
                <f7-list-item radio name="lang_radio" value="en" :title="this.$root.localization.lang.en" :checked="curLang('en')"></f7-list-item>
            </f7-list>


            <!--Buttons-->
            <f7-block >
                <div class="row">
                    <div class="col-50">
                        <f7-button class="abort_button" back > {{this.$root.localization.lang.abort}}</f7-button>
                    </div>
                    <div class="col-50">
                        <f7-button fill > {{this.$root.localization.lang.submit}}</f7-button>
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
                user_name:this.$root.auth_info.name
            }
        },
        methods:{
            curLang:function(val){
              let result;
                switch (val){
                  case "ru":
                      (this.$root.auth_info.lang==="ru")?result=true:result=false;
                      break;
                  case "en":
                      (this.$root.auth_info.lang==="en")?result=true:result=false;
                      break;
              }
              return result;
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