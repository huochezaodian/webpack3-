const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const HappyPack = require('happypack');

module.exports = {
    entry: {
        main: path.resolve(__dirname, 'src/main'),
        vendors: path.resolve(__dirname,'src/vendors')
    },
    output: {
        path: path.join(__dirname, './dist')
    },
    module: {
        rules: [{
                test: /\.vue$/,
                loader: 'vue-loader',
                options: {
                    loaders: {

                        css: ExtractTextPlugin.extract({
                            use: ['happypack/loader?id=vue-css'],
                            fallback: 'vue-style-loader'
                        })
                    }
                }
            },
            {
                test: /iview\/.*?js$/,
                loader: 'happypack/loader?id=babel'
            },
            {
                test: /\.js$/,
                loader: 'happypack/loader?id=babel',
                exclude: path.resolve(__dirname, 'node_modules')
            },
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    use: ['happypack/loader?id=css'],
                    fallback: 'style-loader'
                })
            },
            {
                test: /\.(gif|jpg|png|woff|svg|eot|ttf)\??.*$/,
                loader: 'happypack/loader?id=img'
            },
            {
                test: /\.(html|tpl)$/,
                loader: 'html-loader'
            }
        ]
    },
    resolve: {
        extensions: ['.js', '.vue'],
        alias: {
            'vue': 'vue/dist/vue.esm.js'
        },
        modules: [path.resolve(__dirname, 'node_modules')]
    },
    plugins:[
        new HappyPack({ 
            id: 'babel', 
            loaders: ['babel-loader?cacheDirectory'],
        }),
        new HappyPack({ 
            id: 'css', 
            loaders: ['css-loader?importLoaders=1', 'postcss-loader'], 
        }), 
        new HappyPack({ 
            id: 'img', 
            loaders: ['url-loader?limit=1024'], 
        }), 
        new HappyPack({
            id: 'vue-css', 
            loaders: ['css-loader?importLoaders=1', 'postcss-loader?sourceMap=options.sourceMap'],
        }),
        new webpack.HashedModuleIdsPlugin(),
        new webpack.optimize.ModuleConcatenationPlugin()
    ]
};