<template> 
    <tr>
        <td class=" py-5  bg-white text-sm">
            <p class=" md:text-base text-gray-900 whitespace-no-wrap">
                {{carriers.id}}
            </p>
        </td>
        <td class=" py-5  bg-white text-sm">
            <p class=" md:text-base text-gray-900 whitespace-no-wrap">
                {{carriers.name}}
            </p>
        </td>
		<td class=" py-5  bg-white text-sm">
            <p class=" md:text-base text-gray-900 whitespace-no-wrap">
                {{carriers.contacts}}
            </p>
        </td>
		<td class=" py-5  bg-white text-sm">
            <p class=" md:text-base text-gray-900 whitespace-no-wrap">
                {{carriers.address}}
            </p>
         </td>    		  
         <td class="hidden md:table-cell text-center md:pl-1 md:py-5  bg-white text-sm">
			<router-link :to="{name:'carrier.edit', params: {carrierID: carriers.id }} " class="text-gray-500  hover:text-blue-500  mx-2">
				<i class="font-bold transition duration-200 ease-in-out material-icons-outlined md:text-md">edit</i>
			</router-link>
            <a @click="deleteCarrier(carriers.id)" class="text-gray-500 cursor-pointer ml-2">
				<i class="transition duration-200 ease-in-out material-icons-round text-gray-500 hover:text-blue-500 md:text-md">remove</i>
            </a>
        </td>        
    </tr>
   
</template>

<script>
import useCarriers from '../../composables/Carriers';

export default {
    name:'Carrier',
    props:{
        carriers:{
            type:Object,
            require:true
        }
    },
    setup(){
        const {deleteCarrier} = useCarriers()
        return{
            deleteCarrier
        }
    }
    }
</script>

<style scoped>
    td{
        width: 8%;
    };
 
</style>