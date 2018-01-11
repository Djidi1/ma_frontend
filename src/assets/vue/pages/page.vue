<template>
    <f7-page pull-to-refresh @ptr:refresh="onRefresh">

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
    import List from '../Components/list_audit.vue'
    export default {
        name: "page",
        components:{
          list:List
        },
        methods:{
            onRefresh: function (event, done) {
                var self = this;
                setTimeout(function () {
                    self.$root.list.push({name:'test'});
                    done();
                }, 2000);
            }
        }
    }
</script>

