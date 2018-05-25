<template>
  <div class="login-form">
    <el-dialog
  title="增加信息"
  :visible.sync="dialogVisible"
  width="60%"
  :before-close="handleClose">
   <el-form :data="user">
    <el-form-item label="注册姓名" :label-width="formLabelWidth">
      <el-input v-model="name" name="name" ></el-input>
    </el-form-item>
    <el-form-item label="密码" :label-width="formLabelWidth">
      <el-input v-model="password" name="password" ></el-input>
    </el-form-item>
   </el-form>
  <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary"  @click="add">确 定</el-button>
  </span>
</el-dialog>
  </div>
</template>

<script>
export default {
  data () {
    return {
      user:[],
      lrBtnStatus: true,
      registerStatus: false,
     dialogVisible: true,
     company_name:'',
     password:'',
     name:''
    }
  },
  mounted:function(){
     const _this=this;
            this.$http.get('http://localhost:3000/api/use/getuser').then(
              (res)=>{
                _this.user=res.body;  
              }
            )
  },
  methods: {
      add(){  
            const _this=this;
            var name = this.name;
            var password = this.password;
            var company_name = this.company_name;
            this.$http.post('http://localhost:3000/api/use/add', {
              name: name,
              password: password,
              company_name:company_name,
            },{}).then((response) => {
                console.log(response.body);
                _this.getData();
                _this.dialogVisible = false;
                _this.name=''
                _this.password=''
                _this.company_name=''
            }).catch((res)=>{
              console.log(res.body)
            })     
      }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.dialog-wrap {
  position: fixed;
  width: 100%;
  height: 100%;
}
.dialog-cover {
  background: #000;
  opacity: .3;
  position: fixed;
  z-index: 5;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
.dialog-content {
  width: 50%;
  position: fixed;
  max-height: 50%;
  overflow: auto;
  background: #fff;
  top: 20%;
  left: 50%;
  margin-left: -25%;
  z-index: 10;
  border: 2px solid #464068;
  padding: 2%;
  line-height: 1.6;
}
.dialog-close {
  position: absolute;
  right: 5px;
  top: 5px;
  width: 20px;
  height: 20px;
  text-align: center;
  cursor: pointer;
}
.dialog-close:hover {
  color: #4fc08d;
}
</style>
