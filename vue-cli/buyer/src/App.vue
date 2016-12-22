<template>
	<div id="app">
		
	    <Listnav :lists="lists"></Listnav>
		<div class="ctRight">
			<router-view></router-view>
		</div>
		
	</div>
</template>

<script>
/* eslint-disable */
//import auth from './auth'
import Listnav from './components/ListNav.vue'
import NavConfig from './router/router.json';

export default {
	components:{
   	 Listnav
  	},
	data () {
	    return {
	        lists:NavConfig
	    }
	},
	created () {
	    
	}
}
</script>

<style type="text/css">
	.ctRight{
		margin-left:250px;
	}
</style>