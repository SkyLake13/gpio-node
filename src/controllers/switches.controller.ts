import SwitchesService from "../services/switches.service";
import { BaseController } from "./base.controller";
import { Request, Response } from "express";
import BaseSwitchesService from "../services/base-switches.service";

export default class SwitchesController extends BaseController {
    constructor(private switchesService: BaseSwitchesService) {
        super('Swithces controller listening here');
        this.setUp();
    }

    protected setUp() {
        this.router.get('/', this.getSwitches.bind(this));
        this.router.get('/:id', this.getSwitch.bind(this));
        this.router.get('/:id/1', this.on.bind(this));
        this.router.get('/:id/0', this.off.bind(this));
    }

    private getSwitches(req: Request, res: Response) {
        const items = this.switchesService.getState();

        res.send(items);
    }

    private getSwitch(req: Request, res: Response) {
        const id = req.params.id;
        console.log('reached', id);
        const items = this.switchesService.getState(id);

        res.send(items);
    }

    private async on(req: Request, res: Response) {
        const id = req.params.id;
        await this.switchesService.on(id);

        
    }

    private async off(req: Request, res: Response) {
        const id = req.params.id;
        await this.switchesService.off(id);

        const items = await this.switchesService.getState();
        res.send(items);
    }
}