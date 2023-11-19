import { Box, Button, Flex, Text } from '@chakra-ui/react';

import { Product } from '../../domain/models';

type ProductCardProps = {
  product: Product
  addProductItem: (product: Product) => void
  removeProductItem: (productId: number) => void
}

const ProductCard: React.FC<ProductCardProps> = ({ product, addProductItem, removeProductItem }: ProductCardProps) => {
  return (
    <Box borderWidth="1px" borderRadius="lg" overflow="hidden">
      <Flex direction="column" p={4}>
        <Text fontSize="xl" fontWeight="bold">
          {product.name}
        </Text>
        <Text mt={2}>ID: {product.id}</Text>
        <Button colorScheme="teal" size="sm" onClick={() => { addProductItem(product); }}>
          Add to Cart
        </Button>
        <Button colorScheme="red" size="sm" onClick={() => { removeProductItem(product.id); }}>
          Remove from Cart
        </Button>
      </Flex>
    </Box>
  );
};

export default ProductCard;
