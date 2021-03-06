const express = require('express')
const next = require('next')
const nextI18NextMiddleware = require('next-i18next/middleware').default
const nextI18next = require('./i18n')

const port = parseInt(process.env.PORT, 10) || 3000
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

// app.use(nextI18NextMiddleware(nextI18next))

app.prepare().then(() => {
    const server = express()
    // await nextI18next.initPromise
    server.use(nextI18NextMiddleware(nextI18next))

    server.all('*', (req, res) => {
        return handle(req, res)
    })

    server.listen(port, (err) => {
        if (err) throw err
        console.log(`> Ready on http://localhost:${port}`)
    })
})
