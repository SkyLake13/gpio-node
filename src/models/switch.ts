export class Switch {
    name: string;
    gpio: number;
    state: boolean;
    constructor(name: string, gpio: number, state: boolean) {
        this.name = name;
        this.gpio = gpio;
        this.state = state;
    }
}