<template>
    <worker-form :workerID='workerID'> </worker-form>
</template>

<script>
import WorkerForm from '../workerform/WorkerForm.vue'
export default {
  name:'WorkerEdit',
  components: { WorkerForm },
  props:{
    workerID:{
      required:true,
      type:String
    }
  }
}
</script>

<style>

</style>