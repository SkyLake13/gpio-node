import { Switch } from "../models/switch";
import { RelaySwitch } from "../models/relay-switch";

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
            sw.state = 1;
        }

        return this.switches.map(this.mapSwitch);
    }

    public off(name: string): Array<Switch> {
        const sw = this.switches.find(x => x.url === name);
        if(sw) {
            sw.state = 0;
        }

        return this.switches.map(this.mapSwitch);
    }

    private initSwitchesObject(): Array<Switch> {
        return [
            new RelaySwitch('TV', 'tv', 20, 0),
            new RelaySwitch('Speaker', 'speaker', 21, 0),
            new Switch('GPIO 5', 'gpio5', 5, 0),
            new Switch('GPIO 6', 'gpio6', 6, 0),
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