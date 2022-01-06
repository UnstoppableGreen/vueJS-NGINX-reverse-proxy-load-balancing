import  API  from '../api/API';
import { useRouter} from 'vue-router' //для операций UPDATE и STORE
import { ref } from '@vue/reactivity';

export default function useCarriers(){
    const data= ref([])
    const carriers= ref([])
    const carrier= ref([])
    const router = useRouter() //для операций UPDATE и STORE
    const EntireCarriersList = ref([])

    const getAllCarriers = async () => {
        let response = await API.get(`/ShipmentsAndDeliveries/getAllCarriers`)
		data.value = response.data;
        carriers.value=response.data;
	return carriers;
    }

    const getPageData = async(params)=>{
		let response = await API.get('/ShipmentsAndDeliveries/getCarriers',{params:params})
		return response.data

    }

    const getEntireCarriersList = async (pageNo=1)=>{
        let res = await getPageData({page:pageNo});
        if (res.length > 0) {
            EntireCarriersList.value= EntireCarriersList.value.concat(res)
          res.concat(await getEntireCarriersList(pageNo+1));
         
        } else { 
            return 
        }
        return res
      }

    const getCarrierById = async (carrierID) => {
        let response = await API.get(`/ShipmentsAndDeliveries/getCarrierById?carrierID=${carrierID}`) 
        carrier.value = response.data;		
    }

    const storeCarrier = async (data) => {
          await API.post(`/ShipmentsAndDeliveries/createSupplier?${data}`,data)
          await router.push({name: 'carriers.index'})
          
    }

    const updateCarrier = async (data) => {
		await API.put(`/ShipmentsAndDeliveries/updateCarrier?${data}`, data['_value'])
        await router.push({name:'carriers.index'})
    }

    const deleteCarrier = async (carrierID) => {
        let confirm=window.confirm('Отметить траспортную компанию с ID: '+carrierID+' статусом "удалён"?')
        if(confirm) {    
            await API.post(`/ShipmentsAndDeliveries/deleteCarrier?carrierID=${carrierID}`)
        }
   }
    
      return {
        data,
        carriers,
		getAllCarriers,
        EntireCarriersList,
        getEntireCarriersList,
        getCarrierById,
        storeCarrier,
        updateCarrier,
        deleteCarrier,
      }
  
 }
