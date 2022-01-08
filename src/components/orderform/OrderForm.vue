<template style="max-width:600px">
   <div style="margin:0 25% 0 25%; width:50%;" class=" z-0 flex items-center justify-center mb-8 py-7 md:py-12 px-4 sm:px-6 lg:px-8 items-center">
	<div class="flex w-full space-y-8 p-4 bg-gray-100 rounded-xl shadow-lg z-10">
      <div class="grid gap-8 grid-cols-1">
        <div class="flex flex-col">
          <div class="flex flex-col sm:flex-row items-center">
            <h2 v-if="!orderID" class="font-semibold text-lg mr-auto">
              Создание заказа
            </h2>
            <h2 v-else class="font-semibold text-lg mr-auto">
              Изменение заказа
            </h2>
            <div class="w-full sm:w-auto sm:ml-auto mt-3 sm:mt-0"></div>
          </div>
          <form @submit.prevent="saveOrder" class="mt-5">
            <div class="form">
              <div class="md:flex flex-row md:space-x-4 w-full text-xs">
                <div class="mb-3 space-y-2 w-full text-xs">
					<label  class="font-semibold text-gray-600 py-0">Выберите статус: </label>
					<input type="text" v-model="orderdata.statusID" list="json-datalist-status">
					<datalist id="json-datalist-status">
						<option v-for="st in orderstatuses" :key="st.id" :value="st.id">{{st.name}}</option>
					</datalist>
                </div>
              </div>

              <div class="md:flex flex-row md:space-x-4 w-full text-xs">
                <div class="mb-0 space-y-2 w-full text-xs">
					<label  class="font-semibold text-gray-600 py-0">Выберите клиента: </label>
					<input type="text" v-model="orderdata.clientID" list="json-datalist-clients">
					<datalist id="json-datalist-clients">
						<option v-for="cl in clients" :key="cl.clientID" :value="cl.clientID">{{cl.name}}</option>
					</datalist>
                </div>
              </div>
				<label class="font-semibold text-gray-600 py-0">Состав заказа</label>
				<div class="inline-block min-w-full shadow md:shadow-xl md:pl-2 pt-0 rounded-lg overflow-hidden" >
				
				<div class="md:flex md:flex-row md:space-x-4 w-full text-xs">
					<!--<label for="ajax-item">Выберите деталь: </label>
					<p>
                    <input
                      v-model="itemID"
                      type="text"
                      id="ajax-item"
                      list="json-datalist-item"
                      placeholder="выберите деталь"
                    />
                    <datalist id="json-datalist-item"></datalist>
					</p><input v-model="itemID"  class="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded-lg h-10 px-4" type="text">
					-->
					<div class="w-full flex flex-col mb-0">
						<label class="font-semibold text-gray-600 py-0">Выберите деталь:</label>
						<input type="text" v-model="item" list="json-datalist-items">
						<datalist id="json-datalist-items">
							<option v-for="it in items" :key="it.id" :value="it.id">{{it.name}}</option>
						</datalist>
					</div>
				
					<div class="w-full flex flex-col mb-0">
						<label class="font-semibold text-gray-600 py-0">Количество</label>
						<input v-model="qty" class="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded-lg h-10 px-4" type="number" min="0" max="999999" maxlength="6" title="Введите количество">
					</div>
				</div> 
				<div class="md:flex md:flex-row md:space-x-0 w-full text-xs">
					<div class="w-full flex flex-col mb-0">
						<label class="font-semibold text-gray-600 py-0">Комментарий</label>
						<input v-model="comments"  class="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded-lg h-10 px-4" type="text">
					</div>
				</div>
				
				
				</div>
				<div class="scroll-table">
				<button v-on:click.prevent="fAddNewRow" title="Добавить строку в таблицу">+</button>
					<table>
					<thead> <!-- Заголовок таблицы -->
						<tr> 
						<th style="text-align:left; max-width:10px">№</th>
						<th style="text-align:left">itemID</th>
						<th style="text-align:left">Количество</th>
						<th style="text-align:left">Комментарий</th>
						<th style="text-align:center">Х</th>
						</tr>
					</thead>
					</table>
					<div class="scroll-table-body">
					<table>
					<tbody> 
						<tr v-for="(entry, index) in orderdata.orderDetails"
						:key="index" style="max-width:10px"> 
						<td style="text-align:left"><b>{{index + 1}}</b></td> 
						<td> {{entry['itemID']}} </td>
						<td>{{entry['qty']}}</td> 
						<td>{{entry['comments']}}</td> 
						<td><button class="b20" v-on:click.prevent="fDeleteRow(index)" title="Удалить строку">-</button></td> 
						</tr>
					</tbody> 
					</table>
					</div>
				</div>
              <!--<p> ответ {{JSON.stringify(orderdata.orderDetails)}} </p>-->
              <div
                class="mt-5 text-right md:space-x-3 md:block flex flex-col-reverse"
              >
                <button
                  type="submit"
                  v-if="!orderID"
                  class="transition duration-200 ease-in-out mb-2 md:mb-0 bg-green-400 px-5 py-2 text-sm shadow-sm font-medium tracking-wider text-white rounded-full hover:shadow-lg hover:bg-green-600"
                >
                  Создать
                </button>
                <button
                  v-else
                  class="transition duration-200 ease-in-out mb-2 md:mb-0 bg-green-400 px-5 py-2 text-sm shadow-sm font-medium tracking-wider text-white rounded-full hover:shadow-lg hover:bg-green-600"
                >
                  Обновить
                </button>
              </div>
            </div>
           <button @click="this.$router.push('/orders')" class="mb-2 md:mb-0 bg-white px-5 py-2 text-sm shadow-sm font-medium tracking-wider border text-gray-600 rounded-full hover:shadow-lg hover:bg-gray-100"> Назад </button> 
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
//import  useStatuses  from '../../composables/Statuses'
import { reactive } from "@vue/reactivity";
import { onMounted } from "@vue/runtime-core";
import useOrder from "../../composables/Orders";
import useUser from "../../composables/Users";
import useItems from "../../composables/Items";
import useStatuses from "../../composables/Statuses";
import { ref } from '@vue/reactivity';
//import Detail from "../orders/Detail.vue";
//import axios from 'axios'

