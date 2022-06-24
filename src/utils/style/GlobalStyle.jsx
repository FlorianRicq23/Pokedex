import { createGlobalStyle } from 'styled-components'

const StyledGlobalStyle = createGlobalStyle`
    * {
      font-family: Optima, Helvetica, sans-serif;
    }

    a {
      text-decoration: none;
    }   
`

function GlobalStyle() {
  return <StyledGlobalStyle />
}

export default GlobalStyle
