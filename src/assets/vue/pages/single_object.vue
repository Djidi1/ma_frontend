<template>
    <f7-page pull-to-refresh @ptr:refresh="this.$root.onRefresh"  >
        <!-- Navbar -->
        <f7-navbar back-link="Back" sliding  >

            <f7-nav-center sliding> {{object.name}} ID:{{object.id}}</f7-nav-center>
            <f7-nav-right>
                <f7-grid class="crud_header">
                    <f7-col width="50"> <i class="fa fa-pencil" aria-hidden="true"></i></f7-col>
                    <f7-col width="50"><i class="fa fa-trash-o" aria-hidden="true"></i></f7-col>
                </f7-grid>
            </f7-nav-right>
        </f7-navbar>
        <div class="blck_info">
            <f7-card>
                <f7-card-header>
                    <div class="obj_info audit_obj">
                        <div class="row  no-gutter">
                                <div class="col-100">{{this.$root.localization.ObjectPage.name}}:{{object.name}}</div>
                                <div class="col-100">Id: {{object.id}}</div>
                                <div class="col-100">{{object.created_date}}</div>
                                <div class="col-100">{{object.adres}}</div>
                        </div>
                    </div>
                </f7-card-header>
            </f7-card>
            <f7-card>
                <f7-card-header>
                    {{this.$root.localization.ObjectPage.audits_view}}
                    <div class="audit_ocunt">
                        {{audit_count}}
                    </div>
                </f7-card-header>
                <f7-card-content>
                    <f7-list media-list>
                        <f7-list-item v-for="(acrd,acrd_index) in this.object.audits" :key="acrd_index" :link="'/audit/'+id+'/'+acrd_index" :title="acrd.name" :subtitle="acrd.id"  :text="acrd.create_date"  :media="realStatus(acrd.status)"></f7-list-item>
                    </f7-list>
                </f7-card-content>
            </f7-card>
        </div>
    </f7-page>
</template>

<script>
    export default {
        name: "single_object",
        props: {
            id: { type: String, default: '' },
        },
        data:function(){
            return{
                object:''
            }
        },
        created(){
            this.object=this.$root.list[this.id];
        },
        computed:{
            audit_count(){
                return (this.object.audits.length>0)?this.object.audits.length:'';
            }
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

</style>