<template lang="pug">
.pagemask(class="w-full" v-show="isShow")
  .maskdetail(class="max-w-[420px] animate-showUp" @click.stop)
    div(@click="doClose" class="cursor-pointer absolute w-68 h-68 flex items-center justify-center top-38 right-44")
      img(class="w-48 h-48" src="@/assets/images/icons/close.svg")
    div(class="leading-56 text-48 text-center") {{ $t('dialogbuy.title') }}
    img(class="block w-176 mx-auto mt-97" src="@/assets/images/success.png")
    div(class="mt-24 leading-40 text-28 text-white/[.4] text-center") {{ $t('dialogbuy.tips', {date: '2024-01-11'}) }}
    div(class="mt-2 leading-78 text-56 font-medium text-center") 10000 SOL
    div(class="h-28 flex items-center justify-center text-28 text-thecol cursor-pointer mt-64" @click="doCopy('0x436ace1038a5a566d3002946d5b9b7de037ce7cafc3bdc7200a311385ce8e0fe')")
      | {{ formatAddress('0x436ace1038a5a566d3002946d5b9b7de037ce7cafc3bdc7200a311385ce8e0fe') }}
      img(class="w-24 ml-16" src="@/assets/images/icons/copy2.svg")
    XButton(class="btn-purple-img h-88 text-28 mt-32" :text="$t('lanchpad.btndetail')")
</template>

<script setup>
import { getCurrentInstance } from 'vue'
import {formatAddress} from "@/util/main.js";

const { emit, root } = getCurrentInstance()

const props = defineProps({
  isShow: {
    type: Boolean,
    default: false
  },
})

const doClose = () => {
  emit('close')
}

const doCopy = (str) => {
  root.exposed.copyText(str)
}
</script>

<style lang="stylus" scoped>
.pagemask{
  background-color rgba(0, 0, 0, 0.6)
  .maskdetail {
    width 8rem
    background-color: #141414;
    border .02rem solid rgba(255, 255, 255, 0.05)
    border-radius .28rem
    color #fff
    padding .96rem 1.02rem
  }
}
</style>
