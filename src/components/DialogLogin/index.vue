<template lang="pug">
el-dialog(v-model="showDialog" class="link-login !w-[12.6rem] !h-[6.68rem] !rounded-[.48rem]" :show-close="false" :before-close="handleClose")
  img(src="@/assets/images/icon_discord_black.png" class="w-[1.32rem] h-[1.32rem] mx-auto block")
  div(class="text-black0 text-[.56rem] text-center font-bold mt-[.48rem]") {{$t('dialog.title')}}
  div(class="text-black0 text-[.32rem] text-center font-bold mt-[.08rem]") {{$t('dialog.desc')}}
  XButton(@click="loginTiwwiter" :theTheme="'black'" class="bg-black0 mt-[.8rem] text-normal w-[6.32rem] h-[.98rem] mx-auto" :text="$t('dialog.btntxt')")
</template>

<script setup>
import { getCurrentInstance, ref, watch } from 'vue'
import {formatAddress} from "@/util/main.js";

const { emit, root } = getCurrentInstance()
const showDialog = ref(false)
const props = defineProps({
  isShow: {
    type: Boolean,
    default: false
  },
})
watch(() => props.isShow, (newval) => {
	showDialog.value = newval
}, {immediate: true})
const loginTiwwiter = () => {
	emit('confirm')
}
const handleClose = () => {
	emit('close')
}

const doCopy = (str) => {
  root.exposed.copyText(str)
}
</script>

<style lang="stylus">
  .link-login.el-dialog{
    padding .9rem 2.2rem
  }
</style>
