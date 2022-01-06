import  API  from '../api/API';
import { useRouter} from 'vue-router' //для операций UPDATE и STORE
import { ref } from '@vue/reactivity';

export default function useSuppliers(){
    const data= ref([])
    const suppliers= ref([])
    const supplier= ref([])
    const router = useRouter() //для операций UPDATE и STORE
    const EntireSuppliersList = ref([])
	
    const getAllSuppliers = async () => {
        let response = await API.get(`/suppliers/getAllSuppliers`)
		data.value = response.data;
        suppliers.value=response.data;
	return suppliers;
    }
    
    const getPageData = async(params)=>{
		let response = await API.get('/suppliers/getSuppliers',{params:params})
		return response.data

    }

    const getEntireSuppliersList = async (pageNo=1)=>{
        let res = await getPageData({page:pageNo});
        if (res.length > 0) {
            EntireSuppliersList.value= EntireSuppliersList.value.concat(res)
          res.concat(await getEntireSuppliersList(pageNo+1));
         
        } else { 
            return 
        }
        return res
      }

    const getSupplierById = async (supplierID) => {
        let response = await API.get(`/suppliers/getSupplierById?supplierID=${supplierID}`) 
        supplier.value = response.data;		
    }
    
	//добавление клиента
    const storeSupplier = async (data) => {
          await API.post(`/suppliers/createSupplier?${data}`,data)
          await router.push({name: 'suppliers.index'})
          
    }

	//обновление информации о клиенте
    const updateSupplier = async (data) => {
		await API.put(`/suppliers/updateSupplier?${data}`, data['_value'])
        await router.push({name:'suppliers.index'})
    }

	//удаление заказа
    const deleteSupplier = async (supplierID) => {
        let confirm=window.confirm('Отметить поставщика ID: '+supplierID+' статусом "удалён"?')
        if(confirm) {    
            await API.post(`/suppliers/deleteSupplier?supplierID=${supplierID}`)
        }
   }
      
      return {
        data,
        suppliers,
        supplier,
		getAllSuppliers,
        EntireSuppliersList,
        getEntireSuppliersList,
        getSupplierById,
        storeSupplier,
        updateSupplier,
        deleteSupplier,
      }
  
 }
