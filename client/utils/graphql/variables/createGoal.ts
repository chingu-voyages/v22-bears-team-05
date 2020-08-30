interface IVars {
  goalName: string;
}

const CREATE_GOAL_VARIABLES = ({ goalName }: IVars) => ({ goalName });

export default CREATE_GOAL_VARIABLES;
