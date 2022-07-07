import colors from '../../utils/style/colors'
import { useQuery } from 'react-query'
import Type from '../../components/Type'
import { Link } from 'react-router-dom'
import {
  Box,
  Center,
  Image,
  Spinner,
  VStack,
  HStack,
  Grid,
  Flex,
  Heading,
} from '@chakra-ui/react'

function Card({ dataN }) {
  const { data, isLoading, error } = useQuery(`pokemon${dataN}`, async () => {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${dataN}`)
    const data = await response.json()
    return data
  })

  const containerColor = data?.types[0]?.type?.name

  if (error) {
    return <span>Oups il y a eu un problème</span>
  }

  return (
    <Box w="100%">
      {isLoading ? (
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
        <Link key={`pokemons-${data?.id}`} to={`/pokemon/${data?.name}`}>
          <Box
            className={containerColor}
            color={colors.black}
            borderRadius={30}
            p={2}
            h={200}
            w="100%"
            display={{ base: 'none', md: 'block' }}
          >
            <Flex flexDirection={'row'} spacing={2} height="100%">
              <Box w="50%" p={3}>
                <Grid row={2}>
                  <Heading
                    className="font-bold capitalize-first-letter"
                    fontFamily="PokemonBold"
                    align={{ base: 'center' }}
                    fontSize={{ base: '16px', md: '23px' }}
                    mb={5}
                  >
                    {data?.name}
                  </Heading>
                  <VStack w="100%" h="140px" align="left">
                    {data?.types.map((t, index) => (
                      <Type
                        key={index}
                        fontSize="23px"
                        className="capitalize-first-letter"
                        type={t.type.name}
                      >
                        {t.type.name}
                      </Type>
                    ))}
                  </VStack>
                </Grid>
              </Box>
              <Flex w="50%" p={3} paddingTop={5} paddingBottom={5}>
                <Image
                  h="90%"
                  src={data?.sprites.other.dream_world.front_default}
                  alt="Logo"
                  m="auto"
                />
              </Flex>
            </Flex>
          </Box>
          <Box
            className={containerColor}
            color={colors.black}
            borderRadius={30}
            p={2}
            h={200}
            w="100%"
            display={{ md: 'none' }}
          >
            <Flex h='100%' flexDirection={'column'} alignItems='center' justifyContent='space-between'>
              <Box>
                <Heading
                  className="font-bold capitalize-first-letter"
                  fontFamily="PokemonBold"
                  fontSize={{ base: '16px', md: '23px' }}
                >
                  {data?.name}
                </Heading>
              </Box>
              <Box>
                <Image
                  h={90}
                  w={90}
                  src={data?.sprites.other.dream_world.front_default}
                  alt="Logo"
                />
              </Box>
              <Box>
                <HStack>
                  {data?.types.map((t, index) => (
                    <Type
                      key={index}
                      fontSize="23px"
                      className="capitalize-first-letter"
                      type={t.type.name}
                    >
                      {t.type.name}
                    </Type>
                  ))}
                </HStack>
              </Box>
            </Flex>
          </Box>
        </Link>
      )}
    </Box>
  )
}

export default Card
