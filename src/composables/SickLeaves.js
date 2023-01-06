import  timesheetServiceAPI  from '../api/timesheetServiceAPI';
import { useRouter} from 'vue-router'
import { ref } from '@vue/reactivity';

export default function useSickLeaves(){
    const data= ref([])
    const sickLeavesdata=ref([])
    const sickLeave= ref([])
    const router = useRouter()
    const EntireSickLeaveList = ref([])
	
    const getAllData = async (params) => {
		let response = await timesheetServiceAPI.get('/sickleaves/getSickLeavesByPage',{params:params})
        data.value = response.data;
        sickLeavesdata.value=response.data.data;
    }
    const getAllSickLeaveData = async () => {
		let response = await timesheetServiceAPI.get('/sickleaves/getSickLeaves')
        data.value = response.data;
        sickLeavesdata.value=response.data;
    }
	
    const getPageData = async(params)=>{
		let response = await timesheetServiceAPI.get('/sickleaves/getSickLeavesByPage',{params:params})
		return response.data.data
    }
    
    //Получить все данные из разбитого на страницы Api с помощью рекурсии    
    const getEntireSickLeaveList = async (pageNo=1)=>{
        let res = await getPageData({page:pageNo});
        if (res.length > 0) {
            EntireSickLeaveList.value= EntireSickLeaveList.value.concat(res)
          res.concat(await getEntireSickLeaveList(pageNo+1));
         
        } else { 
            return 
        }
        return res
      }
	
	//получение данных об одном 
    const getSickLeaveById = async (sickLeaveID) => {
        let response = await timesheetServiceAPI.get(`/sickleaves/getSickLeaveById?sickLeaveID=${sickLeaveID}`) 
        sickLeave.value = response.data;		
    }
    
	//добавление POST
    const storeSickLeave = async (data) => {
		await timesheetServiceAPI.post(`/sickleaves/insertSickLeave?${data}`,data)
		window.confirm('Запись успешно создана.')
		//await router.push({name: 'human-resources.index'})
          
    }

	//обновление информации 
    const updateSickLeave = async (data) => {
		await timesheetServiceAPI.post(`/sickleaves/updateSickLeave?${data}`, data['_value'])
        await router.push({name:'human-resources.index'})
    }
    
	//удаление 
    const deleteSickLeave = async (sickLeaveID) => {
        let confirm=window.confirm('Вы действительно хотите удалить запись с id: '+sickLeaveID+'?')
        if(confirm) {    
            await timesheetServiceAPI.post(`/sickleaves/deleteSickLeave?sickLeaveID=${sickLeaveID}`)
        }
   }
    
      return {
            data,
            sickLeave,
            sickLeavesdata,
            EntireSickLeaveList,
            getAllData,
			getAllSickLeaveData,
            getSickLeaveById,
            deleteSickLeave,
            updateSickLeave,
            storeSickLeave,
            getEntireSickLeaveList
      }
  
 }
