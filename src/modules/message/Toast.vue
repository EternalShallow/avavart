<template lang="pug">
div(class="app-toast down" v-if="isShow" :class="{'info': type === 'info', 'success': type=== 'success', 'warning': type=== 'warning', 'danger': type=== 'danger'}")
  img.icons(v-if="type === 'success'" src="./icon-msg-pass.png")
  img.icons(v-else-if="type === 'danger' || type === 'warning'" src="./icon-msg-error.png")
  p {{ text }}
</template>

<script setup>
import { ref } from 'vue'
const props = defineProps({
  text: {
    type: String,
    default: ''
  },
  type: {
    type: String,
    default: 'warning'
  }
});
const isShow = ref(true)
</script>

<style lang="stylus" scoped>
.app-toast {
  background-color #3E414A
  position: fixed;
  top: 1.08rem;
  color: #fff;
  z-index: 4000;
  //fullheight(SSF(88rem))
  line-height .28rem
  padding .2rem .3rem
  font-size .24rem
  border-radius .12rem
  display flex
  align-items center
  justify-content center
  left 50%
  transform: translateX(-50%);
  max-width 5rem
  .icons{
    display block
    width .28rem
    height .28rem
    margin-right .12rem
  }
  p{
    max-width 5rem
  }
}
//.info {
//  background: #757575;
//}
//.success {
//  background: #16BB8C;
//}
//.warning {
//  background: #FD873E;
//}
//.danger {
//  background: #FD4E3E;
//}

.down {
  animation: godown .2s 1 linear;
}
@keyframes godown{
  0% {
    margin-top -.7rem
    opacity: 0;
  }
  100%{
    margin-top 0
    opacity: 1;
  }
}

@media only screen and (max-width: 500px){
  //.app-toast {
  //  min-height .8rem
  //  line-height .5rem
  //}
}
</style>
