import { createI18n } from 'vue-i18n'
import messages from '@/languages/index';

let loc = localStorage.getItem('locale')
// console.log(loc)
if (!loc || loc === 'null') {
  localStorage.setItem('locale', 'en')
  loc = 'en'
}
const i18n = createI18n({
  locale: loc,
  legacy: false,
  globalInjection: true,
  messages
})

export const translate = (key, obj = {}) => {
  if (!key) {
    return '';
  }
  return i18n.global.t(key, obj);
};
export const getLocal = () => {
  return i18n.global.locale.value
};
export default i18n
