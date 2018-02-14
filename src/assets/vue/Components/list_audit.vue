<template>
    <div class="blck_info">
        <f7-card v-for="(item,index) in this.$root.objects" :key="index" v-if="hasAudits(index)">
            <f7-card-header >
                    <div class="obj_info">
                        <div class="row  no-gutter">
                            <div class="col-70"> <f7-link no-link-class :href="'/object/'+item.id+'/'">{{item.title}}</f7-link></div>
                            <div class="col-70  dop_info">{{item.address}}</div>
                            <div class="col-30 dop_info count_info">{{countFrom(item)}}</div>
                        </div>
                    </div>
            </f7-card-header>
            <f7-card-content>
                <f7-list media-list>
                    <f7-list-item v-for="(acrd,acrd_index) in array_few(item)" :key="acrd_index" :link="'/audit/'+index+'/'+acrd_index" :title="acrd.title" :subtitle="'ID: '+acrd.id"  :text="data_formta(acrd.created_at)"  :media="realStatus(acrd.status)"></f7-list-item>
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
            realStatus(str){
              let result="";
              //   switch (str){
              //       case '':
              //           result="";
              //           break;
              //       case 'new':
              //           result="<i class='fa fa-circle fa-1x audit_new' aria-hidden='true'></i>";
              //           break;
              //       case 'ok':
              //           result="<i class='fa fa-check fa-2x audit_good' aria-hidden='true'></i>";
              //           break;
              //       case 'error':
              //           result="<i class='fa fa-chain-broken fa-2x audit_error' aria-hidden='true'></i>";
              //           break;
              //       case 'wrong':
              //           result="<i class='fa fa-times fa-2x audit_wrong' aria-hidden='true'></i>";
              //       break;
              // }
              return result;
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
            data_formta(data){
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