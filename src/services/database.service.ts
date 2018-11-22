import { Connection, r, RConnectionOptions, RTable, RCursor, Changes } from "rethinkdb-ts";

export class DatabaseService {
    public connection: Connection;

    constructor(private connectionOptions: RConnectionOptions) {

    }

    public async connect() {
        this.connection = await r.connect(this.connectionOptions);
    }

    public changeFeeds<T>(tableName: string): Promise<RCursor<Changes<T>>> | Promise<never> {
        if(this.connection) {
            return r.table<T>(tableName).changes().run(this.connection);
        }
        
        throw Promise.reject('Call connect method to initialize connection first');
    }

    public get<T>(tableName: string): Promise<T[]> {
        if(this.connection) {
            return r.table<T>(tableName).run(this.connection);
        }
        
        throw Promise.reject('Call connect method to initialize connection first');
    }

    public async update<T>(tableName: string, id: string, data: T): Promise<T[]> {
        const filter = r.row('id').eq(id);
        return await this.updateByFilter<T>(tableName, filter, data);
    }

    public async updateByFilter<T>(tableName: string, filter: any, data: T): Promise<T[]> {
        if(this.connection) {
            return await r.table<T>(tableName).filter(filter).run(this.connection);
        }
        
        throw Promise.reject('Call connect method to initialize connection first');
    }
}