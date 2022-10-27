import User from "../@types/entities/user";

interface UserCardProps {
	user: User;
}

const UserCard = ({ user }: UserCardProps) => {
	return (
		<div key={user.id} className="drop-shadow-md bg-white rounded-lg">
			<h3>{user.name}</h3>
			<p>{user.email}</p>
		</div>
	);
};

export default UserCard;
