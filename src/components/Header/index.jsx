import styled from 'styled-components'
//import { Link } from 'react-router-dom'
import LogoUrl from '../../assets/logo_pokemon.png'
import { StyledLink } from '../../utils/style/Atoms'
import { useState } from 'react'
import colors from '../../utils/style/colors'
import {
  Box,
  Flex,
  HStack,
  useColorModeValue,
  Stack,
  Link,
  Image,
} from '@chakra-ui/react'

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

  return (
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
        <HStack spacing={8} alignItems={'center'}>
          <Image h={70} src={LogoUrl} alt="Logo" />
          <HStack as={'nav'} spacing={4} display={{ base: 'none', md: 'flex' }}>
            <Link
              px={2}
              py={1}
              rounded={'md'}
              _hover={{
                textDecoration: 'none',
                bg: useColorModeValue('gray.200', 'gray.700'),
              }}
              href={'/'}
            >
              Accueil
            </Link>
            <Link
              px={2}
              py={1}
              rounded={'md'}
              _hover={{
                textDecoration: 'none',
                bg: useColorModeValue('gray.200', 'gray.700'),
              }}
              href={'/pokemons'}
            >
              Pokemons
            </Link>
          </HStack>
        </HStack>
      </Flex>
    </Box>
  )

  /* return (
      <NavContainer>
      <Link to="/">
        <HomeLogo src={Logo} />
      </Link>
      <div>
        <StyledLink to="/">
          Accueil
        </StyledLink>
        <StyledLink to="/pokemons">
          Pokemons
        </StyledLink>
      </div>
    </NavContainer>
  ) */
}

export default Header
