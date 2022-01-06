<template>
<!--<search-user></search-user>-->
<list-carriers></list-carriers>
<navbar-carriers> </navbar-carriers>
</template>

<script>
import ListCarriers from '../components/carriers/ListCarriers.vue'
import NavbarCarriers from '../layouts/NavbarCarriers.vue'
//import SearchUser from './functionalities/SearchUser.vue'

export default {
    name: 'CarriersIndex',
    components: {
        ListCarriers,
        NavbarCarriers,
        //SearchUser,

    },

}
</script>

<style>

</style>
