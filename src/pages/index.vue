<template lang="pug">
PageHeader
div(class="absolute w-full min-h-[20.28rem] overflow-hidden top-0")
  img(class="block table:max-w-[36rem] table:w-[36rem] absolute top-0 left-1/2 -translate-x-1/2" src="@/assets/images/mainbg.png")
.wrapper
  div(class="h-[11.64rem] text-center")
    div(class="h-224")
    div(class="text-[1.36rem] whitespace-pre-line leading-[1.5rem]") {{ $t('index.toptxt') }}
    div(class="text-40 leading-54 px-[3.2rem] mt-30") {{ $t('index.toptip') }}
    div(class="flex justify-center")
      XButton(@click="$router.push('/launchpad')" class="mt-66 px-96" :text="$t('public.link2')")
.wrapper(class="bg-black min-h-100 px-60 py-200")
  div(class="absolute left-0 h-2 bg-gradient-to-r from-white to-white/[0] w-full top-0")
  div(class="relative pl-[4.66rem]")
    div(class="absolute h-240 flex justify-center items-center text-[2.24rem] w-304 left-0") 01
    div(class="leading-[1.2rem] text-[.8rem] font-bold") {{ $t('index.tit1') }}
    div(class="mt-60 text-40 leading-60 text-white/[.6]") {{ $t('index.txt1') }}
    div(class="absolute bg-spcol/[.6] w-2 top-280 left-152 -bottom-380")
  div(class="relative pl-[4.66rem] mt-[4.2rem]")
    div(class="absolute h-240 flex justify-center items-center text-[2.24rem] w-304 left-0") 02
    div(class="leading-[1.2rem] text-[.8rem] font-bold") {{ $t('index.tit2') }}
    div(class="mt-60 text-40 leading-60 text-white/[.6]") {{ $t('index.txt2') }}
    div(class="absolute bg-spcol/[.6] w-2 top-280 left-152 -bottom-380")
  div(class="relative pl-[4.66rem] mt-[4.2rem]")
    div(class="absolute h-240 flex justify-center items-center text-[2.24rem] w-304 left-0") 03
    div(class="leading-[1.2rem] text-[.8rem] font-bold") {{ $t('index.tit3') }}
    div(class="mt-60 text-40 leading-60 text-white/[.6]") {{ $t('index.txt3') }}
PageFooter
</template>

<script setup>
import PageHeader from '@/components/pageheader/index.vue'
import PageFooter from '@/components/PageFooter/index.vue'
</script>
