<template lang="pug">
div(class="flex justify-center items-center h-36")
  div(class="mr-24 h-6 w-52 rounded-6 bg-gradient-to-r from-[#111949]/[0] to-[#6FFFF6]")
  div(class="text-30 bg-clip-text text-transparent bg-gradient-to-b from-[#FDFDFF] to-[#B6FFFA] font-semibold") {{ text }}
  div(class="ml-24 h-6 w-52 rounded-6 bg-gradient-to-l from-[#111949]/[0] to-[#6FFFF6]")
</template>

<script setup>
const props = defineProps({
  text: {
    type: String,
    default: 'title'
  }
})
</script>
