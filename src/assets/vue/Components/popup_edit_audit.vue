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
                <f7-card-content style="padding-bottom:15px;">
                    <f7-card style="padding-bottom:10px;">
                        <f7-list form class="add_list">
                            <f7-list-item class="correct_css">
                                <f7-label floating>{{this.$root.localization.pop_up.name}}</f7-label>
                                <f7-input type="text"  v-model="current" id="main_input">
                                </f7-input>
                            </f7-list-item>
                        </f7-list>
                    </f7-card>
                </f7-card-content>
                <f7-card-footer style=""></f7-card-footer>
            </f7-card>
            <f7-card>
                <f7-card-header>{{this.$root.localization.pop_up.check_list}}</f7-card-header>
                <f7-card-content  style="padding-bottom:15px;">
                    <f7-card>
                        <f7-list>
                            <f7-list-item v-for="(item,index) in get_check_list()" :key="index" :title="item.title" >
                                <div slot="after">
                                    <f7-button class='cross_button in_list'><i class='fa fa-trash-o' aria-hidden='true' ></i></f7-button>
                                </div>
                            </f7-list-item>
                            <f7-list-item >
                                <f7-grid style="width:100%">
                                    <f7-col width="100"> <f7-button open-popover=".popover_add_obj" >{{this.$root.localization.pop_up.add_check}}</f7-button></f7-col>
                                </f7-grid>
                            </f7-list-item>
                        </f7-list>
                    </f7-card>
                </f7-card-content>
                <f7-card-footer></f7-card-footer>
            </f7-card>
            <f7-card class="btn_pop_up_main">
                <f7-card class="btn_pop_up_card">
                    <f7-card-header class="btn_pop_up_card">
                        <f7-grid class="btn_complete">
                            <f7-col width="50"><f7-button  class="abort_button" @click="closePopUp(false)" > {{this.$root.localization.pop_up.cancel}}</f7-button></f7-col>
                            <f7-col width="50"><f7-button fill>{{this.$root.localization.pop_up.submit}}</f7-button></f7-col>
                        </f7-grid>
                    </f7-card-header>
                </f7-card>
            </f7-card>
        </div>
        <popover_obj></popover_obj>
    </f7-popup>
</template>

<script>
    export default {
        name: "popup_audit_edit",
        props:{
            audit:{type:Object,default:function(){return{}}},
            opendPopup:{type:Boolean,default:false},
        },
        data:function(){
            return{
              title:this.$root.localization.pop_up.edit,
                audit_current:{},
                current:'',
                oldAudit:{}
            }
        },

        mounted(){
            this.audit_current=this.audit;
            this.current=this.audit_current.title;
        },
        methods:{
            closePopUp(mode){
                this.$emit('close');
            },
            get_check_list(){
                let self=this;
                let result=[];
                this.$root.check_list.forEach(function(item){
                    (item.id===self.audit_current.checklist_id)?result.push(item):'';
                });
                return result;
            }

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