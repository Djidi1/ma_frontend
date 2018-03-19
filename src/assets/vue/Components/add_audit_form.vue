<template>
    <!--форма добавления аудитов-->
    <f7-card>
    <f7-list form media>
        <f7-list-item  class="add_check">
            <f7-grid style="width:100%" class="css_cost">
                <f7-col width="80">
                    <f7-label floating>{{this.$root.localization.pop_up.name}}</f7-label>
                    <f7-input type="text" v-model="audit_name" @change="chanbe_name()" :disabled="!sended"></f7-input>
                </f7-col>
                <f7-col width="20" v-show="!trash_btn">
                   <f7-button v-if="sended" @click=remove() class="cross_button"><i class="fa fa-trash-o " aria-hidden="true" ></i></f7-button>
                   <div v-else class="upload_img cross_button">
                            <i class='fa fa-check  audit_good' aria-hidden='true'></i>
                   </div>
                </f7-col>
            </f7-grid>
        </f7-list-item>
    </f7-list>
        <f7-block-title v-show="hasCheck">{{this.$root.localization.pop_up.check_list}}</f7-block-title>
        <f7-block>
            <f7-list>
                    <f7-list-item v-for="(check_item,index) in this.audit_obj.check_list" :key="index" :title="check_item.title" >
                        <div slot="after">
                            <f7-button  v-if="sended" @click=remove_check(index) class="check_delete" ><i class="fa fa-trash-o " aria-hidden="true" ></i></f7-button>
                        </div>
                    </f7-list-item>
                    <f7-list-item  >
                        <f7-grid style="width:100%">
                            <f7-col width="100" v-if="sended">
                                <f7-button class="add_check_btn" :open-popover="'.popover_add_obj_'+this.audit_obj.id">{{this.$root.localization.pop_up.add_check}}</f7-button>
                            </f7-col>
                        </f7-grid>
                    </f7-list-item>
            </f7-list>
        </f7-block>
        <popover_obj :id="this.audit_obj.id.toString()" @select_check_list="select_check_list" :check_list_from_audit="audit_obj.check_list"></popover_obj>
    </f7-card>
</template>

<script>
    var $$=Dom7;
    export default {
        name: "add_audit_form",
        props:{
            id:{type:Number,default:0},
            type:{type:Boolean,default:true},
            trash_btn:{type:Boolean,default:true},
            audits:{type:Object,default:function(){return{}}}
        },
        data:function(){
            return{
                audit_name:'',
                audit_obj:'',
                check_list_new:[]
            }
        },
        created(){
            this.audit_obj=this.audits;
            this.audit_name=this.audit_obj.title;
        },
        mounted:function(){
            this.$nextTick(function(){
               this.css_class_add(this.$el);
            })
        },
        computed:{
            hasCheck(){
                return (this.audit_obj.check_list.length>0);
            },
            sended(){
                return !this.audit_obj.upload;
            }
        },
        methods:{
            remove(){
                let self=this;
                this.$f7.confirm("",this.$root.localization.modal.modalTextConf, function () {
                    self.$emit('remove_audit')
                })
            },
            select_check_list(arr){
                let self=this;
                this.audit_obj.check_list=[];
                arr.forEach(function(item){
                    self.audit_obj.check_list.push(item);
                    console.log(self.audit_obj);
                });
            },
            remove_check(index){
                let self=this;
                this.$f7.confirm("",this.$root.localization.modal.modalTextConf, function () {
                    self.audit_obj.check_list.splice(index, 1)
                })
            },
            chanbe_name(){
                this.audit_obj.title=this.audit_name;
            },










            css_class_add(el){
                let element=$$(el);
                let form_cls;
                let input_cls;
                let sec_input_cls;
                //костыль дял формы
                let form=element.find('form');
                element.attr('class').split(' ').forEach(function(item){
                    form_cls=(item!='inputs-list')?true:false;
                })
               if (form_cls) this.add_cls_to_form(form,'inputs-list');
                //костыль для инпута item-input-field
                let input=element.find('.item-input');
                input.attr('class').split(' ').forEach(function(item){
                    input_cls=(item!='item-input-field')?true:false;
                });
                if (input_cls) this.add_cls_to_form(input,'item-input-field');
                let sec_imput= element.find('.item-inner');
                sec_imput.attr('class').split(' ').forEach(function(item){
                    sec_input_cls=(item!='not-empty-state')?true:false;
                })
                if(this.audit_name!=''){
                if (sec_input_cls)this.add_cls_to_form(sec_imput,'not-empty-state')}
                element.find('.checks_to_add').find('.item-inner').removeClass('not-empty-state')
            },
            add_cls_to_form(form,cls){
                form.addClass(cls);
            }
        }
    }
</script>

<style scoped>

    .trash_btn{
        text-align: center;

    }
    .check_delete{
        color:#9e9e9e;
        font-size:22px;
    }
    .upload_img{
        padding-top:0;
        text-align: center;
        font-size:22px;
    }
    .upload_img>i{
        font-size:30px;
        padding-top:20px;
    }




</style>