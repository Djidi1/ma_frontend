<template>
    <div>
        <div v-for="(comment,id)  in this.data_comments" :key="id" :id="'comment_'+id">
            <single_comment :single_comment="comment" :id="id" @remove="removeComment" @resize="resize"></single_comment>
        </div>
    </div>
</template>

<script>

    export default {
        name: "comment",
        props:{
           data_comments:{type: Array,default:function(){return[]}}
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
                      self.data_comments.splice(id,1);
                 });
            },
            resize(){
                this.$emit('resize')
            }
    }
    }
</script>

<style scoped>



</style>