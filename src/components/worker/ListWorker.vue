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
              <p class="text-3xl font-bold">Сотрудники</p>
              <p class="text-gray-400 mt-2 mb-5">{{ data.total }} сотрудников</p>
            </div>
            <!--<filter-worker @setFilter="filterData"></filter-worker>-->
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
                    ФИО
                  </p>
                </td>
                <td class="py-5 bg-white text-sm">
                  <p class="md:text-base text-gray-900 whitespace-no-wrap">
                    Подразделение
                  </p>
                </td>
                <td class="py-5 bg-white text-sm">
                  <p class="md:text-base text-gray-900 whitespace-no-wrap">
                    Должность
                  </p>
                </td>
				<td class="py-5 bg-white text-sm">
                  <p class="md:text-base text-gray-900 whitespace-no-wrap">
                    Режим работы
                  </p>
                </td>
                <td class="py-5 bg-white text-sm">
                  <p class="md:text-base text-gray-900 whitespace-no-wrap">
                    Контакты
                  </p>
                </td>
                <td class="py-5 bg-white text-sm">
                  <p class="md:text-base text-gray-900 whitespace-no-wrap">
                    Адрес
                  </p>
                </td>
                <td class="py-5 bg-white text-sm">
                  <p class="md:text-base text-gray-900 whitespace-no-wrap">
                    Дата
                  </p>
                </td>
              </tr>

              <transition-group name="list">
                <worker
                  v-show="!isFilter"
                  v-for="worker in workersdata"
                  :key="worker.id"
                  :workersdata="worker"
                  @click="openModal(worker)"
                ></worker>

                <worker
                  v-show="isFilter"
                  v-for="worker in filterbyPage"
                  :key="worker.id"
                  :ordersdata="worker"
                  @click="openModal(worker)"
                >
                </worker>
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
import useWorkers from "../../composables/Workers";
import Worker from "../worker/Worker.vue";
import paginateOrdersList from "../../composables/PaginateUniversal";
//import FilterOrder from "../../components/functionalities/FilterOrder.vue";
import Modal from "../functionalities/Modal.vue";

export default {
  name: "ListWorker",
  components: {
    Worker,
   // FilterWorker,
    Modal,
  },
//<p>итог: {{JSON.stringify(filterbyPage)}}</p>
  setup() {
    //Get User data

    const {
      workersdata,
      data,
      getAllData,
      EntireWorkerList,
      getEntireWorkerList,
      deleteWorker,
    } = useWorkers();
    let worker = ref([]);
    for (worker in workersdata.value) {
      console.log("сотрудник " + worker.id);
    }

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
          filteredData.value = Array.from(EntireWorkerList.value).sort(
            (a, b) => {
              if (a[1].name < b[1].name) return -1;
              return a[1].name > b[1].name ? 1 : 0;
            }
          );
          break;
        case "des":
          filteredData.value = Array.from(EntireWorkerList.value).sort(
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
      getEntireWorkerList();
    });

    
    return {
      data,
      workersdata,
      deleteWorker,
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
