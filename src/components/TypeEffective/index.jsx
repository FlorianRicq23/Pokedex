import colors from '../../utils/style/colors'
import styled from 'styled-components'
import { useQuery } from 'react-query'
import Type from '../Type'
import { Loader } from '../../utils/style/Atoms'

const CardType = styled.div`
  color: #f9f9fc;
  font-size: 14px;
  padding: 3px;
  width: 90px;
  text-align: center;
  border-radius: 30px;
`

const ContainerType = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`

const WrapperType = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 15px;
  align-items: center;
  justify-items: center;
`

const Name = styled.h3`
  color: white;
`

const LoaderWrapper = styled.div`
  display: flex;
  justify-content: center;
`
function TypeEffective({ type }) {
  const { data, isLoading, error } = useQuery(
    // on utilise un tableau pour identifier la requête
    // on inclut l'Id du freelance dans ce tableau
    ['type', type],
    async () => {
      const response = await fetch(
        `https://api.pikaserve.xyz/types/${type}`
      )
      const data = await response.json()
      return data
    }
  )
  const dataTypes = data?.effective

  return (
    <div>
      {isLoading ? (
        <LoaderWrapper>
          <Loader data-testid="loader" />
        </LoaderWrapper>
      ) : (
        <ContainerType>
          <Name>Efficace contre :</Name>
          <WrapperType>
            {dataTypes.map((type, index) => (
              <Type key={`${type}`} type={type} />
            ))}
          </WrapperType>
        </ContainerType>
      )}
    </div>
  )
}

export default TypeEffective
