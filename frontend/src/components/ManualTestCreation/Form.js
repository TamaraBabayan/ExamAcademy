import React, { useState } from "react";
import { useParams } from 'react-router-dom';
import "./Form.css";
import {
  faPlus,
  faToggleOn,
  faToggleOff,
  faTrashAlt,
  faCheck,
  faEye,
  faGear,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// function QuestionAnswerConatiner(field, formContent, setFormContent) {
//   const [textField, setTextField] = useState("");
//   const addFieldOption = (fieldName, option) => {
//     const formFields = [...formContent];
//     const fieldIndex = formFields.findIndex((f) => f.name == fieldName);
//     if (option && option != "") {
//       formFields[fieldIndex].list.push(option);
//       setFormContent(formFields);
//       setTextField("");
//     }
//   };

//   return (
//     <div className="questionTextContainer">
//                 {field.question_type == "short_answer" && (
//                   <input
//                     type="text"
//                     className="questionType"
//                     placeholder={field.label}
//                   ></input>
//                 )}
//                 {field.question_type == "paragraph" && (
//                   <textarea
//                     rows={4}
//                     className="questionType"
//                     placeholder={field.label}
//                   ></textarea>
//                 )}
//                 {field.question_type == "multichoice" && (
//                   <div className="questionTypeSelection">
//                     {field.list.map((item) => (
//                       <label key={item} className="radioLabel">
//                         <input type="radio" name="q1" value={item} />
//                         <span className="radioText">{item}</span>
//                       </label>
//                     ))}
//                     <div className="addOptionContainer">
//                       <input
//                         type="text"
//                         onChange={(e) => setTextField(e.target.value)}
//                         value={textField}
//                         placeholder="Add an option"
//                         className="addOptionInput"
//                       ></input>
//                       <button
//                         className="addOptionBtn"
//                         onClick={() => addFieldOption(field.name, textField)}
//                       >
//                         Add
//                       </button>
//                     </div>
//                   </div>
//                 )}
//               </div>
//   )
// }

function FormTitle() {
  const [testName, setTestName] = useState('');
  const handleInputChange = (event) => {
    setTestName(event.target.value);
  };
  return (
    <div className="formTitleContainer">
          <div>
            <input
              className="formName"
              type="text"
              placeholder="Test Name"
              value={testName}
              onChange={handleInputChange} 
            ></input>
          </div>
          <input
            className="formDescription"
            type="text"
            placeholder="Test Description..."
          ></input>
        </div>
  )
}

// function BottomPartOfField(formContent, setFormContent, i) {
//   const [isToggled, setIsToggled] = useState(false);
//   const [isRequired, setIsRequired] = useState(false);
//   const [correctAnswer, setCorrectAnswer] = useState(false);

//   const handleChange = () => {
//     setIsToggled((IsToggled) => !IsToggled);
//     setIsRequired(!isRequired);
//   };
//   return (
//     <div className="bottomPartOfField">
//                 <div className="requiredBtn">
//                   <button
//                     onClick={handleChange}
//                     className={`toggle-button ${isToggled ? "on" : "off"}`}
//                   >
//                     {isToggled ? (
//                       <FontAwesomeIcon
//                         icon={faToggleOn}
//                         size="2x"
//                         color="#04519E"
//                       />
//                     ) : (
//                       <FontAwesomeIcon
//                         icon={faToggleOff}
//                         size="2x"
//                         color="#04519E"
//                       />
//                     )}
//                   </button>
//                   <p>Required*</p>
//                 </div>
//                 {!correctAnswer ? 
//                 <div> 
//                   <FontAwesomeIcon icon={faCheck} className="checkIcon"/> 
//                   <button  className="markCorrectAnswer" onClick={()=>{setCorrectAnswer(true)}}>Mark Correct Answer</button>
//                 </div> : 
//                 <div>
//                   <input className="inputCorrectAnswer" placeholder="Write Correct Answer"></input> 
//                   <button onClick={()=>{setCorrectAnswer(false)}} className="submitCorrectAnswer">Submit</button> 
//                 </div>
//                 }
//               </div> 
//   )
// }

// function SideBar(formContent, setFormContent, i) {
  // const removeQuestion = (id) => {
  //   setFormContent(formContent.filter((item, i) => i !== id));
  // };
  
  // const addQuestion = () => {
  //   const field = {
  //     id: `${formContent.length}`,
  //     name: `question_${formContent.length}`,
  //     label: "Untitled question",
  //     question_type: "short_answer",
  //     list: [],
  //   };
  //   setFormContent([...formContent, field]);
  // };
//   return (
//     <div className="sideBtnContainer">
//               <button onClick={() => addQuestion(i)} className="plusBtn">
//                 <FontAwesomeIcon icon={faPlus} />
//               </button>
//               <button onClick={() => removeQuestion(i)} className="garbageBtn">
//                 <FontAwesomeIcon icon={faTrashAlt} />
//               </button>
//     </div>
//   )
// }

// function FormContent() {
//   let i = 0;
//   const [testContent, setTestContent] = useState([]);

//   // useEffect(() => {
//   //   const fetchTestContent = async () => {
//   //     try {
//   //       const response = await fetch(`test${i}.json`);
//   //       i += 1;
//   //       const data = await response.json();
//   //       setTestContent(data);
//   //     } catch (error) {
//   //       console.error('Error fetching JSON data:', error);
//   //     }
//   //   };
//   //   fetchTestContent();
//   // }, []);

//   const addNewTest = (id, name, question_count, ) => {
//     const newObj = { id: 123, name: 'New Object' };
//     const updatedData = [...testContent, newObj];
//     setTestContent(updatedData);
//   };

//   const [formContent, setFormContent] = useState([
//     {
//       id: 0,
//       name: "0",
//       label: "Untitled Question",
//       question_type: "short_answer",
//       list: [],
//     },
//   ]);
//   const [onEdit, setOnEdit] = useState(false);
//   const [editedField, setEditedField] = useState("");

//   const editField = (fieldName, fieldLabel) => {
//     const formFields = [...formContent];
//     const fieldIndex = formFields.findIndex((f) => f.name == fieldName);
//     if (fieldIndex > -1) {
//       formFields[fieldIndex].label = fieldLabel;
//       setFormContent(formFields);
//     }
//   };

//   const editFieldType = (fieldName, fieldLabel) => {
//     const formFields = [...formContent];
//     const fieldIndex = formFields.findIndex((f) => f.name == fieldName);
//     if (fieldIndex > -1) {
//       formFields[fieldIndex].question_type = fieldLabel;
//       setFormContent(formFields);
//     }
//   };

//   return (
//     <>
//       {formContent.map((field, i) => {
//         return (
//           <div key={i} className="formContentt">
//             <div className="oneQuestionContainer">
//               <div className="newQuestionContainer">
//                 <div key={field.name} className="fieldName">
//                   {onEdit && editedField === field.name ? (
//                     <input
//                       type="text"
//                       className="questionText"
//                       value={field.label}
//                       onChange={(e) => editField(field.name, e.target.value)}
//                       onBlur={() => {
//                         setOnEdit(false);
//                         setEditedField("");
//                       }}
//                     ></input>
//                   ) : (
//                     <label
//                       onClick={() => {
//                         setOnEdit(true);
//                         setEditedField(field.name);
//                       }}
//                     >
//                       {field.label}
//                     </label>
//                   )}
//                 </div>
//                 <div className="q">
//                   <select
//                     className="questionTypeSelector"
//                     onChange={(e) => editFieldType(field.name, e.target.value)}
//                   >
//                     <option value="short_answer">Short Answer</option>
//                     <option value="paragraph">Paragraph</option>
//                     <option value="multichoice">Multichoice</option>
//                   </select>
//                 </div>
//               </div>
//               <QuestionAnswerConatiner field={field} formContent={formContent} setFormContent={setFormContent}/>
//               <BottomPartOfField formContent={formContent} setFormContent={setFormContent} i={i}/>
//             </div>
//             <SideBar formContent={formContent} setFormContent={setFormContent} i={i}/>
//           </div>
//         );
//       })}
//     </>  
//   )
// }

function FormContent() {
  const [isToggled, setIsToggled] = useState(false);
  const [isRequired, setIsRequired] = useState(false);
  const [correctAnswer, setCorrectAnswer] = useState(false);
  const [option, setOption] = useState("");
  const addFieldOption = (fieldName, option) => {
    const formFields = [...formContent];
    const fieldIndex = formFields.findIndex((f) => f.name == fieldName);
    if (option && option != "") {
      formFields[fieldIndex].list.push(option);
      setFormContent(formFields);
      setOption("");
    }
  };

  const handleChange = () => {
    setIsToggled((IsToggled) => !IsToggled);
    setIsRequired(!isRequired);
  };
  let i = 0;

  const [testContent, setTestContent] = useState([]);

  const addNewTest = (id, name, question_count) => {
    const newObj = { id: 123, name: 'New Object' };
    const updatedData = [...testContent, newObj];
    setTestContent(updatedData);
  };

  const [formContent, setFormContent] = useState([
    {
      id: 0,
      name: "0",
      label: "Untitled Question",
      question_type: "short_answer",
      list: [],
    },
  ]);
  const [onEdit, setOnEdit] = useState(false);
  const [editedField, setEditedField] = useState("");

  const editField = (fieldName, fieldLabel) => {
    const formFields = [...formContent];
    const fieldIndex = formFields.findIndex((f) => f.name === fieldName);
    if (fieldIndex > -1) {
      formFields[fieldIndex].label = fieldLabel;
      setFormContent(formFields);
    }
  };

  const editFieldType = (fieldName, fieldLabel) => {
    const formFields = [...formContent];
    const fieldIndex = formFields.findIndex((f) => f.name === fieldName);
    if (fieldIndex > -1) {
      formFields[fieldIndex].question_type = fieldLabel;
      setFormContent(formFields);
    }
  };

  const removeQuestion = (id) => {
    setFormContent(formContent.filter((item, i) => i !== id));
  };
  
  const addQuestion = () => {
    const field = {
      id: `${formContent.length}`,
      name: `question_${formContent.length}`,
      label: "Untitled question",
      question_type: "short_answer",
      list: [],
    };
    setFormContent([...formContent, field]);
  };

  return (
    <>
      {formContent.map((field, i) => {
        return (
          <div key={i} className="formContentt">
            <div className="oneQuestionContainer">
              <div className="newQuestionContainer">
                <div key={field.name} className="fieldName">
                  {onEdit && editedField === field.name ? (
                    <input
                      type="text"
                      className="questionText"
                      value={field.label}
                      onChange={(e) => editField(field.name, e.target.value)}
                      onBlur={() => {
                        setOnEdit(false);
                        setEditedField("");
                      }}
                    ></input>
                  ) : (
                    <label
                      onClick={() => {
                        setOnEdit(true);
                        setEditedField(field.name);
                      }}
                    >
                      {field.label}
                    </label>
                  )}
                </div>
                <div className="q">
                  <select
                    className="questionTypeSelector"
                    onChange={(e) => editFieldType(field.name, e.target.value)}
                    value={field.name}
                  >
                    <option value="short_answer">Short Answer</option>
                    <option value="paragraph">Paragraph</option>
                    <option value="multichoice">Multichoice</option>
                  </select>
                </div>
              </div>
              <div className="questionTextContainer">
                {field.question_type == "short_answer" && (
                  <input
                    type="text"
                    className="questionType"
                    placeholder={field.label}
                  ></input>
                )}
                {field.question_type == "paragraph" && (
                  <textarea
                    rows={4}
                    className="questionType"
                    placeholder={field.label}
                  ></textarea>
                )}
                {field.question_type == "multichoice" && (
                  <div className="questionTypeSelection">
                    {field.list.map((item) => (
                      <label key={item} className="radioLabel">
                        <input type="radio" name="q1" value={item} />
                        <span className="radioText">{item}</span>
                      </label>
                    ))}
                    <div className="addOptionContainer">
                      <input
                        type="text"
                        onChange={(e) => setOption(e.target.value)}
                        value={option}
                        placeholder="Add an option"
                        className="addOptionInput"
                      ></input>
                      <button
                        className="addOptionBtn"
                        onClick={() => addFieldOption(field.name, option)}
                      >
                        Add
                      </button>
                    </div>
                  </div>
                )}
              </div>
              {/* <QuestionAnswerConatiner field={field} formContent={formContent} setFormContent={setFormContent}/> */}
              {/* <BottomPartOfField formContent={formContent} setFormContent={setFormContent} i={i}/> */}
              <div className="bottomPartOfField">
                <div className="requiredBtn">
                  <button
                    onClick={handleChange}
                    className={`toggle-button ${isToggled ? "on" : "off"}`}
                  >
                    {isToggled ? (
                      <FontAwesomeIcon
                        icon={faToggleOn}
                        size="2x"
                        color="#04519E"
                      />
                    ) : (
                      <FontAwesomeIcon
                        icon={faToggleOff}
                        size="2x"
                        color="#04519E"
                      />
                    )}
                  </button>
                  <p>Required*</p>
                </div>
                {!correctAnswer ? 
                <div> 
                  <FontAwesomeIcon icon={faCheck} className="checkIcon"/> 
                  <button  className="markCorrectAnswer" onClick={()=>{setCorrectAnswer(true)}}>Mark Correct Answer</button>
                </div> : 
                <div>
                  <input className="inputCorrectAnswer" placeholder="Write Correct Answer"></input> 
                  <button onClick={()=>{setCorrectAnswer(false)}} className="submitCorrectAnswer">Submit</button> 
                </div>
                }
              </div> 
            </div>
            <div className="sideBtnContainer">
              <button onClick={() => addQuestion(i)} className="plusBtn">
                 <FontAwesomeIcon icon={faPlus} />
               </button>
               <button onClick={() => removeQuestion(i)} className="garbageBtn">
                 <FontAwesomeIcon icon={faTrashAlt} />
               </button>
           </div>
          </div>
        );
      })}
      <div className="mainBtns">
        <FontAwesomeIcon cursor="pointer" color="#045194" size="2x" icon={faGear}></FontAwesomeIcon>
        <button className="saveTest">Submit and Save</button>
        <FontAwesomeIcon  cursor="pointer" color="#045194" size="2x" icon={faEye}></FontAwesomeIcon>
      </div>
    </>  
  )
}


const Form = () => {
  const { teacherId } = useParams();
  return (
    <div className="formPage">
      <div className="formPageContainer">
        <FormTitle />
      </div>
      <FormContent />
    </div>
  );
};

export default Form;
