import ErrorIllustration from '../../assets/404.png'
import {
  Image,
  Flex,
} from '@chakra-ui/react'

function Error() {
  return (
    <Flex flexDirection='column' m={30} alignItems='center'>
      <Image maxW={800} w='100%' src={ErrorIllustration} alt="Error illustration" />
    </Flex>
  )
}

export default Error
