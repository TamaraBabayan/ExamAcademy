import React from 'react';
import "./PassedTests.css";
import tests from "../../jsonDB/tests.json"

const PassedTests = React.forwardRef((props, ref) => {
	return (
		<div id="passedTests" className="passedTestsContainer">
			<h1>Passed Tests</h1>
			<ul>
			{tests.map(test => (
          <li key={test.id}>{test.name}</li>
        ))}
			</ul>
		</div>
	)
	})


export default PassedTests;