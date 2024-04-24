import { useNavigate } from "react-router-dom";
import "./SignUpAsTeacher.css";
import Validation from "./SignUpValidation.js";
import { useState } from "react";
import axios from "axios";

const PopupText = ({ text }) => {
  const [isOpen, setIsOpen] = useState(true);

  const togglePopup = () => {
    setIsOpen(!isOpen);
  };
  return (
    <div>
      {isOpen && (
        <div className="popup">
          <div className="popup-inner">
            <button onClick={togglePopup} className="close-btn">
              x
            </button>
            <p>{text}</p>
          </div>
        </div>
      )}
    </div>
  );
};

const moveToDb = async (teacherInfo) => {
  try {
    const response = await axios.post(
      "http://localhost:5087/save-teacher",
      teacherInfo
    );
    if (response.status === 200) {
      console.log("Data saved successfully:", response.data);
      return true;
    } else {
      console.error("Error saving data:", response.statusText);
      return false;
    }
  } catch (error) {
    console.error("Error saving data:", error);
    return false;
  }
};

function SignUpAsTeacher() {
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const [emailExists, setEmailExists] = useState(false);
  const [teacherInfo, setTeacherInfo] = useState({
    name: "",
    email: "",
    password: "",
    role: "teacher",
    organisation: "",
    specPasscode: "",
  });

  const handleInput = (event) => {
    const { name, value } = event.target;
    setTeacherInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const checkEmailExists = async (email) => {
    try {
      const response = await axios.get("http://localhost:5087/check-email", {
        params: {
          email: email,
        },
      });
      return response.data.exists;
    } catch (error) {
      console.error("Error checking email:", error);
      return false;
    }
  };

  const handleSubmitLogIn = async (event) => {
    event.preventDefault();
    const error = Validation(teacherInfo);
    setErrors(error);
    const allValuesEmpty = Object.values(error).every((value) => value === "");

    if (allValuesEmpty) {
      try {
        const emailExists = await checkEmailExists(teacherInfo.email);
        if (!emailExists) {
          navigate("/login");
          setEmailExists(false);
        } else {
          setEmailExists(true);
        }
      } catch (error) {
        console.error("Error checking email:", error);
      }
    }
  };

	const handleSignUp = async (event) => {
		event.preventDefault();
			const error = Validation(teacherInfo);
			setErrors(error);
			const allValuesEmpty = Object.values(error).every(value => value === '');
		
			if (allValuesEmpty) {
				try {
					const emailExists = await checkEmailExists(teacherInfo.email);
					if (!emailExists) {
						moveToDb(teacherInfo);
						navigate('/');
						setEmailExists(false);
					} else {
						setEmailExists(true);
					}
				} catch (error) {
					console.error('Error checking email:', error);
				}
			}
	};

  return (
    <div className="signUpAsTeacher">
      <div className="signUpContainer">
        <h1>Sign Up As Teacher</h1>
        <form action="" >
          <div className="mb-3">
            <label htmlFor="name">
              <strong>Name</strong>
            </label>
            <input
              type="text"
              placeholder="Enter Name"
              className="form-control rounded-0"
            ></input>
						{errors.name && <span className="text-danger">{errors.name}</span>}
          </div>
          {!emailExists 
            ? <>
            <input
              type="email"
              placeholder="Enter Email"
              onChange={handleInput}
              name="email"
							value={teacherInfo.email}
              className="form-control rounded-0"
            ></input>
            {errors.email && (
              <span className="text-danger">{errors.email}</span>
            )}
            </> : <>
            <input
              type="email"
              placeholder="Enter Email"
              onChange={handleInput}
              name="email"
							value={teacherInfo.email}
              className="form-control rounded-0"
            ></input>
            <PopupText text="This is some example text for the popup." />
            {errors.email && (
              <span className="text-danger">{errors.email}</span>
            )}
            </>}
          <div className="mb-3">
            <label htmlFor="name">
              <strong>Organisation</strong>
            </label>
            <input
              type="text"
              placeholder="Enter Organisation Name"
              className="form-control rounded-0"
            ></input>
						{errors.organisation && <span className="text-danger">{errors.organisation}</span>}
          </div>
          <div className="mb-3">
            <label htmlFor="password">
              <strong>Specific Passcode For Teachers</strong>
            </label>
            <input
              type="text"
              placeholder="Enter Passcode"
              className="form-control rounded-0"
            ></input>
						{errors.specPasscode && <span className="text-danger">{errors.specPasscode}</span>}
          </div>
          <div className="mb-3">
            <label htmlFor="password">
              <strong>Password</strong>
            </label>
            <input
              type="password"
              placeholder="Enter Password"
              className="form-control rounded-0"
            ></input>
						{errors.password && <span className="text-danger">{errors.password}</span>}
          </div>
          <button onClick={handleSignUp} className="signUpBtn">
            <strong>Sign up & Go to Main</strong>
          </button>
					<p></p>
            <button onClick={handleSubmitLogIn} className="loginBtn">Submit & Login</button>
        </form>
      </div>
    </div>
  );
}

export default SignUpAsTeacher;
