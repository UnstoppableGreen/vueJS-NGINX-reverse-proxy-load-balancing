<template>
    <profession-form :professionID='professionID'> </profession-form>
</template>

<script>
import ProfessionForm from '../professionform/ProfessionForm.vue'
export default {
  name:'ProfessionEdit',
  components: { ProfessionForm },
  props:{
    professionID:{
      required:true,
      type:String
    }
  }
}
</script>

<style>

</style>