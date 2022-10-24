import { useEffect, useState } from "react";
import User from "./@types/user";
import { findAllUsers } from "./api/endPoints";
import "./App.css";
import UserForm from "./components/UserForm";

function App() {
	const [users, setUsers] = useState<User[]>([]);

	useEffect(() => {
		const mount = async () => {
			const newUsers = await findAllUsers();
			if (newUsers) setUsers(newUsers);
		};
		mount();
		return () => {};
	}, []);

	return (
		<>
			<UserForm />
			{users.map(user => {
				return (
					<p key={user.id}>{`${user.name} ${user.age} ${user.email} ${user.gender}`}</p>
				);
			})}
		</>
	);
}

export default App;
