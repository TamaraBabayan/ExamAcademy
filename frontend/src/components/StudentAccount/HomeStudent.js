import Header from './HeaderStudent.js'
import AvailableTests from './AvailableTests.js'
import PassedTests from './PassedTests.js';
import SelfCheckingTests from "./selfCheckingTests.js";
import Footer from '../MainPage/Footer.js';
import "./HomeStudent.css";

function HomeStudent() {
  return (
    <div className="studentProfile">
      <Header />
      <AvailableTests />
      <PassedTests />
      <SelfCheckingTests />
      <Footer /> 
    </div>
  );
}

export default HomeStudent;
