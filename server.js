const express = require('express');
const next = require('next');
const cookieParser = require('cookie-parser'); // require cookie-parser

const dev = process.env.NODE_ENV !== 'production';
const PORT = dev ? 3000 : 80
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare()
.then(() => {
    const server = express();
    server.use(cookieParser());                // use cookieParser

    server.get('*', (req, res) => {
        return handle(req, res);
    });

    server.listen(PORT, (err) => {
        if (err) throw err;
        console.log(`> Ready on http://localhost:${PORT}`);
    });
})
.catch((ex) => {
    console.error(ex.stack);
    process.exit(1);
})