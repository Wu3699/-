<template>
    <div class="sales-board">
        <div class="sales-board-intro">
            <h2>中标公告</h2>
            <p>在线浏览查看中标信息</p>
        </div>
        <div class="sales-board-des">
                <ul class="item-content">
                    <li v-for="it in utender"  class="lii">
                    <p class="tip">    
                    <span>{{it.id}}</span>
                    <!-- <a><router-link :to="{name:'ShowPage',params:{id:it}}">{{it.name}}</router-link></a> -->
                    <span>{{it.tender_company_name}}</span>
                    <span class="ss">[已中标]</span>
                    </p>
                    </li>
                </ul>
        </div>

        <div>
            <button class="myTopBtn" v-on:click="c">返回顶部</button>
        </div>
    </div>
</template>

<script>
    export default {
      data(){
        return{
          utender:[],
        }
      },
      mounted:function (){
            const _this=this;
            this.$http.get('http://localhost:3000/api/utender/getutender').then(
              (res)=>{
                _this.utender=res.body;  
              }
            )
          },
        methods:{
            c:function(){
                var h=document.documentElement.scrollTop;
                var timer = setInterval(function() {
                window.scrollBy(0, -h);
                if (document.documentElement.scrollTop == 0) {
                    clearInterval(timer);
                };
            }, 2);
            }
        },
    }
</script>

<style scoped>
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
  .tip {

     letter-spacing:2px;
      font-weight:bold;
  }
  .ss{
      color:#ff9955 ;
      float:right;
  }
  .myTopBtn{
        font-size: 8px;
        color: gray;
        height: 50px;
        background-color: azure;
        border: 2px solid #ddd;
        bottom: 40px;
        right: 5px;
        position:fixed;
    }
</style>