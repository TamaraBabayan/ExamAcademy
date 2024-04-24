import "./Header.css";
import { Link } from "react-router-dom";

function Header({
  scrollToAbout,
  scrollToHome,
  scrollToFooter
}) {
  return (
    <>
      <header>
        <a href="#home" className="headerTitle">
          ExamAcademy
        </a>
        <div className="navigationBarContainer">
          <a href="#home" className="homeBtn">
            Home
          </a>
          <a href="#about" className="aboutBtn">
            About
          </a>
          <a href="#footer" className="footerBtn">
            Footer
          </a>
          <div className="logSignContainer">
            <span className="loginbtnConteiner">
              <Link to="/login" >
                <button className="loginbtn">
                  Log In
                </button>
              </Link>
              {/* <div className="loginContent">
            <div onClick={logInclicked}>Login As Student</div>
            <div onClick={logInclicked}>Login As Teacher</div>
          </div> */}
            </span>
            <span className="signUpbtnConteiner">
              <button className="signUpbtn">Sign Up</button>
              <div className="signUpContent">
                <Link to='/signup/student'><button> SignUp As Student </button></Link>
                <Link to='/signup/teacher'><button> SignUp As Teacher </button></Link>
              </div>
            </span>
          </div>
        </div>
      </header>
    </>
  );
}

export default Header;
