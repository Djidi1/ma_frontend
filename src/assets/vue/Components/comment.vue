<template>
    <div :id="data_comments.id">
        <div v-if=this.$root.show class="comment_block"  >
            <div class="header_comment">
                <div class="row no-gutter">
                    <div class="col-60 title_comment">
                    </div>
                    <div class="col-40 date_comment">
                        <span class="data_text" >{{data_comments.create_date}}</span>
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
                    </div>
                </div>
            </div>
            <div class="footer_comment">
                <div class="row no-gutter">
                    <div class="col-65">

                    </div>
                    <div class="col-25 ">
                        <div class="control">
                            <div class="control_my_comment" v-show="myComment">
                                <button @click="editComment($event)"> <i class="fa fa-pencil" aria-hidden="true"></i></button>
                                <button @click="removeComment()"> <i class="fa fa-trash-o" aria-hidden="true"></i></button>
                            </div>
                        </div>
                    </div>
                    <div class="col-10">
                    </div>
                </div>
            </div>
        </div>


    </div>


</template>

<script>
    var $$=Dom7;
    export default {
        name: "comment",
        data:function(){
            return{
                show:true
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
            editComment(e){
                e.preventDefault();
                this.$emit('test');
                console.log('test');
               // this.$root.show=!this.$root.show;
               // this.animate()
            },
            animate(){
                let self=this;
                let height;
                setTimeout(function(){
                    height=$$('#'+self.data_comments.id).parent().parent().height()
                    $$('#'+self.data_comments.id).parent().parent().parent().animate({
                        'height':height
                    },{
                        duration:250,
                        easing:'swing'
                    })
                },15);

            },
            changeShow(){
                console.log('test');
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
        position:relative;
    }
    .title_comment{
        position:relative;
        font-weight: bold;
        font-size: 15px;
        word-wrap:normal;
    }
    .date_comment{
        position:relative;
        font-size: 12px;
        padding-top:4px!important;
        overflow: auto;
    }
    .data_text{
        opacity: 0.7;
        margin:0 7px 0 7px;
        position: relative;
    }
    .content_comment{
        padding:15px 7px 15px 7px;
    }

    .footer_comment .control{
        position:relative;
        padding:0 10px 0 10px;
    }
    .footer_comment,
    .footer_comment div{
        position:relative;
    }

    .control_my_comment{
        display:flex;
        justify-content: flex-start;
        overflow: visible;
    }
    .control_my_comment button{
        padding-top:5px;
        background-color: transparent;
        border:unset;
        color: #868686;
        margin:0 7px 0 5px;
        font-size: 16px;
    }


.header_comment .row div:after,
.footer_comment .row .col-65:after,
.footer_comment .row .col-10:after{
    content: '';
    position:absolute;
    top:12px;
    display:inline-block;
    height: 1px;
    background-color: rgba(0,0,0,.41);
    width: 100%;
    overflow: hidden;
    -webkit-transform-origin: 50% 100%;
    transform-origin: 50% 100%;
    opacity: 0.5;
}


</style>