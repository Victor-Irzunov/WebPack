import * as $ from 'jquery'       //импортируем абсолютно всё * в перем $ из библиот /абсолютный путь
import Post from '@models/Post'
// import json from './assets/json.json'           //понимает по умолчанию
import WebpackLogo from './assets/webpack-logo.png'  //img
import './babel'
// import csv from './assets/data.csv' //csv
// import xml from './assets/data.xml' //xml
import './styles/style.css'
import './styles/less.less'
import './styles/sass.sass'
import React from 'react'
import { render } from 'react-dom'

const post = new Post('Webpack Post Title', WebpackLogo)

$('pre').addClass('code').html(post.toString())

const App = () => (
	<div className="container">
		<h1>Запиши что делаешь</h1>
		<ul>
			<li>HTML</li>
			<li>CSS</li>
			<li>др. файлы например (analytics)</li>
		</ul>
		<hr />
		<div className="logo" />
		<hr />
		<pre />
		<hr />
		<div className="box">
			<h2>Less</h2>
		</div>
		<div className="card">
			<h2>Sass</h2>
		</div>
	</div>
)
render(<App />, document.getElementById('app'))