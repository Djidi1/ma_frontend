<template>
    <!--Блок с выбором существующих объектов для редактирования-->
    <f7-popover class="exist_pop_over">
        <f7-block-title> {{this.$root.localization.pop_up.select_pop_over}}</f7-block-title>
        <f7-block >
            <f7-list form>
                <f7-list-item radio name="select_object" v-for="(item,index) in list" :key="index" :title="item.title" @change="change_item(item,index)" :checked="select_item(item)"></f7-list-item>

                <f7-grid class="popover_btn">
                    <f7-col width="50"><f7-button  class="abort_button"  close-popover=".exist_pop_over">{{this.$root.localization.pop_up.cancel}}</f7-button></f7-col>
                    <f7-col width="50"><f7-button fill @click="submit()" close-popover=".exist_pop_over">{{this.$root.localization.pop_up.select}}</f7-button></f7-col>
                </f7-grid>
            </f7-list>
        </f7-block>
    </f7-popover>
</template>

<script>
    export default {
        name: "exist_objects_list",
        props:{
            list:{type:Array},
            current:{type:Object,default:function(){return {}}}
        },
        data:function(){
          return{
              current_inte:{},
              selected:{},
              index:''
          }
        },
        methods:{

            select_item(item){
               return((item.id===this.current.id));
            },
            change_item(item,index){
                this.selected=item;
                this.index=index
            },
            submit(){
                this.$emit('selected_object_done',this.selected,this.index);
                this.selected={};
                this.index='';
            }
        }
    }
</script>

<style scoped>
    .popover_btn{
        margin-top: 30px;
    }
</style>