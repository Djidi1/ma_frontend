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
                    <f7-block inner><text_area  :data_set="this.data_comments" :read="read"></text_area></f7-block>
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
        data: function () {
            return {
               comments:this.data_comments
            }
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
                console.log(1);
                if (this.comments.length === 0) this.create_new_comment();
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
                console.log("getPhoto")
                self.get_img_data(img).then(
                    f => {
                        self.$$('#img_pr' + (self.comments[0].attachments.length - 1)).show();
                        window.resolveLocalFileSystemURL(cordova.file.externalDataDirectory + "img/", function (dir) {
                            f.moveTo(dir, f.name, function (entry) {
                                self.comments[0].attachments[ self.comments[0].attachments.length - 1].url = entry.toURL();
                                self.$$('#img_pr' + (self.comments[0].attachments.length - 1)).hide();
                                self.$ls.set('objects', self.$root.objects);
                                console.log('end');
                                console.log(self.comments);
                            }, function (error) {
                                self.$f7.alert(error.code, this.$root.localization.pop_up.warning);
                                self.comments[0].attachments.splice( self.comments[0].attachments.length - 1, 1);
                                self.$ls.set('objects', self.$root.objects);
                            });
                        });
                    },
                    error => {
                        self.$f7.alert(error.code, this.$root.localization.pop_up.warning);
                    }
                );

            },
            get_img_data: function (url) {
                console.log('get_img_data');
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
                                self.comments[0].attachments.push(img_data);
                                console.log('push_to_com')
                                console.log(self.comments);
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
                    "create_date":this.GetCurrentDate(),
                    "attachments":[]
                };
                console.log('createNew');
                this.comments.push(object_com);



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