import clientPromise from "../../lib/mongodb";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const client = await clientPromise;
    const db = client.db("Assessment_responses");
    const collection = db.collection("data ownership and management"); //change to data ownership and management

    // Step 1: Fetch all documents for the same Id
    const userId = "6740880b82abd7092c9f81ca"; // Replace with dynamic userId if needed
    const documents = await collection.find({ Id: userId }).toArray();

    if (!documents || documents.length === 0) {
      return NextResponse.json(
        { message: "No responses found for this user" },
        { status: 404 }
      );
    }

    // Step 2: Aggregate responses across all documents
    const aggregateScores = calculateAggregateScores(documents);

    // Step 3: Return aggregated scores
    return NextResponse.json({ scores: aggregateScores }, { status: 200 });
  } catch (error) {
    console.error("Error processing responses:", error);
    return NextResponse.json(
      { message: "Failed to process responses", error },
      { status: 500 }
    );
  }
}

// Helper function to calculate aggregated scores
const calculateAggregateScores = (documents: any[]) => {
  const aggregateScores: Record<string, number> = {
    UWSS: 0,
    USSM: 0,
    RWSSM: 0,
    RSSM: 0,
    FM: 0,
    RF: 0,
    UOM: 0
  };

  const MAX_SCORE = 12; // Maximum possible score for each area

  // Loop through each document
  for (const doc of documents) {
    // Step 1: Parse responses for the current document
    const parsedResponses = parseResponses(doc.responses);

    // Step 2: Add scores for each area
    for (const questionKey in parsedResponses) {
      const response = parsedResponses[questionKey];

      for (const area in response) {
        const value = response[area];

        // Assign scores based on logic
        if (value === true) {
          aggregateScores[area] += 1;
        } else if (value === false || value === null) {
          aggregateScores[area] += 0;
        } else if (typeof value === "string" && !isNaN(parseFloat(value))) {
          aggregateScores[area] += parseFloat(value) / 5;
        }
      }
    }
  }

  // Step 3: Convert raw scores to percentages
  const percentageScores: Record<string, string> = {};
  for (const area in aggregateScores) {
    const rawScore = aggregateScores[area];
    const percentage = rawScore / MAX_SCORE * 100;
    percentageScores[area] = `${percentage.toFixed(2)}%`; // Format as a string with 2 decimal places
  }

  return percentageScores;
};

// Helper function to parse responses
const parseResponses = (responses: Record<string, string>) => {
  const parsedResponses: Record<string, any> = {};

  // Define the specific question keys you want to process
  const allowedQuestions = [
    "2a",
    "2ai",
    "2aii",
    "2b",
    "2bi",
    "2bii",
    "2c",
    "2ci",
    "2cii",
    "2d",
    "2di",
    "2dii"
  ];

  for (const [key, value] of Object.entries(responses)) {
    if (!allowedQuestions.includes(key)) {
      continue; // Skip questions not in the allowed list
    }

    try {
      parsedResponses[key] = JSON.parse(value);
    } catch (error) {
      console.error(`Failed to parse response for key "${key}":`, error);
    }
  }

  return parsedResponses;
};
