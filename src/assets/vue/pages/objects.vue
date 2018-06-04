<template>
    <!--Страница объектов.-->
    <f7-page name="objects_main" pull-to-refresh @ptr:refresh="this.$root.onRefresh">
        <!-- Navbar -->
        <f7-navbar>
            <f7-nav-left>
                <f7-link icon="icon-bars" open-panel="left"></f7-link>
            </f7-nav-left>
            <f7-nav-center sliding>{{this.$root.localization.ObjectPage_main}}</f7-nav-center>
        </f7-navbar>
        <list_object></list_object>
        <f7-fab color="blue" class="fab_bottom" @click="open_popup()">
            <f7-icon icon="icon-plus"></f7-icon>
        </f7-fab>
        <popup_new_object></popup_new_object>
    </f7-page>
</template>

<script>
    export default {
        name: "objects",
        data: function () {
            return {
                popup_open: false
            }
        },
        methods: {
            open_popup() {
                let $$ = Dom7;
                this.$f7.popup($$('#popup_add'));
            }
        }
    }
</script>