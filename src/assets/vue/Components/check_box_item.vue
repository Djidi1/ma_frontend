<template>
     <!--Квадратные блоки чек-боксов для каждого требоваия чек-листа-->
        <f7-col width="50">
                <label class="item-content label-checkbox custom_checkbox" :class="button_cls">
                    <!--<i :class="icon_cls" aria-hidden="true"></i>-->
                    <input name="checkbox" type="checkbox" :checked="checked_status"  @change="checkbox_change(button_type)" :disabled="read">
                    <div class="item-media" style="padding-left:0!important">
                        <i class="icon icon-form-checkbox"></i>
                    </div>
                </label>

        </f7-col>
</template>

<script>
    let $$=Dom7;
    export default {
        name: "check_box_item",
        props:{
            item_status:{type:Number,default:0},
            button_type:{type:Boolean,default:true},
            read:{type:Boolean,default:false},
            item:{type:Object}
        },
        computed:{
            button_cls(){
                return (this.button_type)?"sucsess_status":"false_status";
            },
            checked_status(){
                return (this.item_status===0)?false:(this.item_status===1)?(this.button_type)?true:false:(!this.button_type)?true:false;
            }
        },
        methods:{
            checkbox_change(val){
                 val = (this.button_type)?1:-1;
                this.$emit('change_status',val,this.item)
            },
            selected_object_done(item){
               this.item.responsible=Number(item.target.value);
               let  val = (this.button_type)?1:-1;
                this.$emit('change_status',val,this.item)
            },

        }
    }
</script>

<style scoped>
    label .fa{
     color:#9e9e9e;
    }

    .sucsess_status:after,
    .false_status:after{
        display:none!important;
    }

</style>