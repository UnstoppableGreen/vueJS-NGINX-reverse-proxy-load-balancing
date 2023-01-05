import  timesheetServiceAPI  from '../api/timesheetServiceAPI';
import { useRouter} from 'vue-router'
import { ref } from '@vue/reactivity';

export default function useDivision(){
    const data= ref([])
    const divisionsdata=ref([])
    const division= ref([])
    const router = useRouter()
    const EntireDivisionList = ref([])
	
    const getAllData = async (params) => {
		let response = await timesheetServiceAPI.get('/divisions/getDivisionsPage',{params:params})
        data.value = response.data;
        divisionsdata.value=response.data.data;
    }
    const getAllDivisionData = async () => {
		let response = await timesheetServiceAPI.get('/divisions/getDivisions')
        data.value = response.data;
        divisionsdata.value=response.data;
    }
	
    const getPageData = async(params)=>{
		let response = await timesheetServiceAPI.get('/divisions/getDivisionsPage',{params:params})
		return response.data.data
    }
    
    //Получить все данные из разбитого на страницы Api с помощью рекурсии    
    const getEntireDivisionList = async (pageNo=1)=>{
        let res = await getPageData({page:pageNo});
        if (res.length > 0) {
          EntireDivisionList.value= EntireDivisionList.value.concat(res)
          res.concat(await getEntireDivisionList(pageNo+1));
         
        } else { 
            return 
        }
        return res
      }
	
	//получение данных об одном 
    const getDivisionById = async (divisionID) => {
        let response = await timesheetServiceAPI.get(`/divisions/getDivisionById?divisionID=${divisionID}`) 
        division.value = response.data;		
    }
    
	//добавление 
    const storeDivision = async (data) => {
          await timesheetServiceAPI.post(`/divisions/insertDivision?${data}`,data)
		window.confirm('Отдел создан.')
          await router.push({name: 'human-resources.index'})

          
    }

	//обновление информации 
    const updateDivision = async (data) => {
		await timesheetServiceAPI.post(`/divisions/updateDivision?${data}`, data['_value'])
        await router.push({name:'human-resources.index'})
    }
    
	//удаление 
    const deleteDivision = async (divisionID) => {
        let confirm=window.confirm('Вы действительно хотите удалить пользователя с id: '+divisionID+'?')
        if(confirm) {    
            await timesheetServiceAPI.post(`/divisions/deleteDivision?divisionID=${divisionID}`)
			await router.push({name:'human-resources.index'})
        }
		
   }
    
      return {
            data,
            division,
            divisionsdata,
            EntireDivisionList,
            getAllData,
			getAllDivisionData,
            getDivisionById,
            deleteDivision,
            updateDivision,
            storeDivision,
            getEntireDivisionList
      }
  
 }
