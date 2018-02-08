<template>
    <f7-popup id="popup_add" :opened="opendPopup">
        <f7-navbar back-link="Back" sliding @back-click.stop="closePopUp(true)" >
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
                    <f7-grid style="width:100%; padding:5px 0 5px 0;">
                        <f7-col width="60">{{this.$root.localization.pop_up.object_info}}</f7-col>
                        <f7-col v-show="this.mode" width="40"> <f7-button  class="btn_select_obj" open-popover=".exist_pop_over" :disabled="!hasObject"> {{this.$root.localization.pop_up.select_ex}}</f7-button></f7-col>
                    </f7-grid>
                </f7-card-header>
                <f7-card-content style="padding-bottom:15px;">
                    <f7-card style="padding-bottom:10px;">
                    <f7-list form class="add_list">
                        <f7-list-item class="correct_css">
                                    <f7-label floating>{{this.$root.localization.pop_up.name}}</f7-label>
                                    <f7-input type="text"  v-model="current" id="main_input">
                                    </f7-input>
                        </f7-list-item>
                        <f7-list-item class="correct_css">
                            <f7-label floating>{{this.$root.localization.pop_up.address}}</f7-label>
                            <f7-input type="text" v-model="addres_obj"/>
                        </f7-list-item>
                    </f7-list>
                    </f7-card>
                </f7-card-content>
                <f7-card-footer></f7-card-footer>
            </f7-card>
            <f7-card>
                <f7-card-header>
                   {{this.$root.localization.pop_up.audits_info}}
                </f7-card-header>
                <f7-card-content class="card_audit_add">
                    <transition-group  appear mode="out-in" name="slide-app">
                        <audit_add v-for="(items,index) in this.audits" :key="index" :audits="items" :id="index"  :type="true" :trash_btn="false"></audit_add>
                    </transition-group>
                    <f7-card >
                        <f7-grid style="width:100%">
                            <f7-col width="100"> <f7-button fill @click="add_audit()">{{this.$root.localization.pop_up.add_audit}}</f7-button></f7-col>
                        </f7-grid>
                    </f7-card>
                </f7-card-content>
                <f7-card-footer></f7-card-footer>
            </f7-card>
            <f7-card class="btn_pop_up_main">
                <f7-card class="btn_pop_up_card">
                    <f7-card-header class="btn_pop_up_card">
                        <f7-grid class="btn_complete">
                            <f7-col width="50"><f7-button  class="abort_button" @click="closePopUp(true)" > {{this.$root.localization.pop_up.cancel}}</f7-button></f7-col>
                            <f7-col width="50"><f7-button fill @click="submit()" >{{this.$root.localization.pop_up.submit}}</f7-button></f7-col>
                        </f7-grid>
                    </f7-card-header>
                </f7-card>
            </f7-card>
        </div>
        <curr_objects v-if="hasObject" :list="this.select_list"  :current="this.selected_object" @selected_object_done="selected_object_done"></curr_objects>
        <popover_obj></popover_obj>
    </f7-popup>
</template>

