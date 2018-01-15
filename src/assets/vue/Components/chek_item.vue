<template>
    <div>
        <f7-list form class="check_list_items">
            <f7-list-item checkbox   name="checkbox" :id="data_item.id"  :title="data_item.discription" :checked="data_item.status" >
                <div slot="inner">
                    <f7-button  @click='show_comments(data_item.id,$event)' ><i class='fa fa-commenting-o comments_button' aria-hidden='true'></i>  <f7-icon  f7="chevron_right" size="14" color="gray" style="opacity: 0.7"></f7-icon> </f7-button>
                </div>
                <!--comments-->
                <div slot="root">
                    <transition name="slide-fade">
                    <f7-block inner  v-if="show">
                        <comment  v-for="comment in data_item.comments" :key="comment.id" :data_comments="comment"></comment>
                        <text_area v-show="hasComment"></text_area>
                    </f7-block>
                    </transition>
                </div>
            </f7-list-item>

        </f7-list>
    </div>

</template>

<script>
    var $$=Dom7;
    import textarea from '../Components/textarea_comment.vue'
    import comment from '../Components/comment.vue'
    export default {
        name: "chek_item",
        props:{
            data_item:{ type: Object, default: '' }
        },
        components:{
            comment:comment,
            text_area:textarea
        },
        data:function(){
            return{
                show:false
            }
        },
        methods:{
            show_comments(val,e){
                let input=$$('#'+val).find('input');
                let arrow=$$('#'+val).find('.f7-icons');
                let result=(arrow.html()==="chevron_right")?"chevron_down":"chevron_right";
                this.show=!this.show;
                arrow.text(result);

            },
        },
        computed:{
            hasComment(){
                return (this.data_item.comments.length===0);
            }
        }

    }
</script>

<style scoped>
.check_list_items{
    margin-top:0!important;
}
    .check_list_items .fa{
        color:#9e9e9e;
    }
</style>