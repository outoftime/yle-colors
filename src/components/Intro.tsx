import { Heading, Text, Link } from "@chakra-ui/react";

const UnderlinedLink = (props: React.ComponentProps<typeof Link>) => (
	<Link {...props} textDecoration="underline" />
);

export const Intro = () => {
	return (
		<>
			<Text my="0.5em">
				This is a tool to help you evaluate the current COVID risk in your
				locality and take precautions appropriate to the case rate. It’s based
				on the{" "}
				<UnderlinedLink
					isExternal
					href="https://yourlocalepidemiologist.substack.com/p/riding-the-waves-a-framework-for?s=r"
				>
					Riding the Waves
				</UnderlinedLink>{" "}
				post on the{" "}
				<UnderlinedLink
					isExternal
					href="https://yourlocalepidemiologist.substack.com"
				>
					Your Local Epidemiologist
				</UnderlinedLink>{" "}
				Substack. This site isn’t affiliated with Your Local Epidemiologist, but
				YLE’s work is used with permission.
			</Text>
			<Text my="0.5em">
				Data is derived from the{" "}
				<UnderlinedLink
					isExternal
					href="https://www.nytimes.com/interactive/2021/us/covid-cases.html"
				>
					New York Times
				</UnderlinedLink>{" "}
				and, in some cases, state health departments.
			</Text>
			<Text my="0.5em">
				This tool does not use the{" "}
				<UnderlinedLink
					isExternal
					href="https://www.cdc.gov/coronavirus/2019-ncov/your-health/covid-by-county.html"
				>
					CDC’s color-coding system
				</UnderlinedLink>
				, and may produce a very different color code for a given locality. YLE
				has an informative post,{" "}
				<UnderlinedLink isExternal href="New CDC (mask) guidance: My two cents">
					New CDC (mask) guidance: My two cents
				</UnderlinedLink>
				, which goes into detail about the CDC’s framework.
			</Text>
		</>
	);
};
