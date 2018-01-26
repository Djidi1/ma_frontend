<template>
    <f7-popup id="popup_add" :opened="opendPopup">
        <f7-navbar back-link="Back" sliding @back-click.stop="closePopUp()" >
            <f7-nav-center sliding> {{title}} </f7-nav-center>
            <f7-nav-right>
                <f7-grid class="crud_header edit_menu">
                    <f7-col width="30" ></f7-col>
                    <f7-col width="50" ><f7-link @click="Submit_data"> <i class="fa fa-check" aria-hidden="true"></i></f7-link></f7-col>
                    <f7-col width="10" ></f7-col>
                </f7-grid>
            </f7-nav-right>
        </f7-navbar>

        <div class="blck_info popup_card">
            <f7-card>
                <f7-card-header>
                    {{this.$root.localization.pop_up.object_info}}
                </f7-card-header>
                <f7-card-content>
                    <f7-list form class="add_list">
                        <f7-list-item class="correct_css" v-if="CheckMode">
                                  <f7-label floating>{{this.$root.localization.pop_up.name}}</f7-label>
                                   <f7-input type="select" @change="Change_select_item($event.target.value)" v-model="current">
                                        <option v-for="(item,index) in this.select_list" :key="index" :value="index" >{{item.name}}</option>
                                   </f7-input>
                        </f7-list-item>
                        <f7-list-item class="correct_css" v-else >
                            <f7-label floating>Object</f7-label>
                            <f7-input type="text"  v-model="current">
                            </f7-input>
                        </f7-list-item>
                        <f7-list-item v-show="selected_exist" class="correct_css">
                            <f7-label floating>{{this.$root.localization.pop_up.address}}</f7-label>
                            <f7-input type="text" v-model="addres_obj"/>
                        </f7-list-item>
                    </f7-list>
                </f7-card-content>
                <f7-card-footer></f7-card-footer>
            </f7-card>
            <f7-card>
                <f7-card-header>
                    {{this.$root.localization.pop_up.audits_info}}
                </f7-card-header>
                <f7-card-content class="card_audit_add">
                       <audit_add v-for="(items,index) in this.audits" :key="index" :audits="items" :id="index" @remove="remove(true,index)" :type="true" @popup_call="change_id_audit"></audit_add>
                       <transition-group  appear mode="out-in" name="slide-app">
                            <audit_add v-for="(items,index) in this.new_audit" :key="index" :audits="items" :id="index" @remove="remove(false,index)"  :type="false" @popup_call="change_id_audit"></audit_add>
                       </transition-group>
                    <f7-card>
                        <f7-grid style="width:100%">
                            <f7-col width="100"> <f7-button fill @click="Add_audit_block" :disabled="!this.selected_exist">{{this.$root.localization.pop_up.add_audit}}</f7-button></f7-col>
                        </f7-grid>
                    </f7-card>
                </f7-card-content>
                <f7-card-footer></f7-card-footer>
            </f7-card>
    <f7-card class="btn_pop_up_main">
        <f7-card class="btn_pop_up_card">
        <f7-card-header class="btn_pop_up_card">
            <f7-grid class="btn_complete">
                <f7-col width="50"><f7-button  class="abort_button" @click="closePopUp()" > {{this.$root.localization.pop_up.cancel}}</f7-button></f7-col>
                <f7-col width="50"><f7-button fill @click="Submit_data">{{this.$root.localization.pop_up.submit}}</f7-button></f7-col>
            </f7-grid>
        </f7-card-header>
        </f7-card>
    </f7-card>
        </div>
        <popover_obj @add_check="add_check_lists"></popover_obj>
    </f7-popup>
</template>

