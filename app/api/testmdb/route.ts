import clientPromise from "../../lib/mongodb"; // Ensure the path to your MongoDB client helper is correct
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    // Parse the incoming JSON data
    const data = await req.json();

    const { Id, responses } = data;

    // Validate required fields
    if (!Id || !responses) {
      return NextResponse.json(
        { message: "userId, questionId, and responseData are required." },
        { status: 400 }
      );
    }

    // Connect to MongoDB
    const client = await clientPromise;
    const db = client.db("Assessment_responses"); // your actual database name
    const collection = db.collection("responses"); //your actual collection name

    // Insert the response into the collection
    const result = await collection.insertOne({
      Id,
      responses,
      submittedAt: new Date() // Automatically add a timestamp
    });

    // Respond with success
    return NextResponse.json(
      { message: "Response saved successfully!", result },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error inserting compiled response:", error);
    return NextResponse.json(
      { message: "Failed to save response", error },
      { status: 500 }
    );
  }
}
