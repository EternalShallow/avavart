<template lang="pug">
.pageheader(class="fixed flex z-200 top-0 w-full h-152 items-center justify-between")
  div(class="relative z-1 flex items-center pl-60")
    div(class="flex items-center mr-136")
      img(class="w-80 h-80 mr-32" src="@/assets/images/logo.png")
      div(class="font-bold text-64") {{ $t('public.title') }}
    //router-link(to="/" class="mr-120 text-32 uppercase") {{ $t('public.link1') }}
    //router-link(to="/launchpad" class="text-32 uppercase") {{ $t('public.link2') }}
  div(class="relative z-1 flex items-center pr-100")
    div(class="h-96 w-96 flex items-center justify-center mr-24 cursor-pointer")
      img(src="@/assets/images/icon_discord_white.png")
    div(class="h-96 w-96 flex items-center justify-center mr-64 cursor-pointer")
      img(src="@/assets/images/icon_tg_white.png")
    //el-dropdown(trigger="click")
    el-dropdown(trigger="hover")
      div(class="menu-btn flex text-28 text-black items-center justify-center cursor-pointer h-[.72rem] rounded-[.36rem] bg-normal pl-[.14rem] pr-[.36rem]")
        img(class="h-32 w-32 block mr-8" src="@/assets/images/icon_language.png")
        div {{langTxt}}
        img(class="h-28 w-28 block ml-8" src="@/assets/images/icon_arrow_down.png")
      template(#dropdown)
        el-dropdown-menu
          el-dropdown-item(v-for="(v,i) in langList" @click="langSwitch(v)" :class="v.local === $i18n.locale ? 'active' : ''") {{v.txt}}
    //div(class="uppercase h-84 flex items-center px-46 bg-thecol rounded-12 cursor-pointer active:bg-thecol/[.6]")
    //  | {{ $t('public.connect') }}
  div(class="absolute w-full h-full top-0 bg-red")
div(class="h-152")
</template>

<script setup>
  import Config from '@/util/config'
	import {getCurrentInstance, ref, onMounted, computed, watch} from "vue";
  import {useStore} from "vuex";
	const { proxy } = getCurrentInstance()
  const langTxt = ref('')
  const langList = ref(Config.languages)
  const store = useStore()
  const getLocalTxt = (lang) => {
	  let lan = Config.languages.find(item => item.local === proxy.$i18n.locale)
	  langTxt.value = lan.txt
  }
  onMounted(() => {
	  getLocalTxt()
    console.log(langList.value)
  })
  watch(() => store.state.system.lang, (newval) => {
	  console.log(newval)
	  getLocalTxt()
  }, {immediate: true})
	const langSwitch = (lang) => {
		console.log(lang)
		if (proxy.$i18n.locale !== lang.local) {
			proxy.$i18n.locale = lang.local
			store.commit('system/SET_SYSTEM_LOCALE', lang.local)
			localStorage.setItem('locale', lang.local)
			// if (window.location.href.indexOf('language') > -1 || window.location.href.indexOf('locale') > -1) {
			// 	let a = getQuery(window.location.href)
			// 	let url = a.url
			// 	let res = a.result
			// 	res['language'] = lang.local
			// 	res['locale'] = lang.local
			// 	let arr = []
			// 	for (let i in res) {
			// 		arr.push(`${i}=${res[i]}`)
			// 	}
			// 	window.location.replace(`${url}?${arr.join('&')}`)
			// }
		}
	}

</script>
<style lang="stylus">
  .el-dropdown__popper.el-popper{
    width 3.16rem
    box-shadow none
    border none
    background-color #fff
    border-radius .12rem
    padding .16rem
  }
  .el-dropdown-menu{
    padding 0
  }
  .el-dropdown-menu__item{
    height .6rem
    border-radius: 4px;
    font-weight: 500;
    color #000
    margin-top .08rem
    &:first-child{
      margin-top 0
    }
  }
  .el-dropdown, .menu-btn{
    --el-dropdown-menu-box-shadow: none;
    --el-dropdown-menuItem-hover-fill: none;
    --el-dropdown-menuItem-hover-color: none;
    outline-color: #fff !important
    outline-width 0 !important
  }
  .el-dropdown-menu__item.active, .el-dropdown-menu__item:not(.is-disabled):focus{
    background: #E8E8E8;
    color #000
  }
</style>