//const { usersdata, getAllClientData } = useUser();
let clients=ref([])
let orderstatuses=ref([])
let items=ref([])
let orderdata = reactive({
  clientID: "",
  statusID: "",
  orderDetails: [],
});
export default {	
  name: "OrderForm",
  /*components: {
    Detail,
  },*/
  props: {
    orderID: {
      required: true,
      type: String,
    },
  },
	data: function(){
		const { usersdata, getAllClientData } = useUser();
		const { statuses, getStatuses } = useStatuses();
		const { itemsalldata, getAllItemsData } = useItems();
		onMounted(getAllClientData());
		clients = usersdata;
		onMounted(getStatuses());
		orderstatuses = statuses;
		onMounted(getAllItemsData());
		items = itemsalldata;
		return{
			clients,
			orderstatuses,
			items,
			itemID : null,
			qty : 1,
			comments:""
			//[{"id":34,"itemID":9,"qty":10,"comments":"string"},{"id":36,"itemID":11,"qty":10,"comments":"string"}]
		}
	},
  setup(props) {
    const { order, getOrderById, storeOrder, updateOrder } = useOrder();
	
    if (props.orderID) {
		onMounted(getOrderById(props.orderID));
		orderdata = order;
    }


    const saveOrder = async () => {
      props.orderID
        ? await updateOrder({ ...orderdata })
        : await storeOrder({ ...orderdata });
    };

    return {
		orderdata,
		saveOrder,
    };
	},
	/*data: function() {
		return {
			itemID : null,
			qty : 1,
			comments:"string"
			//[{"id":34,"itemID":9,"qty":10,"comments":"string"},{"id":36,"itemID":11,"qty":10,"comments":"string"}]
		}
	},*/
  methods: {
    fAddNewRow: function () { // Добавить новую строку в таблицу
    if (orderdata['orderDetails']!==undefined) {
        orderdata['orderDetails'].push({"id":0,"itemID":this.item,"qty":this.qty,"comments":this.comments});
    }
    else {orderdata['value']['orderDetails'].push({"id":0,"itemID":this.item,"qty":this.qty,"comments":this.comments});}
    },
    fDeleteRow: function (ind) { // Удалить строку с номером index из таблицы
    if (orderdata['orderDetails']!==undefined) {
      orderdata['orderDetails'].splice(ind, 1);
     }
    else {
      orderdata['value']['orderDetails'].splice(ind, 1);
    }
    }
    
  }
};

