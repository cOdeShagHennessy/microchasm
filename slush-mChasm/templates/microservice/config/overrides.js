// override any base configuration properties per environment
module.exports = {
   environment: {
        $filter: 'env',
        development: {},
        local_docker: {},
        test: {},
        production: { port: 8081}, // AWS ngnix, nodejs configuration requires running on 8081 by default
        $default: {}
    }
}