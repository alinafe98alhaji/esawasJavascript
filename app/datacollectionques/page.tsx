//--------------------------------------------
//--------------------------------------------
//--------------------------------------------

// 'use client';

// import { useState } from 'react';

// const SurveyPage = () => {
//   const [isDarkMode, setIsDarkMode] = useState(false);
//   const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
//   const [error, setError] = useState<string | null>(null);

//   const [responses, setResponses] = useState({
//     UrbanWSS: null,
//     USSM: null,
//     RWSSM: null,
//     RSSM: null,
//     FM: null,
//     RF: null,
//     UOM: null,
//   });

//   type AreaNames = 'UrbanWSS' | 'USSM' | 'RWSSM' | 'RSSM' | 'FM' | 'RF' | 'UOM';

//   const areaFullNames: Record<AreaNames, string> = {
//     UrbanWSS: "Urban Water Supply Sector Monitoring",
//     USSM: "Urban Sanitation Sector Monitoring",
//     RWSSM: "Rural Water Supply Sector Monitoring",
//     RSSM: "Rural Sanitation Sector Monitoring",
//     FM: "Finance",
//     RF: "Regulation",
//     UOM: "Utility Operations",
//   };

//   const optionsForQuestion1aii = [
//     "1. Poorly defined and inconsistently used, causing fragmented data practices.",
//     "2. Some definition and use, but still uneven and not well-aligned with strategies.",
//     "3. Growing alignment with national strategies, increasing use, with some inconsistencies remaining.",
//     "4. Well-defined and widely used, aligned with national strategies, with minor discrepancies.",
//     "5. Fully developed, universally used, enabling seamless and consistent data practices across all organisations."
//   ];

//   const optionsForQuestion1aiii = [
//     "Organisational Priorities: The standards aren't relevant to our organisation's goals",
//     "Complexity of Standards: The standards are too complex or technical for us.",
//     "Resource Constraints: We don't have enough money or staff to implement these standards.",
//     "Resistance to Change: People in the organisation resist changing current practices.",
//     "Others, please specify"
//   ];

//   const [yesAreas1ai, setYesAreas1ai] = useState<AreaNames[]>([]);
//   const [noAreas1ai, setNoAreas1ai] = useState<AreaNames[]>([]);
//   const [activeAreas, setActiveAreas] = useState<AreaNames[]>(Object.keys(responses) as AreaNames[]);
//   const [finalAreas1aiii, setFinalAreas1aiii] = useState<AreaNames[]>([]);

//   const questions = [
//     { id: '1', text: '1.0: Does your organisation collect primary data?' },
//     { id: '1a', text: '1.a: Is your organisation aware of national guidelines that specify how data should be collected?' },
//     { id: '1ai', text: '1.a.(i): Does your organisation collect data in adherence to these national guidelines?' },
//     { id: '1aii', text: '1.a.(ii): How effective are the guidelines in terms of their development, adoption, and suitability?' },
//     { id: '1aiii', text: '1.a.(iii): Why are guidelines for data collection not fully effective in terms of their development, adoption, and suitability?' },
//     { id: '1aiv', text: '1.a.(iv): Why does your organisation not collect data in adherence to these guidelines?' }
//   ];

//   const toggleDarkMode = () => {
//     setIsDarkMode((prevMode) => !prevMode);
//   };

//   const handleYesNoChange = (area: string, value: boolean) => {
//     setResponses((prevResponses) => ({
//       ...prevResponses,
//       [area]: value,
//     }));
//     setError(null);
//   };

//   const handleFiveOptionChange = (area: string, value: string) => {
//     setResponses((prevResponses) => ({
//       ...prevResponses,
//       [area]: value,
//     }));
//     setError(null);
//   };

//   const validateAllFieldsSelected = (areas: AreaNames[]) => {
//     return areas.every((area) => responses[area] !== null);
//   };

//   const getYesAreas = () => activeAreas.filter((area) => responses[area as keyof typeof responses] === true);
//   const getNoAreas = () => activeAreas.filter((area) => responses[area as keyof typeof responses] === false);
//   const getOptions1to4 = () => yesAreas1ai.filter((area) => {
//     const value = responses[area as keyof typeof responses];
//     return value !== null && value !== '5';
//   });

//   const saveResponsesToJSON = () => {
//     const json = JSON.stringify(responses, null, 2);
//     console.log(json); // Replace with save logic or API call as needed
//   };

//   const handleNext = () => {
//     const currentQuestion = questions[currentQuestionIndex];

