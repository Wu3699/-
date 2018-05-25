<template> 
<div class="index-wrap">
    <div class="index-left">
      <div class="index-left-block">
        <h2>招标公告</h2>
        <div v-for="product in productList">
            <ul>
              <li v-for=" item in product.list">
                <a :href="item.url">
                  <p class="line-limit-length">{{ item.name }}</p>
                  </a>
              </li>
            </ul>
            <div v-if="!product.last" class="hr"></div>
        </div>
      </div>
      <div class="index-left-block lastest-news">
        <h2>中标公告</h2>
        <div v-for="product in productList">
            <ul>
              <li v-for=" item in product.list">
                <a :href="item.url">
                  <p class="line-limit-length">{{ item.name }}</p>
                  </a>
              </li>
            </ul>
            <div v-if="!product.last" class="hr"></div>
        </div>
      </div>
    </div>
    <div class="index-right">
       <slide-show :slides="slides" :inv="slideSpeed"></slide-show>
      <div class="index-board-list">
        <div class="index-board-item"
             v-for="(item, index) in boardList"
             :class="[{'line-last' : index % 2!==0},
             'index-board-' + item.id]">
          <div class="index-board-item-inner">
            <h2>{{item.title}}</h2>
            <p>{{item.description}}</p>
            <div class="index-board-button">
            <router-link href="" class="button" :to="{path: 'detail/' + item.toKey}">立即进入</router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import slideShow from '../components/slideShow'
export default {
  components:{
     slideShow
  },
  data() {
    return {
      slideSpeed:2000,
      slides:[
       {
          src: require('../assets/slideShow/pic1.jpg'),
          title: 'xxx1',
          href: 'detail/analysis'
        },
        {
          src: require('../assets/slideShow/pic2.jpg'),
          title: 'xxx2',
          href: 'detail/count'
        },
        {
          src: require('../assets/slideShow/pic3.jpg'),
          title: 'xxx3',
          href: 'detail/publish'
        },
        {
          src: require('../assets/slideShow/pic4.jpg'),
          title: 'xxx4',
          href: 'detail/forecast'
        }
      ],
      boardList: [
        {
          title: '个人信息',
          description: '个人信息页面',
          id:'car',
          toKey: 'analysis',
          saleout: false
        },
        {
          title: '在线投标',
          description: '查看公司招标信息并投标',
          id:'earth',
          toKey: 'count',
          saleout: false
        },
        {
          title: '公司介绍',
          description: '查询招标公司及信息',
          id:'loud',
          toKey: 'forecast',
          saleout: true
        },
        {
          title: '资讯与法规',
          description: '行业新闻，政策法规',
          toKey: 'publish',
          id:'hill',
          saleout: false
        }
      ],
      productList:{ 
          pc: {
          title: 'PC产品',
          list: [
            {
              name: '阳原县2018年度地下水超采综合治理  地下水高效节水灌溉项目施工 （项目名称）施工招标公告',
              url: 'http://starcraft.com'
            },
            {
              name: '庆华润公园九里项目一期A组团抗震支架设计施工招标',
              url: 'http://warcraft.com'
            },
            {
              name: '沽源县 2017 年村级光伏扶贫电站项目第三标段',
              url: 'http://overwatch.com',
            },
            {
              name: '武警河北总队张家口支队教导队训练场改建工程项目施工',
              url: 'http://hearstone.com'
            },
            {
              name: '蔚县2018年农村饮水安全巩固提升工程',
              url: 'http://hearstone.com'
            }, 
            {
              name: '重庆华润万象汇项目室外雨棚幕墙与钢结构设计',
              url: 'http://hearstone.com'
            },
            {
              name: '庆华润公园九里项目一期A组团抗震支架设计施工招标',
              url: 'http://hearstone.com'
            },  
          ]
        },
      }
    }
  }
}
</script>

<style scoped>
.index-wrap {
  width: 1200px;
  margin: 0 auto;
  overflow: hidden;
}
.index-left {
  float: left;
  width: 300px;
  text-align: left;
}
.index-right {
  float: left;
  width: 900px;
}
.index-left-block {
  margin: 15px;
  background: #fff;
  box-shadow: 0 0 1px #ddd;
}
.index-left-block .hr {
  margin-bottom: 20px;
}
.index-left-block h2 {
  background: #4fc08d;
  color: #fff;
  padding: 10px 15px;
  margin-bottom: 20px;
}
.index-left-block h3 {
  padding: 0 15px 5px 15px;
  font-weight: bold;
  color: #222;
}
.index-left-block ul {
  padding: 10px 15px;
}
.index-left-block li {
  padding: 5px;
}
.index-board-list {
  overflow: hidden;
}
.index-board-item {
  float: left;
  width: 400px;
  background: #fff;
  box-shadow: 0 0 1px #ddd;
  padding: 20px;
  margin-right: 20px;
  margin-bottom: 20px;
}
.index-board-item-inner {
  min-height: 125px;
  padding-left: 120px;
}
.index-board-car .index-board-item-inner{
  background: url(../assets/images/1.png) no-repeat;
}
.index-board-loud .index-board-item-inner{
  background: url(../assets/images/2.png) no-repeat;
}
.index-board-earth .index-board-item-inner{
  background: url(../assets/images/3.png) no-repeat;
}
.index-board-hill .index-board-item-inner{
  background: url(../assets/images/4.png) no-repeat;
}
.index-board-item h2 {
  font-size: 18px;
  font-weight: bold;
  color: #000;
  margin-bottom: 15px;
}
.line-last {
  margin-right: 0;
}
.index-board-button {
  margin-top: 20px;
}
.lastest-news {
  min-height: 512px;
}
.hot-tag {
  background: red;
  color: #fff;
}
.new-item {
  display: inline-block;
  width: 230px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.line-limit-length{
    width: 220px;
    border: solid 0px gray; 
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    font-size: 15px;
    color:grey;
    line-height:20pt;  
}
</style>
