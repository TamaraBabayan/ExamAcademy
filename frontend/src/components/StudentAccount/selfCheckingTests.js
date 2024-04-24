import React from 'react';
import "./SelfCheckingTests.css";
import tests from "../../jsonDB/tests.json"

const SelfCheckingTests = React.forwardRef((props, ref) => {
	return (
		<div id="selfCheckingTests" className="selfCheckingTestsContainer">
			<h1>Self-Checking Tests</h1>
			<ul>
			{tests.map(test => (
          <li key={test.id}>{test.name}</li>
        ))}
			</ul>
		</div>
	)
	})


export default SelfCheckingTests;