import "./RandomTestGenerator.css";
import { useState} from "react";
import { useParams } from 'react-router-dom';
import ValidRandomTest from "./ValidRandomTest.js";
import CreateRandomTest from "./CreateRandomTest.js";

// const getTotalCount = async () => {
//   try {
//     const response = await axios.get("http://localhost:5087/questions/count");
//     return response.data.totalCount;
//   } catch (error) {
//     console.error("Error fetching total count:", error);
//     return 0;
//   }
// };

function RandomTestGenerator() {
  const { teacherId } = useParams();
  const [errors, setErrors] = useState({});
  const [testInfo, setTestInfo] = useState({
    name: "",
    subject: "",
    numberOfQuestions: "",
    point: -1,
    duration: -1,
    date: "",
    teacherId: teacherId,
    questions: [],
  });
  const handleInput = (event) => {
    const { name, value } = event.target;
    setTestInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const [viewTestExample, setViewTestExample] = useState(false);

  const ViewTest = (event) => {
    event.preventDefault();
    const error = ValidRandomTest(testInfo);
    setErrors(error);
    const allErrorsEmpty = Object.values(error).every((value) => value === "");
    if (allErrorsEmpty) {
      setViewTestExample(true);
    }
  };

  return (
    <div>
      {viewTestExample ? (
        <CreateRandomTest
          testInfo={testInfo}
          setTestInfo={setTestInfo}
        ></CreateRandomTest>
      ) : (
        <div className="randomTestContainer">
          <div className="formContainer">
            <h1>Create Test</h1>
            <p>With Random Questions</p>
            <form action="">
              <div className="mb-3">
                <label>
                  <h6>Test Name</h6>
                </label>
                <input
                  type="text"
                  placeholder="Enter Test Name"
                  name="name"
                  onChange={handleInput}
                  // value={name}
                  className="form-control"
                ></input>
                {errors.name && (
                  <span className="text-danger">{errors.name}</span>
                )}
              </div>
              <div className="mb-3">
                <label>
                  <h6>Test Subject</h6>
                </label>
                <select
                  onChange={handleInput}
                  className="selectSubject"
                  // value={"subject"}
                  name="subject"
                  id="subject"
                >
                  <option value="C">C</option>
                  <option value="Math">Math</option>
                  <option value="English">English</option>
                </select>
                {errors.subject && (
                  <span className="text-danger">{errors.subject}</span>
                )}
              </div>
              <div className="mb-3">
                <label>
                  <h6>Number of Questions</h6>
                </label>
                <input
                  type="number"
                  placeholder="Enter Number of Questions"
                  name="numberOfQuestions"
                  onChange={handleInput}
                  // value={"number"}
                  className="form-control"
                ></input>
                {errors.numberOfQuestions && (
                  <span className="text-danger">
                    {errors.numberOfQuestions}
                  </span>
                )}
              </div>
              <div className="mb-3">
                <label>
                  <h6>Point for Each Question</h6>
                </label>
                <input
                  type="number"
                  placeholder="Enter Point for Each Question"
                  name="point"
                  onChange={handleInput}
                  // value={"point"}
                  className="form-control"
                ></input>
                {errors.point && (
                  <span className="text-danger">{errors.point}</span>
                )}
              </div>
              <div className="mb-3">
                <label>
                  <h6>Test Duration (with minutes)</h6>
                </label>
                <input
                  type="number"
                  placeholder="Enter Test Duration"
                  name="duration"
                  onChange={handleInput}
                  // value={"number"}
                  className="form-control"
                ></input>
                {errors.duration && (
                  <span className="text-danger">{errors.duration}</span>
                )}
              </div>
              <div className="mb-3">
                <label htmlFor="password">
                  <h6>Test Date (day, time)</h6>
                </label>
                <input
                  type="datetime-local"
                  placeholder="Enter Test Date"
                  name="date"
                  onChange={handleInput}
                  // value={"date"}
                  className="form-control"
                ></input>
                {errors.date && (
                  <span className="text-danger">{errors.date}</span>
                )}
              </div>
              <button className="ViewBtn" onClick={ViewTest}>
                <strong>View Test</strong>
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default RandomTestGenerator;
