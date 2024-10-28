//'use client';
/*
--------------------------------------------------------------------------------------
--------------------------------------------------------------------------------------
----(MAIN GO TO)i made this to distinguish between pieces of code as i keep adding functionality--
--------------------------------------------------------------------------------------
--------------------------------------------------------------------------------------
*/

// import { useState } from 'react';

// const SurveyPage = () => {//main component starts here

//   const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

//   // Track yes/no responses for the areas
//   const [responses, setResponses] = useState({
//     UWSS: null,
//     USSM: null,
//     RWSSM: null,
//     RSSM: null,
//     FM: null,
//     RF: null,
//     UOM: null,
//   });

//   // Track active areas to be displayed in the next question
//   const [activeAreas, setActiveAreas] = useState(Object.keys(responses));


//   // Track inactive areas to be displayed in the appropriate question
//   const [inactiveAreas, setInactiveAreas] = useState(Object.keys(responses));

//   // Store a history of active areas at each question index
//   const [activeAreaHistory, setActiveAreaHistory] = useState([Object.keys(responses)]);

//   const questions = [
//         { id: '1',     text: 'Question 1: Select Yes/No for each area' },
//         { id: '1a',    text: 'Question 1a: Yet another question for Yes areas' },
//         { id: '1ai',   text: 'Question 1a(i): Another question for Yes areas' },
//         { id: '1aii',  text: 'Question 1a(ii): the logic part with five radios' },
//         { id: '1aiii', text: 'Question 1a(iii): No logic but with five radios' },
//         { id: '1aiv',  text: 'Question 1a(iv): No logic but with five radios' },
        
//         // Add other questions here
//       ];
      
//   // Handle Yes/No response changes
//   const handleYesNoChange = (area: string, value: boolean) => {
//     setResponses((prevResponses) => ({
//       ...prevResponses,
//       [area]: value,
//     }));
//   };

//   // Get areas that responded "Yes" (true) in the current question
//   const getYesAreas = () => {
//     return Object.keys(responses).filter((area) => responses[area as keyof typeof responses] === true);
//   };

//   const getNoAreas = () => {
//     return Object.keys(responses).filter((area) => responses[area as keyof typeof responses] === false);
//   };

//   // Go to the next question and update the active areas
//   const handleNext = () => {
    
//     if (questions[currentQuestionIndex].id === '1') {
//       // For Question 1, carry over all areas to 1a
//       const allAreas = Object.keys(responses);
//       setActiveAreaHistory((prevHistory) => [...prevHistory, allAreas]);
//       setActiveAreas(allAreas); // Carry over all areas
//      }

//      if (questions[currentQuestionIndex].id === '1.a') {
//       // For Question 1.a store yes areas and use in 1.a.(ii)
//       // const yesArea1a = getYesAreas();
//       // const noArea1a = getNoAreas();
//       // setActiveAreaHistory((prevHistory) => [...prevHistory, Object.keys(responses)]);
//       // setActiveAreas(Object.keys(responses));
//       // setActiveAreas(yesArea1a); // Update active areas to only include areas that answered "Yes"
//       // setInactiveAreas(noArea1a);//Update inactive areas to inly include areas that asnwered "No"

//       // Get Yes and No areas from the responses
//       const yesAreas1a = getYesAreas();
      

//       // Store responses in history and update active/inactive areas
//       setActiveAreaHistory((prevHistory) => [...prevHistory, Object.keys(responses)]);
//       setActiveAreas(yesAreas1a); // Areas that selected "Yes" for use in 1.a.(i)
//      }
//      if (questions[currentQuestionIndex].id === '1.a.(i)') {
//       // For Question 1.a.(i) get yes areas
//       setActiveAreaHistory((prevHistory) => [...prevHistory, activeAreas]);
      
     
//      }
//      if (questions[currentQuestionIndex].id === '1.a.(ii)') {
//       // For Question 1, carry over all areas to 1a
//        // Carry over all areas
//      }
//      if (questions[currentQuestionIndex].id === '1/a.(iii)') {
//       // For Question 1, carry over all areas to 1a
//       // Carry over all areas
//      }
//      if (questions[currentQuestionIndex].id === '1.a.(iv)') {
//       // For Question 1, carry over all areas to 1a
//       // 
//       inactiveAreas
      
//      }

     
//       //else {
//     //   // For other questions, filter areas based on "Yes" responses
//     //   const yesAreas = getYesAreas();
//     //   setActiveAreaHistory((prevHistory) => [...prevHistory, yesAreas]);
//     //   
//     // }
//     setCurrentQuestionIndex((prevIndex) => prevIndex + 1);//leave this alone
//   };

