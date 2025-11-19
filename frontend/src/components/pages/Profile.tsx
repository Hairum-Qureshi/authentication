import { useCurrentUser } from "../../hooks/useCurrentUser";
import Loading from "../Loading";

export default function Profile() {
	const { data: currUserData } = useCurrentUser();

	if (!currUserData) {
		return <Loading />;
	}
	return <div>{JSON.stringify(currUserData, null, 2)}</div>;
}
