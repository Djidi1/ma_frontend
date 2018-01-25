<template>
    <f7-popup id="popup_add" :opened="opendPopup">
        <f7-navbar back-link="Back" sliding @back-click.stop="closePopUp()" >
            <f7-nav-center sliding> Test </f7-nav-center>
            <f7-nav-right>
                <f7-grid class="crud_header edit_menu">
                    <f7-col width="30" ></f7-col>
                    <f7-col width="50" ><f7-link > <i class="fa fa-check" aria-hidden="true"></i></f7-link></f7-col>
                    <f7-col width="10" ></f7-col>
                </f7-grid>
            </f7-nav-right>
        </f7-navbar>

        <div class="blck_info">
            <f7-card>
                <f7-card-header>
                   Object info
                </f7-card-header>
                <f7-card-content>
                    <f7-list form class="add_list">
                        <f7-list-item class="correct_css">
                            <f7-grid>
                                <f7-col width="60">
                                    <f7-label floating>Object</f7-label>
                                    <f7-input type="select" @change="Change_select_item($event.target.value)" v-model="selected_id">
                                        <option v-for="(item,index) in this.select_list" :key="index" :value="index" :selected="current_object(index)">{{item.name}}</option>
                                    </f7-input>
                                </f7-col>
                                <f7-col width="40" class="add_button_obj">
                                    <f7-button fill><i class="fa fa-plus" aria-hidden="true"></i>  Add</f7-button>
                                </f7-col>
                            </f7-grid>
                        </f7-list-item>
                        <f7-list-item v-show="selected_exist" class="correct_css">
                            <f7-label floating>Address</f7-label>
                            <f7-input type="text" v-model="add_obj"/>
                        </f7-list-item>
                    </f7-list>
                </f7-card-content>
                <f7-card-footer></f7-card-footer>
            </f7-card>

            <f7-card>
                <f7-card-header>
                    Audits info
                </f7-card-header>
                <f7-card-content class="card_audit_add">
                   <f7-card >
                       <audit_add v-for="(items,index) in this.audits" :key="index" :audits="items"></audit_add>
                   </f7-card>
                    <f7-card>
                        <f7-grid style="width:100%">

                            <f7-col width="100"> <f7-button fill :disabled="activateBtn">AddAudit</f7-button></f7-col>

                        </f7-grid>
                    </f7-card>
                </f7-card-content>
                <f7-card-footer></f7-card-footer>
            </f7-card>
    <f7-card>
        <f7-card-header>
            <f7-grid class="btn_complete">
                <f7-col width="50"><f7-button  class="abort_button"  >Cancel</f7-button></f7-col>
                <f7-col width="50"><f7-button fill>Submit</f7-button></f7-col>
            </f7-grid>
        </f7-card-header>
    </f7-card>

        </div>
    </f7-popup>
</template>

<script>
    var $$=Dom7;
    export default {
        name: "popup_ne",
        props:{
            obj_id:{type:Number,default:-1},
            audit_id:{type:Number,default:-1},
            opendPopup:{type:Boolean,default:false}
        },
        data:function(){
          return{
              select_list:'',
              selected_exist:false,
              selected_id:'',
              selected_object:'',
              add_obj:'',
              test_obje:1,
              audits:''
          }
        },
        computed:{
            activateBtn(){
                return  !(Object.keys(this.selected_object).length!=0);
            }
        },
        mounted:function(){
            this.$nextTick(function(){
                this.correct_css(this.$el);
            })
        },
        created(){
           this.select_list=(this.$root.list.length>0)?this.$root.list:[{"name":"Nothing"}];
        },
        methods:{
            closePopUp(){
                this.$emit('close')
            },
            Change_select_item(val){
               this.selected_exist=true;
               this.selected_object=this.$root.list[this.selected_id];
               this.add_obj=this.selected_object.adres;
               this.audits=this.selected_object.audits;
               this.correct_css();

            },
            current_object(index){
                return (this.test_obje===index)?true:false;
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
            add_cls(obj,cls){
                obj.addClass(cls);
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

</style>