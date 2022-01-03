<template>
  <div
    class="z-0 flex items-center justify-center mb-8 py-7 md:py-12 px-4 sm:px-6 lg:px-8 items-center"
  >
    <div
      class="max-w-md w-full space-y-8 p-4 bg-gray-100 rounded-xl shadow-lg z-10"
    >
      <div class="grid gap-8 grid-cols-1">
        <div class="flex flex-col">
          <div class="flex flex-col sm:flex-row items-center">
            <h2 v-if="!itemID" class="font-semibold text-lg mr-auto">
              Создание детали
            </h2>
            <h2 v-else class="font-semibold text-lg mr-auto">
              Изменение детали
            </h2>
            <div class="w-full sm:w-auto sm:ml-auto mt-3 sm:mt-0"></div>
          </div>
          <form @submit.prevent="saveOrder" class="mt-5">
            <div class="form">
              <div
                class="inline-block min-w-full shadow md:shadow-xl md:pl-4 pt-6 rounded-lg overflow-hidden"
              >
                <tbody>
                  <tr>
                    <td class="py-5 bg-white text-sm">
                      <p class="md:text-base text-gray-900 whitespace-no-wrap">
                        ID детали
                      </p>
                    </td>

                    <td class="py-5 bg-white text-sm">
                      <p class="md:text-base text-gray-900 whitespace-no-wrap">
                        QTY
                      </p>
                    </td>
                  </tr>
                  <transition-group name="list">
                    <detail
                      v-for="detail in itemdata['itemDetails']"
                      :key="detail.id"
                      :itemdetail="detail"
                    ></detail>
                  </transition-group>
                </tbody>
              </div>
              <div
                class="mt-5 text-right md:space-x-3 md:block flex flex-col-reverse"
              >
                <button
                  type="submit"
                  v-if="!itemID"
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
import useItem from "../../composables/Items";
import Detail from "../items/Detail.vue";
//import axios from 'axios'
export default {
  name: "ItemForm",
  components: {
    Detail,
  },
  props: {
    itemID: {
      required: true,
      type: String,
    },
  },
  setup(props) {
    const {item, getItemById, storeItem, updateItem } = useItem();
    if (props.itemID) {
      onMounted(getItemById(props.itemID));
      itemdata = item;
    }

    const saveItem = async () => {
      props.itemID
        ? await updateItem({ ...itemdata })
        : await storeItem({ ...itemdata });
    };

    return {
      itemdata,
      saveItem,
    };
  },
};
// eslint-disable-next-line no-unused-vars
let itemdata = reactive({
  'id': "",
  'name': "",
  'defaultSupplierID': "",
  'orderdetails': [],
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
  width: 630px;
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
