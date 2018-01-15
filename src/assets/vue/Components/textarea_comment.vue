<template>
    <f7-block inner class="comment_text_zone" >
        <f7-list form>

            <f7-list-item>
                <f7-input type="textarea" :placeholder="this.$root.localization.AuditPage.comment_placeholder" v-model="comment_text"></f7-input>
            </f7-list-item>
            <f7-block v-show="hasAttach">
                <div class="attach" v-for="attach in this.attachment" :key="attach.index" :style="attachImg(attach.url)" @click="photolook(attachment,attach.index)">
                    <div class="img_top_back">img</div>
                    <div class="img_bot_back"></div>
                </div>
            </f7-block>
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
    </f7-block>

</template>

<script>
    export default {
        name: "textarea_comment",
        data:function(){
            return{
                attachment:[],
                comment_text:''
            }
        },
        computed:{
            hasAttach(){
                return(this.attachment.length>0);
            }
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
                let current=this.audit;
                let now= new Date();
                let comment= {
                    "id":this.getOfflineID(current),
                    "create_date": now.getDate()+"/"+now.getMonth()+1+"/"+now.getFullYear()+" "+now.getHours()+":"+now.getMinutes()+":"+now.getSeconds(),
                    "from":this.$root.auth_info.name,
                    "title":this.comment_title,
                    "text":this.comment_text,
                    "attachments":this.attachment
                }
                this.comment_title='';
                this.comment_text='';
                this.attachment=[];
                current.comments.push(comment);
            },
            getOfflineID(current){
                let lastId;
                (current.comments.length>0)?
                    lastId=current.comments[current.comments.length-1].id:
                    lastId=0;
                return ++lastId;
            }
        }
    }
</script>

<style scoped>

</style>