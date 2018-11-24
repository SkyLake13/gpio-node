import ISwitch from "./ISwitch";

// import { Gpio } from "onoff";

export class Switch implements ISwitch {
    id: string;
    name: string;
    url: string;
    timeout: number;
    private _state: number;

    set state(value: number) {
        // this.gp.writeSync(value);
        this._state = value;
    }

    get state(): number {
        // return this.gp.readSync();
        return this._state;
    }

    // private gp: Gpio

    constructor(name: string, url: string, gpio: number, state: number) {
        this.name = name;
        this.url = url
        this.id = url;
        // this.gp = new Gpio(gpio, "out");
        this.state = state;
    }
}