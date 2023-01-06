<template>
    <vacation-form :vacationID='vacationID'> </vacation-form>
</template>

<script>
import VacationForm from '../vacationform/VacationForm.vue'
export default {
  name:'VacationEdit',
  components: { VacationForm },
  props:{
    vacationID:{
      required:true,
      type:String
    }
  }
}
</script>

<style>

</style>