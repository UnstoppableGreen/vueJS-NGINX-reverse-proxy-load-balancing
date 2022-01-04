<template>
<!--<search-user></search-user>-->
<list-order></list-order>
<navbar-orders> </navbar-orders>
</template>

<script>
import ListOrder from '../components/orders/ListOrder.vue'
import NavbarOrders from '../layouts/NavbarOrders.vue'
//import SearchUser from './functionalities/SearchUser.vue'

export default {
    name: 'OrderIndex',
    components: {
        NavbarOrders,
        ListOrder,
        //SearchUser,

    },

}
</script>

<style>

</style>
