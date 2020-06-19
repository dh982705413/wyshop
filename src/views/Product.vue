<template>
  <div id="product">
    <!-- 导航 -->
    <van-nav-bar title="商品"
                 left-text="返回"
                 left-arrow
                 @click-left="onClickLeft" />
    <!-- 轮播图 -->
    <van-swipe :autoplay="3000"
               height="250"
               indicator-color="#ffffff">
      <van-swipe-item v-for="(item, index) in gallery"
                      :key="index">
        <van-image :src="item.img_url"
                   lazy-load />
      </van-swipe-item>
    </van-swipe>
    <!-- 平台规定 -->
    <div class="productRule">
      <span>30天无忧退货</span>
      <span>48小时快速退款</span>
      <span>满88元免邮费</span>
    </div>
    <!-- 商品信息 -->
    <div class="productInfo">
      <h3>{{goodsInfo.name}}</h3>
      <p>{{goodsInfo.goods_brief}}</p>
      <span>￥{{goodsInfo.retail_price}}</span>
    </div>
    <!-- 选择规格 -->
    <van-cell title="请选择规格"
              is-link
              :border="true"
              @click="showSpecChoose" />
    <!-- 商品参数 -->
    <van-cell-group class="productParams">
      <van-cell title="商品参数" />
      <van-cell v-for="(item,index) in attribute"
                :key="index">
        <template #title>
          <div class="proParams">
            <span class="paramsName">{{item.name}}</span>
            <p class="paramsValue">{{item.value}}</p>
          </div>
        </template>
      </van-cell>
    </van-cell-group>
    <!-- 商品详情 -->
    <div class="proDetail"
         v-html="goodsInfo.goods_desc" />
    <!-- 商品导航 -->
    <van-goods-action>
      <van-goods-action-icon :info="cartTotal.goodsCount==0?'':cartTotal.goodsCount"
                             icon="cart-o"
                             text="购物车"
                             @click="onClickShopCart" />
      <van-goods-action-icon icon="star-o"
                             text="收藏"
                             @click="onClickCollect" />
      <van-goods-action-button type="warning"
                               text="加入购物车"
                               @click="onClickJoinCart" />
      <van-goods-action-button type="danger"
                               text="立即购买"
                               @click="onClickBuy" />
    </van-goods-action>
    <!-- 选择商品规格 -->
    <van-sku v-model="show"
             :sku="sku"
             :goods="goods"
             @buy-clicked="onBuyClicked"
             @add-cart="onAddCartClicked" />
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
export default {
  props: {
    id: String
  },
  created () {
    this.getGoodsDetail()
    this.ajaxCatList()
  },
  data () {
    return {
      goodsInfo: {},
      gallery: [],
      attribute: [],
      show: false,
      data: {},
      goods: {
        title: '',
        picture: ''
      },
      sku: {
        // 所有sku规格类目与其值的从属关系，比如商品有颜色和尺码两大类规格，颜色下面又有红色和蓝色两个规格值。
        // 可以理解为一个商品可以有多个规格类目，一个规格类目下可以有多个规格值。
        tree: [],
        // 所有 sku 的组合列表，比如红色、M 码为一个 sku 组合，红色、S 码为另一个组合
        list: [
          {
            id: 2259, // skuId，下单时后端需要
            price: 100, // 价格（单位分）
            's-1': '1', // 规格类目 k_s 为 s1 的对应规格值 id
            's-2': '3', // 规格类目 k_s 为 s2 的对应规格值 id
            stock_num: 110 // 当前 sku 组合对应的库存
          },
          {
            id: 2259, // skuId，下单时后端需要
            price: 100, // 价格（单位分）
            's-1': '1', // 规格类目 k_s 为 s1 的对应规格值 id
            's-2': '4', // 规格类目 k_s 为 s2 的对应规格值 id
            stock_num: 130 // 当前 sku 组合对应的库存
          },
          {
            id: 2259, // skuId，下单时后端需要
            price: 100, // 价格（单位分）
            's-1': '1', // 规格类目 k_s 为 s1 的对应规格值 id
            's-2': '5', // 规格类目 k_s 为 s2 的对应规格值 id
            stock_num: 140 // 当前 sku 组合对应的库存
          },
          {
            id: 2259, // skuId，下单时后端需要
            price: 100, // 价格（单位分）
            's-1': '2', // 规格类目 k_s 为 s1 的对应规格值 id
            's-2': '3', // 规格类目 k_s 为 s2 的对应规格值 id
            stock_num: 150 // 当前 sku 组合对应的库存
          },
          {
            id: 2259, // skuId，下单时后端需要
            price: 100, // 价格（单位分）
            's-1': '2', // 规格类目 k_s 为 s1 的对应规格值 id
            's-2': '4', // 规格类目 k_s 为 s2 的对应规格值 id
            stock_num: 160 // 当前 sku 组合对应的库存
          },
          {
            id: 2259, // skuId，下单时后端需要
            price: 100, // 价格（单位分）
            's-1': '2', // 规格类目 k_s 为 s1 的对应规格值 id
            's-2': '5', // 规格类目 k_s 为 s2 的对应规格值 id
            stock_num: 170 // 当前 sku 组合对应的库存
          }
        ],
        price: '', // 默认价格（单位元）
        stock_num: 227, // 商品总库存
        collection_id: 2261, // 无规格商品 skuId 取 collection_id，否则取所选 sku 组合对应的 id
        none_sku: false, // 是否无规格商品
        hide_stock: false // 是否隐藏剩余库存
      }
    }
  },
  methods: {
    async getGoodsDetail () {
      const { data: res } = await this.$http.get(this.api.GoodsDetail, { params: { id: this.id } })
      this.data = res.data
      this.goodsInfo = res.data.info
      this.gallery = res.data.gallery
      this.attribute = res.data.attribute
      this.getSku()
      console.log(res)
    },
    getSku () {
      this.goods.title = this.data.info.name
      this.goods.picture = this.data.info.primary_pic_url
      this.sku.price = this.data.info.retail_price
      this.sku.stock_num = this.data.info.goods_number
      const tree = []
      this.data.specificationList.forEach((item, index) => {
        const arr = []
        item.valueList.forEach((item2, index2) => {
          arr.push({
            id: item2.id,
            name: item2.value
          })
        })
        tree.push({
          k: item.name, // skuKeyName：规格类目名称
          v: arr,
          k_s: 's-' + item.specification_id // skuKeyStr：sku 组合列表（下方 list）中当前类目对应的 key 值，value 值会是从属于当前类目的一个规格值 id
        })
      })
      this.sku.tree = tree
    },
    onClickLeft () {
      this.$router.go(-1)
    },
    showSpecChoose () {
      this.show = true
    },
    onClickShopCart () {
      this.$router.push('/buycart')
    },
    onClickCollect () {

    },
    onClickJoinCart () {
      this.show = true
    },
    onClickBuy () {
      this.show = true
    },
    // 添加到订单页
    onBuyClicked () {

    },
    // 添加到购物车
    async onAddCartClicked (skuData) {
      this.show = false
      const chooseContent = skuData.selectedSkuComb['s-1'] + '_' + skuData.selectedSkuComb['s-2']
      const resultPro = this.data.productList.filter((item) => {
        if (item.goods_specification_ids === chooseContent) {
          return true
        } else {
          return false
        }
      })[0]
      const { data: res } = await this.$http.post(this.api.CartAdd, { goodsId: resultPro.goods_id, number: skuData.selectedNum, productId: resultPro.id })
      if (res.errno === 400) return this.$toast.fail(res.errmsg)
      this.$store.commit('setCarList', res.data.cartList)
      this.$store.commit('setCartTotal', res.data.cartTotal)
      this.$toast.success('添加成功')
    },
    ...mapActions(['ajaxCatList'])
  },
  computed: {
    ...mapState(['cartTotal'])
  }
}
</script>

