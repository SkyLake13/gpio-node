import { Server } from "http";
import * as socketIo from 'socket.io';
import SwitchesService from "../services/switches.service";
import { Switch } from "../models/switch";

export default class SocketApp {
    private io: SocketIO.Server;

    constructor(server: Server, private switchesService: SwitchesService) {
        this.io = socketIo(server);
        this.io.on('connection', this.onClientConnected.bind(this));
    }

    private onClientConnected(socket: socketIo.Socket) {
        this.getSendState();

        socket.on('on', this.switchOn.bind(this));
        socket.on('off', this.switchOff.bind(this));
        socket.on('state', this.getSendState.bind(this));

        socket.on('disconnect', this.onDisconnect.bind(this));
    }

    private switchOn(name: string) {
        this.switchesService.on(name);
        this.getSendState();
    }

    private switchOff(name: string) {
        this.switchesService.off(name);
        this.getSendState();
    }

    private getSendState() {
        const switches = this.switchesService.getState();
        this.sendState(switches);
    }

    private sendState(switches: Array<Switch>) {
        this.io.emit('state', switches);
    }

    private onDisconnect() {
        console.log('Client disconnected');
    }
}