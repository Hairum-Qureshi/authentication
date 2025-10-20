interface IUser {
	_id: string;
	firstName: string;
	lastName: string;
	email: string;
	profilePicture: string;
	password?: string | undefined;
	createdAt: Date;
	updatedAt: Date;
}

export type { IUser };
