<template lang="pug">
div(class="flex flex-col items-center")
  img(class="w-[1.2rem] h-[1.2rem]" src="./empty.png")
  div(class="mt-16 px-90 leading-44 text-28 text-[#7D7D83] whitespace-pre-line text-center") {{ text }}
  //div(@click="openShare($i18n.locale, account)" v-if="showShare" class="h-52 bg-thecol2 active:bg-thecol2/[.6] rounded-52 text-24 flex justify-center items-center px-32 mt-16") {{ $t('index.share') }}
</template>

<script setup>
import { openShare } from '@/util/main.js'
import {computed} from "vue";
import { useStore } from 'vuex'

const store = useStore()

const account = computed(() => store.state.system.account)

const props = defineProps({
  text: {
    type: String,
    default: 'button'
  },
  theme: {
    type: String,
    default: 'light'
  },
  showShare: {
    type: Boolean,
    default: true
  }
})


</script>
