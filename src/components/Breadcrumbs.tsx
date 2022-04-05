import { ChevronRightIcon } from "@chakra-ui/icons";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from "@chakra-ui/react";
import Link from "next/link";

type Item = {
	label: string;
	href?: string;
};

export interface BreadcrumbsProps {
	items: Item[];
}

export const Breadcrumbs = ({ items }: BreadcrumbsProps) => (
	<Breadcrumb
		padding="1"
		my="2"
		borderBottomWidth="1px"
		borderBottomColor="gray.100"
		borderColor="gray.100"
		separator={<ChevronRightIcon color="gray.500" />}
	>
		{items.map(({ label, href }) =>
			href == null ? (
				<BreadcrumbItem key={label} isCurrentPage>
					<BreadcrumbLink isCurrentPage>{label}</BreadcrumbLink>
				</BreadcrumbItem>
			) : (
				<BreadcrumbItem key={label}>
					<BreadcrumbLink href={href} as={Link}>
						{label}
					</BreadcrumbLink>
				</BreadcrumbItem>
			),
		)}
	</Breadcrumb>
);
