import { useParams } from "react-router-dom";
import React, { useState, useEffect } from "react";
import axios from "axios";

function PassTest() {
  const testId = useParams();
  const [test, setTest] = useState(null);

  useEffect(() => {
    const fetchTest = async () => {
      try {
        const response = await axios.getget(
          `http://localhost:5087/api/testById?testId=${testId}`
        );
        setTest(response.data);
      } catch (error) {
        console.error("Error fetching test:", error);
      }
    };

    fetchTest();
  }, [testId]);

  return (
    <div className="formTitleContainer">
      <div>
        <input
          className="formName"
          type="text"
          placeholder="Test Name"
          value={test?.name}
          // onChange={handleInputChange}
        ></input>
      </div>
      <input
        className="formDescription"
        type="text"
        placeholder="Test Description..."
      ></input>
    </div>
  );
}

export default PassTest;
