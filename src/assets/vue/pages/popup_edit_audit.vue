<template>
    <!--Редактирвоание аудитов-->
    <!--<f7-popup :id="'popup_add_audit_'+audit.id">-->
        <!--<f7-view id="pop_up_audit_view">-->
            <!--<f7-pages navbar-through>-->
                <f7-page>
                    <f7-navbar back-link="Back" sliding  @back-click.stop="close_edit()">
                        <f7-nav-center sliding> {{title}} </f7-nav-center>
                        <f7-nav-right>
                            <f7-grid class="crud_header edit_menu">
                                <f7-col width="30" ></f7-col>
                                <f7-col width="50" ><f7-link  @click="submit()"><div style="font-size:30px; "> <check></check> </div></f7-link></f7-col>
                                <f7-col width="10" ></f7-col>
                            </f7-grid>
                        </f7-nav-right>
                    </f7-navbar>

                    <f7-list media-list>
                        <f7-list-item
                                :title="$root.localization.AuditPage.audit+' № '+this.audit_id"
                                :subtitle="data_formta(audit_current.created_at)"
                                :text="check_list_names(audit_current)">
                            <div slot="media">
                                <div style="text-align: center">
                                    <div v-if="(this.audit_current.check_list.length>0)" >
                                        <div v-if="(check_audit_status(this.audit_current))" class="new_audit_icon "><new_audit_icon></new_audit_icon> </div>
                                        <i v-else class="icon cloud_no_sink cloud"> </i>
                                    </div>
                                    <div  v-else >
                                        <div class="no_check_list"> <no_check_list></no_check_list></div>
                                    </div>
                                </div>
                            </div>
                        </f7-list-item>
                    </f7-list>

                    <f7-list form>
                        <f7-list-item  smart-select :title="this.$root.localization.pop_up.add_check" :smart-select-back-on-select="true"
                                       :smart-select-searchbar="true"
                                       :smart-select-searchbar-placeholder="this.$root.localization.SearchBar.title"
                                       class="no-padding">
                            <select  :name="this.$root.localization.pop_up.add_check"  multiple="multiple" @change="check_select_done" >
                                <option v-for="(check_item,check_ind) in this.$root.check_list" :key="check_ind" :value="check_ind" :selected="current_selected(check_item)"> {{check_item.title}}</option>
                            </select>
                            <div slot="after"></div>
                        </f7-list-item>
                    </f7-list>
                </f7-page>
</template>

<script>
    import  trash from "vue-material-design-icons/delete.vue"
    import  check from "vue-material-design-icons/check.vue"
    import  new_audit_icon from "vue-material-design-icons/alert-circle-outline.vue"
    import no_check_list from "vue-material-design-icons/playlist-remove.vue"
    let $$=Dom7;
    export default {
        name: "popup_audit_edit",
        components:{
            trash,
            check,
            new_audit_icon,
            no_check_list
        },
        props:{
            object_index: { type: String},
            audit_id:{type:String}

        },
        data:function(){
            return{
                title:this.$root.localization.pop_up.edit,
                audit_current:{},
                current:'',
                check_list_new:[],
                check_list_old:[]
            }
        },
        created(){
            let self=this;
            this.audit_current=this.$_.findWhere(this.$root.objects[this.object_index].audits,{id:Number(this.audit_id)})
            this.audit_current.check_list.forEach(function(chk_old){
                self.check_list_old.push(chk_old);
            });
        },
        methods:{
            close_edit(){
                this.audit_current.check_list=this.check_list_old;
                this.$f7.mainView.back();
            },
            current_selected(item){
                let result='';
                this.audit_current.check_list.forEach(function(check){
                    result=(check.id===item.id)?'selected':result;
                });
              return result
            },
            check_select_done(item){
             this.audit_current.check_list=[];
                let self=this;
                let arr = Array.from(item.target.selectedOptions);
                arr.forEach(function(opt){
                    self.audit_current.check_list.push(self.add_check_list_to($$(opt).val()))
                });
            },
            add_check_list_to(key){
                let self=this;
                let check_list_new={
                    "id": self.$root.check_list[key].id,
                    "title":self.$root.check_list[key].title,
                    "created_at":self.$root.check_list[key].created_at,
                    "requirement":[],
                    "audit_id":self.audit_current.id
                };
                self.$root.check_list[key].requirement.forEach(function(req){
                    let new_req={
                        "id":req.id,
                        "title":req.title,
                        "status":0,
                        "checklist_id": self.$root.check_list[key].id,
                        "warning_level":req.warning_level,
                        "created_at":req.created_at,
                        "comments":[],
                        "disabled":false
                    };
                    check_list_new.requirement.push(new_req);
                });
                return check_list_new;
            },
            submit(){
                let self=this;
                    this.check_list_new.forEach(function(itm){
                        self.audit_current.check_list.push(itm);;
                    });
                    this.$ls.set('objects',this.$root.objects);
                 this.$f7.mainView.back();
            },

            check_audit_status(str){
                let self = this;
                let result;
                result = self.upload_st(str);
                return result;
            },
            upload_st(str) {
                let result = true;
                let self = this;
                str.check_list.forEach(function (itm) {
                    itm.requirement.forEach(function (req) {
                        if (!req.disabled) {

                            result = (req.status != 0) ? result : false;
                        }
                    });
                });
                return (result) ? false : true;
            },
            //Ковертируем дату в удобный вид.
            data_formta(data) {
                data = new Date(data);
                // let curSec = ('0' + data.getSeconds()).substr(-2);
                let curMin = ('0' + data.getMinutes()).substr(-2);
                let curDay = ('0' + data.getDate()).substr(-2);
                let curMounth = ('0' + (data.getMonth() + 1));
                return curDay + "." + curMounth + "." + data.getFullYear() + " " + data.getHours() + ":" + curMin/* + ":" + curSec*/;
            },
            check_list_names(itm){
                let result=""
                itm.check_list.forEach(function(name){
                    result=result+name.title+",<br> "
                });

                return result.substring(0,result.length-6)
            },


        }
    }
</script>

<style scoped>
    .add_check_btn{
        margin-top:10px;
    }
    .btn_complete{
        width:100%;
        padding:0 15px 0 15px;
        margin-top:15px;
        margin-bottom:15px;
    }
    .btn_pop_up_main{
        margin-bottom:30px;
        margin-top:40px;
    }
    .btn_pop_up_card{
        padding: 8px;
        box-shadow: unset;
        -moz-box-shadow: unset;
        -o-box-shadow: unset;
        -webkit-box-shadow: unset;
    }
    .btn_pop_up_card:after{
        display:none;
    }
</style>