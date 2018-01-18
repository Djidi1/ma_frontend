<template>
    <div>
        <f7-list form class="check_list_items">
            <f7-list-item checkbox   name="checkbox" :id="this.data_id"  :title="data_item.discription" :checked="data_item.status" >
                <div slot="inner">
                    <f7-button  @click='show_comments(data_id)' ><i class='fa fa-commenting-o comments_button' aria-hidden='true'></i>  <f7-icon  f7="chevron_right" size="14" color="gray" style="opacity: 0.7; "></f7-icon> </f7-button>
                </div>
                <!--comments-->
                <div slot="root" class="animate_scroll"  >
                  <!--&lt;!&ndash; <transition name="slide-fade">&ndash;&gt;-->
                    <f7-block inner  >
                            <comment v-if="hasComment" :data_comments="this.data_item.comments"></comment>
                            <text_area v-else @test='test' :data_set="this.data_item.comments"></text_area>
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
        created:function(){
          // this.data=this.$root.list[this.obj_id].audits[this.audit_id].check_list[this.check_id].list_to_check[this.data_id].comments;

        },
        computed:{
            hasComment(){
                return (this.data_item.comments.length>0)?true:false;
            }
        },
        methods:{
            show_comments(val){
                let input=$$('#'+val).find('.animate_scroll');
                this.animate(input,false);
                let arrow=$$('#'+val).find('.f7-icons');
                let result=(arrow.html()==="chevron_right")?"chevron_down":"chevron_right";
                arrow.text(result);
            },
            animate(obj,type){
                let self=this;
                let duration=(type)?75:0;
                setTimeout(function(){
                    let height=(type)?self.getElHeight(obj):(obj.height()===0)?self.getElHeight(obj):0;
                    obj.animate({
                        'height':height
                    },{
                        duration:250,
                        easing:'swing'
                    })
                },duration);

            },
            getElHeight(obj){
                return obj.find('.content-block').height();
            },
            test(){
               this.show=!this.show;
               this.animate($$('#'+this.data_id).find('.animate_scroll'),true);
            },
            test_react(comment,id){
                console.log(comment);
                this.data[id]=comment;
                console.log(this.$root.list)
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