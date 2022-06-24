import { createGlobalStyle } from 'styled-components'

const StyledGlobalStyle = createGlobalStyle`
    * {
      font-family: Optima, Helvetica, sans-serif;
    }

    a {
      text-decoration: none;
    }

    .containerGlobal {
      min-height: 100%;
      max-width: 72rem;
      margin-left:auto;
      margin-right:auto;
    }
`

function GlobalStyle() {
  return <StyledGlobalStyle />
}

export default GlobalStyle