<style lang="less" scope>
#product {
  .productRule {
    display: flex;
    justify-content: space-around;
    font-size: 14px;
    color: #999;
    height: 20px;
    line-height: 24px;
    background: #ffffff;
    span {
      position: relative;
    }
    span::before {
      content: '';
      display: block;
      position: absolute;
      border-radius: 50%;
      border: 1px solid red;
      width: 6px;
      height: 6px;
      left: -12px;
      top: 8px;
    }
  }
  .productInfo {
    text-align: center;
    background-color: #ffffff;
    h3 {
      font-weight: 400;
      padding: 5px;
    }
    p {
      font-size: 12px;
      color: #999;
      padding: 3px;
    }
    span {
      display: block;
      margin-top: 15px;
      color: red;
    }
  }
  .productParams {
    text-align: left;
    margin-top: 10px;
    .proParams {
      padding: 0 5px;
      .paramsName {
        margin-right: 60px;
        margin-left: 5px;
        font-size: 12px;
        color: #999;
        position: absolute;
      }
      .paramsValue {
        font-size: 16px;
        margin-left: 80px;
        width: 300px;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
      }
    }
  }
  .proDetail {
    width: 100%;
    img {
      width: 100%;
      margin: 0;
    }
    p {
      display: flex;
    }
  }
}
</style>
