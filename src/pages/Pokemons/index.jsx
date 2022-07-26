import Card from '../../components/Card'
import { useColorTheme } from '../../utils/hooks'
import colors from '../../utils/style/colors'
import { useState, useEffect } from 'react'
import { useQuery } from 'react-query'
import axios from 'axios'
import Pagination from '../../components/Pagination'
import {
  Spinner,
  Input,
  Center,
  Select,
  Box,
  Flex,
  IconButton,
  Text,
  Tooltip,
  Grid,
  Container,
} from '@chakra-ui/react'

import {
  ArrowRightIcon,
  ArrowLeftIcon,
  ChevronRightIcon,
  ChevronLeftIcon,
} from '@chakra-ui/icons'

function Pokemons() {
  const [page, setPage] = useState(0)
  const [limit, setLimit] = useState(20)
  const { colorTheme, setColorTheme } = useColorTheme()
  const [pokemonsTypes, setPokemonsTypes] = useState(null)
  const [pokemons, setPokemons] = useState([])
  const [pokemonsFilter, setPokemonsFilter] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [postsPerPage, setPostsPerPage] = useState(12)
  const [loading, setLoading] = useState(true)
  const [loadingTypes, setLoadingTypes] = useState(true)

  async function fetchAllPokemons() {
    const { data } = await axios.get('https://api.pikaserve.xyz/pokemon/all')
    return data
  }
  const { status, error, data } = useQuery(['listePokemons'], () =>
    fetchAllPokemons()
  )

  async function fetchAllTypes() {
    const { data } = await axios.get('https://api.pikaserve.xyz/types/all')
    return data
  }
  const {
    status: statusTypes,
    error: errorTypes,
    data: dataTypes,
    isFetching: isFetchingTypes,
  } = useQuery(['listeTypes'], () => fetchAllTypes())

  useEffect(() => {
    document.title = `Pokedex`
    setColorTheme('red')
    if (status === 'success' && data && loading===true) {
      setPokemons(data)
      setPokemonsFilter(data)
      if (
        data.length === pokemons.length &&
        data.length === pokemonsFilter.length
      )
      setLoading(false)
    }

    if (statusTypes === 'success' && dataTypes) {
      let res = dataTypes?.map((type) => type.english)
      res.unshift('All Types')
      res.pop()
      setPokemonsTypes(res)
      setLoadingTypes(false)
    }
  }, [dataTypes, statusTypes, status, data, setColorTheme,pokemonsFilter.length, pokemons.length])

  let currentPosts
  const indexOfLastPost = currentPage * postsPerPage
  const indexOfFirstPost = indexOfLastPost - postsPerPage
  const [maxPageNumberLimit, setMaxPageNumberLimit] = useState(5)
  const [minPageNumberLimit, setMinPageNumberLimit] = useState(0)

  if (pokemonsFilter ===!pokemons) {
    pokemons.sort((a, b) => (a.id > b.id ? 1 : -1))
    currentPosts = pokemons.slice(indexOfFirstPost, indexOfLastPost)
    pokemons.slice(indexOfFirstPost, indexOfLastPost)
  } else {
    pokemonsFilter.sort((a, b) => (a.id > b.id ? 1 : -1))
    currentPosts = pokemonsFilter.slice(indexOfFirstPost, indexOfLastPost)
    pokemonsFilter.slice(indexOfFirstPost, indexOfLastPost)
  }

  const typeFilterFunction = (term) => {
    if (term === 'All Types') {
      setPokemonsFilter(pokemons)
    } else {
      setPokemonsFilter(
        pokemons.filter((pokemon) =>
          pokemon.type.map((type) => type).includes(term)
        )
      )
    }
    setCurrentPage(1)
    setMinPageNumberLimit(0)
    setMaxPageNumberLimit(5)
  }

  const searchFilterFunction = (term) => {
    if (term === '') {
      setPokemonsFilter(pokemons)
    } else {
      setPokemonsFilter(
        pokemons.filter((pokemon) =>
          pokemon.name.english.toLowerCase().includes(term.toLowerCase())
        )
      )
    }
    const typeFilterReset = document.querySelector("#typeFilter");
    typeFilterReset.value = "All Types";
    setCurrentPage(1)

    setMinPageNumberLimit(0)
    setMaxPageNumberLimit(5)
  }

  return (
    <Container maxW="1520px">
      {loading === true ? (
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
          <Flex direction={{ base: 'column', md: 'row' }} alignItems='center' justifyContent='space-around' bg={'rgb(246, 246, 246)'} borderRadius={10} w='80%' ml='auto' mr='auto' mt={5} mb={5}>
            <Flex justifyContent="center" m={{ base: 1, md: 4 }} alignItems="center" w={{ base: '90%', md: '20%' }}>
              <Select
                id="typeFilter"
                w='100%'
                onChange={(event) => typeFilterFunction(event.target.value)}
              >
                {pokemonsTypes?.map((type, index) => (
                  <option className="option-type" key={index} value={type}>
                    {type}
                  </option>
                ))}
              </Select>
            </Flex>
            <Flex justifyContent="center" m={{ base: 1, md: 4 }} alignItems="center" w={{ base: '90%', md: '40%' }}>
              <Input
                className="search-input"
                id="searchFilter"
                type="text"
                placeholder="Pokemon search..."
                onChange={(event) => searchFilterFunction(event.target.value)}
                w='100%'
              />
            </Flex>
            <Flex justifyContent="center" m={{ base: 1, md: 4 }} alignItems="center" w={{ base: '90%', md: '20%' }}>
              <Select
                w='100%'
                value={postsPerPage}
                onChange={(e) => {
                  setPostsPerPage(e.target.value)
                  setCurrentPage(1)
                }}
              >
                {[12, 24, 36, 48].map((postsPerPage) => (
                  <option key={postsPerPage} value={postsPerPage}>
                    Show {postsPerPage} items
                  </option>
                ))}
              </Select>
            </Flex>
            
          </Flex>
          <Grid
            templateColumns={{
              base: '47% 47%',
              lg: '32% 32% 32%',
              xl: '24% 24% 24% 24%',
            }}
            gap={5}
            alignItems={'space-between'}
            justifyItems="center"
          >
            {currentPosts.map((pokemon, index) => (
              <Card key={index} dataN={pokemon} />
            ))}
          </Grid>

          <Pagination
            postsPerPage={postsPerPage}
            totalPosts={pokemons.length}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            pokemonFilter={pokemonsFilter}
            maxPageNumberLimit={maxPageNumberLimit}
            setMaxPageNumberLimit={setMaxPageNumberLimit}
            minPageNumberLimit={minPageNumberLimit}
            setMinPageNumberLimit={setMinPageNumberLimit}
          />
        </div>
      )}
    </Container>
  )
}

export default Pokemons
