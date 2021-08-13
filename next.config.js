module.exports = (phase) => {
    const isProd = process.env.NODE_ENV === 'production'
    return {
        publicRuntimeConfig: {
            localeSubpaths: typeof process.env.LOCALE_SUBPATHS === 'string' ? process.env.LOCALE_SUBPATHS : 'none',
        },
        assetPrefix: isProd ? process.env.NEXT_PUBLIC_CDN : '',
    }
}
