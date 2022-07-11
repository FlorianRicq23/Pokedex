import React, { useState, createContext } from 'react'

export const ColorThemeContext = createContext()

export const ColorThemeProvider = ({ children }) => {
  const [colorTheme, setColorTheme] = useState('red')

  return (
    <ColorThemeContext.Provider value={{ colorTheme, setColorTheme }}>
      {children}
    </ColorThemeContext.Provider>
  )
}