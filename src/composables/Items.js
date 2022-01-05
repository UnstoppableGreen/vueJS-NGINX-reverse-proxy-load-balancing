import  API  from '../api/API';
import { useRouter} from 'vue-router'
import { ref } from '@vue/reactivity';

export default function useItem(){
    const data= ref([])
    const itemsdata=ref([])
	const itemsalldata=ref([])
    const item= ref([])
	const atomics= ref([])
    const router = useRouter()
    const EntireItemsList = ref([])
	
    const getAllData = async (params) => {
		let response = await API.get('/items/getItems',{params:params})
        data.value = response.data;
        itemsdata.value=response.data.data;
    }
	
	const getAllItemsData = async () => {
		let response = await API.get('/items/getAllItems')
        data.value = response.data;
        itemsalldata.value=response.data;
    }
    
    const getPageData = async(params)=>{
		let response = await API.get('/items/getItems',{params:params})
		return response.data
        //let response = await API.get('/client/getClients',{params:params})
        //return response.data.data
    }
    
    //Получить все данные пользователя из разбитого на страницы Api с помощью рекурсии    
    
    const getEntireItemsList = async (pageNo=1)=>{
        let res = await getPageData({page:pageNo});
        if (res.length > 0) {
            EntireItemsList.value= EntireItemsList.value.concat(res)
          res.concat(await getEntireItemsList(pageNo+1));
         
        } else { 
            return 
        }
        return res
      }
	
	//получение данных об одном клиенте
    const getItemById = async (itemID) => {
        let response = await API.get(`/items/getItemById?itemID=${itemID}`) 
        item.value = response.data;		
    }
    
	//добавление клиента
    const storeItem = async (data) => {
          await API.put(`/items/newItem?${data}`,data)
          await router.push({name: 'items.index'})
          
    }

	//обновление информации о клиенте
    const updateItem = async (data) => {
		await API.post(`/items/updateItem?${data}`, data['_value'])
        await router.push({name:'items.index'})
    }
    
	//удаление клиента
    const deleteItem = async (itemID) => {
        let confirm=window.confirm('Вы действительно хотите удалить пользователя с id: '+itemID+'?')
        if(confirm) {    
            await API.post(`/items/deleteItem?itemID=${itemID}`)
        }
   }
    
      return {
            data,
            item,
			itemsalldata,
			atomics,
            itemsdata,
            EntireItemsList,
            getAllData,
            getItemById,
            deleteItem,
			getAllItemsData,
            updateItem,
            storeItem,
            getEntireItemsList
      }
  
 }
