<template>
  <tr>
    <td class="py-5 bg-white text-sm">
      <p class="md:text-base text-gray-900 whitespace-no-wrap">
        {{ timesheetsdata.mark  }}
      </p>
    </td>
    <td class="py-5 bg-white text-sm">
      <p class="md:text-base text-gray-900 whitespace-no-wrap">
        {{ timesheetsdata.date }}
      </p>
    </td>
	<td class="py-5 bg-white text-sm">
      <p class="md:text-base text-gray-900 whitespace-no-wrap">
        {{ timesheetsdata.duration }}
      </p>
    </td>
  </tr>
</template>

<script>
import useTimeSheets from "../../composables/TimeSheets";
import { useKeycloak } from "@baloise/vue-keycloak";

const { hasRoles } = useKeycloak();
export default {
  name: "TimeSheet",
  props: {
    timesheetsdata: {
      type: Object,
      require: true,
    },
  },
  setup() {
    const { deleteTimeSheet } = useTimeSheets();
    return {
      deleteTimeSheet,
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