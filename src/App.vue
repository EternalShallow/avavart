<template lang="pug">
  router-view(v-slot="{ Component }")
    keep-alive
      component(:is="Component" v-if="$route.meta.keepAlive" :key="$route.path")
    component(:is="Component" v-if="!$route.meta.keepAlive")
</template>

<script setup>
import {computed, getCurrentInstance, onMounted, watch} from 'vue'
import { useRouter } from 'vue-router'
import {useStore} from "vuex";
import { useRoute } from 'vue-router'
import Config from "@/util/config.js";
import { useI18n } from 'vue-i18n'
// import {checkUserSign, getNashConfig, getUserInfo, getUserSign} from "@/api/system.js";
import BigNumber from "bignumber.js";

const router = useRouter()
const { locale } = useI18n()
const { proxy } = getCurrentInstance()
const route = useRoute()
const store = useStore()
let retryEthreumNums = 0

const account = computed(() => store.state.system.account)
const theVeApprove = computed(() => store.state.user.theVeApprove)

const windowClientWidthChange = () => {
  store.dispatch('system/setWindowWidth', document.documentElement.clientWidth)
  let a = 450
  if (document.documentElement.clientWidth > a) {
    // document.documentElement.style.fontSize = '100px'
    document.documentElement.style.fontSize = '50px'
  } else {
    let b = document.documentElement.clientWidth > a ? a : document.documentElement.clientWidth
    document.documentElement.style.fontSize=(b / 7.5) + "px"
  }
}

const copyText = (str) => {
  proxy.$copyText(str).then(function () {
    proxy.$message({
      text: proxy.$t('confirmcode.copy'),
      type: 'success',
    })
  }, function () {
    proxy.$message({
      text: proxy.$t('confirmcode.failed'),
      type: 'danger',
    })
  })
}

const checkEthereum = () => {
  // if(!window.ethereum){
  //   // proxy.$showLoading()
  //   retryEthreumNums++
  //   if(retryEthreumNums < 10) {
  //     console.log('android Ethereum 不存在，再检查')
  //     setTimeout(checkEthereum, 100)
  //   } else {
  //     proxy.$hideLoading()
  //     proxy.$message({
  //       text: proxy.$t('pageerror.ethereumerror')
  //     })
  //     // proxy.$message({
  //     //   text: proxy.$t('pageerror.ethereumerror'),
  //     //   type: 'danger',
  //     // })
  //   }
  // }else{
  //   console.log('android Ethereum 检测')
  //   proxy.$rpc.web3ObjInit()
  //   doMounted()
  // }
}

const doMounted = async () => {
  if (!proxy.$rpc.initial) {
    // proxy.$showLoading()
    // proxy.$message({
    //   text: 'not initial',
    //   type: 'success'
    // })
    await checkChain()
    await frushSystemInfos()
    await doConnect()
    proxy.$rpc.addAccountUsableListener(act => {
      console.log('switch to account ' + act + ' re init account')
      // this.checkAllowance()
    })
  } else {
    await checkChain()
    proxy.$hideLoading()
  }
}

const initTokenInfo = async () => {
  if (!proxy.$rpc.mainReq) {
    return
  }

  // // 获取U的精度
  // let des2 = proxy.$local.getItem(
  //     "tokendecimal_" + proxy.$rpc.chainName,
  //     'usdt'
  // );
  // if (!des2) {
  //   des2 = await proxy.$rpc.mainReq.getUSDTDecimals()
  //   proxy.$local.setItem(
  //     "tokendecimal_" + proxy.$rpc.chainName,
  //     'usdt',
  //     des2
  //   );
  // }
}

const checkChain = async () => {
  // 判断公链链接是否正确
  try {
    await proxy.$rpc.switchChain()
  } catch (e) {
    // 切换
    if (e.code === 4902) {
      try {
        await proxy.$rpc.addChain()
      } catch (ee) {
        console.log(ee)
      } finally {
        proxy.$hideLoading()
      }
    }
    proxy.$hideLoading()
    // proxy.$message({
    //   text: e,
    //   type: 'warning'
    // })
  }
}

