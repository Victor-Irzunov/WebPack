import * as $ from 'jquery'       //импортируем абсолютно всё * в перем $ из библиот /абсолютный путь
import Post from '@models/Post'
// import json from './assets/json.json'           //понимает по умолчанию
import WebpackLogo from './assets/webpack-logo.png'  //img
// import csv from './assets/data.csv' //csv
// import xml from './assets/data.xml' //xml
import './styles/style.css'
import './styles/less.less'
import './styles/sass.sass'


const post = new Post('Webpack Post Title', WebpackLogo)

$('pre').addClass('code').html(post.toString())