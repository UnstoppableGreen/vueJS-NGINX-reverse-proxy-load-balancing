<template>
  <div class="container mx-auto pb-6 px-4 sm:px-8">
    <div class="py-8 md:py-4">
      <div class="-mx-4 sm:-mx-8 px-4 sm:px-8 py-6 overflow-x-auto">
        <div class="flex justify-between">
          <div>
            <p class="text-3xl font-bold">Добро пожаловать,</p>
            <p class="text-400 mt-2 mb-5">Logged in as {{ username }}</p>
            <a @click="logout" class="text-gray-500 cursor-pointer ml-2">
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
                >logout</i
              >
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useKeycloak } from "@baloise/vue-keycloak";
//const {keycloak} = useKeycloak()
export default {
  name: "Home",
  setup() {
    const { keycloak, username } = useKeycloak();

    const logout = () => {
      keycloak.logout({ redirectUri: "http://localhost:8081/logout.html" });
    };
    return { keycloak, username, logout };
  },
};
</script>
