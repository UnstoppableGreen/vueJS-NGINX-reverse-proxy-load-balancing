<template style="max-width:768px">
  <div
    class="flex w-full z-0 flex items-center justify-center mb-8 py-7 md:py-12 px-4 sm:px-6 lg:px-8 items-center"
  >
    <div width = "300"
      class="space-y-8 p-4 bg-gray-100 rounded-xl shadow-lg z-10" 
    >
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
                  <label for="ajax">Выберите статус: </label>
                  <p>
                    <input
                      v-model="orderdata.statusID"
                      type="text"
                      id="ajax"
                      list="json-datalist"
                      placeholder="выберите статус"
                    />
                    <datalist id="json-datalist"></datalist>
                  </p>
                </div>
              </div>

              <div class="md:flex flex-row md:space-x-4 w-full text-xs">
                <div class="mb-0 space-y-2 w-full text-xs">
                  <label for="ajax">Выберите клиента: </label>
                  <p>
                    <input
                      v-model="orderdata.clientID"
                      id="ajax-clients"
                      list="json-datalist-clients"
                      placeholder="выберите клиента"
                    />
                    <datalist id="json-datalist-clients"></datalist>
                  </p>
                </div>
              </div>
				<label class="font-semibold text-gray-600 py-0">Состав заказа</label>
				<div class="inline-block min-w-full shadow md:shadow-xl md:pl-2 pt-0 rounded-lg overflow-hidden" >
				
				<div class="md:flex md:flex-row md:space-x-4 w-full text-xs">
					<div class="w-full flex flex-col mb-0">
						<label class="font-semibold text-gray-600 py-0">itemID</label>
						<input v-model="itemID"  class="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded-lg h-10 px-4" type="text">
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
				<div id="lvTable">
				<button v-on:click.prevent="fAddNewRow" title="Добавить строку в таблицу">+</button>
					<table>
					<thead> <!-- Заголовок таблицы -->
						<tr> 
						<th style="text-align:left">№</th>
						<th style="text-align:left">itemID</th>
						<th style="text-align:left">Количество</th>
						<th style="text-align:left">Комментарий</th>
						<th style="text-align:left">Х</th>
						</tr>
					</thead>
					<tbody> 
						<tr v-for="(entry, index) in orderdata.orderDetails"
						:key="index"> 
						<td style="text-align:left"><b>{{index + 1}}</b></td> 
						<td> {{entry['itemID']}} </td>
						<td>{{entry['qty']}}</td> 
						<td>{{entry['comments']}}</td> 
						<td><button class="b20" v-on:click.prevent="fDeleteRow(index)" title="Удалить строку">-</button></td> 
						</tr>
					</tbody> 
					</table>
				</div>
              <p> ответ {{JSON.stringify(orderdata.orderDetails)}} </p>
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
//import { ref } from '@vue/reactivity';
//import Detail from "../orders/Detail.vue";
//import axios from 'axios'

