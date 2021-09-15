import Post from './Post'
import json from './assets/json.json'           //понимает по умолчанию
import WebpackLogo from './assets/webpack-logo.png'  //img
import csv from './assets/data.csv'
import xml from './assets/data.xml' //xml
import './styles/style.css'


const post = new Post('Webpack Post Title', WebpackLogo)


console.log('CSV: ', csv)