// 'use client';

// import { useState } from 'react';

// const SurveyPage = () => {
//   const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

//   const [responses, setResponses] = useState({
//     UWSS: null,
//     USSM: null,
//     RWSSM: null,
//     RSSM: null,
//     FM: null,
//     RF: null,
//     UOM: null,
//   });

//   const [activeAreas, setActiveAreas] = useState(Object.keys(responses));

//   const questions = [
//     { id: '1', text: 'Question 1: Select Yes/No for each area' },
//     { id: '1a', text: 'Question 1a: Select Yes/No for each area again' },
//     { id: '1ai', text: 'Question 1a(i): Yes/No again for filtered areas from 1a' },
//     { id: '1aii', text: 'Question 1a(ii): Multi-option for areas from 1a(i) with Yes' },
//     { id: '1aiii', text: 'Question 1a(iii): Multi-option question' },
//     { id: '1aiv', text: 'Question 1a(iv): Multi-option for areas from 1a(i) with No' }
//   ];

//   const handleYesNoChange = (area: string, value: boolean) => {
//     setResponses((prevResponses) => ({
//       ...prevResponses,
//       [area]: value,
//     }));
//   };

//   const getYesAreas = () => Object.keys(responses).filter((area) => responses[area as keyof typeof responses] === true);
//   const getNoAreas = () => Object.keys(responses).filter((area) => responses[area as keyof typeof responses] === false);

//   const handleNext = () => {
//     let nextActiveAreas = activeAreas;

//     if (questions[currentQuestionIndex].id === '1') {
//       // For question 1, all areas move forward
//       nextActiveAreas = Object.keys(responses);
//     } else if (questions[currentQuestionIndex].id === '1a') {
//       // Filter areas for 1.a(i) based on Yes/No in 1a
//       nextActiveAreas = getYesAreas();
//     } else if (questions[currentQuestionIndex].id === '1ai') {
//       // At 1.a.(i), areas with Yes move to 1.a.(ii) and No move to 1.a.(iv)
//       const yesAreas = getYesAreas();
//       const noAreas = getNoAreas();
//       setActiveAreas(yesAreas);
//       // Track the no areas for 1.a.(iv)
//       setTimeout(() => {
//         // When reaching 1a(iv), switch active areas to noAreas
//         if (questions[currentQuestionIndex + 1].id === '1aiv') {
//           setActiveAreas(noAreas);
//         }
//       }, 100);
//     }

//     setActiveAreas(nextActiveAreas);
//     setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
//   };

//   const handleBack = () => {
//     if (currentQuestionIndex > 0) {
//       setCurrentQuestionIndex((prevIndex) => prevIndex - 1);
//     }
//   };

//   const renderQuestion = () => {
//     const currentQuestion = questions[currentQuestionIndex];
//     const renderYesNoRadios = (areas: string[]) => (
//       areas.map((area) => (
//         <div key={area}>
//           <label>{area}</label>
//           <input
//             type="radio"
//             name={`yesno-${area}`}
//             value="yes"
//             checked={responses[area as keyof typeof responses] === true}
//             onChange={() => handleYesNoChange(area, true)}
//           />
//           Yes
//           <input
//             type="radio"
//             name={`yesno-${area}`}
//             value="no"
//             checked={responses[area as keyof typeof responses] === false}
//             onChange={() => handleYesNoChange(area, false)}
//           />
//           No
//         </div>
//       ))
//     );

//     const renderFiveOptionRadios = (areas: string[]) => (
//       areas.map((area) => (
//         <div key={area}>
//           <label>{area}</label>
//           <input type="radio" name={`multi-${area}`} value="1" /> Option 1
//           <input type="radio" name={`multi-${area}`} value="2" /> Option 2
//           <input type="radio" name={`multi-${area}`} value="3" /> Option 3
//           <input type="radio" name={`multi-${area}`} value="4" /> Option 4
//           <input type="radio" name={`multi-${area}`} value="5" /> Option 5
//         </div>
//       ))
//     );

