import { Request, Response, NextFunction } from "express";

export default function isAuthenticated(
	req: Request,
	res: Response,
	next: NextFunction
): void {
	if (req.isAuthenticated()) {
		return next();
	} else {
		res.status(401).json({ message: "Unauthorized" });
	}
}
