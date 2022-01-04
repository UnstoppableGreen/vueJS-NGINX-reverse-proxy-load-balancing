<script>
//import  useStatuses  from '../../composables/Statuses'
import { reactive } from "@vue/reactivity";
import { onMounted } from "@vue/runtime-core";
import useOrder from "../../composables/Orders";
//import treeItem from '../orderform/treeItem';
//import axios from 'axios'
import {TreeView} from "vue-json-tree-view"
//import { JSONView } from 'vue-json-component';
export default {
  name: "OrderInfo",
  components: {
   'tree-view':TreeView,
   //'json-view': JSONView
    },
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
let orderdata1 = reactive({
  "orderID": 108,
  "client": "Sam",
  "status": "test",
  "creationDate": "2021-12-31T00:00:00.000+00:00",
  "lastUpdateOn": "2021-12-31T00:00:00.000+00:00",
  "itemsStructures": [
    {
      "id": 154,
      "name": "ПРОЦЕССОР",
      "child": []
    },
    {
      "id": 117,
      "name": "МАТЕРИНСКАЯ ПЛАТА",
      "child": []
    },
    {
      "id": 118,
      "name": "БЛОК ПИТАНИЯ",
      "child": []
    },
    {
      "id": 159,
      "name": "3 КОМПЬЮТЕРА+МАТЕРИНСКАЯ ПЛАТА",
      "child": [
        {
          "id": 117,
          "name": "МАТЕРИНСКАЯ ПЛАТА",
          "qty": 1,
          "child": []
        },
        {
          "id": 155,
          "name": "КОМПЬЮТЕР",
          "qty": 3,
          "child": [
            {
              "id": 117,
              "name": "МАТЕРИНСКАЯ ПЛАТА",
              "qty": 1,
              "child": []
            },
            {
              "id": 118,
              "name": "БЛОК ПИТАНИЯ",
              "qty": 2,
              "child": []
            },
            {
              "id": 154,
              "name": "ПРОЦЕССОР",
              "qty": 2,
              "child": []
            }
          ]
        }
      ]
    }
  ]
});

      console.log(orderdata1);
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
            <p>{{JSON.stringify(orderdata)}}</p>
            
           <template> <div> <tree-view :data="orderdata1" :options="{maxDepth: 3}"/> </div></template> 
           <!-- <template>
            <json-view :data="orderdata" />
          </template>  -->
        </div>
      </div>    
    </div>
  </div>
</div>
</template>

<style scoped>
.tree-view-item {
  font-family: monospace;
  font-size: 14px;
  margin-left: 18px;
}

.tree-view-wrapper {
  overflow: auto;
}

/* Find the first nested node and override the indentation */
.tree-view-item-root > .tree-view-item-leaf > .tree-view-item {
  margin-left: 0;
}

/* Root node should not be indented */
.tree-view-item-root {
  margin-left: 0;
}

.tree-view-item-node {
  cursor: pointer;
  position: relative;
  white-space: nowrap;
}

.tree-view-item-leaf {
  white-space: nowrap;
}

.tree-view-item-key {
  font-weight: bold;
}

.tree-view-item-key-with-chevron {
  padding-left: 14px;
}


.tree-view-item-key-with-chevron.opened::before {
    top:4px;
    transform: rotate(90deg);  
    -webkit-transform: rotate(90deg);
}

.tree-view-item-key-with-chevron::before {
    color: #444;
    content: '\25b6';
    font-size: 10px;
    left: 1px;
    position: absolute;
    top: 3px;
    transition: -webkit-transform .1s ease;
    transition: transform .1s ease;
    transition: transform .1s ease, -webkit-transform .1s ease;
    -webkit-transition: -webkit-transform .1s ease;
}

.tree-view-item-hint {
  color: #ccc
}
</style>