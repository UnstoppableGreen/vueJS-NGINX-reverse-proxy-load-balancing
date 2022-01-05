<template>
<!--<search-user></search-user>-->
<list-requests></list-requests>
<navbar-requests> </navbar-requests>
</template>

<script>
import ListRequests from '../components/requests/ListRequests.vue'
import NavbarRequests from '../layouts/NavbarRequests.vue'
//import SearchUser from './functionalities/SearchUser.vue'

export default {
    name: 'RequestsIndex',
    components: {
        ListRequests,
        NavbarRequests,
        //SearchUser,

    },

}
</script>

<style>

</style>
