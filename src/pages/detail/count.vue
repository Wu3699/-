<template>
    <div class="sales-board">
        <div class="sales-board-intro">
          <h2>个人信息</h2>
          <p>在线浏览查看个人信息</p>
        </div>
        <div class="sales-board-des">
    <div class="word">
     <div class="wordsbox ">
          <el-button type="primary" @click="showLogin()" v-show="lrBtnStatus" >马上登录</el-button>
           <el-button type="info" @click="showregister()" v-show="lrBtnStatus" >立即注册</el-button>
    <!-- 登录显示框 -->
    <div class="loginbox" v-show="loginStatus" @click="loginboxClick()" style="display:none;">
    <div class="box" @click="stopProp()">
        <h3>用户登录</h3>
        <p>登录查看我的投标</p>
        <form name="login" id="login">
          <input type="text" placeholder="请输入用户名" class="username">
          <input type="password" placeholder="请输入登录密码" class="psw">
          <el-button type="success" @click="login()" v-show="lrBtnStatus" >马上登录</el-button>          
        </form>
    </div>
    </div>       
    <!--  -->
 <!--注册-->
    <div class="loginbox registerbox" v-show="registerStatus" @click="registerboxClick()" style="display:none;">
      <div class="box" @click="stopProp()">
        <h3>用户注册</h3>
        <p>注册成为本系统会员，参与投标</p>
        <form name="register" id="register">           
          <input type="text" placeholder="请输入用户名" class="username">
          <input type="password" placeholder="请输入登录密码" class="psw">
          <el-button type="success" @click="register()">立即注册</el-button>
          <!-- <span  @click="showregister()">退出账号</span>             -->
        </form>
      </div>
    </div>
    <!--注册-->
    </div>
     
    <div class="userbar" v-show="userbarStatus" style="display:none;">
        <span class="username" v-text="currentUser.username"></span>
        <span class="username" v-text="currentUser.words"></span> 
        <el-button type="danger"  @click="loginout()" >退出账号</el-button>       
    </div>  
 </div>        
  <!-- 投标信息 -->
<div class="box2">

  <p style="font-size:20px">我的投标记录</p>
  <el-button type="success" @click="getData()">刷新数据</el-button>
 <el-table :data="bids" border  style="width: 100%">   
        <el-table-column  prop="title"  label="招标项目" align="center" show-overflow-tooltip="true" width="250"></el-table-column>
        <el-table-column  prop="details"  label="招标详情" align="left" show-overflow-tooltip="true" width="479"></el-table-column> 
        <el-table-column label="操作" width="170">
          <template scope="scope">
            <el-button size="small" type="danger" @click="handleDelete(scope.$index, scope.row)">取消投递</el-button>
               
          </template>
        </el-table-column>    
</el-table>
</div>
<!-- 投标信息 -->
    </div>
    </div>
</template>

