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

            <f7-fab color="blue"  class="fab_bottom" @click="popup_open=true">
               <f7-icon icon="icon-plus"></f7-icon>
            </f7-fab>
            <popup_new :opendPopup="popup_open" @close="popup_open=false" :mode_audit="true" :mode_audit_edit="false"></popup_new>
    </f7-page>
</template>

<script>
    export default {
        name: "page",
        data:function(){
          return{
              popup_open:false,
              test_sw:false

            }
        },
        methods:{

        }
    }
</script>

