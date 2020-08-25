interface IVars {
  email: string;
  password: string;
  confirmPassword: string;
}

const REGISTER_VARIABLES = ({ email, password, confirmPassword }: IVars) => ({
  email,
  password,
  confirmPassword,
});

export default REGISTER_VARIABLES;
