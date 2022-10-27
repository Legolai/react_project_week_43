import { useEffect, useState } from "react";
import User from "./@types/entities/user";
import { UserApi } from "./api/endPoints";
import "./App.css";
import UserForm from "./components/UserForm";
import GetUserWithNameForm from "./components/GetUserWithNameForm";
import DeleteUserWithEmailForm from "./components/DeleteUserWithEmailForm";
import UpdateUserWithEmail from "./components/UpdateUserWithEmail";

function App() {
	const [users, setUsers] = useState<User[]>([]);

	useEffect(() => {
		const mount = async () => {
			const newUsers = await UserApi.findAll();
			if (newUsers) setUsers(newUsers);
		};
		mount();
		return () => {};
	}, []);

	return (
		<>
			<UserForm />
			<p>List of users from db: </p>
			{users.map(user => {
				return (
					<p key={user.id}>{`${user.name} ${user.age} ${user.email} ${user.gender}`}</p>
				);
			})}
			<GetUserWithNameForm />
			<DeleteUserWithEmailForm />
			<UpdateUserWithEmail />
		</>
	);
}

export default App;
