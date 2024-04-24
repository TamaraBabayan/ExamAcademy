// libs
import { useState, useEffect } from "react";

// components
import GroupData from "./GroupData";

// styles
import "./YourGroups.css";

function YourGroups({ teacherId }) {
  const [groups, setGroups] = useState([]);
  const [openingModal, setOpeningModal] = useState(-1);

  useEffect(() => {
    // TODO: fetch groups list
    // eli fayqac mi ban dnumem, heto irakani jamanak kpoxenq
    setGroups([
      {
        groupName: "Group 1",
        subject: "JavaScript",
        students: [
          {
            name: "Aram",
            surname: "Khachatryan",
          },
          {
            name: "Ev",
            surname: "Urishneryan",
          },
        ],
      },
      {
        groupName: "Group 2",
        subject: "C++",
        students: [
          {
            name: "Bari",
            surname: "Oryan",
          },
          {
            name: "Araj",
            surname: "Laveryan",
          },
          {
            name: "Ev",
            surname: "Aylnyan",
          },
        ],
      },
    ]);
  }, []);

  return (
    <div id="yourGroups" className="yourGroupsContainer">
      <h1>Your Tests</h1>
      <br></br>
      <table className="groupsTable">
        <thead>
          <tr>
            <th>Group Name</th>
            <th>Number of Students</th>
            <th>Current Subject</th>
          </tr>
        </thead>
        <tbody>
          {groups.map((groupDate, i) => (
            <GroupData
              key={i}
              groupDate={groupDate}
              isShowedModal={i === openingModal}
              setOpeningModal={() => setOpeningModal(i)}
            />
          ))}
        </tbody>
      </table>

      {openingModal > -1 && (
        <div className="studentsModal">
          <div className="studentsModal__modal">
            <button
              className="studentsModal__modal__closeButton"
              onClick={() => setOpeningModal(-1)}
            >
              x
            </button>

            <div className="studentInfo">
                <p>Name</p>
                <p>Surname</p>
              </div>
            {groups[openingModal].students.map((studentData, i) => (
              <div key={i} className="studentInfo">
                <p>{studentData.name}</p>
                <p>{studentData.surname}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default YourGroups;
