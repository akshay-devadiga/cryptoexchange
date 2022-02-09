import logo from "./logo.svg";
import "./App.css";
import { useState, useEffect, useCallback } from "react";
import {
  NumberInput,
  NumberInputField,
  FormErrorMessage,
  SliderTrack,
  InputRightElement,
  SliderFilledTrack,
  Box,
  Slider,
  SliderThumb,
  Tag,
  Button,
  FormControl,
  InputGroup,
  Input,
  Flex,
  Spacer,
} from "@chakra-ui/react";

function App() {
  const [amountUSDP, setAmountUSDP] = useState(0);
  const [amountETH, setAmountETH] = useState(0);
  const [usedUSDP, setUsedAmountUSDP] = useState(false);
  const [leverage, setLeverage] = useState(1);
  const computeUSDP = (event) => {
    const amountUSDP2 = event.target.value;
    setUsedAmountUSDP(true);
    setAmountUSDP(amountUSDP2);
    setAmountETH((amountUSDP2 * 1000) / leverage);
  };

  const computeETH = (event) => {
    const amountETH2 = event.target.value;
    setUsedAmountUSDP(false);
    setAmountETH(amountETH2);
    setAmountUSDP((amountETH2 * leverage) / 1000);
  };
  const computeLeverage = (event) => {
    const amountETH2 = event;
    setLeverage(amountETH2);
    if (usedUSDP) {
      setAmountUSDP((amountETH * leverage) / 1000);
    } else {
      setAmountETH((amountUSDP * 1000) / leverage);
    }
  };

  const disableButton = (event) => {
    return amountETH === 0 || amountUSDP === 0;
  };

  return (
    <Flex p="4">
 <Spacer />
 <Box maxW="sm" borderWidth="1px" overflow="hidden">
      <Box p="6">
        <Box
          mt="2"
          fontWeight="semibold"
          as="h4"
          lineHeight="tight"
          isTruncated
        >
          {"Amount"}
        </Box>

        <Box mt="2">
          <FormControl isRequired>
            <InputGroup size="md">
              <Input
                type="number"
                placeholder="Amount"
                value={amountUSDP.toString()}
                onChange={computeUSDP}
              />
              <InputRightElement width="4.5rem">USDP</InputRightElement>
            </InputGroup>
          </FormControl>
        </Box>
        <Box
          mt="2"
          fontWeight="semibold"
          as="h4"
          lineHeight="tight"
          isTruncated
        >
          {"Amount"}
        </Box>

        <Box mt="2">
          <FormControl isRequired>
            <InputGroup size="md">
              <Input
                type="number"
                placeholder="Amount"
                value={amountETH.toString()}
                onChange={computeETH}
              />
              <InputRightElement width="4.5rem">ETH</InputRightElement>
            </InputGroup>
          </FormControl>
        </Box>
        <Box
          mt="2"
          fontWeight="semibold"
          as="h4"
          lineHeight="tight"
          isTruncated
        >
          {"Leverage"}
        </Box>

        <Box mt="2">
          <Slider aria-label="slider-ex-1" onChange={computeLeverage}>
            <SliderTrack>
              <SliderFilledTrack />
            </SliderTrack>
            <SliderThumb />
          </Slider>
          <Flex>
            <Box p="0">1x</Box>
            <Spacer />
            <Box p="0">10x</Box>
          </Flex>
        </Box>
        <Box
          mt="2"
          fontWeight="semibold"
          as="h4"
          lineHeight="tight"
          isTruncated
        >
          {"Sippage Tolerance"}
        </Box>

        <Box mt="2">
          <Tag ml="2">0.1%</Tag>
          <Tag ml="2">0.5%</Tag>
          <Tag ml="2">1%</Tag>
          <Tag ml="2">
            {" "}
            <Input
              htmlSize="3"
              size="xs"
              placeholder="others"
              variant="filled"
            />
            1%
          </Tag>
        </Box>
        <Box pt="4">
          <Button isFullWidth isDisabled={disableButton()} colorScheme="blue">
            Place Market Order
          </Button>
        </Box>
      </Box>
    </Box>
   <Spacer />
</Flex>
   
  );
}

export default App;
