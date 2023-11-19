import {
  Box,
  Button,
  Card,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  Flex,
  Grid,
  Heading,
  Image,
  Text
} from '@chakra-ui/react';

import { Product } from '@/domain/models';
import React from 'react';
import QuantitySelector from './quantity-selector';

interface CartDrawerProps {
  isOpen: boolean
  onClose: () => void
  cartItems: Array<{ product: Product, quantity: number }>
  handleQuantityChange: (productId: number, newQuantity: number) => void
  calculateTotalValue: () => number
}

const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cartItems,
  handleQuantityChange,
  calculateTotalValue
}) => {
  return (
    <Drawer size='md' isOpen={isOpen} onClose={onClose}>
      <DrawerContent bg='#0F52BA' boxShadow='-5px 0px 6px 0px #00000021'>
        <DrawerCloseButton color={'white'} bg={'black'} borderRadius={'100%'} width='38px' height={'38px'} />
        <DrawerHeader fontSize='27px' color='white'>
          Carrinho de Compras
        </DrawerHeader>

        <DrawerBody>
          <Grid column={1} gap={6}>
            {cartItems.map(({ product, quantity }: { product: Product, quantity: number }) => (
              <Card p={'24px'} key={product.id} direction='row' boxShadow='0px 2px 8px 0px #00000022'>
                <Flex alignItems={'center'}>
                  <Image src={product.photo} alt={product.name} w={'25%'} />
                  <Heading w={'100px'} ml='8px' size='16px' lineHeight='19px' textColor='#2C2CC2C' fontWeight='normal'>
                    {product.name}
                  </Heading>
                  <QuantitySelector value={quantity} onChange={(value) => { handleQuantityChange(product.id, value); }} />
                  <Text ml={'8px'} fontWeight={'bold'}>
                    R$ {Number(product.price)}
                  </Text>
                </Flex>
              </Card>
            ))}
          </Grid>
        </DrawerBody>
        <DrawerFooter>
          <Box width={'100%'}>
            <Text color={'white'} fontSize={'24px'} textAlign={'right'}>
              Total: R$ {calculateTotalValue()}
            </Text>
            <Button width={'100%'} bg={'black'} colorScheme='black'>
              Finalizar compra
            </Button>
          </Box>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default CartDrawer;
