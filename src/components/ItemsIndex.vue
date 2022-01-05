<template>
<!--<search-user></search-user>-->
<list-items></list-items>
<navbar-items> </navbar-items>
</template>

<script>
import ListItems from '../components/items/ListItems.vue'
import NavbarItems from '../layouts/NavbarItems.vue'
//import SearchUser from './functionalities/SearchUser.vue'

export default {
    name: 'ItemsIndex',
    components: {
        ListItems,
        NavbarItems,
        //SearchUser,

    },

}
</script>

<style>

</style>
