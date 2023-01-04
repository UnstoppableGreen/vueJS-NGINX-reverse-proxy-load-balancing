<template>
    <division-form :divisionID='divisionID'> </division-form>
</template>

<script>
import DivisionForm from '../divisionform/DivisionForm.vue'
export default {
  name:'DivisionEdit',
  components: { DivisionForm },
  props:{
    divisionID:{
      required:true,
      type:String
    }
  }
}
</script>

<style>

</style>