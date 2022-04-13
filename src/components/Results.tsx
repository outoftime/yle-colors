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

export interface ResultsProps {
	date: Date;
	county: string;
	weeklyNewCasesPer100k?: number;
	testPositivityRatio?: number;
	vaccinationsCompletedRatio?: number;
}

const formatDate = (date: Date) =>
	date.toLocaleDateString("en-US", {
		weekday: "long",
		month: "long",
		day: "numeric",
	});

export const Results = ({
	date,
	county,
	weeklyNewCasesPer100k,
	testPositivityRatio,
	vaccinationsCompletedRatio,
}: ResultsProps) => {
	const color = useMemo(
		() =>
			getColor({
				weeklyNewCasesPer100k,
				testPositivityRatio,
				vaccinationsCompletedRatio,
			}),
		[testPositivityRatio, weeklyNewCasesPer100k, vaccinationsCompletedRatio],
	);

	return (
		<Box>
			<Heading>
				{county}
				<Badge ml="0.5em" fontSize="xl" variant="solid" colorScheme={color}>
					{color}
				</Badge>
			</Heading>
			<Flex my="1em" justifyItems="start" wrap="wrap">
				{weeklyNewCasesPer100k != null && (
					<Stat flex="0 0 auto" mr="2em">
						<StatLabel>Cases per 100K</StatLabel>
						<StatNumber>
							{weeklyNewCasesPer100k.toLocaleString("en-US", {
								maximumFractionDigits: 0,
							})}
						</StatNumber>
						<StatHelpText>
							{formatDate(date)}
							<br />
							7-day total
						</StatHelpText>
					</Stat>
				)}
				{testPositivityRatio != null && (
					<Stat flex="0 0 auto" mr="2em">
						<StatLabel>Test positivity rate</StatLabel>
						<StatNumber>
							{testPositivityRatio.toLocaleString("en-US", {
								style: "percent",
								maximumFractionDigits: 1,
							})}
						</StatNumber>
						<StatHelpText>
							{formatDate(date)}
							<br />
							7-day average
						</StatHelpText>
					</Stat>
				)}
				{vaccinationsCompletedRatio != null && (
					<Stat flex="0 0 auto">
						<StatLabel>Vaccination rate</StatLabel>
						<StatNumber>
							{vaccinationsCompletedRatio.toLocaleString("en-US", {
								style: "percent",
								maximumFractionDigits: 0,
							})}
						</StatNumber>
						<StatHelpText>
							{formatDate(date)}
							<br />
							Primary series
						</StatHelpText>
					</Stat>
				)}
			</Flex>
			<Advice color={color} />
		</Box>
	);
};
