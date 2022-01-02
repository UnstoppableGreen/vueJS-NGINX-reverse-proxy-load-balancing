import { createRouter, createWebHistory } from "vue-router";
import UserIndex from './components/UserIndex'
import OrderIndex from './components/OrderIndex'
import UserCreate from './components/userform/UserCreate'
import UserEdit from './components/userform/UserEdit'

import OrderCreate from './components/orderform/OrderCreate'
import OrderEdit from './components/orderform/OrderEdit'

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
        path:'/edit/:clientID',
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
        path:'/edit/:orderID',
        name:'order.edit',
        component:OrderEdit,
        props:true

    },
  
]



export default createRouter({
	history: createWebHistory(),
	routes
})