//   // Go to the previous question and restore active areas from history
//   const handleBack = () => {
//     if (currentQuestionIndex > 0) {
//       setCurrentQuestionIndex((prevIndex) => prevIndex - 1);
//       setActiveAreas(activeAreaHistory[currentQuestionIndex - 1]); // Restore active areas from history
//     }
//   };

//   // Render the current question based on the index
//   const renderQuestion = () => {
//     const currentQuestion = questions[currentQuestionIndex];

//     switch (currentQuestion.id) {
//       case '1':
//         // Render the first question with all areas
//         return (
//           <div>
//             <h3>{currentQuestion.text}</h3>
//             {Object.keys(responses).map((area) => (
//               <div key={area}>
//                 <label>{area}</label>
//                 <input
//                   type="radio"
//                   name={`yesno-${area}`}
//                   value="yes"
//                   checked={responses[area as keyof typeof responses] === true}
//                   onChange={() => handleYesNoChange(area, true)}
//                   required
//                 />
//                 Yes
//                 <input
//                   type="radio"
//                   name={`yesno-${area}`}
//                   value="no"
//                   checked={responses[area as keyof typeof responses] === false}
//                   onChange={() => handleYesNoChange(area, false)}
//                   required
//                 />
//                 No
//               </div>
//             ))}
//           </div>
//         );

//       case '1a':
//         // Render question 1a with all areas (regardless of Yes/No)
//         return (
//           <div>
//             <h3>{currentQuestion.text}</h3>
//             {getYesAreas().map((area) => (
//               <div key={area}>
//                 <label>{area}</label>
//                 <input
//                   type="radio"
//                   name={`yesno-${area}-1ai`}
//                   value="yes"
//                   onChange={() => handleYesNoChange(area, true)}
//                   checked={responses[area as keyof typeof responses] === true}
//                 />
//                 Yes
//                 <input
//                   type="radio"
//                   name={`yesno-${area}-1ai`}
//                   value="no"
//                   onChange={() => handleYesNoChange(area, false)}
//                   checked={responses[area as keyof typeof responses] === false}
//                 />
//                 No
//               </div>
//             ))}
//           </div>
//         );

//       case '1ai':
//         // Render question 1a(i) with only areas that answered "Yes" in the previous question
//         return (
//           <div>
//             <h3>{currentQuestion.text}</h3>
//             {activeAreas.length > 0 ? (
//               activeAreas.map((area) => (
//                 <div key={area}>
//                   <label>{area}</label>
//                   <input
//                     type="radio"
//                     name={`yesno-${area}-1ai`}
//                     value="yes"
//                     checked={responses[area as keyof typeof responses] === true}
//                     onChange={() => handleYesNoChange(area, true)}
//                   />
//                   yes
//                   <input
//                     type="radio"
//                     name={`yesno-${area}-1aii`}
//                     value="no"
//                     checked={responses[area as keyof typeof responses] === false}
//                     onChange={() => handleYesNoChange(area, false)}
//                   />
//                   no
//                 </div>
//               ))
//             ) : (
//               <p>No areas to display for this question.</p>
//             )}
//           </div>
//         );


// //--------------------------------------------------------------------------------------------------
// //--------------------------------------------------------------------------------------------------use different object to store state
// //--------------------------------------------------------------------------------------------------


//         case '1aii':
//         // Render question 1a(ii) with only areas that answered "Yes" in the previous question
//         return (
//           <div>
//             <h3>{currentQuestion.text}</h3>
//             {activeAreas.length > 0 ? (
//               activeAreas.map((area) => (
//                 <div key={area}>
//                   <label>{area}</label>
//                   <input
//                     type="radio"
//                     name={`yesno-${area}-1aii`}
//                     value="yes"
//                     checked={responses[area as keyof typeof responses] === true}
//                     onChange={() => handleYesNoChange(area, true)}
//                   />
//                   yes
//                   <input
//                     type="radio"
//                     name={`yesno-${area}-1aii`}
//                     value="no"
//                     checked={responses[area as keyof typeof responses] === false}
//                     onChange={() => handleYesNoChange(area, false)}
//                   />
//                   no
//                 </div>
//               ))
//             ) : (
//               <p>No areas to display for this question.</p>
//             )}
//           </div>
//         );
        
