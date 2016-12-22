<template>
  <ul class="list-group">

  <br>
  <el-radio class="radio" v-model="radio" label="1">先生</el-radio>
  <el-radio class="radio" v-model="radio" label="2">女士</el-radio>
  
  <br>
  <el-radio class="radio" v-model="radio2" label="1">企业单位</el-radio>
  <el-radio class="radio" v-model="radio2" label="2">个体经营</el-radio>
  <el-radio class="radio" v-model="radio2" label="3">个人</el-radio>

  <br>
<!--   <region-picker auto :province="region.province" :city="region.city" :district="region.district"
    @onchange="change">
  </region-picker> -->
  <br>
  <el-button type="primary">保存</el-button>


  </ul>
</template>

<script>
/* eslint-disable */
import Vue from 'vue'

import { Radio,  Button } from 'element-ui'

Vue.component(Radio.name, Radio)
Vue.component(Button.name, Button)

import RegionPicker from 'vue-region-picker'
import CHINA_REGION from 'china-area-data'

Vue.use(RegionPicker, {
  region: CHINA_REGION,
  vueVersion: 2
})

export default {
  data () {
      return {
        region: {},
        radio: '1',
        radio2: '3',
        list:'循环列表',
        items:[
        {msg:'new1new1new1new1new1new1new1new1new1new1new1new1new1new1new1new1new1new1',url:'http://www.baidu.com/'},
        {msg:'new2',url:'http://www.baidu.com/'},
        {msg:'new1',url:'http://www.baidu.com/'},
        {msg:'new2',url:'http://www.baidu.com/'},
        {msg:'new1',url:'http://www.baidu.com/'},
        {msg:'new2',url:'http://www.baidu.com/'}
      ]
    }
  }
}
</script>

<style type="text/css">
  .list-group{
    
  }
</style>