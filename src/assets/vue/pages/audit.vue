<template>
    <f7-page   >
        <!-- Navbar -->
        <f7-navbar back-link="Back" sliding  >

            <f7-nav-center sliding> {{audit.name}} {{audit.id}}</f7-nav-center>
        </f7-navbar>
        <div class="blck_info">
            <f7-card>
                <f7-card-header>
                        <div class="obj_info audit_obj">
                            <div class="row  no-gutter">
                                <div class="col-70">
                                    <div class="col-100">{{this.$root.localization.AuditPage.name}}:</div>
                                    <div class="col-100">{{audit.name}}</div>
                                    <div class="col-100">Id: {{audit.id}}</div>
                                    <div class="col-100">{{audit.create_date}}</div>
                                    <div class="col-100">{{obj_name}}</div>
                                </div>
                                <div class="col-30 status" :style="this.block_height">
                                    <table>
                                        <tr>
                                            <td> <i :class="status" aria-hidden="true"></i></td>
                                        </tr>
                                    </table>
                                </div>
                            </div>
                        </div>
                </f7-card-header>

            </f7-card>

            <f7-card>
                   <f7-card-header>
                        {{this.$root.localization.AuditPage.check_list}}
                   </f7-card-header>
                        <f7-list accordion  v-for="(check,id) in this.audit.check_list"  :key="id"  :id="'acord'+id" >
                            <f7-list-item accordion-item :title="check.name" :after="realStatus(check.status)">
                                <f7-accordion-content>
                                        <check_item v-for="(item,item_id) in check.list_to_check" :data_item="item" :data_id="item_id" :key="item_id" :obj_id="this.obj_id" :audit_id="this.id" :check_id="id" :start_status="check.status"></check_item>
                                    <f7-list-item>
                                        <div class="row" style="width:100%; padding:15px 0 15px 0">
                                            <div class="col-50">
                                                <f7-button @click="abort_check_list(id)" class="abort_button" color="gray"><i class="fa fa-undo" aria-hidden="true"></i> </f7-button>
                                            </div>
                                            <div class="col-50">
                                                <f7-button fill @click="check_list_status(id)"><i class="fa fa-check" aria-hidden="true"></i> </f7-button>
                                            </div>
                                        </div>
                                    </f7-list-item>
                                </f7-accordion-content>
                            </f7-list-item>
                        </f7-list>
                </f7-card>





        </div>
    </f7-page>
</template>

<script>
    var $$=Dom7;
    export default {
        name: "audit",
        props: {
            id: { type: String, default: '' },
            obj_id:{type:String,default:''}
        },
        data:function() {
            return {
                audit:'',
                obj_name:'',
                acordianId:0,
                block_height:'',
                id_list:[
                    this.obj_id,
                    this.id
                ]
            }
        },
        mounted:function(){
            this.$nextTick(function () {
                this.block_height=this.status_style()
            })
        },
        created:function(){
            this.obj_name=this.$root.list[this.obj_id].name;
            this.audit = this.$root.list[this.obj_id].audits[this.id];
        },
        computed:{
            status(){
                let result="";
                switch (this.audit.status){
                    case '':
                        result='';
                        break;
                    case 'new':
                        result="";
                        break;
                    case 'ok':
                        result="fa fa-check fa-3x audit_good";
                        break;
                    case 'error':
                        result="fa fa-chain-broken fa-3x audit_error>";
                        break;
                    case 'wrong':
                        result="audit_wrong fa fa-times fa-3x >";
                        break;
                }
                return result;
            },
            hasAttach(){
                return (this.attachment.length>0);
            }
        },
        methods:{
            status_style(){
                let height_block=$$('.audit_obj').height();
                return {"height":height_block+"px"}
            },
            check_list_status(id){
                let self=this;
                let result='ok';
                let status=true;
                (this.audit.check_list).forEach(function(item,i,arr){
                    item.list_to_check.forEach(function(list_item,g,arr){
                        if (!list_item.status){
                            status=false;
                            result='wrong';
                        }else{
                            status=true;
                        }
                    })
                });
                this.audit.check_list[id].status=result;
                this.audit_change_status();
            },
            abort_check_list(id){
                let self=this;
                (this.audit.check_list).forEach(function(item,i,arr){
                   item.list_to_check.forEach(function(list_item){
                       list_item.status=false;
                       list_item.type='new';
                   })
                });
                let acord=$$('#acord'+id);
                acord.each(function(){
                    if ($$(this).length>0){
                        let inputs=$$(this).find('form').find('li').find('input');
                        inputs.each(function(){
                            if($$(this).attr('type')==='checkbox') {
                               ($$(this).prop('checked',false));
                            }
                        })
                    }
                })
                self.audit.check_list[id].status='new';
                this.audit_change_status();
            },
            audit_change_status(){
               let list =this.audit.check_list;
               let status="new";
               list.forEach(function(item,i,arr){
                       if(item.status==="ok") status="ok";
                       if(item.status==="wrong") status="wrong";
                })
                this.audit.status=status;
                this.$root.update_ls();
            },
            realStatus(str){
                let result="";
                switch (str){
                    case '':
                        result="";
                        break;
                    case 'new':
                        result="";
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





</style>