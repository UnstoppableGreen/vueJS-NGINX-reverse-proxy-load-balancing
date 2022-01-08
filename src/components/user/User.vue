<template>
  <tr>
    <td class="px-5 py-5 border-gray-200 bg-white text-sm cursor-pointer">
      <div class="flex items-center">
        <div class="flex-shrink-0 w-10 h-10">
          <!--  <img class="w-full h-full rounded-full"
                        :src="userdata.avatar"
                        alt="" /> -->
        </div>
        <div class="ml-2 text-sm">
          <p class="md:text-base text-gray-900 whitespace-pre">
            {{ userdata.name }}
          </p>
        </div>
      </div>
    </td>

    <td class="py-5 bg-white text-sm">
      <p class="md:text-base text-gray-900 whitespace-no-wrap">
        {{ userdata.contacts }}
      </p>
    </td>
    <td class="py-5 bg-white text-sm">
      <p class="md:text-base text-gray-900 whitespace-no-wrap">
        {{ userdata.address }}
      </p>
    </td>
    <td class="py-5 bg-white text-sm">
      <p class="md:text-base text-gray-900 whitespace-no-wrap">
        {{ userdata.date }}
      </p>
    </td>
    <td
      class="hidden md:table-cell text-center md:pl-1 md:py-5 bg-white text-sm"
    >
      <router-link
        :to="{ name: 'user.edit', params: { clientID: userdata.clientID } }"
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
          >manage_accounts</i
        >
      </router-link>
      <a
        @click="deleteUser(userdata.clientID)"
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
          >person_remove</i
        >
      </a>
    </td>
  </tr>
</template>

<script>
import useUser from "../../composables/Users";

export default {
  name: "User",
  props: {
    userdata: {
      type: Object,
      require: true,
    },
  },
  setup() {
    const { deleteUser } = useUser();
    return {
      deleteUser,
    };
  },
};
</script>

<style scoped>
td {
  width: 8%;
}
</style>