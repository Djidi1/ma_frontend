<template>
    <!--Страница аудитов-->
    <f7-page name="audits_main" pull-to-refresh @ptr:refresh="this.$root.onRefresh" with-subnavbar>
        <!-- Navbar -->
        <f7-navbar>
            <f7-nav-left>
                <f7-link icon="icon-bars" open-panel="left"></f7-link>
            </f7-nav-left>
            <f7-nav-center sliding>
                {{this.$root.localization.AuditPage_main}}
            </f7-nav-center>
            <f7-nav-right>
                <div v-if="!this.$root.online" style="margin-right:10px; font-size:24px">
                    <network></network>
                </div>
                <f7-link @click="open_modal_popup()" ><div style="font-size:30px"><plus ></plus></div></f7-link>
            </f7-nav-right>

            <f7-subnavbar sliding class="custom_sub">
                <f7-searchbar
                        :init="true"
                        disable-link-text="Cancel"
                        searchList="#list_of_objects"
                        searchIn=".item-title,.item-text"
                        :hideGroups="false"
                        :placeholder="this.$root.localization.SearchBar.title"
                        :clear-button="true">
                </f7-searchbar>


            </f7-subnavbar>
        </f7-navbar>

        <div class="searchbar-overlay"></div>
        <list></list>
        <!--<transition appear mode="out-in" name="slide-app">-->
        <!--<div class="onlinebar" v-if="this.$root.online">-->
            <!--<div class="row" v-if="this.$root.show_online_msg">-->
                <!--<div class="col-100" style="line-height: 38px; text-align: center" >-->
                    <!--{{this.$root.localization.go_online}}-->
                <!--</div>-->
            <!--</div>-->
        <!--</div>-->
        <!--</transition>-->
        <f7-list class="searchbar-not-found check_list_items">
            <f7-list-item :title="this.$root.localization.SearchBar.nothing"></f7-list-item>
        </f7-list>
    </f7-page>
</template>

<script>
    import  plus from "vue-material-design-icons/plus.vue"
    import  network from "vue-material-design-icons/network-strength-off-outline.vue"
    export default {
        name: "page",
        components:{
            plus,
            network
        },
        data: function () {
            return {
                popup_open: false
            }
        },
        created() {
            //При создании вызываем метод по получению данных о пользователе.
            let self = this;
            if (this.$root.auth_info.name === '') {
                this.$http.post(this.$root.be_server + '/api/get-details', {}, {headers: {'Authorization': 'Bearer ' + self.$root.auth_info.token}}).then(
                    response => {
                        self.$set(self.$root.auth_info, "name", response.body.success.name);
                        self.$set(self.$root.auth_info, "email", response.body.success.email);
                        self.$set(self.$root.auth_info, "user_info", response.body.success);
                    }
                );
            }
            //Если в локал сторейдже нет объектов(массив пустой), вызываем метод по получению данных от сервера.
            if (!self.$root.objects.length > 0) {
                this.$f7.showPreloader(this.$root.localization.modal.preloader);
                if(this.$root.online) {
                    this.$root.getData_from_server().then(result => {
                        self.$root.objects = result.obj;
                        //Вызываем метод по загрузке вложений для комментариев.
                        self.$root.down_att(result.res);
                        this.$f7.hidePreloader()
                    });
                }else{
                    this.$f7.alert(this.$root.localization.no_connection,this.$root.localization.pop_up.warning,function(){
                        this.$f7.hidePreloader()
                    });
                }
            }
        },
        methods: {
            open_modal_popup() {
                this.$f7.views.main.router.load({url:'/add_audit/'});
            }
        }
    }
</script>

