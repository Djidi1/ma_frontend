<template>
    <f7-page pull-to-refresh @ptr:refresh="this.$root.onRefresh">

        <!-- Navbar -->
        <f7-navbar>
            <f7-nav-left>
                <f7-link icon="icon-bars" open-panel="left"></f7-link>
            </f7-nav-left>
            <f7-nav-center sliding>{{this.$root.localization.AuditPage_main}}</f7-nav-center>

        </f7-navbar>
            <list :data_storage="this.$root.list"></list>
    </f7-page>
</template>

<script>
    export default {
        name: "page",

    }
</script>

