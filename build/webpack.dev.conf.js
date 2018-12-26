'use strict'
const utils = require('./utils')
const webpack = require('webpack')
const config = require('../config')
const merge = require('webpack-merge')
const path = require('path')
const baseWebpackConfig = require('./webpack.base.conf')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const portfinder = require('portfinder')

const superagent = require('superagent')

// 后端代理 绕过host及referer
const express = require('express')
const axios = require('axios')
const app = express()
var apiRoutes = express.Router()
app.use('/data', apiRoutes)
// 后端代理 绕过host及referer ----END

const HOST = process.env.HOST
const PORT = process.env.PORT && Number(process.env.PORT)


const devWebpackConfig = merge(baseWebpackConfig, {
	module: {
		rules: utils.styleLoaders({
			sourceMap: config.dev.cssSourceMap,
			usePostCSS: true
		})
	},
	// cheap-module-eval-source-map is faster for development
	devtool: config.dev.devtool,

	// these devServer options should be customized in /config/index.js
	devServer: {
		before: function(app) {
			app.get('/data/home', function(req, res) {
					let key = req.query
					// console.log(req)
					// console.log(req.query)
					superagent.get(
							`api.zhuishushenqi.com/book/fuzzy-search?query=${key.query}&start=${key.start}&limit=${key.limit}`)
						.end((err, data) => {
							if (err) {
								console.log(err);
							}
							res.json({
								errno: 0,
								data: data.text,
							})
						})
				}),
				app.get('/data/detail', (req, res) => {
					let key = req.query
					superagent.get(`api.zhuishushenqi.com/book/${key.detail}`)
						.end((err, data) => {
							if (err) {
								console.log(err)
							}
							res.json({
								errno: 0,
								data: data.text
							})
						})
				}),
				app.get('/data/source', (req, res) => {
					let key = req.query
					superagent.get(`api.zhuishushenqi.com/toc?view=summary&book=${key.bookid}`)
						.end((err, data) => {
							if (err) {
								console.log(err)
							}
							res.json({
								errno: 0,
								data: data.text
							})
						})
				}),
				app.get('/data/chapter', (req, res) => {
					let key = req.query
					superagent.get(`api.zhuishushenqi.com/toc/${key.sourceid}?view=chapters`)
						.end((err, data) => {
							if (err) {
								console.log(err)
							}
							res.json({
								errno: 0,
								data: data.text
							})
						})
				}),
				app.get('/data/reading', (req, res) => {
					let key = req.query
					superagent.get(`chapter2.zhuishushenqi.com/chapter/${key.chapterid}?k=2124b73d7e2e1945&t=1468223717`)
						.end((err, data) => {
							if (err) {
								console.log(err)
							}
							res.json({
								errno: 0,
								data: data.text
							})
						})
				})
		},
		clientLogLevel: 'warning',
		historyApiFallback: {
			rewrites: [{
				from: /.*/,
				to: path.posix.join(config.dev.assetsPublicPath, 'index.html')
			}, ],
		},
		hot: true,
		contentBase: false, // since we use CopyWebpackPlugin.
		compress: true,
		host: HOST || config.dev.host,
		port: PORT || config.dev.port,
		open: config.dev.autoOpenBrowser,
		overlay: config.dev.errorOverlay ? {
			warnings: false,
			errors: true
		} : false,
		publicPath: config.dev.assetsPublicPath,
		proxy: config.dev.proxyTable,
		quiet: true, // necessary for FriendlyErrorsPlugin
		watchOptions: {
			poll: config.dev.poll,
		}
	},
	plugins: [
		new webpack.DefinePlugin({
			'process.env': require('../config/dev.env')
		}),
		new webpack.HotModuleReplacementPlugin(),
		new webpack.NamedModulesPlugin(), // HMR shows correct file names in console on update.
		new webpack.NoEmitOnErrorsPlugin(),
		// https://github.com/ampedandwired/html-webpack-plugin
		new HtmlWebpackPlugin({
			filename: 'index.html',
			template: 'index.html',
			inject: true
		}),
		// copy custom static assets
		new CopyWebpackPlugin([{
			from: path.resolve(__dirname, '../static'),
			to: config.dev.assetsSubDirectory,
			ignore: ['.*']
		}])
	]
})

module.exports = new Promise((resolve, reject) => {
	portfinder.basePort = process.env.PORT || config.dev.port
	portfinder.getPort((err, port) => {
		if (err) {
			reject(err)
		} else {
			// publish the new Port, necessary for e2e tests
			process.env.PORT = port
			// add port to devServer config
			devWebpackConfig.devServer.port = port

			// Add FriendlyErrorsPlugin
			devWebpackConfig.plugins.push(new FriendlyErrorsPlugin({
				compilationSuccessInfo: {
					messages: [`Your application is running here: http://${devWebpackConfig.devServer.host}:${port}`],
				},
				onErrors: config.dev.notifyOnErrors ?
					utils.createNotifierCallback() : undefined
			}))

			resolve(devWebpackConfig)
		}
	})
})
