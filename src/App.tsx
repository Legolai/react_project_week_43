import { useEffect, useState } from "react";
import User from "./@types/entities/user";
import { UserApi } from "./api/endPoints";
import "./App.css";
import UserForm from "./components/UserForm";
import GetUserWithNameForm from "./components/GetUserWithNameForm";
import DeleteUserWithEmailForm from "./components/DeleteUserWithEmailForm";
import UpdateUserWithEmail from "./components/UpdateUserWithEmail";
import UserTable from "./components/UserTable";
import FormChooser from "./components/FormChooser";

function App() {
	const [users, setUsers] = useState<User[]>([]);
	const [refresh, setRefresh] = useState(false);

	useEffect(() => {
		const getUsers = async () => {
			const newUsers = await UserApi.findAll();
			if (newUsers) setUsers(newUsers);
		};
		getUsers();
		return () => {};
	}, [refresh]);

	const refreshUsers = () => {
		setRefresh(curr => !curr);
	};

	return (
		<>
			<h1 className="text-3xl mb-2">List of users from db </h1>
			<UserTable users={users} />

			<FormChooser
				forms={[
					{ title: "Create", form: <UserForm afterSubmit={refreshUsers} /> },
					{ title: "Get", form: <GetUserWithNameForm /> },
					{ title: "Delete", form: <DeleteUserWithEmailForm /> },
					{ title: "Update", form: <UpdateUserWithEmail /> },
				]}
			/>
		</>
	);
}

export default App;
