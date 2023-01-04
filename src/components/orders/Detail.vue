<template>
  <tr>
	<td class="py-5 bg-white text-sm">
      <p class="md:text-base text-gray-900 whitespace-no-wrap">
        {{ orderdetail.id }}
      </p>
    </td>
  
    <td class="py-5 bg-white text-sm">
      <p class="md:text-base text-gray-900 whitespace-no-wrap">
        {{ orderdetail.itemID }}
      </p>
    </td>

    <td class="py-5 bg-white text-sm">
      <p class="md:text-base text-gray-900 whitespace-no-wrap">
        {{ orderdetail.qty }}
      </p>
    </td>
    <td class="py-5 bg-white text-sm">
      <p class="md:text-base text-gray-900 whitespace-no-wrap">
        {{ orderdetail.comments }}
      </p>
    </td>
	<td><button class="b20" v-on:click="fDeleteRow(index)" title="Удалить строку">-</button></td> 

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
import useOrder from "../../composables/Orders";

export default {
  name: "Detail",
  props: {
    orderdetail: {
      type: Object,
      require: true,
    }
  },
  data: function() {
	return { index : 0 }
  },
  setup() {
    const { deleteOrder } = useOrder();
    return {
      deleteOrder,
    };
  },
  methods: {
    fAddNewRow: function () { // Добавить новую строку в таблицу
	//this.tbData.push({"id":34,"itemID":9,"qty":10,"comments":"string"});
      this.tbData.push({ id: 0, itemID: this.itemID, qty: this.qty, comments: this.comments });
    },
    fDeleteRow: function (index) { // Удалить строку с номером index из таблицы
      this.tbData.splice(index, 1);
    }
  }
};
</script>

<style scoped>
td {
  width: 8%;
}
</style>