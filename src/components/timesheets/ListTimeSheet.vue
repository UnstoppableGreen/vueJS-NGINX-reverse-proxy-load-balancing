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
            class="inline-block min-w-full shadow md:shadow-xl md:pl-4 pt-6 rounded-lg overflow-hidden"
          >
            <tbody>
              <tr>
                <td class="py-5 bg-white text-sm">
                  <p class="md:text-base text-gray-900 whitespace-no-wrap">
                    ID 
                  </p>
                </td>
                <td class="py-5 bg-white text-sm">
                  <p class="md:text-base text-gray-900 whitespace-no-wrap">
                    Сотрудник
                  </p>
                </td>
                <td class="py-5 bg-white text-sm">
                  <p class="md:text-base text-gray-900 whitespace-no-wrap">
                    Метка
                  </p>
                </td>
                <td class="py-5 bg-white text-sm">
                  <p class="md:text-base text-gray-900 whitespace-no-wrap">
                    Дата входа
                  </p>
                </td>
				<td class="py-5 bg-white text-sm">
                  <p class="md:text-base text-gray-900 whitespace-no-wrap">
                    Дата выхода
                  </p>
                </td>
				<td class="py-5 bg-white text-sm">
                  <p class="md:text-base text-gray-900 whitespace-no-wrap">
                    Продолжительность, ч
                  </p>
                </td>
              </tr>

              <transition-group name="list">
                <time-sheet
                  v-show="!isFilter"
                  v-for="timesheet in timesheetsdata"
                  :key="timesheet.id"
                  :timesheetsdata="timesheet"
                  @click="openModal(timesheet)"
                ></time-sheet>

                <time-sheet
                  v-show="isFilter"
                  v-for="timesheet in filterbyPage"
                  :key="timesheet.id"
                  :timesheetsdata="timesheet"
                  @click="openModal(timesheet)"
                >
                </time-sheet>
              </transition-group>
            </tbody>
            <div
              class="px-5 py-5 bg-white flex flex-col xs:flex-row items-center xs:justify-between"
            >
              <div class="flex items-center space-x-5">
				<a
                  @click="retrieveList(data.page - 1)"
                  class="px-4 py-2 font-bold cursor-pointer rounded-3xl"
                >
                  <span
                    :class="{ 'text-gray-200': data.page == 1 }"
                    class="transition duration-200 ease-in-out material-icons text-base font-bold"
                  >
                    arrow_back_ios
                  </span>
                </a>
                <!--<a
                  @click="retrieveList(page - 1)"
                  class="flex items-center px-4 py-2 text-gray-800 cursor-pointer rounded-md"
                >
                  <span
                    :class="{ 'text-gray-200': data.page == 1 }"
                    class="transition duration-200 ease-in-out material-icons text-base"
                  >
                    arrow_back_ios
                  </span>
                </a>-->

                <a
                  v-for="(singlePage, index) of pages"
                  :key="index"
                  @click="retrieveList(singlePage)"
                  :class="{
                    'border-t-2 border-blue-500': singlePage == data.page,
                  }"
                  class="transition duration-500 ease-in-out border-t-2 hover:border-blue-300 px-4 py-2 text-gray-700 cursor-pointer"
                >
                  {{ singlePage }}
                </a>

                <a
                  @click="retrieveList(data.page + 1)"
                  class="px-4 py-2 font-bold cursor-pointer rounded-3xl"
                >
                  <span
                    :class="{ 'text-gray-200': data.page == data.total_pages }"
                    class="transition duration-200 ease-in-out material-icons text-base font-bold"
                  >
                    arrow_forward_ios
                  </span>
                </a>
              </div>
              <!--<span
                class="text-sm font-md mt-5 font-bold xs:text-sm text-gray-400"
              >
                Showing {{ entries == 0 ? 1 : entries }} to of
                {{ totalEntries }}
              </span>-->
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, onMounted, ref } from "@vue/runtime-core";
import useTimeSheets from "../../composables/TimeSheets";
import TimeSheet from "../timesheets/TimeSheet.vue";
import paginateOrdersList from "../../composables/PaginateUniversal";
//import FilterOrder from "../../components/functionalities/FilterOrder.vue";
import Modal from "../functionalities/Modal.vue";
export default {
  name: "ListTimeSheet",
  components: {
    TimeSheet,
   // FilterWorker,
    Modal,
  },
//<p>итог: {{JSON.stringify(filterbyPage)}}</p>
  setup() {
    //Get User data

    const {
      timesheetsdata,
      data,
      getAllData,
      EntireTimeSheetList,
      getEntireTimeSheetList,
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
    } = paginateOrdersList(data);
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
			const params = setParam(page);
			getAllData(params);
		}
    };

    const filterData = (data) => {
      isFilter.value = true;
      switch (data) {
        case "asc":
          filteredData.value = Array.from(EntireTimeSheetList.value).sort(
            (a, b) => {
              if (a[1].name < b[1].name) return -1;
              return a[1].name > b[1].name ? 1 : 0;
            }
          );
          break;
        case "des":
          filteredData.value = Array.from(EntireTimeSheetList.value).sort(
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

    onMounted(async () => {
      await getAllData({ page: page.value });
      setPages(data);
      getEntireTimeSheetList();
    });

    return {
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
