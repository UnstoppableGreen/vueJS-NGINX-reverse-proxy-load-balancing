<template>
  <tr>
    <td class="py-5 bg-white text-sm">
      <p class="md:text-base text-gray-900 whitespace-no-wrap">
        {{ workersdata[0].id }}
      </p>
    </td>

    <td class="py-5 bg-white text-sm">
      <p class="md:text-base text-gray-900 whitespace-no-wrap">
        {{ workersdata[1].name }}
      </p>
    </td>
    <td class="py-5 bg-white text-sm">
      <p class="md:text-base text-gray-900 whitespace-no-wrap">
        {{ workersdata[2].division }}
      </p>
    </td>
    <td class="py-5 bg-white text-sm">
      <p class="md:text-base text-gray-900 whitespace-no-wrap">
        {{ workersdata[0].profession }}
      </p>
    </td>
    <td class="py-5 bg-white text-sm">
      <p class="md:text-base text-gray-900 whitespace-no-wrap">
        {{ workersdata[0].operatingMode }}
      </p>
    </td>
    <td class="py-5 bg-white text-sm">
      <p class="md:text-base text-gray-900 whitespace-no-wrap">
        {{ workersdata[0].contacts }}
      </p>
    </td>
    <td class="py-5 bg-white text-sm">
      <p class="md:text-base text-gray-900 whitespace-no-wrap">
        {{ workersdata[0].address }}
      </p>
    </td>
    <td class="py-5 bg-white text-sm">
      <p class="md:text-base text-gray-900 whitespace-no-wrap">
        {{ workersdata[0].date }}
      </p>
    </td>
    <td
      class="hidden md:table-cell text-center md:pl-1 md:py-5 bg-white text-sm"
    >
      <router-link
        :to="{ name: 'worker.info', params: { workerID: workersdata[0].id } }"
        class="text-gray-500 hover:text-blue-500 mx-2"
      >
        <i
          class="font-bold transition duration-200 ease-in-out material-icons-outlined md:text-md"
          >zoom_in</i
        >
      </router-link>
      <router-link
        :to="{ name: 'worker.edit', params: { workerID: workersdata[0].id } }"
        class="text-gray-500 hover:text-blue-500 mx-2"
      >
        <i
          class="font-bold transition duration-200 ease-in-out material-icons-outlined md:text-md"
          >edit</i
        >
      </router-link>
      <a
        @click="deleteWorker(workersdata[0].id)"
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
import useWorkers from "../../composables/Workers";

export default {
  name: "Worker",
  props: {
    workersdata: {
      type: Object,
      require: true,
    },
  },
  setup() {
    const { deleteWorker } = useWorkers();
    return {
      deleteWorker,
    };
  },
};
</script>

<style scoped>
td {
  width: 8%;
}
</style>