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
const { CleanWebpackPlugin } = require('clean-webpack-plugin')  //чистит
const CopyWebpackPlugin = require('copy-webpack-plugin')



module.exports = {
	context: path.resolve(__dirname, 'src'),
	mode: 'development',
	entry: {
		main: './index.js',
		analytics: './analytics.js',
	},
	output: {
		path: path.resolve(__dirname, 'dist'),
		// filename: '[name].bundle.js', //на продакшине если изменить файла он закэшировалсято клиенту поподет старый файл для этого ниже
		filename: '[name].[contenthash].js',
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
	//++ отпимизация (например jquery загружаем один раз)
	optimization: {
		splitChunks: {
			chunks: 'all'
		}
	},
	devServer: {
		port: 4200,
		open: true
	},
	//++ html
	plugins: [
		new HTMLWebpackPlugin({
			template: './index.html'
		}),
		new CleanWebpackPlugin(),
		//++ Копирования статических файлов
		new CopyWebpackPlugin({
			patterns: [
				{
					from: path.resolve(__dirname, "src/favicon.ico"),
					to: path.resolve(__dirname, "dist")
				},
			]
		})
	],
	module: {
		rules: [
			//++ css
			{
				test: /\.css$/,
				use: ['style-loader', 'css-loader'] //справа на лево
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