//     if (currentQuestion.id === '1') {
//       if (!validateAllFieldsSelected(Object.keys(responses) as AreaNames[])) {
//         setError('Please answer for all areas.');
//         return;
//       }
//     } else if (currentQuestion.id === '1a') {
//       if (!validateAllFieldsSelected(activeAreas)) {
//         setError('Please select Yes or No for all areas.');
//         return;
//       }
//       const yesAreas = getYesAreas();
//       setActiveAreas(yesAreas);
//     } else if (currentQuestion.id === '1ai') {
//       if (!validateAllFieldsSelected(activeAreas)) {
//         setError('Please select Yes or No for all areas.');
//         return;
//       }
//       setYesAreas1ai(getYesAreas());
//       setNoAreas1ai(getNoAreas());
//     } else if (currentQuestion.id === '1aii') {
//       if (!validateAllFieldsSelected(yesAreas1ai)) {
//         setError('Please select an option for all areas.');
//         return;
//       }
//       const areasFor1aiii = getOptions1to4();
//       setFinalAreas1aiii(areasFor1aiii);
//     } else if (currentQuestion.id === '1aiii' && !validateAllFieldsSelected(finalAreas1aiii)) {
//       setError('Please select an option for all areas.');
//       return;
//     } else if (currentQuestion.id === '1aiv' && !validateAllFieldsSelected(noAreas1ai)) {
//       setError('Please select an option for all areas.');
//       return;
//     }

//     saveResponsesToJSON();
//     setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
//     setError(null);
//   };

//   const handleBack = () => {
//     if (currentQuestionIndex > 0) {
//       setCurrentQuestionIndex((prevIndex) => prevIndex - 1);
//       setError(null);
//     }
//   };

//   const renderQuestion = () => {
//     const currentQuestion = questions[currentQuestionIndex];

//     const renderYesNoRadios = (areas: AreaNames[]) => (
//       areas.map((area) => (
//         <div key={area} className="flex items-center mb-2">
//           <label className="text-blue-800 mr-2">{areaFullNames[area]}</label>
//           <div className="flex items-center">
//             <input
//               type="radio"
//               name={`yesno-${area}`}
//               value="yes"
//               checked={responses[area] === true}
//               onChange={() => handleYesNoChange(area, true)}
//               className="mr-1 text-green-500 border-gray-300 focus:ring-green-500"
//             />
//             <span className="text-green-600">Yes</span>
//           </div>
//           <div>
//             <input
//               type="radio"
//               name={`yesno-${area}`}
//               value="no"
//               checked={responses[area] === false}
//               onChange={() => handleYesNoChange(area, false)}
//               className="mr-1 text-red-500 border-gray-300 focus:ring-red-500"
//             />
//             <span className="text-red-600">No</span>
//           </div>
//         </div>
//       ))
//     );

//     const renderFiveOptionRadios = (areas: AreaNames[], options: string[]) => (
//       areas.map((area) => (
//         <div key={area} className="flex flex-col mb-4">
//           <label className="text-blue-800 mb-2">{areaFullNames[area]}</label>
//           {options.map((option, index) => (
//             <div key={`${area}-${index}`} className="text-red-500 flex items-center mb-1">
//               <input
//                 type="radio"
//                 name={`multi-${area}`}
//                 value={String(index + 1)}
//                 onChange={() => handleFiveOptionChange(area, String(index + 1))}
//                 className="mr-1"
//               />
//               {option}
//             </div>
//           ))}
//         </div>
//       ))
//     );

//     switch (currentQuestion.id) {
//       case '1':
//         return <div className="p-4 border rounded shadow"><h3 className="text-blue-500 font-bold mb-4">{currentQuestion.text}</h3>{renderYesNoRadios(Object.keys(responses) as AreaNames[])}</div>;
//       case '1a':
//         return <div className="p-4 border rounded shadow"><h3 className="text-blue-500 font-bold mb-4">{currentQuestion.text}</h3>{renderYesNoRadios(activeAreas)}</div>;
//       case '1ai':
//         return <div className="p-4 border rounded shadow"><h3 className="text-blue-500 font-bold mb-4">{currentQuestion.text}</h3>{renderYesNoRadios(activeAreas)}</div>;
//       case '1aii':
//         return <div className="p-4 border rounded shadow"><h3 className="text-blue-500 font-bold mb-4">{currentQuestion.text}</h3>{renderFiveOptionRadios(yesAreas1ai, optionsForQuestion1aii)}</div>;
//       case '1aiii':
//         return <div className="p-4 border rounded shadow"><h3 className="text-blue-500 font-bold mb-4">{currentQuestion.text}</h3>{renderFiveOptionRadios(finalAreas1aiii, optionsForQuestion1aiii)}</div>;
//       case '1aiv':
//         return <div className="p-4 border rounded shadow"><h3 className="text-blue-500 font-bold mb-4">{currentQuestion.text}</h3>{renderFiveOptionRadios(noAreas1ai, optionsForQuestion1aiii)}</div>;
//       default:
//         return <div>Unknown question</div>;
//     }
//   };

