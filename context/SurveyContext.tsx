"use client";

import React, { createContext, useContext, useState } from "react";

interface BasicDetails {
  name: string;
  organization: string;
  country: string;
}

interface Response {
  [folder: string]: {
    [questionId: string]: string | number | boolean;
  };
}

interface SurveyContextProps {
  basicDetails: BasicDetails | null;
  responses: Response;
  setBasicDetails: (details: BasicDetails) => void;
  addResponse: (folder: string, questionId: string, response: string | number | boolean) => void;
}

const SurveyContext = createContext<SurveyContextProps | undefined>(undefined);

export const SurveyProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [basicDetails, setBasicDetails] = useState<BasicDetails | null>(null);
  const [responses, setResponses] = useState<Response>({});

  const addResponse = (folder: string, questionId: string, response: string | number | boolean) => {
    setResponses((prev) => ({
      ...prev,
      [folder]: {
        ...prev[folder],
        [questionId]: response,
      },
    }));
  };

  return (
    <SurveyContext.Provider value={{ basicDetails, responses, setBasicDetails, addResponse }}>
      {children}
    </SurveyContext.Provider>
  );
};

export const useSurvey = () => {
  const context = useContext(SurveyContext);
  if (!context) {
    throw new Error("useSurvey must be used within a SurveyProvider");
  }
  return context;
};
