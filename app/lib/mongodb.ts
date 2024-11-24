import { MongoClient } from "mongodb";
import mongoose from "mongoose";
import SurveyResponse from "../models/surveyResponse"; // Adjust the path as needed

if (!mongoose.models.SurveyResponse) {
  mongoose.model("SurveyResponse", SurveyResponse.schema);
}

const uri = process.env.MONGODB_URI; // Use the URI from the environment
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

// New Functions

export async function getDb() {
  const client = await clientPromise;
  return client.db("Assessment_responses"); // Make sure to replace with your actual database name
}

export async function saveUserDetails(userDetails: {
  name: string;
  organisation: string;
  country: string;
}) {
  const db = await getDb();
  const collection = db.collection("users");
  const result = await collection.insertOne(userDetails);
  return result.insertedId;
}

export async function saveSurveyResponse(
  userId: string,
  questionId: number,
  responseData: string
) {
  const db = await getDb();
  const collection = db.collection("responses");
  const result = await collection.insertOne({
    user_id: userId,
    question_id: questionId,
    response_data: responseData,
    submitted_at: new Date()
  });
  return result.insertedId;
}
