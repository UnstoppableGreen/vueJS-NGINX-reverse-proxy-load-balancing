import  API  from '../api/API';
import { useRouter} from 'vue-router' //для операций UPDATE и STORE
import { ref } from '@vue/reactivity';

export default function useRequests(){
    const data= ref([])
    const requestsdata=ref([])
    const request= ref([])
    const router = useRouter() //для операций UPDATE и STORE
    const EntireRequestsList = ref([])
	
    const getAllData = async (params) => {
		let response = await API.get('/ShipmentsAndDeliveries/getRequests',{params:params})
        data.value = response.data;
        requestsdata.value=response.data.data;
    }
    
    const getPageData = async(params)=>{
		let response = await API.get('/ShipmentsAndDeliveries/getRequests',{params:params})
		return response.data

    }
    
    //Получить все данные пользователя из разбитого на страницы Api с помощью рекурсии    
    
    const getEntireRequestsList = async (pageNo=1)=>{
        let res = await getPageData({page:pageNo});
        if (res.length > 0) {
         EntireRequestsList.value= EntireRequestsList.value.concat(res)
          res.concat(await getEntireRequestsList(pageNo+1));
         
        } else { 
            return 
        }
        return res
      }
	
	//получение данных об одном клиенте
    const getRequestById = async (requestID) => {
        let response = await API.get(`/ShipmentsAndDeliveries/getRequestById?requestID=${requestID}`) 
        request.value = response.data;		
    }
    
	//добавление клиента
    const storeRequest = async (data) => {
          await API.post(`/ShipmentsAndDeliveries/newShipment?${data}`,data)
          await router.push({name: 'requests.index'})
          
    }

	//обновление информации о клиенте
    const updateRequest = async (data) => {
		await API.post(`/ShipmentsAndDeliveries/updateShipment?${data}`, data['_value'])
        await router.push({name:'requests.index'})
    }

	//удаление заказа
    const deleteRequest = async (id) => {
        let confirm=window.confirm('Отметить запрос ID: '+id+' статусом "удалён"?')
        if(confirm) {    
            await API.post(`/ShipmentsAndDeliveries/deleteRequest?requestID=${id}`)
        }
   }
    
      return {
            data,
            request,
            requestsdata,
            EntireRequestsList,
            getAllData,
            getRequestById,
            deleteRequest,
            updateRequest,
            storeRequest,
            getEntireRequestsList
      }
  
 }
