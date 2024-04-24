import React from 'react';
import "./YourTests.css";
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';


function YourTests({ teacherId }) {
  const [teacherTests, setTeacherTests] = useState([]);

  async function fetchTestsByTeacherId(teacherId) {
    try {
      const response = await axios.get(`http://localhost:5087/api/tests?teacherId=${teacherId}`);
      setTeacherTests(response.data); // Update teacherTests state with response data
    } catch (error) {
      console.error('Error fetching tests:', error);
      setTeacherTests([]); // Set teacherTests state to an empty array in case of error
    }
  }

  useEffect(() => {
    fetchTestsByTeacherId(teacherId); // Call fetchTestsByTeacherId when component is mounted
  }, []); // Empty dependency array ensures the effect is only run once

  const handleClick = (test) => {
    // Do something with the clicked test, e.g., navigate to a detail page
    console.log('Clicked test:', test);
  };
  

  console.log(teacherTests);
  return (
    // <div id="yourTests" className="yourTestsContainer">
    //   <h1>Your Tests</h1>
    //   <ul>
    //     {teacherTests.map(test => (
    //       <Link to="/" key={test._id}> 
    //       <li>{test.name} ... {test.subject} ... </li>
    //     </Link>
    //     ))}
    //   </ul>
    // </div>
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
                <td>{test.groups}</td> 
              </tr>
            ))}
          </tbody>
      </table>
    </div>
  );
}


export default YourTests;