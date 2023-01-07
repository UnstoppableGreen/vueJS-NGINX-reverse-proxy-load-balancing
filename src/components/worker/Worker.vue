<template>
  <tr>
    <td class="py-5 bg-white text-sm">
      <p class="md:text-base text-gray-900 whitespace-no-wrap">
        {{ workersdata.id }}
      </p>
    </td>

    <td class="py-5 bg-white text-sm">
      <p class="md:text-base text-gray-900 whitespace-no-wrap">
        {{ workersdata.name }}
      </p>
    </td>
    <td class="py-5 bg-white text-sm">
      <p class="md:text-base text-gray-900 whitespace-no-wrap">
        {{ workersdata.division.name }}
      </p>
    </td>
    <td class="py-5 bg-white text-sm">
      <p class="md:text-base text-gray-900 whitespace-no-wrap">
        {{ workersdata.profession.name }}
      </p>
    </td>
    <td class="py-5 bg-white text-sm">
      <p class="md:text-base text-gray-900 whitespace-no-wrap">
        {{ workersdata.operatingMode.name }}
      </p>
    </td>
    <td class="py-5 bg-white text-sm">
      <p class="md:text-base text-gray-900 whitespace-no-wrap">
        {{ workersdata.contacts }}
      </p>
    </td>
    <td class="py-5 bg-white text-sm">
      <p class="md:text-base text-gray-900 whitespace-no-wrap">
        {{ workersdata.address }}
      </p>
    </td>
    <td class="py-5 bg-white text-sm">
      <p class="md:text-base text-gray-900 whitespace-no-wrap">
        {{ workersdata.date }}
      </p>
    </td>
    <td v-if="checkRole('changeWorker')"
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
        :to="{ name: 'workers.edit', params: { workerID: workersdata.id } }"
        class="text-gray-500 hover:text-blue-500 mx-2"
      >
        <i
          class="font-bold transition duration-200 ease-in-out material-icons-outlined md:text-md"
          >edit</i
        >
      </router-link>
      <a
        @click="deleteWorker(workersdata.id)"
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
import { useKeycloak } from "@baloise/vue-keycloak";

const { hasRoles } = useKeycloak();
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
  methods: {
    checkRole: function (role) {
      console.log("роль " + role);
      console.log("есть право? " + hasRoles([role]));
      if (hasRoles([role])) {
        return true;
      } else {
        return false;
      }
    },
}
};
</script>

<style scoped>
td {
  width: 8%;
}
</style>