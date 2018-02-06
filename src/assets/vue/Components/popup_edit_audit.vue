<template>
    <f7-popup id="popup_add_audit" :opened="opendPopup">
        <f7-navbar back-link="Back" sliding @back-click.stop="closePopUp(false)" >
            <f7-nav-center sliding> {{title}} </f7-nav-center>
            <f7-nav-right>
                <f7-grid class="crud_header edit_menu">
                    <f7-col width="30" ></f7-col>
                    <f7-col width="50" ><f7-link  @click="submit()"> <i class="fa fa-check" aria-hidden="true"></i></f7-link></f7-col>
                    <f7-col width="10" ></f7-col>
                </f7-grid>
            </f7-nav-right>
        </f7-navbar>

        <div class="blck_info popup_card">
            <f7-card>
                <f7-card-header>
                    {{this.$root.localization.pop_up.audits_info.substr(0,this.$root.localization.pop_up.audits_info.length -1)}}
                </f7-card-header>
                <f7-card-content>
                    <f7-list form class="add_list">
                        <f7-list-item class="correct_css">
                            <f7-label floating>{{this.$root.localization.pop_up.name}}</f7-label>
                            <f7-input type="text"  v-model="current" id="main_input">
                            </f7-input>
                        </f7-list-item>
                    </f7-list>
                </f7-card-content>

            </f7-card>
            <f7-card>
                <f7-card-header>{{this.$root.localization.pop_up.check_list}}</f7-card-header>
                <f7-card-content>
                    <f7-list>
                        <f7-list-item v-for="(item,index) in this.audit_current.check_list" :key="index" :title="item.name" >
                            <div slot="after">
                                <f7-button class='cross_button in_list' @click=remove_Check(index)><i class='fa fa-trash-o' aria-hidden='true' ></i></f7-button>
                            </div>
                        </f7-list-item>
                        <f7-list-item class="add_check_btn">
                            <f7-grid style="width:100%">
                                <f7-col width="100"> <f7-button open-popover=".popover_add_obj" >{{this.$root.localization.pop_up.add_check}}</f7-button></f7-col>
                            </f7-grid>
                        </f7-list-item>
                    </f7-list>
                </f7-card-content>

            </f7-card>
            <f7-card class="btn_pop_up_main">
                <f7-card class="btn_pop_up_card">
                    <f7-card-header class="btn_pop_up_card">
                        <f7-grid class="btn_complete">
                            <f7-col width="50"><f7-button  class="abort_button" @click="closePopUp(false)" > {{this.$root.localization.pop_up.cancel}}</f7-button></f7-col>
                            <f7-col width="50"><f7-button fill @click="submit()" >{{this.$root.localization.pop_up.submit}}</f7-button></f7-col>
                        </f7-grid>
                    </f7-card-header>
                </f7-card>
            </f7-card>
        </div>
        <popover_obj @add_check="add_check_lists"></popover_obj>
    </f7-popup>
</template>

<script>
    export default {
        name: "popup_audit_edit",
        props:{
            audit:{type:String,default:''},
            object:{type:String,default:''},
            opendPopup:{type:Boolean,default:false},
            edit:{type:Boolean,default:false}
        },
        data:function(){
            return{
              title:this.$root.localization.pop_up.edit,
                audit_current:{},
                current:'',
                oldAudit:{}
            }
        },
        created(){

        },
        mounted(){
            this.audit_current=this.$root.list[this.object].audits[this.audit];
            this.current=this.audit_current.name;
        },
        methods:{
            submit(){
                let result=true;
                if (this.current==='') {this.$f7.alert(this.$root.localization.pop_up.empty_input_obj, this.$root.localization.pop_up.warning);
                    result=false;
                }
                (result)?this.edit_object():'';
            },
            edit_object(){
                this.audit_current.name=this.current;
                this.closePopUp(true);
            },
            closePopUp(mode){
                (mode)?this.$root.update_ls():this.cancelEdit();
                this.$emit('close');
            },
            cancelEdit(){
                this.$root.list=this.$root.$ls.get('list');
                this.current=this.audit_current.name;
                this.audit_current=this.$root.list[this.object].audits[this.audit];
                this.$emit('cancel');

            },
            add_check_lists(arr){
                let self=this;
                arr.forEach(function(item){
                    self.audit_current.check_list.push(item);
                })
            },
            remove_Check(index){
                let self=this;
                this.$f7.confirm("",this.$root.localization.modal.modalTextConf, function () {
                    self.audit_current.check_list.splice(index, 1)
                })
            },
        }
    }
</script>

<style scoped>
    .add_check_btn{
        margin-top:10px;
    }
    .btn_complete{
        width:100%;
        padding:0 15px 0 15px;
        margin-top:15px;
        margin-bottom:15px;
    }
    .btn_pop_up_main{
        margin-bottom:30px;
        margin-top:40px;
    }
    .btn_pop_up_card{
        padding: 8px;
        box-shadow: unset;
        -moz-box-shadow: unset;
        -o-box-shadow: unset;
        -webkit-box-shadow: unset;
    }
    .btn_pop_up_card:after{
        display:none;
    }
</style>