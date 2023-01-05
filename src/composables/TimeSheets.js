import  timesheetServiceAPI  from '../api/timesheetServiceAPI';
import { useRouter} from 'vue-router'
import { ref } from '@vue/reactivity';

export default function useTimeSheets(){
    const data= ref([])
    const timesheetsdata=ref([])
    const timesheet= ref([])
    const router = useRouter()
    const EntireTimeSheetList = ref([])
	
    const getAllData = async (params) => {
		let response = await timesheetServiceAPI.get('/timesheets/getTimesheetsByPage',{params:params})
        data.value = response.data;
        timesheetsdata.value=response.data.data;
    }
    const getAllTimeSheetData = async () => {
		let response = await timesheetServiceAPI.get('/timesheets/getTimesheets')
        data.value = response.data;
        timesheetsdata.value=response.data;
    }
	
    const getPageData = async(params)=>{
		let response = await timesheetServiceAPI.get('/timesheets/getTimesheetsByPage',{params:params})
		return response.data.data
    }
    
    //Получить все данные из разбитого на страницы Api с помощью рекурсии    
    const getEntireTimeSheetList = async (pageNo=1)=>{
        let res = await getPageData({page:pageNo});
        if (res.length > 0) {
            EntireTimeSheetList.value= EntireTimeSheetList.value.concat(res)
          res.concat(await getEntireTimeSheetList(pageNo+1));
         
        } else { 
            return 
        }
        return res
      }
	
	//получение данных об одном 
    const getTimeSheetById = async (timesheetID) => {
        let response = await timesheetServiceAPI.get(`/timesheets/getTimesheetById?timesheetID=${timesheetID}`) 
        timesheet.value = response.data;		
    }
    
	//добавление 
    const storeTimeSheet = async (data) => {
          await timesheetServiceAPI.post(`/timesheets/insertTimesheet?${data}`,data)
          await router.push({name: 'human-resources.index'})
          
    }

	//обновление информации 
    const updateTimeSheet = async (data) => {
		await timesheetServiceAPI.post(`/timesheets/updateTimesheet?${data}`, data['_value'])
        await router.push({name:'human-resources.index'})
    }
    
	//удаление 
    const deleteTimeSheet = async (timesheetID) => {
        let confirm=window.confirm('Вы действительно хотите удалить запись с id: '+timesheetID+'?')
        if(confirm) {    
            await timesheetServiceAPI.post(`/timesheets/deleteTimesheet?timesheetID=${timesheetID}`)
        }
   }
    
      return {
            data,
            timesheet,
            timesheetsdata,
            EntireTimeSheetList,
            getAllData,
			getAllTimeSheetData,
            getTimeSheetById,
            deleteTimeSheet,
            updateTimeSheet,
            storeTimeSheet,
            getEntireTimeSheetList
      }
  
 }
