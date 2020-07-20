<template>
  <div id="home">
    <nav-bar class="home-nav">
      <div slot="center">购物街</div>
    </nav-bar>
    <tab-control ref="tabControl1" 
      class="tab-control" 
      :titles="['流行', '新款', '精选']" 
      @tabClick="tabClick"
      v-show="isTabFixed"
      />
    <scroll class="content" ref="scroll" :probe-type="3" 
    @scroll="contentScroll"
    :pull-up-load="true"
    @pullingUp="loadMore"
    >
      <home-swiper :banners="banners" @swiperImageLoaded="swiperImageLoaded"/>
      <recommend-view :recommends="recommends"/>
      <feature-view />
      <tab-control ref="tabControl2" 
      :titles="['流行', '新款', '精选']" 
      @tabClick="tabClick"
      />
      <goods-list :goodsList="showGoods" />
    </scroll>
    <back-top @click.native="backClick" v-show="isShowBackTop"/>
  </div>
</template>

<script>
  import Scroll from 'components/common/scroll/Scroll'
  import NavBar from 'components/common/navbar/NavBar'
  import TabControl from 'components/content/tabControl/TabControl'
  import BackTop from 'components/content/backTop/BackTop'

  import HomeSwiper from './childComps/HomeSwiper'
  import RecommendView from './childComps/RecommendView'
  import FeatureView from './childComps/FeatureView'
  import GoodsList from './childComps/GoodsList'

  import { debounce } from 'common/utils';
  import { itemListenerMixin } from 'common/mixin';

  import { getHomeMultidata, getHomeData, BANNER, RECOMMEND } from 'network/home'

export default {
    name: 'Home',
  components:{
    Scroll,
    NavBar,
    TabControl,
    BackTop,

    HomeSwiper,
    RecommendView,
    FeatureView,
    GoodsList
  },
  data(){
    return {
      banners: [],
      recommends: [],
      goodsList: {
        'pop': { page: 1, list: [] },
        'new': { page: 1, list: [] },
        'sell': { page: 1, list: [] },
      },
      currentType: 'pop',
      isShowBackTop: false,
      tabOffsetTop: 0,
      isTabFixed: false,
      saveY: 0,
      // itemImageListener: null
    }
  },
  mixins: [itemListenerMixin],
  created() {
    this.getMultiData()

    // 2.请求商品数据
    this.getHomeProducts('pop')
    this.getHomeProducts('new')
    this.getHomeProducts('sell')
    
  },
  mounted(){
    // 3. 监听item图片加载完成
    // const refresh = debounce(this.$refs.scroll.refresh, 100);
    // this.itemImageListener = () => {
    //   refresh()
    // }
    // this.$bus.$on('itemImageLoaded', this.itemImageListener)    
  },
  watch:{},
  computed:{
    showGoods() {
      return this.goodsList[this.currentType].list
    }
  },
  activated() {
    this.$refs.scroll.refresh()
    this.$refs.scroll.scrollTo(0, this.saveY, 0)
    
    console.log('activated..');
    this.$bus.$on('itemImageLoaded', this.itemImageListener)
  },
  deactivated() {
    console.log('xxx');
    this.saveY = this.$refs.scroll.getScrollY()

    // 取消事件监听
    this.$bus.$off('itemImageLoaded', this.itemImageListener);
  },
  methods:{
    tabClick(index) {
      console.log('index:', index);
		    switch (index) {
          case 0:
            this.currentType = 'pop'
            break
          case 1:
            this.currentType = 'new'
            break
          case 2:
            this.currentType = 'sell'
            break
        }
        this.$refs.tabControl1.currentIndex = index;
        this.$refs.tabControl2.currentIndex = index;
    },
    backClick() {
      this.$refs.scroll.scrollTo(0, 0);
    },
    contentScroll(position) {
      // console.log('position:', position);
      // 1. 判断backTop是否显示
      this.isShowBackTop = Math.abs(position.y) > 1000
      // 2. 判断是否吸顶
      this.isTabFixed = Math.abs(position.y) > this.tabOffsetTop
    },
    loadMore() {
        this.getHomeProducts(this.currentType);
    },
    swiperImageLoaded() {
      this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop
      console.log('this.tabOffsetTop:', this.tabOffsetTop);
    },

    /**
       * 网络请求相关方法
       */
      getMultiData() {
        getHomeMultidata().then(res => {
          this.banners = res.data[BANNER].list
          this.recommends = res.data[RECOMMEND].list
        })
      },
      getHomeProducts(type) {
        getHomeData(type, this.goodsList[type].page).then(res => {
          const goodsList = res.data.list;
          this.goodsList[type].list.push(...goodsList)
          this.goodsList[type].page += 1

          this.$refs.scroll.finishPullUp();
        })
      },
      
  },
}
</script>

<style scoped>
  #home {
    /* padding-top: 44px;  */
    height: 100vh;
    position: relative; 
  }
  .home-nav {
    background-color: var(--color-tint);
    color: #fff;
    /* position: fixed;
    left: 0;
    right: 0;
    top: 0;
    z-index: 9; */
  }
  .tab-control {
    /* position: sticky;
    top: 44px; */
    position: relative;
    z-index: 9;
  }
  .content {
    overflow: hidden;
    position: absolute;
    top: 44px;
    bottom: 49px;
    left: 0;
    right: 0;
  }
  .isFixed {
    position: fixed;
    top: 44px;
    left: 0;
    right: 0;
  }
  /* .content {
    height: calc(100% - 93px);
    overflow: hidden;
    margin-top: 44px;
  } */
</style>