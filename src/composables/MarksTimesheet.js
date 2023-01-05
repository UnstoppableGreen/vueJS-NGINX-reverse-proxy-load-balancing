import  timesheetServiceAPI  from '../api/timesheetServiceAPI';
//import { useRouter} from 'vue-router' //для операций UPDATE и STORE
import { ref } from '@vue/reactivity';

export default function useMarks(){
    const marksdata= ref([])
	const data= ref([])
	
    const getMarksTimesheet = async () => {
        let response = await timesheetServiceAPI.get(`/references/getMarksTimesheet`)
		data.value = response.data;
        marksdata.value=response.data;
	return marksdata;
    }
    
    
      return {
            marksdata,
			getMarksTimesheet,
      }
  
 }
