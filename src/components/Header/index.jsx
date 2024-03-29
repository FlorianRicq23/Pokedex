import { Link } from 'react-router-dom'
import LogoUrl from '../../assets/logo_pokemon.png'
import colors from '../../utils/style/colors'
import { useColorTheme } from '../../utils/hooks'
import {
  Box,
  Flex,
  IconButton,
  Text,
  useDisclosure,
  Stack,
  Image,
} from '@chakra-ui/react'
import { CloseIcon, HamburgerIcon } from '@chakra-ui/icons'

function Header() {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { colorTheme } = useColorTheme()  

  return (
    <>
      <Box className={colorTheme} color={colors.white} px={4}>
        <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
          <IconButton size={'md'} bg='#4F4C6B' icon={isOpen ? <CloseIcon /> : <HamburgerIcon />} aria-label={'Open Menu'} display={{ md: 'none' }} onClick={isOpen ? onClose : onOpen}/>
          <Image h="50px" src={LogoUrl} alt="Logo" />
            <Box as={'nav'}>
              <Link to="/">
                <Text display={{ base: 'none', md: 'flex' }} fontSize={22} px={2} py={1} rounded={'md'}
                  _hover={{ textDecoration: 'none', bg: colors.backgroundThemeSombre,}} >
                  Home
                </Text>
              </Link>
            </Box>
        </Flex>

        {isOpen ? (
          <Box pb={4} display={{ md: 'none' }}>
            <Stack as={'nav'} spacing={4}>
              <Link to="/">
                <Text
                  px={2}
                  py={1}
                  rounded={'md'}
                  bg='#4F4C6B'
                  _hover={{
                    textDecoration: 'none',
                    bg: colors.backgroundThemeSombre,
                    color: colors.policeThemeSombre,
                  }}
                >
                  Home
                </Text>
              </Link>
            </Stack>
          </Box>
        ) : null}
      </Box>
    </>
  )
}

export default Header
