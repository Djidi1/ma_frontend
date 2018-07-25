<template>
    <!--Страница чек-листа-->
    <f7-page with-subnavbar>
        <f7-navbar back-link="Back" sliding  >
            <f7-nav-center sliding>  {{check.title}} </f7-nav-center>
            <f7-nav-right v-if="!uploaded">
                <div v-if="!this.$root.online" style="margin-right:10px; font-size:24px">
                    <network></network>
                </div>
            </f7-nav-right>
            <f7-subnavbar sliding class="custom_sub">
                <f7-searchbar
                        :init="true"
                        disable-link-text="Cancel"
                        searchList="#search-list"
                        :placeholder="this.$root.localization.SearchBar.title"
                        :clear-button="true">
                </f7-searchbar>


            </f7-subnavbar>
        </f7-navbar>

        <div class="searchbar-overlay"></div>
        <div class="blck_info">
        <f7-card>
            <!--<f7-card-header>-->
                <!--<f7-grid style="width:100%; min-height:34px">-->
                    <!--<f7-col width="70" style="line-height: 34px">{{this.$root.localization.AuditPage.check_list_position}}</f7-col>-->
                    <!--<f7-col width="30" style="text-align: center"><i :class="status" aria-hidden='true'></i> </f7-col>-->
                <!--</f7-grid>-->
            <!--</f7-card-header>-->
            <f7-card-content class="check_content">
                <check_item  :data_item="check.requirement" :read="uploaded"></check_item>
                <f7-list class="searchbar-not-found check_list_items">
                    <f7-list-item :title="this.$root.localization.SearchBar.nothing"></f7-list-item>
                </f7-list>
            </f7-card-content>
        </f7-card>



        </div>
        <f7-toolbar bottom :no-shadow="true" v-if="!uploaded">
            <f7-link class="toolbar_custome_link" @click="abort_check_list()"><div style="font-size:30px"><restore></restore></div></f7-link>
            <f7-link class="toolbar_custome_link" @click="check_all_check_list()"><div style="font-size:30px"><check_all></check_all></div></f7-link>
        </f7-toolbar>

    </f7-page>
</template>

<script>
    import  trash from "vue-material-design-icons/delete.vue"
    import  close_all from "vue-material-design-icons/close.vue"
    import  restore from "vue-material-design-icons/backup-restore.vue"
    import  check_all from "vue-material-design-icons/check.vue"
    import  network from "vue-material-design-icons/network-strength-off-outline.vue"


    export default {
        components:{
            trash,
            close_all,
            restore,
            check_all,
            network

        },
        name: "check",
        props:{
            audit_id:{type:String},
            check_id:{type:String}
        },
        data:function(){
            return{
                check:{},
                uploaded:false,
                items: (function () {
                    var it = [];
                    for (var i = 0; i < 5; i++) it.push(i+1);
                    return it;
                })()
            }
        },
        created(){
            let self=this;
            this.$root.objects.forEach(function(obj){
                obj.audits.forEach(function(audit){
                    if (Number(audit.id)===Number(self.audit_id)|| audit.id===self.audit_id){
                    self.uploaded=audit.upload;
                    audit.check_list.forEach(function(ch){
                        self.check=(ch.id===Number(self.check_id))?ch:self.check;
                    })
                    }
                })
            })
        },
        computed:{
            status(){
                let self=this;
                let result;
                result=self.upload_st(self.check);
                return result;
            }
        },
        methods:{
            check_all_check_list(){
                this.$f7.mainView.back();
            },
            upload_st(str){
                let result=true;
                let new_str=true;
                str.requirement.forEach(function(req){
                    new_str=(req.status===0)?new_str:false;
                    result=(req.status===1)?result:false;
                });
                return (new_str)?"":(result)?"fa fa-check fa-2x audit_good":"fa fa-times fa-2x audit_wrong";
            },
            abort_check_list(){

                let self=this;
                self.check.requirement.forEach(function(req,j){
                        req.status=0;
                        self.$ls.set('objects',self.$root.objects);

                });

            },
            check_list_status(){
                let self=this;
                self.check.requirement.forEach(function(req,j){
                    req.status=-1;
                    self.$ls.set('objects',self.$root.objects);

                });

            },
            remove_check(){
                let self=this;
                this.$f7.confirm("",this.$root.localization.modal.modalTextConf, function () {
                    self.$root.objects.forEach(function(obj){
                        obj.audits.forEach(function(audit){
                           if (Number(audit.id)===Number(self.audit_id)|| audit.id===self.audit_id) {
                               audit.check_list.forEach(function(ch,j){
                                  if (ch.id===Number(self.check_id)){
                                      audit.check_list.splice(j,1);
                                  }
                               })
                           }
                        });
                    });
                    self.$ls.set('objects',self.$root.objects);
                    self.$f7.views.main.back();
                })
            }
        }

    }
</script>

<style scoped>

</style>