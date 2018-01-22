<template>
    <div>
        <transition  mode="out-in" name="slide-fade" v-on:enter="enter" >
        <div v-if="mode" key="message">
            <div  class="comment_block">
                <div class="header_comment">
                    <div class="row no-gutter">
                        <div class="col-60 title_comment">
                        </div>
                        <div class="col-40 date_comment">
                            <span class="data_text" >{{single_comment.create_date}}</span>
                        </div>
                    </div>
                </div>
                <div class="content_comment">
                    {{single_comment.text}}
                    <div v-show="hasAttach(id)" >
                        <attachment :attachment="single_comment.attachments" ></attachment>
                    </div>
                </div>
                <div class="footer_comment">
                    <div class="row no-gutter">
                        <div class="col-65">
                        </div>
                        <div class="col-25 ">
                            <div class="control">
                                <div class="control_my_comment" v-show="myComment()">
                                    <button @click="editComment($event)"> <i class="fa fa-pencil" aria-hidden="true"></i></button>
                                    <button @click.prevent="removeComment(id)"> <i class="fa fa-trash-o" aria-hidden="true"></i></button>
                                </div>
                            </div>
                        </div>
                        <div class="col-10">
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div v-else key="edit">
            <text_area :comment="this.single_comment" @edit_done="edit_done()" :type="true" @resize="resize"></text_area>
        </div>
        </transition>
        </div>

</template>

<script>
    export default {
        name: "single-comment",
        props: {
            single_comment: {
                type: Object, default: function () {
                    return {}
                }
            },
            id: {type: Number, default: 0}
        },
        data:function(){
            return{
                mode:true
            }
        },
        methods: {
            hasAttach() {
                return (this.single_comment.attachments.length > 0)
            },
            myComment() {
                return (this.single_comment.from === this.$root.auth_info.name)
            },
            attachImg(attach_img) {
                return {
                    'background-image': this.hasAttach() ? 'url(' + attach_img + ')' : 'none'
                }
            },
            removeComment(id) {
               this.$emit('remove',id);
            },
            editComment(e) {
                e.preventDefault();
                this.mode=!this.mode;
            },
            edit_done(){
                this.mode=!this.mode;
            },
            enter(){
                this.resize(0)
            },
            resize(){
                this.$emit('resize',);
            }
        }
    }
</script>

<style scoped>
    .comment_block{
        background-color: #FFFFFF;
        padding:10px 0 20px 0;
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
        background-color: transparent;
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
    .invisible{
        opacity:0;
    }
</style>