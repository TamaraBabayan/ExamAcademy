import "./Home.css"
import React from 'react'
import mainPage from '../../images/exam2.jpeg'


function Home() {
	return (
			<div id="home" className="aboutExamAcademy">
				<div className="textPart">
					<p className="miniTitle">What is ExamAcademy?</p> 
					<p className="text"> "ExamAcademy" is an online platform for organizing exams and tests. 
						The platform allows teachers to easily create tests or exam tickets for students. However, 
						the main advantage of the platform is that it automates the exam checking process, 
						immediately checking the tests completed by students. Each student and teacher has a separate account with special features. 
						Lecturers can create tests in their accounts using the questions and problems included in the database. 
						The questions and problems in the database are sorted by subject and for each subject by complexity, 
						which significantly simplifies the teacher's work. Lecturers can also add questions to the database, add a new subject or topic. 
						And students can see the test sent by the teacher on their pages, fill it in if the teacher has opened access to fill it in and get the answer to the test immediately. 
						The results of all tests and examinations of the student are saved, according to which he receives an individual report on his progress. 
					</p>
				</div>
				<img className="mainPage" src={mainPage} alt="Exam"/>
			</div>
	)
};

export default Home;