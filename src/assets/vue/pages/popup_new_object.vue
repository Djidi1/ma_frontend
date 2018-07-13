<template>
    <!--Создание новго объкта с аудитами и чек листами-->
    <!--<f7-popup id="popup_add" >-->
        <!--<f7-view id="popup-view-object">-->
            <!--<f7-pages navbar-through>-->
            <f7-page>
                <f7-navbar back-link="Back" sliding @back-click.stop="closePopUp(true)" >
                    <f7-nav-center sliding> {{this.title}}</f7-nav-center>
                    <f7-nav-right>
                        <f7-grid class="crud_header edit_menu">
                            <f7-col width="30" ></f7-col>
                            <f7-col width="50" ><f7-link  @click="submit()"> <div style="font-size:30px; "> <check></check> </div></f7-link></f7-col>
                            <f7-col width="10" ></f7-col>
                        </f7-grid>
                    </f7-nav-right>
                </f7-navbar>

                <div class="blck_info popup_card">


                    <f7-list form>
                        <f7-list-item smart-select :title="this.$root.localization.pop_up.select_ex" :smart-select-back-on-select="true"
                                      :smart-select-searchbar="true"
                                      :smart-select-searchbar-placeholder="this.$root.localization.SearchBar.title"
                                      class="no-padding">
                            <select  :name="this.$root.localization.pop_up.select_ex" @change="selected_group_done" >
                                <option :value="null" selected> {{this.$root.localization.pop_up.no_group_selected}}</option>
                                    <option  v-for="group in sorted_array" :key="group[0].group_id" :value="group[0].group_id"  >{{group[0].group_title}} </option>
                            </select>
                            <div slot="after">{{text_for_after}}</div>
                        </f7-list-item>
                    </f7-list>




                    <transition appear mode="out-in" name="slide-app">
                        <f7-list form  v-if="this.sorted_array_objects.length>0">
                            <f7-list-item smart-select :title="this.$root.localization.pop_up.select_pop_over" :smart-select-back-on-select="true" v-if="this.sorted_array_objects.length>0"
                                          :smart-select-searchbar="true"
                                          :smart-select-searchbar-placeholder="this.$root.localization.SearchBar.title"
                                          class="no-padding">
                                <select  :name="this.$root.localization.pop_up.select_pop_over" @change="selected_object_done">
                                    <option :value="null" selected>{{this.$root.localization.pop_up.no_objet_selected}} </option>
                                    <option  v-for="(obj) in this.sorted_array_objects" :key="obj.id" :value="obj.id"  >{{obj.title}} </option>
                                </select>
                                <div slot="after"></div>
                            </f7-list-item>
                        </f7-list>
                    </transition>


                    <transition appear mode="out-in" name="slide-app">
                        <f7-list form v-if="Object.keys(selected_object).length > 0">
                            <f7-list-item v-if="this.$root.check_list.length===0" :title="this.$root.localization.pop_up.no_check_list">
                                <div slot="root" style="padding:8px 16px;">{{this.$root.localization.pop_up.no_check_list}}</div>
                            </f7-list-item>
                            <f7-list-item  smart-select :title="this.$root.localization.pop_up.check_list_group" :smart-select-back-on-select="true" v-else
                                           :smart-select-searchbar="true"
                                           :smart-select-searchbar-placeholder="this.$root.localization.SearchBar.title"
                                           class="no-padding no-white_spacing"
                                           >
                                <select  :name="this.$root.localization.pop_up.add_check"  @change="check_group_select_done" >
                                    <option :value="null" selected>{{this.$root.localization.pop_up.no_check_cat_selected}} </option>
                                    <option v-for="(check_gruop_item,check_ind) in check_list_groups" :key="check_ind" :value="check_gruop_item[0].cl_category.id"> {{check_gruop_item[0].cl_category.title}}</option>
                                </select>
                                <div slot="after">{{text_for_after}}</div>
                            </f7-list-item>
                        </f7-list>
                    </transition>




                    <transition appear mode="out-in" name="slide-app">
                        <f7-list form v-if="check_list_arr.length > 0">
                            <f7-list-item v-if="this.$root.check_list.length===0" :title="this.$root.localization.pop_up.no_check_list">
                                <div slot="root" style="padding:8px 16px;">{{this.$root.localization.pop_up.no_check_list_text}}</div>
                            </f7-list-item>

                            <f7-list-item  smart-select :title="this.$root.localization.pop_up.add_check" :smart-select-back-on-select="true" v-else
                                          :smart-select-searchbar="true"
                                          :smart-select-searchbar-placeholder="this.$root.localization.SearchBar.title"
                                          class="no-padding"
                                          @click="custome_smart_page">
                                <select  :name="this.$root.localization.pop_up.add_check"  multiple="multiple" @change="check_select_done" >
                                        <option v-for="(check_item,check_ind) in check_list_arr" :key="check_ind" :value="check_item.id"> {{check_item.title}}</option>
                                </select>
                                <div slot="after">{{text_for_after}}</div>
                            </f7-list-item>
                        </f7-list>

                    </transition>
                </div>
            </f7-page>
            <!--</f7-pages>-->
        <!--</f7-view>-->
    <!--</f7-popup>-->
