<template>
  <tr>
		<td class=" py-5  bg-white text-sm">
            <p class=" md:text-base text-gray-900 whitespace-no-wrap">
                {{professionsdata.id}}
            </p>
        </td>
		<td class=" py-5  bg-white text-sm">
            <p class=" md:text-base text-gray-900 whitespace-no-wrap">
                {{professionsdata.name}}
            </p>
        </td>
    <td class="hidden md:table-cell text-center md:pl-1 md:py-5  bg-white text-sm">
			<router-link :to="{name:'professions.edit', params: {professionID: professionsdata.id }} " class="text-gray-500  hover:text-blue-500  mx-2">
				<i class="font-bold transition duration-200 ease-in-out material-icons-outlined md:text-md">edit</i>
			</router-link>
            <a @click="deleteProfession(professionsdata.id)" class="text-gray-500 cursor-pointer ml-2">
				<i class="transition duration-200 ease-in-out material-icons-round text-gray-500 hover:text-blue-500 md:text-md">delete</i>
            </a>
        </td>
  </tr>
</template>

<script>
import useProfessions from "../../composables/Professions";

export default {
  name: "Profession",
  props: {
    professionsdata: {
      type: Object,
      require: true,
    },
  },
  setup() {
    const { deleteProfession } = useProfessions();
    return {
      deleteProfession,
    };
  },
};
</script>

<style scoped>
td {
  width: 8%;
}
</style>