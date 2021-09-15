//начать писать для webpack  (инструмнт для сборки) //что бы были доступны module exports require
//https://webpack.js.org/
//две точки входа index Post
//indeх должен подк в себя Post  а где и когда решает webpack
//прилож стартует  с файла index.js
//entry: - говорил с чего начать
//filename - когда webpack соберет все файлы мы получ один только файл
//mode: 'development' или 'production'
//context: - говорит где лежат все исходники (файл)
//? main: './src/index.js', analytics: './src/analytics.js' - это chunk


const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')  //- чистит
const CopyWebpackPlugin = require('copy-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')  // - в отдельн файл
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const TerserPlugin = require("terser-webpack-plugin")
const {BundleAnalyzerPlugin} = require('webpack-bundle-analyzer')


const isDev = process.env.NODE_ENV === 'development'        //не пригодилась только для консоли
const isProd = !isDev

console.log('isDev: ', isDev)
console.log('isProd: ', isProd)

const optimization = () => {
	const config = {
		splitChunks: {
			chunks: 'all'
		}
	}
	if (isProd) {
		config.minimizer = [
			new OptimizeCssAssetsPlugin(),
			new TerserPlugin()
		]
	}
	return config
}


const filename_f_1 = ext => isDev ? `[name].${ext}` : `[name].[contenthash].${ext}`

const cssLoaders = extra => {
	const loaders = [
		{
			loader: MiniCssExtractPlugin.loader,
			options:
			{
				publicPath: '',
			},
		},
		'css-loader',
	]
	if (extra) {
		loaders.push(extra)
	}
	return loaders
}


const babelOptions = preset => {
	const opts = {
		presets: [
			'@babel/preset-env'
		],
		plugins: [
			'@babel/plugin-proposal-class-properties'
		]
	}
	if (preset) {
		opts.presets.push(preset)
	}
	return opts
}


const jsLoaders = () => {
	const loaders = [{
		loader: 'babel-loader',
		options: babelOptions()
	}]
	if (isDev) {
		loaders.push('eslint-loader')
	}
return loaders
}

const plugins = () => {
	const base =  [
		new HTMLWebpackPlugin({
			template: './index.html',
			//++ оптимизация html
			minify: {
				collapseWhitespace: isProd
			}
		}),
		//++ чистит
		new CleanWebpackPlugin(),
		//++ Копирования статических файлов
		new CopyWebpackPlugin({
			patterns: [
				{
					from: path.resolve(__dirname, "src/favicon.ico"),
					to: path.resolve(__dirname, "dist")
				},
			]
		}),
		//++ CSS в отдельн файл
		new MiniCssExtractPlugin({
			filename: filename_f_1('css'),
		})
	]
	if (isProd) {
		base.push(new BundleAnalyzerPlugin())
	}
	return base
}



module.exports = {
	context: path.resolve(__dirname, 'src'),
	mode: 'development',
	entry: {
		main: ['@babel/polyfill', './index.jsx'],            //точка входа
		analytics: './analytics.ts',
	},
	output: {
		path: path.resolve(__dirname, 'dist'),
		// filename: '[name].bundle.js', //на продакшине если изменить файла он закэшировалсято клиенту поподет старый файл для этого ниже
		filename: filename_f_1('js'),
	},
	resolve: {
		//++ и если расширения не хочеться писать
		extensions: ['.js', '.json', '.png'],
		//++ и если большие вложености ../../../
		alias: {
			'@models': path.resolve(__dirname, 'src/models'),
			'@': path.resolve(__dirname, 'src')
		}
	},
	//++ отпимизация CSS( и jquery -  загружаем один раз)
	optimization: optimization(),
	//++devServer
	devServer: {
		port: 4200,
		open: true,
		// hot: isDev-???
	},
	//++ DevTool
	devtool: isDev ? 'source-map' : false,
	//++ html
	plugins: plugins(),
	module: {
		rules: [
			//++ css
			{
				test: /\.css$/,
				use: cssLoaders()
			},
			//++ less
			{
				test: /\.less$/,
				use: cssLoaders('less-loader')
			},
			//++ sass
			{
				test: /\.s[ac]ss$/,
				use: cssLoaders('sass-loader')
			},
			//++ img
			{
				test: /\.(png|jpg|svg|gif)$/,
				use: ['file-loader']
			},
			//++ fonts (import css)
			{
				test: /\.(ttf|woff|woff2|eot)$/,
				use: ['file-loader']
			},
			//++ xml
			{
				test: /\.xml$/,
				use: ['xml-loader']
			},
			//++ csv
			{
				test: /\.csv$/,
				use: ['csv-loader']
			},
			//++ ESLint  (был babel)
			{
				test: /\.m?js$/,
				exclude: /node_modules/,
				use: jsLoaders()
			},
			//++ TypeScript
			{
				test: /\.ts$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader',
					options: babelOptions('@babel/preset-typescript')
				}
			},
			//++ React
			{
				test: /\.jsx$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader',
					options: babelOptions('@babel/preset-react')
				}
			}
		]
	}
};



//resolve() - принимает составные части пути и возвращает абсолютный путь полученного в результате обработки переданных сегментов пути.
//join() - принимает неограниченное количество составных частей пути, включая возвраты в родительские директории, и возвращает полученный в результате путь;

//! и минимальная(без analytica):
// const path = require('path');
// module.exports = {
//   entry: './src/index.js',
//   output: {
//     path: path.resolve(__dirname, 'dist'),
//     filename: 'bundle.js',
//   },
// };



// //++ css
// {
// 	test: /\.css$/,
// 	use: ['style-loader', 'css-loader'] //справа на лево
// },
// //++ img
// {
// 	test: /\.(png|jpg|svg|gif)$/,
// 	use: ['file-loader']
// }