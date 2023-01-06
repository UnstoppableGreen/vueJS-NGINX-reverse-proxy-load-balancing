import  timesheetServiceAPI  from '../api/timesheetServiceAPI';
import { useRouter} from 'vue-router'
import { ref } from '@vue/reactivity';

export default function useOperatingModes(){
    const data= ref([])
    const operatingModesdata=ref([])
    const operatingMode= ref([])
    const router = useRouter()
    const EntireOperatingModeList = ref([])
	
    const getAllData = async (params) => {
		let response = await timesheetServiceAPI.get('/references/getOperatingModesPage',{params:params})
        data.value = response.data;
        operatingModesdata.value=response.data.data;
    }
    const getAllOperatingModeData = async () => {
		let response = await timesheetServiceAPI.get('/references/getOperatingMode')
        data.value = response.data;
        operatingModesdata.value=response.data;
    }
	
    const getPageData = async(params)=>{
		let response = await timesheetServiceAPI.get('/references/getOperatingModesPage',{params:params})
		return response.data.data
    }
    
    //Получить все данные из разбитого на страницы Api с помощью рекурсии    
    const getEntireOperatingModeList = async (pageNo=1)=>{
        let res = await getPageData({page:pageNo});
        if (res.length > 0) {
          EntireOperatingModeList.value= EntireOperatingModeList.value.concat(res)
          res.concat(await getEntireOperatingModeList(pageNo+1));
         
        } else { 
            return 
        }
        return res
      }
	
	//получение данных об одном 
    const getOperatingModeById = async (operatingModeID) => {
        let response = await timesheetServiceAPI.get(`/references/getOperatingModeById?operatingModeID=${operatingModeID}`) 
        operatingMode.value = response.data;		
    }
    
	//добавление 
    const storeOperatingMode = async (data) => {
          await timesheetServiceAPI.post(`/references/insertOperatingMode?${data}`,data)
		window.confirm('Отдел создан.')
          await router.push({name: 'human-resources.index'})

          
    }

	//обновление информации 
    const updateOperatingMode = async (data) => {
		await timesheetServiceAPI.post(`/references/updateOperatingMode?${data}`, data['_value'])
        await router.push({name:'human-resources.index'})
    }
    
	//удаление 
    const deleteOperatingMode = async (operatingModeID) => {
        let confirm=window.confirm('Вы действительно хотите удалить пользователя с id: '+operatingModeID+'?')
        if(confirm) {    
            await timesheetServiceAPI.post(`/references/deleteOperatingMode?operatingModeID=${operatingModeID}`)
			await router.push({name:'human-resources.index'})
        }
		
   }
    
      return {
            data,
            operatingMode,
            operatingModesdata,
            EntireOperatingModeList,
            getAllData,
			getAllOperatingModeData,
            getOperatingModeById,
            deleteOperatingMode,
            updateOperatingMode,
            storeOperatingMode,
            getEntireOperatingModeList
      }
  
 }
