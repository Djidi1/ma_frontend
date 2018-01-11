<template>
    <div class="comment_block">
        <div class="header_comment">
            <div class="row">
                <div class="col-60 title_comment">
                    {{data_comments.title}}
                </div>
                <div class="col-40 date_comment">
                    {{data_comments.create_date}}
                </div>
            </div>
        </div>
        <div class="content_comment">
            {{data_comments.text}}
        </div>
        <div v-show="hasAttach" class="attachments_comments">
            <div class="attach" v-for="attach in data_comments.attachments" :key="attach.index" :style="attachImg(attach.url)" @click="photolook(data_comments.attachments,attach.index)">
                <div class="img_top_back">img</div>
                <div class="img_bot_back"></div>
            </div>
        </div>
        <div class="footer_comment">
            <div class="row">
                <div class="col-60">
                    <div class="control_my_comment" v-show="myComment">
                        <button @click="removeComment()"> <i class="fa fa-trash-o" aria-hidden="true"></i></button>
                    </div>
                </div>
                <div class="col-40 from_comment">
                    {{data_comments.from}}
                </div>
            </div>
        </div>
    </div>

</template>

<script>

    export default {
        name: "comment",
        props:{
            data_comments:{ type: Object, default: '' }
        },
        computed:{
            hasAttach(){
                return (this.data_comments.attachments.length>0)
            },
            myComment(){
                return (this.data_comments.from===this.$root.auth_info.name)
            }


        },
        methods:{
            attachImg(attach_img){
                return{
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

            removeComment(){
                //this.f7.confirm();
                let self=this;
                this.$root.list.forEach(function (items,z,arr){
                    items.audits.forEach(function(item,j,arr){
                      item.comments.forEach(function(comment,i,arr){
                          if (comment.id===self.data_comments.id){
                             arr.splice(i,1);
                          }
                      })
                    })
                })
            }

    }
    }
</script>

<style scoped>
    .comment_block{
        background-color: #FFFFFF;
    }
.header_comment{
    margin-bottom:10px;
}
    .title_comment{
        font-weight: bold;
        font-size: 15px;
        overflow: visible;
    }
    .date_comment{
        opacity: 0.7;
        font-size: 12px;
        text-align: right;
        padding-top:4px!important;
    }
    .content_comment{
        padding:15px 5px 15px 5px;
        margin-bottom: 7px;
    }
    .attachments_comments{
        margin: 10px 0 10px 0;
        display: flex;
        justify-content: flex-start;
        flex-wrap: wrap;
    }
    .from_comment{
        text-align: right;
    }

.header_comment .row:after,
.footer_comment .row:before{
    content: '';

    height: 1px;
    background-color: rgba(0,0,0,.41);
    width: 100%;
    display: block;
    overflow: hidden;
    -webkit-transform-origin: 50% 100%;
    transform-origin: 50% 100%;
    opacity: 0.5;
}
    .control_my_comment{
        display:flex;
        justify-content: flex-start;
    }
    .control_my_comment button{
        padding-top:5px;
        background-color: transparent;
        border:unset;
        color: #868686;
        margin:0 7px 0 5px;
        font-size: 16px;
    }


</style>