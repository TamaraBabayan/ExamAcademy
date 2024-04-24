import React from "react";
import "./YourTests.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function YourTests({ teacherId }) {
  const [teacherTests, setTeacherTests] = useState([]);

  const [grouptTestId, setGroupTestId] = useState(-1);
  const [isShowedGroupes, setIsShowedGroups] = useState(false);
  const [groupNames, setGroupNames] = useState([]);
  const [selectedGroupes, setSelectedGroups] = useState([]);


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
    setGroupNames([
      "group 1",
      "group 2",
      "group 3",
    ]);
  }, []);

  // const handleClick = (test) => {
  //   console.log("Clicked test:", test);
  // };

  const handleAddGroup = (testId, testIndex) => {
    setGroupTestId(testId);

    setSelectedGroups(prev => [...prev, groupNames[testIndex]]);
    setGroupNames(prev => prev.filter((_, i) => i !== testIndex));
  };

  const removeGroupNameByIndex = (testIndex) => {
    setGroupNames(prev => [...prev, selectedGroupes[testIndex]]);
    setSelectedGroups(prev => prev.filter((_, i) => i !== testIndex));
  }

  const groupsDoneButton = () => {
    setIsShowedGroups(false);
    // TODO: uxarkel server: selectedGroupes <-- Array, grouptTestId <-- Number
  }

  console.log(teacherTests);
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
          {teacherTests.map((test) => (
            <tr key={test._id}>
              <td>
                <Link to={`/pass/test/${test._id}`}>{test.name}</Link>
              </td>
              <td>{test.subject}</td>
              <td>
                {test.groups}
                {isShowedGroupes ? (
                  <div>
                    {selectedGroupes.map((groupname, i) => (
                      <div key={i} className="testTableButton">
                        <p>{groupname}</p>
                        <button onClick={() => removeGroupNameByIndex(i)}>x</button>
                      </div>
                    ))}

                    {groupNames.map((groupName, i) => (
                      <button key={i} onClick={() => handleAddGroup(test.id, i)}>
                        {groupName}
                      </button>
                    ))}

                    <button onClick={groupsDoneButton}>done</button>
                  </div>
                ) : (
                  <>
                    {selectedGroupes.map((groupname, i) => (
                      <div key={i}>
                        <p>{groupname}</p>
                      </div>
                    ))}
                    <button
                      onClick={() => {
                        setIsShowedGroups(true);
                      }}
                    >
                      <FontAwesomeIcon icon={faPlus}></FontAwesomeIcon>
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default YourTests;
