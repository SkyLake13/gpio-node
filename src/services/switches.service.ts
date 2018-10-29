import { Switch } from "../models/switch";

export default class SwitchesService {
    public switches: Array<Switch>;
    constructor() {
        this.switches = this.initSwitchesObject();
    }

    public getState(name?: string): Array<Switch> {
        if(name) {
            return this.switches.filter(x => x.name === name);
        }

        return this.switches.map(this.mapSwitch);
    }

    public on(name: string): Array<Switch> {
        const sw = this.switches.find(x => x.name === name);
        if(sw) {
            sw.state = 1;
        }

        return this.switches.map(this.mapSwitch);
    }

    public off(name: string): Array<Switch> {
        const sw = this.switches.find(x => x.name === name);
        if(sw) {
            sw.state = 0;
        }

        return this.switches.map(this.mapSwitch);
    }

    private initSwitchesObject(): Array<Switch> {
        return [
            new Switch('tv', 6, 0),
            new Switch('tv1', 6, 0),
        ]
    }

    private mapSwitch(sw: Switch): any {
        return {
            name: sw.name,
            state: sw.state
        };
    }
}