const doConnect = async (cb) => {
  // await proxy.$rpc.contractObjInit()
  // console.log('rpc inited')
  proxy.$rpc.initConnection({
    onConnect: async (account, errmsg) => {
      // console.log(account)
      proxy.$hideLoading()
      if (errmsg) {
        console.log('加载回调的msg ' + errmsg)
        let emsg = proxy.$t('pageerror.connectfail')
        proxy.$message({text: emsg, type: 'warning'})
        router.replace('/')
      } else {
        proxy.$rpc.initial = true;

        // 签名
        await store.dispatch('system/setAccount', account)
        frushUserInfos()
        cb && cb()
      }
    },
    onSpender: async () => {
      // console.log('spender attached == ' + spender)
      // proxy.checkAllowance()

      // 获取手续费返佣权限
      // await frushRebateInfo()
    }
  })
}

const frushSystemInfos = async () => {
  await initTokenInfo()
  // await frushPlatInfos()

  store.commit('system/SET_CONFIG_LOADED', true)
}

const frushUserInfos = async () => {
  store.commit('user/SET_USER_BALANCE_LOADED', true)
}

const doReConnect = () => {
  // if (!proxy.$rpc.initial) {
  //   doConnect()
  // }
}


watch(route, () => {
  let locale1 = route.query.locale
  let urllang = route.query.language
  urllang = locale1 || urllang
  let locales = urllang || localStorage.getItem('locale')
  if (!Config.languages.find(e => e.local === locales)) {
    locales = 'en'
  }
  locale.value = locales
}, {
  immediate: true
})

onMounted(() => {
  checkEthereum()

  window.onresize = () => {
    windowClientWidthChange()
  }
  windowClientWidthChange()

  // setTimeout(doReConnect, 1000)
})

defineExpose({
  copyText,
  doReConnect,
})
</script>

<style lang="stylus">
@import "styles/libs.styl"
@import "styles/template.styl"

body{
  background-color #FF000A
  color #fff
}

::-webkit-scrollbar{
  //width: 5px;
  //height 5px
}
::-webkit-scrollbar-thumb{
  background-color #999
  //height 30px
  -webkit-border-radius 7px
  outline 2px solid #fff
  outline-offset -2px
  border 2px solid #fff
}
::-webkit-scrollbar-track-piece{
  background-color #fff
  //-webkit-border-radius 3px
}

.detailpopover{
  max-width 5.34rem
  .van-popover__arrow{
    color #3E414A !important
  }
  .van-popover__content{
    background-color #3E414A !important
  }
  &.sp{
    margin-left -.24rem!important
  }
  &.sp2{
    margin-left .26rem!important
  }
}

.mescroll{
  position fixed
  max-width: 420px;
  top 0
  bottom 0
  z-index 100
  height auto
  background-color #0A0B0D
  //padding-top .88rem
  left 0
  margin-left 50%
  transform translateX(-50%)
}
.pagecontent{
  position: relative;
  z-index 10
  color #fff
  min-height calc(100vh)
}
.mescroll-upwarp{
  display none!important
}
.mescroll-downwarp{
  z-index 100
}

@media only screen and (max-width: 420px){
  .mescroll{
    margin-left 0
    transform none
  }
  .wrapper{
    width 100%
  }
}
@keyframes loading{
  0% {
    transform rotate(0deg)
  }
  25%{
    transform rotate(90deg)
  }
  50%{
    transform rotate(180deg)
  }
  75%{
    transform rotate(270deg)
  }
  100%{
    transform rotate(360deg)
  }
}

// tab自定义样式
.pagetab{
  .van-tabs__wrap {
    height .52rem !important
    //border-bottom 0.02rem solid rgba(242, 244, 247, 0.75)
    //width 7.02rem
    margin 0 auto
    padding-left .24rem

    .van-tabs__nav {
      height .4rem
      background none
      //background-color #fff
      //border-radius .08rem
      padding-bottom .12rem

      .van-tab {
        font-size .28rem
        color #777E90
        position: relative;
        z-index 10
        flex none
        margin-right .64rem
      }

      .van-tab--active {
        color #fff
        font-weight 500
      }

      .van-tabs__line {
        height .04rem
        border-radius .04rem
        background-color #fff
        width .32rem
        //top .04rem
        bottom 0
      }
    }
  }
}
</style>
