enum genders { "male", "female", "not specified" };

interface User {
  id: string;
  name: string;
  email: string;
  age: number;
  gender: keyof typeof genders;
}

export { genders };
export default User;