import clientPromise from "@/app/lib/mongodb";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const client = await clientPromise;
    const db = client.db("ESAWAS-DB");
    const collection = db.collection("users"); // Adjust to your collection name

    await collection.insertOne(data);
    return NextResponse.json({ message: "Data submitted successfully" });
  } catch (error) {
    console.error("Error in POST /api/submitresponses:", error);
    return NextResponse.json(
      { message: "Error submitting data", error },
      { status: 500 }
    );
  }
}
