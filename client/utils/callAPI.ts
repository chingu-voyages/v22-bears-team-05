const dev = true;

// TODO: Update api url once deployed to heroku
const SERVER_URL = dev ? 'http://localhost:5000/graphql' : 'HerokuDeployedURL';

const callAPI = async (requestBody: object, token?: string) => {
  const request = {
    method: 'POST',
    body: JSON.stringify(requestBody),
    headers: {},
  };

  if (token) {
    request.headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    };
  } else {
    request.headers = {
      'Content-Type': 'application/json',
    };
  }

  return fetch(SERVER_URL, request);
};

export default callAPI;
