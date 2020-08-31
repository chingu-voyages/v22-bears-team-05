interface IVars {
  goalId: string;
  isCompleted: boolean;
}

const UPDATE_GOAL_COMPLETED_VARIABLES = ({ goalId, isCompleted }: IVars) => ({
  goalId,
  isCompleted,
});

export default UPDATE_GOAL_COMPLETED_VARIABLES;
