<template>
    <!--Редактирвоание аудитов-->
    <f7-popup :id="'popup_add_audit_'+audit.id" >
        <f7-navbar back-link="Back" sliding @back-click.stop="closePopUp(true)" >
            <f7-nav-center sliding> {{title}} </f7-nav-center>
            <f7-nav-right>
                <f7-grid class="crud_header edit_menu">
                    <f7-col width="30" ></f7-col>
                    <f7-col width="50" ><f7-link  @click="submit()"><div style="font-size:30px; "> <check></check> </div></f7-link></f7-col>
                    <f7-col width="10" ></f7-col>
                </f7-grid>
            </f7-nav-right>
        </f7-navbar>

        <div class="blck_info popup_card">
            <f7-card>
                <f7-card-header>
                    {{this.$root.localization.pop_up.audits_info.substr(0,this.$root.localization.pop_up.audits_info.length -1)}}
                </f7-card-header>
                <f7-card-content style="padding-bottom:15px;">
                    <f7-card style="padding-bottom:10px;">
                        <f7-list form class="add_list">
                            <f7-list-item class="correct_css">
                                <f7-label floating>{{this.$root.localization.pop_up.name}}</f7-label>
                                <f7-input type="text"  v-model="current">
                                </f7-input>
                            </f7-list-item>
                        </f7-list>
                    </f7-card>
                </f7-card-content>
            </f7-card>
            <f7-card>
                <f7-card-header>{{this.$root.localization.pop_up.check_list}}</f7-card-header>
                <f7-card-content  style="padding-bottom:15px;">
                    <f7-card>
                        <f7-list>
                            <f7-list-item v-for="(item,index) in check_list_new" :key="index" :title="item.title" >
                                <div slot="after">
                                    <f7-button class='cross_button in_list' @click="remove_check(index)"><div style="font-size: 24px"><trash></trash></div></f7-button>
                                </div>
                            </f7-list-item>
                            <f7-list-item >
                                <f7-grid style="width:100%">
                                    <f7-col width="100"> <f7-button :open-popover="'.popover_add_obj_'+this.audit_current.id" >{{this.$root.localization.pop_up.add_check}}</f7-button></f7-col>
                                </f7-grid>
                            </f7-list-item>
                        </f7-list>
                    </f7-card>
                </f7-card-content>
            </f7-card>
            <f7-card class="btn_pop_up_main">
                <f7-card class="btn_pop_up_card">
                    <f7-card-header class="btn_pop_up_card">
                        <f7-grid class="btn_complete">
                            <f7-col width="50"><f7-button  class="abort_button" @click="closePopUp(true)" > {{this.$root.localization.pop_up.cancel}}</f7-button></f7-col>
                            <f7-col width="50"><f7-button @click="submit()" fill>{{this.$root.localization.pop_up.submit}}</f7-button></f7-col>
                        </f7-grid>
                    </f7-card-header>
                </f7-card>
            </f7-card>
        </div>
        <popover_obj  :id="audit_current.id.toString()" @select_check_list="select_check_list" :check_list_from_audit="check_list_new"></popover_obj>
    </f7-popup>
</template>

<script>
    import  trash from "vue-material-design-icons/delete.vue"
    import  check from "vue-material-design-icons/check.vue"
    export default {
        name: "popup_audit_edit",
        components:{
            trash,
            check
        },
        props:{
            audit:{type:Object,default:function(){return{}}},
            opendPopup:{type:Boolean,default:false},
        },
        data:function(){
            return{
                title:this.$root.localization.pop_up.edit,
                audit_current:{},
                current:'',
                check_list_new:[]
            }
        },
        created(){
            this.audit_current=this.audit;
            this.current=this.audit_current.title;
            this.check_list_new=this.get_check_list();
        },
        methods:{
            closePopUp(mode){
                console.log(1)
                this.$root.objects=(mode)?this.$ls.get('objects'):this.$root.objects;
                this.current=this.audit_current.title;
                this.check_list_new=this.get_check_list();
                let $$=Dom7;
                // console.log('#popup_add_audit_'+this.audit.id);
                this.$f7.closeModal();
            },
            get_check_list(){
                let self=this;
                let result=[];
                this.audit_current.check_list.forEach(function(item){
                   result.push(item);
                });
                return result;

            },
            select_check_list(arr){
               // this.check_current_list(arr);
                this.check_list_new=[];
                let self=this;
                arr.forEach(function(item){
                    self.check_list_new.push(item);
                });
               this.audit_current.check_list=this.check_list_new;
            },
            remove_check(index){
                let self=this;
                this.$f7.confirm("",this.$root.localization.modal.modalTextConf, function () {
                    self.check_list_new.splice(index,1);
                });
            },
            submit(){
                let self=this;
                if(this.validat()){
                    this.$set(this.audit_current,'title',this.current);
                    this.$set(this.audit_current,'check_list',[]);
                    this.check_list_new.forEach(function(itm){
                        self.audit_current.check_list.push(itm);;
                    });
                    this.$ls.set('objects',this.$root.objects);
                }else{
                    this.$f7.alert('Заполнены не все поля!',this.$root.localization.pop_up.warning);
                };
                this.closePopUp(false);
            },
            validat(){
                return (this.current!='')
            }


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