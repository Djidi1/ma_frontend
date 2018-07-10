<template>
    <!--Страница аудита-->
    <f7-page name="audit">
        <!-- Navbar -->
        <f7-navbar back-link="Back" sliding  >
            <f7-nav-center sliding> {{$root.localization.AuditPage.audit+' № '+audit.id}}</f7-nav-center>
            <f7-nav-right v-if="!this.audit.upload">
                <f7-link @click="open_edit()" ><div style="font-size:24px"><pencil ></pencil></div></f7-link>
                <!--<f7-link @click="remove_audit"> <div style="font-size:24px"><trash></trash></div></f7-link>-->
            </f7-nav-right>
        </f7-navbar>
        <div class="blck_info">

            <f7-list media-list v-if="hasCheck_list"  style="margin-bottom: 0!important;"  >
                    <f7-list-item class="deff"  group-title :title="this.$root.localization.AuditPage.check_list">
                    </f7-list-item>
                    <f7-list-item  class="item_audit" v-for="(check,id) in this.audit.check_list" :key="id" :title="check.title" :link="'/check/'+audit.id+'/'+check.id">
                        <div slot="media" style="padding-top:2px;padding-bottom:2px">
                            <div style="font-size:30px;">
                                <div v-if="new_str(check)" style="color:#DAA520;">
                                    <alert_box ></alert_box>
                                </div>
                                <div v-if="(new_str(check))?false:!upload_st(check)" style="color:#b51313;" >
                                    <close_box ></close_box>
                                </div>
                                <div  v-if="upload_st(check)" style="color:#019341; ">
                                    <ready_box ></ready_box>
                                </div>
                            </div>
                        </div>
                    </f7-list-item>


                <f7-list-item class="new_text_comm" >
                    <text_area :data_set="this.audit.comments" :is_audit="true" :read="this.audit.upload"></text_area>
                </f7-list-item>
            </f7-list>
            <f7-list v-else>
                <f7-list-item  :title=this.$root.localization.pop_up.no_check_list ></f7-list-item>
            </f7-list>



        </div>
        <f7-toolbar bottom :no-shadow="true" v-if="!uploaded">
            <f7-link></f7-link>
            <f7-link class="toolbar_custome_link" @click="send_results()"><div style="font-size:18px; transform:translateY(-2%)">
                {{this.$root.localization.AuditPage.audit_send_btn}}&nbsp&nbsp </div>
                <div style="font-size:30px"><send></send></div>
            </f7-link>
            <f7-link></f7-link>
        </f7-toolbar>
    </f7-page>
</template>

