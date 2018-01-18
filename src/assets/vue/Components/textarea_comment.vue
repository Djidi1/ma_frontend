<template>
    <transition name="slide-fade">
    <div class="comment_text_zone check_list_items" :id="this.item_id">
        <f7-list form>
            <f7-list-item>
                <f7-input type="textarea" :placeholder="this.$root.localization.AuditPage.comment_placeholder" v-model="text" ></f7-input>
            </f7-list-item>
            <div v-show="hasAttach" >
                <attachment @removeAttach="this.removeAttachment" :attachment="attachment" :edit_mode="true"></attachment>
            </div>
            <f7-block>
                <div class="row">
                    <div class="col-50 attachment_button">
                        <button> <i class="fa fa-camera fa-2x" aria-hidden="true"></i></button>
                    </div>
                    <div class="col-50">
                        <f7-button fill @click="send_comments"> {{this.$root.localization.AuditPage.comment_button}}</f7-button>
                    </div>
                </div>
            </f7-block>
        </f7-list>
    </div>
    </transition>
</template>

<script>
    var $$=Dom7;
    export default {
        name: "textarea_comment",
        props:{
            obj_id:{ type: Number, default: 0 },
            audit_id:{ type: Number, default: 0 },
            item_id:{ type: Number, default: 0 },
            comment_id:{ type: Number, default: 0 },
            check_id:{ type: Number, default: 0 },
        },
        data:function(){
          return{
              data_comments:'',
              text:'',
              comment:'',
              attachment:[],
              focus:false,
              remove_attach_id:''
          }
        },
        created:function(){
                 this.data_comments =  this.$root.list[this.obj_id].audits[this.audit_id].check_list[this.check_id].list_to_check[this.item_id].comments;
                if( this.data_comments.length>0){
                     this.comment=this.data_comments[this.comment_id];
                     this.attachment=this.comment.attachments;
                     this.text=this.comment.text;
                     this.focus=true;
                }
        },
        mounted:function(){
            this.$nextTick(function(){
                if (this.focus)(this.$$('#'+this.item_id).find('textarea').focus());
            })
        },
        computed:{
            hasAttach(){
                return(this.attachment.length>0);
            },
        },
        methods:{
            attachImg(attach_img) {
                return {
                    'background-image': this.hasAttach ? 'url(' + attach_img + ')' : 'none'
                }
            },
            send_comments(){
                 let now= new Date();
                 let comment= {
                     "id":this.getOfflineID(this.current_comment),
                     "create_date": now.getDate()+"/"+now.getMonth()+1+"/"+now.getFullYear()+" "+now.getHours()+":"+now.getMinutes()+":"+now.getSeconds(),
                     "from":this.$root.auth_info.name,
                     "text":this.text,
                     "attachments":this.attachment
                 }
                this.data_comments[this.comment_id]=comment
                 console.log(this.$root.list);
            },
            removeAttachment(id){
                this.attachment.splice(id,1);
            },
            getOfflineID(current){
                let lastId=0;
                (current!=undefined)?
                    lastId=current.id:
                    ++lastId;
                return lastId;
            },
            photolook(attach,id){
                console.log(id);
                let photos =this.$f7.photoBrowser({
                        type: 'popup',
                        photos:attach,
                        theme:'dark'
                    }
                );
                photos.open(id);
            },


        }
    }
</script>

<style scoped>
    .attachment_button{
        display:flex;
        justify-content: flex-start;
        height: 36px;
    }
    .attachment_button button{
        padding-top:5px;
        background-color: transparent;
        border:unset;
        color: #868686;
        margin:0 7px 0 5px;
    }
    .comment_text_zone{
        padding:0 0 10px 0;
    }
    .attachments{
        margin:5px 0 15px 0!important;
    }
</style>