import axios from 'axios';
import { User } from '@/components/data-table/columns';

export async function fetchUsers(): Promise<User[]> {
	const res = await axios.get('https://dummyjson.com/users');
	const users: User[] = res.data.users.map((user: any) => ({
		id: user.id,
		firstName: user.firstName,
		lastName: user.lastName,
		age: user.age,
		email: user.email,
		phone: user.phone,
		birthDate: user.birthDate,
	}));
	return users;
}

export default fetchUsers;
