<template>
    <div class="blck_info">
        <f7-card v-for="item in data_storage" :key="item.id">
            <f7-card-header >
                    <div class="obj_info">
                        <div class="row  no-gutter">
                            <div class="col-70"> {{item.name}}</div>

                            <div class="col-70  dop_info">{{item.adres}}</div>
                        </div>
                    </div>
            </f7-card-header>
            <f7-card-content>
                <f7-list media-list>
                    <f7-list-item v-for="acrd in item.audits" :key="acrd.id" :link="'/audit/'+acrd.id" :title="acrd.name" :subtitle="acrd.id"  :text="acrd.create_date"  :media="realStatus(acrd.status)"></f7-list-item>
                </f7-list>
            </f7-card-content>

        </f7-card>
    </div>
</template>

<script>
    export default {
        name: "list_audit",
        props:{
            data_storage:{ type: Array, default: '[]' }
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
            }
        }
    }
</script>

<style scoped>


    .dop_info{
        font-size:15px;
        color:#757575;
    }
</style>