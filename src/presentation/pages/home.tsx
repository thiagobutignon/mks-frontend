import './home.css'

import { Box, Button, Card, Center, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerFooter, DrawerHeader, Flex, Grid, Heading, Image, Spacer, Text } from '@chakra-ui/react'
import { GetProductList, Product } from '../../domain/models'
import { ProductCard, QuantitySelector } from '../components'

import CartIcon from '../components/icons/cart-icon'
import React from 'react'
import useProductList from '../hooks/use-product-list'

type Props = {
  getProductList: GetProductList
}

export const Home: React.FC<Props> = ({ getProductList }) => {
  const {
    state,
    response,
    cartItems,
    addProductItem,
    handleQuantityChange,
    calculateTotalValue,
    isDrawerOpen,
    handleOpenDrawer,
    handleCloseDrawer
  } = useProductList(getProductList)

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
              <ProductCard key={product.id} addProductItem={() => addProductItem(product)} product={product}/>
            ))}
          </Grid>
        </Center>

        <Drawer size='md' isOpen={isDrawerOpen} onClose={handleCloseDrawer}>

          <DrawerContent bg="#0F52BA" boxShadow="-5px 0px 6px 0px #00000021">
            <DrawerCloseButton color={'white'} bg={'black'} borderRadius={'100%'} width='38px' height={'38px'}/>
            <DrawerHeader fontSize="27px" color='white'>Carrinho de Compras</DrawerHeader>

            <DrawerBody>
              <Grid column={1} gap={6}>
              {cartItems.map(({ product, quantity }: { product: Product, quantity: number }) => (
               <>
                <Card p={'24px'} key={product.id} direction='row' boxShadow='0px 2px 8px 0px #00000022'>
                  <Flex alignItems={'center'}>
                    <Image
                      src={product.photo}
                      alt={product.name}
                      w={'25%'}
                    />
                    <Heading w={'100px'} ml='8px' size='16px' lineHeight='19px' textColor='#2C2CC2C' fontWeight='normal'>{product.name}</Heading>
                    <QuantitySelector value={quantity} onChange={(value) => handleQuantityChange(product.id, value)} />
                    <Text ml={'8px'} fontWeight={'bold'}>R$ {Number(product.price)}</Text>
                  </Flex>
                </Card>
               </>
              ))}
              </Grid>
            </DrawerBody>
            <DrawerFooter>
            <Box width={'100%'}>
              <Text color={'white'} fontSize={'24px'} textAlign={'right'}>Total: R$ {calculateTotalValue()}</Text>
              <Button width={'100%'} bg={'black'}colorScheme='black'>Finalizar compra</Button>
            </Box>
          </DrawerFooter>
          </DrawerContent>
        </Drawer>
      </Box>
    </>
  )
}
