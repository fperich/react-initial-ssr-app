process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0"; // uncomment for secure server

import React from 'react'
import express from 'express'
import http from 'http';
import https from 'https';
import fs from 'fs';
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



var key = fs.readFileSync('./ssl/localhost.key');
var cert = fs.readFileSync('./ssl/localhost.crt');

http.createServer(function (req, res) {
	res.writeHead(301, { "Location": "https://localhost:8081" + req.url });
	res.end();
}).listen(8080);

https.createServer({
	key: key,
	cert: cert
}, server).listen(8081, '0.0.0.0', function () {
	console.log(colors.yellow.bold('Server started: https://localhost:8081/'));
});