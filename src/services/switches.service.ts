import { Switch } from "../models/switch";

export default class SwitchesService {
    public switches: Array<Switch>;
    constructor() {
        this.switches = this.initSwitchesObject();
    }

    public getState(name?: string): Array<Switch> {
        if(name) {
            return this.switches.filter(x => x.url === name).map(this.mapSwitch);;
        }

        return this.switches.map(this.mapSwitch);
    }

    public on(name: string): Array<Switch> {
        const sw = this.switches.find(x => x.url === name);
        if(sw) {
            sw.state = 0;
        }

        return this.switches.map(this.mapSwitch);
    }

    public off(name: string): Array<Switch> {
        const sw = this.switches.find(x => x.url === name);
        if(sw) {
            sw.state = 1;
        }

        return this.switches.map(this.mapSwitch);
    }

    private initSwitchesObject(): Array<Switch> {
        return [
            new Switch('TV', 'tv', 20, 1),
            new Switch('Speaker', 'speaker', 21, 1),
        ];
    }

    private mapSwitch(sw: Switch): any {
        return {
            name: sw.name,
            url: sw.url,
            state: sw.state
        };
    }
}