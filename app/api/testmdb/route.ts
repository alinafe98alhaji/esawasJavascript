import clientPromise from "../../lib/mongodb"; // Ensure the path to your MongoDB client helper is correct
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    // Parse the incoming JSON data
    const data = await req.json();

    // Connect to MongoDB
    const client = await clientPromise;
    const db = client.db("Assessment_responses"); // Replace "surveyDB" with your actual database name
    const collection = db.collection("compiledResponses"); // Replace with your actual collection name

    // Insert the response into the collection
    const result = await collection.insertOne({
      ...data,
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
