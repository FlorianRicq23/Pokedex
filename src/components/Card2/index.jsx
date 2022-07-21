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

function Card2({ dataN }) {

  const containerColor = dataN.type[0]

  return (
    <Box w="100%">
      <Link key={`pokemons-${dataN.id}`} to={`/pokemon/${dataN.id}`}>
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
                    {dataN.name.english}
                  </Heading>
                  <VStack w="100%" h="140px" align="left">
                    {dataN.type.map((t, index) => (
                      <Type
                        key={index}
                        fontSize="23px"
                        className="capitalize-first-letter"
                        type={t}
                      >
                        {t}
                      </Type>
                    ))}
                  </VStack>
                </Grid>
              </Box>
              <Flex w="50%" p={3} paddingTop={5} paddingBottom={5}>
                <Image
                  h="90%"
                  src={dataN.image.hires}
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
                  {dataN.name.english}
                </Heading>
              </Box>
              <Box>
                <Image
                  h={90}
                  w={90}
                  src={dataN.image.hires}
                  alt="Image de presentation de {dataN.name}"
                />
              </Box>
              <Box>
                <HStack>
                  {dataN.type.map((t, index) => (
                    <Type
                      key={index}
                      fontSize="23px"
                      className="capitalize-first-letter"
                      type={t}
                    >
                      {t}
                    </Type>
                  ))}
                </HStack>
              </Box>
            </Flex>
          </Box>
        </Link>
    </Box>
  )
}

export default Card2