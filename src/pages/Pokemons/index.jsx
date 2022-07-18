import Card from '../../components/Card'
import { useColorTheme } from '../../utils/hooks'
import colors from '../../utils/style/colors'
import { useState, useEffect } from 'react'
import { useQuery } from 'react-query'
import axios from "axios";
import {
  Spinner,
  Input,
  Center,
  Select,Box,
  Flex,
  IconButton,
  Text,
  Tooltip,
  Grid, Container
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

  async function fetchPokemons(page = 0) {
    const { data } = await axios.get('https://pokeapi.co/api/v2/pokemon?offset=' + page * limit + '&limit=' + limit)
    return data
  }

  async function fetchTypes() {
    const { data } = await axios.get('https://pokeapi.co/api/v2/type')
    return data
  }

  const { status, error, data, isFetching, isPreviousData } =
    useQuery(['listePokemons', page, limit], () => fetchPokemons(page), {
      keepPreviousData: true,
    })


  const { status:statusTypes, error : errorTypes, data : dataTypes, isFetching: isFetchingTypes} =
    useQuery(['listeTypes'], () => fetchTypes())
    


  useEffect(() => {
    document.title = `Pokedex`
    setColorTheme('red')

  })


  if (error) {
    return <span>Oups il y a eu un problème</span>
  }

  return (
    <Container maxW='1520px'>
      {status==='loading' ? (
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
          <Flex bg='grey' justifyContent={'space-between'}>
          {dataTypes?.results.map((type, index) => (
              <Text key={index} fontSize={20}>{type.name}</Text>
            ))}
          </Flex>


          <Grid 
          templateColumns={{ base: '47% 47%', lg: '32% 32% 32%', xl: '24% 24% 24% 24%' }}
          gap={5} 
          alignItems={'space-between'} justifyItems='center'>
            {data?.results.map((pokemon, index) => (
              <Card key={index} dataN={pokemon.name} />
            ))}
          </Grid>

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
    </Container>
  )
}

export default Pokemons
