import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI; //Use the URI from the environment
const options = {};

if (!uri) {
  throw new Error(
    "Please define the MONGODB_URI environment variable in .env.local"
  );
}

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

if (process.env.NODE_ENV === "development") {
  // Use a global variable to ensure the client is reused during dev
  if (!(global as any)._mongoClientPromise) {
    client = new MongoClient(uri, options);
    (global as any)._mongoClientPromise = client.connect();
  }
  clientPromise = (global as any)._mongoClientPromise;
} else {
  // For production, create a new client
  client = new MongoClient(uri, options);
  clientPromise = client.connect();
}

export default clientPromise;
