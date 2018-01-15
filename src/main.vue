<template>
	<!-- App -->
	<div id="app">
		<!-- Statusbar -->
		<f7-statusbar></f7-statusbar>
		<!-- Left Panel -->
		<f7-panel left cover>
			<f7-view id="left-panel-view">
				<f7-pages>
					<f7-page>
						<div class="left-panel-header user_back">
									<avatar :fullname="this.$root.auth_info.name" size="70" color="#c65c44"></avatar>
						</div>
						<f7-list class="mleft_menu_block">
							<f7-list-item  link="/page/" :title="this.$root.localization.LeftMenu.Audit" link-view="#main-view" link-close-panel media="<i class='fa fa-calendar-check-o ' aria-hidden='true'></i>"></f7-list-item>
							<f7-list-item link="/page/" :title="this.$root.localization.LeftMenu.Object" link-view="#main-view" link-close-panel media="<i class='fa fa-building-o' aria-hidden='true'></i>"></f7-list-item>
							<f7-list-item link="/settings/" :title="this.$root.localization.LeftMenu.Settings"  media="<i class='fa fa-cog ' aria-hidden='true'></i>"></f7-list-item>
							<f7-list-item  @click="exit" :title="this.$root.localization.LeftMenu.Exit" link-view="#main-view"  media="<i class='fa fa-sign-out' aria-hidden='true'></i>"></f7-list-item>
						</f7-list>
					</f7-page>
				</f7-pages>
			</f7-view>
		</f7-panel>

		<!-- Main Views -->
		<f7-views>
			<f7-view id="main-view" navbar-through :dynamic-navbar="true" main>
				<!-- Pages -->
				<f7-pages >
				</f7-pages>
			</f7-view>
		</f7-views>


	</div>
</template>

<script>
    import Avatar from './assets/vue/Components/avatar.vue'
    import User_name from './assets/vue/Components/user_name.vue'



    export default {
        components:{
            avatar: Avatar,
			user_name:User_name
		},
        beforeMount:function(){
            this.$nextTick(function(){
				this.$root.changeModalLang();
                (this.$root.check_user_auth()) ? this.go_to_page():this.go_to_login();
            })
        },
		methods:{
            exit:function () {
                self=this;
                this.$f7.confirm("",this.$root.localization.modal.modalTextConfExit, function () {
                    let user_info={name:'',auth:false,lang:self.$root.auth_info.lang};
                    self.$root.auth_info=user_info;
                    self.$f7.closePanel();
                    self.go_to_login();
                });
            },
            go_to_page:function(){
                this.$f7.views.main.router.load({url:'/page/'});
            },
			go_to_login:function(){
                this.$f7.views.main.router.load({url:'/login/'});
			}


		},

	}
</script>
