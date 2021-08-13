/*
  Do not copy/paste this code. It is used internally
  to manage end-to-end test suites.
*/

const NextI18Next = require('next-i18next').default
// const { localeSubpaths } = require('next/config').default().publicRuntimeConfig
//
// const localeSubpathVariations = {
//     none: {},
//     foreign: {
//         vi: 'vi',
//     },
//     all: {
//         en: 'en',
//         vi: 'vi',
//     },
// }

const languages = ['vi', 'en']
const NextI18NextInstance = new NextI18Next({
    // localeSubpaths: localeSubpathVariations[localeSubpaths],
    defaultLanguage: 'vi',
    otherLanguages: ['en'],
    detection: {
        lookupCookie: 'next-i18next',
        order: ['cookie', 'querystring', 'localStorage', 'path', 'subdomain'],
        caches: ['cookie'],
    },
})

/* react-i18next need this extra property */
NextI18NextInstance.i18n.languages = languages
NextI18NextInstance.i18n.init({
    react: {
        useSuspense: false,
    },
})
module.exports = NextI18NextInstance
