import  timesheetServiceAPI  from '../api/timesheetServiceAPI';
import { useRouter} from 'vue-router'
import { ref } from '@vue/reactivity';

export default function useBusinessTrips(){
    const data= ref([])
    const businessTripsdata=ref([])
    const businessTrip= ref([])
    const router = useRouter()
    const EntireBusinessTripList = ref([])
	
    const getAllData = async (params) => {
		let response = await timesheetServiceAPI.get('/businesstrips/getBusinessTripPage',{params:params})
        data.value = response.data;
        businessTripsdata.value=response.data.data;
    }
    const getAllBusinessTripData = async () => {
		let response = await timesheetServiceAPI.get('/businesstrips/getBusinessTrips')
        data.value = response.data;
        businessTripsdata.value=response.data;
    }
	
    const getPageData = async(params)=>{
		let response = await timesheetServiceAPI.get('/businesstrips/getBusinessTripPage',{params:params})
		return response.data.data
    }
    
    //Получить все данные из разбитого на страницы Api с помощью рекурсии    
    const getEntireBusinessTripList = async (pageNo=1)=>{
        let res = await getPageData({page:pageNo});
        if (res.length > 0) {
            EntireBusinessTripList.value= EntireBusinessTripList.value.concat(res)
          res.concat(await getEntireBusinessTripList(pageNo+1));
         
        } else { 
            return 
        }
        return res
      }
	
	//получение данных об одном 
    const getBusinessTripById = async (businessTripID) => {
        let response = await timesheetServiceAPI.get(`/businesstrips/getBusinessTripById?businessTripID=${businessTripID}`) 
        businessTrip.value = response.data;		
    }
    
	//добавление 
    const storeBusinessTrip = async (data) => {
		await timesheetServiceAPI.post(`/businesstrips/insertBusinessTrip?${data}`,data)
		window.confirm('Командировка успешно создана.')
		//await router.push({name: 'human-resources.index'})
          
    }

	//обновление информации 
    const updateBusinessTrip = async (data) => {
		await timesheetServiceAPI.post(`/businesstrips/updateBusinessTrip?${data}`, data['_value'])
		await router.push({name:'human-resources.index'})
    }
    
	//удаление 
    const deleteBusinessTrip = async (businessTripID) => {
        let confirm=window.confirm('Вы действительно хотите удалить работника с id: '+businessTripID+'?')
        if(confirm) {    
            await timesheetServiceAPI.post(`/businesstrips/deleteBusinessTrip?businessTripID=${businessTripID}`)
        }
   }
    
      return {
            data,
            businessTrip,
            businessTripsdata,
            EntireBusinessTripList,
            getAllData,
			getAllBusinessTripData,
            getBusinessTripById,
            deleteBusinessTrip,
            updateBusinessTrip,
            storeBusinessTrip,
            getEntireBusinessTripList
      }
  
 }
