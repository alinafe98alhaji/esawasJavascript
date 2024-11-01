"use client";

import { useEffect, useState } from "react";

const SurveyPage = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [compiledResponses, setCompiledResponses] = useState<{
    [key: string]: string;
  }>({});
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [error, setError] = useState<string | null>(null);

  const [responses, setResponses] = useState({
    UWSS: null,
    USSM: null,
    RWSSM: null,
    RSSM: null,
    FM: null,
    RF: null,
    UOM: null
  });

  type AreaNames = "UWSS" | "USSM" | "RWSSM" | "RSSM" | "FM" | "RF" | "UOM";

  const areaFullNames: Record<AreaNames, string> = {
    UWSS: "Urban Water Supply Sector Monitoring",
    USSM: "Urban Sanitation Sector Monitoring",
    RWSSM: "Rural Water Supply Sector Monitoring",
    RSSM: "Rural Sanitation Sector Monitoring",
    FM: "Finance",
    RF: "Regulation",
    UOM: "Utility Operations"
  };

  const optionsForQuestion1aii = [
    "1. Poorly defined and inconsistently used, causing fragmented data practices.",
    "2. Some definition and use, but still uneven and not well-aligned with strategies.",
    "3. Growing alignment with national strategies, increasing use, with some inconsistencies remaining.",
    "4. Well-defined and widely used, aligned with national strategies, with minor discrepancies.",
    "5. Fully developed, universally used, enabling seamless and consistent data practices across all organisations."
  ];

  const optionsForQuestion1aiii = [
    "Organisational Priorities: The standards aren't relevant to our organisation's goals",
    "Complexity of Standards: The standards are too complex or technical for us.",
    "Resource Constraints: We don't have enough money or staff to implement these standards.",
    "Resistance to Change: People in the organisation resist changing current practices.",
    "Others, please specify"
  ];

  const [yesAreas1ai, setYesAreas1ai] = useState<AreaNames[]>([]);
  const [noAreas1ai, setNoAreas1ai] = useState<AreaNames[]>([]);
  const [activeAreas, setActiveAreas] = useState<AreaNames[]>(
    Object.keys(responses) as AreaNames[]
  );
  const [finalAreas1aiii, setFinalAreas1aiii] = useState<AreaNames[]>([]);

  const questions = [
    { id: "1", text: "1.0: Does your organisation collect primary data?" },
    {
      id: "1a",
      text:
        "1.a: Is your organisation aware of national guidelines that specify how data should be collected?"
    },
    {
      id: "1ai",
      text:
        "1.a.(i): Does your organisation collect data in adherence to these national guidelines?"
    },
    {
      id: "1aii",
      text:
        "1.a.(ii): How effective are the guidelines in terms of their development, adoption, and suitability?"
    },
    {
      id: "1aiii",
      text:
        "1.a.(iii): Why are guidelines for data collection not fully effective in terms of their development, adoption, and suitability?"
    },
    {
      id: "1aiv",
      text:
        "1.a.(iv): Why does your organisation not collect data in adherence to these guidelines?"
    },
    {
      id: "submit",
      text: "Submit your responses"
    }
  ];

  const toggleDarkMode = () => {
    setIsDarkMode(prevMode => !prevMode);
  };

  const handleYesNoChange = (area: string, value: boolean) => {
    setResponses(prevResponses => ({
      ...prevResponses,
      [area]: value
    }));
    setError(null);
  };

  const handleFiveOptionChange = (area: string, value: string) => {
    setResponses(prevResponses => ({
      ...prevResponses,
      [area]: value
    }));
    setError(null);
  };

  const validateAllFieldsSelected = (areas: AreaNames[]) => {
    return areas.every(area => responses[area] !== null);
  };

  const getYesAreas = () =>
    activeAreas.filter(
      area => responses[area as keyof typeof responses] === true
    );
  const getNoAreas = () =>
    activeAreas.filter(
      area => responses[area as keyof typeof responses] === false
    );
  const getOptions1to4 = () =>
    yesAreas1ai.filter(area => {
      const value = responses[area as keyof typeof responses];
      return value !== null && value !== "5";
    });

  const saveResponsesToJSON = () => {
    const json = JSON.stringify(responses, null, 2);
    //console.log(json); // Replace with save logic or API call as needed
    return json;
  };

  // Custom validation functions for specific questions
  const validateYesNoResponses = (areas: AreaNames[]) => {
    return areas.every(area => typeof responses[area] === "boolean");
  };

  const validateFiveOptionResponses = (areas: AreaNames[]) => {
    return areas.every(
      area => typeof responses[area] === "string" && responses[area] !== null
    );
  };

  useEffect(
    () => {
      console.log("Updated compiledResponses:", compiledResponses);
    },
    [compiledResponses]
  );

  // const saveResponsesToJSON = () => {
  //   const json = JSON.stringify(responses, null, 2);
  //   return json;
  // };

  const handleNext = () => {
    const currentQuestion = questions[currentQuestionIndex];

    if (currentQuestion.id === "1") {
      if (!validateAllFieldsSelected(Object.keys(responses) as AreaNames[])) {
        setError("Please answer for all areas.");
        return;
      }
    } else if (currentQuestion.id === "1a") {
      if (!validateYesNoResponses(activeAreas)) {
        setError("Please select Yes or No for all areas.");
        return;
      }
      const yesAreas = getYesAreas();
      setActiveAreas(yesAreas);
    } else if (currentQuestion.id === "1ai") {
      if (!validateYesNoResponses(activeAreas)) {
        setError("Please select Yes or No for all areas.");
        return;
      }
      setYesAreas1ai(getYesAreas());
      setNoAreas1ai(getNoAreas());
    } else if (currentQuestion.id === "1aii") {
      if (!validateFiveOptionResponses(yesAreas1ai)) {
        setError("Please select an option for all areas.");
        return;
      }
      const areasFor1aiii = getOptions1to4();
      setFinalAreas1aiii(areasFor1aiii);
    } else if (
      currentQuestion.id === "1aiii" &&
      !validateFiveOptionResponses(finalAreas1aiii)
    ) {
      setError("Please select an option for all areas.");
      return;
    } else if (
      currentQuestion.id === "1aiv" &&
      !validateFiveOptionResponses(noAreas1ai)
    ) {
      setError("Please select an option for all areas.");
      return;
    } else if (currentQuestion.id === "submit") {
      const finalResponses = saveResponsesToJSON();
      console.log(compiledResponses);
      // Add your submit logic here
      alert("Responses submitted!");
      return;
    }

    setCompiledResponses(prevCompiled => ({
      ...prevCompiled,
      [currentQuestion.id]: saveResponsesToJSON()
    }));

    setCurrentQuestionIndex(prevIndex => prevIndex + 1);
    setError(null);
  };

  // const handleBack = () => {
  //   if (currentQuestionIndex > 0) {
  //     setCurrentQuestionIndex(prevIndex => prevIndex - 1);
  //     setError(null);
  //   }
  // };

  const renderQuestion = () => {
    const currentQuestion = questions[currentQuestionIndex];

    const renderYesNoRadios = (areas: AreaNames[]) =>
      areas.map(area =>
        <div
          key={area}
          className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 mb-2 rounded-lg shadow bg-white hover:bg-blue-100 transition-colors duration-200"
        >
          <label className="text-blue-800 font-medium sm:w-1/3">
            {areaFullNames[area]}
          </label>
          <div className="flex items-center space-x-6">
            <div className="flex items-center">
              <input
                type="radio"
                name={`yesno-${area}`}
                value="yes"
                checked={responses[area] === true}
                onChange={() => handleYesNoChange(area, true)}
                className="mr-1 text-green-500 border-gray-300 focus:ring-green-500"
              />
              <span className="text-green-600">Yes</span>
            </div>
            <div className="flex items-center">
              <input
                type="radio"
                name={`yesno-${area}`}
                value="no"
                checked={responses[area] === false}
                onChange={() => handleYesNoChange(area, false)}
                className="mr-1 text-red-500 border-gray-300 focus:ring-red-500"
              />
              <span className="text-red-600">No</span>
            </div>
          </div>
        </div>
      );

    const renderFiveOptionRadios = (areas: AreaNames[], options: string[]) =>
      areas.map(area =>
        <div
          key={area}
          className="mb-2 bg-white p-4 rounded-lg shadow hover:bg-blue-100 transition-colors duration-200"
        >
          <label className="text-blue-800 font-medium">
            {areaFullNames[area]}
          </label>
          <div className="flex flex-col">
            {options.map((option, index) =>
              <div key={index} className="flex items-center mb-1">
                <input
                  type="radio"
                  name={`options-${area}`}
                  value={`${index + 1}`}
                  checked={responses[area] === `${index + 1}`}
                  onChange={() => handleFiveOptionChange(area, `${index + 1}`)}
                  className="mr-1 text-blue-600 border-gray-300 focus:ring-blue-500"
                />
                <span className="text-gray-800">{option}</span>{" "}
                {/* Adjusted text color */}
              </div>
            )}
          </div>
        </div>
      );

    return (
      <div className={`p-6 ${isDarkMode ? "bg-gray-900" : "bg-gray-100"}`}>
        <h2
          className={`text-lg font-semibold mb-4 ${isDarkMode
            ? "text-white"
            : "text-gray-800"}`}
        >
          {currentQuestion.text}
        </h2>
        {error &&
          <p className="text-red-600">
            {error}
          </p>}
        {currentQuestion.id === "1" && renderYesNoRadios(activeAreas)}
        {currentQuestion.id === "1a" && renderYesNoRadios(activeAreas)}
        {currentQuestion.id === "1ai" && renderYesNoRadios(activeAreas)}
        {currentQuestion.id === "1aii" &&
          renderFiveOptionRadios(yesAreas1ai, optionsForQuestion1aii)}
        {currentQuestion.id === "1aiii" &&
          renderFiveOptionRadios(finalAreas1aiii, optionsForQuestion1aiii)}
        {currentQuestion.id === "1aiv" &&
          renderFiveOptionRadios(noAreas1ai, optionsForQuestion1aiii)}
        {currentQuestion.id === "submit" &&
          <div>
            <h3 className="mb-4 text-blue-800">
              Thank you for completing the survey!
            </h3>{" "}
            {/* Adjusted text color */}
            <p className="text-blue-800">Your responses have been recorded.</p>
          </div>}
      </div>
    );
  };

  return (
    <div
      className={`${isDarkMode ? "bg-gray-900" : "bg-gray-100"} min-h-screen`}
    >
      <div className="flex justify-between items-center p-4">
        <h1 className="text-2xl font-bold text-blue-800">
          Data collection Survey
        </h1>
        <button
          onClick={toggleDarkMode}
          className={`p-2  rounded-full ${isDarkMode
            ? "bg-white text-black transition-transform transform hover:scale-105 hover:bg-blue-600"
            : "bg-black text-white-800 transition-transform transform hover:scale-105 hover:bg-green-600"}`}
        >
          {isDarkMode ? "Light" : "Dark"}
        </button>
      </div>
      {renderQuestion()}
      <div className="flex justify-between p-4">
        <button
          onClick={handleNext}
          className="px-4 py-2 bg-gray-500 text-white rounded transition-transform transform hover:scale-105 hover:bg-green-600"
        >
          {currentQuestionIndex === questions.length - 1 ? "Submit" : "Next"}
        </button>
      </div>
    </div>
  );
};

export default SurveyPage;
