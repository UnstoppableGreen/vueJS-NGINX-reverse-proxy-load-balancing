<template>
    <sick-leave-form :sickLeaveID='sickLeaveID'> </sick-leave-form>
</template>

<script>
import SickLeaveForm from '../sickleaveform/SickLeaveForm.vue'
export default {
  name:'SickLeaveEdit',
  components: { SickLeaveForm },
  props:{
    sickLeaveID:{
      required:true,
      type:String
    }
  }
}
</script>

<style>

</style>