<template>
    <div>
        <f7-list form class="check_list_items">
            <f7-list-item checkbox   name="checkbox" :id="this.data_id"  :title="data_item.discription" :checked="data_item.status" >
                <div slot="inner">
                    <f7-button  @click='show_comments(data_id)' ><i class='fa fa-commenting-o comments_button' aria-hidden='true'></i>  <f7-icon  f7="chevron_right" size="14" color="gray" style="opacity: 0.7; "></f7-icon> </f7-button>
                </div>
                <!--comments-->
                <div slot="root" class="animate_scroll"  >
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
            check_id:{ type: Number, default: 0 }
        },
        data:function(){
            return{

            }
        },
        computed:{
            hasComment(){
                return (this.data_item.comments.length>0)?true:false;
            }
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
</style>