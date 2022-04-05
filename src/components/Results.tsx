import {
	Badge,
	Box,
	Flex,
	Heading,
	Stat,
	StatHelpText,
	StatLabel,
	StatNumber,
	Text,
} from "@chakra-ui/react";
import { useMemo } from "react";
import { Advice } from "./Advice";
import { getColor } from "../lib/getColor";

export type DataPoint = {
	value: number;
	date: Date;
};

export interface ResultsProps {
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
			<Heading>
				{county}
				<Badge ml="0.5em" fontSize="xl" variant="solid" colorScheme={color}>
					{color}
				</Badge>
			</Heading>
			<Flex my="1em" justifyItems="start">
				<Stat flex="0 1 auto" mr="2em">
					<StatLabel>Cases per 100K</StatLabel>
					<StatNumber>
						{casesPer100K.value.toLocaleString("en-US", {
							maximumFractionDigits: 0,
						})}
					</StatNumber>
					<StatHelpText>
						{formatDate(casesPer100K.date)}
						<br />
						7-day total
					</StatHelpText>
				</Stat>
				{testPositivityRate != null && (
					<Stat flex="0 1 auto">
						<StatLabel>Test positive rate</StatLabel>
						<StatNumber>
							{testPositivityRate.value.toLocaleString("en-US", {
								style: "percent",
								maximumFractionDigits: 1,
							})}
						</StatNumber>
						<StatHelpText>
							{formatDate(testPositivityRate.date)}
							<br />
							7-day average
						</StatHelpText>
					</Stat>
				)}
			</Flex>
			<Advice color={color} />
		</Box>
	);
};
