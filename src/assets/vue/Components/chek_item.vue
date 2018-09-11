<template>
    <!--Элементы списа чеклиста с требованием-->
    <div>
        <f7-list form class="check_list_items searchbar-found" id="search-list">
            <f7-list-item v-for="(item,item_id) in data_item" :key="item_id" :id="item.id"  :title="item.title"  swipeout @click="show_all_text"   @swipeout:closed="change_btn(item)" :class="class_result(item)" >
                <f7-grid no-gutter class="item_grid" slot="inner">
                    <transition appear mode="out-in" name="slide-fade">
                        <check_box_item :button_type="true" :item_status="Number(item.status)" :item="item" @change_status="change_item_status" :read="read" v-show="!item.disabled"></check_box_item>
                    </transition>
                    <transition appear mode="out-in" name="slide-fade">
                        <check_box_item :button_type="false"  :item_status="Number(item.status)" :item="item" @change_status="change_item_status_with_res" :read="read"  v-show="!item.disabled"></check_box_item>
                    </transition>
                    <f7-swipeout-actions v-if="!read">
                        <f7-swipeout-button overswipe close v-if="!item.disabled"><div style="font-size:34px"> <cancel></cancel> </div></f7-swipeout-button>
                        <f7-swipeout-button overswipe close v-else><div style="font-size:34px"> <check></check> </div></f7-swipeout-button>
                    </f7-swipeout-actions>
                </f7-grid>
                <div slot="root" v-if="(uploaded_with(item)?showComment(item):false)">
                    <transition  mode="out-in" name="comment-show">
                        <div style="padding:16px 16px">{{$root.localization.responsibl}} {{get_resp_name(item.responsible)}}</div>
                    </transition>
                    <transition  mode="out-in" name="comment-show">
                        <comment :data_comments="item.comments" :read="read"></comment>
                    </transition>
                </div>
            </f7-list-item>
        </f7-list>
        <f7-list form style="display:none" :id="'secret_smart_select'">
            <f7-list-item v-if="this.$root.responsible.length===0" :title="this.$root.localization.respons_empty">
            </f7-list-item>
            <f7-list-item smart-select :title="this.$root.localization.respons_title" :smart-select-back-on-select="true"
                          :smart-select-searchbar="true"
                          :smart-select-searchbar-placeholder="this.$root.localization.SearchBar.title"
                          class="no-padding"
                            >
                <select  :name="this.$root.localization.pop_up.select_pop_over" @change="selected_object_done">
                    <option :value="null" selected>{{this.$root.localization.response_blank}} </option>
                    <option  v-for="(obj) in this.$root.responsible" :key="obj.id" :value="obj.id"  >{{obj.name}} </option>
                </select>
                <div slot="after"></div>
            </f7-list-item>
        </f7-list>
    </div>

</template>

<script>
    import Check_box_item from "src/assets/vue/Components/check_box_item";
    import  cancel from "vue-material-design-icons/cancel.vue"
    import  check from "vue-material-design-icons/check.vue"
    var $$ = Dom7;
    export default {
        components: {
            Check_box_item,
            cancel,
            check,
        },
        name: "chek_item",
        data:function(){
            return {
                current_check:0
            }
        },
        props:{
            data_item:{ type: Array, default: function(){return[]} },
            read:{type:Boolean,default:false},
        },
        methods: {
            showComment(item){
                return (Number(item.status)===0)?false:(Number(item.status)===1)?false:true;
            },
            class_result(item){
                return this.check_cls(item);
                //return (this.data_item.status===0)?"":(this.data_item.status===1)?"status_sucs":"status_false";
            },
            uploaded_with(item){
                return (item.disabled)?false:(this.read)?(item.comments.length>0)?true:false:true;
            },
            change_item_status(val,item){
                let self=this;
                item.status=(val===item.status)?0:val;
                this.$set(item,'checked_at',self.GetCurrentDate());
                this.$ls.set('objects',this.$root.objects);
            },
            GetCurrentDate(){
                let now= new Date();
                return now;
            },
            change_btn(item){
                item.disabled=!item.disabled;
                this.$ls.set('objects',this.$root.objects);
            },
            check_cls(item){
                return (item.disabled)?"status_disbl":(Number(item.status)===0||Number(item.status>3))?"":(Number(item.status)===1)?"status_sucs":"status_false";
            },
            show_all_text(event){
                if($$(event.target).parent().hasClass('item-inner')){
                    $$(event.target).toggleClass('show_title');
                }else{
                    $$(event.target).find('.item-title').toggleClass('show_title');
                }
            },
            getPhotoFail(message) {
                this.$f7.alert('error:' + message, this.$root.localization.pop_up.warning);
            },
            change_item_status_with_res(val,item){
                let self=this;
                if (val===item.status){
                    item.status=0;
                    item.responsible=undefined;
                    this.$set(item,'checked_at',self.GetCurrentDate());
                    this.$ls.set('objects',this.$root.objects);
                }else{
                    this.current_check=item.id;
                    this.$f7.smartSelectOpen('#secret_smart_select .smart-select');
                    this.check=item;
                }
            },
            selected_object_done(item){
                this.check.responsible=Number(item.target.value);
                this.check.status=-1;
                this.$set(item,'checked_at',this.GetCurrentDate());
                this.$ls.set('objects',this.$root.objects);
            },
            get_resp_name(id){
                return this.$_.findWhere(this.$root.responsible,{id:id}).name
            }
        }
    }
</script>

<style scoped>
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