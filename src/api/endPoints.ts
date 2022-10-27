import User from "../@types/entities/user";
import MediaType from "../@types/requestTypes/mediaType";
import Method from "../@types/requestTypes/method";
import RequestType from "../@types/requestTypes/requestType";

const BASE_URL = "http://localhost:5000";

const api = async <T>({ url, method, header, body }: RequestType<T>) => {
	return fetch(url, {
		headers: header,
		method: method,
		body: JSON.stringify(body)
	}).then(response => {
		if (!response.ok) {
			throw new Error(response.statusText);
		}
		return response.json() as Promise<T>;
	}).catch(_ => undefined);
};

const UserApi = {
	findAll: async () => {
		return api<User[]>({
			url: `${BASE_URL}/users`, method: Method.GET, header: {
				"Accept": MediaType.application_json
			}
		});
	},
	findUserWith: async (property: string, value: string) => {
		return api<User[]>({
			url: `${BASE_URL}/users?${property}=${value}`, method: Method.GET, header: {
				"Accept": MediaType.application_json
			}
		});
	},
	create: async (newUser: User) => {
		return api<User>({
			url: `${BASE_URL}/users`, method: Method.POST, header: {
				"Content-Type": MediaType.application_json,
				"accept": MediaType.application_json
			}, body: newUser
		});
	},
	update: async (updateUser: User) => {
		return api<User>({
			url: `${BASE_URL}/users/${updateUser.id}`, method: Method.PUT, header: {
				"Content-Type": MediaType.application_json,
				"accept": MediaType.application_json
			}, body: updateUser
		});
	},
	delete: async (email: string) => {
		return api<User>({
			url: `${BASE_URL}/users/${email}`, method: Method.DELETE, header: {
				"Content-Type": MediaType.application_json,
				"accept": MediaType.application_json
			}
		});
	},
};


export { UserApi };
