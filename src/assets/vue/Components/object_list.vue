<template>
    <!--Лист объектов-->
    <div class="blck_info">
        <f7-card>
            <f7-card-content>
                <f7-list media-list>
                    <f7-list-item swipeout v-for="(object,index) in data_storage" :key="index" :link="'/object/'+object.id+'/'" :title="title+': '+object.title" :subtitle="'ID: '+object.id" :id="'id_for_object_list_'+object.id"  :text="data_format(object.created_at)+'</br>'+object.address" :after="audit_count(index)+'</br>'+new_audit_count(index)">
                        <f7-swipeout-actions>
                            <f7-swipeout-button  @click="edit_data(object.id)"> <i class="fa fa-pencil swipe_btn" aria-hidden="true" ></i> </f7-swipeout-button>
                            <f7-swipeout-button  @click="delete_obj(object.id,index)"> <i class="fa fa-trash-o swipe_btn" aria-hidden="true" ></i> </f7-swipeout-button>
                        </f7-swipeout-actions>
                        <popup_edit_object :id="object.id.toString()"></popup_edit_object>

                    </f7-list-item>
                </f7-list>
            </f7-card-content>
        </f7-card>
        <div  v-if="!hasSomething">
            <f7-block inner class="nothing" >
                {{this.$root.localization.ObjectPage_nothing}}
            </f7-block>
        </div>
    </div>
</template>

<script>
    export default {
        name: "object_list",
        data:function(){
          return{
              data_storage:this.$root.objects
          }
        },
        computed:{
            title(){
                return this.$root.localization.ObjectPage.name;
            },
            hasSomething(){
                return(this.$root.objects.length>0)
            }
        },
        methods:{
            audit_count(obj_index){
               let self=this;
               let count=this.$root.objects[obj_index].audits.length;
               return (count>0)? this.$root.localization.ObjectPage.audits+': '+count:'';
            },
            new_audit_count(obj){
                let count=0;
                this.$root.objects[obj].audits.forEach(function(audit){
                    (!audit.upload)?count++:'';
                });
                return (count>0)?"<div class='new_audits_count'>"+this.$root.localization.ObjectPage.new_audits+': '+count+"</div>":'';
            },
            data_format(data){
                data=new Date(data);
                let curSec=('0'+data.getSeconds()).substr(-2);
                let curMin=('0'+data.getMinutes()).substr(-2);
                let curDay=('0'+data.getDate()).substr(-2);
                let curMounth=('0'+(data.getMonth()+1));
                let date_for_text=curDay+"/"+curMounth+"/"+data.getFullYear()+" "+data.getHours()+":"+curMin+":"+curSec;
                return date_for_text;
            },
            edit_data(index){
                let $$=Dom7;
                this.$f7.swipeoutClose($$('#id_for_object_list_'+index));
                this.$f7.popup($$('#popup_edit_'+index));
            },
            delete_obj(id,index){
                let $$=Dom7;
                let self=this;
                this.$f7.confirm("",this.$root.localization.modal.modalTextConf, function () {
                    self.$f7.swipeoutClose($$('#id_for_object_list_'+id));
                    self.$root.objects.splice(index,1);
                    self.$ls.set('objects',self.$root.objects);
                });
            }
        }
    }
</script>

<style scoped>
    .new_audit{
        border:1px solid #2196F3;
    }
</style>