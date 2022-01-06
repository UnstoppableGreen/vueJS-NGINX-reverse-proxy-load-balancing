<template>
   <div class=" z-0  flex items-center justify-center  mb-8 py-7 md:py-12 px-4 sm:px-6 lg:px-8  items-center">
	<div class="max-w-md w-full   space-y-8 p-4 bg-gray-100 rounded-xl shadow-lg z-10">
		<div class="grid  gap-8 grid-cols-1">
				<div class="flex flex-col ">
						<div class="flex flex-col sm:flex-row items-center">
							<h2 v-if="!carrierID" class="font-semibold text-lg mr-auto">Создание транспортной компании</h2>
							<h2 v-else class="font-semibold text-lg mr-auto">Изменение транспортной компании</h2>
							<div class="w-full sm:w-auto sm:ml-auto mt-3 sm:mt-0"></div>
						</div>
			<form @submit.prevent="saveCarrier" class="mt-5">
				<div class="form">
						<div class="mb-3 space-y-2 w-full text-xs">
							<label class=" font-semibold text-gray-600 py-2">Название<abbr title="required">*</abbr></label>
							<div class="flex flex-wrap items-stretch w-full mb-4 relative">
								<input v-model="carrierdata.name" class="flex-shrink flex-grow flex-auto leading-normal w-px flex-1 border border-l-0 h-10 border-grey-light rounded-lg rounded-l-none px-3 relative focus:border-blue focus:shadow" required>
							</div>
						</div>
						<div class="mb-3 space-y-2 w-full text-xs">
							<label class=" font-semibold text-gray-600 py-2">Контакты<abbr title="required">*</abbr></label>
							<div class="flex flex-wrap items-stretch w-full mb-4 relative">
								<input v-model="carrierdata.contacts" class="flex-shrink flex-grow flex-auto leading-normal w-px flex-1 border border-l-0 h-10 border-grey-light rounded-lg rounded-l-none px-3 relative focus:border-blue focus:shadow" required>
							</div>
						</div>
						<div class="md:flex md:flex-row md:space-x-4 w-full text-xs">
								<div class="w-full flex flex-col mb-3">
									<label class="font-semibold text-gray-600 py-2">Адрес</label>
									<input v-model="carrierdata.address"  placeholder="г. Москва" class="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded-lg h-10 px-4" type="text" name="integration[street_address]" id="integration_street_address">
								</div>
						</div>
				<button
                  type="submit"
                  v-if="!carrierID"
                  class="
                    transition
                    duration-200
                    ease-in-out
                    mb-2
                    md:mb-0
                    bg-green-400
                    px-5
                    py-2
                    text-sm
                    shadow-sm
                    font-medium
                    tracking-wider
                    text-white
                    rounded-full
                    hover:shadow-lg hover:bg-green-600
                  "
                >
                  Создать
                </button>
                <button
                  v-else
                  class="
                    transition
                    duration-200
                    ease-in-out
                    mb-2
                    md:mb-0
                    bg-green-400
                    px-5
                    py-2
                    text-sm
                    shadow-sm
                    font-medium
                    tracking-wider
                    text-white
                    rounded-full
                    hover:shadow-lg hover:bg-green-600
                  "
                >
                  Обновить
                </button>
				</div>
				</form>
						<div>{{JSON.stringify(carrierdata)}}</div>
					</div>
				</div>
			</div>
   </div>
</template>

<script>
import { reactive } from '@vue/reactivity'
import { onMounted } from '@vue/runtime-core'
import useCarriers from '../../composables/Carriers'
export default {
	name:'CarrierForm',
	props:{
		carrierID:{
			required:true,
			type:String
		},
	},
	setup(props){
		let carrierdata=reactive({
			'name':'',
			'contacts':'',
			'address':'',
		})
		// eslint-disable-next-line no-unused-vars
		const {carrier,getCarrierById,storeCarrier,updateCarrier} = useCarriers()
		if(props.carrierID){
			onMounted(getCarrierById(props.carrierID))
			carrierdata = carrier			
		}

		const saveCarrier=async()=>{
			props.carrierID ?
			await updateCarrier({...carrierdata})
			:await storeCarrier({...carrierdata})
		}
	
		return{
			carrierdata,
			saveCarrier,
		}
	
	}
}
</script>

<style scoped>


</style>
