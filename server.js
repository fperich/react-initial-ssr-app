process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0"; // uncomment for secure server

import React from 'react'
import express from 'express'
import http from 'http';
import { renderToString } from 'react-dom/server'
import renderPage from './src/renderPage'
import App from './src/App'

var colors = require('colors');

var server = express();

server.use(express.static('public'));

server.get('/', (req, res) => {
	console.log('');
	console.log(colors.cyan('************************************'));
	console.log(colors.cyan.bold('SERVER SIDE RENDER'));
	console.log(colors.yellow.bold('url:'), colors.yellow.bold(req.url));
	console.log(colors.cyan('************************************'));
	console.log('');
	
	const initialProps = JSON.stringify({});
	
	var rts = renderToString(<App url={req.url} />);

	const html = renderPage(rts, initialProps);

	res.send(html);
})


http.createServer(server, function (req, res) {
	console.log(colors.yellow.bold('Server started: http://localhost:3000/'));
}).listen(3000);
