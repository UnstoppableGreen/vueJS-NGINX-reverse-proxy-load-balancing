<template>
    <user-form :clientID='clientID'> </user-form>
</template>

<script>
import UserForm from '../userform/UserForm.vue'
export default {
  name:'UserEdit',
  components: { UserForm },
  props:{
    clientID:{
      required:true,
      type:String
    }
  }
}
</script>

<style>

</style>