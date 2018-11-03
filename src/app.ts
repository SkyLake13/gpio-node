import * as express from "express";
import * as bodyParser from "body-parser";
import * as cors from 'cors';

// import { authorization } from "./auth";
import SwitchesService from "./services/switches.service";
import SwitchesController from "./controllers/switches.controller";

class App {
    public express: express.Application;
    private switchesService: SwitchesService;

    constructor() {
        this.express = express();
        this.middleWares();
        this.serviceFactory();
        this.routes();
    }

    private middleWares(): void {
        //this.express.use(authorization);
        this.express.use(bodyParser.json());
        this.express.use(bodyParser.urlencoded({ extended: false }));
        // serving static files 
        this.express.use(express.static('public'));
        this.express.use(cors({ origin: true }));   
    }

    private routes(): void {
        this.express.use('/', new SwitchesController(this.switchesService).router);
    }

    private serviceFactory() {
        this.switchesService = new SwitchesService();
    }
}

export const expressApp = new App().express;