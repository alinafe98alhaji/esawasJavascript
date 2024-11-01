"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";

type Responses = {
  question1: string[];
  question1a: string[];
  question2: string[];
  question2a: string[];
  // Add more questions as needed
};

const Survey: React.FC = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [responses, setResponses] = useState<Responses>({
    question1: [],
    question1a: [],
    question2: [],
    question2a: []
    // Initialize for all questions
  });

  const onSubmit = async (data: any) => {
    console.log("Form Data: ", data);
    await saveResponsesToJson();
  };

  const handleNext = (questionKey: keyof Responses, response: string) => {
    setResponses(prevResponses => ({
      ...prevResponses,
      [questionKey]: [...prevResponses[questionKey], response] // Save all responses for the question
    }));
  };

  const saveResponsesToJson = async () => {
    const compiledResponses = {
      responses
    };

    await saveToDatabase(compiledResponses);
  };

  const saveToDatabase = async (data: any) => {
    console.log("Saving data to database:", data);
    // Here you would implement your actual database save logic
    // Example: await fetch('/api/save', { method: 'POST', body: JSON.stringify(data) });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <h2>Question 1: Yes or No?</h2>
        <label>
          <input
            type="radio"
            value="Yes"
            {...register("question1")}
            onChange={() => handleNext("question1", "Yes")}
          />
          Yes
        </label>
        <label>
          <input
            type="radio"
            value="No"
            {...register("question1")}
            onChange={() => handleNext("question1", "No")}
          />
          No
        </label>
        {errors.question1 && <span>This field is required</span>}
      </div>

      <div>
        <h2>Question 1a: Please provide more details</h2>
        <label>
          <input
            type="text"
            {...register("question1a")}
            onBlur={e => handleNext("question1a", e.target.value)}
          />
        </label>
      </div>

      <div>
        <h2>Question 2: Multiple Options</h2>
        <label>
          <input
            type="checkbox"
            value="Option1"
            {...register("question2")}
            onChange={e => handleNext("question2", e.target.value)}
          />
          Option 1
        </label>
        <label>
          <input
            type="checkbox"
            value="Option2"
            {...register("question2")}
            onChange={e => handleNext("question2", e.target.value)}
          />
          Option 2
        </label>
        {errors.question2 && <span>This field is required</span>}
      </div>

      <div>
        <h2>Question 2a: Additional Comments</h2>
        <label>
          <input
            type="text"
            {...register("question2a")}
            onBlur={e => handleNext("question2a", e.target.value)}
          />
        </label>
      </div>

      <button type="submit">Submit</button>
    </form>
  );
};

export default Survey;
