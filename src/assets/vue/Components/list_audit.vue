<template>
    <div class="blck_info">
        <f7-card v-for="(item,index) in data_storage" :key="index">
            <f7-card-header class="show_border" >
                    <div class="obj_info">
                        <div class="row  no-gutter">
                            <div class="col-70"> <f7-link no-link-class :href="'/object/'+index+'/'">{{item.name}}</f7-link></div>
                            <div class="col-70  dop_info">{{item.adres}}</div>
                            <div class="col-30 dop_info count_info">{{countFrom(item)}}</div>
                        </div>
                    </div>
            </f7-card-header>
            <f7-card-content>
                <f7-list media-list>
                    <f7-list-item v-for="(acrd,acrd_index) in array_few(item.audits)" :key="acrd_index" :link="'/audit/'+index+'/'+acrd_index" :title="acrd.name" :subtitle="acrd.id"  :text="acrd.create_date"  :media="realStatus(acrd.status)"></f7-list-item>
                </f7-list>
            </f7-card-content>
        </f7-card>
    </div>
</template>

<script>
    export default {
        name: "list_audit",
        props:{
            data_storage:{ type: Array, default: function () { return [] } }
        },

        methods:{
            realStatus(str){
              let result="";
                switch (str){
                    case '':
                        result="";
                        break;
                    case 'new':
                        result="<i class='fa fa-circle fa-1x audit_new' aria-hidden='true'></i>";
                        break;
                    case 'ok':
                        result="<i class='fa fa-check fa-2x audit_good' aria-hidden='true'></i>";
                        break;
                    case 'error':
                        result="<i class='fa fa-chain-broken fa-2x audit_error' aria-hidden='true'></i>";
                        break;
                    case 'wrong':
                        result="<i class='fa fa-times fa-2x audit_wrong' aria-hidden='true'></i>";
                    break;
              }
              return result;
            },
            countFrom(item){
               let all=item.audits.length;
                return (all>5)?"5 "+this.$root.localization.AuditPage_count +" "+all:'';
            },
            array_few(items){
                return items.slice(0,5);
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