import InputField from "./InputField";
import Button from "./Button";
import { ChangeEvent, FormEvent, useState } from "react";
import { UserApi } from "../api/endPoints";
import User, { emptyUser, isOfTypeGender } from "../@types/entities/user";

interface UserFormProps {
	afterSubmit?: () => void;
}

const UserForm = ({ afterSubmit }: UserFormProps) => {
	const [form, setForm] = useState<Omit<User, "id">>(emptyUser);

	const onChange = (e: ChangeEvent<HTMLInputElement>) => {
		setForm(curr => {
			return { ...curr, [e.target.name]: e.target.value };
		});
	};
	const onReset = () => {
		setForm(emptyUser);
	};

	const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const user: User = {
			id: crypto.randomUUID(),
			...form,
		};
		const checkEmailDupes = await UserApi.findUserWith("email", user.email);
		console.log(checkEmailDupes);
		if (checkEmailDupes !== undefined && checkEmailDupes.length === 0) {
			const res = await UserApi.create(user);
			if (res) {
				onReset();
				if (afterSubmit) afterSubmit();
			}
		} else {
			alert("Email in use");
		}
	};

	return (
		<form onSubmit={onSubmit}>
			<div className="flex gap-5">
				<InputField
					value={form.name}
					onChange={onChange}
					label="Name"
					name="name"
					type="text"
					required
				/>
				<InputField
					value={form.email}
					onChange={onChange}
					label="Email"
					name="email"
					type="email"
					required
				/>
			</div>
			<div className="flex gap-5">
				<InputField
					value={form.age}
					min={0}
					onChange={e => {
						const value = e.target.value;
						if (Number.parseInt(value) || value.length == 0) {
							onChange(e);
						} else {
							e.target.value = "0";
							onChange(e);
						}
					}}
					onBlur={e => {
						e.target.value = e.target.value.length == 0 ? "0" : form.age.toString();
						onChange(e);
					}}
					label="Age"
					name="age"
					type="text"
					required
				/>
				<InputField
					value={form.gender}
					onChange={e => onChange(e)}
					onBlur={e => {
						if (!isOfTypeGender(e.target.value)) {
							e.target.value = "not specified";
							onChange(e);
						}
					}}
					label="Gender"
					name="gender"
					type="text"
					required
				/>
			</div>
			<div className="flex gap-5 pt-2">
				<Button onClick={onReset} outline type="reset">
					Reset
				</Button>
				<Button type="submit">Create</Button>
			</div>
		</form>
	);
};

export default UserForm;