//     switch (currentQuestion.id) {
//       case '1':
//         return <div><h3>{currentQuestion.text}</h3>{renderYesNoRadios(Object.keys(responses))}</div>;
//       case '1a':
//         return <div><h3>{currentQuestion.text}</h3>{renderYesNoRadios(Object.keys(responses))}</div>;
//       case '1ai':
//         return <div><h3>{currentQuestion.text}</h3>{renderYesNoRadios(activeAreas)}</div>;
//       case '1aii':
//         return <div><h3>{currentQuestion.text}</h3>{renderFiveOptionRadios(activeAreas)}</div>;
//       case '1aiii':
//         return <div><h3>{currentQuestion.text}</h3>{renderFiveOptionRadios(Object.keys(responses))}</div>; // No filtering at 1a(iii)
//       case '1aiv':
//         return <div><h3>{currentQuestion.text}</h3>{renderFiveOptionRadios(activeAreas)}</div>;
//       default:
//         return <p>No more questions.</p>;
//     }
//   };

//   return (
//     <div>
//       {renderQuestion()}
//       <div>
//         {currentQuestionIndex > 0 && <button onClick={handleBack}>Back</button>}
//         {currentQuestionIndex < questions.length - 1 && <button onClick={handleNext}>Next</button>}
//         {currentQuestionIndex === questions.length - 1 && <button>Submit</button>}
//       </div>
//     </div>
//   );
// };

// export default SurveyPage;

// --------------------------------------------------------------------------------------
// --------------------------------------------------------------------------------------
// ----i made this to distinguish between pieces of code as i keep adding functionality--
// --------------------------------------------------------------------------------------
// --------------------------------------------------------------------------------------

// 'use client';

// import { useState } from 'react';

// const SurveyPage = () => {
//   const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

//   const [responses, setResponses] = useState({
//     UWSS: null,
//     USSM: null,
//     RWSSM: null,
//     RSSM: null,
//     FM: null,
//     RF: null,
//     UOM: null,
//   });

//   const [yesAreas, setYesAreas] = useState<string[]>([]);
//   const [noAreas, setNoAreas] = useState<string[]>([]);
//   const [activeAreas, setActiveAreas] = useState(Object.keys(responses));

//   const questions = [
//     { id: '1', text: 'Question 1: Select Yes/No for each area' },
//     { id: '1a', text: 'Question 1a: Select Yes/No for each area again' },
//     { id: '1ai', text: 'Question 1a(i): Yes/No again for filtered areas from 1a' },
//     { id: '1aii', text: 'Question 1a(ii): Multi-option for areas from 1a(i) with Yes' },
//     { id: '1aiii', text: 'Question 1a(iii): Multi-option question for all areas' }, 
//     { id: '1aiv', text: 'Question 1a(iv): Multi-option for areas from 1a(i) with No' }
//   ];

//   const handleYesNoChange = (area: string, value: boolean) => {
//     setResponses((prevResponses) => ({
//       ...prevResponses,
//       [area]: value,
//     }));
//   };

//   const getYesAreas = () => Object.keys(responses).filter((area) => responses[area as keyof typeof responses] === true);
//   const getNoAreas = () => Object.keys(responses).filter((area) => responses[area as keyof typeof responses] === false);

//   const handleNext = () => {
//     let nextActiveAreas = activeAreas;

//     if (questions[currentQuestionIndex].id === '1') {
//       // For question 1, all areas move forward
//       nextActiveAreas = Object.keys(responses);
//     } else if (questions[currentQuestionIndex].id === '1a') {
//       // For question 1a, filter areas for 1a(i) based on Yes/No in 1a
//       const yes = getYesAreas();
//       setYesAreas(yes);  // Store areas with Yes for future questions
//       nextActiveAreas = yes;
//     } else if (questions[currentQuestionIndex].id === '1ai') {
//       // At 1.a.(i), areas with Yes move to 1.a.(ii) and No move to 1.a.(iv)
//       const yes = getYesAreas();
//       const no = getNoAreas();
//       setYesAreas(yes);  // Store Yes areas for 1a(ii)
//       setNoAreas(no);    // Store No areas for 1a(iv)
//       nextActiveAreas = yes; // Proceed with Yes areas for 1a(ii)
//     }

//     setActiveAreas(nextActiveAreas);
//     setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
//   };

//   const handleBack = () => {
//     if (currentQuestionIndex > 0) {
//       setCurrentQuestionIndex((prevIndex) => prevIndex - 1);
//     }
//   };

