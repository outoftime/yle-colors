import { Heading, Text, Link } from "@chakra-ui/react";

const UnderlinedLink = (props: React.ComponentProps<typeof Link>) => (
	<Link {...props} textDecoration="underline" />
);

export const Intro = () => {
	return (
		<>
			<Heading textAlign="center" size="lg">
				Your Local Covid Precautions
			</Heading>
			<Text>
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
			<Text>
				Data is derived from the{" "}
				<UnderlinedLink
					isExternal
					href="https://www.nytimes.com/interactive/2021/us/covid-cases.html"
				>
					New York Times
				</UnderlinedLink>{" "}
				and, in some cases, state health departments.
			</Text>
		</>
	);
};
