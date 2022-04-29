var express = require('express')

import { Express } from 'express'
import { InitializeMiddleWare } from './InitializeMiddleware';
import { InitializeRoutes } from './InitializeRoutes';

import * as ServerConfig from '@configs/ServerConfig.json'

export async function server() {

    let app: Express = express();

    let host = ServerConfig.host
    let port : any =  process.env.PORT

    let link = "http://" + host + ":" + port.toString()

    await InitializeMiddleWare.InitializeCommonMiddleware(app)
    await InitializeRoutes.Initialize(app, link)
    await InitializeMiddleWare.InitializeErrorHandlingMiddleware(app)

    app.listen(port, () => {
        console.log(
            `Server  started listening at ${host} on ${port} port.`
        )
    })

    return Promise.resolve(app)
}