<script>
    var $$=Dom7;
    export default {
        name: "popup_new_object",
        props:{
            opendPopup:{type:Boolean,default:false},
            mode:{type:Boolean,default:false},
            id:{type:String,default:''}
        },
        data:function(){
          return{
              title:'',
              selected_object:{},
              current:'',
              addres_obj:'',
              audits:[],
              current_audit_id:0,
              current_arr:true,
          }
        },
        created(){
            this.title=(!this.mode)?this.$root.localization.pop_up.edit:this.$root.localization.pop_up.new;
            this.select_list=(this.$root.objects.length>0)?this.$root.objects:'';

        },
        mounted(){
            this.$nextTick(function(){
                if (this.id!=''){
                    this.selected_object=this.get_object(this.id);
                    this.audits=this.get_audits(Number(this.id));
                    this.current=this.selected_object.title;
                    this.addres_obj=this.selected_object.audit_object_group.address;
                    this.correct_css();
                };
            });
        },
        computed:{
            hasObject(){
                return(this.select_list.length>0)
            }
        },
        methods:{
            closePopUp(mode){
                this.$emit('close')
            },

            GetCurrentDate(){
                let now= new Date();
                let curSec=('0'+now.getSeconds()).substr(-2);
                let curMin=('0'+now.getMinutes()).substr(-2);
                let curDay=('0'+now.getDate()).substr(-2);
                let date_for_text=curDay+"-"+now.getMonth()+1+"-"+now.getFullYear()+" "+now.getHours()+":"+curMin+":"+curSec;
                return date_for_text;
            },
            change_id_audit(id,type){
                this.current_arr=type;
                this.current_audit_id=id;
            },
            selected_object_done(item,index){
                let self=this;
                if((Object.keys(item).length!=0)){
                    this.selected_object=item;
                    this.audits=this.get_audits(item.id)
                    this.current=this.selected_object.title;
                    this.addres_obj=this.selected_object.audit_object_group.address;
                    this.correct_css();
                }
            },
            get_audits(id){
                let result=[];
                this.$root.audits.forEach(function(item){
                    if (item.object_id===id)result.push(item);
                });
                return result;
            },
            add_audit(){
              let new_audit={
                  "id": -1,
                  "title": "",
                  "date_add": this.GetCurrentDate(),
                  "user_id": this.$root.auth_info.user_id,
                  "checklist_id": -1,
                  "object_id": (Object.keys(this.selected_object).length!=0)?this.selected_object.id:-1,
                  "created_at":  this.GetCurrentDate() ,
                  "updated_at":  this.GetCurrentDate(),
                  "checklist": { },
                  "user": {
                      "id": this.$root.user_info.id,
                      "name": this.$root.user_info.name,
                      "email": this.$root.user_info.email,
                      "created_at": this.$root.user_info.created_at,
                      "updated_at": this.$root.user_info.updated_at,
                      "role_id": this.$root.user_info.role_id
                  },
                  "audit_object": {
                      "id": (Object.keys(this.selected_object).length!=0)?this.selected_object.id:-1,
                      "title": (Object.keys(this.selected_object).length!=0)?this.selected_object.title:'',
                      "user_id": (Object.keys(this.selected_object).length!=0)?this.selected_object.user_id:-1,
                      "audit_object_group_id": (Object.keys(this.selected_object).length!=0)?this.selected_object.audit_object_group_id:-1,
                      "created_at": (Object.keys(this.selected_object).length!=0)?this.selected_object.created_at:this.GetCurrentDate(),
                      "updated_at": (Object.keys(this.selected_object).length!=0)?this.selected_object.updated_at:this.GetCurrentDate()
                  }
              };
              this.audits.push(new_audit);
            },
            get_object(id){
                let self=this;
                let result={};
                this.$root.objects.forEach(function(item){
                   result=(item.id===Number(id))?item:result;
                });
                return result;
            },

























            //CSS Доработка
            correct_css(){
                let element=$$(this.$el).find('.correct_css');
                let el=(element.find('.item-inner'));
                let need_cls;
                el.attr('class').split(' ').forEach(function(item){
                    need_cls=(item!='not-empty-state')? true:false;
                })
                if(this.current!='')this.add_cls(el,'not-empty-state');
            },
            secod_correct_css(){
                let element=$$(this.$el).find('.correct_css');
                let el=(element.find('.item-input'));
                let need_cls;
                el.forEach(function(item){
                    $$(item).removeClass('not-empty-state')
                })
            },
            add_cls(obj,cls){
                obj.toggleClass(cls);
            },


        }
    }
</script>

<style scoped>
    .add_list {
        margin: 0 0 15px 0 !important;

    }
    .add_button_obj{
        padding-top:20px;
    }
    .obj_new_block{
        padding:0;
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
    .btn_select_obj{
        color: #2196f3;
        background-color:transparent;
    }

</style>