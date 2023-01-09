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
    <div class="container mx-auto pb-6 px-4 sm:px-8">
      <div class="py-8 md:py-4">
        <div class="my-2 flex sm:flex-row flex-col"></div>
        <div class="-mx-4 sm:-mx-8 px-4 sm:px-8 py-6 overflow-x-auto">
          <div class="flex justify-between">
            <div>
              <p class="text-3xl font-bold">Учет рабочего времени</p>
            </div>
            <!--<filter-order @setFilter="filterData"></filter-order>-->
          </div>
			<div 
				class=" p-4 bg-gray-100 rounded-xl shadow-lg z-10"
				>
			<div class="md:flex flex-row md:space-x-4 w-full text-xs">
                <div class="mb-3 space-y-2 w-full text-xs">
                  <label class="font-semibold text-gray-600 py-0"
                    >Выберите сотрудника:
                  </label>
                  <input @change="onChangeTimesheet"
                    type="text"
                    v-model="workerID"
                    list="json-datalist-workers"
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
                </div>
              </div>
			</div>
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
              <transition-group   name="list">
                <timesheet-report
                  v-show="!isFilter"
                  v-for="timesheet in timesheetsdata"
                  :key="timesheet.id"
                  :timesheetsdata="timesheet"
                  @click="openModal(timesheet)"
                ></timesheet-report>

                <timesheet-report
                  v-show="isFilter"
                  v-for="timesheet in filterbyPage"
                  :key="timesheet.id"
                  :timesheetsdata="timesheet"
                  @click="openModal(timesheet)"
                >
                </timesheet-report>
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
import {computed, ref } from "@vue/runtime-core";
import useTimeSheets from "../../composables/TimeSheets";
import TimesheetReport from "../timesheetreports/TimesheetReport.vue";
import useWorkers from "../../composables/Workers";
import paginateTinesheetsList from "../../composables/PaginateUniversal";
import Modal from "../functionalities/Modal.vue";

let workers = ref([]);
let workerID = 0;
let total = 0;
export default {
  name: "ListTimesheetReport",
  components: {
    TimesheetReport,
    Modal,
  },
methods: {
	
	onChangeTimesheet() {
		this.getTimesheetReports({ page: this.page, workerID: this.workerID });
		this.setPages(this.data);
		this.getEntireTimesheetReportList(this.page.value, this.workerID);
	},
	
},
data: function () {
	const { workersdata,	getAllWorkerData, } = useWorkers();
		getAllWorkerData();
		workers = workersdata;
	const {
		timesheetsdata,
		data,
		getTimesheetReports,
		EntireTimesheetReportList,
		getEntireTimesheetReportList,
		deleteTimeSheet,
		} = useTimeSheets();

    //Pagination

    const {
      page,
      pages,
      entries,
      totalEntries,
      setPages,
      setParam
    } = paginateTinesheetsList(data);
    const filterbyPage = computed(() => {
      return filteredData.value.slice(
        entries.value,
        entries.value + data.value.per_page
      );
    });

    //Filter User

    const isFilter = ref(false);
    const filteredData = ref([]);

	const retrieveList = (page) => {
		if ((page != 0)&&(page != data.value.total_pages + 1)) {
			let params = setParam(page);
			params['workerID']=workerID
			console.log(params);
			getTimesheetReports(params);
		}
    };

    const filterData = (data) => {
      isFilter.value = true;
      switch (data) {
        case "asc":
          filteredData.value = Array.from(EntireTimesheetReportList.value).sort(
            (a, b) => {
              if (a[1].name < b[1].name) return -1;
              return a[1].name > b[1].name ? 1 : 0;
            }
          );
          break;
        case "des":
          filteredData.value = Array.from(EntireTimesheetReportList.value).sort(
            (a, b) => {
              if (a[1].name > b[1].name) return -1;
              return a[1].name < b[1].name ? 1 : 0;
            }
          );
          break;
        default:
          isFilter.value = false;
      }
    };

    //Modal for responsive design
    const isOpenModal = ref(false);
    const modalData = ref([]);
    const openModal = (data) => {
      if (window.innerWidth < 820) {
        isOpenModal.value = true;
        modalData.value = { ...data };
      }
    };

   /* onMounted(async () => {
    if (workerID!=0 || workerID!=null){  
		await getTimesheetReports({ page: page.value, workerID: workerID });
		setPages(data);
		getEntireTimesheetReportList(page.value, workerID);
    }
    });*/

    return {
		workers,
		workerID,
		data,
		timesheetsdata,
		deleteTimeSheet,
		totalEntries,
		pages,
		page,
		entries,
		filteredData,
		isFilter,
		filterbyPage,
		filterData,
		isOpenModal,
		modalData,
		openModal,
		retrieveList,
		getTimesheetReports,
		setPages, 
		getEntireTimesheetReportList,
		total,
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
