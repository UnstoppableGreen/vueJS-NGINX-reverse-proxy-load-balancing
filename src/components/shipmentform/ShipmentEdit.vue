<template>
    <shipment-form :shipmentID='shipmentID'> </shipment-form>
</template>

<script>
import ShipmentForm from '../shipmentform/ShipmentForm.vue'
export default {
  name:'ShipmentEdit',
  components: { ShipmentForm },
  props:{
    shipmentID:{
      required:true,
      type:String
    }
  }
}
</script>

<style>

</style>