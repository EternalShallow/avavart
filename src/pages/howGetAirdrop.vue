<template lang="pug">
PageHeader
div(class="bg-red w-full overflow-x-hidden")
  div(class="text-center text-nowmal pt-[1.2rem]")
    div(class="text-[1.12rem] font-bold") {{userInfo.score}}
    div(class="text-[.48rem] font-bold mt-[.32rem]") {{$t('howgetairdrop.totaltxt')}}
    div(class="text-[.28rem] font-bold mt-[.08rem]") {{$t('howgetairdrop.updatetxt')}}
    XButton(:theTheme="'get'" class="bg-normal mt-[1.2rem] text-[.4rem] text-black w-[4.2rem] h-1.04rem mx-auto" :text="userInfo.name === '--' ? $t('howgetairdrop.login'): $t('howgetairdrop.logout')" @click="logEvent")
    div(class="text-[.32rem] mt-[.24rem]") {{userInfo.name}}

    div(class="mt-[.72rem] pt-[1.92rem] pb-[1.14rem] bg-red1")
      .wrapper(class="text-center")
        div(class="text-[1.08rem] font-bold") {{$t('howgetairdrop.howget')}}
        div(class="text-[.36rem] mt-[.08rem]") {{$t('howgetairdrop.howgetdesc')}}
        div(class="w-[17.64rem] h-[7.06rem] px-[1.2rem] py-[.68rem] bg-white mx-auto mt-[.8rem] rounded-[.48rem] text-black0")
          div(class="flex items-center h-[1.48rem] mb-[.64rem]")
            div(class="bg-gray1 w-[.68rem] h-[.68rem]  text-center leading-[.68rem] rounded-[.68rem]") 1
            img(src="@/assets/images/icon_how_get1.png" class="w-[1.48rem] h-[1.48rem] mx-[.28rem] block")
            div(class="text-left")
              div(class="text-[.4rem] font-bold") {{$t('howgetairdrop.howget1title')}}
              div(class="text-[.28rem] mt-[.08rem]") {{$t('howgetairdrop.howget1desc')}}
          div(class="flex items-center h-[1.48rem] mb-[.64rem]")
            div(class="bg-gray1 w-[.68rem] h-[.68rem]  text-center leading-[.68rem] rounded-[.68rem]") 2
            img(src="@/assets/images/icon_how_get2.png" class="w-[1.48rem] h-[1.48rem] mx-[.28rem] block")
            div(class="text-left")
              div(class="text-[.4rem] font-bold") {{$t('howgetairdrop.howget2title')}}
              div(class="text-[.28rem] mt-[.08rem]") {{$t('howgetairdrop.howget2desc')}}
          div(class="flex items-center h-[1.48rem]")
            div(class="bg-gray1 w-[.68rem] h-[.68rem]  text-center leading-[.68rem] rounded-[.68rem]") 3
            img(src="@/assets/images/icon_how_get3.png" class="w-[1.48rem] h-[1.48rem] mx-[.28rem] block")
            div(class="text-left")
              div(class="text-[.4rem] font-bold") {{$t('howgetairdrop.howget3title')}}
              div(class="text-[.28rem] mt-[.08rem]") {{$t('howgetairdrop.howget3desc')}}
  PageFooter
DialogLogin(:isShow="isShowLoginDialog" @confirm="getTiwwiterUrl" @close="handleClose")
</template>

<script setup>
	import {computed, onMounted, ref} from "vue";
	import {useStore} from "vuex";
	import {callback, getTwitterJumpUrl, login} from "../api/base";
	import {getCookie, removeCookie} from "../util/cookie";
	const store = useStore()
	const isShowLoginDialog = ref(false)
  const userInfo = ref({
	  "name": "--",
	  "screen_name": "",
	  "profile_image_url_https": "",
	  "score": 0
  })
	const useInfo = computed(() => store.state.system.useInfo)
	const showDialogLogin = () => {
		loginTiwwiter()
	}
	const getTiwwiterUrl = () =>{
		// isShowLoginDialog.value = false
		getTwitterJumpUrl().then(res => {
			console.log(res)
			window.location.href = res.jump_url
		})
	}
	const handleClose = () => {
		isShowLoginDialog.value = false
	}
	const loginTiwwiter = async (isInit = false) => {
		const res = await login()
		console.log(res)
		if (res.code === -1) {
			if (!isInit) {
				console.log(12312321)
				isShowLoginDialog.value = true
			}
		} else {
			userInfo.value = res.user
			store.dispatch('system/setUserInfo', res.user)
		}
	}
	const logEvent = () => {
		if(userInfo.value.name === '--') {
			console.log(213123)
			loginTiwwiter()
    } else {
			removeCookie('authorization')
			userInfo.value = {
				"name": "--",
				"screen_name": "",
				"profile_image_url_https": "",
				"score": 0
			}
    }
  }
  const clearToken = () => {

  }
	onMounted(() => {
		loginTiwwiter(true)
	})
</script>

<style scoped>

</style>
