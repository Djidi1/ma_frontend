<template>
    <f7-popup id="popup_add" :opened="opendPopup">
        <f7-navbar back-link="Back" sliding @back-click.stop="closePopUp(true)" >
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
            <f7-card v-show="!this.mode_audit_edit">
                <f7-card-header>
                    {{this.$root.localization.pop_up.object_info}}
                </f7-card-header>
                <f7-card-content>
                    <f7-list form class="add_list">
                        <f7-list-item class="correct_css">
                            <f7-grid>
                                <f7-col width="60">
                                    <f7-label floating>{{this.$root.localization.pop_up.name}}</f7-label>
                                    <f7-input type="text"  v-model="current" :disabled="mode_audit_edit" id="main_input">
                                    </f7-input>
                                </f7-col>
                                <f7-col width="40" style="height: 58px; padding-top:18px;">
                                    <f7-button fill open-popover=".exist_pop_over" :disabled="!hasObject"> {{this.$root.localization.pop_up.select_ex}}</f7-button>
                                </f7-col>
                            </f7-grid>
                        </f7-list-item>
                        <f7-list-item class="correct_css">
                            <f7-label floating>{{this.$root.localization.pop_up.address}}</f7-label>
                            <f7-input type="text" v-model="addres_obj" :disabled="mode_audit_edit"/>
                        </f7-list-item>
                    </f7-list>
                </f7-card-content>
                <f7-card-footer></f7-card-footer>
            </f7-card>
            <f7-card>
                <f7-card-header>
                    <span v-if="!this.mode_audit_edit">{{this.$root.localization.pop_up.audits_info}} </span> <span v-else>{{this.$root.localization.pop_up.audits_info.substr(0,this.$root.localization.pop_up.audits_info.length -1)}} : <span v-if="hasAudit">{{this.audits[this.audit_id_save].name}} {{this.audits[this.audit_id_save].id}}</span> </span>
                </f7-card-header>
                <f7-card-content class="card_audit_add">
                       <audit_add v-for="(items,index) in this.audits" :key="index" :audits="items" :id="index" @remove="remove(true,index)" :type="true" @popup_call="change_id_audit" :trash_btn="mode_audit_edit"></audit_add>
                       <transition-group  appear mode="out-in" name="slide-app">
                            <audit_add v-for="(items,index) in this.new_audit" :key="index" :audits="items" :id="index" @remove="remove(false,index)"  :type="false" @popup_call="change_id_audit" :trash_btn="mode_audit_edit"></audit_add>
                       </transition-group>
                    <f7-card v-show="!this.mode_audit_edit">
                        <f7-grid style="width:100%">
                            <f7-col width="100"> <f7-button fill @click="Add_audit_block">{{this.$root.localization.pop_up.add_audit}}</f7-button></f7-col>
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
                <f7-col width="50"><f7-button fill @click="Submit_data">{{this.$root.localization.pop_up.submit}}</f7-button></f7-col>
            </f7-grid>
        </f7-card-header>
        </f7-card>
    </f7-card>
        </div>
        <curr_objects v-if="hasObject" :list="this.select_list"  :current="this.selected_object" @selected_object_done="selected_object_done"></curr_objects>
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
            obj_id:{type:String,default:null},
            audit_id:{type:String,default:null},
            opendPopup:{type:Boolean,default:false},
            mode_audit:{type:Boolean,default:false},
            mode_audit_edit:{type:Boolean,default:false},
        },
        data:function(){
          return{
              title:'',
              select_list:[],
              selected_exist:false,
              current:'',
              selected_object:{},
              addres_obj:'',
              audits:[],
              new_audit:[],
              current_audit_id:0,
              current_arr:true,
              mode:this.mode_audit,
              audit_id_save:0
          }
        },
        computed:{
            hasAudit(){
                return (this.audits.length>0)
            },
            hasObject(){
                return(this.select_list.length>0)
            }
        },
        mounted:function(){
            this.$nextTick(function(){
                this.title=(this.mode_audit_edit)?this.$root.localization.pop_up.edit:this.$root.localization.pop_up.new;
                if (this.obj_id!=null){
                    this.correct_css(this.$el);
                }
            })
        },
        created(){
            this.select_list=(this.$root.objects.length>0)?this.$root.objects:'';
            if (this.obj_id!=null){
                    this.current = this.$root.list[this.obj_id].name;
                    this.selected_object = this.$root.list[this.obj_id];
                    this.selected_exist = true;
                    this.addres_obj = this.selected_object.adres;
                    this.audits = this.selected_object.audits;
            }
            this.audit_id_save=(this.audit_id!=null)?this.audit_id:null;
        },
        methods:{
            closePopUp(mode){
                (!this.mode_audit_edit)?this.correct_css():'';
                this.clear_data();
                this.secod_correct_css();
                if (mode){
                    this.$root.list=this.$ls.get('list');
                    this.$emit('cancel');
                }else{
                    this.$root.update_ls()};
                this.$emit('close')
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
                      this.selected_object.name=this.current;
                        let valid=this.validate_arr();
                     if (valid){
                         this.GoodEnd();
                     }
                    }else{
                        let result=true;
                      if (this.current==='') {this.$f7.alert(this.$root.localization.pop_up.empty_input_obj, this.$root.localization.pop_up.warning);
                        result=false;
                      }
                      if (this.addres_obj===''&& result) {this.$f7.alert(this.$root.localization.pop_up.empty_input_address, this.$root.localization.pop_up.warning);
                       result=false
                      }
                      result=(this.validate_arr())?result:false;
                       if (result) this.push_new_obj();

                    }
                }else{
                    if(this.mode_audit_edit){
                        let valid=this.validate_arr();
                        if(valid){
                            this.GoodEnd();
                        }
                    }
                }
            },
            push_new_audits_in(){
                let self=this;
                this.new_audit.forEach(function(item){
                    self.audits.push(item);
                })
            },
            push_new_obj(){
                let new_obj={
                    'name':this.current,
                    'adres':this.current,
                    'id':this.current,
                    'created_date':this.GetCurrentDate(),
                    'audits':this.new_audit,
                }
                this.$root.list.push(new_obj)
                this.closePopUp(false);
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
                this.closePopUp(false);
            },

            clear_data(){
                    this.selected_exist=(!this.mode_audit_edit)?false:true;
                    this.current=(!this.mode_audit_edit)?'':this.current;
                    this.selected_object=(!this.mode_audit_edit)?{}:this.selected_object;
                    this.addres_obj=(!this.mode_audit_edit)?'':this.addres_obj;
                    this.audits=(!this.mode_audit_edit)?'':this.audits;
                    this.new_audit=[];
                    this.current_audit_id=0;
                    this.current_arr=true;
                    this.current_arr=true;
                    this.mode=this.mode_audit;
            },

            selected_object_done(item,index){
                let self=this;
                if((Object.keys(item).length!=0)){
                    let leng=Object.keys(this.selected_object).length;
                    this.selected_object=item;
                    this.addres_obj=this.selected_object.adres;
                    this.current=this.selected_object.name;
                    this.audits=[];
                    //КОСТЫЛЬ
                    setTimeout(function(){self.audits=self.$root.list[index].audits},75);
                    (leng==0)?this.correct_css():'';
                }
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