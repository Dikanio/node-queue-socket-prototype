import styles from './styles.module.css';
import { useNavigate } from 'react-router-dom';

export default function Home(props) {
	const {user, setUser, socket} = props;
	const navigate = useNavigate();
	
	const joinQueue = () => {
		if (user.role !== '' && user.username !== '' || user.role == 'doctor' && user.average_time > 0) {
			socket.emit('join_queue', {user});
			navigate(`/${user.role}`, { replace: true });
		}
	}
	return (
		<div className={styles.container} >
			<div className={styles.formContainer}>
				<h1>{`Queue System Prototype`}</h1>
				<input onChange={(e) => setUser({username: e.target.value, role: user.role, average_time: user.average_time})} className={styles.input} placeholder="Username..."></input>

				<select onChange={(e) => setUser({username: user.username, role: e.target.value, average_time: user.average_time})} className={styles.input} value={user.role}>
					<option>--- Select Role ---</option>
					<option value="patient">Patient</option>
					<option value="doctor">Doctor</option>
				</select>

				{user.role === "doctor" && (
          <input type="number" onChange={(e) => setUser({username: user.username, role: user.role, average_time: parseInt(e.target.value)})} className={styles.input} placeholder="average time(minutes)"></input>
      )}

				<button onClick={joinQueue} className="btn btn-secondary" style={{ width: '100%' }}>Join</button>
			</div>
		</div>
	)
}