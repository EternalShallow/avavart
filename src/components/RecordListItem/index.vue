<template lang="pug">
div(class="mb-60 bg-tabbg rounded-18 pt-68 pl-80 pb-62 pr-78")
  div(class="flex items-center h-100 text-48 font-bold mb-40")
    img(class="w-100 h-100 mr-20" src="@/assets/images/logo.png")
    | SOSD
  div(class="mb-48 flex justify-between leading-38")
    div(class="text-28") {{ $t('mine.tip1') }}
    div(class="text-32") 50000 SOL
  div(class="mb-48 flex justify-between leading-38")
    div(class="text-28") {{ $t('mine.tip2') }}
    div(class="text-32") 10 {{ $t('mine.unit') }}(10000SOSD)
  div(class="mb-48 flex justify-between leading-38")
    div(class="text-28") {{ $t('mine.tip3') }}
    div(class="text-32") 100000 {{ $t('mine.unit') }}(10%)
  div(class="mb-48 flex justify-between leading-38")
    div(class="text-28") {{ $t('mine.tip4') }}
    div(class="text-28 text-yellow") {{ $t('mine.status' + 1) }}
  div(class="flex justify-between leading-38")
    div(class="text-28") {{ $t('mine.tip5') }}
    div(class="text-28 text-right leading-34")
      div 500 SOL/{{ $t('mine.unit') }}
      div(class="text-startcolor") ≈200USDT/{{ $t('mine.unit') }}
</template>

<script setup>
const props = defineProps({
  theItem: {
    type: Object,
    default: null
  }
})
</script>
