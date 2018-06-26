<template>
    <!--Лист с объектами и аудитаи-->
    <div class="blck_info">
            <f7-list media-list  class=" searchbar-found " id="list_of_objects">
                <f7-list-group v-if="objects.audits.length>0" v-for="(objects,index) in this.$root.objects" :key="index">
                    <f7-list-item

                            group-title>
                        {{objects.group_title}}<br>
                        {{objects.title||"---"}}
                    </f7-list-item>
                    <f7-list-item v-for="(acrd,acrd_index) in array_few(objects)" :key="acrd_index"
                                  :link="'/audit/'+index+'/'+acrd_index"
                                  :id="'id_'+acrd.id"
                                  :title="$root.localization.AuditPage.audit+' № '+acrd.id"
                                  :subtitle="data_formta(acrd.created_at)"
                                  :text="check_list_names(acrd)"
                                  swipeout>
                        <!--:media="realStatus(acrd)"-->
                        <f7-swipeout-actions v-if="!acrd.upload">
                            <f7-swipeout-button @click="send_data(acrd,acrd.id)"><div style="font-size:35px"><send></send></div></f7-swipeout-button>
                            <f7-swipeout-button @click="edit_data(acrd.id)"><div style="font-size:35px"><pencil></pencil></div></f7-swipeout-button>
                            <f7-swipeout-button @click="delete_data(index,acrd.id,acrd_index)"><div style="font-size:35px"><trash></trash></div></f7-swipeout-button>
                        </f7-swipeout-actions>
                        <div slot="media">
                            <div style="text-align: center">
                                <!--<div v-if="(acrd.upload)? false:true" style="color:#2196F3; font-size:45px;">-->
                                    <!--<alert_box ></alert_box>-->
                                <!--</div>-->
                                <!--b51313-->
                                <div v-if="(!acrd.upload)" >
                                    <div v-if="(check_audit_status(acrd))" class="new_audit_icon "><new_audit_icon></new_audit_icon> </div>
                                    <i v-else class="icon cloud_no_sink cloud"> </i>
                                    <!--<close_box ></close_box>-->
                                </div>
                                <div  v-else >
                                    <i class="icon could_ok cloud"> </i>
                                </div>
                            </div>
                            <!--<div class="item-title-row" style="font-size:0.6em; width:80px; padding-right:5px; margin-bottom:5px; transform:translateY(-7px)">{{data_formta(acrd.created_at)}}</div>-->
                        </div>
                        <popup_audit_edit :audit="acrd"></popup_audit_edit>
                    </f7-list-item>

                </f7-list-group>



            </f7-list>












        <!--<f7-card v-for="(item,index) in this.$root.objects" :key="index" v-if="hasAudits(index)">-->
            <!--<f7-card-header>-->
                <!--<div class="obj_info">-->
                    <!--<div class="row  no-gutter">-->
                        <!--<div class="col-70"> {{item.title}}</div>-->
                        <!--<div class="col-70  dop_info">{{item.address}}</div>-->
                        <!--<div class="col-30 dop_info count_info">{{countFrom(item)}}</div>-->
                    <!--</div>-->
                <!--</div>-->
            <!--</f7-card-header>-->
            <!--<f7-card-content>-->
                <!--<f7-list media-list class="no-link-icon">-->
                    <!--<f7-list-item v-for="(acrd,acrd_index) in array_few(item)" :key="acrd_index"-->
                                  <!--:link="'/audit/'+index+'/'+acrd_index"-->
                                  <!--:id="'id_'+acrd.id"-->
                                  <!--:title="acrd.title || $root.localization.AuditPage.audit"-->
                                  <!--:subtitle="data_formta(acrd.created_at)"-->
                                  <!--:text="check_list_names(acrd)"-->


                                  <!--swipeout>-->
                        <!--&lt;!&ndash;:media="realStatus(acrd)"&ndash;&gt;-->
                        <!--<f7-swipeout-actions v-if="!acrd.upload">-->
                            <!--<f7-swipeout-button @click="send_data(acrd,acrd.id)"><i class="fa fa-paper-plane swipe_btn" aria-hidden="true"></i></f7-swipeout-button>-->
                            <!--<f7-swipeout-button @click="edit_data(acrd.id)"><i class="fa fa-pencil swipe_btn" aria-hidden="true"></i></f7-swipeout-button>-->
                            <!--<f7-swipeout-button @click="delete_data(index,acrd.id,acrd_index)"><i class="fa fa-trash-o swipe_btn" aria-hidden="true"></i></f7-swipeout-button>-->
                        <!--</f7-swipeout-actions>-->
                        <!--<div slot="content">-->
                            <!--<div style="padding-right:25px;">-->
                                <!--<div v-if="(acrd.upload)? false:true" style="color:#2196F3; font-size:45px;">-->
                                    <!--<alert_box ></alert_box>-->
                                <!--</div>-->
                                <!--<div v-if="(acrd.upload) ? !upload_st(acrd) : false" style="color:#b51313; font-size:45px;">-->
                                    <!--<close_box ></close_box>-->
                                <!--</div>-->
                                <!--<div  v-if="(acrd.upload) ? upload_st(acrd) : false" style="color:#019341; font-size:45px;">-->
                                    <!--<ready_box ></ready_box>-->
                                <!--</div>-->
                            <!--</div>-->
                        <!--</div>-->
                        <!--<popup_audit_edit :audit="acrd"></popup_audit_edit>-->
                    <!--</f7-list-item>-->
                <!--</f7-list>-->
            <!--</f7-card-content>-->
        <!--</f7-card>-->
    </div>
