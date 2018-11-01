import { Switch } from "./switch";

export class RelaySwitch extends Switch {

    set state(value: number) {
        if(value === 1)
            this.gp.writeSync(0);
        else
            this.gp.writeSync(1);
    }

    get state(): number {
        return this.gp.readSync() === 1 ? 0 : 1;
    }

    constructor(name: string, url: string, gpio: number, state: number) {
        super(name, url, gpio, state);
    }
}