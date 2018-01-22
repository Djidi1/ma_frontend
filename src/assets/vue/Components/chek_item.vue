<template>
    <div>
        <f7-list form class="check_list_items" :id="'list_itm_'+this.data_id">
            <f7-list-item :id="this.data_id"  :title="data_item.discription" >
                <div class="row">
                    <div class="col-50">
                    <label class="item-content label-checkbox sucsess_status"><i class="fa fa-thumbs-up" aria-hidden="true"></i>
                        <input name="checkbox" type="checkbox" :checked="status_true"  @change="checkbox_change(true)">
                        <div class="item-media">
                            <i class="icon icon-form-checkbox"></i>
                        </div>
                    </label>
                </div>
                    <div class="col-50">
                    <label class="item-content label-checkbox false_status"><i class="fa fa-thumbs-down" aria-hidden="true"></i>
                        <input name="checkbox" type="checkbox" :checked="status_false" @change="checkbox_change(false)">
                        <div class="item-media">
                            <i class="icon icon-form-checkbox"></i>
                        </div>
                    </label>
                    </div>
                </div>
                <!--comments-->
                <div slot="root" class="animate_scroll">
                    <f7-block inner  >
                        <transition appear mode="out-in" name="slide-fade" v-on:enter="resize()">
                            <comment v-if="hasComment" :data_comments="this.data_item.comments" @resize="resize"></comment>
                            <text_area v-else  :data_set="this.data_item.comments" @resize="resize"></text_area>
                        </transition>
                    </f7-block>
                </div>
            </f7-list-item>

        </f7-list>
    </div>

</template>

<script>
    var $$=Dom7;
    export default {
        name: "chek_item",
        props:{
            data_item:{ type: Object, default: '' },
            data_id:{ type: Number, default: 0 },
            obj_id:{ type: Number, default: 0 },
            audit_id:{ type: Number, default: 0 },
            check_id:{ type: Number, default: 0 },
        },
        data:function(){
            return{
                status_true:false,
                status_false:false
            }
        },
        computed:{
            hasComment(){
                return (this.data_item.comments.length>0)?true:false;
            }
        },
        created(){
            if(this.data_item.type!='new'){
                this.status_true=this.data_item.status;
                this.status_false=!this.data_item.status;
            }
        },
        mounted(){
          this.$nextTick(function(){
              if(this.data_item.type!='new'){
                  this.change_cls(this.data_item.status);
              }
            if (this.status_false) {
                this.animate_acrd(this.$$('#' + this.data_id).find('.animate_scroll'), undefined);
            }
          })
        },
        methods:{
            show_comments(val){
                let input=this.$$('#'+val).find('.animate_scroll');
                this.animate_acrd(input,undefined);
                let arrow=$$('#'+val).find('.f7-icons');
                let result=(arrow.html()==="chevron_right")?"chevron_down":"chevron_right";
                arrow.text(result);
            },
            animate_acrd(obj,resize_height){
                let self=this;
                let height=(resize_height!=undefined)?resize_height:(obj.height()===0)?self.getElHeight(obj):0;
                obj.animate({
                    'height':height
                },{
                    duration:250,
                    easing:'swing'
                })

            },
            getElHeight(obj){
                return obj.find('.content-block').height();
            },
           resize(){
                let self=this;
                let input=this.$$('#'+this.data_id).find('.animate_scroll');
                if (input.height()!=0) {
                        this.animate_acrd(input, this.getElHeight(input));
                }
           },
           checkbox_change(val){
               this.data_item.status=(val)?( this.data_item.status)?false:val:val;
               this.data_item.type="old";
               this.change_cls(val);
               this.status_false=!val;
               this.status_true=val;
               (!val)? this.animate_acrd(this.$$('#' + this.data_id).find('.animate_scroll'), undefined)
                   :(this.$$('#' + this.data_id).find('.animate_scroll').height()!=0)?this.animate_acrd(this.$$('#' + this.data_id).find('.animate_scroll'), 0):'';
            },
            change_cls(val){

                if(val){
                    this.$$('#list_itm_'+this.data_id).removeClass('status_false');
                    this.$$('#list_itm_'+this.data_id).toggleClass('status_sucs');
                }else{
                    this.$$('#list_itm_'+this.data_id).removeClass('status_sucs');
                    this.$$('#list_itm_'+this.data_id).toggleClass('status_false');
                }
            }
        }

    }
</script>

<style scoped>
.check_list_items{
    margin-top:0!important;
}
.animate_scroll{
    height: 0;
    overflow: hidden;
}
    .check_list_items .fa{
        color:#9e9e9e;
    }
    .false_status input[type=checkbox]:checked+.item-media i,icon-form-checkbox{
        background-color:#b51313!important;
        border-color: #b51313!important;
    }
    .sucsess_status input[type=checkbox]:checked+.item-media i,icon-form-checkbox{
        background-color: #019341 !important;
        border-color: #019341!important;
    }
    .check_list_items .label-checkbox .item-content :after{
        display:none!important;
    }





</style>