import { Flex, Image } from "@chakra-ui/react"
export default function SplitScreenImg({ img }) {
  return (
    <Flex flex={1}>
      <Image
        alt={'Login Image'}
        objectFit={'cover'}

        src={img}
      />
    </Flex>)
}