//   const renderQuestion = () => {
//     const currentQuestion = questions[currentQuestionIndex];

//     const renderYesNoRadios = (areas: string[]) => (
//       areas.map((area) => (
//         <div key={area}>
//           <label>{area}</label>
//           <input
//             type="radio"
//             name={`yesno-${area}`}
//             value="yes"
//             checked={responses[area as keyof typeof responses] === true}
//             onChange={() => handleYesNoChange(area, true)}
//           />
//           Yes
//           <input
//             type="radio"
//             name={`yesno-${area}`}
//             value="no"
//             checked={responses[area as keyof typeof responses] === false}
//             onChange={() => handleYesNoChange(area, false)}
//           />
//           No
//         </div>
//       ))
//     );

//     const renderFiveOptionRadios = (areas: string[]) => (
//       areas.map((area) => (
//         <div key={area}>
//           <label>{area}</label>
//           <input type="radio" name={`multi-${area}`} value="1" /> Option 1
//           <input type="radio" name={`multi-${area}`} value="2" /> Option 2
//           <input type="radio" name={`multi-${area}`} value="3" /> Option 3
//           <input type="radio" name={`multi-${area}`} value="4" /> Option 4
//           <input type="radio" name={`multi-${area}`} value="5" /> Option 5
//         </div>
//       ))
//     );

//     switch (currentQuestion.id) {
//       case '1':
//         return <div><h3>{currentQuestion.text}</h3>{renderYesNoRadios(Object.keys(responses))}</div>;
//       case '1a':
//         return <div><h3>{currentQuestion.text}</h3>{renderYesNoRadios(Object.keys(responses))}</div>;
//       case '1ai':
//         return <div><h3>{currentQuestion.text}</h3>{renderYesNoRadios(activeAreas)}</div>;
//       case '1aii':
//         return <div><h3>{currentQuestion.text}</h3>{renderFiveOptionRadios(yesAreas)}</div>; // Only areas with Yes in 1a(i)
//       case '1aiii':
//         return <div><h3>{currentQuestion.text}</h3>{renderFiveOptionRadios(Object.keys(responses))}</div>; // No filtering at 1a(iii)
//       case '1aiv':
//         return <div><h3>{currentQuestion.text}</h3>{renderFiveOptionRadios(noAreas)}</div>; // Only areas with No in 1a(i)
//       default:
//         return <p>No more questions.</p>;
//     }
//   };

//   return (
//     <div>
//       {renderQuestion()}
//       <div>
//         {currentQuestionIndex > 0 && <button onClick={handleBack}>Back</button>}
//         {currentQuestionIndex < questions.length - 1 && <button onClick={handleNext}>Next</button>}
//         {currentQuestionIndex === questions.length - 1 && <button>Submit</button>}
//       </div>
//     </div>
//   );
// };

// export default SurveyPage;

// -------------------------------------------------------------------------------------------------------------
// -------------------------------------------------------------------------------------------------------------
// ----(MAIN GO TO ABOVE CODE)i made this to distinguish between pieces of code as i keep adding functionality--
// -------------------------------------------------------------------------------------------------------------
// -------------------------------------------------------------------------------------------------------------



// 'use client';

// import { useState } from 'react';

// const SurveyPage = () => {
//   const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

//   const [responses, setResponses] = useState({
//     UWSS: null,
//     USSM: null,
//     RWSSM: null,
//     RSSM: null,
//     FM: null,
//     RF: null,
//     UOM: null,
//   });

//   const [yesAreas, setYesAreas] = useState<string[]>([]);
//   const [noAreas, setNoAreas] = useState<string[]>([]);
//   const [activeAreas, setActiveAreas] = useState(Object.keys(responses));

//   const questions = [
//     { id: '1', text: 'Question 1: Select Yes/No for each area' },
//     { id: '1a', text: 'Question 1a: Select Yes/No for each area again' },
//     { id: '1ai', text: 'Question 1a(i): Yes/No again for filtered areas from 1a' },
//     { id: '1aii', text: 'Question 1a(ii): Multi-option for areas from 1a(i) with Yes' },
//     { id: '1aiii', text: 'Question 1a(iii): Multi-option question for all areas' },
//     { id: '1aiv', text: 'Question 1a(iv): Multi-option for areas from 1a(i) with No' }
//   ];

