<template>
  <swiper>
    <swiper-item v-for="item in banners" :key="item.link">
    <a :href="item.link">
        <img :src="item.image" alt="" @load="imageLoaded"/>
    </a>
    </swiper-item>
  </swiper>
</template>

<script>
    import { Swiper, SwiperItem } from 'components/common/swiper'
export default {
    name: 'HomeSwiper',
  components:{
      SwiperItem,
      Swiper
  },
  props: {
      banners: {
          type: Array,
          default() {
              return []
          }
      }
  },
  data(){
    return {
      isLoad: false
    }
  },
  created(){},
  mounted(){},
  watch:{},
  computed:{},
  methods:{
    imageLoaded() {
      if(!this.isLoad) {
        this.$emit('swiperImageLoaded')
        this.isLoad = true
      }      
    }
  },
}
</script>

<style lang="scss" scoped>
</style>