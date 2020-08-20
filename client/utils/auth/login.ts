import { isResponseOk, isBrowser } from '../helpers';
import callAPI from '../callAPI';

const login = async (email: string, password: string) => {
  if (!isBrowser) return false;

  const requestBody = {
    query: `
      query Login($email: String!, $password: String!) {
        login(
          email: $email,
          password: $password
        ) {
          id
          token
        }
      }
    `,
    variables: {
      email,
      password,
    },
  };

  try {
    const response = await callAPI(requestBody);

    if (!isResponseOk(response)) {
      throw new Error('Login failed!');
    }

    const { data, errors } = await response.json();

    if (errors) {
      return false;
    }

    return data.login;
  } catch (err) {
    console.log(err);
    return false;
  }
};

export default login;
