<template>
    <div class="attachments_comments">
        <transition-group name="attach_fade" v-on:after-leave="resize" v-on:enter="resize">
        <div class="attach_block" v-for="(attach,index) in attachment" :key="attach.file.name">
            <div class="attach" :id="'img_'+index"  :style="attachImg(attach,index)" @click="photolook(attachment,index)">
                <div :id="'img_pr'+index" class="load_progress">
                    <div class="bar_load"><div class="progress"></div></div>
                </div>
                <div class="header_img">{{attach.caption}}</div>
                <div class="footter_img">{{get_size(attach.file.size)}}</div>
            </div>
            <div class="remove_button_block" v-show="edit_mode">
                <div class="remove_button" @click="remove_attach(index)"><i class="fa fa-times" aria-hidden="true"></i></div>
            </div>
        </div>
            {{this.attachment}}
        </transition-group>
        </div>
</template>

<script>

    var $$=Dom7;
    export default {
        name: "attachment",
        props:{
            attachment:{type:Array,default:function(){return []}},
            edit_mode:{type:Boolean,default:false}
        },
        methods:{
            attachImg(attach_img,id){
                return{
                    'background-image': 'url(' + attach_img.url + ')'
                }
            },
            get_size(size){
              let norm_size;
              norm_size=Math.ceil(size/1000);
              let result_size=(norm_size>100)?(norm_size/1000).toFixed(1):norm_size;
              return(norm_size>100)?result_size+'MB':result_size+'KB';
            },

            photolook(attach,id){
                let photos =this.$f7.photoBrowser({
                        type: 'popup',
                        photos:attach,
                        theme:'dark'
                    }
                );
                photos.open(id);
            },
            remove_attach(id){
                this.attachment.splice(id,1);
            },
            resize(){
                this.$emit('resize_attach');
            }
        }
    }
</script>

<style scoped>
    .attach{
        border:1px solid #ddd;
        display: inline-block;
        background-color: transparent;
        color: white;
        width: 60px;
        height: 60px;
        font-size: 12px;
        background-size: cover;
        background-position: center;
        background-repeat: no-repeat;
        background-image: none;
        margin:0 20px 0 10px;
        position: relative;
    }
    .attach_fade-enter-active,.attach_fade-leave-active{
        transition:  all .3s cubic-bezier(.65, 0.05, 0.36, 1.0);
    }

    .attach_fade-enter,.attach_fade-leave-to{
        opacity: 0;

    }
    .attach:after,
    .attach:before{
        content:'';
        display: block;
        height:15px;
        width: 100%;
        background-color: #222222;
        opacity: 0.5;
        position: absolute;
    }
    .attach:after{
        bottom: 0;
    }
    .header_img,
    .footter_img{
        position:absolute;
        width:60px;
        height: 15px;
        opacity: 1;
        display:block;
        overflow: hidden;
        font-size: 10px;
        text-align: center;
    }
    .header_img{
        top:0;
    }
    .footter_img{
        bottom:0;
        z-index:1000;
    }
    .load_progress{
        display:none;
        position:absolute;
        background-color: #FFFFFF;
        width:100%;
        height:100%;
        z-index:1015;
    }
    .bar_load{
        border:1px solid #ddd;
        border-radius: 5px;
        margin:24px 3px 0px 3px;
        height:10px;
        padding:1px;
    }
    .progress{
        border-radius: 4px;
        display:block;
        background-color: #2196F3;
        height:100%;
        width:0;
    }


</style>