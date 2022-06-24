import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import { Loader } from '../../utils/style/Atoms'
import { useQuery } from 'react-query'

const PaginationWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  height: 100px;
`

const PaginationPrev = styled(Link)`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  height: 100px;
  margin: 0;
  width: 49%;
  background-color:#8186a0;
  &:hover {
    cursor: pointer;
    background-color: #30a7d7;
  }
`

const PaginationNext = styled(Link)`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  height: 100px;
  margin: 0;
  width: 49%;
  background-color:#8186a0;
  &:hover {
    cursor: pointer;
    background-color: #30a7d7;
  }
`
const Name = styled.h1`
  font-size: 32px;
  margin: 0;
  font-weight: 500;
  color:white;
`
const Id = styled.span`
  margin: 15px;
  color: white;
  font-size: 32px;
`

const LoaderWrapper = styled.div`
  display: flex;
  justify-content: center;
`

function PaginationPokemon({ id }) {
  const [idPrev, setIdPrev] = useState()
  const [idNext, setIdNext] = useState()
  const [isLoadingRedux, setIsLoadingRedux] = useState(true)

  const { data, isLoading, error } = useQuery('pokemons', async () => {
    const response = await fetch('https://api.pikaserve.xyz/pokemon/all')
    const data = await response.json()
    return data
  })

  if (error) {
    return <span>Oups il y a eu un problème</span>
  }

  if (!isLoading && isLoadingRedux) {
    const dataLength = data.length
    setIdPrev(id === 1 ? dataLength : id - 1)
    setIdNext(id === dataLength ? 1 : id + 1)
    setIsLoadingRedux(false)
  }

  

  return (
    <div>
      {isLoading || isLoadingRedux ? (
        <LoaderWrapper>
          <Loader data-testid="loader" />
        </LoaderWrapper>
      ) : (
        <PaginationWrapper>
          <PaginationPrev key={`pokemon-${idPrev}`} to={`/pokemon/${idPrev}`}>
            
            <Id>⬅️ #{idPrev}</Id>
            <Name>{data[idPrev-1].name.french}</Name>
          </PaginationPrev>
          <PaginationNext key={`pokemon-${idNext}`} to={`/pokemon/${idNext}`}>
            <Name>{data[idNext-1].name.french}</Name>
            <Id>#{idNext} ➡️</Id>
          </PaginationNext>
        </PaginationWrapper>
      )}
    </div>
  )
}

export default PaginationPokemon
