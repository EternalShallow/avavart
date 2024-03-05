const isDebug = import.meta.env.MODE === 'beta';
export default {
  isDebug,
  ethUrl: '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee',
  vevoteUrl: isDebug ? 'http://3.108.9.4:8115' : 'https://ve.teco.news',
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
    {
      local: 'ko',
      txt: '한국어'
    },
  ],
}
