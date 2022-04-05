import { Center, Spinner } from "@chakra-ui/react";

export const LoadingSpinner = () => (
	<Center
		width="100vw"
		height="100vh"
		position="absolute"
		top="0"
		left="0"
		backgroundColor="white"
	>
		<Spinner size="xl" />
	</Center>
);
