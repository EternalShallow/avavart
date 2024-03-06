<template lang="pug">
PageHeader
div(class="bg-red w-full overflow-x-hidden")
  div(class="text-center text-nowmal pt-[1.2rem]")
    div(class="text-[1.12rem] font-bold") 231,21
    div(class="text-[.48rem] font-bold mt-[.32rem]") {{$t('howgetairdrop.totaltxt')}}
    div(class="text-[.28rem] font-bold mt-[.08rem]") {{$t('howgetairdrop.updatetxt')}}
    XButton(:theTheme="'get'" class="bg-normal mt-[1.2rem] text-[.4rem] text-black w-[4.2rem] h-1.04rem mx-auto" :text="$t('howgetairdrop.logout')")
    div(class="text-[.32rem] mt-[.24rem]") {{$t('howgetairdrop.desc111')}}

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
</template>

<script>
	export default {
		name: "howGetAirdrop"
	}
</script>

<style scoped>

</style>
