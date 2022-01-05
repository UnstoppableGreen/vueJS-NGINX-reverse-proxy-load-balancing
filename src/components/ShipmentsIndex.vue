<template>
<list-shipments></list-shipments>
<navbar-shipments> </navbar-shipments>
</template>

<script>
import ListShipments from '../components/shipments/ListShipments.vue'
import NavbarShipments from '../layouts/NavbarShipments.vue'
export default {
    name: 'ShipmentsIndex',
    components: {
        NavbarShipments,
        ListShipments,

    },

}
</script>

<style>

</style>
