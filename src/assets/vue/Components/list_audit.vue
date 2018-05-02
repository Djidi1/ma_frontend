<template>
    <!--Лист с объектами и аудитаи-->
    <div class="blck_info">
        <f7-card v-for="(item,index) in this.$root.objects" :key="index" v-if="hasAudits(index)">
            <f7-card-header >
                    <div class="obj_info">
                        <div class="row  no-gutter">
                            <div class="col-70"> {{item.title}}</div>
                            <div class="col-70  dop_info">{{item.address}}</div>
                            <div class="col-30 dop_info count_info">{{countFrom(item)}}</div>
                        </div>
                    </div>
            </f7-card-header>
            <f7-card-content>
                <f7-list media-list>
                    <f7-list-item v-for="(acrd,acrd_index) in array_few(item)" :key="acrd_index" :link="'/audit/'+index+'/'+acrd_index" :title="acrd.title" :id="'id_'+acrd.id"   :text="data_formta(acrd.created_at)"  :media="realStatus(acrd)" swipeout>
                        <f7-swipeout-actions v-if="!acrd.upload">
                            <f7-swipeout-button  @click="send_data(acrd,acrd.id)"> <i class="fa fa-paper-plane swipe_btn" aria-hidden="true" ></i> </f7-swipeout-button>
                            <f7-swipeout-button  @click="edit_data(acrd.id)"> <i class="fa fa-pencil swipe_btn" aria-hidden="true" ></i> </f7-swipeout-button>
                            <f7-swipeout-button  @click="delete_data(index,acrd.id,acrd_index)"> <i class="fa fa-trash-o swipe_btn" aria-hidden="true" ></i> </f7-swipeout-button>
                        </f7-swipeout-actions>
                        <popup_audit_edit  :audit="acrd"></popup_audit_edit>
                    </f7-list-item>
                </f7-list>
            </f7-card-content>
        </f7-card>
    </div>
</template>

<script>
    export default {
        name: "list_audit",
        data:function(){
            return{
                data_storage:this.$root.objects,
            }
        },
        methods:{
            //Статус для аудита. Графииский символ с боку от ссылки на аудит.
            realStatus(str){
                let self=this;
                let result;
                result=(str.upload)?self.upload_st(str):self.stat(str);
                return result;
            },

            //Получение статуса аудита если он загружен.
            upload_st(str){
                let result=true;
                let self=this;
                str.check_list.forEach(function(itm){
                    itm.requirement.forEach(function(req){
                        if (!req.disabled) {
                            result = (req.status===1) ? result : false;
                        }
                    });
                });
                return (result)?"<i class='fa fa-check fa-2x audit_good' aria-hidden='true'></i>":"<i class='fa fa-times fa-2x audit_wrong' aria-hidden='true'></i>";
            },
            //Если не загружен всегда считается новым.
            stat(str){
                return "<i class='fa fa-circle fa-1x audit_new' aria-hidden='true'></i>"
            },


            countFrom(item){
                let all=item.audits.length;
                return (all>5)?"5 "+this.$root.localization.AuditPage_count +" "+all:'';
            },
            array_few(obj){
                return obj.audits.slice(0,6);
            },
            hasAudits(id){
                return(this.$root.objects[id].audits.length>0);
            },
            //Ковертируем дату в удобный вид.
            data_formta(data){
                data=new Date(data);
                let curSec=('0'+data.getSeconds()).substr(-2);
                let curMin=('0'+data.getMinutes()).substr(-2);
                let curDay=('0'+data.getDate()).substr(-2);
                let curMounth=('0'+(data.getMonth()+1));
                let date_for_text=curDay+"/"+curMounth+"/"+data.getFullYear()+" "+data.getHours()+":"+curMin+":"+curSec;
                return date_for_text;
            },
            send_data(item,index){
                let $$=Dom7;
                (item.check_list.length>0)?
                    this.$root.send_to_serv_audit(item):this.$f7.alert(this.$root.localization.pop_up.no_check_list,this.$root.localization.pop_up.warning);
                this.$f7.swipeoutClose($$('#id_'+index));
            },
            edit_data(index){
                let $$=Dom7;
                this.$f7.swipeoutClose($$('#id_'+index));
                this.$f7.popup($$('#popup_add_audit_'+index));
            },
            delete_data(obj,id,acrd_index){
                let $$=Dom7;
                let self=this;
                this.$f7.confirm("",this.$root.localization.modal.modalTextConf, function () {
                        self.$f7.swipeoutClose($$('#id_'+id));
                         self.$root.objects[obj].audits.splice(acrd_index,1);
                         self.$ls.set('objects',self.$root.objects);
                });
            }

        }
    }
</script>

<style scoped>
    .dop_info{
        font-size:15px;
        color:#757575;
    }
    .count_info{
        text-align: center;
    }
    .show_border{
        border-bottom:1px solid #ddd
    }



</style>