interface IVars {
  email: string;
  password: string;
}

const LOGIN_VARIABLES = ({ email, password }: IVars) => ({ email, password });

export default LOGIN_VARIABLES;
