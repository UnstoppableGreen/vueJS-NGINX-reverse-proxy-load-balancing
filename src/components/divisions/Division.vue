<template>
  <tr>
		<td class=" py-5  bg-white text-sm">
            <p class=" md:text-base text-gray-900 whitespace-no-wrap">
                {{divisionsdata.id}}
            </p>
        </td>
		<td class=" py-5  bg-white text-sm">
            <p class=" md:text-base text-gray-900 whitespace-no-wrap">
                {{divisionsdata.name}}
            </p>
        </td>
    <td class="hidden md:table-cell text-center md:pl-1 md:py-5  bg-white text-sm">
			<router-link :to="{name:'division.edit', params: {divisionID: divisionsdata.id }} " class="text-gray-500  hover:text-blue-500  mx-2">
				<i class="font-bold transition duration-200 ease-in-out material-icons-outlined md:text-md">edit</i>
			</router-link>
            <a @click="deleteDivision(divisionsdata.id)" class="text-gray-500 cursor-pointer ml-2">
				<i class="transition duration-200 ease-in-out material-icons-round text-gray-500 hover:text-blue-500 md:text-md">delete</i>
            </a>
        </td>
  </tr>
</template>

<script>
import useDivision from "../../composables/Divisions";

export default {
  name: "Division",
  props: {
    divisionsdata: {
      type: Object,
      require: true,
    },
  },
  setup() {
    const { deleteDivision } = useDivision();
    return {
      deleteDivision,
    };
  },
};
</script>

<style scoped>
td {
  width: 8%;
}
</style>