</template>

<script>
    import  new_audit_icon from "vue-material-design-icons/alert-circle-outline.vue"
    import  pencil from "vue-material-design-icons/pencil.vue"
    import  send from "vue-material-design-icons/send.vue"
    import  trash from "vue-material-design-icons/delete.vue"

    export default {
        components:{
            pencil,
            send,
            trash,
            new_audit_icon
        },
        name: "list_audit",
        data: function () {
            return {
                data_storage: this.$root.objects
            }
        },
        methods: {
            //Статус для аудита. Графииский символ с боку от ссылки на аудит.
            // realStatus(str) {
            //     let self = this;
            //     let result;
            //     result = (str.upload) ? self.upload_st(str) : self.stat(str);
            //     return result;
            // },

            //Получение статуса аудита если он загружен.
            check_audit_status(str){
                let self = this;
                let result;
                result = (!str.upload) ? self.upload_st(str) : false;
                return result;
            },
            upload_st(str) {
                let result = true;
                let self = this;
                str.check_list.forEach(function (itm) {
                    itm.requirement.forEach(function (req) {
                        if (!req.disabled) {

                            result = (req.status != 0) ? result : false;
                        }
                    });
                });
                return (result) ? false : true;
            },
            //Если не загружен всегда считается новым.
            stat(str) {
                return "fa fa-circle fa-1x audit_new"
            },

            check_list_names(itm){
                let result=""
                itm.check_list.forEach(function(name){
                    result=result+name.title+",<br> "
                });

               return result.substring(0,result.length-6)
            },
            countFrom(item) {
                let all = item.audits.length;
                return (all > 5) ? "5 " + this.$root.localization.AuditPage_count + " " + all : '';
            },

            array_few(obj) {
                return this.$_.sortBy(obj.audits,"created_at").reverse();
            },
            hasAudits(id) {
                return (this.$root.objects[id].audits.length > 0);
            },
            //Ковертируем дату в удобный вид.
            data_formta(data) {
                data = new Date(data);
                // let curSec = ('0' + data.getSeconds()).substr(-2);
                let curMin = ('0' + data.getMinutes()).substr(-2);
                let curDay = ('0' + data.getDate()).substr(-2);
                let curMounth = ('0' + (data.getMonth() + 1));
                return curDay + "." + curMounth + "." + data.getFullYear() + " " + data.getHours() + ":" + curMin/* + ":" + curSec*/;
            },
            send_data(item, index) {
                let $$ = Dom7;
                let self=this;
                (item.check_list.length > 0) ?
                    (self.$root.check_audit_positions(item))?
                         self.$root.send_to_serv_audit(item)
                        :self.$f7.alert(self.$root.localization.AuditPage.check_not_complete, self.$root.localization.pop_up.warning)
                         : self.$f7.alert(self.$root.localization.pop_up.no_check_list,self.$root.localization.pop_up.warning);
                this.$f7.swipeoutClose($$('#id_' + index));
            },
            edit_data(index) {
                let $$ = Dom7;
                this.$f7.swipeoutClose($$('#id_' + index));
                this.$f7.popup($$('#popup_add_audit_' + index));
            },
            delete_data(obj, id, acrd_index) {
                let $$ = Dom7;
                let self = this;
                this.$f7.confirm("", this.$root.localization.modal.modalTextConf, function () {
                    self.$f7.swipeoutClose($$('#id_' + id));
                    self.$root.objects[obj].audits.splice(acrd_index, 1);
                    self.$ls.set('objects', self.$root.objects);
                });
            }

        }
    }
</script>

<style scoped>
    .dop_info {
        font-size: 15px;
        color: #757575;
    }

    .count_info {
        text-align: center;
    }

    .show_border {
        border-bottom: 1px solid #ddd
    }



</style>