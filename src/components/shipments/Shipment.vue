<template>
  <tr>
    <td class="py-5 bg-white text-sm">
      <p class="md:text-base text-gray-900 whitespace-no-wrap">
        {{ shipmentsdata.id }}
      </p>
    </td>
    <td class="py-5 bg-white text-sm">
      <p class="md:text-base text-gray-900 whitespace-no-wrap">
        {{ shipmentsdata.orderID }}
      </p>
    </td>
    <td class="py-5 bg-white text-sm">
      <p class="md:text-base text-gray-900 whitespace-no-wrap">
        {{ shipmentsdata.statusID }}
      </p>
    </td>
    <td class="py-5 bg-white text-sm">
      <p class="md:text-base text-gray-900 whitespace-no-wrap">
        {{ shipmentsdata.carrierID }}
      </p>
    </td>
    <td class="py-5 bg-white text-sm">
      <p class="md:text-base text-gray-900 whitespace-no-wrap">
        {{ shipmentsdata.shipmentDate }}
      </p>
    </td>
    <td class="py-5 bg-white text-sm">
      <p class="md:text-base text-gray-900 whitespace-no-wrap">
        {{ shipmentsdata.estimateDeliveryDate }}
      </p>
    </td>
    <td class="py-5 bg-white text-sm">
      <p class="md:text-base text-gray-900 whitespace-no-wrap">
        {{ shipmentsdata.deliveryDate }}
      </p>
    </td>
    <td
      class="hidden md:table-cell text-center md:pl-1 md:py-5 bg-white text-sm"
    >
      <router-link
        :to="{ name: 'shipment.info', params: { shipmentID: shipmentsdata.id } }"
        class="text-gray-500 hover:text-blue-500 mx-2"
      >
        <i
          class="
            font-bold
            transition
            duration-200
            ease-in-out
            material-icons-outlined
            md:text-md
          "
          >zoom_in</i
        >
      </router-link>

      <router-link :to="{name:'shipment.edit', params: {shipmentID: shipmentsdata.id }} " class="text-gray-500  hover:text-blue-500  mx-2">
				<i class="font-bold transition duration-200 ease-in-out material-icons-outlined md:text-md">edit</i>
			</router-link> 
      <a
        @click="deleteShipment(shipmentsdata.id)"
        class="text-gray-500 cursor-pointer ml-2"
      >
        <i
          class="
            transition
            duration-200
            ease-in-out
            material-icons-round
            text-gray-500
            hover:text-blue-500
            md:text-md
          "
          >delete</i
        >
      </a>
    </td>
  </tr>
</template>

<script>
import useShipments from "../../composables/Shipments";

export default {
  name: "Shipment",
  props: {
    shipmentsdata: {
      type: Object,
      require: true,
    },
  },
  setup() {
    const { deleteShipment } = useShipments();
    return {
      deleteShipment,
    };
  },
};
</script>

<style scoped>
td {
  width: 8%;
}
</style>