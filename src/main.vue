<template>
	<!-- App -->
	<div id="app">
		<!-- Statusbar -->
		<f7-statusbar></f7-statusbar>
		<!-- Left Panel -->
		<f7-panel left cover  >
			<f7-view id="left-panel-view" v-if="this.$root.auth_info.auth">
				<f7-pages>
					<f7-page>
						<div class="left-panel-header user_back">
									<avatar :fullname="this.$root.auth_info.name" :email="this.$root.auth_info.email" size="70" color="#c65c44"></avatar>
						</div>
						<f7-list class="mleft_menu_block">
							<f7-list-item  link="/page/" :title="this.$root.localization.LeftMenu.Audit" link-view="#main-view" link-close-panel  :badge="count_new" badge-color="blue">
								<div slot="media" style="font-size:25px">
									<audit_icon></audit_icon>
								</div>
							</f7-list-item>
							<f7-list-item link="/settings/" :title="this.$root.localization.LeftMenu.Settings" >
								<div slot="media" class="setting_ii">
									<setting_icon></setting_icon>
								</div>
							</f7-list-item>
							<f7-list-item  @click="exit" :title="this.$root.localization.LeftMenu.Exit" link-view="#main-view" >
								<div slot="media" style="font-size:25px">
									<exit_icon></exit_icon>
								</div>
							</f7-list-item>
						</f7-list>
					</f7-page>
				</f7-pages>
			</f7-view>
			<f7-view v-else>
				<f7-pages>
					<f7-page>
						<div class="dop_login-form">
							<f7-card class="center_body" >
								<f7-navbar  sliding class="settings" >
									<f7-nav-left back-link="Back" sliding @back-click.stop="cancelSetting()"></f7-nav-left>
									<f7-nav-center sliding >{{this.$root.localization.SettingPage}}</f7-nav-center>
								</f7-navbar>

								<!--server_change-->
								<!--server_change-->
								<f7-list form class="user_settings">
									<f7-list-item>
										<f7-label floating>{{this.$root.localization.lang.server}}</f7-label>
										<f7-input type="text" v-model="server"/>
									</f7-list-item>
									<!--<f7-list-item>-->
										<!--<f7-label floating>{{this.$root.localization.lang.port}}</f7-label>-->
										<!--<f7-input type="text" v-model="port"/>-->
									<!--</f7-list-item>-->
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
											<f7-button @click="cancelSetting" class="abort_button" > {{this.$root.localization.lang.abort}}</f7-button>
										</div>
										<div class="col-50">
											<f7-button fill back @click="submitSetting"> {{this.$root.localization.lang.save}}</f7-button>
										</div>
									</div>
								</f7-block>

							</f7-card>
						</div>
					</f7-page>
				</f7-pages>
			</f7-view>
		</f7-panel>

		<!-- Main Views -->
		<f7-views>
			<f7-view id="main-view"   main>
				<!-- Pages -->
				<f7-pages  navbar-through>


				</f7-pages>
			</f7-view>
		</f7-views>


	</div>
</template>

<script>
    import Avatar from './assets/vue/Components/avatar.vue'
    import User_name from './assets/vue/Components/user_name.vue'
    import  audit_icon from "vue-material-design-icons/calendar-multiple-check.vue"
    import  setting_icon from "vue-material-design-icons/settings.vue"
    import  exit_icon from "vue-material-design-icons/exit-to-app.vue"



    export default {
        components:{
            avatar: Avatar,
			user_name:User_name,
                audit_icon,
                setting_icon,
                exit_icon

		},
		data:function(){
            return {
                server:this.$root.be_server.split('/')[this.$root.be_server.split('/').length-1].split(':')[0],
                port:this.$root.be_server.split('/')[this.$root.be_server.split('/').length-1].split(':')[1],
                curentLang:this.$root.settings,

			}
		},
		//перед тем как отрисуется станица.
        beforeMount:function(){
            this.$nextTick(function(){

                //Устанавливаем язык дял модальных окон.
				this.$root.changeModalLang();
				//Проверяем авторизован ли пользователь и перенаправляем его на нужную страницу.
                (this.$root.check_user_auth()) ? this.go_to_page():this.go_to_login();
            })
        },
		computed:{
            //Подсчет НОВЫХ аудитов.
            count_new(){
                let count=0;
                this.$root.objects.forEach(function(obj){
                    obj.audits.forEach(function(ad){
						(!ad.upload)?count++:'';
					})
				});
				return count;
			}
		},
		methods:{
            //Выход и очищение локал сторейджа.
            exit:function () {
                self=this;
                this.$f7.confirm("",this.$root.localization.modal.modalTextConfExit, function () {
                    self.$f7.closePanel();
                    self.$root.auth_info={auth:false,token:'',user_info:{name:'',email:''}};
                    self.$root.objects=[];

                    self.go_to_login();
                });
            },
			//Переход на страницу с аудитами.
            go_to_page:function(){
                this.$f7.views.main.router.load({url:'/page/'});
            },
			//Переход на страницу авторизации.
			go_to_login:function(){
                this.$f7.views.main.router.load({url:'/login/'});
			},
            close_left_panel(){
                this.$f7.closePanel();
			},
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
                this.server=this.$root.be_server.split('//')[1];
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
                if (this.curentLang!=this.$root.settings||
                    this.$root.server!="https://"+this.server){
                    this.$root.settings=this.curentLang;
                    this.$root.server=this.server;
                    // let tmpPort=(this.port!=='')?":"+this.port.split(':')[0]:'';
                    // this.$root.port=this.port;
                    this.$root.be_server="https://"+this.server;
                }
                this.$f7.closePanel();
            },
            cancelSetting:function(){
                let self=this;
                if (this.curentLang!=this.$root.settings||
                    this.$root.server!="https://"+this.server){
                    this.change_l(this.$root.settings);
                }
                self.$f7.closePanel();
            },


		},


	}
</script>
<style>
	.settings {
		background-color: transparent;
		color: #222222;
		border-bottom: 1px solid #f7f7f7;
	}

</style>
