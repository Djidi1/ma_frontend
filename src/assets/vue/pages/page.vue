<template>
    <f7-page>

        <!-- Navbar -->
        <f7-navbar>
            <f7-nav-left>
                <f7-link icon="icon-bars" open-panel="left"></f7-link>
            </f7-nav-left>
            <f7-nav-center sliding>ACCR</f7-nav-center>

        </f7-navbar>
        <f7-block inner>
            <p>Here is list of Object to audit!</p>
            <f7-block-title> List of object</f7-block-title>
            <f7-list>
                <f7-list-item v-for="item in this.$root.list" :key="item.id" link="#">
                    {{item}} Object
                </f7-list-item>
        </f7-list>
        </f7-block>
    </f7-page>
</template>

<script>
    export default {
        name: "page",

    }
</script>

<style scoped>

</style>