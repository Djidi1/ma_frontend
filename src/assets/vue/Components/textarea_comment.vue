<template>
    <!--Блок с textarea для редактирования или создания нового комментария-->
    <div class="comment_text_zone" id="edit">
        <f7-list form>
            <f7-list-item>
                <f7-label floating v-if="is_audit">{{this.$root.localization.AuditPage.comment_placeholder}}</f7-label>
                <f7-input type="textarea" v-model="text" @change="send_comments" :disabled="this.read"></f7-input>
            </f7-list-item>

            <attachment @removeAttach="this.removeAttachment" :attachment="this.attachment" :edit_mode="true"
                        v-if="comment_for_audit" @delete_comm="delete_attr"></attachment>
        </f7-list>
    </div>
</template>

<script>
    let $$ = Dom7;
    import camera from "vue-material-design-icons/camera.vue"
    import image_multiply from "vue-material-design-icons/image-plus.vue"

    export default {
        components: {
            camera,
            image_multiply
        },
        name: "textarea_comment",
        props: {
            id: {type: String},
            array_index: {type: String},
            data_set: {
                type: Array, default: function () {
                    return []
                }
            },
            is_audit: {type: Boolean, default: false},

            comment: {
                type: Object, default: function () {
                    return {}
                },

            },
            read: {type: Boolean, default: false},
            attachments: {
                type: Array, default: function () {
                    return [];
                }
            }
        },
        data: function () {
            return {
                data_comm: '',
                current_comment: '',
                text: '',
                attachment: this.attachments
            }
        },
        created: function () {
            if (this.data_set.length > 0) {
                this.current_comment = this.data_set;
                this.text = this.current_comment[0].text;

            } else {
                this.current_comment = this.data_set;
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
                //Берем нужный аудит при помощи идентификаторов которые пришли через пропсы.
                // Обновляем комментарий в аудите
                if (this.array_index > 0) {
                    let cur_obj = this.$_.findWhere(this.$root.objects, {id: Number(this.array_index)});
                    this.audit = (this.$_.findWhere(cur_obj.audits, {id: Number(this.id)}));
                    this.audit.title = this.text;
                }else{
                    // Обновляем комментарий в чеклисте
                    if ((this.text !== '') || (this.attachment.length>0)) {
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
                }
                this.$ls.set('objects', this.$root.objects);
                this.$emit('edit_done')
            },
            getOfflineID(current) {
                let lastId = 0;
                (current !== undefined) ?
                    lastId = current.id :
                    ++lastId;
                return lastId;
            },
            removeAttachment(id) {
                this.attachment.splice(id, 1);
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
            delete_attr(id) {
                this.current_comment[0].attachments.splice(id, 1);
                if (this.text === '')
                    this.current_comment.splice(0, this.current_comment.length);
                this.$ls.set('objects', this.$root.objects);
            },

            //Css костыль
            correct_css() {
                let element = $$(this.$el).find('textarea');
                let el = (element.parent().parent());
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
        transform: translateY(-6px);
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