<template>
<!--<search-user></search-user>-->
<list-suppliers></list-suppliers>
<navbar-suppliers> </navbar-suppliers>
</template>

<script>
import ListSuppliers from '../components/suppliers/ListSuppliers.vue'
import NavbarSuppliers from '../layouts/NavbarSuppliers.vue'
//import SearchUser from './functionalities/SearchUser.vue'

export default {
    name: 'SuppliersIndex',
    components: {
        ListSuppliers,
        NavbarSuppliers,
        //SearchUser,

    },

}
</script>

<style>

</style>
