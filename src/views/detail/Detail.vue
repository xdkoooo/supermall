<template>
  <div id="detail">
    <detail-nav-bar class="detail-nav"/>
    <scroll class="content" ref="scroll">
      <detail-swiper :topImages="topImages"/>
      <detail-base-info :goods="goods"/>
      <detail-shop-info :shop="shop"/>
      <detail-goods-info :detailInfo="detailInfo" @imageLoad="imageLoad"/>
      <detail-param-info :paramInfo="paramInfo" />
      <detail-comment-info :commentInfo="commentInfo"/>
      <goods-list :goodsList="recommends"/>
    </scroll>    
  </div>
</template>

<script>
  import DetailNavBar from './childComps/DetailNavBar';
  import DetailSwiper from './childComps/DetailSwiper';
  import DetailBaseInfo from './childComps/DetailBaseInfo';
  import DetailShopInfo from './childComps/DetailShopInfo';
  import DetailGoodsInfo from './childComps/DetailGoodsInfo';
  import DetailParamInfo from './childComps/DetailParamInfo';
  import DetailCommentInfo from './childComps/DetailCommentInfo';
  import GoodsList from 'views/home/childComps/GoodsList'

  import Scroll from 'components/common/scroll/Scroll'

  import { debounce } from 'common/utils'
  import { itemListenerMixin } from 'common/mixin'

  import { getDetail, getRecomment, Goods, Shop, GoodsParam } from 'network/detail';

export default {
    name: "Detail",
  components:{
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailCommentInfo,
    GoodsList,

    Scroll
  },
  mixins: [itemListenerMixin],
  data(){
    return {
      iid: null,
      topImages: [],
      goods: {},
      shop: {},
      detailInfo: {},
      paramInfo: {},
      commentInfo: {},
      recommends: [],      
    }
  },
  created(){
    this.iid = this.$route.params.iid
    getDetail(this.iid).then(res => {
      const data = res.result;
      this.topImages = data.itemInfo.topImages
      this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services);
      this.shop = new Shop(data.shopInfo)
      this.detailInfo = data.detailInfo
      this.paramInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule);
      // 保存评论信息
      if (data.rate.list) {
        this.commentInfo = data.rate.list[0];
      }
    })
    getRecomment(this.iid).then(res => {
      this.recommends = res.data.list
    })
  },
  mounted(){
    // let newRefresh = debounce(this.$refs.scroll.refresh, 100)
    // this.itemImageListener = () => {
    //   newRefresh()
    // }
    // this.$bus.$on('itemImageLoaded', this.itemImageListener)
    console.log('detail-mounted')
  },
  destroyed() {
    this.$bus.$off('itemImageLoaded', this.itemImageListener)
  },
  // deactivated() {
    
  // },
  watch:{},
  computed:{},
  methods:{
    imageLoad() {
      console.log('this.$refs:', this.$refs);
      this.$refs.scroll.refresh();
    }
  },
}
</script>

<style scoped>
  #detail {
    position: relative;
    z-index: 9;
    background-color: #fff;
    height: 100vh;
  }
  .detail-nav {
    position: relative;
    z-index: 9;
    background-color: #fff;
  }
  .content {
    height: calc(100% - 44px);
    overflow: hidden;
  }
</style>