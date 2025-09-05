module.exports = {
    port: 8081,
    host: 'localhost',
    proxyTable: [{
        api: '/api',
        target: 'http://127.0.0.1:8081/'
    }]
}