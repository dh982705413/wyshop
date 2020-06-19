import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import api from '../assets/config/api'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    cartTotal: {
      checkedGoodsAmount: 0,
      checkedGoodsCount: 0,
      goodsAmount: 0,
      goodsCount: 0
    },
    cartList: []
  },
  mutations: {
    setCarList (state, cartList) {
      state.cartList = cartList
    },
    setCartTotal (state, cartTotal) {
      state.cartTotal = cartTotal
    }
  },
  actions: {
    async ajaxCatList (content) {
      const { data: res } = await axios.get(api.CartList)
      content.commit('setCarList', res.data.cartList)
      content.commit('setCartTotal', res.data.cartTotal)
      console.log(res)
    }
  },
  modules: {}
})
