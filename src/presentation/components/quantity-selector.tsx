import {
  Box,
  Center,
  Flex,
  Text
} from '@chakra-ui/react';
import React, { ChangeEvent } from 'react';

interface QuantitySelectorProps {
  value: number
  onChange: (value: number) => void
}

const QuantitySelector: React.FC<QuantitySelectorProps> = ({ value, onChange }) => {
  const handleIncrement = (): void => {
    onChange(value + 1);
  };

  const handleDecrement = (): void => {
    if (value > 1) {
      onChange(value - 1);
    }
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const inputValue = parseInt(event.target.value, 10);
    onChange(isNaN(inputValue) ? 1 : inputValue);
  };

  return (
    <>
    <Box>
      <Text fontSize={'8px'}>QTD:</Text>
        <Center>

          <Flex border={'1px'} borderRadius={'8px'} borderColor={'#BFBFBF'}>
            <Box flex="1" p={2} ml={1} onClick={handleDecrement} cursor={'pointer'}>
              <Text fontSize='20px'>-</Text>
            </Box>
            <Box flex={1} mt={2} width={'1px'} h={'30px'} bgColor={'gray.300'}/>
            <Text
              fontSize='20px'
              px={2}
              py={2}
              onChange={handleInputChange}
            >{value}</Text>
            <Box flex={1} mt={2} width={'1px'} h={'30px'} bgColor={'gray.300'}/>
            <Box flex="1" p={2} mr={1} onClick={handleIncrement} cursor={'pointer'}>
            <Text fontSize='20px'>+</Text>
            </Box>
          </Flex>
        </Center>
      </Box>
    </>
  );
};

export default QuantitySelector;
