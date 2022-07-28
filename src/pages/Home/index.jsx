import Card from '../../components/Card'
import { useColorTheme } from '../../utils/hooks'
import { useState, useEffect } from 'react'
import { useQuery } from 'react-query'
import axios from 'axios'
import Pagination from '../../components/Pagination'
import {
  Spinner,
  Input,
  Center,
  Select,
  Flex,
  Grid,
  Container,
} from '@chakra-ui/react'

function Home() {
  const { setColorTheme } = useColorTheme()
  const [currentPage, setCurrentPage] = useState(1)
  const [postsPerPage, setPostsPerPage] = useState(12)
  const [selectedType, setSelectedType] = useState("All types");
  const [inputQuery, setInputQuery] = useState("");

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
  } = useQuery(['listeTypes'], () => fetchAllTypes())

  useEffect(() => {
    document.title = `Pokedex`
    setColorTheme('red')
  }, [setColorTheme])

  let currentPosts
  const indexOfLastPost = currentPage * postsPerPage
  const indexOfFirstPost = indexOfLastPost - postsPerPage
  const [maxPageNumberLimit, setMaxPageNumberLimit] = useState(5)
  const [minPageNumberLimit, setMinPageNumberLimit] = useState(0)

  /*   if (pokemonsFilter ===!pokemons) {
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
        ))
      
    }
    setCurrentPage(1)
    setMinPageNumberLimit(0)
    setMaxPageNumberLimit(5)
  }
   */

  if (error || errorTypes) return <span>Oups il y a eu un problème</span>

  return (
    <Container maxW="1520px">
      {status === 'loading' ? (
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
          <Flex
            direction={{ base: 'column', md: 'row' }}
            alignItems="center"
            justifyContent="space-around"
            bg={'rgb(246, 246, 246)'}
            borderRadius={10}
            w="80%"
            ml="auto"
            mr="auto"
            mt={5}
            mb={5}
          >
            <Flex
              justifyContent="center"
              m={{ base: 1, md: 4 }}
              alignItems="center"
              w={{ base: '90%', md: '20%' }}
            >
              <Select
                id="typeFilter"
                w="100%"
                onChange={(e) => {
                  setSelectedType(e.target.value)
                  setCurrentPage(1)
                  setMinPageNumberLimit(0)
                  setMaxPageNumberLimit(5)
                }}
              >
                 <option
                    className="option-type"
                    value={"All types"}
                  >
                    All Types
                  </option>
                {dataTypes?.map((type, index) => (
                  <option
                    className="option-type"
                    key={index}
                    value={type.english}
                  >
                    {type.english}
                  </option>
                ))}
              </Select>
            </Flex>
            <Flex
              justifyContent="center"
              m={{ base: 1, md: 4 }}
              alignItems="center"
              w={{ base: '90%', md: '40%' }}
            >
              <Input
                className="search-input"
                id="searchFilter"
                type="text"
                placeholder="Pokemon search..."
                onChange={(e) => {
                  setInputQuery(e.target.value)
                  setCurrentPage(1)
                  setMinPageNumberLimit(0)
                  setMaxPageNumberLimit(5)
                }}
                w="100%"
              />
            </Flex>
            <Flex
              justifyContent="center"
              m={{ base: 1, md: 4 }}
              alignItems="center"
              w={{ base: '90%', md: '20%' }}
            >
              <Select
                w="100%"
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
            {data
            .filter(pokemon => selectedType==="All types" ? pokemon :  pokemon.type.map((type) => type).includes(selectedType))
            .filter((pokemon) => pokemon.name.english.toLowerCase().includes(inputQuery.toLowerCase()))
            .slice(indexOfFirstPost, indexOfLastPost)
            .map((pokemon, index) => (
              <Card key={index} dataN={pokemon} />
            ))}
          </Grid>

          <Pagination
            postsPerPage={postsPerPage}
            totalPosts={data?.length}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            pokemonFilter={data
              .filter(pokemon => selectedType==="All types" ? pokemon :  pokemon.type.map((type) => type).includes(selectedType))
              .filter((pokemon) => pokemon.name.english.toLowerCase().includes(inputQuery.toLowerCase()))}
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

export default Home
