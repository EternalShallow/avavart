<template lang="pug">
.pagemask(v-if="!isMaskHide" v-show="isShow" :class="isMobile() && 'pagemask-mobile'")
  .maskdetail(@click.stop="nonefun")
    img.closebtn(v-if="type !== 'loading'" @click="doClose" src="./icon-close-gray.png")
    //.masktitle {{ t('hashmask.title') }}
    .statuicons
      img.loading(v-if="type === 'loading'" src="./icon-loading.png")
      img(v-if="type === 'waring'" src="./icon-warning.png")
      img(v-if="type === 'fail'" src="./icon-fail.png")
      img(v-if="type === 'success'" src="./icon-success.png")
    .statutxt(:class="type")
      | {{ t('hashmask.status.' + type) }}
    .tiptxt TXN Hash:
    .addtxt {{ formatHashStr }}
    .btns
      .maskbtn.btn.btn-disabled(@click="doClose" v-if="type !== 'loading'")
        | {{ t('hashmask.closebtn') }}
      .maskbtn.btn.btn-disabled(@click="doHide" v-else-if="canhide")
        | {{ t('hashmask.hidebtn') }}
      a.maskbtn.btn.btn-blue(v-if="!isInApp" target="_blank" rel="noopener" :href="hashurl + hashstr")
        | {{ t('hashmask.copybtn') }}
      a.maskbtn.btn.btn-blue(v-else @click="openNewWindow(hashurl + hashstr)")
        | {{ t('hashmask.copybtn') }}
.hashtinymask(v-else @click="doShow")
  .statuicons
    img.loading(v-if="type === 'loading'" src="./icon-loading.png")
    img(v-if="type === 'waring'" src="./icon-warning.png")
    img(v-if="type === 'fail'" src="./icon-fail.png")
    img(v-if="type === 'success'" src="./icon-success.png")
</template>
<script>
import {isMobile, openNewWindow} from "@/util/main.js"
import {
  getCurrentInstance,
  onMounted,
  computed,
  toRefs,
  reactive,
  defineComponent,
} from "vue";
import store from '@/store/index.js'
import { translate } from "@/languages/i18n";

export default defineComponent({
  name: "HashLoadingDialog",
  props: {
    hashstr: {
      type: String,
      default: "",
    },
    closecb: {
      type: Function,
      default: () => {},
    },
    passcb: {
      type: Function,
      default: () => {},
    },
    // type: {
    //   type: String,
    //   default: 'loading'
    // },
    rpc: {
      type: Object,
      default: () => {},
    },
    store: {
      type: Object,
      default: () => {},
    },
    retryCount: {
      type: Number,
      default: 600
    }
  },
  setup() {
    const { proxy, props } = getCurrentInstance();
    const _root = proxy.$root;

    const nonefun = () => {};
    const doClose = () => {
      data.isShow = false;
      props.closecb && props.closecb(data.type === "success", data.backTrans);
    };
    const doCheck = async () => {
      data.canhide = false
      data.backTrans = null;
      props.store?.commit('system/SET_PENDING_STATU', true)
      if (props.hashstr.indexOf('0x') !== 0) {
        data.type = "fail";
      } else {
        // let res = await _root.rpc.checkHashStatus(props.hashstr);
        setTimeout(() => {
          // data.canhide = true
        }, 3 * 1000)
        let res = await _root.rpc.checkHashStatus(props.hashstr, props.retryCount);
        // console.log(res)
        // console.log(res.res)
        props.store?.commit('system/SET_PENDING_STATU', false)
        if (res.res) {
          // 成功
          data.type = "success";
          data.backTrans = res.data.trans;
          props.passcb && props.passcb();
        } else {
          // 失败
          data.type = "fail";
        }
      }
    };
    const doHide = () => {
      data.isMaskHide = true
    }
    const doShow = () => {
      data.isMaskHide = false
    }

    const data = reactive({
      type: "loading",
      isShow: true,
      hashurl: "",
      backTrans: null,
      canhide: false,
      isMaskHide: false
    });
    const formatHashStr = computed(() => {
      return props.hashstr.substr(0, 12) + "..." + props.hashstr.substr(-13);
    });

    const isInApp = computed(() => store.state.system.isInApp);

    onMounted(() => {
      data.hashurl = _root.rpc.getHashSearchUrl();
      doCheck();
    });
    return {
      openNewWindow,
      t: translate,
      isInApp,
      ...toRefs(data),
      formatHashStr,
      nonefun,
      doClose,
      doCheck,
      isMobile,
      doHide,
      doShow
    };
  },
});
</script>

