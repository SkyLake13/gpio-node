import { Connection, r, RConnectionOptions, RTable, RCursor, Changes, WriteResult } from "rethinkdb-ts";
import { Switch } from "../models/switch";

export class DatabaseService<T> {
    private connection: Connection;
    private tableName: string = 'switches';

    constructor(private connectionOptions: RConnectionOptions) {
        
    }

    public async connect() {
        this.connection = await r.connect(this.connectionOptions);
    }

    public changeFeeds(): Promise<RCursor<Changes<T>>> {
        return r.table<T>(this.tableName).changes().run(this.connection);
    }

    public async get(id?: string): Promise<T[]> {
        if(id) {
            const filter = r.row('id').eq(id);
            return await r.table<T>(this.tableName).filter(filter as any).run(this.connection);
        }
        return r.table<T>(this.tableName).run(this.connection);
    }

    public async update(id: string, data: T): Promise<WriteResult<T>> {
        const filter = r.row('id').eq(id);
        return await this.updateByFilter(filter, data);
    }

    public async updateByFilter(filter: any, data: T): Promise<WriteResult<T>> {
        return await r.table<T>(this.tableName).filter(filter).update(data).run(this.connection);
    }

    public async add(data: T[]): Promise<WriteResult<T>> {
        return await r.table<T>(this.tableName).insert(data).run(this.connection);
    }
}