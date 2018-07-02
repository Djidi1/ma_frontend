<template>
    <!--Блок с textarea для редактирования или создания нового комментария-->
    <div class="comment_text_zone" id="edit">
        <f7-list form>
            <f7-list-item>
                <f7-label floating v-if="is_audit">{{this.$root.localization.AuditPage.comment_placeholder}}</f7-label>
                <f7-input type="textarea" v-model="text" @change="send_comments"></f7-input>
            </f7-list-item>

            <attachment @removeAttach="this.removeAttachment" :attachment="attachment" :edit_mode="true" v-if="comment_for_audit"></attachment>
            <!--<f7-block>-->
                <!--<div class="row ">-->
                    <!--<div class="col-50 attachment_button">-->
                        <!--<div class="comment-photupload comment-photos" @click="upload(true)" v-if="comment_for_audit" >-->
                            <!--<camera></camera>-->
                        <!--</div>-->
                        <!--<div class="comment-photupload comment-photos" @click="upload(false)" v-if="comment_for_audit">-->
                            <!--<image_multiply></image_multiply>-->
                        <!--</div>-->
                    <!--</div>-->
                    <!--&lt;!&ndash;<div class="col-50" v-if="comment_for_audit">&ndash;&gt;-->
                        <!--&lt;!&ndash;<f7-button fill @click="send_comments"> {{this.$root.localization.AuditPage.comment_button}}</f7-button>&ndash;&gt;-->
                    <!--&lt;!&ndash;</div>&ndash;&gt;-->
                <!--</div>-->
            <!--</f7-block>-->

        </f7-list>
    </div>
</template>

