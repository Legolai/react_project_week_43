import InputField from "./InputField";
import Button from "./Button";
import { FormEvent, useState } from "react";
import { createNewUser } from "../api/endPoints";
import User, { genders } from "../@types/user";

const UserForm = () => {
	const [fname, setFname] = useState("");
	const [lname, setLname] = useState("");
	const [email, setEmail] = useState("");
	const [age, setAge] = useState(0);
	const [gender, setGender] = useState("");

	const onReset = () => {
		setFname("");
		setLname("");
		setEmail("");
		setAge(0);
		setGender("");
	};

	const onSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const user: User = {
			id: crypto.randomUUID(),
			name: `${fname} ${lname}`,
			email,
			age,
			gender: gender as keyof typeof genders,
		};
		onReset();
		createNewUser(user);
	};

	return (
		<form onSubmit={onSubmit}>
			<div className="flex gap-5">
				<InputField
					value={fname}
					onChange={e => setFname(e.target.value)}
					label="First name"
					name="fname"
					type="text"
					required
				/>
				<InputField
					value={lname}
					onChange={e => setLname(e.target.value)}
					label="Last name"
					name="lname"
					type="text"
					required
				/>
			</div>
			<div className="flex gap-5">
				<InputField
					value={age}
					min={0}
					onChange={e => {
						const value = e.target.value;
						if (Number.parseInt(value)) setAge(value as unknown as number);
					}}
					label="Age"
					name="age"
					type="number"
					required
				/>
				<InputField
					value={email}
					onChange={e => setEmail(e.target.value)}
					label="Email"
					name="email"
					type="email"
					required
				/>
				<InputField
					value={gender}
					onChange={e => setGender(e.target.value)}
					onBlur={e => {
						if (!(typeof e.target.value in genders))
							setGender(genders["not specified"].toString());
					}}
					label="Gender"
					name="gender"
					type="text"
					required
				/>
			</div>
			<div className="flex gap-5 pt-2">
				<Button onClick={onReset} type="reset">
					Reset
				</Button>
				<Button type="submit">Create</Button>
			</div>
		</form>
	);
};

export default UserForm;
