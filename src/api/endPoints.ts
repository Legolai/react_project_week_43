import User from "../@types/user";

const BASE_URL = "http://localhost:3000";

const api = async <T>(url: string, method: string, body?: T, headers?: {}) => {
	return fetch(url, {
		headers: headers,
		method: method,
		body: JSON.stringify(body)
	}).then(response => {
		if (!response.ok) {
			throw new Error(response.statusText);
		}
		return response.json() as Promise<T>;
	}).catch(err => { console.error(err); return undefined; });
};

const findAllUsers = async () => {
	return api<User[]>(`${BASE_URL}/users`, "GET");
};

const createNewUser = async (newUser: User) => {
	return api<User>(`${BASE_URL}/users`, "POST", newUser, { "Content-Type": "application/json" });
};

export { findAllUsers, createNewUser };
