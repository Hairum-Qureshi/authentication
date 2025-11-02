import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import bcrypt from "bcrypt";
import User from "../models/User";
import { UserDocument } from "../interfaces";
import chalk from "chalk";

passport.use(
	new LocalStrategy(
		{ usernameField: "email" },
		async (email, password, done) => {
			try {
				if (!email || !password) {
					return done(null, false, {
						message: "Please enter both email and password."
					});
				}

				const user: UserDocument | null = (await User.findOne({
					email
				})) as UserDocument | null;

				if (!user) return done(null, false, { message: "User not found" });

				const isMatch = await bcrypt.compare(password, user.password as string);
				if (!isMatch)
					return done(null, false, { message: "Incorrect password" });

				return done(null, user);
			} catch (error) {
				return done(
					chalk.redBright("Error in Passport Local Strategy:", error),
					false
				);
			}
		}
	)
);

passport.serializeUser((user, done) => {
	done(null, (user as UserDocument)._id);
});

passport.deserializeUser(async (uid, done) => {
	try {
		const user: UserDocument | null = await User.findById(uid).select(
			"-password"
		);

		if (!user) {
			return done(new Error("User not found during deserialization"));
		}

		done(null, user);
	} catch (err) {
		done(err);
	}
});