//         case '1aiii':
//         // Render question 1a(iii) with only areas that answered "Yes" in the previous question
//         return (
//           <div>
//             <h3>{currentQuestion.text}</h3>
//             {activeAreas.length > 0 ? (
//               activeAreas.map((area) => (
//                 <div key={area}>
//                   <label>{area}</label>
//                   <input
//                     type="radio"
//                     name={`yesno-${area}-1aii`}
//                     value="yes"
//                     checked={responses[area as keyof typeof responses] === true}
//                     onChange={() => handleYesNoChange(area, true)}
//                   />
//                   yes
//                   <input
//                     type="radio"
//                     name={`yesno-${area}-1aii`}
//                     value="no"
//                     checked={responses[area as keyof typeof responses] === false}
//                     onChange={() => handleYesNoChange(area, false)}
//                   />
//                   no
//                 </div>
//               ))
//             ) : (
//               <p>No areas to display for this question.</p>
//             )}
//           </div>
//         );

//         case '1aiv':
//         // Render question 1a(iv) with only areas that answered "Yes" in the previous question
//         return (
//           <div>
//             <h3>{currentQuestion.text}</h3>
//             {activeAreas.length > 0 ? (
//               activeAreas.map((area) => (
//                 <div key={area}>
//                   <label>{area}</label>
//                   <input
//                     type="radio"
//                     name={`yesno-${area}-1aii`}
//                     value="yes"
//                     checked={responses[area as keyof typeof responses] === true}
//                     onChange={() => handleYesNoChange(area, true)}
//                   />
//                   yes
//                   <input
//                     type="radio"
//                     name={`yesno-${area}-1aii`}
//                     value="no"
//                     checked={responses[area as keyof typeof responses] === false}
//                     onChange={() => handleYesNoChange(area, false)}
//                   />
//                   no
//                 </div>
//               ))
//             ) : (
//               <p>No areas to display for this question.</p>
//             )}
//           </div>
//         );

//       // Add cases for other questions as needed

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

/*
--------------------------------------------------------------------------------------
--------------------------------------------------------------------------------------
----i made this to distinguish between pieces of code as i keep adding functionality--
--------------------------------------------------------------------------------------
--------------------------------------------------------------------------------------
*/
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

//   // Track active areas throughout the survey
//   const [activeAreas, setActiveAreas] = useState(Object.keys(responses));
//   const [noAreasFrom1ai, setNoAreasFrom1ai] = useState<string[]>([]); // Track "No" areas from 1.a.(i)

//   const questions = [
//     { id: '1', text: 'Question 1: Select Yes/No for each area' },
//     { id: '1a', text: 'Question 1a: Select Yes/No for each area again' },
//     { id: '1ai', text: 'Question 1a(i): Yes/No again for filtered areas from 1a' },
//     { id: '1aii', text: 'Question 1a(ii): Multi-option for areas from 1a(i) with Yes' },
//     { id: '1aiii', text: 'Question 1a(iii): Multi-option question' },
//     { id: '1aiv', text: 'Question 1a(iv): Multi-option for areas from 1a(i) with No' }, // Filtered "No" areas from 1.a.(i)
//   ];

//   const handleYesNoChange = (area: string, value: boolean) => {
//     setResponses((prevResponses) => ({
//       ...prevResponses,
//       [area]: value,
//     }));
//   };

//   const handleMultiOptionChange = (area: string, value: number) => {
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
//       setNoAreasFrom1ai(noAreas); // Track the no areas for 1.a.(iv)
//       nextActiveAreas = yesAreas;
//     } else if (questions[currentQuestionIndex].id === '1aii') {
//       // Filter out areas selecting option 5 in 1.a.(ii)
//       nextActiveAreas = activeAreas.filter((area) => responses[area as keyof typeof responses] !== 5);
//     } else if (questions[currentQuestionIndex].id === '1aiv') {
//       // For question 1a(iv), render only the No areas from 1.a.(i)
//       nextActiveAreas = noAreasFrom1ai; // Use the saved no areas from 1.a.(i)
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
//           <input type="radio" name={`multi-${area}`} value="1" onChange={() => handleMultiOptionChange(area, 1)} /> Option 1
//           <input type="radio" name={`multi-${area}`} value="2" onChange={() => handleMultiOptionChange(area, 2)} /> Option 2
//           <input type="radio" name={`multi-${area}`} value="3" onChange={() => handleMultiOptionChange(area, 3)} /> Option 3
//           <input type="radio" name={`multi-${area}`} value="4" onChange={() => handleMultiOptionChange(area, 4)} /> Option 4
//           <input type="radio" name={`multi-${area}`} value="5" onChange={() => handleMultiOptionChange(area, 5)} /> Option 5
//         </div>
//       ))
//     );

