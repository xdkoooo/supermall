import { debounce } from './utils'

export const itemListenerMixin = {
    data() {
        return {
            itemImageListener: null
        }
    },
    mounted(){
        console.log('混入开始。。')
        let newRefresh = debounce(this.$refs.scroll.refresh, 100)
        this.itemImageListener = () => {
          newRefresh()
        }
        this.$bus.$on('itemImageLoaded', this.itemImageListener)
        console.log('我是混入的代码')
    },
}