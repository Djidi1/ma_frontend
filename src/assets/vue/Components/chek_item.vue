<template>
    <div>
        <f7-list form class="check_list_items" :id="'list_itm_'+this.data_item.id" :class="class_result">
            <f7-list-item :id="this.data_item.id"  :title="data_item.title"  swipeout   @swipeout:closed="change_btn()">
                <f7-grid no-gutter class="item_grid" slot="inner">
                    <transition appear mode="out-in" name="slide-fade">
                        <check_box_item :button_type="true" :item_status="this.data_item.status" @change_status="change_item_status" :read="read" v-show="!data_item.disabled"></check_box_item>
                    </transition>
                    <transition appear mode="out-in" name="slide-fade">
                        <check_box_item :button_type="false" :item_status="this.data_item.status" @change_status="change_item_status" :read="read"  v-show="!data_item.disabled"></check_box_item>
                    </transition>
                    <f7-swipeout-actions v-if="!read">
                        <f7-swipeout-button overswipe close v-if="!data_item.disabled"> <i class="fa fa-ban disable_btn" aria-hidden="true" ></i> </f7-swipeout-button>
                        <f7-swipeout-button overswipe close v-else><i class="fa fa-check disable_btn" aria-hidden="true" ></i></f7-swipeout-button>
                    </f7-swipeout-actions>
                </f7-grid>

                <div slot="root" v-if="uploaded_with">
                        <transition  mode="out-in" name="comment-show">
                            <comment v-if="showComment" :data_comments="this.data_item.comments" :read="read"></comment>
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
            read:{type:Boolean,default:false},

        },

        computed:{
            showComment(){
                return (this.data_item.status===0)?false:(this.data_item.status===1)?false:true;
            },
            class_result(){
               return this.check_cls();
                //return (this.data_item.status===0)?"":(this.data_item.status===1)?"status_sucs":"status_false";
            },
            uploaded_with(){
                return (this.data_item.disabled)?false:(this.read)?(this.data_item.comments.length>0)?true:false:true;
            },

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

            change_btn(){
                this.data_item.disabled=!this.data_item.disabled;
                this.$ls.set('objects',this.$root.objects);
            },
            check_cls(){
                return (this.data_item.disabled)?"status_disbl":(this.data_item.status===0)?"":(this.data_item.status===1)?"status_sucs":"status_false";
            }
        }


    }
</script>

<style scoped>
.check_list_items{
    margin-top:0!important;
    transition: all 0.5s;
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
    .disable_btn{
        color: #f6f6f6 !important;
        font-size:30px;
    }

     .change-fade-enter-active,.slide-fade-leave-active {
      transition: all .1s ;
  }
    .change-fade-enter, .slide-fade-leave-to
    /* .slide-fade-leave-active до версии 2.1.8 */ {
    opacity: 0;
}

</style>