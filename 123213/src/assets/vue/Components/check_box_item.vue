<template>
        <f7-col width="50">
                <label class="item-content label-checkbox " :class="button_cls">
                    <i :class="icon_cls" aria-hidden="true"></i>
                    <input name="checkbox" type="checkbox" :checked="checked_status"  @change="checkbox_change(button_type)">
                    <div class="item-media">
                        <i class="icon icon-form-checkbox"></i>
                    </div>
                </label>
        </f7-col>
</template>

<script>
    export default {
        name: "check_box_item",
        props:{
            item_status:{type:Number,default:0},
            button_type:{type:Boolean,default:true}
        },
        computed:{
            button_cls(){
                return (this.button_type)?"sucsess_status":"false_status";
            },
            icon_cls(){
                return (this.button_type)?"fa fa-thumbs-up":"fa fa-thumbs-down";
            },
            checked_status(){
                return (this.item_status===0)?false:(this.item_status===1)?(this.button_type)?true:false:(!this.button_type)?true:false;
            }
        },
        methods:{
            checkbox_change(val){
                val = (this.button_type)?1:-1;
                this.$emit('change_status',val)
            }
        }
    }
</script>

<style scoped>
    label .fa{
     color:#9e9e9e;
    }
    .false_status input[type=checkbox]:checked+.item-media i,icon-form-checkbox{
        background-color:#b51313!important;
        border-color: #b51313!important;
    }
    .sucsess_status input[type=checkbox]:checked+.item-media i,icon-form-checkbox{
        background-color: #019341 !important;
        border-color: #019341!important;
    }

</style>