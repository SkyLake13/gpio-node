import axios from "axios";

export class SwitchesIRService {
    constructor(private baseUrl: string) {

    }

    public togglePower(device: string) {
        const url = this.baseUrl + '/' + device + '/power';

        setTimeout(async() => {
            const resp = await axios.get(url);
        }, 500);
        
    }
}