import { useEffect, useState } from "react";
import User from "../@types/entities/user";
import { UserApi } from "../api/endPoints";

interface UserTableProps {
	users: User[];
}

const UserTable = ({ users }: UserTableProps) => {
	return (
		<table className="m-auto border-separate border-2 rounded-lg border-blue-400">
			<thead>
				<tr className="border-blue-400 border-2">
					<th>Name</th>
					<th>Email</th>
					<th>Age</th>
					<th>Gender</th>
				</tr>
			</thead>
			<tbody>
				{users.map(user => (
					<UserRow key={user.id} user={user} />
				))}
			</tbody>
		</table>
	);
};

interface UserRowProps {
	user: User;
}

const UserRow = ({ user }: UserRowProps) => {
	return (
		<tr>
			<td>{user.name}</td>
			<td>{user.email}</td>
			<td>{user.age}</td>
			<td>{user.gender}</td>
		</tr>
	);
};

export default UserTable;
