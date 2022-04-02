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
			<Heading size="xl" textAlign="center">
				{county}, {state}
				<Badge ml="0.5em" fontSize="xl" variant="solid" colorScheme={color}>
					{color}
				</Badge>
			</Heading>
			<Flex justify="space-around" my="1em">
				<Stat textAlign="center">
					<StatLabel>Cases per 100K</StatLabel>
					<StatNumber>
						{casesPer100K.value.toLocaleString("en-US", {
							maximumFractionDigits: 0,
						})}
					</StatNumber>
					<StatHelpText>{formatDate(casesPer100K.date)}</StatHelpText>
				</Stat>
				{testPositivityRate != null && (
					<Stat textAlign="center">
						<StatLabel>Test positive rate</StatLabel>
						<StatNumber>
							{testPositivityRate.value.toLocaleString("en-US", {
								style: "percent",
								maximumFractionDigits: 1,
							})}
						</StatNumber>
						<StatHelpText>{formatDate(testPositivityRate.date)}</StatHelpText>
					</Stat>
				)}
			</Flex>
			<Advice color={color} />
		</Box>
	);
};
