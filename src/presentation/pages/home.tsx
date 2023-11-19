import './home.css'

import { Box, Center, Grid, Text } from '@chakra-ui/react'
import { GetProductList, Product } from '../../domain/models'
import { CartDrawer, Header, ProductCard } from '../components'

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
      <Header cartItemsLength={cartItems.length} handleOpenDrawer={handleOpenDrawer}/>
        {state.isLoading && <Text>Loading...</Text>}
        {state.error && <Text color='red.500'>An error occurred</Text>}
        <Center>
          <Grid paddingX='50px' mt='50px' templateColumns='repeat(4, 1fr)' gap={2}>
            {response.products.map((product: Product) => (
              <ProductCard key={product.id} addProductItem={() => addProductItem(product)} product={product}/>
            ))}
          </Grid>
        </Center>

        <CartDrawer
          isOpen={isDrawerOpen}
          onClose={handleCloseDrawer}
          cartItems={cartItems}
          handleQuantityChange={handleQuantityChange}
          calculateTotalValue={calculateTotalValue}
        />
      </Box>
    </>
  )
}
