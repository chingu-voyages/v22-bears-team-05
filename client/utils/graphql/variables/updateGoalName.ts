interface IVars {
  goalId: string;
  newGoalName: string;
}

const UPDATE_GOAL_NAME_VARIABLES = ({ goalId, newGoalName }: IVars) => ({
  goalId,
  newGoalName,
});

export default UPDATE_GOAL_NAME_VARIABLES;
