<template>
    <div class="blck_info">
        <f7-card>
            <f7-card-content>
                <f7-list media-list>
                    <f7-list-item v-for="(object,index) in data_storage" :key="index" :link="'/object/'+object.id+'/'" :title="title+': '+object.title" :subtitle="'ID: '+object.id"  :text="data_format(object.created_at)+'</br>'+object.address" :after="audit_count(index)+'</br>'+new_audit_count(object.id)"></f7-list-item>
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
                // let count=0;
                // obj.audits.forEach(function(item){
                //     (item.status==='new')?count++:'';
                // })
                // return (count>0)? '<div class="new_audits_count">'+this.$root.localization.ObjectPage.new_audits+': '+count+'</div>':'';
                return 0;
            },
            data_format(data){
                data=new Date(data);
                let curSec=('0'+data.getSeconds()).substr(-2);
                let curMin=('0'+data.getMinutes()).substr(-2);
                let curDay=('0'+data.getDate()).substr(-2);
                let curMounth=('0'+(data.getMonth()+1));
                let date_for_text=curDay+"/"+curMounth+"/"+data.getFullYear()+" "+data.getHours()+":"+curMin+":"+curSec;
                return date_for_text;
            }
        }
    }
</script>

<style scoped>

</style>