//const tbData= ref([])
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
  setup(props) {
    const { order, getOrderById, storeOrder, updateOrder } = useOrder();
    if (props.orderID) {
		onMounted(getOrderById(props.orderID));
		orderdata = order;
		console.log("="+JSON.stringify(orderdata));
		//this.tbData = orderdata.orderDetails;
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
	data: function() {
		return {
			itemID : 0,
			qty : 1,
			comments:"string"
			//[{"id":34,"itemID":9,"qty":10,"comments":"string"},{"id":36,"itemID":11,"qty":10,"comments":"string"}]
		}
	},
  methods: {
    fAddNewRow: function () { // Добавить новую строку в таблицу
	//this.tbData.push({"id":34,"itemID":9,"qty":10,"comments":"string"});
	console.log("12-"+JSON.stringify(orderdata['value']['orderDetails']));
	orderdata['value']['orderDetails'].push({"id":0,"itemID":this.itemID,"qty":this.qty,"comments":this.comments});
	console.log("-"+JSON.stringify(orderdata['value']['orderDetails']));
      //this.tbData.push({ id: 0, itemID: this.itemID, qty: this.qty, comments: this.comments });
    },
    fDeleteRow: function (ind) { // Удалить строку с номером index из таблицы
		console.log("----" + ind);
		orderdata['value']['orderDetails'].splice(ind, 1);
		//var key = ind;
		//delete orderdata['value']['orderDetails'][ind];
	/*let detail ={
		id : 0;
		itemID : 111,
		qty : 111,
		comments:"string11"
		}
		orderdata.orderDetails.splice(index, 1);*/
      //this.tbData.splice(index, 1);
    }
  }
};

// eslint-disable-next-line no-unused-vars
let orderdata = reactive({
  clientID: "",
  statusID: "",
  orderDetails: [],
});


document.addEventListener("DOMContentLoaded", () => {
  // Создаем новый XMLHttpRequest.
  var input = document.getElementById("ajax");
  var request = new XMLHttpRequest();
  var dataList = document.getElementById("json-datalist");

  // Обрабатываем изменение состояния для запроса.
  // eslint-disable-next-line no-unused-vars
  request.onreadystatechange = function (response) {
    if (request.readyState === 4) {
      if (request.status === 200) {
        // Парсируем JSON
        var jsonOptions = JSON.parse(request.responseText);

        // Перебираем через цикл массив JSON.
        jsonOptions.forEach(function (item) {
          // Создаем новый элемент <option>.
          var option = document.createElement("option");
          // Устанавливаем значение, используя элементы массива JSON.
          let name = "Cтатус: " + item.name + " | ID: " + item.id;
          option.name = item.id;
          option.text = name;
          // Добавляем элемент <option> к <datalist>.
          dataList.appendChild(option);
        });

        // Обновляем текст заполнителя.
        input.placeholder = "e.g. datalist";
      } else {
        // Возникла ошибка :(
        input.placeholder = "Couldn'tload datalist options :(";
      }
    }
  };
  // Обновляем текст заполнителя.
  input.placeholder = "Loading options...";

  // Настраиваем и выполняем запрос.
  request.open("GET", "http://localhost:8080/status/getStatuses", true);
  request.send();

  // Создаем новый XMLHttpRequest.
  var inputClients = document.getElementById("ajax-clients");
  var requestClients = new XMLHttpRequest();
  var dataListClients = document.getElementById("json-datalist-clients");

  // Обрабатываем изменение состояния для запроса.
  // eslint-disable-next-line no-unused-vars
  requestClients.onreadystatechange = function (response) {
    if (requestClients.readyState === 4) {
      if (requestClients.status === 200) {
        // Парсируем JSON
        var jsonOptionsClients = JSON.parse(requestClients.responseText);

        // Перебираем через цикл массив JSON.
        jsonOptionsClients.forEach(function (item) {
          // Создаем новый элемент <option>.
          var option = document.createElement("option");
          // Устанавливаем значение, используя элементы массива JSON.
          let name = "Клиент: " + item.name + " | ID: " + item.clientID;
          option.name = item.clientID;
          option.text = name;
          // Добавляем элемент <option> к <datalist>.
          dataListClients.appendChild(option);
        });

        // Обновляем текст заполнителя.
        inputClients.placeholder = "e.g. datalist";
      } else {
        // Возникла ошибка :(
        inputClients.placeholder = "Couldn'tload datalist options :(";
      }
    }
  };
  // Обновляем текст заполнителя.
  inputClients.placeholder = "Loading options...";

  // Настраиваем и выполняем запрос.
  requestClients.open("GET", "http://localhost:8080/clients/getClients", true);
  requestClients.send();

  // Создаем новый XMLHttpRequest для листа итемов.
  var inputItems = document.getElementById("ajax-item");
  var requestItems = new XMLHttpRequest();
  var dataListItems = document.getElementById("json-datalist-item");

  // Обрабатываем изменение состояния для запроса.
  // eslint-disable-next-line no-unused-vars
  requestItems.onreadystatechange = function (response) {
    if (requestItems.readyState === 4) {
      if (requestItems.status === 200) {
        // Парсируем JSON
        var jsonOptionsItems = JSON.parse(requestItems.responseText);

        // Перебираем через цикл массив JSON.
        jsonOptionsItems.forEach(function (item) {
          // Создаем новый элемент <option>.
          var option = document.createElement("option");
          // Устанавливаем значение, используя элементы массива JSON.
          let name = item.name + " | ID: " + item.id;
          option.name = item.id;
          option.text = name;
          // Добавляем элемент <option> к <datalist>.
          dataListItems.appendChild(option);
        });

        // Обновляем текст заполнителя.
        inputItems.placeholder = "e.g. datalist";
      } else {
        // Возникла ошибка :(
        inputItems.placeholder = "Couldn'tload datalist options :(";
      }
    }
  };
  // Обновляем текст заполнителя.
  inputItems.placeholder = "Loading options...";

  // Настраиваем и выполняем запрос.
  requestItems.open("GET", "http://localhost:8080/items/getAllItems", true);
  requestItems.send();
});
</script>

<style scoped>
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
  width: 830px;
  margin: auto;
  border: 2px solid #308090;
  border-radius: 3px;
  background-color: #fff;
}

th,
td {
  /* Общие параметры заголовка и строк */
  min-width: 30px;
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
  width: 80px;
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
