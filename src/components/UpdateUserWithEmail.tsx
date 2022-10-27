import InputField from "./InputField";
import Button from "./Button";
import { ChangeEvent, FormEvent, useState } from "react";
import { UserApi } from "../api/endPoints";
import User, {emptyUser, isOfTypeGender} from "../@types/entities/user";

const UpdateUserWithEmail = () => {
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
        e.preventDefault()
        const foundUser = await UserApi.findUserWith("email",form.email);
        if(foundUser !== undefined) {
            const UpdatedUser = {
                id: foundUser[0].id,
                name: form.name,
                email: form.email,
                age: form.age,
                gender: form.gender
            }
            await UserApi.update(UpdatedUser);
        } else {
            alert("User not found")
        }
        onReset();
    };

    return (
        <form onSubmit={onSubmit}>
            <div className="flex gap-5">
                <InputField
                    value={form.email}
                    onChange={onChange}
                    label="Update user with email"
                    name="email"
                    type="email"
                    required
                />
                <InputField
                    value={form.name}
                    onChange={onChange}
                    label="Name"
                    name="name"
                    type="text"
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
                <Button onClick={onReset} type="reset">
                    Reset
                </Button>
                <Button type="submit">Update</Button>
            </div>
        </form>
    );
};

export default UpdateUserWithEmail;
