import  timesheetServiceAPI  from '../api/timesheetServiceAPI';
import { useRouter} from 'vue-router'
import { ref } from '@vue/reactivity';

export default function useWorkers(){
    const data= ref([])
    const workersdata=ref([])
    const worker= ref([])
    const router = useRouter()
    const EntireWorkerList = ref([])
	
    const getAllData = async (params) => {
		let response = await timesheetServiceAPI.get('/workers/getWorkersPage',{params:params})
        data.value = response.data;
        workersdata.value=response.data.data;
    }
    const getAllWorkerData = async () => {
		let response = await timesheetServiceAPI.get('/workers/getWorkers')
        data.value = response.data;
        workersdata.value=response.data;
    }
	
    const getPageData = async(params)=>{
		let response = await timesheetServiceAPI.get('/workers/getWorkersPage',{params:params})
		return response.data.data
    }
    
    //Получить все данные из разбитого на страницы Api с помощью рекурсии    
    const getEntireWorkerList = async (pageNo=1)=>{
        let res = await getPageData({page:pageNo});
        if (res.length > 0) {
            EntireWorkerList.value= EntireWorkerList.value.concat(res)
          res.concat(await getEntireWorkerList(pageNo+1));
         
        } else { 
            return 
        }
        return res
      }
	
	//получение данных об одном 
    const getWorkerById = async (workerID) => {
        let response = await timesheetServiceAPI.get(`/workers/getWorkerById?workerID=${workerID}`) 
        worker.value = response.data;		
    }
    
	//добавление 
    const storeWorker = async (data) => {
          await timesheetServiceAPI.post(`/workers/insertWorker?${data}`,data)
          await router.push({name: 'human-resources.index'})
          
    }

	//обновление информации 
    const updateWorker = async (data) => {
		await timesheetServiceAPI.post(`/workers/updateWorker?${data}`, data['_value'])
        await router.push({name:'human-resources.index'})
    }
    
	//удаление 
    const deleteWorker = async (workerID) => {
        let confirm=window.confirm('Вы действительно хотите удалить работника с id: '+workerID+'?')
        if(confirm) {    
            await timesheetServiceAPI.post(`/workers/deleteWorker?workerID=${workerID}`)
        }
   }
    
      return {
            data,
            worker,
            workersdata,
            EntireWorkerList,
            getAllData,
			getAllWorkerData,
            getWorkerById,
            deleteWorker,
            updateWorker,
            storeWorker,
            getEntireWorkerList
      }
  
 }
