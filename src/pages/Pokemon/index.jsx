import { useParams } from 'react-router-dom'
import { useQuery } from 'react-query'
import { useEffect } from 'react'
import TypeDetails from '../../components/TypeDetails'
import { useColorTheme } from '../../utils/hooks'
import colors from '../../utils/style/colors'

import {
  Spinner,
  Center,
  Flex,
  Box,
  Text,
  chakra,
  Heading,
  Image,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Grid,
  Container,
} from '@chakra-ui/react'
import AbilityDetails from '../../components/AbilityDetails'

function Pokemon() {
  const { colorTheme, setColorTheme } = useColorTheme()

  const { id: query } = useParams()

  const { data, isLoading, error } = useQuery(`pokemon${query}`, async () => {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${query}`)
    const data = await response.json()
    return data
  })

  useEffect(() => {
    document.title = `${data?.name} | Pokedex`
    setColorTheme(data?.types[0]?.type?.name)
  })

  if (error) {
    return <span>Oups il y a eu un problème</span>
  }

  return (
    <Container maxW="1520px">
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
        <Box>
          <Flex
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            mb={5}
          >
            <Heading
              className="font-bold capitalize-first-letter"
              fontFamily="PokemonBold"
              fontSize="40px"
              align={{ base: 'center' }}
              h={10}
              m={5}
            >
              {data?.name}{' '}
              <chakra.span fontSize="24px" color="#8186A0">
                #{data?.id}
              </chakra.span>
            </Heading>
            <Flex
              w="100%"
              gap={15}
              p={{ base: 0, md: 30 }}
              flexDirection={{ base: 'column', md: 'row' }}
              alignItems={{ base: 'center', md: 'stretch' }}
            >
              <Box maxH={400} w={'50%'}>
                <Image
                  h={'100%'}
                  w={'100%'}
                  src={data?.sprites.other.dream_world.front_default}
                  alt="Logo"
                />
              </Box>
              <Flex
                w={'50%'}
                flexDirection="column"
                justifyContent={'space-between'}
                maxH={300}
              >
                <Text
                  fontSize={{ base: '24px', md: '24px' }}
                  className="font-bold capitalize-first-letter"
                  fontFamily="PokemonBold"
                  textAlign={{ base: 'center', md: 'left' }}
                >
                  Id : <chakra.span>{data?.id}</chakra.span>
                </Text>
                <Text
                  fontSize={{ base: '24px', md: '24px' }}
                  className="font-bold capitalize-first-letter"
                  fontFamily="PokemonBold"
                  textAlign={{ base: 'center', md: 'left' }}
                >
                  Height : <chakra.span>{data?.height} cm</chakra.span>
                </Text>
                <Text
                  fontSize={{ base: '24px', md: '24px' }}
                  className="font-bold capitalize-first-letter"
                  fontFamily="PokemonBold"
                  textAlign={{ base: 'center', md: 'left' }}
                >
                  Weight : <chakra.span>{data?.weight} kg</chakra.span>
                </Text>
                <Box>
                  <Text
                    fontSize={{ base: '24px', md: '24px' }}
                    className="font-bold capitalize-first-letter"
                    fontFamily="PokemonBold"
                    textAlign={{ base: 'center', md: 'left' }}
                  >
                    Type :
                  </Text>
                  <Flex
                    gap={5}
                    justifyContent={{ base: 'center', md: 'stretch' }}
                  >
                    {data?.types.map((t, index) => (
                      <TypeDetails
                        key={index}
                        fontSize="23px"
                        className="capitalize-first-letter"
                        type={t.type.name}
                        style={{ color: 'black' }}
                      >
                        {t.type.name}
                      </TypeDetails>
                    ))}
                  </Flex>
                </Box>
                <Box>
                  <Text
                    fontSize="24px"
                    className="font-bold capitalize-first-letter"
                    fontFamily="PokemonBold"
                    textAlign={{ base: 'center', md: 'left' }}
                  >
                    Ability :
                  </Text>

                  <Flex
                    gap={5}
                    justifyContent={{ base: 'center', md: 'stretch' }}
                  >
                    {data?.abilities.map((t, index) => (
                      <AbilityDetails
                        key={index}
                        fontSize="23px"
                        className="capitalize-first-letter"
                        type={data?.types[0]?.type?.name}
                        ability={t.ability.name}
                        style={{ color: 'black' }}
                      >
                        {t.ability.name}
                      </AbilityDetails>
                    ))}
                  </Flex>
                </Box>
              </Flex>
            </Flex>
          </Flex>
          <hr /> 

          <Flex
            mb={5}>
            <Box flex="1" textAlign="center">
              <Heading
                className="font-bold capitalize-first-letter"
                fontFamily="PokemonBold"
                fontSize="30px"
                align={{ base: 'center' }}
                h={10}
              >
                Species Data
              </Heading>
              <Grid
                templateColumns={{
                  base: '49% 49%',
                  md: '32% 32% 32%',
                }}
                justifyContent='space-between'
                alignContent='space-between'
              >
                {data?.stats.map((t, index) => (
                  <Box
                    key={index}
                    fontSize="23px"
                    className={data?.types[0]?.type?.name}
                    h={100}
                    borderRadius={'lg'}
                    p={2}
                    mb={2}
                  >
                    <Flex
                      flexDirection="column"
                      justifyContent="center"
                      alignItems="center"
                    >
                      <Heading
                        className="font-bold capitalize-first-letter"
                        fontFamily="PokemonBold"
                        fontSize={{ base: '24px', md: '26px' }}
                      >
                        {t.stat.name}
                      </Heading>
                      <Text
                        fontFamily="PokemonLight"
                        fontSize={{ base: '20px', md: '20px' }}
                      >
                        {t.base_stat}
                      </Text>
                    </Flex>
                  </Box>
                ))}
              </Grid>
            </Box>
          </Flex>

          <Accordion allowToggle>
            <AccordionItem>
              <h2>
                <AccordionButton>
                  <Box flex="1" textAlign="center">
                    <Heading
                      className="font-bold capitalize-first-letter"
                      fontFamily="PokemonBold"
                      fontSize="30px"
                      align={{ base: 'center' }}
                      h={10}
                    >
                      Move Pool
                    </Heading>
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel pb={4}>
                <Flex
                  flexDirection="column"
                  justifyContent="center"
                  alignItems="center"
                >
                  <Grid
                    templateColumns={{
                      base: '50% 50%',
                      md: '33% 33% 33%',
                      lg: '25% 25% 25% 25%',
                    }}
                    gap={5}
                    alignItems={'space-between'}
                    justifyItems="center"
                  >
                    {data?.moves.map((t, index) => (
                      <Text
                        key={index}
                        fontSize="23px"
                        className="capitalize-first-letter"
                      >
                        {t.move.name}
                      </Text>
                    ))}
                  </Grid>
                </Flex>
              </AccordionPanel>
            </AccordionItem>
          </Accordion>
        </Box>
      )}
    </Container>
  )
}

export default Pokemon
