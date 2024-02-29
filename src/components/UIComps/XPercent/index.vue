<template lang="pug">
div(class="h-16 relative bg-percent rounded-16 overflow-hidden")
  div(class="absolute left-0 rounded-l-16 h-16 bg-thecol transition-all" :style="'width: ' + percent + '%'")
</template>

<script setup>
const props = defineProps({
  percent: {
    type: Number,
    default: 0
  }
})
</script>
