<template lang="pug">
div(class="border-t-1 border-l-1 border-table")
  div(class="flex text-20 text-white/[.5] h-52 items-center border-table border-b-1")
    div(class="h-52 flex justify-start items-center w-[2.76rem] px-12 border-table border-r-1") {{ $t('rule.table1') }}
    div(class="h-52 flex-1 flex justify-center items-center px-12 border-table border-r-1")
      | {{ $t('rule.table2') }}
      van-popover.detailpopover(theme="dark" :overlay="true" :overlay-style="{'background': 'none'}" placement="bottom")
        template(#default)
          div(class="p-24 text-24 leading-32") {{ type === 'up' ? $t('rule.uprule') : $t('rule.downrule') }}
        template(#reference)
          //img(class="w-24 h-24 ml-4" src="@/assets/images/icons/tip.svg")
    div(class="h-52 flex justify-center items-center flex-1 px-12 border-table border-r-1") {{ $t('rule.table3') }}
    div(class="h-52 flex justify-center items-center flex-1 px-12 border-table border-r-1") {{ $t('rule.table4') }}
  div(class="flex text-20 text-white h-64 border-table border-b-1 items-center" v-for="line in data")
    div(v-if="line.vemax > 0" class="h-64 flex items-center justify-start w-[2.76rem] px-12 border-table border-r-1") {{ line.vemin }} ≤ {{ $t('index.step2') }}{{ ' < ' + line.vemax }}
    div(v-else class="h-64 flex items-center justify-start w-[2.76rem] px-12 border-table border-r-1") {{ $t('index.step2') }} ≥ {{ line.vemin }}
    div(class="h-52 flex justify-center items-center flex-1 px-12 border-table border-r-1 text-tablesp") {{ line.thePer }}%
    div(class="h-52 flex justify-center items-center flex-1 px-12 border-table border-r-1") {{ line.upPer }}%
    div(class="h-52 flex justify-center items-center flex-1 px-12 border-table border-r-1") {{ line.downPer }}%
</template>

<script setup>
const props = defineProps({
  data: {
    type: Array,
    default: []
  },
  type: {
    type: String,
    default: 'up'
  },
})
</script>
