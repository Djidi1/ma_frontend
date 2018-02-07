<template>
    <div>
        <f7-list form class="check_list_items" :id="'list_itm_'+this.data_item.id" :class="class_result">
            <f7-list-item :id="this.data_item"  :title="data_item.title" >
                <f7-grid no-gutter>
                    <check_box_item :button_type="true" :item_status="this.status" @change_status="change_item_status"></check_box_item>
                    <check_box_item :button_type="false" :item_status="this.status" @change_status="change_item_status"></check_box_item>
                </f7-grid>
                <div slot="root" >
                        <transition  mode="out-in" name="comment-show">
                            <comment v-if="showComment" :req_id="this.data_item.id"></comment>
                        </transition>
                </div>
            </f7-list-item>
        </f7-list>
    </div>

</template>

<script>
    import Check_box_item from "src/assets/vue/Components/check_box_item";

    var $$=Dom7;
    export default {
        components: {Check_box_item},
        name: "chek_item",
        props:{
            data_item:{ type: Object, default: '' },
        },
        data:function(){
            return{
                status:0
            }
        },
        computed:{
            showComment(){
                return (this.status===0)?false:(this.status===1)?false:true;
            },
            class_result(){
                return (this.status===0)?"":(this.status===1)?"status_sucs":"status_false";
            }
        },
        methods: {
            change_item_status(val){
                this.status=(this.status===val)?0:val;
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

    .check_list_items .label-checkbox .item-content :after{
        display:none!important;
    }


    .comment-show-enter-active,.slide-fade-leave-active {
        transition: all .5s ;
    }
    .comment-show-enter, .slide-fade-leave-to
    /* .slide-fade-leave-active до версии 2.1.8 */ {
    //transform: translateY(-20px);
    opacity: 0;
}



</style>