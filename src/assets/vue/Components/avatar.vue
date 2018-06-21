<template>
    <!--Блок с аватаркой и именем пользователя-->
    <div class="row user_block">
        <f7-grid>
            <f7-col width="100">
                <b>{{fullname}}</b>
            </f7-col>
            <f7-col width="100" class="email_user">{{email}}</f7-col>
        </f7-grid>
    </div>
</template>

<script>
    export default {
        name: 'avatar',
        props: {
            fullname: { type: String, default: '##' },
            email: { type: String, default: '##' },
        },
    }
</script>