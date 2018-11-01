import { Gpio } from "onoff";

export class Switch {
    name: string;
    url: string;

    set state(value: number) {
         this.gp.writeSync(value);
    }

    get state(): number {
        return this.gp.readSync();
    }

    protected gp: Gpio

    constructor(name: string, url: string, gpio: number, state: number) {
        this.name = name;
        this.url = url
        this.gp = new Gpio(gpio, "out");
        this.state = state;
    }
}