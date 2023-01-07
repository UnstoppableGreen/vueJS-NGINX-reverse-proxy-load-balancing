<template>
  <tr>
    <td class="py-5 bg-white text-sm">
      <p class="md:text-base text-gray-900 whitespace-no-wrap">
        {{ sickLeavesdata.id }}
      </p>
    </td>
    <td class="py-5 bg-white text-sm">
      <p class="md:text-base text-gray-900 whitespace-no-wrap">
        {{ sickLeavesdata.worker.id + " " + sickLeavesdata.worker.name  }}
      </p>
    </td>
	<td class="py-5 bg-white text-sm">
      <p class="md:text-base text-gray-900 whitespace-no-wrap">
        {{ sickLeavesdata.medicalOrganization.name  }}
      </p>
    </td>
	<td class="py-5 bg-white text-sm">
      <p class="md:text-base text-gray-900 whitespace-no-wrap">
        {{ sickLeavesdata.issueDate }}
      </p>
    </td>
	<td class="py-5 bg-white text-sm">
      <p class="md:text-base text-gray-900 whitespace-no-wrap">
        {{ sickLeavesdata.number }}
      </p>
    </td>
    <td class="py-5 bg-white text-sm">
      <p class="md:text-base text-gray-900 whitespace-no-wrap">
        {{ sickLeavesdata.beginDate }}
      </p>
    </td>
    <td class="py-5 bg-white text-sm">
      <p class="md:text-base text-gray-900 whitespace-no-wrap">
        {{ sickLeavesdata.endDate }}
      </p>
    </td>
    <td v-if="checkRole('changeSickLeave')"
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
        :to="{ name: 'sickleaves.edit', params: { sickLeaveID: sickLeavesdata.id } }"
        class="text-gray-500 hover:text-blue-500 mx-2"
      >
        <i
          class="font-bold transition duration-200 ease-in-out material-icons-outlined md:text-md"
          >edit</i
        >
      </router-link>
      <a
        @click="deleteSickLeave(sickLeavesdata.id)"
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
import useSickLeaves from "../../composables/SickLeaves";
import { useKeycloak } from "@baloise/vue-keycloak";

const { hasRoles } = useKeycloak();
export default {
  name: "SickLeave",
  props: {
    sickLeavesdata: {
      type: Object,
      require: true,
    },
  },
  setup() {
    const { deleteSickLeave } = useSickLeaves();
    return {
      deleteSickLeave,
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