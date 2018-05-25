<template> 
  <div class="sales-board">
    <div class="sales-board-intro">
              <h2>公司详情</h2>
              <p>在线浏览招标公司信息及公司招标项目</p>
    </div>
    <div class="sales-board-des">
      <div class="sales-board-left">
     <!-- <el-button  size="small" @click="getData()">查看</el-button>   -->
    <ul v-for="item in coms">
      <li>
        <a href="#" v-on:click="button(item.details)">{{item.name}}</a>
      </li>
    </ul>
      </div> 
      <div class="sales-board-right">
         {{message}}
      </div>
    </div>
            
  </div>    

</template>

<script> 

  export default {
    data(){
      return {
            coms:[],
            message:null,
            dialogVisible: false,
          }
        },
    mounted:function (){
            const _this=this;
                this.$http.get('http://localhost:3000/api/company/getcompany').then(
                  (res)=>{
                    _this.coms=res.body; 
                  }
                )
    },
    methods: {   
      button:function(details){
        var _this=this
        _this.message=details
      },
      handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {});
      },
    }  
  }
</script>
<style scoped>
  .sales-board-des{
    background-color:white;
    float: left;
    width: 100%;
  }
  .item-content{
    background-color:azure;
    border: 2px solid #ddd;
    border-radius: 5px;
    padding: 20px;
    min-height: 300px;
    height: 100%;
  }
  .lii{
    padding: 10px 0;
    font-size: 16px;
  }
  .line-limit-length{
    width: 400px;
    border: solid 0px gray; 
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    font-size: 15px;
    color:grey;
    line-height:30pt;  
  }
  .right {
    float: right;
    width: 60px;
    }
  .bt{
    width: 500px;
    background-color: #4fc08d; 
  }
  .sales-board-left{
    border-radius: 2px;
    padding: 50px;
    background: azure;
    border: 2px solid #ddd;
    float: left;
    width: 40%;
    height: 800px; 
    font-size: 18px;
  }
  .sales-board-right{
    border-radius: 2px;
    padding: 30px;
    border: 2px solid #ddd;
    background-color:azure;
    border-radius: 5px;
    float: left;
    width:60%;
    height: 800px;
    font-size: 15px;
  }
</style>