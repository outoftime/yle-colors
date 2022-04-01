import { Badge, Box, Flex, Heading, Text } from "@chakra-ui/react";
import { useMemo } from "react";
import { Advice } from "./Advice";
import { getColor } from "./getColor";

export type DataPoint = {
	value: number;
	date: Date;
};

export interface ResultsProps {
	state: string;
	county: string;
	casesPer100K: DataPoint;
	testPositivityRate?: DataPoint;
}

const formatDate = (date: Date) =>
	date.toLocaleDateString("en-US", {
		weekday: "long",
		month: "long",
		day: "numeric",
	});

export const Results = ({
	state,
	county,
	casesPer100K,
	testPositivityRate,
}: ResultsProps) => {
	const color = useMemo(
		() => getColor(casesPer100K.value, testPositivityRate?.value),
		[testPositivityRate, casesPer100K],
	);

	return (
		<Box>
			<Heading size="xl">
				{county}, {state}
				<Badge ml="0.5em" fontSize="xl" variant="solid" colorScheme={color}>
					{color}
				</Badge>
			</Heading>
			<Flex>
				<Box>
					<Text>Cases per 100K</Text>
					<Text>
						{casesPer100K.value.toLocaleString("en-US", {
							maximumFractionDigits: 0,
						})}
					</Text>
					<Text>{formatDate(casesPer100K.date)}</Text>
				</Box>
				{testPositivityRate != null && (
					<Box>
						<Text>Test positive rate</Text>
						<Text>
							{testPositivityRate.value.toLocaleString("en-US", {
								style: "percent",
								maximumFractionDigits: 1,
							})}
						</Text>
						<Text>{formatDate(testPositivityRate.date)}</Text>
					</Box>
				)}
			</Flex>
			<Advice color={color} />
		</Box>
	);
};
