"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const switch_1 = require("../models/switch");
class SwitchesService {
    constructor() {
        this.switches = this.initSwitchesObject();
    }
    getState(name) {
        if (name) {
            return this.switches.filter(x => x.name === name);
        }
        return this.switches;
    }
    on(name) {
        const sw = this.switches.find(x => x.name === name);
        if (sw) {
            sw.state = true;
        }
        return this.switches;
    }
    off(name) {
        const sw = this.switches.find(x => x.name === name);
        if (sw) {
            sw.state = false;
        }
        return this.switches;
    }
    initSwitchesObject() {
        return [
            new switch_1.Switch('tv', 6, false),
            new switch_1.Switch('tv1', 6, false),
        ];
    }
}
exports.default = SwitchesService;
//# sourceMappingURL=switches.service.js.map