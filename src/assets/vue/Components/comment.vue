<template>
    <div class="comment_block">

            <div class="header_comment">
                <div class="row">
                    <div class="col-60 title_comment">
                        From: {{data_comments.from}}
                    </div>
                    <div class="col-40 date_comment">
                        {{data_comments.create_date}}
                    </div>
                </div>
            </div>
            <div class="content_comment">
                {{data_comments.text}}
                <div v-show="hasAttach" class="attachments_comments">
                    <div class="attach_block" v-for="attach in data_comments.attachments" :key="attach.index">
                        <div class="attach"  :style="attachImg(attach.url)" @click="photolook(data_comments.attachments,attach.index)">
                            <div class="img_top_back">img
                            </div>
                            <div class="img_bot_back"></div>
                        </div>
                        <div class="remove_button_block">
                            <div class="remove_button" @click="remove_attach(attach.index)"><i class="fa fa-times" aria-hidden="true"></i></div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="footer_comment">
                <div class="row">
                    <div class="col-70">

                    </div>
                    <div class="col-30 ">
                        <div class="control_my_comment" v-show="myComment">
                            <button @click="removeComment()"> <i class="fa fa-pencil" aria-hidden="true"></i></button>
                            <button @click="removeComment()"> <i class="fa fa-trash-o" aria-hidden="true"></i></button>
                        </div>
                    </div>
                </div>
            </div>






    </div>

</template>

<script>

    export default {
        name: "comment",
        data:function(){
            return{
                comment_text:''
            }
        },
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
                        item.check_list.forEach(function(itm,g,arr){
                            itm.list_to_check.forEach(function(it,d,arr){
                                it.comments.forEach(function(comment,w,arr){
                                    if (comment.id===self.data_comments.id){
                                        arr.splice(i,1);
                                    }
                                })
                            })
                        })
                    })
                })
            },
            remove_attach(id){
                let self=this;
                this.$root.list.forEach(function (items,z,arr){
                    items.audits.forEach(function(item,j,arr){
                        item.check_list.forEach(function(itm,g,arr){
                            itm.list_to_check.forEach(function(it,d,arr){
                                it.comments.forEach(function(comment,w,arr){
                                   comment.attachments.forEach(function(attach,l,arr){
                                       if(attach.index===id){
                                           console.log('del')
                                       }
                                   })
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
    .comment_block{
        background-color: #FFFFFF;
        margin-bottom: 16px;
    }
.header_comment{
    margin-bottom:10px;
}
    .title_comment{
        font-weight: bold;
        font-size: 15px;
        word-wrap:normal;
    }
    .date_comment{
        opacity: 0.7;
        font-size: 12px;
        text-align: right;
        padding-top:4px!important;
    }
    .content_comment{
        padding:15px 7px 15px 7px;

    }
    .attachments_comments{
        margin: 20px 0 5px 0;
        display: flex;
        justify-content: flex-start;
        flex-wrap: wrap;

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
    .remove_button_block{
        position:relative;

    }
    .remove_button{
        position:absolute;
        top: -80px;
        right:-5px;
        color:#ddd;
        width:18px;
        text-align: center;
        opacity: 1!important;
    }


</style>