<template lang="pug">
div(class="font-medium relative rounded-[1.08rem] flex items-center justify-center active:opacity-60 h-108 text-28 text-normal cursor-pointer" :class="getThemeClass")
  div(v-if="hasTip !== ''" class="absolute h-40 flex items-center -top-20 text-20 right-0 px-8 text-white bg-[#FEB700] rounded-l-8 rounded-tr-16") {{ hasTip }}
  van-loading.loading(class="mr-10" type="spinner" :color="(theDisabled || (thePending && theTheme !== 'confirm')) ? '#A6ACBA' : '#fff'" size="18" v-if="thePending")
  | {{ text }}
</template>

<script setup>
import {computed} from "vue";

const getThemeClass =computed(() => {
  let tmp = []
  if (props.theDisabled) {
    if (props.theTheme === 'confirm') {
      // tmp.push('bg-thecol/[.4] text-white/[.4]')
    } else {
      tmp.push('bg-thecol/[.4] text-white/[.4]')
    }
  } else if (props.thePending) {
    if (props.theTheme === 'confirm') {
      // tmp.push('bg-thecol/[.6] text-white')
    } else {
      tmp.push('bg-thecol/[.6] text-white/[.6]')
    }
  } else {
    if (props.theTheme === 'confirm') {
      // tmp.push('bg-thecol text-white')
    } else {
      tmp.push('bg-thecol text-white')
    }
  }
  return tmp.join(' ')
})

const props = defineProps({
  text: {
    type: String,
    default: 'button'
  },
  theTheme: {
    type: String,
    default: 'default'
  },
  theDisabled: {
    type: Boolean,
    default: false
  },
  theDisabled2: {
    type: Boolean,
    default: false
  },
  thePending: {
    type: Boolean,
    default: false
  },
  hasTip: {
    type: String,
    default: ''
  }
})
</script>
