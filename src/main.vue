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
							<!--<f7-list-item link="/object/" :title="this.$root.localization.LeftMenu.Object" link-view="#main-view" link-close-panel media="<i class='fa fa-building-o' aria-hidden='true'></i>"></f7-list-item>-->
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
								<f7-link class="dop_link_login" @click="close_left_panel()">
									<div>Mobile Audit</div>
									<div class="log_left"></div>
                                </f7-link>
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
		<!--Popup view-->
		<!--<popup_new_object :mode="true"></popup_new_object>-->

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
			}


		},

	}
</script>
