<template> 	
	<tr>	
		<td class=" py-5  bg-white text-sm">
            <p class=" md:text-base text-gray-900 whitespace-no-wrap">
                {{requestsdata.id}}
            </p>
        </td>
		<td class=" py-5  bg-white text-sm">
            <p class=" md:text-base text-gray-900 whitespace-no-wrap">
                {{requestsdata.orderID}}
            </p>
        </td>
		<td class=" py-5  bg-white text-sm">
            <p class=" md:text-base text-gray-900 whitespace-no-wrap">
                {{requestsdata.itemID}}
            </p>
        </td>
        <td class=" py-5  bg-white text-sm">
            <p class=" md:text-base text-gray-900 whitespace-no-wrap">
                {{requestsdata.qty}}
            </p>
        </td>
        <td class=" py-5  bg-white text-sm">
            <p class=" md:text-base text-gray-900 whitespace-no-wrap">
                {{requestsdata.statusID}}
            </p>
        </td>
		<td class=" py-5  bg-white text-sm">
            <p class=" md:text-base text-gray-900 whitespace-no-wrap">
                {{requestsdata.actualSupplierID}}
            </p>
        </td>
		<td class=" py-5  bg-white text-sm">
            <p class=" md:text-base text-gray-900 whitespace-no-wrap">
                {{requestsdata.creationDate}}
            </p>
          </td>
		<td class=" py-5  bg-white text-sm">
            <p class=" md:text-base text-gray-900 whitespace-no-wrap">
                {{requestsdata.estimateDelivryDate}}
            </p>
        </td>
		<td class=" py-5  bg-white text-sm">
            <p class=" md:text-base text-gray-900 whitespace-no-wrap">
                {{requestsdata.deliveryDate}}
            </p>
        </td> 		
          <td class="hidden md:table-cell text-center md:pl-1 md:py-5  bg-white text-sm">
			<!--<router-link :to="{name:'request.edit', params: {requestID: requestsdata.id }} " class="text-gray-500  hover:text-blue-500  mx-2">
				<i class="font-bold transition duration-200 ease-in-out material-icons-outlined md:text-md">edit</i>
			</router-link> -->
            <a @click="deleteRequest(requestsdata.id)" class="text-gray-500 cursor-pointer ml-2">
				<i class="transition duration-200 ease-in-out material-icons-round text-gray-500 hover:text-blue-500 md:text-md">delete</i>
            </a>
        </td> 
        <td>    
   
        </td>
       
    </tr>
   
</template>

<script>
import useRequests from '../../composables/Requests'

export default {
    name:'Request',
    props:{
        requestsdata:{
            type:Object,
            require:true
        }
    },
    setup(){
        const {deleteRequest} = useRequests()
        return{
            deleteRequest
        }
    }
    }
</script>

<style scoped>
    td{
        width: 8%;
    };
 
</style>