import { Schema, model } from "mongoose";
import { UserDocument } from "../interfaces";

const userSchema = new Schema(
	{
		_id: {
			type: String,
			required: true
		},
		firstName: {
			type: String,
			required: true
		},
		lastName: {
			type: String,
			required: true
		},
		profile_picture: {
			type: String,
			default:
				"https://i.pinimg.com/originals/e5/9e/51/e59e51dcbba47985a013544769015f25.jpg"
		},
		email: {
			type: String,
			required: true,
			unique: true
		},
		password: {
			type: String,
			required: true
		},
		isMFAEnabled: {
			type: Boolean,
			default: false
		},
		isGoogleAccount: {
			type: Boolean,
			default: false
		},
		twoFactorSecret: {
			type: String
		}
	},
	{
		timestamps: true
	}
);

export default model<UserDocument>("User", userSchema);
