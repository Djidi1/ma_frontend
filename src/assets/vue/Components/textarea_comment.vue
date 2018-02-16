<template>
        <div class="comment_text_zone" id="edit">
            <f7-list form>
                <f7-list-item>
                    <f7-label floating>{{this.$root.localization.AuditPage.comment_placeholder}}</f7-label>
                    <f7-input type="textarea"  v-model="text" ></f7-input>
                </f7-list-item>
                <attachment @removeAttach="this.removeAttachment" :attachment="attachment" :edit_mode="true" ></attachment>
                <f7-block>
                    <div class="row ">
                        <div class="col-50 attachment_button">
                            <f7-col  class="comment-photupload comment-photos" width="20">
                                <f7-icon size=28  fa="camera"></f7-icon>
                                <input @change="upload" class="comment-file" type="file" accept="image/*;capture=camera" multiple >
                            </f7-col>
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
           comment:{type:Object,default:function(){return {}}},

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
                this.check_style_class(this.$el);
                if (this.type)(this.$$('#edit').find('textarea').focus());
                if((Object.keys(this.comment).length!=0)){
                    this.correct_css();
                }
            })
        },
        computed:{
            hasAttach(){
                return(this.attachment.length>0);
            },
        },
        methods:{
            //Костыль для отображения класов которые не цепляются если вызывать форму на редактирование
            check_style_class(el){
                let element=$$(el);
                let form_cls;
                let input_cls;
                //костыль дял формы
                let form=element.find('form');
                form.attr('class').split(' ').forEach(function(item){
                     form_cls=(item!='inputs-list')?true:false;
                })
                if (form_cls) this.add_cls_to_form(form,'inputs-list');
                //костыль для инпута item-input-field
                let input=element.find('.item-input');
               input.attr('class').split(' ').forEach(function(item){
                   input_cls=(item!='item-input-field')?true:false;
               });
                if (input_cls) this.add_cls_to_form(input,'item-input-field');
            },
            add_cls_to_form(form,cls){
                form.addClass(cls);
            },

            GetCurrentDate(){
                let now= new Date();
                return now;
            },
            send_comments(){
                if (this.text!=''||this.attachment.length>0){
                    if(this.type){
                        this.comment.id=this.getOfflineID(this.comment.id);
                        this.comment.create_date=this.GetCurrentDate();
                        this.comment.user_info=this.$root.auth_info.user_info;
                        this.comment.text=this.text;
                        this.comment.attachments=this.attachment;
                    }else{
                        let comment= {
                            "id":this.getOfflineID(),
                            "create_date":this.GetCurrentDate(),
                            "user_info":this.$root.auth_info.user_info,
                            "text":this.text,
                            "attachments":this.attachment
                        }
                        this.data_comm.push(comment);
                    }
                    this.$ls.set('objects',this.$root.objects);
                    this.$emit('edit_done')
                }

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
            upload(e){
                let self=this;
                let files=e.target.files;
                for (var i = 0; i<files.length; i++) {
                  if (files[i].type.match('image.*')){
                       let result_file={};
                       let file_obj={
                           "name":files[i].name,
                           "type":files[i].type,
                           "size":files[i].size,
                       };
                       self.$set(result_file,'caption',files[i].name);
                       self.attachment.push(result_file);
                       let reader = new FileReader();
                        reader.onloadstart=function(){
                            self.$$('#img_pr'+(self.attachment.length-1)).show();
                        };
                       reader.onprogress=this.updateProgress;
                       reader.onload=function(file){
                           self.$set(result_file,'url',file.target.result);
                      //     self.$set(file_obj,'file',file.target.result);
                       };
                       reader.onloadend=function(){
                           let progres_elem=self.$$('#img_pr'+(self.attachment.length-1)).find('.progress');
                           if (progres_elem.width()!=50){
                               progres_elem.animate({
                                   'width':50
                               },{
                                   duration:'200',
                                   easing:'swing',
                                   complete: function (elements) {
                                       self.$$('#img_pr'+(self.attachment.length-1)).hide();
                                   }
                               });
                           }else{
                               self.$$('#img_pr'+(self.attachment.length-1)).hide();
                           }
                       };
                       reader.readAsDataURL(files[i]);
                       self.$set(result_file,'file',file_obj);

                   }
                }
                e.target.value='';
            },
            updateProgress(evt){
                let number=this.attachment.length-1;
                if (evt.lengthComputable){
                    let percentLoaded = (Math.round((evt.loaded / evt.total) * 100))-10;
                    let elem=( this.$$('#img_pr'+number).find('.progress'));
                    let  px_widht=(50/100)*percentLoaded;
                    elem.animate({
                        'width':px_widht
                    },{
                        duration:'200',
                        easing:'swing'
                    })
                }
            },
            //Css костыль
            correct_css(){
                let element=$$(this.$el).find('textarea');
                 let el=(element.parent().parent());
                 el.attr('class').split(' ').forEach(function(item){
                     let need_cls=(item!='not-empty-state')? true:false;
                 });
                 this.add_cls(el,'not-empty-state');
            },
            add_cls(obj,cls) {
                obj.addClass(cls);
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
    .comment-photos {
        text-align: center;
        color: #868686;
        margin:0 7px 0 5px;
        padding-top:5px;
        width:36px;

    }
    .comment-photupload {
        position: relative;
        overflow: hidden;
    }
    .comment-file {
        min-height: 0;
        width: 100%;
    }
    .comment-photupload input{
        opacity: 0;
        position: absolute;
        top: 0;
        right: 0;
        margin: 0;
        padding: 0;
        font-size: 20px;
        cursor: pointer;
        filter: alpha(opacity=0);
    }

</style>