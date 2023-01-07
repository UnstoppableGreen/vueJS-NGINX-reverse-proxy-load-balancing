<template>
  <tr>
    <td class="py-5 bg-white text-sm">
      <p class="md:text-base text-gray-900 whitespace-no-wrap">
        {{ vacationsdata.id }}
      </p>
    </td>
    <td class="py-5 bg-white text-sm">
      <p class="md:text-base text-gray-900 whitespace-no-wrap">
        {{ vacationsdata.worker.id + " " + vacationsdata.worker.name  }}
      </p>
    </td>
    <td class="py-5 bg-white text-sm">
      <p class="md:text-base text-gray-900 whitespace-no-wrap">
        {{ vacationsdata.beginDate }}
      </p>
    </td>
    <td class="py-5 bg-white text-sm">
      <p class="md:text-base text-gray-900 whitespace-no-wrap">
        {{ vacationsdata.endDate }}
      </p>
    </td>
	<td class="py-5 bg-white text-sm">
      <p class="md:text-base text-gray-900 whitespace-no-wrap">
        {{ vacationsdata.numberCommand }}
      </p>
    </td>
	<td class="py-5 bg-white text-sm">
      <p class="md:text-base text-gray-900 whitespace-no-wrap">
        {{ vacationsdata.commandDate }}
      </p>
    </td>
    <td v-if="checkRole('changeVacation')"
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

      
     <!-- <button style="margin: 5em 45em auto auto "  @click="this.editDivision=!this.editDivision;" class="mb-2 md:mb-0 bg-white px-5 py-2 text-sm shadow-sm font-medium tracking-wider border text-gray-600 rounded-full hover:shadow-lg hover:bg-gray-100">
          <i class="font-bold transition duration-200 ease-in-out material-icons-outlined md:text-md">
            edit
          </i>
      </button>
      <Suspense v-if="this.editDivision">
        <template #default>
          sdkj;nkfsdjnsdfsdl'fknsdlfkn
          <vacation-edit  :vacationID='vacationsdata.id'/>
          </template> 
          <template #fallback>
            <p>Loading...</p>
          </template>
      </Suspense>-->
      <router-link
        :to="{ name: 'vacations.edit', params: { vacationID: vacationsdata.id } }"
        class="text-gray-500 hover:text-blue-500 mx-2"
      >
        <i
          class="font-bold transition duration-200 ease-in-out material-icons-outlined md:text-md"
          >edit</i
        >
      </router-link>
      <a
        @click="deleteVacation(vacationsdata.id)"
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
import useVacations from "../../composables/Vacations";
//import { defineAsyncComponent } from 'vue'
import { useKeycloak } from "@baloise/vue-keycloak";

const { hasRoles } = useKeycloak();
export default {
  name: "Vacation",
  components: {
   // VacationEdit: defineAsyncComponent(() =>
   //   import('../vacationform/VacationEdit.vue'),
   // ),
  },
  props: {
    vacationsdata: {
      type: Object,
      require: true,
    },
  },

  setup() {
    const { deleteVacation } = useVacations();
    let editDivision=false;
    return {
      deleteVacation, editDivision,
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