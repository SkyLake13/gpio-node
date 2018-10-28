"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
// import { authorization } from "./auth";
const switches_service_1 = require("./services/switches.service");
const switches_controller_1 = require("./controllers/switches.controller");
class App {
    constructor() {
        this.express = express();
        this.middleWares();
        this.serviceFactory();
        this.routes();
    }
    middleWares() {
        //this.express.use(authorization);
        this.express.use(bodyParser.json());
        this.express.use(bodyParser.urlencoded({ extended: false }));
        // serving static files 
        this.express.use(express.static('public'));
        this.express.use(cors({ origin: true }));
    }
    routes() {
        this.express.use('/', new switches_controller_1.default(this.switchesService).router);
    }
    serviceFactory() {
        this.switchesService = new switches_service_1.default();
    }
}
exports.app = new App().express;
//# sourceMappingURL=app.js.map