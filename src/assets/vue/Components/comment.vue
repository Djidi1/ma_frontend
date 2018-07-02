<template>
    <!--Блок с комментариями-->
    <f7-block class="comment_acrd"  >
        <f7-list  class="acrd_custom">
            <f7-list-item  class="inner_check_connetent"  :title="$root.localization.AuditPage.comments_title">
                <div slot="after">
                    <div style="font-size:25px; display:inline-block; transition:all .3s; padding:0 10px; transform:translateY(-7px)" :class="(data_comments.length>0)?'blue_cls':''"  > <comment_icon></comment_icon> </div>
                    <div @click="upload(false)" style="font-size:30px; display:inline-block; transition:all .3s; padding:0 10px; transform:translateY(-5px)" > <image_multiply></image_multiply></div>
                    <div @click="upload(true)" style="font-size:30px; display:inline-block; transition:all .3s; padding:0 10px; transform:translateY(-5px)"  > <camera_icon></camera_icon></div>
                </div>
                <div slot="root">
                    <f7-block inner><text_area  :data_set="this.data_comments" :audit_comment="false"></text_area></f7-block>
                </div>
            </f7-list-item>
        </f7-list>
    </f7-block>
</template>

<script>


    import  comment_icon from "vue-material-design-icons/comment.vue"
    import  camera_icon from "vue-material-design-icons/camera.vue"
    import  image_multiply from "vue-material-design-icons/image-plus.vue"

    export default {
        components: {
            comment_icon,
            camera_icon,
            image_multiply
        },
        name: "comment",
        props:{
           data_comments:{type: Array,default:function(){return[]}},
            read:{type:Boolean,default:false}
        },
        methods:{
            remove_comment(id){
                let self=this;
                this.$f7.confirm("",this.$root.localization.modal.modalTextConf, function () {
                    self.data_comments.splice(id,1);
                     self.$ls.set('objects',self.$root.objects);
                });

            },
            //методы для обработки фото
            upload(mode) {
                if (this.data_comments.length === 0) this.create_new_comment();
                let source = (mode) ? Camera.PictureSourceType.CAMERA : Camera.PictureSourceType.SAVEDPHOTOALBUM;
                navigator.camera.getPicture(this.getPhoto, this.getPhotoFail, {
                    quality: 30,
                    destinationType: Camera.DestinationType.FILE_URI,
                    sourceType: source,
                    encodingType: Camera.EncodingType.JPEG,
                    mediaType: Camera.MediaType.PICTURE,
                })
            },
            getPhoto: function (img) {
                let self = this;
                self.get_img_data(img).then(
                    f => {
                        self.$$('#img_pr' + (self.data_comments[0].attachments.length - 1)).show();
                        window.resolveLocalFileSystemURL(cordova.file.externalDataDirectory + "img/", function (dir) {
                            f.moveTo(dir, f.name, function (entry) {
                                self.data_comments[0].attachments[ self.data_comments[0].attachments.length - 1].url = entry.toURL();
                                self.$$('#img_pr' + (self.data_comments[0].attachments.length - 1)).hide();
                                this.$ls.set('objects', this.$root.objects);
                                console.log(self.data_comments);
                            }, function (error) {
                                self.$f7.alert(error.code, this.$root.localization.pop_up.warning);
                                self.data_comments[0].attachments.splice( self.data_comments[0].attachments.length - 1, 1);
                                this.$ls.set('objects', this.$root.objects);
                            });
                        });
                    },
                    error => {
                        self.$f7.alert(error.code, this.$root.localization.pop_up.warning);
                    }
                );

            },
            get_img_data: function (url) {
                let self = this;
                return new Promise(function (resolve, reject) {
                    window.resolveLocalFileSystemURL(url, function (f) {
                        f.file(function (file) {
                                let img_data = {
                                    "caption": file.name,
                                    "file": {
                                        'name': file.name,
                                        "size": file.size,
                                        "type": file.type
                                    },
                                    "url": url
                                };
                                self.data_comments[0].attachments.push(img_data);
                                console.log(self.data_comments);
                                resolve(f);
                            },
                            function (error) {
                                reject(error);
                            });
                    })
                });

            },
            create_new_comment(){
                let object_com={
                    "id":-1,
                    "text":'',
                    "user_info":this.$root.auth_info.user_info,
                    "create_date":this.GetCurrentDate,
                    "attachments":[]
                };

                this.data_comments.push(object_com);



            },
            GetCurrentDate() {
                return new Date();
            },
        }

    }
</script>

<style scoped>



.comment_fade-enter-active,.attach_fade-leave-active{
    transition:  all .10s ;
}

.comment_fade-enter,.attach_fade-leave-to{
    opacity: 0;

}
.blue_cls{
    color:#2196F3;
}



</style>