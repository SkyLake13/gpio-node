import { Server } from "socket.io";

class SocketApp {
    private io: Server;

    constructor(socketServer: Server) {
        this.io = socketServer;
    }
}