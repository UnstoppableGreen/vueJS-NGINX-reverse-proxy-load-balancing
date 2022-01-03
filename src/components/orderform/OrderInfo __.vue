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
            <h2  class="font-semibold text-lg mr-auto">
              Информация о заказе
            </h2>


    <!-- the demo root element -->
          <ul id="demo">
            <tree-item
              class="item"
              :item="treeData"
              @make-folder="makeFolder"
              @add-item="addItem"
            ></tree-item>
          </ul>
          <div class="w-full sm:w-auto sm:ml-auto mt-3 sm:mt-0"></div>
          </div>
            <div class="form">

              <div
                class="inline-block min-w-full shadow md:shadow-xl md:pl-4 pt-6 rounded-lg overflow-hidden"
              >
              </div>

            </div>

        </div>
      </div>
    </div>
  </div>
</template>
    <script>
      // define the tree-item component
      Vue.component("tree-item", {
        template: "#item-template",
        props: {
          item: Object
        },
        data: function() {
          return {
            isOpen: false
          };
        },
        computed: {
          isFolder: function() {
            return this.item.children && this.item.children.length;
          }
        },
        methods: {
          toggle: function() {
            if (this.isFolder) {
              this.isOpen = !this.isOpen;
            }
          },
          makeFolder: function() {
            if (!this.isFolder) {
              this.$emit("make-folder", this.item);
              this.isOpen = true;
            }
          }
        }
      });

      // boot up the demo
      var demo = new Vue({
        el: "#demo",
        data: {
          treeData: treeData
        },
        methods: {
          makeFolder: function(item) {
            Vue.set(item, "children", []);
            this.addItem(item);
          },
          addItem: function(item) {
            item.children.push({
              name: "new stuff"
            });
          }
        }
      });
    </script>

<!-- item template -->
<script type="text/x-template" id="item-template">
              <li>
                <div
                  :class="{bold: isFolder}"
                  @click="toggle"
                  @dblclick="makeFolder">
                  {{ item.name }}
                  <span v-if="isFolder">[{{ isOpen ? '-' : '+' }}]</span>
                </div>
                <ul v-show="isOpen" v-if="isFolder">
                  <tree-item
                    class="item"
                    v-for="(child, index) in item.children"
                    :key="index"
                    :item="child"
                    @make-folder="$emit('make-folder', $event)"
                    @add-item="$emit('add-item', $event)"
                  ></tree-item>
                  <li class="add" @click="$emit('add-item', item)">+</li>
                </ul>
              </li>
            </script>
<script>
//import  useStatuses  from '../../composables/Statuses'
import { reactive } from "@vue/reactivity";
import { onMounted } from "@vue/runtime-core";
import useOrder from "../../composables/Orders";
//import axios from 'axios'
export default {
  name: "OrderInfo",
  props: {
    orderID: {
      required: true,
      type: String,
    },
  },
  setup(props) {
    const { orderInfo, getOrderInfo} = useOrder();
    if (props.orderID) {
      onMounted(getOrderInfo(props.orderID));
      orderdata = orderInfo;
    }
    return {
      orderdata,
    };
  },
};
// eslint-disable-next-line no-unused-vars
let orderdata = reactive({

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

.item {
  cursor: pointer;
}
.bold {
  font-weight: bold;
}
ul {
  padding-left: 1em;
  line-height: 1.5em;
  list-style-type: dot;
}
</style>
