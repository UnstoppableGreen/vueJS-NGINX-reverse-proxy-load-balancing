<template>
    <medical-organization-form :medicalOrganizationID='medicalOrganizationID'> </medical-organization-form>
</template>

<script>
import MedicalOrganizationForm from '../medicalorganizationform/MedicalOrganizationForm.vue'
export default {
  name:'MedicalOrganizationEdit',
  components: { MedicalOrganizationForm },
  props:{
    medicalOrganizationID:{
      required:true,
      type:String
    }
  }
}
</script>

<style>

</style>