<template>
  <div class="recommend">
    <div class="recommend-item" v-for="item in recommends" :key="item.link">
        <a :href="item.link">
            <img :src="item.image" alt="" />
            <span>{{item.title}}</span>
        </a>
    </div>
  </div>
</template>

<script>
export default {
    name: 'RecommendView',
  components:{},
  props: {
      recommends: {
          type: Array,
          default() {
              return []
          }
      }
  },
  data(){
    return {
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
    .recommend {
        display: flex;
        width: 100%;
        font-size: 12px;
        text-align: center;
        padding: 10px 0 20px;
        border-bottom: 8px solid #eee;
    }
    .recommend-item {
        flex: 1;
    }
    .recommend-item img {
        width: 70px;
        height: 70px;
        margin-bottom: 10px;
    }
    .recommend-item span {
        display: inline-block;
    }
</style>