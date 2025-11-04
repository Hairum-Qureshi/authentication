import express from "express";
import {
	getAuthStatus,
	getCurrentUser,
	googleFirebaseOAuthHandler,
	reset2FA,
	setup2FA,
	signIn,
	signOut,
	signUp,
	verify2FA
} from "../controllers/authentication";
import passport from "passport";
import "../config/passport-config";
import isAuthenticated from "../middleware/isAuthenticated";

const router = express.Router();

router.post("/sign-up", signUp);
router.post("/sign-in", passport.authenticate("local"), signIn);
router.post("/google-auth", googleFirebaseOAuthHandler);
router.post("/sign-out", signOut);
router.get("/status", getAuthStatus);
router.get("/2fa/setup", isAuthenticated, setup2FA);
router.post("/2fa/verify", isAuthenticated, verify2FA);
router.post("/2fa/reset", isAuthenticated, reset2FA);
router.get("/current-user", isAuthenticated, getCurrentUser);

export default router;
