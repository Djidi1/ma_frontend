<template>
	<!-- App -->
	<div id="app">
		<!-- Statusbar -->
		<f7-statusbar></f7-statusbar>
		<!-- Left Panel -->
		<f7-panel left reveal>
			<f7-view id="left-panel-view" navbar-through :dynamic-navbar="true">
				<f7-navbar title="Left Panel"></f7-navbar>
				<f7-pages>
					<f7-page>
						<f7-block-title>Load page in main view</f7-block-title>
						<f7-list>
							<f7-list-item link="/page/" title="About" link-view="#main-view" link-close-panel></f7-list-item>
							<f7-list-item  link="/login/" title="Exit" link-view="#main-view" link-close-panel @click="exit"></f7-list-item>
						</f7-list>
					</f7-page>
				</f7-pages>
			</f7-view>
		</f7-panel>

		<!-- Main Views -->
		<f7-views>
			<f7-view id="main-view" navbar-through :dynamic-navbar="true" main>
				<!-- Pages -->
				<f7-pages>



				</f7-pages>
			</f7-view>
		</f7-views>

	
	</div>
</template>

<script>

    import Login from "./assets/vue/pages/login";

    export default {
        components: {
            Login
          },
        beforeMount:function(){
            this.$nextTick(function(){
                (this.$root.check_user_auth()) ? this.go_to_page():this.go_to_login();
            })
        },
		methods:{
            exit:function (e) {
                e.preventDefault();
                console.log('exit');
				localStorage.removeItem('auth_token')
            },
            go_to_page:function(){
                this.$f7.views.main.router.load({url:'/page/'});
            },
			go_to_login:function(){
                this.$f7.views.main.router.load({url:'/login/'});
			}

		}
	}
</script>
