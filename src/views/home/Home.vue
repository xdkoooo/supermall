<template>
  <div id="home">
    <nav-bar class="home-nav">
      <div slot="center">购物街</div>
    </nav-bar>
    <scroll class="content" ref="scroll" :probe-type="3" 
    @scroll="contentScroll"
    :pull-up-load="true"
    @pullingUp="loadMore"
    >
      <home-swiper :banners="banners" />
      <recommend-view :recommends="recommends"/>
      <feature-view />
      <tab-control class="tab-control" :titles="['流行', '新款', '精选']" @tabClick="tabClick"/>
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
      isShowBackTop: false
    }
  },
  created() {
    this.getMultiData()

    // 2.请求商品数据
    this.getHomeProducts('pop')
    this.getHomeProducts('new')
    this.getHomeProducts('sell')

    // 3. 监听item图片加载完成
    this.$bus.$on('itemImageLoaded', () => {
      console.log('-----')
      this.$refs.scroll.refresh();
    })
  },
  mounted(){},
  watch:{},
  computed:{
    showGoods() {
      return this.goodsList[this.currentType].list
    }
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
    },
    backClick() {
      this.$refs.scroll.scrollTo(0, 0);
    },
    contentScroll(position) {
      // console.log('position:', position);
      this.isShowBackTop = Math.abs(position.y) > 1000
    },
    loadMore() {
        this.getHomeProducts(this.currentType);
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
    padding-top: 44px; 
    height: 100vh;
    position: relative; 
  }
  .home-nav {
    background-color: var(--color-tint);
    color: #fff;
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    z-index: 9;
  }
  .tab-control {
    /* position: sticky;
    top: 44px; */
  }
  .content {
    overflow: hidden;
    position: absolute;
    top: 44px;
    bottom: 49px;
    left: 0;
    right: 0;
  }
  /* .content {
    height: calc(100% - 93px);
    overflow: hidden;
    margin-top: 44px;
  } */
</style>