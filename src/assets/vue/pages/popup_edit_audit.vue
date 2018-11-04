<template>
    <!--Редактирвоание аудитов-->
    <!--<f7-popup :id="'popup_add_audit_'+audit.id">-->
        <!--<f7-view id="pop_up_audit_view">-->
            <!--<f7-pages navbar-through>-->
                <f7-page class="edit_audit_page">
                    <f7-navbar back-link="Back" sliding  @back-click.stop="close_edit()">
                        <f7-nav-center sliding>  <div v-if="!this.$root.online" style="display:inline-block; margin-right:2px">
                            <network></network>
                        </div>{{title}} </f7-nav-center>
                        <f7-nav-right>
                            <f7-grid class="crud_header edit_menu">
                                <f7-col width="30" ></f7-col>
                                <f7-col width="50" ><f7-link  @click="submit()"><div style="font-size:30px; "> <check></check> </div></f7-link></f7-col>
                                <f7-col width="10" ></f7-col>
                            </f7-grid>
                        </f7-nav-right>
                    </f7-navbar>

                    <f7-list media-list class="edit_audit_page">
                        <f7-list-item
                                :title="$root.localization.AuditPage.audit+' № '+this.audit_id"
                                :subtitle="data_formta(audit_current.created_at)"
                                :text="check_list_names(audit_current)">
                            <div slot="media">
                                <div style="text-align: center">
                                    <div v-if="(this.audit_current.check_list.length>0)" >
                                        <div v-if="!this.audit_current.error">
                                            <div v-if="(check_audit_status(this.audit_current))" class="new_audit_icon "><new_audit_icon></new_audit_icon> </div>
                                            <div v-else>
                                                <i v-if="allCheck(this.audit_current)"  class="icon cloud_no_sink cloud"> </i>
                                                <div v-else class="new_audit_icon "><new_audit_icon></new_audit_icon> </div>
                                            </div>
                                        </div>
                                       <div v-else>
                                           <i class="icon cloud_error cloud"></i>
                                       </div>
                                    </div>
                                    <div  v-else >
                                        <div class="no_check_list"> <no_check_list></no_check_list></div>
                                    </div>
                                </div>
                            </div>
                        </f7-list-item>
                    </f7-list>


                    <f7-list form>
                        <f7-list-item v-if="this.$root.check_list.length===0"
                                      :title="this.$root.localization.pop_up.no_check_list">
                            <div slot="root" style="padding:8px 16px;">
                                {{this.$root.localization.pop_up.no_check_list}}
                            </div>
                        </f7-list-item>
                        <f7-list-item
                                v-else
                                smart-select
                                :smart-select-back-on-select="true"
                                :smart-select-searchbar="true"
                                :smart-select-searchbar-placeholder="this.$root.localization.SearchBar.title"
                        >
                            <div class="item-title no-padding no-white_spacing">
                                {{this.$root.localization.pop_up.check_list_group}}
                            </div>
                            <select
                                    :name="this.$root.localization.pop_up.add_check"
                                    @change="check_group_select_done"
                            >
                                <option :value="null" selected>
                                    {{this.$root.localization.pop_up.no_check_cat_selected}}
                                </option>
                                <option v-for="(check_gruop_item,check_ind) in check_list_groups" :key="check_ind"
                                        :value="check_gruop_item[0].cl_category.id">
                                    {{check_gruop_item[0].cl_category.title}}
                                </option>
                                <div slot="after"></div>
                            </select>
                        </f7-list-item>
                    </f7-list>

                    <transition appear mode="out-in" name="slide-app">
                        <f7-list form v-if="check_list_arr.length>0">
                            <f7-list-item v-if="this.$root.check_list.length===0"
                                          :title="this.$root.localization.pop_up.no_check_list">
                                <div slot="root" style="padding:8px 16px;">
                                    {{this.$root.localization.pop_up.no_check_list}}
                                </div>
                            </f7-list-item>
                            <f7-list-item v-else
                                          smart-select
                                          :smart-select-back-on-select="true"
                                          :smart-select-searchbar="true"
                                          :smart-select-searchbar-placeholder="this.$root.localization.SearchBar.title"
                                          @click="custome_smart_page"
                            >
                                <div class="item-title no-padding no-white_spacing">
                                    {{this.$root.localization.pop_up.add_check}}
                                </div>
                                <select :name="this.$root.localization.pop_up.add_check" multiple="multiple"
                                        @change="check_select_done">
                                    <option v-for="(check_item,check_ind) in check_list_arr" :key="check_ind"
                                            :value="check_item.id" :selected="current_selected(check_item)">
                                        {{check_item.title}}
                                    </option>
                                </select>
                                <div slot="after"></div>
                            </f7-list-item>
                        </f7-list>
                    </transition>
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
                check_list_old:[],
                check_list_groups:[],
                check_list_arr:[]
            }
        },
        created(){
            let self=this;
            let obj=this.$_.findWhere(this.$root.objects,{id:Number(this.object_index)});
            this.audit_current=this.$_.findWhere(obj.audits,{id:Number(this.audit_id)});
            this.check_list_groups=this.$_.groupBy(this.$root.check_list,"cl_category_id");
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
            check_group_select_done(item){
                this.check_list_arr=(item.target.value!=null)?this.$_.filter(this.$root.check_list,function(c){
                    return c.cl_category_id===Number(item.target.value);
                }):[];
            },
            check_select_done(item){
                let self=this;
                let arr = Array.from(item.target.selectedOptions);
                arr.forEach(function(opt){
                    let check=self.$_.findWhere(self.$root.check_list,{id:Number($$(opt).val())});
                    if(self.$_.findWhere(self.audit_current.check_list,{id:Number(check.id)})===undefined) {
                        self.audit_current.check_list.push(self.add_check_list_to($$(opt).val()));
                    }
                });
                let deletedCheckLists = self.$_.difference(Array.from(item.target.options), Array.from(item.target.selectedOptions));
                this.audit_current.check_list.forEach(function(check,i){
                    if(self.$_.findWhere(deletedCheckLists,{_value:Number(check.id)}) !== undefined){
                        self.audit_current.check_list.splice(i,1);
                    }
                });
            },
            add_check_list_to(key){
                let self=this;
                let check=this.$_.findWhere(this.$root.check_list,{id:Number(key)});
                let check_list_new={
                    "id": check.id,
                    "title":check.title,
                    "created_at":check.created_at,
                    "requirement":[],
                    "audit_id":self.audit_current.id
                };
                check.requirement.forEach(function(req){
                    let new_req={
                        "id":req.id,
                        "title":req.title,
                        "status":0,
                        "checklist_id": check.id,
                        "warning_level":req.warning_level,
                        "created_at":req.created_at,
                        "comments":[],
                        "responsible":0,
                        "disabled":false
                    };
                    check_list_new.requirement.push(new_req);
                });
                return check_list_new;
            },
            submit(){
                let self=this;
                this.$ls.set('objects',this.$root.objects);
                this.$f7.mainView.back();
            },

            check_audit_status(str){
                let result = true;
                str.check_list.forEach(function (itm) {
                    itm.requirement.forEach(function (req) {
                        if (!req.disabled) {
                            result = (req.status != 0) ? false : result;
                        }
                    });
                });
                return (result) ? true : false;
            },
            allCheck(item){
                let result=false;
                item.check_list.forEach(function (itm) {
                    itm.requirement.forEach(function (req) {
                        if (!req.disabled) {
                            result = (req.status != 0) ? result : true;
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
            custome_smart_page(){
                let self=this;
                $$(document).on('pageBeforeInit','[data-page*="smart-select"]',function(e){
                    let page=e.detail.page;
                    // self.checkbox_view(page);
                    $$(page.container).find('.navbar-inner').append(self.get_html_button_done());
                    ($$(page.container).find('a.done').on('click',function(e){

                        self.select_check_list_done(page.container);
                    }));
                    $$(page.container).find('.left').css('width','56px');
                    $$(page.container).find('.left a').css('display','none');
                    // $$(page.container).find('.left a').on('click',function(e){
                    //     self.cancel_check_list_change($$(page.container));
                    // });
                })
            },
            select_check_list_done(page){
                $$(page.container).find('a.done').off('click');
                $$(document).off('pageBeforeInit','[data-page*="smart-select"]');
            },
            get_html_button_done(){
                return '<div class="right">' +
                    '<div class="row crud_header edit_menu">' +
                    '<div class="col-30">' +
                    '</div><div class="col-50">' +
                    '<a class="link done back" href="#"><div style="font-size:30px">' +
                    '<span role="img" aria-label="Check icon" class="material-design-icon check-icon">' +
                    '<svg width="30" height="30" viewBox="0 0 24 24" class="material-design-icon_svg" fill="#fff">' +
                    '<title>Check icon</title> <path d="M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z"></path>' +
                    '</svg> ' +
                    '</span>' +
                    '</div></a>' +
                    '</div>' +
                    '<div class="col-10"></div>' +
                    '</div>' +
                    '</div>'
            }


        }
    }
</script>

<style>
    .edit_audit_page .item-inner {
        display: block !important;
    }
    .edit_audit_page .item-after {
        margin: 0 !important;
        padding: 0 !important;
    }
</style>
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