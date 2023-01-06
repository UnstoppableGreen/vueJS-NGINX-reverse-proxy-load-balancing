import  timesheetServiceAPI  from '../api/timesheetServiceAPI';
import { useRouter} from 'vue-router'
import { ref } from '@vue/reactivity';

export default function useVacations(){
    const data= ref([])
    const vacationsdata=ref([])
    const vacation= ref([])
    const router = useRouter()
    const EntireVacationList = ref([])
	
    const getAllData = async (params) => {
		let response = await timesheetServiceAPI.get('/vacations/getVacationsPage',{params:params})
        data.value = response.data;
        vacationsdata.value=response.data.data;
    }
    const getAllVacationData = async () => {
		let response = await timesheetServiceAPI.get('/vacations/getVacations')
        data.value = response.data;
        vacationsdata.value=response.data;
    }
	
    const getPageData = async(params)=>{
		let response = await timesheetServiceAPI.get('/vacations/getVacationsPage',{params:params})
		return response.data.data
    }
    
    //Получить все данные из разбитого на страницы Api с помощью рекурсии    
    const getEntireVacationList = async (pageNo=1)=>{
        let res = await getPageData({page:pageNo});
        if (res.length > 0) {
            EntireVacationList.value= EntireVacationList.value.concat(res)
          res.concat(await getEntireVacationList(pageNo+1));
         
        } else { 
            return 
        }
        return res
      }
	
	//получение данных об одном 
    const getVacationById = async (vacationID) => {
        let response = await timesheetServiceAPI.get(`/vacations/getVacationById?vacationID=${vacationID}`) 
        vacation.value = response.data;		
    }
    
	//добавление POST
    const storeVacation = async (data) => {
		await timesheetServiceAPI.post(`/vacations/insertVacation?${data}`,data)
		window.confirm('Запись успешно создана.')
		await router.push({name: 'human-resources.index'})
          
    }

	//обновление информации 
    const updateVacation = async (data) => {
		await timesheetServiceAPI.post(`/vacations/updateVacation?${data}`, data['_value'])
        await router.push({name:'human-resources.index'})
    }
    
	//удаление 
    const deleteVacation = async (vacationID) => {
        let confirm=window.confirm('Вы действительно хотите удалить запись с id: '+vacationID+'?')
        if(confirm) {    
            await timesheetServiceAPI.post(`/vacations/deleteVacation?vacationID=${vacationID}`)
        }
   }
    
      return {
            data,
            vacation,
            vacationsdata,
            EntireVacationList,
            getAllData,
			getAllVacationData,
            getVacationById,
            deleteVacation,
            updateVacation,
            storeVacation,
            getEntireVacationList
      }
  
 }
