<template>
  <div class="a1">
    <div class="a2"><span class="sp">咨询与法规</span></div>
    <ul class="ul">     
      <li v-for="item in laws" class="li">        
          <router-link :to="{name:'ShowLaw',params:{id:item}}">
            {{item.title}}
          </router-link>
      </li>
    </ul>
  </div>
  
</template>
<script>

export default {
  data() {
    return {
      laws:[]
    }
  },
  mounted:function(){
            const _this=this;
            this.$http.get('http://localhost:3000/api/law/getlaw').then(
              (res)=>{
                _this.laws=res.body;  
              }
            )
  },

}

</script>
<style>
.a1 {
  width: 1000px;
  border: 1px solid #CCCCCC;
  margin: 30px auto;
}

.a2 {
  height: 40px;
  line-height: 40px;
  background-color: #f5f5f5;

  border-bottom: 1px solid #CCCCCC;
}

.sp {
  font-size: 16px;
  font-weight: bold;
  padding-left: 18px;
}

.ul {
  list-style: none;
  padding: 10px;
}

.li {
  height: 30px;
  line-height: 30px;
  border-bottom: 1px dashed #CCCCCC;
}

</style>
