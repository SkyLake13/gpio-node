import { DatabaseService } from "./database.service";
import BaseSwitchesService from "./base-switches.service";
import { RCursor, Changes } from "rethinkdb-ts";
import ISwitch from "../models/ISwitch";

export default class SwitchesService extends BaseSwitchesService {
    private dbName = 'test';
    private tableName = 'switches';

    constructor(private dbService: DatabaseService<ISwitch>) {
        super();

        this.dbService.connect().then(() => {
            this.dbService.get().then(sws => {
                console.log('switches ', sws);
                if(sws && sws.length > 0) {
                    console.log('switches are already there');
                } else {
                    const sws = this.initSwitchesObject();
                    this.dbService.add(sws)
                    .then(() => console.log('switches added'))
                    .catch(err => console.log('something bad happened - ', err));
                }
            });
        });
    }

    public changes() {
        return this.dbService.changeFeeds().then((changes: RCursor<Changes<ISwitch>>) => {
            const switches = [];
            console.log('chanes', changes);
            changes.each((err, row: ISwitch) => {
                if(err) throw err;

                switches.push(row);
            });

            return switches;
        })
    }

    public async getState(id?: string): Promise<ISwitch[]> {
        return await this.dbService.get(id);
    }

    public async on(id: string): Promise<void> {
        if(id) {
            const sws = await this.dbService.get(id);
            const sw = sws[0];

            sw.state = 1;

            await this.dbService.update(id, sw);
        }
    }

    public async off(id: string): Promise<void> {
        if(id) {
            const sws = await this.dbService.get(id);
            const sw = sws[0];

            sw.state = 0;

            await this.dbService.update(id, sw);
        }
    }
}