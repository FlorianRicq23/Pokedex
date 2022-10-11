import { useParams } from 'react-router-dom'
import { useQuery } from 'react-query'
import { useEffect } from 'react'
import TypeDetails from '../../components/TypeDetails'
import { useColorTheme } from '../../utils/hooks'

import {
  Spinner,
  Center,
  Flex,
  Box,
  Text,
  chakra,
  Heading,
  Image,
  Grid,
  Container,
} from '@chakra-ui/react'
import AbilityDetails from '../../components/AbilityDetails'

function Pokemon() {
  const { setColorTheme } = useColorTheme()

  const { id: query } = useParams()

  const { data, isLoading, error } = useQuery(`pokemon${query}`, async () => {
    const response = await fetch(`https://api.pikaserve.xyz/pokemon/${query}`)
    const data = await response.json()
    return data
  })

  useEffect(() => {
    document.title = `${data?.name.english} | Pokedex`
    setColorTheme(data?.type[0])
  }, [data?.name.english, setColorTheme, data?.type])

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
              {data?.name.english}{' '}
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
              <Box maxH={{ base: 220, sm: 400, md: 400, lg:400 }} w={'50%'}>
                <Image
                  h={'100%'}
                  mr={'auto'}
                  ml={'auto'}
                  src={data?.image.hires}
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
                  Height : <chakra.span>{data?.profile.height}</chakra.span>
                </Text>
                <Text
                  fontSize={{ base: '24px', md: '24px' }}
                  className="font-bold capitalize-first-letter"
                  fontFamily="PokemonBold"
                  textAlign={{ base: 'center', md: 'left' }}
                >
                  Weight : <chakra.span>{data?.profile.weight}</chakra.span>
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
                    {data?.type.map((t, index) => (
                      <TypeDetails
                        key={index}
                        fontSize="23px"
                        className="capitalize-first-letter"
                        type={t}
                        style={{ color: 'black' }}
                      >
                        {t}
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
                    {data?.profile.ability.map((t, index) => (
                      <AbilityDetails
                        key={index}
                        fontSize="23px"
                        className="capitalize-first-letter"
                        type={data?.type[0]}
                        ability={t[0]}
                        style={{ color: 'black' }}
                      >
                        {t[0]}
                      </AbilityDetails>
                    ))}
                  </Flex>
                </Box>
              </Flex>
            </Flex>
          </Flex>
          <hr />

          <Flex mb={5}>
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
                justifyContent="space-between"
                alignContent="space-between"
              >
                <Box
                  fontSize="23px"
                  className={data?.type[0]}
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
                      HP
                    </Heading>
                    <Text
                      fontFamily="PokemonLight"
                      fontSize={{ base: '20px', md: '20px' }}
                    >
                      {data?.base.HP}
                    </Text>
                  </Flex>
                </Box>
                <Box
                  fontSize="23px"
                  className={data?.type[0]}
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
                      Attack
                    </Heading>
                    <Text
                      fontFamily="PokemonLight"
                      fontSize={{ base: '20px', md: '20px' }}
                    >
                      {data?.base.Attack}
                    </Text>
                  </Flex>
                </Box>
                <Box
                  fontSize="23px"
                  className={data?.type[0]}
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
                      Defense
                    </Heading>
                    <Text
                      fontFamily="PokemonLight"
                      fontSize={{ base: '20px', md: '20px' }}
                    >
                      {data?.base.Defense}
                    </Text>
                  </Flex>
                </Box><Box
                    fontSize="23px"
                    className={data?.type[0]}
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
                        SP. Attack
                      </Heading>
                      <Text
                        fontFamily="PokemonLight"
                        fontSize={{ base: '20px', md: '20px' }}
                      >
                        {data?.base['Sp. Attack']}
                      </Text>
                    </Flex>
                  </Box><Box
                    fontSize="23px"
                    className={data?.type[0]}
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
                        SP. Defense
                      </Heading>
                      <Text
                        fontFamily="PokemonLight"
                        fontSize={{ base: '20px', md: '20px' }}
                      >
                        {data?.base['Sp. Defense']}
                      </Text>
                    </Flex>
                  </Box><Box
                    fontSize="23px"
                    className={data?.type[0]}
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
                        Speed
                      </Heading>
                      <Text
                        fontFamily="PokemonLight"
                        fontSize={{ base: '20px', md: '20px' }}
                      >
                        {data?.base['Speed']}
                      </Text>
                    </Flex>
                  </Box>
              </Grid>
            </Box>
          </Flex>

          {/* <Accordion allowToggle>
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
          </Accordion> */}
        </Box>
      )}
    </Container>
  )
}

export default Pokemon
