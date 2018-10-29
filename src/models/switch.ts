import { Gpio } from "onoff";

export class Switch {
    name: string;
    
    set state(value: number) {
        this.gp.write(value, () => {});
    }

    get state(): number {
        return this.gp.readSync();
    }

    private gp: Gpio

    constructor(name: string, gpio: number, state: number) {
        this.name = name;
        this.gp = new Gpio(gpio, "out");
        this.state = state;
    }
}