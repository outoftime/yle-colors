import { Badge, Box, Heading, Text } from "@chakra-ui/react";
import { useMemo } from "react";
import { Advice } from "./Advice";
import { getColor } from "./getColor";
import { Populations } from "./usePopulations";
import { TestData } from "./useTestData";

export interface ResultsProps {
	county: string;
	populations: Populations;
	testData: TestData;
}

export const Results = ({ county, populations, testData }: ResultsProps) => {
	const { positivesLast7Days, testsLast7Days, endDate } = testData;

	const population = populations[county];

	const positiveRate = positivesLast7Days / testsLast7Days;
	const casesPer100K = positivesLast7Days / (population / 100000);

	const color = useMemo(
		() => getColor(positiveRate, casesPer100K),
		[positiveRate, casesPer100K],
	);

	return (
		<Box>
			<Heading size="xl">
				{county}
				<Badge ml="0.5em" fontSize="xl" variant="solid" colorScheme={color}>
					{color}
				</Badge>
			</Heading>
			<Text fontStyle="italic">
				Data as of{" "}
				{endDate.toLocaleDateString("en-US", {
					weekday: "long",
					month: "long",
					day: "numeric",
				})}
			</Text>
			<Text>
				Test positive rate:{" "}
				{positiveRate.toLocaleString("en-US", {
					style: "percent",
					maximumFractionDigits: 1,
				})}
			</Text>
			<Text>
				Cases per 100K:{" "}
				{casesPer100K.toLocaleString("en-US", { maximumFractionDigits: 0 })}
			</Text>
			<Advice color={color} />
		</Box>
	);
};
