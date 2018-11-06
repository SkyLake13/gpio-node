import { Switch } from "./switch";

export class RelaySwitch extends Switch {

    set state(value: number) {
        if(value === 1)
            super.state = 0;
        else
            super.state = 1;
    }

    get state(): number {
        return super.state;
    }

    constructor(name: string, url: string, gpio: number, state: number) {
        super(name, url, gpio, state);
    }
}