import React from "react";
import "./YourTests.css";
import { useEffect, useState } from "react";
import axios from "axios";
import Test from "./Test";

function YourTests({ teacherId }) {
  const [teacherTests, setTeacherTests] = useState([]);
 
  const [groupNames, setGroupNames] = useState([]);

  async function fetchTestsByTeacherId(teacherId) {
    try {
      const response = await axios.get(
        `http://localhost:5087/api/tests?teacherId=${teacherId}`
      );
      setTeacherTests(response.data);
    } catch (error) {
      console.error("Error fetching tests:", error);
      setTeacherTests([]);
    }
  }

  useEffect(() => {
    fetchTestsByTeacherId(teacherId);

    // yani fetch arinq grouperi cucaky
    // TODO: zapros aneluc set ara sran grouperi anunnery: (setGroupNames(array))
    setGroupNames(["group 1", "group 2", "group 3"]);
  }, []);

  // const handleClick = (test) => {
  //   console.log("Clicked test:", test);
  // };

  return (
    <div id="yourTests" className="yourTestsContainer">
      <h1>Your Tests</h1>
      <br></br>
      <table className="testsTable">
        <thead>
          <tr>
            <th>Test Name</th>
            <th>Test Subject</th>
            <th>Groups To</th>
          </tr>
        </thead>
        <tbody>
          {teacherTests.map((test, i) => (
            <Test 
              key={i}
              groupNames={groupNames}
              setGroupNames={setGroupNames}
              test={test}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default YourTests;
