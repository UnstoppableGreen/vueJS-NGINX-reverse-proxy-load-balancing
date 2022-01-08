<template>
<div class="z-999 search-container flex justify-between md:ml-8 py-2">
    <div class="search-contain relative"><input @keydown="isSearch=true" v-model="search" type="text" class="transition duration-200  ease-in-out bg-gray-200 h-10  pr-8 pl-5 rounded z-0 focus:bg-gray-100 focus:outline-none search-input" placeholder="Search Item...">
        <span class="absolute md:text-2xl material-icons search-icon">search</span>
        <div v-show="isSearch" class="search-list  absolute bg-white text-sm shadow-lg">
            <transition-group name='list'>
                <div class="transition duration-200  ease-in-out cursor-pointer hover:bg-blue-200 p-1 md:p-2 border-t-2 border-gray-100" v-for="item in searchedList" :key="item.id">
                    <div class="flex py-2">
                        <div class="px-5">
							{{`${item.name}`}}
                        </div>
						<router-link :to="{name:'item.edit', params: {itemID: item.id }} " class="text-gray-500  hover:text-blue-500  mx-2">
							<i class="font-bold transition duration-200 ease-in-out material-icons-outlined md:text-md">manage_accounts</i>
						</router-link>
                    </div>

                </div>

            </transition-group>

        </div>
    </div>

</div>
</template>

<script>
import {
    ref,
    onMounted,
    computed
} from '@vue/runtime-core'
import useItem from '../../composables/Items'
export default {
    name:'Search Item',
    setup() {

        const search = ref('')
        const isSearch = ref(false)
		const {EntireItemsList,getEntireItemsList} = useItem()
       
       const searchedList = computed(() => {
            return EntireItemsList.value.filter(item =>
                `${item.name}`.toLowerCase().includes(search.value.toLowerCase())
            )
        })

        onMounted(getEntireItemsList)

        return {
            search,
            searchedList,
            isSearch,

        }
    }
}
</script>

<style scoped>
.search-container {
    display: flex;
    flex-direction: row-reverse;
    justify-content: center;
    width: 100vw;

}

.search-contain {
    width: 80%;
}

.search-input {
    display: relative;
    width: 40%;
}

.search-icon {
    top: 12%;
    left: 37%;
    cursor: pointer;
}

.search-list {
    top: 100%;
    left: 0%;
    width: 40%;
    max-height: 200px;
    overflow-x: hidden;
}

.list-enter-active {
    animation: add-item .8s;
}

.list-leave-active {
    animation: add-item .8s reverse;
}

.list-move {
    transition: transform .8s;
}

/* Scrollbar Styling */
::-webkit-scrollbar {
    width: 5px;
}

::-webkit-scrollbar-track {
    background-color: #ebebeb;
    -webkit-border-radius: 10px;
    border-radius: 10px;
}

::-webkit-scrollbar-thumb {
    -webkit-border-radius: 10px;
    border-radius: 10px;
    background: #888888;
}

@keyframes add-item {
    0% {
        opacity: 0;
        transform: translateX(100px);
    }

    100% {
        opacity: 1;
        transform: translateX(0px);
    }
}

@media screen and (max-width:820px) {
    .search-input {
        width: 90%;
        height: 30px;
        margin-left: 0.4rem;

    }

    .search-icon {
        top: 5%;
        left: 83%;
    }

    .search-list {
        left: 4%;
        width: 90%;
        max-height: 200px;
        overflow-x: hidden;
    }

}
</style>
