import  timesheetServiceAPI  from '../api/timesheetServiceAPI';
import { useRouter} from 'vue-router'
import { ref } from '@vue/reactivity';

export default function useMedicalOrganization(){
    const data= ref([])
    const medicalOrganizationsdata=ref([])
    const medicalOrganization= ref([])
    const router = useRouter()
    const EntireMedicalOrganizationList = ref([])
	
    const getAllData = async (params) => {
		let response = await timesheetServiceAPI.get('/references/getMedicalOrganizationsPage',{params:params})
        data.value = response.data;
        medicalOrganizationsdata.value=response.data.data;
    }
    const getAllMedicalOrganizationData = async () => {
		let response = await timesheetServiceAPI.get('/references/getMedicalOrganizations')
        data.value = response.data;
        medicalOrganizationsdata.value=response.data;
    }
	
    const getPageData = async(params)=>{
		let response = await timesheetServiceAPI.get('/references/getMedicalOrganizationsPage',{params:params})
		return response.data.data
    }
    
    //Получить все данные из разбитого на страницы Api с помощью рекурсии    
    const getEntireMedicalOrganizationList = async (pageNo=1)=>{
        let res = await getPageData({page:pageNo});
        if (res.length > 0) {
            EntireMedicalOrganizationList.value= EntireMedicalOrganizationList.value.concat(res)
          res.concat(await getEntireMedicalOrganizationList(pageNo+1));
         
        } else { 
            return 
        }
        return res
      }
	
	//получение данных об одном 
    const getMedicalOrganizationById = async (medicalOrganizationID) => {
        let response = await timesheetServiceAPI.get(`/references/getMedicalOrganizationById?medicalOrganizationID=${medicalOrganizationID}`) 
        medicalOrganization.value = response.data;		
    }
    
	//добавление 
    const storeMedicalOrganization = async (data) => {
		await timesheetServiceAPI.post(`/references/insertMedicalOrganization?${data}`,data)
		window.confirm('Медицинская организация создана.')
		await router.push({name: 'human-resources.index'})
          
    }

	//обновление информации 
    const updateMedicalOrganization = async (data) => {
		await timesheetServiceAPI.post(`/references/updateMedicalOrganization?${data}`, data['_value'])
        await router.push({name:'human-resources.index'})
    }
    
	//удаление 
    const deleteMedicalOrganization = async (medicalOrganizationID) => {
        let confirm=window.confirm('Вы действительно хотите удалить медицинскую организацию с id: '+medicalOrganizationID+'?')
        if(confirm) {    
            await timesheetServiceAPI.post(`/references/deleteMedicalOrganization?medicalOrganizationID=${medicalOrganizationID}`)
        }
   }
    
      return {
            data,
            medicalOrganization,
            medicalOrganizationsdata,
            EntireMedicalOrganizationList,
            getAllData,
			getAllMedicalOrganizationData,
            getMedicalOrganizationById,
            deleteMedicalOrganization,
            updateMedicalOrganization,
            storeMedicalOrganization,
            getEntireMedicalOrganizationList
      }
  
 }
