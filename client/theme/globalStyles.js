import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`

  html,
  *,
  *::before,
  *::after {
    --color-green: #9BC995;
    --color-dark-purple: #3F3047;
    --color-blue: #4EA5D9;
    --color-yellow: #EEF36A;
    --color-red: #EE6055;
    box-sizing: border-box;
  }

  body {
    font-family: Montserrat;
  }

  .body--modal-open{
    overflow: hidden;
  }

  h1, h2, h3, h4, h5, h6 {
    text-align: center;
  }

  .center {
    text-align: center;
  }

  form {
    font-size: 1.1rem;
    
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
    cursor: pointer;
  }

  .margin-left-1{
    margin-left: 10px;
  }
`;

export default GlobalStyle;
