import  API  from '../api/API';
import { useRouter} from 'vue-router' //для операций UPDATE и STORE
import { ref } from '@vue/reactivity';

export default function useShipments(){
    const data= ref([])
    const shipmentsdata=ref([])
    const shipment= ref([])
    const shipmentInfo= ref([])
    const router = useRouter() //для операций UPDATE и STORE
    const EntireShipmentsList = ref([])
	
    const getAllData = async (params) => {
		let response = await API.get('/ShipmentsAndDeliveries/getShipments',{params:params})
        data.value = response.data;
        shipmentsdata.value=response.data.data;
    }
    
    const getPageData = async(params)=>{
		let response = await API.get('/ShipmentsAndDeliveries/getShipments',{params:params})
		return response.data

    }
    
    //Получить все данные пользователя из разбитого на страницы Api с помощью рекурсии    
    
    const getEntireShipmentsList = async (pageNo=1)=>{
        let res = await getPageData({page:pageNo});
        if (res.length > 0) {
         EntireShipmentsList.value= EntireShipmentsList.value.concat(res)
          res.concat(await getEntireShipmentsList(pageNo+1));
         
        } else { 
            return 
        }
        return res
      }
	
	//получение данных об одном клиенте
    const getShipmentById = async (shipmentID) => {
        let response = await API.get(`/ShipmentsAndDeliveries/getShipmentById?shipmentID=${shipmentID}`) 
        shipment.value = response.data;		
    }
    const getShipmentDetails = async (shipmentID) => {
        let response = await API.get(`/ShipmentsAndDeliveries/getShipmentDetails?shipmentID=${shipmentID}`) 
        shipmentInfo.value = response.data;	
        console.log(shipmentInfo.value);
    }
    
	//добавление клиента
    const storeShipment = async (data) => {
          await API.post(`/ShipmentsAndDeliveries/newShipment?${data}`,data)
          await router.push({name: 'shipments.index'})
          
    }

	//обновление информации о клиенте
    const updateShipment = async (data) => {
		await API.put(`/ShipmentsAndDeliveries/updateShipment?${data}`, data['_value'])
        await router.push({name:'shipments.index'})
    }

	//удаление заказа
    const deleteShipment = async (id) => {
        let confirm=window.confirm('Отметить запрос ID: '+id+' статусом "удалён"?')
        if(confirm) {    
            await API.post(`/ShipmentsAndDeliveries/deleteShipment?shipmentID=${id}`)
        }
   }
    
      return {
            data,
            shipment,
            shipmentInfo,
            shipmentsdata,
            EntireShipmentsList,
            getAllData,
            getShipmentById,
            deleteShipment,
            updateShipment,
            storeShipment,
            getEntireShipmentsList,
            getShipmentDetails,
      }
  
 }
