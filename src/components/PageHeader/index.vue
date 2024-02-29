<template lang="pug">
.pageheader(class="fixed flex z-200 top-0 w-full h-160 items-center justify-between")
  div(class="relative z-1 flex items-center pl-60")
    div(class="flex items-center mr-136")
      img(class="w-80 h-80 mr-16" src="@/assets/images/logo.png")
      div(class="font-Menlo font-medium text-40 uppercase italic") {{ $t('public.title') }}
    router-link(to="/" class="mr-120 text-32 uppercase") {{ $t('public.link1') }}
    router-link(to="/launchpad" class="text-32 uppercase") {{ $t('public.link2') }}
  div(class="relative z-1 flex items-center pr-100")
    div(class="h-84 w-84 flex items-center justify-center mr-46 cursor-pointer")
      img(src="@/assets/images/icons/lang.svg")
    //div(class="uppercase h-84 flex items-center px-46 bg-thecol rounded-12 cursor-pointer active:bg-thecol/[.6]")
    //  | {{ $t('public.connect') }}
  div(class="absolute w-full h-full top-0 opacity-10 bg-white/[.6]")
div(class="h-160")
</template>

<script setup>
</script>
