<template>
    <transition name="slide-fade">
    <div class="comment_text_zone check_list_items" :id="id">
        <f7-list form>
            <f7-list-item>
                <f7-input type="textarea" :placeholder="this.$root.localization.AuditPage.comment_placeholder" v-model="comment_text_new" ></f7-input>
            </f7-list-item>
            <div v-show="hasAttach" class="attachments_comments">
                <div class="attach_block" v-for="attach in attachment_new" :key="attach.index">
                    <div class="attach"  :style="attachImg(attach.url)" @click="photolook(attachment,attach.index)">
                        <div class="img_top_back">img
                        </div>
                        <div class="img_bot_back"></div>
                    </div>
                    <div class="remove_button_block">
                        <div class="remove_button" @click="remove_attach(attach.index)"><i class="fa fa-times" aria-hidden="true"></i></div>
                    </div>
                </div>
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
            id:{type:Number,default:''},
            comment_text: { type: String, default: '' },
            attachment:{type:Array,default: function () { return [] }},
            focus:{type:Boolean,default:false}
        },
        data:function(){
          return{
              comment_text_new:this.comment_text,
              attachment_new:this.attachment,
              current_comment:'',
              current_item:''
          }
        },
        mounted:function(){
            this.$nextTick(function(){
               if (this.focus) this.$$('#'+this.id).find('textarea').focus();
               this.getCurrent();
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
            photolook(attach,id){
                let photos =this.$f7.photoBrowser({
                        type: 'popup',
                        photos:this.photoArray(attach),
                        theme:'dark'
                    }
                );
                photos.open(id);
            },
            photoArray(array){
                let resultArray=new Array();
                array.forEach(function (items,i,arr){
                    resultArray[items.index]=items.url;
                });
                return resultArray;
            },
            send_comments(){
                let now= new Date();
                let comment= {
                    "id":this.getOfflineID(this.current_comment),
                    "create_date": now.getDate()+"/"+now.getMonth()+1+"/"+now.getFullYear()+" "+now.getHours()+":"+now.getMinutes()+":"+now.getSeconds(),
                    "from":this.$root.auth_info.name,
                    "text":this.comment_text_new,
                    "attachments":this.attachment_new
                }

                if (this.current_comment!=''){
                    this.current_comment=comment;
                    console.log(this.$root.list);
                   }
                    else{
                     this.current_item.comments.push(comment);
                   }
                //current.comments.push(comment);
                this.$root.show=!this.$root.show;
            },
            remove_attach(index){
                this.current_comment.attachments.forEach(function(item,i,arr){
                    if (item.index===index)
                        arr.splice(i,1);;
                })
            },
            getOfflineID(current){
                let lastId=0;
                (current!=undefined)?
                    lastId=current.id:
                    ++lastId;
                return lastId;
            },
            getCurrent(){
                let self=this;
                self.$root.list.forEach(function(obj,i,arr){
                    obj.audits.forEach(function(audit,j,arr){
                        audit.check_list.forEach(function(check,h,arr){
                            check.list_to_check.forEach(function(list,g,arr){
                                if (list.id===self.id) {
                                    self.current_item = list;
                                }
                                list.comments.forEach(function(comment,f,arr){
                                    if (comment.id===self.id) {
                                        self.current_item=list;
                                        self.current_comment = comment;
                                    }
                                })
                            })
                        })
                    })

                })
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
        padding:0 0 10px 0;
    }
    .attachments{
        margin:5px 0 15px 0!important;
    }
</style>