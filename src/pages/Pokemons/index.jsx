import styled from 'styled-components'
import Carte from '../../components/Carte'
import colors from '../../utils/style/colors'
import { useState } from 'react'
import { useQuery } from 'react-query'
import TypesFilter from '../../components/TypesFilter'
import { Spinner, Input, Center } from '@chakra-ui/react'

const PokemonsContainer2 = styled.div`
  background: url('../../assets/items/pokeball-pattern.png') top left repeat;
  background-attachment: fixed;
  background-size: 900px;
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
  background-color: ${({ theme }) =>
    theme === 'light'
      ? colors.backgroundThemeClair
      : colors.backgroundThemeSombre};
  color: ${({ theme }) =>
    theme === 'light' ? colors.policeThemeClair : colors.policeThemeSombre};
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-left: auto;
  margin-right: auto;
  padding: 10px;
  margin-bottom: 20px;
`

const Inputt = styled.input`
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

function Pokemons() {
  /* const { data, isLoading, error } = useQuery(`listePokemons`, async () => {
    const response = await fetch('https://pokeapi.co/api/v2/pokemon/')
    const data = await response.json()
    return data
  }) */

  const [page, setPage] = useState(0)

  const fetchProjects = (page = 0) =>
    fetch(
      'https://pokeapi.co/api/v2/pokemon?offset=' + page * 20 + '&limit=20'
    ).then((res) => res.json())

  const { isLoading, isError, error, data, isFetching, isPreviousData } =
    useQuery(['listePokemons', page], () => fetchProjects(page), {
      keepPreviousData: true,
    })


  const [foundPokemons, setFoundPokemons] = useState({})
  const [isLoadingRedux, setIsLoadingRedux] = useState(true)
  const [query, setQuery] = useState('')
  const [activeTypes, setActiveTypes] = useState([])
  const [isOpenFilter, setIsOpenFilter] = useState(false)

  if (!isLoading && isLoadingRedux) {
    //setFoundPokemons(data)
    setFoundPokemons(data.results)
    setIsLoadingRedux(false)
  }

  if (error) {
    return <span>Oups il y a eu un problème</span>
  }

  function checkboxFilter() {
    if (activeTypes.length === 0) {
      setFoundPokemons(data.results)
    } else {
      const results = data.results.filter((pokemon) => {
        for (const key in activeTypes) {
          if (!pokemon.type.includes(activeTypes[key])) {
            return null
          }
        }
        return pokemon
      })
      setFoundPokemons(results)
    }
  }

  function filter(e) {
    const keyword = e.target.value
    setQuery(keyword)

    const results = data.results
      .filter((pokemon) => {
        if (keyword === '') {
          return pokemon
        } else if (
          pokemon.name.french.toLowerCase().includes(keyword.toLowerCase())
        ) {
          return pokemon
        } else if (pokemon.id.toString().includes(keyword)) {
          return pokemon
        }
      })
      .filter((pokemon) => {
        if (activeTypes.length === 0) {
          return pokemon
        } else {
          for (const key in activeTypes) {
            if (!pokemon.type.includes(activeTypes[key])) {
              return null
            }
          }
          return pokemon
        }
      })
    setFoundPokemons(results)
  }

  function handleSort(ordre) {
    if (ordre === 'numero-croissant') {
      setFoundPokemons([...foundPokemons].sort((a, b) => a.id - b.id))
    } else if (ordre === 'numero-decroissant') {
      setFoundPokemons([...foundPokemons].sort((a, b) => b.id - a.id))
    } else if (ordre === 'a-z') {
      setFoundPokemons(
        [...foundPokemons].sort((a, b) => {
          return a.name.french.localeCompare(b.name.french)
        })
      )
    } else if (ordre === 'z-a') {
      setFoundPokemons(
        [...foundPokemons].sort((a, b) => {
          return b.name.french.localeCompare(a.name.french)
        })
      )
    }
  }

  return (
    <div>
      {isLoading || isLoadingRedux ? (
        <Center>
          <Spinner
            thickness="4px"
            speed="0.65s"
            emptyColor="gray.200"
            color="blue.500"
            size="xl"
            textAlign="center"
          />
        </Center>
      ) : (
        <div>
          <InputContainer>
            <Input
              placeholder="Entrez un nom ou numéro"
              onChange={filter}
              width="50%"
              variant="filled"
            />
            <div>
              <TitleFiltre>
                Trier les resultats par :
                <select onChange={(e) => handleSort(e.target.value)}>
                  <option value="numero-croissant">Numéro croissant</option>
                  <option value="numero-decroissant">Numéro décroissant</option>
                  <option value="a-z">A - Z</option>
                  <option value="z-a">Z - A</option>
                </select>
              </TitleFiltre>
            </div>
            {isOpenFilter ? (
              <TitleFiltre onClick={() => setIsOpenFilter(false)}>
                Cacher les filtres
              </TitleFiltre>
            ) : (
              <TitleFiltre onClick={() => setIsOpenFilter(true)}>
                Afficher les filtres
              </TitleFiltre>
            )}
          </InputContainer>
          {isOpenFilter ? (
            <FiltreContainer>
              <FiltreClose onClick={() => setIsOpenFilter(false)}>
                Fermer
              </FiltreClose>
              <div>
                <TypesFilter
                  pokemonsList={data.results}
                  setActiveTypes={setActiveTypes}
                  activeTypes={activeTypes}
                  setFoundPokemons={setFoundPokemons}
                />
              </div>
            </FiltreContainer>
          ) : null}
          <PokemonsContainer>
            {data.results.map((pokemon, index) => (
              <Carte key={index} dataN={pokemon.name} />
            ))}
          </PokemonsContainer>
        </div>
      )}
      <div className="pagination">
      <button
        onClick={() => setPage((old) => Math.max(old - 1, 0))}
        className={`prev ${page+1 === 1 ? 'disabled' : ''}`}
        disabled={page === 0}
      >
        Previous Page
      </button>
      <button
        onClick={() => setPage(page-1)}
        className={`prev ${page+1 === 1 ? 'disabled' : ''}`}
        disabled={page === 0}
      >
        {page}
      </button>
      <span>Current Page: {page + 1}</span>
      <button
        onClick={() => setPage(page+2)}
        disabled={page === 1}
      >
        {page+2}
      </button>
      <button
        onClick={() => {
          if (!isPreviousData && data?.next) {
            setPage((old) => old + 1)
          }
        }}
        // Disable the Next Page button until we know a next page is available
        disabled={isPreviousData || !data?.next}
        className={`next ${page === isPreviousData || !data?.next ? 'disabled' : ''}`}
      >
        Next Page
      </button>
      {isFetching ? <span> Loading...</span> : null}{' '}
    </div>
    </div>
  )
}

export default Pokemons
