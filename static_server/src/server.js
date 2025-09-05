const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const { port, host, proxyTable } = require('./config/index.js');

const app = express();

// Serve static files from the project root
app.use('/', express.static('./'));

// Setup proxy for each entry in proxyTable
proxyTable.forEach(item => {
    if (!item.target) {
        throw new Error('[HPM] Missing "target" option. Example: {target: "http://www.example.org"}');
    }
    app.use(item.api, createProxyMiddleware({
        target: item.target,
        changeOrigin: true,
        ws: true
    }));
});

app.listen(port, host, () => {
    console.log(`Server running at http://${host}:${port}`);
});