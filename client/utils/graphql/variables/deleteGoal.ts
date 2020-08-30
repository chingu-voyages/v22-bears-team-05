interface IVars {
  goalId: string;
}

const DELETE_GOAL_VARIABLES = ({ goalId }: IVars) => ({ goalId });

export default DELETE_GOAL_VARIABLES;
