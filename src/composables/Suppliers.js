import  API  from '../api/API';
//import { useRouter} from 'vue-router' //для операций UPDATE и STORE
import { ref } from '@vue/reactivity';

export default function useSuppliers(){
    const suppliersdata= ref([])
	const data= ref([])
	
    const getAllSuppliers = async () => {
        let response = await API.get(`/suppliers/getAllSuppliers`)
		data.value = response.data;
        suppliersdata.value=response.data;
	return suppliersdata;
    }
    
    
      return {
        suppliersdata,
		getAllSuppliers,
      }
  
 }
