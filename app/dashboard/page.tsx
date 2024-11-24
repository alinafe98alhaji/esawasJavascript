"use client";
import React, { useEffect, useState } from "react";

type Scores = {
  [key: string]: string; // Assuming percentages are returned as strings (e.g., "85%")
};

const Dashboard = () => {
  const [scores, setScores] = useState<Scores | null>(null);
  const [scoresDOM, setScoresDOM] = useState<Scores | null>(null);
  const [scoresDOF, setScoresDOF] = useState<Scores | null>(null);
  const [scoresDQ, setScoresDQ] = useState<Scores | null>(null);
  const [scoresDU, setScoresDU] = useState<Scores | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAllScores = async () => {
      try {
        const responses = await Promise.all([
          fetch(`/api/dataCollectionResponses`),
          fetch(`/api/dataOwnershipAndManagementResponses`),
          fetch(`/api/dataOpenessAndFlow`),
          fetch(`/api/dataQuality`),
          fetch(`/api/dataUsage`)
        ]);

        const [
          dataCollection,
          ownership,
          openness,
          quality,
          usage
        ] = await Promise.all(responses.map(res => res.json()));

        setScores(dataCollection.scores);
        setScoresDOM(ownership.scores);
        setScoresDOF(openness.scores);
        setScoresDQ(quality.scores);
        setScoresDU(usage.scores);
      } catch (error) {
        console.error("Failed to fetch scores:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAllScores();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!scores || !scoresDOM || !scoresDOF || !scoresDQ || !scoresDU) {
    return <div>No scores available</div>;
  }

  const areas = Object.keys(scores);
  const sections = [
    { name: "Data Collection", scores: scores },
    { name: "Data Ownership and Management", scores: scoresDOM },
    { name: "Data Openness and Flow", scores: scoresDOF },
    { name: "Data Quality", scores: scoresDQ },
    { name: "Data Usage", scores: scoresDU }
  ];

  // Helper function to determine cell color
  const getCellColor = (percentage: string): string => {
    const value = parseFloat(percentage.replace("%", ""));
    if (value >= 75) return "#4CAF50"; // Green
    if (value >= 50) return "#FFEB3B"; // Yellow
    return "#F44336"; // Red
  };

  return (
    <div
      style={{
        padding: "20px",
        fontFamily: "'Inter', Arial, sans-serif",
        backgroundColor: "#f9f9f9",
        minHeight: "100vh"
      }}
    >
      <h1
        style={{
          textAlign: "center",
          marginBottom: "30px",
          fontSize: "2.5rem",
          color: "#222",
          fontWeight: "700",
          letterSpacing: "0.8px"
        }}
      >
        Dashboard
      </h1>
      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          backgroundColor: "#fff",
          borderRadius: "10px",
          overflow: "hidden",
          boxShadow: "0 4px 15px rgba(0, 0, 0, 0.1)"
        }}
      >
        <thead>
          <tr
            style={{ background: "linear-gradient(90deg, #4e79f5, #8c54fb)" }}
          >
            <th
              style={{
                padding: "15px",
                color: "#fff",
                fontSize: "1.2rem",
                fontWeight: "600",
                textAlign: "left",
                textTransform: "uppercase",
                letterSpacing: "1px"
              }}
            >
              Section
            </th>
            {areas.map(area =>
              <th
                key={area}
                style={{
                  padding: "15px",
                  color: "#fff",
                  fontSize: "1.2rem",
                  fontWeight: "600",
                  textAlign: "center",
                  textTransform: "uppercase",
                  letterSpacing: "1px"
                }}
              >
                {area}
              </th>
            )}
          </tr>
        </thead>
        <tbody>
          {sections.map((section, index) =>
            <tr
              key={section.name}
              style={{
                backgroundColor: index % 2 === 0 ? "#f8f8f8" : "#fff",
                transition: "background-color 0.3s ease"
              }}
            >
              <td
                style={{
                  padding: "15px",
                  fontSize: "1rem",
                  fontWeight: "500",
                  color: "#444"
                }}
              >
                {section.name}
              </td>
              {areas.map(area =>
                <td
                  key={area}
                  style={{
                    padding: "15px",
                    fontSize: "1rem",
                    fontWeight: "400",
                    color: "#fff",
                    textAlign: "center",
                    backgroundColor: getCellColor(section.scores[area] || "0%"),
                    //color: "#fff", // White text for better contrast
                    borderRadius: "5px"
                  }}
                  title={`Score: ${section.scores[area] || "N/A"}`}
                >
                  {section.scores[area] || "N/A"}
                </td>
              )}
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Dashboard;
