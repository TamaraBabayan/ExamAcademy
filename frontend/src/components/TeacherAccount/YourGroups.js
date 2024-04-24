import "./YourGroups.css";
import { Link }from 'react-router-dom';

function YourGroups({ teacherId }) {
  return (
    // <div id="yourGroups" className="yourGroupsContainer">
    //   <h1>Your Groups</h1>
    //   <ul>
    //     {/* {teacherGroups.map((group) => (
    //       <Link to="/" key={group}>
    //         <li>{group}</li>
    //       </Link>
    //     ))} */}
    //   </ul>
    // </div>
    <div id="yourGroups" className="yourGroupsContainer">
      <h1>Your Tests</h1>
      <br></br>
      <table className='groupsTable'>
        <thead>
          <tr>
            <th>Group Name</th>
            <th>Number of Students</th>
            <th>Current Subject</th>
          </tr>
        </thead>
          <tbody>
            {/* {teacherTests.map(test => (
              <tr key={test._id}>
                <td>{test.name}</td>
                <td>{test.subject}</td>
                <td>{test.groups}</td> 
              </tr>
            ))} */}
          </tbody>
      </table>
    </div>
  );
}

export default YourGroups;