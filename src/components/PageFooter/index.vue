<template lang="pug">
.wrapper(class="py-[1rem]")
  div(class="relative z-1 text-center")
    div(class="flex-1 pl-48 text-[1.04rem] font-bold") {{ $t('footer.title') }}
    div(class="text-36 mt-[.08rem]") {{ $t('footer.desc') }}
    div(class="flex-1 flex items-center justify-center mt-[.54rem]")
      a(class="ml-40" href="#" target="_blank" rel="noopener")
        img(class="w-[1.14rem] h-[1.14rem]" src="@/assets/images/icon_footer1.png")
      a(class="ml-40" href="#" target="_blank" rel="noopener")
        img(class="w-[1.14rem] h-[1.14rem]" src="@/assets/images/icon_footer2.png")
</template>

<script setup>
</script>
