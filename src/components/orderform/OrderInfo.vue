<template>
  <div class="z-0 flex items-center justify-center mb-8 py-7 md:py-12 px-4 sm:px-6 lg:px-8 items-center">
    <div class="max-w-md w-full space-y-8 p-4 bg-gray-100 rounded-xl shadow-lg z-10">
      <div class="grid gap-8 grid-cols-1">
        <div class="flex flex-col">
          <div class="flex flex-col sm:flex-row items-center">
            <h3  class="font-semibold text-lg mr-auto">
              Информация о заказе
            </h3>
			</div>  
			<br/>
        <h1  class=" text-lg mr-auto">
              ID заказа: {{orderdata.orderID}}
        </h1>
        <h1  class=" text-lg mr-auto">
              Статус: {{orderdata.status}}
        </h1>
        <h1  class=" text-lg mr-auto">
              Клиент: {{orderdata.client}}
        </h1>
        <br>
        <h1  class=" text-lg mr-auto">
              Детали заказа
        </h1>  
              <div>
                <Tree id="my-tree-id" ref="my-tree-ref" :custom-options="myCustomOptions" :custom-styles="myCustomStyles" :nodes="orderdata['itemsStructures']"></Tree>
              </div>
      </div>    
    </div>
    </div>
  </div>

</template>

<script>
import { reactive } from "@vue/reactivity";
import { onMounted } from "@vue/runtime-core";
import useOrder from "../../composables/Orders";
import Tree from 'vuejs-tree';

export default {
	name: 'OrderInfo',
	components: {
		'Tree': Tree
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
			console.log("ORDERDATA" + props.orderID +JSON.stringify(orderInfo));
		}
		return {
			orderdata,
		};
	},
	data: function() {
		return {
			treeDisplayData: orderdata['itemsStructures']
		}
	},
	/*data: function() {
		return {
		treeDisplayData: [
    {
      "id": 9,
      "text": "А",
      "state": {
        "checked": false,
        "selected": false,
        "expanded": false
      },
      "nodes": [
        {
          "id": 14,
          "text": "A1",
          "state": {
            "checked": false,
            "selected": false,
            "expanded": false
          },
          "qty": 2,
          "nodes": []
        }
      ]
    },
    {
      "id": 11,
      "text": "C",
      "state": {
        "checked": false,
        "selected": false,
        "expanded": false
      },
      "nodes": [
        {
          "id": 14,
          "text": "A1",
          "state": {
            "checked": false,
            "selected": false,
            "expanded": false
          },
          "qty": 4,
          "nodes": []
        }
      ]
    }
  ]
		
		};
	},*/
};

let orderdata = reactive({
  orderID: "",
  client: "",
  status: "",
  creationDate: "",
  lastUpdateOn: "",
  itemsStructures: [],
});
console.log(orderdata);

</script>


<style scoped>

</style>