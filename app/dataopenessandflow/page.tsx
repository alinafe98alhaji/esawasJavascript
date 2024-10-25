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
--------------------------------------------------------------------------------------
----i made this to distinguish between pieces of code as i keep adding functionality--
--------------------------------------------------------------------------------------
--------------------------------------------------------------------------------------
*/

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

  const [yesAreas1aii, setYesAreas1aii] = useState<string[]>([]); // Yes areas for 1a(iii)
  const [finalAreas1aiii, setFinalAreas1aiii] = useState<string[]>([]); // Areas proceeding to 1a(iii)

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

  // Get areas that selected options 1-4 (for 1.a(ii) and 1.a(iii))
  const getOptions1to4 = () => yesAreas1ai.filter((area) => {
    const value = responses[area as keyof typeof responses];
    return value !== null && value !== '5';
  });

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
    } else if (currentQuestion.id === '1aii') {
      // Validate multi-option fields for 1.a(ii)
      if (!validateAllFieldsSelected(yesAreas1ai)) {
        setError('Please select an option for all areas.');
        return; // Stop here if validation fails
      }
      const areasFor1aiii = getOptions1to4(); // Only areas with option 1-4 proceed
      setFinalAreas1aiii(areasFor1aiii); // Set final areas for 1.a(iii)
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
        return <div><h3>{currentQuestion.text}</h3>{renderFiveOptionRadios(finalAreas1aiii)}</div>; // Filtered areas
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
