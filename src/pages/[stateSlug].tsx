import { NextPage } from "next";
import { useRouter } from "next/router";
import { homeRoute } from "../lib/routes";
import { LoadingSpinner } from "../components/LoadingSpinner";
import Link from "next/link";

const StatePage = () => {
	return (
		<p>
			This link no longer works. Please start from the{" "}
			<Link href={homeRoute()}>home page</Link>
		</p>
	);
};

const RoutedStatePage: NextPage = () => {
	const router = useRouter();
	const { stateSlug } = router.query;

	if (typeof stateSlug != "string") {
		return <LoadingSpinner />;
	}

	return <StatePage />;
};

export default RoutedStatePage;