// eslint-disable-next-line no-unused-vars


</script>

<style scoped>

.scroll-table-body {
	height: 150px;
	overflow-x: auto;
	margin-top: 0px;
	margin-bottom: 20px;
	border-bottom: 1px solid #eee;
}
.scroll-table table {
	width:100%;
	table-layout: fixed;
	border: none;
}

.scroll-table tbody td {
	text-align: left;
	border-left: 1px solid #ddd;
	border-right: 1px solid #ddd;
	padding: 10px 15px;
	font-size: 14px;
	vertical-align: top;
}
.scroll-table tbody tr:nth-child(even){
	background: #f3f3f3;
}
 
/* Стили для скролла */
::-webkit-scrollbar {
	width: 6px;
} 
::-webkit-scrollbar-track {
	box-shadow: inset 0 0 6px rgba(0,0,0,0.3); 
} 
::-webkit-scrollbar-thumb {
	box-shadow: inset 0 0 6px rgba(0,0,0,0.3); 
}

*,
*:before,
*:after {
  -moz-box-sizing: border-box;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
}
h1 {
  margin-top: 0;
}

label {
  display: block;
  margin-top: 2em;
  margin-bottom: 0.5em;
  color: #999999;
}

input {
  width: 100%;
  padding: 0.5em 0.5em;
  font-size: 1.2em;
  border-radius: 3px;
  border: 1px solid #d9d9d9;
}

button {
  display: inline-block;
  border-radius: 3px;
  border: none;
  font-size: 0.9rem;
  padding: 0.5rem 0.8em;
  background: #69c773;
  border-bottom: 1px solid #498b50;
  color: white;
  -webkit-font-smoothing: antialiased;
  font-weight: bold;
  margin: 0;
  width: 100%;
  text-align: center;
}

button:hover,
button:focus {
  opacity: 0.75;
  cursor: pointer;
}

button:active {
  opacity: 1;
  box-shadow: 0 -3px 10px rgba(0, 0, 0, 0.1) inset;
}

body,
input {
  /* Настройка шрифта */
  font-family: Helvetica Neue, Arial, sans-serif;
  font-size: 14px;
  color: #106070;
}

table {
  /* Параметры таблицы */
  width: 430px;
  margin: auto;
  border: 2px solid #308090;
  border-radius: 3px;
  background-color: #fff;
}

th,
td {
  /* Общие параметры заголовка и строк */
  min-width: 20px;
  padding: 10px 10px;
}

th {
  /* Параметры заголовка */
  background-color: #308090;
  color: #ffffff;
  cursor: default;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

td {
  /* Параметры строк */
  background-color: #f3f8f9;
}

.b20 {
  /* Параметры кнопок */
  cursor: pointer;
  width: 30px;
  margin: 0 calc(50% - 15px);
  text-align: center;
}

.th60 {
  /* Параметры полей ввода */
  width: 40px;
  margin: 0 calc(50% - 40px);
}

.th180 {
  /* Параметры полей ввода */
  width: 180px;
}

.thAm {
  /* Параметры поля "Сумма" */
  font-weight: bold;
  border: 1px solid #a9a9a9;
  background-color: #f3f8f9;
}

/* Настройка цвета placeholder */
::-webkit-input-placeholder {
  color: #a9a9a9;
}
::-moz-placeholder {
  color: #a9a9a9;
}
:-moz-placeholder {
  color: #a9a9a9;
}
:-ms-input-placeholder {
  color: #a9a9a9;
}

/* Скрытие placeholder когда поле в фокусе */
:focus::-webkit-input-placeholder {
  color: transparent;
}
:focus::-moz-placeholder {
  color: transparent;
}
:focus:-moz-placeholder {
  color: transparent;
}
:focus:-ms-input-placeholder {
  color: transparent;
}

</style>
