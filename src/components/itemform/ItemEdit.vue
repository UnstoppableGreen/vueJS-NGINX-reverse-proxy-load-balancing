<template>
    <item-form :itemID='itemID'> </item-form>
</template>

<script>
import ItemForm from '../itemform/ItemForm.vue'
export default {
  name:'ItemEdit',
  components: { ItemForm },
  props:{
    itemID:{
      required:true,
      type:String
    }
  }
}
</script>

<style>

</style>