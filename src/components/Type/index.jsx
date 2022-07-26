import { Image, Flex, Text } from '@chakra-ui/react'

function Type({ type }) {
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
      h={{ base: 30, md:45}}
      borderRadius={15}
      backgroundColor="rgba(255, 255, 255, 0.3)"
    >
      <Image marginRight={{ base: 0.5, md:3}} h={{ base: '19px', md:'33px'}} src={url} alt="Logo" />
      <Text className="capitalize-first-letter" fontSize={{ base: '16px', md:'20px'}}>
        {type}{' '}
      </Text>
    </Flex>
  )
}

export default Type
