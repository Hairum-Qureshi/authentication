import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import chalk from "chalk";
import session from "express-session";
import passport from "passport";
import authentication from "./routes/authentication";
import mongoose from "mongoose";
import { IUser } from "./interfaces";
import User from "./models/User";

dotenv.config();

const app = express();

const corsOptions = {
	origin: process.env.FRONTEND_URL,
	credentials: true,
	optionSuccessStatus: 200
};

app.use(cors(corsOptions)); // <-- for CORS
app.use(cookieParser()); // <-- allows you to read req.cookies
app.use(express.json()); // <-- without this, req.body won't work (for JSON data being passed to the backend)
app.use(express.urlencoded({ extended: true })); // <-- without this, you won't be able to read form data
app.use(
	session({
		secret: process.env.EXPRESS_SESSION_SECRET!,
		resave: false,
		saveUninitialized: false,
		cookie: {
			maxAge: 7 * 24 * 60 * 60 * 1000,
			secure: process.env.NODE_ENV === "production",
			httpOnly: true,
			sameSite: "lax"
		}
	})
);

app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser((user, done) => {
	done(null, (user as IUser)._id);
});

passport.deserializeUser(async (uid, done) => {
	try {
		const user: IUser | null = await User.findById(uid).select("-password");

		if (!user) {
			return done(new Error("User not found during deserialization"));
		}

		done(null, user);
	} catch (err) {
		done(err);
	}
});

app.use("/api", authentication);

const MONGO_URI: string = process.env.MONGO_URI!;
const PORT: string | number = process.env.PORT! || 9000;

app.listen(PORT, () => {
	const connectToMongoDB = async () => {
		try {
			const conn = await mongoose.connect(MONGO_URI!);
			console.log(
				chalk.yellowBright("Successfully connected to MongoDB on host:"),
				chalk.greenBright(`${conn.connection.host}`)
			);
			console.log(chalk.yellowBright(`Server listening on port ${PORT}!`));
		} catch (error) {
			console.error(error);
		}
	};

	connectToMongoDB();
});
