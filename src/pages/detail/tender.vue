<template>
    <div class="sales-board">
        <div class="sales-board-intro">
        	<h2>招标信息</h2>
        	<p>在线浏览查看招标信息</p>
        </div>
        <div class="sales-board-des">
        <ul class="item-content">
        <li v-for="it in tender"  class="lii">
            <p class="tip">    
            <span>{{it.id}}</span>
            <a><router-link :to="{name:'ShowPage',params:{id:it}}">{{it.title}}</router-link></a>
            <span>{{it.end_date}}</span>
            <span >[进行中]</span>
            </p>
            <p class="line-limit-length">{{it.details}}</p>
            
        </li>
       </ul>
        <div>
            <button class="myTopBtn" v-on:click="c">返回顶部</button>
        </div>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
            tender:[]
            }
        },
        mounted:function (){
           const _this=this;
            this.$http.get('http://localhost:3000/api/tender/gettender').then(
              (res)=>{
                _this.tender=res.body;  
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
    font-size: 17px;
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
  .tip span{
      
    font-weight:bold;
    color:#ff9955;
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