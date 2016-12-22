<template>
  <div class="regBox">
    <h3>请注册(DEMO)</h3>
    <form @submit.prevent="">

      <div class="form-item">
        <label>手机号：</label><input class="regInput" v-model="reg.mobile" placeholder="可用于登录和找回密码" maxlength="11" autocomplete="off">
        <span v-show="reg.mobile.length==11">{{msg}}</span>
      </div>

      <div class="form-item">
        <label>验证码：</label><input class="regInput" v-model="reg.verify" placeholder="请输入验证码">
        <button :disabled="reg.mobile.length<11 || codeNo" class="btn-phonecode" @click='postCode'>{{send}}</button>
        <span v-if="error.message">{{error.message[0]}}</span>
      </div>

      <div class="form-item">
        <label>用户名：</label><input class="regInput" v-model="reg.username" placeholder="请设置用户名">
        <span v-if="error.username">{{error.username[0]}}</span>
      </div>

      <div class="form-item">
        <label>密码：</label><input class="regInput" v-model="reg.password" placeholder="请设置登录密码" type="password">
        <span v-if="error.password">{{error.password[0]}}</span>
      </div>

      <div class="form-item">
        <label>确认密码：</label><input class="regInput" v-model="reg.password_confirmation" placeholder="请确认密码" type="password">
      </div>
      
      <div class="form-item">
        <button :disabled="!!!reg.verify || !!!reg.username || !!!reg.password || !!!reg.password_confirmation" class="btn-register" type="submit" @click="regs">注册</button>
      </div>
    </form>
  </div>
</template>

<script>
/* eslint-disable */
import Vue from 'vue'
import VueResource from 'vue-resource'

Vue.use(VueResource)

export default {
  data () {
    return {
      precheckUrl:'http://api.lessoald.cn/v1/auth/register/mobile/precheck',//检测手机是否可以注册
      regUrl: 'http://api.lessoald.cn/v1/auth/register',//新用户注册
      apiURLCode:'http://api.lessoald.cn/v1/auth/register/code',//获取手机验证码
      header:{ 
        headers:{ 
          Accept:'application/x.lessocloud.v1+json' 
        }
      },
      reg:{
        mobile: '',
        verify: '',
        username:'',
        password:'',
        password_confirmation:''
      },
      msg:'',
      send:'获取验证码',
      codeNo:true,
      error: ''
    }
  },
  watch: {
    'reg.mobile': {
      handler: function (val, oldVal) {
        if (this.reg.mobile.length == 11) {
          this.codeNos()
        }
      },
      deep:true
    }
  },
  methods: {
    regs () {//注册
      var vm = this,newdata = '?'+parseInt(new Date().getTime())
      vm.error = ''
      this.$http.post(this.regUrl+newdata, JSON.stringify(this.reg) , this.header)
      .then((res) => {
        if (res.body.status === 'success') {
          localStorage.token = 'Bearer ' + res.body.data.token
          localStorage.mobile = vm.reg.mobile
          if ( !!localStorage.token ) {
            window.location.href="/module/login.html"
          }
          return
        }else if (res.body.status === 0) {
          vm.error = res.body.error
          console.log(JSON.stringify(res.body.error))
          return
        }
      }, (res) => {
        console.log(JSON.stringify(res))
      });
    },
    codeNos(){
      var vm = this
      this.$http.post(vm.precheckUrl, { mobile:+vm.reg.mobile }, vm.header).then(
        (res) => {
          if (res.body.result === true) {
            vm.codeNo = false 
            vm.msg = '可以注册'
            return
          }else if (res.body.result === false) {
            vm.codeNo = true 
            vm.msg = '该手机号码已注册'
            return
          }else if (res.body.status === 0) {
            vm.codeNo = true 
            vm.msg = '请输入11位大陆手机号'
            return
          }
       }, 
       (res) => {
          vm.codeNo = true
          vm.msg = '出错'
       });
    },
    postCode() {//验证码
       var vm = this
       var t = 60;
       var setIntervalData =  setInterval(function() {
             if (t > 0) {
                 vm.codeNo = true;
                 vm.send = t--;
             } else {
                 clearInterval(setIntervalData);
                 vm.codeNo = false;
                 vm.send = '获取验证码';
             }
       }, 1000);
       this.$http.post(this.apiURLCode, { mobile:+this.reg.mobile }, this.header)
       .then((res) => { 
        vm.reg.verify = res.body.data.code
      }, (res) => { });    
    }
  }
}
</script>

<style>
  .regBox{
    display: table;
    margin: 100px auto;
    font-family: "Microsoft YaHei","Hiragino Sans GB";
  }
  .regBox h3{
    color: #999;
  }
  .form-item{
    position: relative;
    border: solid 1px #ddd;
    width: 398px;
    height: 52px;
    z-index: 0;
    margin-bottom: 18px;
  }
  .form-item span{
    font-size: 12px;
    position: absolute;
    right: -210px;
    top: 10px;
    width: 200px;
    height: 30px;
    line-height: 30px;
    color: #999;
  }
  .regBox label {
    float: left;
    width: 90px;
    height: 52px;
    line-height: 52px;
    padding-left: 20px;
    font-size: 14px;
    color: #666;
    outline: 0;
  }
  .form-item .regInput {
    border: 0 none;
    font-size: 14px;
    width: 190px;
    height: 19px;
    padding-bottom: 11px;
    padding-left: 20px;
    padding-top: 16px;
    outline: 0;

  }
  .btn-register {
    width: 100%;
    height: 52px;
    color: #fff;
    background: #e22;
    border: 0;
    font-size: 16px;
    outline: 0;
  }
  .btn-phonecode {
    position: absolute;
    right: 3px;
    top: 3px;
    width: 110px;
    height: 46px;
    border: none;
    background: #e22;
    color: #fff;
    padding: 0;
    outline: 0;
  }
  button[disabled],button:disabled{
    background-color:#F5F5F5;
    color:#ACA899;
  }
</style>