import { Select } from "@chakra-ui/react";

export interface CountySelectProps {
	counties: string[];
	currentCounty: string | undefined;
	setCurrentCounty: (county: string) => void;
}

export const CountySelect = ({
	counties,
	currentCounty,
	setCurrentCounty,
}: CountySelectProps) => (
	<Select
		placeholder="Choose your county"
		value={currentCounty}
		onChange={(e) => setCurrentCounty(e.target.value)}
	>
		{counties.sort().map((county) => (
			<option key={county} value={county}>
				{county}
			</option>
		))}
	</Select>
);
