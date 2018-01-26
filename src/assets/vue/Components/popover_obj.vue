<template>
    <f7-popover class="popover_add_obj">
        <f7-block-title> Add Check-list</f7-block-title>
        <f7-block>
            <f7-list form>
                <f7-list-item checkbox v-for="(item,index) in this.$root.check_list" :key="index" :title="item.name" @change="SelectItem($event.target.checked,index,item)"></f7-list-item>

            <f7-grid class="popover_btn">
                <f7-col width="50"><f7-button  class="abort_button"  close-popover=".popover_add_obj">Cancel</f7-button></f7-col>
                <f7-col width="50"><f7-button fill @click="SubmitNewObj"  close-popover=".popover_add_obj">Submit</f7-button></f7-col>
            </f7-grid>
            </f7-list>
        </f7-block>
    </f7-popover>
</template>

<script>
    var $$=Dom7;
    export default {
        name: "popover_obj",
        data:function(){
            return{
                checked_items:{},
                result_array:[]
            }
        },
        methods:{
            SubmitNewObj(){
                for (let prop in this.checked_items){
                   this.result_array.push(this.checked_items[prop]);
                }
                this.$emit('add_check',this.result_array)
                this.result_array=[];
                this.checked_items={};
                this.clean_check();
            },
            SelectItem(trg,index,item,){
                (trg)?this.$set(this.checked_items,index,item):this.$delete(this.checked_items,index);
            },
            clean_check(){
                let self=this;
                let element=this.$$(this.$el)
               element.find('input').forEach(function(item){
                   self.$$(item).prop('checked',false)
               })
            }



        }
    }
</script>

<style scoped>
    .popover_btn{
        margin-top: 30px;
    }
</style>