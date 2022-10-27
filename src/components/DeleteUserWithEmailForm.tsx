import InputField from "./InputField";
import Button from "./Button";
import { ChangeEvent, FormEvent, useState } from "react";
import { UserApi } from "../api/endPoints";

const DeleteUserWithEmailForm = () => {
    const [email, setEmail] = useState<string>("");

    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
    };
    const onReset = () => {
        setEmail("");
    };

    const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()  //this doesn't work without e.preventDefault
        const toBeDeleted = await UserApi.findUserWith("email",email);
        console.log(email)
        console.log(toBeDeleted)
        if (toBeDeleted !== undefined && toBeDeleted.length > 0) {
            await UserApi.delete(toBeDeleted[0].id);
        } else {
            alert("User does not exist");
        }
        onReset();
    };

    return (
        <form onSubmit={onSubmit}>
            <div className="flex gap-5">
                <InputField
                    value={email}
                    onChange={onChange}
                    label="Delete person with email"
                    name="email"
                    type="text"
                    required
                />
            </div>
            <div className="flex gap-5 pt-2">
                <Button type="submit">Delete</Button>
            </div>
        </form>
    );
};

export default DeleteUserWithEmailForm;
