import * as app from './app';
import * as express from 'express';
import { createServer } from 'http';

const server = createServer(app.expressApp)

server.listen('4300', () => {
    console.log('Listening at 4300');
}); 

/* app.expressApp.listen('4300', () => {
    console.log('Listening at 4300');
}); */