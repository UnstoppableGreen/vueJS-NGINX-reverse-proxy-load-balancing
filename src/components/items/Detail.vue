<template>
  <tr>
    <td class="py-5 bg-white text-sm">
      <p class="md:text-base text-gray-900 whitespace-no-wrap">
        {{ itemdetail.itemID }}
      </p>
    </td>

    <td class="py-5 bg-white text-sm">
      <p class="md:text-base text-gray-900 whitespace-no-wrap">
        {{ itemdetail.qty }}
      </p>
    </td>

    <!-- <td class="hidden md:table-cell text-center md:pl-1 md:py-5  bg-white text-sm">
			<router-link :to="{name:'order.edit', params: {orderID: ordersdata.id }} " class="text-gray-500  hover:text-blue-500  mx-2">
				<i class="font-bold transition duration-200 ease-in-out material-icons-outlined md:text-md">edit</i>
			</router-link>
            <a @click="deleteOrder(ordersdata.id)" class="text-gray-500 cursor-pointer ml-2">
				<i class="transition duration-200 ease-in-out material-icons-round text-gray-500 hover:text-blue-500 md:text-md">delete</i>
            </a> 
        </td> -->
    <td></td>
  </tr>
</template>

<script>
import useItem from "../../composables/Items";

export default {
  name: "Detail",
  props: {
    itemdetail: {
      type: Object,
      require: true,
    },
  },
  setup() {
    const { deleteItem } = useItem();
    return {
      deleteItem,
    };
  },
};
</script>

<style scoped>
td {
  width: 8%;
}
</style>