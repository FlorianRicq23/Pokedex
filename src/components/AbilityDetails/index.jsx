import { Flex, Text } from '@chakra-ui/react'

function AbilityDetails({ type, ability }) {
  return (
    <Flex
      className={type}
      maxW={{ base: 90, md:145}}
      w='100%'
      flexDirection={'row'}
      justifyContent='center'
      alignItems={'center'}
      p={2}
      h={{ base: 35, md:45}}
      borderRadius={15}
    >
      <Text className="capitalize-first-letter" fontSize={{ base: '14dpx', md:'20px'}}>
        {ability}{' '}
      </Text>
    </Flex>
  )
}

export default AbilityDetails