//   const handleYesNoChange = (area: string, value: boolean) => {
//     setResponses((prevResponses) => ({
//       ...prevResponses,
//       [area]: value,
//     }));
//   };

//   const getYesAreas = () => Object.keys(responses).filter((area) => responses[area as keyof typeof responses] === true);
//   const getNoAreas = () => Object.keys(responses).filter((area) => responses[area as keyof typeof responses] === false);

//   const handleNext = () => {
//     let nextActiveAreas = activeAreas;

//     if (questions[currentQuestionIndex].id === '1') {
//       // For question 1, all areas move forward
//       nextActiveAreas = Object.keys(responses);
//     } else if (questions[currentQuestionIndex].id === '1a') {
//       // For question 1a, filter areas for 1a(i) based on Yes/No in 1a
//       const yes = getYesAreas();
//       setYesAreas(yes);  // Store areas with Yes for future questions
//       nextActiveAreas = yes;
//     } else if (questions[currentQuestionIndex].id === '1ai') {
//       // At 1.a.(i), areas with Yes move to 1.a.(ii) and No move to 1.a.(iv)
//       const yes = getYesAreas();
//       const no = getNoAreas();
//       setYesAreas(yes);  // Store Yes areas for 1a(ii)
//       setNoAreas(no);    // Store No areas for 1a(iv)
//       nextActiveAreas = yes; // Proceed with Yes areas for 1a(ii)
//     } else if (questions[currentQuestionIndex].id === '1aiv') {
//       // When reaching 1a(iv), use the stored No areas
//       nextActiveAreas = noAreas;
//     }

//     setActiveAreas(nextActiveAreas);
//     setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
//   };

//   const handleBack = () => {
//     if (currentQuestionIndex > 0) {
//       setCurrentQuestionIndex((prevIndex) => prevIndex - 1);
//     }
//   };

//   const renderQuestion = () => {
//     const currentQuestion = questions[currentQuestionIndex];

//     const renderYesNoRadios = (areas: string[]) => (
//       areas.map((area) => (
//         <div key={area}>
//           <label>{area}</label>
//           <input
//             type="radio"
//             name={`yesno-${area}`}
//             value="yes"
//             checked={responses[area as keyof typeof responses] === true}
//             onChange={() => handleYesNoChange(area, true)}
//           />
//           Yes
//           <input
//             type="radio"
//             name={`yesno-${area}`}
//             value="no"
//             checked={responses[area as keyof typeof responses] === false}
//             onChange={() => handleYesNoChange(area, false)}
//           />
//           No
//         </div>
//       ))
//     );

//     const renderFiveOptionRadios = (areas: string[]) => (
//       areas.map((area) => (
//         <div key={area}>
//           <label>{area}</label>
//           <input type="radio" name={`multi-${area}`} value="1" /> Option 1
//           <input type="radio" name={`multi-${area}`} value="2" /> Option 2
//           <input type="radio" name={`multi-${area}`} value="3" /> Option 3
//           <input type="radio" name={`multi-${area}`} value="4" /> Option 4
//           <input type="radio" name={`multi-${area}`} value="5" /> Option 5
//         </div>
//       ))
//     );

//     switch (currentQuestion.id) {
//       case '1':
//         return <div><h3>{currentQuestion.text}</h3>{renderYesNoRadios(Object.keys(responses))}</div>;
//       case '1a':
//         return <div><h3>{currentQuestion.text}</h3>{renderYesNoRadios(Object.keys(responses))}</div>;
//       case '1ai':
//         return <div><h3>{currentQuestion.text}</h3>{renderYesNoRadios(activeAreas)}</div>;
//       case '1aii':
//         return <div><h3>{currentQuestion.text}</h3>{renderFiveOptionRadios(yesAreas)}</div>; // Only areas with Yes in 1a(i)
//       case '1aiii':
//         return <div><h3>{currentQuestion.text}</h3>{renderFiveOptionRadios(Object.keys(responses))}</div>; // No filtering at 1a(iii)
//       case '1aiv':
//         return <div><h3>{currentQuestion.text}</h3>{renderFiveOptionRadios(noAreas)}</div>; // Only areas with No in 1a(i)
//       default:
//         return <p>No more questions.</p>;
//     }
//   };