<style lang="stylus" scoped>
.maskdetail{
  width 6.3rem
  border-radius .36rem
  padding: .8rem .4rem .50rem
  background-color #fff
  //color #fff
  //transform scale(.5)
  //text-align center
  .closebtn{
    position: absolute;
    width .24rem
    height .24rem
    top .43rem
    right .40rem
  }
  //.masktitle{
  //  height 1.14rem
  //  line-height 1.14rem
  //  font-size .36rem
  //  color #fff
  //  border-bottom .01rem solid rgba(255, 255, 255, 0.15)
  //}
  .statuicons{
    //padding-top .60rem
    img {
      display block
      width .96rem
      margin 0 auto
      &.loading{
        animation: loading 1s infinite linear
      }
    }
  }
  .statutxt{
    height .36rem
    line-height .36rem
    font-size .28rem
    margin-top .2rem
    text-align center
    color #C1C7D0
    &.loading{}
    &.fail{
      color #ED3656
    }
    &.warning{}
    &.success{
      color #41CC8B
    }
  }
  .tiptxt{
    height .36rem
    line-height .36rem
    margin-top .68rem
    text-align left
    font-size .28rem
    padding-left .07rem
    color #141416
  }
  .addtxt{
    text-align left
    //padding 0 .40rem
    height .36rem
    line-height .36rem
    font-size .28rem
    margin-top .14rem
    padding-left .07rem
    color #777E90
  }
  .btns{
    display flex
    margin-top .32rem
    margin-left -.15rem
    margin-right -.15rem
  }
  .maskbtn{
    flex 1
    display block
    height .84rem
    line-height .84rem
    //margin .40rem .40rem 0
    cursor: pointer;
    border-radius .2rem
    margin 0 .15rem
  }
}
//.pagemask-mobile{
//  .maskdetail{
//    //width 6.3rem
//    border-radius .08rem
//    padding: 0 0 .60rem 0
//    background-color #fff
//    color #fff
//    // transform scale(.5)
//    text-align center
//    .closebtn{
//      position: absolute;
//      width .24rem
//      height .24rem
//      top .43rem
//      right .40rem
//    }
//    .masktitle{
//      height 1.14rem
//      line-height 1.14rem
//      font-size .36rem
//      color #fff
//      border-bottom .01rem solid rgba(255, 255, 255, 0.15)
//    }
//    .statuicons{
//      padding-top .60rem
//      img {
//        display block
//        width .88rem
//        margin 0 auto
//        &.loading{
//          animation: loading 1s infinite linear
//        }
//      }
//    }
//    .statutxt{
//      height .38rem
//      line-height .38rem
//      font-size .26rem
//      margin-top .24rem
//      text-align center
//      &.loading{}
//      &.fail{
//        color #ED3656
//      }
//      &.warning{}
//      &.success{
//        color #41CC8B
//      }
//    }
//    .tiptxt{
//      height .42rem
//      line-height .42rem
//      margin-top .40rem
//      text-align left
//      font-size .28rem
//      padding 0 .40rem
//    }
//    .addtxt{
//      text-align left
//      padding 0 .40rem
//      height .4rem
//      line-height .4rem
//      font-size .28rem
//      margin-top .16rem
//      color rgba(255, 255, 255, 0.6)
//    }
//    .maskbtn{
//      display block
//      margin .40rem .40rem 0
//      cursor: pointer;
//      height .80rem
//      line-height .80rem
//      font-size .30rem
//    }
//  }
//}

.hashtinymask{
  position: fixed;
  background-color #31343b
  color: #fff
  z-index 1000
  top .80rem
  right 0
  border-radius .08rem 0 0 .08rem
  height .60rem
  width .60rem
  display flex
  align-items center
  justify-content center
  .statuicons{
    img {
      display block
      width .40rem
      &.loading{
        animation: loading 1s infinite linear
      }
    }
  }
}

.btn.btn-disabled{
  background-color rgba(93, 55, 255, 0.1)
  color #5D37FF
}

@media only screen and (max-width: 500px){
  .maskdetail {
    transform scale(1)
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
</style>
