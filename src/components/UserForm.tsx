import InputField from "./InputField";
import Button from "./Button";
import { ChangeEvent, FormEvent, useState } from "react";
import { UserApi } from "../api/endPoints";
import User, { emptyUser, genders, isOfTypeGender } from "../@types/entities/user";
import Selector from "./Selector";

const UserForm = () => {
	const [form, setForm] = useState<Omit<User, "id">>(emptyUser);

	const onChange = (e: ChangeEvent<HTMLInputElement>) => {
		setForm(curr => {
			return { ...curr, [e.target.name]: e.target.value };
		});
	};

	const onReset = () => {
		setForm(emptyUser);
	};

	const onSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const user: User = {
			id: crypto.randomUUID(),
			...form,
		};

		UserApi.create(user).then(_ => onReset());
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

				<Selector
					options={genders.map(g => {
						return { text: g, value: g };
					})}
					placeholder="Select a gender"
					option={o => <div data-value={o.value}>{o.text}</div>}
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
				<Button onClick={onReset} type="reset" outline>
					Reset
				</Button>
				<Button type="submit">Create</Button>
			</div>
		</form>
	);
};

export default UserForm;
