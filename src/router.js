import { createRouter, createWebHistory } from "vue-router";
import UserIndex from './components/UserIndex'
import OrderIndex from './components/OrderIndex'
import UserCreate from './components/userform/UserCreate'
import UserEdit from './components/userform/UserEdit'

import OrderCreate from './components/orderform/OrderCreate'
import OrderEdit from './components/orderform/OrderEdit'
import OrderInfo from './components/orderform/OrderInfo'

import RequestsIndex from './components/RequestsIndex'
import RequestEdit from './components/requestform/RequestEdit'
import RequestCreate from './components/requestform/RequestCreate'

import ShipmentsIndex from './components/ShipmentsIndex'
import ShipmentInfo from './components/shipmentform/ShipmentInfo'
import ShipmentCreate from './components/shipmentform/ShipmentCreate'
import ShipmentEdit from './components/shipmentform/ShipmentEdit'

import ItemsIndex from './components/ItemsIndex'
import ItemEdit from './components/itemform/ItemEdit'
import ItemCreate from './components/itemform/ItemCreate'

import SuppliersIndex from './components/SuppliersIndex'
import SupplierEdit from './components/supplierform/SupplierEdit'
import SupplierCreate from './components/supplierform/SupplierCreate'

import CarriersIndex from './components/CarriersIndex'
import CarrierEdit from './components/carrierform/CarrierEdit'
import CarrierCreate from './components/carrierform/CarrierCreate'

const routes = [
	{
		path: '/clients',
		name: 'user.index',
        component: UserIndex,
    },
    {
        path:'/clients/create',
        name:'user.create',
        component: UserCreate
    },
    {
        path:'/clients/edit/:clientID',
        name:'user.edit',
        component:UserEdit,
        props:true

    },
	//маршруты для заказов
	{
		path: '/orders',
		name: 'order.index',
        component: OrderIndex,
    },
    {
        path:'/newOrder',
        name:'order.create',
        component: OrderCreate
    },
    {
        path:'/orders/edit/:orderID',
        name:'order.edit',
        component:OrderEdit,
        props:true

    },
    {
        path:'/orders/info/:orderID',
        name:'order.info',
        component:OrderInfo,
        props:true

    },
		//маршруты для запросов и отгрузок
	{
		path: '/requests',
		name: 'requests.index',
        component: RequestsIndex,
    },
    {
        path:'/requests/edit/:requestID',
        name:'request.edit',
        component:RequestEdit,
        props:true 
 
    },
    {
        path:'/requests/create',
        name:'request.create',
        component: RequestCreate
    },
    {
        path:'/shipments',
        name:'shipments.index',
        component: ShipmentsIndex
    },
    {
        path:'/shipments/info/:shipmentID',
        name:'shipment.info',
        component:ShipmentInfo,
        props:true
    },
    {
        path:'/shipments/create',
        name:'shipment.create',
        component: ShipmentCreate
    },
    {
        path:'/shipments/edit/:shipmentID',
        name:'shipment.edit',
        component:ShipmentEdit,
        props:true

    },
   //маршруты для итемов
	{
		path: '/items',
		name: 'items.index',
        component: ItemsIndex,
    },
    {
        path:'/items/edit/:itemID',
        name:'item.edit',
        component:ItemEdit,
        props:true

    },
    {
        path:'/items/create',
        name:'items.create',
        component: ItemCreate
    },
       //маршруты для поставщиков
	{
		path: '/suppliers',
		name: 'suppliers.index',
        component: SuppliersIndex,
    },
    {
        path:'/suppliers/edit/:supplierID',
        name:'supplier.edit',
        component:SupplierEdit,
        props:true

    },
    {
        path:'/suppliers/create',
        name:'supplier.create',
        component: SupplierCreate
    },
    //маршруты для траспортных компаний
	{
		path: '/carriers',
		name: 'carriers.index',
        component: CarriersIndex,
    },
    {
        path:'/carriers/edit/:carrierID',
        name:'carrier.edit',
        component:CarrierEdit,
        props:true

    },
    {
        path:'/carriers/create',
        name:'carrier.create',
        component: CarrierCreate
    },
  
]



export default createRouter({
	history: createWebHistory(),
	routes
})