//   return (
//     <div>
//       {renderQuestion()}
//       <div>
//         {currentQuestionIndex > 0 && <button onClick={handleBack}>Back</button>}
//         {currentQuestionIndex < questions.length - 1 && <button onClick={handleNext}>Next</button>}
//         {currentQuestionIndex === questions.length - 1 && <button>Submit</button>}
//       </div>
//     </div>
//   );
// };

// export default SurveyPage;

// --------------------------------------------------------------------------------------
// --------------------------------------------------------------------------------------
// ----i made this to distinguish between pieces of code as i keep adding functionality--
// --------------------------------------------------------------------------------------
// --------------------------------------------------------------------------------------

// 'use client';

// import { useState } from 'react';

// const SurveyPage = () => {
//   const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

//   const [responses, setResponses] = useState({
//     UWSS: null,
//     USSM: null,
//     RWSSM: null,
//     RSSM: null,
//     FM: null,
//     RF: null,
//     UOM: null,
//   });

//   const [yesAreas1ai, setYesAreas1ai] = useState<string[]>([]); // Yes areas after 1.a(i)
//   const [noAreas1ai, setNoAreas1ai] = useState<string[]>([]); // No areas after 1.a(i)

//   const questions = [
//     { id: '1', text: 'Question 1: Select Yes/No for each area' },
//     { id: '1a', text: 'Question 1a: Select Yes/No for each area again' },
//     { id: '1ai', text: 'Question 1a(i): Yes/No again for filtered areas from 1a' },
//     { id: '1aii', text: 'Question 1a(ii): Multi-option for areas from 1a(i) with Yes' },
//     { id: '1aiii', text: 'Question 1a(iii): Multi-option for all areas' },
//     { id: '1aiv', text: 'Question 1a(iv): Multi-option for areas from 1a(i) with No' }
//   ];

//   // Handle changes for Yes/No selection per area
//   const handleYesNoChange = (area: string, value: boolean) => {
//     setResponses((prevResponses) => ({
//       ...prevResponses,
//       [area]: value,
//     }));
//   };

//   const getYesAreas = () => Object.keys(responses).filter((area) => responses[area as keyof typeof responses] === true);
//   const getNoAreas = () => Object.keys(responses).filter((area) => responses[area as keyof typeof responses] === false);

//   const handleNext = () => {
//     const currentQuestion = questions[currentQuestionIndex];

//     if (currentQuestion.id === '1') {
//       // After 1.a, filter Yes areas to move to 1.a(i)
//       setResponses(responses);
//       // setYesAreas1ai(yesAreas); // Set Yes areas for 1a(i)
//       // setNoAreas1ai(getNoAreas);
//     }
//     if (currentQuestion.id === '1a') {
//       // After 1.a, filter Yes areas to move to 1.a(i)
//       const yesAreas = getYesAreas();
//       setYesAreas1ai(yesAreas); // Set Yes areas for 1a(i)
//       // setNoAreas1ai(getNoAreas);
//     } else if (currentQuestion.id === '1ai') {
//       // At 1.a(i), split Yes/No responses for next steps (1a(ii) and 1a(iv))
//       const yesAreas = getYesAreas();
//       setYesAreas1ai(yesAreas); // Set Yes areas for 1a(i)
//       setNoAreas1ai(getNoAreas);
//     }

//     // Move to the next question
//     setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
//   };

//   const handleBack = () => {
//     if (currentQuestionIndex > 0) {
//       setCurrentQuestionIndex((prevIndex) => prevIndex - 1);
//     }
//   };

//   const renderQuestion = () => {
//     const currentQuestion = questions[currentQuestionIndex];

//     // Helper function to render Yes/No radios for the areas
//     const renderYesNoRadios = (areas: string[]) => (
//       areas.map((area) => (
//         <div key={area}>
//           <label>{area}</label>
//           <input
//             type="radio"
//             name={`yesno-${area}`}
//             value="yes"
//             checked={responses[area as keyof typeof responses] === true}
//             onChange={() => handleYesNoChange(area, true)}
//           />
//           Yes
//           <input
//             type="radio"
//             name={`yesno-${area}`}
//             value="no"
//             checked={responses[area as keyof typeof responses] === false}
//             onChange={() => handleYesNoChange(area, false)}
//           />
//           No
//         </div>
//       ))
//     );

