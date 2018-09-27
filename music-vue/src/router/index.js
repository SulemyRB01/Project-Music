import vue from 'vue'
import Router from 'vue-router'
// import menu from '@/components/Menu.vue'
import album from '@/components/Album.vue'
import purcharse from '@/components/Purcharse.vue'
import sale from '@/components/Sale.vue'
import stock from '@/components/Stock.vue'
import additional from '@/components/Additional.vue'
// import store from '@/store'

vue.use(Router)

const router = new Router({
	routes: 
	[
		// {
		// 	path: '/',
		// 	name: 'menu',
		// 	component: menu
		// },
		{
			path: '/', 
			name: 'album',
			component: album
		},
		{
			path: '/purcharse',
			name: 'purcharse',
			component: purcharse
		}, 
		{
			path: '/sale',
			name: 'sale',
			component: sale
		},
		{
			path: '/stock',
			name: 'stock',
			component: stock
		},
		{
			path: '/additional',
			name: 'additional',
			component: additional
		}
	]
}) 

export default router