import "./App.css";
import MainPage from "./components/MainPage/MainPage.js";
import LogInPage from "./components/LogInSignUpPages/LogInPage.js";
import SignUpStudent from "./components/LogInSignUpPages/SignUpAsStudent.js";
import SignUpTeacher from "./components/LogInSignUpPages/SignUpAsTeacher.js";
import HomeTeacher from "./components/TeacherAccount/HomeTeacher.js";
import Form from "./components/ManualTestCreation/Form.js";
import RandomTestGenerator from "./components/RandomTestGenerator/RandomTestGenerator.js";
import HomeStudent from "./components/StudentAccount/HomeStudent.js"
import NotFound from "./NotFound.js"
import "bootstrap/dist/css/bootstrap.min.css";
import { Routes, Route } from "react-router-dom";
import CreateRandomTest from "./components/RandomTestGenerator/CreateRandomTest.js";
import PassTest from "./components/PassTest/PassTest.js";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/login" element={<LogInPage />} />
        <Route path="/signup/student" element={<SignUpStudent />} />
        <Route path="/signup/teacher" element={<SignUpTeacher />} />
        <Route path="/home/teacher/:teacherId" element={<HomeTeacher />} />
        <Route path="/home/student/:studentId"  element={<HomeStudent />} />
        <Route path="/test/creation" element={<Form />} />
        <Route path="/random/test/:teacherId" element={<RandomTestGenerator />} />
        <Route path="/test/review" element={<CreateRandomTest />} />
        <Route path="/pass/test/:testId" element={<PassTest />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
