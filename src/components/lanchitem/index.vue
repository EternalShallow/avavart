<template lang="pug">
router-link.lanchitem(to="/launchPadDetail" class="block cursor-pointer bg-tabbg px-[.8rem] pt-[.68rem] pb-[.6rem] rounded-[.16rem]" :class="i === 1 ? '' : 'mt-[.6rem]'")
  .title(class="flex items-center")
    img(class="block w-[1rem] h-[1rem]" src="@/assets/images/logo.png")
    div(class="ml-[.2rem] text-[.48rem]") {{ item.symbol}}
    div(class="flex items-center ml-[.24rem] bg-yellowbg/[.1] text-yellow text-[.24rem] leading-none px-[.16rem] py-[.12rem] rounded-[.24rem]")
      .circle(class="w-[.08rem] h-[.08rem] bg-yellow rounded-[.04rem] mr-[.12rem]")
      div(v-if="tabIndex === 1") {{$t('lanchpad.comesoon')}}
      div(v-else-if="tabIndex === 2") {{$t('lanchpad.selling')}}
      div(v-else-if="tabIndex === 3") {{$t('lanchpad.end')}}
    .flex-1
    .starttxt(v-if="tabIndex === 1" class="text-startcolor/[.8] text-[.28rem]") {{$t('lanchpad.starttxt')}}
    .starttxt(v-else class="text-startcolor/[.8] text-[.28rem]") {{$t('lanchpad.starttxt1')}}
    van-count-down(:time="item.startTime" format="DD HH  mm  ss " class="flex")
      template(#default="timeData")
        span(class="ml-[.16rem] w-[.48rem] h-[.48rem] flex items-center justify-center text-normal font-medium text-[.24rem] bg-normal/[.18] rounded-[.04rem]") {{ formnum(timeData.days) }}
        span(class="text-normal text-[.2rem] px-[.08rem]") :
        span(class="w-[.48rem] h-[.48rem] flex items-center justify-center text-normal font-medium text-[.24rem] bg-normal/[.18] rounded-[.04rem]") {{ formnum(timeData.hours) }}
        span(class="text-normal text-[.2rem] px-[.08rem]") :
        span(class="w-[.48rem] h-[.48rem] flex items-center justify-center text-normal font-medium text-[.24rem] bg-normal/[.18] rounded-[.04rem]") {{ formnum(timeData.minutes) }}
        span(class="text-normal text-[.2rem] px-[.08rem]") :
        span(class="w-[.48rem] h-[.48rem] flex items-center justify-center text-normal font-medium text-[.24rem] bg-normal/[.18] rounded-[.04rem]") {{ formnum(timeData.seconds) }}
  .cell-item(class="flex mt-[.4rem]")
    .txt(class="flex-1 text-[.28rem]") {{ $t('lanchpad.cell1txt') }}
    .val(class="text-[.32rem]") {{ item.estimatedValue }} SOL (1M USDT)
  .cell-item(class="flex mt-[.5rem]")
    .txt(class="flex-1 text-[.28rem]") {{ $t('lanchpad.cell2txt') }}
    .val(class="text-[.32rem]") {{ item.applyTotal }} 张
  .cell-item(class="flex mt-[.5rem]")
    .txt(class="flex-1 text-[.28rem]") {{ $t('lanchpad.cell3txt') }}
    .val(class="text-[.32rem]") {{ item.sellTate * 100 + '%' }}
  .cell-item(class="flex mt-[.58rem]")
    .txt(class="flex-1 text-[.28rem]") {{ $t('lanchpad.cell4txt') }}
    .val(class="text-[.32rem] text-yellow font-medium") {{ item.cycleAmount }} 张
  .progress-box(class="relative bg-progressbg h-[.24rem] mt-[.44rem] w-full rounded-[.12rem]")
    .progress(class="absolute h-[.32rem] left-0 top-[-.04rem] bg-thecol rounded-[.16rem] text-center text-normal text-[.24rem] leading-[.32rem]" :class="getStyle(item)") 0%
  .amount-box(class="text-right text-startcolor/[.8] mt-[.2rem]")
    span(class="text-normal") {{ item.sellAmount }}/
    | {{ item.cycleAmount }} SOL
  XButton(v-if="tabIndex === 1" class="mt-[.56rem] btn-purple-img h-[.8rem]" :text="$t('lanchpad.btncomesoontxt')")
  XButton(v-else-if="tabIndex === 2" @click="$router.push('/launchpad')" class="mt-[.56rem] btn-purple-img h-[.8rem]" :text="$t('lanchpad.btngoapply')")
  XButton(v-else-if="tabIndex === 3" @click="$router.push('/launchpad')" class="mt-[.56rem] btn-purple-img h-[.8rem]" :text="$t('lanchpad.btndetail')")
</template>
<script setup>
import {ref} from "vue";
const props = defineProps({
	item: {
		type: Object,
		default: {}
	},
	keyIndex: {
		type: Number,
		default: 0
	},
	tabIndex: {
		type: Number,
		default: 0
	}

})
const getStyle = (item) => {
	if (props.tabIndex === 1) {
		return 'w-[.7rem]'
  } else if (props.tabIndex === 2) {
    return `w-[${(item.sellAmount / item.cycleAmount).toFixed(4) * 1200 * 2 / 100 + 'rem'}]`
  }
}
const formnum = (num) => {
  return num > 9 ? num : ('0' + num)
}
</script>

<style scoped>

</style>
