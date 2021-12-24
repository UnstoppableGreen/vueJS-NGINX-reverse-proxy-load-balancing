import  User  from '../api/UserApi';
import { useRouter} from 'vue-router'
import { ref } from '@vue/reactivity';

export default function useUser(){
    const data= ref([])
    const usersdata=ref([])
    const user= ref([])
    const router = useRouter()
    const EntireUserList = ref([])
	
 //   const getAllData = async (params) => {
  //      let response = await User.get('users',{params:params})
  //      data.value = response.data;
  //      usersdata.value=response.data.data
  //  }
	
    const getAllData = async () => {
        let response = await User.get('/client/getClients')
		
        //data.value = response.data;
		// usersdata.value=response.data.data;
		usersdata.value=response.data;
		console.log('Клиенты'+response.data );

    }
    
    const getPageData = async(params)=>{
        let response = await User.get('users',{params:params})
        return response.data.data
    }
    
    //Get all user's data from Paginated Api with recursion     
    
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

    const getUser = async (clientID) => {
        let response = await User.get(`client/getClientById?clientID=${clientID}`) //ПРОВЕРИТЬ
        user.value = response.data.data;
    }
    
    const storeUser = async (data) => {
          await User.post(`client/insertClient?${data}`,data)
          await router.push({name: 'user.index'})
          
    }

    const updateUser = async (data) => {
          //await User.put(`users/${clientID}` , user.value)
		await User.post(`client/updateClient?${data}`,data)
          await router.push({name:'user.index'})
        }
    
    const deleteUser = async (clientID) => {
        let confirm=window.confirm('Уверены в удалении пользователя с id: '+clientID+'?')
        if(confirm) {    
            await User.post(`client/deleteClient?clientID=${clientID}`)
        }
   }
    
      return {
            data,
            user,
            usersdata,
            EntireUserList,
            getAllData,
            getUser,
            deleteUser,
            updateUser,
            storeUser,
            getEntireUserList
      }
  
 }