</template>

<script>
    let $$=Dom7;

    import  check from "vue-material-design-icons/check.vue"
    export default {
        name: "popup_new_object",
        components:{
            check
        },
        data:function(){
          return{
              title:'',
              old_check_list:[],
              sorted_array:{},
              sorted_array_objects:[],
              check_list_arr:[],
              selected_object:{},
              current:0,
              audits:[],
              edit:false,
              have_something:false,
              audit_was_add:false,
              object_selected:false,
              text_for_after:'',
              check_list_selected:[],
              check_list_groups:{}
          }
        },
        created(){
            this.title=this.$root.localization.pop_up.new;
            this.select_list=(this.$root.objects.length>0)?this.$root.objects:'';
        },
        mounted(){
            this.$nextTick(function(){
                this.sorted_array=this.$_.groupBy(this.$root.objects,'group_id');
                this.check_list_groups=this.$_.groupBy(this.$root.check_list,"cl_category_id");
            });
        },
        methods:{
            closePopUp(mode){
                (!this.edit)? this.clear_data():'';
                (mode)? this.$root.objects=this.$ls.get('objects'):'';
                // this.$f7.views.main.router.load({url:'/page/'});
                 this.$f7.mainView.back();
            },
            GetCurrentDate(){
                return new Date();
            },
            selected_group_done(item){
              let self=this;
              this.sorted_array_objects=(self.$_.filter(self.$root.objects,{group_id:Number(item.target.value)}))
              if (this.sorted_array_objects.length===0)this.error_search() ;
            },
            selected_object_done(item){
                let self=this;
                let result_search={}
                result_search=(self.$_.findWhere(self.$root.objects,{id:Number(item.target.value)}));
                (!result_search)?this.error_search():this.show_selected(result_search);
            },
            show_selected(item){
                this.selected_object=item;
                    this.add_audit();
            },
            error_search(){
              this.selected_object={};
            },
            check_group_select_done(item){
                this.check_list_arr=(item.target.value!=null)?this.$_.filter(this.$root.check_list,function(c){
                    return c.cl_category_id===Number(item.target.value);
                }):[];
            },
            check_select_done(item){
                this.audits[0].check_list=[];
                let self=this;
                let arr = Array.from(item.target.selectedOptions);
                arr.forEach(function(opt){
                    self.audits[0].check_list.push(self.add_check_list_to($$(opt).val()))
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
                    "audit_id":self.audits[0].id
                };

                check.requirement.forEach(function(req){
                    let new_req={
                        "id":req.id,
                        "title":req.title,
                        "status":0,
                        "checklist_id":check.id,
                        "warning_level":req.warning_level,
                        "created_at":req.created_at,
                        "comments":[],
                        "disabled":false
                    };
                    check_list_new.requirement.push(new_req);
                });
                return check_list_new;
            },
            get_audits(audits){
                let result=[];
                audits.forEach(function(item){
                   result.push(item);
                });
                return result;
            },
            add_audit(){
              let new_audit={
                  "id":this.getlastid_audit(),
                  "title":'',
                  "date_add":this.GetCurrentDate(),
                  "created_at":this.GetCurrentDate(),
                  "comments":[],
                  "check_list":[],
                  "object_id":(Object.keys(this.selected_object).length!=0)?this.selected_object.id:'Offline_'+this.getlastid(),
                  "upload":false,
                  "downloaded":false
              };
              this.audits.push(new_audit);
              this.audit_was_add=true;

    },
            get_object(id){
                let self=this;
                let result={};
                this.$root.objects.forEach(function(item){
                   result=(item.id.toString()===id)?item:result;
                });
                return result;
            },
            getlastid(){
              return this.$root.objects.length-1;
            },
            getlastid_audit(){
                return (this.selected_object.audits.length*(-1));
            },
            submit(){
                    if((Object.keys(this.selected_object).length > 0)){
                        this.selected_object.audits.push(this.audits[0]);
                         this.$ls.set('objects',this.$root.objects);
                    }
                    this.closePopUp();

            },
            clear_data(){
              this.selected_object={};
              this.current=0;
               this.sorted_array_objects=[];
              let opt=($$('select')[0]);
              $$(opt).val('');
              $$(".smart-select .item-after").html("Нет группы");
              let opt_obj=($$('select')[1]);
              $$(opt_obj).val('');
              $$(".smart-select .item-after").html("");
              this.audits=[];
              this.have_something=false;
              this.audit_was_add=false;


            },
            custome_smart_page(){
                let self=this;
                self.old_check_list=self.audits[0].check_list;
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
                $$(page.container).find('a.back').off('click');
                $$(document).off('pageBeforeInit','[data-page*="smart-select"]');
            },
            cancel_check_list_change(page){
                let self=this;
                // self.clean_check(page);
                self.audits[0].check_list=self.old_check_list;
                $$(page.container).find('a.back').off('click');
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

<style scoped>
    .add_list {
        margin: 0 0 15px 0 !important;

    }
    .add_button_obj{
        padding-top:20px;
    }
    .obj_new_block{
        padding:0;
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
    .btn_select_obj{
        color: #2196f3;
        background-color:transparent;
    }

</style>