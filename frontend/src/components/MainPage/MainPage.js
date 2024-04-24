import Header from './Header.js'
import Home from './Home.js'
import About from './About.js'
import Footer from './Footer.js'
import mainPage from '../../images/exam3.jpeg'

function MainPage() {

	return (
		<>
			<Header />
			<Home />
			<img src={mainPage} alt="Exam img" width="100%" height="900" ></img>
			<About />
			<Footer/>
		</>
	)
}

export default MainPage;