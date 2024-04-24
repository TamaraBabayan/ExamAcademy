import './GroupData.css';

export default function GroupData({ groupDate, isShowedModal, setOpeningModal }) {
	return (
		<tr className="groupDataTr">
			<td><button onClick={setOpeningModal}>{ groupDate.groupName }</button></td>
			<td>{ groupDate.students.length }</td>
			<td>{ groupDate.subject}</td>
		</tr>
	)
}
