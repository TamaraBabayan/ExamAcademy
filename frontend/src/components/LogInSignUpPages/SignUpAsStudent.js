import {useNavigate } from "react-router-dom";
import "./SignUpAsStudent.css";
import Validation from "./SignUpValidation.js";
import { useState} from "react";
import axios from 'axios';

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
            <button onClick={togglePopup} className="close-btn">x</button>
            <p>{text}</p>
          </div>
        </div>
      )}
    </div>  
  );
};

const moveToDb = async (studentInfo) => {
  try {
    const response = await axios.post('http://localhost:5087/save-student', studentInfo);
    if (response.status === 200) {
      console.log('Data saved successfully:', response.data);
      return true; 
    } else {
      console.error('Error saving data:', response.statusText);
      return false;
    }
  } catch (error) {
    console.error('Error saving data:', error);
    return false; 
  }
};

function SignUpAsStudent() {
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const [emailExists, setEmailExists] = useState(false);
  const [studentInfo, setStudentInfo] = useState({
    name: "",
    email: "",
    password: "",
    role: "student",
    organisation: "",
    specPasscode: "",
  });

  const handleInput = (event) => {
    const { name, value } = event.target;
    setStudentInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const checkEmailExists = async (email) => {
    try {
      const response = await axios.get('http://localhost:5087/check-email', {
        params: {
          email: email
        }
      });
      return response.data.exists;
    } catch (error) {
      console.error('Error checking email:', error);
      return false;
    }
  };


  const handleSubmitLogIn = async (event) => {
    event.preventDefault();
    const error = Validation(studentInfo);
    setErrors(error);
    const allValuesEmpty = Object.values(error).every(value => value === '');
  
    if (allValuesEmpty) {
      try {
        const emailExists = await checkEmailExists(studentInfo.email);
        if (!emailExists) {
          navigate('/login');
          setEmailExists(false);
        } else {
          setEmailExists(true);
        }
      } catch (error) {
        console.error('Error checking email:', error);
      }
    }
  };  

const handleSignUp = async (event) => {
  event.preventDefault();
    const error = Validation(studentInfo);
    setErrors(error);
    const allValuesEmpty = Object.values(error).every(value => value === '');
  
    if (allValuesEmpty) {
      try {
        const emailExists = await checkEmailExists(studentInfo.email);
        if (!emailExists) {
          moveToDb(studentInfo);
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
    <div className="signUpAsStudent">
      <div className="signUpContainer">
        <h1>Sign Up As Student</h1>
        <form action="">
          <div className="mb-3">
            <label htmlFor="name">
              <strong>Name</strong>
            </label>
            <input
              type="text"
              placeholder="Enter Name"
              onChange={handleInput}
              name="name"
							value={studentInfo.name}
              className="form-control rounded-0"
            ></input>
            {errors.name && <span className="text-danger">{errors.name}</span>}
          </div>
          <div className="mb-3">
            <label htmlFor="email">
              <strong>Email</strong>
            </label>
            {!emailExists 
            ? <>
            <input
              type="email"
              placeholder="Enter Email"
              onChange={handleInput}
              name="email"
							value={studentInfo.email}
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
							value={studentInfo.email}
              className="form-control rounded-0"
            ></input>
            <PopupText text="This is some example text for the popup." />
            {errors.email && (
              <span className="text-danger">{errors.email}</span>
            )}
            </>}
          </div>
          <div className="mb-3">
            <label htmlFor="name">
              <strong>Organisation</strong>
            </label>
            <input
              type="text"
              placeholder="Enter Organisation Name"
              name="organisation"
              onChange={handleInput}
							value={studentInfo.organisation}
              className="form-control rounded-0"
            ></input>
            {errors.organisation && <span className="text-danger">{errors.organisation}</span>}
          </div>
          <div className="mb-3">
            <label htmlFor="password">
              <strong>Specific Passcode For Students</strong>
            </label>
            <input
              type="text"
              placeholder="Enter Passcode"
              name="specPasscode"
              onChange={handleInput}
							value={studentInfo.specPasscode}
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
              onChange={handleInput}
              name="password"
              value={studentInfo.password}
              className="form-control rounded-0"
            ></input>
          </div>
          {errors.password && (
            <span className="text-danger">{errors.password}</span>
          )}
            <button onClick={handleSignUp} className="signUpBtns">
              <strong>Sign up & Go to Main</strong>
            </button>
            <p></p>
            <button onClick={handleSubmitLogIn} className="loginBtns">Submit & Login</button>
        </form>
      </div>
    </div>
  );
}

export default SignUpAsStudent;
