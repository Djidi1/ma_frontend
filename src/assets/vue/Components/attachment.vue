<template>
    <div class="attachments_comments">
        <transition-group name="attach_fade" v-on:after-leave="resize" v-on:enter="resize">
        <div class="attach_block" v-for="(attach,index) in attachment" :key="attach">
            <div class="attach"  :style="attachImg(attach)" @click="photolook(attachment,index)">
                <div class="img_top_back">img
                </div>
                <div class="img_bot_back"></div>
            </div>
            <div class="remove_button_block" v-show="edit_mode">
                <div class="remove_button" @click="remove_attach(index)"><i class="fa fa-times" aria-hidden="true"></i></div>
            </div>
        </div>
        </transition-group>
        </div>
</template>

<script>
    export default {
        name: "attachment",
        props:{
            attachment:{type:Array,default:function(){return []}},
            edit_mode:{type:Boolean,default:false}
        },
        methods:{
            attachImg(attach_img){
                return{
                    'background-image': 'url(' + attach_img + ')'
                }
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
        margin:0 10px 0 10px;
    }

    .attach_fade-enter-active,.attach_fade-leave-active{
        transition:  all .3s cubic-bezier(.65, 0.05, 0.36, 1.0);
    }

    .attach_fade-enter,.attach_fade-leave-to{
        opacity: 0;

    }


</style>