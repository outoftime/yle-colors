import { Center, Wrap, WrapItem } from "@chakra-ui/react";
import Link from "next/link";

export interface NavigationListProps {
	items: {
		label: string;
		path: string;
	}[];
}

export const NavigationList = ({ items }: NavigationListProps) => (
	<Wrap justify="center">
		{items!.map(({ label, path }) => (
			<WrapItem key="state">
				<Link href={path} passHref>
					<Center
						fontSize="xl"
						fontWeight="medium"
						w="18em"
						h="4em"
						bg="gray.200"
						as="a"
					>
						{label}
					</Center>
				</Link>
			</WrapItem>
		))}
	</Wrap>
);
