<template>
        <f7-page>
        <div id="login-form">
            <!-- Login Screen -->
            <f7-card id="center_body">
                <f7-login-screen-title >Login IN</f7-login-screen-title>
                <f7-list form>
                    <f7-list-item>
                        <f7-icon slot="media" fa="user" size="24px" ></f7-icon>
                        <f7-input name="username" placeholder="Login" type="text"v-model="form_login.login"  ></f7-input>
                    </f7-list-item>
                    <f7-list-item>
                        <f7-icon slot="media" fa="lock" size="24px"></f7-icon>
                        <f7-input name="password" type="password" placeholder="Password"  v-model="form_login.password" ></f7-input>
                    </f7-list-item>
                    <f7-list-item class="submit_item">
                        <f7-button @click="onLogin" fill class="button_login_form" type="submit"> Submit</f7-button>
                    </f7-list-item>
                    <f7-list-item class="foget_item" >
                        <f7-button  class="button_login_form_foget" > Foget password?</f7-button>
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
                if (this.form_login.login == "" || this.form_login.password == "") {
                    this.$f7.alert('Login or Passsword are empty!', 'Warning')
                } else {
                    if (this.form_login.login == "Kon" && this.form_login.password == "password") {
                        //Change auth status
                        this.$root.auth=true;
                        //Place in local  storage
                        localStorage.setItem('auth_token','somecode')
                       this.$f7.views.main.router.load({url:'/page/'});
                    } else {
                        this.$f7.alert('Login or Passsword are wrong!', 'Warning');
                    }
                }
            }
        }


    }
</script>

<style scoped>

</style>