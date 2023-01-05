<template>
    <timesheet-form :timesheetID='timesheetID'> </timesheet-form>
</template>

<script>
import TimesheetForm from '../timesheetform/TimesheetForm.vue'
export default {
  name:'TimesheetEdit',
  components: { TimesheetForm },
  props:{
    timesheetID:{
      required:true,
      type:String
    }
  }
}
</script>

<style>

</style>