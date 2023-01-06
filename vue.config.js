module.exports = {
    configureWebpack: {
        resolve: {
            alias: {
                'assets': '@/assets',
                'common': '@/common',
                'components': '@/components',
                'network': '@/network',
                'views': '@/views',
                'plugins': '@/plugins',
            }
        }
    },
    devServer: {
        proxy: {
            '/api': {
                target: 'http://localhost:8081',
                changeOrigin: true,
                ws: true,
                pathRewrite: {
                    '^/api': ''
                }
            },
            '/downloadfile': {
                target: 'https://tianhui010.oss-cn-guangzhou.aliyuncs.com',
                changeOrigin: true,
                ws: true,
                pathRewrite: {
                    '^/downloadfile': ''
                }
            },
            '/downloadvideo': {
                target: 'https://tianhui-cefd5d83abc511ebb0a800163e1a625e.oss-cn-guangzhou.aliyuncs.com',
                changeOrigin: true,
                ws: true,
                pathRewrite: {
                    '^/downloadvideo': ''
                }
            },

        }
    },
}