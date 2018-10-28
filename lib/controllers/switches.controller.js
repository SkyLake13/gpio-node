"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const base_controller_1 = require("./base.controller");
class SwitchesController extends base_controller_1.BaseController {
    constructor(switchesService) {
        super('Swithces controller listening here');
        this.switchesService = switchesService;
        this.setUp();
    }
    setUp() {
        this.router.get('/', this.getSwitches.bind(this));
        this.router.get('/:name', this.getSwitch.bind(this));
        this.router.get('/:name/1', this.on.bind(this));
        this.router.get('/:name/0', this.off.bind(this));
    }
    getSwitches(req, res) {
        const items = this.switchesService.getState();
        res.send(items);
    }
    getSwitch(req, res) {
        const name = req.params.name;
        const items = this.switchesService.getState(name);
        res.send(items);
    }
    on(req, res) {
        const name = req.params.name;
        const items = this.switchesService.on(name);
        res.send(items);
    }
    off(req, res) {
        const name = req.params.name;
        const items = this.switchesService.off(name);
        res.send(items);
    }
}
exports.default = SwitchesController;
//# sourceMappingURL=switches.controller.js.map