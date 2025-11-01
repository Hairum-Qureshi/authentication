import express from "express";
import {
	getCurrentUser,
	getStatus,
	reset2FA,
	setup2FA,
	signIn,
	signOut,
	signUp,
	verify2FA
} from "../controllers/authentication";
import passport from "passport";
import "../config/passport-config";

const router = express.Router();

router.post("/sign-up", signUp);
router.post("/sign-in", passport.authenticate("local"), signIn);
router.post("/sign-out", signOut);
router.get("/status", getStatus);
router.get("/2fa/setup", setup2FA);
router.post("/2fa/verify", verify2FA);
router.post("/2fa/reset", reset2FA);
router.get("/current-user", getCurrentUser);

export default router;
