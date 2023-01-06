import  timesheetServiceAPI  from '../api/timesheetServiceAPI';
//import { useRouter} from 'vue-router' //для операций UPDATE и STORE
import { ref } from '@vue/reactivity';

export default function useTypesOfDisability(){
    const typesOfDisability= ref([])
	const data= ref([])
	
    const getTypesOfDisability = async () => {
        let response = await timesheetServiceAPI.get(`/references/getTypeOfDisability`)
		data.value = response.data;
        typesOfDisability.value=response.data;
	return typesOfDisability;
    }
        
      return {
        typesOfDisability,
        getTypesOfDisability,
      }
  
 }
