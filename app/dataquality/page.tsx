"use client";
import React, { useState } from "react";

type SurveyQuestionProps = {
  onSaveResponse: (response: string) => void;
};

const SurveyQuestion: React.FC<SurveyQuestionProps> = ({ onSaveResponse }) => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [customInput, setCustomInput] = useState<string>("");

  // Handle radio button selection
  const handleOptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSelectedOption(value);
    if (value !== "5") {
      setCustomInput(""); // Clear the custom input if option is not the fifth one
    }
  };

  // Handle custom input change
  const handleCustomInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setCustomInput(event.target.value);
  };

  // Save response on form submission
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const response = selectedOption === "5" ? customInput : selectedOption;
    onSaveResponse(response || ""); // Ensure response is a string
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>
          <input
            type="radio"
            value="1"
            checked={selectedOption === "1"}
            onChange={handleOptionChange}
          />
          Option 1
        </label>
      </div>
      <div>
        <label>
          <input
            type="radio"
            value="2"
            checked={selectedOption === "2"}
            onChange={handleOptionChange}
          />
          Option 2
        </label>
      </div>
      <div>
        <label>
          <input
            type="radio"
            value="3"
            checked={selectedOption === "3"}
            onChange={handleOptionChange}
          />
          Option 3
        </label>
      </div>
      <div>
        <label>
          <input
            type="radio"
            value="4"
            checked={selectedOption === "4"}
            onChange={handleOptionChange}
          />
          Option 4
        </label>
      </div>
      <div>
        <label>
          <input
            type="radio"
            value="5"
            checked={selectedOption === "5"}
            onChange={handleOptionChange}
          />
          Other (Please specify)
        </label>
        {selectedOption === "5" &&
          <input
            type="text"
            value={customInput}
            onChange={handleCustomInputChange}
            placeholder="Enter your response"
          />}
      </div>
      <button type="submit">Next</button>
    </form>
  );
};

export default SurveyQuestion;
