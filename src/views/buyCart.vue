<template>
  <div id="buycart">
    <van-cell title="购物车列表"
              style="text-align:center" />
    <!-- 平台规定 -->
    <div class="productRule">
      <span>30天无忧退货</span>
      <span>48小时快速退款</span>
      <span>满88元免邮费</span>
    </div>
    <!-- 以选商品 -->
    <van-cell-group>
      <van-cell :center="true"
                v-for="(item,index) in cartList"
                :key="index">
        <template #icon>
          <van-checkbox v-model="item.checked"
                        @change="checkEvent(item)" />
        </template>
        <template #title>
          <van-card :num="item.number"
                    :price="item.retail_price"
                    :desc="item.goods_specifition_name_value"
                    :title="item.goods_name"
                    :thumb="item.list_pic_url"
                    style="background:#fff" />
        </template>
      </van-cell>
    </van-cell-group>
    <div style="width:100%;height:50px"></div>
    <!-- 提交订单栏 -->
    <van-submit-bar :price="cartTotal.checkedGoodsAmount*100"
                    button-text="提交订单"
                    @submit="onSubmit">
      <van-checkbox v-model="checkedAll">全选</van-checkbox>
    </van-submit-bar>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  data () {
    return {
    }
  },
  computed: {
    ...mapState(['cartTotal', 'cartList']),
    checkedAll: {
      get () {
        if (this.cartTotal.goodsCount === this.cartTotal.checkedGoodsCount) {
          return true
        } else {
          return false
        }
      },
      set (val) {
        console.log(val)
      }
    }
  },
  created () {
    this.ajaxCatList()
  },
  methods: {
    ...mapActions(['ajaxCatList']),
    onSubmit () { },
    checkEvent (item) {
      this.checkBranch(item)
    },
    async checkBranch (item) {
      const { data: res } = await this.$http.post(this.api.CartChecked, { productIds: item.product_id, isChecked: Number(item.checked) })
      this.$store.commit('setCartTotal', res.data.cartTotal)
      this.$store.commit('setCarList', res.data.cartList)
    }
  }
}
</script>

<style lang="less" scope>
#buycart {
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
  .van-card__price {
    color: red;
  }
}
</style>