//     // Helper function to render multi-option (5 radios) for areas
//     const renderFiveOptionRadios = (areas: string[]) => (
//       areas.map((area) => (
//         <div key={area}>
//           <label>{area}</label>
//           <input type="radio" name={`multi-${area}`} value="1" /> Option 1
//           <input type="radio" name={`multi-${area}`} value="2" /> Option 2
//           <input type="radio" name={`multi-${area}`} value="3" /> Option 3
//           <input type="radio" name={`multi-${area}`} value="4" /> Option 4
//           <input type="radio" name={`multi-${area}`} value="5" /> Option 5
//         </div>
//       ))
//     );

//     // Switch between questions and display the correct input based on the question
//     switch (currentQuestion.id) {
//       case '1':
//         return <div><h3>{currentQuestion.text}</h3>{renderYesNoRadios(Object.keys(responses))}</div>;
//       case '1a':
//         return <div><h3>{currentQuestion.text}</h3>{renderYesNoRadios(Object.keys(responses))}</div>;
//       case '1ai':
//         return <div><h3>{currentQuestion.text}</h3>{renderYesNoRadios(yesAreas1ai)}</div>;
//       case '1aii':
//         return <div><h3>{currentQuestion.text}</h3>{renderFiveOptionRadios(yesAreas1ai)}</div>;
//       case '1aiii':
//         return <div><h3>{currentQuestion.text}</h3>{renderFiveOptionRadios(Object.keys(responses))}</div>; // No filtering
//       case '1aiv':
//         return <div><h3>{currentQuestion.text}</h3>{renderFiveOptionRadios(noAreas1ai)}</div>; // Correctly render No areas from 1.a(i)
//       default:
//         return <p>No more questions.</p>;
//     }
//   };

//   return (
//     <div>
//       {renderQuestion()}
//       <div>
//         {currentQuestionIndex > 0 && <button onClick={handleBack}>Back</button>}
//         {currentQuestionIndex < questions.length - 1 && <button onClick={handleNext}>Next</button>}
//         {currentQuestionIndex === questions.length - 1 && <button>Submit</button>}
//       </div>
//     </div>
//   );
// };

// export default SurveyPage;

//-------------------------------------------------------------------------------------------------
//-----------------------------------------------------------------------------------------------
//[=============================================================================================]
//-----------------------------------------------------------------------------------------------


'use client';

import { useState } from 'react';