//   return (
//     <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-white text-black'}`}>
//       <button className="p-2 bg-indigo-500 text-white rounded mb-4" onClick={toggleDarkMode}>
//         Toggle Dark Mode
//       </button>
//       {renderQuestion()}
//       {error && <div className="text-red-500 font-bold mt-4">{error}</div>}
//       <div className="mt-6 flex">
//         <button onClick={handleBack} className="p-2 mr-4 bg-gray-400 text-white rounded">Back</button>
//         <button onClick={handleNext} className="p-2 bg-blue-500 text-white rounded">Next</button>
//       </div>
//     </div>
//   );
// };

// export default SurveyPage;
//--------------------------------------------
//--------------------------------------------
//--------------------------------------------
"use client";

import { useState } from "react";

const SurveyPage = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [error, setError] = useState<string | null>(null);

  const [responses, setResponses] = useState({
    UrbanWSS: null,
    USSM: null,
    RWSSM: null,
    RSSM: null,
    FM: null,
    RF: null,
    UOM: null
  });

  type AreaNames = "UrbanWSS" | "USSM" | "RWSSM" | "RSSM" | "FM" | "RF" | "UOM";

  const areaFullNames: Record<AreaNames, string> = {
    UrbanWSS: "Urban Water Supply Sector Monitoring",
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
    console.log(json); // Replace with save logic or API call as needed
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
    }

    saveResponsesToJSON();
    setCurrentQuestionIndex(prevIndex => prevIndex + 1);
    setError(null);
  };

  const handleBack = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prevIndex => prevIndex - 1);
      setError(null);
    }
  };

  const renderQuestion = () => {
    const currentQuestion = questions[currentQuestionIndex];

    const renderYesNoRadios = (areas: AreaNames[]) =>
      areas.map(area =>
        <div key={area} className="flex items-center mb-2">
          <label className="text-blue-800 mr-2">
            {areaFullNames[area]}
          </label>
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
          <div>
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
      );

    const renderFiveOptionRadios = (areas: AreaNames[], options: string[]) =>
      areas.map(area =>
        <div key={area} className="mb-2">
          <label className="text-blue-800">
            {areaFullNames[area]}
          </label>
          {options.map((option, index) =>
            <div key={index} className="flex items-center">
              <input
                type="radio"
                name={`five-option-${area}`}
                value={index + 1}
                checked={responses[area] === `${index + 1}`}
                onChange={() => handleFiveOptionChange(area, `${index + 1}`)}
                className="mr-2 text-indigo-500 focus:ring-indigo-500"
              />
              <span className="text-indigo-600">
                {option}
              </span>
            </div>
          )}
        </div>
      );

    return (
      <div>
        <h2 className="text-xl font-semibold mb-4">
          {currentQuestion.text}
        </h2>
        {currentQuestion.id === "1" &&
          renderYesNoRadios(Object.keys(responses) as AreaNames[])}
        {currentQuestion.id === "1a" && renderYesNoRadios(activeAreas)}
        {currentQuestion.id === "1ai" && renderYesNoRadios(activeAreas)}
        {currentQuestion.id === "1aii" &&
          renderFiveOptionRadios(yesAreas1ai, optionsForQuestion1aii)}
        {currentQuestion.id === "1aiii" &&
          renderFiveOptionRadios(finalAreas1aiii, optionsForQuestion1aiii)}
        {currentQuestion.id === "1aiv" &&
          renderFiveOptionRadios(noAreas1ai, optionsForQuestion1aiii)}
        {error &&
          <p className="text-red-500 font-semibold">
            {error}
          </p>}
      </div>
    );
  };

  return (
    <div
      className={`p-4 ${isDarkMode
        ? "bg-gray-900 text-white"
        : "bg-white text-gray-900"}`}
    >
      <div className="mb-4">
        <button
          onClick={toggleDarkMode}
          className="bg-indigo-500 text-white px-4 py-2 rounded"
        >
          Toggle Dark Mode
        </button>
      </div>
      {renderQuestion()}
      <div className="mt-6 flex justify-between">
        <button
          onClick={handleBack}
          className="bg-gray-400 text-white px-4 py-2 rounded"
          disabled={currentQuestionIndex === 0}
        >
          Back
        </button>
        <button
          onClick={handleNext}
          className="bg-green-500 text-white px-4 py-2 rounded"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default SurveyPage;
