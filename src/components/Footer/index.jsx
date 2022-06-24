import styled from 'styled-components'
import colors from '../../utils/style/colors'
import Logo from '../../assets/logo_pokemon.png'

const FooterLogo = styled.img`
  height: 30px;
  display: right;
`

const FooterContainer = styled.footer`
  padding: 30px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  color:  ${({ theme }) => (theme === 'light' ? colors.policeThemeClair : colors.policeThemeSombre)};
  background-color:  ${({ theme }) => (theme === 'light' ? colors.backgroundThemeClair : colors.backgroundThemeSombre)};
`

function Footer() {
  

  return (
    <FooterContainer>
      <p>Designed and built by Florian Ricq</p>
      <p>florian.ricq@gmail.com</p>
      <FooterLogo src={Logo} />
    </FooterContainer>
  )
}

export default Footer
