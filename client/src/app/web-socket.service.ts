import { Injectable, NgZone } from '@angular/core';
import * as io from 'socket.io-client';
import { Observable, Subject } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable()
export class WebsocketService {
    private socket;

    constructor(private zone: NgZone) {
        this.socket = io(environment.ws_url);
    }

    public connect() {
        this.socket.connect();
    }

    public getState(): Observable<any[]> {
        return Observable.create((obs) => {
            this.socket.on('state', (state: any[]) => {
                this.zone.run(() => {
                    obs.next(state);
                });
            });
        });
    }

    public on(id: string) {
        this.socket.emit('on', id);
    }

    public off(id: string) {
        this.socket.emit('off', id);
    }

    public disconnect() {
        this.socket.disconnect();
    }
}