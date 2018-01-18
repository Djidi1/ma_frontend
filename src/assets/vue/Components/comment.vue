<template>
    <div>
        <div v-for="(comment,id)  in this.data_comments" :key="id" :id="'comment_'+id" >
            <single-comment :single_comment="comment" :id="id"></single-comment>
        </div>
    </div>
</template>

<script>

    export default {
        name: "comment",
        props:{
           data_comments:{type: Array,default:function(){return[]}}
        },
        data:function(){
            return{
                show:true
            }
        },
        created:function(){

        },
        methods:{
            hasAttach(id){
                return (this.data_comments[id].attachments.length>0)
            },
            myComment(id){
                return (this.data_comments[id].from===this.$root.auth_info.name)
            },
            attachImg(attach_img){
                return{
                    'background-image': this.hasAttach() ? 'url(' + attach_img + ')' : 'none'
                }
            },
            removeComment(id){
                let self=this;
                this.$f7.confirm("",this.$root.localization.modal.modalTextConf, function () {
                   //self.test.splice(id,1);
                });
            },
            editComment(e){
                e.preventDefault();
               // this.$emit('test');
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