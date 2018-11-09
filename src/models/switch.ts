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

    constructor(public name: string, public url: string, 
        gpio: number, state: number, public timeout?: number) {
        this.gp = new Gpio(gpio, "out");
        this.state = state;
    }

    public on() {
        this.state = 1;

        this.switchTimeout(this.timeout);
    }

    public off() {
        this.state = 0;
    }

    private switchTimeout(timeout: number) {
        if(timeout) {
            const interval = 1000;
            setInterval(() => {
                this.timeout = this.timeout - interval;
    
                if (this.timeout < 1000) {
                    if (this.state === 1) {
                        this.off();
                    }
                }
            }, interval);
        }
    }
}