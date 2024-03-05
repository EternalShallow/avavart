/** @type {import('tailwindcss').Config} */
const rem = (start, end) => {
  let tmp = {}
  for (let i = start; i <= end; i++) {
    tmp[i] = `${i / 100}rem`
  }
  // console.log(tmp)
  return tmp
};

const rem2 = (nums) => {
  let tmp = {}
  for (let i in nums) {
    tmp[nums[i]] = `${nums[i] / 100}rem`
  }
  // console.log(tmp)
  return tmp
}
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      'table': '450px'
    },
    dropShadow: {
      'btmtab': '0 -.1rem .32rem rgba(0, 0, 0, 0.04)'
    },
    fontFamily: {
      // 'pingfang': ['PingFang SC, PingFangSC'],
      // 'rubik': ['Rubik'],
      // 'rubik-medium': ['Rubik-Medium'],
      // 'LanTing': ['LanTing'],
      'Menlo': ['Menlo']
    },
    spacing: {
      ...rem(0, 500),
      small: '.16rem',
      btmicon: '.48rem'
    },
    fontSize: {
      ...rem2([
        20, 22, 24, 26, 28, 30, 32, 36, 40, 42, 44, 48, 50, 52, 54, 56, 60, 64
      ]),
      larg: '.4rem',
      xl: '.36rem',
      sl: '.2rem',
      sl2: '.22rem'
    },
    borderRadius: {
      full: '100%',
      ...rem2([4, 6, 8, 12, 16, 18, 20, 24, 26, 28, 32, 40, 48, 52, 56, 64, 66, 74, 76, 80, 96]),
    },
    extend: {
      zIndex: {
        1: 1,
        200: 200
      },
      borderWidth: {
        1: '.01rem'
      },
      lineHeight: {
        ...rem2([20, 24, 26, 28, 30, 32, 34, 36, 38, 40, 44, 48, 50, 54, 56, 60, 64, 68, 72, 78, 80]),
      },
      width: {
        28: '.28rem',
        'pblock': '6.86rem',
        'pblock2': '7.02rem',
      },
      translate: {
        'center': '-50%'
      },
      height: {
        'top': '.64rem'
      },
      colors: {
        'red': '#FF000A',
        'red1': '#E60009',
        'normal': '#fff',
        'bd1': '#F5A2A5',
        'white': '#fff',
        'spcol': '#D9D9D9',
        'thecol': '#FF000A',
        'blockbg': '#16141E',
        'black': '#0A0A0B',
        'black0': '#000',
        'gray': '#999',
        'tabbg': '#1D2123',
        'tabcolor': '#B3B3B3',
        'yellow': "#FFF501",
        'yellowbg': "rgb(249,150,59)",
        'blue': '#2C63F0',
        'startcolor': "#777E90",
        'progressbg': "#2D3234",
        'bg3': "#1D2023",


      },
      animation: {
        showUp: 'showUp .3s ease-in-out',
      },
      keyframes: {
        showUp: {
          '0%': { transform: 'translateY(30px)', opacity: 0 },
          '100%': { transform: 'translateY(0)', opacity: 1 },
        }
      },
    },
  },
  plugins: [],
}
