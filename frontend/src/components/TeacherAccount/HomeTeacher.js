import Header from './Header.js'
import YourGroups from './YourGroups.js'
import YourTests from './YourTests.js';
import CreateTest from './CreateTest.js';
import Footer from '../MainPage/Footer.js';
import { useParams } from 'react-router-dom';
import {useState, useEffect}  from 'react';
import axios from 'axios';
import './HomeTeacher.css'

function HomeTeacher() {
	const { teacherId } = useParams();
	const [teacher, setTeacher] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`http://localhost:5087/api/users/${teacherId}`);
        setTeacher(response.data);
      } catch (error) {
        console.error('Error fetching user:', error);
      }
    };

    fetchUser();
  }, [teacherId]);

  if (!teacher) {
    return <div>Loading...</div>;
  }
		return (
			<div className='teacherProfile'>
				<Header teacherId={teacher._id} teacherName={teacher.name} />
				<YourGroups teacherId={teacher._id} />
				<YourTests teacherId={teacher._id} />
				<CreateTest teacherId={teacher._id} />
				<Footer />
			</div>
		)
}

export default HomeTeacher;
