<template>
   <div class=" z-0  flex items-center justify-center  mb-8 py-7 md:py-12 px-4 sm:px-6 lg:px-8  items-center">
	<div class="max-w-md w-full   space-y-8 p-4 bg-gray-100 rounded-xl shadow-lg z-10">
		<div class="grid  gap-8 grid-cols-1">
				<div class="flex flex-col ">
						<div class="flex flex-col sm:flex-row items-center">
							<h2 v-if="!divisionID" class="font-semibold text-lg mr-auto">Создание поздразделения</h2>
							<h2 v-else class="font-semibold text-lg mr-auto">Изменение подразделения</h2>
							<div class="w-full sm:w-auto sm:ml-auto mt-3 sm:mt-0"></div>
						</div>
			<form @submit.prevent="saveDivision" class="mt-5">
				<div class="form">
						<div class="md:flex flex-row md:space-x-4 w-full text-xs">
							<div class="mb-3 space-y-2 w-full text-xs">
								<label  class="font-semibold text-gray-600 py-2">Наименование <abbr title="required">*</abbr></label>
								<input v-model="divisiondata.name" placeholder="Отдел" class="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded-lg h-10 px-4" required="required" type="text">
								<p class="text-red text-xs hidden">Пожалуйста, заполните это поле.</p>
							</div>
						</div>
								<p class="text-xs text-red-500 text-right my-3">Обязательные поля для заполнения <abbr title="Required field">*</abbr></p>
								<div class="mt-5 text-right md:space-x-3 md:block flex flex-col-reverse">
									<button @click="this.$router.push('/human-resources')" class="mb-2 md:mb-0 bg-white px-5 py-2 text-sm shadow-sm font-medium tracking-wider border text-gray-600 rounded-full hover:shadow-lg hover:bg-gray-100"> Отмена </button>
									<button  type="submit" v-if='!divisionID' class="transition duration-200  ease-in-out mb-2 md:mb-0 bg-green-400 px-5 py-2 text-sm shadow-sm font-medium tracking-wider text-white rounded-full hover:shadow-lg hover:bg-green-600">Создать</button>
									<button v-else class="transition duration-200  ease-in-out mb-2 md:mb-0 bg-green-400 px-5 py-2 text-sm shadow-sm font-medium tracking-wider text-white rounded-full hover:shadow-lg hover:bg-green-600">Обновить</button>
								</div>
							</div>
						</form>
					</div>
				</div>
			</div>
   </div>
</template>

<script>
import { reactive } from '@vue/reactivity'
import { onMounted } from '@vue/runtime-core'
import useDivision from '../../composables/Divisions'
export default {
	name:'DivisionForm',
	props:{
		divisionID:{
			required:true,
			type:String
		},
	},
	setup(props){
		let divisiondata=reactive({
			'name':'',
		})
		// eslint-disable-next-line no-unused-vars
		const {division,getDivisionById,storeDivision,updateDivision} = useDivision()
		let divisiondataString;
		if(props.divisionID){
			onMounted(getDivisionById(props.divisionID))
			divisiondata = division			
			divisiondataString = JSON.stringify(divisiondata).replace(',','\n');
		}

		const saveDivision=async()=>{
			props.divisionID ?
			await updateDivision({...divisiondata})
			:await storeDivision({...divisiondata})
		}
	
		return{
			divisiondata,
			divisiondataString,
			saveDivision
		}
	
	}
}
</script>

<style scoped>


</style>
