import * as express from "express";
import * as bodyParser from "body-parser";
import * as cors from 'cors';

// import { authorization } from "./auth";
import SwitchesService from "./services/switches.service";
import SwitchesController from "./controllers/switches.controller";

export default class App {
    public express: express.Application;

    constructor(private switchesService: SwitchesService) {
        this.express = express();
        this.middleWares();
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
}