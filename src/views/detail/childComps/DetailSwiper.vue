<template>
    <swiper class="detail-swiper">
      <swiper-item class="item" v-for="(item, index) in topImages" :key="index">
        <img :src="item" alt="">
      </swiper-item>
    </swiper>    
</template>

<script>
    import { Swiper, SwiperItem } from 'components/common/swiper';
export default {
    name: 'DetailSwiper',
  components:{
      Swiper,
      SwiperItem
  },
  data(){
    return {
    }
  },
  props: {
      topImages: {
          type: Array,
          default() {
              return []
          }
      }
  },
  created(){},
  mounted(){},
  watch:{},
  computed:{},
  methods:{},
}
</script>

<style scoped>
    .detail-swiper {
        height: 300px;
        overflow: hidden;
    }
</style>