//     switch (currentQuestion.id) {
//       case '1':
//       case '1a':
//         return <div><h3>{currentQuestion.text}</h3>{renderYesNoRadios(Object.keys(responses))}</div>;
//       case '1ai':
//         return <div><h3>{currentQuestion.text}</h3>{renderYesNoRadios(activeAreas)}</div>;
//       case '1aii':
//       case '1aiii':
//         return <div><h3>{currentQuestion.text}</h3>{renderFiveOptionRadios(activeAreas)}</div>;
//       case '1aiv':
//         return <div><h3>{currentQuestion.text}</h3>{renderFiveOptionRadios(noAreasFrom1ai)}</div>;
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


/*
--------------------------------------------------------------------------------------
----------------------)MAIN CODE_-----------------------------------------------------
----i made this to distinguish between pieces of code as i keep adding functionality--
--------------------------------------------------------------------------------------
--------------------------------------------------------------------------------------
*/

// 'use client';

// import { useState } from 'react';

// const SurveyPage = () => {
  
//   const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
//   const [error, setError] = useState<string | null>(null);

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
//   const [noAreas1ai, setNoAreas1ai] = useState<string[]>([]);   // No areas after 1.a(i)
//   const [activeAreas, setActiveAreas] = useState<string[]>(Object.keys(responses)); // Active areas for the flow

//   const [yesAreas1aii, setYesAreas1aii] = useState<string[]>([]); // Yes areas for 1a(iii)
//   const [finalAreas1aiii, setFinalAreas1aiii] = useState<string[]>([]); // Areas proceeding to 1a(iii)

//   const questions = [
//     { id: '1', text: 'Question 1: Select Yes/No for each area' },
//     { id: '1a', text: 'Question 1a: Select Yes/No for each area again' },
//     { id: '1ai', text: 'Question 1a(i): Yes/No again for filtered areas from 1a' },
//     { id: '1aii', text: 'Question 1a(ii): Multi-option for areas from 1a(i) with Yes' },
//     { id: '1aiii', text: 'Question 1a(iii): Multi-option for all areas' },
//     { id: '1aiv', text: 'Question 1a(iv): Multi-option for areas from 1a(i) with No' }
//   ];

//   const handleYesNoChange = (area: string, value: boolean) => {
//     setResponses((prevResponses) => ({
//       ...prevResponses,
//       [area]: value,
//     }));
//     setError(null); // Clear error when user makes a selection
//   };

//   const handleFiveOptionChange = (area: string, value: string) => {
//     setResponses((prevResponses) => ({
//       ...prevResponses,
//       [area]: value,
//     }));
//     setError(null); // Clear error when user makes a selection
//   };

//   // Get areas that selected Yes or No
//   const getYesAreas = () => activeAreas.filter((area) => responses[area as keyof typeof responses] === true);
//   const getNoAreas = () => activeAreas.filter((area) => responses[area as keyof typeof responses] === false);

//   // Get areas that selected options 1-4 (for 1.a(ii) and 1.a(iii))
//   const getOptions1to4 = () => yesAreas1ai.filter((area) => {
//     const value = responses[area as keyof typeof responses];
//     return value !== null && value !== '5';
//   });

//   // Validation: Ensure all areas have a selection
//   const validateAllFieldsSelected = (areas: string[]) => {
//     for (const area of areas) {
//       if (responses[area as keyof typeof responses] === null) {
//         return false;
//       }
//     }
//     return true;
//   };

//   const handleNext = () => {
    
//     const currentQuestion = questions[currentQuestionIndex];

//     if (currentQuestion.id === '1a') {
//       // Validate all fields for 1.a
//       if (!validateAllFieldsSelected(activeAreas)) {
//         setError('Please select Yes or No for all areas.');
//         return; // Stop here if validation fails
//       }
//       const yesAreas = getYesAreas();
//       setActiveAreas(yesAreas); // Remove areas that selected "No" from active areas
//     } else if (currentQuestion.id === '1ai') {
//       // Validate Yes/No fields for filtered areas in 1.a(i)
//       if (!validateAllFieldsSelected(activeAreas)) {
//         setError('Please select Yes or No for all areas.');
//         return; // Stop here if validation fails
//       }
//       setYesAreas1ai(getYesAreas()); // Set Yes areas for 1a(ii)
//       setNoAreas1ai(getNoAreas());   // Set No areas for 1a(iv)
//     } else if (currentQuestion.id === '1aii') {
//       // Validate multi-option fields for 1.a(ii)
//       if (!validateAllFieldsSelected(yesAreas1ai)) {
//         setError('Please select an option for all areas.');
//         return; // Stop here if validation fails
//       }
//       const areasFor1aiii = getOptions1to4(); // Only areas with option 1-4 proceed
//       setFinalAreas1aiii(areasFor1aiii); // Set final areas for 1.a(iii)
//     }

