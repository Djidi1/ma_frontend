<template>
    <f7-block class="comment_acrd"  >
        <f7-list accordion class="acrd_custom">
            <f7-list-item accordion-item :title="this.$root.localization.AuditPage.comments_title" after="<i class='fa fa-commenting-o' aria-hidden='true'></i>">
                <f7-accordion-content>
                    <transition appear mode="out-in" name="slide-fade">
                    <single-comment  v-for="(comment,id) in this.data_comments" :key="id" :single_comment="comment" @remove="remove_comment"></single-comment>
                    <f7-block inner v-if="!hasComment" class="custom_block_no_after" ><text_area :data_set="this.data_comments"></text_area></f7-block>
                    </transition>
                </f7-accordion-content>
            </f7-list-item>
        </f7-list>
    </f7-block>
</template>

<script>

    import SingleComment from "src/assets/vue/Components/single-comment";

    export default {
        components: {SingleComment},
        name: "comment",
        props:{
           data_comments:{type: Array,default:function(){return[]}}
        },
        computed:{
            hasComment(){
                return (this.data_comments.length>0);
            }
        },
        methods:{
            remove_comment(id){
                let self=this;
                this.$f7.confirm("",this.$root.localization.modal.modalTextConf, function () {
                    self.data_comments.splice(id,1);
                    self.$root.update_ls();
                });

            }
        }

    }
</script>

<style scoped>
.comment_acrd{
    padding: 0 !important;

}
.acrd_custom{
    margin-top: 0 !important;
    padding-bottom: 10px!important;
}
.acrd_custom .item-content:after{
    color:red;
}


.comment_fade-enter-active,.attach_fade-leave-active{
    transition:  all .10s ;
}

.comment_fade-enter,.attach_fade-leave-to{
    opacity: 0;

}


</style>