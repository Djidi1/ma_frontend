<template>
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
                        <div class="control_my_comment" v-show="myComment(id)">
                            <button @click="editComment($event)"> <i class="fa fa-pencil" aria-hidden="true"></i></button>
                            <button @click.prevent="removeComment()"> <i class="fa fa-trash-o" aria-hidden="true"></i></button>
                        </div>
                    </div>
                </div>
                <div class="col-10">
                </div>
            </div>
        </div>
    </div>

</template>

<script>
    export default {
        name: "single-comment",
        props: {
            single_comment: {
                type: Array, default: function () {
                    return []
                }
            },
            id: {type: Number, default: 0}
        },
        methods: {
            hasAttach(id) {
                return (this.data_comments[id].attachments.length > 0)
            },
            myComment(id) {
                return (this.data_comments[id].from === this.$root.auth_info.name)
            },
            attachImg(attach_img) {
                return {
                    'background-image': this.hasAttach() ? 'url(' + attach_img + ')' : 'none'
                }
            },
            removeComment(id) {
                let self = this;
                this.$f7.confirm("", this.$root.localization.modal.modalTextConf, function () {
                    //self.test.splice(id,1);
                });
            },
            editComment(e) {
                e.preventDefault();
                // this.$emit('test');
            },
        }
    }
</script>

<style scoped>

</style>