import { Flex, Spacer } from '@chakra-ui/react'
import ToggleLightDark from './ToggleLightDark'

const Navbar = () => {
	return (
		<Flex width={'100%'} padding={4}>
			<Spacer />
			<ToggleLightDark />
		</Flex>
	)
}

export default Navbar
