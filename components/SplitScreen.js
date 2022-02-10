import {
    Button,
    Flex,
    Heading,
    Image,
    Stack,
    Text,
    useBreakpointValue,
  } from '@chakra-ui/react';
  import SplitScreenImg from './SplitScreenImg';


  export default function SplitScreen({imgRight,title1, title2, desc,img}) {
    return (
      <Stack minH={'85vh'} direction={{ base: 'column', md: 'row' }}>
        {!imgRight && <SplitScreenImg img={img}/>}
        <Flex p={8} flex={1} align={'center'} justify={'center'}>
          <Stack spacing={6} w={'full'} maxW={'lg'}>
            <Heading fontSize={{ base: '3xl', md: '4xl', lg: '5xl' }}>
              <Text
                as={'span'}
                position={'relative'}
                _after={{
                  content: "''",
                  width: 'full',
                  height: useBreakpointValue({ base: '20%', md: '30%' }),
                  position: 'absolute',
                  bottom: 1,
                  left: 0,
                  bg: 'blue.400',
                  zIndex: -1,
                }}>
                {title1}
              </Text>
              <br />{' '}
              <Text color={'blue.400'} as={'span'}>
                {title2}
              </Text>{' '}
            </Heading>
            <Text fontSize={{ base: 'md', lg: 'lg' }} color={'gray.500'}>
              {desc}
            </Text>
          </Stack>
        </Flex>
        { imgRight && <SplitScreenImg img={img}/>}
      </Stack>
    );
  }