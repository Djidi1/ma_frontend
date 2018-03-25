<template>
    <!--Не помню используется или нет. Вроде нет. Удалить. Блок с именем пользователя-->
    <div class="user_name" >
        <table>
            <tr>
                <td>{{fullname}}</td>
            </tr>
            <tr>
                <td>{{email}}</td>
            </tr>
        </table>
    </div>
</template>

<script>
    export default {
        name: 'user_name',
        props: {
            fullname: { type: String, default: '' },
            email: { type: String, default: '##' },
        }
    }
</script>

<style scoped>
    .user_name {
        display: inline-block;
        font-size: 15px;
        text-align: left;
        padding:0 5px 0 0;
        text-align: left;
        height: 81px;
    }
    .user_name table {
        width: 100%;
        height: 100%;
        text-align: center;
        vertical-align: middle;
        margin: 0;
        padding: 0;
    }
   .user_name td{
        text-align: left;
       padding-left:10px;
    }

</style>