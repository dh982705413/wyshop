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
    <!-- 内容区 -->
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
      indexData: {}
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
</style>