<script>
    import Popover_obj from "src/assets/vue/Components/popover_obj";

    var $$=Dom7;
    export default {
        components: {Popover_obj},
        name: "popup_ne",
        props:{
            obj_id:{type:Number,default:-1},
            audit_id:{type:Number,default:-1},
            opendPopup:{type:Boolean,default:false},
            mode_audit:{type:Boolean,default:false},
            mode_audit_edit:{type:Boolean,default:false},
            mode_obj:{type:Boolean,default:false},
        },
        data:function(){
          return{
              title:this.$root.localization.pop_up.edit,
              select_list:'',
              selected_exist:false,
              current:'',
              selected_object:'',
              addres_obj:'',
              audits:'',
              new_audit:[],
              current_audit_id:0,
              current_arr:true
          }
        },
        computed:{

            CheckMode(){
                return (this.mode_audit);
            }
        },
        mounted:function(){
            this.$nextTick(function(){
                this.title=(this.mode_audit_edit)?this.$root.localization.pop_up.edit:this.$root.localization.pop_up.new;
                if (this.obj_id!=-1)
                this.correct_css(this.$el);
            })
        },
        created(){
           this.select_list=(this.$root.list.length>0)?this.$root.list:[{"name":"Nothing"}];
        },
        methods:{
            closePopUp(){
                this.clear_data();
                this.correct_css();
                this.secod_correct_css();
                this.$emit('close')
            },
            Change_select_item(val){
               this.selected_exist=true;
               this.selected_object=this.$root.list[val];
               this.addres_obj=this.$root.list[val].adres;
               this.audits=this.selected_object.audits;
               this.correct_css();
            },
            Add_audit_block(){
                let new_aduit={
                    "id":"Offline",
                    "name":"",
                    "status":"new",
                    "create_date":this.GetCurrentDate(),
                    "check_list":[]
                }
                this.new_audit.push(new_aduit)
            },
            GetCurrentDate(){
                let now= new Date();
                let curSec=('0'+now.getSeconds()).substr(-2);
                let curMin=('0'+now.getMinutes()).substr(-2);
                let date_for_text=now.getDate()+"/"+now.getMonth()+1+"/"+now.getFullYear()+" "+now.getHours()+":"+curMin+":"+curSec;
                return date_for_text;
            },
            remove(mode,id){
               (mode)?this.audits.splice(id,1):
                   this.new_audit.splice(id,1);

            },

            //css костыль
            correct_css(){
                let element=$$(this.$el).find('.correct_css');
                let el=(element.find('.item-inner'));
                let need_cls;
                el.attr('class').split(' ').forEach(function(item){
                    need_cls=(item!='not-empty-state')? true:false;
                })
                this.add_cls(el,'not-empty-state');
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
            change_id_audit(id,type){
              this.current_arr=type;
              this.current_audit_id=id;
            },
            add_check_lists(arr){
                let self=this;
                arr.forEach(function(item){
                    (self.current_arr)?self.audits[self.current_audit_id].check_list.push(item):self.new_audit[self.current_audit_id].check_list.push(item);
                })
            },
            Submit_data(){
                if(this.mode_audit){
                    if((Object.keys(this.selected_object).length!=0)){
                      this.selected_object.adres=this.addres_obj;
                      let valid=this.validate_arr();
                     if (valid){
                         this.GoodEnd();
                     }
                         else{
                            this.BadEnd
                    }
                    }else{
                      this.$f7.alert(this.$root.localization.pop_up.empty_obj, this.$root.localization.pop_up.warning);
                    }
                }else{

                }
            },
            push_new_audits_in(){
                let self=this;
                this.new_audit.forEach(function(item){
                    self.audits.push(item);
                })
            },
            validate_arr(){
                let self=this;
                let result=true;
                let result_2=true;
                this.new_audit.forEach(function(item){
                    result=(item.name!='')?true:false;
                })
                this.audits.forEach(function(item){
                    result_2=(item.name!='')?true:false;
                })
                if (!result||!result_2)this.$f7.alert(this.$root.localization.pop_up.empty_input,this.$root.localization.pop_up.warning );
                return (result)?(result_2)?true:false:false;
            },
            GoodEnd(){
                this.push_new_audits_in();
                this.closePopUp();
            },
            BadEnd(){

            },
            clear_data(){
                    this.selected_exist=false;
                    this.current='';
                    this.selected_object='';
                    this.addres_obj='';
                    this.audits='';
                    this.new_audit=[];
                    this.current_audit_id=0;
                    this.current_arr=true;
            }

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


</style>