import  timesheetServiceAPI  from '../api/timesheetServiceAPI';
import { useRouter} from 'vue-router' //для операций UPDATE и STORE
import { ref } from '@vue/reactivity';

export default function useProfessions(){
    const data= ref([])
    const professionsdata= ref([])
    const profession= ref([])
    const router = useRouter() //для операций UPDATE и STORE
    const EntireProfessions = ref([])
	
    /*const getAllProfessions = async () => {
        let response = await timesheetServiceAPI.get(`/references/getProfessions`)
		data.value = response.data;
        professionsdata.value=response.data;
	return professionsdata;
    }*/
	const getAllProfessions = async (params) => {
		let response = await timesheetServiceAPI.get('/references/getProfessionsPage',{params:params})
        data.value = response.data;
        professionsdata.value=response.data.data;
    }
    
    const getPageData = async(params)=>{
		let response = await timesheetServiceAPI.get('/references/getProfessionsPage',{params:params})
		return response.data

    }

    const getEntireProfessionsList = async (pageNo=1)=>{
        let res = await getPageData({page:pageNo});
        if (res.length > 0) {
            EntireProfessions.value= EntireProfessions.value.concat(res)
          res.concat(await getEntireProfessionsList(pageNo+1));
         
        } else { 
            return 
        }
        return res
      }

    const getProfessionById = async (professionID) => {
        let response = await timesheetServiceAPI.get(`/references/getProfessionById?professionID=${professionID}`) 
        profession.value = response.data;		
    }
    
	//добавление клиента
    const storeProfession = async (data) => {
		await timesheetServiceAPI.post(`/references/insertProfession?${data}`,data)
		window.confirm('Должность успешно создана.')
          //await router.push({name: 'professions.index'})
          
    }

	//обновление информации о клиенте
    const updateProfession = async (data) => {
		await timesheetServiceAPI.post(`/references/updateProfession?${data}`, data['_value'])
        await router.push({name:'human-resources.index'})		
    }

	//удаление заказа
    const deleteProfession = async (professionID) => {
        let confirm=window.confirm('Отметить должность ID: '+professionID+' статусом "удалён"?')
        if(confirm) {    
            await timesheetServiceAPI.post(`/references/deleteProfession?professionID=${professionID}`)
        }
   }
      
      return {
        data,
        professionsdata,
        profession,
		getAllProfessions,
        EntireProfessions,
        getEntireProfessionsList,
        getProfessionById,
        storeProfession,
        updateProfession,
        deleteProfession,
      }
  
 }
