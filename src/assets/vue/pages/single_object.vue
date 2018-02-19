<template>
    <f7-page pull-to-refresh @ptr:refresh="this.$root.onRefresh"  >
        <!-- Navbar -->
        <f7-navbar back-link="Back" sliding  >

            <f7-nav-center sliding> {{object.title}}</f7-nav-center>
            <f7-nav-right>
                <f7-link @click="popup_open=true"><i class="fa fa-pencil" aria-hidden="true"></i></f7-link>
                <f7-link @click="remove_obj"> <i class="fa fa-trash-o" aria-hidden="true"></i></f7-link>
            </f7-nav-right>
        </f7-navbar>
        <div class="blck_info">
            <f7-card>
                <f7-card-header>
                    <div class="obj_info audit_obj">
                        <div class="row  no-gutter">
                                <div class="col-100">{{this.$root.localization.ObjectPage.name}}:{{object.title}}</div>
                                <div class="col-100">Id: {{object.id}}</div>
                                <div class="col-100">{{data_format()}}</div>
                                <div class="col-100">{{object.address}}</div>
                        </div>
                    </div>
                </f7-card-header>
            </f7-card>
            <f7-card>
                <f7-card-header>
                    {{this.$root.localization.ObjectPage.audits_view}}
                    <div class="audit_ocunt">
                        {{audit_count}}
                    </div>
                </f7-card-header>
                <f7-card-content>
                    <f7-list media-list>
                        <f7-list-item v-for="(acrd,acrd_index) in this.object.audits" :key="acrd_index" :link="'/audit/'+array_index+'/'+acrd_index" :title="acrd.title" :subtitle="'ID:'+acrd.id"  :text="data_format(acrd.created_at)"  :media="realStatus(acrd.status)"></f7-list-item>
                    </f7-list>
                </f7-card-content>
            </f7-card>
        </div>
        <popup_new_object :opendPopup="popup_open" @close="popup_open=false" :mode="false" :id="this.id"></popup_new_object>

    </f7-page>
</template>

<script>
    export default {
        name: "single_object",
        props: {
            id: { type: String},
        },
        data:function(){
            return{
                object:{},
                array_index:0,
                popup_open:false
            }
        },
        created(){
            let self=this;
            this.$root.objects.forEach(function(item,i){
                if (item.id.toString()===self.id){self.object=item;
                    self.array_index=i
                };
            })
        },
        computed:{
            audit_count(){
                let count=this.object.audits.length;
                return (count>0)? this.$root.localization.ObjectPage.audits+': '+count:'';
            }
        },
        methods:{
            realStatus(str){
                let result="";
                // switch (str){
                //     case '':
                //         result="";
                //         break;
                //     case 'new':
                //         result="<i class='fa fa-circle fa-1x audit_new' aria-hidden='true'></i>";
                //         break;
                //     case 'ok':
                //         result="<i class='fa fa-check fa-2x audit_good' aria-hidden='true'></i>";
                //         break;
                //     case 'error':
                //         result="<i class='fa fa-chain-broken fa-2x audit_error' aria-hidden='true'></i>";
                //         break;
                //     case 'wrong':
                //         result="<i class='fa fa-times fa-2x audit_wrong' aria-hidden='true'></i>";
                //         break;
                // }
                return result;
            },
            remove_obj(){
                let self=this;
                this.$f7.confirm("",this.$root.localization.modal.modalTextConf, function () {
                    self.$root.objects.splice(self.array_index, 1);
                    self.$ls.set('objects',self.$root.objects);
                    self.$f7.views.main.back();
                })
            },
            cancel_edit(index){
                this.object.name=this.$root.list[index].name;
                this.object.audits = this.$root.list[index].audits;
            },
            data_format(data_str){
                let data=(data_str!=undefined)?new Date(data_str):new Date(this.object.created_at);
                let curSec=('0'+data.getSeconds()).substr(-2);
                let curMin=('0'+data.getMinutes()).substr(-2);
                let curDay=('0'+data.getDate()).substr(-2);
                let curMounth=('0'+(data.getMonth()+1));
                let date_for_text=curDay+"/"+curMounth+"/"+data.getFullYear()+" "+data.getHours()+":"+curMin+":"+curSec;
                return date_for_text;
            }

        }
    }
</script>

<style scoped>

</style>