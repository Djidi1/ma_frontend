<template>
    <!--Единичный комментарий-->
    <f7-block inner class="custom_block_no_after">
        <transition  mode="out-in" name="slide-fade" >
                <div v-if="mode" key="message">
                    <div  class="comment_block">
                        <div class="header_comment">
                            <div class="row no-gutter">
                                <div class="col-50"></div>
                                <div class="col-40">
                                    <!--<span class="data_text" >{{data_forma(single_comment.create_date)}}</span>-->
                                </div>
                                <div class="col-10"></div>
                            </div>
                        </div>
                        <div class="content_comment">
                            {{single_comment.text}}
                            <div v-show="hasAttach(id)">
                                <attachment :attachment="single_comment.attachments" ></attachment>
                            </div>
                        </div>
                        <div class="footer_comment">
                            <div class="row no-gutter">
                                <div class="col-50">
                                </div>
                                <div class="col-40" v-if="!myComment">
                                    <div class="control">
                                        <div class="control_my_comment" >
                                            <button @click="editComment($event)"> <i class="fa fa-pencil" aria-hidden="true"></i></button>
                                            <button @click.prevent="removeComment(id)"> <i class="fa fa-trash-o" aria-hidden="true"></i></button>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-40 no_my_comment" v-else></div>
                                <div class="col-10">
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <text_area v-else key="edit" :comment="this.single_comment" @edit_done="edit_done()" :type="true" ></text_area>
        </transition>
    </f7-block>



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
            id: {type: Number, default: 0},
            read:{type:Boolean,default:false}
        },
        data:function(){
            return{
                mode:true
            }
        },
        computed:{
            myComment() {
                return (this.read);
            }
        },
        methods: {
            data_forma(data){
                data=new Date(data);
                let curSec=('0'+data.getSeconds()).substr(-2);
                let curMin=('0'+data.getMinutes()).substr(-2);
                let curDay=('0'+data.getDate()).substr(-2);
                let curMounth=('0'+(data.getMonth()+1));
                let date_for_text=curDay+"/"+curMounth+"/"+data.getFullYear()+" "+data.getHours()+":"+curMin+":"+curSec;
                return date_for_text;
            },
            hasAttach() {
                return (this.single_comment.attachments.length > 0)
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
    .date_comment{
        font-size: 12px;
        padding-top:4px!important;
        text-align: center;
    }
    .data_text{
        opacity: 0.7;
    }
    .content_comment{
        padding:15px 7px 15px 7px;
        word-wrap: break-word;
    }

    .footer_comment .control{
        position:relative;
        padding:0 10px 0 10px;
    }
    .footer_comment,
    .header_comment div,
    .footer_comment div{
        position:relative;
    }

    .control_my_comment{
        display:flex;
        justify-content: center;
        overflow: visible;

    }
    .control_my_comment button{
        background-color: transparent;
        border:unset;
        color: #868686;
        margin:0 10px 0 10px;
        font-size: 22px;
    }


    .header_comment .row .col-50:after,
    .header_comment .row .col-10:after,
    .header_comment .row .col-40:after,
    .footer_comment .row .col-50:after,
    .footer_comment .row .col-10:after,
    .footer_comment .row .no_my_comment:after{
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