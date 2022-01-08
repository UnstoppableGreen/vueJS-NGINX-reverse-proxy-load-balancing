<template>
  <div class="z-0 flex items-center justify-center mb-8 py-7 md:py-12 px-4 sm:px-6 lg:px-8 items-center">
    <div class="max-w-md w-full space-y-8 p-4 bg-gray-100 rounded-xl shadow-lg z-10">
      <div class="grid gap-8 grid-cols-1">
        <div class="flex flex-col">
          <div class="flex flex-col sm:flex-row items-center">
            <h3  class="font-semibold text-lg mr-auto">
              Информация об отгрузке
            </h3>
			</div>  
			<br/>
        <h1  class=" text-lg mr-auto">
              ID отгрузки: {{shipmentdata.shipmentID}}
        </h1>
        <h1  class=" text-lg mr-auto">
              ID заказа: {{shipmentdata.orderID}}
        </h1>
        <h1  class=" text-lg mr-auto">
              Клиент: {{shipmentdata.clientID}}
        </h1>
        <h1  class=" text-lg mr-auto">
              Дата отправки: {{shipmentdata.shipmentDate}}
        </h1>
         <h1  class=" text-lg mr-auto">
              Ориентировочная дата доставки: {{shipmentdata.estimateDeliveryDate}}
        </h1>
        <h1  class=" text-lg mr-auto">
              Дата доставки: {{shipmentdata.deliveryDate}}
        </h1>
        <br>
        <h1  class=" text-lg mr-auto">
              Детали отгрузки
        </h1>  
              <div>
                <Tree id="my-tree-id" ref="my-tree-ref" :custom-options="myCustomOptions" :custom-styles="myCustomStyles" :nodes="shipmentdata['orderDetails']"></Tree>
              </div>
      </div>
      <button @click="this.$router.push('/shipments')" class="mb-2 md:mb-0 bg-white px-5 py-2 text-sm shadow-sm font-medium tracking-wider border text-gray-600 rounded-full hover:shadow-lg hover:bg-gray-100"> Назад </button>    
    </div>
    </div>
  </div>

</template>

<script>
import { reactive } from "@vue/reactivity";
import { onMounted } from "@vue/runtime-core";
import useShipments from "../../composables/Shipments";
import Tree from 'vuejs-tree';

export default {
	name: 'ShipmentInfo',
	components: {
		'Tree': Tree
	},
	props: {
		shipmentID: {
		required: true,
		type: String,
		},
	},
	setup(props) {
		const { shipmentInfo, getShipmentDetails} = useShipments();
		if (props.shipmentID) {
		onMounted(getShipmentDetails(props.shipmentID));
			shipmentdata = shipmentInfo;
      
		}
		return {
			shipmentdata,
		};
	},
	data: function() {
		return {
			treeDisplayData: shipmentdata['orderDetails']
		}
	},
};

let shipmentdata = reactive({
  shipmentID: "",
  orderID: "",
  clientID: "",
  shipmentDate: "",
  estimateDeliveryDate: "",
  deliveryDate:"",
  orderDetails: [],
});
console.log(shipmentdata['orderDetails']);
</script>


<style scoped>

</style>