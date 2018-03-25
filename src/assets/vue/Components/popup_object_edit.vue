<template>
    <f7-popup id="popup_edit" >
        <f7-navbar back-link="Back" sliding @back-click.stop="closePopUp(true)" >
            <f7-nav-center sliding> {{this.title}} </f7-nav-center>
            <f7-nav-right>
                <f7-grid class="crud_header edit_menu">
                    <f7-col width="30" ></f7-col>
                    <f7-col width="50" ><f7-link  @click="submit()"> <i class="fa fa-check" aria-hidden="true"></i></f7-link></f7-col>
                    <f7-col width="10" ></f7-col>
                </f7-grid>
            </f7-nav-right>
        </f7-navbar>

        <div class="blck_info popup_card">
            <f7-card>
                <f7-card-header>
                    <f7-grid style="width:100%; padding:5px 0 5px 0;">
                        <f7-col width="60">{{this.$root.localization.pop_up.object_info}}</f7-col>
                    </f7-grid>
                </f7-card-header>
                <f7-card-content style="padding-bottom:15px;">
                    <f7-card style="padding-bottom:10px;">
                        <f7-list form class="add_list">
                            <f7-list-item class="correct_css">
                                <f7-label floating>{{this.$root.localization.pop_up.name}}</f7-label>
                                <f7-input type="text"  v-model="current" id="main_input">
                                </f7-input>
                            </f7-list-item>
                            <f7-list-item class="correct_css">
                                <f7-label floating>{{this.$root.localization.pop_up.address}}</f7-label>
                                <f7-input type="text" v-model="addres_obj"></f7-input>
                            </f7-list-item>
                        </f7-list>
                    </f7-card>
                </f7-card-content>
                <f7-card-footer></f7-card-footer>
            </f7-card>
            <f7-card>
                <f7-card-header>
                    {{this.$root.localization.pop_up.audits_info}}
                </f7-card-header>
                <f7-card-content class="card_audit_add">
                    <transition-group  appear mode="out-in" name="slide-app">
                        <audit_add v-for="(items,index) in this.audits" :key="index" :audits="items" :id="index"  :type="true" :trash_btn="false" @remove_audit="remove_audit(index)"></audit_add>
                    </transition-group>
                    <f7-card >
                        <f7-grid style="width:100%">
                            <f7-col width="100"> <f7-button fill @click="add_audit()">{{this.$root.localization.pop_up.add_audit}}</f7-button></f7-col>
                        </f7-grid>
                    </f7-card>
                </f7-card-content>
                <f7-card-footer></f7-card-footer>
            </f7-card>
            <f7-card class="btn_pop_up_main">
                <f7-card class="btn_pop_up_card">
                    <f7-card-header class="btn_pop_up_card">
                        <f7-grid class="btn_complete">
                            <f7-col width="50"><f7-button  class="abort_button" @click="closePopUp(true)" > {{this.$root.localization.pop_up.cancel}}</f7-button></f7-col>
                            <f7-col width="50"><f7-button fill @click="submit()" >{{this.$root.localization.pop_up.submit}}</f7-button></f7-col>
                        </f7-grid>
                    </f7-card-header>
                </f7-card>
            </f7-card>
        </div>

    </f7-popup>
</template>

<script>
    let $$=Dom7;
    export default {
        name: "popup_object_edit",
        props:{
            id:{type:String,default:''}
        },
        data:function(){
            return{
                title:this.$root.localization.pop_up.edit,
                selected_object:{},
                current:'',
                addres_obj:'',
                audits:[],
                edit:false,
                have_something:false
            }
        },
        computed:{
            hasObject(){
                this.select_list=(this.$root.objects.length>0)?this.$root.objects:'';
                return(this.select_list.length>0)
            }
        },
        mounted(){
            this.$nextTick(function() {
                this.selected_object = this.get_object(this.id);
                this.audits = this.get_audits_root(this.id);
                this.current = this.selected_object.title;
                this.addres_obj = this.selected_object.address;
                this.edit = true;
                this.correct_css();
            });
        },
        methods:{
            closePopUp(mode){
                (!this.edit)? this.clear_data():'';
                (mode)? this.$root.objects=this.$ls.get('objects'):'';
                this.$f7.closeModal();
            },
            GetCurrentDate(){
                let now= new Date();
                return now;
            },
            get_audits(audits){
                let result=[];
                audits.forEach(function(item){
                    result.push(item);
                });
                return result;
            },
            get_audits_root(id){
                let self=this;
                let result=[];
                this.$root.objects.forEach(function(item){
                    result=(item.id.toString()===id)?item.audits:result;
                });
                return result
            },
            add_audit(){
                let new_audit={
                    "id":"Offline_audit_"+this.getlastid_audit(),
                    "title":'',
                    "date_add":this.GetCurrentDate(),
                    "created_at":this.GetCurrentDate(),
                    "comments":[],
                    "check_list":[],
                    "object_id":(Object.keys(this.selected_object).length!=0)?this.selected_object.id:'Offline_'+this.getlastid(),
                    "upload":false
                };
                this.audits.push(new_audit);

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
                return this.audits.length;
            },
            submit(){
                if (this.validat()){
                    if((Object.keys(this.selected_object).length!=0)){
                        this.$set(this.selected_object,"audits",this.audits);
                        this.$set(this.selected_object,"title",this.current);
                        this.$set(this.selected_object,"address",this.addres_obj);
                        this.$ls.set('objects',this.$root.objects);
                        this.$set(this.selected_object,"user_info",this.$root.auth_info.user_info);
                    }
                    else{
                        let new_object={
                            "id":"Offline_"+this.getlastid(),
                            "title":this.current,
                            "address":this.addres_obj,
                            "audits":this.audits,
                            "created_at":this.GetCurrentDate()
                        };
                        this.$root.objects.push(new_object);
                    }

                    this.closePopUp();
                }else{ this.$f7.alert('Заполнены не все поля!',this.$root.localization.pop_up.warning);}
            },
            validat(){
                let self=this;
                let result=true;
                result=(this.current!='')?result:false;
                result=(this.addres_obj!=''&&this.addres_obj!=null)?result:false;
                this.audits.forEach(function(item){
                    result=(item.title!='')?result:false;
                });
                return result;
            },
            clear_data(){
                this.correct_css();
                this.secod_correct_css();
                this.selected_object={};
                this.current='';
                this.addres_obj='';
                this.audits=[];
                this.have_something=false;

            },
            remove_audit(index){
                this.audits.splice(index,1);
            },
















            //CSS Доработка
            correct_css(){
                let element=$$(this.$el).find('.correct_css');
                let el=(element.find('.item-inner'));
                let need_cls;
                el.attr('class').split(' ').forEach(function(item){
                    need_cls=(item!='not-empty-state')? true:false;
                });
                if(this.current!='')this.add_cls(el,'not-empty-state');
            },
            secod_correct_css(){
                let element=$$(this.$el).find('.correct_css');
                let el=(element.find('.item-input'));
                el.forEach(function(item){
                    $$(item).removeClass('not-empty-state')
                })
            },
            add_cls(obj,cls){
                obj.attr('class').split(' ').forEach(function(item){
                    (item!=cls)?obj.addClass(cls):obj.removeClass(cls);
                });
            },


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