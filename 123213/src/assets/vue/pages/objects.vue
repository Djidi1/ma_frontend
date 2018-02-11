<template>
    <f7-page pull-to-refresh @ptr:refresh="this.$root.onRefresh" >

        <!-- Navbar -->
        <f7-navbar>
            <f7-nav-left>
                <f7-link icon="icon-bars" open-panel="left"></f7-link>
            </f7-nav-left>
            <f7-nav-center sliding>{{this.$root.localization.ObjectPage_main}}</f7-nav-center>

        </f7-navbar>
        <list_object></list_object>
        <f7-fab color="blue"  class="fab_bottom" @click="popup_open=true">
            <f7-icon icon="icon-plus"></f7-icon>
        </f7-fab>

        <popup_new_object :opendPopup="popup_open" @close="popup_open=false" ></popup_new_object>
    </f7-page>
</template>

<script>


    export default {
        name: "objects",
        data:function(){
            return{
                popup_open:false
            }
        }
    }
</script>

<style scoped>

</style>