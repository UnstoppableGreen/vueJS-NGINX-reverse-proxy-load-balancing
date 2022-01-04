<template>
<search-user></search-user>
<list-user></list-user>
<navbar-clients></navbar-clients>
</template>

<script>
import ListUser from '../components/user/ListUser.vue'
import SearchUser from './functionalities/SearchUser.vue'
import NavbarClients from '../layouts/NavbarClients.vue'
export default {
    name: 'UserIndex',
    components: {
        NavbarClients,
        ListUser,
        SearchUser,

    },

}
</script>

<style>

</style>
