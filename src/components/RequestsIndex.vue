<template>
<!--<search-user></search-user>-->
<list-requests></list-requests>
</template>

<script>
import ListRequests from '../components/requests/ListRequests.vue'
//import SearchUser from './functionalities/SearchUser.vue'

export default {
    name: 'RequestsIndex',
    components: {
        ListRequests,
        //SearchUser,

    },

}
</script>

<style>

</style>
