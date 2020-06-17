<template>
  <div id=“category”>
    <!-- 搜索框 -->
    <van-search v-model="searchData"
                placeholder="请输入搜索关键词"
                input-align="center" />
    <!-- 树形选择 -->
    <van-tree-select :items="items"
                     :main-active-index.sync="active"
                     height="calc(100vh - 104px)"
                     @click-nav="changeRight">
      <template #content>
        <van-image :src="banner_img"
                   width="100%"
                   height="100px" />
        <van-grid :column-num="3"
                  :border="false"
                  clickable
                  gutter="3">
          <van-grid-item v-for="(item,index) in subCategoryList"
                         :key="index"
                         :icon="item.wap_banner_url"
                         :text="item.name"
                         :to="'/categorylist/'+item.id" />
        </van-grid>
      </template>
    </van-tree-select>
    <div class="nav">
      <!-- 导航栏 -->
      <tab-btn />
    </div>
  </div>
</template>

<script>
import tabBtn from '../components/tabBtn'
export default {
  created () {
    this.getCategoryGoods()
  },
  data () {
    return {
      searchData: '',
      categoryList: [],
      currentCategory: {},
      banner_img: '',
      active: 0
    }
  },
  computed: {
    // 获取分类列表
    items () {
      const arr = []
      this.categoryList.forEach((item, index) => {
        item.text = item.name
        arr.push(item)
      })
      return arr
    },
    // 获取所选分类数据
    subCategoryList () {
      return this.currentCategory.subCategoryList
    },
    // 获取分类ID
    categoryAllId () {
      return this.categoryList.map((item) => {
        return item.id
      })
    },
    // 获取banner图
    categoryBanner () {
      return this.categoryList.map((item) => {
        return 'http:' + item.img_url
      })
    }
  },
  methods: {
    // 获取分类数据
    async getCategoryGoods () {
      const { data: res } = await this.$http.get(this.api.CatalogList)
      this.categoryList = res.data.categoryList
      this.currentCategory = res.data.currentCategory
      this.banner_img = 'http:' + res.data.currentCategory.img_url
      console.log(res)
    },
    // 获取分类选择
    changeRight (index) {
      this.active = index
      this.getCurrentCategory(this.categoryAllId[this.active])
      this.banner_img = this.categoryBanner[this.active]
    },
    // 获取选择数据
    async getCurrentCategory (id) {
      const { data: res } = await this.$http.get(this.api.CatalogCurrent, { params: { id } })
      this.currentCategory = res.data.currentCategory
    }
  },
  components: {
    tabBtn
  }
}
</script>

<style>
</style>