//     // Move to the next question
//     setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
//     setError(null); // Clear error when moving to next question
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
//           <input type="radio" name={`multi-${area}`} value="1" onChange={() => handleFiveOptionChange(area, "1")} /> Option 1
//           <input type="radio" name={`multi-${area}`} value="2" onChange={() => handleFiveOptionChange(area, "2")} /> Option 2
//           <input type="radio" name={`multi-${area}`} value="3" onChange={() => handleFiveOptionChange(area, "3")} /> Option 3
//           <input type="radio" name={`multi-${area}`} value="4" onChange={() => handleFiveOptionChange(area, "4")} /> Option 4
//           <input type="radio" name={`multi-${area}`} value="5" onChange={() => handleFiveOptionChange(area, "5")} /> Option 5
//         </div>
//       ))
//     );

//     switch (currentQuestion.id) {
//       case '1':
//         return <div><h3>{currentQuestion.text}</h3>{renderYesNoRadios(Object.keys(responses))}</div>;
//       case '1a':
//         return <div><h3>{currentQuestion.text}</h3>{renderYesNoRadios(activeAreas)}</div>;
//       case '1ai':
//         return <div><h3>{currentQuestion.text}</h3>{renderYesNoRadios(activeAreas)}</div>;
//       case '1aii':
//         return <div><h3>{currentQuestion.text}</h3>{renderFiveOptionRadios(yesAreas1ai)}</div>;
//       case '1aiii':
//         return <div><h3>{currentQuestion.text}</h3>{renderFiveOptionRadios(finalAreas1aiii)}</div>; // Filtered areas
//       case '1aiv':
//         return <div><h3>{currentQuestion.text}</h3>{renderFiveOptionRadios(noAreas1ai)}</div>; // Correctly render No areas from 1.a(i)
//       default:
//         return <p>No more questions.</p>;
//     }
//   };

//   return (
//     <div>
//       {renderQuestion()}
//       {error && <p style={{ color: 'red' }}>{error}</p>}
//       <div>
//         {currentQuestionIndex > 0 && <button onClick={handleBack}>Back</button>}
//         {currentQuestionIndex < questions.length - 1 && <button onClick={handleNext}>Next</button>}
//         {currentQuestionIndex === questions.length - 1 && <button>Submit</button>}
//       </div>
//     </div>
//   );
// };

// export default SurveyPage;

/*
--------------------------------------------------------------------------------------
--------------------------------------------------------------------------------------
----i made this to distinguish between pieces of code as i keep adding functionality--
--------------------------------------------------------------------------------------
--------------------------------------------------------------------------------------
*/

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
  

// const optionsForQuestion1aii = [
//   "1. Poorly defined and inconsistently used, causing fragmented data practices.", 
//   "2. Some definition and use, but still uneven and not well-aligned with strategies.", 
//   "3. Growing alignment with national strategies, increasing use, with some inconsistencies remaining.", 
//   "4. Well-defined and widely used, aligned with national strategies, with minor discrepancies.", 
//   "5. Fully developed, universally used, enabling seamless and consistent data practices across all organisations."
// ];

// const optionsForQuestion1aiii = [
//   "Organisational Priorities: The standards aren't relevant to our organisation's goals", 
//   "Complexity of Standards: The standards are too complex or technical for us.", 
//   "Resource Constraints: We don't have enough money or staff to implement these standards.", 
//   "Resistance to Change: People in the organisation resist changing current practices.", 
//   "others please specify"
// ];

// // Use these labels for each question

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
//   setIsDarkMode((prevMode) => !prevMode);
// };

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

//   const getYesAreas = () => activeAreas.filter((area) => responses[area as keyof typeof responses] === true);
//   const getNoAreas = () => activeAreas.filter((area) => responses[area as keyof typeof responses] === false);

//   const getOptions1to4 = () => yesAreas1ai.filter((area) => {
//     const value = responses[area as keyof typeof responses];
//     return value !== null && value !== '5';
//   });

//   const validateAllFieldsSelected = (areas: string[]) => {
//     for (const area of areas) {
//       if (responses[area as keyof typeof responses] === null) {
//         return false;
//       }
//     }
//     return true;
//   };

//   const handleNext = () => {
//     const currentQuestion = questions[currentQuestionIndex];

//     if (currentQuestion.id === '1a') {
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
//     }

//     setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
//     setError(null);
//   };

//   const handleBack = () => {
//     if (currentQuestionIndex > 0) {
//       setCurrentQuestionIndex((prevIndex) => prevIndex - 1);
//     }
//   };

