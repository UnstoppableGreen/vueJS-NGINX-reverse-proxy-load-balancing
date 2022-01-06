<template>
    <supplier-form :supplierID='supplierID'> </supplier-form>
</template>

<script>
import SupplierForm from '../supplierform/SupplierForm.vue'
export default {
  name:'SupplierEdit',
  components: { SupplierForm },
  props:{
    supplierID:{
      required:true,
      type:String
    }
  }
}
</script>

<style>

</style>