import { useEffect, useState } from "react";
import User from "./@types/entities/user";
import { UserApi } from "./api/endPoints";
import "./App.css";
import UserCard from "./components/UserCard";
import UserForm from "./components/UserForm";

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
			<div className="flex flex-col gap-5 mt-5">
				{users.map(user => {
					return <UserCard user={user} />;
				})}
			</div>
		</>
	);
}

export default App;
