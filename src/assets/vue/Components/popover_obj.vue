<template>
    <f7-popover class="popover_add_obj">
        <f7-block-title> {{this.$root.localization.pop_up.add_check}}</f7-block-title>
        <f7-block>
            <f7-list form>
                    <f7-list-item checkbox v-for="(item,index) in this.$root.check_list" :key="index" :title="item.title" ></f7-list-item>
            <f7-grid class="popover_btn">
                <f7-col width="50"><f7-button  class="abort_button"  close-popover=".popover_add_obj">{{this.$root.localization.pop_up.cancel}}</f7-button></f7-col>
                <f7-col width="50"><f7-button fill   close-popover=".popover_add_obj">{{this.$root.localization.pop_up.submit}}</f7-button></f7-col>
            </f7-grid>
            </f7-list>
        </f7-block>
    </f7-popover>
</template>

<script>
    export default {
        name: "popover_obj",
        data:function(){
            return{
                checked_items:{},
                result_array:[]
            }
        },
    }
</script>

<style scoped>
    .popover_btn{
        margin-top: 30px;
    }
</style>