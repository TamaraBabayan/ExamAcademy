import { useState } from "react";
import { Link } from "react-router-dom";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Test({ groupNames, setGroupNames, test }) {
  const [selectedGroupes, setSelectedGroups] = useState([]);
  const [isShowedGroupes, setIsShowedGroups] = useState(false);

  const handleAddGroup = (testIndex) => {
    setSelectedGroups((prev) => [...prev, groupNames[testIndex]]);
    setGroupNames((prev) => prev.filter((_, i) => i !== testIndex));
  };

  const removeGroupNameByIndex = (testIndex) => {
    setGroupNames((prev) => [...prev, selectedGroupes[testIndex]]);
    setSelectedGroups((prev) => prev.filter((_, i) => i !== testIndex));
  };

  const groupsDoneButton = () => {
    setIsShowedGroups(false);
    // TODO: uxarkel server: selectedGroupes <-- Array, group.id <-- Number
  };

  return (
    <tr key={test?._id}>
      <td>
        <Link to={`/pass/test/${test?._id}`}>{test?.name}</Link>
      </td>
      <td>{test?.subject}</td>
      <td>
        {test?.groups}
        {isShowedGroupes ? (
          <div>
            {selectedGroupes.map((groupname, i) => (
              <div key={i} className="testTableButton">
                <p>{groupname}</p>
                <button onClick={() => removeGroupNameByIndex(i)}>x</button>
              </div>
            ))}

            {groupNames.map((groupName, i) => (
              <button key={i} onClick={() => handleAddGroup(i)}>
                {groupName}
              </button>
            ))}

            <button onClick={groupsDoneButton}>done</button>
          </div>
        ) : (
          <>
            {selectedGroupes.map((groupname, i) => (
              <div key={i}>
                <p>{groupname}</p>
              </div>
            ))}
            <button
              onClick={() => {
                setIsShowedGroups(true);
              }}
            >
              <FontAwesomeIcon icon={faPlus}></FontAwesomeIcon>
            </button>
          </>
        )}
      </td>
    </tr>
  );
}