<script>
import Login from './login'
    export default {
    data() {
        return {
            bids:'',
            users: [{
            username: "zhangsan",
            password: "123456",
            words: "西安丝路国际会展中心有限公司"
            }, {
            username: "lisi",
            password: "123456",
            words: "佛山市润穗房地产开发有限公司"
            }, {
            username: "wangwu",
            password: "123456",
            words: "海南华润石梅湾旅游开发有限公司"
            }],
            //当前用户信息
            currentUser: { username: "", words: ""},
            //登录框显示或隐藏状态
            loginStatus: false,
            //注册框显示或隐藏状态
            registerStatus: false,
            //用户信息栏显示或隐藏状态
            userbarStatus: false,
            //登录注册入口显示或隐藏状态
            lrBtnStatus: true
           }
        },
    mounted:function (){
        const _this=this;
        this.$http.get('http://localhost:3000/api/bid/getbid').then(
                  (res)=>{
                    _this.bids=res.body; 
                    console.log(1)
                  }
                )
    },
    methods:{
        getData(){
                    const _this=this;
        this.$http.get('http://localhost:3000/api/bid/getbid').then(
                  (res)=>{
                    _this.bids=res.body; 
                    console.log(1)
                  }
                )
        this.$message.success('刷新成功');   
        },
        handleDelete(index, row) {  
           const _this=this;
            this.$http.get('http://127.0.0.1:3000/api/bid/deleteBid?id='+row.id).then(function(res){
              console.log(res.body)
            },function(res){
              console.log(res)
            })
            this.coms.splice(index,1);
            _this.getData();
      },
        //点击登录
        showLogin: function() {
            document.getElementById("login").reset();
            this.loginStatus = true;
            this.registerStatus = false;
        },
         //点击注册
        showregister: function() {
            document.getElementById("register").reset();
            this.loginStatus = false;
            this.registerStatus = true;
        },
        //清空当前用户数据
        loginout: function() {
            this.currentUser.username = "";
            this.currentUser.words = "";
            this.currentUser.userimg = "";
            this.$message({
                message: '退出成功！',
                type: 'success'
            });
            // alert("退出成功！");
            this.userbarStatus = false;
            //登录或注册入口显示
            this.lrBtnStatus = true;
        },
        //登录遮罩层点击事件
            loginboxClick: function() {
            this.loginStatus = false;
        },
         //点击登录或注册框阻止事件冒泡
        stopProp: function(e) {
            e = e || event;
            e.stopPropagation();
        },
         //注册遮罩层点击事件
        registerboxClick: function() {
            this.registerStatus = false;
        },
         //登录
        login: function() {
        var username = $(".loginbox").find(".username").val(); //获取用户名
        var psw = $(".loginbox").find(".psw").val() //获取密码
        var flag = false;
        for (var i = 0, len = this.users.length; i < len; i++) {
            //判断用户名密码是否正确
            if (this.users[i].username === username && this.users[i].password === psw) {
            flag = true;
            this.$message({
                message: '恭喜你，登录成功',
                type: 'success'
            });
            // alert("登录成功！");
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
            this.$message.error('输入的账号或密码不正确！');
            // alert("输入的账号或密码不正确！");
            document.getElementById("login").reset();
        }
        },
        //注册
        register: function() {
        console.log(1);
        var obj = {}; //创建用户账号密码容器
        var flag = false;
        var username = $(".registerbox").find(".username").val(); //获取用户名
        var psw = $(".registerbox").find(".psw").val() //获取密码
            //判断用户名是否存在
        for (var i = 0, len = this.users.length; i < len; i++) {
            if (this.users[i].username === username) {
            flag = true;
            this.$message({
                message: '该用户名已经被注册！',
                type: 'warning'
            });
            // alert("该用户名已经被注册！");
            break;
            }
        }
        if (!flag) {
            console.log(4);
            if (username == "" || psw == "") {
            this.$message.error('输入的账号或密码不正确！');
            } else {
            var randomNum = Math.floor(Math.random() * 5) + 1;
            //随机生成头像
            var randomImg = "user0" + randomNum + ".jpg";
            obj.username = username;
            obj.password = psw;
            obj.words = "";
            obj.userimg = randomImg;
            //添加用户信息到用户列表
            this.users.push(obj);
            this.$message({
                message: '注册成功',
                type: 'success'
            });
            // alert("注册成功！");
            console.log(5);
            //设置用户信息栏显示
            this.userbarStatus = true;

            //设置用户栏信息
            this.currentUser.username = obj.username;
            this.currentUser.words = obj.words;
            this.currentUser.userimg = obj.userimg;
            //登录或注册入口消失
            this.lrBtnStatus = false;
            //重置表单数据
            document.getElementById("register").reset();
            //注册框消失
            this.registerStatus = false;
            }
        }
        }

    }
}
</script>

<style scoped>
.wordsbox{
    width: 900px;
    height: 150px;
    border: 1px solid #ddd;
    background-color:#EBEEF5;
}
.box2{
width: 900px;
margin-top: 20px;
background-color:#EBEEF5;
}
.userbar{
    font-size: 20px;
    margin-top: 10px;
}
</style>