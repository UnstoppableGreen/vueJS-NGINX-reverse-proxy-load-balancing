import  API  from '../api/API';
import { useRouter} from 'vue-router' //для операций UPDATE и STORE
import { ref } from '@vue/reactivity';

export default function useOrder(){
    const data= ref([])
    const ordersdata=ref([])
    const allordersdata=ref([])
    const order= ref([])
    const orderInfo= ref([])
    const router = useRouter() //для операций UPDATE и STORE
    const EntireOrdersList = ref([])
	
    const getAllData = async (params) => {
		let response = await API.get('/orders/getOrders',{params:params})
        data.value = response.data;
        ordersdata.value=response.data.data;
		console.log(ordersdata.value);
    }
    const getAllOrders = async () => {
		let response = await API.get('/orders/getAllOrders')
        data.value = response.data;
        allordersdata.value=response.data;
    }
    
    const getPageData = async(params)=>{
		let response = await API.get('/orders/getOrders',{params:params})
		return response.data

    }
    
    //Получить все данные пользователя из разбитого на страницы Api с помощью рекурсии    
    
    const getEntireOrdersList = async (pageNo=1)=>{
        let res = await getPageData({page:pageNo});
        if (res.length > 0) {
          EntireOrdersList.value= EntireOrdersList.value.concat(res)
          res.concat(await getEntireOrdersList(pageNo+1));
         
        } else { 
            return 
        }
        return res
      }
	
	//получение данных об одном клиенте
    const getOrderById = async (orderID) => {
        let response = await API.get(`orders/getOrderById?orderID=${orderID}`) 
        order.value = response.data;
        console.log(order);		
    }

    //получение данных об одном клиенте
     const getOrderInfo = async (orderID) => {
            let response = await API.get(`orders/getOrderInfo?orderID=${orderID}`) 
            orderInfo.value = response.data;	
        }
    
	//добавление клиента
    const storeOrder = async (data) => {
          await API.post(`orders/newOrder?${data}`,data)
          await router.push({name: 'user.index'})
          
    }

	//обновление информации о клиенте
    const updateOrder = async (data) => {
		await API.post(`orders/updateOrder?${data}`, data['_value'])
        await router.push({name:'user.index'})
    }

	//удаление заказа
    const deleteOrder = async (id) => {
        let confirm=window.confirm('Отметить заказ ID: '+id+' статусом "удалён"?')
        if(confirm) {    
            await API.post(`orders/deleteOrder?orderID=${id}`)
        }
   }
    
      return {
            data,
            order,
            ordersdata,
            orderInfo,
            allordersdata,
            getAllOrders,
            getOrderInfo,
            EntireOrdersList,
            getAllData,
            getOrderById,
            deleteOrder,
            updateOrder,
            storeOrder,
            getEntireOrdersList
      }
  
 }
