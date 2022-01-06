<template>
    <carrier-form :carrierID='carrierID'> </carrier-form>
</template>

<script>
import CarrierForm from '../carrierform/CarrierForm.vue'
export default {
  name:'CarrierEdit',
  components: { CarrierForm },
  props:{
    carrierID:{
      required:true,
      type:String
    }
  }
}
</script>

<style>

</style>