<template> 
    <tr>
        <td class=" py-5  bg-white text-sm">
            <p class=" md:text-base text-gray-900 whitespace-no-wrap">
                {{itemsdata.id}}
            </p>
        </td>
		<td class=" py-5  bg-white text-sm">
            <p class=" md:text-base text-gray-900 whitespace-no-wrap">
                {{itemsdata.name}}
            </p>
        </td>
		<td class=" py-5  bg-white text-sm">
            <p class=" md:text-base text-gray-900 whitespace-no-wrap">
                {{itemsdata.defaultSupplierID}}
            </p>
         </td>    		  
         <td class="hidden md:table-cell text-center md:pl-1 md:py-5  bg-white text-sm">
			<router-link :to="{name:'item.edit', params: {itemID: itemsdata.id }} " class="text-gray-500  hover:text-blue-500  mx-2">
				<i class="font-bold transition duration-200 ease-in-out material-icons-outlined md:text-md">manage_accounts</i>
			</router-link>
            <a @click="deleteItem(itemsdata.id)" class="text-gray-500 cursor-pointer ml-2">
				<i class="transition duration-200 ease-in-out material-icons-round text-gray-500 hover:text-blue-500 md:text-md">person_remove</i>
            </a>
        </td>
        <td>    
   
        </td>
       
    </tr>
   
</template>

<script>
import useItems from '../../composables/Items';

export default {
    name:'Item',
    props:{
        itemsdata:{
            type:Object,
            require:true
        }
    },
    setup(){
        const {deleteItem} = useItems()
        return{
            deleteItem
        }
    }
    }
</script>

<style scoped>
    td{
        width: 8%;
    };
 
</style>