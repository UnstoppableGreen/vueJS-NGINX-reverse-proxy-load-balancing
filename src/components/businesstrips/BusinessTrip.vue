<template>
  <tr>
    <td class="py-5 bg-white text-sm">
      <p class="md:text-base text-gray-900 whitespace-no-wrap">
        {{ businessTripsdata.id }}
      </p>
    </td>
    <td class="py-5 bg-white text-sm">
      <p class="md:text-base text-gray-900 whitespace-no-wrap">
        {{ businessTripsdata.worker.id + " " + businessTripsdata.worker.name  }}
      </p>
    </td>
    <td class="py-5 bg-white text-sm">
      <p class="md:text-base text-gray-900 whitespace-no-wrap">
        {{ businessTripsdata.beginDate }}
      </p>
    </td>
    <td class="py-5 bg-white text-sm">
      <p class="md:text-base text-gray-900 whitespace-no-wrap">
        {{ businessTripsdata.endDate }}
      </p>
    </td>
	<td class="py-5 bg-white text-sm">
      <p class="md:text-base text-gray-900 whitespace-no-wrap">
        {{ businessTripsdata.numberCommand }}
      </p>
    </td>
	<td class="py-5 bg-white text-sm">
      <p class="md:text-base text-gray-900 whitespace-no-wrap">
        {{ businessTripsdata.dateCommand }}
      </p>
    </td>
	<td class="py-5 bg-white text-sm">
      <p class="md:text-base text-gray-900 whitespace-no-wrap">
        {{ businessTripsdata.destination }}
      </p>
    </td>
	<td class="py-5 bg-white text-sm">
      <p class="md:text-base text-gray-900 whitespace-no-wrap">
        {{ businessTripsdata.tripPurpose }}
      </p>
    </td>
    <td
      class="hidden md:table-cell text-center md:pl-1 md:py-5 bg-white text-sm"
    >
      <!--<router-link
        :to="{ name: 'worker.info', params: { workerID: workersdata[0].id } }"
        class="text-gray-500 hover:text-blue-500 mx-2"
      >
        <i
          class="font-bold transition duration-200 ease-in-out material-icons-outlined md:text-md"
          >zoom_in</i
        >
      </router-link>-->
      <router-link
        :to="{ name: 'businesstrips.edit', params: { businessTripID: businessTripsdata.id } }"
        class="text-gray-500 hover:text-blue-500 mx-2"
      >
        <i
          class="font-bold transition duration-200 ease-in-out material-icons-outlined md:text-md"
          >edit</i
        >
      </router-link>
      <a
        @click="deleteBusinessTrip(businessTripsdata.id)"
        class="text-gray-500 cursor-pointer ml-2"
      >
        <i
          class="transition duration-200 ease-in-out material-icons-round text-gray-500 hover:text-blue-500 md:text-md"
          >delete</i
        >
      </a>
    </td>
  </tr>
</template>

<script>
import useBusinessTrips from "../../composables/BusinessTrips";

export default {
  name: "BusinessTrip",
  props: {
    businessTripsdata: {
      type: Object,
      require: true,
    },
  },
  setup() {
    const { deleteBusinessTrip } = useBusinessTrips();
    return {
      deleteBusinessTrip,
    };
  },
};
</script>

<style scoped>
td {
  width: 8%;
}
</style>