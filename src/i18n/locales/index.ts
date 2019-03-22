import store from '../../store'

const languages = ['de', 'en']
const defaultLanguage = 'de'

const setupLocales = () => {
  return languages.reduce((acc: any, lang: string) => {
    const locale = require('./lang/' + lang + '.json')
    acc[lang] = locale
    return acc
  }, {})
}

const locales = {
  locale: store.getters['user/getUser'].settings ? store.getters['user/getUser'].settings.language : defaultLanguage,
  messages: setupLocales()
}

export default locales
