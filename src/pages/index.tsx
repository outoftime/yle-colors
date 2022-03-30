import { Center, Flex, Wrap, WrapItem } from "@chakra-ui/react";
import type { NextPage } from "next";
import Link from "next/link";
import { useStates } from "../hooks/api-data";

const Home: NextPage = () => {
	const { states, isLoading, isError, error } = useStates();
	if (isLoading) {
		return <div>Loading…</div>;
	}
	if (isError) {
		console.error(error);
		return <div>Error!</div>;
	}

	return (
		<Wrap justify="center">
			{states!.map((state) => (
				<WrapItem key="state">
					<Link href={`/${state}`} passHref>
						<Center
							fontSize="xl"
							fontWeight="medium"
							w="18em"
							h="4em"
							bg="gray.200"
							as="a"
						>
							{state}
						</Center>
					</Link>
				</WrapItem>
			))}
		</Wrap>
	);
};

export default Home;
