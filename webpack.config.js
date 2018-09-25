const VueLoaderPlugin = require('vue-loader/lib/plugin')

var config = {
    mode: 'development',
    module : {
        rules : [
            {
                test : /\.vue$/,
                use : 'vue-loader'
            }
        ]
    },
    plugins: [
        new VueLoaderPlugin()
    ]
};
module.exports = config;