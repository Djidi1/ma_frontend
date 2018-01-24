<template>
    <div class="blck_info">
        <f7-card>
            <f7-card-content>
                <f7-list media-list>
                    <f7-list-item v-for="(object,index) in data_storage" :key="index" :link="'/object/'+index+'/'" :title="title+': '+object.name" :subtitle="'ID: '+object.id"  :text="object.created_date+'</br>'+object.adres" :after="audit_count(object)+'</br>'+new_audit_count(object)"></f7-list-item>
                </f7-list>
            </f7-card-content>
        </f7-card>
    </div>
</template>

<script>
    export default {
        name: "object_list",
        props:{
            data_storage:{ type: Array, default: function () { return [] } }
        },
        computed:{
            title(){
                return this.$root.localization.ObjectPage.name;
            },
    },
        methods:{
            audit_count(obj){
                let self=this;
               return (obj.audits.length>0)? this.$root.localization.ObjectPage.audits+': '+obj.audits.length:'';
            },
            new_audit_count(obj){
                let count=0;
                obj.audits.forEach(function(item){
                    (item.status==='new')?count++:'';
                })
                return (count>0)? '<div class="new_audits_count">'+this.$root.localization.ObjectPage.new_audits+': '+count+'</div>':'';
            }
        }
    }
</script>

<style scoped>

</style>