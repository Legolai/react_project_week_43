import InputField from "./InputField";
import Button from "./Button";
import { ChangeEvent, FormEvent, useState } from "react";
import { UserApi } from "../api/endPoints";
import User from "../@types/entities/user";

const GetUserWithNameForm = () => {
    const [name, setName] = useState<string>("");
    const [foundUsers, setFoundUsers] = useState<User[]>([]);

    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value);
    };
    const onReset = () => {
        setName("");
    };

    const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const foundUsers = await UserApi.findUserWith("name",name);
        if (foundUsers) setFoundUsers(foundUsers);
        onReset();
    };

    return (
        <form onSubmit={onSubmit}>
            <div className="flex gap-5">
                <InputField
                    value={name}
                    onChange={onChange}
                    label="Get persons with name"
                    name="name"
                    type="text"
                    required
                />
            </div>
            <div className="flex gap-5 pt-2">
                <Button type="submit">Update</Button>
            </div>
            {foundUsers.map(user => {
                return (
                    <p key={user.id}>{`${user.name} ${user.age} ${user.email} ${user.gender}`}</p>
                );
            })}
        </form>
    );
};

export default GetUserWithNameForm;
