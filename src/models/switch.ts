import ISwitch, { SwitchType } from "./ISwitch";

export class Switch implements ISwitch {
    id: string;
    name: string;
    type: SwitchType;
    gpio: number;
    timeout: number;
    state: number;
    
    constructor(name: string, type: SwitchType, gpio: number,
         timeout: number, state: number) {
        this.name = name;
        this.type = type;
        this.gpio = gpio;
        this.timeout = timeout;
        this.state = state;
    }
}