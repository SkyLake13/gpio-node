export default interface ISwitch {
    id: string;
    name: string;
    state: number;
    timeout: number;
    type: SwitchType;
    gpio: number;
}

export enum SwitchType {
    Normal = 'Normal',
    Relay = 'Relay'
}