import  API  from '../api/API';
import { useRouter} from 'vue-router'
import { ref } from '@vue/reactivity';

export default function useUser(){
    const data= ref([])
    const usersdata=ref([])
    const user= ref([])
    const router = useRouter()
    const EntireUserList = ref([])
	
    const getAllData = async (params) => {
		let response = await API.get('/clients/getClientsPage',{params:params})
        data.value = response.data;
        usersdata.value=response.data.data;
		
		/*let response = await API.get('/client/getClients')
		usersdata.value=response.data;*/    
		
		//data.value = response.data;
		//usersdata.value=response.data.data;
		//console.log('Клиенты'+response.data );
		/*for(var property in response.data) {
			for(var prop in response.data[property]) 
			console.log(prop + "=" + response.data[property][prop]);
		}*/
    }
    const getAllClientData = async () => {
		let response = await API.get('/clients/getClients')
        data.value = response.data;
        usersdata.value=response.data;
		
		/*let response = await API.get('/client/getClients')
		usersdata.value=response.data;*/    
		
		//data.value = response.data;
		//usersdata.value=response.data.data;
		//console.log('Клиенты'+response.data );
		/*for(var property in response.data) {
			for(var prop in response.data[property]) 
			console.log(prop + "=" + response.data[property][prop]);
		}*/
    }
	
    const getPageData = async(params)=>{
		let response = await API.get('/clients/getClientsPage',{params:params})
		return response.data.data
        //let response = await API.get('/client/getClients',{params:params})
        //return response.data.data
    }
    
    //Получить все данные пользователя из разбитого на страницы Api с помощью рекурсии    
    
    const getEntireUserList = async (pageNo=1)=>{
        let res = await getPageData({page:pageNo});
        if (res.length > 0) {
          EntireUserList.value= EntireUserList.value.concat(res)
          res.concat(await getEntireUserList(pageNo+1));
         
        } else { 
            return 
        }
        return res
      }
	
	//получение данных об одном клиенте
    const getUser = async (clientID) => {
        let response = await API.get(`/clients/getClientById?clientID=${clientID}`) 
        user.value = response.data;		
    }
    
	//добавление клиента
    const storeUser = async (data) => {
          await API.post(`/clients/insertClient?${data}`,data)
          await router.push({name: 'user.index'})
          
    }

	//обновление информации о клиенте
    const updateUser = async (data) => {
		await API.post(`/clients/updateClient?${data}`, data['_value'])
        await router.push({name:'user.index'})
    }
    
	//удаление клиента
    const deleteUser = async (clientID) => {
        let confirm=window.confirm('Вы действительно хотите удалить пользователя с id: '+clientID+'?')
        if(confirm) {    
            await API.post(`/clients/deleteClient?clientID=${clientID}`)
        }
   }
    
      return {
            data,
            user,
            usersdata,
            EntireUserList,
            getAllData,
			getAllClientData,
            getUser,
            deleteUser,
            updateUser,
            storeUser,
            getEntireUserList
      }
  
 }
