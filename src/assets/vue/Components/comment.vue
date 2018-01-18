<template>
    <div :id="data_comments.id">
        <div  class="comment_block"  >
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
                <div v-show="hasAttach" >
                    <attachment :attachment="data_comments.attachments" ></attachment>
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
                                <button @click.prevent="removeComment(comment_id)"> <i class="fa fa-trash-o" aria-hidden="true"></i></button>
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
    import Attachment from "src/assets/vue/Components/attachment";

    var $$=Dom7;
    export default {
        components: {Attachment},
        name: "comment",
        props:{
            obj_id:{ type: Number, default: 0 },
            audit_id:{ type: Number, default: 0 },
            item_id:{ type: Number, default: 0 },
            comment_id:{ type: Number, default: 0 },
            check_id:{ type: Number, default: 0 }
        },
        data:function(){
            return{
                data_comments:''
            }
        },
        computed:{
            hasAttach(){
                return (this.data_comments.attachments.length>0)
            },
            myComment(){
                return (this.data_comments.from===this.$root.auth_info.name)
            }
        },
        created:function(){
            this.data_comments=this.data_comments=this.$root.list[this.obj_id].audits[this.audit_id].check_list[this.check_id].list_to_check[this.item_id].comments[this.comment_id];
        },
        methods:{
            attachImg(attach_img){
                return{
                    'background-image': this.hasAttach ? 'url(' + attach_img + ')' : 'none'
                }
            },
            removeComment(id){
                let sefl=this;
                this.$f7.confirm("",this.$root.localization.modal.modalTextConf, function () {

                });
            },
            editComment(e){
                e.preventDefault();
                this.$emit('test');
               // this.$root.show=!this.$root.show;
               // this.animate()
            },







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