import  API  from '../api/API';
//import { useRouter} from 'vue-router' //для операций UPDATE и STORE
import { ref } from '@vue/reactivity';

export default function useStatuses(){
    const statuses= ref([])
	const data= ref([])
	
    const getStatuses = async () => {
        let response = await API.get(`/status/getStatuses`)
		data.value = response.data;
        statuses.value=response.data;
	console.log('getStatuses response: '+JSON.stringify( statuses.value));
	return statuses;
    }
    
    
      return {
            statuses,
			getStatuses,
      }
  
 }
