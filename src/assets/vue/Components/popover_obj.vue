<template>
    <!--Блок добавления чеклистов-->
    <f7-popover :class="'popover_add_obj_'+this.id" @popover:open="get_current_list()">
        <f7-block-title> {{this.$root.localization.pop_up.add_check}}</f7-block-title>
        <f7-block>
            <f7-list form>
                    <f7-list-item checkbox v-for="(item,index) in this.$root.check_list" :key="index" :title="item.title" @change="Check_item($event.target.checked,item)" :checked="checked_state(item.id)"></f7-list-item>
            <f7-grid class="popover_btn">
                <f7-col width="50"><f7-button  class="abort_button"  close-popover=".popover_add_obj">{{this.$root.localization.pop_up.cancel}}</f7-button></f7-col>
                <f7-col width="50"><f7-button fill @click="submit()"  close-popover=".popover_add_obj">{{this.$root.localization.pop_up.submit}}</f7-button></f7-col>
            </f7-grid>
            </f7-list>
        </f7-block>
    </f7-popover>
</template>

<script>
    export default {
        name: "popover_obj",
        props:{
            id:{type:String,default:"0"},
            check_list_from_audit:{type:Array,default:function(){return[]}},
            current_check_list:{type:Object,default:function(){return {}}}
        },
        data:function(){
            return{
                checked_items:this.current_check_list,
                result_array:[]
            }
        },
        methods:{
            get_current_list(){
               let self=this;
               this.check_list_from_audit.forEach(function(item){
                  self.$set(self.checked_items,item.id,item);
               });
            },
            Check_item(target,item){
               (target)?this.$set(this.checked_items,item.id,item):this.$delete(this.checked_items,item.id);
            },
            checked_state(id){
                let result=false;
                this.check_list_from_audit.forEach(function(items){
                   result=(items.id===id)?true:result;
               });
             return result;
            },
            submit(){
                let self=this;
                for (let key in self.checked_items){
                    let check_list_new={
                        "id": self.checked_items[key].id,
                        "title":self.checked_items[key].title,
                        "created_at":self.checked_items[key].created_at,
                        "requirement":[],
                        "audit_id":self.id
                    };
                    self.checked_items[key].requirement.forEach(function(req){
                        let new_req={
                            "id":req.id,
                            "title":req.title,
                            "status":0,
                            "checklist_id": self.checked_items[key].id,
                            "warning_level":req.warning_level,
                            "created_at":req.created_at,
                            "comments":[],
                            "disabled":false
                        };
                        check_list_new.requirement.push(new_req);
                    });
                    self.result_array.push(check_list_new);
                }

                this.$emit('select_check_list',this.result_array);
                this.result_array=[];
                this.checked_items={};
            }
        }
    }
</script>

<style scoped>
    .popover_btn{
        margin-top: 30px;
    }
    .list-block ul {

        overflow-Y:auto;
    }
</style>
