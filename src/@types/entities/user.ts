
const genders = ["male", "female", "not specified"] as const;
type GenderType = (typeof genders)[number];

function isOfTypeGender(userInput: string): userInput is GenderType {
  return (genders as readonly string[]).includes(userInput);
}

interface User {
  id: string;
  name: string;
  email: string;
  age: number;
  gender: GenderType;
}

const emptyUser: User = {
  id: "",
  name: "",
  email: "",
  age: 0,
  gender: "not specified"
} as const;

export type { GenderType };
export { isOfTypeGender, genders, emptyUser };
export default User;