//   const renderQuestion = () => {
//     const currentQuestion = questions[currentQuestionIndex];

//     // const renderYesNoRadios = (areas: string[]) => (
//     //   areas.map((area) => (
//     //     <div key={area} className="flex items-center mb-2">
//     //       <label className="text-blue-800 mr-2">{area}</label>
//     //       <input
//     //         type="radio"
//     //         name={`yesno-${area}`}
//     //         value="yes"
//     //         checked={responses[area as keyof typeof responses] === true}
//     //         onChange={() => handleYesNoChange(area, true)}
//     //         className="text-blue-500 mr-1"
//     //       />
//     //       Yes
//     //       <input
//     //         type="radio"
//     //         name={`yesno-${area}`}
//     //         value="no"
//     //         checked={responses[area as keyof typeof responses] === false}
//     //         onChange={() => handleYesNoChange(area, false)}
//     //         className="text-blue-500 ml-2 mr-1"
//     //       />
//     //       No
//     //     </div>
//     //   ))
//     // );

//     // const renderYesNoRadios = (areas: string[]) => (
//     //   areas.map((area) => (
//     //     <div key={area} className="flex items-center mb-2">
//     //       <label className="text-gray-800 mr-2">{area}</label>
//     //       <div className="flex items-center">
//     //         <input
//     //           type="radio"
//     //           name={`yesno-${area}`}
//     //           value="yes"
//     //           checked={responses[area as keyof typeof responses] === true}
//     //           onChange={() => handleYesNoChange(area, true)}
//     //           className="mr-1 text-green-500 border-gray-300 focus:ring-green-500" // Style for Yes option
//     //         />
//     //         <span className="text-green-600">Yes</span>
//     //       </div>
//     //       <div className="flex items-center ml-4">
//     //         <input
//     //           type="radio"
//     //           name={`yesno-${area}`}
//     //           value="no"
//     //           checked={responses[area as keyof typeof responses] === false}
//     //           onChange={() => handleYesNoChange(area, false)}
//     //           className="mr-1 text-red-500 border-gray-300 focus:ring-red-500" // Style for No option
//     //         />
//     //         <span className="text-red-600">No</span>
//     //       </div>
//     //     </div>
//     //   ))
//     // );

//     const renderYesNoRadios = (areas: AreaNames[]) => (
//       areas.map((area) => (
//         <div key={area} className="flex items-center mb-2">
//           <label className="text-gray-800 mr-2">{areaFullNames[area]}</label> {/* No more error */}
//           <div className="flex items-center">
//             <input
//             type="radio"
//             name={`yesno-${area}`}
//             value="yes"
//             checked={responses[area as keyof typeof responses] === true}
//             onChange={() => handleYesNoChange(area, true)}
//             className="mr-1 text-green-500 border-gray-300 focus:ring-green-500" // Style for Yes option
//           />
//           <span className="text-green-600">Yes</span>
//           </div>
//           <div>
//             <input
//             type="radio"
//             name={`yesno-${area}`}
//             value="no"
//             checked={responses[area as keyof typeof responses] === false}
//             onChange={() => handleYesNoChange(area, false)}
//             className="mr-1 text-red-500 border-gray-300 focus:ring-red-500" // Style for No option
//           />
//           <span className="text-red-600">No</span>
//           </div>
          
//         </div>
//       ))
//     );

//     // const renderFiveOptionRadios = (areas: string[]) => (
//     //   areas.map((area) => (
//     //     <div key={area} className="flex flex-col mb-4">
//     //       <label className="text-blue-800 mb-2">{area}</label>
//     //       <div className=" text-green-500 flex items-center mb-1">
//     //         <input type="radio" name={`multi-${area}`} value="1" onChange={() => handleFiveOptionChange(area, "1")} className="mr-1" /> Option 1
//     //       </div>
//     //       <div className="text-green-500 flex items-center mb-1">
//     //         <input type="radio" name={`multi-${area}`} value="2" onChange={() => handleFiveOptionChange(area, "2")} className="mr-1" /> Option 2
//     //       </div>
//     //       <div className="text-green-500 flex items-center mb-1">
//     //         <input type="radio" name={`multi-${area}`} value="3" onChange={() => handleFiveOptionChange(area, "3")} className="mr-1" /> Option 3
//     //       </div>
//     //       <div className="text-green-500 flex items-center mb-1">
//     //         <input type="radio" name={`multi-${area}`} value="4" onChange={() => handleFiveOptionChange(area, "4")} className="mr-1" /> Option 4
//     //       </div>
//     //       <div className="text-green-500 flex items-center mb-1">
//     //         <input type="radio" name={`multi-${area}`} value="5" onChange={() => handleFiveOptionChange(area, "5")} className="mr-1" /> Option 5 
//     //       </div>
//     //     </div>
//     //   ))
//     // );

