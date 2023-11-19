import './home.css'

import { Box, Button, Card, CardBody, CardFooter, Center, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerHeader, Flex, FormControl, FormLabel, Grid, Heading, Image, NumberDecrementStepper, NumberIncrementStepper, NumberInput, NumberInputField, NumberInputStepper, Spacer, Stack, Text } from '@chakra-ui/react'
import { GetProductList, Product } from '../../domain/models'
import React, { useState } from 'react'

import useProductList from '../hooks/use-product-list'

const BuyIcon: React.FC = () => (
  <svg
      xmlns="http://www.w3.org/2000/svg"
      width="14"
      height="16"
      fill="none"
      viewBox="0 0 14 16"
    >
      <path
        fillRule="evenodd"
        stroke="#fff"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M3 1L1 3.7v9.45c0 .746.597 1.35 1.333 1.35h9.334c.736 0 1.333-.604 1.333-1.35V3.7L11 1H3z"
        clipRule="evenodd"
        opacity="0.737"
      ></path>
      <path
        stroke="#fff"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M1 4.375h12M10 7c0 1.243-1.175 2.25-2.625 2.25S4.75 8.243 4.75 7"
        opacity="0.737"
      ></path>
    </svg>
);

const CartIcon: React.FC = (props) => (
  <svg
  {...props}
  xmlns="http://www.w3.org/2000/svg"
  width="19"
  height="18"
  fill="none"
  viewBox="0 0 19 18"
>
  <path
    fill="#000"
    d="M.594 0A.599.599 0 000 .6c0 .33.267.6.594.6h2.315l.505 1.89v.06l1.9 7.17v.03l.623 2.4c.06.27.297.45.565.45h9.5c.326 0 .593-.27.593-.6 0-.33-.267-.6-.593-.6H6.977l-.327-1.26 10.598-.54c.268 0 .505-.21.564-.48L19 3.12a.652.652 0 00-.119-.48.618.618 0 00-.475-.24H4.453L3.948.45A.634.634 0 003.355 0H.594zm7.125 4.8c.326 0 .593.27.593.6v2.4c0 .33-.267.6-.593.6a.599.599 0 01-.594-.6V5.4c0-.33.267-.6.594-.6zm3.562 0c.327 0 .594.27.594.6v2.4c0 .33-.267.6-.594.6a.599.599 0 01-.594-.6V5.4c0-.33.268-.6.594-.6zm3.563 0c.326 0 .594.27.594.6v2.4c0 .33-.268.6-.594.6a.599.599 0 01-.594-.6V5.4c0-.33.267-.6.594-.6zm-7.125 9.6c-.98 0-1.782.81-1.782 1.8S6.74 18 7.72 18 9.5 17.19 9.5 16.2s-.802-1.8-1.781-1.8zm7.125 0c-.98 0-1.781.81-1.781 1.8s.801 1.8 1.78 1.8c.98 0 1.782-.81 1.782-1.8s-.802-1.8-1.781-1.8z"
  ></path>
  </svg>
);
type Props = {
  getProductList: GetProductList
}

export const Home: React.FC<Props> = ({ getProductList }) => {
  const {
    state,
    response,
    cartItems,
    addProductItem
  } = useProductList(getProductList)

  const [isDrawerOpen, setDrawerOpen] = useState(false);

  const handleOpenDrawer = (): void => {
    setDrawerOpen(true);
  };

  const handleCloseDrawer = (): void => {
    setDrawerOpen(false);
  };
  console.log(response)
  return (
    <>
      <Box bg='#F9F9F9'>
      <Flex p={4} bg='#0F52BA' alignItems='center' h="101px">
        <Flex ml='65px' alignItems='baseline'>
          <Heading as='h1' fontSize='40px' fontWeight={600} lineHeight='19px' letterSpacing='0px' color='white' textAlign='left'>
            MKS
          </Heading>
          <Text fontSize='20px' lineHeight='19px' fontWeight='light' color='white'>Sistemas</Text>
        </Flex>
        <Spacer />
        <Button width='90px' height='45px' borderRadius='8px' fontSize='18px' bg='white' onClick={handleOpenDrawer}>
          <CartIcon /> <Spacer/>{cartItems.length}
        </Button>
      </Flex>
        {state.isLoading && <Text>Loading...</Text>}
        {state.error && <Text color='red.500'>An error occurred</Text>}
        <Center>
          <Grid paddingX='50px' mt='50px' templateColumns='repeat(4, 1fr)' gap={2}>
            {response.products.map((product: Product) => (
              <>
              <Card key={product.id} maxW='sm' boxShadow='0px 2px 8px 0px #00000022'>
                <CardBody>
                  <Flex direction='column' alignItems='center'>
                    <Image
                      src={product.photo}
                      alt={product.name}
                      maxH='150px'
                    />
                  </Flex>
                  <Stack mt='4' spacing='2'>
                    <Flex direction='row' justifyContent='space-between'>
                      <Heading size='16px' lineHeight='19px' textColor='#2C2CC2C' fontWeight={400}>{product.name}</Heading>
                      <Flex marginLeft='12px' paddingX='12px' alignItems='center' justifyContent='center' height='26px' bg='#373737' borderRadius='5px'>
                          <Text fontSize='15px' lineHeight='15px' fontWeight={700} textColor='white'>R${Number(product.price)}</Text>
                      </Flex>
                    </Flex>
                    <Text minHeight='40px' fontSize='10px' lineHeight='12px' textColor='#2C2CC2C' fontWeight={300}>
                      {product.description}
                    </Text>
                  </Stack>
                </CardBody>

                <CardFooter width='100%' p='0'>
                  <Button
                    style={{ borderRadius: '0 0 8px 8px' }}
                    bg='#0F52BA'
                    color='white'
                    size='sm'
                    w='100%'
                    h='32px'
                    onClick={() => addProductItem(product)}>
                        <BuyIcon/><Box width='8px'/> COMPRAR
                    </Button>
                </CardFooter>
              </Card>

              </>
            ))}
          </Grid>
        </Center>

        <Drawer size='md' isOpen={isDrawerOpen} onClose={handleCloseDrawer}>

          <DrawerContent bg="#0F52BA" boxShadow="-5px 0px 6px 0px #00000021">
            <DrawerCloseButton color={'white'} bg={'black'} borderRadius={'100%'} width='38px' height={'38px'}/>
            <DrawerHeader fontSize="27px" color='white'>Carrinho de Compras</DrawerHeader>

            <DrawerBody>
              <Grid column={1} gap={6}>
              {cartItems.map((product: Product) => (
               <>
                <Card p={'24px'} key={product.id} direction='row' boxShadow='0px 2px 8px 0px #00000022'>
                  <Flex alignItems={'center'} justifyContent={'space-between'}>
                    <Image
                      src={product.photo}
                      alt={product.name}
                      w={'25%'}
                    />
                    <Heading size='16px' lineHeight='19px' textColor='#2C2CC2C' fontWeight='normal'>{product.name}</Heading>
                    <FormControl>
                      <FormLabel fontSize={'10px'}>QTD:</FormLabel>
                      <NumberInput max={50} min={1}>
                        <NumberInputField />
                        <NumberInputStepper>
                          <NumberIncrementStepper />
                          <NumberDecrementStepper />

                        </NumberInputStepper>
                      </NumberInput>
                    </FormControl>
                    <Text>R$ {Number(product.price)}</Text>
                  </Flex>
                </Card>
               </>
              ))}
              </Grid>
            </DrawerBody>
          </DrawerContent>
        </Drawer>
      </Box>
    </>
  )
}
