<template>
  <tr>
		<td class=" py-5  bg-white text-sm">
            <p class=" md:text-base text-gray-900 whitespace-no-wrap">
                {{medicalOrganizationsdata.id}}
            </p>
        </td>
		<td class=" py-5  bg-white text-sm">
            <p class=" md:text-base text-gray-900 whitespace-no-wrap">
                {{medicalOrganizationsdata.name}}
            </p>
        </td>
		<td class=" py-5  bg-white text-sm">
            <p class=" md:text-base text-gray-900 whitespace-no-wrap">
                {{medicalOrganizationsdata.contacts}}
            </p>
        </td>
		<td class=" py-5  bg-white text-sm">
            <p class=" md:text-base text-gray-900 whitespace-no-wrap">
                {{medicalOrganizationsdata.address}}
            </p>
        </td>
    <td v-if="checkRole('changeReferences')" class="hidden md:table-cell text-center md:pl-1 md:py-5  bg-white text-sm">
			<router-link :to="{name:'medicalOrganizations.edit', params: {medicalOrganizationID: medicalOrganizationsdata.id }} " class="text-gray-500  hover:text-blue-500  mx-2">
				<i class="font-bold transition duration-200 ease-in-out material-icons-outlined md:text-md">edit</i>
			</router-link>
            <a @click="deleteMedicalOrganization(medicalOrganizationsdata.id)" class="text-gray-500 cursor-pointer ml-2">
				<i class="transition duration-200 ease-in-out material-icons-round text-gray-500 hover:text-blue-500 md:text-md">delete</i>
            </a>
        </td>
  </tr>
</template>

<script>
import useMedicalOrganization from "../../composables/MedicalOrganization";
import { useKeycloak } from "@baloise/vue-keycloak";

const { hasRoles } = useKeycloak();
export default {
  name: "MedicalOrganization",
  props: {
    medicalOrganizationsdata: {
      type: Object,
      require: true,
    },
  },
  setup() {
    const { deleteMedicalOrganization } = useMedicalOrganization();
    return {
      deleteMedicalOrganization,
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