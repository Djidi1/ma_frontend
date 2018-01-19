<template>
    <div class="comment_text_zone check_list_items" :id="'edit_'+this.comment_id">
        <f7-list form>
            <f7-list-item>
                <f7-label floating>{{this.$root.localization.AuditPage.comment_placeholder}}</f7-label>
                <f7-input type="textarea"  v-model="text" ></f7-input>
            </f7-list-item>
                <attachment @removeAttach="this.removeAttachment" :attachment="attachment" :edit_mode="true" @resize_attach="resize_attach"></attachment>
            <f7-block>
                <div class="row">
                    <div class="col-50 attachment_button">
                        <button> <i class="fa fa-camera fa-2x" aria-hidden="true"></i>с</button>

                    </div>
                    <div class="col-50">
                        <f7-button fill @click="send_comments"> {{this.$root.localization.AuditPage.comment_button}}</f7-button>
                    </div>
                </div>
            </f7-block>
        </f7-list>
    </div>
</template>

<script>
    var $$=Dom7;
    export default {
        name: "textarea_comment",
        props:{
           data_set:{type:Array,default:function(){return[]}},
           type:{type:Boolean,default:false},
           comment_id:{type:Number,default:0},
           comment:{type:Object,default:function(){return {}}}
        },
        data:function(){
          return{
              data_comm:'',
              current_comment:'',
              text:'',
              attachment:[],
          }
        },
        created:function(){
            if((Object.keys(this.comment).length===0)){
                this.data_comm=this.data_set;
            }else{
                this.current_comment=this.comment;
                this.text=this.current_comment.text;
                this.attachment=this.current_comment.attachments;
            }
        },

        mounted:function(){

            this.$nextTick(function(){
                this.check_style_class();
                if (this.type)(this.$$('#edit_'+this.comment_id).find('textarea').focus());
            })
        },
        computed:{
            hasAttach(){
                return(this.attachment.length>0);
            },
        },
        methods:{
            //Костыль для отображения класов которые не цепляются если вызывать форму на редактирование
            check_style_class(){
                let form_cls;
                let input_cls;
                //костыль дял формы
                let form=(this.$$('.comment_text_zone').find('form'));
                form.attr('class').split(' ').forEach(function(item){
                     form_cls=(item!='inputs-list')?true:false;
                })
                if (form_cls) this.add_cls_to_form(form,'inputs-list');
                //костыль для инпута item-input-field
                let input=(this.$$('.item-input'));
               input.attr('class').split(' ').forEach(function(item){
                   input_cls=(item!='item-input-field')?true:false;
               });
                if (input_cls) this.add_cls_to_form(input,'item-input-field');
            },
            add_cls_to_form(form,cls){
                form.addClass(cls);
            },
            attachImg(attach_img) {
                return {
                    'background-image': this.hasAttach ? 'url(' + attach_img + ')' : 'none'
                }
            },
            send_comments(){
                 let now= new Date();
                 let date_for_text=now.getDate()+"/"+now.getMonth()+1+"/"+now.getFullYear()+" "+now.getHours()+":"+now.getMinutes()+":"+now.getSeconds();
                 if(this.type){
                     this.comment.id=this.getOfflineID(this.comment.id);
                     this.comment.create_date=date_for_text;
                     this.comment.from=this.$root.auth_info.name;
                     this.comment.text=this.text;
                     this.comment.attachments=this.attachment;
                 }else{
                     let comment= {
                         "id":this.getOfflineID(),
                         "create_date":date_for_text ,
                         "from":this.$root.auth_info.name,
                         "text":this.text,
                         "attachments":this.attachment
                     }
                     this.data_comm.push(comment);
                 }
                 this.$emit('edit_done')
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
            resize(){
                this.$emit('resize');
            },
            resize_attach(){
                this.$emit('resize')
            }
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
        padding:10px 0 20px 0;
    }
    .comment_text_zone .item-input:after {
        color: red;
        /*content: '';*/
        /*position: absolute;*/
        /*left: 0;*/
        /*bottom: 0;*/
        /*right: auto;*/
        /*top: auto;*/
        /*height: 1px;*/
        /*width: 100%;*/
        /*background-color: rgba(0,0,0,.12);*/
        /*display: block;*/
        /*z-index: 15;*/
        /*-webkit-transform-origin: 50% 100%;*/
        /*transform-origin: 50% 100%;*/
    }


</style>