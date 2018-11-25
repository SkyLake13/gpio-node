import { Connection, r, RConnectionOptions, RTable, 
    RCursor, Changes, WriteResult } from "rethinkdb-ts";

export class DatabaseService<T> {
    private connection: Connection;
    public dbName: string;
    public tableName: string;

    constructor(private connectionOptions: RConnectionOptions) {
        
    }

    public async connect(dbName, tableName) {
        this.connection = await r.connect(this.connectionOptions);
        this.setDbAndTable(dbName, tableName);

        await this.createDb();
        await this.createTable();
    }

    private setDbAndTable(dbName, tableName) {
        this.dbName = dbName;
        this.tableName = tableName;
    }

    private async createDb() {
        const dbs = await r.dbList().run(this.connection);

        if(dbs.findIndex(x => x === this.dbName) === -1) {
            await r.dbCreate(this.dbName).run(this.connection);
        }
    }

    private async createTable() {
        const tables = await r.db(this.dbName).tableList().run(this.connection);

        if(tables.findIndex(t => t === this.tableName) === -1) {
            await r.db(this.dbName).tableCreate(this.tableName).run(this.connection);
        }
    }

    public changeFeeds(): Promise<RCursor<Changes<T>>> {
        return r.db(this.dbName).table<T>(this.tableName).changes().run(this.connection);
    }

    public async get(id?: string): Promise<T[]> {
        if(id) {
            const filter = r.row('id').eq(id);
            return await r.db(this.dbName).table<T>(this.tableName)
            .filter(filter as any).run(this.connection);
        }

        return r.db(this.dbName).table<T>(this.tableName).run(this.connection);
    }

    public async update(id: string, data: T): Promise<WriteResult<T>> {
        const filter = r.row('id').eq(id);
        return await this.updateByFilter(filter, data);
    }

    public async updateByFilter(filter: any, data: T): Promise<WriteResult<T>> {
        return await r.db(this.dbName).table<T>(this.tableName)
        .filter(filter).update(data).run(this.connection);
    }

    public async add(data: T[]): Promise<WriteResult<T>> {
        return await r.db(this.dbName).table<T>(this.tableName)
        .insert(data).run(this.connection);
    }
}