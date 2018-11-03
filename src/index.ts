import * as app from './app';
import * as express from 'express';
import { createServer } from 'http';
import { Server } from "socket.io";
import SocketApp from './socket/socket';

const server = createServer(app.expressApp)
const s = new SocketApp(server);

server.listen('4300', () => {
    console.log('Listening at 4300');
});