<script>
    import Popup_audit_edit from "src/assets/vue/pages/popup_edit_audit";
    import SingleComment from "src/assets/vue/Components/single-comment";
    import  pencil from "vue-material-design-icons/pencil.vue"
    import  trash from "vue-material-design-icons/delete.vue"
    import  alert_box from "vue-material-design-icons/alert-circle-outline.vue"
    import  close_box from "vue-material-design-icons/close.vue"
    import  ready_box from "vue-material-design-icons/check.vue"
    import  send from "vue-material-design-icons/send.vue"
    let $$=Dom7;
    export default {
        components: {Popup_audit_edit,
            SingleComment,
            send,
            pencil,
            trash,
            alert_box,
            close_box,
            ready_box
        },
        name: "audit",
        props: {
            id: { type: String},
            array_index:{type:String}
        },
        data:function() {
            return {
                audit:{},
                acordianId:0,
                block_height:'',
                popup_open:false,
                array_index_save:this.array_index
            }
        },
        mounted:function(){

            //Установка высоты для блока с иконкой статусом аудита.
            this.$nextTick(function () {

                this.block_height=this.status_style()
            })
        },
        created:function(){
            //Берем нужный аудит при помощи идентификаторов которые пришли через пропсы.
            let cur_obj=this.$_.findWhere(this.$root.objects,{id:Number(this.array_index)});
            this.audit=(this.$_.findWhere(cur_obj.audits, {id:Number(this.id)}));
            // =this.$root.objects[this.array_index].audits[this.id];
        },
        computed:{
            //Проверка есть ли чек листы.
            hasCheck_list(){
                return (this.audit.check_list.length>0);
            },
            //Форматирование даты.
            data_format(){
                let data=new Date(this.audit.created_at);
                let curSec=('0'+data.getSeconds()).substr(-2);
                let curMin=('0'+data.getMinutes()).substr(-2);
                let curDay=('0'+data.getDate()).substr(-2);
                let curMounth=('0'+(data.getMonth()+1));
                let date_for_text=curDay+"/"+curMounth+"/"+data.getFullYear()+" "+data.getHours()+":"+curMin+":"+curSec;
                return date_for_text;
            },
            //Проверка загружен ли аудита на сервер.
            uploaded(){
                return (this.audit.upload)?true:this.all_cheked();
            },

            //Кол-во комментариве к аудиту.
            comment_audit_count(){
                return (this.audit.comments.length>0)?"<i class='fa fa-commenting-o' aria-hidden='true'></i> "+this.audit.comments.length:"<i class='fa fa-commenting-o' aria-hidden='true'></i>";
            },
            hasComment(){
                return (this.audit.comments.length>0);
            }
        },
        methods:{
            all_cheked(){
                let self=this;
                let result=false;
                this.audit.check_list.forEach(function(chk){
                    result=self.new_str(chk);
                });
                return result;
            },
            //Отправка данных по аудиту
            send_results(){
               ( this.audit.check_list.length>0)?
                   (this.$root.check_audit_positions(this.audit))?
                    this.$root.send_to_serv_audit(this.audit)
                       :this.$f7.alert(this.$root.localization.AuditPage.check_not_complete, this.$root.localization.pop_up.warning)
                        : this.$f7.alert(this.$root.localization.pop_up.no_check_list,this.$root.localization.pop_up.warning);

            },
            //Расчет высоты для блока с иконкой статусом аудита.
            status_style(){
                let height_block=$$('.audit_obj').height();
                return {"height":height_block+"px"}
            },

            //Удаление комментария.
            remove_comment(id){
                let self=this;
                this.$f7.confirm("",this.$root.localization.modal.modalTextConf, function () {
                    self.audit.comments.splice(id,1);
                    self.$ls.set('objects',self.$root.objects);
                });
            },

            //Удалить аудит.
            remove_audit(){
                let self=this;
                this.$f7.confirm("",this.$root.localization.modal.modalTextConf, function () {
                    self.$root.objects[self.array_index].audits.splice(self.id,1);
                    self.$ls.set('objects',self.$root.objects);
                    self.$f7.views.main.back();
                })
            },
            //Получить дату создания.
            GetCurrentDate(){
                let data=new Date(this.audit.date_add);
                let curSec=('0'+data.getSeconds()).substr(-2);
                let curMin=('0'+data.getMinutes()).substr(-2);
                let curDay=('0'+data.getDate()).substr(-2);
                let curMounth=('0'+(data.getMonth()+1));
                let date_for_text=curDay+"-"+curMounth+"-"+data.getFullYear()+" "+data.getHours()+":"+curMin+":"+curSec;
                return date_for_text;
            },
            //Метод возвращает иконку статуса для чек листа.
            realStatus(str){
                let self=this;
                let result;
                result=self.upload_st(str);
                return result;
            },
            //Выбираем какую иконку статуса возвращать для чек листа.
            upload_st(str){
                let result=true;
                // let new_str=false;
                str.requirement.forEach(function(req){
                    // new_str=(req.status===0)?true:new_str;
                    result=(Number(req.status)===1)?result:false;
                });
                return (result)?true:false;
            },
            new_str(str){

                let result=false;
                str.requirement.forEach(function(req){
                    result=(Number(req.status)===0)?true:result;
                });
              return result

            },
            open_edit(){
                this.$f7.views.main.router.load({url:'/edit_audit/'+this.array_index_save+'/'+this.audit.id});
            }

        }





    }
</script>

<style scoped>
    .status{
        display: inline-block;
        background-color: transparent;
        text-align: center;

    }
    .status table{
        width: 100%;
        height: 100%;
        text-align: center;
        vertical-align: middle;
        margin: 0;
        padding: 0;
        color:#ddd;
    }

    .blck_info .accordion-item{
        margin-bottom:0;
    }



</style>