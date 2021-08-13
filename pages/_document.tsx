import React from 'react'
import Document, { Html, Head, Main, NextScript } from 'next/document'

declare let dataLayer: any
declare let w: any
declare let l: any

class MyDocument extends Document {
    static async getInitialProps(ctx: any) {
        const initialProps = await Document.getInitialProps(ctx)
        return { ...initialProps }
    }

    render() {
        return (
            <Html lang="vi">
                <Head></Head>
                <body>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        )
    }
}

export default MyDocument
