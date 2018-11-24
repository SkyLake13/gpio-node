import BaseSwitchesService from "./base-switches.service";
import ISwitch from "../models/ISwitch";

export default class SwitchesService extends BaseSwitchesService {
    public switches: Array<ISwitch>;
    constructor() {
        super();
        this.switches = this.initSwitchesObject();
    }

    public async getState(id?: string): Promise<ISwitch[]> {
        if(id) {
            return this.switches.filter(x => x.id === id).map(this.mapSwitch);;
        }
        
        return this.switches.map(this.mapSwitch);
    }

    public async on(id: string): Promise<void> {
        const sw = this.switches.find(x => x.id === id);
        if(sw) {
            sw.state = 1;
        }
    }

    public async off(id: string): Promise<void> {
        const sw = this.switches.find(x => x.id === id);
        if(sw) {
            sw.state = 0;
        }
    }
}