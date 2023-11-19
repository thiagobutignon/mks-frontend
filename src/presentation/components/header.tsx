import { Button, Flex, Heading, Spacer, Text } from '@chakra-ui/react';

import React from 'react';
import CartIcon from './icons/cart-icon';

interface HeaderProps {
  cartItemsLength: number
  handleOpenDrawer: () => void
}

const Header: React.FC<HeaderProps> = ({ cartItemsLength, handleOpenDrawer }) => (
  <Flex p={4} bg="#0F52BA" alignItems="center" h="101px">
    <Flex ml="65px" alignItems="baseline">
      <Heading
        as="h1"
        fontSize="40px"
        fontWeight={600}
        lineHeight="19px"
        letterSpacing="0px"
        color="white"
        textAlign="left"
      >
        MKS
      </Heading>
      <Text fontSize="20px" lineHeight="19px" fontWeight="light" color="white">
        Sistemas
      </Text>
    </Flex>
    <Spacer />
    <Button
      width="90px"
      height="45px"
      borderRadius="8px"
      fontSize="18px"
      bg="white"
      onClick={handleOpenDrawer}
    >
      <CartIcon /> <Spacer /> {cartItemsLength}
    </Button>
  </Flex>
);

export default Header;
