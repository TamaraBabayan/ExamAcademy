import "./Header.css";
import { useState, useEffect } from "react";
import profilePicture from "../../images/userr.png"
import { Link } from "react-router-dom";

function Header({teacherId, teacherName}) {
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
      <header className="homeHeader">
        <p className="headerTitle">
          ExamAcademy
        </p>
        <div className="navigationBarContainerr">
          <a href="#yourTests" >
            Your Tests
          </a>
          <a href="#yourGroups" >
            Your Groups
          </a>
          <a href="#createTest" >
            Create Test
          </a>
          <a href="#footer" >
            Footer
          </a>
        </div>
        <div className="imageAndName">
          <img src={profilePicture} alt="Profile pic"
              className={`profilePicture ${isNavOpen ? "profilePicture-open" : ""}`}
              onClick={() => setIsNavOpen(!isNavOpen)}
            >
            </img>
            <p className={`teacherName ${isNavOpen ? "teacherName-open" : "teacherName"}`}>{teacherName}</p>
          </div>  
          <nav className={`nav ${isNavOpen ? "nav-open" : "nav-closed"}`}>
            <div className="personName">{teacherName}</div>
            <ul>
              <Link className="links">Edit Profile</Link>
              <Link className="links">Settings</Link>
              <Link className="links">Language</Link>
              <Link className="links">Light Mode</Link>
            </ul>
          </nav>
      </header>
    </>
  );
}

export default Header;
