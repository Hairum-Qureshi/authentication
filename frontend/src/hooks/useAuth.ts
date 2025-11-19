import { signInWithPopup } from "@firebase/auth";
import { auth, googleProvider } from "../config/firebase";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useNavigate } from "react-router-dom";

interface UseAuthReturn {
	handleGoogleSignIn: () => Promise<void>;
	signUp: (
		firstName: string,
		lastName: string,
		email: string,
		password: string,
		confirmedPassword: string
	) => void;
	signIn: (email: string, password: string) => void;
	signOut: () => void;
	twoFaSetup: () => void;
	twoFaVerify: (code: string) => void;
	resetTwoFa: () => void;
}

export default function useAuth(): UseAuthReturn {
	const navigate = useNavigate();
	const queryClient = useQueryClient();

	const { mutate: googleOAuthMutation } = useMutation({
		mutationFn: async (token: string) => {
			try {
				const response = await axios.post(
					`${import.meta.env.VITE_BACKEND_URL}/api/google-auth`,
					{},
					{
						headers: {
							Authorization: `Bearer ${token}`
						},
						withCredentials: true
					}
				);

				return response;
			} catch (error) {
				console.error(error);
			}
		},
		onSuccess: () => {
			navigate("/profile");
		}
	});

	const handleGoogleSignIn = async () => {
		try {
			const result = await signInWithPopup(auth, googleProvider);
			console.log(result);
			const token = await result.user.getIdToken();
			googleOAuthMutation(token);
		} catch (error) {
			console.log(error);
		}
	};

	const { mutate: signUpMutation } = useMutation({
		mutationFn: async ({
			firstName,
			lastName,
			email,
			password,
			confirmedPassword
		}: {
			firstName: string;
			lastName: string;
			email: string;
			password: string;
			confirmedPassword: string;
		}) => {
			try {
				const response = await axios.post(
					`${import.meta.env.VITE_BACKEND_URL}/api/sign-up`,
					{ firstName, lastName, email, password, confirmedPassword },
					{
						withCredentials: true
					}
				);

				return response;
			} catch (error) {
				console.error(error);
			}
		},
		onSuccess: () => {
			navigate("/profile");
		}
	});

	const signUp = (
		firstName: string,
		lastName: string,
		email: string,
		password: string,
		confirmedPassword: string
	) => {
		if (!firstName || !lastName || !email || !password || !confirmedPassword) {
			alert("All fields are required");
			return;
		}

		// implement any other necessary guards
		if (password !== confirmedPassword) {
			alert("Passwords do not match");
			return;
		}

		signUpMutation({ firstName, lastName, email, password, confirmedPassword });
	};

	const { mutate: signInMutation } = useMutation({
		mutationFn: async (data: { email: string; password: string }) => {
			try {
				const response = await axios.post(
					`${import.meta.env.VITE_BACKEND_URL}/api/sign-in`,
					data,
					{
						withCredentials: true
					}
				);

				return response;
			} catch (error) {
				console.error(error);
			}
		},
		onSuccess: () => {
			navigate("/profile");
		}
	});

	const signIn = (email: string, password: string) => {
		if (!email || !password) {
			alert("Email and password are required");
			return;
		}

		signInMutation({ email, password });
	};

	// create mutation for sign out
	const { mutate: signOutMutation } = useMutation({
		mutationFn: async () => {
			try {
				const response = await axios.post(
					`${import.meta.env.VITE_BACKEND_URL}/api/sign-out`,
					{},
					{
						withCredentials: true
					}
				);

				return response;
			} catch (error) {
				console.error(error);
			}
		},
		onSuccess: () => {
			navigate("/");

			queryClient.invalidateQueries({ queryKey: ["currentUser"] });
		}
	});

	const signOut = () => {
		signOutMutation();
	};

	const { mutate: twoFaSetupMutation } = useMutation({
		mutationFn: async () => {
			try {
				const response = await axios.get(
					`${import.meta.env.VITE_BACKEND_URL}/api/2fa/setup`,
					{
						withCredentials: true
					}
				);

				return response;
			} catch (error) {
				console.error(error);
			}
		}
	});

	const twoFaSetup = () => {
		twoFaSetupMutation();
	};

	const { mutate: twoFaVerifyMutation } = useMutation({
		mutationFn: async (code: string) => {
			try {
				const response = await axios.post(
					`${import.meta.env.VITE_BACKEND_URL}/api/2fa/verify`,
					{ code },
					{
						withCredentials: true
					}
				);

				return response;
			} catch (error) {
				console.error(error);
			}
		}
		// onSuccess: () => {
		// 	navigate("/profile");
		// }
	});

	const twoFaVerify = (code: string) => {
		if (!code) {
			alert("2FA code is required");
			return;
		}

		twoFaVerifyMutation(code);
	};

	const { mutate: resetTwoFaMutation } = useMutation({
		mutationFn: async () => {
			try {
				const response = await axios.post(
					`${import.meta.env.VITE_BACKEND_URL}/api/2fa/reset`,
					{},
					{
						withCredentials: true
					}
				);

				return response;
			} catch (error) {
				console.error(error);
			}
		}
	});

	const resetTwoFa = () => {
		resetTwoFaMutation();
	};

	return {
		handleGoogleSignIn,
		signUp,
		signIn,
		signOut,
		twoFaSetup,
		twoFaVerify,
		resetTwoFa
	};
}
