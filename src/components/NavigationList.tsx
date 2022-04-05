import { Link, List, ListItem, Wrap, WrapItem } from "@chakra-ui/react";
import { ChevronRightIcon } from "@chakra-ui/icons";
import NextLink from "next/link";

export interface NavigationListProps {
	items: {
		label: string;
		path: string;
	}[];
}

export const NavigationList = ({ items }: NavigationListProps) => (
	<List>
		{items!.map(({ label, path }) => (
			<ListItem key={path} my="5">
				<NextLink href={path} passHref>
					<Link fontSize="xl">{label}</Link>
				</NextLink>
				<ChevronRightIcon color="gray.500" />
			</ListItem>
		))}
	</List>
);
