import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./CreateRandomTest.css";
import {
  faPlus,
  faTrashAlt,
  faCheck,
  faEye,
  faToggleOn,
  faToggleOff,
  faGear,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";

// const getTotalCount = async () => {
//   try {
//     const response = await axios.get("http://localhost:5087/questions/count");
//     return response.data.totalCount;
//   } catch (error) {
//     console.error("Error fetching total count:", error);
//     return 0;
//   }
// };

function ViewRandomTest({ testInfo, setTestInfo }) {
  const [randomQuestions, setRandomQuestions] = useState([]);
  const removeQuestion = (id) => {
    setRandomQuestions(randomQuestions.filter((item, i) => i !== id));
    testInfo.numberOfQuestions--;
  };

  const addQuestion = () => {
    const field = {
      id: `${randomQuestions.length}`,
      question: "Untitled Question",
      type: "short_answer",
      subject: "",
      correctAnswer: "",
      options: [
        {
          text: String,
          isCorrect: Boolean,
        },
      ],
    };
    testInfo.numberOfQuestions++;
    setRandomQuestions([...randomQuestions, field]);
  };

  const moveTestToDb = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5087/save-test",
        testInfo
      );
      if (response.status >= 200 && response.status < 300) {
        console.log("Data saved successfully:", response.data);
        return true;
      } else {
        console.error("Error saving data:", response);
        return false;
      }
    } catch (error) {
      console.error("Axios error:", error);
      return false;
    }
  };

  useEffect(() => {
    const fetchRandomQuestions = async () => {
      try {
        const totalCountResponse = await axios.get(
          "http://localhost:5087/questions/count"
        );
        const totalCount = totalCountResponse.data.totalCount;
        if (testInfo.numberOfQuestions > totalCount) {
          throw new Error(
            "Number of questions cannot be greater than total count"
          );
        }
        const randomQuestionsResponse = await axios.get(
          `http://localhost:5087/questions/random?count=${testInfo.numberOfQuestions}&subject=${testInfo.subject}`
        );

        setTestInfo((testInfo) => {
          const newTestInfo = { ...testInfo };
          newTestInfo.questions = [
            ...newTestInfo.questions,
            ...randomQuestionsResponse.data.randomQuestions,
          ];
          return newTestInfo;
        });
      } catch (error) {
        console.error("Error creating random test:", error);
      }
    };

    fetchRandomQuestions();
  }, [testInfo.numberOfQuestions, testInfo.subject]);

  const fields = Array.from({ length: 3 }, (_, index) => index);
  const [option, setOption] = useState("");

  return (
    <div className="testReview">
      {testInfo.questions.map((question, i) => {
        if (question.question == "Untitled Question") {
          return <FormContent></FormContent>;
        }
        return (
          <div key={i} className="viewFormContentt">
            <div className="viewOneQuestionContainer">
              <div className="viewNewQuestionContainer">
                <div key={i} className="fieldName">
                  <input
                    type="text"
                    className="questionText"
                    value={question.question}
                  ></input>
                </div>
                <div className="q">
                  <select className="questionTypeSelector">
                    <option value={question.type}>{question.type}</option>
                  </select>
                </div>
              </div>
              <div className="questionTextContainer">
                {question.type == "short_answer" && (
                  <input
                    type="text"
                    className="questionType"
                    placeholder={question.type}
                  ></input>
                )}
                {question.type == "paragraph" && (
                  <textarea
                    rows={4}
                    className="questionType"
                    placeholder={question.type}
                  ></textarea>
                )}
                {question.type == "multichoice" && (
                  <div className="questionTypeSelection">
                    {question.options.map((option) => (
                      <label key={option.text} className="radioLabel">
                        <input type="radio" name="q1" value={option.text} />
                        <span className="radioText">{option.text}</span>
                      </label>
                    ))}
                    <div className="addOptionContainer">
                      <input
                        type="text"
                        onChange={(e) => setOption(e.target.value)}
                        value={""}
                        placeholder="Add an option"
                        className="addOptionInput"
                      ></input>
                      <button
                        className="addOptionBtn"
                        // onClick={() => addFieldOption(field.name, option)}
                      >
                        Add
                      </button>
                    </div>
                  </div>
                )}
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
        <Link to={`/home/teacher/${testInfo.teacherId}`}>
          <button className="saveTest" onClick={moveTestToDb}>
            Submit and Save
          </button>
        </Link>
      </div>
    </div>
  );
}

function FormTitle({ testInfo }) {
  const [testName, setTestName] = useState("");
  const handleInputChange = (event) => {
    setTestName(event.target.value);
  };
  return (
    <div className="formTitleContainer">
      <label
        className="formName"
        type="text"
        value={testName}
        onChange={handleInputChange}
      >
        {testInfo.name}
      </label>
    </div>
  );
}

function CreateRandomTest({ testInfo, setTestInfo }) {
  useEffect(() => {
    setTestInfo(testInfo);
  }, []);
  return (
    <div className="formPage">
      <div className="formPageContainer">
        <FormTitle testInfo={testInfo} />
      </div>
      <ViewRandomTest testInfo={testInfo} setTestInfo={setTestInfo} />
    </div>
  );
}

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
    const newObj = { id: 123, name: "New Object" };
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
                {!correctAnswer ? (
                  <div>
                    <FontAwesomeIcon icon={faCheck} className="checkIcon" />
                    <button
                      className="markCorrectAnswer"
                      onClick={() => {
                        setCorrectAnswer(true);
                      }}
                    >
                      Mark Correct Answer
                    </button>
                  </div>
                ) : (
                  <div>
                    <input
                      className="inputCorrectAnswer"
                      placeholder="Write Correct Answer"
                    ></input>
                    <button
                      onClick={() => {
                        setCorrectAnswer(false);
                      }}
                      className="submitCorrectAnswer"
                    >
                      Submit
                    </button>
                  </div>
                )}
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
    </>
  );
}

export default CreateRandomTest;
