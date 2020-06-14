<template>
  <div class="home">
    <!-- 搜索框 -->
    <van-search v-model="searchData"
                placeholder="请输入搜索关键词"
                input-align="center" />
    <!-- 轮播图 -->
    <van-swipe :autoplay="3000"
               indicator-color="#ffffff">
      <van-swipe-item v-for="(item, index) in banner"
                      :key="index">
        <van-image :src="item.image_url"
                   lazy-load></van-image>
      </van-swipe-item>
    </van-swipe>
    <!-- 宫格 -->
    <div class="shopgrid">
      <van-grid :column-num="5"
                :border="false"
                clickable>
        <van-grid-item v-for="(item,index) in channel"
                       :key="index"
                       :icon="item.icon_url"
                       :text="item.name"
                       :url="item.url" />
      </van-grid>
    </div>
    <!-- 品牌直供 -->
    <div class="showcontent">
      <van-cell title="品牌制造商直供"
                :center="true"
                :border="false" />
      <van-cell class="cellshopgrid"
                :border="false">
        <van-grid :column-num="2"
                  :border="false"
                  clickable
                  :gutter="2">
          <van-grid-item v-for="(item,index) in brandList"
                         :key="index">
            <van-image :src="item.new_pic_url"
                       lazy-load />
            <div class="brand-info">
              <h4 class="title">{{item.name}}</h4>
              <p class="price">{{item.floor_price}}起</p>
            </div>
          </van-grid-item>
        </van-grid>
      </van-cell>
    </div>
    <!-- 新品首发 -->
    <div class="newgoods">
      <van-cell title="新品首发"
                :center="true"
                :border="false" />
      <van-cell class="cellshopgrid"
                :border="false">
        <van-grid :column-num="2"
                  :border="false"
                  clickable
                  :gutter="2">
          <van-grid-item v-for="(item,index) in newGoodsList"
                         :key="index">
            <van-image :src="item.list_pic_url"
                       lazy-load />
            <h4>{{item.name}}</h4>
            <div>{{item.retail_price}}起</div>
          </van-grid-item>
        </van-grid>
      </van-cell>
    </div>
    <!-- 人气推荐 -->
    <div class="hotgoods">
      <van-cell title="人气推荐"
                :border="false"
                :center="true" />
      <van-card v-for="(item,index) in hotGoodsList"
                :key="index"
                :price="item.retail_price"
                :desc="item.goods_brief"
                :title="item.name"
                :thumb="item.list_pic_url"
                class="hotcart"
                :centered="true" />
    </div>
    <!-- 专题精讲轮播 -->
    <div class="topicList">
      <van-cell title="专题精讲"
                :border="false"
                class="topic-cell"
                :center="true" />
      <van-swipe :autoplay="3000"
                 :show-indicators="false">
        <van-swipe-item v-for="(item, index) in topicList"
                        :key="index">
          <van-image :src="item.scene_pic_url"
                     height="200px" />
          <van-cell :label="item.subtitle">
            <template #title>
              <span>{{item.title}}</span>
              <span class="price_info"> ￥{{item.price_info}}元起</span>
            </template>
          </van-cell>
        </van-swipe-item>
      </van-swipe>
    </div>
    <!-- 列表 -->
    <div class="goodsList"
         v-for="(item,index) in categoryList"
         :key="index">
      <van-cell :title="item.name"
                :border="false"
                :center="true" />
      <van-grid :column-num="2"
                clickable
                gutter="2">
        <van-grid-item v-for="(item2,index) in item.goodsList"
                       :key="index">
          <van-image :src="item2.list_pic_url" />
          <h4>{{item2.name}}</h4>
          <p style="color:red">￥{{item2.retail_price}}元</p>
        </van-grid-item>
      </van-grid>
    </div>
    <!-- 导航栏 -->
    <div class="nav">
      <van-tabbar v-model="active"
                  :placeholder="true"
                  active-color="#c0392b">
        <van-tabbar-item name="home"
                         icon="home-o">首页</van-tabbar-item>
        <van-tabbar-item name="medal"
                         icon="medal-o">专题</van-tabbar-item>
        <van-tabbar-item name="apps"
                         icon="apps-o">分类</van-tabbar-item>
        <van-tabbar-item name="cart"
                         icon="shopping-cart-o">购物车</van-tabbar-item>
        <van-tabbar-item name="setting"
                         icon="user-o">我的</van-tabbar-item>
      </van-tabbar>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Home',
  created () {
    this.getIndexData()
  },
  data () {
    return {
      searchData: '',
      indexData: {},
      active: 'home'
    }
  },
  methods: {
    async getIndexData () {
      const { data: res } = await this.$http.get(this.api.IndexUrl)
      this.indexData = res.data
      console.log(res)
    }
  },
  computed: {
    banner () {
      return this.indexData.banner
    },
    channel () {
      return this.indexData.channel
    },
    brandList () {
      return this.indexData.brandList
    },
    newGoodsList () {
      return this.indexData.newGoodsList
    },
    hotGoodsList () {
      return this.indexData.hotGoodsList
    },
    topicList () {
      return this.indexData.topicList
    },
    categoryList () {
      return this.indexData.categoryList
    }

  }
}
</script>
<style lang="less" scoped>
.shopgrid {
  margin-top: -2.5px;
  margin-bottom: 5px;
}
.showcontent {
  width: 100%;
  text-align: center;
  .cellshopgrid {
    padding: 0;
    .brand-info {
      position: absolute;
      top: 5px;
      left: 5px;
    }
  }
}
.newgoods {
  text-align: center;
}
.hotgoods {
  text-align: center;
  margin-top: 5px;
  .hotcart {
    background-color: #fff;
    text-align: left;
    .van-card {
      padding: 0;
    }
  }
  .van-card__price {
    color: red;
  }
  .van-card__title {
    font-size: 14px;
    font-weight: bold;
    padding: 5px 0;
  }
  .van-card {
    margin: 0;
    &:not(:last-child) {
      margin-bottom: 4px;
    }
  }
}
.topicList {
  margin-top: 8px;
  padding: 8px;
  background-color: #fff;
  .topic-cell {
    text-align: center;
  }
  .price_info {
    color: red;
    font-size: 14px;
  }
  .van-image {
    margin: 0 5px;
  }
}
.goodsList:not(:last-child) {
  text-align: center;
  margin: 10px 0 0 0;
  font-size: 12px;
  background: #fff;
  &:nth-child(0) {
    margin-top: 10px;
  }
  .van-grid-item {
    box-shadow: 0 2px 2px rgba(255, 255, 255, 0.5);
  }
}
.nav {
  .van-hairline--top-bottom {
    border-top: 1px solid #eee;
  }
}
</style>
