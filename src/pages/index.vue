<template lang="pug">
PageHeader
div(class="bg-red w-full overflow-x-hidden")
  .wrapper
    div(class="text-center pb-[.92rem]")
      div(class="h-120")
      img(class="w-[3rem] h-[3rem] block mr-auto ml-auto" src="@/assets/images/logo_reb_white.png")
      div(class="text-[1.04rem] whitespace-pre-line leading-[1.5rem] mt-[.4rem]") {{ $t('index.toptxt') }}
      div(class="text-32 px-[3.2rem] mt-48") {{ $t('index.toptip') }}
      div(class="flex justify-center")
        XButton(@click="showDialogLogin" :theTheme="'confirm'" class="mr-[.56rem] bg-normal/[.5] mt-66 w-[4.2rem] h-1.04rem" :text="$t('public.link2')")
        XButton(@click="showDialogLogin" :theTheme="'get'" class="bg-normal mt-66 text-black w-[4.2rem] h-1.04rem" :text="$t('public.link3')")
  //.swiper-list(class="w-full overflow-x-auto px-[.48rem] flex center")
    .swiper-item(class="bg-white rounded-[.32rem] w-[5rem] h-[7.08rem] px-[.2rem] pt-[.2rem] pb-[.32rem]" :class="i !==0 ? 'ml-[.4rem]' : 'ml-0'" v-for="(v, i) in artList")
      div(class="w-[4.6rem] h-[5.44rem] overflow-hidden")
        img(src="@/assets/images/swiper_img1.png" class="w-full block")
      div {{v.name}}
      div {{v.city}}
  swiper(ref="{swiperRef}"
    :slidesPerView="'auto'"
    :initialSlide="1"
    :centeredSlides="false"
    :pagination="{type: 'fraction'}"
    :navigation="false"
    class="mySwiper w-full overflow-x-auto px-[.48rem] flex center pb-[1.2rem] pt-[.52rem]")
    swiper-slide(class="text-center text-black0 bg-white rounded-[.32rem] cursor-pointer !w-[5rem] h-[7.08rem] px-[.2rem] pt-[.2rem] pb-[.32rem]" :class="i !==0 ? 'ml-[.4rem]' : 'ml-0'" v-for="(v, i) in artList")
      div(class="w-[4.6rem] h-[5.44rem] overflow-hidden")
        img(src="@/assets/images/swiper_img1.png" class="w-full block")
      div(class="mt-[.24rem] text-32 font-bold") {{v.name}}
      div(class="text-gray text-28") {{v.city}}
  .wrapper(class="text-center pt-[.6rem]")
    div(class="text-[1.04rem] whitespace-pre-line leading-[1.5rem] mt-[.4rem]") {{ $t('meet.title') }}
    div(class="text-36 px-[3.2rem] mt-48") {{ $t('meet.desc') }}
    div(class="flex items-center mt-[2.52rem] justify-center")
      div(class="relative w-[9rem] h-[4.6rem] bg-white rounded-[.32rem] px-[1.04rem] pt-[1.92rem] pb-[1.04rem] text-black0 mr-[.96rem]")
        img(src="@/assets/images/img_meet_1.png" class="absolute w-[2.64rem] h-[2.64] block top-[-1.32rem] left-[3.16rem]")
        div(class="text-[.4rem] font-bold") {{$t('meet.intro1title')}}
        div(class="text-[.32rem] mt-[.16rem]") {{$t('meet.intro1desc')}}
      div(class="relative w-[9rem] h-[4.6rem] bg-white rounded-[.32rem] px-[1.04rem] pt-[1.92rem] pb-[1.04rem] text-black0")
        img(src="@/assets/images/img_meet_2.png" class="absolute w-[2.64rem] h-[2.64] block top-[-1.32rem] left-[3.16rem]")
        div(class="text-[.4rem] font-bold") {{$t('meet.intro2title')}}
        div(class="text-[.32rem] mt-[.16rem]") {{$t('meet.intro2desc')}}
    div(class="text-[1.04rem] whitespace-pre-line leading-[1.5rem] mt-[1.8rem]") {{ $t('meet.title1') }}
    div(class="text-36 px-[3.2rem] mt-8") {{ $t('meet.desc1') }}
    div(class="flex items-center mt-[2.52rem] justify-center")
      div(class="relative w-[9rem] h-[4.6rem] bg-white rounded-[.32rem] px-[1.04rem] pt-[1.92rem] pb-[1.04rem] text-black0 mr-[.96rem]")
        img(src="@/assets/images/img_meet_3.png" class="absolute w-[2.64rem] h-[2.64] block top-[-1.32rem] left-[3.16rem]")
        div(class="text-[.4rem] font-bold") {{$t('meet.intro3title')}}
        div(class="text-[.32rem] mt-[.16rem]") {{$t('meet.intro3desc')}}
      div(class="relative w-[9rem] h-[4.6rem] bg-white rounded-[.32rem] px-[1.04rem] pt-[1.92rem] pb-[1.04rem] text-black0")
        img(src="@/assets/images/img_meet_4.png" class="absolute w-[2.64rem] h-[2.64] block top-[-1.32rem] left-[3.16rem]")
        div(class="text-[.4rem] font-bold") {{$t('meet.intro4title')}}
        div(class="text-[.32rem] mt-[.16rem]") {{$t('meet.intro4desc')}}
  div(class="mt-[1.2rem] pt-[1.2rem] pb-[1.2rem] bg-red1")
    .wrapper(class="text-center")
      div(class="text-[1.04rem] whitespace-pre-line leading-[1.5rem] mt-[.4rem]") {{ $t('roadmap.title') }}
      div(class="text-32 px-[3.2rem] mt-48") {{ $t('roadmap.desc') }}
      div(class="flex justify-center mt-[1.2rem]")
        div(class="w-[5.6rem] h-[5.6rem] rounded-[.32rem] border border-bd1 px-[.48rem] py-[.48rem]")
          div(class="font-bold text-36") {{$t('roadmap.q1title')}}
          img(src="@/assets/images/icon_raodmap_1.png" class="w-[2.52rem] h-[2.52rem] block mx-auto mt-[.32rem]")
          div(class="mt-[.32rem] font-bold text-36") {{$t('roadmap.q1subtitle')}}
          div(class="text-28 mt-[.08rem]") {{$t('roadmap.q1desc')}}
        div(class="w-[5.6rem] h-[5.6rem] rounded-[.32rem] border border-bd1 ml-[.48rem] mr-[.48rem] px-[.48rem] py-[.48rem]")
          div(class="font-bold text-36") {{$t('roadmap.q2title')}}
          img(src="@/assets/images/icon_raodmap_2.png" class="w-[2.52rem] h-[2.52rem] block mx-auto mt-[.32rem]")
          div(class="mt-[.32rem] font-bold text-36") {{$t('roadmap.q2subtitle')}}
          div(class="text-28 mt-[.08rem]") {{$t('roadmap.q2desc')}}
        div(class="w-[5.6rem] h-[5.6rem] rounded-[.32rem] border border-bd1 px-[.48rem] py-[.48rem]")
          div(class="font-bold text-36") {{$t('roadmap.q3title')}}
          img(src="@/assets/images/icon_raodmap_3.png" class="w-[2.52rem] h-[2.52rem] block mx-auto mt-[.32rem]")
          div(class="mt-[.32rem] font-bold text-36") {{$t('roadmap.q3subtitle')}}
          div(class="text-28 mt-[.08rem]") {{$t('roadmap.q3desc')}}
      div(class="w-[17.66rem] h-[4.28rem] rounded-[.32rem] border border-bd1 px-[.48rem] py-[.48rem] mx-auto mt-[.32rem]")
        img(src="@/assets/images/icon_raodmap_4.png" class="w-[6.46rem] h-[1.76rem] block mx-auto mt-[.32rem]")
        div(class="mt-[.32rem] font-bold text-36") {{$t('roadmap.qtitle')}}
        div(class="text-28 mt-[.08rem]") {{$t('roadmap.qdesc')}}
  PageFooter
