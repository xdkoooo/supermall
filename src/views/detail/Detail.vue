<template>
  <div id="detail">
    <detail-nav-bar class="detail-nav" @tabClick="tabClick" ref="detailNav"/>
    <scroll class="content" ref="scroll" :probe-type="3"
    @scroll="contentScroll">
      <detail-swiper :topImages="topImages"/>
      <detail-base-info :goods="goods"/>
      <detail-shop-info :shop="shop"/>
      <detail-goods-info :detailInfo="detailInfo" @imageLoad="imageLoad"/>
      <detail-param-info ref="params" :paramInfo="paramInfo" />
      <detail-comment-info ref="comment" :commentInfo="commentInfo"/>
      <goods-list ref="recommend" :goodsList="recommends"/>      
    </scroll>
    <detail-bottom-bar /> 
    <back-top @click.native="backClick" v-show="isShowBackTop"/>  
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
  import GoodsList from 'views/home/childComps/GoodsList';
  import DetailBottomBar from './childComps/DetailBottomBar';

  // import BackTop from 'components/content/backTop/BackTop' 混入
  import Scroll from 'components/common/scroll/Scroll'

  import { debounce } from 'common/utils'
  import { itemListenerMixin, backTopMixin } from 'common/mixin'

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
    DetailBottomBar,

    // BackTop, 混入
    Scroll
  },
  mixins: [itemListenerMixin, backTopMixin],
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
      themeTopYs: [],
      getThemeTopY: null,
      currentIndex: 0,
      // isShowBackTop: false, 混入
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

      // this.$nextTick(() => {
      //   // 此时没有图片的高度
      //   this.themeTopYs.push(0)
      //   this.themeTopYs.push(this.$refs.params.$el.offsetTop)
      //   this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
      //   this.themeTopYs.push(this.$refs.recommend.$el.offsetTop)
      // })
    })
    getRecomment(this.iid).then(res => {
      this.recommends = res.data.list

      // this.$nextTick(() => {
      //   this.themeTopYs.push(this.$refs.recommend.$el.offsetTop)
      // })
    })
    this.getThemeTopY = debounce(() => {
      this.themeTopYs = []
      this.themeTopYs.push(0)
      this.themeTopYs.push(this.$refs.params.$el.offsetTop)
      this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
      this.themeTopYs.push(this.$refs.recommend.$el.offsetTop)
      this.themeTopYs.push(Number.MAX_VALUE)
    }, 100)
  },
  mounted(){
    // let newRefresh = debounce(this.$refs.scroll.refresh, 100)
    // this.itemImageListener = () => {
    //   newRefresh()
    // }
    // this.$bus.$on('itemImageLoaded', this.itemImageListener)
    console.log('detail-$route:', this.$route);
  },
  // updated() {
    // 更新太频繁
  //   this.themeTopYs = []
  //   this.themeTopYs.push(0)
  //   this.themeTopYs.push(this.$refs.params.$el.offsetTop)
  //   this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
  //   this.themeTopYs.push(this.$refs.recommend.$el.offsetTop)
  // },
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
      this.getThemeTopY()
    },
    tabClick(index) {
      console.log('tabClick--', index)
      this.$refs.scroll.scrollTo(0, -(this.themeTopYs[index]), 100)
    },
    contentScroll(position) {
      // console.log('scroll-position:', position);
      const positionY = -position.y;
      let length = this.themeTopYs.length
      // for(let i in this.themeTopYs) {        
      //   if(this.currentIndex != i && ((i < length -1 && positionY >= this.themeTopYs[parseInt(i)] && positionY < this.themeTopYs[parseInt(i) + 1]) ||
      //   (i == length - 1 && positionY >= this.themeTopYs[parseInt(i)]))) {
      //     this.currentIndex = i 
      //     console.log(this.currentIndex) 
      //     this.$refs.detailNav.currentIndex = this.currentIndex     
      //   }
      // }

      for(let i = 0; i < length - 1; i++) {        
        if(this.currentIndex !== i && (positionY >= this.themeTopYs[i] && positionY < this.themeTopYs[i + 1])) {
          this.currentIndex = i 
          console.log(this.currentIndex) 
          this.$refs.detailNav.currentIndex = this.currentIndex
        }
      }

      // 判断回到顶部
      this.isShowBackTop = Math.abs(position.y) > 1000 
    },
    // backClick() {
    //   this.$refs.scroll.scrollTo(0, 0);
    // }, 混入
  },
}
</script>

<style scoped>
  #detail {
    position: relative;
    /* z-index: 9;
    background-color: #fff; */
    height: 100vh;
  }
  .detail-nav {
    position: relative;
    z-index: 9;
    background-color: #fff;
  }
  .content {
    height: calc(100% - 44px - 49px);
    overflow: hidden;
  }
</style>