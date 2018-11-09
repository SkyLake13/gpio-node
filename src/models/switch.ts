import { Gpio } from "onoff";
import { setTimeout } from "timers";

export class Switch {
    /* private _state: number;
    set state(value: number) {
        this._state = value;
    }
    get state(): number {
        return this._state;
    } */

    private gp: Gpio
    set state(value: number) {
        this.gp.writeSync(value);
    }
    get state(): number {
        return this.gp.readSync();
    }

    private _timeout: number;
    private _tempTimeout: number;
    set timeout(value: number) {
        this._timeout = value;
        this._tempTimeout = JSON.parse(JSON.stringify(this._timeout));
    }
    get timeout(): number {
        return this._timeout;
    }

    constructor(public name: string, public url: string,
        gpio: number, state: number, timeout?: number) {
        this.gp = new Gpio(gpio, "out");
        this.state = state;
        this.timeout = timeout;
    }

    public on() {
        this.state = 1;

        if (this.timeout) {
            this.timeout = this._tempTimeout;
            this.switchTimeout(this.timeout);
        }

    }

    public off() {
        this.state = 0;
    }

    private switchTimeout(timeout: number) {
        const interval = 1000;
        setInterval(() => {
            if (this.timeout < 1000) {
                if (this.state === 1) {
                    this.off();
                }
            } else {
                this.timeout = this.timeout - interval;
            }
        }, interval);
    }
}