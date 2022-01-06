import  API  from '../api/API';
//import { useRouter} from 'vue-router' //для операций UPDATE и STORE
import { ref } from '@vue/reactivity';

export default function useCarriers(){
    const carriers= ref([])
	const data= ref([])
	
    const getAllCarriers = async () => {
        let response = await API.get(`/ShipmentsAndDeliveries/getAllCarriers`)
		data.value = response.data;
        carriers.value=response.data;
	return carriers;
    }
    
    
      return {
        carriers,
		getAllCarriers,
      }
  
 }
