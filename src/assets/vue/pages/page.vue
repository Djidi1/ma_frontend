<template>
    <f7-page pull-to-refresh @ptr:refresh="onRefresh">

        <!-- Navbar -->
        <f7-navbar>
            <f7-nav-left>
                <f7-link icon="icon-bars" open-panel="left"></f7-link>
            </f7-nav-left>
            <f7-nav-center sliding>ACCR</f7-nav-center>

        </f7-navbar>

            <f7-block-title><p>Here is list of Object to audit!</p></f7-block-title>
            <f7-block-title> List of object</f7-block-title>
            <f7-list >
                <f7-list-item swipeout  v-for="item in this.$root.list" :key="item.id" link="#" :title="item.name" :badge="item.status" :badge-color="item.color" >
                    <f7-swipeout-actions>
                        <f7-swipeout-button delete>Delete</f7-swipeout-button>
                    </f7-swipeout-actions>
                </f7-list-item>

        </f7-list>


    </f7-page>
</template>

<script>
    export default {
        name: "page",
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

