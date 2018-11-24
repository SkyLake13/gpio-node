import { Server } from "http";
import * as socketIo from 'socket.io';
import SwitchesService from "../services/switches.service";
import BaseSwitchesService from "../services/base-switches.service";
import ISwitch from "../models/ISwitch";

export default class SocketApp {
    private io: SocketIO.Server;

    constructor(server: Server, private switchesService: BaseSwitchesService) {
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

    private async switchOn(name: string) {
        await this.switchesService.on(name);
    }

    private async switchOff(name: string) {
        await this.switchesService.off(name);
    }

    private async getSendState() {
        const switches = await this.switchesService.getState();
        this.sendState(switches);
    }

    private sendState(switches: Array<ISwitch>) {
        this.io.emit('state', switches);
    }

    private onDisconnect() {
        console.log('Client disconnected');
    }
}