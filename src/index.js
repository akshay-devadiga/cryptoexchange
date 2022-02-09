import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { ChakraProvider, extendTheme } from '@chakra-ui/react'
const customTheme = extendTheme({
  colors: {
    primary: '#1B3659',
    secondary: '#7672F2',
  },
  components: {
    Button: {
      defaultProps: {
        colorScheme: 'red',
      },
    },
  },
  styles: {
    global: (props) => ({
      body: {
        fontFamily: 'body',
        bg: '#1B3659',
        color: '#EBEBEB',
        lineHeight: 'base',
        borderColor:'#3A6EA5'
      },
    }),
  },
  
})
ReactDOM.render(
  <ChakraProvider theme={customTheme}>
  <App />
</ChakraProvider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
