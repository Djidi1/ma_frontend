<template>
    <f7-page  pull-to-refresh @ptr:refresh="this.$root.onRefresh" >
        <!-- Navbar -->
        <f7-navbar back-link="Back" sliding  >

            <f7-nav-center sliding> {{audit.title}}</f7-nav-center>
            <f7-nav-right>
                <f7-link @click="popup_open=true"><i class="fa fa-pencil" aria-hidden="true"></i></f7-link>
                   <f7-link @click="remove_audit"> <i class="fa fa-trash-o" aria-hidden="true"></i></f7-link>
            </f7-nav-right>
        </f7-navbar>
        <div class="blck_info">
            <f7-card>
                <f7-card-header>
                        <div class="obj_info audit_obj">
                            <div class="row  no-gutter">
                                <div class="col-70">
                                    <div class="col-100">{{this.$root.localization.AuditPage.name}}:</div>
                                    <div class="col-100">{{audit.title}}</div>
                                    <div class="col-100">Id: {{audit.id}}</div>
                                    <div class="col-100">{{data_format}}</div>
                                    <div class="col-100"><f7-link no-link-class :href="'/object/'+this.audit.object_id+'/'">{{this.$root.objects[this.array_index_save].title}}</f7-link></div>
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

                        <f7-list accordion  v-if="hasCheck_list">
                            <f7-list-item   v-for="(check,id) in this.audit.check_list"  :key="id"  :id="'acord'+check.id" accordion-item :title="check.title" :after="realStatus(check.status)">
                            <f7-accordion-content>
                                <check_item v-for="(item,item_id) in check.requirement" :key="item_id"  :data_item="item" ></check_item>
                            </f7-accordion-content>
                        </f7-list-item>
                        </f7-list>
                        <f7-list v-else>
                            <f7-list-item  title="У данного аудита нет чек-листов."></f7-list-item>
                        </f7-list>
                <f7-card-footer>

                </f7-card-footer>
                </f7-card>
            <f7-card>
                <f7-block inner>
                    <f7-grid>
                        <f7-col width="50">
                            <f7-button @click="abort_check_list(id)" class="abort_button" color="gray"><i class="fa fa-undo" aria-hidden="true"></i> </f7-button>
                        </f7-col>
                        <f7-col width="50">
                            <f7-button fill @click="check_list_status(id)"><i class="fa fa-check" aria-hidden="true"></i> </f7-button>
                        </f7-col>
                    </f7-grid>
                </f7-block>

            </f7-card>
        </div>
        <popup_audit_edit :opendPopup="popup_open" @close="popup_open=false"  :audit="this.audit"></popup_audit_edit>
    </f7-page>
</template>

<script>
    import Popup_audit_edit from "src/assets/vue/Components/popup_edit_audit";

    var $$=Dom7;
    export default {
        components: {Popup_audit_edit},
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
            this.$nextTick(function () {
                this.block_height=this.status_style()
            })
        },
        created:function(){
            this.audit=this.$root.objects[this.array_index].audits[this.id];
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
            hasCheck_list(){
                return (this.audit.check_list.length>0);
            },
            data_format(){
                let data=new Date(this.audit.created_at);
                let curSec=('0'+data.getSeconds()).substr(-2);
                let curMin=('0'+data.getMinutes()).substr(-2);
                let curDay=('0'+data.getDate()).substr(-2);
                let date_for_text=curDay+"/"+data.getMonth()+1+"/"+data.getFullYear()+" "+data.getHours()+":"+curMin+":"+curSec;
                return date_for_text;
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
                            list_item.type=false;
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
                       list_item.type=true;
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
            },
            remove_audit(){
                let self=this;
                this.$f7.confirm("",this.$root.localization.modal.modalTextConf, function () {
                    self.$root.list[self.obj_id].audits.splice(self.id, 1)
                    self.$root.update_ls();
                    self.$f7.views.main.back();
                })
            },
            cancelEdit(){
               this.audit=this.$root.list[this.obj_id].audits[this.id];

            },

            get_check_array(check_id){
                let self=this;
                let check_array=[];
                this.$root.check_list.forEach(function(item){
                    (item.id===check_id)?check_array.push(item):'';
                });
                return check_array;
            }
        },





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