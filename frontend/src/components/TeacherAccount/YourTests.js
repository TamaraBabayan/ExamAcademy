import React from 'react';
import "./YourTests.css";
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { faPlus,} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


function YourTests({ teacherId }) {
  const [teacherTests, setTeacherTests] = useState([]);

  async function fetchTestsByTeacherId(teacherId) {
    try {
      const response = await axios.get(`http://localhost:5087/api/tests?teacherId=${teacherId}`);
      setTeacherTests(response.data); 
    } catch (error) {
      console.error('Error fetching tests:', error);
      setTeacherTests([]); 
    }
  }

  useEffect(() => {
    fetchTestsByTeacherId(teacherId); 
  }, []); 

  const handleClick = (test) => {
    console.log('Clicked test:', test);
  };


  console.log(teacherTests);
  return (
    <div id="yourTests" className="yourTestsContainer">
      <h1>Your Tests</h1>
      <br></br>
      <table className='testsTable'>
        <thead>
          <tr>
            <th>Test Name</th>
            <th>Test Subject</th>
            <th>Groups To</th>
          </tr>
        </thead>
          <tbody>
            {teacherTests.map(test => (
              <tr key={test._id} onClick={() => handleClick(test)}>
                <td>{test.name}</td>
                <td>{test.subject}</td>
                <td>{test.groups}
                <FontAwesomeIcon icon={faPlus} 
                // onClick={handleAddGroup(test._id)
                >
                </FontAwesomeIcon>
                </td> 
              </tr>
            ))}
          </tbody>
      </table>
    </div>
  );
}


export default YourTests;