// eslint-disable-next-line @typescript-eslint/no-require-imports
const { createServer } = require('https')
// eslint-disable-next-line @typescript-eslint/no-require-imports
const { parse } = require('url')
// eslint-disable-next-line @typescript-eslint/no-require-imports
const next = require('next')
// eslint-disable-next-line @typescript-eslint/no-require-imports
const fs = require('fs')
// eslint-disable-next-line @typescript-eslint/no-require-imports
const path = require('path')

const dev = process.env.NODE_ENV !== 'production'
const hostname = 'localhost'
const port = process.env.PORT || 3000

// SSL certificate options
const httpsOptions = {
    key: fs.readFileSync(path.join(process.cwd(), 'certificates', 'private.key')),
    cert: fs.readFileSync(path.join(process.cwd(), 'certificates', 'certificate.cert')),
    // Uncomment if you have an intermediate certificate
    // ca: fs.readFileSync(path.join(process.cwd(), 'certificates', 'chain.pem'))
}

const app = next({ dev, hostname, port })
const handle = app.getRequestHandler()

app.prepare().then(() => {
    createServer(httpsOptions, async (req, res) => {
        try {
            // Add HSTS header for enhanced security
            res.setHeader('Strict-Transport-Security', 'max-age=31536000; includeSubDomains; preload')

            const parsedUrl = parse(req.url, true)
            const { pathname, query } = parsedUrl

            if (pathname === '/a') {
                await app.render(req, res, '/a', query)
            } else if (pathname === '/b') {
                await app.render(req, res, '/b', query)
            } else {
                await handle(req, res, parsedUrl)
            }
        } catch (err) {
            console.error('Error occurred handling', req.url, err)
            res.statusCode = 500
            res.end('internal server error')
        }
    }).listen(port, (err) => {
        if (err) throw err
        console.log(`> Ready on https://${hostname}:${port}`)
    })
})