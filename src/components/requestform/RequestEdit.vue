<template>
    <request-form :requestID='requestID'> </request-form>
</template>

<script>
import RequestForm from '../requestform/RequestForm.vue'
export default {
  name:'RequestEdit',
  components: { RequestForm },
  props:{
    requestID:{
      required:true,
      type:String
    }
  }
}
</script>

<style>

</style>