import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Validation from "./LogInValidation";
import HomeTeacher from "../TeacherAccount/HomeTeacher";
import HomeStudent from "../StudentAccount/HomeStudent"
import './LogInPage.css';
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


const loginUser = async (loginInfo) => {
  try {
    const response = await axios.post('http://localhost:5087/api/login', loginInfo);
    console.log('#1 response data:', response.data);
    return response.data; 
  } catch (error) {
    console.error('Error logging in:', error);
    throw error;
  }
};

// const checkLoginInfo = async (loginInfo) => {
//   try {
//     const response = await axios.post('http://localhost:5087/check-loginInfo', loginInfo);
//     if (response.status === 200) {
//       loginUser(loginInfo)
//         .then(userData => {
//           console.log('#2 User data:', userData);
//           return { success: true, message: response.data.message, userData: userData }
//         })
//         .catch(error => {
//         });
//     } else {
//       return { success: false, message: 'Error checking login information', userData: undefined };
//     }
//   } catch (error) {
//     console.error('Error checking login information:', error);
//     return { success: false, message: 'Error checking login information', userData: undefined };
//   }
// };

const checkLoginInfo = async (loginInfo) => {
  try {
    const response = await axios.post('http://localhost:5087/check-loginInfo', loginInfo);
    if (response.status === 200) {
      const userData = await loginUser(loginInfo);
      console.log('#2 User data:', userData);
      return { success: true, message: response.data.message, userData: userData };
    } else {
      return { success: false, message: 'Error checking login information', userData: undefined};
    }
  } catch (error) {
    console.error('Error checking login information:', error);
    return { success: false, message: 'Error checking login information', userData: undefined};
  }
};

function LogInPage() {
  const [correctLogin, setCorrectLogin] = useState(false)
  const navigate = useNavigate();
  const [goToPage, setGoToPage] = useState(false);
  const [loginInfo, setLoginInfo] = useState({
    email: "",
    password: "",
    specPasscode: "",
  });
  const [errors, setErrors] = useState({});
  const [userInfo, setUserInfo] = useState("")

  const handleInput = (event) => {
    const { name, value } = event.target;
    setLoginInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleLogin = async (event) => {
    event.preventDefault();
		const error = Validation(loginInfo);
		setErrors(error);
		const allValuesEmpty = Object.values(error).every(value => value === '');
    if (allValuesEmpty) {
      try {
        const accountExists = await checkLoginInfo(loginInfo);
        if (accountExists.success) {
          console.log('#3 UserData:', accountExists.userData);
          setUserInfo( accountExists.userData)
          setGoToPage(true)
          setCorrectLogin(false)
          if (accountExists.userData.role === 'student') {
            navigate(`/home/student/${accountExists.userData._id}`);
          } else {
            navigate(`/home/teacher/${accountExists.userData._id}`);
          }
        } else {
          setGoToPage(false)
          setCorrectLogin(true)
        }
      } catch (error) {
        console.error('Error checking login info:', error);
      }
    }
  };
  return (
    <>
      {/* {
        goToPage ? 
        (
          // userInfo.role === "student" ? 
          // <HomeStudent studentId={userInfo.id} /> : 
          <HomeTeacher/>
        ) 
        : 
        ( */}
          <div className="logInPage">
          <div className="logInContainer">
            <h1>LogIn</h1>
            <form action="">
            <label htmlFor="email">
              <strong>Email</strong>
            </label>
            {!correctLogin
                ? <>
                <input
                  type="email"
                  placeholder="Enter Email"
                  onChange={handleInput}
                  name="email"
                  value={loginInfo.email}
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
                  value={loginInfo.email}
                  className="form-control rounded-0"
                ></input>
                <PopupText text="Incorrect Email or Password! Please, try again." />
                {errors.email && (
                  <span className="text-danger">{errors.email}</span>
                )}
                </>}
              <div className="mb-3">
                <label htmlFor="password">
                  <strong>Password</strong>
                </label>
                <input
                  type="password"
                  placeholder="Enter Password"
                  name="password"
                  onChange={handleInput}
                  value={loginInfo.password}
                  className="form-control rounded-0"
                ></input>
                {errors.password && (
                  <span className="text-danger">{errors.password}</span>
                )}
              </div>
              <div className="mb-3">
                <label htmlFor="password">
                  <strong>Specific Passcode</strong>
                </label>
                <input
                  type="text"
                  placeholder="Enter Passcode"
                  name="specPasscode"
                  onChange={handleInput}
                  value={loginInfo.specPasscode}
                  className="form-control rounded-0"
                ></input>
                {errors.specPasscode && (
                  <span className="text-danger">{errors.specPasscode}</span>
                )}
              </div>
              <button onClick={handleLogin} className="logInBtn">
                <strong>Login</strong>
              </button>
              <p></p> 
              <Link to='signup/teacher'>
                <button className="createAccountBtn">Create Account</button>
              </Link>
            </form>
          </div>
          </div>
        {/* ) */}
      {/* } */}
    </>
  );
}

export default LogInPage;
