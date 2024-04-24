import "./CreateTest.css";
import { Link } from 'react-router-dom';
import React from 'react';

function CreateTest({teacherId}) {
  return (
    <div id="createTest" className="createTestContainer">
      <p>If you want to create a test please push the button and select the test configuration you want.</p>
      <div>
        <Link to={`/test/creation/${teacherId}`}> 
          <button className="createTestBtn"> + Create Test Manualy</button> 
        </Link>
        <Link to={`/random/test/${teacherId}`}> 
          <button className="createRandomTestBtn"> + Create Random Test </button> 
        </Link>
      </div>
    </div>
  )
};

export default CreateTest;