//     const renderFiveOptionRadios = (areas: string[], options: string[]) => (
//       areas.map((area) => (
//         <div key={area} className="flex flex-col mb-4">
//           <label className="text-blue-800 mb-2">{area}</label>
//           {options.map((option, index) => (
//             <div key={`${area}-${index}`} className="text-green-500 flex items-center mb-1">
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
//         return <div className="p-4 border rounded shadow"><h3 className="text-blue-500 font-bold mb-4">{currentQuestion.text}</h3>{renderYesNoRadios(Object.keys(responses)as AreaNames[])}</div>;
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
//         return <p>No more questions.</p>;
//     }
//   };

//   return (
//     <div className="max-w-md mx-auto mt-8 p-6 border rounded-lg shadow-lg bg-white">
//       {renderQuestion()}
//       {error && <p className="text-red-500">{error}</p>}
//       <div className="mt-4 flex justify-between">
//         {currentQuestionIndex > 0 && <button onClick={handleBack} className="bg-gray-300 hover:bg-gray-400 text-black py-2 px-4 rounded">Back</button>}
//         {currentQuestionIndex < questions.length - 1 && <button onClick={handleNext} className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded">Next</button>}
//         {currentQuestionIndex === questions.length - 1 && <button className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded">Submit</button>}
//       </div>
//     </div>
//   );
// };

// export default SurveyPage;
//--------------------------------------------------
//--------------------------------------------------
//--------------------------------------------------

'use client';

