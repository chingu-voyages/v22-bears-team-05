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
    margin: 0;
    padding: 0;
  }

  main {
    margin: 1rem 0;
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

  a {
    color: black;
    text-decoration: none;
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
  
  input,
  textarea {
    font-family: Montserrat;
    width: 100%;
    padding: 10px 0 10px 10px;
    font-size: 1.1em;
    outline: none;
    display: inline-block;
  }

  input[type="email"] {
    text-transform: lowercase;
  }

  label {
    padding: .75em 0 1em;
  }

  button {
    width: 100%;
    font-family: Montserrat;
    padding: 10px;
    margin: 0 auto;
    border-radius: 40px;
    height: 50px;
    background-color: var(--color-green);
    max-width: 400px;
    font-size: 1.1em;
    font-weight: 700;
    letter-spacing: 2px;
    border: none;
    user-select: none;
    outline: none;
    cursor: pointer;

    &.primary {
      background-color: var(--color-blue);
      color: white;
    }

    &.secondary {
      border: 2px solid var(--color-blue);
      color: var(--color-blue);
      background-color: #fff;
    }
  }

  .margin-left-1{
    margin-left: 10px;
  }
`;

export default GlobalStyle;
