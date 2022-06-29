import styled from 'styled-components'
import { useParams } from 'react-router-dom'
import { useQuery } from 'react-query'
import { useEffect } from 'react'
import PaginationPokemon from '../../components/PaginationPokemon'
import { Spinner, Center } from '@chakra-ui/react'


const PokemonWrapper2 = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 10px;
  margin: 0 90px;
  background-color: #f9f9fc;
  margin-bottom: 50px;
`

const PokemonWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 15px;
  align-items: space-between;
  justify-items: left;
`

const PokemonContainer = styled.div`
  padding: 20px;
  margin: 0 90px;
  background-color: #f9f9fc;
  margin-bottom: 50px;
  border-radius: 10px;
`

const NameWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  height: 100px;
`
const Name = styled.h1`
  font-size: 32px;
  margin: 0;
  font-weight: 500;
`
const Id = styled.span`
  margin-left: 15px;
  color: #8186a0;
  font-size: 32px;
`

const Picture = styled.img`
  height: 90%;
  width: 90%;
  max-width:500px;
  margin-left:auto;
  margin-right:auto;
`

function Pokemon() {
  const { id: query } = useParams()

  const { data, isLoading, error } = useQuery(
    `pokemon${query}`,
    async () => {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${query}`)
      const data = await response.json()
      return data
    }
  )

  useEffect(() => {
		document.title = `${data?.name} | Pokedex`
	})

  if (error) {
    return <span>Oups il y a eu un problème</span>
  }

  return (
    <div>
      {isLoading ? (
        <Center>
        <Spinner
        thickness="4px"
        speed="0.65s"
        emptyColor="gray.200"
        color="blue.500"
        size="xl"
        textAlign='center'
      />
      </Center>
        
      ) : (
        <div>
          <PokemonContainer>
            <PaginationPokemon key={`${data.id}`} id={data.id} />
            <NameWrapper>
              <Name>{data.name}</Name>
              <Id>#{data.id}</Id>
            </NameWrapper>
            <PokemonWrapper>
              <Picture
                src={data.sprites.other.dream_world.front_default}
                alt={data.name}
              />
            </PokemonWrapper>
          </PokemonContainer>
          
        </div>
      )}
    </div>
  )
}

export default Pokemon
