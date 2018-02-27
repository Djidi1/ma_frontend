<template>
    <f7-page>
        <f7-navbar back-link="Back" sliding  >
            <f7-nav-center sliding> {{check.title}}</f7-nav-center>
        </f7-navbar>
        <div class="blck_info">
        <f7-card>
            <f7-card-header>
                <f7-grid style="width:100%; min-height:34px">
                    <f7-col width="70" style="line-height: 34px">Требования к чек-листу</f7-col>
                    <f7-col width="30" style="text-align: center"><i :class="status" aria-hidden='true'></i> </f7-col>
                </f7-grid>
            </f7-card-header>
            <f7-card-content class="check_content">
                <check_item v-for="(item,item_id) in check.requirement" :key="item_id"  :data_item="item" :read="uploaded"></check_item>
            </f7-card-content>
        </f7-card>

            <f7-card v-if="!uploaded">
                <f7-block inner>
                    <f7-grid>
                        <f7-col width="50">
                            <f7-button @click="abort_check_list()" class="abort_button" color="gray"><i class="fa fa-undo" aria-hidden="true"></i> </f7-button>
                        </f7-col>
                        <f7-col width="50">
                            <f7-button fill @click="check_list_status()"><i class="fa fa-check" aria-hidden="true"></i> </f7-button>
                        </f7-col>
                    </f7-grid>
                </f7-block>

            </f7-card>

        </div>


    </f7-page>
</template>

<script>
    export default {
        name: "check",
        props:{
            audit_id:{type:String},
            check_id:{type:String}
        },
        data:function(){
            return{
                check:{},
                uploaded:false
            }
        },
        created(){
            let self=this;
            this.$root.objects.forEach(function(obj){
                obj.audits.forEach(function(audit){
                    if (Number(audit.id)===Number(self.audit_id)|| audit.id===self.audit_id){
                    self.uploaded=audit.upload;
                    audit.check_list.forEach(function(ch){
                        self.check=(ch.id===Number(self.check_id))?ch:self.check;
                    })
                    }
                })
            })
        },
        computed:{
            status(){
                let self=this;
                let result;
                result=self.upload_st(self.check);
                return result;
            }
        },
        methods:{
            upload_st(str){
                 let result=true;
                let new_str=true;
                let self=this;
                str.requirement.forEach(function(req){
                    new_str=(req.status===0)?new_str:false;
                    result=(req.status===1)?result:false;
                });
                return (new_str)?"":(result)?"fa fa-check fa-2x audit_good":"fa fa-times fa-2x audit_wrong";
            },
            abort_check_list(){
                let self=this;
                self.check.requirement.forEach(function(req,j){
                        req.status=0;
                        self.$ls.set('objects',self.$root.objects);

                });

            },
            check_list_status(){
                let self=this;
                self.check.requirement.forEach(function(req){
                    req.status=(req.disabled)?req.status:(req.status===0)?-1:req.status;
                });
                this.$f7.views.main.back()
            }
        }

    }
</script>

<style scoped>

</style>