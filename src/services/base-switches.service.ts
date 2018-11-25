import { Switch } from "../models/switch";
import { RelaySwitch } from "../models/relay-switch";
import ISwitch, { SwitchType } from "../models/ISwitch";

export default abstract class BaseSwitchesService {
    abstract getState(id?: string): Promise<ISwitch[]>;
    abstract on(id: string): Promise<void>;
    abstract off(id: string): Promise<void>;
    abstract changes(): Promise<any[]>;

    protected initSwitchesObject(): Array<ISwitch> {
        return [
            new RelaySwitch('TV', SwitchType.Relay, 20, 0, 0),
            new RelaySwitch('Speaker', SwitchType.Relay, 20, 0, 0),
            new Switch('GPIO 5', SwitchType.Normal, 5, 0, 0),
        ];
    }

    protected mapSwitch(sw: ISwitch): any {
        return {
            name: sw.name,
            timeout: sw.timeout,
            state: sw.state
        };
    }
}