<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
        <slot></slot>
    </div>
  </div>
</template>

<script>
    import BScroll from 'better-scroll'
export default {
    name: 'Scroll',
  components:{},
  data(){
    return {
        scroll: null
    }
  },
  props: {
    probeType: {
      type: Number,
      default: 0
    },
    pullUpLoad: {
      type: Boolean,
      default: false
    }
  },
  created(){

  },
  mounted(){
    // 创建BScroll
      this.scroll = new BScroll(this.$refs.wrapper, {
          click: true,
          probeType: this.probeType,
          pullUpLoad: this.pullUpLoad
      })
      // 监听滚动位置
      this.scroll.on('scroll', (position) => {
        // console.log(position);
        this.$emit('scroll', position);
      })
      // 监听上拉加载
      if(this.pullUpLoad) {
        this.scroll.on('pullingUp', () => {
          console.log('上拉加载更多')
          this.$emit('pullingUp')
        })
      }      
  },
  watch:{},
  computed:{},
  methods:{
    scrollTo(x, y, time=300) {
      this.scroll && this.scroll.scrollTo(x, y, time);
    },
    finishPullUp() {
      this.scroll && this.scroll.finishPullUp();
    },
    refresh() {
      console.log('-----')
      this.scroll && this.scroll.refresh();
    },
    getScrollY() {
      console.log(this.scroll.y);
      return this.scroll ? this.scroll.y : 0
    }
  },
}
</script>

<style lang="scss" scoped>
</style>