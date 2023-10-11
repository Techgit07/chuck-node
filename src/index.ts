"use strict"
import express, { Request, Response } from 'express';
import * as bodyParser from 'body-parser';
import http from 'http';
import { mongooseConnection } from './database'
import * as packageInfo from '../package.json'
import config from 'config'

import { routes } from './routes'

const app = express();

app.use(bodyParser.json({ limit: '200mb' }))
app.use(bodyParser.urlencoded({ limit: '200mb', extended: true }))

const health = (req, res) => {
    return res.status(200).json({
        message: `REST Server is Running, Server health is green`,
        app: packageInfo.name,
        version: packageInfo.version,
        description: packageInfo.description,
        author: packageInfo.author,
        license: packageInfo.license
    })
}
const bad_gateway = (req, res) => { return res.status(502).json({ status: 502, message: "REST Backend API Bad Gateway" }) }

app.get('/', health);
app.get('/health', health);
app.use(mongooseConnection)
app.get('/isServerUp', (req, res) => {
    res.send('Server is running ');
});
app.use(routes)
app.use('*', bad_gateway);

let server = new http.Server(app);
export default server;
