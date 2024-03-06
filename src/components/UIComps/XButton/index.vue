<template lang="pug">
div(class="font-medium relative rounded-[1.04rem] flex items-center justify-center active:opacity-60 h-[1.04rem] text-black text-28 cursor-pointer" :class="getThemeClass")
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
	    tmp.push('opacity-50')
    } else {
      tmp.push('opacity-50')
    }
  } else if (props.thePending) {
    if (props.theTheme === 'confirm') {
      // tmp.push('bg-thecol/[.6] text-white')
	    tmp.push('opacity-50')
    } else {
      tmp.push('opacity-50')
    }
  } else {
    // if (props.theTheme === 'confirm') {
	  //   tmp.push('opacity-50')
    // } else {
	  //   tmp.push('opacity-50')
    // }
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
