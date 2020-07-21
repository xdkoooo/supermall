<template>
    <div>
        <nav-bar>
            <div slot="left" class="back" @click="backClick">
                <img src="~assets/img/common/back.svg" alt="" />
            </div>            
            <div slot="center" class="title">
                <div class="title-item" 
                v-for="(item, index) in titles" :key="index"
                :class="{active: index == currentIndex}"
                @click="titleClick(index)"
                >{{item}}</div>
            </div>
        </nav-bar>
    </div>    
</template>

<script>
    import NavBar from 'components/common/navbar/NavBar'
export default {
  components:{
      NavBar
  },
  data(){
    return {
        titles: ['商品', '参数', '评论', '推荐'],
        currentIndex: 0
    }
  },
  created(){},
  mounted(){},
  watch:{},
  computed:{},
  methods:{
      titleClick(index) {
          console.log(index);
          this.currentIndex = index
          this.$emit('tabClick', index)
      },
      backClick() {
          this.$router.back()
      }
  },
}
</script>

<style scoped>
    .title {
        display: flex;
        font-size: 13px;
    }
    .title-item {
        flex: 1;
    }
    .active {
        color: var(--color-high-text);
    }
    .back img {
        margin-top: 10px;
    }
</style>