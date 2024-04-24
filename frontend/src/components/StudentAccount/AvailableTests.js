import "./AvailableTests.css";
import tests from '../../jsonDB/tests.json';
import { Link }from 'react-router-dom';

function AvailableTests() {
	return (
			<div id="availableTests" className="availableTestsContainer">
				<h1>Available Tests</h1>
				<ul>
					{tests.map(test => (
						<Link to="/"><li key={test.id}>{test.name}</li></Link>
					))}
				</ul>
			</div>
	)
}

export default AvailableTests;