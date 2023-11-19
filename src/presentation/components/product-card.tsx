import { Box, Button, Card, CardBody, CardFooter, Flex, Heading, Image, Stack, Text } from '@chakra-ui/react';

import BuyIcon from './icons/buy-icon';
import { Product } from '../../domain/models';

type ProductCardProps = {
  product: Product
  addProductItem: (product: Product) => void
}

const ProductCard: React.FC<ProductCardProps> = ({ product, addProductItem }: ProductCardProps) => {
  return (
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
          onClick={() => { addProductItem(product); }}>
              <BuyIcon /><Box width='8px'/> COMPRAR
          </Button>
      </CardFooter>
    </Card>
   </>
  );
};

export default ProductCard;
