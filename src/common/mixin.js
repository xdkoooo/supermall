import { debounce } from './utils'
import BackTop from 'components/content/backTop/BackTop'

export const itemListenerMixin = {
    data() {
        return {
            itemImageListener: null
        }
    },
    mounted(){
        // console.log('混入开始。。')
        let newRefresh = debounce(this.$refs.scroll.refresh, 100)
        this.itemImageListener = () => {
          newRefresh()
        }
        this.$bus.$on('itemImageLoaded', this.itemImageListener)
        // console.log('我是混入的代码')
    },
}

export const backTopMixin = {
    data() {
        return {
            isShowBackTop: false
        }
    },
    components: {
        BackTop
    },
    methods: {
        backClick() {
            this.$refs.scroll.scrollTo(0, 0, 300);
        },
    },
}