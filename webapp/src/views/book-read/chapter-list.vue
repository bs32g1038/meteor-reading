<script>
import { List } from 'vant';
import utils from '@/components/utils/scroll';
export default {
    extends: List,
    methods: {
        check() {
            this.$emit('on-scroll', utils.getScrollTop(this.scroller));
            List.methods.check.call(this);
        }
    }
};
</script>
