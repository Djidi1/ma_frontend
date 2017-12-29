<template>
    <div class="blck_info">
        <f7-card v-for=" item in data_storage" :key="item.id">
            <f7-card-header >
                <div class="obj_info">
                    <div class="row  no-gutter">
                        <div class="col-50"> {{item.name}}</div>
                        <div class="col-50 id_info">id:{{item.id}}</div>
                        <div class="col-50 adrs_info">{{item.adres}}</div>
                    </div>
                </div>
            </f7-card-header>
            <f7-list media-list>
                <f7-list-item v-for="acrd in item.audits" :key="acrd.id" link="#" :title="acrd.name"  :text="acrd.create_date" :badge="acrd.status" after="" ></f7-list-item>
            </f7-list>
            <f7-list accordion>
                <f7-list-item accordion-item title="Comments"  media="<i class='fa fa-commenting-o ' aria-hidden='true'></i>">
                    <f7-accordion-content>
                       <div v-for="acrd in item.audits" :key="acrd.id">
                           <f7-block inner v-for="msg in acrd.comments" :key="msg.id">{{msg.text}}</f7-block>
                       </div>
                    </f7-accordion-content>
                </f7-list-item>
            </f7-list>
        </f7-card>
    </div>
</template>

<script>
    export default {
        name: "list_audit",
        props:{
            data_storage:{ type: Array, default: '[]' }
        },
        computed:{



        }
    }
</script>

<style scoped>
    .obj_info{
        display:block;
        width:100%;
        margin:5px 0 5px 0;
    }
    .id_info{
        text-align: center;
    }
    .adrs_info{
        font-size:15px;
        color:#757575;
    }
</style>