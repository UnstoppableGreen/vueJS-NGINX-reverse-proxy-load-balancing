<template>
  <tr>
    <td class="py-5 bg-white text-sm">
      <p class="md:text-base text-gray-900 whitespace-no-wrap">
        {{ ordersdata.id }}
      </p>
    </td>

    <td class="py-5 bg-white text-sm">
      <p class="md:text-base text-gray-900 whitespace-no-wrap">
        {{ ordersdata.clientID }}
      </p>
    </td>
    <td class="py-5 bg-white text-sm">
      <p class="md:text-base text-gray-900 whitespace-no-wrap">
        {{ ordersdata.statusID }}
      </p>
    </td>
    <td class="py-5 bg-white text-sm">
      <p class="md:text-base text-gray-900 whitespace-no-wrap">
        {{ ordersdata.creationDate }}
      </p>
    </td>
    <td class="py-5 bg-white text-sm">
      <p class="md:text-base text-gray-900 whitespace-no-wrap">
        {{ ordersdata.lastUpdateOn }}
      </p>
    </td>
    <td
      class="hidden md:table-cell text-center md:pl-1 md:py-5 bg-white text-sm"
    >
      <router-link
        :to="{ name: 'order.info', params: { orderID: ordersdata.id } }"
        class="text-gray-500 hover:text-blue-500 mx-2"
      >
        <i
          class="font-bold transition duration-200 ease-in-out material-icons-outlined md:text-md"
          >zoom_in</i
        >
      </router-link>
      <router-link
        :to="{ name: 'order.edit', params: { orderID: ordersdata.id } }"
        class="text-gray-500 hover:text-blue-500 mx-2"
      >
        <i
          class="font-bold transition duration-200 ease-in-out material-icons-outlined md:text-md"
          >edit</i
        >
      </router-link>
      <a
        @click="deleteOrder(ordersdata.id)"
        class="text-gray-500 cursor-pointer ml-2"
      >
        <i
          class="transition duration-200 ease-in-out material-icons-round text-gray-500 hover:text-blue-500 md:text-md"
          >delete</i
        >
      </a>
    </td>
    <td></td>
  </tr>
</template>

<script>
import useOrder from "../../composables/Orders";

export default {
  name: "Order",
  props: {
    ordersdata: {
      type: Object,
      require: true,
    },
  },
  setup() {
    const { deleteOrder } = useOrder();
    return {
      deleteOrder,
    };
  },
};
</script>

<style scoped>
td {
  width: 8%;
}
</style>