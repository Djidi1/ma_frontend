<template>
    <div>
        <f7-list form class="check_list_items" :id="'list_itm_'+this.data_item.id" :class="class_result">
            <f7-list-item :id="this.data_item.id"  :title="data_item.title" >
                <f7-grid no-gutter class="item_grid">
                    <check_box_item :button_type="true" :item_status="this.data_item.status" @change_status="change_item_status"></check_box_item>
                    <check_box_item :button_type="false" :item_status="this.data_item.status" @change_status="change_item_status"></check_box_item>
                </f7-grid>
                <div slot="root" >
                        <transition  mode="out-in" name="comment-show">
                            <comment v-if="showComment" :data_comments="this.data_item.comments"></comment>
                        </transition>
                </div>
            </f7-list-item>
        </f7-list>
    </div>

</template>

<script>
    import Check_box_item from "src/assets/vue/Components/check_box_item";

    export default {
        components: {Check_box_item},
        name: "chek_item",
        props:{
            data_item:{ type: Object, default: '' },
        },
        computed:{
            showComment(){
                return (this.data_item.status===0)?false:(this.data_item.status===1)?false:true;
            },
            class_result(){
                return (this.data_item.status===0)?"":(this.data_item.status===1)?"status_sucs":"status_false";
            }
        },
        methods: {
            change_item_status(val){
                let self=this;
                this.data_item.status=(val===this.data_item.status)?0:val;
                this.$set(this.data_item,'checked_at',self.GetCurrentDate());
                this.$ls.set('objects',this.$root.objects);
            },
            GetCurrentDate(){
                let now= new Date();
                return now;
            },
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
    /*//transform: translateY(-20px);*/
    opacity: 0;
}
    .item_grid{
        min-width:141.72px;
    }



</style>