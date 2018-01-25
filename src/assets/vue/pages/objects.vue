<template>
    <f7-page pull-to-refresh @ptr:refresh="this.$root.onRefresh" >

        <!-- Navbar -->
        <f7-navbar>
            <f7-nav-left>
                <f7-link icon="icon-bars" open-panel="left"></f7-link>
            </f7-nav-left>
            <f7-nav-center sliding>{{this.$root.localization.ObjectPage_main}}</f7-nav-center>

        </f7-navbar>
        <list_object :data_storage="this.$root.list"></list_object>
        <f7-fab color="blue"  class="fab_bottom">
            <f7-icon icon="icon-plus"></f7-icon>
        </f7-fab>
    </f7-page>
</template>

<script>


    export default {
        name: "objects"
    }
</script>

<style scoped>

</style>