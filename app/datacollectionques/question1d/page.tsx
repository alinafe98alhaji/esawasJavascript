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
    "1. Centralised tools are insufficient, lacking critical features and integration with systems, leading to inefficient data collection.",
    "2. Centrally developed tools have basic digital features but don't fully cover all organisational needs or integrate smoothly with other systems.",
    "3. Digital tools are improving and starting to meet our broader needs, though integration with existing systems is not yet seamless.",
    "4. The tools are well-suited for most tasks and show good integration, but there's room for better customisation and user experience improvements.",
    "5. Tools are fully optimised, covering all specific needs of our organisation, and integrate flawlessly with our systems, enhancing overall productivity and data quality."
  ];

  const optionsForQuestion1aiii = [
    "Limited Customisation: The tools don't offer enough customisation options to meet our specific data collection needs.",
    "Complexity of Use: The tools are too complex or not user-friendly, making them difficult to use effectively.",
    "Incompatibility with Existing Systems: The tools don't integrate well with our existing data management systems.",
    "Insufficient Training: There isn't enough training provided to effectively use these tools.",
    "Others, please specify"
  ];

  const [yesAreas1ai, setYesAreas1ai] = useState<AreaNames[]>([]);
  const [noAreas1ai, setNoAreas1ai] = useState<AreaNames[]>([]);
  const [activeAreas, setActiveAreas] = useState<AreaNames[]>(
    Object.keys(responses) as AreaNames[]
  );
  const [finalAreas1aiii, setFinalAreas1aiii] = useState<AreaNames[]>([]);

  const questions = [
    {
      id: "1d",
      text:
        "1.d: Is your organisation aware of centrally developed standardised digital tools for data collection?"
    },
    {
      id: "1di",
      text:
        "1.d.(i): Does your organisation use these tools for data collection?"
    },
    {
      id: "1dii",
      text:
        "1.d.(ii): How well suited are these digital tools for your needs as a data collector?"
    },
    {
      id: "1diii",
      text:
        "1.d.(iii): Why are centrally developed standardised digital tools for data collection not fully suited to your needs as a data collector?"
    },
    {
      id: "1div",
      text:
        "1.d.(iv): Why does your organisation not use these standard digital tools for data collection?"
    },
    {
      id: "submit",
      text: "Submit your responses"
    }
  ];

  const toggleDarkMode = () => {
    setIsDarkMode(prevMode => !prevMode);
  };

  async function submitResponses(data: Record<string, any>) {
    try {
      const response = await fetch("/api/submitresponses", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
      });

      if (!response.ok) {
        // Log the response to understand the failure
        console.error("Response error:", await response.json());
        throw new Error("Failed to submit responses");
      }

      console.log("Responses submitted successfully");
    } catch (error) {
      console.error("Error:", error);
    }
  }

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

    const resetResponsesForAreas = (areas: any[]) => {
      const updatedResponses = { ...responses };
      areas.forEach(area => {
        updatedResponses[area as keyof typeof responses] = null;
      });
      setResponses(updatedResponses);
    };

    if (currentQuestion.id === "1d") {
      if (!validateYesNoResponses(activeAreas)) {
        setError("Please select Yes or No for all areas.");
        return;
      }
      const yesAreas = getYesAreas();
      setActiveAreas(yesAreas);
      resetResponsesForAreas(Object.keys(responses) as AreaNames[]); // Reset responses for next question
    } else if (currentQuestion.id === "1di") {
      if (!validateYesNoResponses(activeAreas)) {
        setError("Please select Yes or No for all areas.");
        return;
      }
      setYesAreas1ai(getYesAreas());
      setNoAreas1ai(getNoAreas());
      resetResponsesForAreas(activeAreas); // Reset responses for next question
    } else if (currentQuestion.id === "1dii") {
      if (!validateFiveOptionResponses(yesAreas1ai)) {
        setError("Please select an option for all areas.");
        return;
      }
      const areasFor1aiii = getOptions1to4();
      setFinalAreas1aiii(areasFor1aiii);
      resetResponsesForAreas(yesAreas1ai); // Reset responses for next question
    } else if (
      currentQuestion.id === "1diii" &&
      !validateFiveOptionResponses(finalAreas1aiii)
    ) {
      setError("Please select an option for all areas.");
      return;
    } else if (
      currentQuestion.id === "1div" &&
      !validateFiveOptionResponses(noAreas1ai)
    ) {
      setError("Please select an option for all areas.");
      return;
    } else if (currentQuestion.id === "submit") {
      const finalResponses = saveResponsesToJSON();
      console.log(finalResponses);
      console.log(compiledResponses);
      // Add your submit logic here
      submitResponses(compiledResponses);
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
      <div
        className={`p-6 rounded-lg ${isDarkMode
          ? "bg-gray-900"
          : "bg-gray-100"}`}
      >
        <h2
          className={`text-lg font-[Lato] mb-4 ${isDarkMode
            ? "text-white"
            : "text-gray-800"}`}
        >
          {currentQuestion.text}
        </h2>
        {error &&
          <p className="text-red-600">
            {error}
          </p>}
        {currentQuestion.id === "1d" && renderYesNoRadios(activeAreas)}
        {currentQuestion.id === "1di" && renderYesNoRadios(activeAreas)}
        {currentQuestion.id === "1dii" &&
          renderFiveOptionRadios(yesAreas1ai, optionsForQuestion1aii)}
        {currentQuestion.id === "1diii" &&
          renderFiveOptionRadios(finalAreas1aiii, optionsForQuestion1aiii)}
        {currentQuestion.id === "1div" &&
          renderFiveOptionRadios(noAreas1ai, optionsForQuestion1aiii)}
        {currentQuestion.id === "submit" &&
          <div>
            <h3 className="mb-4 text-blue-800">
              Thank you for completing the survey!
            </h3>{" "}
            {/* Adjusted text color */}
            <p className="text-blue-800">Your responses have been recorded.</p>
            <div className="flex gap-30 items-bottom flex-col sm:flex-row justify-right">
              <a
                className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5"
                href="/dataownershipandmanagement" // Link to your survey page
                target="_self" // Change to _self if you want to navigate in the same tab
              >
                next Survey
              </a>
            </div>
          </div>}
      </div>
    );
  };

  return (
    <div
      className={`${isDarkMode
        ? "relative p-6 bg-gray-900"
        : "relative p-6 bg-gradient-to-b from-teal-500 via-blue-300 to-blue-500"} justify-between items-center min-h-screen`}
      style={{
        position: "relative"
      }}
    >
      {/* Background Image as Watermark */}
      <div
        className="absolute inset-0 bg-center bg-no-repeat bg-contain opacity-80 pointer-events-none z-0"
        style={{
          backgroundImage: `url('/images/afriq.png')`, // Replace with your image path
          backgroundSize: "contain"
        }}
      />

      {/* Main Content */}
      <div className="relative z-10">
        <div className="flex justify-between items-center p-4">
          <h1 className="text-2xl font-bold text-blue-800 font-[Lato]">
            Data Collection Assessment
          </h1>
          <button
            onClick={toggleDarkMode}
            className={`p-2 rounded-full ${isDarkMode
              ? "bg-white font-[Lato] text-black transition-transform transform hover:scale-105 hover:bg-blue-600"
              : "bg-black font-[Lato] text-white-800 transition-transform transform hover:scale-105 hover:bg-green-600"}`}
          >
            {isDarkMode ? "Light" : "Dark"}
          </button>
        </div>

        {/* Questions Section */}
        {renderQuestion()}

        {/* Next/Submit Button */}
        <div className="flex justify-between p-4">
          <button
            onClick={handleNext}
            className="bg-gradient-to-r from-teal-500 to-blue-500 text-white font-[Lato] rounded-full py-3 px-8 font-semibold text-lg transition-transform transform hover:scale-105 shadow-xl hover:shadow-2xl"
          >
            {currentQuestionIndex === questions.length - 1 ? "Submit" : "Next"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default SurveyPage;
