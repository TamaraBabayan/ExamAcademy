import {useParams} from 'react-router-dom';

function PassTest() {
	const testid = useParams();
	return (
		<div className="formTitleContainer">
          <div>
            <input
              className="formName"
              type="text"
              placeholder="Test Name"
              // value={testName}
              // onChange={handleInputChange} 
            ></input>
          </div>
          <input
            className="formDescription"
            type="text"
            placeholder="Test Description..."
          ></input>
    </div>
	)
}

export default PassTest;