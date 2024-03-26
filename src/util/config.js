const isDebug = import.meta.env.MODE === 'beta';
export default {
  isDebug,
  ethUrl: '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee',
  requestUrl: isDebug ? 'http://198.46.189.214:5168' : 'http://198.46.189.214:5168',
  noMoreHtml: (txt = '') => {
    return `<p class="upwarp-nodata">${txt}</p>`
  },
  languages: [
    {
      local: 'en',
      txt: 'EN'
    },
    {
      local: 'zh',
      txt: '中文'
    },
    // {
    //   local: 'ko',
    //   txt: '한국어'
    // },
  ],
}
