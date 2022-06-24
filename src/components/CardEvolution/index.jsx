import PropTypes from 'prop-types'
import styled from 'styled-components'
import Type from '../Type'
import { Loader } from '../../utils/style/Atoms'
import { Link } from 'react-router-dom'
import { useQuery } from 'react-query'

const CardStyle = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  padding: 15px;
  width: 200px;
  height: 250px;
  &:hover {
    cursor: pointer;
  }
`

const CardId = styled.span`
  color: #8186a0;
  font-size: 16px;
  font-weight: normal;
  align-self: center;
`

const CardName = styled.span`
  color: white;
  font-size: 22px;
  font-weight: normal;
  align-self: center;
`

const CardImg = styled.img`
  height: 120px;
  width: 120px;
  align-self: center;
  border-radius: 50%;
  border: solid white 2px;
`

const LoaderWrapper = styled.div`
  display: flex;
  justify-content: center;
`

const ImgEvolution = styled.img`
  height:90px;
  background-color:red;
  align-self: center;
`


const TypeWrapper = styled.div`
    display: grid;
    grid-gap:10px;
    grid-template-columns: repeat(2, 1fr);
    align-items: center;
    justify-items: center;
`

function CardEvolution({ id }) {
  const { data, isLoading, error } = useQuery(
    // on utilise un tableau pour identifier la requête
    // on inclut l'Id du freelance dans ce tableau
    ['pokemon', id],
    async () => {
      const response = await fetch(
        `https://api.pikaserve.xyz/pokemon/${id}`
      )
      const data = await response.json()
      return data
    }
  )

  if (error) {
    return <span>Oups il y a eu un problème</span>
  }
  return (
    <div>
      {isLoading ? (
        <LoaderWrapper>
          <Loader data-testid="loader" />
        </LoaderWrapper>
      ) : (
        <Link
          key={`pokemons-${data.id}`}
          to={`/pokemon/${data.id}`}
        >
          <CardStyle>
            <CardImg src={data.image.hires} alt="pokemon img" />
            <CardName>
              {data.name.french} <CardId>#{data.id}</CardId>
            </CardName>

            <TypeWrapper>
                    {data.type.map((type, index) => (
                        <Type key={`${type}`} type={type} />
                      ))}
                  
                </TypeWrapper>          </CardStyle>

        </Link>
      )}
    </div>
  )
}

CardEvolution.propTypes = {
  id: PropTypes.string.isRequired,
}

CardEvolution.defaultProps = {
  id: '',
}
export default CardEvolution
