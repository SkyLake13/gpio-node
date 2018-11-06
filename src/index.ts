import App, * as app from './app';
import * as express from 'express';
import { createServer } from 'http';
import { Server } from "socket.io";
import SocketApp from './socket/socket';
import SwitchesService from './services/switches.service';

const switchesService = new SwitchesService();
const expressApp = new App(switchesService)

const server = createServer(expressApp.express)

const s = new SocketApp(server, switchesService);

server.listen('4300', () => {
    console.log('Listening at 4300');
});