<template>
    <f7-page  >
        <!-- Navbar -->
        <f7-navbar back-link="Back" sliding  >
            <f7-nav-center sliding> {{audit.title}}</f7-nav-center>
            <f7-nav-right v-if="!uploaded">
                <f7-link @click="popup_open=true"><i class="fa fa-pencil" aria-hidden="true"></i></f7-link>
                   <f7-link @click="remove_audit"> <i class="fa fa-trash-o" aria-hidden="true"></i></f7-link>
            </f7-nav-right>
        </f7-navbar>
        <div class="blck_info">
            <f7-card>
                <f7-card-header>
                        <div class="obj_info audit_obj">
                            <div class="row  no-gutter">
                                <div class="col-70">
                                    <div class="col-100">{{this.$root.localization.AuditPage.name}}:</div>
                                    <div class="col-100">{{audit.title}}</div>
                                    <div class="col-100">Id: {{audit.id}}</div>
                                    <div class="col-100">{{data_format}}</div>
                                    <div class="col-100"><f7-link no-link-class :href="'/object/'+this.audit.object_id+'/'">{{this.$root.objects[this.array_index_save].title}}</f7-link></div>
                                </div>
                                <div class="col-30 status" :style="this.block_height">
                                    <table>
                                        <tr>
                                            <td> <i :class="status" aria-hidden="true"></i></td>
                                        </tr>
                                    </table>
                                </div>
                            </div>
                        </div>
                </f7-card-header>

            </f7-card>

            <f7-card>
                   <f7-card-header>
                        {{this.$root.localization.AuditPage.check_list}}
                   </f7-card-header>
                        <f7-list media-list style="margin-bottom: 0!important;" v-if="hasCheck_list">
                            <f7-list-item v-for="(check,id) in this.audit.check_list" :key="id" :title="check.title" :link="'/check/'+audit.id+'/'+check.id" :media="realStatus(check)"></f7-list-item>
                        </f7-list>
                <f7-list v-else>
                            <f7-list-item  title="У данного аудита нет чек-листов."></f7-list-item>
                        </f7-list>
                <f7-card-footer>

                </f7-card-footer>
                </f7-card>
            <f7-card>
                <f7-list accordion class="acrd_custom">
                    <f7-list-item  accordion-item :title="this.$root.localization.AuditPage.comments_title" :after="comment_audit_count">
                        <f7-accordion-content>
                            <f7-block inner><text_area></text_area></f7-block>
                        </f7-accordion-content>
                    </f7-list-item>
                </f7-list>
            </f7-card>


            <f7-card v-if="!uploaded">
                <f7-block inner>
                    <f7-grid>
                        <!--<f7-col width="100">-->
                            <!--<f7-button @click="abort_check_list()" class="abort_button" color="gray"><i class="fa fa-undo" aria-hidden="true"></i> </f7-button>-->
                        <!--</f7-col>-->
                        <f7-col width="100">
                            <f7-button fill @click="check_list_status()"><i class="fa fa-check" aria-hidden="true"></i> Send</f7-button>
                        </f7-col>
                    </f7-grid>
                </f7-block>

            </f7-card>
        </div>
        <popup_audit_edit :opendPopup="popup_open" @close="popup_open=false"  :audit="this.audit"></popup_audit_edit>
    </f7-page>
</template>

