import styled from 'styled-components'
import Carte from '../../components/Carte'
import colors from '../../utils/style/colors'
import { useState } from 'react'
import { useQuery } from 'react-query'
import TypesFilter from '../../components/TypesFilter'
import {
  Spinner,
  Input,
  Center,
  Select,
  Flex,
  IconButton,
  Text,
  Tooltip,
} from '@chakra-ui/react'

import {
  ArrowRightIcon,
  ArrowLeftIcon,
  ChevronRightIcon,
  ChevronLeftIcon,
} from '@chakra-ui/icons'

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
  const [limit, setLimit] = useState(20)

  const fetchProjects = (page = 0) =>
    fetch(
      'https://pokeapi.co/api/v2/pokemon?offset=' +
        page * limit +
        '&limit=' +
        limit
    ).then((res) => res.json())

  const { isLoading, isError, error, data, isFetching, isPreviousData } =
    useQuery(['listePokemons', page, limit], () => fetchProjects(page), {
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

          <Flex justifyContent="center" m={4} alignItems="center">
            <Tooltip label="First Page">
              <IconButton
                bg={colors.red} color={colors.white}
                _hover={{ background: colors.red, color: colors.white}}
                onClick={() => setPage(0)}
                disabled={page === 0}
                icon={<ArrowLeftIcon h={3} w={3} />}
                mr={4}
              />
            </Tooltip>
            <Tooltip label="Previous Page">
              <IconButton
                bg={colors.red} color={colors.white}
                _hover={{ background: colors.red, color: colors.white}}
                onClick={() => setPage((old) => Math.max(old - 1, 0))}
                disabled={page === 0}
                icon={<ChevronLeftIcon h={6} w={6} />}
                mr={4}
              />
            </Tooltip>
            <Text flexShrink="0">
              Page{' '}
              <Text fontWeight="bold" as="span">
                {page + 1}
              </Text>{' '}
              of{' '}
              <Text fontWeight="bold" as="span">
                {Math.ceil(data.count / limit)}
              </Text>
            </Text>
            <Tooltip label="Next Page">
              <IconButton
                bg={colors.red} color={colors.white}
                _hover={{ background: colors.red, color: colors.white}}
                onClick={() => {
                  if (!isPreviousData && data?.next) {
                    setPage((old) => old + 1)
                  }
                }}
                disabled={isPreviousData || !data?.next}
                icon={<ChevronRightIcon h={6} w={6} />}
                ml={4}
              />
            </Tooltip>
            <Tooltip label="Last Page">
              <IconButton
                onClick={() => setPage(Math.ceil(data.count / limit) - 1)}
                _hover={{ background: colors.red, color: colors.white}}
                bg={colors.red} color={colors.white}
                icon={<ArrowRightIcon h={3} w={3} />}
                disabled={isPreviousData || !data?.next}
                ml={4}
              />
            </Tooltip>
          </Flex>

          <Flex justifyContent="center" m={4} alignItems="center">
            <Select
              w={40}
              value={limit}
              onChange={(e) => {
                setLimit(e.target.value)
              }}
            >
              {[10, 20, 30, 40, 50].map((limit) => (
                <option key={limit} value={limit}>
                  Show {limit} items
                </option>
              ))}
            </Select>
          </Flex>
        </div>
      )}
    </div>
  )
}

export default Pokemons
