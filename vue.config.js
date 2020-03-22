module.exports = {
    //baseUrl: '/api',
    //assetsDir: 'static',
    productionSourceMap: true,
    configureWebpack: {
        devtool: 'source-map'
      },
    devServer: {
        proxy: {
            '/api':{
                target:'http://localhost:8000',
                changeOrigin:true,
                pathRewrite:{
                    '^/api':''
                }
            }
        }
    }
}