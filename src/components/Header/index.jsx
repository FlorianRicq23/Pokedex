import styled from 'styled-components'
import { Link } from 'react-router-dom'
import Logo from '../../assets/logo_pokemon.png'
import { StyledLink } from '../../utils/style/Atoms'
import colors from '../../utils/style/colors'

const HomeLogo = styled.img`
  height: 70px;
`

const NavContainer = styled.nav`
  padding: 30px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  color:  ${({ theme }) => (theme === 'light' ? colors.policeThemeClair : colors.policeThemeSombre)};
  background-color:  ${({ theme }) => (theme === 'light' ? colors.backgroundThemeClair : colors.backgroundThemeSombre)};
`

function Header() {
    return (
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
  )
}

export default Header
