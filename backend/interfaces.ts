interface IUser {
	_id: string;
	firstName: string;
	lastName: string;
	email: string;
	profilePicture: string;
	password: string;
	createdAt: Date;
	updatedAt: Date;
}

export type { IUser };
