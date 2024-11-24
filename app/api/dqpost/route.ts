import clientPromise from "../../lib/mongodb"; // Ensure the path to your MongoDB client helper is correct
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const client = await clientPromise;
    const db = client.db("Assessment_responses");

    // Parse the incoming request body
    const body = await req.json();

    // Log the request body for debugging
    console.log("Incoming request body:", body);

    // Ensure `responses` is populated correctly
    if (!body.responses || Object.keys(body.responses).length === 0) {
      return NextResponse.json(
        { message: "Responses field is empty or missing" },
        { status: 400 }
      );
    }

    // Create a new document
    const newResponse = {
      Id: body.Id, // Unique identifier for the user
      responses: body.responses, // Add responses as-is
      submittedAt: new Date() // Add the current timestamp
    };

    // Save to the database
    await db.collection("data quality").insertOne(newResponse);

    return NextResponse.json(
      { message: "Response saved successfully!", newResponse },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error saving survey response:", error);
    return NextResponse.json(
      { message: "Failed to save survey response", error },
      { status: 500 }
    );
  }
}
