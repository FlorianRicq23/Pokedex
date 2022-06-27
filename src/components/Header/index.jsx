import styled from 'styled-components'
import { Link } from 'react-router-dom'
import LogoUrl from '../../assets/logo_pokemon.png'
import { useState } from 'react'
import StyledLink from '../../utils/style/GlobalStyle'
import colors from '../../utils/style/colors'
import {
  Box,
  Flex,
  Avatar,
  HStack,
  IconButton,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Text,
  MenuDivider,
  useDisclosure,
  useColorModeValue,
  Stack,
  Image,
} from '@chakra-ui/react'
import { CloseButton, HamburgerIcon } from '@chakra-ui/react'

const HomeLogo = styled.img`
  height: 70px;
`

const NavContainer = styled.nav`
  padding: 30px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  color: ${({ theme }) =>
    theme === 'light' ? colors.policeThemeClair : colors.policeThemeSombre};
  background-color: ${({ theme }) =>
    theme === 'light'
      ? colors.backgroundThemeClair
      : colors.backgroundThemeSombre};
`

function Header() {
  const [theme, setTheme] = useState('non')
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <>
      <Box
        bg={
          theme === 'light'
            ? colors.backgroundThemeClair
            : colors.backgroundThemeSombre
        }
        color={
          theme === 'light' ? colors.policeThemeClair : colors.policeThemeSombre
        }
        px={4}
      >
        <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
          <IconButton
            size={'md'}
            icon={isOpen ? <CloseButton /> : <CloseButton />}
            aria-label={'Open Menu'}
            display={{ md: 'none' }}
            onClick={isOpen ? onClose : onOpen}
          />
          <HStack spacing={8} alignItems={'center'}>
            <Image h="40px" src={LogoUrl} alt="Logo" />
            
          </HStack>
          <Flex alignItems={'center'}>
          <HStack
              as={'nav'}
              spacing={4}
              display={{ base: 'none', md: 'flex' }}
            >
              <Link to="/">
                <Text
                  px={2}
                  py={1}
                  rounded={'md'}
                  _hover={{
                    textDecoration: 'none',
                    bg: colors.backgroundThemeSombre,
                  }}
                >
                  Accueil
                </Text>
              </Link>
              <Link to="/pokemons">
                <Text
                  px={2}
                  py={1}
                  rounded={'md'}
                  _hover={{
                    textDecoration: 'none',
                    bg: colors.backgroundThemeSombre,
                  }}
                >
                  Pokemons
                </Text>
              </Link>
            </HStack>
          </Flex>
        </Flex>

        {isOpen ? (
          <Box pb={4} display={{ md: 'none' }}>
            <Stack as={'nav'} spacing={4}>
              <Link to="/">
                <Text
                  px={2}
                  py={1}
                  rounded={'md'}
                  _hover={{
                    textDecoration: 'none',
                    bg: colors.backgroundThemeSombre,
                    color: colors.policeThemeSombre,
                  }}
                >
                  Accueil
                </Text>
              </Link>
              <Link to="/pokemons">
                <Text
                  px={2}
                  py={1}
                  rounded={'md'}
                  _hover={{
                    textDecoration: 'none',
                    bg: colors.backgroundThemeSombre,
                    color: colors.policeThemeSombre,
                  }}
                >
                  Pokemons
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
