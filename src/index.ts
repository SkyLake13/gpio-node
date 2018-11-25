import App, * as app from './app';
import * as express from 'express';
import { createServer } from 'http';
import { Server } from "socket.io";
import SocketApp from './socket/socket';
import SwitchesService from './services/switches.service';
import { Connection, r } from "rethinkdb-ts";
import { DatabaseService } from './services/database.service';
import ISwitch from './models/ISwitch';

const connection = async() => {
    const options = {
        host: 'localhost', port: 28015
    };

    return await r.connect(options);
}

const conn = connection();

const dbService = new DatabaseService<ISwitch>(conn, 'test', 'switches');

const switchesService = new SwitchesService(dbService);
const expressApp = new App(switchesService)

const server = createServer(expressApp.express)

const s = new SocketApp(server, switchesService);

server.listen('4300', async() => {
    console.log('Listening at 4300');
});