import styled from 'styled-components'
import Type from '../Type'
import { Link } from 'react-router-dom'
import { useQuery } from 'react-query'
import { Spinner } from '@chakra-ui/react'


const CarteStyle = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  padding: 15px;
  background-color: #f9f9fc;
  border-radius: 30px;
  width: 250px;
  height: 300px;
  &:hover {
    cursor: pointer;
    background-color: #f2f2f5;
  }
`

const CarteId = styled.span`
  color: #5843e4;
  font-size: 18px;
  font-weight: normal;
  padding-left: 15px;
  align-self: center;
`

const CarteName = styled.span`
  color: #000000;
  font-size: 26px;
  font-weight: normal;
  align-self: center;
  font-family: "PokemonBold";
`

const CarteImg = styled.img`
  height: 150px;
  width: 150px;
  align-self: center;
  //border-radius: 50%;
`

const TypeWrapper = styled.div`
  display: grid;
  grid-gap: 10px;
  grid-template-columns: repeat(2, 1fr);
  align-items: center;
  justify-items: center;
`

function Carte({ dataN }) {
  const { data, isLoading, error } = useQuery(`pokemon${dataN}`, async () => {
    //const response = await fetch('https://api.pikaserve.xyz/pokemon/all')
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${dataN}`)
    const data = await response.json()
    return data
  })

  if (error) {
    return <span>Oups il y a eu un problème</span>
  }
  
  return (
    <div>
      {isLoading ? (
        <Spinner
          thickness="4px"
          speed="0.65s"
          emptyColor="gray.200"
          color="blue.500"
          size="xl"
        />
      ) : (
    <Link key={`pokemons-${data.id}`} to={`/pokemon/${data.name}`}>
      <CarteStyle>
        <CarteId>No.{data.id}</CarteId>
        <CarteImg src={data.sprites.other.dream_world.front_default} alt="pokemon img" />
        <CarteName>{data.name}</CarteName>
        <TypeWrapper>
          {data.types.map((item, index) => (
            <Type key={`${index}`} type={item.type.name} />
          ))}
        </TypeWrapper>
      </CarteStyle>
    </Link>
      )}
      </div>
  )

}

export default Carte
