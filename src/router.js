import { createRouter, createWebHistory } from "vue-router";
import UserIndex from './components/UserIndex'
import OrderIndex from './components/OrderIndex'
import UserCreate from './components/userform/UserCreate'
import UserEdit from './components/userform/UserEdit'

import OrderCreate from './components/orderform/OrderCreate'
import OrderEdit from './components/orderform/OrderEdit'
import OrderInfo from './components/orderform/OrderInfo'

import RequestsIndex from './components/RequestsIndex'
//import ShipmentsIndex from './components/ShipmentsIndex'

import ItemsIndex from './components/ItemsIndex'
import ItemEdit from './components/itemform/ItemEdit'

const routes = [
	{
		path: '/clients',
		name: 'user.index',
        component: UserIndex,
    },
    {
        path:'/create',
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
		//маршруты для запросов и поставок
	{
		path: '/requests',
		name: 'requests.index',
        component: RequestsIndex,
    },
    /*{
        path:'/shipments',
        name:'shipments.index',
        component: ShipmentsIndex
    },*/
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
  
]



export default createRouter({
	history: createWebHistory(),
	routes
})