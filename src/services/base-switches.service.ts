import { Switch } from "../models/switch";
import { RelaySwitch } from "../models/relay-switch";
import ISwitch from "../models/ISwitch";

export default abstract class BaseSwitchesService {
    abstract getState(name?: string): Promise<ISwitch[]>;
    abstract on(name: string): Promise<void>;
    abstract off(name: string): Promise<void>;

    protected initSwitchesObject(): Array<ISwitch> {
        return [
            new RelaySwitch('TV', 'tv', 20, 0),
            new RelaySwitch('Speaker', 'speaker', 21, 0),
            new Switch('GPIO 5', 'gpio5', 5, 0),
            new Switch('GPIO 6', 'gpio6', 6, 0),
        ];
    }

    protected mapSwitch(sw: ISwitch): any {
        return {
            name: sw.name,
            url: sw.url,
            state: sw.state
        };
    }
}