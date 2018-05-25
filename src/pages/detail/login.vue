<template>
 <div id="comment">
    
    <div class="loginbox" v-show="loginStatus" @click="loginboxClick()" style="display:none;">
      <div class="box" @click="stopProp()">
        <h3>用户登录</h3>
        <form name="login" id="login">
          <input type="text" placeholder="请输入用户名" class="username">
          <input type="password" placeholder="请输入登录密码" class="psw">
          <input type="button" value="立即登录" @click="login()">
          <input type="button" value="立即注册" @click="showregister()" class="blueBtn">
        </form>
      </div>
    </div>
    
</div> 
</template>

<script>
    export default {
    methods:{
    //点击登录
    showLogin: function() {
      document.getElementById("login").reset();
      this.loginStatus = true;
      this.registerStatus = false;
    },
    login: function() {
      var username = $(".loginbox").find(".username").val(); //获取用户名
      var psw = $(".loginbox").find(".psw").val() //获取密码
      var flag = false;
      for (var i = 0, len = this.users.length; i < len; i++) {
        //判断用户名密码是否正确
        if (this.users[i].username === username && this.users[i].password === psw) {
          flag = true;
          alert("登录成功！");
          //用户登录框消失
          this.loginStatus = false;
          //用户登录信息显示
          this.userbarStatus = true;
          //设置用户栏信息
          this.currentUser.username = this.users[i].username;
          this.currentUser.words = this.users[i].words;
          this.currentUser.userimg = this.users[i].userimg;
          //登录或注册入口消失
          this.lrBtnStatus = false;
          break;
        }
      }
      if (!flag) {
        alert("输入的账号或密码不正确！");
        document.getElementById("login").reset();
      }

    }

    }    
}
</script>

<style scoped>
/* #comment .loginbox {
  position: fixed;
  z-index: 99999;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, .85);
}
#comment .icon-style {
  margin-right: 5px;
  color: #999;
}

#comment .loginbox .box {
  height: 300px;
  width: 300px;
  padding: 40px 20px 20px 20px;
  margin: 100px auto;
  background: #fff;
}

#comment .loginbox .box h3 {
  font-size: 16px;
  font-family: "微软雅黑";
  text-align: center;
}

#comment .loginbox .box input {
  height: 40px;
  width: 100%;
  border: 1px solid red;
  margin: 10px 0;
  border-radius: 2px;
}

#comment .loginbox .box input[type="button"] {
  background: red;
  color: #fff;
  font-family: "微软雅黑";
} */
</style>