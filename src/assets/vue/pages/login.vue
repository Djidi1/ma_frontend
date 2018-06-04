<template>
    <!--Страница авторизации-->
        <f7-page >
        <div id="login-form" class="login_form_stl">
            <!-- Login Screen -->
            <f7-card id="center_body">

                <f7-login-screen-title >{{this.$root.localization.LoginScreen.LoginHeader}}</f7-login-screen-title>
                <hr/>
                <f7-list form class="login_list">
                    <f7-list-item>
                        <f7-label floating>{{this.$root.localization.LoginScreen.LoginPlaceholder}}</f7-label>
                        <f7-icon slot="media" fa="user" size="24px" ></f7-icon>
                        <f7-input name="username"  type="text"v-model="form_login.login"  ></f7-input>
                    </f7-list-item>
                    <f7-list-item>
                        <f7-label floating>{{this.$root.localization.LoginScreen.PasswordPlaceholder}}</f7-label>
                        <f7-icon slot="media" fa="lock" size="24px"></f7-icon>
                        <f7-input name="password" type="password"   v-model="form_login.password" ></f7-input>
                    </f7-list-item>
                    <f7-list-item class="submit_item">
                        <f7-button @click="onLogin" fill class="button_login_form" type="submit"> {{this.$root.localization.LoginScreen.SubmitButton}}</f7-button>
                    </f7-list-item>
                    <f7-list-item class="foget_item" >
                        <hr/>
                        <!--<f7-button  class="button_login_form_foget" > {{this.$root.localization.LoginScreen.FogetButton}}</f7-button>-->
                    </f7-list-item>
                </f7-list>


            </f7-card>
        </div>
        </f7-page>
</template>

<script>
    export default {
        name: "login",
        data:function(){
            return{
                form_login:{
                    login:'',
                    password:'',
                }
            }
        },
        methods:{
            onLogin:function(){
               (this.Valid_inputs())?this.send_post_login():'';
            },
            Valid_inputs(){
                let result_login=true;
                let result_password=true;
                result_login=(this.form_login.login !='')?result_login:false;
                result_password=(this.form_login.password !='')?result_password:false;
                (result_login)?(result_password)?'':this.$f7.alert(this.$root.localization.LoginScreen.Empty_input_password,this.$root.localization.LoginScreen.warning):this.$f7.alert(this.$root.localization.LoginScreen.Empty_input_login,this.$root.localization.LoginScreen.warning);
                return (result_login && result_password);
            },
            send_post_login(){
                let self=this;
               this.$f7.showPreloader(this.$root.localization.modal.preloader);
                this.$http.post(this.$root.be_server + '/api/login',{email:this.form_login.login,password:this.form_login.password}).then(response=>{
                    self.$f7.hidePreloader();
                    self.$root.auth_info={auth:true,token:response.body.success.token,name:'',email:''};
                    this.$f7.views.main.router.load({url:'/page/'});
                },response=>{
                    self.$f7.hidePreloader();
                    self.$f7.alert(self.$root.localization.LoginScreen.autherror, self.$root.localization.LoginScreen.warning);
                });
            }
        }


    }
</script>

<style scoped>
    .login_form_stl{
        background-size: cover;
        background-image: url("../../../static/background_user.jpg");
        }
    .login_form_stl hr{
        color:#9e9e9e;
        opacity: 0.1;
        margin-left:16px;
        margin-right:16px;
    }
    .login_list hr{
        margin-left: 0 !important;
        margin-right: 0 !important;
    }
</style>