import { Gpio } from "onoff";

export class Switch {
    name: string;

    get gpio(): number {
        return this.gp.gpio;
    }
    
    set state(value: number) {
        this.gp.write(value, () => {});
    }

    get state(): number {
        return this.gp.readSync();
    }

    private _state: number;
    private gp: Gpio

    constructor(name: string, gpio: number, state: number) {
        this.name = name;
        this.gp = new Gpio(gpio, "out");
        this.state = state;
    }


}