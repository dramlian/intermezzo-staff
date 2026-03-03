import { MongoClient, Db } from "mongodb";

const uri: string = process.env.MONGODB_URI!;

let client: MongoClient;
let db: Db;

export async function getDb(): Promise<Db> {
    if (!client) {
        client = new MongoClient(uri);
        await client.connect();
        db = client.db("life_organizer");
    }
    return db;
}