<script>

    var $$ = Dom7;
    import  camera from "vue-material-design-icons/camera.vue"
    import  image_multiply from "vue-material-design-icons/image-plus.vue"

    export default {
        components:{
            camera,
            image_multiply
        },
        name: "textarea_comment",
        props: {
            data_set: {
                type: Array, default: function () {
                    return []
                }
            },
            is_audit: {type: Boolean, default: false},

            comment: {
                type: Object, default: function () {
                    return {}
                }
            },


        },
        data: function () {
            return {
                data_comm: '',
                current_comment: '',
                text: '',
                attachment: [],
            }
        },
        created: function () {
            if (this.data_set.length>0) {
                this.current_comment = this.data_set;
                this.text = this.current_comment[0].text;
                this.attachment = this.current_comment[0].attachments;

            }else{
                this.current_comment=this.data_set;
                // this.current_comment.push(
                //     {
                //         'id':'',
                //         'text':'',
                //         'user_info':'',
                //         'create_date':'',
                //         'attachments':[]
                //     }
                // );


            }

        },

        mounted: function () {
            this.$nextTick(function () {
                this.check_style_class(this.$el);
                if ((Object.keys(this.comment).length > 0)) {
                    this.correct_css();
                    this.$$(this.$el).find('textarea').focus();
                }
            })
        },
        computed: {
            hasAttach() {
                return (this.attachment.length > 0);
            },
            comment_for_audit() {
                return !(this.audit_comment);
            }
        },
        methods: {


            //Костыль для отображения класов которые не цепляются если вызывать форму на редактирование
            check_style_class(el) {
                let element = $$(el);
                let form_cls;
                let input_cls;
                //костыль дял формы
                let form = element.find('form');
                form.attr('class').split(' ').forEach(function (item) {
                    form_cls = (item !== 'inputs-list');
                });
                if (form_cls) this.add_cls_to_form(form, 'inputs-list');
                //костыль для инпута item-input-field
                let input = element.find('.item-input');
                input.attr('class').split(' ').forEach(function (item) {
                    input_cls = (item !== 'item-input-field');
                });
                if (input_cls) this.add_cls_to_form(input, 'item-input-field');
            },
            add_cls_to_form(form, cls) {
                form.addClass(cls);
            },

            GetCurrentDate() {
                return new Date();
            },
            send_comments() {
                    if ((this.text!='') || (this.attachment.length>0))
                {

                    if (this.current_comment.length===0){
                    this.current_comment.push(
                        {
                            'id':'',
                            'text':'',
                            'user_info':'',
                            'create_date':'',
                            'attachments':[]
                        }
                    );
                }
                    this.current_comment[0].id = this.getOfflineID(this.comment.id);
                    this.current_comment[0].create_date = this.GetCurrentDate();
                    this.current_comment[0].user_info = this.$root.auth_info.user_info;
                    this.current_comment[0].text = this.text;
                    this.current_comment[0].attachments = this.attachment;
                }else{
                        this.current_comment.splice(0,this.current_comment.length);
                }
                    //this.clear_input();
                    this.$ls.set('objects', this.$root.objects);
                    this.$emit('edit_done')


            },
            clear_input() {
                this.text = '';
                this.attachment = [];
                this.$$(this.$el).find('.item-inner').removeClass('not-empty-state');
                this.$$(this.$el).find('.item-inner').find('.item-input').removeClass('not-empty-state');
            },
            removeAttachment(id) {
                this.attachment.splice(id, 1);
            },
            getOfflineID(current) {
                let lastId = 0;
                (current != undefined) ?
                    lastId = current.id :
                    ++lastId;
                return lastId;
            },

            upload(mode) {
                let source = (mode) ? Camera.PictureSourceType.CAMERA : Camera.PictureSourceType.SAVEDPHOTOALBUM;
                navigator.Camera.getPicture(this.getPhoto, this.getPhotoFail, {
                    quality: 30,
                    destinationType: Camera.DestinationType.FILE_URI,
                    sourceType: source,
                    encodingType: Camera.EncodingType.JPEG,
                    mediaType: Camera.MediaType.PICTURE,
                })

            },
            // getPhoto: function (img) {
            //     let self = this;
            //     self.get_img_data(img).then(
            //         f => {
            //             self.$$('#img_pr' + (self.attachment.length - 1)).show();
            //             window.resolveLocalFileSystemURL(cordova.file.externalDataDirectory + "img/", function (dir) {
            //                 f.moveTo(dir, f.name, function (entry) {
            //                     self.attachment[self.attachment.length - 1].url = entry.toURL();
            //                     self.$$('#img_pr' + (self.attachment.length - 1)).hide();
            //                 }, function (error) {
            //                     self.$f7.alert(error.code, this.$root.localization.pop_up.warning);
            //                     self.attachment.splice(self.attachment.length - 1, 1);
            //                 });
            //             });
            //         },
            //         error => {
            //             self.$f7.alert(error.code, this.$root.localization.pop_up.warning);
            //         }
            //     );
            // },
            // get_img_data(url) {
            //     let self = this;
            //     return new Promise(function (resolve, reject) {
            //         window.resolveLocalFileSystemURL(url, function (f) {
            //             f.file(function (file) {
            //                     let img_data = {
            //                         "caption": file.name,
            //                         "file": {
            //                             'name': file.name,
            //                             "size": file.size,
            //                             "type": file.type
            //                         },
            //                         "url": url
            //                     };
            //                     self.attachment.push(img_data);
            //                     resolve(f);
            //                 },
            //                 function (error) {
            //                     reject(error);
            //                 });
            //         })
            //     });
            // },
            //
            //
            // getPhotoFail(message) {
            //     this.$f7.alert('error:' + message, this.$root.localization.pop_up.warning);
            // },
            //

            //Css костыль
            correct_css() {
                let element = $$(this.$el).find('textarea');
                let el = (element.parent().parent());
                el.attr('class').split(' ').forEach(function (item) {
                    let need_cls = (item != 'not-empty-state') ? true : false;
                });
                this.add_cls(el, 'not-empty-state');
            },
            add_cls(obj, cls) {
                obj.addClass(cls);
            }
        }
    }
</script>

<style scoped>
    .attachment_button {
        display: flex;
        justify-content: flex-start;
        height: 36px;
    }

    .attachment_button button {
        padding-top: 5px;
        background-color: transparent;
        border: unset;
        color: #868686;
        margin: 0 7px 0 5px;
    }

    .comment_text_zone {
        padding: 10px 0 20px 0;
    }

    .comment-photos {
        transform:translateY(-6px);
        font-size: 36px;
        line-height: 36px;
        text-align: center;
        color: #868686;
        margin: 0 15px 0 5px;
        width: 36px;

    }

    .comment-photupload {
        position: relative;

    }

    .comment-file {
        min-height: 0;
        width: 100%;
    }

    .comment-photupload input {
        opacity: 0;
        position: absolute;
        top: 0;
        right: 0;
        margin: 0;
        padding: 0;
        font-size: 20px;
        cursor: pointer;
        filter: alpha(opacity=0);
    }

</style>