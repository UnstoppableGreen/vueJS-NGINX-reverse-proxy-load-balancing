<template>
    <business-trip-form :businessTripID='businessTripID'> </business-trip-form>
</template>

<script>
import BusinessTripForm from '../businesstripform/BusinessTripForm.vue'
export default {
  name:'BusinessTripEdit',
  components: { BusinessTripForm },
  props:{
    businessTripID:{
      required:true,
      type:String
    }
  }
}
</script>

<style>

</style>