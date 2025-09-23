import {
  MongoClient,
  type MongoClientOptions,
  Db,
  Collection,
  Document
} from 'mongodb';

const url = process.env.MONGODB_URI;
const options: MongoClientOptions = {};

if (!url) {
  throw new Error('MONGODB_URI не указан в env.local');
}

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

declare global {
  var _mongoClientPromise: Promise<MongoClient>;
}

if (process.env.NODE_ENV === 'development') {
  if (!global._mongoClientPromise) {
    client = new MongoClient(url, options);
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  client = new MongoClient(url, options);
  clientPromise = client.connect();
}

export async function getDb(): Promise<Db> {
  const client = await clientPromise;
  return client.db('users');
}

export async function getCollection<
  T extends Document = Document
>(name: string): Promise<Collection<T>> {
  const db = await getDb();
  return db.collection<T>(name);
}

export default clientPromise;
