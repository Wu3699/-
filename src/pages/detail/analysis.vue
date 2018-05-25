<template>
  <div class="sales-board">
      <div class="sales-board-intro">
        <h2>在线投标</h2> 
        <p>在线查看公司招标信息，并投递</p>
      </div>
      <div>
    <div class="sales-board-des">
 <el-input v-model="tableDataName" placeholder="请输入公司" style="width:240px"></el-input>
 <el-button type="primary" @click="doFilter">搜索</el-button>
 <el-button type="primary" @click="openData">详情</el-button>
 
 <el-table
    ref="singleTable"
  :data="tender"
  highlight-current-row
  border
  style="width: 100%">
 <el-table-column
  prop="id"
  label="编号"
  width="180">
 </el-table-column>
  <el-table-column
 prop="title"
  label="公告标题"
  width="180">
 </el-table-column>
  <el-table-column
  prop="details"
  label="招标详情"
  show-overflow-tooltip="true"
  width="180">
 </el-table-column>
 <el-table-column
  prop="company_name"
  label="招标公司"
  width="180">
 </el-table-column>
  <el-table-column label="操作" width="170">
          <template scope="scope">
                <el-button  size="small" type="warning" @click="addTender(scope.row.id)">投标</el-button>               
          </template>
  </el-table-column>
 </el-table>

  <div style="margin-top: 20px">
    <el-button @click="open">确认投递</el-button>
    <el-button @click="setCurrent()">取消投递</el-button>
  </div>
 <el-pagination
  @size-change="handleSizeChange"
  @current-change="handleCurrentChange"
  :current-page="currentPage"
  :page-sizes="[2, 4, 6, 8]"
  :page-size="pageSize"
  layout="total, sizes, prev, pager, next, jumper"
  :total="totalItems">
 </el-pagination>
  </div>
  </div>
</div>
</template>

<script>
export default {
    data() {
    return {
      tableDataBegin: [],
      tender:[],
      currentRow: null,
      tableDataName: "",
      tableDataEnd: [],
      currentPage: 4,
      pageSize: 2,
      totalItems: 0,
      filterTableDataEnd:[],
      flag:false
      };
    },
    created() {
    this.totalItems = this.tableDataBegin.length;
        if (this.totalItems > this.pageSize) {
          for (let index = 0; index < this.pageSize; index++) {
          this.tableDataEnd.push(this.tableDataBegin[index]);
          }
        } else {
          this.tableDataEnd = this.tableDataBegin;
        }
    },
    mounted:function(){
        const _this=this;
                this.$http.get('http://localhost:3000/api/tender/gettender').then(
                  (res)=>{
                    _this.tender=res.body;  
                  }
                )
    },
    methods: {   
    addTender(id){
        console.log(id)
        this.$http.get('http://localhost:3000/api/bid/toudi?id='+id).then(
                  (res)=>{
                    console.log(res.body)  
                  }
                )
                 this.$message.success('投递成功');
      },
      open(){
        this.$alert('投递成功',"投递",{
          confirmButtonText:'确定',
          callback:action =>{
            this.$message({
              type:'info',
              message:'投递成功'
            });
          }
        });
      },
      setCurrent(row) {
              this.$refs.singleTable.setCurrentRow(row);
      },
      handleCurrentChange(val) {
              this.currentRow = val;
      },
    //前端搜索功能需要区分是否检索,因为对应的字段的索引不同
    //用两个变量接收currentChangePage函数的参数
      doFilter() {
        if (this.tableDataName == "") {
        this.$message.warning("查询条件不能为空！");
        return;
        }
        this.tableDataEnd = []
        //每次手动将数据置空,因为会出现多次点击搜索情况
        this.filterTableDataEnd=[]
        this.tableDataBegin.forEach((value, index) => {
        if(value.name){
        if(value.name.indexOf(this.tableDataName)>=0){
        this.filterTableDataEnd.push(value)
            }
          }
        });
      //页面数据改变重新统计数据数量和当前页
        this.currentPage=1
        this.totalItems=this.filterTableDataEnd.length
        //渲染表格,根据值
        this.currentChangePage(this.filterTableDataEnd)
        //页面初始化数据需要判断是否检索过
        this.flag=true
      },
      openData() {},
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
        this.pageSize = val;
        this.handleCurrentChange(this.currentPage);
      },
      handleCurrentChange(val) {
          console.log(`当前页: ${val}`);
          this.currentPage = val;
          //需要判断是否检索
          if(!this.flag){
          this.currentChangePage(this.tableDataEnd)
          }else{
          this.currentChangePage(this.filterTableDataEnd)  
          }
      }, //组件自带监控当前页码
      currentChangePage(list) {
          let from = (this.currentPage - 1) * this.pageSize;
          let to = this.currentPage * this.pageSize;
          this.tableDataEnd = [];
          for (; from < to; from++) {
            if (list[from]) {
            this.tableDataEnd.push(list[from]);
            }
          }
      }
    }
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.buy-dialog-title {
  font-size: 16px;
  font-weight: bold;
}
.buy-dialog-btn {
  margin-top: 20px;
}
.buy-dialog-table {
  width: 100%;
  margin-bottom: 20px;
}
.buy-dialog-table td,
.buy-dialog-table th{
  border: 1px solid #e3e3e3;
  text-align: center;
  padding: 5px 0;
}
.buy-dialog-table th {
  background: #4fc08d;
  color: #fff;
  border: 1px solid #4fc08d;
}
</style>
