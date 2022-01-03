<template>

  <div>
    <div class="container mx-auto pb-6 px-4 sm:px-8">
      <div class="py-8 md:py-4">
        <div class="my-2 flex sm:flex-row flex-col"></div>
        <div class="-mx-4 sm:-mx-8 px-4 sm:px-8 py-6 overflow-x-auto">
          <div class="flex justify-between">
            <div>
              <p class="text-3xl font-bold">Детали заказа</p>
            </div>
          </div>
          <div
            class="inline-block min-w-full shadow md:shadow-xl md:pl-4 pt-6 rounded-lg overflow-hidden"
          >
            <tbody>
              <tr>
                <td class="py-5 bg-white text-sm">
                  <p class="md:text-base text-gray-900 whitespace-no-wrap">
                    itemID
                  </p>
                </td>

                <td class="py-5 bg-white text-sm">
                  <p class="md:text-base text-gray-900 whitespace-no-wrap">
                    QTY
                  </p>
                </td>
                <td class="py-5 bg-white text-sm">
                  <p class="md:text-base text-gray-900 whitespace-no-wrap">
                    Comments
                  </p>
                </td>
              </tr>

              <transition-group name="list">
                <detail
                  v-for="detail in ordersdata.orderdetails"
                  :key="detail.id + 122"
                  :ordersdata="detail"
                  @click="openModal(order)"
                ></detail>
              </transition-group>
            </tbody>

            <div
              class="px-5 py-5 bg-white flex flex-col xs:flex-row items-center xs:justify-between"
            >
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, onMounted, ref } from "@vue/runtime-core";
import useOrder from "../../composables/Orders";
import Order from "../orders/Order.vue";
import Detail from "../orders/Order.vue";
import Modal from "../functionalities/Modal.vue";
export default {
  name: "ListOrder",
  components: {
    Order,
    Detail,
    FilterOrder,
    Modal,
  },

  setup() {
    //Get User data

    const {
      ordersdata,
      data,
      getAllData,
      EntireOrdersList,
      getEntireOrdersList,
      deleteOrder,
    } = useOrder();
    let order = ref([]);
    for (order in ordersdata.value) {
      console.log("заказ " + order.id);
    }

    //Pagination

    const {
      page,
      pages,
      entries,
      totalEntries,
      setPages,
      setParam,
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
      const params = setParam(page);
      getAllData(params);
    };

    const filterData = (data) => {
      isFilter.value = true;
      switch (data) {
        case "asc":
          filteredData.value = Array.from(EntireOrdersList.value).sort(
            (a, b) => {
              if (a.name < b.name) return -1;
              return a.name > b.name ? 1 : 0;
            }
          );
          break;
        case "des":
          filteredData.value = Array.from(EntireOrdersList.value).sort(
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
      getEntireOrdersList();
    });

    return {
      data,
      ordersdata,
      deleteOrder,
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