const SurveyPage = () => {
  
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [error, setError] = useState<string | null>(null);

  const [responses, setResponses] = useState({
    UWSS: null,
    USSM: null,
    RWSSM: null,
    RSSM: null,
    FM: null,
    RF: null,
    UOM: null,
  });

  const [yesAreas1ai, setYesAreas1ai] = useState<string[]>([]); // Yes areas after 1.a(i)
  const [noAreas1ai, setNoAreas1ai] = useState<string[]>([]);   // No areas after 1.a(i)
  const [activeAreas, setActiveAreas] = useState<string[]>(Object.keys(responses)); // Active areas for the flow

  const questions = [
    { id: '1', text: 'Question 1: Select Yes/No for each area' },
    { id: '1a', text: 'Question 1a: Select Yes/No for each area again' },
    { id: '1ai', text: 'Question 1a(i): Yes/No again for filtered areas from 1a' },
    { id: '1aii', text: 'Question 1a(ii): Multi-option for areas from 1a(i) with Yes' },
    { id: '1aiii', text: 'Question 1a(iii): Multi-option for all areas' },
    { id: '1aiv', text: 'Question 1a(iv): Multi-option for areas from 1a(i) with No' }
  ];

  const handleYesNoChange = (area: string, value: boolean) => {
    setResponses((prevResponses) => ({
      ...prevResponses,
      [area]: value,
    }));
    setError(null); // Clear error when user makes a selection
  };

  const handleFiveOptionChange = (area: string, value: string) => {
    setResponses((prevResponses) => ({
      ...prevResponses,
      [area]: value,
    }));
    setError(null); // Clear error when user makes a selection
  };

  // Get areas that selected Yes or No
  const getYesAreas = () => activeAreas.filter((area) => responses[area as keyof typeof responses] === true);
  const getNoAreas = () => activeAreas.filter((area) => responses[area as keyof typeof responses] === false);

  // Validation: Ensure all areas have a selection
  const validateAllFieldsSelected = (areas: string[]) => {
    for (const area of areas) {
      if (responses[area as keyof typeof responses] === null) {
        return false;
      }
    }
    return true;
  };

  const handleNext = () => {
    
    const currentQuestion = questions[currentQuestionIndex];

    if (currentQuestion.id === '1a') {
      // Validate all fields for 1.a
      if (!validateAllFieldsSelected(activeAreas)) {
        setError('Please select Yes or No for all areas.');
        return; // Stop here if validation fails
      }
      const yesAreas = getYesAreas();
      setActiveAreas(yesAreas); // Remove areas that selected "No" from active areas
    } else if (currentQuestion.id === '1ai') {
      // Validate Yes/No fields for filtered areas in 1.a(i)
      if (!validateAllFieldsSelected(activeAreas)) {
        setError('Please select Yes or No for all areas.');
        return; // Stop here if validation fails
      }
      setYesAreas1ai(getYesAreas()); // Set Yes areas for 1a(ii)
      setNoAreas1ai(getNoAreas());   // Set No areas for 1a(iv)
    }

    // Move to the next question
    setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
    setError(null); // Clear error when moving to next question
  };

  const handleBack = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prevIndex) => prevIndex - 1);
    }
  };

  const renderQuestion = () => {
    const currentQuestion = questions[currentQuestionIndex];

    const renderYesNoRadios = (areas: string[]) => (
      areas.map((area) => (
        <div key={area}>
          <label>{area}</label>
          <input
            type="radio"
            name={`yesno-${area}`}
            value="yes"
            checked={responses[area as keyof typeof responses] === true}
            onChange={() => handleYesNoChange(area, true)}
          />
          Yes
          <input
            type="radio"
            name={`yesno-${area}`}
            value="no"
            checked={responses[area as keyof typeof responses] === false}
            onChange={() => handleYesNoChange(area, false)}
          />
          No
        </div>
      ))
    );

    const renderFiveOptionRadios = (areas: string[]) => (
      areas.map((area) => (
        <div key={area}>
          <label>{area}</label>
          <input type="radio" name={`multi-${area}`} value="1" onChange={() => handleFiveOptionChange(area, "1")} /> Option 1
          <input type="radio" name={`multi-${area}`} value="2" onChange={() => handleFiveOptionChange(area, "2")} /> Option 2
          <input type="radio" name={`multi-${area}`} value="3" onChange={() => handleFiveOptionChange(area, "3")} /> Option 3
          <input type="radio" name={`multi-${area}`} value="4" onChange={() => handleFiveOptionChange(area, "4")} /> Option 4
          <input type="radio" name={`multi-${area}`} value="5" onChange={() => handleFiveOptionChange(area, "5")} /> Option 5
        </div>
      ))
    );

    switch (currentQuestion.id) {
      case '1':
        return <div><h3>{currentQuestion.text}</h3>{renderYesNoRadios(Object.keys(responses))}</div>;
      case '1a':
        return <div><h3>{currentQuestion.text}</h3>{renderYesNoRadios(activeAreas)}</div>;
      case '1ai':
        return <div><h3>{currentQuestion.text}</h3>{renderYesNoRadios(activeAreas)}</div>;
      case '1aii':
        return <div><h3>{currentQuestion.text}</h3>{renderFiveOptionRadios(yesAreas1ai)}</div>;
      case '1aiii':
        return <div><h3>{currentQuestion.text}</h3>{renderFiveOptionRadios(activeAreas)}</div>; // No filtering
      case '1aiv':
        return <div><h3>{currentQuestion.text}</h3>{renderFiveOptionRadios(noAreas1ai)}</div>; // Correctly render No areas from 1.a(i)
      default:
        return <p>No more questions.</p>;
    }
  };

  return (
    <div>
      {renderQuestion()}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <div>
        {currentQuestionIndex > 0 && <button onClick={handleBack}>Back</button>}
        {currentQuestionIndex < questions.length - 1 && <button onClick={handleNext}>Next</button>}
        {currentQuestionIndex === questions.length - 1 && <button>Submit</button>}
      </div>
    </div>
  );
};

export default SurveyPage;

