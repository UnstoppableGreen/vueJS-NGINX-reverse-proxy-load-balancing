<template>
  <transition name="modal">
    <modal
      v-if="isOpenModal"
      :userData="modalData"
      @closeModal="isOpenModal = false"
      @deleteUser="deleteUser"
    >
    </modal>
  </transition>

  <div>
    <div class="container mx-auto pb-6 px-0 sm:px-0">
      <div class="py-8 md:py-4">
        <div class="my-2 flex sm:flex-row flex-col"></div>
        <div class="-mx-4 sm:-mx-8 px-4 sm:px-8 py-6 overflow-x-auto">
          <div class="flex justify-between">
            <div>
              <p class="text-3xl font-bold">Учет рабочего времени</p>
            </div>
          </div>
		<form @submit.prevent="reportUpdate" class="mt-0">
			<div 
				class=" p-4 bg-gray-100 rounded-xl shadow-lg z-10"
				>
			<div class="md:flex flex-row md:space-x-4 w-full text-xs">
                <div class="mb-3 space-y-2 w-full text-xs">
                  <label class="font-semibold text-gray-600 py-2"
                    >Выберите сотрудника:
                  </label>
                  <input @change="onChangeTimesheet"
                    type="text"
                    v-model="workerID"
                    list="json-datalist-workers"
					class="appearance-none bg-grey-lighter text-grey-darker border border-grey-lighter rounded-lg h-10 px-4"
                  />
                  <datalist id="json-datalist-workers">
                    <option
                      v-for="wrkr in workers"
                      :key="wrkr.name"
                      :value="wrkr.id"
                    >
                      {{ wrkr.id +" "+wrkr.name }}
                    </option>
                  </datalist>
				<label class="font-semibold text-gray-600 py-2" style="padding: 0px 0px 0px 20px;">Дата начала: </label>
				<input v-model="beginDate"  type="date" placeholder="2021-01-01" class="appearance-none bg-grey-lighter text-grey-darker border border-grey-lighter rounded-lg h-10 px-4" >
				<label class="font-semibold text-gray-600 py-2" style="padding: 0px 0px 0px 20px;">Дата окончания: </label>
				<input v-model="endDate"  type="date" placeholder="2021-01-01" class="appearance-none bg-grey-lighter text-grey-darker border border-grey-lighter rounded-lg h-10 px-4" >
                <button
                  type="submit"
                  class="
                    transition
                    duration-200
                    ease-in-out
                    mb-2
                    md:mb-7
                    bg-gray-400
                    px-10
                    py-2
                    text-sm
                    shadow-sm
                    font-medium
                    tracking-wider
                    text-white
                    rounded-full
                    hover:shadow-lg hover:bg-gray-600
                  "   style="margin: 0px 0px 0px 20px;"
                >
                  Сформировать
                </button>
				</div>
              </div>
			</div>
			</form>
          <div style="max-height:30em; overflow-y:auto;"
            class="inline-block min-w-full shadow md:shadow-xl md:pl-4 pt-6 rounded-lg overflow-hidden"
          >
            <tbody>
              <tr>
                <td class="py-5 bg-white text-sm">
                  <p class="md:text-base text-gray-900 whitespace-no-wrap">
                    Метка
                  </p>
                </td>
                <td class="py-5 bg-white text-sm">
                  <p class="md:text-base text-gray-900 whitespace-no-wrap">
                    Дата 
                  </p>
                </td>
				<td class="py-5 bg-white text-sm">
                  <p class="md:text-base text-gray-900 whitespace-no-wrap">
                    Продолжительность, ч
                  </p>
                </td>
              </tr>
              <transition-group   name="list"><!---->
                <timesheet-report
					v-for="timesheet in timesheetsdata"
					:timesheetsdata="timesheet"
					:key="timesheet.mark + timesheetsdata.date"
					@click="openModal(timesheet)"
                ></timesheet-report>
              </transition-group>
            </tbody>
          </div>
        </div>
		<p> Отработано: {{ data.totalWorkHours }} ч.</p>
		<p> Больничных: {{ data.daySickLeave }} д.</p>
		<p> Командировочных: {{ data.dayBusinessTrip }} д.</p>
		<p> Отпускных: {{ data.dayVacation }} д.</p>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "@vue/runtime-core";
import useTimeSheets from "../../composables/TimeSheets";
import TimesheetReport from "../timesheetreports/TimesheetReport.vue";
import useWorkers from "../../composables/Workers";
import Modal from "../functionalities/Modal.vue";

let workers = ref([]);
let workerID = 0;
let beginDate = '2023-01-01';
let endDate = '2023-01-01';
export default {
  name: "ListTimesheetReport",
  components: {
    TimesheetReport,
    Modal,
  },
methods: {
	
	onChangeTimesheet() {
		
	},
	reportUpdate () {
		this.getTimesheetReports({ workerID: this.workerID, beginDate: this.beginDate, endDate: this.endDate });
		//this.setPages(this.data);
		//this.getEntireTimesheetReportList(this.workerID, this.beginDate, this.endDate);
    }
	
},
data: function () {
	const { workersdata,	getAllWorkerData, } = useWorkers();
		getAllWorkerData();
		workers = workersdata;
	const {
		timesheetsdata,
		data,
		getTimesheetReports,
		getEntireTimesheetReportList,
		deleteTimeSheet,
		} = useTimeSheets();
	this.beginDate = new Date();
	this.endDate = new Date();


    //Modal for responsive design
    const isOpenModal = ref(false);
    const modalData = ref([]);
    const openModal = (data) => {
      if (window.innerWidth < 820) {
        isOpenModal.value = true;
        modalData.value = { ...data };
      }
    };

    return {
		workers,
		workerID,
		data,
		beginDate,
		endDate,
		timesheetsdata,
		deleteTimeSheet,
		isOpenModal,
		modalData,
		openModal,
		getTimesheetReports,
		getEntireTimesheetReportList,
		/*retrieveList1,
		retrieveList2,*/
    };
  },
};
</script>

<style scoped>
th {
  text-align: center;
  padding-left: 75px;
}
.list-enter-active {
  animation: changePage 0.8s;
}
.list-leave-active {
  animation: changePage 0.8s reverse;
}

@keyframes changePage {
  0% {
    opacity: 0;
    transform: translate(20px, 0);
  }

  100% {
    opacity: 1;
    transform: translate(0, 0);
  }
}
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.5s;
}
.modal-enter,
.modal-leave-active {
  opacity: 0;
}
</style>
