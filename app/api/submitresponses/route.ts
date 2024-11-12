import { NextRequest, NextResponse } from "next/server";
import { Pool } from "pg";

// Set up a PostgreSQL pool connection
const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "esawas",
  password: "123456",
  port: 5432
});

export async function POST(req: NextRequest) {
  const responses = await req.json();

  try {
    // Log the incoming responses for better insight
    console.log("Received responses:", responses);

    const parsedResponses = Object.entries(responses).map(([key, value]) => ({
      question_id: key,
      response_data: JSON.parse(value as string)
    }));

    // Log parsed responses to ensure JSON parsing is correct
    console.log("Parsed responses:", parsedResponses);

    // Database insertions
    const insertPromises = parsedResponses.map(
      ({ question_id, response_data }) =>
        pool.query(
          `INSERT INTO responses (question_id, response_data) VALUES ($1, $2)`,
          [question_id, response_data]
        )
    );

    await Promise.all(insertPromises);

    return NextResponse.json({ message: "Responses saved successfully" });
  } catch (error) {
    console.error("Error saving responses:", error);
    return NextResponse.json(
      { message: "Failed to save responses" },
      { status: 500 }
    );
  }
}
