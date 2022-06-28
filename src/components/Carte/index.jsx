import styled from 'styled-components'
import Type from '../Type'
import { Link } from 'react-router-dom'


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

function Carte({ data }) {
  return (
    <Link key={`pokemons-${data.id}`} to={`/pokemon/${data.id}`}>
      <CarteStyle>
        <CarteId>No.{data.id}</CarteId>
        <CarteImg src={data.image.hires} alt="pokemon img" />
        <CarteName>{data.name.french}</CarteName>
        <TypeWrapper>
          {data.type.map((type, index) => (
            <Type key={`${type}`} type={type} />
          ))}
        </TypeWrapper>
      </CarteStyle>
    </Link>
  )
}

export default Carte
