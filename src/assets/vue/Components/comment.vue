<template>
  <!--Блок с комментариями-->
  <f7-block class="comment_acrd">
    <f7-list class="acrd_custom">
      <f7-list-item
        class="inner_check_connetent"
        :title="$root.localization.AuditPage.comments_title"
      >
        <div slot="after">
          <div
            style="font-size:25px; display:inline-block; transition:all .3s; padding:0 10px; transform:translateY(-7px)"
            :class="(data_comments.length>0)?'blue_cls':''"
          >
            <comment_icon></comment_icon>
          </div>
          <div
            @click="upload(false)"
            style="font-size:30px; display:inline-block; transition:all .3s; padding:0 10px; transform:translateY(-5px)"
          >
            <image_multiply></image_multiply>
          </div>
          <div
            @click="upload(true)"
            style="font-size:30px; display:inline-block; transition:all .3s; padding:0 10px; transform:translateY(-5px)"
          >
            <camera_icon></camera_icon>
          </div>
        </div>
        <div slot="root">
          <f7-block inner>
            <text_area :data_set="this.comments" :attachments="attachments" :read="read"></text_area>
          </f7-block>
        </div>
      </f7-list-item>
    </f7-list>
  </f7-block>
</template>

<script>
import comment_icon from "vue-material-design-icons/comment.vue";
import camera_icon from "vue-material-design-icons/camera.vue";
import image_multiply from "vue-material-design-icons/image-plus.vue";

export default {
  components: {
    comment_icon,
    camera_icon,
    image_multiply
  },
  name: "comment",
  props: {
    data_comments: {
      type: Array,
      default: function() {
        return [];
      }
    },
    read: { type: Boolean, default: false }
  },
  data: function() {
    return {
      comments: this.data_comments,
      attachments: []
    };
  },
  created: function() {
    this.attachments =
      this.data_comments.length > 0 ? this.data_comments[0].attachments : [];
  },
  methods: {
    remove_comment(id) {
      let self = this;
      this.$f7.confirm(
        "",
        this.$root.localization.modal.modalTextConf,
        function() {
          self.data_comments.splice(id, 1);
          self.$ls.set("objects", self.$root.objects);
        }
      );
    },
    //методы для обработки фото
    upload(mode) {
      let source = mode
        ? Camera.PictureSourceType.CAMERA
        : Camera.PictureSourceType.SAVEDPHOTOALBUM;
      navigator.camera.getPicture(this.getPhoto, this.getPhotoFail, {
        quality: 30,
        destinationType: Camera.DestinationType.FILE_URI,
        sourceType: source,
        encodingType: Camera.EncodingType.JPEG,
        mediaType: Camera.MediaType.PICTURE,
        correctOrientation: true
      });
    },
    getPhoto: function(img) {
      let self = this;
      if (this.comments.length === 0) this.create_new_comment();
      self.get_img_data(img).then(
        f => {
          console.log("get_here");
          console.log(f);
          window.resolveLocalFileSystemURL(
            cordova.file.externalDataDirectory,
            function(dir) {
              f.moveTo(
                dir,
                f.name,
                function(entry) {
                  console.log("entry: " + entry);
                  console.log("entry_URL: " + entry.toURL());
                  self.comments[0].attachments[
                    self.comments[0].attachments.length - 1
                  ].url = entry.toURL();
                  self.attachments[
                    self.attachments.length - 1
                  ].url = entry.toURL();
                  console.log(self.attachments);
                  self.$ls.set("objects", self.$root.objects);
                },
                function(error) {
                  console.log("erorr_.last");
                  self.$f7.alert(
                    error.code,
                    self.$root.localization.pop_up.warning
                  );
                  self.comments[0].attachments.splice(
                    self.comments[0].attachments.length - 1,
                    1
                  );
                  self.attachments.splice(self.attachments.length - 1, 1);
                  self.$ls.set("objects", self.$root.objects);
                }
              );
            }
          );
        },
        error => {
          self.$f7.alert(error.code, this.$root.localization.pop_up.warning);
        }
      );
    },
    get_img_data: function(url) {
      let self = this;
      if (url.substring(0, 21) == "content://com.android") {
        url = url.split("%3A");
        url = "content://media/external/images/media/" + url[1];
        console.log(url);
      }
      return new Promise(function(resolve, reject) {
        window.resolveLocalFileSystemURL(url, function(f) {
          f.file(
            function(file) {
              let img_data = {
                caption: file.name,
                file: {
                  name: file.name,
                  size: file.size,
                  type: file.type
                },
                url: url
              };
              self.attachments.push(img_data);
              self.comments[0].attachments = self.attachments;
              resolve(f);
            },
            function(error) {
              console.log("pfff");
              reject(error);
            }
          );
        });
      });
    },
    create_new_comment() {
      let object_com = {
        id: -1,
        text: "",
        user_info: this.$root.auth_info.user_info,
        create_date: this.GetCurrentDate(),
        attachments: []
      };
      this.comments.push(object_com);
    },
    GetCurrentDate() {
      return new Date();
    }
  }
};
</script>

<style scoped>
.comment_fade-enter-active,
.attach_fade-leave-active {
  transition: all 0.1s;
}

.comment_fade-enter,
.attach_fade-leave-to {
  opacity: 0;
}
.blue_cls {
  color: #2196f3;
}
</style>