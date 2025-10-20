import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import chalk from "chalk";
import session from "express-session";
import passport from "passport";

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
	"session",
	session({
		secret: process.env.EXPRESS_SESSION_SECRET!,
		resave: false,
		saveUninitialized: false
	})
);
app.use(passport.initialize());
app.use(passport.session());

const PORT: string | number = process.env.PORT || 9000;

app.listen(PORT, () => {
	console.log(
		chalk.bold(chalk.yellowBright(`Server listening on port ${PORT}!`))
	);
});
