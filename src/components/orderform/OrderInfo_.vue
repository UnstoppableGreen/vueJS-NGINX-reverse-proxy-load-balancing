<script>
//import  useStatuses  from '../../composables/Statuses'
import { reactive } from "@vue/reactivity";
import { onMounted } from "@vue/runtime-core";
import useOrder from "../../composables/Orders";
import treeItem from '../orderform/treeItem';
//import axios from 'axios'
export default {
  name: "OrderInfo",
  components: treeItem,
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
  data: function() {
    return {
      treeData: orderdata
    }
  },
  methods: {
    makeFolder: function(item) {
      item.children = [];
      this.addItem(item);
    },
    addItem: function(item) {
      item.children.push({
        name: "new stuff"
      });
    }
  }


};
// eslint-disable-next-line no-unused-vars
let orderdata = reactive({

});
</script>
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
            <div>{{JSON.stringify(orderdata)}}</div>
            <treeItem>
          <template type="text/x-template" id="item-template">
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
                  v-for="(child, index) in item.child"
                  :key="index"
                  :item="child"
                  @make-folder="$emit('make-folder', $event)"
                  @add-item="$emit('add-item', $event)"
                  ></tree-item>
                <li class="add" @click="$emit('add-item', item)">+</li>
              </ul>
            </li>
          </template>
            </treeItem>>
        </div>
      </div>
    </div>
  </div>
</div>
</template>