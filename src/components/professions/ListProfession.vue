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
              <p class="text-3xl font-bold">Должности</p>
              <p class="text-gray-400 mt-2 mb-5">{{ data.total }} должностей</p>
            </div>
            <!--<filter-profession @setFilter="filterData"></filter-profession>-->
          </div>
          <div
            class="
              inline-block
              min-w-full
              shadow
              md:shadow-xl md:pl-4
              pt-6
              rounded-lg
              overflow-hidden
            "
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
                    Наименование
                  </p>
                </td>
				</tr>
              <!--НАСТРОЙКА ТРАНЗАКЦИИ (начало)-->
              <transition-group name="list">
                <profession
                  v-show="!isFilter"
                  v-for="profession in professionsdata"
                  :key="profession.id"
                  :professionsdata="profession"
                  @click="openModal(profession)"
                ></profession>

                <profession
                  v-show="isFilter"
                  v-for="profession in professionsdata"
                  :key="profession.id"
                  :professionsdata="profession"
                  @click="openModal(profession)"
                >
                </profession>
              </transition-group>
              <!--НАСТРОЙКА ТРАНЗАКЦИИ (конец)-->
            </tbody>
            <div
              class="
                px-5
                py-5
                bg-white
                flex flex-col
                xs:flex-row
                items-center
                xs:justify-between
              "
            >
              <!--НАСТРОЙКА КНОПОК (начало)-->
              <div class="flex items-center space-x-5">
                <a
                  @click="retrieveList(data.page - 1)"
                  class="px-4 py-2 font-bold cursor-pointer rounded-3xl"
                >
                  <span
                    :class="{ 'text-gray-200': data.page == 1 }"
                    class="
                      transition
                      duration-200
                      ease-in-out
                      material-icons
                      text-base
                      font-bold
                    "
                  >
                    arrow_back_ios
                  </span>
                </a>
                <a
                  v-for="(singlePage, index) of pages"
                  :key="index"
                  @click="retrieveList(singlePage)"
                  :class="{
                    'border-t-2 border-blue-500': singlePage == data.page,
                  }"
                  class="
                    transition
                    duration-500
                    ease-in-out
                    border-t-2
                    hover:border-blue-300
                    px-4
                    py-2
                    text-gray-700
                    cursor-pointer
                  "
                >
                  {{ singlePage }}
                </a>
                <a
                  @click="retrieveList(data.page + 1)"
                  class="px-4 py-2 font-bold cursor-pointer rounded-3xl"
                >
                  <span
                    :class="{ 'text-gray-200': data.page == data.total_pages }"
                    class="
                      transition
                      duration-200
                      ease-in-out
                      material-icons
                      text-base
                      font-bold
                    "
                  >
                    arrow_forward_ios
                  </span>
                </a>
              </div>
              <!--<span class="text-sm font-md mt-5 font-bold xs:text-sm text-gray-400">
							Showing {{entries == 0 ? 1 : entries}} to  of {{totalEntries}} 
						</span>-->
              <!--НАСТРОЙКА КНОПОК (конец)-->
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, onMounted, ref } from "@vue/runtime-core";
import useProfessions from "../../composables/Professions";
import Profession from "../professions/Profession.vue";
import paginateProfessionList from "../../composables/PaginateUniversal";
//import FilterProfession from "../../components/functionalities/FilterProfession.vue";
import Modal from "../functionalities/Modal.vue";
export default {
  name: "ListProfession",
  components: {
    Profession,
    //FilterProfession,
    Modal,
  },

  setup() {
    //Get data

    const {
      professionsdata,
      data,
      getAllProfessions,
      EntireProfessionList,
      getEntireProfessionsList,
      deleteProfession,
    } = useProfessions();

    //Pagination
    const { page, pages, entries, totalEntries, setPages, setParam } =
      paginateProfessionList(data);
	
    const filterbyPage = computed(() => {
      return filteredData.value.slice(
        entries.value,
        entries.value + data.value.per_page
      );
    });

    //Filter 

    const isFilter = ref(false);
    const filteredData = ref([]);
    //<!--НАСТРОЙКА СТРАНИЦ (начало)-->
    const retrieveList = (page) => {
      if (page != 0 && page != data.value.total_pages + 1) {
        const params = setParam(page);
        getAllProfessions(params);
      }
    };
    //<!--НАСТРОЙКА СТРАНИЦ (конец)-->

    const filterData = (data) => {
      isFilter.value = true;
      switch (data) {
        case "asc":
          filteredData.value = Array.from(EntireProfessionList.value).sort((a, b) => {
            if (a.name < b.name) return -1;
            return a.name > b.name ? 1 : 0;
          });
          break;
        case "des":
          filteredData.value = Array.from(EntireProfessionList.value).sort((a, b) => {
            if (a.name > b.name) return -1;
            return a.name < b.name ? 1 : 0;
          });
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
      await getAllProfessions({ page: page.value });
      setPages(data);
      getEntireProfessionsList();
    });

    return {
      data,
      professionsdata,
      deleteProfession,
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
