<template>
  <div class="regBox">
    <div class="loginTitle" v-if="!msg">
      <template v-for="titleNames in titleName">
        <label :class="{ on: active == titleNames }" @click="selected(titleNames)" >{{ titleNames | titlecn}}</label>
      </template>
    </div>

    <form @submit.prevent="" v-if="!msg">
      <div class="form-item">
        <label>手机号：</label>
        <input class="regInput" v-model="mobile" placeholder="请输入手机号" maxlength="11">
        <span v-show="mobile.length == 11">{{tip}}</span>
      </div>

      <div class="form-item" v-if="active == 'verify'">
        <label>验证码：</label>
        <input class="regInput" v-model="verify" placeholder="动态密码">
        <button :disabled="mobile.length < 11 || codeNo" class="btn-phonecode" @click='code'>{{send}}</button>
        <span v-if="codeTip.verify">{{codeTip.verify[0]}}</span>
        <span v-if="codeTip.message">{{codeTip.message[0]}}</span>
      </div>

      <div class="form-item" v-if="active == 'password'">
        <label>密 码：</label>
        <input class="regInput" type="password" v-model="password" placeholder="请输入密码" >
        <span v-if="codeTip.password">{{codeTip.password[0]}}</span>
        <span v-if="codeTip.message">{{codeTip.message[0]}}</span>
      </div>

      <div class="form-item">
        <button :disabled="!mobile" @click='login' class="btn-register" type="submit">{{ active | titlecn}}</button>
      </div>

    </form>

    <p v-if="msg" class="error">{{msg}} <button @click="logout">注销</button> <button @click="users">查看用户信息</button></p>


    <p v-for="u in userData">{{u}}</p>

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
      passwordloginUrl: 'http://api.lessoald.cn/v1/auth/login',//用户名+密码登录
      verifyloginUrl: 'http://api.lessoald.cn/v1/auth/login/mobile',//手机验证码登录
      loginCode: 'http://api.lessoald.cn/v1/auth/login/code',//获取手机验证码
      loginPrecheck: 'http://api.lessoald.cn/v1/auth/login/mobile/precheck',//验证手机号是否可以通过验证码进行登录
      user: 'http://api.lessoald.cn/v1/users',//获取当前登录用户信息
      header:{ 
        headers:{ 
          Accept:'application/x.lessocloud.v1+json' 
        }
      },
      mobile: '',
      verify: '',
      password:'',
      msg:'',
      tip:'',
      codeTip:'',
      send:'发送动态密码',
      codeNo:true,
      userData:'',
      titleName: ['verify', 'password'],
      active: 'verify'
    }
  },
  filters: {
    titlecn: function (value) {
      if (!value) return ''
      if (value == 'verify') {
        return '短信登录' 
      } else if (value == 'password') {
        return '账号登录'
      }
    }
  },
  watch: {
    mobile: function(val, oldVal){
      if (val.length == 11) {
        this.precheck()
      }
    }
  },
  created: function () {
    if (!!localStorage.token) {
      this.msg = "已登录，手机号为"+ localStorage.mobile
    }
  },
  methods: {
    selected(Name) {
      this.active = Name
    },
    login () {
      var vm = this ,urls ,loginCode
      var active = vm.active
      if (active === 'verify') {
        urls = vm.verifyloginUrl
        loginCode = { 
          mobile:vm.mobile, 
          verify:vm.verify
        }
      }else if (active === 'password') {
        var pass = vm.password
        urls = vm.passwordloginUrl
        loginCode = { 
          mobile:vm.mobile, 
          password: pass
        }
      }
      
      this.$http.post( urls , loginCode, vm.header)
      .then((res) => {
        if (res.body.status === 0) {
          vm.codeTip = res.body.error
        } else if (res.body.status === 1) {
          localStorage.token = 'Bearer '+res.body.data.token
          localStorage.mobile = vm.mobile
          if ( !!localStorage.token ) {
              vm.msg = "已登录，手机号为"+ localStorage.mobile
          }
        }
      }, (res) => {
        console.log(JSON.stringify(res))
      }); 
    },
    precheck(){
      var vm = this
      this.$http.post( vm.loginPrecheck, { mobile: + vm.mobile }, vm.header ).then(
        (res) => {
          if (res.body.result === true) {
            vm.codeNo = false 
            vm.tip = 'OK'
            return
          } else if (res.body.result === false) {
            vm.codeNo = true 
            vm.tip = '该手机号码未注册'
            return
          } else if (res.body.status === 0) {
            vm.codeNo = true 
            vm.tip = '请输入11位的大陆手机号'
            return
          }
       }, 
       (res) => {
          vm.codeNo = true
          vm.tip = '出错了'
       }); 
    },
    code () {
      var vm = this
      var t = 60;
      var setIntervalData =  setInterval(function() {
            if (t > 0) {
                vm.codeNo = true;
                vm.send = t--;
            } else {
                clearInterval(setIntervalData);
                vm.codeNo = false;
                vm.send = '发送动态密码';
            }
      }, 1000);

      this.$http.post( this.loginCode, { mobile:+this.mobile }, this.header)
      .then((res) => {
          console.log(JSON.stringify(res.body.data.code))
          vm.verify = res.body.data.code
          vm.tip = ''
      }, (res) => {
          vm.tip = "用户不存在或帐户被冻结"
      });
    },
    logout () {
      delete localStorage.token
      if (true) {}
      window.location.href="/module/login.html"
    },
    users() {
      var vm = this
      var token = localStorage.token
      this.$http.get( this.user +"?"+Math.random().toString(36).substring(7), { 
        headers:{ 
          Accept:'application/x.lessocloud.v1+json',
          Authorization:token
        }
      })
      .then((res) => {
        vm.userData = res.body.data
        //console.log(res.headers.get('Authorization'))
        localStorage.token = res.headers.get('Authorization')
      }, (res) => {
        
      }); 
    }
  }
}
</script>

<style>
  .loginTitle{
    display: inline-block;
    margin-bottom: 15px;
  }
  .loginTitle input {
    display: none;
  }
  .loginTitle label{
    float: left;
    margin-right: 30px;
    color: #999;
  }
  .loginTitle .on{
    color: #333;
  }
  .regBox{
    display: table;
    margin: 100px auto;
    font-family: "Microsoft YaHei","Hiragino Sans GB";
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
  .regBox .form-item label {
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