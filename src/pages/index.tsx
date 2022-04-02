import type { NextPage } from "next";
import { Breadcrumbs } from "../components/Breadcrumbs";
import { Intro } from "../components/Intro";
import { NavigationList } from "../components/NavigationList";
import { useStates } from "../hooks/api-data";
import { Divider, Text } from "@chakra-ui/react";
import Head from "next/head";

const Home: NextPage = () => {
	const { states: states, isLoading, isError, error } = useStates();
	if (isLoading) {
		return <div>Loading…</div>;
	}
	if (isError) {
		console.error(error);
		return <div>Error!</div>;
	}

	return (
		<>
			<Head>
				<title>Your Local COVID Precautions</title>
			</Head>
			<Breadcrumbs items={[{ label: "Home" }]} />
			<Intro />
			<Divider my="5" />
			<Text>Choose your state to get started:</Text>
			<NavigationList
				items={states!.map((state) => ({
					label: state,
					path: `/${state.replace(" ", "-")}`,
				}))}
			/>
		</>
	);
};

export default Home;
