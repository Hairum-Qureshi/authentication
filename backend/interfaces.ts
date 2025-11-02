import { Document } from "mongoose";

type User = {
	_id: string;
	firstName: string;
	lastName: string;
	email: string;
	profilePicture: string;
	password?: string | undefined;
	isMFAEnabled: boolean;
	isGoogleAccount: boolean;
	twoFactorSecret?: string | undefined;
	createdAt: Date;
	updatedAt: Date;
};

type UserDocument = User & Document;
export type { UserDocument };