<script>
    import Popup_audit_edit from "src/assets/vue/Components/popup_edit_audit";

    var $$=Dom7;
    export default {
        components: {Popup_audit_edit},
        name: "audit",
        props: {
            id: { type: String},
            array_index:{type:String}
        },
        data:function() {
            return {
                audit:{},
                acordianId:0,
                block_height:'',
                popup_open:false,
                array_index_save:this.array_index
            }
        },
        mounted:function(){
            this.$nextTick(function () {
                this.block_height=this.status_style()
            })
        },
        created:function(){
            this.audit=this.$root.objects[this.array_index].audits[this.id];
        },
        computed:{
            status(){
                let self=this;
                let result;
                result=(self.audit.upload)?self.upload_st_low(self.audit):"";
                return result;
            },
            hasCheck_list(){
                return (this.audit.check_list.length>0);
            },
            data_format(){
                let data=new Date(this.audit.created_at);
                let curSec=('0'+data.getSeconds()).substr(-2);
                let curMin=('0'+data.getMinutes()).substr(-2);
                let curDay=('0'+data.getDate()).substr(-2);
                let curMounth=('0'+(data.getMonth()+1));
                let date_for_text=curDay+"/"+curMounth+"/"+data.getFullYear()+" "+data.getHours()+":"+curMin+":"+curSec;
                return date_for_text;
            },
            uploaded(){
                return this.audit.upload;
            },
            comment_audit_count(){
                return (this.audit.comments)?"<i class='fa fa-commenting-o' aria-hidden='true'></i>"+this.audit.comments.length:"<i class='fa fa-commenting-o' aria-hidden='true'></i>";
            }
        },
        methods:{
            status_style(){
                let height_block=$$('.audit_obj').height();
                return {"height":height_block+"px"}
            },
            check_list_status(id){
                let self=this;
                this.$f7.confirm(this.$root.localization.modal.modalConfirmSend,this.$root.localization.modal.modalTextConf, function () {
                    let result_req_arr=[];
                    (self.audit.check_list).forEach(function(item,i,arr){
                        item.requirement.forEach(function(req,j){
                            req.status=(req.status!=1)?-1:req.status;
                        });
                    });
                    let requs={
                        "audit":{
                            "check_list":self.get_req(),
                            "id":self.audit.id,
                            "object_id":self.audit.object_id,
                            "date_add":self.GetCurrentDate(),
                            "title":self.audit.title
                        },
                    };
                    self.send_data_to_sev(requs);
                });

            },
            get_req(){
                let self=this;
                let result=[];
                this.audit.check_list.forEach(function(item){
                   let check_obj={
                       "audit_id":self.audit.id,
                       "id":item.id,
                       "title":item.title,
                       "requirement":[]
                    };
                   item.requirement.forEach(function(req){
                      let req_obj={
                          "id":req.id,
                          "status":req.status,
                          "comments":self.get_comments(req)
                      }
                       check_obj.requirement.push(req_obj);
                   });
                   result.push(check_obj);
                });
            return result;
            },
            get_comments(req){
                let self=this;
                let result=[];
                    req.comments.forEach(function(comm){
                        let comment_obj={
                            'text':comm.text
                        };
                        result.push(comment_obj);
                    });
                return result;
            },

            send_data_to_sev(data){
                let self=this;
                this.$f7.showPreloader(this.$root.localization.modal.preloader);
                this.$http.post('https://test.bh-app.ru/api/put-audits',data,{headers:{ 'Authorization':'Bearer ' + this.$root.auth_info.token}}).then(
                    response=>{
                      self.$f7.hidePreloader();
                      self.$set(this.audit,"id",response.body);
                      self.$set(this.audit,"upload",true);
                      self.$ls.set('objects',self.$root.objects);
                    },
                    response=>{
                        self.$f7.hidePreloader();
                        console.log("Error");
                    }
                );
            },






            abort_check_list(){
                let self=this;
                (this.audit.check_list).forEach(function(item,i,arr) {
                    item.requirement.forEach(function(req,j){
                        req.status=0;
                        self.$ls.set('objects',self.$root.objects);
                    });
                });
            },
            audit_change_status(){
               let list =this.audit.check_list;
               let status="new";
               list.forEach(function(item,i,arr){
                       if(item.status==="ok") status="ok";
                       if(item.status==="wrong") status="wrong";
                })
                this.audit.status=status;
                this.$root.update_ls();
            },

            upload_st_low(str){
                let result=true;
                let self=this;
                str.check_list.forEach(function(itm){
                    itm.requirement.forEach(function(req){
                        result=(req.status=1)?result:false;
                    });
                });
                return (result)?"fa fa-check fa-3x audit_good":"fa fa-times fa-3x audit_wrong";
            },

            remove_audit(){
                let self=this;
                this.$f7.confirm("",this.$root.localization.modal.modalTextConf, function () {
                    self.$root.objects[self.array_index].audits.splice(self.id,1);
                    self.$ls.set('objects',self.$root.objects);
                    self.$f7.views.main.back();
                })
            },
            cancelEdit(){
               this.audit=this.$root.list[this.obj_id].audits[this.id];

            },

            get_check_array(check_id){
                let self=this;
                let check_array=[];
                this.$root.check_list.forEach(function(item){
                    (item.id===check_id)?check_array.push(item):'';
                });
                return check_array;
            },
            GetCurrentDate(){
                let data=new Date(this.audit.date_add);
                let curSec=('0'+data.getSeconds()).substr(-2);
                let curMin=('0'+data.getMinutes()).substr(-2);
                let curDay=('0'+data.getDate()).substr(-2);
                let curMounth=('0'+(data.getMonth()+1));
                let date_for_text=curDay+"-"+curMounth+"-"+data.getFullYear()+" "+data.getHours()+":"+curMin+":"+curSec;
                console.log()
                return date_for_text;
            },
            realStatus(str){
                let self=this;
                let result;
                result=self.upload_st(str);
                return result;
            },
            upload_st(str){
                let result=true;
                let new_str;
                let self=this;
                    str.requirement.forEach(function(req){
                        new_str=(req.status===0)?true:false;
                        result=(req.status===1)?result:false;
                    });
                return (new_str)?"<i class='fa fa-circle fa-1x audit_new' aria-hidden='true'></i>":(result)?"<i class='fa fa-check fa-2x audit_good' aria-hidden='true'></i>":"<i class='fa fa-times fa-2x audit_wrong' aria-hidden='true'></i>";
            },

        }





    }
</script>

<style scoped>
.status{
    display: inline-block;
    background-color: transparent;
    text-align: center;

}
    .status table{
        width: 100%;
        height: 100%;
        text-align: center;
        vertical-align: middle;
        margin: 0;
        padding: 0;
        color:#ddd;
    }

    .blck_info .accordion-item{
        margin-bottom:0;
    }



</style>