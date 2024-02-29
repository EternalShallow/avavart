<template lang="pug">
.wrapper(class="mt-160")
  div(class="absolute w-full h-[5rem] overflow-hidden")
    img(class="absolute w-[25.6rem] h-[5rem] left-1/2 -translate-x-1/2 top-0" src="@/assets/images/footbg.png")
  div(class="h-322")
  div(class="h-180 bg-blockbg relative z-1 flex justify-between items-center")
    div(class="flex-1 pl-48 flex items-center uppercase text-40 font-Menlo italic")
      img(class="w-80 h-80 mr-16" src="@/assets/images/logo.png")
      | {{ $t('public.title') }}
    div(class="text-26 font-medium") {{ $t('footer.lience') }}
    div(class="flex-1 flex items-center justify-end pr-50")
      a(class="ml-40" href="#" target="_blank" rel="noopener")
        img(class="w-64 h-64" src="@/assets/images/icons/footlink1.png")
      a(class="ml-40" href="#" target="_blank" rel="noopener")
        img(class="w-64 h-64" src="@/assets/images/icons/footlink2.png")
      a(class="ml-40" href="#" target="_blank" rel="noopener")
        img(class="w-64 h-64" src="@/assets/images/icons/footlink3.png")
div(class="h-150")
</template>

<script setup>
</script>
