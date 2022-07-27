import { Image, Flex, Text } from '@chakra-ui/react'

function TypeDetails({ type }) {
  const url = '/types2/bigtypes/' + type + '.png'
  return (
    <Flex
      className={type}
      maxW={{ base: 90, md:145}}
      w='100%'
      flexDirection={'row'}
      justifyContent='flex-start'
      alignItems={'center'}
      p={2}
      h={{ base: 35, md:45}}
      borderRadius={15}
    >
      <Image marginRight={{ base: 1, md:3}} h={{ base: '22px', md:'33px'}} src={url} alt="Logo" />
      <Text className="capitalize-first-letter" fontSize={{ base: '14dpx', md:'20px'}}>
        {type}{' '}
      </Text>
    </Flex>
  )
}

export default TypeDetails
