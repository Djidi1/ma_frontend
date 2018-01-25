<template>
    <f7-list form media>
        <f7-list-item  class="add_check">
            <f7-grid style="width:100%" class="css_cost">
                <f7-col width="80">
                    <f7-label floating>Name</f7-label>
                    <f7-input type="text" v-model="audit_name"></f7-input>
                </f7-col>
                <f7-col width="20" class="cross_button">
                    <i class="fa fa-trash-o " aria-hidden="true" ></i>
                </f7-col>
            </f7-grid>

        <div slot="root" class="add_check">
            <f7-list accordion >
                <f7-list-item accordion-item title="Check_list" >
                    <f7-accordion-content>
                       <f7-list class="checks_to_add">
                           <f7-list-item v-for="(item,index) in this.audits.check_list" :key="index" :title="item.name" after="<i class='fa fa-trash-o ' aria-hidden='true' ></i>" >

                               <!--<f7-grid>-->
                                   <!--<f7-col width="80">-->
                                       <!--{{item.name}}-->
                                   <!--</f7-col>-->
                                   <!--<f7-col width="20" class="cross_button"><i class='fa fa-trash-o ' aria-hidden='true' ></i></f7-col>-->
                               <!--</f7-grid>-->
                           </f7-list-item>
                           <f7-list-item class="add_check_btn">
                               <f7-grid style="width:100%">
                                   <f7-col width="100"> <f7-button>AddCheck</f7-button></f7-col>
                               </f7-grid>
                           </f7-list-item>
                       </f7-list>
                    </f7-accordion-content>
                </f7-list-item>
            </f7-list>
        </div>
        </f7-list-item>

    </f7-list>
</template>

<script>
    var $$=Dom7;
    export default {
        name: "add_audit_form",
        props:{
            audits:{type:Object,default:function(){return{}}}
        },
        data:function(){
            return{
                audit_name:''
            }
        },
        created(){
            this.audit_name=this.audits.name;
        },
        mounted:function(){
            this.$nextTick(function(){
               this.css_class_add(this.$el);
            })
        },
        methods:{
            css_class_add(el){
                let element=$$(el);
                let form_cls;
                let input_cls;
                let sec_input_cls;
                //костыль дял формы
                let form=element;
                element.attr('class').split(' ').forEach(function(item){
                    form_cls=(item!='inputs-list')?true:false;
                })
               // if (form_cls) this.add_cls_to_form(form,'inputs-list');
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
                if (sec_input_cls)this.add_cls_to_form(sec_imput,'not-empty-state')

            },
            add_cls_to_form(form,cls){
                form.addClass(cls);
            }
        }
    }
</script>

<style scoped>
.cross_button{
    color:#9e9e9e;
    text-align: center;
    font-size:22px;
    height:64px;
    padding-top:10px;
}
    .trash_btn{
        text-align: center;

    }


</style>