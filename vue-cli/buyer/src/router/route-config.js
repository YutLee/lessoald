/* eslint-disable */
import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

import auth from '../auth'

const crud = r => { require.ensure(['../components/Development'], () => { r(require('../components/Development')) })}

// //交易管理
// const buyList = r => { require.ensure(['../components/buyList'], () => { r(require('../components/buyList')) })}
// const buyerRemark = r => { require.ensure(['../components/buyerRemark'], () => { r(require('../components/buyerRemark')) })}

// //售后服务
// const buyerRefundList = r => { require.ensure(['../components/buyerRefundList'], () => { r(require('../components/buyerRefundList')) })}
// const buyerComplaint = r => { require.ensure(['../components/buyerComplaint'], () => { r(require('../components/buyerComplaint')) })}
// const customerService = r => { require.ensure(['../components/customerService'], () => { r(require('../components/customerService')) })}

// //账户管理
const memberBaseInfo = r => { require.ensure(['../components/memberBaseInfo'], () => { r(require('../components/memberBaseInfo')) })}
// const buyerInformation = r => { require.ensure(['../components/buyerInformation'], () => { r(require('../components/buyerInformation')) })}
// const memberPicture = r => { require.ensure(['../components/memberPicture'], () => { r(require('../components/memberPicture')) })}

// const accountSecurity = r => { require.ensure(['../components/accountSecurity'], () => { r(require('../components/accountSecurity')) })}
// const receiveAddress = r => { require.ensure(['../components/receiveAddress'], () => { r(require('../components/receiveAddress')) })}
// const myMessage = r => { require.ensure(['../components/myMessage'], () => { r(require('../components/myMessage')) })}

const routed = [
    { path: '/accountManagement', component: require('../components/accountManagement'), redirect: '/accountManagement/memberBaseInfo',
		children:[
				{path: '/accountManagement/memberBaseInfo', component: memberBaseInfo},
				{path: '/home/d', component: crud}
		]
	},
	{ path: '/crud', component: crud},
	{ path: '*', redirect: '/accountManagement/memberBaseInfo'}
]

export default new VueRouter({
  routes: routed
})