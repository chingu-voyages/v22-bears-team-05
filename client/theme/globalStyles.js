import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  body {
    font-family: Montserrat;
  }

  h1, h2, h3, h4, h5, h6 {
    text-align: center;
  }

  .center {
    text-align: center;
  }

  form {
    font-size: 1.1em;
    
    .error, .success {
      text-align: center;
      padding: 10px;
    }

    .error {
      color: red;
    }

    .success {
      color: green;
    }

    > * {
      margin: 15px 0;
    }
  }
  
  input {
    font-family: Montserrat;
    width: 100%;
    padding: 10px 0 10px 10px;
    max-width: 340px;
    font-size: 1.1em;
    outline: none;
  }

  button {
    width: 100%;
    font-family: Montserrat;
    padding: 10px;
    margin: 0 auto;
    border-radius: 40px;
    height: 50px;
    background-color: #4ea5d9;
    max-width: 400px;
    font-size: 1.1em;
    border: none;
    user-select: none;
    outline: none;
  }
`;

export default GlobalStyle;
