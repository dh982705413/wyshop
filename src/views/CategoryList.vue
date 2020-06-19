<template>
  <div id="categoryList">
    <van-cell :title="parentCategory.name"
              :border="false"
              center
              class="category-title">
      <template #icon>
        <router-link to="/category"
                     class="goback">
          <van-icon name="arrow-left" />
          <span>返回</span>
        </router-link>
      </template>
    </van-cell>
    <!-- 头部导航栏 -->
    <van-tabs v-model="active"
              @change="getChangeList"
              sticky>
      <van-tab v-for="(item,index) in brotherCategory"
               :title="item.name"
               :key="index">
        <!-- 介绍栏 -->
        <van-cell :title="item.front_name"
                  :label="item.front_desc"
                  style="text-align:center;background:#eee" />
        <!-- 商品列表 -->
        <van-grid :column-num="2"
                  :border="false"
                  gutter="1"
                  clickable>
          <van-grid-item v-for="(goods,index2) in goodsList"
                         :key="index2"
                         :to="'/product/'+goods.id">
            <van-image :src="goods.list_pic_url" />
            <span class="goods-name van-ellipsis">{{goods.name}}</span>
            <span style="color:red;font-size:14px">￥{{goods.retail_price}}元</span>
          </van-grid-item>
        </van-grid>
        <div v-if="goodsList.length>0">
          <van-pagination v-model="page"
                          :show-page-size="3"
                          force-ellipses
                          @change="changePage"
                          :page-count="totalPages" />
        </div>
        <div v-else>
          <h3 style="text-align:center">暂无商品</h3>
        </div>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
export default {
  props: {
    id: String
  },
  data () {
    return {
      active: 0,
      page: 1,
      size: 14,
      brotherCategory: [],
      goodsList: [],
      totalPages: 0,
      listIndex: 0,
      parentCategory: {}
    }
  },
  created () {
    this.getGoodsCategory()
  },
  computed: {
  },
  methods: {
    async getGoodsCategory () {
      const { data: res } = await this.$http.get(this.api.GoodsCategory, { params: { id: this.id } })
      this.brotherCategory = res.data.brotherCategory
      this.getCategoryList(res.data.brotherCategory[0].id)
      this.parentCategory = res.data.parentCategory
    },
    async getCategoryList (id) {
      const { data: res } = await this.$http.get(this.api.GoodsList, { params: { categoryId: id, page: this.page, size: this.size } })
      this.goodsList = res.data.goodsList
      this.totalPages = res.data.totalPages
      console.log(res)
    },
    getChangeList (index) {
      this.listIndex = index
      this.page = 1
      this.getCategoryList(this.brotherCategory[this.listIndex].id)
    },
    changePage () {
      this.getCategoryList(this.brotherCategory[this.listIndex].id)
    },
    goback () {
      this.$route.push('/category')
    }
  }
}
</script>

<style lang="less" scope>
.goods-name {
  font-size: 12px;
}
.category-title {
  text-align: center;
}
.goback {
  color: #000000;
}
</style>