DialogLogin(:isShow="isShowLoginDialog" @confirm="loginTiwwiter" @close="handleClose")
</template>

<script setup>
import PageHeader from '@/components/PageHeader/index.vue'
import PageFooter from '@/components/PageFooter/index.vue'
import DialogLogin from '@/components/DialogLogin/index.vue'
// Import Swiper Vue.js components
import { Swiper, SwiperSlide } from 'swiper/vue'
// Import Swiper styles
import 'swiper/css';
import { getTwitterJumpUrl, callback, login } from "@/api/base.js"
import {getCurrentInstance, ref, onMounted, computed, watch} from "vue";
import { useRouter } from 'vue-router'
import {useStore} from "vuex";
import {getCookie, removeCookie} from "../util/cookie";
const { proxy } = getCurrentInstance()
const store = useStore()
const router = useRouter()

const isShowLoginDialog = ref(false)
const artList = ref([
	{
		name: "JJ Lin",
		city: 'Taiwan'
	},
  {
  	name: "Lisa",
    city: 'Taiwan'
  },
	{
		name: "Lady gaga",
		city: 'Taiwan'
	},
	{
		name: "jay zhou",
		city: 'Taiwan'
	},
	{
		name: "Stephen Chow",
		city: 'Taiwan'
	},
	{
		name: "JJ Lin",
		city: 'Taiwan'
	},
	{
		name: "Lisa",
		city: 'Taiwan'
	},
	{
		name: "Lady gaga",
		city: 'Taiwan'
	},
	{
		name: "jay zhou",
		city: 'Taiwan'
	},
	{
		name: "Stephen Chow",
		city: 'Taiwan'
	},
	{
		name: "JJ Lin",
		city: 'Taiwan'
	},
	{
		name: "Lisa",
		city: 'Taiwan'
	},
	{
		name: "Lady gaga",
		city: 'Taiwan'
	},
	{
		name: "jay zhou",
		city: 'Taiwan'
	},
	{
		name: "Stephen Chow",
		city: 'Taiwan'
	},
	{
		name: "jay Wu",
		city: 'Taiwan'
	},
	{
		name: "JJ Lin",
		city: 'Taiwan'
	},
	{
		name: "Lisa",
		city: 'Taiwan'
	},
	{
		name: "Lady gaga",
		city: 'Taiwan'
	},
	{
		name: "jay zhou",
		city: 'Taiwan'
	},
	{
		name: "Stephen Chow",
		city: 'Taiwan'
	},
	{
		name: "jay Wu",
		city: 'Taiwan'
	}
])
const showDialogLogin = () => {
	isShowLoginDialog.value = true
}
const loginTiwwiter = () =>{
	// isShowLoginDialog.value = false
	getTwitterJumpUrl().then(res => {
		console.log(res)
	  window.location.href = res.jump_url
	})
}
const handleClose = () => {
	isShowLoginDialog.value = false
}
onMounted(() => {
  console.log(router.currentRoute.value.query)
  const { oauth_token, oauth_verifier } = router.currentRoute.value.query
  // if (getCookie("authorization")) {
	//   login().then(res1 => {
	// 	  console.log(res1)
	//   })
  // } else
  	if (router.currentRoute.value.query && oauth_token && oauth_verifier){
	  callback(oauth_token, oauth_verifier).then(res => {
      login().then(res1 => {
      	console.log(res1)
      })
    }).catch(err => {
    	removeCookie('authorization')
    })
  }
})
</script>
<style>
  .swiper{
    padding-left: .48rem;
    padding-right: .48rem;
  }
</style>
