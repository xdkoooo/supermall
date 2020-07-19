<template>
  <div class="goods">
    <grid-view>
        <goods-list-item v-for="(item, index) in goodsList" :key="index" :goods="item"></goods-list-item>
    </grid-view>    
  </div>
</template>

<script>
    import GoodsListItem from './GoodsListItem'
    import GridView from 'components/common/gridView/GridView'
export default {
    name: "GoodsList",
  components:{
      GoodsListItem,
      GridView
  },
  data(){
    return {
    }
  },
  props: {
      goodsList: {
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
</style>