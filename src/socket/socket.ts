import { Server } from "http";
import * as socketIo from 'socket.io';

export default class SocketApp {
    private io: SocketIO.Server;

    constructor(server: Server) {
        this.io = socketIo(server);

        this.listen();
    }

    private listen() {
        this.io.on('connect', this.onClientConnected.bind(this));
    }

    private onClientConnected(socket: any) {
        console.log('Connected client');
        socket.on('message', this.onMessageReceived.bind(this));
        socket.on('disconnect', this.onClientDisconnected.bind(this));
    }    

    private onMessageReceived(message: any) {
        console.log('Received Message: %s', JSON.stringify(message));
        this.sendMessage(message);
    }

    private sendMessage(message: any) {
        const n = this.io.emit('message', message);
    }

    private onClientDisconnected() {
        console.log('Client disconnected');
    }
}