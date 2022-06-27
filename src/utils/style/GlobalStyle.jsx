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
    .pagination {
      display: flex;
      align-items: center;
      justify-content: center;
    }
    
    .paginationItem {
      background: #fff;
      border: 2px solid #666;
      padding: 10px 15px;
      border-radius: 50%;
      height: 45px;
      width: 45px;
      position: relative;
      margin: 0 5px;
      cursor: pointer;
    }
    
    .paginationItem span {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
    
    .first,
    .last,
    .prev,
    .next {
      background: #fff;
      border: none;
      padding: 10px;
      color: blue;
      box-shadow: 0 0 3px rgba(0, 0, 0, 0.4);
      margin: 0 10px;
      cursor: pointer;
    }
    
    .paginationItem.active {
      border: 1px solid #888;
      color: #888;
      pointer-events: none;
    }
    
    .first.disabled,
    .last.disabled,
    .prev.disabled,
    .next.disabled {
      pointer-events: none;
      box-shadow: none;
      color: #999;
    }
`

function GlobalStyle() {
  return <StyledGlobalStyle />
}

export default GlobalStyle
