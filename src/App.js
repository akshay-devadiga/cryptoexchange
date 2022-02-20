import "./App.css";
import { useState, useEffect, useCallback } from "react";
import {
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
  const [isUSDPUpdated, setUSDPUpdated] = useState(false);
  const [isLeverageUpdated, setLeverageUpdated] = useState(false);
  const [leverage, setLeverage] = useState(1);
  const computeCurrencies = useCallback(() => {
    if (isUSDPUpdated) {
      setAmountETH((amountUSDP * 1000) / leverage);
    } else {
      setAmountUSDP((amountETH * leverage) / 1000);
    }
  }, [amountUSDP, amountETH, leverage, isUSDPUpdated]);

  useEffect(() => {
    computeCurrencies();
  }, [computeCurrencies]);

  useEffect(() => {
    setLeverageUpdated(true);
  }, [leverage]);

  useEffect(() => {
    if (isLeverageUpdated) {
      setUSDPUpdated(!isUSDPUpdated);
    } else {
      setUSDPUpdated(isUSDPUpdated);
    }
  }, [isLeverageUpdated]);

  const updateFlags = (status) => {
    setUSDPUpdated(status);
    setLeverageUpdated(false);
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
                  value={amountUSDP}
                  onChange={({ target }) => setAmountUSDP(target.value)}
                  onFocus={() => {
                    updateFlags(true);
                  }}
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
                  value={amountETH}
                  onChange={({ target }) => setAmountETH(target.value)}
                  onFocus={() => {
                    updateFlags(false);
                  }}
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
            <Slider
              aria-label="slider-ex-1"
              onChange={(value) => setLeverage(value)}
            >
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
