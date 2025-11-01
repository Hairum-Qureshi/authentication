import chalk from "chalk";
import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { IUser } from "../interfaces";
import User from "../models/User";
import crypto from "crypto";

const signUp = async (req: Request, res: Response): Promise<void> => {
	try {
		const { firstName, lastName, email, password, confirmedPassword } =
			req.body;

		if (!firstName || !lastName || !email || !password || !confirmedPassword) {
			res.status(422).send("Please make sure you fill in all fields");
			return;
		}

		if (confirmedPassword !== password) {
			res.status(400).send("Passwords do not match");
			return;
		}

		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]/;

		if (!emailRegex.test(email)) {
			res.status(400).json({ message: "Invalid email" });
			return;
		}

		const salt = await bcrypt.genSalt(10);
		const hashedPassword = await bcrypt.hash(password, salt);

		const existingUser: IUser | null = (await User.findOne({
			email
		})) as IUser | null;

		if (existingUser) {
			res.status(500).send("User already exists with this email");
			return;
		}

		const user = new User({
			_id: crypto.randomUUID(),
			firstName,
			lastName,
			email: email.toLowerCase(),
			password: hashedPassword
		});

		// save the instance, not the Model
		await user.save();

		// convert to plain object and remove password before sending
		const safeUser = user.toObject();
		delete (safeUser as Partial<IUser>).password;

		res.status(201).send(safeUser);
	} catch (error) {
		console.log(
			chalk.bold(
				chalk.redBright(
					"Error in sign up function controller, authentication.ts file: ",
					error
				)
			)
		);
		res.status(400).json({ message: error });
	}
};

const signIn = async (req: Request, res: Response): Promise<void> => {
	try {
		console.log(req.user);
		// 1. Generate token (JWT)
		// 2. Remove password before sending response
		// 3. Respond with user and token
	} catch (error) {
		console.log(
			chalk.bold(
				chalk.redBright(
					"Error in sign in function controller, authentication.ts file"
				)
			)
		);
	}
};

const signOut = async (req: Request, res: Response): Promise<void> => {
	try {
	} catch (error) {
		console.log(
			chalk.bold(
				chalk.redBright(
					"Error in sign out function controller, authentication.ts file"
				)
			)
		);
	}
};

const getStatus = async (req: Request, res: Response): Promise<void> => {
	try {
	} catch (error) {
		console.log(
			chalk.bold(
				chalk.redBright(
					"Error in get status function controller, authentication.ts file"
				)
			)
		);
	}
};

const setup2FA = async (req: Request, res: Response): Promise<void> => {
	try {
	} catch (error) {
		console.log(
			chalk.bold(
				chalk.redBright(
					"Error in setup 2FA function controller, authentication.ts file"
				)
			)
		);
	}
};

const verify2FA = async (req: Request, res: Response): Promise<void> => {
	try {
	} catch (error) {
		console.log(
			chalk.bold(
				chalk.redBright(
					"Error in verify 2FA function controller, authentication.ts file"
				)
			)
		);
	}
};

const reset2FA = async (req: Request, res: Response): Promise<void> => {
	try {
	} catch (error) {
		console.log(
			chalk.bold(
				chalk.redBright(
					"Error in reset 2FA function controller, authentication.ts file"
				)
			)
		);
	}
};

const getCurrentUser = async (req: Request, res: Response): Promise<void> => {
	try {
	} catch (error) {
		console.log(
			chalk.bold(
				chalk.redBright(
					"Error in get current user function controller, authentication.ts file"
				)
			)
		);
	}
};

export {
	signUp,
	signIn,
	signOut,
	getStatus,
	setup2FA,
	verify2FA,
	reset2FA,
	getCurrentUser
};
