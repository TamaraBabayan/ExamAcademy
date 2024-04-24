import "./HeaderStudent.css";
import { useState, useEffect } from "react";
import profilePicture from "../../images/userr.png";
import { Link } from "react-router-dom";

function HeaderStudent() {
  const [isNavOpen, setIsNavOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 600 && isNavOpen) {
        setIsNavOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isNavOpen]);

  return (
    <>
      <header className="homeHeaderS">
        <p className="headerTitleS">ExamAcademy</p>
        <div className="navigationBarContainerrS">
          <a href="#passedTests">Passed Tests</a>
          <a href="#availableTests">Available Tests</a>
          <a href="#selfCheckingTests">Self-Checking Tests</a>
          <a href="#footer">Footer</a>
        </div>
        <img
          src={profilePicture}
          alt="userPic"
          className={`profilePicture ${
            isNavOpen ? "profilePicture-openS" : "S"
          }`}
          onClick={() => setIsNavOpen(!isNavOpen)}
        ></img>
        <nav className={`nav ${isNavOpen ? "nav-openS" : "nav-closedS"}`}>
          <div className="personNameS">Teacher Name</div>
          <ul>
            <Link className="linksS">Edit Profile</Link>
            <Link className="linksS">Settings</Link>
            <Link className="linksS">Language</Link>
            <Link className="linksS">Light Mode</Link>
          </ul>
        </nav>
      </header>
    </>
  );
}

export default HeaderStudent;
