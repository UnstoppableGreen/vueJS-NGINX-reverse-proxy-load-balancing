<template>

<div class=" delay-75 duration-500 ease-in-out hover:bg-gray-200 z-30 bg-gray-100  uppercase font-semibold rounded-lg flex xl:flex-col  shadow-lg border-gray-600 justify-around xl:h-screen xl:w-16 fixed w-screen bottom-0">
    <div class="text-sm "> {{username}} </div>
    <router-link to='/home' class="md:p-5 p-5 delay-75 duration-200 ease-in-out transform hover:scale-125  cursor-pointer">
        <svg xmlns="http://www.w3.org/2000/svg" class="text-black h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
    </router-link>

	
	<router-link to="/clients" class="hover:shadow-md p-3   md:p-2 rounded-full duration-1000 ease-in-out transform hover:scale-125 delay-200  hover:bg-blue-300 hover:text-3xl font-bold text-center cursor-pointer ">
        <span class="p-3    xl:mr-7 material-icons-outlined">
            people
        </span>
    </router-link>
	
		<!-- заказы-->
	<router-link to="/orders" class="hover:shadow-md p-3   md:p-2 rounded-full duration-1000 ease-in-out transform hover:scale-125 delay-200  hover:bg-blue-300 hover:text-3xl font-bold text-center cursor-pointer ">
        <span class="material-icons-outlined">
            view_list 
        </span>
    </router-link> 
	

	<!-- итемы-->
	<router-link to="/items" class="hover:shadow-md p-3   md:p-2 rounded-full duration-1000 ease-in-out transform hover:scale-125 delay-200  hover:bg-blue-300 hover:text-3xl font-bold text-center cursor-pointer ">
        <span class="material-icons-outlined">
           category 
        </span>
    </router-link> 

	<!--отгрузки клиентам-->
	<router-link to="/shipments" class="hover:shadow-md p-3   md:p-2 rounded-full duration-1000 ease-in-out transform hover:scale-125 delay-200  hover:bg-blue-300 hover:text-3xl font-bold text-center cursor-pointer ">
        <span class="material-icons-outlined">
            pending_actions 
        </span>
    </router-link>
	
	<!--запросы к поставщикам-->
	<router-link to="/requests" class="hover:shadow-md p-3   md:p-2 rounded-full duration-1000 ease-in-out transform hover:scale-125 delay-200  hover:bg-blue-300 hover:text-3xl font-bold text-center cursor-pointer ">
		<span class="material-icons-outlined">
            work
        </span>
    </router-link>

    <!--поставщики-->
	<router-link to="/suppliers" class="hover:shadow-md p-3   md:p-2 rounded-full duration-1000 ease-in-out transform hover:scale-125 delay-200  hover:bg-blue-300 hover:text-3xl font-bold text-center cursor-pointer ">
		<span class="material-icons-outlined">
            inventory_2
        </span>
    </router-link>

    <!--траспортные компании-->
	<router-link to="/carriers" class="hover:shadow-md p-3   md:p-2 rounded-full duration-1000 ease-in-out transform hover:scale-125 delay-200  hover:bg-blue-300 hover:text-3xl font-bold text-center cursor-pointer ">
		<span class="material-icons-outlined">
            luggage
        </span>
    </router-link>
    <!--справочники-->
	<router-link to="/human-resources" class="hover:shadow-md p-3   md:p-2 rounded-full duration-1000 ease-in-out transform hover:scale-125 delay-200  hover:bg-blue-300 hover:text-3xl font-bold text-center cursor-pointer ">
		<span class="material-icons-outlined">
        workspaces
        </span>
    </router-link>
	
    <div @click="logout" class="md:p-5 p-5 delay-75 duration-200 ease-in-out transform hover:scale-125 cursor-pointer">
        <span class="material-icons font-md">
            power_settings_new
        </span>

    </div>

</div>
</template>

<script>
import { useKeycloak } from '@baloise/vue-keycloak';
export default {
        setup() {
            const {keycloak,username} = useKeycloak()

            const logout= ()  => {
                    keycloak.logout({"redirectUri":"http://localhost:8081/logout.html"})
            };
        return {keycloak,username,logout};
        },
}
</script>






