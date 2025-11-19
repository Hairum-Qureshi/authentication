import chalk from "chalk";
import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { UserDocument } from "../interfaces";
import User from "../models/User";
import crypto from "crypto";
import speakeasy from "speakeasy";
import qrCode from "qrcode";
import jwt from "jsonwebtoken";
import admin from "../config/firebase-config";

function createJWTToken(user: UserDocument): string {
	const jwtToken = jwt.sign(
		{
			id: user._id,
			email: user.email
		},
		process.env.JWT_SECRET as string,
		{ expiresIn: "7d" }
	);
	return jwtToken;
}

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

		const existingUser: UserDocument | null = (await User.findOne({
			email
		})) as UserDocument | null;

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

		// TODO - there doesn't seem to be any code for creating the cookie here
		// TODO - come back to this
		// convert to plain object and remove password before sending
		const safeUser = user.toObject();
		delete (safeUser as Partial<UserDocument>).password;

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
		const userData = req.user as UserDocument;

		res.status(200).json({
			message: "Sign in successful",
			email: userData.email,
			// firstName: userData.firstName,
			// lastName: userData.lastName,
			// _id: userData._id,
			isMFAEnabled: userData.isMFAEnabled
		});

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

const googleFirebaseOAuthHandler = async (
	req: Request,
	res: Response
): Promise<void> => {
	{
		try {
			const idToken = req.headers.authorization as string;

			// Verify the ID token with Firebase Admin SDK
			const decodedToken = await admin
				.auth()
				.verifyIdToken(idToken.replace("Bearer ", ""));
			const { email, name, uid, picture } = decodedToken;

			// Check if user exists in the database
			let user: UserDocument | null = (await User.findOne({
				email
			})) as UserDocument | null;

			if (!user) {
				// If user doesn't exist, create a new user
				user = new User({
					_id: uid,
					email,
					firstName: name?.split(" ")[0] || "",
					lastName: name?.split(" ").slice(1).join(" ") || "",
					isGoogleAccount: true,
					profile_picture: picture,
					password: crypto.randomBytes(16).toString("hex") // Random password
				});
				await user.save();
			}

			req.login(user, err => {
				if (err) {
					throw err;
				}

				res.status(200).json({
					message: "Google sign-in successful",
					id: user._id,
					fullName: `${user.firstName} ${user.lastName}`,
					profile_picture: user.profile_picture,
					email: user.email,
					isMFAEnabled: user.isMFAEnabled
				});
			});
		} catch (error) {
			console.log(
				chalk.bold(
					chalk.redBright(
						"Error in Google Firebase OAuth handler, authentication.ts file: ",
						error
					)
				)
			);
			res.status(400).json({ message: "Google sign-in failed", error });
		}
	}
};

const signOut = async (req: Request, res: Response): Promise<void> => {
	try {
		if (!req.user) {
			res.status(401).json({ message: "Already signed out" });
		}

		req.logout(err => {
			if (err) {
				console.log(
					chalk.bold(
						chalk.redBright(
							"Error during logout in signOut function controller, authentication.ts file: ",
							err
						)
					)
				);
				res.status(500).json({ message: "Error during sign out" });
				return;
			}
			res.status(200).json({ message: "Sign out successful" });
		});
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

const getAuthStatus = async (req: Request, res: Response): Promise<void> => {
	try {
		if (!req.user) {
			res.status(200).json({ isAuthenticated: false });
			return;
		} else {
			const userData = req.user as UserDocument;

			res.status(200).json({
				isAuthenticated: true,
				email: userData.email,
				// firstName: userData.firstName,
				// lastName: userData.lastName,
				// _id: userData._id,
				isMFAEnabled: userData.isMFAEnabled
			});
		}
	} catch (error) {
		console.log(
			chalk.bold(
				chalk.redBright(
					"Error in get getAuthStatus function controller, authentication.ts file"
				)
			)
		);
	}
};

const setup2FA = async (req: Request, res: Response): Promise<void> => {
	try {
		const user = req.user as UserDocument;
		const secret = speakeasy.generateSecret();
		user.twoFactorSecret = secret.base32;
		user.isMFAEnabled = true;
		await user.save();
		const url = speakeasy.otpauthURL({
			secret: secret.base32,
			label: user.email,
			issuer: "Authentication Demo App",
			encoding: "base32"
		});

		const qrImageURL = await qrCode.toDataURL(url);
		res.status(200).json({ qrImageURL });
	} catch (error) {
		console.log(
			chalk.bold(
				chalk.redBright(
					"Error in setup 2FA function controller, authentication.ts file"
				)
			)
		);
		res.status(500).json({ message: "Error setting up 2FA" });
	}
};

const verify2FA = async (req: Request, res: Response): Promise<void> => {
	try {
		const { token } = req.body;
		const user = req.user as UserDocument;
		const verified = speakeasy.totp.verify({
			secret: user.twoFactorSecret as string,
			encoding: "base32",
			token
		});

		if (verified) {
			const jwtToken = createJWTToken(user);

			res.status(200).json({ message: "2FA verified", token: jwtToken });
		} else {
			res.status(400).json({ message: "Invalid 2FA token" });
		}
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
		const user = req.user as UserDocument;
		user.twoFactorSecret = "";
		user.isMFAEnabled = false;
		await user.save();
		res.status(200).json({ message: "2FA has been reset" });
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
		const user = req.user as UserDocument;
		res.status(200).json({
			_id: user._id,
			email: user.email,
			fullName: `${user.firstName} ${user.lastName}`,
			profile_picture: user.profile_picture,
			isMFAEnabled: user.isMFAEnabled
		});
	} catch (error) {
		console.log(
			chalk.bold(
				chalk.redBright(
					"Error in getCurrentUser function controller, authentication.ts file"
				)
			)
		);
		res.status(500).json({ message: "Error retrieving current user" });
	}
};

export {
	signUp,
	signIn,
	googleFirebaseOAuthHandler,
	signOut,
	getAuthStatus,
	setup2FA,
	verify2FA,
	reset2FA,
	getCurrentUser
};
