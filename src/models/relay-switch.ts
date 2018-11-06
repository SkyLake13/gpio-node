import { Switch } from "./switch";

export class RelaySwitch extends Switch {

    set state(value: number) {
        if(value === 1)
            super.state = 0;
        else
            super.state = 1;
    }

    get state(): number {
        if(super.state === 1)
            return 0;
        else
            return 1;
    }

    constructor(name: string, url: string, gpio: number, state: number) {
        super(name, url, gpio, state);
    }
}