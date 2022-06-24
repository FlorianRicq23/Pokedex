import styled from 'styled-components'
import { Loader } from '../../utils/style/Atoms'
import Carte from '../../components/Carte'
import colors from '../../utils/style/colors'
import { useState } from 'react'
import { useQuery } from 'react-query'

const PokemonsContainer2 = styled.div`
  > div .dataContainer {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(270px, 1fr));
    grid-gap: 30px;
    align-items: space-between;
    justify-items: center;
  }
`

const PokemonsContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(270px, 1fr));
    grid-gap: 30px;
    align-items: space-between;
    justify-items: center;
  
`

const InputContainer = styled.div`
  width: 80%;
  height: 50px;
  background-color: ${colors.dark};
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-left: auto;
  margin-right: auto;
  padding: 10px;
  margin-bottom: 20px;
`

const Input = styled.input`
  width: 50%;
`

const FiltreContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  background-color: red;
  color: white;
  border-radius: 10px;
  padding: 20px;
  padding-top: 0;
  width: 80%;
  margin-left: auto;
  margin-right: auto;
`
const FiltreClose = styled.span`
  align-self: flex-end;
  margin: 10px;
`

const TitleFiltre = styled.p`
  color: white;
  &:hover {
    cursor: pointer;
  }
`

const LoaderWrapper = styled.div`
  display: flex;
  justify-content: center;
`


function Pokemons() {
  const { data, isLoading, error } = useQuery('pokemons', async () => {
    const response = await fetch('https://api.pikaserve.xyz/pokemon/all')
    const data = await response.json()
    return data
  })

  const [foundPokemons, setFoundPokemons] = useState({})
  const [isLoadingRedux, setIsLoadingRedux] = useState(true)

  if (!isLoading && isLoadingRedux) {
    setFoundPokemons(data.slice(0,20))
    setIsLoadingRedux(false)
  }

  if (error) {
    return <span>Oups il y a eu un problème</span>
  }

  

  return (
    <div>
      {isLoading || isLoadingRedux ? (
        <LoaderWrapper>
          <Loader data-testid="loader" />
        </LoaderWrapper>
      ) : (
        <div>
          <PokemonsContainer>
            {foundPokemons.map((pokemon, index) => (
              <Carte key={index} data={pokemon}></Carte>
            ))}
          </PokemonsContainer>
        </div>
      )}
    </div>
  )
}

export default Pokemons
