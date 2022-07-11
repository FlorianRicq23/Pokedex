import { useContext } from 'react'
import { ColorThemeContext } from '../context'

export function useColorTheme() {
  const { colorTheme, setColorTheme } = useContext(ColorThemeContext)
  return { colorTheme, setColorTheme }
}