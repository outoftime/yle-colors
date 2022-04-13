import type { NextPage } from "next";
import { Breadcrumbs } from "../components/Breadcrumbs";
import { Intro } from "../components/Intro";
import { NavigationList } from "../components/NavigationList";
import { useStates } from "../hooks/api-data";
import { Divider, Heading, Text } from "@chakra-ui/react";
import Head from "next/head";
import { stateRoute } from "../lib/routes";
import { LoadingSpinner } from "../components/LoadingSpinner";

const Home: NextPage = () => {
	const { data, status } = useStates();
	if (status !== "success") {
		return <LoadingSpinner />;
	}

	const { states } = data;

	return (
		<>
			<Head>
				<title>Your Local COVID Precautions</title>
			</Head>
			<Breadcrumbs items={[{ label: "Home" }]} />
			<Heading textAlign="center" size="lg">
				Your Local Covid Precautions
			</Heading>
			<Intro />
			<Divider my="5" />
			<Text>Choose your state to get started:</Text>
			<NavigationList
				items={states.map(({ name, slug }) => ({
					label: name,
					path: stateRoute({ stateSlug: slug }),
				}))}
			/>
		</>
	);
};

export default Home;
