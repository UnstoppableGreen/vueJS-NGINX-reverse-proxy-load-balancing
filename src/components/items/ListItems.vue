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
              <p class="text-3xl font-bold">Детали</p>
              <p class="text-gray-400 mt-2 mb-5">{{ data.total }} деталей</p>
            </div>
            <filter-item @setFilter="filterData"></filter-item>
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
                    ID детали
                  </p>
                </td>

                <td class="py-5 bg-white text-sm">
                  <p class="md:text-base text-gray-900 whitespace-no-wrap">
                    Имя
                  </p>
                </td>
                <td class="py-5 bg-white text-sm">
                  <p class="md:text-base text-gray-900 whitespace-no-wrap">
                    Поставщик
                  </p>
                </td>
              </tr>

              <transition-group name="list">
                <item
                  v-show="!isFilter"
                  v-for="item in itemsdata"
                  :key="item.id + 122"
                  :itemsdata="item"
                  @click="openModal(item)"
                ></item>

                <item
                  v-show="isFilter"
                  v-for="item in itemsdata"
                  :key="item.id"
                  :itemsdata="item"
                  @click="openModal(item)"
                >
                </item>
              </transition-group>
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
              <!--НАСТРОЙКА КНОПОК (начало)--><!-- //0801-->
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
              <!--НАСТРОЙКА КНОПОК (конец)--><!-- //0801-->
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, onMounted, ref } from "@vue/runtime-core";
import useItems from "../../composables/Items";
import Item from "../items/Item.vue";
import PaginateUniversal from "../../composables/PaginateUniversal"; //<!-- //0801-->
import FilterItem from "../../components/functionalities/FilterItem.vue";
import Modal from "../functionalities/Modal.vue";
export default {
  name: "ListItems",
  components: {
    Item,
    FilterItem,
    Modal,
  },

  setup() {
    //Get User data

    const {
      itemsdata,
      data,
      getAllData,
      EntireItemsList,
      getEntireItemsList,
      deleteItem,
    } = useItems();

    //Pagination

    //<!-- //0801-->
    const { page, pages, entries, totalEntries, setPages, setParam } =
      PaginateUniversal(data);
    const filterbyPage = computed(() => {
      return filteredData.value.slice(
        entries.value,
        entries.value + data.value.per_page
      );
    });
    //<!-- //0801-->

    //Filter User

    const isFilter = ref(false);
    const filteredData = ref([]);

    //<!-- //0801-->
    const retrieveList = (page) => {
      if (page != 0 && page != data.value.total_pages + 1) {
        const params = setParam(page);
        getAllData(params);
      }
    };
    //<!-- //0801-->

    //<!-- //0801-->
    const filterData = (data) => {
      isFilter.value = true;
      switch (data) {
        case "asc":
          filteredData.value = Array.from(EntireItemsList.value).sort(
            (a, b) => {
              if (a.name < b.name) return -1;
              return a.name > b.name ? 1 : 0;
            }
          );
          break;
        case "des":
          filteredData.value = Array.from(EntireItemsList.value).sort(
            (a, b) => {
              if (a.name > b.name) return -1;
              return a.name < b.name ? 1 : 0;
            }
          );
          break;
        default:
          isFilter.value = false;
      }
    };
    //<!-- //0801-->
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
      getEntireItemsList();
    });

    return {
      data,
      itemsdata,
      deleteItem,
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