import { useState } from 'react';

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
    UOM: null,
  });

  type AreaNames = 'UrbanWSS' | 'USSM' | 'RWSSM' | 'RSSM' | 'FM' | 'RF' | 'UOM';

  const areaFullNames: Record<AreaNames, string> = {
    UrbanWSS: "Urban Water Supply Sector Monitoring",
    USSM: "Urban Sanitation Sector Monitoring",
    RWSSM: "Rural Water Supply Sector Monitoring",
    RSSM: "Rural Sanitation Sector Monitoring",
    FM: "Finance",
    RF: "Regulation",
    UOM: "Utility Operations",
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

  const [activeAreas, setActiveAreas] = useState<AreaNames[]>(Object.keys(responses) as AreaNames[]);
  const [finalAreas1aiii, setFinalAreas1aiii] = useState<AreaNames[]>([]);

  const questions = [
    { id: '1', text: '1.0: Does your organisation collect primary data?' },
    { id: '1a', text: '1.a: Is your organisation aware of national guidelines that specify how data should be collected?' },
    { id: '1ai', text: '1.a.(i): Does your organisation collect data in adherence to these national guidelines?' },
    { id: '1aii', text: '1.a.(ii): How effective are the guidelines in terms of their development, adoption, and suitability?' },
    { id: '1aiii', text: '1.a.(iii): Why are guidelines for data collection not fully effective in terms of their development, adoption, and suitability?' },
    { id: '1aiv', text: '1.a.(iv): Why does your organisation not collect data in adherence to these guidelines?' }
  ];

  const toggleDarkMode = () => {
    setIsDarkMode((prevMode) => !prevMode);
  };

  const handleYesNoChange = (area: string, value: boolean) => {
    setResponses((prevResponses) => ({
      ...prevResponses,
      [area]: value,
    }));
    setError(null);
  };

  const handleFiveOptionChange = (area: string, value: string) => {
    setResponses((prevResponses) => ({
      ...prevResponses,
      [area]: value,
    }));
    setError(null);
  };

  const validateAllFieldsSelected = (areas: AreaNames[]) => {
    return areas.every((area) => responses[area] !== null);
  };

  const getYesAreas = () => activeAreas.filter((area) => responses[area as keyof typeof responses] === true);
  const getNoAreas = () => activeAreas.filter((area) => responses[area as keyof typeof responses] === false);
  const getOptions1to4 = () => getYesAreas().filter((area) => responses[area as keyof typeof responses] !== '5');

  const handleNext = () => {
    const currentQuestion = questions[currentQuestionIndex];
  
    // Specific validation for question '1'
    if (currentQuestion.id === '1') {
      // Check all areas in `responses` to ensure no null values
      const allAreasSelected = Object.keys(responses).every(
        (area) => responses[area as AreaNames] !== null
      );
  
      if (!allAreasSelected) {
        setError('Please select Yes or No for all areas.');
        return;
      }
      setActiveAreas(Object.keys(responses) as AreaNames[]); // Initialize active areas for subsequent questions
    }
  
    // Proceed with other questions using `activeAreas` as initially coded
    else if (currentQuestion.id === '1a') {
      if (!validateAllFieldsSelected(activeAreas)) {
        setError('Please select Yes or No for all areas.');
        return;
      }
      setActiveAreas(getYesAreas());
    } else if (currentQuestion.id === '1ai') {
      if (!validateAllFieldsSelected(activeAreas)) {
        setError('Please select Yes or No for all areas.');
        return;
      }
    } else if (currentQuestion.id === '1aii') {
      const areasFor1aiii = getOptions1to4();
      if (!validateAllFieldsSelected(getYesAreas())) {
        setError('Please select an option for all areas.');
        return;
      }
      setFinalAreas1aiii(areasFor1aiii);
    } else if (currentQuestion.id === '1aiii' && !validateAllFieldsSelected(finalAreas1aiii)) {
      setError('Please select an option for all areas.');
      return;
    } else if (currentQuestion.id === '1aiv' && !validateAllFieldsSelected(getNoAreas())) {
      setError('Please select an option for all areas.');
      return;
    }
  
    // Move to the next question if no validation errors
    setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
    setError(null);
  };
  

  const handleBack = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prevIndex) => prevIndex - 1);
      setError(null);
    }
  };

  const renderQuestion = () => {
    const currentQuestion = questions[currentQuestionIndex];

    const renderYesNoRadios = (areas: AreaNames[]) => (
      areas.map((area) => (
        <div key={area} className="flex items-center mb-2">
          <label className="text-blue-800 mr-2">{areaFullNames[area]}</label>
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
      ))
    );

    const renderFiveOptionRadios = (areas: AreaNames[], options: string[]) => (
      areas.map((area) => (
        <div key={area} className="flex flex-col mb-4">
          <label className="text-blue-800 mb-2">{areaFullNames[area]}</label>
          {options.map((option, index) => (
            <div key={`${area}-${index}`} className="text-red-500 flex items-center mb-1">
              <input
                type="radio"
                name={`multi-${area}`}
                value={String(index + 1)}
                onChange={() => handleFiveOptionChange(area, String(index + 1))}
                className="mr-1"
              />
              {option}
            </div>
          ))}
        </div>
      ))
    );

    switch (currentQuestion.id) {
      case '1':
        return <div className="p-4 border rounded shadow"><h3 className="text-blue-500 font-bold mb-4">{currentQuestion.text}</h3>{renderYesNoRadios(Object.keys(responses) as AreaNames[])}</div>;
      case '1a':
        return <div className="p-4 border rounded shadow"><h3 className="text-blue-500 font-bold mb-4">{currentQuestion.text}</h3>{renderYesNoRadios(activeAreas)}</div>;
      case '1ai':
        return <div className="p-4 border rounded shadow"><h3 className="text-blue-500 font-bold mb-4">{currentQuestion.text}</h3>{renderYesNoRadios(activeAreas)}</div>;
      case '1aii':
        return <div className="p-4 border rounded shadow"><h3 className="text-blue-500 font-bold mb-4">{currentQuestion.text}</h3>{renderFiveOptionRadios(getYesAreas(), optionsForQuestion1aii)}</div>;
      case '1aiii':
        return <div className="p-4 border rounded shadow"><h3 className="text-blue-500 font-bold mb-4">{currentQuestion.text}</h3>{renderFiveOptionRadios(finalAreas1aiii, optionsForQuestion1aiii)}</div>;
      case '1aiv':
        return <div className="p-4 border rounded shadow"><h3 className="text-blue-500 font-bold mb-4">{currentQuestion.text}</h3>{renderFiveOptionRadios(getNoAreas(), optionsForQuestion1aiii)}</div>;
      default:
        return null;
    }
  };

  return (
    <div className={`p-4 ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-black'}`}>
      <button onClick={toggleDarkMode} className="mb-4 px-4 py-2 bg-blue-500 text-white rounded">{isDarkMode ? 'Light Mode' : 'Dark Mode'}</button>
      {renderQuestion()}
      {error && <div className="text-red-500 mt-4">{error}</div>}
      <div className="mt-4 flex justify-between">
        <button onClick={handleBack} className="px-4 py-2 bg-gray-300 rounded">Back</button>
        <button onClick={handleNext} className="px-4 py-2 bg-blue-500 text-white rounded">Next</button>
      </div>
    </div>
  );
};

export default SurveyPage;
