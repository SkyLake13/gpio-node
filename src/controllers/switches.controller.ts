import SwitchesService from "../services/switches.service";
import { BaseController } from "./base.controller";
import { Request, Response } from "express";

export default class SwitchesController extends BaseController {
    constructor(private switchesService: SwitchesService) {
        super('Swithces controller listening here');
        this.setUp();
    }

    protected setUp() {
        this.router.get('/', this.getSwitches.bind(this));
        this.router.get('/:name', this.getSwitch.bind(this));
        this.router.get('/:name/1', this.on.bind(this));
        this.router.get('/:name/0', this.off.bind(this));
    }

    private getSwitches(req: Request, res: Response) {
        const items = this.switchesService.getState();

        res.send(items);
    }

    private getSwitch(req: Request, res: Response) {
        const name = req.params.name;
        const items = this.switchesService.getState(name);

        res.send(items);
    }

    private on(req: Request, res: Response) {
        const name = req.params.name;
        const items = this.switchesService.on(name);

        res.send(items);
    }

    private off(req: Request, res: Response) {
        const name = req.params.name;
        const items = this.switchesService.off(name);

        res.send(items);
    }
}